//?   npm i slim-select
//?   npm i notiflix
//?   npm install axios // поки не використовую

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
