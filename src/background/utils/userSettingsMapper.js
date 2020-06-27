import * as constants from '../../shared/constants'

// Map user data to settings that better suit their profile
export function map(settingsData, userData) {
    let newSettingsData = Object.assign({}, settingsData)

    // Contrast
    if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE)
        newSettingsData.options.contrast = -10 // -20
    else if (
        userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
        newSettingsData.options.contrast = -5 // -10
    else if (
        userData.age >= 70 ||
        userData.sightDeficiency === constants.sightDeficiencyTypes.MINOR ||
        userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR)
        newSettingsData.options.contrast = 5 // 10
    else
        newSettingsData.options.contrast = 0

    // Zoom
    if (userData.age >= 70 ||
        userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR ||
        userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE)
        newSettingsData.options.zoom = 20 // 40
    else if (
        userData.age >= 45 ||
        userData.sightDeficiency === constants.sightDeficiencyTypes.MINOR ||
        userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
        newSettingsData.options.zoom = 10 // 20
    else
        newSettingsData.options.zoom = 0

    // Font Size
    if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE)
        newSettingsData.options.fontSize = 40
    else if (
        userData.age >= 70 ||
        userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR)
        newSettingsData.options.fontSize = 20
    else if (
        userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
        newSettingsData.options.fontSize = 10
    else
        newSettingsData.options.fontSize = 0

    // Noise
    if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE ||
        userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
        newSettingsData.options.noise = [constants.noiseTypes.ADS]
    else
        newSettingsData.options.noise = []

    // Daltonism
    newSettingsData.options.daltonism = userData.daltonism

    return newSettingsData
}