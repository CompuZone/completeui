<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl" >
    <xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="html"/>
    
    <xsl:param name="tagname" select="'eba:checkboxeditor'"/>
    
    <xsl:template match="/">

<HTML>
    <HEAD>
    </HEAD>
    <BODY>
        <OBJECT type="text/site properties">
            <param name="Window Styles" value="0x800025"></param>
        </OBJECT>
        <UL>
            <xsl:for-each select="//tag">
                <LI> <OBJECT type="text/sitemap">
                    <param name="Name"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></param>
                    <param name="Local"><xsl:attribute name="value">client-tag/<xsl:value-of select="." />.html</xsl:attribute></param>
                </OBJECT>
                </LI>
            </xsl:for-each>
        </UL>
    </BODY>
</HTML>
        
    </xsl:template>
    
</xsl:stylesheet>
