import React, { useEffect, useState } from 'react';
import voiceIcon from '../assets/voiceListen.gif';
import expandIcon from '../assets/down-arrow-color.png';
import retractIcon from '../assets/up-arrow-color.png';
import { valuesTreatment } from '../utils/valuesTreatment';
import * as constants from '../utils/Constants';

export const VoiceControl = (props) => {
  const [visible, setVisible] = useState(false);
  const [defaultInteraction, setDefaultInteraction] = useState(true);
  const [voiceActiveInteraction, setVoiceActiveInteraction] = useState(false);
  const [showCommandInteraction, setShowCommandInteraction] = useState(false);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [command, setCommand] = useState('');
  const [micActive, setMicActive] = useState(false);
  const noiseItens = [];

  const changeVisibility = () => {
    setVisible(!visible);
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
      alert(`error: ${e.error}`);
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
    voiceValue = voiceValue / 2;

    if (voiceType === 'aumentar' && voiceElement === 'contraste')
      props.setContrastValue(props.contrastValue + voiceValue);
    if (voiceType === 'diminuir' && voiceElement === 'contraste')
      props.setContrastValue(props.contrastValue - voiceValue);
    if (voiceType === 'aumentar' && voiceElement === 'brilho')
      props.setBrightnessValue(props.brightnessValue + voiceValue);
    if (voiceType === 'diminuir' && voiceElement === 'brilho')
      props.setBrightnessValue(props.brightnessValue - voiceValue);
    if (voiceType === 'aumentar' && voiceElement === 'zoom')
      props.setZoomValue(props.zoomValue + voiceValue);
    if (voiceType === 'diminuir' && voiceElement === 'zoom')
      props.setZoomValue(props.zoomValue - voiceValue);
    if (voiceType === 'aumentar' && voiceElement === 'espaçamento')
      props.setFontSizeValue(props.fontSizeValue + voiceValue * 2);
    if (voiceType === 'diminuir' && voiceElement === 'espaçamento')
      props.setFontSizeValue(props.fontSizeValue - voiceValue * 2);

    if (voiceType === 'esconder' && voiceElement === 'imagens') {
      noiseItens.push('Imagens');
      props.setNoiseValue(noiseItens);
    }
    if (voiceType === 'mostrar' && voiceElement === 'imagens') {
      const index = noiseItens.indexOf('Imagens');
      if (index !== -1) noiseItens.splice(index, 1);
      props.setNoiseValue(noiseItens);
    }
    if (voiceType === 'esconder' && voiceElement === 'propagandas') {
      noiseItens.push('Propagandas');
      props.setNoiseValue(noiseItens);
    }
    if (voiceType === 'mostrar' && voiceElement === 'propagandas') {
      const index = noiseItens.indexOf('Propagandas');
      if (index !== -1) noiseItens.splice(index, 1);
      props.setNoiseValue(noiseItens);
    }

    if (voiceType === 'mudar' && voiceElement === 'interface')
      props.setActiveTab(constants.tabs.INTERFACE);
    if (voiceType === 'mudar' && voiceElement === 'perfil')
      props.setActiveTab(constants.tabs.PROFILE);
    if (voiceType === 'mudar' && voiceElement === 'extras')
      props.setActiveTab(constants.tabs.EXTENSION);

    if (voiceType === 'marcar' && voiceElement === 'primeira opção')
      props.setAutoFixElementsValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'primeira opção')
      props.setAutoFixElementsValue(false);
    if (voiceType === 'marcar' && voiceElement === 'segunda opção')
      props.setAutoClickOnHoverValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'segunda opção')
      props.setAutoClickOnHoverValue(false);
    if (voiceType === 'marcar' && voiceElement === 'terceira opção')
      props.setTurnExtensionBiggerValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'terceira opção')
      props.setTurnExtensionBiggerValue(false);
    if (voiceType === 'marcar' && voiceElement === 'quarta opção')
      props.setAcceptCookiesValue(true);
    if (voiceType === 'desmarcar' && voiceElement === 'quarta opção')
      props.setAcceptCookiesValue(false);

    if (voiceType === 'nome')
      props.setUserData({
        ...props.userData,
        name: voiceElement
      });

    if (voiceType === 'idade')
      props.setUserData({
        ...props.userData,
        age: voiceValue * 2
      });

    if (voiceType === 'deficiência visual' && (voiceElement === 'Não' || 'Pouco' || 'Bastante'))
      props.setUserData({
        ...props.userData,
        sightDeficiency: voiceElement
      });

    if (voiceType === 'deficiência motora' && (voiceElement === 'Não' || 'Leve' || 'Severa'))
      props.setUserData({
        ...props.userData,
        motorDeficiency: voiceElement
      });

    if (voiceType === 'deficiência cognitiva' && (voiceElement === 'Não' || 'Leve' || 'Severa'))
      props.setUserData({
        ...props.userData,
        cognitiveDeficiency: voiceElement
      });

    if (
      voiceType === 'mão predominante' &&
      (voiceElement === 'Esquerda (canhoto)' || 'Direita (destro)')
    )
      props.setUserData({
        ...props.userData,
        handedness: voiceElement
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        setMicActive(!micActive);
        if (!micActive) startRecognition();
        else stopRecognition();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [micActive]);

  const recognition = speechRecognitionStarter();

  return (
    <>
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
              <button onClick={startRecognition}> Start </button>
              <button onClick={stopRecognition}> Stop </button>
            </div>
            <div className="voice-control-interaction">
              {defaultInteraction &&
                !showWaitingMessage &&
                !voiceActiveInteraction &&
                !showCommandInteraction && (
                  <div>
                    <p>
                      Aperte <b>Start/Stop</b> ou <b>'Barra de Espaço'</b> para ativar e desativar.
                    </p>
                  </div>
                )}
              {showWaitingMessage && (
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
