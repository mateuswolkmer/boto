/*global chrome*/
import * as constants from './Constants'

// Sends a message to content
export const sendMessageToContent = (subject, payload, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: constants.commAgents.POPUP, subject, payload }, ((response) => callback && callback(response)))
    })
}

// Sends a message to all contents
export const sendMessageToAllContents = (subject, payload, callback) => {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { from: constants.commAgents.POPUP, subject, payload }, ((response) => callback && callback(response))))
    })
}

// Sends a message to background
export const sendMessageToBackground = (subject, payload, callback) => {
    chrome.runtime.sendMessage({ from: constants.commAgents.POPUP, subject, payload }, ((response) => callback && callback(response)))
}