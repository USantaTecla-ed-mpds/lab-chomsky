const { Console } = require("console-mpds");
const console = new Console();

connect4().playGame();

function connect4() {
    return {
        yesNoDialog: yesNoDialog(),
        boardView: boardView(),
        playGame: function () {
            do {
                this.boardView.init();
                this.yesNoDialog.read(messages().PLAY_AGAIN);
            } while (this.yesNoDialog.isAffirmative());
        }
    }
}

function boardView() {
    const MAX_ROWS = 6;
    const MAX_COLUMNS = 7;
    return {
        board: board(MAX_ROWS, MAX_COLUMNS),
        turnView: turnView(MAX_COLUMNS),
        init: function () {
            console.writeln(messages().TITLE);
            this.board.reset();
            this.show();
            do {
                this.turnView.nextTurn();
                let turnInputToken;
                do {
                    turnInputToken = this.turnView.getToken();
                    if (this.board.isCompletedColumn(turnInputToken)) {
                        console.writeln(messages().COLUMN_NOT_EMPTY);
                    }
                } while (this.board.isCompletedColumn(turnInputToken));
                this.board.putToken(turnInputToken);
                this.show();
            } while (!this.board.isEndGame());
            console.writeln(this.showEndGame());
        },
        show: function () {
            let tokens = this.board.getTokens();
            console.writeln(messages().BOARD_HEADER);
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (typeof (tokens[i][j]) === 'undefined') {
                        console.write(messages().BOARD_HOLE);
                    }
                    if (typeof (tokens[i][j]) === 'object') {
                        if (tokens[i][j].getColor() === colors().Red) {
                            console.write(messages().BOARD_RED);
                        }
                        if (tokens[i][j].getColor() === colors().Yellow) {
                            console.write(messages().BOARD_YELLOW);
                        }
                    }
                }
                console.writeln();
            }
        },
        showEndGame: function () {
            if (this.board.isCompleted()) {
                return messages().GAME_OVER;
            }
            return messages().PLAYER + this.turnView.getColor() + messages().WIN;
        },
    }
}

function board(maxRows, maxColumns) {
    return {
        tokens: [],
        lastToken: undefined,
        reset: function () {
            this.tokens = new Array(maxRows);
            for (let i = 0; i < maxRows; i++) {
                this.tokens[i] = new Array(maxColumns);
            }
        },
        isCompletedColumn: function (token) {
            return typeof (this.tokens[0][token.getColumn()]) === 'object';
        },
        putToken: function (token) {
            token.setRow(this.getFirstEmptyRowFromColumn(token.getColumn()));
            this.lastToken = token;
            this.tokens[this.lastToken.getRow()][this.lastToken.getColumn()] = token;
        },
        getFirstEmptyRowFromColumn: function (column) {
            for (let i = this.tokens.length - 1; i >= 0; i--) {
                if (typeof (this.tokens[i][column]) === 'undefined') {
                    return i;
                }
            }
        },
        isEndGame: function () {
            return inLineChecker().isInLineToken(this.tokens, this.lastToken) || this.isCompleted();
        },
        isCompleted: function () {
            let countTokens = 0;
            for (let i = 0; i < this.tokens.length; i++) {
                for (let j = 0; j < this.tokens[i].length; j++) {
                    if (typeof (this.tokens[i][j]) === 'object') {
                        countTokens++;
                    }
                }
            }
            return countTokens === this.tokens.length * this.tokens[0].length;
        },
        getTokens: function () {
            return this.tokens;
        }
    }
}

