import './css/styles.css';
import Notiflix from 'notiflix';
import debounce  from 'lodash.debounce';
import {fetchCountries} from "./fetchCountries"


const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

// countryInfo.innerHTML = '';
// countryList.innerHTML = '';

searchBox.addEventListener('input' , debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  
  const login = searchBox.value;
  console.log(login);
  
  if (login.trim().length < 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return
  }

  fetchCountries(login).then(renderCountry).catch(onRenderError);
  
}

function renderCountry(countries) {

 if (countries.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries.map(({ name, flags }) => {
      return `<li> <img src = ${flags.svg} alt="country" width="35px"><span> ${name.official}</span></li>`;
    }).join('');
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';

  } else if (countries.length === 1) {
    
    const templates = countries.map(({ name, flags, capital, population, languages }) => {
     return `<ul class = "country-info-list" ><li> <img src = ${flags.svg} alt="country" width="35px"><span> ${name.official}</span></li>
            <li><b>Capital</b>: ${capital}</li>
            <li><b>Population</b>: ${population}</li>
            <li><b>Languages</b>: ${Object.values(languages).join(', ')} </li></ul>`;
    }).join('');
    countryInfo.innerHTML = templates;
    countryList.innerHTML = '';
    
 }
}

function onRenderError() {
  return Notiflix.Notify.failure('Oops, there is no country with that name')

}
  
