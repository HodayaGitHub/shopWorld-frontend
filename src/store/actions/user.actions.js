import { userService } from '../../services/user.service.js'
import { store } from '../store.js'

import { SET_USER } from '../reducers/user.reducer.js'

export function updateUser(userToUpdate) {
    return userService.updateUserPreffs(userToUpdate)
        .then((updatedUser) => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser,
            })
        })
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

// TODO - connect and change to const
export function changeBalance(amount) {
    return userService.updateBalance(amount)
        .then(newBalance => {
            store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })
            return newBalance
        })
        .catch(err => {
            console.error('Cannot change balance:', err)
            throw err
        })
}

