<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" />

	<xsl:template match="/">
		<xsl:apply-templates select="includes/xslfile" />
	</xsl:template>

	<xsl:template match="*">
		stringify("..\\<xsl:value-of select="@path" />", "..\\temp\\<xsl:value-of select="translate(@path,'/','.')" />.js", "<xsl:value-of select="@name" />", "<xsl:value-of select="@namespace" />");
	</xsl:template>

</xsl:stylesheet>