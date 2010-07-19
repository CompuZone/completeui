using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Permissions;
using System.Xml.Serialization;

namespace Nitobi
{
	/// <summary>
	/// Used by the Grid control to customize the elements used in its toolbar.
	/// </summary>
	/// <remarks>The toolbar that is shown at the bottom of the Grid within the browser
	/// can be customized by specifying the Toolbars property in the Grid definition.
	/// By default, the Grid will show the standard Grid toolbars when the Grid's
	/// ShowToolbar property is true.  As soon as you specify the Toolbars property
	/// within the grid, you have taken over the definition of the toolbars that 
	/// will be used by that grid.
	/// 
	/// The grid has two types of toolbars that it can display.  The standard toolbar
	/// is always shown and is aligned to the left side of the toolbar area.  When the
	/// Grid is operating in a paging mode where the data is shown to the user in pages
	/// the Paging toolbar will be shown, which is aligned to the right side of the toolbar area.
	/// 
	/// By adding items into the Items collection of the toolbar, you can define what buttons
	/// or other information you want to be shown and the order they are shown in. The
	/// GridToolbarItem class is the parent to all the various toolbar item classes you can use
	/// in a toolbar.  All of the standard buttons such as the save data and refresh toolbar 
	/// buttons have specific classes for them to manage all the default properties like
	/// the action to take when the button is clicked.
	/// 
	/// See the Grid.Toolbars property for more information about how to define custom
	/// toolbars for it.
	/// </remarks>
	[ParseChildren(true, "Items")]
	public class GridToolbar : BaseEntity
	{
		static GridToolbar() { BaseEntity.registerChildType(typeof(GridToolbar)); }
		protected List<GridToolbarItem> m_items = new List<GridToolbarItem>();
		protected Unit m_width = new Unit(110), m_height = new Unit(25);
		protected string m_title = null;
		protected string m_imgDirectory = "http://localhost/vss/EBALib/v13/Common/Toolbar/Styles/default";

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<GridToolbarItem> Items { get { return m_items; } }

		public Unit Width { get { return m_width; } set { m_width = value; } }
		public Unit Height { get { return m_height; } set { m_height = value; } }
		public string Title { get { return m_title; } set { m_title = value; } }
		public string BaseImageUrl { get { return m_imgDirectory; } set { m_imgDirectory = value; } }

		public virtual void getClientDefHtml(HtmlTextWriter writer)
		{
			writer.Write("<toolbar ");
			writeColumnAttributes(writer);
			writer.Write("><items>");
			foreach (GridToolbarItem i in Items)
				i.getClientDefHtml(writer);

			writer.WriteLine("</items></toolbar>");
		}

		public virtual void writeColumnAttributes(HtmlTextWriter writer)
		{
			Cmn.writeAttr(writer, "id", "toolbarthis.uid");
			Cmn.writeAttr(writer, "width", Width.Value);
			Cmn.writeAttr(writer, "height", Height.Value);
			Cmn.writeAttr(writer, "title", Title);
			Cmn.writeAttr(writer, "image_directory", BaseImageUrl);
		}

	}

	/// <summary>
	/// This is the abstract base class for all items that are to be shown within the grid toolbar.
	/// </summary>
	/// <remarks>Controls the basic structure of client html for all toolbars and provides
	/// virtual methods for child classes to override to provide more attributes or inner
	/// content to the client html.</remarks>
	public abstract class GridToolbarItem : BaseEntity
	{
		static GridToolbarItem() { BaseEntity.registerChildType(typeof(GridToolbarItem)); }
		internal static int NextIdNum = 0;
		protected string m_id = null;
		protected string m_onload = null;

		public string Id 
		{ 
			get 
			{
				if (NextIdNum >= 1000) NextIdNum = 0;

				if (Cmn.IsEmpty(m_id))
					return "ti" + NextIdNum++;
				else
					return m_id;
			} 
			set { m_id = value; } 
		}

		public virtual string OnLoad { get { return m_onload; } set { m_onload = value; } }

		public virtual void getClientDefHtml(HtmlTextWriter writer)
		{
			writer.Write("<{0} ", getClientColumnName());
			writeColumnAttributes(writer);
			writer.Write(">");
			writeInnerContents(writer);
			writer.WriteLine("</{0}>", getClientColumnName());
		}

