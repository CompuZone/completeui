
package eba.savehandler;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import java.io.Writer;

import eba.gethandler.Record;
import eba.tools.XmlRecord;


/**
 * This class provides all general functionality needed for the EBA:Grid savehandler.  It acts as an
 * implementation of a savehandler that uses a java.io.Writer class for output.
 * @author Nitobi
 * @deprecated Use com.nitobi.server.handler.SaveHandler
 **/
public class GenericSaveHandler {
	private Writer out;
	private Vector insertRecords;
	private Vector updateRecords;
	private Vector deleteRecords;
	private eba.tools.XmlConverter converter;

	/**
	 * Creates a SaveHandler.
	 * @param request The HttpServletRequest the SaveHandler can read the messages from the grid from.
	 * @param out The Writer the SaveHandler can write back to the Grid.
	 * @throws IOException
	 * @throws Exception
	 */
	public GenericSaveHandler(HttpServletRequest request, Writer out) throws IOException, Exception {
		this.out=out;
		this.insertRecords=new Vector();
		this.updateRecords=new Vector();
		this.deleteRecords=new Vector();
		
		converter=new eba.tools.XmlConverter();
//		converter.setEbaXml(request.getReader());
		// use below to allow encoding to take effect
		converter.setEbaXml(request.getInputStream());
		Vector updategramRecords = converter.getRecords();
		
		String[] fieldDefinitions=new String[converter.getFields().length+1];
		fieldDefinitions[0]="_recordID";
		for (int i=0; i<converter.getFields().length; i++) {
			fieldDefinitions[i+1]=converter.getFields()[i];			
		}
		
		XmlRecord xmlRecord;
		Record curRecord;		
		Vector curValues;
		for (int i = 0; i < updategramRecords.size(); i++) {
			// Get the record and the key.
			xmlRecord = (eba.tools.XmlRecord) updategramRecords.get(i);
			String key = xmlRecord.getKey();
			curRecord=new Record(fieldDefinitions,key);
			curValues=xmlRecord.getValues();				
			for (int j=0; j< curValues.size(); j++) {
				curRecord.setField(j+1,(String)curValues.get(j));
			}			
			if (xmlRecord.getEbaType().equals("insert")) {	
				this.insertRecords.add(curRecord);
			}
			if (xmlRecord.getEbaType().equals("update")) {				
				this.updateRecords.add(curRecord);
			}
			if (xmlRecord.getEbaType().equals("delete")) {				
				this.deleteRecords.add(curRecord);
			}
		}	
	}
	
	/**
	 * Sets the error message to be sent to the client in the response. Passing an empty string will clear the error message.
	 * @param message The error message
	 */
	public void setErrorMessage(String message) {
		converter.setErrorMessage(message);
	}
	/**
	 * Returns an Array of Records each of which has to be inserted into your data source.
	 * @return All records which need to be inserted into your data source.
	 */
	public Record[] getInsertRecords() {
		// will return all records to insert into the database
		Record[] tmp = new Record[0];
		return (Record[]) this.insertRecords.toArray(tmp);
	}
	/**
	 * Returns an Array of Records each of which has to be updated in your data source.
	 * @return All records which need to be updated in your data source.
	 */
	public Record[] getUpdateRecords() {
		// will return all records to insert into the database
		Record[] tmp = new Record[0];
		return (Record[]) this.updateRecords.toArray(tmp);
	}
	/**
	 * Returns an Array of Records each of which has to be deleted from your data source.
	 * @return All records which need to be deleted from your data source.
	 */
	public Record[] getDeleteRecords() {
		// will return all records to insert into the database
		Record[] tmp = new Record[0];
		return (Record[]) this.deleteRecords.toArray(tmp);
	}
	/**
	 * Writes back EBA compressed XML to the Grid and should only be called once at the end of the GetHandler page. This informs the Grid that this SaveHandler has been executed correctly. When using AutoSave this Method does not have to be called. Uses default encoding of UTF-8 for the XML document.
	 * @throws IOException
	 */
	public void writeToClient() throws IOException {
		this.writeToClient("UTF-8");
	}
	/**
	 * Writes back EBA compressed XML to the Grid and should only be called once at the end of the GetHandler page. This informs the Grid that this SaveHandler has been executed correctly. When using AutoSave this Method does not have to be called.
	 * @throws IOException
	 */
	public void writeToClient(String encoding) throws IOException {
		// writes back the confirmation information to
		this.out.write(this.converter.getEbaXml(encoding));
	}
	
	/**
	 * Writes back Nitobi compressed XML to the Grid and should only be called once at the end of the SaveHandler page.  This informs the Grid that this SaveHandler has been executed correctly.  When using AutoSave this method does not have to be called.
	 * @throws IOException
	 */
	public void writeToClient(String encoding, java.io.Writer writer) throws IOException
	{
		writer.write(this.converter.getEbaXml(encoding));
	}
	
	/**
	 * Returns the XmlConverter that contains XML data for the updategram.
	 * @return eba.tools.XmlConverter
	 */
	public eba.tools.XmlConverter getConverter()
	{
		return converter;
	}
}
