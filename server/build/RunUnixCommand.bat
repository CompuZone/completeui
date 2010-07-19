@ECHO OFF
REM *****************************************************************************
REM * @Title: Cygwin command runner
REM * @File: RunUnixCommand.bat
REM * @Author: wpiaseczny
REM * @Date: 7/5/2004 4:26:47 PM
REM * @Purpose: 
REM * Due to some intricacies with NAnt, we are unable to run cygwin commands that
REM * replicate file names provided by some basic windows files (eg find.exe) through 
REM * NAnt's exec tag. This can be avoided by making cygwin's bin folder the first entry
REM * in your path, and using the parameters of this script to specify your command. 
REM * For example:
REM *		RunUnixCommand.bat find.exe . -name *.scc | xargs rm -f
REM * @Notes: 
REM * 	Script will exit the window it was run in with the appropriate return code.
REM *	If characters such as "|" and "%" need to be used, the can be escaped with "^".
REM *****************************************************************************

SET command=

:loop
IF "%1"=="" GOTO end
SET command=%command% %1
SHIFT
GOTO loop
:end

CALL %command%

@ECHO OFF

IF ERRORLEVEL 1 GOTO ERROR
EXIT 0

:ERROR
EXIT 1