<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	exclude-result-prefixes="msxsl" >
<xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="html"/>
	
		<xsl:param name="tagname" select="'eba:checkboxeditor'"/>
		
	<xsl:template match="//class[@tagname and @tagname!='']">
		<xsl:if test="@tagname = $tagname">
			<html>
			<head>
			<link rel="stylesheet" type="text/css" href="tagref.css"/> 
			</head>
			<body>
			<h1>&lt;<xsl:value-of select="@tagname"/>&gt; Element</h1> 
			<p>
			<xsl:call-template name="summary">
				<xsl:with-param name="index"><xsl:value-of select="1"/></xsl:with-param>
			</xsl:call-template>
			</p>
			<div class="TagOutline">&lt;<xsl:value-of select="@tagname"/>
				<xsl:call-template name="tag-outline"><xsl:with-param name="tagname" select="@tagname"/></xsl:call-template>
				&gt;
			&lt;/<xsl:value-of select="@tagname"/>&gt;</div>
			
			<h2>Element Information</h2>
			<table>
			
			<tr><td><b>Child elements</b></td>
			<td>
				<xsl:call-template name="child-elements"><xsl:with-param name="tagname" select="@tagname"/></xsl:call-template>
			</td></tr>
			
			<tr><td><b>Parent elements</b></td>
			<td>
				<xsl:call-template name="parent-elements"><xsl:with-param name="tagname" select="@tagname"/></xsl:call-template>
			</td></tr>
			
			</table>
			
			<h2>Attributes</h2>
			<table>
				<tr style="background-color:#efefef;"><td width="150">Attribute</td><td>Description</td></tr>
			<xsl:call-template name="att-descriptions">
				<xsl:with-param name="tagname" select="@tagname"/>
			</xsl:call-template>
			</table>
			<h2>Remarks</h2>
			<xsl:call-template name="tag-description">
				<xsl:with-param name="tagname" select="@tagname"/>
			</xsl:call-template>
			</body>
			</html>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="child-elements">
		<xsl:param name="tagname"/>
		
		<xsl:for-each select="//class[contains(@parents,$tagname)]">
			<xsl:variable name="possible-child" select="./@tagname"/>
			<xsl:variable name="parents">
				<xsl:call-template name="split">
					<xsl:with-param name="str"><xsl:value-of select="//class[@tagname=$possible-child]/@parents"/></xsl:with-param>
				</xsl:call-template>
			</xsl:variable>
			
			<xsl:for-each select="msxsl:node-set($parents)/string">
					<xsl:if test=". = $tagname">
						<a><xsl:attribute name="href"><xsl:value-of select="concat(substring-after($possible-child,':'),'.html')"/></xsl:attribute><xsl:value-of select="$possible-child"/></a>&#160;
				</xsl:if>
			</xsl:for-each>
		</xsl:for-each>
		
		<xsl:if test="//class[@tagname=$tagname]/@inherits and //class[@tagname=$tagname]/@inherits!=''">
			<xsl:call-template name="child-elements"><xsl:with-param name="tagname" select="//class[@name = //class[@tagname=$tagname]/@inherits]/@tagname"/></xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="parent-elements">
		<xsl:param name="tagname"/>
		
		
		<xsl:variable name="parents">
			<xsl:call-template name="split">
				<xsl:with-param name="str"><xsl:value-of select="//class[@tagname=$tagname]/@parents"/></xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:for-each select="msxsl:node-set($parents)/string">
			<a><xsl:attribute name="href"><xsl:value-of select="substring-after(.,':')"/>.html</xsl:attribute><xsl:value-of select="."/></a>&#160;
		</xsl:for-each>
		
		
		<xsl:if test="//class[@tagname=$tagname]/@inherits and //class[@tagname=$tagname]/@inherits!=''">
			<xsl:call-template name="parent-elements"><xsl:with-param name="tagname" select="//class[@name = //class[@tagname=$tagname]/@inherits]/@tagname"/></xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	
	<xsl:template name="tag-outline">
		<xsl:param name="tagname"/>
