package com.nitobi.beans.params;

/**
 * User: eric
 * Date: Apr 24, 2008
 * Time: 11:57:55 PM
 */
public class GridParams extends NitobiParams {
    public static final String GRID_ID = "GridId";
    public static final String START_RECORD_INDEX = "StartRecordIndex";
    public static final String PAGE_SIZE = "PageSize";
    public static final String SORT_COLUMN = "SortColumn";
    public static final String SORT_DIRECTION = "SortDirection";
    public static final String SEARCH_STRING = "SearchString";
    public static final String REQUEST_TYPE = "RequestType";

    private String sortColumn = null;
    private String sortDirection = null;

    public GridParams() {
        super();
    }

    public GridParams(String componentId, String pageSize, String requestType, String searchSubstring, String startRecordIndex, String sortColumn, String sortDirection) {
        super(componentId, pageSize, requestType, searchSubstring, startRecordIndex);
        this.sortColumn = sortColumn;
        this.sortDirection = sortDirection;
    }

    public String getSortColumn() {
        return sortColumn;
    }

    public void setSortColumn(String sortColumn) {
        this.sortColumn = sortColumn;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }

}
