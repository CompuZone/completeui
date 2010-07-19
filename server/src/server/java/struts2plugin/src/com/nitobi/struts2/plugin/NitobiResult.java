package com.nitobi.struts2.plugin;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Result;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletResponse;
import eba.gethandler.GenericGetHandler;
import eba.savehandler.GenericSaveHandler;

import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.handler.SaveHandler;

public class NitobiResult implements Result 
{
	private static final long serialVersionUID = -7359361251579124128L;
	private String handlername = "handler";
	private String encoding = "UTF-8";

	public void execute(ActionInvocation ai) throws Exception 
	{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/xml;charset=" + this.encoding);
		Object handler = ai.getStack().findValue(this.handlername);
		
		// We need to figure out if we are returning from a 
		// get or save action.  We also need to support
		// the old server library (eba.*) and the new one (com.nitobi.*)
		// If neither, throw an error with an appropriate error message
		if (handler instanceof GenericGetHandler)
		{
			GenericGetHandler gethandler = (GenericGetHandler) handler;
			gethandler.writeToClient(this.encoding, response.getWriter());
		}
		else if (handler instanceof GetHandler)
		{
			GetHandler gethandler = (GetHandler) handler;
			gethandler.writeToClient(this.encoding, response);
		}
		else if (handler instanceof GenericSaveHandler)
		{
			GenericSaveHandler savehandler = (GenericSaveHandler) handler;
			savehandler.writeToClient(this.encoding, response.getWriter());
		}
		else if (handler instanceof SaveHandler)
		{
			SaveHandler savehandler = (SaveHandler) handler;
			savehandler.writeToClient(this.encoding, response);
		}
		else if (handler == null)
		{
			String message = "Could not find the GenericGetHandler or GenericSaveHandler object with handlername \"" + this.handlername + "\" on the Value Stack";
			Exception ex = new Exception(message);
			throw ex;
		}
		else
		{
			String message = "The object on the Value stack with handlername \"" + this.handlername + "\" is not of valid type";
			Exception ex = new Exception(message);
			throw ex;
		}
	}
	
	public void setHandlername(String handlerName)
	{
		this.handlername = handlerName;
	}
	
	public void setEncoding(String encoding)
	{
		this.encoding = encoding;
	}

}
