package com.nitobi.server.tools;

import java.util.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;
import org.xml.sax.SAXException;
import java.io.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import com.nitobi.exception.NitobiException;
	
/**
 * This class enables you convert any kind of datasource into an Nitobi XML document. In other words
 * it enables you to build an Nitobi XML Document. You can also use it to convert an Nitobi XML document
 * into a java object.
 * <p>
 * This is an example of Nitobi XML:
 * </p>
 * <code>
 * <pre>
 * &lt;root xml:lang="en" fields="Field1|Field2|Field3" keys="Field1|Field2|Field3"&gt;
 * 	&lt;e xk="0" a="value01" b="value02" c="value03" /&gt;
 * 	&lt;e xk="1" a="value11" b="value12" c="value13" /&gt;
 * 	&lt;e xk="2" a="value21" b="value22" c="value23" /&gt;
 * &lt;/root&gt;
 * </pre>
 * </code>
 * <P>
 * <B>Note:</B> you can only
 * go in one direction at a time. That is, you can only use this to convert blocks
 * of records/xml at a time. You cannot convert XML, add more records, and convert
 * it back.
 * @author Nitobi
 */
public class XmlConverter
{
	private Vector m_FieldNames;
	private String m_KeyFieldName;
	private String m_RecordsXml;
	private Vector m_Records;
	private String m_DataLanguage;
	private String m_ErrorMessage;
	private int m_totalRowCount;
	private String m_foreignKey;
	private String m_foreignKeyValue;

	/**
	 * Creates an XmlConverter.
	 */
	public XmlConverter()
	{
	    m_FieldNames 	= new Vector();
	    m_KeyFieldName 	= "";
	    m_RecordsXml 	= "";
	    m_DataLanguage  = "en";
	    m_ErrorMessage	= "";
	}

   /*
	* the following does a minimal amount of transcoding This does
	* not do HTML escaping
	*
	* The following encodings may need to be performed in the future.
	* The only encoding required by the client should be preformed on
	* data
	* <pre>
	* &nbsp; ---> &#a0;
	* 
	* 	char tab [] = {(char) 9};
	*	newStr = newStr.replaceAll(new String(tab), "&#9;");
	*	char space [] = {(char) 32};
	*  newStr = newStr.replaceAll(new String(space), "&#32;");
	* </pre>
	* A fun app you can run on output: [http://www.stg.brown.edu/cgi-bin/xmlvalid/xmlvalid.pl]
	*/
	
	/**
	 * Escapes characters for use in an XML document.  The following encoding takes
	 * place:
	 * <pre>
	 * quote (") &quot; 
	 * ampersand (&) &amp; 
	 * less than (<) &lt; 
	 * greater than (>) &gt; 
	 * </pre>
	 * 
	 */
	public String encodeXML(String stringToEncode)
    {
		/* 
		   Encode the following 
		   quote (") &quot; 
		   ampersand (&) &amp; 
		   less than (<) &lt; 
		   greater than (>) &gt; 
		*/
		String newStr = stringToEncode;
		newStr = newStr.replaceAll("&", "&amp;"); // Make sure to replace this first.
		newStr = newStr.replaceAll("\"", "&quot;");
		newStr = newStr.replaceAll("<", "&lt;");
		newStr = newStr.replaceAll(">", "&gt;");
		char carriageReturn [] = {(char) 13};
		char newLine [] = {(char) 10};
		newStr = newStr.replaceAll(new String(newLine), "&#10;");
		newStr = newStr.replaceAll(new String(carriageReturn), "&#13;");
		return newStr;
	}

    /**
     * Assigns a language to the XML response to be constructed.
	 * The xml:lang will be set to this value when the XML document is created
	 * see the following for more info:
	 * http://www.w3.org/International/questions/qa-when-xmllang
	 * 
	 * <p>
	 * Setting the dataLanguage is optional so if you not sure, 
	 * then do not set this value.
	 * @param lang The string used for the xml:lang="en" field
	 */
    public void setDataLanguage(String lang)
    {
	    m_DataLanguage = lang;
	}

