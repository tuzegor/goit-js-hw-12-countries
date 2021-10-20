// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.

import { error } from '@pnotify/core';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(searchQuery) {
  return fetch(BASE_URL + searchQuery)
    .then(response => response.json())
    .then(result => {
      if (result.status === 404) {
        error("We can't find a country with that name");
      }
      return result;
    })
    .catch(error => error);
}
