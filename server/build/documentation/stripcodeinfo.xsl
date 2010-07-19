<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" />
   <xsl:template match="node()|@*">
      <xsl:copy>
         <xsl:apply-templates select="@*|node()" />
      </xsl:copy>
   </xsl:template>
   
   <!-- Don't copy over these -->
   <xsl:template match="@short|@persist|@testvalue|@impact"/>
   
</xsl:stylesheet>

