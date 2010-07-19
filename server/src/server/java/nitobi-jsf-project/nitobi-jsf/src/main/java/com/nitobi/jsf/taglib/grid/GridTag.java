/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nitobi.jsf.taglib.grid;

import com.nitobi.jsf.component.grid.UIGrid;
import com.nitobi.jsf.renderer.NitobiRenderer;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentELTag;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eric
 */
public class GridTag extends UIComponentELTag {

    private static Logger logger = Logger.getLogger(GridTag.class.getName());

    private ValueExpression columnIndicatorsEnabled = null;
    private ValueExpression toolbarEnabled = null;
    private ValueExpression frozenLeftColumnCount = null;
    private ValueExpression rowDeleteEnabled = null;
    private ValueExpression rowInsertEnabled = null;
    private ValueExpression autoAdd = null;
    private ValueExpression autoSaveEnabled = null;
    private ValueExpression rowsPerPage = null;
    private ValueExpression height = null;
    private ValueExpression width = null;
    private ValueExpression keyGenerator = null;
    private MethodExpression getHandler = null;
    private MethodExpression saveHandler = null;
    private ValueExpression mode = null;
    private ValueExpression liveScrollingMode = null;
    private ValueExpression copyEnabled = null;
    private ValueExpression pasteEnabled = null;
    private ValueExpression sortEnabled = null;
    private ValueExpression gridResizeEnabled = null;
    private ValueExpression rowHeight = null;
    private ValueExpression headerHeight = null;
    private ValueExpression sortMode = null;
    private ValueExpression renderMode = null;
    private ValueExpression enterTab = null;
    private ValueExpression rowSelectEnabled = null;
    private ValueExpression multiRowSelectEnabled = null;
    private ValueExpression asynchronous = null;
    private ValueExpression keyMode = null;
    private ValueExpression onAfterCopyEvent = null;
    private ValueExpression onAfterLoadDataPageEvent = null;
    private ValueExpression onAfterLoadNextPageEvent = null;
    private ValueExpression onAfterLoadPreviousPageEvent = null;
    private ValueExpression onAfterPasteEvent = null;
    private ValueExpression onAfterRefreshEvent = null;
    private ValueExpression onAfterResizeEvent = null;
    private ValueExpression onAfterRowDeleteEvent = null;
    private ValueExpression onAfterRowInsertEvent = null;
    private ValueExpression onAfterSaveEvent = null;
    private ValueExpression onAfterSortEvent = null;
    private ValueExpression onBeforeCellEditEvent = null;
    private ValueExpression onBeforeCopyEvent = null;
    private ValueExpression onBeforeLoadDataEvent = null;
    private ValueExpression onBeforeLoadNextPageEvent = null;
    private ValueExpression onBeforeLoadPreviousPageEvent = null;
    private ValueExpression onBeforePasteEvent = null;
    private ValueExpression onBeforeRefreshEvent = null;
    private ValueExpression onBeforeResizeEvent = null;
    private ValueExpression onBeforeRowDeleteEvent = null;
    private ValueExpression onBeforeRowInsertEvent = null;
    private ValueExpression onBeforeSaveEvent = null;
    private ValueExpression onBeforeSortEvent = null;
    private ValueExpression onCellClickEvent = null;
    private ValueExpression onCellDblClickEvent = null;
    private ValueExpression onCellFocusEvent = null;
    private ValueExpression onCellUpdateEvent = null;
    private ValueExpression onCellValidateEvent = null;
    private ValueExpression onContextMenuEvent = null;
    private ValueExpression onDataReadyEvent = null;
    private ValueExpression onErrorEvent = null;
    private ValueExpression onHandleErrorEvent = null;
    private ValueExpression onHtmlReadyEvent = null;
    private ValueExpression onKeyDownEvent = null;
    private ValueExpression onKeyUpEvent = null;
    private ValueExpression onMouseMoveEvent = null;
    private ValueExpression onMouseOutEvent = null;
    private ValueExpression onMouseOverEvent = null;
    private ValueExpression onRowBlurEvent = null;
    private ValueExpression onRowFocusEvent = null;
    private ValueExpression scrollX = null;
    private ValueExpression scrollY = null;
    private ValueExpression showErrors = null;
    private ValueExpression hwrap = null;
    private ValueExpression vwrap = null;
    private ValueExpression dataSourceId = null;
    private ValueExpression autoInitialize = null;
    //private ValueExpression gridListener;
    
    // added for 2008q1
    private ValueExpression editMode = null;
    private ValueExpression heightFixed = null;
    private ValueExpression minHeight = null;
    private ValueExpression minWidth = null;
    private ValueExpression onFocusEvent = null;
    private ValueExpression onHitRowStartEvent = null;
    private ValueExpression onHitRowEndEvent = null;
    private ValueExpression onKeyPressedEvent = null;
    private ValueExpression theme = null;
    private ValueExpression tooltipsEnabled = null;
    private ValueExpression widthFixed = null;
    
