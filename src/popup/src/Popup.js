/*global chrome*/
import React, { useState, useEffect } from 'react';
import './popup.sass';
import {
  createTheme,
  colors,
  ThemeProvider,
  TabItem,
  Tabs,
  Button,
  Icon,
  Checkbox,
  HFlow,
  Switch,
  Tooltip
} from 'bold-ui';
import logo from './assets/boto.png';
import OptionsItem from './components/OptionsItem.jsx';
import UserForm from './components/UserForm';
import * as constants from './utils/Constants';
import VoiceControl from './components/VoiceControl';
import {
  sendMessageToContent,
  sendMessageToAllContents,
  sendMessageToBackground
} from './utils/MessageManager';

const botoTheme = createTheme({
  pallete: {
    primaryScale: colors.pink,
    highlightScale: colors.turquoise
  }
});

// Add to local storage
function addToLocalStorage(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

// Get from local storage
function getFromLocalStorage(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}

function Popup() {
  // Persistent store of user data and settings
  if (getFromLocalStorage('userData') == null) {
    addToLocalStorage('userData', constants.defaultUserData);
    addToLocalStorage('settingsData', constants.defaultSettingsData);
    addToLocalStorage('extensionData', constants.defaultExtensionData);
  }

  const hideNextElement = () => {
    sendMessageToContent(constants.commSubjects.HIDDEN_ELEMENTS.HIDE_NEXT);
    window.close();
  };

  const resetHiddenElements = () =>
    sendMessageToContent(constants.commSubjects.HIDDEN_ELEMENTS.RESET);

  const stopHideNextElement = () =>
    sendMessageToContent(constants.commSubjects.HIDDEN_ELEMENTS.STOP_HIDE_NEXT);

  const extensionZoom = (turnExtensionBiggerValue) => {
    if (turnExtensionBiggerValue) {
      return constants.extensionZoom.ZOOMED;
    } else {
      return constants.extensionZoom.DEFAULT;
    }
  };

  const resetDefaultSettingsBasedOnUserProfile = () => {
    setPopupUpdating(true);
    updateUserDataMessage();
    setAutoFixElementsValue(true);
    setAcceptCookiesValue(false);
    resetHiddenElements();
    setPopupUpdating(false);
  };

  const disableExtension = (enabled) => {
    setPopupUpdating(true);
    setExtensionEnabledValue(enabled);
    updateExtensionDataMessage();
    if (enabled) {
      sendMessageToAllContents(
        constants.commSubjects.UPDATE.SETTINGS_DATA,
        getFromLocalStorage('settingsData')
      );
      sendMessageToAllContents(
        constants.commSubjects.UPDATE.EXTENSION_DATA,
        getFromLocalStorage('extensionData')
      );
    } else {
      sendMessageToAllContents(
        constants.commSubjects.UPDATE.SETTINGS_DATA,
        constants.disabledSettingsData
      );
      sendMessageToAllContents(
        constants.commSubjects.UPDATE.EXTENSION_DATA,
        constants.disabledExtensionData
      );
      resetHiddenElements();
    }
    setPopupUpdating(false);
    window.close();
  };

  const requestAllDataMessage = (callback) =>
    sendMessageToBackground(constants.commSubjects.REQUEST.ALL_DATA, null, callback);
  const updateSettingsDataMessage = () => {
    let settingsData = stateToSettingsData();
    sendMessageToBackground(constants.commSubjects.UPDATE.SETTINGS_DATA, settingsData);
    sendMessageToAllContents(constants.commSubjects.UPDATE.SETTINGS_DATA, settingsData);
  };
  const updateExtensionDataMessage = () => {
    let extensionData = stateToExtensionData();
    sendMessageToBackground(constants.commSubjects.UPDATE.EXTENSION_DATA, extensionData);
    sendMessageToAllContents(constants.commSubjects.UPDATE.EXTENSION_DATA, extensionData);
  };
  const updateUserDataMessage = () => {
    sendMessageToBackground(
      constants.commSubjects.UPDATE.USER_DATA,
      userData,
      (newSettingsData) => {
        // After sending the new userData, updates to the new settings
        settingsDataToState(newSettingsData);
        sendMessageToAllContents(constants.commSubjects.UPDATE.SETTINGS_DATA, newSettingsData);
      }
    );
  };

  const [popupInitialized, setPopupInitialized] = useState(false);
  const [popupUpdating, setPopupUpdating] = useState(false);
  const [formActive, setFormActive] = useState(false);
  const [activeTab, setActiveTab] = useState(constants.tabs.INTERFACE);
  const [isVoiceControlActive, setIsVoiceControlActive] = useState(false);

  // Settings
  const [brightnessValue, setBrightnessValue] = useState(50);
  const [contrastValue, setContrastValue] = useState(50);
  const [zoomValue, setZoomValue] = useState(50);
  const [fontSizeValue, setFontSizeValue] = useState(50);
  const [noiseValue, setNoiseValue] = useState([]);
  const [daltonismValue, setDaltonismValue] = useState(constants.daltonismTypes.NO);
  const [autoClickOnHoverValue, setAutoClickOnHoverValue] = useState(false);
  const [turnExtensionBiggerValue, setTurnExtensionBiggerValue] = useState(false);

  const settingsDataToState = (settingsData) => {
    if (settingsData) {
      setPopupUpdating(true);
      setFormActive(!settingsData.userFormCompleted);
      if (settingsData.options) {
        setBrightnessValue(settingsData.options.brightness + 50);
        setContrastValue(settingsData.options.contrast + 50);
        setZoomValue(settingsData.options.zoom + 50);
        setFontSizeValue(settingsData.options.fontSize);
        setNoiseValue(settingsData.options.noise);
        setDaltonismValue(settingsData.options.daltonism);
        setAutoClickOnHoverValue(settingsData.options.autoClickOnHover);
        setTurnExtensionBiggerValue(settingsData.options.turnExtensionBigger);
      }
      setPopupUpdating(false);
    }
  };
  const stateToSettingsData = () => {
    return {
      userFormCompleted: !formActive,
      options: {
        brightness: brightnessValue - 50,
        contrast: contrastValue - 50,
        zoom: zoomValue - 50,
        fontSize: fontSizeValue,
        noise: noiseValue,
        daltonism: daltonismValue,
        autoClickOnHover: autoClickOnHoverValue,
        turnExtensionBigger: turnExtensionBiggerValue
      }
    };
  };

  // Profile
  const [userData, setUserData] = useState(constants.defaultUserData);

  // Extension
  const [extensionEnabledValue, setExtensionEnabledValue] = useState(false);
  const [autoFixElementsValue, setAutoFixElementsValue] = useState(true);
  const [acceptCookiesValue, setAcceptCookiesValue] = useState(true);

  const extensionDataToState = (extensionData) => {
    if (extensionData) {
      setPopupUpdating(true);
      setExtensionEnabledValue(extensionData.extensionEnabled);
      setAutoFixElementsValue(extensionData.autoFixElements);
      setAcceptCookiesValue(extensionData.acceptCookies);
      setPopupUpdating(false);
    }
  };
  const stateToExtensionData = () => {
    return {
      extensionEnabled: extensionEnabledValue,
      autoFixElements: autoFixElementsValue,
      acceptCookies: acceptCookiesValue
    };
  };

  // When initializing, load all data
  useEffect(() => {
    requestAllDataMessage((response) => {
      settingsDataToState(response.settingsData);
      extensionDataToState(response.extensionData);
      setUserData(response.userData);
      setPopupInitialized(true);
      stopHideNextElement();
    });
  }, []);

  useEffect(() => {
    if (popupInitialized && !popupUpdating) updateSettingsDataMessage();
  }, [
    formActive,
    brightnessValue,
    contrastValue,
    fontSizeValue,
    zoomValue,
    noiseValue,
    daltonismValue,
    autoClickOnHoverValue,
    turnExtensionBiggerValue
  ]);

  useEffect(() => {
    if (popupInitialized && !popupUpdating) updateExtensionDataMessage();
  }, [extensionEnabledValue, autoFixElementsValue, acceptCookiesValue]);

  // Validates the userData
  useEffect(() => {
    if (userData.name.length > 99) setUserData({ ...userData, name: userData.name.substr(0, 99) });

    if (userData.age < 0 || userData.age > 150) setUserData({ ...userData, age: '' });

    if (popupInitialized && !formActive && !popupUpdating) updateUserDataMessage();
  }, [formActive, userData]);

  return (
    <ThemeProvider theme={botoTheme}>
      {formActive && (
        <UserForm
          userData={userData}
          setUserData={setUserData}
          setFormActive={setFormActive}
        />
      )}
      {!formActive && (
        <main style={{ zoom: extensionZoom(turnExtensionBiggerValue) }}>
          {/* <section className="header">
            <h1 className="header_greetings">
              Olá{userData.name && ','} {userData.name.split(' ')[0]}
            </h1>
          </section> */}

          {extensionEnabledValue && (
            <section className="tabs">
              <Tabs>
                <Tooltip
                  placement="top"
                  text="Acessar aba interface">
                  <TabItem
                    onClick={() => setActiveTab(constants.tabs.INTERFACE)}
                    active={activeTab === constants.tabs.INTERFACE}>
                    Interface
                  </TabItem>
                </Tooltip>
                <Tooltip
                  placement="top"
                  text="Acessar aba perfil">
                  <TabItem
                    onClick={() => setActiveTab(constants.tabs.PROFILE)}
                    active={activeTab === constants.tabs.PROFILE}>
                    Perfil
                  </TabItem>
                </Tooltip>
                <Tooltip
                  placement="top"
                  text="Acessar aba extras">
                  <TabItem
                    onClick={() => setActiveTab(constants.tabs.EXTENSION)}
                    active={activeTab === constants.tabs.EXTENSION}>
                    Extras
                  </TabItem>
                </Tooltip>
              </Tabs>
            </section>
          )}

          {activeTab === constants.tabs.INTERFACE && extensionEnabledValue && (
            <section className="body body-interface">
              <OptionsItem
                label="Brilho"
                type={constants.optionsItemTypes.SLIDER}
                value={brightnessValue}
                valueSetter={setBrightnessValue}
                sliderStep={5}
                displayValueConversor={(value) => (value - 50) * 2}
                minusIcon="desktopFilled"
                plusIcon="desktopOutline"
                tooltip='Altere o brilho da página arrastando a barra ou falando "diminui/aumentar o brilho"'
                tooltipMinus="Diminuir brilho"
                tooltipPlus="Aumentar brilho"
              />
              <OptionsItem
                label="Contraste"
                type={constants.optionsItemTypes.SLIDER}
                value={contrastValue}
                valueSetter={setContrastValue}
                sliderStep={5}
                displayValueConversor={(value) => (value - 50) * 2}
                minusIcon="contrast"
                plusIcon="contrastActive"
                tooltip='Altere o contraste da página arrastando a barra ou falando "diminuir/aumentar o contraste"'
                tooltipMinus="Diminuir contraste"
                tooltipPlus="Aumentar contraste"
              />
              <OptionsItem
                label="Zoom"
                type={constants.optionsItemTypes.SLIDER}
                value={zoomValue}
                valueSetter={setZoomValue}
                sliderStep={5}
                displayValueConversor={(value) => (value - 50) * 2}
                minusIcon="zoomMinusOutline"
                plusIcon="zoomPlusOutline"
                tooltip='Altere o tamanho dos elementos da página arrastando a barra para a direita ou para a esquerda ou falando "diminuir/aumentar o zoom"'
                tooltipMinus="Diminuir tamanho dos elementos"
                tooltipPlus="Aumentar tamanho dos elementos"
              />
              <OptionsItem
                label="Espaçamento"
                type={constants.optionsItemTypes.SLIDER}
                value={fontSizeValue}
                valueSetter={setFontSizeValue}
                sliderStep={5}
                displayValueConversor={(value) => value}
                minusIcon="minimize"
                plusIcon="expand"
                tooltip='Altere o espaçamento de textos da página arrastando a barra ou falando "diminuir/aumentar o espaçamento"'
                tooltipMinus="Diminuir espaçamento de textos"
                tooltipPlus="Aumentar espaçamento de textos"
              />
              <OptionsItem
                label="Esconder elementos"
                type={constants.optionsItemTypes.MULTISELECT}
                value={noiseValue}
                valueSetter={setNoiseValue}
                selectItems={Object.values(constants.noiseTypes)}
                tooltip="Clique neste espaço se quiser esconder imagens e/ou propagandas da página"
                placeholder={
                  isVoiceControlActive ? 'Fale "esconder" + "imagens" / "propagandas"' : ''
                }
              />
              {!isVoiceControlActive && (
                <OptionsItem
                  label="Esconder elemento específico"
                  type={constants.optionsItemTypes.CUSTOM}>
                  <Tooltip
                    placement="top"
                    text="Ao clicar neste botão, a extensão será minimizada e você podera esconder um elemento da página clicando em cima dele">
                    <Button
                      size="small"
                      onClick={hideNextElement}>
                      <Icon icon="penTool" /> Iniciar seleção
                    </Button>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    text="Exibir novamente os elementos específicos escondidos">
                    <Button
                      size="small"
                      kind="primary"
                      skin="outline"
                      onClick={resetHiddenElements}>
                      Restaurar seleção
                    </Button>
                  </Tooltip>
                </OptionsItem>
              )}
              {/* <OptionsItem label='Daltonismo' type={constants.optionsItemTypes.SELECT}
                                value={daltonismValue} valueSetter={setDaltonismValue} selectItems={Object.values(constants.daltonismTypes)}
                                tooltip='Preencher'/> */}
            </section>
          )}
          {activeTab === constants.tabs.PROFILE && extensionEnabledValue && (
            <section className="body body-profile">
              <UserForm
                userData={userData}
                setUserData={setUserData}
                setFormActive={setFormActive}
                profileForm={true}
                isVoiceControlActive={isVoiceControlActive}
              />
            </section>
          )}
          {activeTab === constants.tabs.EXTENSION && extensionEnabledValue && (
            <section className="body body-extension">
              <OptionsItem
                type={constants.optionsItemTypes.CUSTOM2}
                tooltip="Esta opção ajusta automaticamente elementos que possuem um baixo nível de contraste, facilitando a visualização">
                <Checkbox
                  label={
                    <p>
                      Adaptar automaticamente elementos de <b>baixa acessibilidade</b>
                    </p>
                  }
                  checked={autoFixElementsValue}
                  onChange={(e) => setAutoFixElementsValue(e.target.checked)}
                />
              </OptionsItem>
              <OptionsItem
                type={constants.optionsItemTypes.CUSTOM2}
                tooltip="Com esta funcionalidade ativada, basta mover o mouse para o elemento que deseja acessar e após 3 segundos o Boto irá clicar automaticamente para você">
                <Checkbox
                  label={
                    <p>
                      Realizar <b>clique automático</b> após 3s com o mouse parado
                    </p>
                  }
                  checked={autoClickOnHoverValue}
                  onChange={(e) => setAutoClickOnHoverValue(e.target.checked)}
                />
              </OptionsItem>
              <OptionsItem
                type={constants.optionsItemTypes.CUSTOM2}
                tooltip="Caso deseje aumentar o tamanho dos elementos do boto, basta marcar esta opção">
                <Checkbox
                  label={
                    <p>
                      <b>Aumentar o tamanho</b> da extensão para melhor visualização
                    </p>
                  }
                  checked={turnExtensionBiggerValue}
                  onChange={(e) => setTurnExtensionBiggerValue(e.target.checked)}
                />
              </OptionsItem>
              <OptionsItem
                type={constants.optionsItemTypes.CUSTOM2}
                tooltip='Sabe aquelas solicitações que aparecem pedindo sua permissão para uso de "cookies"? Basta ativar esta opção para aceitá-las automaticamente'>
                <Checkbox
                  label={
                    <p>
                      Aceitar automaticamente todas as solicitações de uso de <b>"cookies"</b>
                    </p>
                  }
                  checked={acceptCookiesValue}
                  onChange={(e) => setAcceptCookiesValue(e.target.checked)}
                />
              </OptionsItem>
              <Tooltip
                placement="top"
                text="Restaura as configurações do perfil">
                <Button
                  size="small"
                  kind="primary"
                  skin="outline"
                  onClick={resetDefaultSettingsBasedOnUserProfile}>
                  <Icon icon="undo" /> Restaurar configurações
                </Button>
              </Tooltip>
              {isVoiceControlActive && (
                <div className="voice-instructions">
                  <scan className="voice-instructions-tip">
                    <b>Dica:</b> Fale "marcar" ou "desmarcar" + palavra chave indicada em negrito
                  </scan>
                </div>
              )}
            </section>
          )}

          {extensionEnabledValue && (
            <VoiceControl
              brightnessValue={brightnessValue}
              setBrightnessValue={setBrightnessValue}
              contrastValue={contrastValue}
              setContrastValue={setContrastValue}
              zoomValue={zoomValue}
              setZoomValue={setZoomValue}
              fontSizeValue={fontSizeValue}
              setFontSizeValue={setFontSizeValue}
              setNoiseValue={setNoiseValue}
              noiseValue={noiseValue}
              setActiveTab={setActiveTab}
              setAutoFixElementsValue={setAutoFixElementsValue}
              setAutoClickOnHoverValue={setAutoClickOnHoverValue}
              setTurnExtensionBiggerValue={setTurnExtensionBiggerValue}
              setAcceptCookiesValue={setAcceptCookiesValue}
              setUserData={setUserData}
              userData={userData}
              setIsVoiceControlActive={setIsVoiceControlActive}
              resetDefaultSettingsProfile={resetDefaultSettingsBasedOnUserProfile}
            />
          )}

          <section className="footer">
            <HFlow justifyContent="space-between">
              <Tooltip
                placement="top"
                text={extensionEnabledValue ? 'Desligar a extensão' : 'Ligar a extensão'}>
                <Switch
                  label={extensionEnabledValue ? 'Ligado' : 'Desligado'}
                  checked={extensionEnabledValue}
                  onChange={(e) => disableExtension(e.target.checked)}
                />
              </Tooltip>
              <span className="footer_logo">
                Boto
                <img
                  alt="Boto"
                  src={logo}
                />
              </span>
            </HFlow>
            {/* <a href='#' target='_blank' className='footer_logo'>Boto<img src={logo}/></a> */}
            {/* <span className='footer_links'>
                  <Link title='Ajuda' href='#'>Ajuda</Link>
                  <Link title='Privacidade' href='#'>Privacidade</Link>
                  <Link title='Contribua' href='#'>Contribua</Link>
                </span> */}
          </section>
        </main>
      )}
    </ThemeProvider>
  );
}

export default Popup;
