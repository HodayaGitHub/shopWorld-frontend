
// import { toyMockService as toyService } from '../../services/toy.mock.service'
import { toyService } from '../../services/toy.service.js'
import { store } from "../store.js"
import { SET_IS_LOADING, SET_TOYS, SET_FILTER_BY, ADD_TOY, UPDATE_TOY, REMOVE_TOY, TOY_UNDO } from '../reducers/toy.reducer.js'



export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().toyModule.filterBy
    try {
        try {
            const toys = await toyService.query(filterBy)
            store.dispatch({ type: SET_TOYS, toys })
        } catch (err) {
            console.log('toy action -> Cannot load toys', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadToysForStatistics() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            const toys = await toyService.query()
            return toys
        } catch (err) {
            console.log('toy action -> Cannot load toys', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadLabels() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            const toys = await toyService.query()
            // store.dispatch({ type: SET_TOYS, toys })
            const labels = toyService.labelsCategories(toys)
            return labels
        } catch (err) {
            console.log('toy action -> Cannot load labels', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            return await toyService.remove(toyId)
        } catch (err) {
            store.dispatch({ type: TOY_UNDO })
            console.log('item action -> Cannot remove item', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('item action -> Cannot save item', err)
        throw err
    }
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

