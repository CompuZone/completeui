package eba.gethandler;

import java.io.IOException;
import java.io.Writer;
import java.util.Vector;
import javax.servlet.http.HttpServletResponse;
import eba.tools.*;

/**
 * This class provides all specific functionality needed for the EBA:Grid or EBA:Web ComboBox
 * GenericGetHandler
 * @author Nitobi
 * @deprecated Use com.nitobi.server.handler.GetHandler
 */
public class GenericGetHandler {
	
	private HttpServletResponse m_response;
	
	private java.io.Writer 		m_writer;
	
	private ILocaleConverter 	m_localeConverter;
	
	private Vector		m_fieldDefinitions;
	
	private Vector		m_records;
	
	private int 				m_createdRecords = 0;
	
	/**
	 * The xml:lang will be set to this value when the XML document is created
	 * see the following for more info:
	 * http://www.w3.org/International/questions/qa-when-xmllang
	 */
	private String 				m_dataLanguage;
	
	private String				m_errorMessage;
	
	/**
	 * Creates a GenericGetHandler.
	 * 
	 * @param response
	 *            The HttpServletResponse the GenericGetHandler should reply to
	 * @param writer
	 *            The Writer the GenericGetHandler should write to
	 */
	public GenericGetHandler(HttpServletResponse response, Writer writer)
	throws Exception 
	{
		m_response		 	= response;
		m_writer 			= writer;
		m_localeConverter 	= new LocaleConverter();
		m_fieldDefinitions 	= new Vector();
		// define a field Definition for the primary key of the record
		m_fieldDefinitions.add("_recordID");
		m_records 			= new Vector();
		m_dataLanguage 		= "en";
		m_errorMessage		= "";
	}
	
	/**
	 * Creates a GenericGetHandler.
	 * 
	 * @param response
	 *            The HttpServletResponse the GenericGetHandler should reply to
	 * @param writer
	 *            The Writer the GenericGetHandler should write to
	 * @param localeConverter
	 *            The Locale converter used by the methods that have byte[] parameters
	 */
	public GenericGetHandler(HttpServletResponse response, 
			Writer writer,
			ILocaleConverter localeConverter) throws Exception 
	{
		this(response,writer);
		m_localeConverter 	= localeConverter;
	}
	
	/**
	 * The xml:lang will be set to this value when the XML document is created
	 * see the following for more info:
	 * http://www.w3.org/International/questions/qa-when-xmllang
	 * @param language
	 *            The XML:lang for the document
	 */
	public void setDataLanguage(String language) 
	{
		m_dataLanguage = language;
	}
	
	/**
	 * Sets an error message to be passed up to the client in the response.
	 * 
	 * @param message
	 *            The error message
	 * @throws Exception
	 */
	public void setErrorMessage(String message) 
	{
		m_errorMessage = message;
	}
	
	/**
	 * Sets an error message to be passed up to the client in the response.
	 * 
	 * @param message
	 *            The error message as a byte array.  This byte array MUST NOT have terminal zero padding.  
	 *            The byte array's length must be exact.
	 * @throws Exception
	 */
	public void setErrorMessage(byte[] message)
	throws Exception
	{
		m_errorMessage = m_localeConverter.createUnicodeString(message);
	}

	/**
	 * Defines a new field in the GenericGetHandler. Field names must exactly
	 * correspond to the attribute Grid's xdatafld in the ColumnDefinition tags in
	 * order to be rendered to that column in the Grid or Web ComboBox. 
	 * 
	 * @param fieldName
	 *            The name of the new Field.  This byte array MUST NOT have terminal zero padding.  
	 *            The byte array's length must be exact.
	 * @throws Exception
	 */
	public void defineField(byte[] fieldName) throws Exception 
	{
		defineField(m_localeConverter.createUnicodeString(fieldName));
	}
	
