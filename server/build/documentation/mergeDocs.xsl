<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:user="http://mycompany.com/mynamespace"
	exclude-result-prefixes="msxsl user" >
<xsl:output omit-xml-declaration = "yes" />
   <!-- encoding="ascii" -->
    <msxsl:script language="JScript" implements-prefix="user">
		function getAnnotation(nodelist)
		{
			var node = nodelist.item(0);
			var xpath = "";
			if (node.nodeName != "description")
			{
				var nameVal;
				//nameVal = .text
				if (node.attributes != null )
				{
					if (node.attributes.getNamedItem("name") != null)
					{
						nameVal = "[@name='"+node.attributes.getNamedItem("name").text+"']";
					}
				}
				xpath = "/" + node.nodeName + nameVal  +  xpath;
			}
			
			while(node.parentNode.parentNode != null)
			{
				var s = (node.parentNode.nodeName=="doc1" ? "doc2" : node.parentNode.nodeName);
				if (node.parentNode.attributes != null)
				{
					if (node.parentNode.attributes.getNamedItem("name") != null)
					{
						s+= "[@name='"  + node.parentNode.attributes.getNamedItem("name").text + "']";
					}
				}
				xpath = "/" + s + xpath;
				
				node = node.parentNode;
			}
						
			xpath += "/description";			
			var nodes_ = node.ownerDocument.selectNodes("/"+xpath);
			var desc="";
			for (var i=0;i &lt; nodes_.length; i++)
			{
				desc += nodes_[i].text;
			}
			return desc;
			//return xpath;
			if (null == r) return "";
			return r;
		}
	</msxsl:script> 
   
   <xsl:template match="node()|@*">
      <xsl:copy>
         <xsl:apply-templates select="@*|node()" />
      </xsl:copy>
   </xsl:template>
   
   <xsl:template match="class|function|property">
   		<xsl:copy>
   		<xsl:apply-templates select="@*|node()" /> 
   		<xsl:call-template name="print-descriptions">
   			<xsl:with-param name="children"><xsl:value-of select="./description"/></xsl:with-param>
   		</xsl:call-template>
   		
   		<xsl:variable name="cousin">
			<xsl:value-of select="user:getAnnotation(.)"/>
		</xsl:variable>
   		<xsl:if test="$cousin != ''">
   			<description><xsl:value-of select="$cousin"/></description>
   		</xsl:if>
   		
         
      </xsl:copy>
   </xsl:template>
   
   <xsl:template match="param/text()"/>
   
   <xsl:template match="param">
   		<xsl:copy>
   		<xsl:apply-templates select="@*|node()" /> 
   		<description><xsl:value-of select="."/></description>
   		 <xsl:if test="not(./description)">
   			 <description>
		         <xsl:variable name="cousin">
		      		<xsl:value-of select="user:getAnnotation(.)"/>
		      	</xsl:variable>
		      	
		      	<xsl:if test="$cousin!=''">
		      		<xsl:value-of select="$cousin"/>
   					
		      	</xsl:if>
		      </description>		
   		</xsl:if>
         
      </xsl:copy>
   </xsl:template>
   
   <xsl:template match="description">
   	 <!-- <xsl:copy>
         <xsl:apply-templates select="@*|node()" />
      </xsl:copy>
      <description>
      	<xsl:variable name="cousin">
      		<xsl:value-of select="user:getAnnotation(.)"/>
      	</xsl:variable>
      	
      	<xsl:if test="$cousin!=''">
      		<xsl:value-of select="$cousin"/>
      		
      	</xsl:if>
      </description>-->
      
   </xsl:template>
   
   <xsl:template name="print-descriptions">
	<xsl:param name="children"/>
	<xsl:for-each select="msxsl:node-set($children)">
		<!-- <xsl:if test="name(.) = 'description'"> -->
			<description><xsl:value-of select="./text()"/></description>
		<!-- </xsl:if> -->
		<br/>
	</xsl:for-each>
   </xsl:template>
   
   <xsl:template match="/">
   		<xsl:apply-templates select="//doc1"/>
   </xsl:template>
   
   <xsl:template match="//doc1">
   		 <xsl:apply-templates select="@*|node()" />
   </xsl:template>
   
   <!-- Don't copy over these -->
   <xsl:template match="doc2|root"/>
   
</xsl:stylesheet>

