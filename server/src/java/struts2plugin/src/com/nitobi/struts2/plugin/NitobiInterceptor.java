package com.nitobi.struts2.plugin;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import eba.savehandler.GenericSaveHandler;

import java.beans.Introspector;
import java.beans.BeanInfo;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;

public class NitobiInterceptor implements Interceptor 
{
	public String intercept(ActionInvocation ai) throws Exception 
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		GenericSaveHandler handler = new GenericSaveHandler(request,null);
		Object actionInstance = ai.getAction();
		
		// Use introspection to set the GenericSaveHandler property
		// of the action
		Class clazz = actionInstance.getClass();
		BeanInfo beanInfo = Introspector.getBeanInfo(clazz);
		
		PropertyDescriptor[] descriptors = beanInfo.getPropertyDescriptors();
		int index;
		for (index = 0; index < descriptors.length; index++)
		{
			// If the property is of type GenericSaveHandler, invoke the 
			// property's write method
			PropertyDescriptor descriptor = descriptors[index];
			Class prop = descriptor.getPropertyType();
			if (prop.equals(handler.getClass()))
			{
				Method accessor = descriptor.getWriteMethod();
				accessor.invoke(actionInstance, new Object[] {handler});
				break;
			}
		}
		
		// If we got to the end of the list, we couldn't find the property so 
		// we throw an exception.
		if (index == descriptors.length)
		{
			String message = "The action does not have a member of type eba.savehandler.GenericSaveHandler";
			Exception ex = new Exception(message);
			throw ex;
		}
		
		return ai.invoke();
	}

	public void destroy() 
	{
	}

	public void init() 
	{
	}
}
