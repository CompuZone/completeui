package com.nitobi.server.tools;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import com.nitobi.exception.NitobiException;

/**
 * A class that converts a Java ResultSet into Nitobi Compressed XML. To convert Nitobi XML
 * into a Java structure use XmlConverter.
 * @author Nitobi
 */
public class ResultSetConverter
{
	private String m_KeyFieldName;
	
	/**
	 * Creates a ResultSetConverter.
	 */
	public ResultSetConverter()
	{
	}
	
	/**
	 * The name of the field that is the key field.
	 * @param fieldName The name of the key field.
	 */
	public void setKeyFieldName(String fieldName)
	{
		m_KeyFieldName = fieldName;
	}

	/** The name of the field that is the key field.
	 * @return The name of the field that is the key field.
	 */
	public String getKeyFieldName()
	{
		return m_KeyFieldName;
	}
	
	/**
	 * Returns compressed Nitobi XML given a ResultSet that has data in it. You should first
	 * set the KeyFieldName.
	 * @param rs The ResultSet.
	 * @return Nitobi XML.  
	 * @throws NitobiException
	 */
	public String getEbaXml(ResultSet rs,String encoding) throws NitobiException
	{
		XmlConverter xmlConverter = new XmlConverter();
		try
		{
			xmlConverter.setKeyFieldName(getKeyFieldName());
			ResultSetMetaData rsmd = rs.getMetaData();
			int numberOfColumns = rsmd.getColumnCount();
			for (int i = 1; i <= numberOfColumns; i ++)
			{
				xmlConverter.addField(rsmd.getColumnName(i));
			}
			while (rs.next()) 
			{
				
				String values[] = new String[numberOfColumns];
				for (int i = 1; i <= numberOfColumns; i ++)
				{
					String value = rs.getString(rsmd.getColumnName(i));
					values[i-1] = value;
				}
				xmlConverter.addRecord(values);
			}
		}
		catch(SQLException err)
		{
			NitobiException e = new NitobiException("The ResultSet could not be accessed or converted.", err);
			throw e;
		}
		return xmlConverter.getEbaXml(encoding);
		
	}
	
}