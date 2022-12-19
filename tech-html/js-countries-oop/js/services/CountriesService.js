import { Country } from '../models/Country.js'

export class CountriesService {

    #httpRequest

    constructor() {
        this.#httpRequest = new XMLHttpRequest();
    }

    getAllCountries() {
        return new Promise((resolve, reject) => {
            this.#httpRequest.open("GET", encodeURI(`https://restcountries.com/v3.1/all`), true);
            this.#httpRequest.responseType = "json";
            this.#httpRequest.onload = () => {
                if (this.#httpRequest.status >= 200 && this.#httpRequest.status < 300) {
                    let countries = this.#httpRequest.response.map(country => {
                        return new Country(country.name.common, country.flags.svg);
                    });
                    resolve(countries);
                } else {
                    reject(this.#httpRequest.statusText);
                }
            };
            this.#httpRequest.onerror = () => reject("No hay conexión");
            this.#httpRequest.send();
        })
    }

}
