<%@ WebHandler Language="C#" Class="CalendarHandler" %>

using System;
using System.Collections;
using System.Data;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Web.SessionState;

using Nitobi;

public class CalendarHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        XmlDataHandler da = new editors.EditorsDataHandler();
        da.checkForAndProcessAjaxRequest(context.Request, context.Response);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}