import  {Person}  from './Person.js';

class Female extends Person{

    #y;

    constructor(y) {
        super();
        this.#y = y;
    }

    accept(personVisitor) {
        personVisitor.visitFemale(this);
    }

    getY() {
        return this.#y;
    }

    setY(y) {
        this.#y = y;
    }
}

export { Female };