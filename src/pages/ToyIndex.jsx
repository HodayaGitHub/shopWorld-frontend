import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service'
import { ToyList } from '../cmps/ToyList'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const navigate = useNavigate()

    useEffect(() => {
        // console.log(toys)
        loadToys()
            .catch(() => {
                showErrorMsgRedux('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsgRedux(`Removed item with ${toyId} id successfuly`)
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsgRedux(`Cannot remove toy`)
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('savedToy:', savedToy)
                showSuccessMsgRedux(`Toy added (name: ${savedToy.name})`)

            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsgReduxMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        navigate(`/toy/${toy._id}`)
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsgRedux('Added to Cart')
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading &&
                    <ToyList
                        toys={toys}
                        onEditToy={onEditToy}
                        onRemoveToy={onRemoveToy}
                    />
                }
                {isLoading && <div>Loading...</div>}
            </main>
        </div>
    )
}