		public virtual void writeColumnAttributes(HtmlTextWriter writer)
		{
			Cmn.writeAttr(writer, "id", Id);
			Cmn.writeAttr(writer, "onbuttonload", OnLoad);
		}

		public virtual void writeInnerContents(HtmlTextWriter writer)
		{
		}

		protected abstract string getClientColumnName();
	}

	/// <summary>
	/// Represents a single button in the Grid's toolbar area.  New buttons can be added to the toolbar
	/// by defining one of these or its child classes within the grid toolbar's items element.
	/// </summary>
	/// <remarks>
	/// A toolbar button can have two images, one for when the action is enabled and one for when the
	/// action is disabled.  You control the buttons enabled state through the button's client side
	/// javascript disable method or via the grid.disableButton/grid.enableButton methods.
	/// 
	/// When using a custom button image, be sure to set the CssStyle property to include margin's to
	/// align the image properly in the toolbar.
	/// </remarks>
	public class ButtonItem : GridToolbarItem
	{
		static ButtonItem() { BaseEntity.registerChildType(typeof(ButtonItem)); }

		protected Unit m_width = new Unit(14), m_height = new Unit(11);
		protected string m_tooltip = null;
		protected string m_imageUrl = null;
		protected string m_disabledImageUrl = null;
		protected string m_clientClick = null;
		protected string m_cssStyle = null;

		public Unit Width { get { return m_width; } set { m_width = value; } }
		public Unit Height { get { return m_height; } set { m_height = value; } }
		public string Tooltip { get { return m_tooltip; } set { m_tooltip = value; } }
		/// <summary>The image url to use when the button is in an enabled state.</summary>
		/// <remarks>If the url starts with a backslash the image will come directly out of
		/// the url given, otherwise the url will be prefixed with the grid's
		/// theme directory so that the image will change when the theme changes.</remarks>
		public string ImageUrl { get { return m_imageUrl; } set { m_imageUrl = value; } }

		///<summary>The image url to use when the button is in a disabled state.</summary>
		/// <remarks>If the url starts with a backslash the image will come directly out of
		/// the url given, otherwise the url will be prefixed with the grid's
		/// theme directory so that the image will change when the theme changes.</remarks>
		public string DisabledImageUrl { get { return m_disabledImageUrl; } set { m_disabledImageUrl = value; } }
		public string Click { get { return m_clientClick; } set { m_clientClick = value; } }
		public string CssStyle { get { return m_cssStyle; } set { m_cssStyle = value; } }

		protected override string getClientColumnName()
		{
			return "button";
		}

		public override void writeColumnAttributes(HtmlTextWriter writer)
		{
			base.writeColumnAttributes(writer);
			Cmn.writeAttr(writer, "width",Width.Value);
			Cmn.writeAttr(writer, "height",Height.Value);
			Cmn.writeAttr(writer, "tooltip_text",Tooltip);
			Cmn.writeAttr(writer, "image_disabled", DisabledImageUrl);
			Cmn.writeAttr(writer, "image",ImageUrl);
			Cmn.writeAttr(writer, "onclick_event",Click.Replace("'","\\'"));
			Cmn.writeAttr(writer, "style", CssStyle);
		}

	}

	/// <summary>
	/// A grid toolbar item that will display a seperator bar between its sibling items
	/// in the toolbar.
	/// </summary>
	public class SeparatorItem : GridToolbarItem
	{
		static SeparatorItem() { BaseEntity.registerChildType(typeof(SeparatorItem)); }
		protected Unit m_width = new Unit(5), m_height = new Unit(20);
		protected string m_imageUrl = "separator.jpg";

		public Unit Width { get { return m_width; } set { m_width = value; } }
		public Unit Height { get { return m_height; } set { m_height = value; } }
		public string ImageUrl { get { return m_imageUrl; } set { m_imageUrl = value; } }

		protected override string getClientColumnName()
		{
			return "separator";
		}
		public override void writeColumnAttributes(HtmlTextWriter writer)
		{
			base.writeColumnAttributes(writer);
			Cmn.writeAttr(writer, "width", Width.Value);
			Cmn.writeAttr(writer, "height", Height.Value);
			Cmn.writeAttr(writer, "image", ImageUrl);
		}
	}

