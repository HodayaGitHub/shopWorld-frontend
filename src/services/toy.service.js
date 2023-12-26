import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']


export const toyService = {
    query,
    queryAll,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultChartData,
}

function query(filterBy = {}) {
    return httpService.get('toy', filterBy)
}


function queryAll() {
    return httpService.get( BASE_URL + 'alltoys')
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: true,
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: true }
}


function getDefaultChartData() {
    return {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                label: "Stock Status",
                data: [0, 0],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    }
}