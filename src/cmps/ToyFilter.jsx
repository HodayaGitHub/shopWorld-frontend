// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
// import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { MultiSelect } from './MultiSelect'
// import {SortByForm} from './SortByForm'

import { toyService } from "../services/toy.service.js"
import { loadLabels } from "../store/actions/toy.actions.js"
import { Formik, Form, Field } from 'formik'
import { Button, Select, InputLabel, TextField } from '@mui/material'


function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function ToyFilter({ filterBy, onSetFilter, toys }) {

    const [labelsData, setLabelsData] = useState()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

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

        // inputs in html are strings, if the type is number convert it to number
        value = (type === 'number') ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        // Invoke the debounced function
        onSetFilter.current(filterByToEdit)
    }


    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>

            <div className="filter-container">

                <div>
                    <Formik
                        initialValues={{
                            txt: '',
                            maxPrice: '',
                            selectedLabel: '',
                        }}
                    >
                        <Form className="formik">
                            <Field className="formik-field-filter"
                                id="name"
                                as={CustomInput}
                                name="txt"
                                label="Toy Name"
                                type="text"
                                onChange={handleChange}
                                value={filterByToEdit.txt}
                            />

                            <Field className="formik-field-filter"
                                id="maxPrice"
                                as={CustomInput}
                                name="maxPrice"
                                type="number"
                                label="Max Price"
                                onChange={handleChange}
                                value={filterByToEdit.maxPrice || ''}
                            />
                            {/* 
                            <Field
                                // className="formik-field-filter"
                                id="sortby"
                                as={Select}
                                name="sortBy"
                                // label="Sort By"
                                onChange={handleChange}
                                value={"minPrice"}
                            // placeholder="Email"

                            >
                                <option value="minPrice">Sort by Min Price</option>
                                <option value="maxPrice">Sort by Max Price</option>


                            </Field> */}

                        </Form>
                    </Formik>
                </div>
                {/* <SortByForm></SortByForm> */}
                <MultiSelect labelsData={labelsData} handleChange={handleChange} />

            </div>


        </section>
    )
}



