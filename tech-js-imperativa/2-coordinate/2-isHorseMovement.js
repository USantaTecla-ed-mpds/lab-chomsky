const { Console } = require("console-mpds");
const console = new Console(); 

const HORSE_MOVE_LONG = 2; 
const HORSE_MOVE_SHORT = 1;

console.writeln(`Coordenada origen:`)
const abscissaOrigin = console.readNumber(`Dame la abcisa de la coordenada: `);
const ordinateOrigin  = console.readNumber(`Dame la ordenada de la coordenada: `);
console.writeln(`Coordenada destino:`)
const abscissaTarget = console.readNumber(`Dame la abcisa de la coordenada: `);
const ordinateTarget  = console.readNumber(`Dame la ordenada de la coordenada: `);
const abscissaAbsIncrement = (abscissaTarget - abscissaOrigin < 0 ? -1 : 1) * (abscissaTarget - abscissaOrigin);
const ordinateAbsIncrement = (ordinateTarget - ordinateOrigin < 0 ? -1 : 1) * (ordinateTarget - ordinateOrigin);
const isHorseMove = (abscissaAbsIncrement === HORSE_MOVE_LONG && ordinateAbsIncrement === HORSE_MOVE_SHORT 
    || abscissaAbsIncrement === HORSE_MOVE_SHORT && ordinateAbsIncrement === HORSE_MOVE_LONG);
console.writeln(`La coordenada (${abscissaOrigin},${ordinateOrigin}) \
y la coordenada destino (${abscissaTarget},${ordinateTarget}) \
${(isHorseMove)? "si":"no"} es un movimiento de caballo`); 