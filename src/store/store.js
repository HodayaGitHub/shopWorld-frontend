// import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    // carModule: carReducer,
    // userModule: userReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })