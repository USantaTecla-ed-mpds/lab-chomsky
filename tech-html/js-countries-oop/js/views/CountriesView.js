import { Country } from '../models/Country.js'
import { CountriesService } from '../services/CountriesService.js'
import { CountryView } from './CountryView.js'

export class CountriesView {

  #countriesService;

  constructor(){
    this.#countriesService = new CountriesService();
  }

  show() {
    this.#countriesService.getAllCountries().then(countries => {
        const countriesElement = document.getElementById("countriesElement");
        for (let country of countries) {
            const countryElement = document.createElement("div");
            countriesElement.appendChild(countryElement);
            new CountryView(countryElement, country).show();
        }
    });
  }
}

window.onload = () => {
    new CountriesView().show();
}
