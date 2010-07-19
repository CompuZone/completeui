-----------------------------------------------------------
*** Building Nitobi Components From Source  ***
-----------------------------------------------------------
New in Nitobi Complete UI is the ability to build a minified
version of your customized component.

----------------------------------------------------------
 Directory Description
----------------------------------------------------------
- ant/ - ant distribution
- includes/ - required xslt and javascript files
- rhino/ - rhino distribution used for obfuscation
- src/ - component source files.  It is important that the 
		 directory structure be maintained

-----------------------------------------------------------
 Requirements
-----------------------------------------------------------
Everything that is required to build a component is included in the build directory
If you don't already have ant installed and referenced in your PATH, you can use
the ant distrubtion included in the ant directory

-----------------------------------------------------------
 Building
-----------------------------------------------------------
To build a component, run the following from the command line
> ant -Dcomponent.name=toolkit

This will output a minified toolkit.js file to build/src/output