	/**
	 * Defines a new field in the GenericGetHandler. Field names must exactly
	 * correspond to the attribute xdatafld in the ColumnDefinition tags in
	 * order to be rendered to that column in the Grid.
	 * 
	 * @param fieldName
	 *            The name of the new Field
	 * @throws Exception
	 */
	public void defineField(String fieldName) throws Exception 
	{
		// if called after once createNewRecord has been
		// called throw exception as then different
		// GenericGetHandler.Records could be generated
		if (m_createdRecords > 0) {
			
			throw new Exception(
			"GenericGetHandler.createNewRecord() has already been called once. You must define all fields before you create new Records!");
		}
		if (fieldName.equals("_recordID")) {
			throw new Exception(
			"GenericGetHandler.defineField(fieldName) fieldname must not be _recordID. This ID is reserved for the primary key of the record");
		}
		// add Field definition to Vector
		m_fieldDefinitions.add(fieldName);
	}
	
	/**
	 * 
	 * Creates a new Record for the current GenericGetHandler.
	 * 
	 * @param idOfRecord
	 *            The unique ID of the new Record. Usually this is the primary
	 *            key of the record received from the database
	 * @return The new Record. This byte array MUST NOT have terminal zero padding.  
	 *            The byte array's length must be exact
	 * @throws Exception
	 */
	public Record createNewRecord(byte[] idOfRecord) throws Exception 
	{
		return createNewRecord(m_localeConverter
				.createUnicodeString(idOfRecord));
	}
	
	/**
	 * 
	 * Creates a new Record for the current GenericGetHandler.
	 * 
	 * @param idOfRecord
	 *            The unique ID of the new Record. Usually this is the primary
	 *            key of the record received from the database.
	 * @return The new Record.
	 * @throws Exception
	 */
	public Record createNewRecord(String idOfRecord) throws Exception 
	{
		
		// if fieldName array is empty (defineField has never been called) throw
		// exception
		m_createdRecords++;
		
		// create a String array in order to be able to cast to a String[].
		String[] tmp = new String[0];
		return new Record((String[]) m_fieldDefinitions.toArray(tmp),
				idOfRecord, m_localeConverter);
	}
	
	/**
	 * Adds a record to the GenericGetHandler
	 * 
	 * @param record
	 *            The record to be added.
	 */
	public void addRecord(Record record) 
	{
		m_records.add(record);
	}
	
	/**
	 * Writes back the EBA compressed XML to the Grid and should only be called
	 * once at the end of the GenericGetHandler page. Uses default encoding of UTF-8
	 * for the XML document.
	 * 
	 * @throws IOException
	 */
	public void writeToClient() throws IOException 
	{
		writeToClient("utf-8");
	}
	
	/**
	 * This method clears the writer buffer then, writes back the EBA
	 * compressed XML to the Component.  This should only be called once at the end of
	 * the GenericGetHandler page.
	 * 
	 * @param encoding
	 *            The encoding for the XML document
	 * @throws IOException
	 */
	public void writeToClient(String encoding) throws IOException 
	{
		writeToClient(encoding, m_writer);
	}

	/**
	 * Writes back the EBA compressed XML to the Grid and should only be called
	 * once at the end of the GenericGetHandler page.  The writer buffer is cleared.
	 * 
	 * @param encoding
	 *            The encoding for the XML document
	 * @param writer
	 *            The writer used to create the xml document
	 * @throws IOException
	 */
	public void writeToClient(String encoding, java.io.Writer writer)
	throws IOException 
	{
		// Create an XmlConverter to convert our datasource into EBA XML.
		XmlConverter converter = new XmlConverter();
		converter.setKeyFieldName("_recordID");
		converter.setDataLanguage(m_dataLanguage);
		converter.setErrorMessage(m_errorMessage);
		
		// the order of how Fields are added is very important!
		for (int i = 0; i < m_fieldDefinitions.size(); i++) {
			converter.addField((String) m_fieldDefinitions.get(i));
		}
		
		for (int i = 0; i < m_records.size(); i++) {
			converter.addRecord(((Record) m_records.get(i)).toArray());
		}
		
		// Indicate that this document will be an XML document.
		if (null != m_response) {
			m_response.setContentType("text/xml;charset=" + encoding);
		}
		// Convert the data into xml and print it m_writer.
		writer.write(converter.getEbaXml(encoding));
	}
	