    public static final String COLUMN_INDICATORS_ENABLED_ATTNAME = "columnIndicatorsEnabled";
    public static final String TOOLBAR_ENABLED_ATTNAME = "toolbarEnabled";
    public static final String FROZEN_LEFT_COLUMN_COUNT_ATTNAME = "frozenLeftColumnCount";
    public static final String ROW_DELETE_ENABLED_ATTNAME = "rowDeleteEnabled";
    public static final String ROW_INSERT_ENABLED_ATTNAME = "rowInsertEnabled";
    public static final String AUTOADD_ATTNAME = "autoAdd";
    public static final String AUTO_SAVE_ENABLED_ATTNAME = "autoSaveEnabled";
    public static final String ROWS_PER_PAGE_ATTNAME = "rowsPerPage";
    public static final String HEIGHT_ATTNAME = "height";
    public static final String WIDTH_ATTNAME = "width";
    public static final String KEY_GENERATOR_ATTNAME = "keyGenerator";
    public static final String GET_HANDLER_ATTNAME = "getHandler";
    public static final String SAVE_HANDLER_ATTNAME = "saveHandler";
    public static final String MODE_ATTNAME = "mode";
    public static final String LIVE_SCROLLING_MODE_ATTNAME = "liveScrollingMode";
    public static final String COPY_ENABLED_ATTNAME = "copyEnabled";
    public static final String PASTE_ENABLED_ATTNAME = "pasteEnabled";
    public static final String SORT_ENABLED_ATTNAME = "sortEnabled";
    public static final String GRID_RESIZE_ENABLED_ATTNAME = "gridResizeEnabled";
    public static final String ROW_HEIGHT_ATTNAME = "rowHeight";
    public static final String HEADER_HEIGHT_ATTNAME = "headerHeight";
    public static final String SORT_MODE_ATTNAME = "sortMode";
    public static final String RENDER_MODE_ATTNAME = "renderMode";
    public static final String ENTER_TAB_ATTNAME = "enterTab";
    public static final String ROW_SELECT_ENABLED_ATTNAME = "rowSelectEnabled";
    public static final String MULTI_ROW_SELECT_ENABLED_ATTNAME = "multiRowSelectEnabled";
    public static final String ASYNCHRONOUS_ATTNAME = "asynchronous";
    public static final String KEYMODE_ATTNAME = "keyMode";
    public static final String ON_AFTER_COPY_EVENT_ATTNAME = "onAfterCopyEvent";
    public static final String ON_AFTER_LOAD_DATA_PAGE_EVENT_ATTNAME = "onAfterLoadDataPageEvent";
    public static final String ON_AFTER_LOAD_NEXT_PAGE_EVENT_ATTNAME = "onAfterLoadNextPageEvent";
    public static final String ON_AFTER_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME = "onAfterLoadPreviousPageEvent";
    public static final String ON_AFTER_PASTE_EVENT_ATTNAME = "onAfterPasteEvent";
    public static final String ON_AFTER_REFRESH_EVENT_ATTNAME = "onAfterRefreshEvent";
    public static final String ON_AFTER_RESIZE_EVENT_ATTNAME = "onAfterResizeEvent";
    public static final String ON_AFTER_ROW_DELETE_EVENT_ATTNAME = "onAfterRowDeleteEvent";
    public static final String ON_AFTER_ROW_INSERT_EVENT_ATTNAME = "onAfterRowInsertEvent";
    public static final String ON_AFTER_SAVE_EVENT_ATTNAME = "onAfterSaveEvent";
    public static final String ON_AFTER_SORT_EVENT_ATTNAME = "onAfterSortEvent";
    public static final String ON_BEFORE_CELL_EDIT_EVENT_ATTNAME = "onBeforeCellEditEvent";
    public static final String ON_BEFORE_COPY_EVENT_ATTNAME = "onBeforeCopyEvent";
    public static final String ON_BEFORE_LOAD_DATA_EVENT_ATTNAME = "onBeforeLoadDataEvent";
    public static final String ON_BEFORE_LOAD_NEXT_PAGE_EVENT_ATTNAME = "onBeforeLoadNextPageEvent";
    public static final String ON_BEFORE_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME = "onBeforeLoadPreviousPageEvent";
    public static final String ON_BEFORE_PASTE_EVENT_ATTNAME = "onBeforePasteEvent";
    public static final String ON_BEFORE_REFRESH_EVENT_ATTNAME = "onBeforeRefreshEvent";
    public static final String ON_BEFORE_RESIZE_EVENT_ATTNAME = "onBeforeResizeEvent";
    public static final String ON_BEFORE_ROW_DELETE_EVENT_ATTNAME = "onBeforeRowDeleteEvent";
    public static final String ON_BEFORE_ROW_INSERT_EVENT_ATTNAME = "onBeforeRowInsertEvent";
    public static final String ON_BEFORE_SAVE_EVENT_ATTNAME = "onBeforeSaveEvent";
    public static final String ON_BEFORE_SORT_EVENT_ATTNAME = "onBeforeSortEvent";
    public static final String ON_CELL_CLICK_EVENT_ATTNAME = "onCellClickEvent";
    public static final String ON_CELL_DBL_CLICK_EVENT_ATTNAME = "onCellDblClickEvent";
    public static final String ON_CELL_FOCUS_EVENT_ATTNAME = "onCellFocusEvent";
    public static final String ON_CELL_UPDATE_EVENT_ATTNAME = "onCellUpdateEvent";
    public static final String ON_CELL_VALIDATE_EVENT_ATTNAME = "onCellValidateEvent";
    public static final String ON_CONTEXT_MENU_EVENT_ATTNAME = "onContextMenuEvent";
    public static final String ON_DATA_READY_EVENT_ATTNAME = "onDataReadyEvent";
    public static final String ON_ERROR_EVENT_ATTNAME = "onErrorEvent";
    public static final String ON_HANDLE_ERROR_EVENT_ATTNAME = "onHandleErrorEvent";
    public static final String ON_HTML_READY_EVENT_ATTNAME = "onHtmlReadyEvent";
    public static final String ON_KEY_DOWN_EVENT_ATTNAME = "onKeyDownEvent";
    public static final String ON_KEY_UP_EVENT_ATTNAME = "onKeyUpEvent";
    public static final String ON_MOUSE_MOVE_EVENT_ATTNAME = "onMouseMoveEvent";
    public static final String ON_MOUSE_OUT_EVENT_ATTNAME = "onMouseOutEvent";
    public static final String ON_MOUSE_OVER_EVENT_ATTNAME = "onMouseOverEvent";
    public static final String ON_ROW_BLUR_EVENT_ATTNAME = "onRowBlurEvent";
    public static final String ON_ROW_FOCUS_EVENT_ATTNAME = "onRowFocusEvent";
    public static final String SCROLL_X_ATTNAME = "scrollX";
    public static final String SCROLL_Y_ATTNAME = "scrollY";
    public static final String SHOW_ERRORS_ATTNAME = "showErrors";
    public static final String HWRAP_ATTNAME = "hwrap";
    public static final String VWRAP_ATTNAME = "vwrap";
    public static final String DATA_SOURCE_ID_ATTNAME = "dataSourceId";
    public static final String AUTOINITIALIZE_ATTNAME = "autoInitialize";
    public static final String GRID_LISTENER_ATTNAME = "gridListener";
    
