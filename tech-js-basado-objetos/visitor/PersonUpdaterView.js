import  {console}  from './Console.js';
import  {Person}  from './Person.js';
import  {Male}  from './Male.js';
import  {Female}  from './Female.js';

class PersonUpdaterView {

    #person;

    constructor() {
    }

    update(person) {
        person.accept(this);
        return person;
    }

    visitMale(male) {
        const newX = console.readNumber("Dime el nuevo valor para la propiedad X del hombre");
        male.setX(newX);
        this.#person = male;
    }

    visitFemale(female) {
        const newY = console.readNumber("Dime el nuevo valor para la propiedad Y de la mujer");
        female.setY(newY);
        this.#person = female;
    }
}


export { PersonUpdaterView };