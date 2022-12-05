import  {console}  from './Console.js';
import  {Person}  from './Person.js';
import  {PersonVisitor}  from './PersonVisitor.js';

class PersonShowView extends PersonVisitor{

    constructor() {
        super();
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



