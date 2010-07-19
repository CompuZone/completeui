package v13.rhino.com.eba.tests;

import java.util.Random;
import java.util.prefs.Preferences;

import sun.misc.BASE64Encoder;

import junit.framework.TestCase;

public class TestStringEncode extends TestCase
{

	public void testBase64EncodeString() throws Exception
	{
		String testInput = "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.";
		String encoding = new sun.misc.BASE64Encoder().encode(testInput
				.getBytes());
		System.out.println("TestStringEncode.testEncodeString() [" + encoding
				+ "]");
		String expectedOutput = "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlz\r\n"
				+ "IHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2Yg\r\n"
				+ "dGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGlu\r\n"
				+ "dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRo\r\n"
				+ "ZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=";
		assertEquals(expectedOutput, encoding);
	}

	static public String byteToHex(byte b)
	{
		// Returns hex String representation of byte b
		char hexDigit[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		char[] array = { hexDigit[(b >> 4) & 0x0f], hexDigit[b & 0x0f] };
		return new String(array);
	}

	static public String charToHex(char c)
	{
		// Returns hex String representation of char c
		byte hi = (byte) (c >>> 8);
		byte lo = (byte) (c & 0xff);
		return byteToHex(hi) + byteToHex(lo);
	}

	public void testUnicodeEncodeString() throws Exception
	{
		String testInput = "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.";
		String expectedOutput = "\\u004d\\u0061\\u006e\\u0020\\u0069\\u0073\\u0020\\u0064\\u0069\\u0073\\u0074\\u0069\\u006e\\u0067\\u0075\\u0069\\u0073\\u0068\\u0065\\u0064\\u002c\\u0020\\u006e\\u006f\\u0074\\u0020\\u006f\\u006e\\u006c\\u0079\\u0020\\u0062\\u0079\\u0020\\u0068\\u0069\\u0073\\u0020\\u0072\\u0065\\u0061\\u0073\\u006f\\u006e\\u002c\\u0020\\u0062\\u0075\\u0074\\u0020\\u0062\\u0079\\u0020\\u0074\\u0068\\u0069\\u0073\\u0020\\u0073\\u0069\\u006e\\u0067\\u0075\\u006c\\u0061\\u0072\\u0020\\u0070\\u0061\\u0073\\u0073\\u0069\\u006f\\u006e\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u006f\\u0074\\u0068\\u0065\\u0072\\u0020\\u0061\\u006e\\u0069\\u006d\\u0061\\u006c\\u0073\\u002c\\u0020\\u0077\\u0068\\u0069\\u0063\\u0068\\u0020\\u0069\\u0073\\u0020\\u0061\\u0020\\u006c\\u0075\\u0073\\u0074\\u0020\\u006f\\u0066\\u0020\\u0074\\u0068\\u0065\\u0020\\u006d\\u0069\\u006e\\u0064\\u002c\\u0020\\u0074\\u0068\\u0061\\u0074\\u0020\\u0062\\u0079\\u0020\\u0061\\u0020\\u0070\\u0065\\u0072\\u0073\\u0065\\u0076\\u0065\\u0072\\u0061\\u006e\\u0063\\u0065\\u0020\\u006f\\u0066\\u0020\\u0064\\u0065\\u006c\\u0069\\u0067\\u0068\\u0074\\u0020\\u0069\\u006e\\u0020\\u0074\\u0068\\u0065\\u0020\\u0063\\u006f\\u006e\\u0074\\u0069\\u006e\\u0075\\u0065\\u0064\\u0020\\u0061\\u006e\\u0064\\u0020\\u0069\\u006e\\u0064\\u0065\\u0066\\u0061\\u0074\\u0069\\u0067\\u0061\\u0062\\u006c\\u0065\\u0020\\u0067\\u0065\\u006e\\u0065\\u0072\\u0061\\u0074\\u0069\\u006f\\u006e\\u0020\\u006f\\u0066\\u0020\\u006b\\u006e\\u006f\\u0077\\u006c\\u0065\\u0064\\u0067\\u0065\\u002c\\u0020\\u0065\\u0078\\u0063\\u0065\\u0065\\u0064\\u0073\\u0020\\u0074\\u0068\\u0065\\u0020\\u0073\\u0068\\u006f\\u0072\\u0074\\u0020\\u0076\\u0065\\u0068\\u0065\\u006d\\u0065\\u006e\\u0063\\u0065\\u0020\\u006f\\u0066\\u0020\\u0061\\u006e\\u0079\\u0020\\u0063\\u0061\\u0072\\u006e\\u0061\\u006c\\u0020\\u0070\\u006c\\u0065\\u0061\\u0073\\u0075\\u0072\\u0065\\u002e";

		StringBuffer result = new StringBuffer(1000);
		for (int i = 0; i < testInput.length(); i++)
		{
			result.append("\\u" + charToHex(testInput.charAt(i)));
		}

		System.out.println("TestStringEncode.testUnicodeEncodeString() ["
				+ result.toString() + "]");

		assertEquals(expectedOutput, result.toString());
	}
	
	public void testrandom() throws Exception
	{
		Random generator = new Random(1231);
		int result =0;
		for (int i = 0; i < 1000; i++)
		{
			if(generator.nextBoolean())
			{
			result++;	
			}
		}
		System.out.println("TestStringEncode.testrandom() result ["+result+"]");
	}

public void testEncodeTrialJSCode() {
	
	String originalString = "var d = new Date().getTime();if ((d>1146951598375) || (d<1146692398375)) {alert('Evaluation period has expired.\\n\\nPlease notify your system administrator.\\n\\nPurchase Information:\\n       eBUSINESS APPLICATIONS\\n\\n       www.eBusinessApplications.ca\\n       Sales@eBusinessApplications.ca         \\n       Telephone: (604) 985-9287\\n       Fax: (604) 648-9090\\n       Toll-Free: 1-866-6EB-APPS\\n                      (1-866-632-2777)');}";
	StringBuffer result = new StringBuffer(1000);
	String plusString ="";
	for (int i = 0; i < originalString.length(); i++)
	{
		result.append(plusString+" \"\\u" + charToHex(originalString.charAt(i)) + "\"");
		plusString="+";
	}

	System.out.println("TestStringEncode.testUnicodeEncodeString() ["
			+ result.toString() + "]");



}

}
