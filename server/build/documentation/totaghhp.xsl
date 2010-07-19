<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl" >
    <xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="html"/>

    <xsl:param name="component"></xsl:param>

    <xsl:template match="/">

[OPTIONS]
Compatibility=1.1 or later
Compiled file=<xsl:value-of select="$component" />-client-tag.chm
Contents file=<xsl:value-of select="$component" />-client-tag.hhc
Default Window=Main        
Default topic=<xsl:value-of select="$component" />-client-tag/<xsl:value-of select="$component" />.htm
Full-text search=Yes        
Display compile progress=No
Language=0x409 English (United States)
Title=Nitobi <xsl:value-of select="$component" /> Tag

[WINDOWS]
Main="Nitobi <xsl:value-of select="$component" /> Tag Reference","<xsl:value-of select="$component" />-client-tag.hhc",,"<xsl:value-of select="$component" />-client-tag/<xsl:value-of select="." />.html","<xsl:value-of select="$component" />-client-tag/<xsl:value-of select="." />.html",,,,,0x2520,,0x386e,[0,0,800,600],,,,,,,0        

[FILES]
<xsl:for-each select="//tag"><xsl:value-of select="$component" />-client-tag/<xsl:value-of select="." />.html<xsl:text>
</xsl:text></xsl:for-each>

[INFOTYPES]
</xsl:template>
    
</xsl:stylesheet>
