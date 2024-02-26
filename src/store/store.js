// import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { combineReducers, createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer"
import { appReducer } from "./reducers/app.reducer"
import { userReducer } from "./reducers/user.reducer"
import { reviewReducer } from "./reducers/review.reducer"
import { systemReducer } from "./reducers/system.reducer"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    appModule: appReducer,
    userModule: userReducer,
    reviewModule: reviewReducer, 
    systemModule: systemReducer, 
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})