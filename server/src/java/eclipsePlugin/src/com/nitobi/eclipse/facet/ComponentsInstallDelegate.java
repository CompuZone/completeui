/**
 *  
 */
package com.nitobi.eclipse.facet;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;

import org.eclipse.wst.common.componentcore.ComponentCore;
import org.eclipse.wst.common.componentcore.resources.IVirtualComponent;
import org.eclipse.wst.common.componentcore.resources.IVirtualFolder;
import org.eclipse.wst.common.project.facet.core.IDelegate;
import org.eclipse.wst.common.project.facet.core.IProjectFacetVersion;

/**
 * @author mhan
 *
 */
public class ComponentsInstallDelegate implements IDelegate 
{
	public void execute( IProject project, IProjectFacetVersion fv,
			Object config, IProgressMonitor monitor ) throws CoreException
			{
				IVirtualComponent vc = ComponentCore.createComponent( project );
		        IVirtualFolder vf = vc.getRootFolder();
		        IFolder webRoot = (IFolder) vf.getUnderlyingFolder();
		        IFolder resourcesFolder = webRoot.getFolder("resources");
		        if (!resourcesFolder.exists())
		        {
		        	resourcesFolder.create(false, false, monitor);
		        }
		        
		        Utility.copyCui(resourcesFolder.getFolder("nitobi"), monitor);
			}
}
