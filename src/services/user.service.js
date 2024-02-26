import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    getUsers,
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function login({ username, password }) {
    console.log('username', username)
    const user = await httpService.post(BASE_URL + 'login', { username, password })

    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
}

async function signup({ fullname, username, password, email, isAdmin}) {
    const user = { fullname, username, password, email, isAdmin}
    const user_1 = await httpService.post(BASE_URL + 'signup', user)
    if (user_1) return _setLoggedinUser(user_1)
    else return Promise.reject('Invalid signup')
}


async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}


function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, username: user.username, score: user.score }
    // const userToSave = { _id: user._id, username: user.username, email: user.email}
    const userToSave = {username: user.username, email: user.email, fullname: user.fullname, isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// function getEmptyCredentials() {
//     return {
//         username: '',
//         password: '',
//         fullname: ''
//     }
// }

function getEmptyCredentials() {
    return {
        fullname:'',
        username: '',
        password: '',
        email: '',
        isAdmin: false,
    }
}



async function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    const user = await httpService.put('user/', { diff })
    _setLoggedinUser(user)
    return user.score
}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})

// ;(async ()=>{
//     // await userService.signup({fullname: 'Admin Smith', username: 'admin_smith', password:'adminPass456', isAdmin: true})
    // await userService.signup({fullname: 'Admin two', username: 'admin_two', password:'adminPass456', email:'admin_two@gmail.com', isAdmin: true})
    // await userService.signup({fullname: 'User one', username: 'User_one', password:'useronePass456', email:'User_one@gmail.com', isAdmin: false})
    // await userService.signup({fullname: 'User two', username: 'User_two', password:'usertwoPass456', email:'User_two@gmail.com', isAdmin: false})

    // await userService.signup({fullname: 'User 3', username: 'User_3', password:'user3Pass456', email:'User_3@gmail.com', isAdmin: false})

    
// })()


