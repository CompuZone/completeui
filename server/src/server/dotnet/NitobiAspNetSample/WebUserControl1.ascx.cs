using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

using Nitobi;

namespace test
{
	public partial class WebUserControl1 : System.Web.UI.UserControl
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			setupComboButtons();
			setupGridButtons();
			if (!Page.IsPostBack)
			{
				gridResize.Checked = g.Resizable != GridResizeOption.Fixed;
				minSizes.Visible = gridResize.Checked;
				minHeight.Text = g.MinHeight.Value.ToString();
				minWidth.Text = g.MinWidth.Value.ToString();

				autoSave.Checked = g.EnableAutoSave;
				allowAdd.Checked = g.AllowAddRow;
				allowDelete.Checked = g.AllowDeleteRow;
				showToolbar.Checked = g.ShowToolbar;
				showHeaders.Checked = g.ShowHeader;
				showCellTips.Checked = g.ShowCellToolTips;
				allowSort.Checked = g.AllowSorting;

				int nf = g.FrozenLeftColumns;
				if (nf > 2)
					nf = 2;
				numFrozen.Items[nf].Selected = true;

				gridTheme.DataSource = Enum.GetValues(typeof(GridThemeName));
				gridTheme.DataBind();
				gridTheme.Items[(int)g.Theme].Selected = true;

				rowSelect.DataSource = Enum.GetValues(typeof(RowSelect));
				rowSelect.DataBind();
				rowSelect.Items[(int)g.SelectionMode].Selected = true;

				entrAction.DataSource = Enum.GetValues(typeof(GridEnterOption));
				entrAction.DataBind();
				entrAction.Items[(int)g.EnterKeyAction].Selected = true;

				if (g.RowHeight > 0)
					rowHeight.Text = g.RowHeight.ToString();
				if (g.HeaderHeight > 0)
					hdrHeight.Text = g.HeaderHeight.ToString();

				comboTheme.DataSource = Enum.GetValues(typeof(ComboThemeName));
				comboTheme.DataBind();
				comboTheme.Items[(int)c.Theme].Selected = true;
	
			}
			gridResize.CheckedChanged += new EventHandler(gridResize_CheckedChanged);
			autoSave.CheckedChanged += new EventHandler(autoSave_CheckedChanged);
			allowAdd.CheckedChanged += new EventHandler(allowAdd_CheckedChanged);
			allowDelete.CheckedChanged += new EventHandler(allowDelete_CheckedChanged);
			showToolbar.CheckedChanged += new EventHandler(showToolbar_CheckedChanged);
			showHeaders.CheckedChanged += new EventHandler(showHeaders_CheckedChanged);
			showCellTips.CheckedChanged += new EventHandler(showCellTips_CheckedChanged);
			allowSort.CheckedChanged += new EventHandler(allowSort_CheckedChanged);

			gridTheme.SelectedIndexChanged += new EventHandler(gridTheme_SelectedIndexChanged);
			numFrozen.SelectedIndexChanged += new EventHandler(numFrozen_SelectedIndexChanged);
			rowSelect.SelectedIndexChanged += new EventHandler(rowSelect_SelectedIndexChanged);
			entrAction.SelectedIndexChanged += new EventHandler(entrAction_SelectedIndexChanged);

			rowHeight.TextChanged += new EventHandler(rowHeight_TextChanged);
			hdrHeight.TextChanged += new EventHandler(hdrHeight_TextChanged);
			updateMinSizes.Click += new EventHandler(updateMinSizes_Click);

