
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { toyService } from '../services/toy.service'
import { saveToy } from '../../src/store/actions/toy.actions'
import { showErrorMsgRedux, showSuccessMsgRedux } from "../store/actions/app.actions"

import { Formik, Form, Field } from 'formik'
import { Button, TextField } from '@mui/material'
import * as Yup from 'yup'

function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) {
            loadToy()
        }
    }, [params.toyId])


    function loadToy() {
        toyService.getById(params.toyId)
            .then((toy) => {
                setToyToEdit(toy)
            })
            .catch(err => console.log('err:', err))
    }
    function handleChange(ev) {
        const { name, value, type, selectedOptions } = ev.target;
        const newValue =
            type === 'number'
                ? parseFloat(value)
                : type === 'select-multiple'
                    ? Array.from(selectedOptions, (option) => option.value)
                    : value;

        setToyToEdit((prevToy) => ({
            ...prevToy,
            [name]: newValue,
        }))
    }


    function onSaveToy() {
        // ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsgRedux('Toy saved successfully')
                navigate('/toy')
            })
            .catch((err) => {
                showErrorMsgRedux(`Error while trying to save toy, err`)
            })
    }



    return (
        <section className="toy-edit">
            <h1>Edit Toy</h1>

            <Formik
                initialValues={{
                    txt: '',
                    maxPrice: '',
                }}
                onSubmit={onSaveToy}
            >

                <Form className="formik">
                    <Field className="formik-field-edit"
                        id="name"
                        as={CustomInput}
                        name="name"
                        label="Toy's Name"
                        type="text"
                        onChange={handleChange}
                        value={toyToEdit.name || ''}
                    />

                    <Field className="formik-field"
                        id="price"
                        as={CustomInput}
                        name="price"
                        label="Max Price"
                        type="number"
                        onChange={handleChange}
                        value={toyToEdit.price || ''}
                    />
                    <Button type="submit" variant="contained">save</Button>
                </Form>
            </Formik>
        </section>
    )
}



