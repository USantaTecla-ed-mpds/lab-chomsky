const { Console } = require("console-mpds");
const console = new Console();

const SPRING_BEGINNING_DAY = 21
const DAYS_IN_MONTH = 30;
const DAYS_IN_SEASON = DAYS_IN_MONTH * 3;
const DAYS_FROM_WINTER_TO_YEAR_END = DAYS_IN_SEASON - SPRING_BEGINNING_DAY;
const DAYS_IN_SEASON_INTERVAL = 30;

const day = console.readNumber(`Escriba un día (1-${DAYS_IN_MONTH}): `)
const month = console.readNumber(`Escriba un mes (1-12): `)
const year = console.readNumber(`Escriba un año (1-...): `)

const dayOfTheYear = (month - 1) * DAYS_IN_MONTH + day;
const daysFromWinter = dayOfTheYear + DAYS_FROM_WINTER_TO_YEAR_END;
let season;

switch (~~(daysFromWinter / DAYS_IN_SEASON)) {
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
    case 4:
        season = 'invierno';
        break;
}

let seasonInterval;
let daysFromStationBegginning = daysFromWinter % DAYS_IN_SEASON;
switch (~~(daysFromStationBegginning / DAYS_IN_SEASON_INTERVAL)) {
    case 0:
        seasonInterval = 'primeros';
        break;
    case 1:
        seasonInterval = 'mediados';
        break;
    case 2:
        seasonInterval = 'finales';
        break;
}

console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonInterval} de ${season}.`);

