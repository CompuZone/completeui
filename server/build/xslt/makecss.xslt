<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="text" />

    <xsl:param name="component"></xsl:param>

    <xsl:template match="/">
        <xsl:apply-templates select="includes/cssfile" />
    </xsl:template>
    
    <xsl:template match="cssfile">
        @import url("<xsl:value-of select="$component"/>/<xsl:value-of select="substring-after(@path, 'css/')"/>");
    </xsl:template>
    
</xsl:stylesheet>