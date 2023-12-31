import React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useRef, useState } from "react"


export function MultiSelect({ labelsData, handleChange}) {
    const theme = useTheme()
    const [LableName, setLabelName] = React.useState([])


    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    function test(event) {
        const value = [...event.target.value]
        
        setLabelName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
        
        const target = { ...event.target, type: 'array'}
        handleChange({ target })
    }

    function getStyles(label, labelName, theme) {
        return {
            fontWeight:
                labelName.indexOf(label) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
    }

    return (
        <FormControl className="labels-filter" sx={{ m: 1, flexGrow: 1, maxWidth: '500px'}}>
            <InputLabel id="name-label">Labels</InputLabel>
            <Select 
                labelId="name-label"
                id="multiple-label"
                name="labels"
                multiple
                value={LableName}
                onChange={test}
                input={<OutlinedInput label="Labels" />}
                MenuProps={MenuProps}
            >
                {labelsData && (
                    labelsData.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                            style={getStyles(label, LableName, theme)}
                        >
                            {label}
                        </MenuItem>
                    ))
                )}


            </Select>


        
        </FormControl>
    )
}

