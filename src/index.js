import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

// errorEl.classList.add('visually-hidden')
// breedList.classList.add('visually-hidden');
// catInfo.classList.add('visually-hidden')


fetchBreeds()
    .then(data => {
        data.map(({ id, name }) => breedList.insertAdjacentHTML('beforeend', createOptions(id, name)));
        loaderEl.classList.add('visually-hidden');
        breedList.classList.remove('visually-hidden');
    })
    .catch(() => {
            loaderEl.classList.add('visually-hidden')
            errorEl.classList.remove('visually-hidden');
        });

const createOptions = (id, name) => `<option value="${id}">${name}</option>`;

loaderEl.classList.remove('visually-hidden');
breedList.addEventListener('input', getInfo);
function getInfo(evt) {
    fetchCatByBreed(evt.currentTarget.value)
        .then(data => {
            loaderEl.classList.remove('visually-hidden');
            console.log(data);
            setTimeout(() => {
                catInfo.classList.remove('visually-hidden');
                loaderEl.classList.add('visually-hidden');

            }, 500);
        })
        .catch(() => {
            loaderEl.classList.add('visually-hidden')
            errorEl.classList.remove('visually-hidden');
        })
}

const createMarkup = (url) => {
    const markup = `<div><img src="${url}" alt="${name}" width="300"></div>`

    return markup;

};