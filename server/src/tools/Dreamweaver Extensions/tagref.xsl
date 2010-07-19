<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" omit-xml-declaration="yes"/>
	
	<xsl:template match="taglib">
		<dreamweaver-tags>
			<xsl:apply-templates select="tag"/>
		</dreamweaver-tags>
	</xsl:template>
	
	<xsl:template match="tag">
		<xsl:if test="not(name = 'e') and not(name = 'combovalue')">
			<tag>
				<xsl:attribute name="name"><xsl:value-of select="name"/></xsl:attribute>
				<xsl:attribute name="endtag">yes</xsl:attribute>
				
				<tagformat nlbeforetag="1" nlaftertag="1"/>
				<tagdialog>
					<xsl:attribute name="file"><xsl:value-of select="name"/>.htm</xsl:attribute>
				</tagdialog>
				
				<attributes>
					<xsl:apply-templates select="attribute"/>
				</attributes>
			</tag>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="attribute">
		<xsl:if test="not(name = 'autoinitialize') and not(name = 'componentcssurl') and not(name = 'componentjsurl') and not(name = 'toolkitjsurl') and not(name = 'includeresources')">
		<attrib>
			<xsl:attribute name="name"><xsl:value-of select="name"/></xsl:attribute>
			<xsl:attribute name="type">text</xsl:attribute>
		</attrib>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>