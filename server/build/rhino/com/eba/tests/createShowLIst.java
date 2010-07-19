package v13.rhino.com.eba.tests;

import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import junit.framework.TestCase;

public class createShowLIst extends TestCase {

	public static void main(String[] args) {
	}

	
	public void testCreateShowList() throws Exception {

		TreeSet<String> showStrings = new TreeSet<String>();
		TreeSet<String> hideStrings = new TreeSet<String>();
		
		XPath xpath = XPathFactory.newInstance().newXPath();
		String expression = "//property[@access='public' and @type='string']/@name";
		InputSource inputSource = new InputSource("C:\\workspace\\EBAGrid\\v30\\Source\\Common\\pipeline\\apixml.xml");
		NodeList nodes = (NodeList) xpath.evaluate(expression, inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			showStrings.add("get"+nodes.item(i).getTextContent().trim());
			showStrings.add("set"+nodes.item(i).getTextContent().trim());
		}
		
		nodes = (NodeList) xpath.evaluate("//property[@access='public' and @type='bool']/@name", inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			showStrings.add("is"+nodes.item(i).getTextContent().trim());			
		}

		nodes = (NodeList) xpath.evaluate("//method[@access='private']/@name", inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			hideStrings.add(nodes.item(i).getTextContent().trim());			
		}
		
		nodes = (NodeList) xpath.evaluate("//method[@access='public']/@name", inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			showStrings.add(nodes.item(i).getTextContent().trim());			
		}
		
		nodes = (NodeList) xpath.evaluate("//event[@access='public']/@name", inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			showStrings.add("get"+nodes.item(i).getTextContent().trim());
			showStrings.add("set"+nodes.item(i).getTextContent().trim());			
		}

		nodes = (NodeList) xpath.evaluate("//event[@access='private']/@name", inputSource, XPathConstants.NODESET);
		for (int i = 0; i < nodes.getLength(); i++) 
		{
			hideStrings.add("get"+nodes.item(i).getTextContent().trim());
			hideStrings.add("set"+nodes.item(i).getTextContent().trim());			
		}

		for (Iterator iter = hideStrings.iterator(); iter.hasNext();) {
			String element = (String) iter.next();			
			System.out.println("<token action='hide'>"
					+element
					+"</token>");			
		}
		
		
		for (Iterator iter = showStrings.iterator(); iter.hasNext();) {
			String element = (String) iter.next();
			System.out.println("<token action='show'>"
					+element
					+"</token>");			
		}
				
	}
}
