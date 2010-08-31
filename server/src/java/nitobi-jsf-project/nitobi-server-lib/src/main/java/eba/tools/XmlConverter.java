package eba.tools;

import java.util.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;
import java.io.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
	
/**
 * This class enables you convert any kind of datasource into an EBA XML document. In other words
 * it enables you to build an EBA XML Document. You can also use it to convert an EBA XML document
 * into a java object.
 * <P>
 * <B>Note:</B> you can only
 * go in one direction at a time. That is, you can only use this to convert blocks
 * of records/xml at a time. You cannot convert XML, add more records, and convert
 * it back.
 * @author Nitobi
 * @deprecated Use com.nitobi.server.tools.XmlConverter
 */
public class XmlConverter
{

	private Vector 			m_FieldNames;
	private String 			m_KeyFieldName;
	private String 			m_RecordsXml;
	private Vector 			m_Records;
	private String 			m_DataLanguage;
	private String			m_ErrorMessage;

	/**
	 * Creates an XmlConverter.
	 */
	public XmlConverter()
	{
	    m_FieldNames 	= new Vector();
	    m_KeyFieldName 	= "";
	    m_RecordsXml 	= "";
	    m_DataLanguage      = "en";
	    m_ErrorMessage	= "";
	}

   /**
	* the following does a minimal amount of transcoding This does
	* not do HTML escaping
	*
	* The following encodings may need to be performed in the future.
	* The only encoding required by the client should be preformed on
	* data
	*
	* &nbsp; ---> &#a0;
	* 
	* 	char tab [] = {(char) 9};
	*	newStr = newStr.replaceAll(new String(tab), "&#9;");
	*	char space [] = {(char) 32};
	*  newStr = newStr.replaceAll(new String(space), "&#32;");
	*
	* A fun app you can run on output: [http://www.stg.brown.edu/cgi-bin/xmlvalid/xmlvalid.pl]
	*
	* @param stringToEncode a the string to be encoded
	* @return the string with all special chars replaced by entity references.
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
	  * setting the dataLanguage is optional
	  * if you not sure then do not set this value.
	  * for more information google "xml:lang"
	  *
	  * @param lang The string used for the xml:lang="en" field
	  */
        public void setDataLanguage(String lang)
        {
	    m_DataLanguage = lang;
	}

         /**
	  * Sets an error message to be passed back with 
	  * the ebaxml document. The error message is passed
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
	 * Specifies the name of the next column in the data you are converting.
	 * @param fieldName The name of the field.
	 */
	public void addField(String fieldName)
	{
	    m_FieldNames.add(encodeXML(fieldName));
	}

	/**
	 * Delivers back all fieldnames prior defined
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
	
	/** The name of the field that is the key field.
	 * @return The name of the field that is the key field.
	 */
	public String getKeyFieldName()
	{
		return m_KeyFieldName;
	}	
	
        /**
	 * This is called in loops.  It may be best to have a lookup array of strings or chars. 
	 * return columnLetter[Math.floor(ColumnIndex / 26)+96] + columnLetter[(ColumnIndex % 26)+97]
	 */
         private String getColumnIndexLetter(int ColumnIndex)
         {
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
	 *
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
	 * @param recordType An EBA record type. This can be Update, Insert, Delete, or e.
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
	 * Takes all the records you've added and converts them to a EBA XML. You must define
	 * the fields, key fields, and add some records before you call this.
	 * Uses default encoding of UTF-8 for the XML document.
	 * @return EBA XML.
	 */
	public String getEbaXml()
	{
		return this.getEbaXml("utf-8");
	}

	/**
	 * Takes all the records you've added and converts them to a EBA XML. You must define
	 * the fields, key fields, and add some records before you call this.
	 * @param encoding The encoding for the XML document.
	 * @return EBA XML.
	 */
	public String getEbaXml(String encoding)
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
		String result = "";
		// add encoding
		result =
		    "<?xml version=\"1.0\" encoding=\"" + encoding + "\" ?>" +
		    "<root xml:lang=\""+m_DataLanguage+"\" fields=\"" + fields + "\"";
		if (m_ErrorMessage != "") {
		    result += " error=\"" + encodeXML(m_ErrorMessage) + "\"";
		}
		result += ">" + m_RecordsXml + "</root>";

		return result;
	}
	
	/**
	 * Converts EBA XML into a Vector of XmlRecord objects. 
	 * @param xmlDoc An XML Document object containing EBA XML nodes.
	 * @throws Exception
	 */
	public void setEbaXml(Document xmlDoc) throws Exception
	{
		try
		{
			 // query the fields attribute in the header of the XML document
			 String allFields=xmlDoc.getDocumentElement().getAttribute("fields");
			 
			 if (allFields.equals(""))
			 	throw new Exception("The grid has not reported back the fields tag in the save updategram. Please make sure that you use at least version 2.4 of the EBA:Grid!");
			 // separate every field name and put it into array
			 String[] fields=allFields.split("\\|");
			 this.m_FieldNames=new Vector();
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
					 r.setXml(strWriter.toString());
			
					 // Get the XML key, which uniquely identifies the record.
					 r.setKey(element.getAttribute("xk"));
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
					 
					 this.m_RecordsXml+=r.getXml();					 
				 }
			 }
		}
		catch(Exception err)
		{
			Exception e = new Exception("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.");
			throw e;
		}
	}
	
	/**
	 * Converts EBA XML into a Vector of XmlRecord objects. 
	 * @param xmlString Valid EBA Xml.
	 * @throws Exception
	 */
	public void setEbaXml(String xmlString) throws Exception
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
		catch(Exception err)
		{
			Exception e = new Exception("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.");
			throw e;
		}
	}
	
	/**
	 * Converts EBA XML into a Vector of XmlRecord objects. 
	 * @param reader A reader that allows us to read an XML source.
	 * @throws Exception
	 */
	public void setEbaXml(Reader reader) throws Exception
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
		catch(Exception err)
		{
			Exception e = new Exception("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.");
			throw e;
		}
	}
	
    /**
     * Converts EBA XML into a Vector of XmlRecord objects. 
     * @param is A InputStream that allows us to read an XML source.
     * @throws Exception
     */
    public void setEbaXml(InputStream is) throws Exception
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
        catch(Exception err)
        {
            Exception e = new Exception("There was an error converting the specified EBA XML. Either it is not valid XML or it is not valid EBA XML.");
            throw e;
        }
    }

}


