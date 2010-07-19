package eba.tools;
import java.util.*;
/**
 * Stores a row from an EBA XML document.
 * @author Nitobi
 * @deprecated Use com.nitobi.server.tools.XmlRecord
 */
public class XmlRecord 
{
	private String m_Key;
	private Vector m_Values;
	private String m_EbaType;
	private String m_Xml;
	
	/**
	 * The record key.
	 * @return The record key.
	 */
	public String getKey()
	{
		return m_Key;
	}
	
	
	/**
	 * The record key.
	 * @param p_Key The record key.
	 */
	public void setKey(String p_Key)
	{
	    m_Key = p_Key;
	}
	
	
	/**
	 * The row values as Strings.
	 * @return A Vector of String objects.
	 */
	public Vector getValues()
	{
		return m_Values;
	}
	
	/**
	 * The row values as Strings.
	 * @param p_Values A Vector of String objects.
	 */
	public void setValues(Vector p_Values)
	{
		m_Values = p_Values;
	}
	
	/**
	 * The kind of record in the EBA Compressed XML: insert, update, delete, or e.
	 * @return insert, update, delete, or e
	 */
	public String getEbaType()
	{
	 	return m_EbaType;
	}
	
	/**
	 * The kind of record in the EBA Compressed XML: insert, update, delete, or e.
	 * @param p_EbaType insert, update, delete, or e
	 */
	public void setEbaType(String p_EbaType)
	{
		m_EbaType = p_EbaType;
	}
	
	/**
	 * The XML representation of the row.
	 * @return The XML representation of the row.
	 */
	public String getXml()
	{
	 	return m_Xml;
	}
	
	/**
	 * The XML representation of the row.
	 * @param p_Xml The XML representation of the row.
	 */
	public void setXml(String p_Xml)
	{
		m_Xml = p_Xml;
	}
}
