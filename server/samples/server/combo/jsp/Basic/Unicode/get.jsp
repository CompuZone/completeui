<%@ page import="java.io.*" %>\
<%@ page import="org.w3c.dom.Document" %>\
<%@ page import="org.w3c.dom.NodeList" %>\
<%@ page import="javax.servlet.http.HttpServletRequest" %>\
<%@ page import="eba.gethandler.*" %>\
<%@ page pageEncoding="UTF-8"%>\
<%
    
javax.xml.parsers.DocumentBuilder currentDocumentBuilder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();

// get the current URI
StringBuffer XMLURL = request.getRequestURL();
XMLURL.delete(XMLURL.length()-7,XMLURL.length());
XMLURL.append("CountryNamesAndFlags.xml");

org.w3c.dom.Document currentDocument = currentDocumentBuilder.parse(XMLURL.toString());

// here is what the xml file looks like ՀայաստանՀայաստանՀայաստանՀայաստանՀայաստանՀայաստան
// <memberNation CountryCode="bi" FlagImage="images/flags//bi_flag.gif">Burundi</memberNation>
org.w3c.dom.NodeList currentNodes    = currentDocument.getElementsByTagName("memberNation");

GetHandler currentGetHandler 	= new GetHandler(response, out);	
currentGetHandler.defineField("countryCode");
currentGetHandler.defineField("flagImageLocation");
currentGetHandler.defineField("countryNameUTF8");

// for each node in the xml create a record
for (int n=0; n<currentNodes.getLength(); n++) 
{
	org.w3c.dom.Element countryElement  = (org.w3c.dom.Element)currentNodes.item(n);
	Record curRecord         			= currentGetHandler.createNewRecord(countryElement.getAttribute("CountryCode"));
	// add the xml data for each field to the record.
	curRecord.setField("countryCode",       countryElement.getAttribute("CountryCode"));
	curRecord.setField("flagImageLocation", countryElement.getAttribute("FlagImage"));
	curRecord.setField("countryNameUTF8",   countryElement.getFirstChild().getNodeValue());
	currentGetHandler.addRecord(curRecord);
}

currentGetHandler.writeToClient();
%>