<!-- <xsl:apply-templates select="//class[@tagname=$tagname]/property[@attname and @attname!='' and (not(@access) or @access!='private')]"/> -->
		<xsl:call-template name="att-outlines">
			<xsl:with-param name="tagname" select="$tagname"/>
		</xsl:call-template>
		<xsl:if test="//class[@tagname=$tagname]/@inherits and //class[@tagname=$tagname]/@inherits!=''">
			<xsl:call-template name="tag-outline"><xsl:with-param name="tagname" select="//class[@name = //class[@tagname=$tagname]/@inherits]/@tagname"/></xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="split">
        <xsl:param name="str"/>

        <xsl:choose>
        <xsl:when test="contains($str,' ')">
        	<string>
            <xsl:value-of select="substring-before($str,' ')"/>
            </string>
                <xsl:call-template name="split">
                        <xsl:with-param name="str"
							select="substring-after($str,' ')" />
                </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
                <string><xsl:value-of select="$str"/></string>
        </xsl:otherwise>
        </xsl:choose>
	</xsl:template>
	
	<xsl:template name="att-descriptions">
		<xsl:param name="tagname"/>
		<xsl:for-each select="//class[@tagname=$tagname]/property[@attname and @attname!='' and (not(@access) or @access!='private')] | //class[@tagname=$tagname]/property[@attname and @attname!='' and (not(@access) or @access!='private')] | //class[@tagname=$tagname]/event[@attname and @attname!='' and (not(@access) or @access!='private')]">
			<tr>
				<td valign="top"><h3><a><xsl:attribute name="name"><xsl:value-of select="@attname"/></xsl:attribute></a><xsl:value-of select="@attname"/></h3></td>
				<td><xsl:apply-templates select="./description"/> 
					<xsl:choose>
					<xsl:when test="@name and @name!='' and name(.)='event'">
						The javascript code specified in the declaration here is automatically subscribed to the <xsl:value-of select="@name"/> field in the class.  If, after load, you 
						wish to unsubscribe this code from the event, use <code>obj.<xsl:value-of select="@name"/>.unSubscribe("<xsl:value-of select="substring-after(@attname,'on')"/>");</code>
					</xsl:when>
					<xsl:when test="@name and @name!='' and name(.)='property'">
						This attribute maps to the get<xsl:value-of select="@name"/>&#160;<xsl:if test="not(@readwite='read')">and set<xsl:value-of select="@name"/></xsl:if> function<xsl:if test="not(@readwite='read')">s</xsl:if> in the Javascript API.					
					</xsl:when>
					</xsl:choose>
				</td>
			</tr> 
		</xsl:for-each>
		<xsl:if test="//class[@tagname=$tagname]/@inherits and //class[@tagname=$tagname]/@inherits!=''">
			<xsl:call-template name="att-descriptions"><xsl:with-param name="tagname" select="//class[@name = //class[@tagname=$tagname]/@inherits]/@tagname"/></xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="tag-description">
		<xsl:param name="tagname"/>
		<xsl:apply-templates select="//class[@tagname=$tagname]/description"/>
		<xsl:if test="//class[@tagname=$tagname]/@inherits and //class[@tagname=$tagname]/@inherits!=''">
			<xsl:call-template name="tag-description"><xsl:with-param name="tagname" select="//class[@name = //class[@tagname=$tagname]/@inherits]/@tagname"/></xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	
	<xsl:template name="summary">
		<xsl:param name="index"/>
		
		<xsl:choose>
			<xsl:when test="substring-before(./description[$index],'. ')='' and ./description[$index]!=''">
				<xsl:value-of select="description[$index]"/>
			</xsl:when> 
			<xsl:when test="substring-before(./description[$index],'. ')!=''">
				<xsl:value-of select="substring-before(./description[$index],'. ')"/>
			</xsl:when>
			<xsl:when test="substring-before(./description[$index],'.&amp;')!=''">
				<xsl:value-of select="substring-before(./description[$index],'.&amp;')"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="count(./description) &gt; $index">
					<xsl:call-template name="summary">
						<xsl:with-param name="index"><xsl:value-of select="$index+1"/></xsl:with-param>
					</xsl:call-template>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="description">
		 <xsl:value-of select="." disable-output-escaping="yes"/>
	</xsl:template>
	
	<xsl:template name="att-outlines">
		<xsl:param name="tagname"/>
		<xsl:for-each select="//class[@tagname=$tagname]/property[@attname and @attname!='' and (not(@access) or @access!='private')] | //class[@tagname=$tagname]/event[@attname and @attname!='' and (not(@access) or @access!='private')]">
			<br/>&#160;&#160;&#160;&#160;<a><xsl:attribute name="href">#<xsl:value-of select="@attname"/></xsl:attribute><xsl:value-of select="@attname"/></a>=<xsl:choose><xsl:when test="@type='bool'">"true" | "false"</xsl:when>
			<xsl:when test="@values and @values!=''">
			<xsl:variable name="values">
						<xsl:call-template name="split">
							<xsl:with-param name="str"><xsl:value-of select="@values"/></xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:for-each select="msxsl:node-set($values)/string">
						<!-- "<xsl:if test=".=@default"><b><xsl:value-of select="."/></b></xsl:if>"  -->
						"<xsl:value-of select="."/>"
						<xsl:if test="position() != last()"> |
						</xsl:if>
					</xsl:for-each>
			</xsl:when><xsl:otherwise><xsl:value-of select="@type"/></xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

	
	<xsl:template match="param">
	</xsl:template>
	
	
	
   
</xsl:stylesheet>

