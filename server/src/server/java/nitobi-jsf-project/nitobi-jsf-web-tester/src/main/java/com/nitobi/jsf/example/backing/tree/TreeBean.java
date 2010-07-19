/**
 * User: Eric Buitenhuis 
 * Date: May 11, 2008
 * Time: 9:25:53 PM
 */

package com.nitobi.jsf.example.backing.tree;

import com.nitobi.jsf.event.NitobiGetEvent;
import com.nitobi.jsf.example.backing.BackingBase;
import com.nitobi.server.handler.GetHandler;
import com.nitobi.server.tools.Record;

import java.sql.ResultSet;
import java.util.Map;
import java.util.logging.Logger;

/**
 * TreeBean
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class TreeBean extends BackingBase {

    private static Logger logger = Logger.getLogger(TreeBean.class.getName());

    public String populateTree(NitobiGetEvent event) {

        GetHandler myGetHandler = event.getGethandler();
        Map requestParams = event.getParams();

        String nodeId = (String) requestParams.get("id");
        if (nodeId == null) {
            nodeId = "0";         // define default value for the parent's ID.
        }

        String sortColumn = "RegionName";
        String tableName = "tblregions";

        try {

            String newQuery = "SELECT * FROM " + tableName + " WHERE RegionOwner = " + nodeId + " ORDER BY " + sortColumn + ";";
            ResultSet rs = performQuery(newQuery, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            // Lets Set up the Output

            // These are the required fields

            myGetHandler.defineField("id");
            myGetHandler.defineField("label");
            myGetHandler.defineField("nodetype");
            myGetHandler.defineField("haschildren");
            // These are optional, @url is used for frame targeting, and @flag is used when
            // the sidebar is turned on.
            // myGetHandler.defineField("url");
            // myGetHandler.defineField("flag");

            // You can also include any other kind of metadata you wish:
            // myGetHandler.defineField("arbitraryMetadata");

            // loop through the ResultSet from the Database and set values to myGetHandler
            Record curRecord;
            while (rs.next()) {
                String regionId = rs.getString("RegionID");
                curRecord = myGetHandler.createNewRecord(regionId);

                curRecord.setField("id", regionId);
                curRecord.setField("label", rs.getString("RegionName"));

                // Here we use an SQL query to determine whether there are children for this node.

                String isNodeQuery = "SELECT COUNT(1) as childcount FROM " + tableName + " WHERE RegionOwner = " + regionId + ";";
                ResultSet isNode = performQuery(isNodeQuery, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
                isNode.next();

                // If there are children, then it is a node and has children.
                // (in other situations you may wish to be able to describe nodes that have
                // no children)
                if (isNode.getInt("childcount") > 0) {
                    curRecord.setField("nodetype", "node");
                    curRecord.setField("haschildren", "true");
                } else {
                    curRecord.setField("nodetype", "leaf");
                    curRecord.setField("haschildren", "false");
                }

                myGetHandler.addRecord(curRecord);
                isNode.close();
            }
            // clean up
            rs.close();
            closeResources();
        }
        catch (Exception ex) {
            //
        }
        return "";
    }
}
