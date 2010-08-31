package eba.tools;
import java.sql.*;
 
/**
 * A class that converts a Java ResultSet into EBA Compressed XML. To convert EBA XML
 * into a Java structure use EbaXmlConverter.
 * @author Nitobi
 * @deprecated Use com.nitobi.server.tools.ResultSetConverter
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
	 * Returns compressed EBA XML given a ResultSet that has data in it. You should first
	 * set the KeyFieldName.
	 * @param rs The ResultSet.
	 * @return EBA XML.
	 * @throws Exception
	 */
	public String getEbaXml(ResultSet rs,String encoding) throws Exception
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
		catch(Exception err)
		{
			Exception e = new Exception("The ResultSet could not be accessed or converted.");
			throw e;
		}
		return xmlConverter.getEbaXml(encoding);
		
	}
	
}