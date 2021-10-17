import { alert} from '@pnotify/core';

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
      listCountry.addEventListener('click', activateCountry);
    }
    function activateCountry(event) {
      listCountry.innerHTML = '';
      const currentCountry = result.find(
        country => country.name.common === event.target.textContent,
      );
      console.log(currentCountry);
      createCountryBlock([currentCountry]);
    }
  });
}

function createCountryBlock(result) {
  const oneCountry = result[0];
  console.log(oneCountry);
  console.log(oneCountry.name.common);

  let cardMarkap = template(oneCountry);
  console.log(cardMarkap);
  cardCountry.innerHTML = cardMarkap;
}

function listMarkup(countriesArr) {
  const countryName = countriesArr.map(country => {
    const markup = `<li class="country-elem">${country.name.common}</li>`;
    return markup;
  });
  listCountry.innerHTML = countryName.join(' ');
}


    









