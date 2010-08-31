/**
 * @author Nitobi
 * 
 * This class provides all specific functionality needed for the EBA:Grid or EBA:Web ComboBox
 * gethandler
 * copyright 2006
 */
package eba.gethandler;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspWriter;

import eba.tools.ILocaleConverter;

/**
 * @author Nitobi
 * @deprecated Use com.nitobi.server.handler.GetHandler
 */
public class GetHandler extends GenericGetHandler{

	JspWriter m_jspWriter;
	
	/**
	 * @param response
	 * @param writer
	 * @throws Exception
	 */
	public GetHandler(HttpServletResponse response, JspWriter writer)
			throws Exception 
	{
		super(response, writer);
		m_jspWriter = writer;
	}

	/**
	 * @param response
	 * @param writer
	 * @param localeConverter
	 * @throws Exception
	 */
	public GetHandler(HttpServletResponse response, JspWriter writer,
			ILocaleConverter localeConverter) throws Exception 
	{
		super(response, writer, localeConverter);
	}

	
	/**
	 * This method clears the writer buffer then, writes back the EBA
	 * compressed XML to the Component.  This should only be called once at the end of
	 * the GetHandler page.
	 * 
	 * @param encoding
	 *            The encoding for the XML document
	 * @throws IOException
	 */
	public void writeToClient(String encoding) throws IOException 
	{
		writeToClient(encoding, m_jspWriter);
	}
	

	/**
	 * Writes back the EBA compressed XML to the Grid and should only be called
	 * once at the end of the GetHandler page.  The writer buffer is cleared.
	 * 
	 * @param encoding
	 *            The encoding for the XML document
	 * @param writer
	 *            The writer used to create the xml document
	 * @throws IOException
	 */
	public void writeToClient(String encoding, JspWriter writer)
	throws IOException 
	{
		writer.clearBuffer();
		super.writeToClient(encoding,writer);
	}

}
