using System;
using System.ComponentModel;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.toolkit.js", "application/x-javascript")]
namespace Nitobi
{
	public abstract class NitobiControlBase : Control
	{
		protected bool m_useFullCtlId = true;
        protected string m_styleDirectory = "style";

        public string StyleDirectory { get { return m_styleDirectory; } set { m_styleDirectory = value; } }

		[Bindable(true),
		Category("Appearence"),
		RefreshPropertiesAttribute(RefreshProperties.All),
		DesignerSerializationVisibility(DesignerSerializationVisibility.Visible)]

		protected abstract string RootClientControlName { get; }
		protected virtual void writeRootClientAttributes(HtmlTextWriter writer)
		{
			Cmn.writeAttr(writer, "id", ClientID);
		}

		protected virtual void writeClientInnerContents(HtmlTextWriter writer)
		{
		}

		public static void SetupScripts(Page Page)
		{
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(NitobiControlBase), "Nitobi.scripts.nitobi.toolkit.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.Toolkit", scriptUrl);
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			SetupScripts(Page);
		}

		protected override void Render(HtmlTextWriter writer)
		{
			base.Render(writer);
			if (!InDesignMode)
			{
				writer.Write(writer.NewLine);
				writer.WriteBeginTag("?XML:NAMESPACE");
				writer.WriteAttribute("prefix", "ntb");
				writer.Write(HtmlTextWriter.SelfClosingTagEnd);
				writer.Write(writer.NewLine);

				writer.Write("<");
				writer.Write(RootClientControlName);
				writer.Write(" ");
				writeRootClientAttributes(writer);
				writer.WriteLine(">");
				writeClientInnerContents(writer);
				writer.Write("</");
				writer.Write(RootClientControlName);
				writer.WriteLine(">");
			}
		}

		protected bool InDesignMode
		{
			get
			{
				return (null != this.Site) && (true == this.Site.DesignMode);
			}
		}

		protected virtual object getObj(string name, object defVal)
		{
			object v = ViewState[name];
			return v == null ? defVal : v;
		}
		protected virtual void setObj(string name, object val)
		{
			ViewState[name] = val;
		}

		protected internal virtual string calcControlName(string name, bool supportNull)
		{
			if (!Cmn.IsEmpty(name))
			{
				Control c = (name.IndexOf("_") > 0) ? searchFor(Page, name.Split('_'), 0) : Parent.FindControl(name);

				if (c != null)
					name = c.ClientID;
			}
			if (supportNull && Cmn.IsEmpty(name))
				name = "null";
			else if (supportNull)
				name = "'" + name + "'";
			return name;
		}

		protected internal Control searchFor(Control parent, string[] parts, int pos)
		{
			Control c2 = null;
			foreach (Control c in parent.Controls)
				if (!Cmn.IsEmpty(c.ID) && c.ID.CompareTo(parts[pos]) == 0)
					if (pos == parts.Length - 1)
						return c;
					else
					{
						if ((c2 = searchFor(c, parts, pos + 1)) != null)
							return c2;
					}
				else
				{
					if ((c2 = searchFor(c, parts, pos)) != null)
						return c2;
				}

			return null;
		}

        protected internal static void setupPageCssLinks(Page page, string linkUrl, string cssLink)
        {
            LiteralControl cssIncs = null;
            foreach (Control c in page.Header.Controls)
                if (c is LiteralControl && c.ID != null && c.ID.CompareTo("csslinks")==0)
                {
                    cssIncs = (LiteralControl)c;
                    if (cssIncs.Text.IndexOf(linkUrl) == -1)
                        cssIncs.Text += cssLink;
                    break;
                }
            if (cssIncs == null)
            {
                LiteralControl include = new LiteralControl(cssLink);
                include.ID = "csslinks";
                page.Header.Controls.Add(include);
            }
        }

        protected static void setupCssLink(Page Page, string baseName, string themeName, string styleDirectory)
        {
            if (Page.Header != null)
            {
                string appPath = Page.Request.ApplicationPath;
                string linkUrl = string.Format("{0}{1}{4}/{3}/{2}/nitobi.{3}.css", appPath, appPath.Length == 1 ? "" : "/", themeName, baseName, styleDirectory);
				string csslink = "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' ></link>";
                setupPageCssLinks(Page, linkUrl, csslink);
            }
        }

    }
}
