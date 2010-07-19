<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl" >
    <xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="xml" indent="no"/>

    <xsl:template match="/adsf">

<![CDATA[<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">]]>
<HTML>
    <HEAD>
        <meta name="GENERATOR" content="Microsoft HTML Help Workshop 4.1"/>
    </HEAD>
    <BODY>
    	<OBJECT type="text/site properties">
    		<param name="WindowName" value="Main"/>
    		<param name="Window Styles" value="0x800025"/>
    	</OBJECT>
        <UL>
            <xsl:for-each select="//tag">
	            <xsl:sort select="."/>
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
    
    <xsl:template name="print-node">
    	<UL>
            <xsl:for-each select="//tag">
            	<xsl:sort select="."/>
                <LI> <OBJECT type="text/sitemap">
                    <param name="Name"><xsl:attribute name="value"><xsl:value-of select="." /></xsl:attribute></param>
                    <param name="Local"><xsl:attribute name="value">client-tag/<xsl:value-of select="." />.html</xsl:attribute></param>
                </OBJECT>
                </LI>
            </xsl:for-each>
        </UL>
    </xsl:template>
    
    <xsl:template name="count">
    	<xsl:param name="num"/>
    	<xsl:param name="str"/>
    	
    	<xsl:choose>
    		<xsl:when test="contains($str,'.')">
    			<xsl:call-template name="count">
    				<xsl:with-param name="str"><xsl:value-of select="substring-after($str,'.')"/></xsl:with-param>
    				<xsl:with-param name="num"><xsl:value-of select="$num + 1"/></xsl:with-param>
    			</xsl:call-template>
    		</xsl:when>
    		<xsl:otherwise>
    			<xsl:value-of select="$num"/>
    		</xsl:otherwise>
    	</xsl:choose>
    </xsl:template>
    
    <xsl:template name="linebreak">
    	<xsl:text>&#10;</xsl:text>
    </xsl:template>
    
    <xsl:template name="tab">
    	<xsl:param name="num"/>
    	<xsl:if test="$num > 0">
			<xsl:text>    </xsl:text>
			<xsl:call-template name="tab">
    			<xsl:with-param name="num"><xsl:value-of select="number($num) - 1"/></xsl:with-param>
    		</xsl:call-template>
    	</xsl:if>
    </xsl:template>
    
    <xsl:template name="write-name">
    
    	<xsl:param name="str"/>
    	
    	<xsl:choose>
    		<xsl:when test="contains($str,'.')">
    			<xsl:call-template name="write-name">
    				<xsl:with-param name="str"><xsl:value-of select="substring-after($str,'.')"/></xsl:with-param>

    			</xsl:call-template>
    		</xsl:when>
    		<xsl:otherwise>
    			<xsl:value-of select="$str"/>
    		</xsl:otherwise>
    	</xsl:choose>
    </xsl:template>
    
    <xsl:template match="/">
<![CDATA[<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">]]>
		<HTML>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">1</xsl:with-param></xsl:call-template>
		<HEAD>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">1</xsl:with-param></xsl:call-template>
		</HEAD>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">1</xsl:with-param></xsl:call-template>
		<BODY>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">2</xsl:with-param></xsl:call-template>
		<OBJECT type="text/site properties">
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">3</xsl:with-param></xsl:call-template>			
		<param name="WindowName" value="Main"/>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">3</xsl:with-param></xsl:call-template>
		<param name="Window Styles" value="0x800025"/>
		<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">2</xsl:with-param></xsl:call-template>
		</OBJECT>
    	<xsl:call-template name="print-children">
    			<xsl:with-param name="num">0</xsl:with-param>
    			<xsl:with-param name="class"></xsl:with-param>
    	</xsl:call-template>
    	<xsl:call-template name="linebreak"/>
		<xsl:call-template name="tab"><xsl:with-param name="num">1</xsl:with-param></xsl:call-template>
		</BODY>
		<xsl:call-template name="linebreak"/>
		</HTML>
    
    </xsl:template>
    
    <xsl:template name="print-children">
    	<xsl:param name="num"/>
    	<xsl:param name="class"/>
    	<!-- First print children with num dots 
    	Print those that start with <xsl:value-of select="$class"/> and have <br/> -->
    	<xsl:for-each select="//a">
    		<xsl:sort select="."/>
    		<xsl:variable name="numdots">
    		<xsl:call-template name="count">
    				<xsl:with-param name="str"><xsl:value-of select="."/></xsl:with-param>
    				<xsl:with-param name="num">0</xsl:with-param>
    			</xsl:call-template>
    		</xsl:variable>
    		
    		<xsl:choose>
    		<xsl:when test="$numdots=$num and starts-with(.,$class)">
				<xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1+ number($numdots)) * 2"/></xsl:with-param></xsl:call-template>    			
    			<UL>
    			<xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1 + number($numdots))*4"/></xsl:with-param></xsl:call-template>    			
				<LI><xsl:text> </xsl:text><OBJECT type="text/sitemap">
				<xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1 + number($numdots))*5"/></xsl:with-param></xsl:call-template>    			
    			<param name="Name"><xsl:attribute name="value"><xsl:call-template name="write-name"><xsl:with-param name="str"><xsl:value-of select="." /></xsl:with-param></xsl:call-template></xsl:attribute></param>
    			<xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1 + number($numdots))*5"/></xsl:with-param></xsl:call-template>    			
                    <param name="Local"><xsl:attribute name="value">js_doc/<xsl:value-of select="@href" /></xsl:attribute></param>
                   <xsl:call-template name="write-name"><xsl:with-param name="str"><xsl:value-of select="."/></xsl:with-param></xsl:call-template>  
                <xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1 + number($numdots))*4"/></xsl:with-param></xsl:call-template>    			
                </OBJECT>
                <xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1 + number($numdots))*4"/></xsl:with-param></xsl:call-template>    			
                </LI>
    			
    			<xsl:call-template name="print-children">
    				<xsl:with-param name="num"><xsl:value-of select="number($numdots)+1"/></xsl:with-param>
    				<xsl:with-param name="class"><xsl:value-of select="."/></xsl:with-param>
    			</xsl:call-template>
    			<xsl:call-template name="linebreak"/>
				<xsl:call-template name="tab"><xsl:with-param name="num"><xsl:value-of select="(1+ number($numdots)) * 2"/></xsl:with-param></xsl:call-template>    			
    			</UL>
    		</xsl:when>
    		<xsl:otherwise>
    			
    		</xsl:otherwise>
    	</xsl:choose>
    		
    			

    	</xsl:for-each>
    </xsl:template>
    
</xsl:stylesheet>
