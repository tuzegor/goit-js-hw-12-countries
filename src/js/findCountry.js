// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.

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
        cardCountry.innerHTML = ''
      listMarkup(result);
      
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
    ;
  const countryName = countriesArr.map(country => {
    const markup = `<li class="elem-country"><a class="link-country link" href="">${country.name.common}</a></li>`;
    return markup;
  });
  listCountry.innerHTML = countryName.join(' ');
}
