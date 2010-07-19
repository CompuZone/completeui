package com.nitobi.jsp;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

/*
 * All tags that are not top-level component tags inherit from this class.
 */
public abstract class NitobiBodyTag extends TagSupport 
{
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
