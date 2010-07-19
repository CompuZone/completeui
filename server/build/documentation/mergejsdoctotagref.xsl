<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com">
   <xsl:output method="xml" />

   <xsl:template match="/">
      <documentation>
      <xsl:apply-templates select="//tagref/*" />
      </documentation>
   </xsl:template>

	<xsl:template match="class">
		<xsl:variable name="class"><xsl:value-of select="@name"/></xsl:variable>               
		<xsl:copy>
			<xsl:apply-templates select="./* | text() | @*"/>
			<xsl:choose>
				<xsl:when test="description">
					<xsl:copy-of select="description"/>
				</xsl:when>
				<xsl:otherwise>
					<description>
						<xsl:value-of select="//javascript//class[@name=$class]/constructor_vars/var[@name='class']/value" />
					</description>
				</xsl:otherwise>
			</xsl:choose>
      </xsl:copy>
	
	</xsl:template>
	
   <xsl:template match="property">
      <xsl:variable name="setter">
         <xsl:choose>
            <xsl:when test="@name">set<xsl:value-of select="@name" /></xsl:when>
            <xsl:otherwise>set<xsl:value-of select="translate(substring(@attname,1,1), $lowercase, $uppercase)" /><xsl:value-of select="substring(@attname,2)" /></xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="getter">
         <xsl:choose>
            <xsl:when test="@name">get<xsl:value-of select="@name" /></xsl:when>
            <xsl:otherwise>get<xsl:value-of select="translate(substring(@attname,1,1), $lowercase, $uppercase)" /><xsl:value-of select="substring(@attname,2)" /></xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="isser">
         <xsl:choose>
            <xsl:when test="@name">is<xsl:value-of select="@name" /></xsl:when>
            <xsl:otherwise>is<xsl:value-of select="translate(substring(@attname,1,1), $lowercase, $uppercase)" /><xsl:value-of select="substring(@attname,2)" /></xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="old-setter">
         <xsl:choose>
            <xsl:when test="@name">Set<xsl:value-of select="@name" /></xsl:when>
            <xsl:otherwise>Set<xsl:value-of select="translate(substring(@attname,1,1), $lowercase, $uppercase)" /><xsl:value-of select="substring(@attname,2)" /></xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="old-getter">
         <xsl:choose>
            <xsl:when test="@name">Get<xsl:value-of select="@name" /></xsl:when>
            <xsl:otherwise>Get<xsl:value-of select="translate(substring(@attname,1,1), $lowercase, $uppercase)" /><xsl:value-of select="substring(@attname,2)" /></xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
	<xsl:variable name="class"><xsl:value-of select="../@name"/></xsl:variable>               
      <xsl:copy>
         <xsl:attribute name="type"><xsl:value-of select="translate(//*[@mapped_name=$getter or @mapped_name=$old-getter or @mapped_name=$isser and ../../@name=$class]/vars/var[@name='type']/value,' ','')" /></xsl:attribute>
         <xsl:apply-templates select="./* | text() | @*"/>

		<description>
		   <xsl:value-of select="//*[@mapped_name=$setter and $class=../../@name]/description | //*[@mapped_name=$getter and $class=../../@name]/description | //*[@mapped_name=$old-setter and $class=../../@name]/description | //*[@mapped_name=$old-getter and $class=../../@name]/description" />
         </description>
         
      </xsl:copy>
   </xsl:template>
   
   <xsl:template match="event">
   		<xsl:variable name="class"><xsl:value-of select="../@name"/></xsl:variable>               
   		<event>
   		<xsl:attribute name="type">String</xsl:attribute>
   		<xsl:apply-templates select="./* | text() | @*"/>
   		
      <xsl:variable name="name" select="@name"/>
		<description>
            <xsl:value-of select="//field[$name=@name and $class=../../@name]/field-description" />
         </description>
      </event>
   </xsl:template>

   <xsl:template match="text()">
      <xsl:value-of select="." />
   </xsl:template>

   <xsl:template match="node()|@*">
      <xsl:copy>
         <xsl:apply-templates select="./* | text() | @*">
         </xsl:apply-templates>
      </xsl:copy>
   </xsl:template>
  

   <xsl:variable name="uppercase">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
   <xsl:variable name="lowercase">abcdefghijklmnopqrstuvwxyz</xsl:variable>
</xsl:stylesheet>

