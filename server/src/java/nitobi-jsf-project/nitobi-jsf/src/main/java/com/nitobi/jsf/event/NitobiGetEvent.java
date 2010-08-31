/**
 * User: Eric Buitenhuis 
 * Date: Jul 30, 2008
 * Time: 12:21:41 AM
 */

package com.nitobi.jsf.event;

import com.nitobi.server.handler.GetHandler;

import java.util.Map;

/**
 * GetEvent
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class NitobiGetEvent {

    private GetHandler gethandler;
    private Map params;


    public GetHandler getGethandler() {
        return gethandler;
    }

    public void setGethandler(GetHandler gethandler) {
        this.gethandler = gethandler;
    }

    public Map getParams() {
        return params;
    }

    public void setParams(Map params) {
        this.params = params;
    }
}
