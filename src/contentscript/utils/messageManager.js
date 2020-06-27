import * as constants from '../../shared/constants'

// Sends a message to background
export const sendMessageToBackground = (subject, payload, callback) => {
    chrome.runtime.sendMessage({ from: constants.commAgents.CONTENT, subject, payload }, ((response) => callback && callback(response)))
}