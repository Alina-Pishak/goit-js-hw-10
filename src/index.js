import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
    .then(({ data }) => {
        data.map(({ id, name }) => breedList.insertAdjacentHTML('beforeend', createOptions(id, name)));
        loaderEl.classList.add('visually-hidden');
        new SlimSelect({
            select: '#breeds',
        })
        breedList.classList.remove('visually-hidden');
        breedList.addEventListener('change', getInfo);
    })
    .catch(() => {
        loaderEl.classList.add('visually-hidden')
        Report.failure('Error', 'Oops! Something went wrong! Try reloading the page!', 'Ok');
    });
    
const createOptions = (id, name) => `<option value="${id}">${name}</option>`;
    
function getInfo(evt) {
    catInfo.classList.add('visually-hidden');
    catInfo.innerHTML = '';
    loaderEl.classList.remove('visually-hidden');
    fetchCatByBreed(evt.currentTarget.value)
        .then(({ data }) => {
            if (data.length < 1) {
                Report.failure("Error", "We can't find any information about this breed:( Try find another breed.", "Ok");
                loaderEl.classList.add('visually-hidden');
                return;
            }
            data.map(({ url, breeds }) => catInfo.innerHTML = createMarkup(url, breeds));
            catInfo.classList.remove('visually-hidden');
            loaderEl.classList.add('visually-hidden');
        })
        .catch(() => {
            loaderEl.classList.add('visually-hidden');
            Report.failure('Error', 'Oops! Something went wrong! Try reloading the page!', 'Ok');
        })
}

const createMarkup = (url, info) => `
      <img src="${url}" alt="${info[0].name}" width='400' >
      <div>
      <h2>${info[0].name}</h2>
      <p> ${info[0].description}</p>
      <p><b>Temperament:</b></b> ${info[0].temperament}</p>
      </div>`;