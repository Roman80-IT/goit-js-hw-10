//?   npm i slim-select
//?   npm i notiflix

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const $selectWrapper = document.querySelector('.select-wrapper');
const $select = document.querySelector('.breed-select');
const $card = document.querySelector('div.cat-info');
const $loader = document.querySelector('.loader');

//* Запит до API для отримання списку порід котів
fetchBreeds()
  .then(breeds => {
    renderBreeds(breeds);
    $selectWrapper.classList.remove('is-hidden');
    $loader.classList.add('is-hidden');
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try to reload the page!')
  );

//* Обробник події зміни вибраної породи
$select.addEventListener('change', event => {
  $card.innerHTML = '';
  $loader.classList.remove('is-hidden');
  $selectWrapper.classList.add('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(breed => {
      $selectWrapper.classList.remove('is-hidden');
      $loader.classList.add('is-hidden');
      renderCard(breed[0]);
    })
    .catch(() => {
      $loader.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try to reload the page!');
    });
});

//* Рендеринг списку порід у селекті
function renderBreeds(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  $select.innerHTML = `${markup}`;
  new SlimSelect({
    select: '#single',
  });
}

//* Рендеринг інформації про кота
function renderCard({ url, breeds }) {
  const { name, description, temperament } = breeds[0];
  const markup = `<img class="image" src="${url}" alt="">
  <div>
        <h1>${name}</h1>
        <p>
        ${description}
        </p>
        <p>
          <span class="temperament-title">Temperament: </span> ${temperament}
        </p>
      </div>`;
  $card.innerHTML = `${markup}`;
}
