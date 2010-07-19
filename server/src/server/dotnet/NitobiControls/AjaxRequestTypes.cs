using System;
using System.Collections.Generic;
using System.Text;

namespace Nitobi
{
	/// <summary>
	/// Defines public static int data elements that specifies the type of ajax event
	/// taking place. 
	/// </summary>
	/// <remarks>The approach of using public static ints for the type of ajax event rather
	/// than an enumeration is to allow for new types of ajax events to be defined for
	/// custom controls.
	/// 
	/// This class and its static values are used by the XmlDataHandler to help decide how
	/// it should process the ajax data request.  If you want to write your own control
	/// that uses the Nitobi Ajax library, you can define your own int values for them
	/// to help control processing by the XmlDataHandler.  You could write a new class that
	/// inherits from XmlDataHandler and processes the request based on the type of
	/// ajax request being made.
	/// 
	/// </remarks>
	public class AjaxRequestTypes
	{
		public static int NotAjaxRequest = 0;
		public static int GridSaveDataRequest = 1;
		public static int GridGetDataRequest = 2;
		public static int ComboGetDataRequest = 3;
		public static int XmlIslandGetDataRequest = 4;
		public static int TreeGetDataRequest = 5;
		public static int CalendarGetDataRequest = 6;

		public static int BeginingOfCustomControlValues = 1000;

		public static Dictionary<int, string> SimpleControlTypes = new Dictionary<int, string>();
		static AjaxRequestTypes()
		{
			SimpleControlTypes[GridSaveDataRequest] = "grid";
			SimpleControlTypes[GridGetDataRequest] = "grid";
			SimpleControlTypes[ComboGetDataRequest] = "combo";
			SimpleControlTypes[XmlIslandGetDataRequest] = "xmlisland";
			SimpleControlTypes[TreeGetDataRequest] = "tree";
			SimpleControlTypes[CalendarGetDataRequest] = "cal";
		}
	}
}
