import React, { useState } from 'react'
import { Button, Icon, Select, TextField, FormControl, HFlow, Radio, VFlow } from 'bold-ui'

const UserForm = ({ 
    userData, // name: '', age: '', hyperopia: false, daltonism: false, autisticOrDislexic: false, predominantHand: 'right'
    setUserData, 
    setFormActive 
}) => {
    
    const [currentStep, setCurrentStep] = useState(0)
    const maximumSteps = 5;

    const increaseStep = () => setCurrentStep(currentStep + 1)
    const decreaseStep = () => setCurrentStep(currentStep - 1)

    const handleChange = (newValue) => (e) => {
        const el = e.target    
        setUserData({
          ...userData,
          [newValue]: el.type === 'checkbox' ? el.checked : el.value,
        })
      }

    return (
        <main className='user-form'>
            <div className='user-form_field'>
                { currentStep == 0 &&
                    <TextField
                        name='name'
                        label='Qual o seu nome?'
                        placeholder='Digite o seu nome'
                        value={userData.name}
                        onChange={handleChange('name')} /> }
                { currentStep == 1 &&
                    <TextField
                        name='age'
                        label='Qual a sua idade?'
                        type='number'
                        placeholder='Digite a sua idade'
                        value={userData.age}
                        onChange={handleChange('age')} /> }
                { currentStep == 2 &&
                    <FormControl label='Você usa óculos para perto (hipermetropia)?'>
                        <VFlow>
                            <Radio name='hyperopia' value='no' label='Não' checked={userData.hyperopia === 'no'} onChange={handleChange('hyperopia')} />
                            <Radio name='hyperopia' value='yes' label='Sim' checked={userData.hyperopia === 'yes'} onChange={handleChange('hyperopia')} />
                        </VFlow>
                    </FormControl> }
                { currentStep == 3 &&
                    <FormControl label='Você possui algum tipo de daltonismo?'>
                        <VFlow>
                            <Radio name='daltonism' value='Não' label='Não' checked={userData.daltonism === 'Não'} onChange={handleChange('daltonism')} />
                            <Radio name='daltonism' value='Protanopia' label='Protanopia' checked={userData.daltonism === 'Protanopia'} onChange={handleChange('daltonism')} />
                            <Radio name='daltonism' value='Deuteranopia' label='Deuteranopia' checked={userData.daltonism === 'Deuteranopia'} onChange={handleChange('daltonism')} />
                            <Radio name='daltonism' value='Tritanopia' label='Tritanopia' checked={userData.daltonism === 'Tritanopia'} onChange={handleChange('daltonism')} />
                        </VFlow>
                    </FormControl> }
                { currentStep == 4 &&
                    <FormControl label='Você possui dislexia ou autismo?'>
                        <VFlow>
                            <Radio name='autisticOrDislexic' value='no' label='Não' checked={userData.autisticOrDislexic === 'no'} onChange={handleChange('autisticOrDislexic')} />
                            <Radio name='autisticOrDislexic' value='yes' label='Sim' checked={userData.autisticOrDislexic === 'yes'} onChange={handleChange('autisticOrDislexic')} />
                        </VFlow>
                    </FormControl> }
                { currentStep == 5 &&
                    <FormControl label='Qual sua mão predominante?'>
                        <VFlow>
                            <Radio name='predominantHand' value='right' label='Direita (destro)' checked={userData.predominantHand === 'right'} onChange={handleChange('predominantHand')} />
                            <Radio name='predominantHand' value='left' label='Esquerda (canhoto)' checked={userData.predominantHand === 'left'} onChange={handleChange('predominantHand')} />
                        </VFlow>
                    </FormControl> }                        
            </div>
            <div className='user-form_footer'>
                <Button size='small' onClick={decreaseStep} disabled={currentStep === 0}>Anterior</Button>
                { currentStep < maximumSteps &&                    
                    <Button kind='primary' skin='outline' size='small' onClick={increaseStep}>Próximo</Button> ||
                    <Button kind='primary' size='small' onClick={() => setFormActive(false)}>Finalizar</Button>
                }
            </div>
        </main>
    )
}
export default UserForm;
