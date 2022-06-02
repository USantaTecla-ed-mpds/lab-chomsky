const { Console } = require("console-mpds");
const console = new Console();

const colors = "rgybmc";
const MAX_ATTEMPTS_ALLOWED = 10;
const SECRET_COMBINATION_LENGTH = 4;

do {
    playGame(colors, MAX_ATTEMPTS_ALLOWED, SECRET_COMBINATION_LENGTH);
}while(console.readString(`quieres volver a jugar?:`) === 'y');


function playGame(colors, MAX_ATTEMPTS_ALLOWED, SECRET_COMBINATION_LENGTH) {
    let attempts = 0; 
    let results = [];
    const secretCombination = getSecretCombination(colors, SECRET_COMBINATION_LENGTH);
    let numberOfBlacks;
    do {
        console.writeln(`${attempts} intento(s)\n ****`);
        showResults(results);            
        const proposalCombination = getProposalCombination(colors, SECRET_COMBINATION_LENGTH);
        numberOfBlacks = getSuccesses(secretCombination, proposalCombination, blackCondition);
        const numberOfWhites = getSuccesses(secretCombination, proposalCombination, whiteCondition);
        addResult(results, numberOfBlacks, numberOfWhites, proposalCombination);
        attempts++;
    }
    while(numberOfBlacks !== SECRET_COMBINATION_LENGTH && attempts < MAX_ATTEMPTS_ALLOWED );  
    console.writeln(numberOfBlacks === SECRET_COMBINATION_LENGTH ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");

    function getSecretCombination(colors, SECRET_COMBINATION_LENGTH) {
        let secretCombination = [];
        for (let i = 0; i < SECRET_COMBINATION_LENGTH; i++) {
            const randomColor = colors[parseInt(Math.random() * 7)];
            secretCombination[i] = randomColor;
        }
        return secretCombination;
    }

    function showResults(results) {
        for (const result of results) {
            console.write(result);
        }
    }

    function getProposalCombination(colors, SECRET_COMBINATION_LENGTH) {
        let proposedCombination;
        let hasInvalidColors;
        do {
            proposedCombination = console.readString(`propon combinacion:`);
            hasInvalidColors = false;
            for (let i = 0; i < proposedCombination.length; i++) {
                hasInvalidColors |= !contains(proposedCombination[i], colors);
            }
            if (proposedCombination.length != SECRET_COMBINATION_LENGTH) {
                console.writeln("La longitud de la combinacion es incorrecta");
            }
            else if (hasInvalidColors) {
                console.writeln(`Colores inválidos, los colores son" :${colors}`);
            }
        } while (proposedCombination.length !== SECRET_COMBINATION_LENGTH || hasInvalidColors);
    
        return proposedCombination;
    
        function contains(character, string) {
            let contains = false;
            for (let i = 0; i < string.length; i++) {
                contains |= character === string[i];              
            }
            return contains;
        }
    }

    function getSuccesses(secretCombination, proposalCombination, successCondition) {
        let successes = 0;
        for (let i = 0; i < proposalCombination.length; i++) {
            for (let j = 0; j < secretCombination.length; j++)
            if (successCondition(secretCombination[i], proposalCombination[j], i, j)) {
                    successes++;
            }
        }
        return  successes;
    }

    function blackCondition(secretColor, proposalColor, indexSecretColor,  indexProposalColor) {
        return secretColor === proposalColor && indexSecretColor === indexProposalColor;
    }

    function whiteCondition(secretColor, proposalColor, indexSecretColor,  indexProposalColor) {
        return secretColor === proposalColor && indexSecretColor !== indexProposalColor;
    }

    function addResult(results, numberOfBlacks, numberOfWhites, proposalCombination) {
        results[results.length] = `${proposalCombination} --> ${numberOfBlacks} negras y ${numberOfWhites} blancas\n`;
    }

}











