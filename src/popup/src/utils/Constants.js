/// ../../shared/constants.js
// Communication subjects
export const commSubjects = {
    UPDATE: {
        USER_DATA: 'update.userData',
        SETTINGS_DATA: 'update.settingsData',
        EXTENSION_DATA: 'update.extensionData'
    },
    REQUEST: {
        ALL_DATA: 'request.allData',
        USER_DATA: 'request.userData',
        SETTINGS_DATA: 'request.settingsData',
        EXTENSION_DATA: 'request.extensionData'
    },
    HIDDEN_ELEMENTS: {
        HIDE_NEXT: 'hiddenElements.hideNext',
        RESET: 'hiddenElements.reset',
        STOP_HIDE_NEXT: 'hiddenElements.stopHideNext'
    }
}
export const commAgents = {
    POPUP: 'popup',
    BACKGROUND: 'background',
    CONTENT: 'content'
}

export const noiseTypes = {
    ADS: 'Propagandas',
    IMAGES: 'Imagens'
}
export const daltonismTypes = {
    NO: 'Não',
    PROTANOPIA: 'Protanopia',
    DEUTERANOPIA: 'Deuteranopia',
    TRITANOPIA: 'Tritanopia'
}
export const handednessTypes = {
    RIGHT: 'Direita (destro)',
    LEFT: 'Esquerda (canhoto)'
}
export const sightDeficiencyTypes = {
    NO: 'Não',
    MINOR: 'Um pouco',
    MAJOR: 'Bastante'
}
export const cognitiveDeficiencyTypes = {
    NO: 'Não',
    MILD: 'Leve',
    SEVERE: 'Severa'
}

export const defaultUserData = {
    name: '',
    age: '',
    sightDeficiency: sightDeficiencyTypes.NO,
    cognitiveDeficiency: cognitiveDeficiencyTypes.NO,
    daltonism: daltonismTypes.NO,
    handedness: handednessTypes.RIGHT
}
export const defaultSettingsData = {
    userFormCompleted: false,
    options: {
        brightness: 0,
        contrast: 0,
        zoom: 0,
        fontSize: 0,
        noise: [],
        daltonism: daltonismTypes.NO
    }
}
export const defaultExtensionData = {
    autoFixElements: true,
    acceptCookies: false
}

/// POPUP ONLY
export const tabs = {
    INTERFACE: 'Interface',
    PROFILE: 'Perfil',
    EXTENSION: 'Extras'
}

export const optionsItemTypes = {
    SLIDER: 'slider',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
    CUSTOM: 'custom'
}