import * as constants from '../shared/constants'
import * as userSettingsMapper from './utils/userSettingsMapper'

console.log('background: loaded')

// Convert Object into string JSON
function objToJson(obj) {
  return JSON.stringify(obj);
}

// Convert string JSON into Object
function jsonToObj(jsonString) {
  return JSON.parse(jsonString);
}

// Add to local storage
function addToLocalStorage(keyName, data) {
    localStorage.setItem(keyName, objToJson(data));
}

// Get from local storage
function getFromLocalStorage(keyName) {
    return jsonToObj(localStorage.getItem(keyName))
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
                addToLocalStorage('settingsData', msg.payload)
                var storedSettingsData = getFromLocalStorage('settingsData')
                if (storedSettingsData.options.noise.includes(constants.noiseTypes.ADS) && !chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.addListener(blockAdEvent, { urls: adUrls }, ["blocking"]);
                else if (!storedSettingsData.options.noise.includes(constants.noiseTypes.ADS) && chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.removeListener(blockAdEvent)
                response('store.settingsData updated')
                break

            case constants.commSubjects.UPDATE.EXTENSION_DATA:
                addToLocalStorage('extensionData', msg.payload)
                response('store.extensionData updated')
                break

            case constants.commSubjects.REQUEST.SETTINGS_DATA:
                response(getFromLocalStorage('settingsData'))
                break

            case constants.commSubjects.REQUEST.EXTENSION_DATA:
                response(getFromLocalStorage('extensionData'))
                break

            case constants.commSubjects.REQUEST.USER_DATA:
                response(getFromLocalStorage('userData'))
                break

            case constants.commSubjects.REQUEST.ALL_DATA:
                response({
                    userData: getFromLocalStorage('userData'),
                    settingsData: getFromLocalStorage('settingsData'),
                    extensionData: getFromLocalStorage('extensionData')
                })
                break

            default:
                response('unknown message subject')
        }
    }
})