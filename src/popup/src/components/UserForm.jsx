import React, { useState } from 'react'
import { Button, Icon, Select, TextField } from 'bold-ui'
import * as constants from '../utils/Constants'

const UserForm = ({ 
    userData,
    setUserData, 
    setFormActive,
    profileForm
}) => {
    
    const [currentStep, setCurrentStep] = useState(-1)
    const steps = 6;

    const increaseStep = () => setCurrentStep(currentStep + 1)
    const decreaseStep = () => setCurrentStep(currentStep - 1)

    const handleChange = (newValue) => (e) => {
        if (e) {
            const el = e.target ? e.target : e
            setUserData({
                ...userData,
                [newValue]: el.type ? (el.type === 'checkbox' ? el.checked : el.value) : el,
            })
        }
    }

    const handleKeyPress = event => {
        if (event.key === "Enter" || event.key === "NumpadEnter") {
            event.preventDefault()
            if (currentStep < steps-1) {
                increaseStep()
            } else {
                setFormActive(false)
            }
        }
    }

    return (
        !profileForm &&
            <main className='user-form'>
                <Button kind='primary' skin='ghost' size='small' onClick={() => setFormActive(false)} style={{ position: 'absolute', top: '4px', right: '4px' }}>
                    <Icon icon='timesDefault'/>
                </Button>
                { currentStep === -1 && 
                    <>
                        <div className='user-form_welcome'>
                            <h2 className='user-form_welcome-title'>Bem-vindo</h2>
                            <span>Farei algumas rápidas perguntas para te conhecer melhor e definir uma boa configuração inicial para você, tudo bem?</span>
                            <div className='user-form_welcome-buttons'>
                                <Button kind='primary' skin='outline' onClick={() => setFormActive(false)}>Pular</Button>
                                <Button kind='primary' onClick={increaseStep} autoFocus>Iniciar</Button>
                            </div>
                        </div>
                    </>
                }
                { currentStep >= 0 &&
                    <>
                        <div className='user-form_field'>
                            { currentStep == 0 &&
                                <>
                                    <TextField
                                        name='name'
                                        label='Qual o seu nome?'
                                        placeholder='Digite o seu nome'
                                        value={userData.name}
                                        onChange={handleChange('name')}
                                        onKeyPress={handleKeyPress}
                                        autoFocus />
                                    <span class='user-form_field-tip'>O seu nome servirá para eu possa saudá-lo</span>
                                </>
                            }
                            { currentStep == 1 &&
                                <>
                                    <TextField
                                        name='age'
                                        label='Qual a sua idade?'
                                        type='number'
                                        placeholder='Digite a sua idade'
                                        value={userData.age}
                                        onChange={handleChange('age')}
                                        onKeyPress={handleKeyPress}
                                        autoFocus />
                                    <span class='user-form_field-tip'>A sua idade irá influenciar em quanto irei aumentar os elementos da tela e diminuir a quantidade de informação</span>
                                </>        
                            }
                            { currentStep == 2 &&
                                <>
                                    <Select
                                        label='Você possui algum problema para enxergar de perto?'
                                        items={Object.values(constants.sightDeficiencyTypes)}
                                        value={userData.sightDeficiency}
                                        onChange={handleChange('sightDeficiency')}
                                        onKeyPress={handleKeyPress}
                                        itemToString={item => item}
                                        clearable={false}
                                        name='sightDeficiency'
                                        autoFocus />
                                    <span class='user-form_field-tip'>Caso possua alguma deficiência de visão, irei te ajudar ampliando todos os textos e demais elementos</span>
                                </>
                            }
                            { currentStep == 3 &&
                                <>
                                    <Select
                                        label='Você possui dificuldade de mover as mãos ou movimentar os dedos?'
                                        items={Object.values(constants.motorDeficiencyTypes)}
                                        value={userData.motorDeficiency}
                                        onChange={handleChange('motorDeficiency')}
                                        onKeyPress={handleKeyPress}
                                        itemToString={item => item}
                                        clearable={false}
                                        name='motorDeficiency'
                                        autoFocus />
                                    <span class='user-form_field-tip'>Caso possua qualquer dificuldade, mesmo que seja temporária, irei te ajudar realizando cliques automáticamente após 3s com o cursor parado em cima do elemento desejado</span>
                                </>
                            }
                            { currentStep == 4 &&
                                <>
                                    <Select
                                        label='Você possui alguma deficiência cognitiva?'
                                        items={Object.values(constants.cognitiveDeficiencyTypes)}
                                        value={userData.cognitiveDeficiency}
                                        onChange={handleChange('cognitiveDeficiency')}
                                        onKeyPress={handleKeyPress}
                                        itemToString={item => item}
                                        clearable={false}
                                        name='cognitiveDeficiency'
                                        autoFocus />
                                    <span class='user-form_field-tip'>Sei como é difícil navegar em sites cheios de informações com essas condições e irei te ajudar reduzindo-as, além de ampliar o que realmente importa</span>
                                </>
                            }
                            {/* { currentStep == 5 &&
                                <>
                                    <Select
                                        label='Você possui algum tipo de daltonismo?'
                                        items={Object.values(constants.daltonismTypes)}
                                        value={userData.daltonism}
                                        onChange={handleChange('daltonism')}
                                        onKeyPress={handleKeyPress}
                                        itemToString={item => item}
                                        clearable={false}
                                        name='daltonism'
                                        autoFocus />
                                    <span class='user-form_field-tip'>Irei aplicar um filtro de cores especial para você caso possua algum tipo de daltonismo</span>
                                </>
                            } */}
                            { currentStep == 5 &&
                                <>
                                    <Select
                                        label='Qual sua mão predominante?'
                                        items={Object.values(constants.handednessTypes)}
                                        value={userData.handedness}
                                        onChange={handleChange('handedness')}
                                        onKeyPress={handleKeyPress}
                                        itemToString={item => item}
                                        clearable={false}
                                        name='handedness'
                                        autoFocus />
                                    <span class='user-form_field-tip'>Alguns elementos da tela poderão ser adaptados para o lado da sua mão predominante</span>
                                </>
                            }
                        </div>
                        {/* <div className="user-form_stepper">
                            <Stepper>
                                { [...Array(steps).keys()].map(i => (
                                        <Step hasConnector={i !== 0} status={currentStep === i ? 'active' : currentStep > i ? 'completed' : 'incompleted'}></Step>
                                    )) }
                            </Stepper>
                        </div> */}
                        <div className='user-form_footer'>
                            <Button size='small' onClick={decreaseStep} disabled={currentStep === 0}><Icon icon='angleLeft'/>Voltar</Button>
                            <span>{currentStep + 1} / {steps}</span>
                            { currentStep < steps-1 &&
                                <Button kind='primary' skin='outline' size='small' onClick={increaseStep}>Avançar<Icon icon='angleRight'/></Button>
                                ||
                                <Button kind='primary' size='small' onClick={() => setFormActive(false)}>Finalizar<Icon icon='checkDefault'/></Button>
                            }
                        </div>
                    </> 
                }
            </main>
            ||            
            <main className='user-form user-form-profile'>
                <TextField
                    label='Nome'
                    placeholder='Nome'
                    value={userData.name}
                    onChange={handleChange('name')}
                    clearable={false}
                    name='name' />
                <TextField
                    label='Idade'
                    type='number'
                    placeholder='Idade'
                    value={userData.age}
                    onChange={handleChange('age')}
                    clearable={false}
                    name='age' />
                <Select
                    label='Deficiência visual'
                    items={Object.values(constants.sightDeficiencyTypes)}
                    value={userData.sightDeficiency}
                    onChange={handleChange('sightDeficiency')}
                    itemToString={item => item}
                    clearable={false}
                    name='sightDeficiency' />
                <Select
                    label='Deficiência motora (mãos)'
                    items={Object.values(constants.motorDeficiencyTypes)}
                    value={userData.motorDeficiency}
                    onChange={handleChange('motorDeficiency')}
                    itemToString={item => item}
                    clearable={false}
                    name='motorDeficiency' />
                <Select
                    label='Deficiência cognitiva'
                    items={Object.values(constants.cognitiveDeficiencyTypes)}
                    value={userData.cognitiveDeficiency}
                    onChange={handleChange('cognitiveDeficiency')}
                    itemToString={item => item}
                    clearable={false}
                    name='cognitiveDeficiency' /> 
                {/* <Select
                    label='Daltonismo (em desenvolvimento)'
                    items={Object.values(constants.daltonismTypes)}
                    value={userData.daltonism}
                    onChange={handleChange('daltonism')}
                    itemToString={item => item}
                    clearable={false}
                    name='daltonism' /> */}
                <Select
                    label='Mão predominante'
                    items={Object.values(constants.handednessTypes)}
                    value={userData.handedness}
                    onChange={handleChange('handedness')}
                    itemToString={item => item}
                    clearable={false}
                    name='handedness' />
            </main>
    )
}
export default UserForm;
