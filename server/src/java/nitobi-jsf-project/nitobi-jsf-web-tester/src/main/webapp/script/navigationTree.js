function populateFrame(frame, url) {
    parent.frames[frame].document.open();
    parent.frames[frame].document.write("<html><head><title>content frame</title></head><body id=\"contentBody\"><div id=\"content\">Loading...</div></body></html>");
    parent.frames[frame].document.close();
    
    parent.document.getElementById(frame).src = url;
}
