const { Console } = require("console-mpds");
const console = new Console(); 


const STATION_BEGINNING_DAY = 21
const DAYS_IN_MONTH = 30;
const DAYS_STATION_BEGINNING_TO_MONTH_END = DAYS_IN_MONTH - STATION_BEGINNING_DAY;
const DAYS_IN_STATION = 30 * 3;


const day = console.readNumber(`Escriba un día (1-${DAYS_IN_MONTH}): `)
const month = console.readNumber(`Escriba un mes (1-12): `)
const year = console.readNumber(`Escriba un año (1-...): `)

const dayOfTheYear = (month - 1) * DAYS_IN_MONTH + day;
let season;
console.writeln(`estacion es ${~~ ((dayOfTheYear + DAYS_STATION_BEGINNING_TO_MONTH_END) / DAYS_IN_MONTH)}`);

switch(~~ ((dayOfTheYear + DAYS_STATION_BEGINNING_TO_MONTH_END) / DAYS_IN_MONTH) ){
    case 0:
        season = 'invierno'; 
        break;
    case 1:
        season = 'primavera'; 
        break;
    case 2:
        season = 'verano'; 
        break;
    case 3:
        season = 'otoño';  
        break;
}

let seasonInterval;

const daysFromStationBeginning = (dayOfTheYear + DAYS_STATION_BEGINNING_TO_MONTH_END) % DAYS_IN_STATION


 console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonInterval} de ${season}.`);
 
