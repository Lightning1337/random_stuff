import React from 'react';

import { TextField } from '@mui/material';

import { ChromePicker } from 'react-color';

const DEFAULT_CONVERTER = 'rgba_hex';
const converters = {
  rgba: c => `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`,
  rgb: c => `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`,
  hex: c => c.hex,

  rgba_rgb: c => c.rgb.a === 1 ? converters.rgb(c) : converters.rgba(c),
  rgba_hex: c => c.rgb.a === 1 ? converters.hex(c) : converters.rgba(c)
}

const PickerDialog = (props) => {
    return (
    <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', zIndex: '2' }}>
        <div
            style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
            onClick={props.onClick}
        />
        <ChromePicker
            color={props.value}
            onChange={props.onChange}
        />
        </div>
    </div>
    );
}

const ColorPicker = (props) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const [internalValue, setValue] = React.useState("");
    const convert = props.convert || DEFAULT_CONVERTER;

    return (
        <>
            <TextField
                id={props.id}
                label={props.floatingLabelText || props.label}
                placeholder={props.hintText || props.placeholder}
                onClick={() => setShowPicker(true)}
                onChange={e => {
                    setValue(e.target.value)
                    props.onChange(e.target.value)
                }}
                InputProps={{ style: { color: props.value === undefined ? internalValue : props.value } }}
                {...props.TextFieldProps}
                {...props.custom}
            />
            {showPicker && (
            <PickerDialog
                value={props.value === undefined ? internalValue : props.value}
                onClick={() => {
                    setShowPicker(false)
                    props.onChange(props.value)
                }}
                onChange={c => {
                    const newValue = converters[convert](c)
                    setValue(newValue)
                    props.onChange(newValue)
                }}
            />
            )}
        </>
    )
}

export default ColorPicker;