			comboTheme.SelectedIndexChanged += new EventHandler(comboTheme_SelectedIndexChanged);
		}

		void autoSave_CheckedChanged(object sender, EventArgs e)
		{
			g.EnableAutoSave = autoSave.Checked;
		}

		void comboTheme_SelectedIndexChanged(object sender, EventArgs e)
		{
			c.Theme = (ComboThemeName)Enum.Parse(typeof(ComboThemeName), comboTheme.SelectedValue);
		}

		void allowDelete_CheckedChanged(object sender, EventArgs e)
		{
			g.AllowDeleteRow = allowDelete.Checked;
		}

		void allowAdd_CheckedChanged(object sender, EventArgs e)
		{
			g.AllowAddRow = allowAdd.Checked;
		}

		void updateMinSizes_Click(object sender, EventArgs e)
		{
			int mh = (int)g.MinHeight.Value;
			int mw = (int)g.MinWidth.Value;
			int.TryParse(minHeight.Text, out mh);
			int.TryParse(minWidth.Text, out mw);
			if (mh < 0) mh = 0;
			if (mw < 0) mw = 0;
			g.MinWidth = new Unit(mw);
			g.MinHeight = new Unit(mh);
			minHeight.Text = mh.ToString();
			minWidth.Text = mw.ToString();
		}

		void hdrHeight_TextChanged(object sender, EventArgs e)
		{
			int headerheight = 0;
			if (int.TryParse(hdrHeight.Text, out headerheight))
			{
				if (headerheight < 1)
				{
					hdrHeight.Text = "";
					headerheight = -1;
				}
				g.HeaderHeight = headerheight;
			}
		}

		void rowHeight_TextChanged(object sender, EventArgs e)
		{
			int rowheight = 0;
			if (int.TryParse(rowHeight.Text, out rowheight))
			{
				if (rowheight < 1)
				{
					rowHeight.Text = "";
					rowheight = -1;
				}
				g.RowHeight = rowheight;
			}
		}

		void rowSelect_SelectedIndexChanged(object sender, EventArgs e)
		{
			g.SelectionMode = (RowSelect)Enum.Parse(typeof(RowSelect), rowSelect.SelectedValue);
		}

		void gridTheme_SelectedIndexChanged(object sender, EventArgs e)
		{
			g.Theme = (GridThemeName)Enum.Parse(typeof(GridThemeName), gridTheme.SelectedValue);
		}

		void numFrozen_SelectedIndexChanged(object sender, EventArgs e)
		{
			g.FrozenLeftColumns = int.Parse(numFrozen.SelectedValue);
			//Because the first "id" column is hidden, we have to account for that here
			//as FrozenLeftcolumns includes hidden columns too.
			if (g.FrozenLeftColumns > 0)
				g.FrozenLeftColumns++;
		}

		void entrAction_SelectedIndexChanged(object sender, EventArgs e)
		{
			g.EnterKeyAction = (GridEnterOption)Enum.Parse(typeof(GridEnterOption), entrAction.SelectedValue);
		}

		void showHeaders_CheckedChanged(object sender, EventArgs e)
		{
			g.ShowHeader = showHeaders.Checked;
		}

		void showToolbar_CheckedChanged(object sender, EventArgs e)
		{
			g.ShowToolbar = showToolbar.Checked;
		}

		void showCellTips_CheckedChanged(object sender, EventArgs e)
		{
			g.ShowCellToolTips = showCellTips.Checked;
		}

		void allowSort_CheckedChanged(object sender, EventArgs e)
		{
			g.AllowSorting = allowSort.Checked;
		}

		void gridResize_CheckedChanged(object sender, EventArgs e)
		{
			g.Resizable = gridResize.Checked ? GridResizeOption.Both : GridResizeOption.Fixed;
			minSizes.Visible = gridResize.Checked;
		}

		void setupGridButtons()
		{
			int count = 0;
			foreach (GridMode gm in Enum.GetValues(typeof(GridMode)))
			{
				Button b = new Button();
				b.Width = new Unit("130px");
				b.Style.Add("margin", "0px 3px 0px 3px");
				b.ID = "Grid" + gm.ToString();
				b.Text = gm.ToString();
				b.Click += new EventHandler(Grid_Click);
				if (gm == g.Mode)
				{
					GridButtonArea.Controls.Add(new LiteralControl("<span style='padding:3px 1px 10px 1px;margin-bottom:25px; background-color:blue;'>"));
					GridButtonArea.Controls.Add(b);
					GridButtonArea.Controls.Add(new LiteralControl("</span>"));
				}
				else
					GridButtonArea.Controls.Add(b);
				if(++count % 4 == 0)
					GridButtonArea.Controls.Add(new LiteralControl("<div style='height:5px'></div>"));
			}
		}
		void Grid_Click(object sender, EventArgs e)
		{
			Button b = sender as Button;
			if (b != null)
			{
				GridMode m = (GridMode)Enum.Parse(typeof(GridMode), b.ID.Substring(4));
				g.Mode = m;
			}
			GridButtonArea.Controls.Clear();
			setupGridButtons();
		}

		public Nitobi.Grid Grid { get { return g; } }

		void setupComboButtons()
		{
			foreach (ComboMode cm in Enum.GetValues(typeof(ComboMode)))
			{
				Button b = new Button();
				b.Width = new Unit("100px");
				b.Style.Add("margin", "0px 3px 0px 3px");
				b.ID = "combo" + cm.ToString();
				b.Text = cm.ToString();
				b.Click += new EventHandler(Combo_Click);
				if (cm == c.Mode)
				{
					ButtonArea.Controls.Add(new LiteralControl("<span style='padding:3px 1px 10px 1px;margin-bottom:25px; background-color:blue;'>"));
					ButtonArea.Controls.Add(b);
					ButtonArea.Controls.Add(new LiteralControl("</span>"));
				}
				else
					ButtonArea.Controls.Add(b);
			}
		}

		void Combo_Click(object sender, EventArgs e)
		{
			Button b = sender as Button;
			if (b != null)
			{
				ComboMode m = (ComboMode)Enum.Parse(typeof(ComboMode), b.ID.Substring(5));
				c.Mode = m;
			}
			ButtonArea.Controls.Clear();
			setupComboButtons();
		}

		public Nitobi.Combo Combo { get { return c; } }
	}
}