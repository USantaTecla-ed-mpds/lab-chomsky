public class Coordinate {
	
	public Coordinate(int x, int y);
	
	public int getX();
	
    public int getY();
    
    public Coordinate shift(int x, int y);
    
    public Coordinate shift(Coordinate coordinate);
    
    public boolean equals(Coordinate coordinate);
    
    public int getDistance(Coordinate coordinate);
    
    public boolean isSymetric(Coordinate coordinate);

	
}