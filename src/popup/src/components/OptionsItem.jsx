import React,  { useState, useEffect } from 'react'
import { Button, Icon, Select } from 'bold-ui'

export const OptionsItemTypes = { slider: 'slider', select: 'select', multiselect: 'multiselect' }

const OptionsItem = ({
    label,
    type,
    value,
    valueSetter,
    sliderStep,
    selectItems
}) => {
    
    const decreaseItemValue = () => valueSetter((value - sliderStep) > 0 ? (value - sliderStep) : 0)
    const increaseItemValue = () => valueSetter((value + sliderStep) < 100 ? (value + sliderStep) : 100)

    const [displayValue, setDisplayValue] = useState(value)

    useEffect(() => {
        let realValue = value - 50;
        setDisplayValue((realValue > 0 ? '+' : '') + realValue)
    }, [value])

    return (
        <div className='options_item'>
            <div className='options_item_title'>
                <span className='options_item_title-name'>{label}</span>
                {/* <span className='options_item_title-auto'>
                    <Checkbox id={'auto-' + id + '_checkbox'} type='checkbox' checked={auto} onChange={e => autoSetter(e.currentTarget.checked)} label='Automático' />
                </span> */}
            </div>
            { type === OptionsItemTypes.slider &&
                <div className='options_item_value'>
                    <div className='options_item_value-slider'>
                        <Button size='small' onClick={e => decreaseItemValue()}><Icon icon='minus'/></Button> 
                        <input type='range' value={parseFloat(value)} onChange={e => valueSetter(parseFloat(e.currentTarget.value))} />
                        <Button size='small' onClick={e => increaseItemValue()}><Icon icon='plus'/></Button>
                    </div>
                    <span className='options_item_value-description'>{displayValue}</span>
                </div>
            }
            { type === OptionsItemTypes.select &&
                <div className='options_item_value'>
                    <Select items={selectItems} name={label} value={value} onChange={item => valueSetter(item)} itemToString={item => item} clearable={false} />
                </div>
            }
            { type === OptionsItemTypes.multiselect &&
                <div className='options_item_value'>
                    <Select items={selectItems} name={label} value={value} onChange={items => valueSetter(items)} itemToString={item => item} multiple />
                </div>
            }
        </div>
    )
}
export default OptionsItem;
