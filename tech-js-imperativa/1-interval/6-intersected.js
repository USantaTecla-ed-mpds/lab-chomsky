const { Console } = require("console-mpds");
const console = new Console(); 

console.writeln(`Primer intervalo:`);
const askIntervalMinMessage = `Introduce el minimo del intervalo: `;
const askIntervalMaxMessage = `Introduce el maximo del intervalo (superior o igual al mínimo): `;
const firstIntervalMin = console.readNumber(`${askIntervalMinMessage}`);
const firstIntervalMax = console.readNumber(`${askIntervalMaxMessage}`);
console.writeln(`Segundo intervalo:`)
const secondIntervalMin = console.readNumber(`${askIntervalMinMessage}`);
const secondIntervalMax = console.readNumber(`${askIntervalMaxMessage}`);
const secondIntervalMinIsInFirstInterval =  firstIntervalMin <= secondIntervalMin && secondIntervalMin <= firstIntervalMax;
const secondIntervalMaxIsInFirstInterval =  firstIntervalMin <= secondIntervalMax && secondIntervalMax <= firstIntervalMax;
const intersect = secondIntervalMinIsInFirstInterval || secondIntervalMaxIsInFirstInterval;
console.writeln(`El intervalo [${firstIntervalMin},${firstIntervalMax}] ${(intersect)? "si":"no"} intersecta \
con el intervalo [${secondIntervalMin},${secondIntervalMax}]`);