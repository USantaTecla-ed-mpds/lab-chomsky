const { Console } = require("console-mpds");
const console = new Console();

playMasterMind();

function playMasterMind() {
    const continueDialog = initYesNoDialog(`¿Quieres jugar otra partida? `);
    do {
        const game = initGame();
        game.play();
        continueDialog.read();
    } while (continueDialog.isAffirmative());
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
    let gameSettings = {
        getColors: function () {
            return "rgybop";
        },
        getMaxAttempts: function () {
            return 10;
        },
        getCombinationLength: function () {
            return 4;
        }
    };


    return {
        play: function () {
            console.writeln(`----- MASTERMIND -----`);
            const board = initBoard(gameSettings);
            do {
                board.show();
                const proposalCombination = initCombination(gameSettings);
                proposalCombination.read();
                board.add(proposalCombination);
            } while (!board.isEndGame());
            console.writeln(board.isWinner() ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
        }
    }

    function initBoard(gameSettings) {
        let proposalCombinations = [];
        const secretCombination = initSecretCombination(gameSettings);
        return {
            show: function () {
                console.writeln(`${getNumberOfAttempts()} attempt(s):\n****`);
                for (const proposalCombination of proposalCombinations) {
                    const result = secretCombination.getResult(proposalCombination);
                    result.show();
                }
            },
            add: function (proposalCombination) {
                proposalCombinations.push(proposalCombination);
            },
            isEndGame() {
                return (this.isWinner() || getNumberOfAttempts() > gameSettings.getMaxAttempts());
            },
            isWinner() {
                const lastProposalCombination = proposalCombinations[proposalCombinations.length - 1];
                const result = secretCombination.getResult(lastProposalCombination);
                return result.isWinner();
            }
        }
        function getNumberOfAttempts() {
            return proposalCombinations.length;
        }
    }

    function initSecretCombination(gameSettings) {
        const combination = initCombination(gameSettings);
        do {
            randomColor = gameSettings.getColors()[parseInt(Math.random() * 6)];
            if (!combination.contains(randomColor)) {
                combination.addColor(randomColor);
            }
        } while (!combination.hasValidLength());

        return {
            getResult: function (proposalCombination) {
                const blacks = combination.getBlacks(proposalCombination);
                const whites = combination.getWhites(proposalCombination);
                return {
                    getblacks: function () {
                        return blacks;
                    },
                    getWhites: function () {
                        return whites;
                    },
                    isWinner() {
                        return blacks === proposalCombination.length;
                    },
                    show() {
                        console.writeln(`${proposalCombination.show()} --> ${blacks} blacks and ${whites} whites`);
                    }
                }
            }
        }
    }

    function initCombination(gameSettings) {
        let colors = [];
        return {
            show: function () {
                console.writeln(colors);
            },
            addColor: function (color) {
                colors[colors.length] = color;
            },
            contains: function (color) {
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] === color) {
                        return true;
                    }
                }
                return false;
            },
            length: function () {
                return colors.length;
            },
            getBlacks: function (combination) {
                let blacks = 0;
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] === combination.getColors()[i]) {
                        blacks++;
                    }
                }
                return blacks;
            },
            getWhites: function (combination) {
                let whites = 0;
                for (let i = 0; i < colors.length; i++) {
                    for (let j = 0; j < combination.getColors().length; j++) {
                        if (colors[i] === combination.getColors()[j]) {
                            whites++;
                        }
                    }
                }
                const blacks = this.getBlacks(combination);
                return whites > 0 ? whites - blacks : whites;
            },
            getColors: function () {
                return colors;
            },
            hasValidLength: function () {
                return colors.length === gameSettings.getCombinationLength();
            },
            hasValidColors: function () {               
                gameColors = initCombination(gameSettings);
                gameColors.setColors(gameSettings.getColors());
                let hasValidColors  = true;
                for (let i = 0; i < colors.length; i++) {
                    hasValidColors &= gameColors.contains(colors[i]);
                }
                return hasValidColors;
            },
            setColors: function (otherColors) {
                colors = otherColors;
            },
            read : function() {
                let error;
                do {
                    response = console.readString(`Propon una combinacion:`);
                    this.setColors(response);
                    if (!this.hasValidLength()) {
                        console.writeln(`- La longitud de la combinacion es incorrecta!`);
                    } else if (!this.hasValidColors()) {
                        console.writeln(`- Colores invalidos, los colores son" :${gameSettings.getColors()}`);
                    }
                    error = !this.hasValidLength() || !this.hasValidColors();
                } while (error);
            }
        }
    }


}


