export const removeElementCursorRule = () => (
    `body { 
        cursor: crosshair !important;
    }`
)

export const fontSizeRule = (fontSize, letterSpacing, lineHeight) => ( // font-size: ${fontSize}% !important;
    `body { 
        letter-spacing: ${letterSpacing}rem !important;
        line-height: ${lineHeight}rem !important;
    }`
)

export const zoomRule = (zoom) => (
    `body { 
        zoom: ${zoom}% !important;
    }`
)

export const contrastBrightnessRule = (contrast, brightness) => (
    `body { 
        filter: contrast(${contrast}) brightness(${brightness}) !important;
    }`
)