//?   npm i slim-select
//?   npm i notiflix
//?   npm install axios // поки не використовую

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//* Вибір DOM-елементів ( document.querySelector() )
const $selectWrapper = document.querySelector('.select-wrapper');
const $select = document.querySelector('.breed-select');
const $card = document.querySelector('div.cat-info');
const $loader = document.querySelector('.loader');

//* Запит до API для отримання списку порід котів
fetchBreeds()
  .then(breeds => {
    renderBreeds(breeds); //* Рендеринг списку порід у селекті
    $selectWrapper.classList.remove('is-hidden'); //* Показуємо обгортку для вибору пород
    $loader.classList.add('is-hidden'); //* Ховаємо спіннер завантаження
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try to reload the page!')
  );

//* Обробник події зміни вибраної породи
$select.addEventListener('change', event => {
  $card.innerHTML = ''; //* Очистка обгортки для відображення інформації про кота
  $loader.classList.remove('is-hidden'); //* Показуємо спіннер завантаження
  $selectWrapper.classList.add('is-hidden'); //* Ховаємо селект для вибору породи
  fetchCatByBreed(event.target.value)
    .then(breed => {
      $selectWrapper.classList.remove('is-hidden'); //* Показуємо селект після завантаження даних
      $loader.classList.add('is-hidden'); //* Ховаємо спіннер завантаження
      renderCard(breed[0]); //* Рендеринг інформації про кота
    })
    .catch(() => {
      $loader.classList.add('is-hidden'); //* Ховаємо спіннер завантаження у випадку помилки
      Notify.failure('Oops! Something went wrong! Try to reload the page!'); //* Відображення сповіщення про помилку
    });
});
