<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="ISO-8859-1" omit-xml-declaration = "yes" method="text"/>
	<xsl:template match="class|interface">
		<xsl:if test="contains(@scope,'api')">
			/**
			* @class <xsl:apply-templates select="./description"/>
			* @constructor
			<xsl:if test="@access='private'">
	   			@private
	   		</xsl:if>
	   		<xsl:if test="@inherits!=''">
	   			@extends <xsl:value-of select="@inherits"/>
	   		</xsl:if>
	   		<xsl:call-template name="see"><xsl:with-param name="context" select="." /></xsl:call-template>
			 */
	   		<xsl:value-of select="@name"/> = function()
	   		{
				<xsl:apply-templates select="field"/>
	   		}
	   		
	   		<xsl:apply-templates select="function|property"/>
	   	</xsl:if>
	</xsl:template>
	
	<xsl:template match="description">
		 <![CDATA[ ]]><xsl:value-of select="."/>
	</xsl:template>
	
	<xsl:template match="field">
		/**
		<xsl:apply-templates select="description"/>
		 @type <xsl:value-of select="@type"/>
		<xsl:call-template name="see"><xsl:with-param name="context" select="." /></xsl:call-template>
		 */
		this.<xsl:value-of select="@name"/>=null;
	</xsl:template>
	
	<xsl:template match="function|method">
		/**
		<xsl:apply-templates select="description"/>
		 <xsl:call-template name="paramDocs">
		 	<xsl:with-param name="params" select="./param"/>
		 </xsl:call-template>
		 <xsl:if test="@access='private'">
   			@private
   		</xsl:if>
   		<xsl:if test="@returns!=''">
   			@returns {<xsl:value-of select="@returns"/>} 
   		</xsl:if>
		<xsl:call-template name="see"><xsl:with-param name="context" select="." /></xsl:call-template>
		 */
		<xsl:value-of select="../@name"/>.prototype.<xsl:value-of select="@name"/> = function(<xsl:apply-templates select="./param/@name"/>)
   		{

   		}
	</xsl:template>
	
	<xsl:template match="property|event">
		/**
		<xsl:apply-templates select="./description"/>
		<xsl:if test="@access='private'">
   		 * @private
   		</xsl:if>
		<xsl:call-template name="see"><xsl:with-param name="context" select="." /></xsl:call-template>
		 * @returns {<xsl:value-of select="@type"/>}
		 */
		<xsl:value-of select="../@name"/>.prototype.<xsl:choose><xsl:when test="@type='Boolean'">is</xsl:when><xsl:otherwise>get</xsl:otherwise></xsl:choose><xsl:value-of select="@name"/> = function()
   		{

   		}

   		<xsl:if test="@readwrite = 'readwrite'">
   		/**
   			<xsl:apply-templates select="./description"/><xsl:if test="name(.)='event'">&lt;p&gt;Event handlers can be set either as a string value using the setter or as a function pointer uses a classes subscribe method. For example, &lt;code&gt;myGrid.subscribe("<xsl:value-of select="substring(@name,3,string-length(@name)-5)"/>", myFunctionReference);&lt;/code&gt;&lt;/p&gt;</xsl:if>
		 * @param {<xsl:value-of select="@type"/>} value
		 <xsl:if test="@access='private'">
   			@private
   		</xsl:if>
		<xsl:call-template name="see"><xsl:with-param name="context" select="." /></xsl:call-template>
		 */
   		<xsl:value-of select="../@name"/>.prototype.set<xsl:value-of select="@name"/> = function(value)
   		{

   		}
   		</xsl:if>
   		
	</xsl:template>
	
	<xsl:template name="paramDocs">
		<xsl:param name="params"/>
		<xsl:for-each select="$params">
			<xsl:if test="@name!=''">
			* @param {<xsl:value-of select="@type"/>} <xsl:value-of select="@name"/> <![CDATA[  ]]> 
			   &#160;<xsl:apply-templates select="description"/>
			</xsl:if>
		</xsl:for-each>

	</xsl:template>
	
	<xsl:template match="param">
	</xsl:template>
	
	<xsl:template match="param/@name">
		<xsl:if test="position()>1">, </xsl:if><xsl:value-of select="."/>
	</xsl:template>
	
	<xsl:template name="see">
		<xsl:param name="context"></xsl:param>
		<xsl:if test="$context/see">
			<xsl:for-each select="$context/see">
			 * @see <xsl:value-of select="." />
			</xsl:for-each>
		</xsl:if>		
	</xsl:template>
   
</xsl:stylesheet>

