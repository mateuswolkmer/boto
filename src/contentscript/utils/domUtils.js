import Contrast from '../functions/color-contrast'

/// STYLESHEET MANIPULATION
// Create and append to document a new CSS stylesheet
export function createStylesheet() {
    var stylesheet = document.getElementById('boto_styles')
    if (!stylesheet) {
        stylesheet = document.createElement('style')
        stylesheet.type = 'text/css'
        stylesheet.id = 'boto_styles'
        document.getElementsByTagName('head')[0].appendChild(stylesheet)
    }
    return stylesheet
}

// Append a style rule to a CSS stylesheet, removing the old one if passed as argument
export function addStyleRule(stylesheet, rule, oldRuleNode) {
    if (stylesheet) {
        if (oldRuleNode)
            removeStyleRuleNode(stylesheet, oldRuleNode)

        let ruleNode = document.createTextNode(rule)
        if (!stylesheet.contains(ruleNode))
            stylesheet.appendChild(ruleNode)

        return ruleNode
    }
    return null
}

// Remove a style rule node from a CSS stylesheet
export function removeStyleRuleNode(stylesheet, ruleNode) {
    if (stylesheet && ruleNode && ruleNode.nodeName && stylesheet.contains(ruleNode)) {
        stylesheet.removeChild(ruleNode)
    }
}

/// ELEMENT MANIPULATION
// Hide the clicked element
export function hideClickedElement(e) {
    let element = e.target
    element.style.visibility = 'hidden'
    return element
}

// Hide all the the elements with the image tag
export function hideAllImageElements() {
    let imageElements = document.querySelectorAll('img')
    let hiddenImageElements = []
    imageElements.forEach(imageElement => {
        imageElement.style.visibility = 'hidden'
        hiddenImageElements.push(imageElement)
    })
    return hiddenImageElements
}

// Show all elements in an array
export function showAllElements(elements) {
    elements.forEach(element => element.style.visibility = null)
}

// Update all font sizes based on percentage argument
// export function updateFontSizes(percentage) {
//     var elements = document.querySelectorAll('*')
//     for (var i = 0; i < elements.length; i++) {
//         (function(n) {
//             var elem = elements[n],
//                 fontSize = getComputedStyle(elem).fontSize,
//                 newFontSize

//             if (fontSize) {
//                 if (fontSize.includes('calc'))
//                     newFontSize = fontSize.split(/[-+]+/)[0] + `${percentage > 0 ? '+' : ''}${percentage}%)`
//                 else
//                     newFontSize = `calc(${fontSize} ${percentage > 0 ? '+' : ''}${percentage}%)`
//                 elem.style.fontSize = newFontSize
//             }
//         })(i)
//     }
// }

/// ACCESSIBILITY ADAPTATIONS
// Checks the contrast ratio of all the elements and addapts the ones with bad contrast
export function domContrastFix() {
    let domCheck = Contrast.check()
    console.log('initial contrast check', domCheck)

    let fixedElements = []
    if (domCheck && domCheck.errors)
        domCheck.errors.forEach(error => {
            if (error.suggestedColor) {
                let elem = error.elem
                let originalColor = elem.style.color
                elem.style.color = error.suggestedColor
                fixedElements.push({ elem, originalColor })
            }
        })

    console.log('post fix contrast check (elements fixed = ' + fixedElements.length + ')', Contrast.check())
    return fixedElements
}