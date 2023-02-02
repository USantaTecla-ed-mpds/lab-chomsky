import com.iotassistant.services.Date;
import com.iotassistant.services.DateFormat;
import com.iotassistant.services.Weekday;

public class Date {

	public Date(int year, int month, int day, int hours, int minutes, int seconds);

	public Date(String date, DateFormat dateFormat);

	public Date(int year, int month, int day);

	public int getDay();

	public int getYear();

	public int getMonth();

	public static boolean isValidDate(String date);

	public static Date now();

	public Weekday getWeekday();

	public boolean isLeapYear();

	public int getDaysSince(Date date);

	public int getMonthsSince(Date date);

	public int getYearsSince(Date date);

	public boolean isAfter(Date date);

	public boolean isBefore(Date date);

	public Date getDateAfterDays(int days);

	public String toString(DateFormat dateFormat);

}