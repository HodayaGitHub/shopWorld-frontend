
import { toyMockService as toyService } from '../../services/toy.mock.service'
import { store } from "../store.js"
import { SET_IS_LOADING, SET_TOYS, SET_FILTER_BY } from '../reducers/toy.reducer.js'



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



// export function removeCarOptimistic(carId) {
//     store.dispatch({ type: REMOVE_CAR, carId })
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })

//     return carService.remove(carId)
//         .catch(err => {
//             store.dispatch({ type: CAR_UNDO })
//             console.log('car action -> Cannot remove car', err)
//             throw err
//         })
//         .finally(() => {
//             store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//         })
// }




