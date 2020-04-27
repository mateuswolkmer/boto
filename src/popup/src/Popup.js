/*global chrome*/
import React, { useState, useEffect } from 'react'
import './popup.sass'

function Popup() {
    const [autoContrast, setAutoContrast] = useState(true)
    const [contrastValue, setContrastValue] = useState(0)

    const [autoBrightness, setAutoBrightness] = useState(true)
    const [brightnessValue, setBrightnessValue] = useState(0)

    const checkAccessibility = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'checkAccessibility' }, (r) => { console.log('callback from react: ', r) })
        })
    }

    useEffect(() => {
        if (contrastValue < 0) setContrastValue(0)
        else if (contrastValue > 100) setContrastValue(100)
        if (brightnessValue < 0) setBrightnessValue(0)
        else if (brightnessValue > 100) setBrightnessValue(100)
    }, [contrastValue, brightnessValue])

    return (
        <main>
            <section className='header'>
                <h1 className='header_title'>Boto</h1>
                <small className='header_subtitle'>v0.1</small>
            </section>
            <button onClick={checkAccessibility}>Checar acessibilidade</button>
            <input id='onoff_checkbox' type='checkbox' />
            <section className='options'>
                <div className='options_item'>
                    <span>Contraste</span>
                    <div className='options_slider'>
                        <input type='checkbox' checked={autoContrast} onChange={e => setAutoContrast(e.currentTarget.checked)} />
                        <input type='number' value={parseFloat(contrastValue)} onChange={e => setContrastValue(e.currentTarget.value)} disabled={autoContrast} />
                    </div>
                </div>
                <div className='options_item'>
                    <span>Brilho</span>
                    <div className='options_slider'>
                        <input type='checkbox' checked={autoBrightness} onChange={e => setAutoBrightness(e.currentTarget.checked)} />
                        <input type='number' value={parseFloat(brightnessValue)} onChange={e => setBrightnessValue(e.currentTarget.value)} disabled={autoBrightness} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Popup