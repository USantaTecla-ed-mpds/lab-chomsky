const { Console } = require("console-mpds");
const console = new Console(); 

const numerator = console.readNumber(`introduce el numerador de la fracción: `)
const denominator = console.readNumber (`introduce el denominador de la fracción: `)
const exponent = console.readNumber (`introduce un exponente: `)
console.writeln(`la fracción ${numerator} / ${denominator} elevado a ${exponent} \
es la fracción ${numerator ** exponent} / ${denominator ** exponent}`)