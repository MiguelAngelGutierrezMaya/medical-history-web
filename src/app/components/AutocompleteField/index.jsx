/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CustomTextField } from './style';

export const AutocompleteField = ({ props, value, label, disabled, setValueItem }) => {
    return (
        <Autocomplete
            {...props}
            disabled={disabled}
            value={value}
            onChange={(event, newValue) => {
                setValueItem(newValue);
            }}
            renderInput={(params) => <CustomTextField {...params} label={label} />}
        />
    );
}
