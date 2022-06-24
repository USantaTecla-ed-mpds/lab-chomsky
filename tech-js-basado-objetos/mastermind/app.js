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

    const gameSettings = {
        getColors: function () {
            return "rgybmc";
        },
        getMaxAttempts: function () {
            return 10;
        },
        getCombinationLength: function () {
            return 4;
        }
    }

    return {
        play: function () {
            const secretCombination = initSecretCombination(gameSettings);
            const board = initBoard();
            do {
                board.show();
                const attempt = initAttempt(secretCombination, gameSettings);
                attempt.play();
                board.addAttempt(attempt);
            } while (!board.isEndGame(gameSettings.getMaxAttempts()));
            showEndGameMessage(board);
        }
    }

    function initSecretCombination(gameSettings) {
        let secretCombination = initCombination(gameSettings);
        do {
            const randomColor = gameSettings.getColors()[parseInt(Math.random() * 6)];
            if (!secretCombination.contains(randomColor)) {
                secretCombination.addColor(randomColor);
            }
        } while (secretCombination.hasInValidLength());
        return secretCombination;
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
            hasInValidLength: function () {
                return colors.length !== gameSettings.getCombinationLength();
            },
            hasInValidColors: function () {
                let hasInvalidColors;
                const gameColors = initCombination(gameSettings);
                gameColors.setColors(gameSettings.getColors());
                for (let i = 0; i < colors.length; i++) {
                    hasInvalidColors |= !gameColors.contains(colors[i]);
                }
                return hasInvalidColors;
            },
            setColors: function (otherColors) {
                colors = otherColors;
            }
        }
    }

    function initBoard() {
        let attempts = [];
        return {
            show: function () {
                console.writeln(`${attempts.length} attempt(s):\n****`);
                for (const attempt of attempts) {
                    attempt.show();
                }
            },
            addAttempt: function (attempt) {
                attempts[attempts.length] = attempt;
            },
            isEndGame(maxAttempts) {
                const hasMoreAttempts = attempts.length < maxAttempts;
                return (this.isWinner() || !hasMoreAttempts);
            },
            isWinner() {
                const lastAttempt = attempts[attempts.length - 1];
                return lastAttempt.isWinner();
            }
        }
    }

    function initAttempt(secretCombination, gameSettings) {
        let result = {};
        return {
            play: function () {
                const proposalCombination = getProposalCombination(gameSettings);
                const numberOfBlacks = proposalCombination.getBlacks(secretCombination);
                const numberOfWhites = proposalCombination.getWhites(secretCombination);
                result = {proposalCombination, numberOfBlacks, numberOfWhites};
            },
            isWinner: function () {
                return result.numberOfBlacks === result.proposalCombination.length();
            },
            show: function () {
                console.writeln(`${result.proposalCombination.show()} --> ${result.numberOfBlacks} blacks and ${result.numberOfWhites} whites`);
            }
        }

        function getProposalCombination(gameSettings) {
            let proposalCombination = initCombination(gameSettings);
            let error;
            do {
                const response = console.readString(`Propon una combinacion:`);
                proposalCombination.setColors(response);
                if (proposalCombination.hasInValidLength()) {
                    console.writeln(`- La longitud de la combinacion es incorrecta!`);
                } else if (proposalCombination.hasInValidColors()) {
                    console.writeln(`- Colores invalidos, los colores son" :${gameSettings.getColors()}`);
                }
                error = proposalCombination.hasInValidLength() || proposalCombination.hasInValidColors();
            } while (error);

            return proposalCombination;
        }
    }


    function showEndGameMessage(board) {
        console.writeln(board.isWinner() ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
    }

}


