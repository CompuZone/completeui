/**
 * User: Eric Buitenhuis 
 * Date: Aug 1, 2008
 * Time: 6:38:40 AM
 */

package com.nitobi.beans.params;

/**
 * The base class for Nitobi Parameter objects. These objects simply wrap around the request
 * parameters sent by the client and offer a convenience for loading data from the
 * HTTPServletRequest object.
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class NitobiParams {

    public static final String REQUEST_TYPE_GET = "GET";
    public static final String REQUEST_TYPE_SAVE = "SAVE";

    /**
     * The Nitobi ID making the AJAX request
     */
    private String componentId = null;

    /**
     * When using paging, this is the ordinal record to begin at
     */
    private String startingRecordIndex = null;

    /**
     * The number of records to return
     */
    private String pageSize = null;

    /**
     * A partially typed String entered by the user to reduce the result set.
     */
    private String searchSubstring = null;

    /**
     * What kind of request this was
     */
    private String requestType = null;

    public NitobiParams() {
    }

    public NitobiParams(String componentId, String pageSize, String requestType, String searchSubstring, String startRecordIndex) {
        this.componentId = componentId;
        this.pageSize = pageSize;
        this.requestType = requestType;
        this.searchSubstring = searchSubstring;
        this.startingRecordIndex = startRecordIndex;
    }

    public String getComponentId() {
        return componentId;
    }

    public void setComponentId(String componentId) {
        this.componentId = componentId;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getSearchSubstring() {
        return searchSubstring;
    }

    public void setSearchSubstring(String searchSubstring) {
        this.searchSubstring = searchSubstring;
    }

    public String getStartingRecordIndex() {
        return startingRecordIndex;
    }

    public void setStartingRecordIndex(String startingRecordIndex) {
        this.startingRecordIndex = startingRecordIndex;
    }
}
