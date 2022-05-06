const { Console } = require("console-mpds");
const console = new Console();

let minInterval;
let maxInterval;
let isValidInterval;
do {
    minInterval = console.readNumber(`introduce el minimo del intervalo: `);
    maxInterval = console.readNumber(`introduce el maximo del intervalo (superior o igual al mínimo): `);
    isValidInterval = minInterval <=  maxInterval;
    if (!isValidInterval) {
        console.writeln(`Error!!! El máximo debe ser superior o igual al máximo`);
    }
 } while (!isValidInterval);

let numberOfIntervals;
let isNumberOfIntervalsPositive;
 do {
    numberOfIntervals = console.readNumber(`Introduce una cantidad positiva de intervalos: `);
    isNumberOfIntervalsPositive = numberOfIntervals > 0;
    if (!isNumberOfIntervalsPositive) {
        console.writeln(`Error!!! La cantidad debe ser positiva`);
    }
 } while (!isNumberOfIntervalsPositive);


 console.writeln(`El intervalo [${minInterval}, ${maxInterval}] dividido en ${numberOfIntervals} intervalos son ` );
 let increment = (maxInterval - minInterval) / numberOfIntervals;
 let nextMiddleMinInterval = minInterval;
 let nextMiddleMaxInterval = minInterval + increment;
 console.write(`[${nextMiddleMinInterval}, ${nextMiddleMaxInterval}]`);

 for(i=2 ; i <= numberOfIntervals ; i++) {
    console.write(i === numberOfIntervals? ` y ` : `, `);
    nextMiddleMinInterval = nextMiddleMaxInterval;
	nextMiddleMaxInterval = nextMiddleMaxInterval + increment;   
	console.write(`[${nextMiddleMinInterval}, ${nextMiddleMaxInterval}]`);

 }

