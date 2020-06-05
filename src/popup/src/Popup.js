/*global chrome*/
import React, { useState, useEffect } from 'react'
import './popup.sass'
import logo from './assets/boto.png'
import OptionsItem from './components/OptionsItem.tsx'

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

    const [noiseValue, setNoiseValue] = useState(0)
    const [contrastValue, setContrastValue] = useState(0)
    const [zoomValue, setZoomValue] = useState(0)
    const [fontSizeValue, setFontSizeValue] = useState(0)
    const [daltonismValue, setDaltonismValue] = useState(0)

    const [noiseAuto, setNoiseAuto] = useState(true)
    const [contrastAuto, setContrastAuto] = useState(true)
    const [zoomAuto, setZoomAuto] = useState(true)
    const [fontSizeAuto, setFontSizeAuto] = useState(true)
    const [daltonismAuto, setDaltonismAuto] = useState(true)

    return (
        <main>
            <section className='header'>
                <h1 className='header_greetings'>Olá, <a className='header_greetings-name' href='#'>Mateus</a></h1>
                <span className="header_settings-icon material-icons">settings</span>
            </section>
            
            {/* <div style={{'width': '100%', 'margin-top': '10px'}}>
                <input id='ads' type='checkbox'/>
                <label for='ads' style={{'padding-left': '5px'}}>Desativar propagandas <sup>?</sup></label>
            </div>
            <div style={{'width': '100%'}}>
                <input id='cookies' type='checkbox'/>
                <label for='cookies' style={{'padding-left': '5px'}}>Desativar popups de Cookies <sup>?</sup></label>
            </div> */}

            {/* <input id='onoff_checkbox' type='checkbox' /> */}
            <section className='options'>
                <h3 className='options_title'>Configurações</h3>
                <OptionsItem label='Remover ruído' value={noiseValue} valueSetter={setNoiseValue} auto={noiseAuto} autoSetter={setNoiseAuto} />
                <OptionsItem label='Contraste' value={contrastValue} valueSetter={setContrastValue} auto={contrastAuto} autoSetter={setContrastAuto} />
                <OptionsItem label='Zoom' value={zoomValue} valueSetter={setZoomValue} auto={zoomAuto} autoSetter={setZoomAuto} />
                <OptionsItem label='Fonte' value={fontSizeValue} valueSetter={setFontSizeValue} auto={fontSizeAuto} autoSetter={setFontSizeAuto} />
                <OptionsItem label='Daltonismo' value={daltonismValue} valueSetter={setDaltonismValue} auto={daltonismAuto} autoSetter={setDaltonismAuto} />
            </section>

            <section className='footer'>
                <a href='#' target='_blank' className='footer_logo'>Boto<img src={logo}/></a>
                <span className='footer_links'>
                    <a href='#'>Ajuda</a>
                    <a href='#'>Privacidade</a>
                    <a href='#'>Contribua</a>
                </span>
            </section>
        </main>
    );
}

export default Popup