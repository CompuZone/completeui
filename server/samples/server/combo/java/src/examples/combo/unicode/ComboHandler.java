package examples.combo.unicode;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.tools.Record;

public class ComboHandler extends HttpServlet 
{
	/* 
	 * This servlet is used as a Datasource for the combo. When the combo is initialized,
	 * the get handler servlet is called and expected to return a properly formatted
	 * xml stream. We have provided all the necessary functionality to do this without actually
	 * requiring you to construct XML. Simply interface with your datasource and use the provided
	 * classes in the package com.nitobi.server.handler to create the necessary output.
	 * 
	 * This sample uses a static xml file as the data source
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) 
		throws ServletException, IOException 
	{
		try
		{
			javax.xml.parsers.DocumentBuilder currentDocumentBuilder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
			StringBuffer XMLURL = request.getRequestURL();
			XMLURL.delete(XMLURL.length()-3,XMLURL.length());
			XMLURL.append("CountryNamesAndFlags.xml");
			org.w3c.dom.Document currentDocument = currentDocumentBuilder.parse(XMLURL.toString());
			
			org.w3c.dom.NodeList currentNodes = currentDocument.getElementsByTagName("memberNation");
			
			GetHandler currentGetHandler = new GetHandler();	
			currentGetHandler.defineField("countryCode");
			currentGetHandler.defineField("flagImageLocation");
			currentGetHandler.defineField("countryNameUTF8");
			for (int n = 0; n < currentNodes.getLength(); n++) 
			{
				org.w3c.dom.Element countryElement  = (org.w3c.dom.Element)currentNodes.item(n);
				Record curRecord         			= currentGetHandler.createNewRecord(countryElement.getAttribute("CountryCode"));
				// add the xml data for each field to the record.
				curRecord.setField("countryCode",       countryElement.getAttribute("CountryCode"));
				curRecord.setField("flagImageLocation", countryElement.getAttribute("FlagImage"));
				curRecord.setField("countryNameUTF8",   countryElement.getFirstChild().getNodeValue());
				currentGetHandler.addRecord(curRecord);
			}
			
			currentGetHandler.writeToClient(response);
		}
		catch (Exception ex)
		{
			throw new ServletException(ex);
		}
	}
}
