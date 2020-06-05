console.log('background: loaded')

// Blocks most ads
chrome.webRequest.onBeforeRequest.addListener((details) => {
    console.log('background: blocking ad', details)
    return { cancel: true };
}, {
    urls: ["*://*.doubleclick.net/*",
        "*://*.googleadservices.com/*",
        "*://*.googlesyndication.com/*",
        "*://*.moat.com/*"
    ]
}, ["blocking"]);