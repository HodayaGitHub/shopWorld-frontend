import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service'

import {ToyList} from '../cmps/ToyList'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {

        console.log(toys)
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('savedToy:', savedToy)
                showSuccessMsg(`Toy added (vendor: ${savedToy.name})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })

            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function addToCart(toy) {
        console.log('toy:', toy)
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                />}
                {isLoading && <div>Loading...</div>}
            </main>
        </div>
    )

}