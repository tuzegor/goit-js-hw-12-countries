// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.
export default function fetchCountries (searchQuery){

    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(response => {
        return response.json();
    })
    .then(result => {
        
        // console.log(result);
        return result
    })
    .catch(error => {
        console.log("error");
    });
    
}