package com.nitobi.jsp.tree;

import javax.servlet.jsp.JspException;
import com.nitobi.jsp.NitobiBodyTag;

/**
 * @jsp.tag name="node"
 * description="A tag to output a ntb:node element"
 * @author mhan
 *
 */
public class Node extends NitobiBodyTag
{
	private static final long serialVersionUID = -1700357211501261327L;
	private String label;
	private String gethandler;
	private String cssclass;
	private String expanded;
	private String nodetype;
	private String haschildren;
	private String keyvalue;
	private String type;
	private String url;
	private String onclick;
	private String onselect;
	private String ondeselect;
	
	public int doStartTag() throws JspException
	{
		writeNodeStartTag();
		return EVAL_BODY_INCLUDE;
	}
	
	public int doEndTag() throws JspException
	{
		writeNodeEndTag();
		return EVAL_PAGE;
	}
	
	private void writeNodeStartTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("<ntb:node ");
			writeTagAttributes();
			pageContext.getOut().print(">");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}
	
	private void writeNodeEndTag() throws JspException
	{
		try
		{
			pageContext.getOut().print("</ntb:node>");
		}
		catch (java.io.IOException e)
		{
			throw new JspException(e);
		}
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The cssclass attribute" 
	 * @return the cssclass
	 */
	public String getCssclass() {
		return cssclass;
	}

	/**
	 * @param cssclass the cssclass to set
	 */
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The expanded attribute" 
	 * @return the expanded
	 */
	public String getExpanded() {
		return expanded;
	}

	/**
	 * @param expanded the expanded to set
	 */
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The gethandler attribute" 
	 * @return the gethandler
	 */
	public String getGethandler() {
		return gethandler;
	}

	/**
	 * @param gethandler the gethandler to set
	 */
	public void setGethandler(String gethandler) {
		this.gethandler = gethandler;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The haschildren attribute" 
	 * @return the haschildren
	 */
	public String getHaschildren() {
		return haschildren;
	}

	/**
	 * @param haschildren the haschildren to set
	 */
	public void setHaschildren(String haschildren) {
		this.haschildren = haschildren;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The label attribute" 
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The nodetype attribute" 
	 * @return the nodetype
	 */
	public String getNodetype() {
		return nodetype;
	}

	/**
	 * @param nodetype the nodetype to set
	 */
	public void setNodetype(String nodetype) {
		this.nodetype = nodetype;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onclick attribute" 
	 * @return the onclick
	 */
	public String getOnclick() {
		return onclick;
	}

	/**
	 * @param onclick the onclick to set
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The ondeselect attribute" 
	 * @return the ondeselect
	 */
	public String getOndeselect() {
		return ondeselect;
	}

	/**
	 * @param ondeselect the ondeselect to set
	 */
	public void setOndeselect(String ondeselect) {
		this.ondeselect = ondeselect;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The onselect attribute" 
	 * @return the onselect
	 */
	public String getOnselect() {
		return onselect;
	}

	/**
	 * @param onselect the onselect to set
	 */
	public void setOnselect(String onselect) {
		this.onselect = onselect;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The keyvalue attribute" 
	 * @return the key
	 */
	public String getKeyvalue() {
		return keyvalue;
	}

	/**
	 * @param key the key to set
	 */
	public void setKeyvalue(String key) {
		this.keyvalue = key;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The type attribute" 
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @jsp.attribute required="false" 
	 * 				  rtexprvalue="true" 
	 * 				  description="The url attribute" 
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	

}
