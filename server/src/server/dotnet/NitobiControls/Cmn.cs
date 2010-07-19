using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.ComponentModel;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Nitobi
{
	/// <summary>
	/// A collection of static methods to assist in various tasks that are used by the
	/// rest of the classes in this library.
	/// </summary>
	public class Cmn
	{
		public static void writeAttr(HtmlTextWriter writer, string name, object value)
		{
			if (value != null)
			{
				writer.Write(name);
				writer.Write("=\"");
				writer.Write(value);
				writer.Write("\" ");
			}
		}
		public static void writeAttr(HtmlTextWriter writer, string name, object value, object defValue)
		{
			if (value != null && !value.Equals(defValue))
				writeAttr(writer, name, value);
		}

		public static int parseInt(string intStr, int defVal)
		{
			int d;
			return int.TryParse(intStr, out d) ? d : defVal;
		}

		public static object getObjValue(object obj, string fieldName)
		{
			return obj.GetType().InvokeMember(fieldName, BindingFlags.GetProperty | BindingFlags.GetField | BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance, null, obj, null);
		}

		public static bool IsEmpty(object str)
		{
			return (str == null || (str is string && ((string)str).Length == 0));
		}

		public static string ToBase64(string inputText)
		{
			byte[] bytesToEncode = Encoding.UTF8.GetBytes(inputText);
			return Convert.ToBase64String(bytesToEncode);
		}

		public static string FromBase64(string encodedText)
		{
			byte[] decodedBytes = Convert.FromBase64String(encodedText);
			return Encoding.UTF8.GetString(decodedBytes);
		}
		public static string pathCombine(params string[] parts)
		{
			int length = 0;
			foreach (string p in parts)
				if(p != null)
					length += p.Length + 1;
			StringBuilder buff = new StringBuilder(length);
			for (int pos = 0; pos < parts.Length; pos++)
			{
				if (parts[pos] != null)
				{
					buff.Append(parts[pos]);
					if (pos < parts.Length - 1 && parts[pos +1] != null && 
						(parts[pos].Length == 0 || parts[pos][parts[pos].Length - 1] != Path.DirectorySeparatorChar) &&
						(parts[pos + 1].Length == 0 || parts[pos + 1][0] != Path.DirectorySeparatorChar))
						buff.Append(Path.DirectorySeparatorChar);
				}
			}
			if (Path.DirectorySeparatorChar != '/')
				buff.Replace('/', '\\');

			return buff.ToString();
		}
	}
}