    // added for 2008q1
    public static final String EDIT_MODE_ATTNAME = "editMode";
    public static final String HEIGHT_FIXED_ATTNAME = "heightFixed";
    public static final String MIN_HEIGHT_ATTNAME = "minHeight";
    public static final String MIN_WIDTH_ATTNAME = "minWidth";
    public static final String ON_FOCUS_EVENT_ATTNAME = "onFocusEvent";
    public static final String ON_HIT_ROW_START_EVENT_ATTNAME = "onHitRowStartEvent";
    public static final String ON_HIT_ROW_END_EVENT_ATTNAME = "onHitRowEndEvent";
    public static final String ON_KEY_PRESSED_EVENT_ATTNAME = "onKeyPressedEvent";
    public static final String THEME_ATTNAME = "theme";
    public static final String TOOLTIPS_ENABLED_ATTNAME = "tooltipsEnabled";
    public static final String WIDTH_FIXED_ATTNAME = "widthFixed";
    
    @Override
    public String getComponentType() {
        //return UIGrid.COMPONENT_TYPE;
        return "UIGrid";
    }

    @Override
    public String getRendererType() {
        //return UIGrid.DEFAULT_RENDERER_TYPE;
        return "GridRenderer";
    }

    @Override
    public void release() {
        super.release();
        columnIndicatorsEnabled = null;
        toolbarEnabled = null;
        frozenLeftColumnCount = null;
        rowDeleteEnabled = null;
        rowInsertEnabled = null;
        autoAdd = null;
        autoSaveEnabled = null;
        rowsPerPage = null;
        height = null;
        width = null;
        keyGenerator = null;
        getHandler = null;
        saveHandler = null;
        mode = null;
        liveScrollingMode = null;
        copyEnabled = null;
        pasteEnabled = null;
        sortEnabled = null;
        gridResizeEnabled = null;
        rowHeight = null;
        headerHeight = null;
        sortMode = null;
        renderMode = null;
        enterTab = null;
        rowSelectEnabled = null;
        multiRowSelectEnabled = null;
        asynchronous = null;
        keyMode = null;
        onAfterCopyEvent = null;
        onAfterLoadDataPageEvent = null;
        onAfterLoadNextPageEvent = null;
        onAfterLoadPreviousPageEvent = null;
        onAfterPasteEvent = null;
        onAfterRefreshEvent = null;
        onAfterResizeEvent = null;
        onAfterRowDeleteEvent = null;
        onAfterRowInsertEvent = null;
        onAfterSaveEvent = null;
        onAfterSortEvent = null;
        onBeforeCellEditEvent = null;
        onBeforeCopyEvent = null;
        onBeforeLoadDataEvent = null;
        onBeforeLoadNextPageEvent = null;
        onBeforeLoadPreviousPageEvent = null;
        onBeforePasteEvent = null;
        onBeforeRefreshEvent = null;
        onBeforeResizeEvent = null;
        onBeforeRowDeleteEvent = null;
        onBeforeRowInsertEvent = null;
        onBeforeSaveEvent = null;
        onBeforeSortEvent = null;
        onCellClickEvent = null;
        onCellDblClickEvent = null;
        onCellFocusEvent = null;
        onCellUpdateEvent = null;
        onCellValidateEvent = null;
        onContextMenuEvent = null;
        onDataReadyEvent = null;
        onErrorEvent = null;
        onHandleErrorEvent = null;
        onHtmlReadyEvent = null;
        onKeyDownEvent = null;
        onKeyUpEvent = null;
        onMouseMoveEvent = null;
        onMouseOutEvent = null;
        onMouseOverEvent = null;
        onRowBlurEvent = null;
        onRowFocusEvent = null;
        scrollX = null;
        scrollY = null;
        showErrors = null;
        hwrap = null;
        vwrap = null;
        dataSourceId = null;
        autoInitialize = null;
        
        // added for 2008q1
        editMode = null;
        heightFixed = null;
        minHeight = null;
        minWidth = null;
        onFocusEvent = null;
        onHitRowStartEvent = null;
        onHitRowEndEvent = null;
        onKeyPressedEvent = null;
        theme = null;
        tooltipsEnabled = null;
        widthFixed = null;
    }

