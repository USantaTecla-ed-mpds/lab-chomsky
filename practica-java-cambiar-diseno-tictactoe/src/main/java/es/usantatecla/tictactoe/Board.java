package es.usantatecla.tictactoe;

class Board {

	private Square[][] squares;

	public Board() {
		this.squares = new Square[Coordinate.getDimension()][Coordinate.getDimension()];
		this.reset();
	}

	public void reset() {
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				this.squares[i][j] = new Square();
			}
		}
	}

  public boolean isComplete(Color color) {
		for(Coordinate coordinate : this.getCoordinates(color)) {
			if (coordinate == null){
				return false;
			}
		}
		return true;
	}
		

	private Coordinate[] getCoordinates(Color color) {
		assert color != null;

		Coordinate[] coordinates = new Coordinate[Coordinate.getDimension()];
		int k = 0;
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				if (this.isOccupied(new Coordinate(i, j), color)) {
					coordinates[k] = new Coordinate(i, j);
					k++;
				}
			}
		}
		return coordinates;
	}

	public void putToken(Coordinate coordinate, Token token) {
		assert coordinate != null;
		this.getSquare(coordinate).set(token);
	}

	public void moveToken(Coordinate origin, Coordinate target) {
		assert origin != null && !this.isEmpty(origin);
		assert target != null && this.isEmpty(target);
		assert !origin.equals(target);

		Token originToken = this.getSquare(origin).getToken();
		this.putToken(origin, null);
		this.putToken(target, originToken);
	}


	public boolean isOccupied(Coordinate coordinate, Color color) {
		return this.getSquare(coordinate).isOccupied(color);
	}
	
	public Square getSquare(Coordinate coordinate) {
		return squares[coordinate.getRow()][coordinate.getColumn()];
	}

	public boolean isEmpty(Coordinate coordinate) {
		return this.getSquare(coordinate).isOccupied();
	}

	public boolean isTicTacToe(Color color) {
		assert color != null;;

		Direction[] directions = this.getDirections(color);
		if (directions.length < Coordinate.getDimension() - 1) {
			return false;
		}
		for (int i = 0; i < directions.length - 1; i++) {
			if (directions[i] != directions[i + 1]) {
				return false;
			}
		}
		return !directions[0].isNull();
	}

	private Direction[] getDirections(Color color) {
		assert color != null;;

		Coordinate[] coordinates = this.getCoordinates(color);
		int pairs = 0;
		for (int i = 1; i < coordinates.length; i++) {
			if (coordinates[i] != null) {
				pairs++;
			}
		}
		Direction[] directions = new Direction[pairs];
		for (int i = 0; i < directions.length; i++) {
			directions[i] = coordinates[i].getDirection(coordinates[i + 1]);
		}
		return directions;
	}

	public void write() {
		Message.HORIZONTAL_LINE.writeln();
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			Message.VERTICAL_LINE.write();
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				this.getSquare(new Coordinate(i, j)).write();
				Message.VERTICAL_LINE.write();
			}
			Console.getInstance().writeln();
		}
		Message.HORIZONTAL_LINE.writeln();
	}

}

