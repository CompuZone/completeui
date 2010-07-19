<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="text"/>

	<xsl:param name="platform" select="'asp'"></xsl:param>

    <xsl:preserve-space elements="*"/>

    <xsl:template match="/">
<![CDATA[
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML>
<HEAD>
<meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1">
<!-- Sitemap 1.0 -->
</HEAD><BODY>
<OBJECT type="text/site properties">
	<param name="WindowName" value="Main">
	<param name="Window Styles" value="0x800025">
</OBJECT>
<UL>
	<LI> <OBJECT type="text/sitemap">
		<param name="Name" value="Getting Started">
		<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=437">
		</OBJECT>
	<UL>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Welcome">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=437">
			</OBJECT>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Software Support">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=318">
			</OBJECT>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Deploying the Samples">
			</OBJECT>
		<UL>
			<LI> <OBJECT type="text/sitemap">
				<param name="Name" value="Java Edition">
				</OBJECT>
			<UL>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="Apache Tomcat">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#apache">
					</OBJECT>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="BEA WebLogic">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#bea">
					</OBJECT>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="Caucho Resin">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#caucho">
					</OBJECT>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="IBM WebSphere">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#ibm">
					</OBJECT>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="JBoss">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#jboss">
					</OBJECT>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="Sun Java System Application Server">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=323#sun">
					</OBJECT>
			</UL>
			<LI> <OBJECT type="text/sitemap">
				<param name="Name" value="ASP.NET Edition">
				</OBJECT>
			<UL>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="ASP.NET">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=324">
					</OBJECT>
			</UL>
			<LI> <OBJECT type="text/sitemap">
				<param name="Name" value="ASP Edition">
				</OBJECT>
			<UL>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="ASP 3.0">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=325">
					</OBJECT>
			</UL>
			<LI> <OBJECT type="text/sitemap">
				<param name="Name" value="PHP Edition">
				</OBJECT>
			<UL>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="PHP 4+">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=326">
					</OBJECT>
			</UL>
			<LI> <OBJECT type="text/sitemap">
				<param name="Name" value="Coldfusion MX Edition">
				</OBJECT>
			<UL>
				<LI> <OBJECT type="text/sitemap">
					<param name="Name" value="Coldfusion MX 6+">
					<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=327">
					</OBJECT>
			</UL>
		</UL>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Getting Support">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=319">
			</OBJECT>
	</UL>
    <LI> <OBJECT type="text/sitemap">
        <param name="Name" value="Components">
        </OBJECT>
    <UL>]]><xsl:for-each select="//file"><![CDATA[
        <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="]]><xsl:value-of select="@name"/><![CDATA[">
                </OBJECT>
        <LI>
            <OBJECT type="text/sitemap">
                <param name="Merge" value="]]><xsl:value-of select="@name"/>-common.chm::/<xsl:value-of select="@name"/>-common.hhc<![CDATA[">
                </OBJECT>
        </LI>]]></xsl:for-each><![CDATA[
    </UL>
	<LI> <OBJECT type="text/sitemap">
		<param name="Name" value="JavaScript API Reference">
		</OBJECT>
	<LI>
	    <OBJECT type="text/sitemap">
		    <param name="Merge" value="apiref.chm::\apiref.hhc">
			</OBJECT>
	</LI>
    <LI> <OBJECT type="text/sitemap">
        <param name="Name" value="HTML Tag Reference">
        </OBJECT>
    <UL>]]><xsl:for-each select="//file"><![CDATA[
        <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="]]><xsl:value-of select="@name"/><![CDATA[">
                </OBJECT>
        <LI>
            <OBJECT type="text/sitemap">
                <param name="Merge" value="]]><xsl:value-of select="@name"/>-client-tag.chm::/<xsl:value-of select="@name"/>-client-tag.hhc<![CDATA[">
                </OBJECT>
        </LI>]]></xsl:for-each><![CDATA[
    </UL>
    <LI> <OBJECT type="text/sitemap">
        <param name="Name" value="Server API Reference">
        </OBJECT>]]><xsl:choose><xsl:when test="$platform='script'"><![CDATA[
    <UL>
        <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="ASP">
                </OBJECT>
        <LI>
            <OBJECT type="text/sitemap">
                <param name="Merge" value="serverapiref-asp.chm::/serverapiref-asp.hhc">
                </OBJECT>
        </LI>
        <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="CFM">
                </OBJECT>
        <LI>
            <OBJECT type="text/sitemap">
                <param name="Merge" value="serverapiref-cfm.chm::/serverapiref-cfm.hhc">
                </OBJECT>
        </LI>
        <LI> <OBJECT type="text/sitemap">
                <param name="Name" value="PHP">
                </OBJECT>
        <LI>
            <OBJECT type="text/sitemap">
                <param name="Merge" value="serverapiref-php.chm::/serverapiref-php.hhc">
                </OBJECT>
        </LI>
    </UL>]]></xsl:when><xsl:otherwise><![CDATA[
    <LI>
	    <OBJECT type="text/sitemap">
		    <param name="Merge" value="serverapiref.chm::\serverapiref.hhc">
			</OBJECT>
	</LI>]]></xsl:otherwise></xsl:choose><![CDATA[
	<LI> <OBJECT type="text/sitemap">
		<param name="Name" value="Other Information">
		</OBJECT>
	<UL>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="License Agreement">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=248">
			<param name="ImageNumber" value="17">
			</OBJECT>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Copyright">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=320">
			<param name="ImageNumber" value="11">
			</OBJECT>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="Online Store">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=322">
			</OBJECT>
		<LI> <OBJECT type="text/sitemap">
			<param name="Name" value="About Nitobi">
			<param name="Local" value="http://www.nitobi.com/kb/printable/?artid=321">
			</OBJECT>
	</UL>
</UL>
</BODY></HTML>
]]>
    </xsl:template>

</xsl:stylesheet>