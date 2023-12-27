// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
// import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { MultiSelect } from './MultiSelect'
import { toyService } from "../services/toy.service.js"
import { loadLabels } from "../store/actions/toy.actions.js"
import { Formik, Form, Field } from 'formik'
import { Button, TextField } from '@mui/material'




function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


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
        let { value, name: field, type } = target;
        value = type === 'number' ? +value : value;

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));

        // Invoke the debounced function
        onSetFilter.current(filterByToEdit)
    }


    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>

            <div className="filter-container">


                <Formik
                    initialValues={{
                        txt: '',
                        maxPrice: '',
                    }}
                >
                    <Form className="formik">
                        <Field className="formik-field"
                            id="name"
                            as={CustomInput}
                            name="txt"
                            label="Toy Name"
                            type="text"
                            onChange={handleChange}
                            value={filterByToEdit.txt}
                        />

                        <Field className="formik-field"
                            id="maxPrice"
                            as={CustomInput}
                            name="maxPrice"
                            type="number"
                            label="Max Price"
                            onChange={handleChange}
                            value={filterByToEdit.maxPrice || ''}
                        />
                    </Form>
                </Formik>



                <MultiSelect labelsData={labelsData} handleChange={handleChange} />

            </div>

        </section>
    )
}



