/*global chrome*/
import React, { useState, useEffect } from 'react'
import { Link, createTheme, colors, ThemeProvider, Icon } from 'bold-ui'
import './popup.sass'
import logo from './assets/boto.png'
import OptionsItem, { OptionsItemTypes } from './components/OptionsItem.jsx'
import UserForm from './components/UserForm'

const botoTheme = createTheme({
    pallete: {
        primaryScale: colors.pink,
        highlightScale: colors.turquoise
    },
})

function Popup() {

    const checkAccessibility = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'checkAccessibility' }, (r) => { 
                console.log('Accessibility check: ', r) })
        })
    }

    useEffect(() => {
        checkAccessibility();
    }, [])
    
    const [userData, setUserData] = useState({
        name: 'Mateus',
        age: null,
        hyperopia: 'no',
        daltonism: 'Não',
        autisticOrDislexic: 'no',
        predominantHand: 'right'
    })

    const [formActive, setFormActive] = useState(false)

    const [contrastValue, setContrastValue] = useState(50)
    const [zoomValue, setZoomValue] = useState(50)
    const [fontSizeValue, setFontSizeValue] = useState(50)
    const [noiseValue, setNoiseValue] = useState('')
    const [daltonismValue, setDaltonismValue] = useState('Não')

    const noiseItems = ['Propagandas', 'Aceitação de "cookies"', 'Imagens']
    const daltonismItems = ['Não', 'Protanopia', 'Deuteranopia', 'Tritanopia']

    useEffect(() => {
        setDaltonismValue(userData.daltonism)
        if(userData.autisticOrDislexic === 'yes')
            setNoiseValue(noiseItems)
        else if(userData.age && userData.age > 60)
            setNoiseValue([noiseItems[0], noiseItems[1]])
    }, [userData])

    const defaultStep = 20;

    return (
        <ThemeProvider theme={botoTheme}>
            { !formActive && 
                <main>
                        <section className='header'>
                            <h1 className='header_greetings'>Olá, <Link href='#' onClick={() => setFormActive(true)}>{userData.name.split(' ')[0]}</Link></h1>
                            <span>Todas as configurações foram personalizadas para você, mas é possível modificá-las abaixo</span>
                            <span className="header_settings-icon material-icons"><Icon icon='gearFilled'/></span>
                        </section>

                        <section className='options'>
                            {/* <h3 className='options_title'>Configurações</h3> */}
                            <OptionsItem label='Contraste' type={OptionsItemTypes.slider} value={contrastValue} valueSetter={setContrastValue} sliderStep={defaultStep} />
                            <OptionsItem label='Zoom' type={OptionsItemTypes.slider} value={zoomValue} valueSetter={setZoomValue} sliderStep={defaultStep} />
                            <OptionsItem label='Fonte' type={OptionsItemTypes.slider} value={fontSizeValue} valueSetter={setFontSizeValue} sliderStep={defaultStep} />
                            <OptionsItem label='Remover ruído' type={OptionsItemTypes.multiselect} value={noiseValue} valueSetter={setNoiseValue} selectItems={noiseItems} />
                            <OptionsItem label='Daltonismo' type={OptionsItemTypes.select} value={daltonismValue} valueSetter={setDaltonismValue} selectItems={daltonismItems} />
                        </section>

                        <section className='footer'>
                            <a href='#' target='_blank' className='footer_logo'>Boto<img src={logo}/></a>
                            <span className='footer_links'>
                                <Link title='Ajuda' href='#'>Ajuda</Link>
                                <Link title='Privacidade' href='#'>Privacidade</Link>
                                <Link title='Contribua' href='#'>Contribua</Link>
                            </span>
                        </section>
                </main>    
            }
            { formActive && <UserForm userData={userData} setUserData={setUserData} setFormActive={setFormActive} />}
        </ThemeProvider>
    );
}

export default Popup