	/// <summary>
	/// A grid toolbar item that will display simple html within the grid toolbar.
	/// </summary>
	/// <remarks>While usable as a item in the toolbar on its own, this class is mostly
	/// intended as a parent class to more specific items that will generate the html
	/// to based on the runtime state of the site.</remarks>
	[ParseChildren(true, "Text")]
	public class LabelItem : GridToolbarItem
	{
		static LabelItem() { BaseEntity.registerChildType(typeof(LabelItem)); }

		protected string m_text = null;
		protected string m_cssClass = null;
		protected string m_cssStyle = null;

		[PersistenceModeAttribute(PersistenceMode.InnerDefaultProperty)]
		public string Text { get { return m_text; } set { m_text = value; } }

		[PersistenceModeAttribute(PersistenceMode.Attribute)]
		public string CssClass { get { return m_cssClass; } set { m_cssClass = value; } }

		[PersistenceModeAttribute(PersistenceMode.Attribute)]
		public string CssStyle { get { return m_cssStyle; } set { m_cssStyle = value; } }

		protected override string getClientColumnName()
		{
			return "div";
		}
		public override void writeColumnAttributes(HtmlTextWriter writer)
		{
			base.writeColumnAttributes(writer);
			Cmn.writeAttr(writer, "style", CssStyle);
			Cmn.writeAttr(writer, "class", CssClass);
		}
		public override void writeInnerContents(HtmlTextWriter writer)
		{
			writer.Write(Text);
		}
	}

	/// <summary>
	/// A grid toolbar item that will show the number of rows known to be in the grid.
	/// </summary>
	/// <remarks>This class will only show the value provided by the grid's javascript method
	/// getrid.datatable.getRemoveRowCount().  If the remote row count is not know, the value
	/// shown will be the count known at the time.
	/// 
	/// To ensure the grid shows an acurate Row count, be sure to provide the grid data provider
	/// with a getTotalDataSize event handler that will query for the real row count.  The grid will use this to 
	/// push the known row count to the grid and this item will show that value.</remarks>
	public class RowCountItem : LabelItem
	{
		public RowCountItem()
		{
			OnLoad = "grid.subscribe('HtmlReady', function() {iDom.innerHTML = grid.datatable.getRemoteRowCount(); } ,null, new Array());";
		}
	}

	/// <summary>
	/// A grid toolbar item that will show the current page being viewed by the user when the grid
	/// is being used in a paging mode.  As the user navigates through the pages of grid data, this
	/// value will change.
	/// </summary>
	public class CurrentPageItem : LabelItem
	{
		public CurrentPageItem()
		{
			OnLoad = "grid.subscribe('HtmlReady', function() {iDom.innerHTML = grid.getCurrentPageIndex() +1; } ,null, new Array());";
		}
	}

	/// <summary>
	/// A grid toolbar item that will show the total number of pages of data there are for the user
	/// to page through when using the grid in one of the paging modes.  This number will only be accurate
	/// if the Grid's data provider has an implementation of the getTotalDataSize.
	/// </summary>
	public class TotalPagesItem : LabelItem
	{
		public TotalPagesItem()
		{
			OnLoad = "grid.subscribe('HtmlReady', function() {iDom.innerHTML = (grid.datatable.getRemoteRowCount() / grid.getRowsPerPage()) +1; } ,null, new Array());";
		}
	}

	/// <summary>
	/// A grid toolbar item that will show the total row count available formatted within the context of an
	/// html template provided in the Text property.
	/// </summary>
	/// <remarks>The only difference between this class and the RowCountItem class is that this class uses
	/// a display template to show the row count within.  The text property should be properly formatted html
	/// that has {0} embedded within it to be replaced with the row count.  The implementation of this class will
	/// use the .NET String.Format method to create the actual value for the toolbar to display.
	/// 
	/// If you need the html to contain an { or } character, you'll need to use the escape sequence of {{ and
	/// }} to avoid an exception during the String.Format call.
	/// </remarks>
	public class TotalRowsInfoItem : LabelItem
	{
		public TotalRowsInfoItem()
		{
			Text = "Total Rows: {0}";
		}

