<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="text"/>

<xsl:template match="class">
@class <xsl:value-of select="@name"/>
<xsl:apply-templates select="//function[not(@access)] | //function[@access!='private']"/>
</xsl:template>

<xsl:template match="//function[not(@access)] | //function[@access!='private']">
@function <xsl:value-of select="@name"/>
<xsl:apply-templates/>
 
 
</xsl:template>

<xsl:template match="param">
	@param <xsl:value-of select="@name"/>
</xsl:template>

</xsl:stylesheet>