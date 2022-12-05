import  {Person}  from './Person.js';

class Male extends Person{

    #x;

    constructor(x) {
        super();
        this.#x = x;
    }

    accept(personVisitor) {
        personVisitor.visitMale(this);
    }

    getX() {
        return this.#x;
    }
    
    setX(x) {
        this.#x = x;
    }
}

export { Male };