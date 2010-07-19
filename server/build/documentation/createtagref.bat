ls ../documentation/common/client-tag/*.xml -1 | xargs -i ..\..\build\msxsl\msxsl '{}' ../../build/documentation/totagref.xsl -v
if  errorlevel  1  goto  error

REM Concatenate all the tagref XML docs and the XML output of JsDoc
echo ^<^?xml version^=^"1^.0^" encoding^=^"UTF^-8^"^?^> > ../temp/documentation/_documentation.xml
echo ^<documentation^>^<tagref^> >> ../temp/documentation/_documentation.xml
cat ../documentation/common/client-tag/*.xml >> ../temp/documentation/_documentation.xml
echo ^</tagref^> >> ../temp/documentation/_documentation.xml
cat ../temp/documentation/_documentation.xml ../temp/documentation/%1-client-api/jsdoc.xml > ../temp/documentation/documentation.xml
echo ^</documentation^> >> ../temp/documentation/documentation.xml

REM merge the jsdoc XML output into the tagref documentation
..\..\build\msxsl\msxsl ..\temp\documentation\documentation.xml ..\..\build\documentation\mergejsdoctotagref.xsl -o ..\temp\documentation\documentation.xml

REM take each xml file for the tag ref and create a corresponding HTML file for inclusion in the CHM docs.
ls ../documentation/common/client-tag/*.xml -1 | sed -e "s/.*\///g" -e "s/\..*//g" | xargs -i ..\..\build\msxsl\msxsl ../temp/documentation/documentation.xml ../../build/documentation/totagref.xsl tagname='ntb:{}' -o '../temp/documentation/%1-client-tag/{}'.html
copy ..\..\build\documentation\tagref.css ..\documentation\common

REM create an XML file with all of the tag names in it.
echo ^<tags^> > ../temp/documentation/tags.xml
ls ../documentation/common/client-tag/*.xml -1 | sed -e "s/.*\///g" -e "s/\..*//g" | xargs -i echo '^<tag^>{}^</tag^>' >> ../temp/documentation/tags.xml
echo ^</tags^> >> ../temp/documentation/tags.xml

goto  end
:error  
echo  An Error occured.
:end