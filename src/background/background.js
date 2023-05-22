import * as constants from '../shared/constants'
import * as userSettingsMapper from './utils/userSettingsMapper'

console.log('background: loaded')

// Add to local storage
function addToLocalStorage(keyName, data) {
    localStorage.setItem(keyName, JSON.stringify(data));
}

// Get from local storage
function getFromLocalStorage(keyName) {
    return JSON.parse(localStorage.getItem(keyName))
}

// Persistent store of user data and settings
if (getFromLocalStorage('userData') == null) {
    addToLocalStorage('userData', constants.defaultUserData)
}
if (getFromLocalStorage('settingsData') == null) {
    addToLocalStorage('settingsData', constants.defaultSettingsData)
}
if (getFromLocalStorage('extensionData') == null) {
    addToLocalStorage('extensionData', constants.defaultExtensionData)
}

// Extension disabled data
const extensionDisabledData = {
    settingsData: constants.disabledSettingsData,
    extensionData: constants.disabledExtensionData
}

// Urls to block when ads are disabled
const adUrls = [
    "*://*.doubleclick.net/*",
    "*://*.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.moat.com/*"
]

// Event to block an ad
function blockAdEvent(e) {
    console.log('background: blocking ad', e)
    return { cancel: true }
}

// Messages listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log(msg)
    console.log(sender)
    console.log(response)
    if (msg.from === constants.commAgents.POPUP || msg.from === constants.commAgents.CONTENT) {
        switch (msg.subject) {

            case constants.commSubjects.UPDATE.USER_DATA:
                addToLocalStorage('userData', msg.payload)
                var storeToSettingsData = userSettingsMapper.map(getFromLocalStorage('settingsData'), getFromLocalStorage('userData'))
                addToLocalStorage('settingsData', storeToSettingsData)
                response(getFromLocalStorage('settingsData'))
                break

            case constants.commSubjects.UPDATE.SETTINGS_DATA:
                if (getFromLocalStorage('extensionData').extensionEnabled) {
                    addToLocalStorage('settingsData', msg.payload)
                }
                if (msg.payload.options.noise.includes(constants.noiseTypes.ADS) && !chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.addListener(blockAdEvent, { urls: adUrls }, ["blocking"]);
                else if (!msg.payload.options.noise.includes(constants.noiseTypes.ADS) && chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.removeListener(blockAdEvent)
                response('settingsData updated')
                break

            case constants.commSubjects.UPDATE.EXTENSION_DATA:
                if (getFromLocalStorage('extensionData').extensionEnabled) {
                    addToLocalStorage('extensionData', msg.payload)
                } else if (msg.payload.extensionEnabled) {
                    var extensionDataFromStorage = getFromLocalStorage('extensionData')
                    extensionDataFromStorage.extensionEnabled = true
                    addToLocalStorage('extensionData', extensionDataFromStorage)
                }
                break

            case constants.commSubjects.REQUEST.SETTINGS_DATA:
                if (getFromLocalStorage('extensionData').extensionEnabled) {
                    response(getFromLocalStorage('settingsData'))
                } else {
                    response(extensionDisabledData.settingsData)
                }
                break

            case constants.commSubjects.REQUEST.EXTENSION_DATA:
                if (getFromLocalStorage('extensionData').extensionEnabled) {
                    response(getFromLocalStorage('extensionData'))
                } else {
                    response(extensionDisabledData.extensionData)
                }
                break

            case constants.commSubjects.REQUEST.USER_DATA:
                response(getFromLocalStorage('userData'))
                break

            case constants.commSubjects.REQUEST.ALL_DATA:
                if (getFromLocalStorage('extensionData').extensionEnabled) {
                    response({
                        userData: getFromLocalStorage('userData'),
                        settingsData: getFromLocalStorage('settingsData'),
                        extensionData: getFromLocalStorage('extensionData')
                    })
                } else {
                    response({
                        userData: getFromLocalStorage('userData'),
                        settingsData: extensionDisabledData.settingsData,
                        extensionData: extensionDisabledData.extensionData
                    })
                }
                break

            default:
                response('unknown message subject')
        }
    }
})