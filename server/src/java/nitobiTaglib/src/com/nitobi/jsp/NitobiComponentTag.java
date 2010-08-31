package com.nitobi.jsp;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

/*
 * All tags that are top-level component tags inherit from this class.
 */
public abstract class NitobiComponentTag extends TagSupport 
{
	public abstract String getToolkitjsurl();
	public abstract String getComponentjsurl();
	public abstract String getComponentcssurl();
	
	/*
	 * Writes out the the script blocks for the required javascript files.
	 */
	protected void writeScriptTags(String componentName) throws JspException
	{
		try
		{
			if (pageContext.getAttribute("toolkitscript") == null)
			{
				pageContext.getOut().println("<script type=\"text/javascript\" src=\"" + getToolkitjsurl() + "\"></script>");
				pageContext.setAttribute("toolkitscript", "true");
			}
			if (pageContext.getAttribute(componentName + "script") == null)
			{
				pageContext.getOut().println("<script type=\"text/javascript\" src=\"" + getComponentjsurl() + "\"></script>");
				pageContext.setAttribute(componentName + "script", "true");
			}
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/*
	 * Writes out the link tag to include the components css file.
	 */
	protected void writeStyleTag(String componentName) throws JspException
	{
		try 
		{
			if (pageContext.getAttribute(componentName + "style") == null)
			{
				pageContext.getOut().println("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + getComponentcssurl() + "\"></link>");
				pageContext.setAttribute(componentName + "style", "true");
			}

		} 
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/*
	 * Writes out the script block necessary to initialize a component.
	 */
	protected void writeInitScript() throws JspException
	{
		try
		{
			pageContext.getOut().print("<script type=\"text/javascript\">");
			pageContext.getOut().print("function onLoad(){nitobi.loadComponent(\"" + getId() + "\");}");
			pageContext.getOut().print("nitobi.html.attachEvent(window,\"load\",onLoad)");
			pageContext.getOut().println("</script>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	/*
	 * Writes out a tags attributes using the Java Introspection API.
	 */
	protected void writeTagAttributes() throws JspException
	{
		try
		{
			BeanInfo info = Introspector.getBeanInfo(this.getClass());
			PropertyDescriptor[] props = info.getPropertyDescriptors();
			for (int i = 0; i < props.length; i++)
			{
				Method getter = props[i].getReadMethod();
				if (getter != null)
				{
					Object value = getter.invoke(this, new Object[]{});
					if (value != null && value instanceof String)
					{
						pageContext.getOut().print(props[i].getName() + "=\"" + (String) value + "\" ");
					}
				}
			}
		}
		catch (Exception e)
		{
			throw new JspException(e);
		}
	}
}
