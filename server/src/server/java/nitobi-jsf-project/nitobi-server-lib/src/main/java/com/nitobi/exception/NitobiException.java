package com.nitobi.exception;

/**
 * A wrapper Exception class that is used by the Nitobi Server Library.
 * @author mhan
 *
 */
public class NitobiException extends Exception 
{
	/**
	 * Constructs a NitobiException with a detailed error message and
	 * specifies the cause of the error
	 * @param message The detailed message
	 * @param cause The cause of the exception
	 */
	public NitobiException(String message, Throwable cause)
	{
		super(message, cause);
	}
	
	/**
	 * Constructs a NitobiException with a detailed error message
	 * @param message The detailed message
	 */
	public NitobiException(String message)
	{
		super(message);
	}
}
