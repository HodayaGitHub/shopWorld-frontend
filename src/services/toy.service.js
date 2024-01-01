import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})



const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultChartData,
    updateChartData,
    labelsCategories,
    getDefaultSortBy,

}

// const labelsCount = {}
const BASE_URL = 'toy'

function query(filterBy = {}, sortBy = {}) {
    return httpService.get(BASE_URL, { filterBy, sortBy })
} 


function getById(toyId) {
    return httpService.get(`${BASE_URL}/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`${BASE_URL}/${toyId}`)
}

function save(toy) {
    return httpService.put(BASE_URL, toy)
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

function getDefaultSortBy() {
    return {
        by: 'name',
        asc: true,
    }
}


// Charts :
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



function labelsCategories(allToys) {
    const inStockLabelsCount = countInStockLabels(allToys)
    const labels = Object.keys(inStockLabelsCount)
    console.log(labels)
    return labels
}

// iterating through all the toys and their labels. 
// It sets the initial count for each label to 0 if it doesn't exist
function initializeLabelsCount(toys, labelsCount) {
    toys.forEach((toy) => {
        toy.labels.forEach((label) => {
            labelsCount[label] = labelsCount[label] || 0;
        })
    })
    // console.log(labelsCount);
    return labelsCount
}


// Function to count in-stock labels
function countInStockLabels(toys) {
    let labelsCount = {}

    labelsCount = initializeLabelsCount(toys, labelsCount)

    toys.forEach((toy) => {
        if (toy.inStock) {
            toy.labels.forEach((label) => {
                labelsCount[label] = (labelsCount[label] || 0) + 1
            })
        }
    })

    console.log(labelsCount);
    return labelsCount
}



// Function to calculate label counts and update chart data
function updateChartData(toys) {
    // const allLabelsCount = initializeLabelsCount(toys)
    const inStockLabelsCount = countInStockLabels(toys)

    const totalInStockCount = toys.filter((toy) => toy.inStock).length
    const labels = Object.keys(inStockLabelsCount)
    const data = labelsData(labels, inStockLabelsCount, totalInStockCount)

    const backgroundColor = labels.map(() => utilService.getRandomColorWithAlpha())
    const colors = backgroundColor
    const updatedChartData = {
        labels,
        datasets: [
            {
                label: "In Stock by Label",
                data,
                backgroundColor,
                borderColor: colors,
                borderWidth: 2,
            },
        ],
    }

    return updatedChartData
}

function labelsData(labels, inStockLabelsCount, totalInStockCount) {
    return labels.map((label) => {
        const count = inStockLabelsCount[label] || 0
        const percentage = (count / totalInStockCount) * 100 || 0
        return parseFloat(percentage.toFixed(2))
    })
}