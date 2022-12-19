
export class Country {

    #name;

    #flag;

    constructor(name, flag) {
        this.#name = name;
        this.#flag = flag;
    }

    getName() {
        return this.#name;
    }

    getFlag() {
        return this.#flag;
    }

}