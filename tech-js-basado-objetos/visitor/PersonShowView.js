import  {console}  from './Console.js';
import  {Person}  from './Person.js';
import  {Male}  from './Male.js';
import  {Female}  from './Female.js';

class PersonShowView {

    constructor() {
    }

    show(person) {
        person.accept(this);
    }

    visitMale(male) {
        console.writeln("Hombre con X = " + male.getX());
    }

    visitFemale(female) {
        console.writeln("Mujer con Y = " + female.getY());
    }
}


export { PersonShowView };



