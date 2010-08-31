/**
 * User: Eric Buitenhuis 
 * Date: Jun 8, 2008
 * Time: 1:02:15 PM
 */

package com.nitobi.jsf.example.backing.callout;

import com.nitobi.beans.params.ComboParams;
import com.nitobi.exception.NitobiException;
import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.tools.Record;

import javax.faces.application.Application;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * CalloutThemeBean
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class CalloutThemeBean {

    private String selectedTheme;
    private Map<String, Object> availableThemes;

    public CalloutThemeBean() {

        /*
         * The available themes are stored in an application-scope bean.
         */
        FacesContext facesContext = FacesContext.getCurrentInstance();
        Application application = facesContext.getApplication();
        availableThemes = (Map<String, Object>) application.evaluateExpressionGet(
                facesContext, "#{availableCalloutThemesBean.themes}", Map.class);

        selectedTheme = "flex";
    }

    public String getSelectedTheme() {
        return selectedTheme;
    }

    public void setSelectedTheme(String selectedTheme) {
        this.selectedTheme = selectedTheme;
    }

    public void availableThemes(GetHandler gethandler, HttpServletRequest request) {

        /*
        * Define the combo params and filter the available
        */
        ComboParams params = new ComboParams(
                request.getParameter(ComboParams.COMBO_ID),
                request.getParameter(ComboParams.LAST_STRING),
                request.getParameter(ComboParams.PAGE_SIZE),
                request.getParameter(ComboParams.SEARCH_SUBSTRING),
                request.getParameter(ComboParams.STARTING_RECORD_INDEX));

        /*
         * For the purposes of this demo, I will only prevent a combobox from attempting to grab
         * the next page. Normally, this is the place where you would grab a subset based on the comboparams.
         */
        if (Integer.parseInt(params.getStartingRecordIndex()) > 0) {
            gethandler.setErrorMessage("This combo is not meant to page.");
            return;
        }

        /*
         * Define the fields
         */
        try {
            gethandler.defineField("id");
            gethandler.defineField("name");
        } catch (NitobiException e) {
            gethandler.setErrorMessage("Could not define the fields.");
            return;
        }

        /*
         * Iterate through the available entries and enter them as records
         * in the gethandler.
         */
        Record record;
        for (Map.Entry<String, Object> entry : availableThemes.entrySet()) {
            try {
                record = gethandler.createNewRecord(String.valueOf(entry.hashCode()));
                record.setField("id", entry.getKey());
                record.setField("name", entry.getValue().toString());
                gethandler.addRecord(record);
            } catch (NitobiException e) {
                gethandler.setErrorMessage("Could not create Record object. " + e.getMessage());
            }
        }
    }
}


