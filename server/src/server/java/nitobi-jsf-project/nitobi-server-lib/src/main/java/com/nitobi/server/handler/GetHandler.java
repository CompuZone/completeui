package com.nitobi.server.handler;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Vector;
import java.util.List;
import java.util.Iterator;
import java.beans.Introspector;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.beans.BeanInfo;
import javax.servlet.http.HttpServletResponse;
import com.nitobi.server.tools.Record;
import com.nitobi.server.tools.ILocaleConverter;
import com.nitobi.server.tools.LocaleConverter;
import com.nitobi.server.tools.XmlConverter;
import com.nitobi.exception.NitobiException;

/**
 * GetHandler provides the means to supply a databound Nitobi Complete UI
 * component with an XML response.  Nitobi Complete UI components conforms to a 
 * standard MVC paradigm for Ajax, whereby the component is rendered on a page
 * then calls for data, which is transformed to the appropriate format using XSL.
 * @author Nitobi
 */
public class GetHandler 
{	
	private ILocaleConverter 	m_localeConverter;
	private Vector				m_fieldDefinitions;
	private Vector				m_records;
	private int 				m_createdRecords = 0;
	private int					m_totalRowCount;
	private String				m_foreignKey;
	private String				m_foreignKeyValue;
	/*
	 * The xml:lang will be set to this value when the XML document is created
	 * see the following for more info:
	 * http://www.w3.org/International/questions/qa-when-xmllang
	 */
	private String 				m_dataLanguage;
	private String				m_errorMessage;
	
	/**
	 * Creates a GetHandler.  
	 *
	 */
	public GetHandler()
	{
		m_localeConverter 	= new LocaleConverter();
		m_fieldDefinitions 	= new Vector();
		// define a field Definition for the primary key of the record
		m_fieldDefinitions.add("_recordID");
		m_records 			= new Vector();
		m_dataLanguage 		= "en";
		m_errorMessage		= "";
	}
	
	/**
	 * Creates a GetHandler with a custom ILocalConverter for use
	 * with non-ASCII characters.
	 * @param localeConverter The Locale converter used by the methods that have byte[] parameters
	 */
	public GetHandler(ILocaleConverter localeConverter)
	{
		this();
		m_localeConverter = localeConverter;
	}
	
	/**
	 * Assigns a language to the XML response to be constructed.
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
	 * @throws NitobiException If message could not be converted to a unicode string
	 */
	public void setErrorMessage(byte[] message) throws NitobiException
	{
		try
		{
			m_errorMessage = m_localeConverter.createUnicodeString(message);
		}
		catch (java.io.UnsupportedEncodingException ex)
		{
			throw new NitobiException("Could not encode string", ex);
		}
	}

	/**
	 * Defines a new field in the GetHandler. Field names are used by the 
	 * client-side component to bind to the data
	 * being returned by the GetHandler.  For example, Nitobi Grid can define
	 * columns and using the xdatafld attribute, can bind a column to a field.
	 * @param fieldName
	 *            The name of the new Field.  This byte array MUST NOT have terminal zero padding.  
	 *            The byte array's length must be exact.
	 * @throws NitobiException If fieldName could not be encoded properly
	 */
	public void defineField(byte[] fieldName) throws NitobiException 
	{
		try
		{
			defineField(m_localeConverter.createUnicodeString(fieldName));
		}
		catch (java.io.UnsupportedEncodingException ex)
		{
			throw new NitobiException("Could not encode string", ex);
		}
	}
	
	/**
	 * Defines a new field in the GetHandler. Field names are used by the 
	 * client-side component to bind to the data
	 * being returned by the GetHandler.  For example, Nitobi Grid can define
	 * columns and using the xdatafld attribute, can bind a column to a field.
	 * 
	 * @param fieldName The name of the new Field
	 * @throws NitobiException If attempting to define a field after a call
	 * to createNewRecord() or if attempting to define a field called
	 * "_recordID" (that field is reserved).
	 */
	public void defineField(String fieldName) throws NitobiException 
	{
		// if called after once createNewRecord has been
		// called throw exception as then different
		// GetHandler.Records could be generated
		if (m_createdRecords > 0) 
		{	
			throw new NitobiException(
					"GetHandler.createNewRecord() has already been called once. You must define all fields before you create new Records!");
		}
		if (fieldName.equals("_recordID")) 
		{
			throw new NitobiException(
					"GetHandler.defineField(fieldName) fieldname must not be _recordID. This ID is reserved for the primary key of the record");
		}
		
		// add Field definition to Vector
		m_fieldDefinitions.add(fieldName);
	}
	
