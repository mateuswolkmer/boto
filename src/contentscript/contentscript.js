import RemoveCookieBanners from './functions/cookiebanner-go-away'
import * as constants from '../shared/constants'
import { sendMessageToBackground } from './utils/messageManager'
import { createStylesheet, addStyleRule, removeStyleRuleNode, hideClickedElement, hideAllImageElements, showAllElements, domContrastFix } from './utils/domUtils'
import { removeElementCursorRule, fontSizeRule, zoomRule, contrastBrightnessRule } from './utils/cssRules'

console.log('contentscript: loaded')

var prevSettingsData = constants.defaultSettingsData
var prevExtensionData = {}
var botoStylesheet

var fixedElements = []
var hiddenElements = []
var hiddenImageElements = []

// Observer to automatically hide new added images
var hideImagesObserver = new MutationObserver(function(mutations, observer) {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.tagName === 'img') {
                node.style.visibility = 'hidden'
                hiddenImageElements.push(node)
            } else if (node.getElementsByTagName) {
                let imagesInsideNewNode = node.getElementsByTagName('img')
                for (var x = 0; x < imagesInsideNewNode.length; x++) {
                    let imageNode = imagesInsideNewNode[x]
                    imageNode.style.visibility = 'hidden'
                    hiddenImageElements.push(imageNode)
                }
            }
        })
    })
})

// CSS rule nodes
var removeElementCursorRuleNode = {}
var fontSizeRuleNode = {}
var zoomRuleNode = {}
var contrastBrightnessRuleNode = {}

// Event to hide the next clicked element
function hideNextClickedElementEvent(e) {
    e.stopImmediatePropagation()
    e.preventDefault()

    let element = hideClickedElement(e)
    if (element) hiddenElements.push(element)

    removeStyleRuleNode(botoStylesheet, removeElementCursorRuleNode)
    document.removeEventListener('click', hideNextClickedElementEvent)
    return null
}

// Update DOM based on settingsData argument
function settingsDataUpdate(newSettingsData) {
    if (prevSettingsData.options.contrast !== newSettingsData.options.contrast ||
        prevSettingsData.options.brightness !== newSettingsData.options.brightness) {
        if (newSettingsData.options.contrast === 0 && newSettingsData.options.brightness === 0)
            removeStyleRuleNode(botoStylesheet, contrastBrightnessRuleNode)
        else {
            let newContrast = (newSettingsData.options.contrast * (newSettingsData.options.contrast > 0 ? 0.02 : 0.01)) + 1
            let newBrightness = (newSettingsData.options.brightness * (newSettingsData.options.brightness > 0 ? 0.02 : 0.01)) + 1
            contrastBrightnessRuleNode = addStyleRule(botoStylesheet, contrastBrightnessRule(newContrast, newBrightness), contrastBrightnessRuleNode)
        }
    }

    if (prevSettingsData.options.fontSize !== newSettingsData.options.fontSize) {
        if (newSettingsData.options.fontSize === 0)
            removeStyleRuleNode(botoStylesheet, fontSizeRuleNode)
        else {
            // let newFontSize = newSettingsData.options.fontSize + 100
            // let newLetterSpacing = newSettingsData.options.fontSize < 1 ? 0 : (newSettingsData.options.fontSize * 2 / 100)
            // let newLineHeight = (newSettingsData.options.fontSize * 3 / 10) < 1.5 ? 1.5 : (newSettingsData.options.fontSize * 3 / 10)
            let newFontSize = newSettingsData.options.fontSize + 100
            let newLetterSpacing = newSettingsData.options.fontSize < 1 ? 0 : (newSettingsData.options.fontSize / 300)
            let newLineHeight = (newSettingsData.options.fontSize * 3 / 10) < 1.5 ? 1.5 : (newSettingsData.options.fontSize / 10)
            fontSizeRuleNode = addStyleRule(botoStylesheet, fontSizeRule(newFontSize, newLetterSpacing, newLineHeight), fontSizeRuleNode)
        }
    }

    if (prevSettingsData.options.zoom !== newSettingsData.options.zoom) {
        if (newSettingsData.options.zoom === 0)
            removeStyleRuleNode(botoStylesheet, zoomRuleNode)
        else {
            let newZoom = newSettingsData.options.zoom * 2 + 100 || 1
            zoomRuleNode = addStyleRule(botoStylesheet, zoomRule(newZoom), zoomRuleNode)
        }
    }

    if (newSettingsData.options.noise.includes(constants.noiseTypes.IMAGES) && !prevSettingsData.options.noise.includes(constants.noiseTypes.IMAGES)) {
        hiddenImageElements = hideAllImageElements()
        hideImagesObserver.observe(document, { childList: true, subtree: true });
    } else if (!newSettingsData.options.noise.includes(constants.noiseTypes.IMAGES) && prevSettingsData.options.noise.includes(constants.noiseTypes.IMAGES)) {
        showAllElements(hiddenImageElements)
        hideImagesObserver.disconnect();
        hiddenImageElements = []
    }

    prevSettingsData = newSettingsData
}
// Update DOM based on extensionData argument
function extensionDataUpdate(newExtensionData) {
    // Checks the DOM for W3C bad contrast ratios and fixes them
    if (newExtensionData.autoFixElements && (!prevExtensionData || !prevExtensionData.autoFixElements))
        fixedElements = domContrastFix()
    else if (!newExtensionData.autoFixElements && (!prevExtensionData || prevExtensionData.autoFixElements)) {
        fixedElements.forEach(fixedElement => fixedElement.elem.style.color = fixedElement.originalColor)
        fixedElements = []
    }

    // Automatically accepts and closes all "accept cookies" modals
    if (newExtensionData.acceptCookies && (!prevExtensionData || !prevExtensionData.acceptCookies))
        RemoveCookieBanners()

    prevExtensionData = newExtensionData
}

// Messages listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === constants.commAgents.POPUP || msg.from === constants.commAgents.BACKGROUND) {
        switch (msg.subject) {

            case constants.commSubjects.UPDATE.SETTINGS_DATA:
                settingsDataUpdate(msg.payload)
                break

            case constants.commSubjects.UPDATE.EXTENSION_DATA:
                extensionDataUpdate(msg.payload)
                break

            case constants.commSubjects.HIDDEN_ELEMENTS.HIDE_NEXT:
                removeElementCursorRuleNode = addStyleRule(botoStylesheet, removeElementCursorRule(), removeElementCursorRuleNode)
                document.addEventListener('click', hideNextClickedElementEvent)
                break

            case constants.commSubjects.HIDDEN_ELEMENTS.RESET:
                showAllElements(hiddenElements)
                hiddenElements = []
                break

            default:
                response('unknown message subject')
        }
    }
})

// DOM load
document.addEventListener("DOMContentLoaded", () => {
    botoStylesheet = createStylesheet()

    // Get updated settingsData
    sendMessageToBackground(constants.commSubjects.REQUEST.ALL_DATA, null, (response => {
        settingsDataUpdate(response.settingsData)
        extensionDataUpdate(response.extensionData)
    }))
})