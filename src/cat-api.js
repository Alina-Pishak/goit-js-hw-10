import axios from 'axios';

const API_KEY = 'live_ntL5pljwh6ukhBPpHPoyZH13L5iqANzuxYo1CAyRa13ALix2Tt43YMWqd5H2F7Du';
axios.defaults.headers.common['x-api-key'] = API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        .then(resp => resp)
        .catch(err => err);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(resp => resp)
        .catch(err => err);
}