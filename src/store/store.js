// import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { combineReducers, createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer"
import {appReducer} from "./reducers/app.reducer"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    appModule: appReducer,
    // userModule: userReducer,

})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })