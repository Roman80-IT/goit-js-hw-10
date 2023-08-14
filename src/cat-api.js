//?   npm i axios

//* Імпорт бібліотеки axios для здійснення HTTP-запитів
import axios from 'axios';

//* Налаштування заголовка 'x-api-key' для всіх запитів за замовчуванням
axios.defaults.headers.common['x-api-key'] =
  'live_rmj9oYCubLciH1mSecygS2qRm4YKZpj5ULif6f8IqZG6VTl0Vke9fuVb9QpqB0Dm';

//* Ф-ція для отримання інформації про доступні породи котів
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data); //* Повертаємо дані з відповіді
}

//* Ф-ція для отримання інформації про кота конкретної породи за її ідентифікатором
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data); //* Повертаємо дані з відповіді
}