    @Override
    protected void setProperties(UIComponent component) {
        if(logger.isLoggable(Level.FINE)) {
            logger.entering("GridTag","setProperties");
        }
        super.setProperties(component);

        UIGrid grid = null;
        try {
            grid = (UIGrid)component;
        } catch(ClassCastException e) {
            throw new IllegalStateException("Could not cast to the UIGrid type.");
        }
        
        component.setValueExpression(COLUMN_INDICATORS_ENABLED_ATTNAME,columnIndicatorsEnabled);
        component.setValueExpression( TOOLBAR_ENABLED_ATTNAME  ,toolbarEnabled);
        component.setValueExpression( FROZEN_LEFT_COLUMN_COUNT_ATTNAME  ,frozenLeftColumnCount);
        component.setValueExpression(  ROW_DELETE_ENABLED_ATTNAME ,rowDeleteEnabled);
        component.setValueExpression(  ROW_INSERT_ENABLED_ATTNAME ,rowInsertEnabled);
        component.setValueExpression(AUTOADD_ATTNAME,autoAdd);
        component.setValueExpression(AUTO_SAVE_ENABLED_ATTNAME ,autoSaveEnabled);
        component.setValueExpression( ROWS_PER_PAGE_ATTNAME ,rowsPerPage);
        component.setValueExpression( HEIGHT_ATTNAME ,height);
        component.setValueExpression( WIDTH_ATTNAME,width);
        component.setValueExpression( KEYMODE_ATTNAME ,keyGenerator);

        if(getHandler != null) {
            if(logger.isLoggable(Level.FINE)) {
                logger.logp(Level.FINE, "GridTag","setProperties","Setting the getHandler value: " + getHandler.getExpressionString());
            }
            grid.setGethandler(getHandler);
        }

        if(saveHandler != null) {
            if(logger.isLoggable(Level.FINE)) {
                logger.logp(Level.FINE, "GridTag","setProperties","Setting the saveHandler value: " + saveHandler.getExpressionString());
            }
            grid.setSavehandler(saveHandler);
        }

        component.setValueExpression( MODE_ATTNAME  ,mode);
        component.setValueExpression( LIVE_SCROLLING_MODE_ATTNAME  ,liveScrollingMode);
        component.setValueExpression( COPY_ENABLED_ATTNAME  ,copyEnabled);
        component.setValueExpression( PASTE_ENABLED_ATTNAME  ,pasteEnabled);
        component.setValueExpression( SORT_ENABLED_ATTNAME  ,sortEnabled);
        component.setValueExpression( GRID_RESIZE_ENABLED_ATTNAME  ,gridResizeEnabled);
        component.setValueExpression(  ROW_HEIGHT_ATTNAME ,rowHeight);
        component.setValueExpression( HEADER_HEIGHT_ATTNAME  ,headerHeight);
        component.setValueExpression( SORT_MODE_ATTNAME  ,sortMode);
        component.setValueExpression( RENDER_MODE_ATTNAME  ,renderMode);
        component.setValueExpression( ENTER_TAB_ATTNAME  ,enterTab);
        component.setValueExpression( ROW_SELECT_ENABLED_ATTNAME  ,rowSelectEnabled);
        component.setValueExpression( MULTI_ROW_SELECT_ENABLED_ATTNAME  ,multiRowSelectEnabled);
        component.setValueExpression( ASYNCHRONOUS_ATTNAME  ,asynchronous);
        component.setValueExpression( KEYMODE_ATTNAME  ,keyMode);
        component.setValueExpression( ON_AFTER_COPY_EVENT_ATTNAME  ,onAfterCopyEvent);
        component.setValueExpression( ON_AFTER_LOAD_DATA_PAGE_EVENT_ATTNAME  ,onAfterLoadDataPageEvent);
        component.setValueExpression( ON_AFTER_LOAD_NEXT_PAGE_EVENT_ATTNAME  ,onAfterLoadNextPageEvent);
        component.setValueExpression( ON_AFTER_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME  ,onAfterLoadPreviousPageEvent);
        component.setValueExpression( ON_AFTER_PASTE_EVENT_ATTNAME  ,onAfterPasteEvent);
        component.setValueExpression( ON_AFTER_REFRESH_EVENT_ATTNAME  ,onAfterRefreshEvent);
        component.setValueExpression( ON_AFTER_RESIZE_EVENT_ATTNAME  ,onAfterResizeEvent);
        component.setValueExpression( ON_AFTER_ROW_DELETE_EVENT_ATTNAME  ,onAfterRowDeleteEvent);
        component.setValueExpression( ON_AFTER_ROW_INSERT_EVENT_ATTNAME  ,onAfterRowInsertEvent);
        component.setValueExpression( ON_AFTER_SAVE_EVENT_ATTNAME  ,onAfterSaveEvent);
        component.setValueExpression( ON_AFTER_SORT_EVENT_ATTNAME  ,onAfterSortEvent);
        component.setValueExpression( ON_BEFORE_CELL_EDIT_EVENT_ATTNAME  ,onBeforeCellEditEvent);
        component.setValueExpression( ON_BEFORE_COPY_EVENT_ATTNAME  ,onBeforeCopyEvent);
        component.setValueExpression( ON_BEFORE_LOAD_DATA_EVENT_ATTNAME  ,onBeforeLoadDataEvent);
        component.setValueExpression( ON_BEFORE_LOAD_NEXT_PAGE_EVENT_ATTNAME  ,onBeforeLoadNextPageEvent);
        component.setValueExpression( ON_BEFORE_LOAD_PREVIOUS_PAGE_EVENT_ATTNAME  ,onBeforeLoadPreviousPageEvent);
        component.setValueExpression( ON_BEFORE_PASTE_EVENT_ATTNAME  ,onBeforePasteEvent);
        component.setValueExpression( ON_BEFORE_REFRESH_EVENT_ATTNAME  ,onBeforeRefreshEvent);
        component.setValueExpression( ON_BEFORE_RESIZE_EVENT_ATTNAME  ,onBeforeResizeEvent);
        component.setValueExpression( ON_BEFORE_ROW_DELETE_EVENT_ATTNAME  ,onBeforeRowDeleteEvent);
        component.setValueExpression( ON_BEFORE_ROW_INSERT_EVENT_ATTNAME  ,onBeforeRowInsertEvent);
        component.setValueExpression( ON_BEFORE_SAVE_EVENT_ATTNAME  ,onBeforeSaveEvent);
        component.setValueExpression( ON_BEFORE_SORT_EVENT_ATTNAME  ,onBeforeSortEvent);
        component.setValueExpression( ON_CELL_CLICK_EVENT_ATTNAME  ,onCellClickEvent);
        component.setValueExpression( ON_CELL_DBL_CLICK_EVENT_ATTNAME  ,onCellDblClickEvent);
        component.setValueExpression( ON_CELL_FOCUS_EVENT_ATTNAME  ,onCellFocusEvent);
        component.setValueExpression( ON_CELL_UPDATE_EVENT_ATTNAME  ,onCellUpdateEvent);
        component.setValueExpression( ON_CELL_VALIDATE_EVENT_ATTNAME  ,onCellValidateEvent);
        component.setValueExpression( ON_CONTEXT_MENU_EVENT_ATTNAME  ,onContextMenuEvent);
        component.setValueExpression( ON_DATA_READY_EVENT_ATTNAME  ,onDataReadyEvent);
        component.setValueExpression( ON_ERROR_EVENT_ATTNAME  ,onErrorEvent);
        component.setValueExpression( ON_HANDLE_ERROR_EVENT_ATTNAME  ,onHandleErrorEvent);
        component.setValueExpression( ON_HTML_READY_EVENT_ATTNAME  ,onHtmlReadyEvent);
        component.setValueExpression( ON_KEY_DOWN_EVENT_ATTNAME  ,onKeyDownEvent);
        component.setValueExpression( ON_KEY_UP_EVENT_ATTNAME  ,onKeyUpEvent);
        component.setValueExpression( ON_MOUSE_OVER_EVENT_ATTNAME  ,onMouseMoveEvent);
        component.setValueExpression( ON_MOUSE_OUT_EVENT_ATTNAME  ,onMouseOutEvent);
        component.setValueExpression( ON_MOUSE_OVER_EVENT_ATTNAME  ,onMouseOverEvent);
        component.setValueExpression( ON_ROW_BLUR_EVENT_ATTNAME  ,onRowBlurEvent);
        component.setValueExpression( ON_ROW_FOCUS_EVENT_ATTNAME  ,onRowFocusEvent);
        component.setValueExpression( SCROLL_X_ATTNAME  ,scrollX);
        component.setValueExpression( SCROLL_Y_ATTNAME  ,scrollY);
        component.setValueExpression( SHOW_ERRORS_ATTNAME  ,showErrors);
        component.setValueExpression( HWRAP_ATTNAME  ,hwrap);
        component.setValueExpression( VWRAP_ATTNAME  ,vwrap);
        component.setValueExpression( DATA_SOURCE_ID_ATTNAME, dataSourceId);
        component.setValueExpression( NitobiRenderer.AUTOINIT, autoInitialize);
        
        // added for 2008q1
        component.setValueExpression(EDIT_MODE_ATTNAME, editMode);
        component.setValueExpression(HEIGHT_FIXED_ATTNAME, heightFixed);
        component.setValueExpression(MIN_HEIGHT_ATTNAME, minHeight);
        component.setValueExpression(MIN_WIDTH_ATTNAME, minWidth);
        component.setValueExpression(ON_FOCUS_EVENT_ATTNAME, onFocusEvent);
        component.setValueExpression(ON_HIT_ROW_START_EVENT_ATTNAME, onHitRowStartEvent);
        component.setValueExpression(ON_HIT_ROW_END_EVENT_ATTNAME, onHitRowEndEvent);
        component.setValueExpression(ON_KEY_PRESSED_EVENT_ATTNAME, onKeyPressedEvent);
        component.setValueExpression(THEME_ATTNAME, theme);
        component.setValueExpression(TOOLTIPS_ENABLED_ATTNAME, tooltipsEnabled);
        component.setValueExpression(WIDTH_FIXED_ATTNAME, widthFixed);

        if(logger.isLoggable(Level.FINE)) {
            logger.exiting("GridTag","setProperties");
        }
    }


