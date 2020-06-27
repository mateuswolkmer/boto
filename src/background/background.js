import * as constants from '../shared/constants'
import * as userSettingsMapper from './utils/userSettingsMapper'

console.log('background: loaded')

// Persistent store of user data and settings
const store = {
    userData: constants.defaultUserData,
    settingsData: constants.defaultSettingsData,
    extensionData: constants.defaultExtensionData
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
    if (msg.from === constants.commAgents.POPUP || msg.from === constants.commAgents.CONTENT) {
        switch (msg.subject) {

            case constants.commSubjects.UPDATE.USER_DATA:
                store.userData = msg.payload
                store.settingsData = userSettingsMapper.map(store.settingsData, store.userData)
                response(store.settingsData)
                break

            case constants.commSubjects.UPDATE.SETTINGS_DATA:
                store.settingsData = msg.payload
                if (store.settingsData.options.noise.includes(constants.noiseTypes.ADS) && !chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.addListener(blockAdEvent, { urls: adUrls }, ["blocking"]);
                else if (!store.settingsData.options.noise.includes(constants.noiseTypes.ADS) && chrome.webRequest.onBeforeRequest.hasListener(blockAdEvent))
                    chrome.webRequest.onBeforeRequest.removeListener(blockAdEvent)
                response('store.settingsData updated')
                break

            case constants.commSubjects.UPDATE.EXTENSION_DATA:
                store.extensionData = msg.payload
                response('store.extensionData updated')
                break

            case constants.commSubjects.REQUEST.SETTINGS_DATA:
                response(store.settingsData)
                break

            case constants.commSubjects.REQUEST.EXTENSION_DATA:
                response(store.extensionData)
                break

            case constants.commSubjects.REQUEST.USER_DATA:
                response(store.userData)
                break

            case constants.commSubjects.REQUEST.ALL_DATA:
                response({
                    userData: store.userData,
                    settingsData: store.settingsData,
                    extensionData: store.extensionData
                })
                break

            default:
                response('unknown message subject')
        }
    }
})