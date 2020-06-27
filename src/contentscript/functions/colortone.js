// https://github.com/MarchWorks/colortone/blob/85b332f83094f56b519bdb77fcd09a24103843b9/packages/src/index.js

const hexToRgb = (hex) => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ] :
        null;
};

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const logError = (error) => {
    console.error(error);
    return true;
};

const validateArgs = (color, ratio) => {
    if (typeof color === "string") {
        if (!hexToRgb(color)) {
            logError(`The passed value isn't a valid hex string`);
        }
    } else if (Array.isArray(color)) {
        const [r, b, g] = color;

        if (color.length !== 3) {
            logError(`The passed array should contains 3 values [r, g, b]`);
        }

        if (!Number.isInteger(r) ||
            !Number.isInteger(g) ||
            !Number.isInteger(b) ||
            r < 0 ||
            r > 255 ||
            g < 0 ||
            g > 255 ||
            b < 0 ||
            b > 255
        ) {
            logError(`The passed RGB value isn't a valid one`);
        }
    } else if (typeof color === "object") {
        const { r, g, b } = color;

        if (
            typeof r === "undefined" ||
            typeof g === "undefined" ||
            typeof b === "undefined"
        ) {
            logError(`The passed object isn't a valid one`);
        }

        if (!Number.isInteger(r) ||
            !Number.isInteger(g) ||
            !Number.isInteger(b) ||
            r < 0 ||
            r > 255 ||
            g < 0 ||
            g > 255 ||
            b < 0 ||
            b > 255
        ) {
            logError(`The passed RGB value isn't a valid one`);
        }
    } else {
        logError(`Invalid arguments`);
    }

    if (
        typeof ratio !== "number" ||
        Number.isNaN(ratio) ||
        ratio < -1 ||
        ratio > 1
    ) {
        logError(`The ratio value isn't a valid one`);
    }
};

const colortone = (color, ratio) => {
    if (validateArgs(color, ratio)) return null;

    const rgb = [];
    if (typeof color === "string") {
        rgb.push(...hexToRgb(color));
    } else if (Array.isArray(color)) {
        rgb.push(...color);
    } else if (typeof color === "object") {
        const { r, g, b } = color;
        rgb.push(r, g, b);
    }

    if (ratio > 0) {
        for (let i = 0; i < rgb.length; i++) {
            rgb[i] = Math.ceil(rgb[i] + ratio * (255 - rgb[i]));
        }
    } else {
        ratio = Math.abs(ratio);
        for (let i = 0; i < rgb.length; i++) {
            rgb[i] = Math.floor(rgb[i] - ratio * rgb[i]);
        }
    }

    return rgb;
    // return rgbToHex(...rgb);
};

export default colortone;