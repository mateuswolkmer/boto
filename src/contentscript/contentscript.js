import Contrast from './utils/color-contrast'

console.log('contentscript: loaded')

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log('contentscript: message received, ', msg)
    if ((msg.from === 'popup') && (msg.subject === 'checkAccessibility')) {
        response(Contrast.check())
    }
})