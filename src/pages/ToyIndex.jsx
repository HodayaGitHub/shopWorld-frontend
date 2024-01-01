import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'

import { toyService } from '../services/toy.service'
import { ToyList } from '../cmps/ToyList'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    // const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)




    const navigate = useNavigate()

    useEffect(() => {
        // console.log(toys)
        loadToys()
            .catch(() => {
                showErrorMsgRedux('Cannot show toys')
            })
    }, [filterBy, sortBy])


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsgRedux(`Removed item with ${toyId} id successfully`)
        } catch (error) {
            console.error('Cannot remove toy', error)
            showErrorMsgRedux('Cannot remove toy')
        }
    }


    async function onAddToy() {
        try {
            const toyToSave = toyService.getEmptyToy()
            const savedToy = await saveToy(toyToSave)
            console.log('savedToy:', savedToy)
            showSuccessMsgRedux(`Toy added (name: ${savedToy.name})`)
        } catch (error) {
            console.error('Cannot add toy', error)
            showErrorMsgRedux('Cannot add toy')
        }
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

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    return (
        <div>
            <main>
                <ToyFilter toys={toys} filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />

                {!isLoading &&
                    <ToyList
                        toys={toys}
                        onEditToy={onEditToy}
                        onRemoveToy={onRemoveToy}
                    />
                }
                {/* {isLoading && <div>Loading...</div>} */}
            </main>
        </div>
    )
}