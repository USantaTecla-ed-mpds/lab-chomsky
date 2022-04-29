const { Console } = require("console-mpds");
const console = new Console(); 

const HORSE_MOVE_AXIS_LONG_INCREMENT = 2; 
const HORSE_MOVE_AXIS_SHORT_INCREMENT = 1;

console.writeln(`Coordenada origen:`)
const abscissaOrigin = console.readNumber(`Dame la abcisa de la coordenada: `);
const ordinateOrigin  = console.readNumber(`Dame la ordenada de la coordenada: `);
console.writeln(`Coordenada destino:`)
const abscissaTarget = console.readNumber(`Dame la abcisa de la coordenada: `);
const ordinateTarget  = console.readNumber(`Dame la ordenada de la coordenada: `);
let abscissaAbsIncrement = abscissaTarget - abscissaOrigin;
abscissaAbsIncrement = (abscissaAbsIncrement < 0) ? -abscissaAbsIncrement : abscissaAbsIncrement;
let ordinateAbsIncrement = ordinateTarget - ordinateOrigin;
ordinateAbsIncrement = (ordinateAbsIncrement < 0) ? -ordinateAbsIncrement : ordinateAbsIncrement;
const abcissaIsLongIncrement = abscissaAbsIncrement == HORSE_MOVE_AXIS_LONG_INCREMENT;
const abcissaIsShortIncrement = abscissaAbsIncrement == HORSE_MOVE_AXIS_SHORT_INCREMENT;
const ordinateIsLongIncrement = ordinateAbsIncrement == HORSE_MOVE_AXIS_LONG_INCREMENT;
const ordinateIsShortIncrement = ordinateAbsIncrement == HORSE_MOVE_AXIS_SHORT_INCREMENT;
let isHorseMove = (abcissaIsLongIncrement && ordinateIsShortIncrement || abcissaIsShortIncrement && ordinateIsLongIncrement);
console.writeln(`La coordenada (${abscissaOrigin},${ordinateOrigin}) \
y la coordenada destino (${abscissaTarget},${ordinateTarget}) \
${(isHorseMove)? "si":"no"} es un movimiento de caballo`); 