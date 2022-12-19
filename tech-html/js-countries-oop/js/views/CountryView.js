import { Country } from '../models/Country.js'

export class CountryView {

    #countryElement;

    #country;

    constructor(countryElement, country) {
        this.#countryElement = countryElement;
        this.#country = country;
    }

    show() {
        this.#countryElement.name = this.#country.getName();
        const h2 = document.createElement("h2");
        this.#countryElement.appendChild(h2);
        h2.name = this.#country.getName();
        const text = document.createTextNode(this.#country.getName());
        h2.appendChild(text);
        const img = document.createElement("img");
        this.#countryElement.appendChild(img);
        img.name = this.#country.getName();
        img.src = this.#country.getFlag();
    }


}