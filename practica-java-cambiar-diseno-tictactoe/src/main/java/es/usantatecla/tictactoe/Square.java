package es.usantatecla.tictactoe;

public class Square {

	private Token token;

	public Square() {
		token = null;
	}

	public boolean isOccupied() {
		return this.token != null;
	}

	public boolean isOccupied(Color color) {
		if (!isOccupied()) {
			return false;
		}
		return this.token.isThisColor(color);
	}

	public void putToken(Token token) {
		this.token = token;
	}

	public void set(Token token) {
		this.token = token;

	}

	public Token getToken() {
		return token;
	}

	public void write() {
		if (token == null) {
			Message.NULL_SQUARE.toString();
		}
		else {
			this.token.write();
		}
	}



}
