export const removeElementCursorRule = () => (
    `body { 
        cursor: crosshair !important;
    }`
)

export const fontSizeRule = (fontSize, letterSpacing, lineHeight) => ( // font-size: ${fontSize}% !important; line-height: ${lineHeight}rem !important;
    `* {
        letter-spacing: ${letterSpacing}rem !important;        
    }`
)

export const zoomRule = (zoom) => (
    `body {
        zoom: ${zoom}% !important;
    }`
)

export const contrastBrightnessRule = (contrast, brightness) => (
    `html {
        filter: contrast(${contrast}) brightness(${brightness}) !important;
    }`
)