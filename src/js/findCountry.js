import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

import refs from './refs.js';
const { userCountry, listCountry, cardCountry } = refs;
import fetchCountries from './fetchCountries.js';
import template from '../templateCountryCard.hbs';

// ===================================================

userCountry.addEventListener('input', _.debounce(searchCountry, 200));

function searchCountry() {
  let userCountryText = userCountry.value.toLowerCase();

  fetchCountries(userCountryText).then(result => {
    // console.log(result);
    if (result.length === 1) {
      listCountry.innerHTML = '';
      createCountryBlock(result);
    } else {
      cardCountry.innerHTML = '';
      getListMarkup(result);
      listCountry.addEventListener('click', event => activateCountry(event, result));
    }
  });
}

function activateCountry(event, result) {
  listCountry.innerHTML = '';
  const currentCountry = result.find(country => country.name.common === event.target.textContent);
  createCountryBlock([currentCountry]);
}

function createCountryBlock(result) {
  const oneCountry = result[0];
  let cardMarkup = template(oneCountry);
  cardCountry.innerHTML = cardMarkup;
}

function getListMarkup(result) {
  const countryName = result.map(country => {
    const markup = `<li class="country-elem">${country.name.common}</li>`;
    return markup;
  });
  listCountry.innerHTML = countryName.join(' ');
}
