import React from 'react'

const OptionsItem = ({
    label,
    value,
    valueSetter,
    auto,
    autoSetter,
    sliderStep
}) => {
    
    const defaultStep = 20;
    const decreaseItemValue = () => valueSetter(value - (sliderStep || defaultStep))
    const increaseItemValue = () => valueSetter(value + (sliderStep || defaultStep))

    return (
        <div className='options_item'>
            <div className='options_item_title'>
                <span className='options_item_title-name'>{label}</span>
                <span className='options_item_title-auto'>
                    <label htmlFor='auto-contrast_checkbox'>Auto</label>
                    <input id='auto-contrast_checkbox' type='checkbox' checked={auto} onChange={e => autoSetter(e.currentTarget.checked)} />
                </span>
            </div>
            <div className='options_slider'>
                <button disabled={auto} onClick={e => decreaseItemValue()}>-</button>
                <input type='range' value={parseFloat(value)} onChange={e => valueSetter(parseFloat(e.currentTarget.value))} disabled={auto} />
                <button disabled={auto} onClick={e => increaseItemValue()}>+</button>
            </div>
        </div>
    )
}
export default OptionsItem;
