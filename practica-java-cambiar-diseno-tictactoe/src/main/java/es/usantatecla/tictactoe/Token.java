package es.usantatecla.tictactoe;

public class Token {

	Color color;

	public Token(Color color) {
		this.color = color;
	}

	public boolean isOccupied(Color color) {
		return this.color.equals(color);
	}

	public void write() {
		this.color.write();

	}

}
