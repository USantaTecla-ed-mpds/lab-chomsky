const { Console } = require("console-mpds");
const console = new Console();

DAYS_IN_MONTH = 30;
const DAYS_IN_SEASON = DAYS_IN_MONTH * 3;
const SPRING_BEGINNING_DAY = 21 + 2 * DAYS_IN_MONTH;
const SUMMER_BEGINNING_DAY = SPRING_BEGINNING_DAY + DAYS_IN_SEASON;
const AUTUMN_BEGINNING_DAY = SUMMER_BEGINNING_DAY + DAYS_IN_SEASON;
const WINTER_BEGINNING_DAY = AUTUMN_BEGINNING_DAY + DAYS_IN_SEASON;
const DAYS_WINTER_TO_END_YEAR = 365 - WINTER_BEGINNING_DAY;

const day = console.readNumber(`Escriba un día (1-${DAYS_IN_MONTH}): `)
const month = console.readNumber(`Escriba un mes (1-12): `)
const year = console.readNumber(`Escriba un año (1-...): `)

const dayOfTheYear = (month - 1) * DAYS_IN_MONTH + day;
let season = 'invierno';
let daysFromStationBegginning = day + DAYS_WINTER_TO_END_YEAR;
if (SPRING_BEGINNING_DAY <= dayOfTheYear && dayOfTheYear < SUMMER_BEGINNING_DAY) {
    season = 'primavera';
    daysFromStationBegginning = dayOfTheYear - SPRING_BEGINNING_DAY;
}
if (SUMMER_BEGINNING_DAY <= dayOfTheYear && dayOfTheYear < AUTUMN_BEGINNING_DAY) {
    season = 'verano';
    daysFromStationBegginning = dayOfTheYear - SUMMER_BEGINNING_DAY;
}
else if (AUTUMN_BEGINNING_DAY <= dayOfTheYear && dayOfTheYear < WINTER_BEGINNING_DAY) {
    season = 'otoño';
    daysFromStationBegginning = dayOfTheYear - AUTUMN_BEGINNING_DAY;
}
else if (WINTER_BEGINNING_DAY <= dayOfTheYear) {
    daysFromStationBegginning = dayOfTheYear - WINTER_BEGINNING_DAY;
}

let seasonInterval = 'finales';
if (0 <= daysFromStationBegginning && daysFromStationBegginning < 30) {
    seasonInterval = 'principios';
}
else if (30 <= daysFromStationBegginning && daysFromStationBegginning < 60) {
    seasonInterval = 'mediados';
}

console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonInterval} de ${season}.`);