	/**
	 * Returns all the fields defined for this GetHandler
	 * @return A java.util.Vector containing all the fields added to this GetHandler
	 */
	public Vector getFieldDefinitions()
	{
		return m_fieldDefinitions;
	}
	
	/**
	 * Returns all the Records added to this GetHandler
	 * @return A java.util.Vector containing all the Records added to this GetHandler
	 */
	public Vector getRecords()
	{
		return m_records;
	}
	
	/**
	 * Given a POJO style object, the method will automatically find the names
	 * of the object's instance variables and add it to the GetHandler's list
	 * of field names
	 * @param clazz The Class object whose instance variables to use as field names.
	 * @throws NitobiException If the class provided is unable to be introspected
	 */
	public void populateFields(Class clazz) throws NitobiException
	{
		try
		{
			BeanInfo info = Introspector.getBeanInfo(clazz);
			PropertyDescriptor[] props = info.getPropertyDescriptors();
			for (int i = 0; i < props.length; i++)
			{
				PropertyDescriptor property = props[i];
				String propertyName = property.getName();
				if (!propertyName.equals("class") && !(propertyName.equals("id")))
				{
					defineField(propertyName);
				}
			}
		}
		catch (java.beans.IntrospectionException ex)
		{
			throw new NitobiException("Could not get BeanInfo from supplied Class object", ex);
		}
	}
	
	/**
	 * Dynamically gets the value for some property of some object.
	 * @param item The object that that has the property
	 * @param propertyName The name of the property
	 * @return The value of the property
	 * @throws NitobiException
	 */
	private Object getItemValue(Object item, String propertyName) throws NitobiException
	{
		PropertyDescriptor prop;
		Class clazz = item.getClass();
		try
		{
			prop = new PropertyDescriptor(propertyName, clazz);
		}
		catch (IntrospectionException ex)
		{
			throw new NitobiException("Could not access the property '" + propertyName + "' for the provided Object", ex);
		}
		
		Method idAccessor = prop.getReadMethod();
		Object propObj;
		try
		{
			propObj = idAccessor.invoke(item, new Object[]{});
		}
		catch (Exception ex)
		{
			throw new NitobiException("Could not invoke the accessor method for the '" + propertyName + "' property of the provided Object", ex);
		}
		return propObj;
	}
	
	/**
	 * Populates the GetHandler from a list of POJO/JavaBean style objects.
	 * For each item in the list, a new Record will be created and added to the
	 * GetHandler.  Assumes that there is a member variable called 'id' that will be
	 * used as the id of the Record.
	 * <p>
	 * If the POJO has a member variable that is an instance of java.util.Collections,
	 * it will be ignored.
	 * </p>
	 * <p>
	 * All member variables of the the POJO class must support the toString() method.
	 * </p>
	 * @param list
	 * @param clazz
	 * @throws NitobiException
	 */
	public void populateRecords(List list, Class clazz) throws NitobiException
	{
		populateRecords(list, clazz, "id");
	}
	
	/**
	 * Populates the GetHandler from a list of POJO/JavaBean style objects.
	 * For each item in the list, a new Record will be created and added to the
	 * GetHandler.
	 * <p>
	 * If the POJO has a member variable that is an instance of java.util.Collections,
	 * it will be ignored.
	 * </p>
	 * <p>
	 * All member variables of the the POJO class must support the toString() method.
	 * </p>
	 * @param list A list of objects that honour the JavaBean/POJO specification
	 * @param clazz The class that represents each item of the supplied List
	 * @param id The name of the instance variable that uniquely identifies the object
	 * @throws NitobiException
	 */
	public void populateRecords(List list, Class clazz, String id) throws NitobiException
	{
		Iterator listIterator = list.iterator();
		Object listItem;
		while (listIterator.hasNext())
		{
			listItem = listIterator.next();
			Object idObj = getItemValue(listItem, "id");
			Record rec = createNewRecord(idObj.toString());
			Iterator fields = m_fieldDefinitions.iterator();
			while (fields.hasNext())
			{
				String fieldName = (String) fields.next();
				if (!fieldName.equals("_recordID"))
				{
					Object propObj = getItemValue(listItem, fieldName);
					
					if (!java.util.Collection.class.isInstance(propObj) && propObj != null)
					{
						rec.setField(fieldName, propObj.toString());
					}
					else
					{
						rec.setField(fieldName, "");
					}
				}
			}
			addRecord(rec);
		}
	}
	
