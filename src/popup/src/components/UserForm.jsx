import React, { useState } from 'react';
import { Button, Icon, Select, TextField } from 'bold-ui';
import * as constants from '../utils/Constants';
import { handleSelectLabel } from '../utils/handleSelectLabel';

const UserForm = ({ userData, setUserData, setFormActive, profileForm, isVoiceControlActive }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const steps = 6;

  const increaseStep = () => setCurrentStep(currentStep + 1);
  const decreaseStep = () => setCurrentStep(currentStep - 1);

  const handleChange = (newValue) => (e) => {
    if (e) {
      const el = e.target ? e.target : e;
      setUserData({
        ...userData,
        [newValue]: el.type ? (el.type === 'checkbox' ? el.checked : el.value) : el
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      event.preventDefault();
      if (currentStep < steps - 1) {
        increaseStep();
      } else {
        setFormActive(false);
      }
    }
  };

  return (
    (!profileForm && (
      <main className="user-form">
        <Button
          kind="primary"
          skin="ghost"
          size="small"
          onClick={() => setFormActive(false)}
          style={{ position: 'absolute', top: '4px', right: '4px' }}>
          <Icon icon="timesDefault" />
        </Button>
        {currentStep === -1 && (
          <>
            <div className="user-form_welcome">
              <h2 className="user-form_welcome-title">Bem-vindo</h2>
              <span>
                Farei algumas rápidas perguntas para te conhecer melhor e definir uma boa
                configuração inicial para você, tudo bem?
              </span>
              <div className="user-form_welcome-buttons">
                <Button
                  kind="primary"
                  skin="outline"
                  onClick={() => setFormActive(false)}>
                  Pular
                </Button>
                <Button
                  kind="primary"
                  onClick={increaseStep}
                  autoFocus>
                  Iniciar
                </Button>
              </div>
            </div>
          </>
        )}
        {currentStep >= 0 && (
          <>
            <div className="user-form_field">
              {currentStep === 0 && (
                <>
                  <TextField
                    name="name"
                    label="Qual o seu nome?"
                    placeholder="Digite o seu nome."
                    value={userData.name}
                    onChange={handleChange('name')}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <span class="user-form_field-tip">
                    O seu nome servirá para que eu possa saudá-lo
                  </span>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <TextField
                    name="age"
                    label="Qual a sua idade?"
                    type="number"
                    placeholder="Digite a sua idade."
                    value={userData.age}
                    onChange={handleChange('age')}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <span class="user-form_field-tip">
                    A sua idade irá influenciar em quanto irei aumentar os elementos da tela e
                    diminuir a quantidade de informação
                  </span>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <Select
                    label="Você possui algum problema para enxergar de perto?"
                    items={Object.values(constants.sightDeficiencyTypes)}
                    value={userData.sightDeficiency}
                    onChange={handleChange('sightDeficiency')}
                    onKeyPress={handleKeyPress}
                    itemToString={(item) => item}
                    clearable={false}
                    name="sightDeficiency"
                  />
                  <span class="user-form_field-tip">
                    Caso possua alguma deficiência de visão, irei te ajudar ampliando todos os
                    textos e demais elementos
                  </span>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Select
                    label="Você possui dificuldade para movimentar as mãos ou os dedos?"
                    items={Object.values(constants.motorDeficiencyTypes)}
                    value={userData.motorDeficiency}
                    onChange={handleChange('motorDeficiency')}
                    onKeyPress={handleKeyPress}
                    itemToString={(item) => item}
                    clearable={false}
                    name="motorDeficiency"
                  />
                  <span class="user-form_field-tip">
                    Se possui dificuldade, mesmo temporária, irei te ajudar realizando cliques
                    automaticamente após 3s com o mouse parado em cima do elemento desejado
                  </span>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <Select
                    label="Você possui alguma deficiência cognitiva?"
                    items={Object.values(constants.cognitiveDeficiencyTypes)}
                    value={userData.cognitiveDeficiency}
                    onChange={handleChange('cognitiveDeficiency')}
                    onKeyPress={handleKeyPress}
                    itemToString={(item) => item}
                    clearable={false}
                    name="cognitiveDeficiency"
                  />
                  <span class="user-form_field-tip">
                    Sei como é difícil navegar em sites cheios de informações com essas condições e
                    irei te ajudar reduzindo-as, além de ampliar o que realmente importa
                  </span>
                </>
              )}
              {currentStep === 5 && (
                <>
                  <Select
                    label="Você possui algum tipo de daltonismo?"
                    items={Object.values(constants.daltonismTypes)}
                    value={userData.daltonism}
                    onChange={handleChange('daltonism')}
                    onKeyPress={handleKeyPress}
                    itemToString={(item) => item}
                    clearable={false}
                    name="daltonism"
                  />
                  <span class="user-form_field-tip">
                    Irei aplicar um filtro de cores especial para você caso possua algum tipo de
                    daltonismo
                  </span>
                </>
              )}
              {currentStep === 6 && (
                <>
                  <Select
                    label="Qual sua mão predominante?"
                    items={Object.values(constants.handednessTypes)}
                    value={userData.handedness}
                    onChange={handleChange('handedness')}
                    onKeyPress={handleKeyPress}
                    itemToString={(item) => item}
                    clearable={false}
                    name="handedness"
                  />
                  <span class="user-form_field-tip">
                    Alguns elementos da tela poderão ser adaptados para o lado da sua mão
                    predominante
                  </span>
                </>
              )}
            </div>
            {/* <div className="user-form_stepper">
                            <Stepper>
                                { [...Array(steps).keys()].map(i => (
                                        <Step hasConnector={i !== 0} status={currentStep === i ? 'active' : currentStep > i ? 'completed' : 'incompleted'}></Step>
                                    )) }
                            </Stepper>
                        </div> */}
            <div className="user-form_footer">
              <Button
                size="small"
                onClick={decreaseStep}
                disabled={currentStep === 0}>
                <Icon icon="angleLeft" />
                Voltar
              </Button>
              <span>
                {currentStep + 1} / {steps}
              </span>
              {(currentStep < steps - 1 && (
                <Button
                  kind="primary"
                  skin="outline"
                  size="small"
                  onClick={increaseStep}>
                  Avançar
                  <Icon icon="angleRight" />
                </Button>
              )) || (
                <Button
                  kind="primary"
                  size="small"
                  onClick={() => setFormActive(false)}>
                  Finalizar
                  <Icon icon="checkDefault" />
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    )) || (
      <main className="user-form user-form-profile">
        <TextField
          label="Nome"
          placeholder={isVoiceControlActive ? 'Fale "nome" + seu nome' : 'Digite o seu nome'}
          value={userData.name}
          onChange={handleChange('name')}
          clearable={false}
          name="name"
        />
        <TextField
          label="Idade"
          type="number"
          placeholder={isVoiceControlActive ? 'Fale "idade" + sua idade' : 'Digite a sua idade'}
          value={userData.age}
          onChange={handleChange('age')}
          clearable={false}
          name="age"
        />
        <Select
          label={handleSelectLabel('sight', isVoiceControlActive)}
          items={Object.values(constants.sightDeficiencyTypes)}
          value={userData.sightDeficiency}
          onChange={handleChange('sightDeficiency')}
          itemToString={(item) => item}
          clearable={false}
          name="sightDeficiency"
        />
        <Select
          label={handleSelectLabel('motor', isVoiceControlActive)}
          items={Object.values(constants.motorDeficiencyTypes)}
          value={userData.motorDeficiency}
          onChange={handleChange('motorDeficiency')}
          itemToString={(item) => item}
          clearable={false}
          name="motorDeficiency"
        />
        <Select
          label={handleSelectLabel('cognitive', isVoiceControlActive)}
          items={Object.values(constants.cognitiveDeficiencyTypes)}
          value={userData.cognitiveDeficiency}
          onChange={handleChange('cognitiveDeficiency')}
          itemToString={(item) => item}
          clearable={false}
          name="cognitiveDeficiency"
        />
        <Select
          label={handleSelectLabel('daltonism', isVoiceControlActive)}
          items={Object.values(constants.daltonismTypes)}
          value={userData.daltonism}
          onChange={handleChange('daltonism')}
          itemToString={(item) => item}
          clearable={false}
          name="daltonism"
        />
        <Select
          label={handleSelectLabel('handedness', isVoiceControlActive)}
          items={Object.values(constants.handednessTypes)}
          value={userData.handedness}
          onChange={handleChange('handedness')}
          itemToString={(item) => item}
          clearable={false}
          name="handedness"
        />
      </main>
    )
  );
};
export default UserForm;
