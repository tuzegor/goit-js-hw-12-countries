import { alert} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

import refs from './refs.js';
const { userCountry, listCountry, cardCountry } = refs;
import fetchCountries from './fetchCountries.js';
import template from '../templateCountryCard.hbs';

// ===================================================

userCountry.addEventListener('input', _.debounce(searchCountry, 500));

function searchCountry() {
  let userCountryText = userCountry.value.toLowerCase();

  fetchCountries(userCountryText).then(result => {
    console.log(result);
    if (result.length === 1) {
      listCountry.innerHTML = '';
      createCountryBlock(result);
    } else {
      cardCountry.innerHTML = '';
      listMarkup(result);
      listCountry.addEventListener('click', event => activateCountry(event, result));
    }
  });
}

function activateCountry(event, result) {
  listCountry.innerHTML = '';
  const currentCountry = result.find(
    country => country.name.common === event.target.textContent,
  );
  console.log(currentCountry);
  createCountryBlock([currentCountry]);
}

function createCountryBlock(result) {
  const oneCountry = result[0];

  let cardMarkap = template(oneCountry);
  cardCountry.innerHTML = cardMarkap;
}

function listMarkup(countriesArr) {
  const countryName = countriesArr.map(country => {
    const markup = `<li class="country-elem">${country.name.common}</li>`;
    return markup;
  });
  listCountry.innerHTML = countryName.join(' ');
}


    









