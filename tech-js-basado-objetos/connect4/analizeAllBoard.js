function inLine() { //version analiza todo el board
    return {
        IN_LINE_NUMBER_OF_TOKENS: 4,
        tokens: [],
        isInLineTokens: function (tokens) {
            this.tokens = tokens;
            let inLineTokens = false;
            for (const color in colors()) {
                inLineTokens ||= this.isInLineHorizontal(color);
                inLineTokens ||= this.isInLineVertical(color);
                inLineTokens ||= this.isInLineDiagonal(color);
                inLineTokens ||= this.isInLineReverseDiagonal(color);
            }
            return inLineTokens;
        },
        isInLineHorizontal: function (color) { //repeated code
            let counterColors = 0;
            let inLine = false;
            for (let i = 0; i < this.tokens.length; i++) {
                for (let j = 0; j < this.tokens[i].length; j++) {
                    if (this.isColorOnPosition(i, j, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
                counterColors = 0;
            }
            return inLine;
        },
        isInLineVertical: function (color) { //repeated code
            let counterColors = 0;
            let inLine = false;
            for (let i = 0; i < this.tokens[0].length; i++) {
                for (let j = 0; j < this.tokens.length; j++) {
                    if (this.isColorOnPosition(j, i, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
                counterColors = 0;
            }
            return inLine;
        },
        isInLineDiagonal: function (color) { //todo repeated code, magic numbers, hardcoded
            let counterColors = 0;
            let inLine = false;
            for (let i = 0, row = 6, column = 0; i < 6; i++, row = 6 - i, column = 0, counterColors = 0) {
                for (let j = i; j < 6; j++) {
                    if (this.isColorOnPosition(--row, column++, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
            }
            for (let i = 0, row = 0, column = 6; i < 6; i++, row = 0 + i, column = 6) {
                for (let j = i; j < 6; j++) {
                    if (this.isColorOnPosition(row++, column--, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
            }
            return inLine;
        },
        isInLineReverseDiagonal: function (color) { //todo repeated code, magic numbers, hardcoded
            let counterColors = 0;
            let inLine = false;
            for (let i = 0, row = 0, column = 0; i < 6; i++, row = 0 + i, column = 0, counterColors = 0) {
                for (let j = i; j < 6; j++) {
                    if (this.isColorOnPosition(row++, column++, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
            }
            for (let i = 0, row = 6, column = 6; i < 6; i++, row = 6 - i, column = 6, counterColors = 0) {
                for (let j = i; j < 6; j++) {
                    if (this.isColorOnPosition(--row, column--, color)) {
                        counterColors++;
                    } else {
                        counterColors = 0;
                    }
                    inLine ||= counterColors === this.IN_LINE_NUMBER_OF_TOKENS;
                }
            }
            return inLine;
        },
        isColorOnPosition(row, column, color) {
            return typeof (this.tokens[row][column]) === 'object' && this.tokens[row][column].getColor() === color;
        },
    }
}