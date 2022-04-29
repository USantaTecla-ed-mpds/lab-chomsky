const { Console } = require("console-mpds");
const console = new Console(); 

const minimum = console.readNumber(`introduce el minimo del intervalo: `);
const maximum = console.readNumber(`introduce el maximo del intervalo (superior o igual al mínimo): `);
const offset = console.readNumber(`Introduce un factor de desplazamiento: `);
console.writeln(`El intervalo [${minimum},${maximum}] con factor de desplazamiento ${offset} \
es el intervalo [${minimum+offset},${maximum+offset}]`)