    /**
	 * Sets an error message to be passed back with 
	 * the Nitobi XML document. The error message is passed
	 * as the value of an attribute called "error" in the
	 * root tag. The error message will be passed through
	 * encodeXML before it is passed up, so any characters
	 * should be fine in the error message. Calling this 
	 * method with an empty string clears the error message.
	 *
	 * @param msg The string containing the error message.
	 */
    public void setErrorMessage(String msg)
    {
    	m_ErrorMessage = msg;
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
     * Sets the foreign key value associated with the dataset being returned to the client.
     * @param value The value of the foreign key for the data set being returned.
     */
    public void setForeignKeyValue(String value)
    {
    	m_foreignKeyValue = value;
    }
	/**
	 * Specifies the name of the next column in the data you are converting.
	 * @param fieldName The name of the field.
	 */
	public void addField(String fieldName)
	{
	    m_FieldNames.add(encodeXML(fieldName));
	}

	/**
	 * Returns all the fieldnames
	 * @return All fieldnames.
	 */
	public String[] getFields() 
        {
	    String[] tmp=new String[1];
	    return (String[]) this.m_FieldNames.toArray(tmp);
	}
	
	/**
	 * The name of the field that is the key field.
	 * @param fieldName The name of the key field.
	 */
	public void setKeyFieldName(String fieldName)
	{
		m_KeyFieldName = fieldName;
	}
	
	/** 
	 * The name of the field that is the key field.
	 * @return The name of the field that is the key field.
	 */
	public String getKeyFieldName()
	{
		return m_KeyFieldName;
	}	
	
	/**
	 * Converts a number to its corresponding ordinal alphabetic character.
	 * <p>
	 * For example, the index value of 5 returns the String "f" and the index value
	 * of 26 returns aa, 27 returns ab
	 * </p>
	 * @param ColumnIndex The index to generate the letter for 
	 * @return the letter whose ordinal position corresponds to the index given
	 */
	private String getColumnIndexLetter(int ColumnIndex)
	{
		/*
		 * This is called in loops.  It may be best to have a lookup array of 
		 * strings or chars.
		 */
		String columnIndexLetter = null;
		if (ColumnIndex > 25)
		{
			// After z comes aa then ab and so on until zz, which is the limit.
			char c [] = {(char) (Math.floor(ColumnIndex / 26)+96),(char) ((ColumnIndex % 26)+97)} ;
			columnIndexLetter = new String(c); 
		}
		else
		{
			char c [] = { (char)(ColumnIndex+97)};
			columnIndexLetter = new String(c);
		}
		return columnIndexLetter;
	}
	
	/** 
	 * Adds a record to be converted.  
	 *
	 * @param values An array of strings that will become a row.
	 */
	public void addRecord(String values[])
	{
		addRecord("e",values);
	}
	
	/**
	 * Adds a record to be converted.  
	 *
	 * @param recordType A Nitobi record type. This can be Update, Insert, Delete, or e.
	 * @param values An array of strings that will become a row.
	 */
	public void addRecord(String recordType, String values[])
	{
		int keyFieldIndex=0;
		// Find the index of the key field.
		for (int i = 0; i < m_FieldNames.size(); i ++)
		{
			if (m_FieldNames.get(i) == m_KeyFieldName)
			{
				keyFieldIndex=i;
				break;	
			}
		}
		String s = "";
		s = "<" + recordType + " ";
		int columnIndex=0;
		for (int i = 0; i < values.length; i++)
		{
			if (i == keyFieldIndex) 
			{
				s = s + "xk=\"" + encodeXML(values[i]) + "\" ";
			}
			else
			{
				String strValue;
				if (null == values[i])
				{
					strValue = "";
				}
				else
				{
					strValue = encodeXML(values[i]);
				}
				String attributeName = getColumnIndexLetter(columnIndex);
				s = s + attributeName + "=\"" + strValue + "\" ";
				columnIndex++;
			}	
		}
		s = s + " />";
		m_RecordsXml = m_RecordsXml + s;
			
	}
	
	/**
	 * Returns a record from the XML Document. You must call setEbaXml first.
	 * @param Index The index of the record you want.
	 * @return An XmlRecord that is a Java Object representation of the XML row.
	 */
	public XmlRecord getRecord(int Index)
	{
		return (XmlRecord) m_Records.get(Index);
	}
	
	/**
	 * Returns all converted xml records. You must call setEbaXml first.
	 * @return A Vector of XmlRecord objects. 
	 */
	public Vector getRecords()
	{
		return m_Records;
	}
	
	/**
	 * Takes all the records you've added and converts them to Nitobi XML. You must define
	 * the fields, key fields, and add some records before you call this.
	 * Uses default encoding of UTF-8 for the XML document.
	 * @return Nitobi XML
	 */
	public String getEbaXml() throws NitobiException
	{
		return this.getEbaXml("utf-8");
	}

	/**
	 * Takes all the records you've added and converts them to a Nitobi XML. You must define
	 * the fields, key fields, and add some records before you call this.
	 * @param encoding The encoding for the XML document.
	 * @return Nitobi XML
	 */
	public String getEbaXml(String encoding) throws NitobiException
	{
		int keyFieldIndex=0;
		// Find the index of the key field.
		for (int i = 0; i < m_FieldNames.size(); i ++)
		{
			if (m_FieldNames.get(i) == m_KeyFieldName)
			{
				keyFieldIndex=i;
				break;	
			}
		}
		
		// Write out the fields and keys attributes
		// During this, find out the index of the key field.
		String fields 	= "";
		String pipe	= "";
		for (int i = 0; i < m_FieldNames.size(); i ++)
		{
			if (keyFieldIndex != i) 
			{
				fields = fields + pipe + m_FieldNames.get(i);
				pipe = "|";
			}
			
		}
		if (m_Records != null)
		{
			m_RecordsXml = "";
			Iterator recs = m_Records.iterator();
			while (recs.hasNext())
			{
				XmlRecord rec = (XmlRecord) recs.next();
				m_RecordsXml += rec.toXmlString();
			}
		}
		
		String result = "";
		// add encoding
		result =
		    "<?xml version=\"1.0\" encoding=\"" + encoding + "\" ?>" +
		    "<root xml:lang=\""+m_DataLanguage+"\" fields=\"" + fields + "\"";
		if (m_totalRowCount != 0)
		{
			result += " totalrowcount=\"" + m_totalRowCount + "\"";
		}
		
		if (m_foreignKey != null)
		{
			result += " parentfield=\"" + m_foreignKey + "\"";
		}
		
		if (m_foreignKeyValue != null)
		{
			result += " parentvalue=\"" + m_foreignKeyValue + "\"";
		}
		
		if (m_ErrorMessage != "") {
		    result += " error=\"" + encodeXML(m_ErrorMessage) + "\"";
		}
		result += ">" + m_RecordsXml + "</root>";

		return result;
	}
	
	/**
	 * Converts Nitobi XML into a Vector of XmlRecord objects. 
	 * @param xmlDoc An XML Document object containing Nitobi XML nodes.
	 * @throws NitobiException
	 */
	public void setEbaXml(Document xmlDoc) throws NitobiException
	{
		try
		{
			 // query the fields attribute in the header of the XML document
			 String allFields=xmlDoc.getDocumentElement().getAttribute("fields");
			 
			 if (allFields.equals(""))
			 {
				 throw new NitobiException("The grid has not reported back the fields tag in the save updategram. Please make sure that you use at least version 2.4 of the EBA:Grid!");
			 }
			 	
			 // separate every field name and put it into array
			 String[] fields = allFields.split("\\|");
			 this.m_FieldNames = new Vector();
			 for (int i=0; i<fields.length; i++) {
			 	this.m_FieldNames.add(fields[i]);			 	
			 }
			 
			 // Retrieve the nodes that represent changes made to the grid.
			 // These are the Roots children.
			 NodeList records = xmlDoc.getDocumentElement().getChildNodes();
			 Node node = null;
				
			 // If there are any updates to make modify the data file.
			 if (records != null) 
			 {
				 int rc = records.getLength();

	
				 for (int i=0;i < rc; i++) 
				 {
					 // Get the next element in the list of changes that contains update
					 // information.
					 node = xmlDoc.getDocumentElement().getChildNodes().item(i);
					 Element element = (Element) node;
			
					 XmlRecord r = new XmlRecord();
			
					 // Take the node and generate its XML.
					 DOMSource ds = new DOMSource(node);
					 StringWriter strWriter = new StringWriter();
					 StreamResult strResult = new StreamResult(strWriter);
					 TransformerFactory tf = TransformerFactory.newInstance();
					 Transformer transformer = tf.newTransformer();
					 transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
					 transformer.transform(ds, strResult);
					 //r.setXml(strWriter.toString());
					 r.setXmlElement(element);
					 
					 // Get the XML key, which uniquely identifies the record.
					 r.setKey(element.getAttribute("xk"));
					 r.setXid(element.getAttribute("xid"));
					 r.setForeignKeyValue(element.getAttribute("xf"));
					 r.setEbaType(element.getTagName());
			
			
					 int colNum=0;
					 Vector newRow = new Vector();
					
					 while (element.hasAttribute(getColumnIndexLetter(colNum)))			
					 {
						 String att = element.getAttribute(getColumnIndexLetter(colNum));
						 newRow.add(att);
						 colNum++;
					 }
					 r.setValues(newRow);
					 m_Records.add(r);
					 
					 //this.m_RecordsXml+=r.getXml();					 
				 }
			 }
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
	
	/**
	 * Converts Nitobi XML into a Vector of XmlRecord objects. 
	 * @param xmlString Valid Nitobi Xml.
	 * @throws NitobiException
	 */
	public void setEbaXml(String xmlString) throws NitobiException
	{
		try
		{
			m_Records = new Vector();
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			
			// The XML document that is the Updategram.
			Document xmlDoc = null;
		
			// Read the xml, parse it and create an XML document.
			xmlDoc = db.parse( new org.xml.sax.InputSource( new StringReader(xmlString)));
			setEbaXml(xmlDoc);
		}
		catch (ParserConfigurationException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (SAXException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (IOException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
	}
	
	/**
	 * Converts Nitobi XML into a Vector of XmlRecord objects. 
	 * @param reader A reader that allows us to read an XML source.
	 * @throws NitobiException
	 */
	public void setEbaXml(Reader reader) throws NitobiException
	{
		try
		{
			BufferedReader br = new BufferedReader(reader);
			m_Records = new Vector();
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
		
			// The XML document that is the Updategram.
			Document xmlDoc = null;
	
			// Read the xml, parse it and create an XML document.
			xmlDoc = db.parse( new org.xml.sax.InputSource( br ));
		
	
			setEbaXml(xmlDoc);
		}
		catch (ParserConfigurationException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (SAXException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (IOException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
	}
	
    /**
     * Converts Nitobi XML into a Vector of XmlRecord objects. 
     * @param is A InputStream that allows us to read an XML source.
     * @throws NitobiException
     */
    public void setEbaXml(InputStream is) throws NitobiException
    {
        try
        {
            m_Records = new Vector();
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
        
            // The XML document that is the Updategram.
            Document xmlDoc = null;
    
            // Read the xml, parse it and create an XML document.
            xmlDoc = db.parse( new org.xml.sax.InputSource( is ));
        
            setEbaXml(xmlDoc);
        }
        catch (ParserConfigurationException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (SAXException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
		catch (IOException ex)
		{
			throw new NitobiException("There was an error converting the specified Nitobi XML. Either it is not valid XML or it is not valid EBA XML.", ex);
		}
    }

}


