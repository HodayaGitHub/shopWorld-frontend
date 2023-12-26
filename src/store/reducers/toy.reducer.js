import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const TOY_UNDO = 'CAR_UNDO'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter()
}
export function toyReducer(state = initialState, action = {}) {

    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case ADD_TOY:
            return { ...state, toys: [action.todo, ...state.toys] }

        case UPDATE_TOY:
            console.log(action.toy)
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            console.log(toys)
            console.log(state)
            return { ...state, toys }

        // const updatedToys = state.toys.map(toy =>
        //     toy._id === action.toy._id ? action.toy : toy)
        // return { ...state, toys: updatedToys }
        // case UPDATE_TOY:
        //     toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
        //     return { ...state, toys }

        case REMOVE_TOY:
            toys = state.toys.filter(todo => todo._id !== action.todoId)
            return { ...state, toys }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
    
        case TOY_UNDO:
            toys = [...state.lastToys]
            return { ...state, toys }
            
        default:
            return state
    }
}
