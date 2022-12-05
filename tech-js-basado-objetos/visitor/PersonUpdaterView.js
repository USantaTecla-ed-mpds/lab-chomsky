import  {console}  from './Console.js';
import  {Person}  from './Person.js';
import  {PersonVisitor}  from './PersonVisitor.js';

class PersonUpdaterView extends PersonVisitor{

    #person;

    constructor() {
        super();
    }

    update(person) {
        person.accept(this);
        return this.#person; //No es necesario devolver nada en este ejemplo pero si fuera necesario se haría así usando un atributo?!
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