    public void setAsynchronous(ValueExpression asynchronous) {
        this.asynchronous = asynchronous;
    }


    public void setAutoAdd(ValueExpression autoAdd) {
        this.autoAdd = autoAdd;
    }


    public void setAutoSaveEnabled(ValueExpression autoSaveEnabled) {
        this.autoSaveEnabled = autoSaveEnabled;
    }

    public void setColumnIndicatorsEnabled(ValueExpression columnIndicatorsEnabled) {
        this.columnIndicatorsEnabled = columnIndicatorsEnabled;
    }

    public void setCopyEnabled(ValueExpression copyEnabled) {
        this.copyEnabled = copyEnabled;
    }

    public void setEnterTab(ValueExpression enterTab) {
        this.enterTab = enterTab;
    }

    public void setFrozenLeftColumnCount(ValueExpression frozenLeftColumnCount) {
        this.frozenLeftColumnCount = frozenLeftColumnCount;
    }

    public void setGetHandler(MethodExpression getHandler) {
        this.getHandler = getHandler;
    }

    public void setGridResizeEnabled(ValueExpression gridResizeEnabled) {
        this.gridResizeEnabled = gridResizeEnabled;
    }

    public void setHeaderHeight(ValueExpression headerHeight) {
        this.headerHeight = headerHeight;
    }

