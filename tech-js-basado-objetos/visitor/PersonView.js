import  {Person}  from './Person.js';
import  {PersonShowView}  from './PersonShowView.js';
import  {PersonUpdaterView}  from './PersonUpdaterView.js';

class PersonView {

    constructor() {
    }

    show(person) {
        new PersonShowView().show(person);
    }

    update(person) {
        return new PersonUpdaterView().update(person);
    }
}

export { PersonView };

