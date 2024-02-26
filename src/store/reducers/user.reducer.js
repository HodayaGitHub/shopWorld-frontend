import { userService } from "../../services/user.service.js"


/// user
export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

export const SET_WATCHED_USER = 'SET_WATCHED_USER'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {

    switch (action.type) {
        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break


        default:
            return state
    }
}
