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
