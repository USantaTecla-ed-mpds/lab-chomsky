package es.usantatecla.tictactoe;

enum Color {

	X,
	O;

	public static Color get(int ordinal) {
		assert new ClosedInterval(0, Color.O.ordinal()-1).isIncluded(ordinal);

		return Color.values()[ordinal];
	}

	public void write() {
		String string = this.name();
		Console.getInstance().write(string);
	}

}
