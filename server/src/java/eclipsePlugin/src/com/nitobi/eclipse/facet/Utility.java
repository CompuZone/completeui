package com.nitobi.eclipse.facet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Status;
import org.eclipse.wst.common.componentcore.ComponentCore;
import org.eclipse.wst.common.componentcore.resources.IVirtualComponent;
import org.eclipse.wst.common.componentcore.resources.IVirtualFolder;
import org.osgi.framework.Bundle;

public class Utility 
{
	public static void copyFile(IPath src, IFile dest) throws CoreException
	{
		Bundle nitobiBundle = NitobiPlugin.getDefault().getBundle();
		try
		{
			dest.create(FileLocator.openStream(nitobiBundle,src,false), false, null);
		}
		catch (java.io.IOException e)
		{
			Status stats = new Status( IStatus.ERROR, NitobiPlugin.PLUGIN_ID, 0, e.getMessage(), e );
			throw new CoreException(stats);
		}
	}
	
	public static IFolder getWebInfLib(IProject project)
	{
		IVirtualComponent vc = ComponentCore.createComponent( project );
		IVirtualFolder vf = vc.getRootFolder().getFolder( "WEB-INF/lib" );
		return (IFolder) vf.getUnderlyingFolder();
	}
	
	public static void copyCui(IFolder resourcesFolder, IProgressMonitor monitor) throws CoreException
	{
		if (!resourcesFolder.exists())
        {
        	resourcesFolder.create(false, false, monitor);
        }
        copyFile(new Path("libs/cui.zip"), resourcesFolder.getFile("cui.zip"));
        
        File archiveFile = resourcesFolder.getFile("cui.zip").getLocation().toFile();
        File destDir = resourcesFolder.getLocation().toFile();
        
        unzipArchive(archiveFile, destDir);
        resourcesFolder.getFile("cui.zip").delete(false, monitor);
    	resourcesFolder.refreshLocal(IResource.DEPTH_ONE, monitor);
        /*try
        {
        	ZipFile zipFile = new ZipFile(archiveFile, ZipFile.OPEN_READ);
        	Enumeration zipFileEntries = zipFile.entries();
        	
        	while (zipFileEntries.hasMoreElements())
        	{
        		ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
        		File destFile = new File(destDir, entry.getName());
        		
        		File destParent = destFile.getParentFile();
        		
        		destParent.mkdirs();
        		
        		if (!entry.isDirectory())
        		{
        			BufferedInputStream is = new BufferedInputStream(zipFile.getInputStream(entry));
        			int currentByte;
        			byte data[] = new byte[2048];
        			FileOutputStream fos = new FileOutputStream(destFile);
        			BufferedOutputStream dest = new BufferedOutputStream(fos, 2048);
        			
        			while ((currentByte = is.read(data, 0, 2048)) != -1)
        			{
        				dest.write(data, 0, currentByte);
        			}
        			dest.flush();
        			dest.close();
        			is.close();
        		}
        	}
        	zipFile.close();
        	
        	resourcesFolder.getFile("cui.zip").delete(false, monitor);
        	resourcesFolder.refreshLocal(IResource.DEPTH_ONE, monitor);
        	
        }
        catch (java.io.IOException e)
        {
        	Status stats = new Status( IStatus.ERROR, NitobiPlugin.PLUGIN_ID, 0, e.getMessage(), e );
			throw new CoreException(stats);
        }*/
	}
	
	public static void unzipArchive(File src, File dest) throws CoreException
	{
		try
        {
        	ZipFile zipFile = new ZipFile(src, ZipFile.OPEN_READ);
        	Enumeration zipFileEntries = zipFile.entries();
        	
        	while (zipFileEntries.hasMoreElements())
        	{
        		ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
        		File destFile = new File(dest, entry.getName());
        		
        		File destParent = destFile.getParentFile();
        		
        		destParent.mkdirs();
        		
        		if (!entry.isDirectory())
        		{
        			BufferedInputStream is = new BufferedInputStream(zipFile.getInputStream(entry));
        			int currentByte;
        			byte data[] = new byte[2048];
        			FileOutputStream fos = new FileOutputStream(destFile);
        			BufferedOutputStream os = new BufferedOutputStream(fos, 2048);
        			
        			while ((currentByte = is.read(data, 0, 2048)) != -1)
        			{
        				os.write(data, 0, currentByte);
        			}
        			os.flush();
        			os.close();
        			is.close();
        		}
        	}
        	zipFile.close();        	
        }
        catch (java.io.IOException e)
        {
        	Status stats = new Status( IStatus.ERROR, NitobiPlugin.PLUGIN_ID, 0, e.getMessage(), e );
			throw new CoreException(stats);
        }
	}
}
