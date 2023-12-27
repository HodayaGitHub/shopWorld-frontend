// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
// import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { MultiSelect } from './MultiSelect'
import { toyService } from "../services/toy.service.js"
import { loadLabels } from "../store/actions/toy.actions.js"

export function ToyFilter({ filterBy, onSetFilter, toys }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const [labelsData, setLabelsData] = useState()
    useEffect(() => {
        onSetFilter.current(filterByToEdit)

        loadLabels()
            .then((labels) => {
                setLabelsData(labels)
            })
            .catch((error) => {
                console.error('Error loading labels:', error)
            })

    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (target.type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    let timer;

    document.addEventListener('input', e => {
        const el = e.target;

        if (el.matches('[data-color]')) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                document.documentElement.style.setProperty(`--color-${el.dataset.color}`, el.value);
            }, 100)
        }
    })

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label className="input" htmlFor="name">
                    <input className="input__field"
                        type="text"
                        id="name"
                        name="txt"
                        placeholder="By name"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                    <span class="input__label">Some Fancy Label</span>
                </label>
                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

            </form>
            <MultiSelect
                labelsData={labelsData}
            />
            {/* {console.log('labelsData', labelsData)} */}


            {/* <MultiSelect labelsData={labelsData} /> */}

        </section>
    )
}



