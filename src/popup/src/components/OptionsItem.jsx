import React,  { useState, useEffect } from 'react'
import { Button, Icon, Select } from 'bold-ui'
import { optionsItemTypes } from '../utils/Constants'

const OptionsItem = ({
    label,
    type,
    value,
    displayValueConversor = (value) => value - 50,
    valueSetter,
    sliderStep,
    selectItems,
    minusIcon,
    plusIcon,
    children
}) => {
    
    const decreaseItemValue = () => valueSetter((value - sliderStep) > 0 ? (value - sliderStep) : 0)
    const increaseItemValue = () => valueSetter((value + sliderStep) < 100 ? (value + sliderStep) : 100)

    const [displayValue, setDisplayValue] = useState('padrão')

    useEffect(() => {
        let convertedValue = displayValueConversor(value)
        setDisplayValue(convertedValue === 0 ? 'padrão' : ((convertedValue > 0 ? '+' : '') + convertedValue + '%'))
    }, [value])

    return (
        <div className='options_item'>
            <div className='options_item_title'>
                <span className='options_item_title-name'>{label}</span>
            </div>

            <div className='options_item_value'>
                { type === optionsItemTypes.SLIDER &&
                    <>
                        <div className='options_item_value-slider'>
                            <Button size='small' onClick={e => decreaseItemValue()}><Icon icon={minusIcon || 'minus'}/></Button> 
                            <input type='range' value={parseFloat(value)} onChange={e => valueSetter(parseFloat(e.currentTarget.value))} />
                            <Button size='small' onClick={e => increaseItemValue()}><Icon icon={plusIcon || 'plus'}/></Button>
                        </div>
                        <span className='options_item_value-description'>{displayValue}</span>
                    </>
                }

                { type === optionsItemTypes.SELECT &&
                    <Select items={selectItems} name={label} value={value} clearable={false}
                        onChange={item => valueSetter(item)} 
                        itemToString={item => item} />
                }

                { type === optionsItemTypes.MULTISELECT &&
                    <Select items={selectItems} name={label} value={value} multiple
                        onChange={items => valueSetter(items)} 
                        itemToString={item => item} />
                }

                { type === optionsItemTypes.CUSTOM &&
                    <div className='options_item_value-custom'>
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}
export default OptionsItem;
