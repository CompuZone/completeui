package com.nitobi.eclipse.snippet;

import org.eclipse.wst.common.snippets.ui.DefaultSnippetInsertion;
import org.eclipse.wst.common.snippets.core.ISnippetItem;
import org.eclipse.ui.texteditor.ITextEditor;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.FindReplaceDocumentAdapter;
import org.eclipse.swt.dnd.DragSourceEvent;
import org.eclipse.ui.PlatformUI;

/**
 * @author mhan
 *
 */
public class NitobiSnippet extends DefaultSnippetInsertion 
{
	public NitobiSnippet()
	{
		super();
	}
	
	public void dragSetData(DragSourceEvent event, ISnippetItem item)
	{
		ITextEditor activeEditor = (ITextEditor) PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage().getActiveEditor();
		IDocument activeDocument = activeEditor.getDocumentProvider().getDocument(activeEditor.getEditorInput());
		
		FindReplaceDocumentAdapter finder = new FindReplaceDocumentAdapter(activeDocument);
		try
		{
			if (finder.find(0, "<%@\\s*taglib\\s*uri=\"http://www.nitobi.com\"\\s*", true, false, false, true) == null)
			{
				String oldContent = activeDocument.get();
				String newContent = "<%@ taglib uri=\"http://www.nitobi.com\" prefix=\"n\" %>" + oldContent;
				
				activeDocument.set(newContent);
			}
		}
		catch (org.eclipse.jface.text.BadLocationException e)
		{
			// The only way the zero position of a document doesn't exist is
			// if the document is empty.  In that case, we should prepend
			// the taglib directive.
			activeDocument.set("<%@ taglib uri=\"http://www.nitobi.com\" prefix=\"n\" %>");
		}
		super.dragSetData(event, item);
	}	
}
