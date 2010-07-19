<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" />

	<xsl:template match="/">
		<xsl:apply-templates select="includes/xmlfile" />
	</xsl:template>

	<xsl:template match="*">
		..\temp\<xsl:value-of select="translate(@path, '/', '.')" />.js<xsl:text> </xsl:text>
	</xsl:template>

</xsl:stylesheet>