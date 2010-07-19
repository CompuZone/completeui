<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="text"/>

    <xsl:param name="src"></xsl:param>
    <xsl:param name="target"></xsl:param>

    <xsl:preserve-space elements="*"/>

    <xsl:template match="/">
[VAR]
varPageCaption=Nitobi
varContentswidth=250
varContents=Contents
varIndex=Index
varSearch=Search
varHomeUrl=http://www.nitobi.com
varHomeCap=Home
varPrevCap=Prev Page
varNextCap=Next Page
varLogoFile=files/logo.gif

[OPTIONS]
Template=..\..\..\build\documentation\chm2web\Templates\default.cwtpl
ConvertStyle=0
HelpSrcFolder=src
AddAklabsLink=0
ContentsDoNotWrap=0
ContentsSmallFont=1
Keywords=online documentation, web online help, web help, chm2web
ContentsSplit=1
ContentsSplitLn=40
AccCharsConvert=0
UseOriginalStyles=1
AddToStyleSheet=h1,h2,h3,h4 { color: #SCHEMECOLOR4# }
SEOptimization=1
AutoOpenFrameset=1
ChangeCase=1

[OPTIONS.ADV]
ppPagePreprocessing=0
ppRemoveAllBefore=0
ppRemoveAllAfter=0
ppRemoveAllBeforeRE=0
ppRemoveAllAfterRE=0
ppRemoveAllBeforeExp=&lt;HR
ppRemoveAllAfterExp=
ppRemoveAllBeforeIncl=0
ppRemoveAllAfterIncl=0
ppAddHeaderCode=<b>page header</b>
ppAddFooterCode=<b>page footer</b>
ppAddHeader=0
ppAddFooter=0

[MAIN]
IndexFileName=index.html
SourceFile=<xsl:value-of select="$src"/>
TargetFolder=<xsl:value-of select="$target"/>
    </xsl:template>

</xsl:stylesheet>
