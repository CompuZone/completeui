/**
 * User: Eric Buitenhuis 
 * Date: Jun 21, 2008
 * Time: 9:28:59 AM
 */

package com.nitobi.jsf.example.backing;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import java.sql.Statement;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * BackingBase
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
public class BackingBase {

    private static Logger logger = Logger.getLogger(BackingBase.class.getName());

    private Connection connection = null;
    private Statement statement = null;

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
        } catch (InstantiationException e) {
            System.out.println("Could not instantiate the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            System.out.println("Could not access the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            System.out.println("Could not find the database driver: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    /**
     * @throws Exception
     */
    private void establishConnection() throws Exception {
        if(this.connection == null || this.connection.isClosed()) {
            try {
                this.connection = DriverManager.getConnection("jdbc:mysql://localhost/nitobi_testdb_v1?user=nitobi");
                if (logger.isLoggable(Level.FINE)) {
                    logger.fine("Obtained database connection");
                }
            } catch (SQLException e) {
                logger.severe("Could not obtain the connection object: " + e.getMessage());
                throw e;
            }
        }
    }

    /**
     * @param sql                  The sql string to be used for the query
     * @param resultSetType        The ResultSet type.
     * @param resultSetConcurrency The ResultSet concurrency type
     * @return
     * @throws Exception
     */
    protected ResultSet performQuery(String sql,
                                     int resultSetType,
                                     int resultSetConcurrency) throws Exception {

        establishConnection(); // let this exception pass through

        Statement statement = null;
        try {
            statement = connection.createStatement(resultSetType, resultSetConcurrency);
        } catch (SQLException e) {
            logger.severe("Could not create an SQL Statement: " + e.getMessage());
            throw e;
        }
        ResultSet rs = null;
        try {
            rs = statement.executeQuery(sql);
        } catch (SQLException e) {
            logger.severe("Could not execute query: " + sql);
            throw e;
        }
        return rs;
    }

    protected void performUpdate(String sql) throws Exception {
        establishConnection();
        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            logger.severe("Could not create an SQL Statement: " + e.getMessage());
            throw e;
        }
        try {
            if(statement != null) {
                statement.executeUpdate(sql);
            }
        } catch (SQLException e) {
            logger.severe("Could not execute update: " + sql);
            throw e;
        }
    }

    protected void closeResources() {
        try {
            if (this.statement != null) {
                this.statement.close();
            }

            if (this.connection != null) {
                this.connection.close();
            }
        } catch (SQLException e) {
            logger.warning("Could not close database resources: " + e.getMessage());
            e.printStackTrace(System.err);
        }
    }

    protected void logFacesMessage(FacesMessage message) {
        logger.info(message.getDetail());
    }

    protected void logException(Exception e) {
        FacesMessage msg = new FacesMessage(e.getMessage());
        FacesContext.getCurrentInstance().addMessage("An exception occurred: ", msg);
        logger.warning(e.getMessage());
    }
}
