import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_TOYS'
export const SET_FILTER_BY = 'SET_TOYS'

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

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return state
    }
}
