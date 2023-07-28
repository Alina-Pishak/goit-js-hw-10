import axios from 'axios';

const API_KEY = 'live_ntL5pljwh6ukhBPpHPoyZH13L5iqANzuxYo1CAyRa13ALix2Tt43YMWqd5H2F7Du';
axios.defaults.headers.common['x-api-key'] = API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.status);
        }
        return resp.json();
    })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.status)
        }
        return resp.json();
    })
}