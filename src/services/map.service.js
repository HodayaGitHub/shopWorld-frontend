import Axios from 'axios'
import { httpService } from './http.service.js'

const BASE_URL = 'map/'


export const mapService = {
    query,
    loadMap,
}


function query() {
    return httpService.get(BASE_URL)
}

function loadMap() {
    return query()
}