	/**
	 * Given a List of POJO style objects, the handler will automatically define fields for
	 * the handler corresponding to property names of the class and add a record for each
	 * item in the List.
	 * @param list A list of objects that honour the JavaBean/POJO specification
	 * @param clazz The class that represents each item of the supplied List
	 * @throws NitobiException
	 */
	public void populate(List list, Class clazz) throws NitobiException
	{
		populateFields(clazz);
		populateRecords(list, clazz, null);
	}
	
	/**
	 * Populates the GetHandler from a ResultSet.  The fields will be defined from
	 * the columns in the ResultSet and each row will be converted to a Record object
	 * and added to the GetHandler.  
	 * @param results The ResultSet returned from executing a query
	 * @param id The name of the id column.
	 * @param includeId If true, id will be added as a separate attribute that gets sent
	 * back to the client
	 * @throws NitobiException if the ResultSet could not be accessed
	 */
	public void populate(ResultSet results, String id, Boolean includeId) throws NitobiException
	{
		try
		{
			ResultSetMetaData rsmd = results.getMetaData();
			int numberOfColumns = rsmd.getColumnCount();
			for (int i = 1; i <= numberOfColumns; i++)
			{
				if (!id.equals(rsmd.getColumnName(i)) || includeId.booleanValue())
				{
					defineField(rsmd.getColumnName(i));
				}
			}
			while (results.next()) 
			{
				Record rec = createNewRecord(results.getString(id));
				for (int i = 1; i <= numberOfColumns; i++)
				{
					if (!id.equals(rsmd.getColumnName(i)) || includeId.booleanValue())
					{
						rec.setField(rsmd.getColumnName(i), results.getString(rsmd.getColumnName(i)));
					}
				}
				addRecord(rec);
			}
		}
		catch(SQLException err)
		{
			NitobiException e = new NitobiException("The ResultSet could not be accessed or converted.", err);
			throw e;
		}
	}
	
	/**
	 * Populates the GetHandler from a ResultSet.  The fields will be defined from
	 * the columns in the ResultSet and each row will be converted to a Record object
	 * and added to the GetHandler.  
	 * @param results The ResultSet returned from executing a query
	 * @param id The name of the id column.  The id will not be included as a attribute
	 * in the XML sent back to the client.
	 * @throws NitobiException if the ResultSet could not be accessed
	 */
	public void populate(ResultSet results, String id) throws NitobiException
	{
		populate(results, id, new Boolean(false));
	}
	
	/**
	 * 
	 * Creates a new Record for the current GetHandler.
	 * 
	 * @param idOfRecord
	 *            The unique ID of the new Record. Usually this is the primary
	 *            key of the record received from the database.  This byte array MUST NOT have terminal zero padding.  
	 *            The byte array's length must be exact
	 * @return The new Record.
	 * @throws Exception
	 */
	public Record createNewRecord(byte[] idOfRecord) throws NitobiException 
	{
		try
		{
			return createNewRecord(m_localeConverter.createUnicodeString(idOfRecord));
		}
		catch (java.io.UnsupportedEncodingException ex)
		{
			throw new NitobiException("Could not encode string", ex);
		}
		
	}
	
	/**
	 * Creates a new Record for the current GetHandler.
	 * 
	 * @param idOfRecord
	 *            The unique ID of the new Record. Usually this is the primary
	 *            key of the record received from the database.
	 * @return The new Record.
	 * @throws Exception
	 */
	public Record createNewRecord(String idOfRecord) throws NitobiException 
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
	 * Adds a record to the GetHandler
	 * 
	 * @param record The record to be added.
	 */
	public void addRecord(Record record) 
	{
		m_records.add(record);
	}
	
	/**
	 * Sets the total row count of the datasource.  This is the count of ALL the rows
	 * of the datasource, not just the number of rows that were requested.
	 * @param rowCount The total row count of the datasource.
	 */
	public void setTotalRowCount(int rowCount)
	{
		m_totalRowCount = rowCount;
	}
	
