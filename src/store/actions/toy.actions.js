
// import { toyMockService as toyService } from '../../services/toy.mock.service'
import { toyService } from '../../services/toy.service.js'
import { store } from "../store.js"
import { SET_IS_LOADING, SET_TOYS, SET_FILTER_BY, ADD_TOY, UPDATE_TOY, REMOVE_TOY, TOY_UNDO } from '../reducers/toy.reducer.js'



export function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().toyModule.filterBy
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function loadToysForStatistics() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.queryAll()
        .then((toys) => {
            // store.dispatch({ type: SET_TOYS, toys })
            return toys
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('item action -> Cannot remove item', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('item action -> Cannot save item', err)
            throw err
        })
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