    public void setHeight(ValueExpression height) {
        this.height = height;
    }

    public void setHwrap(ValueExpression hwrap) {
        this.hwrap = hwrap;
    }

    public void setKeyGenerator(ValueExpression keyGenerator) {
        this.keyGenerator = keyGenerator;
    }

    public void setKeyMode(ValueExpression keyMode) {
        this.keyMode = keyMode;
    }
    public void setLiveScrollingMode(ValueExpression liveScrollingMode) {
        this.liveScrollingMode = liveScrollingMode;
    }

    public void setMode(ValueExpression mode) {
        this.mode = mode;
    }

    public void setMultiRowSelectEnabled(ValueExpression multiRowSelectEnabled) {
        this.multiRowSelectEnabled = multiRowSelectEnabled;
    }

    public void setOnAfterCopyEvent(ValueExpression onAfterCopyEvent) {
        this.onAfterCopyEvent = onAfterCopyEvent;
    }

    public void setOnAfterLoadDataPageEvent(ValueExpression onAfterLoadDataPageEvent) {
        this.onAfterLoadDataPageEvent = onAfterLoadDataPageEvent;
    }

    public void setOnAfterLoadNextPageEvent(ValueExpression onAfterLoadNextPageEvent) {
        this.onAfterLoadNextPageEvent = onAfterLoadNextPageEvent;
    }

