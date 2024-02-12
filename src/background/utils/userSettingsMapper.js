import * as constants from '../../shared/constants';

// Map user data to settings that better suit their profile
export function map(settingsData, userData) {
  let newSettingsData = Object.assign({}, settingsData);

  // brightness
  newSettingsData.options.brightness = 0;

  // Contrast
  if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE)
    newSettingsData.options.contrast = -10; // -20
  else if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
    newSettingsData.options.contrast = -5; // -10
  else if (
    userData.age >= 70 ||
    userData.sightDeficiency === constants.sightDeficiencyTypes.MINOR ||
    userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR
  )
    newSettingsData.options.contrast = 5; // 10
  else newSettingsData.options.contrast = 0;

  // Zoom & Turn Extension Bigger
  if (
    userData.age >= 70 ||
    userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR ||
    userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE
  ) {
    newSettingsData.options.zoom = 20; // 40
    newSettingsData.options.turnExtensionBigger = true;
  } else if (
    userData.age >= 45 ||
    userData.sightDeficiency === constants.sightDeficiencyTypes.MINOR ||
    userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD ||
    userData.motorDeficiency === constants.motorDeficiencyTypes.SEVERE
  ) {
    newSettingsData.options.zoom = 10; // 20
    newSettingsData.options.turnExtensionBigger = true;
  } else {
    newSettingsData.options.zoom = 0;
    newSettingsData.options.turnExtensionBigger = false;
  }

  // Font Size
  if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE)
    newSettingsData.options.fontSize = 40;
  else if (userData.age >= 70 || userData.sightDeficiency === constants.sightDeficiencyTypes.MAJOR)
    newSettingsData.options.fontSize = 20;
  else if (userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD)
    newSettingsData.options.fontSize = 10;
  else newSettingsData.options.fontSize = 0;

  // Noise
  if (
    userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.SEVERE ||
    userData.cognitiveDeficiency === constants.cognitiveDeficiencyTypes.MILD
  )
    newSettingsData.options.noise = [constants.noiseTypes.ADS];
  else newSettingsData.options.noise = [];

  // Daltonism
  if (userData.daltonism === constants.daltonismTypes.DEUTERANOPIA) {
    newSettingsData.options.daltonism = 1;
    console.log('1');
  } else if (userData.daltonism === constants.daltonismTypes.PROTANOPIA) {
    newSettingsData.options.daltonism = 2;
    console.log('2');
  } else if (userData.daltonism === constants.daltonismTypes.TRITANOPIA) {
    newSettingsData.options.daltonism = 3;
    console.log('3');
  } else {
    userData.daltonism === constants.daltonismTypes.NO;
    newSettingsData.options.daltonism = 0;
    console.log('0');
  }

  // Auto Click On Hover
  if (
    userData.motorDeficiency === constants.motorDeficiencyTypes.SEVERE ||
    userData.motorDeficiency === constants.motorDeficiencyTypes.MILD ||
    userData.age >= 70
  )
    newSettingsData.options.autoClickOnHover = true;
  else newSettingsData.options.autoClickOnHover = false;

  return newSettingsData;
}
