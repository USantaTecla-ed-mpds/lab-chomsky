const { Console } = require("console-mpds");

const console = new Console(); 

console.writeln(`primera fracción `);
const askNumeratorMessage = `introduce el numerador de la fracción`;
const askDenominatorMessage = `introduce el denominador de la fracción`;
const firstNumerator = console.readNumber(`${askNumeratorMessage}`);
const firstDenominator = console.readNumber(`${askDenominatorMessage}`);
console.writeln(`segunda fracción`);
const secondNumerator = console.readNumber(`${askNumeratorMessage}`);
const secondDenominator = console.readNumber(`${askDenominatorMessage}`);
console.writeln(`la suma de la fracción ${firstNumerator} / ${firstDenominator} \
y la fracción ${secondNumerator} / ${secondDenominator} \
es la fracción ${firstNumerator * secondNumerator} / ${firstDenominator * secondDenominator}`);