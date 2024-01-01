import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const TOY_UNDO = 'TOY_UNDO'



const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSortBy(),
}
export function toyReducer(state = initialState, action = {}) {

    let toys
    let lastToys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case ADD_TOY:
            return { ...state, toys: [action.todo, ...state.toys] }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_SORT_BY:
            return { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }

        case TOY_UNDO:
            lastToys = state.lastToys || []
            return { ...state, toys: [...lastToys] }
        default:
            return state
    }
}
