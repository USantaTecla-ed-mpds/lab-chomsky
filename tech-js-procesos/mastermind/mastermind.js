const { Console } = require("console-mpds");
const console = new Console();


const COLORS = "rgybmc";;
const MAX_ATTEMPTS = 10;
const COMBINATION_LENGTH = 4;

do {
    playGame(COLORS, MAX_ATTEMPTS, COMBINATION_LENGTH);
} while (isResumed());


function playGame(colors, maxAttempts, combinationLength) {
    let attempts = 0;
    let results = [];
    const secretCombination = getSecretCombination(colors, combinationLength);
    do {
        showBoard(attempts, results);
        const result = playTurn(colors, secretCombination);
        results[results.length] = result;
        attempts++;
    } while (!isEndGame(results, attempts < maxAttempts));
    showEndGameMessage(results);



    function getSecretCombination(colors, combinationLength) {
        let secretCombination = [];
        do {
            const randomColor = getRandomColor(colors);
            if (!contains(randomColor, secretCombination)) {
                secretCombination[secretCombination.length] = randomColor;
            }
        } while (secretCombination.length != combinationLength);
        return secretCombination;

        function getRandomColor(colors) {
            return colors[parseInt(Math.random() * 6)];
        }
    }

    function contains(character, string) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] === character) {
                return true;
            }
        }
        return false;
    }

    function showBoard(attempts, results) {
        let msg = attempts === 0 ? '----- MASTERMIND -----\n' : "";
        msg += `${attempts} attempt(s):`;
        msg += '\n****';
        console.writeln(msg);
        for (const result of results) {
            showResult(result);
        }

        function showResult(result) {
            const [proposalCombination, numberOfBlacks, numberOfWhites] = result;
            console.writeln(`${proposalCombination} --> ${numberOfBlacks} blacks and ${numberOfWhites} whites`);
        }
    }

    function playTurn(colors, secretCombination) {
        const proposalCombination = getProposalCombination(colors, secretCombination.length);
        const combinations = [proposalCombination, secretCombination];
        const numberOfBlacks = getNumberOfBlacks(combinations);
        const numberOfWhites = getNumberOfWhites(combinations, numberOfBlacks);
        const result = [proposalCombination, numberOfBlacks, numberOfWhites];
        return result;


        function getProposalCombination(colors, combinationLength) {
            let proposalCombination;
            let error;
            do {
                proposalCombination = console.readString(`Propon una combinacion:`);
                const invalidLength = proposalCombination.length !== combinationLength;
                if (invalidLength) {
                    console.writeln(`- La longitud de la combinacion es incorrecta!`);
                } else {
                    if (hasInvalidColors(proposalCombination, colors)) {
                        console.writeln(`- Colores invalidos, los colores son" :${colors}`);
                    }
                }
                error = invalidLength || hasInvalidColors(proposalCombination, colors);
            } while (error);

            return proposalCombination;

            function hasInvalidColors(proposalCombination, colors) {
                let hasInvaliColors;
                for (let i = 0; i < proposalCombination.length; i++) {
                    hasInvaliColors |= !contains(proposalCombination[i], colors);
                }
                return hasInvaliColors;
            }
        }

        function getNumberOfBlacks(combinations) {
            let numberOfBlacks = 0;
            const [proposalCombination, secretCombination] = combinations;
            for (let i = 0; i < proposalCombination.length; i++) {
                if (proposalCombination[i] === secretCombination[i]) {
                    numberOfBlacks++;
                }
            }
            return numberOfBlacks;
        }

        function getNumberOfWhites(combinations, blacks) {
            let numberOfWhites = 0;
            const [proposalCombination, secretCombination] = combinations;
            for (let i = 0; i < proposalCombination.length; i++) {
                for (let j = 0; j < secretCombination.length; j++) {
                    if (proposalCombination[i] === secretCombination[j]) {
                        numberOfWhites++;
                    }
                }
            }
            return numberOfWhites > 0 ? numberOfWhites - blacks : numberOfWhites;
        }
    }

    function isEndGame(results, hasMoreAttempts) {
        return (isWinner(results) || !hasMoreAttempts);
    }

    function isWinner(results) {
        const lastResult = results[results.length - 1];
        const [proposalCombination, numberOfBlacks, ...rest] = lastResult;
        return numberOfBlacks === proposalCombination.length;
    }

    function showEndGameMessage(results) {
        console.writeln(isWinner(results) ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
    }

}

function isResumed() {
    let error;
    let answer;
    do {
        answer = console.readString(`Deseas jugar otra partida? (s/n): `);
        error = answer !== `s` && answer !== `n`;
        if (error) {
            console.writeln(`Por favor, responde "s" or "n"`);
        }
    } while (error);
    return answer === 's';
}
