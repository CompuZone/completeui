/**
 * 
 */
package com.nitobi.eclipse.facet;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.common.project.facet.core.IDelegate;
import org.eclipse.wst.common.project.facet.core.IProjectFacetVersion;

/**
 * @author mhan
 *
 */
public class TaglibInstallDelegate implements IDelegate {

	/* (non-Javadoc)
	 * @see org.eclipse.wst.common.project.facet.core.IDelegate#execute(org.eclipse.core.resources.IProject, org.eclipse.wst.common.project.facet.core.IProjectFacetVersion, java.lang.Object, org.eclipse.core.runtime.IProgressMonitor)
	 */
	public void execute(IProject project, IProjectFacetVersion fv,
			Object config, IProgressMonitor monitor) throws CoreException 
			{
				IFolder webInfLibFolder = Utility.getWebInfLib(project);
		        IFile destination = webInfLibFolder.getFile("nitobi-cui-taglib.jar");
				
		        Utility.copyFile(new Path("libs/nitobi-cui-taglib.jar"), destination);
			}

}
