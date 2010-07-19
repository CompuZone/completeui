
package eba.savehandler;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;

/**
 * This class provides all specific functionality needed for the EBA:Grid savehandler in a JSP environment.
 * @author Nitobi
 * @deprecated Use com.nitobi.server.handler.SaveHandler
 **/
public class JspSaveHandler extends GenericSaveHandler{
	private JspWriter out;

	/**
	 * Creates a JspSaveHandler.
	 * @param request The HttpServletRequest the SaveHandler can read the messages from the grid from.
	 * @param out The JspWriter the SaveHandler can write back to the Grid.
	 * @throws IOException
	 * @throws Exception
	 */
	public JspSaveHandler(HttpServletRequest request, JspWriter out) throws IOException, Exception {
		super(request, out);
		this.out = out;
	}
	
	/**
	 * Writes back EBA compressed XML to the Grid and should only be called once at the end of the GetHandler page. This informs the Grid that this SaveHandler has been executed correctly. When using AutoSave this Method does not have to be called.
	 * @throws IOException
	 */
	public void writeToClient(String encoding) throws IOException {
		// clears the output buffer
		this.out.clearBuffer();
		// writes back the confirmation information to
		super.writeToClient(encoding);
	}	
}