	/**
	 * main will do a basic test for the GenericGetHandler. The output will print to
	 * stdout
	 */
	
	public static void main(String[] args) 
	{
		
		HttpServletResponse dummyResponse 		= null;
		Writer dummyWriter 						= null;
		java.io.PrintWriter currentPrintWriter 	= new java.io.PrintWriter(
				System.out);
		
		try {
			GenericGetHandler currentGenericGetHandler = new GenericGetHandler(dummyResponse,
					dummyWriter);
			currentGenericGetHandler.defineField("client");
			currentGenericGetHandler.defineField("service");
			currentGenericGetHandler.defineField("quantity");
			currentGenericGetHandler.defineField("charge");
			currentGenericGetHandler.defineField("memo");
			currentGenericGetHandler.defineField("date");
			currentGenericGetHandler.defineField("inet");
			currentGenericGetHandler.defineField("image");
			
			Record curRecord = currentGenericGetHandler.createNewRecord("ID");
			// ja unicode characters in a string
			curRecord.setField("client", "??????");
			curRecord.setField("service", "a");
			curRecord.setField("quantity",
			"Rodrick <br>Lott<br> Kenneth <br />Sellers<br /> Guillermo <img alt=\"zz\" />Page ");
			curRecord.setField("charge", "0.00");
			curRecord.setField("memo", ">");
			curRecord.setField("date",
			"Leoma >> Pearson Erica %3ci%3eDuncan%3c/i%3e ");
			curRecord.setField("inet",
			"Alma <King> Judith &lt;Talley&gt; Maynard << Rocha ");
			curRecord.setField(
					"image",
			"Lois      Medena Tyson&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jimenez Wendi <b>Frasier</b> ");
			
			currentGenericGetHandler.addRecord(curRecord);
			currentGenericGetHandler.setErrorMessage("not a real error, just a test.");
			currentGenericGetHandler.writeToClient("utf-8", currentPrintWriter);
			currentPrintWriter.flush();
			
			/**
			 * expected result '<?xml version="1.0" encoding="utf-8" ?><root
			 * fields="client|service|quantity|charge|memo|date|inet|image"><e
			 * xk="ID" a="??????" b="a" c="Rodrick &lt;br&gt;Lott&lt;br&gt;
			 * Kenneth &lt;br /&gt;Sellers&lt;br /&gt; Guillermo &lt;img
			 * alt=&quot;zz&quot; /&gt;Page " d="0.00" e="&gt;" f="Leoma
			 * &gt;&gt; Pearson Erica %3ci%3eDuncan%3c/i%3e " g="Alma
			 * &lt;King&gt; Judith &amp;lt;Talley&amp;gt; Maynard &lt;&lt; Rocha "
			 * h="Lois Medena
			 * Tyson&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;Jimenez
			 * Wendi &lt;b&gt;Frasier&lt;/b&gt; " /></root>'
			 */
			String expectedXML = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><root fields=\"client|service|quantity|charge|memo|date|inet|image\" error=\"not a real error, just a test.\"><e xk=\"ID\" a=\"??????\" b=\"a\" c=\"Rodrick &lt;br&gt;Lott&lt;br&gt; Kenneth &lt;br /&gt;Sellers&lt;br /&gt; Guillermo &lt;img alt=&quot;zz&quot; /&gt;Page \" d=\"0.00\" e=\"&gt;\" f=\"Leoma &gt;&gt; Pearson Erica %3ci%3eDuncan%3c/i%3e \" g=\"Alma &lt;King&gt; Judith &amp;lt;Talley&amp;gt; Maynard &lt;&lt; Rocha \" h=\"Lois      Medena Tyson&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;Jimenez Wendi &lt;b&gt;Frasier&lt;/b&gt; \"  /></root>";
			System.out.print("\nExpected result \n" + expectedXML + "\n\n");
		} catch (Exception e) {
			System.out.println("Exception: [" + e + "]\n"); // Display the
			// string.
		}
	}
}