    public void setOnAfterLoadPreviousPageEvent(ValueExpression onAfterLoadPreviousPageEvent) {
        this.onAfterLoadPreviousPageEvent = onAfterLoadPreviousPageEvent;
    }

    public void setOnAfterPasteEvent(ValueExpression onAfterPasteEvent) {
        this.onAfterPasteEvent = onAfterPasteEvent;
    }

    public void setOnAfterRefreshEvent(ValueExpression onAfterRefreshEvent) {
        this.onAfterRefreshEvent = onAfterRefreshEvent;
    }

    public void setOnAfterResizeEvent(ValueExpression onAfterResizeEvent) {
        this.onAfterResizeEvent = onAfterResizeEvent;
    }

    public void setOnAfterRowDeleteEvent(ValueExpression onAfterRowDeleteEvent) {
        this.onAfterRowDeleteEvent = onAfterRowDeleteEvent;
    }

    public void setOnAfterRowInsertEvent(ValueExpression onAfterRowInsertEvent) {
        this.onAfterRowInsertEvent = onAfterRowInsertEvent;
    }

    public void setOnAfterSaveEvent(ValueExpression onAfterSaveEvent) {
        this.onAfterSaveEvent = onAfterSaveEvent;
    }

    public void setOnAfterSortEvent(ValueExpression onAfterSortEvent) {
        this.onAfterSortEvent = onAfterSortEvent;
    }

    public void setOnBeforeCellEditEvent(ValueExpression onBeforeCellEditEvent) {
        this.onBeforeCellEditEvent = onBeforeCellEditEvent;
    }

    public void setOnBeforeCopyEvent(ValueExpression onBeforeCopyEvent) {
        this.onBeforeCopyEvent = onBeforeCopyEvent;
    }

    public void setOnBeforeLoadDataEvent(ValueExpression onBeforeLoadDataEvent) {
        this.onBeforeLoadDataEvent = onBeforeLoadDataEvent;
    }

    public void setOnBeforeLoadNextPageEvent(ValueExpression onBeforeLoadNextPageEvent) {
        this.onBeforeLoadNextPageEvent = onBeforeLoadNextPageEvent;
    }

    public void setOnBeforeLoadPreviousPageEvent(ValueExpression onBeforeLoadPreviousPageEvent) {
        this.onBeforeLoadPreviousPageEvent = onBeforeLoadPreviousPageEvent;
    }

    public void setOnBeforePasteEvent(ValueExpression onBeforePasteEvent) {
        this.onBeforePasteEvent = onBeforePasteEvent;
    }

    public void setOnBeforeRefreshEvent(ValueExpression onBeforeRefreshEvent) {
        this.onBeforeRefreshEvent = onBeforeRefreshEvent;
    }

    public void setOnBeforeResizeEvent(ValueExpression onBeforeResizeEvent) {
        this.onBeforeResizeEvent = onBeforeResizeEvent;
    }

    public void setOnBeforeRowDeleteEvent(ValueExpression onBeforeRowDeleteEvent) {
        this.onBeforeRowDeleteEvent = onBeforeRowDeleteEvent;
    }

    public void setOnBeforeRowInsertEvent(ValueExpression onBeforeRowInsertEvent) {
        this.onBeforeRowInsertEvent = onBeforeRowInsertEvent;
    }

    public void setOnBeforeSaveEvent(ValueExpression onBeforeSaveEvent) {
        this.onBeforeSaveEvent = onBeforeSaveEvent;
    }

    public void setOnBeforeSortEvent(ValueExpression onBeforeSortEvent) {
        this.onBeforeSortEvent = onBeforeSortEvent;
    }

    public void setOnCellClickEvent(ValueExpression onCellClickEvent) {
        this.onCellClickEvent = onCellClickEvent;
    }

    public void setOnCellDblClickEvent(ValueExpression onCellDblClickEvent) {
        this.onCellDblClickEvent = onCellDblClickEvent;
    }

    public void setOnCellFocusEvent(ValueExpression onCellFocusEvent) {
        this.onCellFocusEvent = onCellFocusEvent;
    }

    public void setOnCellUpdateEvent(ValueExpression onCellUpdateEvent) {
        this.onCellUpdateEvent = onCellUpdateEvent;
    }

    public void setOnCellValidateEvent(ValueExpression onCellValidateEvent) {
        this.onCellValidateEvent = onCellValidateEvent;
    }

    public void setOnContextMenuEvent(ValueExpression onContextMenuEvent) {
        this.onContextMenuEvent = onContextMenuEvent;
    }

    public void setOnDataReadyEvent(ValueExpression onDataReadyEvent) {
        this.onDataReadyEvent = onDataReadyEvent;
    }

