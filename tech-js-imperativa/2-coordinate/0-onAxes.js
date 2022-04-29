const { Console } = require("console-mpds");
const console = new Console(); 

const X_AXIS_ABSCISSA = 0;
const Y_AXIS_ORDINATE = 0;

const abscissa = console.readNumber(`Dame la abcisa de la coordenada: `);
const ordinate  = console.readNumber(`Dame la ordenada de la coordenada: `);
const inAbscissas = abscissa == X_AXIS_ABSCISSA;
const inOrdinates = ordinate == Y_AXIS_ORDINATE;
console.writeln(`La coordenada (${abscissa},${ordinate}) \
${(!inAbscissas && !inOrdinates)? "no está en ningún eje":""}\
${(inAbscissas && !inOrdinates)? "está en el eje de abcisas":""}\
${(!inAbscissas && inOrdinates)? "está en el eje de ordenadas":""}\
${(inAbscissas && inOrdinates)? "está en el eje de abcisas y ordenadas":""}`);