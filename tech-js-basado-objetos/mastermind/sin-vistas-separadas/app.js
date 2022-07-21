const { Console } = require("console-mpds");
const console = new Console();

initMastermind().play();

function initMastermind() {
    return {
        play: function () {
            const continueDialog = initYesNoDialog(`¿Quieres jugar otra partida? `);
            do {
                initGame().play();
                continueDialog.read();
            } while (continueDialog.isAffirmative());
        }
    }
}

function initYesNoDialog(question) {
    let answer = ``;
    return {
        read: function () {
            let error;
            do {
                answer = console.readString(question);
                error = !this.isAffirmative() && !this.isNegative();
                if (error) {
                    console.writeln(`Por favor, responda "si" o "no"`);
                }
            } while (error);
        },
        isAffirmative: function () {
            return answer === `si`;
        },
        isNegative: function () {
            return answer === `no`;
        }
    };
}

function initGame() {
    let proposalsCombinations = [];
    const secretCombination = initSecretCombination();

    return {
        play: function () {
            console.writeln(`----- MASTERMIND -----`);
            do {
                this.show();
                proposalsCombinations.push(initProposalCombination().read());
            } while (!this.isEndGame());
            console.writeln(this.isWinner() ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
        },
        show: function () {
            console.writeln(`${proposalsCombinations.length} attempt(s):\n****`);
            for (const proposalCombination of proposalsCombinations) {
                proposalCombination.show();
                secretCombination.getResult(proposalCombination).show();
            }
        },
        isEndGame() {
            return (this.isWinner() || this.isLooser());
        },
        isWinner() {
            const lastProposalCombination = proposalsCombinations[proposalsCombinations.length - 1];
            return secretCombination.getResult(lastProposalCombination).isWinner();
        },
        isLooser() {
            const MAX_ATTEMPTS = 10;
            return proposalsCombinations.length === MAX_ATTEMPTS;
        }
    }
}

function initSecretCombination() {
    const combination = initCombination();
    combination.fillWithRandomColors();
    return {
        getResult: function (proposalCombination) {
            const blacks = this.getBlacks(proposalCombination);
            const whites = this.getWhites(proposalCombination);
            return {
                isWinner() {
                    return blacks === proposalCombination.length();
                },
                show() {
                    console.writeln(` --> ${blacks} blacks and ${whites} whites`);
                }
            }
        },
        getBlacks: function (proposalCombination) {
            let blacks = 0;
            for (let i = 0; i < combination.length(); i++) {
                if (proposalCombination.contains(combination.getColor(i), i)) {
                    blacks++;
                }
            }
            return blacks;
        },
        getWhites: function (proposalCombination) {
            let whites = 0;
            for (let i = 0; i < combination.length(); i++) {
                const color = combination.getColor(i);
                if (proposalCombination.contains(color) && !proposalCombination.contains(color, i)) {
                    whites++;
                }
            }
            return whites;
        },
    }
}

function initProposalCombination() {
    const combination = initCombination();
    return {
        show: function () {
            combination.show();
        },
        getCombination: function () {
            return combination;
        },
        read: function () {
            combination.read();
            return this;
        },
        length: function () {
            return combination.length();
        },
        contains: function (color, index) {
            if (arguments.length == 2) {
                return combination.contains(color, index);
            }
            return combination.contains(color);
        }
    }
}

function initCombination() {
    const COMBINATION_LENGTH = 4;
    const COLORS = "rgbycm";
    let colors = [];
    return {
        show: function () {
            console.write(colors);
        },
        length: function () {
            return colors.length;
        },
        contains: function (color, index) {
            if (arguments.length == 2) {
                return colors[index] === color;
            }
            for (let i = 0; i < colors.length; i++) {
                if (this.contains(color, i)) {
                    return true;
                }
            }
            return false;
        },
        getColor: function (index) {
            return colors[index];
        },
        hasValidLength: function () {
            return colors.length === COMBINATION_LENGTH;
        },
        hasValidColors: function () {
            const gameColors = initCombination();
            gameColors.setColors(COLORS);
            let hasValidColors = true;
            for (let i = 0; i < colors.length; i++) {
                hasValidColors &= gameColors.contains(colors[i]);
            }
            return hasValidColors;
        },
        hasRepeatedColors: function () {
            let hasRepeatedColors = false;
            for (let i = 0; i < colors.length; i++) {
                for (let j = 0; j < colors.length; j++) {
                    if (colors[i] === colors[j] && i !== j) {
                        hasRepeatedColors = true;
                    }
                }
            }
            return hasRepeatedColors;
        },
        setColors: function (otherColors) {
            colors = otherColors;
        },
        fillWithRandomColors: function () {
            do {
                randomColor = COLORS[parseInt(Math.random() * 6)];
                if (!this.contains(randomColor)) {
                    colors[colors.length] = randomColor;
                }
            } while (!this.hasValidLength());
        },
        read: function () {
            let error;
            do {
                response = console.readString(`Propon una combinacion:`);
                this.setColors(response);
                if (!this.hasValidLength()) {
                    console.writeln(`- La longitud de la combinacion es incorrecta!`);
                } else if (this.hasRepeatedColors()) {
                    console.writeln(`- Combinación propuesta incorrecta, al menos, un color está repetido.`);
                } else if (!this.hasValidColors()) {
                    console.writeln(`- Colores invalidos, los colores son" :${COLORS}`);
                }
                error = !this.hasValidLength() || !this.hasValidColors() || this.hasRepeatedColors();
            } while (error);
        }
    }
}