    public void setOnErrorEvent(ValueExpression onErrorEvent) {
        this.onErrorEvent = onErrorEvent;
    }

    public void setOnHandleErrorEvent(ValueExpression onHandleErrorEvent) {
        this.onHandleErrorEvent = onHandleErrorEvent;
    }

    public void setOnHtmlReadyEvent(ValueExpression onHtmlReadyEvent) {
        this.onHtmlReadyEvent = onHtmlReadyEvent;
    }

    public void setOnKeyDownEvent(ValueExpression onKeyDownEvent) {
        this.onKeyDownEvent = onKeyDownEvent;
    }

    public void setOnKeyUpEvent(ValueExpression onKeyUpEvent) {
        this.onKeyUpEvent = onKeyUpEvent;
    }

    public void setOnMouseMoveEvent(ValueExpression onMouseMoveEvent) {
        this.onMouseMoveEvent = onMouseMoveEvent;
    }

    public void setOnMouseOutEvent(ValueExpression onMouseOutEvent) {
        this.onMouseOutEvent = onMouseOutEvent;
    }

    public void setOnMouseOverEvent(ValueExpression onMouseOverEvent) {
        this.onMouseOverEvent = onMouseOverEvent;
    }

    public void setOnRowBlurEvent(ValueExpression onRowBlurEvent) {
        this.onRowBlurEvent = onRowBlurEvent;
    }

    public void setOnRowFocusEvent(ValueExpression onRowFocusEvent) {
        this.onRowFocusEvent = onRowFocusEvent;
    }

    public void setPasteEnabled(ValueExpression pasteEnabled) {
        this.pasteEnabled = pasteEnabled;
    }

    public void setRenderMode(ValueExpression renderMode) {
        this.renderMode = renderMode;
    }

    public void setRowDeleteEnabled(ValueExpression rowDeleteEnabled) {
        this.rowDeleteEnabled = rowDeleteEnabled;
    }

    public void setRowHeight(ValueExpression rowHeight) {
        this.rowHeight = rowHeight;
    }

    public void setRowInsertEnabled(ValueExpression rowInsertEnabled) {
        this.rowInsertEnabled = rowInsertEnabled;
    }

    public void setRowSelectEnabled(ValueExpression rowSelectEnabled) {
        this.rowSelectEnabled = rowSelectEnabled;
    }

    public void setRowsPerPage(ValueExpression rowsPerPage) {
        this.rowsPerPage = rowsPerPage;
    }

    public void setSaveHandler(MethodExpression saveHandler) {
        this.saveHandler = saveHandler;
    }

    public void setScrollX(ValueExpression scrollX) {
        this.scrollX = scrollX;
    }

    public void setScrollY(ValueExpression scrollY) {
        this.scrollY = scrollY;
    }

    public void setShowErrors(ValueExpression showErrors) {
        this.showErrors = showErrors;
    }

    public void setSortEnabled(ValueExpression sortEnabled) {
        this.sortEnabled = sortEnabled;
    }

    public void setSortMode(ValueExpression sortMode) {
        this.sortMode = sortMode;
    }

    public void setToolbarEnabled(ValueExpression toolbarEnabled) {
        this.toolbarEnabled = toolbarEnabled;
    }

    public void setVwrap(ValueExpression vwrap) {
        this.vwrap = vwrap;
    }

    public void setWidth(ValueExpression width) {
        this.width = width;
    }

    public void setAutoInitialize(ValueExpression autoInitialize) {
        this.autoInitialize = autoInitialize;
    }

    public void setEditMode(ValueExpression editMode) {
        this.editMode = editMode;
    }

    public void setHeightFixed(ValueExpression heightFixed) {
        this.heightFixed = heightFixed;
    }

    public void setMinHeight(ValueExpression minHeight) {
        this.minHeight = minHeight;
    }

    public void setMinWidth(ValueExpression minWidth) {
        this.minWidth = minWidth;
    }

    public void setOnFocusEvent(ValueExpression onFocusEvent) {
        this.onFocusEvent = onFocusEvent;
    }

    public void setOnHitRowEndEvent(ValueExpression onHitRowEndEvent) {
        this.onHitRowEndEvent = onHitRowEndEvent;
    }

    public void setOnHitRowStartEvent(ValueExpression onHitRowStartEvent) {
        this.onHitRowStartEvent = onHitRowStartEvent;
    }

    public void setOnKeyPressedEvent(ValueExpression onKeyPressedEvent) {
        this.onKeyPressedEvent = onKeyPressedEvent;
    }

    public void setTheme(ValueExpression theme) {
        this.theme = theme;
    }

    public void setTooltipsEnabled(ValueExpression tooltipsEnabled) {
        this.tooltipsEnabled = tooltipsEnabled;
    }

    public void setWidthFixed(ValueExpression widthFixed) {
        this.widthFixed = widthFixed;
    }

    public void setDataSourceId(ValueExpression dataSourceId) {
        this.dataSourceId = dataSourceId;
    }
}
