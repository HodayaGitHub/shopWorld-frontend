import React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useRef, useState } from "react"


export function MultiSelect({ labelsData }) {
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

    function handleChange(event) {

        const {
            target: { value, type },
        } = event
        console.log('value:', value);

        console.log('Type:', type);

        setLabelName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
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
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="name-label">Labels</InputLabel>
                <Select
                    labelId="name-label"
                    id="multiple-label"
                    multiple
                    value={LableName}
                    onChange={handleChange}
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
        </div>
    )
}

