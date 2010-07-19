<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" />

	<xsl:template match="/">
		<xsl:apply-templates select="includes/*" />
	</xsl:template>

	<xsl:template match="jsfile">
		../<xsl:value-of select="@path" /><xsl:text> 
</xsl:text>
	</xsl:template>

</xsl:stylesheet>