export function fetchCountries(login) {
    return  fetch(`https://restcountries.com/v3.1/name/${login}?fields=name,capital,population,flags,languages`).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }