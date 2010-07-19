/**
 * 
 */
package com.nitobi.jsp.grid;

import javax.servlet.jsp.JspException;
import org.json.*;
import com.nitobi.jsp.NitobiBodyTag;
import java.util.*;

/**
 * @author mhan
 * @jsp.tag name="e"
 * description="The data attribute expects a string in JSON notation"
 *
 */
public class DataElement extends NitobiBodyTag 
{
	private static final long serialVersionUID = -6668634201376394093L;
	private String data;
	
	public int doStartTag() throws JspException
	{
		writeDataElementStartTag();
		return SKIP_BODY;
	}

	public int doEndTag() throws JspException
	{
		writeDataElementEndTag();
		return EVAL_PAGE;
	}
	
	private void writeDataElementStartTag() throws JspException
	{
		try
		{
			JSONObject data = new JSONObject(this.data);
			Iterator keys = data.keys();
			// Loop through the JSON object and write out the attributes
			pageContext.getOut().print("<ntb:e ");
			while (keys.hasNext())
			{
				String key = (String) keys.next();
				String value = data.getString(key);
				pageContext.getOut().print(key + "=\"" + value + "\" ");
			}
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
		catch (org.json.JSONException json)
		{
			// TODO:  Should put info into the exception object about
			// it being JSON's fault
			throw new JspException(json);
		}
	}
	
	private void writeDataElementEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:e>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/**
	 * @jsp.attribute required="true" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The data attribute" 
	 * @return the data
	 */
	public String getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(String data) {
		this.data = data;
	}
	
	
}
