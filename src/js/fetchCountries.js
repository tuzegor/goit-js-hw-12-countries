// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.

import { alert} from '@pnotify/core';

export default function fetchCountries (searchQuery){

    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(response => {
        return response.json();
    })
    .then(result => {
        
        // console.log(result);
        
        if (result.status === 404) {
            alert({
                type: "error",
                text: "We can't find a country with that name"
              })
        } 
        return result
        
    })
    .catch(error => {
        console.log("error");
        
    });
    
}