		public override string OnLoad
		{
			get
			{
				string s = "grid.subscribe('HtmlReady', function() {iDom.innerHTML = '" +
					Text.Trim().Replace("<", "&lt;").Replace(">", "&gt;") + 
					@"'.replace(/\{0\}/g, grid.datatable.getRemoteRowCount() +1); } ,null, new Array());";
				return s;
			}
			set
			{ }
		}
		public override void writeInnerContents(HtmlTextWriter writer)
		{

		}
	}

	/// <summary>
	/// A grid toolbar item that will show the current page and total pages available formatted within the context of an
	/// html template provided in the Text property.
	/// </summary>
	/// <remarks>The only difference between this class and the TotalPagesItem class is that this class uses
	/// a display template to show both the current page and the total pages within it.  The text property
	/// should be properly formatted html that has {0} embedded within it to be replaced with the current page
	/// and a {1} for the total number of pages..  The implementation of this class will
	/// use the .NET String.Format method to create the actual value for the toolbar to display.
	/// 
	/// If you need the html to contain an { or } character, you'll need to use the escape sequence of {{ and
	/// }} to avoid an exception during the String.Format call.
	/// </remarks>
	public class PagingInfoItem : LabelItem
	{
		public PagingInfoItem()
		{
			Text = "Page: {0} of {1}";
		}

		public override string OnLoad
		{
			get
			{
				string s = "grid.subscribe('HtmlReady', function() {iDom.innerHTML = (grid.getPagingMode()!='livescrolling' &amp;&amp; grid.getPagingMode()!='none')?'" +
					Text.Trim().Replace("<", "&lt;").Replace(">", "&gt;") + 
					@"'.replace(/\{0\}/g, grid.getCurrentPageIndex() +1).replace(/\{1\}/g, Math.ceil(grid.datatable.getRemoteRowCount() / grid.getRowsPerPage())):''; } ,null, new Array());";
				return s;
			}
			set
			{}
		}
		public override void writeInnerContents(HtmlTextWriter writer)
		{
			
		}
	}
	

	/// <summary>
	/// A grid toolbar item that will put the Grid's standard save button in the grid toolbar.
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class SaveButtonItem : ButtonItem
	{
		public SaveButtonItem()
		{
			Id = "save";
			ImageUrl = "save.gif";
			DisabledImageUrl = "save_disabled.gif";
			Tooltip = "Save Changes";
			Click = "this.onClick();";
		}
	}

	/// <summary>
	/// A grid toolbar item that will put the Grid's standard add row button in the grid toolbar.
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class AddButtonItem : ButtonItem
	{
	}

	/// <summary>
	/// A grid toolbar item that will put the Grid's standard delete row button in the grid toolbar.
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class DeleteButtonItem : ButtonItem
	{
	}

	/// <summary>
	/// A grid toolbar item that will put the Grid's standard refresh button in the grid toolbar.
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class RefreshButtonItem : ButtonItem
	{
	}

	//<button id="nextPage" onclick_event="this.onClick()" height="14" width="16" image="right.gif"			image_disabled="right_disabled.gif" tooltip_text="Next Page" />

	/// <summary>
	/// A grid toolbar item that will put the Grid's standard next page button in the grid toolbar.
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class NextPageButtonItem : ButtonItem
	{
		public NextPageButtonItem()
		{
			Id = "nextPage";
			ImageUrl = "right.gif";
			DisabledImageUrl = "right_disabled.gif";
			Tooltip = "Previous Page";
			Click = "this.onClick();";
		}
	}

	//<button id="previousPage" onclick_event="this.onClick()" height="14" width="14" image="left.gif"			image_disabled="left_disabled.gif" tooltip_text="Previous Page" />		

	/// <summary>A grid toolbar item that will put the Grid's standard previous page button in the grid toolbar
	/// </summary>
	/// <remarks>If no attributes are set for the various properties of this toolbar button, the
	/// standard Grid's button values will be used.  However, you can override the image used 
	/// by the button or the tooltip display by simply setting this item's properties to the values
	/// desired.</remarks>
	public class PrevPageButtonItem : ButtonItem
	{
		public PrevPageButtonItem()
		{
			Id = "previousPage";
			ImageUrl = "left.gif";
			DisabledImageUrl = "left_disabled.gif";
			Tooltip = "Next Page";
			Click = "this.onClick();";
		}
	}
}
