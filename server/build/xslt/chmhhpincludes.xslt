<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="text" />

    <xsl:param name="platform" select="'asp'"></xsl:param>

    <xsl:strip-space elements="*"/>

    <xsl:template match="/">
        
[OPTIONS]
Compatibility=1.1 or later
Compiled file=common.chm
Contents file=common.hhc
Default Window=Main
Default topic=index.htm
Display compile progress=No
Full-text search=Yes
Language=0x409 English (United States)
Title=Nitobi Complete UI

[WINDOWS]
Main="Nitobi Complete UI Help","common.hhc",,"src/index.html","src/index.html",,,,,0x2520,,0x386e,[0,0,800,600],,,,,,,0

[FILES]
src\index.html

[MERGE FILES]
apiref.chm
<xsl:for-each select="//file"><xsl:value-of select="@name" />-common.chm<xsl:text>
</xsl:text></xsl:for-each>
<xsl:for-each select="//file"><xsl:value-of select="@name" />-client-tag.chm<xsl:text>
</xsl:text></xsl:for-each>
<xsl:choose><xsl:when test="$platform='script'">
serverapiref-asp.chm
serverapiref-cfm.chm
serverapiref-php.chm
</xsl:when>
<xsl:otherwise>serverapiref.chm</xsl:otherwise>
</xsl:choose>

[INFOTYPES]

    </xsl:template>

</xsl:stylesheet>