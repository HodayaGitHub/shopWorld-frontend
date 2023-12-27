
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { toyService } from '../services/toy.service'
import { saveToy } from '../../src/store/actions/toy.actions'
import { showErrorMsgRedux, showSuccessMsgRedux } from "../store/actions/app.actions"

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
        const field = ev.target.name
        let value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        if (ev.target.type === 'select-multiple')
            value = Array.from(ev.target.selectedOptions, (option) => option.value)
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }



    function onSaveToy(ev) {
        ev.preventDefault()
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
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Toy's Name</label>
                <input
                    onChange={handleChange}
                    value={toyToEdit.name || ''}
                    type="text"
                    name="name"
                    id="name"
                />

                <label htmlFor="price">Price</label>
                <input
                    onChange={handleChange}
                    value={toyToEdit.price || ''}
                    type="number"
                    name="price"
                    id="price"
                />
                <button type="submit">Save</button>
            </form>
        </section>
    )
}



