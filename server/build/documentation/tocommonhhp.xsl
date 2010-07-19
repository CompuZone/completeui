<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl" >
    <xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="html"/>
    
    <xsl:param name="component"/>
    
    <xsl:template match="/">
[OPTIONS]
Compatibility=1.1 or later
Compiled file=<xsl:value-of select="$component" />-common.chm
Contents file=<xsl:value-of select="$component" />-common.hhc
Default Window=Main
Default topic=src\index.htm
Display compile progress=No
Full-text search=Yes
Language=0x409 English (United States)
Title=Nitobi <xsl:value-of select="$component" />

[WINDOWS]
Main="Nitobi <xsl:value-of select="$component" /> Help","<xsl:value-of select="$component" />-common.hhc",,"src\index.htm","src\index.htm",,,,,0x2520,,0x386e,[0,0,800,600],,,,,,,0

[FILES]
src\index.htm

[MERGE FILES]
<xsl:for-each select="//include">
<xsl:value-of select="."></xsl:value-of><xsl:text>
</xsl:text>
</xsl:for-each>

[INFOTYPES]        
</xsl:template>
    
</xsl:stylesheet>
