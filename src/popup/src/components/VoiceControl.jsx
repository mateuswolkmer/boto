import React, { useState } from 'react';
import voiceIcon from '../assets/voiceListen.gif';
import expandIcon from '../assets/down-arrow-color.png';
import retractIcon from '../assets/up-arrow-color.png';
import { valuesTreatment } from '../utils/valuesTreatment';
import * as constants from '../utils/Constants';
import { errorTreatment } from '../utils/errorTreatment';
import { Icon } from 'bold-ui';

export const VoiceControl = (props) => {
  const [visible, setVisible] = useState(false);
  const [defaultInteraction, setDefaultInteraction] = useState(true);
  const [voiceActiveInteraction, setVoiceActiveInteraction] = useState(false);
  const [showCommandInteraction, setShowCommandInteraction] = useState(false);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [command, setCommand] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [alertVisibility, setAlertVisibility] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
    props.setIsVoiceControlActive(!visible);
  };

  const startRecognition = () => {
    recognition.start();
    valuesTreatment('');
    setShowCommandInteraction(false);
    setDefaultInteraction(false);
    setShowWaitingMessage(true);
    setTimeout(() => {
      setShowWaitingMessage(false);
      setVoiceActiveInteraction(true);
    }, 1000);
  };
  const stopRecognition = () => {
    recognition.stop();
    setVoiceActiveInteraction(false);
    setShowCommandInteraction(true);
    setTimeout(() => {
      setShowCommandInteraction(false);
      setDefaultInteraction(true);
    }, 5000);
    valuesTreatment('');
  };

  const speechRecognitionStarter = () => {
    const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = speechRecognition !== undefined ? new speechRecognition() : null;

    if (!recognition) {
      return null;
    }

    recognition.lang = 'pt_BR';

    recognition.onstart = () => {
      setCommand('');
    };

    recognition.onerror = (e) => {
      setDefaultInteraction(true);
      setShowCommandInteraction(false);
      setVoiceActiveInteraction(false);
      setErrorMsg(errorTreatment(e.error));
      if (e.error !== 'no-speech') setAlertVisibility(true);
      setTimeout(() => {
        if (e.error === 'not-allowed') {
          stopRecognition();
          setShowCommandInteraction(false);
        }
        setAlertVisibility(false);
        setErrorMsg('');
      }, 3000);
    };
    recognition.onresult = (res) => {
      setCommand(res.results[0][0].transcript);
      const { type, element, value } = valuesTreatment(res.results[0][0].transcript);
      updateSettings(type, element, value);
    };

    return recognition;
  };

  const updateSettings = (voiceType, voiceElement, voiceValue) => {
    parseFloat(voiceValue);

    if (voiceType === 'aumentar' && voiceElement === 'contraste')
      props.setContrastValue(props.contrastValue + voiceValue / 2);
    if (voiceType === 'diminuir' && voiceElement === 'contraste')
      props.setContrastValue(props.contrastValue - voiceValue / 2);
    if (voiceType === 'aumentar' && voiceElement === 'brilho')
      props.setBrightnessValue(props.brightnessValue + voiceValue / 2);
    if (voiceType === 'diminuir' && voiceElement === 'brilho')
      props.setBrightnessValue(props.brightnessValue - voiceValue / 2);
    if (voiceType === 'aumentar' && voiceElement === 'zoom')
      props.setZoomValue(props.zoomValue + voiceValue / 2);
    if (voiceType === 'diminuir' && voiceElement === 'zoom')
      props.setZoomValue(props.zoomValue - voiceValue / 2);
    if (voiceType === 'aumentar' && voiceElement === 'espaçamento')
      props.setFontSizeValue(props.fontSizeValue + voiceValue);
    if (voiceType === 'diminuir' && voiceElement === 'espaçamento')
      props.setFontSizeValue(props.fontSizeValue - voiceValue);

    if (voiceType === 'esconder' && voiceElement === 'imagens') {
      if (['Imagens'].includes(props.noiseValue)) {
        return null;
      } else {
        props.setNoiseValue((prevArray) => [...prevArray, 'Imagens']);
      }
    }
    if (voiceType === 'mostrar' && voiceElement === 'imagens') {
      props.setNoiseValue((prevArray) => prevArray.filter((item) => item !== 'Imagens'));
    }
    if (voiceType === 'esconder' && voiceElement === 'propagandas') {
      if (['Propagandas'].includes(props.noiseValue)) {
        return null;
      } else {
        props.setNoiseValue((prevArray) => [...prevArray, 'Propagandas']);
      }
    }
    if (voiceType === 'mostrar' && voiceElement === 'propagandas') {
      props.setNoiseValue((prevArray) => prevArray.filter((item) => item !== 'Propagandas'));
    }

    if (voiceElement === 'interface') props.setActiveTab(constants.tabs.INTERFACE);
    if (voiceElement === 'perfil') props.setActiveTab(constants.tabs.PROFILE);
    if (voiceElement === 'extras') props.setActiveTab(constants.tabs.EXTENSION);

    if (voiceType === 'marcar' && voiceElement === 'primeira') props.setAutoFixElementsValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'primeira')
      props.setAutoFixElementsValue(false);
    if (voiceType === 'marcar' && voiceElement === 'segunda') props.setAutoClickOnHoverValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'segunda')
      props.setAutoClickOnHoverValue(false);
    if (voiceType === 'marcar' && voiceElement === 'terceira')
      props.setTurnExtensionBiggerValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'terceira')
      props.setTurnExtensionBiggerValue(false);
    if (voiceType === 'marcar' && voiceElement === 'quarta') props.setAcceptCookiesValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'quarta') props.setAcceptCookiesValue(false);
    if (voiceType === 'restaurar' && voiceElement === 'configurações')
      props.resetDefaultSettingsProfile();

    if (voiceType === 'nome')
      props.setUserData({
        ...props.userData,
        name: voiceElement
      });

    if (voiceType === 'idade')
      props.setUserData({
        ...props.userData,
        age: voiceValue
      });

    if (voiceType === 'deficiência visual' && ['Não', 'Pouco', 'Bastante'].includes(voiceElement))
      props.setUserData({
        ...props.userData,
        sightDeficiency: voiceElement
      });

    if (voiceType === 'deficiência motora' && ['Não', 'Leve', 'Severa'].includes(voiceElement))
      props.setUserData({
        ...props.userData,
        motorDeficiency: voiceElement
      });

    if (voiceType === 'deficiência cognitiva' && ['Não', 'Leve', 'Severa'].includes(voiceElement))
      props.setUserData({
        ...props.userData,
        cognitiveDeficiency: voiceElement
      });

    if (voiceType === 'mão predominante' && (voiceElement === 'Esquerda' || 'Direita'))
      props.setUserData({
        ...props.userData,
        handedness: voiceElement
      });

    if (
      voiceType === 'daltonismo' &&
      ['Protanopia', 'Deuteranopia', 'Tritanopia', 'Não'].includes(voiceElement)
    )
      props.setUserData({
        ...props.userData,
        daltonism: voiceElement
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
      setMicActive(!micActive);
      if (!micActive) startRecognition();
      else stopRecognition();
    }
    document.removeEventListener('keypress', handleKeyDown);
  };

  document.addEventListener('keypress', handleKeyDown);

  const recognition = speechRecognitionStarter();

  const handleDefaultInteraction = () => {
    setDefaultInteraction(true);
    setShowWaitingMessage(false);
    setVoiceActiveInteraction(false);
    setShowCommandInteraction(false);
  };

  return (
    <>
      <div
        className="alert"
        style={{ display: alertVisibility ? 'block' : 'none' }}>
        <div className="alert-text">
          <p>
            <Icon icon="exclamationTriangleOutline" />
            <b> ERRO: </b>
          </p>
          <p>{errorMsg}</p>
        </div>
      </div>
      <div className={visible ? 'voice-control-expanded' : 'voice-control'}>
        <div
          className="expand"
          onClick={changeVisibility}>
          {visible ? (
            <img
              src={retractIcon}
              alt="expand"
            />
          ) : (
            <img
              src={expandIcon}
              alt="retract"
            />
          )}
          <p> Controle de Voz </p>
        </div>

        {visible && (
          <>
            <div className="voice-control-buttons">
              <button onClick={startRecognition}> Iniciar </button>
              <button onClick={stopRecognition}> Parar </button>
            </div>
            <div className="voice-control-interaction">
              {defaultInteraction &&
                !showWaitingMessage &&
                !voiceActiveInteraction &&
                !showCommandInteraction && (
                  <div>
                    <p>
                      Aperte <b>Iniciar/Parar</b> ou <b>'Barra de Espaço'</b> para ativar e
                      desativar.
                    </p>
                  </div>
                )}
              {showWaitingMessage && !voiceActiveInteraction && (
                <div>
                  <p> Aguarde ... </p>
                </div>
              )}
              {voiceActiveInteraction && (
                <div>
                  <img
                    src={voiceIcon}
                    alt="voice"
                  />
                  <p> Ouvindo ... </p>
                </div>
              )}
              {showCommandInteraction && (
                <div>
                  <p className="command-title"> Comando: </p>
                  <p style={{ fontWeight: 300 }}> {command} </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default VoiceControl;
