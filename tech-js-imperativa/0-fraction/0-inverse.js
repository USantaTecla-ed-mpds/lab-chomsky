const { Console } = require("console-mpds");
const console = new Console(); 

const numerator = console.readNumber(`introduce el numerador de la fracción: `)
const denominator = console.readNumber(`introduce el denominador de la fracción: `)
console.writeln(`la fracción ${numerator} / ${denominator} invertida es \
la fracción ${denominator} / ${numerator}`)