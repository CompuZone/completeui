<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl" >

    <xsl:output method="text"/>
    
    <xsl:param name="component"></xsl:param>
    
    <xsl:template match="/">
<![CDATA[
<HTML>
    <HEAD>
    </HEAD>
    <BODY>
    <OBJECT type="text/site properties">
        <param name="WindowName" value="Main">
        <param name="Window Styles" value="0x800025">
    </OBJECT>
    <UL>
]]><xsl:for-each select="//tag"><![CDATA[
            <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="]]><xsl:value-of select="." /><![CDATA[">
                <param name="Local" value="]]><xsl:value-of select="$component"/>-client-tag/<xsl:value-of select="." /><![CDATA[.html">
            </OBJECT>
            </LI>
]]></xsl:for-each><![CDATA[
    </UL>
    </BODY>
</HTML>
]]>
    </xsl:template>
    
</xsl:stylesheet>
