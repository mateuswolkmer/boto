import * as constants from '../../shared/constants'

// Sends a message to content
export const sendMessageToContent = (subject, payload, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: constants.commAgents.BACKGROUND, subject, payload }, ((response) => callback && callback(response)))
    })
}

// Sends a message to background
export const sendMessageToBackground = (subject, payload, callback) => {
    chrome.runtime.sendMessage({ from: constants.commAgents.BACKGROUND, subject, payload }, ((response) => callback && callback(response)))
}