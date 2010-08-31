package com.nitobi.server.tools;

import java.io.StringWriter;
import java.util.*;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Element;

import com.nitobi.exception.NitobiException;
/**
 * Stores a row from a Nitobi XML document.
 * @author Nitobi
 */
public class XmlRecord 
{
	private String m_Key;
	private String m_Xid;
	private Vector m_Values;
	private String m_EbaType;
	private String m_Xml;
	private Element m_XmlElement;
	private String m_ForeignKeyValue;
	
	/**
	 * Constructs an XmlRecord.
	 *
	 */
	public XmlRecord()
	{
		
	}
	/**
	 * The record key.
	 * @return The record key.
	 */
	public String getKey()
	{
		return m_Key;
	}
	
	
	/**
	 * Returns the record key.
	 * @param p_Key The record key.
	 */
	public void setKey(String p_Key)
	{
	    m_Key = p_Key;
	}
	
	/**
	 * The value for the records foreign key field.
	 * @return The value for the records foreign key field.
	 */
	public String getForeignKeyValue()
	{
		return m_ForeignKeyValue;
	}
	
	/**
	 * Sets the foreign key value for the Record.
	 * @param p_Xf The foreign key value.
	 */
	public void setForeignKeyValue(String p_Xf)
	{
		m_ForeignKeyValue = p_Xf;
	}
	
	
	/**
	 * Sets row values as Strings.
	 * @return A Vector of String objects.
	 */
	public Vector getValues()
	{
		return m_Values;
	}
	
	/**
	 * Sets the row values as Strings.
	 * @param p_Values A Vector of String objects.
	 */
	public void setValues(Vector p_Values)
	{
		m_Values = p_Values;
	}
	
	/**
	 * Returns the kind of record in the Nitobi Compressed XML: 
	 * insert, update, delete, or e.
	 * @return insert, update, delete, or e
	 */
	public String getEbaType()
	{
	 	return m_EbaType;
	}
	
	/**
	 * Sets the kind of record in the Nitobi Compressed XML: 
	 * insert, update, delete, or e.
	 * @param p_EbaType insert, update, delete, or e
	 */
	public void setEbaType(String p_EbaType)
	{
		m_EbaType = p_EbaType;
	}
	
	/**
	 * Returns the XML representation of the row.
	 * @return The XML representation of the row.
	 */
	public String getXml()
	{
	 	return m_Xml;
	}
	
	/**
	 * Sets the XML representation of the row.
	 * @param p_Xml The XML representation of the row.
	 */
	public void setXml(String p_Xml)
	{
		m_Xml = p_Xml;
	}
	
	public String getXid()
	{
		return m_Xid;
	}
	
	public void setXid(String xid)
	{
		this.m_Xid = xid;
	}
	
	public Element getXmlElement()
	{
		return m_XmlElement;
	}
	
	public void setXmlElement(Element xmlElement)
	{
		this.m_XmlElement = xmlElement;
	}
	
	public String toXmlString() throws NitobiException
	{
		try
		{
			DOMSource ds = new DOMSource(m_XmlElement);
			StringWriter strWriter = new StringWriter();
			StreamResult strResult = new StreamResult(strWriter);
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer transformer = tf.newTransformer();
			transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			transformer.transform(ds, strResult);
			return strWriter.toString();
		}
		catch (TransformerConfigurationException err)
		{
			NitobiException e = new NitobiException("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.", err);
			throw e;
		}
		catch (TransformerException ex)
		{
			throw new NitobiException("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
	}
	
	public void setAttribute(String name, String value)
	{
		m_XmlElement.setAttribute(name, value);
	}
}
