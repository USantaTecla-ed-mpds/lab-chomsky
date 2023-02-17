package es.usantatecla.tictactoe;

class TicTacToe {

	private Board board;
	private Player[] players;
	private static final int NUMBER_PLAYERS = 2;
	private int activePlayer;

	private TicTacToe() {
		this.board = new Board();
		this.players = new Player[NUMBER_PLAYERS];
		this.reset();
	}

	public void reset() {
		for (int i = 0; i < NUMBER_PLAYERS; i++) {
			this.players[i] = new Player(Color.get(i), this.board);
		}
		this.activePlayer = 0;
		this.board.reset();
	}

	private void play() {
		do {
			this.playGame();
		} while (this.isResumedGame());
	}

	private void playGame() {
		Message.TITLE.writeln();
		this.board.write();
		do {
			this.playTurn();
			this.board.write();
		} while (!this.isTicTacToe());
		this.writeWinner();
	}

	private void playTurn() {
		this.players[this.activePlayer].play();
		if (!this.isTicTacToe()) {
			this.activePlayer = (this.activePlayer + 1) % NUMBER_PLAYERS;
		}		
	}

	public Color getActiveColor() {
		return this.players[this.activePlayer].getColor();
	}

	public void writeWinner() {
		this.players[this.activePlayer].writeWinner();
	}

	private boolean isResumedGame() {
		YesNoDialog yesNoDialog = new YesNoDialog();
		yesNoDialog.read(Message.RESUME.toString());
		if (yesNoDialog.isAffirmative()) {
			this.reset();
		}
		return yesNoDialog.isAffirmative();
	}

	private boolean isTicTacToe() {
		return this.board.isTicTacToe(this.getActiveColor());
	}


	public static void main(String[] args) {
		new TicTacToe().play();
	}

}