	/**
     * Sets the foreign key field for the datasource.
     * @param fk The foreign key of the datasource.
     */
	public void setForeignKey(String fk)
	{
		m_foreignKey = fk;
	}
	
	/**
	 * Sets up the GetHandler to return event information to the Calendar component.
	 * It defines 5 fields (startdate, enddate, location, description, and type) that 
	 * is used by the Calendar component.
	 * @throws NitobiException
	 */
	public void enableEventMode() throws NitobiException
	{
		this.defineField("startdate");
		this.defineField("enddate");
		this.defineField("location");
		this.defineField("description");
		this.defineField("type");
	}
	
	/**
	 * Creates an event record in the GetHandler to return to the Calendar component on the client side.
	 * @param key A value to uniquely identify the event.  In most cases, this will be a DB key.
	 * @param startDate The start date of the event.  Must be in ISO 8601 format (yyyy-mm-dd hh:mm:ss).
	 * @param endDate The end date of the event.  Must be in ISO 8601 format (yyyy-mm-dd hh:mm:ss).
	 * @param location The location of the event.
	 * @param description A description of the event.
	 * @throws NitobiException
	 */
	public void createEvent(String key, String startDate, String endDate, String location, String description) throws NitobiException
	{
		Record newRecord = this.createNewRecord(key);
		
		newRecord.setField("startdate", startDate);
		newRecord.setField("enddate", endDate);
		newRecord.setField("location", location);
		newRecord.setField("description", description);
		newRecord.setField("type", "event");
		
		this.addRecord(newRecord);
	}
	
	/**
	 * Sends information regarding a date to disable in the client side Calendar component.
	 * @param date The date to disable.  Must be in ISO 8601 format (yyyy-mm-dd hh:mm:ss).
	 * @throws NitobiException
	 */
	public void disableDate(String date) throws NitobiException
	{
		Record newRecord = this.createNewRecord("0");
		
		newRecord.setField("startdate", date);
		newRecord.setField("enddate", "");
		newRecord.setField("location", "");
		newRecord.setField("description", "");
		newRecord.setField("type", "disabled");
		
		this.addRecord(newRecord);
	}
	
	/**
     * Sets the foreign key value associated with the dataset being returned to the client.
     * @param value The value of the foreign key for the data set being returned.
     */
	public void setForeignKeyValue(String value)
	{
		m_foreignKeyValue = value;
	}
	
	/**
	 * Writes back Nitobi compressed XML to the HttpServletResponse.  Uses
	 * UTF-8 encoding by default.
	 * @param response The response object created by the servlet container
	 * @exception NitobiException If the response is unable to be written to
	 */
	public void writeToClient(HttpServletResponse response) throws NitobiException
	{
		writeToClient("UTF-8", response);
	}
	
	/**
	 * Writes back Nitobi compressed XML to the HttpServletResponse.
	 * @param encoding The encoding for the XML document
	 * @param response The response object created by the servlet container
	 * @exception NitobiException If the response is unable to be written to
	 */
	public void writeToClient(String encoding, HttpServletResponse response) throws NitobiException
	{
		// Create an XmlConverter to convert our datasource into EBA XML.
		XmlConverter converter = new XmlConverter();
		converter.setKeyFieldName("_recordID");
		converter.setDataLanguage(m_dataLanguage);
		converter.setErrorMessage(m_errorMessage);
		converter.setTotalRowCount(m_totalRowCount);
		converter.setForeignKey(m_foreignKey);
		converter.setForeignKeyValue(m_foreignKeyValue);
		
		// the order of how Fields are added is very important!
		for (int i = 0; i < m_fieldDefinitions.size(); i++) {
			converter.addField((String) m_fieldDefinitions.get(i));
		}
		
		for (int i = 0; i < m_records.size(); i++) {
			converter.addRecord(((Record) m_records.get(i)).toArray());
		}
		
		// Indicate that this document will be an XML document.
		response.setContentType("text/xml;charset=" + encoding);

		// Convert the data into xml and print it m_writer.
		try
		{
			response.getWriter().write(converter.getEbaXml(encoding));
		}
		catch (java.io.IOException ex)
		{
			throw new NitobiException("Unable to write Nitobi XML to the supplied response", ex);
		}
		
	}
}