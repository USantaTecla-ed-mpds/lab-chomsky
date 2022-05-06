const { Console } = require("console-mpds");
const console = new Console(); 

const numerator = console.readNumber(`introduce el numerador de la fracción: `)
const denominator = console.readNumber(`introduce el denominador de la fracción: `)

let mcd = denominator;
if (numerator > denominator) {
	mcd = numerator;
}
while (denominator % mcd !== 0 || numerator % mcd !== 0) {
	mcd--;
}
const simpleNumerator = numerator / mcd;
const simpleDenominator = denominator / mcd;
console.writeln(`la fracción ${numerator} / ${denominator} = ${simpleNumerator} / ${simpleDenominator} \
invertida es la fracción ${simpleDenominator} / ${simpleNumerator}`)