function inLineChecker() {
    return {
        IN_LINE_NUMBER_OF_TOKENS: 4,
        tokens: [],
        isInLineToken: function (tokens, token) {
            this.tokens = tokens;
            let inLineToken = false;
            inLineToken ||= this.isInLineHorizontal(token);
            inLineToken ||= this.isInLineVertical(token);
            inLineToken ||= this.isInLineDiagonal(token);
            inLineToken ||= this.isInLineReverseDiagonal(token);
            return inLineToken;
        },
        isInLineHorizontal: function (token) {
            let counterColors = 0;
            let inLine = false;
            for (let i = 0; i < this.tokens[0].length; i++) {
                if (typeof (this.tokens[token.getRow()][i]) === 'object' && this.tokens[token.getRow()][i].getColor() === token.getColor()) {
                    counterColors++;
                } else {
                    counterColors = 0;
                }
                inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
            }
            return inLine;
        },
        isInLineVertical: function (token) {
            let counterColors = 0;
            let inLine = false;
            for (let i = 0; i < this.tokens.length; i++) {
                if (typeof (this.tokens[i][token.getColumn()]) === 'object' && this.tokens[i][token.getColumn()].getColor() === token.getColor()) {
                    counterColors++;
                } else {
                    counterColors = 0;
                }
                inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
            }
            return inLine;
        },
        isInLineDiagonal: function (token) {
            let counterColors = 1;
            let inLine = false;
            const row = token.getRow();
            const column = token.getColumn();
            for (let i = 1; i < this.IN_LINE_NUMBER_OF_TOKENS; i++) {
                if ((row + i) >= 0 && (row + i) < this.tokens.length && (column - i) >= 0 && (column - i) < this.tokens[0].length) {
                    if (typeof (this.tokens[row + i][column - i]) === 'object' && this.tokens[row + i][column - i].getColor() === token.getColor()) {
                        counterColors++;
                    }
                }
                if ((row - i) >= 0 && (row - i) < this.tokens.length && (column + i) >= 0 && (column + i) < this.tokens[0].length) {
                    if (typeof (this.tokens[row - i][column + i]) === 'object' && this.tokens[row - i][column + i].getColor() === token.getColor()) {
                        counterColors++;
                    }
                }
                inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
            }
            return inLine;
        },
        isInLineReverseDiagonal: function (token) {
            let counterColors = 1;
            let inLine = false;
            const row = token.getRow();
            const column = token.getColumn();
            for (let i = 1; i < this.IN_LINE_NUMBER_OF_TOKENS; i++) {
                if ((row + i) >= 0 && (row + i) < this.tokens.length && (column + i) >= 0 && (column + i) < this.tokens[0].length) {
                    if (typeof (this.tokens[row + i][column + i]) === 'object' && this.tokens[row + i][column + i].getColor() === token.getColor()) {
                        counterColors++;
                    }
                }
                if ((row - i) >= 0 && (row - i) < this.tokens.length && (column - i) >= 0 && (column - i) < this.tokens[0].length) {
                    if (typeof (this.tokens[row - i][column - i]) === 'object' && this.tokens[row - i][column - i].getColor() === token.getColor()) {
                        counterColors++;
                    }
                }
                inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
            }
            return inLine;
        },
    }
}

function turnView(maxColumn) {
    return {
        turn: turn(),
        getToken: function () {
            let column = 0;
            let error = true;
            do {
                column = console.readNumber(messages().TURN_BY + this.turn.getColor() + messages().INSERT_COLUMN);
                error = column < 0 || column > maxColumn - 1;
                if (error) {
                    console.writeln(messages().INSERT_VALUES_BETWEEN + (maxColumn - 1));
                }
            } while (error);
            return this.turn.getToken(column);
        },
        nextTurn: function () {
            this.turn.nextTurn();
        },
        getColor: function () {
            return this.turn.getColor();
        }
    }
}

function turn() {
    return {
        color: colors().Red,
        getToken: function (column) {
            const inputCoordinate = coordinate(0, column);
            return token(inputCoordinate, this.color);
        },
        nextTurn: function () {
            this.color === colors().Red ? this.color = colors().Yellow : this.color = colors().Red;
        },
        getColor: function () {
            return this.color;
        }
    }
}

function coordinate(row, column) {
    return {
        row: row,
        column: column,
        getRow: function () {
            return this.row;
        },
        getColumn: function () {
            return this.column;
        },
        setRow: function (row) {
            this.row = row;
        }
    }
}

function token(coordinate, color) {
    return {
        color: color,
        coordinate: coordinate,
        getColor: function () {
            return this.color;
        },
        getRow: function () {
            return this.coordinate.getRow();
        },
        getColumn: function () {
            return this.coordinate.getColumn();
        },
        setRow: function (row) {
            this.coordinate.setRow(row);
        }
    }
}

function colors() {
    return {
        Red: messages().RED,
        Yellow: messages().YELLOW,
    }
}

function yesNoDialog() {
    return {
        YES: messages().YES,
        NO: messages().NO,
        response: "",
        error: true,
        read: function (message) {
            do {
                this.response = console.readString(message);
                this.error = this.response != this.YES && this.response != this.NO;
                if (this.error) {
                    console.writeln(messages().RESPONSE_MUST_BE + this.YES + messages().OR + this.NO);
                }
            } while (this.error);
            return this.response;
        },
        isAffirmative: function () {
            return this.response === this.YES;
        }
    }
}

function messages() {
    return {
        TITLE: "\n      Connect4\n",
        TURN_BY: "\nTurn ",
        COLUMN_NOT_EMPTY: "This column has not empty holes, select another column",
        INSERT_COLUMN: " insert column: ",
        GAME_OVER: "Game over",
        PLAYER: "Player ",
        WIN: " win!",
        BOARD_HEADER: "\n 0  1  2  3  4  5  6\n -------------------",
        BOARD_HOLE: " · ",
        BOARD_RED: " R ",
        BOARD_YELLOW: " Y ",
        INSERT_VALUES_BETWEEN: "Insert value between 0 and ",
        PLAY_AGAIN: "Play again? (yes/no)",
        YES: "yes",
        NO: "no",
        RESPONSE_MUST_BE: "Response must be ",
        OR: " or ",
        RED: "Red",
        YELLOW: "Yellow"
    }
}
