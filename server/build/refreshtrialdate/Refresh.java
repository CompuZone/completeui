package refreshtrialdate;

import java.io.*;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Calendar;
import java.util.Vector;
import java.util.Collection;

public class Refresh
{
	public Refresh()
	{
	}

	public static File[] listFilesAsArray(
			File directory,
			String filter,
			boolean recurse)
	{
		Collection<File> files = listFiles(directory, filter, recurse);
//	Java4: Collection files = listFiles(directory, filter, recurse);
		
		File[] arr = new File[files.size()];
		return files.toArray(arr);
	}

	public static Collection<File> listFiles(
//	 Java4: public static Collection listFiles(
			File directory,
			String filter,
			boolean recurse)
	{
		// List of files / directories
		Vector<File> files = new Vector<File>();
//	 Java4: Vector files = new Vector();
		
		// Get files / directories in the directory
		File[] entries = directory.listFiles();
		
		// Go over entries
		for (File entry : entries)
		{
//	 Java4: for (int f = 0; f < files.length; f++) {
//	 Java4: 	File entry = (File) files[f];

			// If there is no filter or the filter accepts the 
			// file / directory, add it to the list
			if (entry.getName().indexOf("nitobi.") == 0 && entry.getName().indexOf(".js") > 0)
			{
				files.add(entry);
			}
			
			// If the file is a directory and the recurse flag
			// is set, recurse into the directory
			if (recurse && entry.isDirectory())
			{
				files.addAll(listFiles(entry, filter, recurse));
			}
		}
		
		// Return collection of files
		return files;		
	}
	
	public static void doExpire(File inFile, File outFile, 
			String dateAnchor, String expireDate,
			String currAnchor, String currentDate )
	{
	    String sSourceFile = ReadWriteFile.getContents(inFile);

		if (sSourceFile.indexOf(dateAnchor) > 0)
		{
			sSourceFile = sSourceFile.replaceAll(dateAnchor, expireDate);
		}
		else
		{
			System.out.println("dateAnchor " + dateAnchor + " could not be found.");
		}

		if (sSourceFile.indexOf(currAnchor) > 0)
		{
			sSourceFile = sSourceFile.replaceAll(currAnchor, currentDate);
		}
		else
		{
			System.out.println("currAnchor " + currAnchor + " could not be found.");
		}

		try 
		{
			outFile.createNewFile();
			ReadWriteFile.setContents(outFile, sSourceFile);
		}
		catch (IOException e)
		{
			System.out.println("file not found");
		}

	}
	
	
	public static void main(String[] args)
	{
		int IN_FILENAME = 0;
		int EXP_DATE_ANCHOR = 1;
		int CURR_DATE_ANCHOR = 2;
		int OUT_FILENAME = 3;

		if (args.length < 4 || (args[1].toString() == "-?") || (args[1].toString() == "-h") )
		{
			System.out.println("The program must be called *exactly* as follows:");
			System.out.println("java -jar refresh-trial.jar inputfile dateAnchor currentDateAnchor outfilename");
			System.out.println("eg. java -jar refresh-trial.jar grid.js expDateMrkr currentDateMrkr out.txt");
			System.out.println("Read Refresh.java for details.");
			return;
		}

		/*
		 * java -jar refresh-trial.jar in.txt 1146692398375 1146951598375 out.txt
		 * 
			ebagdl=1146951598375;
		 	ebagd1=1146692398375;
		 */

		String currentDate = "0";
		String expireDate = "9999999999999";

		// for some reason args[4].toString() == "blah" was not ever being true...
		if (args.length < 6 || (args.length >= 6 && args[5].toString().equals("COMPLETE_UI_REGISTRATION_COMPLETE_u48wg1r3") == false))
		{
			// The current time.
			Calendar c = new GregorianCalendar();
			c.setTime(new Date());
			long currentTime = c.getTimeInMillis();

			// 30 days in seconds.
			long month = 3600*24*30;
			month = month * 1000;

			// Convert the time to a string. 

			currentDate = java.lang.Long.toString(currentTime);
			expireDate = java.lang.Long.toString(currentTime + month);
		}

		// Get the date anchor.
		String dateAnchor = args[EXP_DATE_ANCHOR];
		String currAnchor = args[CURR_DATE_ANCHOR];

	    File inFile = new File(args[IN_FILENAME]);
	    File outFile = new File(args[OUT_FILENAME]);
	    
	    File dir = new File(args[4]);
	    
	    File[] files = listFilesAsArray(dir, "nitobi.toolkit.js",true);
	    for (int f = 0; f < files.length; f++)
	    {
	    	doExpire(files[f],files[f],dateAnchor,expireDate,currAnchor,currentDate);
	    }
	    
	    // Need to zip up script and styles for the Eclipse Plugin
		ZipUtility udZipUtility = new ZipUtility();				
		udZipUtility.strSource = args[4] + "\\javascript_css"; //args[0];		
		udZipUtility.strTarget = args[4] + "\\server_libraries\\java\\eclipse\\com.nitobi.eclipse\\libs\\cui.zip"; //args[1];	
		
		udZipUtility.zip();		
	   
	    return;
	}
}

