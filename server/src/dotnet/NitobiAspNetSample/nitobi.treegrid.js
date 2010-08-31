if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.lang.defineNs("nitobi.treegrid");
nitobi.treegrid.build="7054";
nitobi.treegrid.version="3.5.7054";
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Scrollbar=function(){
this.uid="scroll"+nitobi.base.getUid();
};
nitobi.ui.Scrollbar.prototype.render=function(){
};
nitobi.ui.Scrollbar.prototype.attachToParent=function(_1,_2,_3){
this.UiContainer=_1;
this.element=_2||nitobi.html.getFirstChild(this.UiContainer);
if(this.element==null){
this.render();
}
this.surface=_3||nitobi.html.getFirstChild(this.element);
this.element.onclick="";
this.element.onmouseover="";
this.element.onmouseout="";
this.element.onscroll="";
nitobi.html.attachEvent(this.element,"scroll",this.scrollByUser,this);
};
nitobi.ui.Scrollbar.prototype.align=function(){
var vs=document.getElementById("vscroll"+this.uid);
var dx=-1;
if(nitobi.browser.MOZ){
dx=-3;
}
nitobi.drawing.align(vs,this.UiContainer.childNodes[0],269484288,-42,0,24,dx,false);
};
nitobi.ui.Scrollbar.prototype.scrollByUser=function(){
this.fire("ScrollByUser",this.getScrollPercent());
};
nitobi.ui.Scrollbar.prototype.setScroll=function(_6){
};
nitobi.ui.Scrollbar.prototype.getScrollPercent=function(){
};
nitobi.ui.Scrollbar.prototype.setRange=function(_7){
};
nitobi.ui.Scrollbar.prototype.getWidth=function(){
return nitobi.html.getScrollBarWidth();
};
nitobi.ui.Scrollbar.prototype.getHeight=function(){
return nitobi.html.getScrollBarWidth();
};
nitobi.ui.Scrollbar.prototype.fire=function(_8,_9){
return nitobi.event.notify(_8+this.uid,_9);
};
nitobi.ui.Scrollbar.prototype.subscribe=function(_a,_b,_c){
if(typeof (_c)=="undefined"){
_c=this;
}
return nitobi.event.subscribe(_a+this.uid,nitobi.lang.close(_c,_b));
};
nitobi.ui.VerticalScrollbar=function(){
this.uid="vscroll"+nitobi.base.getUid();
};
nitobi.lang.extend(nitobi.ui.VerticalScrollbar,nitobi.ui.Scrollbar);
nitobi.ui.VerticalScrollbar.prototype.setScrollPercent=function(_d){
this.element.scrollTop=(this.surface.offsetHeight-this.element.offsetHeight)*_d;
return false;
};
nitobi.ui.VerticalScrollbar.prototype.getScrollPercent=function(){
return (this.element.scrollTop/(this.surface.offsetHeight-this.element.offsetHeight));
};
nitobi.ui.VerticalScrollbar.prototype.setRange=function(_e){
var st=this.element.scrollTop;
this.surface.style.height=Math.floor(this.element.offsetHeight/_e)+"px";
this.element.scrollTop=st;
this.element.scrollTop=this.element.scrollTop;
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.HorizontalScrollbar=function(){
this.uid="hscroll"+nitobi.base.getUid();
};
nitobi.lang.extend(nitobi.ui.HorizontalScrollbar,nitobi.ui.Scrollbar);
nitobi.ui.HorizontalScrollbar.prototype.getScrollPercent=function(){
return (this.element.scrollLeft/(this.surface.clientWidth-this.element.clientWidth));
};
nitobi.ui.HorizontalScrollbar.prototype.setScrollPercent=function(_10){
this.element.scrollLeft=(this.surface.clientWidth-this.element.clientWidth)*_10;
return false;
};
nitobi.ui.HorizontalScrollbar.prototype.setRange=function(_11){
this.surface.style.width=Math.floor(this.element.offsetWidth/_11)+"px";
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IDataBoundList=function(){
};
nitobi.ui.IDataBoundList.prototype.getGetHandler=function(){
return this.getHandler;
};
nitobi.ui.IDataBoundList.prototype.setGetHandler=function(_12){
this.column.getModel().setAttribute("GetHandler",_12);
this.getHandler=_12;
};
nitobi.ui.IDataBoundList.prototype.getDataSourceId=function(){
return this.datasourceId;
};
nitobi.ui.IDataBoundList.prototype.setDataSourceId=function(_13){
this.column.getModel().setAttribute("DatasourceId",_13);
this.datasourceId=_13;
};
nitobi.ui.IDataBoundList.prototype.getDisplayFields=function(){
return this.displayFields;
};
nitobi.ui.IDataBoundList.prototype.setDisplayFields=function(_14){
this.column.getModel().setAttribute("DisplayFields",_14);
this.displayFields=_14;
};
nitobi.ui.IDataBoundList.prototype.getValueField=function(){
return this.valueField;
};
nitobi.ui.IDataBoundList.prototype.setValueField=function(_15){
this.column.getModel().setAttribute("ValueField",_15);
this.valueField=_15;
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.CacheMap=function(){
this.tail=null;
this.debug=new Array();
};
nitobi.collections.CacheMap.prototype.insert=function(low,_17){
low=Number(low);
_17=Number(_17);
this.debug.push("insert("+low+","+_17+")");
var _18=new nitobi.collections.CacheNode(low,_17);
if(this.head==null){
this.debug.push("empty cache, adding first node");
this.head=_18;
this.tail=_18;
}else{
var n=this.head;
while(n!=null&&low>n.high+1){
n=n.next;
}
if(n==null){
this.debug.push("appending node to end");
this.tail.next=_18;
_18.prev=this.tail;
this.tail=_18;
}else{
this.debug.push("inserting new node before "+n.toString());
if(n.prev!=null){
_18.prev=n.prev;
n.prev.next=_18;
}
_18.next=n;
n.prev=_18;
while(_18.mergeNext()){
}
if(_18.prev==null){
this.head=_18;
}
if(_18.next==null){
this.tail=_18;
}
}
}
};
nitobi.collections.CacheMap.prototype.remove=function(low,_1b){
low=Number(low);
_1b=Number(_1b);
this.debug.push("insert("+low+","+_1b+")");
if(this.head==null){
}else{
if(_1b<this.head.low||low>this.tail.high){
return;
}
var _1c=this.head;
while(_1c!=null&&low>_1c.high){
_1c=_1c.next;
}
if(_1c==null){
this.debug.push("the range was not found");
}else{
var end=_1c;
var _1e=null;
while(end!=null&&_1b>end.high){
if((end.next!=null&&_1b<end.next.low)||end.next==null){
break;
}
_1e=end.next;
if(end!=_1c){
this.removeNode(end);
}
end=_1e;
}
if(_1c!=end){
if(_1b>=end.high){
this.removeNode(end);
}
if(low<=_1c.low){
this.removeNode(_1c);
}
}else{
if(_1c.low>=low&&_1c.high<=_1b){
this.removeNode(_1c);
return;
}else{
if(low>_1c.low&&_1b<_1c.high){
var _1f=_1c.low;
var _20=_1c.high;
this.removeNode(_1c);
this.insert(_1f,low-1);
this.insert(_1b+1,_20);
return;
}
}
}
if(end!=null&&_1b<end.high){
end.low=_1b+1;
}
if(_1c!=null&&low>_1c.low){
_1c.high=low-1;
}
}
}
};
nitobi.collections.CacheMap.prototype.gaps=function(low,_22){
var g=new Array();
var n=this.head;
if(n==null||n.low>_22||this.tail.high<low){
g.push(new nitobi.collections.Range(low,_22));
return g;
}
var _25=0;
while(n!=null&&n.high<low){
_25=n.high+1;
n=n.next;
}
if(n!=null){
do{
if(g.length==0){
if(low<n.low){
g.push(new nitobi.collections.Range(Math.max(low,_25),Math.min(n.low-1,_22)));
}
}
if(_22>n.high){
if(n.next==null||n.next.low>_22){
g.push(new nitobi.collections.Range(n.high+1,_22));
}else{
g.push(new nitobi.collections.Range(n.high+1,n.next.low-1));
}
}
n=n.next;
}while(n!=null&&n.high<_22);
}else{
g.push(new nitobi.collections.Range(this.tail.high+1,_22));
}
return g;
};
nitobi.collections.CacheMap.prototype.ranges=function(low,_27){
var g=new Array();
var n=this.head;
if(n==null||n.low>_27||this.tail.high<low){
return g;
}
while(n!=null&&n.high<low){
minLow=n.high+1;
n=n.next;
}
if(n!=null){
do{
g.push(new nitobi.collections.Range(n.low,n.high));
n=n.next;
}while(n!=null&&n.high<_27);
}
return g;
};
nitobi.collections.CacheMap.prototype.gapsString=function(low,_2b){
var gs=this.gaps(low,_2b);
var a=new Array();
for(var i=0;i<gs.length;i++){
a.push(gs[i].toString());
}
return a.join(",");
};
nitobi.collections.CacheMap.prototype.removeNode=function(_2f){
if(_2f.prev!=null){
_2f.prev.next=_2f.next;
}else{
this.head=_2f.next;
}
if(_2f.next!=null){
_2f.next.prev=_2f.prev;
}else{
this.tail=_2f.prev;
}
_2f=null;
};
nitobi.collections.CacheMap.prototype.toString=function(){
var n=this.head;
var s=new Array();
while(n!=null){
s.push(n.toString());
n=n.next;
}
return s.join(",");
};
nitobi.collections.CacheMap.prototype.flush=function(){
var _32=this.head;
while(Boolean(_32)){
var _33=_32.next;
delete (_32);
_32=_33;
}
this.head=null;
this.tail=null;
};
nitobi.collections.CacheMap.prototype.insertIntoRange=function(_34){
var n=this.head;
var inc=0;
while(n!=null){
if(_34>=n.low&&_34<=n.high){
inc=1;
n.high+=inc;
}else{
n.low+=inc;
n.high+=inc;
}
n=n.next;
}
if(inc==0){
this.insert(_34,_34);
}
};
nitobi.collections.CacheMap.prototype.removeFromRange=function(_37){
var n=this.head;
var inc=0;
while(n!=null){
if(_37>=n.low&&_37<=n.high){
inc=-1;
if(n.low==n.high){
this.remove(_37,_37);
}else{
n.high+=inc;
}
}else{
n.low+=inc;
n.high+=inc;
}
n=n.next;
}
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.BlockMap=function(){
this.head=null;
this.tail=null;
this.debug=new Array();
};
nitobi.lang.extend(nitobi.collections.BlockMap,nitobi.collections.CacheMap);
nitobi.collections.BlockMap.prototype.insert=function(low,_3b){
low=Number(low);
_3b=Number(_3b);
this.debug.push("insert("+low+","+_3b+")");
if(this.head==null){
var _3c=new nitobi.collections.CacheNode(low,_3b);
this.debug.push("empty cache, adding first node");
this.head=_3c;
this.tail=_3c;
}else{
var n=this.head;
while(n!=null&&low>n.high){
n=n.next;
}
if(n==null){
var _3c=new nitobi.collections.CacheNode(low,_3b);
this.debug.push("appending node to end");
this.tail.next=_3c;
_3c.prev=this.tail;
this.tail=_3c;
}else{
this.debug.push("inserting new node into or before "+n.toString());
if(low<n.low||_3b>n.high){
if(low<n.low){
var _3c=new nitobi.collections.CacheNode(low,_3b);
_3c.prev=n.prev;
_3c.next=n;
if(n.prev!=null){
n.prev.next=_3c;
}
n.prev=_3c;
_3c.high=Math.min(_3c.high,n.low-1);
}else{
var _3c=new nitobi.collections.CacheNode(n.high+1,_3b);
_3c.prev=n;
_3c.next=n.next;
if(n.next!=null){
n.next.prev=_3c;
_3c.high=Math.min(_3b,_3c.next.low-1);
}
n.next=_3c;
}
if(_3c.prev==null){
this.head=_3c;
}
if(_3c.next==null){
this.tail=_3c;
}
}
}
}
};
nitobi.collections.BlockMap.prototype.blocks=function(low,_3f){
var g=new Array();
var n=this.head;
if(n==null||n.low>_3f||this.tail.high<low){
g.push(new nitobi.collections.Range(low,_3f));
return g;
}
var _42=0;
while(n!=null&&n.high<low){
_42=n.high+1;
n=n.next;
}
if(n!=null){
do{
if(g.length==0){
if(low<n.low){
g.push(new nitobi.collections.Range(Math.max(low,_42),Math.min(n.low-1,_3f)));
}
}
if(_3f>n.high){
if(n.next==null||n.next.low>_3f){
g.push(new nitobi.collections.Range(n.high+1,_3f));
}else{
g.push(new nitobi.collections.Range(n.high+1,n.next.low-1));
}
}
n=n.next;
}while(n!=null&&n.high<_3f);
}else{
g.push(new nitobi.collections.Range(this.tail.high+1,_3f));
}
return g;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.CellSet=function(_43,_44,_45,_46,_47){
this.owner=_43;
if(_44!=null&&_45!=null&&_46!=null&&_47!=null){
this.setRange(_44,_45,_46,_47);
}else{
this.setRange(0,0,0,0);
}
};
nitobi.collections.CellSet.prototype.toString=function(){
var str="";
for(var i=this._topRow;i<=this._bottomRow;i++){
str+="[";
for(var j=this._leftColumn;j<=this._rightColumn;j++){
str+="("+i+","+j+")";
}
str+="]";
}
return str;
};
nitobi.collections.CellSet.prototype.setRange=function(_4b,_4c,_4d,_4e){
this._startRow=_4b;
this._startColumn=_4c;
this._endRow=_4d;
this._endColumn=_4e;
this._leftColumn=Math.min(_4c,_4e);
this._rightColumn=Math.max(_4c,_4e);
this._topRow=Math.min(_4b,_4d);
this._bottomRow=Math.max(_4b,_4d);
};
nitobi.collections.CellSet.prototype.changeStartCell=function(_4f,_50){
this._startRow=_4f;
this._startColumn=_50;
this._leftColumn=Math.min(_50,this._endColumn);
this._rightColumn=Math.max(_50,this._endColumn);
this._topRow=Math.min(_4f,this._endRow);
this._bottomRow=Math.max(_4f,this._endRow);
};
nitobi.collections.CellSet.prototype.changeEndCell=function(_51,_52){
this._endRow=_51;
this._endColumn=_52;
this._leftColumn=Math.min(_52,this._startColumn);
this._rightColumn=Math.max(_52,this._startColumn);
this._topRow=Math.min(_51,this._startRow);
this._bottomRow=Math.max(_51,this._startRow);
};
nitobi.collections.CellSet.prototype.getRowCount=function(){
return this._bottomRow-this._topRow+1;
};
nitobi.collections.CellSet.prototype.getColumnCount=function(){
return this._rightColumn-this._leftColumn+1;
};
nitobi.collections.CellSet.prototype.getCoords=function(){
return {"top":new nitobi.drawing.Point(this._leftColumn,this._topRow),"bottom":new nitobi.drawing.Point(this._rightColumn,this._bottomRow)};
};
nitobi.collections.CellSet.prototype.getCellObjectByOffset=function(_53,_54){
return this.owner.getCellObject(this._topRow+_53,this._leftColumn+_54);
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.CacheNode=function(low,_56){
this.low=low;
this.high=_56;
this.next=null;
this.prev=null;
};
nitobi.collections.CacheNode.prototype.isIn=function(val){
return ((val>=this.low)&&(val<=this.high));
};
nitobi.collections.CacheNode.prototype.mergeNext=function(){
var _58=this.next;
if(_58!=null&&_58.low<=this.high+1){
this.high=Math.max(this.high,_58.high);
this.low=Math.min(this.low,_58.low);
var _59=_58.next;
this.next=_59;
if(_59!=null){
_59.prev=this;
}
_58.clear();
return true;
}else{
return false;
}
};
nitobi.collections.CacheNode.prototype.clear=function(){
this.next=null;
this.prev=null;
};
nitobi.collections.CacheNode.prototype.toString=function(){
return "["+this.low+","+this.high+"]";
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.Range=function(low,_5b){
this.low=low;
this.high=_5b;
};
nitobi.collections.Range.prototype.isIn=function(val){
return ((val>=this.low)&&(val<=this.high));
};
nitobi.collections.Range.prototype.toString=function(){
return "["+this.low+","+this.high+"]";
};
nitobi.prepare=function(){
ebagdl=1222127878492;
ebagd1=1224719878492;
s="var d = new Date().getTime();if ((d<"+ebagdl+") || (d>"+ebagd1+")) {alert('Evaluation period has expired.\\n\\nPlease notify your system administrator.\\n\\nPurchase Information:\\n       NITOBI SOFTWARE\\n\\n       www.nitobi.com\\n       sales@nitobi.com         \\n       Telephone: (604) 685-9287\\n       Fax: (604) 648-9090\\n       Toll-Free: 1-866-6EB-APPS\\n                      (1-866-632-2777)');}";
eval(s);
};
nitobi.lang.defineNs("nitobi.grid");
if(false){
nitobi.grid=function(){
};
}
nitobi.grid.PAGINGMODE_NONE="none";
nitobi.grid.PAGINGMODE_STANDARD="standard";
nitobi.grid.PAGINGMODE_LIVESCROLLING="livescrolling";
nitobi.grid.TreeGrid=function(uid){
nitobi.prepare();
EBAAutoRender=false;
this.disposal=[];
this.uid=uid||nitobi.base.getUid();
this.modelNodes={};
if(nitobi.browser.IE6){
nitobi.html.addUnload(nitobi.lang.close(this,this.dispose));
}
this.subscribe("AttachToParent",this.initialize);
this.subscribe("DataReady",this.layout);
this.subscribe("AfterCellEdit",this.autoSave);
this.subscribe("AfterRowInsert",this.autoSave);
this.subscribe("AfterRowDelete",this.autoSave);
this.subscribe("AfterPaste",this.autoSave);
this.subscribe("AfterPaste",this.focus);
this.subscribeOnce("HtmlReady",this.adjustHorizontalScrollBars);
this.subscribe("AfterGridResize",this.adjustHorizontalScrollBars);
this.events=[];
this.scrollerEvents=[];
this.cellEvents=[];
this.headerEvents=[];
this.keyEvents=[];
};
nitobi.lang.implement(nitobi.grid.TreeGrid,nitobi.Object);
var ntb_treegridp=nitobi.grid.TreeGrid.prototype;
ntb_treegridp.properties={id:{n:"ID",t:"",d:"",p:"j"},selection:{n:"Selection",t:"",d:null,p:"j"},bound:{n:"Bound",t:"",d:false,p:"j"},registeredto:{n:"RegisteredTo",t:"",d:true,p:"j"},licensekey:{n:"LicenseKey",t:"",d:true,p:"j"},columns:{n:"Columns",t:"",d:true,p:"j"},columnsdefined:{n:"ColumnsDefined",t:"",d:false,p:"j"},declaration:{n:"Declaration",t:"",d:"",p:"j"},datasource:{n:"Datasource",t:"",d:true,p:"j"},keygenerator:{n:"KeyGenerator",t:"",d:"",p:"j"},version:{n:"Version",t:"",d:3.01,p:"j"},cellclicked:{n:"CellClicked",t:"",d:false,p:"j"},uid:{n:"uid",t:"s",d:"",p:"x"},datasourceid:{n:"DatasourceId",t:"s",d:"",p:"x"},currentpageindex:{n:"CurrentPageIndex",t:"i",d:0,p:"x"},columnindicatorsenabled:{n:"ColumnIndicatorsEnabled",t:"b",d:true,p:"x"},rowindicatorsenabled:{n:"RowIndicatorsEnabled",t:"b",d:false,p:"x"},toolbarenabled:{n:"ToolbarEnabled",t:"b",d:true,p:"x"},toolbarheight:{n:"ToolbarHeight",t:"i",d:25,p:"x"},rowhighlightenabled:{n:"RowHighlightEnabled",t:"b",d:false,p:"x"},rowselectenabled:{n:"RowSelectEnabled",t:"b",d:false,p:"x"},gridresizeenabled:{n:"GridResizeEnabled",t:"b",d:false,p:"x"},widthfixed:{n:"WidthFixed",t:"b",d:false,p:"x"},heightfixed:{n:"HeightFixed",t:"b",d:false,p:"x"},minwidth:{n:"MinWidth",t:"i",d:20,p:"x"},minheight:{n:"MinHeight",t:"i",d:0,p:"x"},singleclickeditenabled:{n:"SingleClickEditEnabled",t:"b",d:false,p:"x"},autokeyenabled:{n:"AutoKeyEnabled",t:"b",d:false,p:"x"},tooltipsenabled:{n:"TooltipsEnabled",t:"b",d:false,p:"x"},entertab:{n:"EnterTab",t:"s",d:"down",p:"x"},hscrollbarenabled:{n:"HScrollbarEnabled",t:"b",d:true,p:"x"},vscrollbarenabled:{n:"VScrollbarEnabled",t:"b",d:true,p:"x"},rowheight:{n:"RowHeight",t:"i",d:23,p:"x"},headerheight:{n:"HeaderHeight",t:"i",d:23,p:"x"},top:{n:"top",t:"i",d:0,p:"x"},left:{n:"left",t:"i",d:0,p:"x"},scrollbarwidth:{n:"scrollbarWidth",t:"i",d:22,p:"x"},scrollbarheight:{n:"scrollbarHeight",t:"i",d:22,p:"x"},freezetop:{n:"freezetop",t:"i",d:0,p:"x"},frozenleftcolumncount:{n:"FrozenLeftColumnCount",t:"i",d:0,p:"x"},rowinsertenabled:{n:"RowInsertEnabled",t:"b",d:true,p:"x"},rowdeleteenabled:{n:"RowDeleteEnabled",t:"b",d:true,p:"x"},asynchronous:{n:"Asynchronous",t:"b",d:true,p:"x"},autosaveenabled:{n:"AutoSaveEnabled",t:"b",d:false,p:"x"},columncount:{n:"ColumnCount",t:"i",d:0,p:"x"},rowsperpage:{n:"RowsPerPage",t:"i",d:20,p:"x"},forcevalidate:{n:"ForceValidate",t:"b",d:false,p:"x"},height:{n:"Height",t:"i",d:100,p:"x"},lasterror:{n:"LastError",t:"s",d:"",p:"x"},multirowselectenabled:{n:"MultiRowSelectEnabled",t:"b",d:false,p:"x"},multirowselectfield:{n:"MultiRowSelectField",t:"s",d:"",p:"x"},multirowselectattr:{n:"MultiRowSelectAttr",t:"s",d:"",p:"x"},gethandler:{n:"GetHandler",t:"s",d:"",p:"x"},savehandler:{n:"SaveHandler",t:"s",d:"",p:"x"},width:{n:"Width",t:"i",d:"",p:"x"},pagingmode:{n:"PagingMode",t:"s",d:"LiveScrolling",p:"x"},datamode:{n:"DataMode",t:"s",d:"Caching",p:"x"},rendermode:{n:"RenderMode",t:"s",d:"",p:"x"},copyenabled:{n:"CopyEnabled",t:"b",d:true,p:"x"},pasteenabled:{n:"PasteEnabled",t:"b",d:true,p:"x"},sortenabled:{n:"SortEnabled",t:"b",d:true,p:"x"},sortmode:{n:"SortMode",t:"s",d:"default",p:"x"},editmode:{n:"EditMode",t:"b",d:false,p:"x"},expanding:{n:"Expanding",t:"b",d:false,p:"x"},theme:{n:"Theme",t:"s",d:"nitobi",p:"x"},cellborder:{n:"CellBorder",t:"i",d:0,p:"x"},dragfillenabled:{n:"DragFillEnabled",t:"b",d:true,p:"x"},rootcolumns:{n:"RootColumns",t:"s",d:"root",p:"x"},viewablewidth:{n:"ViewableWidth",t:"i",d:0,p:"x"},groupoffset:{n:"GroupOffset",t:"i",d:0,p:"x"},effectsenabled:{n:"EffectsEnabled",t:"b",d:false,p:"x"},cellborderx:{n:"CellBorderX",t:"i",d:0,p:"x"},cellbordery:{n:"CellBorderY",t:"i",d:0,p:"x"},oncellclickevent:{n:"OnCellClickEvent",t:"",p:"e"},onbeforecellclickevent:{n:"OnBeforeCellClickEvent",t:"",p:"e"},oncelldblclickevent:{n:"OnCellDblClickEvent",t:"",p:"e"},ondatareadyevent:{n:"OnDataReadyEvent",t:"",p:"e"},onhtmlreadyevent:{n:"OnHtmlReadyEvent",t:"",p:"e"},ondatarenderedevent:{n:"OnDataRenderedEvent",t:"",p:"e"},oncelldoubleclickevent:{n:"OnCellDoubleClickEvent",t:"",p:"e"},onafterloaddatapageevent:{n:"OnAfterLoadDataPageEvent",t:"",p:"e"},onbeforeloaddatapageevent:{n:"OnBeforeLoadDataPageEvent",t:"",p:"e"},onafterloadpreviouspageevent:{n:"OnAfterLoadPreviousPageEvent",t:"",p:"e"},onbeforeloadpreviouspageevent:{n:"OnBeforeLoadPreviousPageEvent",t:"",p:"e"},onafterloadnextpageevent:{n:"OnAfterLoadNextPageEvent",t:"",p:"e"},onbeforeloadnextpageevent:{n:"OnBeforeLoadNextPageEvent",t:"",p:"e"},onbeforecelleditevent:{n:"OnBeforeCellEditEvent",t:"",p:"e"},onaftercelleditevent:{n:"OnAfterCellEditEvent",t:"",p:"e"},onbeforerowinsertevent:{n:"OnBeforeRowInsertEvent",t:"",p:"e"},onafterrowinsertevent:{n:"OnAfterRowInsertEvent",t:"",p:"e"},onbeforesortevent:{n:"OnBeforeSortEvent",t:"",p:"e"},onaftersortevent:{n:"OnAfterSortEvent",t:"",p:"e"},onbeforerefreshevent:{n:"OnBeforeRefreshEvent",t:"",p:"e"},onafterrefreshevent:{n:"OnAfterRefreshEvent",t:"",p:"e"},onbeforesaveevent:{n:"OnBeforeSaveEvent",t:"",p:"e"},onaftersaveevent:{n:"OnAfterSaveEvent",t:"",p:"e"},onhandlererrorevent:{n:"OnHandlerErrorEvent",t:"",p:"e"},onrowblurevent:{n:"OnRowBlurEvent",t:"",p:"e"},oncellfocusevent:{n:"OnCellFocusEvent",t:"",p:"e"},onfocusevent:{n:"OnFocusEvent",t:"",p:"e"},oncellblurevent:{n:"OnCellBlurEvent",t:"",p:"e"},onafterrowdeleteevent:{n:"OnAfterRowDeleteEvent",t:"",p:"e"},onbeforerowdeleteevent:{n:"OnBeforeRowDeleteEvent",t:"",p:"e"},oncellupdateevent:{n:"OnCellUpdateEvent",t:"",p:"e"},onrowfocusevent:{n:"OnRowFocusEvent",t:"",p:"e"},onbeforecopyevent:{n:"OnBeforeCopyEvent",t:"",p:"e"},onaftercopyevent:{n:"OnAfterCopyEvent",t:"",p:"e"},onbeforepasteevent:{n:"OnBeforePasteEvent",t:"",p:"e"},onafterpasteevent:{n:"OnAfterPasteEvent",t:"",p:"e"},onerrorevent:{n:"OnErrorEvent",t:"",p:"e"},oncontextmenuevent:{n:"OnContextMenuEvent",t:"",p:"e"},oncellvalidateevent:{n:"OnCellValidateEvent",t:"",p:"e"},onkeydownevent:{n:"OnKeyDownEvent",t:"",p:"e"},onkeyupevent:{n:"OnKeyUpEvent",t:"",p:"e"},onkeypressevent:{n:"OnKeyPressEvent",t:"",p:"e"},onmouseoverevent:{n:"OnMouseOverEvent",t:"",p:"e"},onmouseoutevent:{n:"OnMouseOutEvent",t:"",p:"e"},onmousemoveevent:{n:"OnMouseMoveEvent",t:"",p:"e"},onhitrowendevent:{n:"OnHitRowEndEvent",t:"",p:"e"},onhitrowstartevent:{n:"OnHitRowStartEvent",t:"",p:"e"},onafterdragfillevent:{n:"OnAfterDragFillEvent",t:"",p:"e"},onbeforedragfillevent:{n:"OnBeforeDragFillEvent",t:"",p:"e"},onafterresizeevent:{n:"OnAfterResizeEvent",t:"",p:"e"},onbeforeresizeevent:{n:"OnBeforeResizeEvent",t:"",p:"e"}};
ntb_treegridp.xColumnProperties={column:{align:{n:"Align",t:"s",d:"left"},classname:{n:"ClassName",t:"s",d:""},cssstyle:{n:"CssStyle",t:"s",d:""},columnname:{n:"ColumnName",t:"s",d:""},type:{n:"Type",t:"s",d:"text"},datatype:{n:"DataType",t:"s",d:"text"},editable:{n:"Editable",t:"b",d:true},initial:{n:"Initial",t:"s",d:""},label:{n:"Label",t:"s",d:""},gethandler:{n:"GetHandler",t:"s",d:""},datasource:{n:"DataSource",t:"s",d:""},template:{n:"Template",t:"s",d:""},templateurl:{n:"TemplateUrl",t:"s",d:""},maxlength:{n:"MaxLength",t:"i",d:255},sortdirection:{n:"SortDirection",t:"s",d:"Desc"},sortenabled:{n:"SortEnabled",t:"b",d:true},width:{n:"Width",t:"i",d:100},visible:{n:"Visible",t:"b",d:true},xdatafld:{n:"xdatafld",t:"s",d:""},value:{n:"Value",t:"s",d:""},xi:{n:"xi",t:"i",d:100},oncellclickevent:{n:"OnCellClickEvent"},onbeforecellclickevent:{n:"OnBeforeCellClickEvent"},oncelldblclickevent:{n:"OnCellDblClickEvent"},onheaderdoubleclickevent:{n:"OnHeaderDoubleClickEvent"},onheaderclickevent:{n:"OnHeaderClickEvent"},onbeforeresizeevent:{n:"OnBeforeResizeEvent"},onafterresizeevent:{n:"OnAfterResizeEvent"},oncellvalidateevent:{n:"OnCellValidateEvent"},onbeforecelleditevent:{n:"OnBeforeCellEditEvent"},onaftercelleditevent:{n:"OnAfterCellEditEvent"},oncellblurevent:{n:"OnCellBlurEvent"},oncellfocusevent:{n:"OnCellFocusEvent"},onbeforesortevent:{n:"OnBeforeSortEvent"},onaftersortevent:{n:"OnAfterSortEvent"},oncellupdateevent:{n:"OnCellUpdateEvent"},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},textcolumn:{},numbercolumn:{align:{n:"Align",t:"s",d:"right"},mask:{n:"Mask",t:"s",d:"#,###.00"},negativemask:{n:"NegativeMask",t:"s",d:""},groupingseparator:{n:"GroupingSeparator",t:"s",d:","},decimalseparator:{n:"DecimalSeparator",t:"s",d:"."},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},datecolumn:{mask:{n:"Mask",t:"s",d:"M/d/yyyy"},calendarenabled:{n:"CalendarEnabled",t:"b",d:true}},expandcolumn:{childcolumnset:{n:"ChildColumnSet",t:"s"},onbeforeexpandevent:{n:"BeforeExpand"},onafterexpandevent:{n:"AfterExpand"},onbeforecollapseevent:{n:"BeforeCollapse"},onaftercollapseevent:{n:"AfterCollapse"}},listboxeditor:{datasourceid:{n:"DatasourceId",t:"s",d:""},datasource:{n:"Datasource",t:"s",d:""},gethandler:{n:"GetHandler",t:"s",d:""},displayfields:{n:"DisplayFields",t:"s",d:""},valuefield:{n:"ValueField",t:"s",d:""},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},lookupeditor:{datasourceid:{n:"DatasourceId",t:"s",d:""},datasource:{n:"Datasource",t:"s",d:""},gethandler:{n:"GetHandler",t:"s",d:""},displayfields:{n:"DisplayFields",t:"s",d:""},valuefield:{n:"ValueField",t:"s",d:""},delay:{n:"Delay",t:"s",d:""},size:{n:"Size",t:"s",d:6},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"},forcevalidoption:{n:"ForceValidOption",t:"b",d:false},autocomplete:{n:"AutoComplete",t:"b",d:true},autoclear:{n:"AutoClear",t:"b",d:false},getonenter:{n:"GetOnEnter",t:"b",d:false},referencecolumn:{n:"ReferenceColumn",t:"s",d:""}},checkboxeditor:{datasourceid:{n:"DatasourceId",t:"s",d:""},datasource:{n:"Datasource",t:"s",d:""},gethandler:{n:"GetHandler",t:"s",d:""},displayfields:{n:"DisplayFields",t:"s",d:""},valuefield:{n:"ValueField",t:"s",d:""},checkedvalue:{n:"CheckedValue",t:"s",d:""},uncheckedvalue:{n:"UnCheckedValue",t:"s",d:""}},linkeditor:{openwindow:{n:"OpenWindow",t:"b",d:true}},texteditor:{maxlength:{n:"MaxLength",t:"i",d:255},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},numbereditor:{onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},textareaeditor:{maxlength:{n:"MaxLength",t:"i",d:255},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},dateeditor:{mask:{n:"Mask",t:"s",d:"M/d/yyyy"},calendarenabled:{n:"CalendarEnabled",t:"b",d:true},onkeydownevent:{n:"OnKeyDownEvent"},onkeyupevent:{n:"OnKeyUpEvent"},onkeypressevent:{n:"OnKeyPressEvent"},onchangeevent:{n:"OnChangeEvent"}},imageeditor:{imageurl:{n:"ImageUrl",t:"s",d:""}},passwordeditor:{}};
ntb_treegridp.typeAccessorCreators={s:function(){
},b:function(){
},i:function(){
},n:function(){
}};
ntb_treegridp.createAccessors=function(_5e){
var _5f=ntb_treegridp.properties[_5e];
ntb_treegridp["set"+_5f.n]=function(){
this[_5f.p+_5f.t+"SET"](_5f.n,arguments);
};
ntb_treegridp["get"+_5f.n]=function(){
return this[_5f.p+_5f.t+"GET"](_5f.n,arguments);
};
ntb_treegridp["is"+_5f.n]=function(){
return this[_5f.p+_5f.t+"GET"](_5f.n,arguments);
};
ntb_treegridp[_5f.n]=_5f.d;
};
for(var name in ntb_treegridp.properties){
ntb_treegridp.createAccessors(name);
}
ntb_treegridp.initialize=function(){
this.fire("Preinitialize");
this.initializeFromCss();
this.createChildren();
this.fire("AfterInitialize");
this.fire("CreationComplete");
};
ntb_treegridp.initializeFromCss=function(){
this.CellHoverColor=this.getThemedStyle("ntb-cell-hover","backgroundColor")||"#C0C0FF";
this.RowHoverColor=this.getThemedStyle("ntb-row-hover","backgroundColor")||"#FFFFC0";
this.CellActiveColor=this.getThemedStyle("ntb-cell-active","backgroundColor")||"#F0C0FF";
this.RowActiveColor=this.getThemedStyle("ntb-row-active","backgroundColor")||"#FFC0FF";
var _60=this.getThemedStyle("ntb-row","height");
if(_60!=null&&_60!=""){
this.setRowHeight(parseInt(_60));
}
var _61=this.getThemedStyle("ntb-grid-header","height");
if(_61!=null&&_61!=""){
this.setHeaderHeight(parseInt(_61));
}
var _62=this.getThemedClass("ntb-grid-subgroup");
if(_62!=null&&_62.left!=null&&_62.left!=""&&this.getGroupOffset()==0){
this.setGroupOffset(parseInt(_62.left));
}
var _63=this.getThemedClass("ntb-cell-border");
if(_63!=null){
this.setCellBorderX(parseInt(_63.borderLeftWidth+0)+parseInt(_63.borderRightWidth+0));
this.setCellBorderY(parseInt(_63.borderTopWidth+0)+parseInt(_63.borderBottomWidth+0));
}
if(nitobi.browser.IE&&nitobi.lang.isStandards()){
var _63=this.getThemedClass("ntb-cell-border");
if(_63!=null){
this.setCellBorder(parseInt(_63.borderLeftWidth+0)+parseInt(_63.borderRightWidth+0)+parseInt(_63.paddingLeft+0)+parseInt(_63.paddingRight+0));
}
}
};
ntb_treegridp.getThemedClass=function(_64){
var C=nitobi.html.Css;
var r=C.getRule("."+this.getTheme()+" ."+_64)||C.getRule("."+_64);
var ret=null;
if(r!=null&&r.style!=null){
ret=r.style;
}
return ret;
};
ntb_treegridp.getThemedStyle=function(_68,_69){
return nitobi.html.Css.getClassStyle("."+this.getTheme()+" ."+_68,_69);
};
ntb_treegridp.connectRenderersToDataSet=function(_6a){
this.Scroller.surface.view.topleft.rowRenderer.xmlDataSource=_6a;
this.Scroller.surface.view.topcenter.rowRenderer.xmlDataSource=_6a;
this.Scroller.surface.view.midleft.rowRenderer.xmlDataSource=_6a;
this.Scroller.surface.view.midcenter.rowRenderer.xmlDataSource=_6a;
};
ntb_treegridp.connectToDataSet=function(_6b,_6c){
this.data=_6b;
this.connectToTable(_6c);
};
ntb_treegridp.connectToTable=function(_6d){
if(typeof (_6d)=="string"){
this.datatable=this.data.getTable(_6d);
}else{
if(typeof (_6d)=="object"){
this.datatable=_6d;
}else{
if(this.data.getTable("_default")+""!="undefined"){
this.datatable=this.data.getTable("_default");
}else{
return false;
}
}
}
this.connected=true;
this.updateStructure();
var dt=this.datatable;
var L=nitobi.lang;
dt.subscribe("DataReady",L.close(this,this.handleHandlerError));
dt.subscribe("DataReady",L.close(this,this.syncWithData));
dt.subscribe("DataSorted",L.close(this,this.syncWithData));
dt.subscribe("RowInserted",L.close(this,this.syncWithData));
dt.subscribe("RowDeleted",L.close(this,this.syncWithData));
dt.subscribe("RowCountChanged",L.close(this,this.setRowCount));
dt.subscribe("PastEndOfData",L.close(this,this.adjustRowCount));
dt.subscribe("RowCountKnown",L.close(this,this.finalizeRowCount));
dt.subscribe("StructureChanged",L.close(this,this.updateStructure));
dt.subscribe("ColumnsInitialized",L.close(this,this.updateStructure));
this.dataTableId=this.datatable.id;
this.datatable.setOnGenerateKey(this.getKeyGenerator());
this.fire("TableConnected",this.datatable);
return true;
};
ntb_treegridp.ensureConnected=function(){
if(this.data==null){
this.data=new nitobi.data.DataSet();
this.data.initialize();
this.datatable=new nitobi.data.DataTable(this.getDataMode(),this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
this.datatable.initialize("_default",this.getGetHandler(),this.getSaveHandler());
this.data.add(this.datatable);
this.connectToDataSet(this.data);
}
if(this.datatable==null){
this.datatable=this.data.getTable("_default");
if(this.datatable==null){
this.datatable=new nitobi.data.DataTable(this.getDataMode(),this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
this.datatable.initialize("_default",this.getGetHandler(),this.getSaveHandler());
this.data.add(this.datatable);
}
this.connectToDataSet(this.data);
}
this.connected=true;
};
ntb_treegridp.updateStructure=function(){
if(this.inferredColumns){
this.defineColumns(this.datatable);
}
this.mapColumns();
if(this.Scroller.surface.view.topleft){
this.defineColumnBindings();
this.defineColumnsFinalize();
}
};
ntb_treegridp.mapColumns=function(){
this.fieldMap=this.datatable.fieldMap;
};
ntb_treegridp.configureDefaults=function(){
this.initializeModel();
this.displayedFirstRow=0;
this.displayedRowCount=0;
this.localFilter=null;
this.columns=[];
this.fieldMap={};
this.frameRendered=false;
this.connected=false;
this.inferredColumns=true;
this.selectedRows=[];
this.minHeight=20;
this.minWidth=20;
this.setRowCount(0);
this.layoutValid=false;
this.oldVersion=false;
this.frameCssXslProc=nitobi.grid.frameCssXslProc;
this.frameXslProc=nitobi.grid.frameXslProc;
};
ntb_treegridp.attachDomEvents=function(){
var _70=this.getGridContainer();
var he=this.headerEvents;
he.push({type:"mousedown",handler:this.handleHeaderMouseDown});
he.push({type:"mouseup",handler:this.handleHeaderMouseUp});
he.push({type:"mousemove",handler:this.handleHeaderMouseMove});
nitobi.html.attachEvents(this.getHeaderContainer(),he,this);
nitobi.html.attachEvents(this.getSubHeaderContainer(),he,this);
var ce=this.cellEvents;
ce.push({type:"mousedown",handler:this.handleCellMouseDown});
ce.push({type:"mousemove",handler:this.handleCellMouseMove});
nitobi.html.attachEvents(this.getDataContainer(),ce,this);
var ge=this.events;
ge.push({type:"contextmenu",handler:this.handleContextMenu});
ge.push({type:"mousedown",handler:this.handleMouseDown});
ge.push({type:"mouseup",handler:this.handleMouseUp});
ge.push({type:"mousemove",handler:this.handleMouseMove});
ge.push({type:"mouseout",handler:this.handleMouseOut});
ge.push({type:"mouseover",handler:this.handleMouseOver});
if(!nitobi.browser.MOZ){
ge.push({type:"mousewheel",handler:this.handleMouseWheel});
}else{
nitobi.html.attachEvent($("vscrollclip"+this.uid),"mousedown",this.focus,this);
nitobi.html.attachEvent($("hscrollclip"+this.uid),"mousedown",this.focus,this);
ge.push({type:"DOMMouseScroll",handler:this.handleMouseWheel});
}
nitobi.html.attachEvents(_70,ge,this,false);
if(nitobi.browser.IE){
_70.onselectstart=function(){
var id=window.event.srcElement.id;
if(id.indexOf("selectbox")==0||id.indexOf("cell")==0){
return false;
}
};
}
if(nitobi.browser.IE){
this.keyNav=this.getScrollerContainer();
}else{
this.keyNav=$("ntb-grid-keynav"+this.uid);
}
this.keyEvents=[{type:"keydown",handler:this.handleKey},{type:"keyup",handler:this.handleKeyUp},{type:"keypress",handler:this.handleKeyPress}];
nitobi.html.attachEvents(this.keyNav,this.keyEvents,this);
var _75=$("ntb-grid-resizeright"+this.uid);
var _76=$("ntb-grid-resizebottom"+this.uid);
if(_75!=null){
nitobi.html.attachEvent(_75,"mousedown",this.beforeResize,this);
nitobi.html.attachEvent(_76,"mousedown",this.beforeResize,this);
}
};
ntb_treegridp.hoverCell=function(_77){
var css=nitobi.html.Css;
var has=nitobi.html.Css.hasClass;
var _7a=nitobi.html.Css.swapClass;
var c="ntb-column-collapsed";
var x="ntb-column-expanded";
var _7d=c+"-hover";
var _7e=x+"-hover";
var h=this.hovered;
if(h){
if(h.getAttribute("ebatype")=="expander"){
if(has(h,_7d)){
_7a(h,_7d,c);
}
if(has(h,_7e)){
_7a(h,_7e,x);
}
}else{
var hs=h.style;
if(hs.backgroundColor==this.CellHoverColor){
hs.backgroundColor=this.hoveredbg;
}
}
}
if(_77==null||_77==this.activeCell){
return;
}
if(_77.getAttribute("ebatype")=="expander"){
if(has(_77,c)){
_7a(_77,c,_7d);
}
if(has(_77,x)){
_7a(_77,x,_7e);
}
this.hovered=_77;
}else{
var cs=_77.style;
this.hoveredbg=cs.backgroundColor;
this.hovered=_77;
cs.backgroundColor=this.CellHoverColor;
}
};
ntb_treegridp.hoverRow=function(row){
if(!this.isRowHighlightEnabled()){
return;
}
var C=nitobi.html.Css;
if(this.leftrowhovered&&this.leftrowhovered!=this.leftActiveRow){
this.leftrowhovered.style.backgroundColor=this.leftrowhoveredbg;
}
if(this.midrowhovered&&this.midrowhovered!=this.midActiveRow){
this.midrowhovered.style.backgroundColor=this.midrowhoveredbg;
}
if(row==this.activeRow||row==null){
return;
}
var _84=-1;
var _85=nitobi.html.getFirstChild(row);
var _86=nitobi.grid.Row.getRowNumber(row);
var _87=row.getAttribute("path");
var _88=nitobi.grid.Row.getRowElements(this,_86,_87);
if(_88.left!=null&&_88.left!=this.leftActiveRow){
this.leftrowhoveredbg=_88.left.style.backgroundColor;
this.leftrowhovered=_88.left;
_88.left.style.backgroundColor=this.RowHoverColor;
}
if(_88.mid!=null&&_88.mid!=this.midActiveRow){
this.midrowhoveredbg=_88.mid.style.backgroundColor;
this.midrowhovered=_88.mid;
_88.mid.style.backgroundColor=this.RowHoverColor;
}
};
ntb_treegridp.clearHover=function(){
this.hoverCell();
this.hoverRow();
};
ntb_treegridp.handleMouseOver=function(evt){
this.fire("MouseOver",evt);
};
ntb_treegridp.handleMouseOut=function(evt){
this.clearHover();
this.fire("MouseOut",evt);
};
ntb_treegridp.handleMouseDown=function(evt){
};
ntb_treegridp.handleHeaderMouseDown=function(evt){
var _8d=this.findActiveCell(evt.srcElement);
if(_8d==null){
return;
}
var _8e=nitobi.grid.Cell.getColumnNumber(_8d);
var _8f=nitobi.grid.Cell.getSurfacePath(_8d);
if(this.headerResizeHover(evt,_8d)){
var _90=this.getColumnObject(_8e,nitobi.grid.Cell.getSurfacePath(_8d));
var _91=new nitobi.grid.OnBeforeColumnResizeEventArgs(this,_90);
if(!nitobi.event.evaluate(_90.getOnBeforeResizeEvent(),_91)){
return;
}
this.columnResizer.startResize(this,_90,_8d,evt);
return false;
}else{
this.headerClicked(_8e,_8f);
this.fire("HeaderDown",_8e);
}
};
ntb_treegridp.handleCellMouseDown=function(evt){
var _93=this.findActiveCell(evt.srcElement);
if(_93==null){
return;
}
if(_93.getAttribute("ebatype")=="expander"){
this.toggleSurface(_93);
return;
}
if(!evt.shiftKey){
var _94=this.getSelectedColumnObject();
var _95=new nitobi.grid.OnCellClickEventArgs(this,this.getSelectedCellObject());
if(!this.fire("BeforeCellClick",_95)||(!!_94&&!nitobi.event.evaluate(_94.getOnBeforeCellClickEvent(),_95))){
return;
}
this.setCellClicked(true);
this.setActiveCell(_93,evt.ctrlKey||evt.metaKey);
this.selection.selecting=true;
var _94=this.getSelectedColumnObject();
var _95=new nitobi.grid.OnCellClickEventArgs(this,this.getSelectedCellObject());
this.fire("CellClick",_95);
if(!!_94){
nitobi.event.evaluate(_94.getOnCellClickEvent(),_95);
}
}
};
ntb_treegridp.handleMouseUp=function(_96){
this.getSelection().handleGrabbyMouseUp(_96);
};
ntb_treegridp.handleHeaderMouseUp=function(evt){
var _98=this.findActiveCell(evt.srcElement);
if(!_98){
this.focus();
return;
}
var _99=parseInt(_98.getAttribute("xi"));
this.fire("HeaderUp",_99);
};
ntb_treegridp.handleMouseMove=function(evt){
this.fire("MouseMove",evt);
};
ntb_treegridp.handleHeaderMouseMove=function(evt){
var _9c=this.findActiveCell(evt.srcElement);
if(_9c==null){
return;
}
if(this.headerResizeHover(evt,_9c)){
_9c.style.cursor="w-resize";
}else{
(nitobi.browser.IE?_9c.style.cursor="hand":_9c.style.cursor="pointer");
}
};
ntb_treegridp.headerResizeHover=function(evt,_9e){
var x=evt.clientX;
var _a0=_9e.getBoundingClientRect(0,(nitobi.grid.Cell.getColumnNumber(_9e)>this.getFrozenLeftColumnCount()?this.scroller.getScrollLeft():0));
return (x<_a0.right&&x>_a0.right-10);
};
ntb_treegridp.handleHeaderMouseOver=function(e){
e.className=e.className.replace(/(ntb-column-indicator-border)(.*?)(\s|$)/g,function(){
return arguments[1]+arguments[2]+"hover ";
});
};
ntb_treegridp.handleHeaderMouseOut=function(e){
e.className=e.className.replace(/(ntb-column-indicator-border)(.*?)(\s|$)/g,function(){
return arguments[0].replace("hover","");
});
};
ntb_treegridp.handleCellMouseMove=function(evt){
this.setCellClicked(false);
var _a4=this.findActiveCell(evt.srcElement);
if(_a4==null){
return;
}
var _a5=_a4.getAttribute("ebatype");
var sel=this.selection;
var _a7=evt.button;
var _a8=nitobi.html.getEventCoords(evt);
var x=_a8.x,y=_a8.y;
if(nitobi.browser.IE){
x=evt.clientX,y=evt.clientY;
}
if(sel.selecting){
if(_a4.getAttribute("path")==this.activeCell.getAttribute("path")&&_a5!="columnheader"){
if(_a7==1||(_a7==0&&!nitobi.browser.IE)){
if(!sel.expanding){
sel.redraw(_a4);
}else{
var _ab=sel.expandStartCoords;
var _ac=0;
if(x>_ab.right){
_ac=Math.abs(x-_ab.right);
}else{
if(x<_ab.left){
_ac=Math.abs(x-_ab.left);
}
}
var _ad=0;
if(y>_ab.bottom){
_ad=Math.abs(y-_ab.bottom);
}else{
if(y<_ab.top){
_ad=Math.abs(y-_ab.top);
}
}
if(_ad>_ac){
expandDir="vert";
}else{
expandDir="horiz";
}
sel.expand(_a4,expandDir);
}
this.ensureCellInView(_a4);
}else{
this.selection.selecting=false;
}
}
}else{
if(_a5!="columnheader"){
this.hoverCell(_a4);
this.hoverRow(_a4.parentNode);
}
}
};
ntb_treegridp.handleMouseWheel=function(_ae){
this.focus();
var _af=0;
if(_ae.wheelDelta){
_af=_ae.wheelDelta/120;
}else{
if(_ae.detail){
_af=-_ae.detail/3;
}
}
this.scrollVerticalRelative(-20*_af);
nitobi.html.cancelEvent(_ae);
};
ntb_treegridp.setActiveCell=function(_b0,_b1){
if(!_b0){
return;
}
this.blurActiveCell(this.activeCell);
this.focus();
this.activateCell(_b0);
var _b2=this.activeColumnObject;
this.selection.collapse(this.activeCell);
if(!this.isCellClicked()){
this.ensureCellInView(this.activeCell);
this.setCellClicked(false);
}
var row=_b0.parentNode;
this.setActiveRow(row,_b1);
var _b4=new nitobi.grid.OnCellFocusEventArgs(this,this.getSelectedCellObject());
this.fire("CellFocus",_b4);
if(!!_b2){
nitobi.event.evaluate(_b2.getOnCellFocusEvent(),_b4);
}
};
ntb_treegridp.activateCell=function(_b5){
this.activeCell=_b5;
this.activeCellObject=new nitobi.grid.Cell(this,_b5);
this.activeColumnObject=this.getSelectedColumnObject();
};
ntb_treegridp.blurActiveCell=function(_b6){
this.oldCell=_b6;
var _b7=this.activeColumnObject;
var _b8=new nitobi.grid.OnCellBlurEventArgs(this,this.getSelectedCellObject());
if(!!_b7){
if(!this.fire("CellBlur",_b8)||!nitobi.event.evaluate(_b7.getOnCellBlurEvent(),_b8)){
return;
}
}
};
ntb_treegridp.getRowNodes=function(row){
return nitobi.grid.Row.getRowElements(this,nitobi.grid.Row.getRowNumber(row));
};
ntb_treegridp.setActiveRow=function(row,_bb){
var Row=nitobi.grid.Row;
var _bd=Row.getRowNumber(row);
var _be=-1;
if(this.oldCell!=null){
_be=Row.getRowNumber(this.oldCell);
}
if(this.selectedRows[0]!=null){
_be=Row.getRowNumber(this.selectedRows[0]);
}
if(!_bb||!this.isMultiRowSelectEnabled()){
if(_bd!=_be&&_be!=-1){
var _bf=new nitobi.grid.OnRowBlurEventArgs(this,this.getRowObject(_be));
if(!this.fire("RowBlur",_bf)||!nitobi.event.evaluate(this.getOnRowBlurEvent(),_bf)){
return;
}
}
this.clearActiveRows();
}
if(this.isRowSelectEnabled()){
var _c0=Row.getRowElements(this,_bd);
this.midActiveRow=_c0.mid;
this.leftActiveRow=_c0.left;
if(row.getAttribute("select")=="1"){
this.clearActiveRow(row);
}else{
this.selectedRows.push(row);
if(this.leftActiveRow!=null){
this.leftActiveRow.setAttribute("select","1");
this.applyRowStyle(this.leftActiveRow);
}
if(this.midActiveRow!=null){
this.midActiveRow.setAttribute("select","1");
this.applyRowStyle(this.midActiveRow);
}
}
}
if(_bd!=_be){
var _c1=new nitobi.grid.OnRowFocusEventArgs(this,this.getRowObject(_bd));
this.fire("RowFocus",_c1);
nitobi.event.evaluate(this.getOnRowFocusEvent(),_c1);
}
};
ntb_treegridp.getSelectedRows=function(){
return this.selectedRows;
};
ntb_treegridp.clearActiveRows=function(){
for(var i=0;i<this.selectedRows.length;i++){
var row=this.selectedRows[i];
this.clearActiveRow(row);
}
this.selectedRows=[];
};
ntb_treegridp.selectAllRows=function(){
this.clearActiveRows();
for(var i=0;i<this.getDisplayedRowCount();i++){
var _c5=this.getCellElement(i,0);
if(_c5!=null){
var row=_c5.parentNode;
this.setActiveRow(row,true);
}
}
return this.selectedRows;
};
ntb_treegridp.clearActiveRow=function(row){
var _c8=nitobi.grid.Row.getRowNumber(row);
var _c9=nitobi.grid.Row.getRowElements(this,_c8);
if(_c9.left!=null){
_c9.left.removeAttribute("select");
this.removeRowStyle(_c9.left);
}
if(_c9.mid!=null){
_c9.mid.removeAttribute("select");
this.removeRowStyle(_c9.mid);
}
};
ntb_treegridp.applyCellStyle=function(_ca){
if(_ca==null){
return;
}
_ca.style.background=this.CellActiveColor;
};
ntb_treegridp.removeCellStyle=function(_cb){
if(_cb==null){
return;
}
_cb.style.background="";
};
ntb_treegridp.applyRowStyle=function(row){
if(row==null){
return;
}
row.style.background=this.RowActiveColor;
};
ntb_treegridp.removeRowStyle=function(row){
if(row==null){
return;
}
row.style.background="";
};
ntb_treegridp.findActiveCell=function(_ce){
var _cf=5;
_ce==null;
for(var i=0;i<_cf&&_ce.getAttribute;i++){
var t=_ce.getAttribute("ebatype");
if(t=="cell"||t=="columnheader"||t=="expander"){
return _ce;
}
_ce=_ce.parentNode;
}
return null;
};
ntb_treegridp.attachToParentDomElement=function(_d2){
this.UiContainer=_d2;
this.fire("AttachToParent");
};
ntb_treegridp.getToolbars=function(){
return this.toolbars;
};
ntb_treegridp.adjustHorizontalScrollBars=function(){
var _d3=this.getViewableWidth();
var _d4=$("ntb-grid-hscrollshow"+this.uid);
if((_d3<=parseInt(this.getWidth()))){
_d4.style.display="none";
}else{
_d4.style.display="block";
this.resizeScroller();
var _d5=this.getWidth()/this.getViewableWidth();
this.hScrollbar.setRange(_d5);
}
var _d6=nitobi.html.Css.getClass(".ntb-grid-scrollerheight"+this.uid,true);
if(_d3>this.getWidth()){
_d6.height=this.getHeight()-this.getscrollbarHeight()-(this.isToolbarEnabled()?this.getToolbarHeight():0)+"px";
}else{
_d6.height=this.getHeight()-(this.isToolbarEnabled()?this.getToolbarHeight():0)+"px";
}
};
ntb_treegridp.createChildren=function(){
var L=nitobi.lang;
if(this.UiContainer!=null&&this.getGridContainer()==null){
this.renderFrame();
}
this.generateFrameCss();
var ls=this.loadingScreen=new nitobi.grid.LoadingScreen(this);
this.subscribe("Preinitialize",L.close(ls,ls.show));
this.subscribe("HtmlReady",L.close(ls,ls.hide));
this.subscribe("AfterGridResize",L.close(ls,ls.resize));
ls.initialize();
ls.attachToElement($("ntb-grid-overlay"+this.uid));
ls.show();
var cr=new nitobi.grid.ColumnResizer(this);
cr.onAfterResize.subscribe(L.close(this,this.afterColumnResize));
this.columnResizer=cr;
var gr=new nitobi.grid.GridResizer(this);
gr.widthFixed=this.isWidthFixed();
gr.heightFixed=this.isHeightFixed();
gr.minWidth=this.getMinWidth();
gr.minHeight=Math.max(this.getMinHeight(),(this.getHeaderHeight()+this.getscrollbarHeight()));
gr.onAfterResize.subscribe(L.close(this,this.afterResize));
this.gridResizer=gr;
var sc=this.Scroller=this.scroller=new nitobi.grid.Scroller3x3(this,this.getHeight(),this.getDisplayedRowCount(),this.getColumnCount(),this.getfreezetop(),this.getFrozenLeftColumnCount());
sc.setRowHeight(this.getRowHeight());
sc.setHeaderHeight(this.getHeaderHeight());
this.maxSurface=this.scroller.surface;
this.renderSurface();
this.attachDomEvents();
sc.surface.onHtmlReady.subscribe(this.handleHtmlReady,this);
this.subscribe("TableConnected",L.close(sc,sc.setDataTable));
this.initializeSelection();
this.Scroller.createRenderers(this.data);
this.mapToHtml();
var vs=this.vScrollbar=new nitobi.ui.VerticalScrollbar();
vs.attachToParent(this.element,$("vscroll"+this.uid));
vs.subscribe("ScrollByUser",L.close(this,this.scrollVertical));
this.subscribe("PercentHeightChanged",L.close(vs,vs.setRange));
this.subscribe("ScrollVertical",L.close(vs,vs.setScrollPercent));
this.setscrollbarWidth(vs.getWidth());
var hs=this.hScrollbar=new nitobi.ui.HorizontalScrollbar();
hs.attachToParent(this.element,$("hscroll"+this.uid));
hs.subscribe("ScrollByUser",L.close(this,this.scrollHorizontal));
this.subscribe("PercentWidthChanged",L.close(hs,hs.setRange));
this.subscribe("ScrollHorizontal",L.close(hs,hs.setScrollPercent));
this.setscrollbarHeight(hs.getHeight());
};
ntb_treegridp.createToolbars=function(_de){
var tb=this.toolbars=new nitobi.ui.Toolbars((this.isToolbarEnabled()?_de:0));
var _e0=document.getElementById("toolbarContainer"+this.uid);
tb.setWidth(this.getWidth());
tb.setHeight(this.getToolbarHeight());
tb.setRowInsertEnabled(this.isRowInsertEnabled());
tb.setRowDeleteEnabled(this.isRowDeleteEnabled());
tb.attachToParent(_e0);
var L=nitobi.lang;
tb.subscribe("InsertRow",L.close(this,this.insertAfterCurrentRow));
tb.subscribe("DeleteRow",L.close(this,this.deleteCurrentRow));
tb.subscribe("Save",L.close(this,this.save));
tb.subscribe("Refresh",L.close(this,this.refresh));
this.subscribe("AfterGridResize",L.close(this,this.resizeToolbars));
};
ntb_treegridp.resizeToolbars=function(){
this.toolbars.setWidth(this.getWidth());
this.toolbars.resize();
};
ntb_treegridp.scrollVerticalRelative=function(_e2){
var st=this.scroller.getScrollTop()+_e2;
var mc=this.Scroller.surface.view.midcenter;
percent=st/(mc.container.offsetHeight-mc.element.offsetHeight);
this.scrollVertical(percent);
};
ntb_treegridp.scrollVertical=function(_e5){
this.clearHover();
var _e6=this.scroller.getScrollTopPercent();
this.scroller.setScrollTopPercent(_e5);
this.fire("ScrollVertical",_e5);
if(_e5>0.99&&_e6<0.99){
this.fire("ScrollHitBottom",_e5);
}
if(_e5<0.01){
this.fire("ScrollHitTop",_e5);
}
};
ntb_treegridp.scrollHorizontalRelative=function(_e7){
var sl=this.scroller.getScrollLeft()+_e7;
var mc=this.scroller.surface.view.midcenter;
percent=sl/(mc.container.offsetWidth-mc.element.offsetWidth);
this.scrollHorizontal(percent);
};
ntb_treegridp.scrollHorizontal=function(_ea){
this.focus();
this.clearHover();
this.scroller.setScrollLeftPercent(_ea);
this.fire("ScrollHorizontal",_ea);
if(_ea>0.99){
this.fire("ScrollHitRight",_ea);
}
if(_ea<0.01){
this.fire("ScrollHitLeft",_ea);
}
};
ntb_treegridp.getScrollSurface=function(){
if(this.Scroller!=null){
return this.Scroller.surface.view.midcenter.element;
}
};
ntb_treegridp.getActiveView=function(){
var C=nitobi.grid.Cell;
return this.Scroller.getViewportByCoords(C.getRowNumber(this.activeCell),C.getColumnNumber(this.activeCell),C.getSurfacePath(this.activeCell));
};
ntb_treegridp.ensureCellInView=function(_ec){
var SS=this.getScrollSurface();
var AC=_ec||this.activeCell;
if(AC==null){
return;
}
var sct=0;
var scl=0;
if(nitobi.browser.MOZ||nitobi.browser.SAFARI){
sct=SS.scrollTop;
scl=SS.scrollLeft;
}
var R1=AC.getBoundingClientRect();
var R2=SS.getBoundingClientRect();
var B=EBA_SELECTION_BUFFER||0;
var up=R1.top-R2.top-B-sct;
var _f5=R1.bottom-R2.bottom+B-sct;
var _f6=R1.left-R2.left-B-scl;
var _f7=R1.right-R2.right+B-scl;
if(up<0){
this.scrollVerticalRelative(up);
}
if(_f5>0){
this.scrollVerticalRelative(_f5);
}
if(nitobi.grid.Cell.getColumnNumber(AC)>this.getFrozenLeftColumnCount()-1){
if(_f6<0){
this.scrollHorizontalRelative(_f6);
}
if(_f7>0){
this.scrollHorizontalRelative(_f7);
}
}
this.fire("CellCoordsChanged",R1);
};
ntb_treegridp.updateCellRanges=function(){
if(this.frameRendered){
var _f8=this.getRowCount();
this.Scroller.updateCellRanges(this.getColumnCount(),_f8,this.getFrozenLeftColumnCount(),this.getfreezetop());
this.measure();
this.resizeScroller();
this.fire("PercentHeightChanged",this.getHeight()/this.calculateHeight());
this.fire("PercentWidthChanged",this.getWidth()/this.calculateWidth());
}
};
ntb_treegridp.measure=function(){
this.measureViews();
this.sizeValid=true;
};
ntb_treegridp.measureViews=function(){
this.measureRows();
this.measureColumns();
};
ntb_treegridp.measureColumns=function(){
var fL=this.getFrozenLeftColumnCount();
var wL=0;
var wT=0;
var _fc=this.getColumnDefinitions();
var _fd=_fc.length;
for(var i=0;i<_fd;i++){
if(_fc[i].getAttribute("Visible")=="1"||_fc[i].getAttribute("visible")=="1"){
var w=Number(_fc[i].getAttribute("Width"));
wT+=w;
if(i<fL){
wL+=w;
}
}
}
this.setleft(wL);
};
ntb_treegridp.measureRows=function(){
var hdrH=this.isColumnIndicatorsEnabled()?this.getHeaderHeight():0;
this.settop(this.calculateHeight(0,this.getfreezetop()-1)+hdrH);
};
ntb_treegridp.resizeScroller=function(){
var _101=(this.getToolbars()!=null&&this.isToolbarEnabled()?this.getToolbarHeight():0);
var hdrH=this.isColumnIndicatorsEnabled()?this.getHeaderHeight():0;
this.Scroller.resize(this.getHeight()-_101-hdrH);
};
ntb_treegridp.resize=function(_103,_104){
this.setWidth(_103);
this.setHeight(_104);
this.generateCss();
this.fire("AfterGridResize",{source:this,width:_103,height:_104});
};
ntb_treegridp.beforeResize=function(evt){
var _106=new nitobi.base.EventArgs(this);
if(!nitobi.event.evaluate(this.getOnBeforeResizeEvent(),_106)){
return;
}
this.gridResizer.startResize(this,evt);
};
ntb_treegridp.afterResize=function(){
this.resize(this.gridResizer.newWidth,this.gridResizer.newHeight);
this.syncWithData();
};
ntb_treegridp.afterColumnResize=function(_107){
var col=_107.column;
var _109=col.getWidth();
this.columnResize(col,_109+_107.dx);
};
ntb_treegridp.columnResize=function(_10a,_10b){
if(isNaN(_10b)){
return;
}
_10a=(typeof _10a=="object"?_10a:this.getColumnObject(_10a));
var _10c=_10a.getWidth();
_10a.setWidth(_10b);
this.updateCellRanges();
var s=this.scroller.surfaceMap;
var _10e=0;
for(var key in s){
var _110=s[key];
var w;
if((w=_110.calculateWidth())>_10e){
_10e=w;
}
}
this.setViewableWidth(_10e);
if(nitobi.browser.IE7){
this.generateCss();
}else{
var C=nitobi.html.Css;
var _113=_10a.column;
var dx=_10b-_10c;
var _115=C.getClass(".ntb-column"+this.uid+"_"+_10a.surface.columnSetId+"_"+(_113+1));
_115.width=(parseInt(_115.width)+dx)+"px";
var _116=this.scroller.surface.columnsNode,_117=0,_118=this.getGroupOffset(),_119=this.getRootColumns();
do{
var id=_116.getAttribute("id");
var _11b=C.getClass(".ntb-grid-surfacewidth"+this.uid+"-"+id);
var _10b=(id==_119?_10e:_10e-(_117*parseInt(_118))-(_117+1));
_11b.width=_10b+"px";
var _11c=this.findChildColumnSet(id);
_116=this.model.selectSingleNode("//ntb:columns[@id='"+_11c+"']");
_117++;
}while(_116);
}
this.Selection.collapse(this.activeCell);
this.adjustHorizontalScrollBars();
var _11d=new nitobi.grid.OnAfterColumnResizeEventArgs(this,_10a);
nitobi.event.evaluate(_10a.getOnAfterResizeEvent(),_11d);
};
ntb_treegridp.resizeSurfaces=function(){
var _11e=0;
var _11f=this.getViewableWidth();
var s=this.scroller.surfaceMap;
for(var key in s){
var _122=s[key];
var w;
if((w=_122.calculateWidth())>_11e&&_122.isVisible){
_11e=w;
}
}
this.setViewableWidth(_11e);
if(nitobi.browser.MOZ&&_11f<_11e){
var C=nitobi.html.Css;
var _122=this.scroller.surface;
var _125=0,_126=this.getGroupOffset(),_127=this.getRootColumns();
var _11e=this.getViewableWidth();
do{
var _128=_122.columnsNode;
var id=_128.getAttribute("id");
var _12a=C.getClass(".ntb-grid-surfacewidth"+this.uid+"-"+id,true);
var _12b=(id==_127?_11e:_11e-(_125*parseInt(_126))-(_125+1));
_12a.width=_12b+"px";
_125++;
if(!nitobi.collections.isHashEmpty(_122.surfaces)){
for(var name in _122.surfaces){
_122=_122.surfaces[name];
break;
}
}else{
_122=null;
}
}while(_122);
}
};
ntb_treegridp.initializeModel=function(){
this.model=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.modelDoc));
this.modelNode=this.model.selectSingleNode("//ntb:treegrid");
this.initializeModelFromDeclaration();
var _12d=nitobi.html.getScrollBarWidth();
if(_12d){
this.setscrollbarWidth(_12d);
this.setscrollbarHeight(_12d);
}
var xDec=this.model.selectSingleNode("//ntb:columns");
if(xDec==null){
var xDec=nitobi.xml.createElement(this.model,"columns");
this.model.selectSingleNode("//ntb:treegrid").appendChild(xDec);
}
this.model.documentElement.setAttribute("ID",this.uid);
this.model.documentElement.setAttribute("uniqueID",this.uid);
};
ntb_treegridp.clearDefaultData=function(rows){
for(var i=0;i<rows;i++){
var e=this.model.createElement("e");
e.setAttribute("xi",i+1);
xDec.appendChild(e);
}
};
ntb_treegridp.bind=function(){
if(this.isBound()){
this.clear();
}
};
ntb_treegridp.dataBind=function(){
this.bind();
};
ntb_treegridp.getDataSource=function(_132){
var _133=this.dataTableId||"_default";
if(_132){
_133=_132;
}
return this.data.getTable(_133);
};
ntb_treegridp.getChangeLogXmlDoc=function(_134){
return this.getDataSource(_134).getChangeLogXmlDoc();
};
ntb_treegridp.getComplete=function(_135){
if(null==_135.dataSource.xmlDoc){
ebaErrorReport("evtArgs.dataSource.xmlDoc is null or not defined. Likely the gethandler failed use fiddler to check the response","",EBA_ERROR);
this.fire("LoadingError");
return;
}
var _136=_135.dataSource.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+_135.dataSource.id+"']");
};
ntb_treegridp.bindComplete=function(){
if(this.inferredColumns&&!this.columnsDefined){
this.defineColumns(this.datatable);
}
this.setRowCount(this.datatable.remoteRowCount);
this.setBound(true);
this.syncWithData();
};
ntb_treegridp.syncWithData=function(_137){
if(this.isBound()){
this.Scroller.render(true);
this.fire("DataReady",{"source":this});
}
};
ntb_treegridp.finalizeRowCount=function(rows){
this.rowCountKnown=true;
this.setRowCount(rows);
};
ntb_treegridp.adjustRowCount=function(pct){
this.scrollVertical(pct);
};
ntb_treegridp.setRowCount=function(rows){
this.xSET("RowCount",arguments);
if(this.getPagingMode()==nitobi.grid.PAGINGMODE_STANDARD){
if(this.getDataMode()==nitobi.data.DATAMODE_LOCAL){
this.setDisplayedRowCount(this.getRowsPerPage());
}else{
this.setDisplayedRowCount(rows);
}
}else{
this.setDisplayedRowCount(rows);
}
this.rowCount=rows;
this.updateCellRanges();
};
ntb_treegridp.getRowCount=function(){
return this.rowCount;
};
ntb_treegridp.layout=function(_13b){
if(this.prevHeight!=this.getHeight()||this.prevWidth!=this.getWidth()){
this.prevHeight=this.getHeight();
this.prevWidth=this.getWidth();
this.layoutValid=false;
}
if(!this.layoutValid&&this.frameRendered){
this.layoutFrame();
this.generateFrameCss();
this.layoutValid=true;
}
};
ntb_treegridp.layoutFrame=function(_13c){
if(!this.frameRendered){
return;
}
if(!this.Scroller){
return;
}
this.minHeight=this.getMinHeight();
this.minWidth=this.getMinWidth();
var _13d=false;
var _13e=false;
var tbH=this.getToolbarHeight();
var rowH=this.getRowHeight();
var colW=20;
var sbH=this.getscrollbarHeight();
var sbW=this.getscrollbarWidth();
var hdrH=this.getHeaderHeight();
tbH=this.isToolbarEnabled()?tbH:0;
hdrH=this.isColumnIndicatorsEnabled?hdrH:0;
var minH=Math.max(this.minHeight,tbH+rowH+sbH+hdrH);
var maxH=this.Height;
var minW=Math.max(this.minWidth,colW+sbW);
var maxW=this.Width;
if(_13d){
var _149=this.Scroller.minSurfaceWidth;
var _14a=this.Scroller.maxSurfaceWidth;
}else{
var _149=this.Scroller.SurfaceWidth;
var _14a=_149;
}
if(_13e){
var _14b=this.Scroller.minSurfaceHeight;
var _14c=this.Scroller.maxSurfaceHeight;
}else{
var _14b=this.Scroller.SurfaceHeight;
var _14c=_14b;
}
var _14d=_14b+(tbH)+(hdrH);
var _14e=_149;
var _14f=(_14d>maxH);
var _150=(_14e>maxW);
var _14f=(_150&&((_14d+20)>maxH))||_14f;
var _150=(_14f&&((_14e+20)>maxW))||_150;
sbH=_150?sbH:0;
sbV=_14f?sbV:0;
var vpH=_14d-hdrH-tbH-sbH;
var vpW=_14e-sbW;
this.resize();
};
ntb_treegridp.defineColumns=function(_153,_154){
_154=(_154==null?true:_154);
this.fire("BeforeColumnsDefined");
var _155=null;
var _156=nitobi.lang.typeOf(_153);
this.inferredColumns=false;
switch(_156){
case "string":
_155=this.defineColumnsFromString(_153);
break;
case nitobi.lang.type.XMLNODE:
case nitobi.lang.type.XMLDOC:
case nitobi.lang.type.HTMLNODE:
_155=this.defineColumnsFromXml(_153,_154);
break;
case nitobi.lang.type.ARRAY:
_155=this.defineColumnsFromArray(_153,_154);
break;
case "object":
this.inferredColumns=true;
_155=this.defineColumnsFromData(_153,_154);
break;
case "number":
_155=this.defineColumnsCollection(_153,_154);
break;
default:
}
this.fire("AfterColumnsDefined");
if(_154){
var _157=0;
for(var i=0,l=_155.length;i<l;i++){
_157+=parseInt(_155[i].getAttribute("Width"));
}
this.setViewableWidth(_157);
this.defineColumnsFinalize();
}
return _155;
};
ntb_treegridp.defineColumnsFromXml=function(_15a,_15b){
if(_15a==null||_15a.childNodes.length==0){
return this.defineColumnsCollection(0);
}
if(_15a.childNodes[0].nodeName==nitobi.xml.nsPrefix+"columndefinition"){
var _15c=nitobi.xml.createXslDoc(nitobi.grid.declarationConverterXslProc.stylesheet);
_15a=nitobi.xml.transformToXml(_15a,_15c);
}
var cols=_15a.childNodes.length;
var xDec=_15a;
xDec=this.modelNode.appendChild(xDec.cloneNode(true));
var _15f=xDec.childNodes;
var _160=_15a.childNodes.length;
for(var i=0;i<_160;i++){
var col=_15f[i];
var _163="";
var _164=col.nodeName;
var _165=col.selectSingleNode("ntb:texteditor|ntb:numbereditor|ntb:textareaeditor|ntb:imageeditor|ntb:linkeditor|ntb:dateeditor|ntb:lookupeditor|ntb:listboxeditor|ntb:checkboxeditor|ntb:passwordeditor");
var _166="TEXT";
var _167={"ntb:textcolumn":"EBATextColumn","ntb:numbercolumn":"EBANumberColumn","ntb:datecolumn":"EBADateColumn","ntb:expandcolumn":"EBAExpandColumn"};
var _163=_167[_164].replace("EBA","").replace("Column","").toLowerCase();
var _168={"ntb:numbereditor":"EBANumberEditor","ntb:textareaeditor":"EBATextareaEditor","ntb:imageeditor":"EBAImageEditor","ntb:linkeditor":"EBALinkEditor","ntb:dateeditor":"EBADateEditor","ntb:lookupeditor":"EBALookupEditor","ntb:listboxeditor":"EBAListboxEditor","ntb:passwordeditor":"EBAPasswordEditor","ntb:checkboxeditor":"EBACheckboxEditor"};
if(_165!=null){
_166=_168[_165.nodeName]||_166;
}else{
_166=_167[_164]||_166;
}
_166=_166.replace("EBA","").replace("Editor","").replace("Column","").toUpperCase();
var e=this.model.selectSingleNode("/state/Defaults/ntb:column[@DataType='"+(_163)+"' and @type='"+_166+"' and @editor='"+_166+"']").cloneNode(true);
this.setModelValues(e,col);
var _16a=_167[col.nodeName]||"EBATextColumn";
this.defineColumnDatasource(e);
this.defineColumnBinding(e);
xDec.replaceChild(e,col);
var _16b=e.getAttribute("GetHandler");
if(_16b){
var _16c=e.getAttribute("DatasourceId");
if(!_16c||_16c==""){
_16c="columnDatasource_"+i+"_"+this.uid;
e.setAttribute("DatasourceId",_16c);
}
var dt=new nitobi.data.DataTable("local",this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
dt.initialize(_16c,_16b,null);
dt.async=false;
this.data.add(dt);
var _16e=[];
_16e[0]=e;
var _16f=e.getAttribute("editor");
var _170=null;
var _171=null;
if(e.getAttribute("editor")=="LOOKUP"){
_170=0;
_171=1;
dt.async=true;
}
dt.get(_170,_171,this,nitobi.lang.close(this,this.editorDataReady,[e]),function(){
});
}
this.measureColumns();
if(_15b){
this.setColumnCount(cols);
}
}
var _172;
_172=_15a.selectSingleNode("/"+nitobi.xml.nsPrefix+"grid/"+nitobi.xml.nsPrefix+"datasources");
if(_172){
this.Declaration.datasources=nitobi.xml.createXmlDoc(_172.xml);
}
return xDec.childNodes;
};
ntb_treegridp.defineColumnsFinalize=function(){
this.setColumnsDefined(true);
if(this.connected){
if(this.frameRendered){
this.generateColumnCss();
this.renderHeaders();
}
}
};
ntb_treegridp.defineColumnDatasource=function(_173){
var val=_173.getAttribute("Datasource");
if(val!=null){
var ds=new Array();
try{
ds=eval(val);
}
catch(e){
var _176=val.split(",");
if(_176.length>0){
for(var i=0;i<_176.length;i++){
var item=_176[i];
ds[i]={text:item.split(":")[0],display:item.split(":")[1]};
}
}
return;
}
if(typeof (ds)=="object"&&ds.length>0){
var _179=new nitobi.data.DataTable("unbound",this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
var _17a="columnDatasource"+new Date().getTime();
_179.initialize(_17a);
_173.setAttribute("DatasourceId",_17a);
var _17b="";
for(var item in ds[0]){
_17b+=item+"|";
}
_17b=_17b.substring(0,_17b.length-1);
_179.initializeColumns(_17b);
for(var i=0;i<ds.length;i++){
_179.createRecord(null,i);
for(var item in ds[i]){
_179.updateRecord(i,item,ds[i][item]);
}
}
this.data.add(_179);
this.editorDataReady(_173);
}
}
};
ntb_treegridp.defineColumnsFromData=function(_17c){
if(_17c==null){
_17c=this.datatable;
}
var _17d=_17c.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure");
if(_17d==null){
return this.defineColumnsCollection(0);
}
var _17e=_17d.getAttribute("FieldNames");
if(_17e.length==0){
return this.defineColumnsCollection(0);
}
var _17f=_17d.getAttribute("defaults");
var _180=this.defineColumnsFromString(_17e);
for(var i=0;i<_180.length;i++){
if(_17f&&i<_17f.length){
_180[i].setAttribute("initial",_17f[i]||"");
}
_180[i].setAttribute("width",100);
}
this.inferredColumns=true;
return _180;
};
ntb_treegridp.defineColumnsFromString=function(_182){
return this.defineColumnsFromArray(_182.split("|"));
};
ntb_treegridp.defineColumnsFromArray=function(_183){
var cols=_183.length;
var _185=this.defineColumnsCollection(cols);
for(var i=0;i<cols;i++){
var col=_185[i];
if(typeof (_183[i])=="string"){
col.setAttribute("ColumnName",_183[i]);
col.setAttribute("xdatafld_orig",_183[i]);
col.setAttribute("DataField_orig",_183[i]);
col.setAttribute("Label",_183[i]);
if(typeof (this.fieldMap[_183[i]])!="undefined"){
col.setAttribute("xdatafld",this.fieldMap[_183[i]]);
col.setAttribute("DataField",this.fieldMap[_183[i]]);
}else{
col.setAttribute("xdatafld","unbound");
col.setAttribute("DataField","unbound");
}
}else{
if(_183[i].name!="_xk"){
col.setAttribute("ColumnName",col.name);
col.setAttribute("xdatafld_orig",col.name);
col.setAttribute("DataField_orig",col.name);
col.setAttribute("xdatafld",this.fieldMap[_183[i].name]);
col.setAttribute("DataField",this.fieldMap[_183[i].name]);
col.setAttribute("Width",col.width);
col.setAttribute("Label",col.label);
col.setAttribute("Initial",col.initial);
col.setAttribute("Mask",col.mask);
}
}
}
this.setColumnCount(cols);
return _185;
};
ntb_treegridp.defineColumnBindings=function(){
var xslt=nitobi.grid.rowXslProc.stylesheet;
var cols=this.getColumnDefinitions();
for(var i=0;i<cols.length;i++){
var e=cols[i];
this.defineColumnBinding(e,xslt);
e.setAttribute("xi",i);
}
nitobi.grid.rowXslProc=nitobi.xml.createXslProcessor(xslt);
};
ntb_treegridp.defineColumnBinding=function(_18c,xslt){
if(this.fieldMap==null){
return;
}
var _18e=_18c.getAttribute("xdatafld");
var _18f=_18c.getAttribute("xdatafld_orig");
if(_18f==null||_18f==""){
_18c.setAttribute("xdatafld_orig",_18e);
_18c.setAttribute("DataField_orig",_18e);
}else{
_18e=_18c.getAttribute("xdatafld_orig");
}
_18c.setAttribute("ColumnName",_18e);
var _190=this.fieldMap[_18e];
if(typeof (_190)!="undefined"){
_18c.setAttribute("xdatafld",_190);
_18c.setAttribute("DataField",_190);
}
this.formatBinding(_18c,"CssStyle",xslt);
this.formatBinding(_18c,"ClassName",xslt);
this.formatBinding(_18c,"Value",xslt);
};
ntb_treegridp.formatBinding=function(_191,_192,xslt){
var _194=_191.getAttribute(_192);
var _195=_191.getAttribute(_192+"_orig");
if(_194==null||_194==""){
return;
}
if(_195==null||_195==""){
_191.setAttribute(_192+"_orig",_194);
}
_194=_191.getAttribute(_192+"_orig");
var re=new RegExp("\\{.[^}]*}","gi");
var _197=_194.match(re);
if(_197==null){
return;
}
for(var i=0;i<_197.length;i++){
var _199=_197[i];
var _19a=_199;
var _19b=new RegExp("\\$.*?[^0-9a-zA-Z_]","gi");
var _19c=_19a.match(_19b);
for(var j=0;j<_19c.length;j++){
var _19e=_19c[j];
var _19f=_19e.substring(0,_19e.length-1);
var _1a0=_19f.substring(1);
var _1a1=this.fieldMap[_1a0]+"";
_19a=_19a.replace(_19f,_1a1.substring(1)||"");
}
_19a=_19a.substring(1,_19a.length-1);
_194=_194.replace(_199,_19a).replace(/\{\}/g,"");
}
_191.setAttribute(_192,_194);
};
ntb_treegridp.defineColumnsCollection=function(cols){
var xDec=this.model.selectSingleNode("//ntb:columns");
var _1a4=xDec.childNodes;
var _1a5=this.model.selectSingleNode("/state/Defaults/ntb:column");
for(var i=0;i<cols;i++){
var e=_1a5.cloneNode(true);
xDec.appendChild(e);
e.setAttribute("xi",i);
e.setAttribute("title",(i>25?String.fromCharCode(Math.floor(i/26)+65):"")+(String.fromCharCode(i%26+65)));
}
this.setColumnCount(cols);
var _1a4=xDec.selectNodes("*");
return _1a4;
};
ntb_treegridp.resetColumns=function(){
this.fire("BeforeClearColumns");
this.inferredColumns=true;
this.columnsDefined=false;
var _1a8=this.model.selectSingleNode("//ntb:columns");
var xDec=nitobi.xml.createElement(this.model,"columns");
if(_1a8==null){
this.model.documentElement.appendChild(xDec);
}else{
this.model.documentElement.replaceChild(xDec,_1a8);
}
this.setColumnCount(0);
this.fire("AfterClearColumns");
};
ntb_treegridp.renderHeaders=function(){
if(this.getColumnDefinitions().length>0){
this.clearHeader();
this.renderHeader();
}
};
ntb_treegridp.initializeSelection=function(){
var sel=new nitobi.grid.Selection(this,this.isDragFillEnabled());
sel.setRowHeight(this.getRowHeight());
sel.onAfterExpand.subscribe(this.afterExpandSelection,this);
sel.onBeforeExpand.subscribe(this.beforeExpandSelection,this);
sel.onMouseUp.subscribe(this.handleSelectionMouseUp,this);
this.selection=this.Selection=sel;
};
ntb_treegridp.beforeExpandSelection=function(evt){
this.setExpanding(true);
this.fire("BeforeDragFill",new nitobi.base.EventArgs(this,evt));
};
ntb_treegridp.afterExpandSelection=function(evt){
var sel=this.selection;
var _1ae=sel.getCoords();
var _1af=_1ae.top.y;
var _1b0=_1ae.bottom.y;
var _1b1=_1ae.top.x;
var _1b2=_1ae.bottom.x;
var _1b3=this.getTableForSelection({top:{x:sel.expandStartLeftColumn,y:sel.expandStartTopRow},bottom:{x:sel.expandStartRightColumn,y:sel.expandStartBottomRow}},evt.surfacePath);
var data="",_1b5=this.getClipboard();
if(sel.expandingVertical){
if(sel.expandStartBottomRow>_1b0&&_1af>=sel.expandStartTopRow){
for(var i=sel.expandStartLeftColumn;i<=sel.expandStartRightColumn;i++){
for(var j=_1b0+1;j<sel.expandStartBottomRow+1;j++){
this.getCellObject(j,i).setValue("");
}
}
}else{
var _1b8=(sel.expandStartBottomRow<_1b0);
var _1b9=(sel.expandStartTopRow>_1af);
var _1ba=(_1b8||_1b9);
if(_1ba){
if(_1b3.lastIndexOf("\n")==_1b3.length-1){
_1b3=_1b3.substring(0,_1b3.length-1);
}
var rep=(Math.floor((sel.getHeight()-!_1ba)/sel.expandStartHeight));
for(var i=0;i<rep;i++){
data+=_1b3+(nitobi.browser.MOZ||nitobi.browser.SAFARI?"\n":"");
}
_1bc=_1b3.split("\n");
var mod=(sel.getHeight()-!_1ba)%sel.expandStartHeight;
var val="";
if(_1b8){
_1bc.splice(mod,_1bc.length-mod);
val=data+_1bc.join("\n")+(_1bc.length>0?"\n":"");
}else{
_1bc.splice(0,_1bc.length-mod);
val=_1bc.join("\n")+(_1bc.length>0?"\n":"")+data;
}
_1b5.value=val;
this.pasteDataReady(_1b5);
}
}
}else{
if(sel.expandStartRightColumn>_1b2&&_1b1>=sel.expandStartLeftColumn){
for(var i=_1b1+1;i<=sel.expandStartRightColumn+1;i++){
for(var j=sel.expandStartTopRow;j<sel.expandStartBottomRow;j++){
this.getCellObject(j,i).setValue("");
}
}
}else{
var _1bf=sel.expandStartRightColumn<_1b2;
var _1c0=sel.expandStartLeftColumn>_1b1;
var _1ba=(_1bf||_1c0);
if(_1ba){
var mod=(sel.getWidth()-!_1ba)%sel.expandStartWidth;
var _1c1=(nitobi.browser.MOZ||nitobi.browser.SAFARI?"\n":"\r\n");
if(_1b3.lastIndexOf(_1c1)==_1b3.length-_1c1.length){
_1b3=_1b3.substring(0,_1b3.length-_1c1.length);
}
var _1bc=_1b3.replace(/\r/g,"").split("\n");
var data=new Array(_1bc.length);
var rep=(Math.floor((sel.getWidth()-!_1ba)/sel.expandStartWidth));
for(var i=0;i<_1bc.length;i++){
var _1c2=_1bc[i].split("\t");
for(var j=0;j<rep;j++){
data[i]=(data[i]==null?[]:data[i]).concat(_1c2);
}
if(mod!=0){
if(_1bf){
data[i]=data[i].concat(_1c2.splice(0,mod));
}else{
data[i]=_1c2.splice(mod,_1c2.length-mod).concat(data[i]);
}
}
data[i]=data[i].join("\t");
}
_1b5.value=data.join("\n")+"\n";
this.pasteDataReady(_1b5);
}
}
}
this.setExpanding(false);
this.fire("AfterDragFill",new nitobi.base.EventArgs(this,evt));
};
ntb_treegridp.calculateHeight=function(_1c3,end){
_1c3=(_1c3!=null)?_1c3:0;
var _1c5=this.getDisplayedRowCount();
end=(end!=null)?end:_1c5-1;
return (end-_1c3+1)*this.getRowHeight();
};
ntb_treegridp.calculateWidth=function(_1c6,end){
var _1c8=this.getColumnDefinitions();
var cols=_1c8.length;
_1c6=_1c6||0;
end=(end!=null)?Math.min(end,cols):cols;
var wT=0;
for(var i=_1c6;i<end;i++){
if(_1c8[i].getAttribute("Visible")=="1"||_1c8[i].getAttribute("visible")=="1"){
wT+=Number(_1c8[i].getAttribute("Width"));
}
}
return (wT);
};
ntb_treegridp.maximize=function(){
var x,y;
var _1ce=this.element.offsetParent;
x=_1ce.clientWidth;
y=_1ce.clientHeight;
this.resize(x,y);
};
ntb_treegridp.editorDataReady=function(_1cf){
var _1d0=_1cf.getAttribute("DisplayFields").split("|");
var _1d1=_1cf.getAttribute("ValueField");
var _1d2=this.data.getTable(_1cf.getAttribute("DatasourceId"));
var _1d3=_1cf.getAttribute("Initial");
if(_1d3==""){
var _1d4=_1cf.getAttribute("type").toLowerCase();
switch(_1d4){
case "checkbox":
case "listbox":
var _1d5=_1d2.fieldMap[_1d1].substring(1);
var data=_1d2.getDataXmlDoc();
if(data!=null){
var val=data.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_1d5+"='"+_1d3+"']");
if(val==null){
var _1d8=data.selectSingleNode("//"+nitobi.xml.nsPrefix+"e");
if(_1d8!=null){
_1d3=_1d8.getAttribute(_1d5);
}
}
}
break;
}
_1cf.setAttribute("Initial",_1d3);
}
if((_1d0.length==1&&_1d0[0]=="")&&(_1d1==null||_1d1=="")){
for(var item in _1d2.fieldMap){
_1d0[0]=_1d2.fieldMap[item].substring(1);
break;
}
}else{
for(var i=0;i<_1d0.length;i++){
_1d0[i]=_1d2.fieldMap[_1d0[i]].substring(1);
}
}
var _1db=_1d0.join("|");
if(_1d1==null||_1d1==""){
_1d1=_1d0[0];
}else{
_1d1=_1d2.fieldMap[_1d1].substring(1);
}
_1cf.setAttribute("DisplayFields",_1db);
_1cf.setAttribute("ValueField",_1d1);
};
ntb_treegridp.headerClicked=function(_1dc,_1dd){
var _1de=this.getColumnObject(_1dc,_1dd);
var _1df=new nitobi.grid.OnHeaderClickEventArgs(this,_1de);
if(!this.fire("HeaderClick",_1df)||!nitobi.event.evaluate(_1de.getOnHeaderClickEvent(),_1df)){
return;
}
this.sort(_1dc,null,_1dd);
};
ntb_treegridp.addFilter=function(){
this.dataTable.addFilter(arguments);
};
ntb_treegridp.clearFilter=function(){
this.dataTable.clearFilter();
};
ntb_treegridp.sort=function(_1e0,_1e1,_1e2){
var _1e3=this.getColumnObject(_1e0,_1e2);
if(_1e3==null||!_1e3.isSortEnabled()){
return;
}
var _1e4=new nitobi.grid.OnBeforeSortEventArgs(this,_1e3);
if(!this.fire("BeforeSort",_1e4)||!nitobi.event.evaluate(_1e3.getOnBeforeSortEvent(),_1e4)){
return;
}
if(_1e1==null||typeof (_1e1)=="undefined"){
_1e1=(_1e3.getSortDirection()=="Asc")?"Desc":"Asc";
}
if(_1e3.getType().toLowerCase()=="expand"){
return;
}
this.Selection.clear();
this.Scroller.clearSurface(null,null,null,null,_1e2);
var _1e5=this.Scroller.getSurface(_1e2);
_1e5.sort(_1e0,_1e1);
var _1e6=(this.getSortMode()=="local"||(this.getDataMode()=="local"&&this.getSortMode()!="remote"));
if(!_1e6&&_1e5.key=="0"&&this.getPagingMode()!="livescrolling"){
this.loadDataPage(0);
}else{
var _1e7=_1e5.getUnrenderedBlocks(0);
_1e5.performRender(_1e7);
}
this.subscribeOnce("HtmlReady",this.handleAfterSort,this,[_1e3]);
};
ntb_treegridp.handleAfterSort=function(_1e8){
var _1e9=new nitobi.grid.OnAfterSortEventArgs(this,_1e8);
this.fire("AfterSort",_1e9);
nitobi.event.evaluate(_1e8.getOnAfterSortEvent(),_1e9);
};
ntb_treegridp.handleDblClick=function(evt){
var cell=this.activeCellObject;
var col=this.activeColumnObject;
var _1ed=new nitobi.grid.OnCellDblClickEventArgs(this,cell);
return this.fire("CellDblClick",_1ed)&&nitobi.event.evaluate(col.getOnCellDblClickEvent(),_1ed);
};
ntb_treegridp.clearData=function(){
if(this.getDataMode()!="local"){
this.datatable.flush();
}
};
ntb_treegridp.clearColumnHeaderSortOrder=function(){
if(this.sortColumn){
var _1ee=this.sortColumn;
var _1ef=_1ee.getHeaderElement();
var css=_1ef.className;
css=css.replace(/ascending/gi,"").replace(/descending/gi,"");
_1ef.className=css;
this.sortColumn=null;
}
};
ntb_treegridp.initializeState=function(){
};
ntb_treegridp.mapToHtml=function(_1f1){
if(_1f1==null){
_1f1=this.UiContainer;
}
this.Scroller.mapToHtml(_1f1);
this.Scroller.surface.initializeBlock(this.getRowsPerPage());
this.element=document.getElementById("grid"+this.uid);
this.element.jsObject=this;
};
ntb_treegridp.generateCss=function(){
this.generateFrameCss();
};
ntb_treegridp.generateColumnCss=function(){
this.generateCss();
};
ntb_treegridp.generateFrameCss=function(){
var _1f2=nitobi.xml.serialize(this.model);
if(this.oldModel==_1f2){
return;
}
this.oldModel=nitobi.xml.serialize(this.model);
if(nitobi.browser.IE&&document.compatMode=="CSS1Compat"){
this.frameCssXslProc.addParameter("IE","true","");
}
if(nitobi.browser.MOZ||(nitobi.browser.IE&&nitobi.lang.isStandards())){
this.frameCssXslProc.addParameter("useBorders","true","");
}
var _1f3=nitobi.xml.transformToString(this.model,this.frameCssXslProc);
if(!nitobi.browser.SAFARI&&this.stylesheet==null){
this.stylesheet=nitobi.html.Css.createStyleSheet();
}
var ss=this.getScrollSurface();
var _1f5=0;
var _1f6=0;
if(ss!=null){
_1f5=ss.scrollTop;
_1f6=ss.scrollLeft;
}
if(this.oldFrameCss!=_1f3){
this.oldFrameCss=_1f3;
if(nitobi.browser.SAFARI){
this.generateFrameCssSafari();
}else{
try{
this.stylesheet.cssText=_1f3;
}
catch(e){
}
if(ss!=null){
if(nitobi.browser.MOZ){
}
ss.style.top="0px";
ss.style.left="0px";
}
}
}
if(nitobi.grid.RowHoverColor==null){
var _1f7=nitobi.html.getClass("ntb-row-hover");
if(_1f7!=null){
var _1f8=_1f7.backgroundColor.toString();
if(_1f8.indexOf("rgb")>-1){
_1f8=eval("nitobi.drawing."+_1f8);
}
nitobi.grid.RowHoverColor=_1f8;
}
}
if(nitobi.grid.CellHoverColor==null){
var _1f7=nitobi.html.getClass("ntb-cell-hover");
if(_1f7!=null){
var _1f8=_1f7.backgroundColor.toString();
if(_1f8.indexOf("rgb")>-1){
_1f8=eval("nitobi.drawing."+_1f8);
}
nitobi.grid.CellHoverColor=_1f8;
}
}
};
ntb_treegridp.generateFrameCssSafari=function(){
var ss=document.styleSheets[0];
var u=this.uid;
var t=this.getTheme();
var _1fc=this.getWidth();
var _1fd=this.getHeight();
var _1fe=(this.isVScrollbarEnabled()?1:0);
var _1ff=(this.isHScrollbarEnabled()?1:0);
var _200=(this.isToolbarEnabled()?1:0);
var _201=_1fd-this.getscrollbarHeight()*_1ff-this.getToolbarHeight()*_200;
var _202=_1fc-this.getscrollbarWidth()*_1fe;
var _203=_201-this.gettop();
var _204=nitobi.html.Css.addRule;
var p="ntb-grid-";
if(this.rules==null){
this.rules={};
this.rules[".ntb-grid-datablock"]=_204(ss,".ntb-grid-datablock","table-layout:fixed;width:100%;");
this.rules[".ntb-grid-headerblock"]=_204(ss,".ntb-grid-headerblock","table-layout:fixed;width:100%;");
_204(ss,".ntbcellborder"+u,"overflow:hidden;text-decoration:none;margin:0px;border-right:1px solid #c0c0c0;border-bottom:1px solid #c0c0c0;white-space:nowrap;");
_204(ss,"."+p+"overlay"+u,"position:relative;z-index:1000;top:0px;left:0px;");
_204(ss,"."+p+"scroller"+u,"overflow:hidden;text-align:left;");
_204(ss,".ntb-grid","padding:0px;margin:0px;border:1px solid #cccccc;");
_204(ss,".ntb-scroller","padding:0px;spacing:0px;");
_204(ss,".ntb-scrollcorner","padding:0px;spacing:0px;");
_204(ss,".ntb-input-border","table-layout:fixed;overflow:hidden;position:absolute;z-index:2000;top:-2000px;left:-2000px;;");
_204(ss,".ntb-column-resize-surface","filter:alpha(opacity=1);background-color:white;position:absolute;visibility:hidden;top:0;left:0;width:100;height:100;z-index:800;");
_204(ss,".ntb-column-indicator","overflow:hidden;white-space: nowrap;");
}
this.rules["#grid"+u]=_204(ss,"#grid"+u,"overflow:hidden;text-align:left;-moz-user-select: none;-khtml-user-select: none;user-select: none;"+(nitobi.browser.IE?"position:relative;":""));
this.rules["#grid"+u].style.height=_1fd+"px";
this.rules["#grid"+u].style.width=_1fc+"px";
_204(ss,".vScrollbarRange"+u,"");
_204(ss,"."+t+" .ntb-cell","overflow:hidden;white-space:nowrap;");
_204(ss,"."+t+" .ntb-cell-border","overflow:hidden;white-space:nowrap;"+(nitobi.browser.IE?"height:auto;":"")+";");
_204(ss,".ntb-grid-headershow"+u,"padding:0px;spacing:0px;"+(this.isColumnIndicatorsEnabled()?"display:none;":"")+"");
_204(ss,".ntb-grid-vscrollshow"+u,"padding:0px;spacing:0px;"+(_1fe?"":"display:none;")+"");
_204(ss,".ntb-grid-hscrollshow"+u,"padding:0px;spacing:0px;"+(_1ff?"":"display:none;")+"");
_204(ss,".ntb-grid-toolbarshow"+u,""+(_200?"":"display:none;")+"");
_204(ss,".ntb-grid-height"+u,"height:"+_1fd+"px;overflow:hidden;");
_204(ss,".ntb-grid-width"+u,"width:"+_1fc+"px;overflow:hidden;");
_204(ss,".ntb-grid-overlay"+u,"position:relative;z-index:1000;top:0px;left:0px;");
_204(ss,".ntb-grid-scroller"+u,"overflow:hidden;text-align:left;");
_204(ss,".ntb-grid-scrollerwidth"+u,"width:"+_202+"px;");
_204(ss,".ntb-grid-topheight"+u,"height:"+this.gettop()+"px;overflow:hidden;"+(this.gettop()==0?"display:none;":"")+"");
_204(ss,".ntb-grid-leftwidth"+u,"width:"+this.getleft()+"px;overflow:hidden;text-align:left;");
_204(ss,".ntb-grid-centerwidth"+u,"width:"+(_1fc-this.getleft()-this.getscrollbarWidth()*_1fe)+"px;");
_204(ss,".ntb-grid-scrollbarheight"+u,"height:"+this.getscrollbarHeight()+"px;");
_204(ss,".ntb-grid-scrollbarwidth"+u,"width:"+this.getscrollbarWidth()+"px;");
_204(ss,".ntb-grid-toolbarheight"+u,"height:"+this.getToolbarHeight()+"px;");
_204(ss,".ntb-grid-surfaceheight"+u,"height:100px;");
_204(ss,".ntb-row"+u,"height:"+this.getRowHeight()+"px;margin:0px;line-height:"+this.getRowHeight()+"px;");
_204(ss,".ntb-header-row"+u,"height:"+this.getHeaderHeight()+"px;");
var _206=this.model.selectNodes("//ntb:treegrid/ntb:columns");
for(var i=0;i<_206.length;i++){
var _208=_206[i];
var id=_208.getAttribute("id");
var _20a=0;
for(var j=1,_20c=_208.childNodes;j<=_20c.length;j++){
var col=_20c[j-1];
var colW=col.getAttribute("Width");
_1fc+=(colW&&colW!=""?parseInt(colW):0);
var _20f=this.rules[".ntb-column"+u+(id!=""?"_"+id:"")+"_"+(j)];
if(_20f==null){
_20f=this.rules[".ntb-column"+u+(id!=""?"_"+id:"")+"_"+(j)]=_204(ss,".ntb-column"+u+(id!=""?"_"+id:"")+"_"+(j));
}
_20f.style.width=colW+"px";
var _210=this.rules[".ntb-column-data"+u+(id!=""?"_"+id:"")+"_"+(j)];
if(_210==null){
this.rules[".ntb-column-data"+u+(id!=""?"_"+id:"")+"_"+(j)]=_204(ss,".ntb-column-data"+u+(id!=""?"_"+id:"")+"_"+(j),"text-align:"+col.getAttribute("Align")+";");
}
}
var _211=this.calculateColumnDepth(_208,0);
_204(ss,".ntb-hscrollbar",(_20a>_1fc?"display:block":"display:none"));
_204(ss,".ntb-grid-midheight"+u+"-0","overflow:hidden;height:"+(_20a>_1fc?_203:_203+this.getscrollbarHeight())+"px;");
if(id==this.getRootColumns()){
_204(ss,".ntb-grid-scrollerheight"+u,"height:"+(_20a>_1fc?_201:_201+this.getscrollbarHeight())+"px;");
}
_204(ss,".hScrollbarRange"+u,"width:"+_20a+"px;");
if(id==this.getRootColumns()){
var rule=_204(ss,".ntb-grid-surfacewidth"+u+"-"+id,"width:"+this.getViewableWidth()+"px;");
}else{
_204(ss,".ntb-grid-surfacewidth"+u+"-"+id,"width:"+(this.getViewableWidth()-(_211*this.getGroupOffset())-1)+"px;");
}
}
};
ntb_treegridp.calculateColumnDepth=function(_213,_214){
var id=_213.getAttribute("id");
if(id==this.getRootColumns()){
return _214;
}
var _216=this.model.selectSingleNode("//ntb:columns/ntb:column[@ChildColumnSet='"+id+"' and @type='EXPAND']/parent::ntb:columns");
return this.calculateColumnDepth(_216,_214+1);
};
ntb_treegridp.clearSurfaces=function(){
this.selection.clearBoxes();
this.Scroller.clearSurface();
this.updateCellRanges();
};
ntb_treegridp.clearHeader=function(){
this.Scroller.clearSurface(false,true);
};
ntb_treegridp.renderFrame=function(){
var _217="IE";
if(nitobi.browser.MOZ){
_217="MOZ";
}else{
if(nitobi.browser.SAFARI){
_217="SAFARI";
}
}
this.frameXslProc.addParameter("browser",_217,"");
this.UiContainer.innerHTML=nitobi.xml.transformToString(this.model,this.frameXslProc);
this.frameRendered=true;
this.fire("AfterFrameRender");
};
ntb_treegridp.renderSurface=function(){
if(!this.Scroller){
throw "Can't render the surface without a Scroller";
}
var _218=this.Scroller.surface.renderContainer(this.uid);
$("ntb-grid-surface-container-"+this.uid).innerHTML=_218;
};
ntb_treegridp.renderHeader=function(){
var _219=0;
endRow=this.getfreezetop()-1;
var tl=this.Scroller.surface.view.topleft;
tl.top=this.getHeaderHeight();
tl.left=0;
var tc=this.Scroller.surface.view.topcenter;
tc.top=this.getHeaderHeight();
tc.left=0;
tc.renderGap(_219,endRow,false);
};
ntb_treegridp.renderMiddle=function(){
this.Scroller.view.midleft.flushCache();
this.Scroller.view.midcenter.flushCache();
};
ntb_treegridp.refresh=function(){
var _21c=null;
if(!this.fire("BeforeRefresh",_21c)){
return;
}
var rows=(this.getPagingMode()==nitobi.grid.PAGINGMODE_STANDARD?this.getRowsPerPage():this.scroller.surface.rows);
this.setRowCount(rows);
this.scroller.surface.displayedRowCount=rows;
this.scroller.surface.rows=rows;
this.clear();
this.syncWithData();
this.subscribeOnce("HtmlReady",this.handleAfterRefresh,this);
};
ntb_treegridp.handleAfterRefresh=function(){
var _21e=null;
this.fire("AfterRefresh",_21e);
};
ntb_treegridp.clear=function(){
this.selectedRows=[];
this.clearData();
this.scroller.purgeSurfaces();
this.scroller.clearSurface();
this.clearSubHeaders();
this.clearSurfaces();
};
ntb_treegridp.handleContextMenu=function(evt,obj){
var _221=this.getOnContextMenuEvent();
if(_221==null){
return true;
}else{
if(this.fire("ContextMenu")){
return true;
}else{
evt.cancelBubble=true;
evt.returnValue=false;
return false;
}
}
};
ntb_treegridp.handleKeyPress=function(evt){
if(this.activeCell==null){
return;
}
var col=this.activeColumnObject;
this.fire("KeyPress",new nitobi.base.EventArgs(this,evt));
nitobi.event.evaluate(col.getOnKeyPressEvent(),evt);
nitobi.html.cancelEvent(evt);
return false;
};
ntb_treegridp.handleKeyUp=function(evt){
if(this.activeCell==null){
return;
}
var col=this.activeColumnObject;
this.fire("KeyUp",new nitobi.base.EventArgs(this,evt));
nitobi.event.evaluate(col.getOnKeyUpEvent(),evt);
};
ntb_treegridp.handleKey=function(evt,obj){
if(this.activeCell!=null){
var col=this.activeColumnObject;
var _229=new nitobi.base.EventArgs(this,evt);
if(!this.fire("KeyDown",_229)||!nitobi.event.evaluate(col.getOnKeyDownEvent(),_229)){
return;
}
}
var k=evt.keyCode;
k=k+(evt.shiftKey?256:0)+(evt.ctrlKey?512:0)+(evt.metaKey?1024:0);
switch(k){
case 529:
break;
case 35:
break;
case 36:
break;
case 547:
break;
case 548:
break;
case 34:
this.page(1);
break;
case 33:
this.page(-1);
break;
case 45:
this.insertAfterCurrentRow();
break;
case 46:
if(this.getSelectedRows().length>1){
this.deleteSelectedRows();
}else{
this.deleteCurrentRow();
}
break;
case 292:
this.selectHome();
break;
case 290:
this.pageSelect(1);
break;
case 289:
this.pageSelect(-1);
break;
case 296:
this.reselect(0,1);
break;
case 294:
this.reselect(0,-1);
break;
case 293:
this.reselect(-1,0);
break;
case 295:
this.reselect(1,0);
break;
case 577:
break;
case 579:
case 557:
this.copy(evt);
return true;
case 1091:
this.copy(evt);
return true;
case 600:
case 302:
break;
case 598:
case 301:
this.paste(evt);
return true;
break;
case 1110:
this.paste(evt);
return true;
case 35:
break;
case 36:
break;
case 547:
break;
case 548:
break;
case 13:
if(this.activeCell&&this.activeCell.getAttribute("ebatype")=="expander"){
this.toggleSurface(this.activeCell);
break;
}
var et=this.getEnterTab().toLowerCase();
var _22c=0;
var vert=1;
if(et=="left"){
_22c=-1;
vert=0;
}else{
if(et=="right"){
_22c=1;
vert=0;
}else{
if(et=="down"){
_22c=0;
vert=1;
}else{
if(et=="up"){
_22c=0;
vert=-1;
}
}
}
}
this.move(_22c,vert);
break;
case 40:
this.move(0,1);
break;
case 269:
case 38:
this.move(0,-1);
break;
case 265:
case 37:
this.move(-1,0);
break;
case 9:
case 39:
this.move(1,0);
break;
case 577:
break;
case 595:
this.save();
break;
case 594:
this.refresh();
break;
case 590:
this.insertAfterCurrentRow();
break;
default:
this.edit(evt);
}
};
ntb_treegridp.reselect=function(x,y){
var C=nitobi.grid.Cell;
var S=this.selection;
var row=C.getRowNumber(S.endCell)+y;
var _233=C.getColumnNumber(S.endCell)+x;
var _234=C.getSurfacePath(S.startCell);
var _235=this.scroller.getSurface(_234);
var _236=_235.columnsNode.childNodes.length;
var _237=C.getSurfacePath(S.endCell);
var _238=C.getRowNumber(S.endCell);
var _239=this.scroller.getSurface(_237+"_"+_238);
if(_233>=0&&_233<this.columnCount()&&row>=0){
var _23a=this.getCellElement(row,_233,_234);
var _23b=this.scroller.getSurface(_234+"_"+row);
if(!_23a||(_239&&_239.isVisible&&y>0)||(_23b&&_23b.isVisible&&y<0)){
return;
}
S.changeEndCellWithDomNode(_23a);
S.alignBoxes();
this.ensureCellInView(_23a);
}
};
ntb_treegridp.pageSelect=function(dir){
};
ntb_treegridp.selectHome=function(){
var S=this.selection;
var row=nitobi.grid.Cell.getRowNumber(S.endCell);
this.reselect(0,-row);
};
ntb_treegridp.edit=function(evt){
if(this.activeCell==null){
return;
}
var cell=this.activeCellObject;
var col=this.activeColumnObject;
if(this.activeCell&&this.activeCell.getAttribute("ebatype")=="expander"){
return;
}
var _242=new nitobi.grid.OnBeforeCellEditEventArgs(this,cell);
if(!this.fire("BeforeCellEdit",_242)||!nitobi.event.evaluate(col.getOnBeforeCellEditEvent(),_242)){
return;
}
var _243=null;
var _244=null;
var ctrl=null;
if(evt){
_243=evt.keyCode||null;
_244=evt.shiftKey||null;
ctrl=evt.ctrlKey||null;
}
var _246="";
var _247=null;
if((_244&&(_243>64)&&(_243<91))||(!_244&&((_243>47)&&(_243<58)))){
_247=0;
}
if(!_244){
if((_243>64)&&(_243<91)){
_247=32;
}else{
if(_243>95&&_243<106){
_247=-48;
}else{
if((_243==189)||(_243==109)){
_246="-";
}else{
if((_243>186)&&(_243<188)){
_247=-126;
}
}
}
}
}else{
}
if(_247!=null){
_246=String.fromCharCode(_243+_247);
}
if((!ctrl)&&(""!=_246)||(_243==113)||(_243==0)||(_243==null)||(_243==32)){
if(col.isEditable()){
this.cellEditor=nitobi.form.ControlFactory.instance.getEditor(this,col);
if(this.cellEditor==null){
return;
}
this.cellEditor.setEditCompleteHandler(this.editComplete);
this.cellEditor.attachToParent(this.getToolsContainer());
this.cellEditor.bind(this,cell,_246);
this.cellEditor.mimic();
this.setEditMode(true);
nitobi.html.cancelEvent(evt);
return false;
}
}else{
return;
}
};
ntb_treegridp.editComplete=function(_248){
var cell=_248.cell;
var _24a=cell.getColumnObject();
var _24b=_248.databaseValue;
var _24c=_248.displayValue;
var _24d=new nitobi.grid.OnCellValidateEventArgs(this,cell,_24b,cell.getValue());
if(!this.fire("CellValidate",_24d)||!nitobi.event.evaluate(_24a.getOnCellValidateEvent(),_24d)){
return false;
}
cell.setValue(_24b,_24c);
_248.editor.hide();
this.setEditMode(false);
var _24e=new nitobi.grid.OnAfterCellEditEventArgs(this,cell);
this.fire("AfterCellEdit",_24e);
nitobi.event.evaluate(_24a.getOnAfterCellEditEvent(),_24e);
try{
this.focus();
}
catch(e){
}
};
ntb_treegridp.autoSave=function(){
if(this.isAutoSaveEnabled()){
return this.save();
}
return false;
};
ntb_treegridp.selectCellByCoords=function(row,_250,_251){
_251=_251||0;
this.setPosition(row,_250,_251);
};
ntb_treegridp.setPosition=function(row,_253,_254){
_254=_254||0;
if(row>=0&&_253>=0){
this.setActiveCell(this.getCellElement(row,_253,_254));
}
};
ntb_treegridp.save=function(){
if(!this.fire("BeforeSave")){
return;
}
this.scroller.surface.save();
};
ntb_treegridp.saveCompleteHandler=function(_255){
if(this.getDataSource().getHandlerError()){
this.fire("HandlerError",_255);
}
this.fire("AfterSave",_255);
};
ntb_treegridp.focus=function(){
try{
this.keyNav.focus();
this.fire("Focus",new nitobi.base.EventArgs(this));
if(!nitobi.browser.SAFARI){
nitobi.html.cancelEvent(nitobi.html.Event);
return false;
}
}
catch(e){
}
};
ntb_treegridp.blur=function(){
this.clearActiveRows();
this.selection.clear();
this.blurActiveCell(null);
this.activateCell(null);
this.fire("Blur",new nitobi.base.EventArgs(this));
};
ntb_treegridp.getRendererForColumn=function(col){
var _257=this.getColumnCount();
if(col>=_257){
col=_257-1;
}
var _258=this.getFrozenLeftColumnCount();
if(col<frozenLeft){
return this.MidLeftRenderer;
}else{
return this.MidCenterRenderer;
}
};
ntb_treegridp.getColumnOuterTemplate=function(col){
return this.getRendererForColumn(col).xmlTemplate.selectSingleNode("//*[@match='ntb:e']/div/div["+col+"]");
};
ntb_treegridp.getColumnInnerTemplate=function(col){
return this.getColumnOuterXslTemplate(col).selectSingleNode("*[2]");
};
ntb_treegridp.makeXSL=function(){
var fL=this.getFrozenLeftColumnCount();
var cs=this.getColumnCount();
var rh=this.isRowHighlightEnabled();
var _25e="_default";
if(this.datatable!=null){
_25e=this.datatable.id;
}
var _25f=0;
var _260=fL;
var _261=this.model.selectSingleNode("state/nitobi.grid.Columns");
this.scroller.surface.view.topleft.rowRenderer.generateXslTemplate(_261,null,_25f,_260,this.isColumnIndicatorsEnabled(),this.isRowIndicatorsEnabled(),rh);
this.scroller.surface.view.topleft.rowRenderer.dataTableId=_25e;
_25f=fL;
_260=cs-fL;
this.scroller.surface.view.topcenter.rowRenderer.generateXslTemplate(_261,null,_25f,_260,this.isColumnIndicatorsEnabled(),this.isRowIndicatorsEnabled(),rh);
this.scroller.surface.view.topcenter.rowRenderer.dataTableId=_25e;
this.scroller.surface.view.midleft.rowRenderer.generateXslTemplate(_261,null,0,fL,0,this.isRowIndicatorsEnabled(),rh,"left");
this.scroller.surface.view.midleft.rowRenderer.dataTableId=_25e;
this.scroller.surface.view.midcenter.rowRenderer.generateXslTemplate(_261,null,fL,cs-fL,0,0,rh);
this.scroller.surface.view.midcenter.rowRenderer.dataTableId=_25e;
this.fire("AfterMakeXsl");
};
ntb_treegridp.render=function(){
this.generateCss();
this.updateCellRanges();
};
ntb_treegridp.refilter=ntb_treegridp.render;
ntb_treegridp.getColumnDefinitions=function(){
var _262=this.getRootColumnsElement();
if(_262){
return _262.childNodes;
}
};
ntb_treegridp.getVisibleColumnDefinitions=function(){
return this.model.selectNodes("state/nitobi.grid.Columns/*[@Visible='1']");
};
ntb_treegridp.initializeModelFromDeclaration=function(){
var _263=this.Declaration.grid.documentElement.attributes;
var len=_263.length;
for(var i=0;i<len;i++){
var _266=_263[i];
var _267=this.properties[_266.nodeName];
if(_267!=null){
this["set"+_267.n](_266.nodeValue);
}
}
this.model.documentElement.setAttribute("ID",this.uid);
this.model.documentElement.setAttribute("uniqueID",this.uid);
};
ntb_treegridp.initializeModelDefaults=function(){
var _268=this.Declaration.grid.documentElement.attributes;
var len=_268.length;
for(var i=0;i<len;i++){
var _26b=_268[i];
var _26c=this.properties[_26b.nodeName];
if(_26c!=null){
this["set"+_26c.n](_26b.nodeValue);
}
}
};
ntb_treegridp.setModelValues=function(_26d,_26e){
var _26f=_26d.getAttribute("DataType");
var _270=_26d.getAttribute("type").toLowerCase();
var _271=_26e.attributes;
for(var j=0;j<_271.length;j++){
var _273=_271[j];
var _274=_273.nodeName.toLowerCase();
var _275=this.xColumnProperties[_26f+"column"][_274]||this.xColumnProperties["column"][_274];
var _276=_273.nodeValue;
if(_275.t=="b"){
_276=nitobi.lang.boolToStr(nitobi.lang.toBool(_276));
}
_26d.setAttribute(_275.n,_276);
}
var _277=_26e.selectSingleNode("./ntb:"+_270+"editor");
if(_277==null){
return;
}
var _278=_277.attributes;
for(var j=0;j<_278.length;j++){
var _273=_278[j];
var _274=_273.nodeName.toLowerCase();
var _275=this.xColumnProperties[_270+"editor"][_274];
var _276=_273.nodeValue;
if(_275.t=="b"){
_276=nitobi.lang.boolToStr(nitobi.lang.toBool(_276));
}
_26d.setAttribute(_275.n,_276);
}
};
ntb_treegridp.getNewRecordKey=function(){
var _279;
var key;
var _27b;
do{
_279=new Date();
key=(_279.getTime()+"."+Math.round(Math.random()*99));
_27b=this.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xk = '"+key+"']");
}while(_27b!=null);
return key;
};
ntb_treegridp.insertAfterCurrentRow=function(){
if(this.activeCell){
var _27c=nitobi.grid.Cell.getRowNumber(this.activeCell);
this.insertRow(_27c+1,nitobi.grid.Cell.getSurfacePath(this.activeCell));
}else{
this.insertRow();
}
};
ntb_treegridp.insertRow=function(_27d,_27e){
var _27f=this.Scroller.getSurface(_27e);
var rows=parseInt(_27f.rows);
var xi=0;
if(_27d!=null){
xi=parseInt((_27d==null?rows:parseInt(_27d)));
xi--;
}
var _282=new nitobi.grid.OnBeforeRowInsertEventArgs(this,this.getRowObject(xi));
if(!this.isRowInsertEnabled()||!this.fire("BeforeRowInsert",_282)){
return;
}
_27f.insertRow(xi);
this.subscribeOnce("HtmlReady",this.handleAfterRowInsert,this,[xi]);
};
ntb_treegridp.handleAfterRowInsert=function(xi){
this.fire("AfterRowInsert",new nitobi.grid.OnAfterRowInsertEventArgs(this,this.getRowObject(xi)));
this.setActiveCell(this.getCellElement(xi,0));
};
ntb_treegridp.deleteCurrentRow=function(){
if(this.activeCell){
this.deleteRow(nitobi.grid.Cell.getRowNumber(this.activeCell),nitobi.grid.Cell.getSurfacePath(this.activeCell));
}else{
alert("First select a record to delete.");
}
};
ntb_treegridp.deleteRow=function(_284,_285){
var _286=new nitobi.grid.OnBeforeRowDeleteEventArgs(this,this.getRowObject(_284));
if(!this.isRowDeleteEnabled()||!this.fire("BeforeRowDelete",_286)){
return;
}
var _287=this.Scroller.getSurface(_285||"0");
this.Selection.clearBoxes();
var rows=this.getDisplayedRowCount();
try{
_287.deleteRow(_284);
rows--;
if(rows<=0){
this.activeCell=null;
}
}
catch(err){
this.dataBind();
}
};
ntb_treegridp.handleAfterRowDelete=function(xi,_28a){
_28a=_28a||"0";
this.fire("AfterRowDelete",new nitobi.grid.OnBeforeRowDeleteEventArgs(this,this.getRowObject(xi)));
this.setActiveCell(this.getCellElement(xi,0,_28a));
};
ntb_treegridp.page=function(dir){
};
ntb_treegridp.move=function(h,v){
if(this.activeCell!=null){
var hs=1;
var vs=1;
h=(h*hs);
v=(v*vs);
var _290=nitobi.grid.Cell.getSurfacePath(this.activeCell);
var cell=nitobi.grid.Cell;
var _292=cell.getColumnNumber(this.activeCell);
var _293=cell.getRowNumber(this.activeCell);
var _294=_292+h;
var _295=_293+v;
var _296=_290;
if(v>0){
var _297=this.scroller.getSurface(_290);
if(_297&&_293==_297.rows-1){
_298=_297.parent;
_295=_297.rowIndex+v;
var max=_298.columnsNode.childNodes.length-1;
if(_294>max){
_294=max;
}
_296=_298.key;
}else{
var _29a=this.scroller.getSurface(_290+"_"+_293);
if(_29a&&_29a.isVisible){
_295=0;
var max=_29a.columnsNode.childNodes.length-1;
if(_294>max){
_294=max;
}
_296=_29a.key;
}
}
}else{
if(v<0){
var _297=this.scroller.getSurface(_290);
if(_297&&_293==0){
var _298=_297.parent;
if(_298){
_295=_297.rowIndex;
var max=_298.columnsNode.childNodes.length-1;
if(_294>max){
_294=max;
}
_296=_298.key;
}
}else{
var _29a=this.scroller.getSurface(_290+"_"+(_293+v));
if(_29a&&_29a.isVisible){
_295=_29a.rows-1;
var max=_29a.columnsNode.childNodes.length-1;
if(_294>max){
_294=max;
}
_296=_29a.key;
}
}
}
}
this.selectCellByCoords(_295,_294,_296);
var _29b=new nitobi.grid.CellEventArgs(this,this.activeCell);
if(_292+1==this.getVisibleColumnDefinitions().length&&h==1){
this.fire("HitRowEnd",_29b);
}else{
if(_292==0&&h==-1){
this.fire("HitRowStart",_29b);
}
}
}
};
ntb_treegridp.handleSelectionMouseUp=function(evt){
if(this.isCellClicked()){
this.ensureCellInView(this.activeCell);
}
this.setCellClicked(false);
if(this.isSingleClickEditEnabled()){
this.edit(evt);
}else{
if(!nitobi.browser.IE){
this.focus();
}
}
};
ntb_treegridp.loadNextDataPage=function(){
this.loadDataPage(this.getCurrentPageIndex()+1);
};
ntb_treegridp.loadPreviousDataPage=function(){
this.loadDataPage(this.getCurrentPageIndex()-1);
};
ntb_treegridp.GetPage=function(_29d){
ebaErrorReport("GetPage is deprecated please use loadDataPage instead","",EBA_DEBUG);
this.loadDataPage(_29d);
};
ntb_treegridp.loadDataPage=function(_29e){
};
ntb_treegridp.getSelectedRow=function(rel){
try{
var nRow=-1;
var AC=this.activeCell;
if(AC!=null){
nRow=nitobi.grid.Cell.getRowNumber(AC);
if(rel){
nRow-=this.getfreezetop();
}
}
return nRow;
}
catch(err){
_ntbAssert(false,err.message);
}
};
ntb_treegridp.handleHandlerError=function(){
var _2a2=this.getDataSource().getHandlerError();
if(_2a2){
this.fire("HandlerError");
}
};
ntb_treegridp.getRowObject=function(_2a3,_2a4){
var _2a5=_2a4;
if(_2a4==null&&_2a3!=null){
_2a5=_2a3;
}
return new nitobi.grid.Row(this,_2a5);
};
ntb_treegridp.getSelectedColumn=function(rel){
try{
var nCol=-1;
var AC=this.activeCell;
if(AC!=null){
nCol=parseInt(AC.getAttribute("col"));
if(rel){
nCol-=this.getFrozenLeftColumnCount();
}
}
return nCol;
}
catch(err){
_ntbAssert(false,err.message);
}
};
ntb_treegridp.getSelectedColumnName=function(){
var _2a9=this.getSelectedColumnObject();
return _2a9.getColumnName();
};
ntb_treegridp.getSelectedColumnObject=function(){
var ac=this.activeCell;
return this.getColumnObject(this.getSelectedColumn(),(ac?ac.getAttribute("path"):"0"));
};
ntb_treegridp.columnCount=function(){
try{
var _2ab=this.getColumnDefinitions();
return _2ab.length;
}
catch(err){
_ntbAssert(false,err.message);
}
};
ntb_treegridp.getCellObject=function(row,col,_2ae){
_2ae=_2ae||"0";
var _2af=this.scroller.getSurface(_2ae);
if(_2af){
return _2af.getCellObject(row,col);
}else{
return null;
}
};
ntb_treegridp.getCellText=function(row,col,_2b2){
var cell=this.getCellObject(row,col,_2b2);
if(cell){
return cell.getHtml();
}else{
return null;
}
};
ntb_treegridp.getCellValue=function(row,col,_2b6){
var cell=this.getCellObject(row,col,_2b6);
if(cell){
return cell.getValue();
}else{
return null;
}
};
ntb_treegridp.getCellElement=function(row,_2b9,_2ba){
_2ba=_2ba||"0";
return document.getElementById("cell_"+row+"_"+_2b9+"_"+this.uid+"_"+_2ba);
};
ntb_treegridp.getSelectedRowObject=function(xi){
var obj=null;
var r=nitobi.grid.Cell.getRowNumber(this.activeCell);
obj=new nitobi.grid.Row(this,r);
return obj;
};
ntb_treegridp.getColumnObject=function(_2be,_2bf){
_2bf=_2bf||"0";
var _2c0=this.Scroller.getSurface(_2bf);
if(_2c0){
return _2c0.getColumnObject(_2be);
}else{
return null;
}
};
ntb_treegridp.getSelectedCellObject=function(){
var obj=this.activeCellObject;
if(obj==null){
obj=this.activeCell;
if(obj!=null){
var Cell=nitobi.grid.Cell;
var r=Cell.getRowNumber(obj);
var _2c4=nitobi.grid.Cell.getSurfacePath(obj);
var c=Cell.getColumnNumber(obj);
obj=this.getCellObject(r,c,_2c4);
}
}
return obj;
};
ntb_treegridp.autoAddRow=function(){
if(this.activeCell.innerText.replace(/\s/g,"")!=""&&this.autoAdd){
this.deactivateCell();
if(this.active=="Y"){
this.freezeCell();
}
eval(this.getOnRowBlurEvent());
this.insertRow();
this.go("HOME");
this.editCell();
}
};
ntb_treegridp.setDisplayedRowCount=function(_2c6){
if(this.Scroller){
this.Scroller.surface.view.midcenter.rows=_2c6;
this.Scroller.surface.view.midleft.rows=_2c6;
}
this.displayedRowCount=_2c6;
};
ntb_treegridp.getDisplayedRowCount=function(){
return this.displayedRowCount;
};
ntb_treegridp.getToolsContainer=function(){
this.toolsContainer=this.toolsContainer||document.getElementById("ntb-grid-toolscontainer"+this.uid);
return this.toolsContainer;
};
ntb_treegridp.getHeaderContainer=function(){
return document.getElementById("ntb-grid-header"+this.uid+"_"+this.scroller.surface.key);
};
ntb_treegridp.getSubHeaderContainer=function(){
return document.getElementById("ntb-grid-subheader-container"+this.uid);
};
ntb_treegridp.getDataContainer=function(){
return document.getElementById("ntb-grid-data"+this.uid);
};
ntb_treegridp.getScrollerContainer=function(){
return document.getElementById("ntb-grid-scroller"+this.uid);
};
ntb_treegridp.getGridContainer=function(){
return nitobi.html.getFirstChild(this.UiContainer);
};
ntb_treegridp.copy=function(){
var _2c7=this.selection.getCoords();
var _2c8=nitobi.grid.Cell.getSurfacePath(this.activeCell);
var data=this.getTableForSelection(_2c7,_2c8);
var _2ca=new nitobi.grid.OnCopyEventArgs(this,data,_2c7);
if(!this.isCopyEnabled()||!this.fire("BeforeCopy",_2ca)){
return;
}
if(!nitobi.browser.IE){
var _2cb=this.getClipboard();
_2cb.onkeyup=nitobi.lang.close(this,this.focus);
_2cb.value=data;
_2cb.focus();
_2cb.setSelectionRange(0,_2cb.value.length);
}else{
window.clipboardData.setData("Text",data);
}
this.fire("AfterCopy",_2ca);
};
ntb_treegridp.getTableForSelection=function(_2cc,_2cd){
var _2ce=this.getColumnMap(_2cc.top.x,_2cc.bottom.x,_2cd);
_2cd=_2cd||"0";
var _2cf=this.Scroller.getSurface(_2cd);
var _2d0=nitobi.data.FormatConverter.convertEbaXmlToTsv(_2cf.dataTable.xmlDoc,_2ce,_2cc.top.y,_2cc.bottom.y);
return _2d0;
};
ntb_treegridp.getColumnMap=function(_2d1,_2d2,_2d3){
var _2d4=this.Scroller.getSurface(_2d3||"0");
var _2d5=_2d4.columnsNode.childNodes;
_2d1=(_2d1==null)?0:_2d1;
_2d2=(_2d2==null)?_2d5.length-1:_2d2;
var map=new Array();
for(var i=_2d1;i<=_2d2&&(null!=_2d5[i]);i++){
map.push(_2d5[i].getAttribute("xdatafld").substr(1));
}
return map;
};
ntb_treegridp.paste=function(){
if(!this.isPasteEnabled()){
return;
}
var _2d8=this.getClipboard();
_2d8.onkeyup=nitobi.lang.close(this,this.pasteDataReady,[_2d8]);
_2d8.focus();
return _2d8;
};
ntb_treegridp.pasteDataReady=function(_2d9){
_2d9.onkeyup=null;
var _2da=this.selection;
var _2db=_2da.getCoords();
var _2dc=_2db.top.x;
var _2dd=_2dc+nitobi.data.FormatConverter.getDataColumns(_2d9.value)-1;
var _2de=true;
var _2df=nitobi.grid.Cell.getSurfacePath(this.activeCell);
for(var i=_2dc;i<=_2dd;i++){
var _2e1=this.getColumnObject(i,_2df);
if(_2e1){
if(!_2e1.isEditable()){
_2de=false;
break;
}
}
}
if(!_2de){
this.fire("PasteFailed",new nitobi.base.EventArgs(this));
this.handleAfterPaste();
return;
}else{
var _2e2=this.getColumnMap(_2dc,_2dd,_2df);
var _2e3=_2db.top.y;
var _2e4=Math.max(_2e3+nitobi.data.FormatConverter.getDataRows(_2d9.value)-1,0);
this.getSelection().selectWithCoords(_2e3,_2dc,_2e4,_2dc+_2e2.length-1,_2df);
var _2e5=new nitobi.grid.OnPasteEventArgs(this,_2d9.value,_2db);
if(!this.fire("BeforePaste",_2e5)){
return;
}
var _2e6=_2d9.value;
var _2e7=null;
if(_2e6.substr(0,1)=="<"){
_2e7=nitobi.data.FormatConverter.convertHtmlTableToEbaXml(_2e6,_2e2,_2e3);
}else{
_2e7=nitobi.data.FormatConverter.convertTsvToEbaXml(_2e6,_2e2,_2e3);
}
if(_2e7.documentElement!=null){
var _2e8=this.Scroller.getSurface(_2df);
_2e8.dataTable.mergeFromXml(_2e7,nitobi.lang.close(this,this.pasteComplete,[_2e7,_2e3,_2e4,_2e5,_2e8]));
}
}
};
ntb_treegridp.pasteComplete=function(_2e9,_2ea,_2eb,_2ec,_2ed){
_2ed.reRender(_2ea,_2eb);
this.subscribeOnce("HtmlReady",this.handleAfterPaste,this,[_2ec]);
};
ntb_treegridp.handleAfterPaste=function(_2ee){
this.fire("AfterPaste",_2ee);
};
ntb_treegridp.getClipboard=function(){
var _2ef=document.getElementById("ntb-clipboard"+this.uid);
_2ef.onkeyup=null;
_2ef.value="";
return _2ef;
};
ntb_treegridp.handleHtmlReady=function(_2f0){
this.fire("HtmlReady",new nitobi.base.EventArgs(this));
};
ntb_treegridp.toggleSurface=function(cell){
var C=nitobi.grid.Cell;
var Css=nitobi.html.Css;
var _2f4=C.getSurfacePath(cell);
var _2f5=C.getRowNumber(cell);
var _2f6=_2f4+"_"+_2f5;
var _2f7=this.scroller.getSurface(_2f6);
if(_2f7!=null){
if(_2f7.isVisible){
this.toggleExpanderIcon(cell,false);
if(_2f7.isCellInSurface(this.activeCell)){
this.selectCellByCoords(_2f5,1,_2f7.parent.key);
}
_2f7.onSetVisible.subscribeOnce(this.handleToggleSurface,this);
_2f7.collapse();
}else{
this.toggleExpanderIcon(cell,true);
if(this.activeCell&&C.getRowNumber(this.activeCell)>C.getRowNumber(cell)){
this.selection.clear();
this.selectCellByCoords(_2f5,1,_2f7.parent.key);
}
_2f7.onSetVisible.subscribeOnce(this.handleToggleSurface,this);
_2f7.expand();
}
}else{
this.toggleExpanderIcon(cell,true);
this.clearHover();
if(this.activeCell&&C.getRowNumber(this.activeCell)>C.getRowNumber(cell)){
this.selection.clear();
this.selectCellByCoords(_2f5,1,C.getSurfacePath(this.activeCell));
}
this.expand(_2f5,_2f4);
}
this.focus();
};
ntb_treegridp.toggleExpanderIcon=function(cell,_2f9){
var has=nitobi.html.Css.hasClass;
var swap=nitobi.html.Css.swapClass;
var c="ntb-column-collapsed";
var x="ntb-column-expanded";
var _2fe=c+"-hover";
var _2ff=x+"-hover";
if(_2f9){
if(has(cell,_2fe)){
swap(cell,_2fe,_2ff);
}
if(has(cell,c)){
swap(cell,c,x);
}
}else{
if(has(cell,_2ff)){
swap(cell,_2ff,_2fe);
}
if(has(cell,x)){
swap(cell,x,c);
}
}
};
ntb_treegridp.handleToggleSurface=function(_300){
var _301=_300.source;
var rows=_301.recalculateRowCount();
if(_300.visible){
this.setRowCount(this.rowCount+rows);
_301.parent.onAfterExpand.notify();
}else{
this.setRowCount(this.rowCount-rows);
_301.parent.onAfterCollapse.notify();
}
};
ntb_treegridp.expand=function(_303,_304){
var _305=this.Scroller.getSurface(_304);
_305.onBeforeExpand.notify();
this.loadingScreen.show();
var _306;
if(_303==this.datatable.totalRowCount-1){
_306=_305.view.midcenter.getBlocks(_303,_303)[0];
}else{
_306=_305.splitBlock(_303).top;
}
var _307=new nitobi.grid.Surface(this.scroller,this,_304+"_"+_303,_303);
_307.columnSetId=this.findChildColumnSet(_305.columnSetId);
_307.columnsNode=this.model.selectSingleNode("//ntb:columns[@id='"+_307.columnSetId+"']");
_307.parent=_305;
_305.surfaces[_303]=_307;
this.scroller.surfaceMap[_307.key]=_307;
var _308=_307.renderContainer(this.uid,true);
_306.innerHTML+=_308;
_307.mapToHtml(this.uid);
if(this.activeCell){
var id=this.activeCell.id;
this.activeCell=$(id);
}
var he=this.headerEvents;
he.push({type:"mousedown",handler:this.handleHeaderMouseDown});
he.push({type:"mouseup",handler:this.handleHeaderMouseUp});
he.push({type:"mousemove",handler:this.handleHeaderMouseMove});
nitobi.html.attachEvents($("ntb-grid-header"+this.uid+"_"+_307.key),he,this);
var _30b=_307.columnsNode;
var _30c=_30b.getAttribute("gethandler");
var _30d=_30b.getAttribute("savehandler");
_307.parentDataNode=_305.dataTable.getRecord(_303);
var _30e=new nitobi.data.DataTable("caching",this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
_30e.initialize(_304+"_"+_303,_30c,_30d);
this.data.add(_30e);
_307.createRenderers(this.data);
_307.connectToTable(_30e);
var _30f=_305.dataTable.getRecord(_303);
var _310=_305.dataTable.xmlDoc.selectSingleNode("//@FieldNames").nodeValue.split("|");
for(var i=0;i<_310.length;i++){
var _312=_310[i];
var _313=_305.dataTable.fieldMap[_312].substr(1);
var _314=_30f.getAttribute(_313);
_30e.setGetHandlerParameter(_312,_314);
}
_30e.getPage(0,21,this,this.getGroupComplete);
};
ntb_treegridp.collapse=function(_315,_316){
var _317=this.scroller.getSurface(_316+"_"+_315);
if(_317){
_317.collapse();
}
};
ntb_treegridp.getGroupComplete=function(){
this.loadingScreen.hide();
};
ntb_treegridp.getRootColumnsElement=function(){
var _318=this.getRootColumns();
if(_318){
return this.model.selectSingleNode("//ntb:columns[@id='"+_318+"']");
}else{
return this.model.selectSingleNode("//ntb:columns");
}
};
ntb_treegridp.findChildColumnSet=function(_319){
var _31a=this.model.selectSingleNode("//ntb:columns[@id='"+_319+"']/ntb:column[@type='EXPAND']");
if(_31a){
return _31a.getAttribute("ChildColumnSet");
}
};
ntb_treegridp.clearSubHeaders=function(){
var _31b=this.getSubHeaderContainer();
_31b.innerHTML="";
};
ntb_treegridp.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
ntb_treegridp.subscribe=function(evt,func,_320){
if(this.subscribedEvents==null){
this.subscribedEvents={};
}
if(typeof (_320)=="undefined"){
_320=this;
}
var guid=nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_320,func));
this.subscribedEvents[guid]=evt+this.uid;
return guid;
};
ntb_treegridp.subscribeOnce=function(evt,func,_324,_325){
var guid=null;
var _327=this;
var _328=function(){
func.apply(_324||this,_325||arguments);
_327.unsubscribe(evt,guid);
};
guid=this.subscribe(evt,_328);
};
ntb_treegridp.unsubscribe=function(evt,guid){
return nitobi.event.unsubscribe(evt+this.uid,guid);
};
ntb_treegridp.dispose=function(){
try{
this.element.jsObject=null;
editorXslProc=null;
var H=nitobi.html;
H.detachEvents(this.getGridContainer(),this.events);
H.detachEvents(this.getHeaderContainer(),this.headerEvents);
H.detachEvents(this.getDataContainer(),this.cellEvents);
H.detachEvents(this.getScrollerContainer(),this.scrollerEvents);
H.detachEvents(this.keyNav,this.keyEvents);
for(var item in this.subscribedEvents){
var _32d=this.subscribedEvents[item];
this.unsubscribe(_32d.substring(0,_32d.length-this.uid.length),item);
}
this.UiContainer.parentNode.removeChild(this.UiContainer);
for(var item in this){
if(this[item]!=null){
if(this[item].dispose instanceof Function){
this[item].dispose();
}
this[item]=null;
}
}
nitobi.form.ControlFactory.instance.dispose();
}
catch(e){
}
};
nitobi.Grid=nitobi.grid.Grid;
nitobi.grid.Cell=function(grid,row,_330,_331){
if(row==null||grid==null){
return null;
}
this.grid=grid;
var _332=null;
this.surface=_331;
if(typeof (row)=="object"){
var cell=row;
row=Number(cell.getAttribute("xi"));
_330=cell.getAttribute("col");
_332=cell;
var _334=nitobi.grid.Cell.getSurfacePath(cell);
this.surface=this.grid.Scroller.getSurface(_334);
}else{
_332=this.grid.getCellElement(row,_330,_331.key);
}
this.DomNode=_332;
this.row=Number(row);
this.Row=this.row;
this.column=Number(_330);
this.Column=this.column;
this.dataIndex=this.Row;
this.table;
if(this.surface){
this.table=this.surface.dataTable;
}else{
this.table=this.grid.datatable;
}
};
nitobi.grid.Cell.prototype.getData=function(){
if(this.DataNode==null){
this.DataNode=this.table.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xi="+this.dataIndex+"]/"+this.table.fieldMap[this.getColumnObject().getColumnName()]);
}
return this.DataNode;
};
nitobi.grid.Cell.prototype.getModel=function(){
if(this.ModelNode==null){
this.ModelNode=this.grid.model.selectSingleNode("//ntb:columns/*[@xi='"+this.column+"']");
}
return this.ModelNode;
};
nitobi.grid.Cell.prototype.setRow=function(){
this.jSET("Row",arguments);
};
nitobi.grid.Cell.prototype.getRow=function(){
return this.Row;
};
nitobi.grid.Cell.prototype.setColumn=function(){
this.jSET("Column",arguments);
};
nitobi.grid.Cell.prototype.getColumn=function(){
return this.Column;
};
nitobi.grid.Cell.prototype.setDomNode=function(){
this.jSET("DomNode",arguments);
};
nitobi.grid.Cell.prototype.getDomNode=function(){
return this.DomNode;
};
nitobi.grid.Cell.prototype.setDataNode=function(){
this.jSET("DataNode",arguments);
};
nitobi.grid.Cell.prototype.setValue=function(_335,_336){
if(_335==this.getValue()){
return;
}
var _337=this.getColumnObject();
var _338="";
switch(_337.getType()){
case "PASSWORD":
for(var i=0;i<_335.length;i++){
_338+="*";
}
break;
case "NUMBER":
if(this.numberXsl==null){
this.numberXsl=nitobi.form.numberXslProc;
}
if(_335==""){
_335=_337.getEditor().defaultValue||0;
}
if(this.DomNode!=null){
if(_335<0){
nitobi.html.Css.addClass(this.DomNode,"ntb-cell-negativenumber");
}else{
nitobi.html.Css.removeClass(this.DomNode,"ntb-cell-negativenumber");
}
}
var mask=_337.getMask();
var _33b=_337.getNegativeMask();
var _33c=_335;
if(_335<0&&_33b!=""){
mask=_33b;
_33c=(_335+"").replace("-","");
}
this.numberXsl.addParameter("number",_33c,"");
this.numberXsl.addParameter("mask",mask,"");
this.numberXsl.addParameter("group",_337.getGroupingSeparator(),"");
this.numberXsl.addParameter("decimal",_337.getDecimalSeparator(),"");
_338=nitobi.xml.transformToString(nitobi.xml.Empty,this.numberXsl);
if(""==_338&&_335!=""){
_338=nitobi.html.getFirstChild(this.DomNode).innerHTML;
_335=this.getValue();
}
break;
case "DATE":
if(this.dateXsl==null){
this.dateXsl=nitobi.form.dateXslProc.stylesheet;
}
var d=new Date();
var _33e=nitobi.xml.createXmlDoc("<root><date>"+_335+"</date><year>"+(d.getFullYear())+"</year><mask>"+this.columnObject.getMask()+"</mask></root>");
_338=nitobi.xml.transformToString(_33e,this.dateXsl);
if(""==_338){
_338=nitobi.html.getFirstChild(this.DomNode).innerHTML;
_335=this.getValue();
}else{
_335=_338;
}
break;
case "TEXTAREA":
_338=nitobi.html.encode(_335);
break;
case "LOOKUP":
var _33f=_337.getModel();
var _340=_33f.getAttribute("DatasourceId");
var _341=this.grid.data.getTable(_340);
var _342=_33f.getAttribute("DisplayFields");
var _343=_33f.getAttribute("ValueField");
var _344=_341.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_343+"='"+_335+"']/@"+_342);
if(_344!=null){
_338=_344.nodeValue;
}else{
_338=_335;
}
break;
case "CHECKBOX":
var _33f=_337.getModel();
var _340=_33f.getAttribute("DatasourceId");
var _341=this.grid.data.getTable(_340);
var _342=_33f.getAttribute("DisplayFields");
var _343=_33f.getAttribute("ValueField");
var _345=_33f.getAttribute("CheckedValue");
if(_345==""||_345==null){
_345=0;
}
var _346=_341.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_343+"='"+_335+"']/@"+_342).nodeValue;
var _347=(_335==_345)?"checked":"unchecked";
_338="<div style=\"overflow:hidden;\"><div class=\"ntb-checkbox ntb-checkbox-"+_347+"\" checked=\""+_335+"\">&nbsp;</div><div class=\"ntb-checkbox-text\">"+nitobi.html.encode(_346)+"</div></div>";
break;
case "LISTBOX":
var _33f=_337.getModel();
var _340=_33f.getAttribute("DatasourceId");
var _341=this.grid.data.getTable(_340);
var _342=_33f.getAttribute("DisplayFields");
var _343=_33f.getAttribute("ValueField");
_338=_341.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_343+"='"+_335+"']/@"+_342).nodeValue;
break;
case "IMAGE":
_338=nitobi.html.getFirstChild(this.DomNode).innerHTML;
if(nitobi.lang.typeOf(_335)==nitobi.lang.type.HTMLNODE){
_338="<img border=\"0\" src=\""+_335.getAttribute("src")+"\" />";
}else{
if(typeof (_335)=="string"){
_338="<img border=\"0\" src=\""+_335+"\" />";
}
}
break;
default:
_338=_335;
}
_338=_338||"&nbsp;";
if(this.DomNode!=null){
var elem=nitobi.html.getFirstChild(this.DomNode);
elem.innerHTML=_338||"&nbsp;";
elem.setAttribute("title",_335);
this.DomNode.setAttribute("value",_335);
}
this.surface.dataTable.updateRecord(this.dataIndex,_337.getColumnName(),_335);
};
nitobi.grid.Cell.prototype.getValue=function(){
var _349=this.getColumnObject();
var val=this.GETDATA();
switch(_349.getType()){
case "NUMBER":
val=parseFloat(val);
break;
default:
}
return val;
};
nitobi.grid.Cell.prototype.getHtml=function(){
return nitobi.html.getFirstChild(this.DomNode).innerHTML;
};
nitobi.grid.Cell.prototype.edit=function(){
this.grid.setActiveCell(this.DomNode);
this.grid.edit();
};
nitobi.grid.Cell.prototype.GETDATA=function(){
var node=this.getData();
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xGETMETA=function(){
if(this.MetaNode==null){
return null;
}
var node=this.MetaNode;
node=node.selectSingleNode("@"+arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xSETMETA=function(){
var node=this.MetaNode;
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.Cell.prototype.xSETCSS=function(){
var node=this.DomNode;
if(node!=null){
node.style.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.Cell.prototype.xGET=function(){
var node=this.getModel();
node=node.selectSingleNode(arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xSET=function(){
var node=this.getModel();
node=node.selectSingleNode(arguments[0]);
if(node!=null){
node.nodeValue=arguments[1][0];
}
};
nitobi.grid.Cell.prototype.getStyle=function(){
return this.DomNode.style;
};
nitobi.grid.Cell.prototype.getColumnObject=function(){
if(typeof (this.columnObject)=="undefined"){
this.columnObject=this.grid.getColumnObject(this.getColumn(),this.surface.key);
}
return this.columnObject;
};
nitobi.grid.Cell.getCellElement=function(grid,row,_353,_354){
return $("cell_"+row+"_"+_353+"_"+grid.uid+"_"+(_354?_354:""));
};
nitobi.grid.Cell.getRowNumber=function(_355){
return parseInt(_355.getAttribute("xi"));
};
nitobi.grid.Cell.getColumnNumber=function(_356){
return parseInt(_356.getAttribute("col"));
};
nitobi.grid.Cell.getSurfacePath=function(_357){
return _357.getAttribute("path");
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.CellEventArgs=function(_358,cell){
nitobi.grid.CellEventArgs.baseConstructor.call(this,_358);
this.cell=cell;
};
nitobi.lang.extend(nitobi.grid.CellEventArgs,nitobi.base.EventArgs);
nitobi.grid.CellEventArgs.prototype.getCell=function(){
return this.cell;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.RowEventArgs=function(_35a,row){
this.grid=_35a;
this.row=row;
this.event=nitobi.html.Event;
};
nitobi.grid.RowEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.RowEventArgs.prototype.getRow=function(){
return this.row;
};
nitobi.grid.RowEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.SelectionEventArgs=function(_35c,data,_35e){
this.source=_35c;
this.coords=_35e;
this.data=data;
};
nitobi.grid.SelectionEventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.grid.SelectionEventArgs.prototype.getCoords=function(){
return this.coords;
};
nitobi.grid.SelectionEventArgs.prototype.getData=function(){
return this.data;
};
nitobi.grid.Column=function(grid,_360,_361){
this.grid=grid;
this.column=_360;
this.uid=nitobi.base.getUid();
this.surface=_361;
this.modelNodes={};
};
nitobi.grid.Column.prototype={setAlign:function(){
this.xSET("Align",arguments);
},getAlign:function(){
return this.xGET("Align",arguments);
},setClassName:function(){
this.xSET("ClassName",arguments);
},getClassName:function(){
return this.xGET("ClassName",arguments);
},setCssStyle:function(){
this.xSET("CssStyle",arguments);
},getCssStyle:function(){
return this.xGET("CssStyle",arguments);
},setColumnName:function(){
this.xSET("ColumnName",arguments);
},getColumnName:function(){
return this.xGET("ColumnName",arguments);
},setType:function(){
this.xSET("type",arguments);
},getType:function(){
return this.xGET("type",arguments);
},setDataType:function(){
this.xSET("DataType",arguments);
},getDataType:function(){
return this.xGET("DataType",arguments);
},setEditable:function(){
this.xSET("Editable",arguments);
},isEditable:function(){
return nitobi.lang.toBool(this.xGET("Editable",arguments),true);
},setInitial:function(){
this.xSET("Initial",arguments);
},getInitial:function(){
return this.xGET("Initial",arguments);
},setLabel:function(){
this.xSET("Label",arguments);
},getLabel:function(){
return this.xGET("Label",arguments);
},setGetHandler:function(){
this.xSET("GetHandler",arguments);
},getGetHandler:function(){
return this.xGET("GetHandler",arguments);
},setDatasourceId:function(){
this.xSET("DatasourceId",arguments);
},getDatasourceId:function(){
return this.xGET("DatasourceId",arguments);
},setTemplate:function(){
this.xSET("Template",arguments);
},getTemplate:function(){
return this.xGET("Template",arguments);
},setTemplateUrl:function(){
this.xSET("TemplateUrl",arguments);
},getTemplateUrl:function(){
return this.xGET("TemplateUrl",arguments);
},setMaxLength:function(){
this.xSET("maxlength",arguments);
},getMaxLength:function(){
return Number(this.xGET("maxlength",arguments));
},setSortDirection:function(){
this.xSET("SortDirection",arguments);
},getSortDirection:function(){
return this.xGET("SortDirection",arguments);
},setSortEnabled:function(){
this.xSET("SortEnabled",arguments);
},isSortEnabled:function(){
return nitobi.lang.toBool(this.xGET("SortEnabled",arguments),true);
},setWidth:function(){
this.xSET("Width",arguments);
},getWidth:function(){
return Number(this.xGET("Width",arguments));
},setSize:function(){
this.xSET("Size",arguments);
},getSize:function(){
return Number(this.xGET("Size",arguments));
},setVisible:function(){
this.xSET("Visible",arguments);
},isVisible:function(){
return nitobi.lang.toBool(this.xGET("Visible",arguments),true);
},setxdatafld:function(){
this.xSET("xdatafld",arguments);
},getxdatafld:function(){
return this.xGET("xdatafld",arguments);
},setValue:function(){
this.xSET("Value",arguments);
},getValue:function(){
return this.xGET("Value",arguments);
},setxi:function(){
this.xSET("xi",arguments);
},getxi:function(){
return Number(this.xGET("xi",arguments));
},setEditor:function(){
this.xSET("Editor",arguments);
},getEditor:function(){
return this.xGET("Editor",arguments);
},setDisplayFields:function(){
this.xSET("DisplayFields",arguments);
},getDisplayFields:function(){
return this.xGET("DisplayFields",arguments);
},setValueField:function(){
this.xSET("ValueField",arguments);
},getValueField:function(){
return this.xGET("ValueField",arguments);
},setDelay:function(){
this.xSET("Delay",arguments);
},getDelay:function(){
return Number(this.xGET("Delay",arguments));
},setReferenceColumn:function(){
this.xSET("ReferenceColumn",arguments);
},getReferenceColumn:function(){
return this.xGET("ReferenceColumn",arguments);
},setOnCellClickEvent:function(){
this.xSET("OnCellClickEvent",arguments);
},getOnCellClickEvent:function(){
return this.xGET("OnCellClickEvent",arguments);
},setOnBeforeCellClickEvent:function(){
this.xSET("OnBeforeCellClickEvent",arguments);
},getOnBeforeCellClickEvent:function(){
return this.xGET("OnBeforeCellClickEvent",arguments);
},setOnCellDblClickEvent:function(){
this.xSET("OnCellDblClickEvent",arguments);
},getOnCellDblClickEvent:function(){
return this.xGET("OnCellDblClickEvent",arguments);
},setOnHeaderDoubleClickEvent:function(){
this.xSET("OnHeaderDoubleClickEvent",arguments);
},getOnHeaderDoubleClickEvent:function(){
return this.xGET("OnHeaderDoubleClickEvent",arguments);
},setOnHeaderClickEvent:function(){
this.xSET("OnHeaderClickEvent",arguments);
},getOnHeaderClickEvent:function(){
return this.xGET("OnHeaderClickEvent",arguments);
},setOnBeforeResizeEvent:function(){
this.xSET("OnBeforeResizeEvent",arguments);
},getOnBeforeResizeEvent:function(){
return this.xGET("OnBeforeResizeEvent",arguments);
},setOnAfterResizeEvent:function(){
this.xSET("OnAfterResizeEvent",arguments);
},getOnAfterResizeEvent:function(){
return this.xGET("OnAfterResizeEvent",arguments);
},setOnCellValidateEvent:function(){
this.xSET("OnCellValidateEvent",arguments);
},getOnCellValidateEvent:function(){
return this.xGET("OnCellValidateEvent",arguments);
},setOnBeforeCellEditEvent:function(){
this.xSET("OnBeforeCellEditEvent",arguments);
},getOnBeforeCellEditEvent:function(){
return this.xGET("OnBeforeCellEditEvent",arguments);
},setOnAfterCellEditEvent:function(){
this.xSET("OnAfterCellEditEvent",arguments);
},getOnAfterCellEditEvent:function(){
return this.xGET("OnAfterCellEditEvent",arguments);
},setOnCellBlurEvent:function(){
this.xSET("OnCellBlurEvent",arguments);
},getOnCellBlurEvent:function(){
return this.xGET("OnCellBlurEvent",arguments);
},setOnCellFocusEvent:function(){
this.xSET("OnCellFocusEvent",arguments);
},getOnCellFocusEvent:function(){
return this.xGET("OnCellFocusEvent",arguments);
},setOnBeforeSortEvent:function(){
this.xSET("OnBeforeSortEvent",arguments);
},getOnBeforeSortEvent:function(){
return this.xGET("OnBeforeSortEvent",arguments);
},setOnAfterSortEvent:function(){
this.xSET("OnAfterSortEvent",arguments);
},getOnAfterSortEvent:function(){
return this.xGET("OnAfterSortEvent",arguments);
},setOnCellUpdateEvent:function(){
this.xSET("OnCellUpdateEvent",arguments);
},getOnCellUpdateEvent:function(){
return this.xGET("OnCellUpdateEvent",arguments);
},setOnKeyDownEvent:function(){
this.xSET("OnKeyDownEvent",arguments);
},getOnKeyDownEvent:function(){
return this.xGET("OnKeyDownEvent",arguments);
},setOnKeyUpEvent:function(){
this.xSET("OnKeyUpEvent",arguments);
},getOnKeyUpEvent:function(){
return this.xGET("OnKeyUpEvent",arguments);
},setOnKeyPressEvent:function(){
this.xSET("OnKeyPressEvent",arguments);
},getOnKeyPressEvent:function(){
return this.xGET("OnKeyPressEvent",arguments);
},setOnChangeEvent:function(){
this.xSET("OnChangeEvent",arguments);
},getOnChangeEvent:function(){
return this.xGET("OnChangeEvent",arguments);
},setGetOnEnter:function(){
this.xbSET("GetOnEnter",arguments);
},isGetOnEnter:function(){
return nitobi.lang.toBool(this.xGET("GetOnEnter",arguments),true);
},setAutoComplete:function(){
this.xbSET("AutoComplete",arguments);
},isAutoComplete:function(){
return nitobi.lang.toBool(this.xGET("AutoComplete",arguments),true);
},setAutoClear:function(){
this.xbSET("AutoClear",arguments);
},isAutoClear:function(){
return nitobi.lang.toBool(this.xGET("AutoClear",arguments),true);
}};
nitobi.grid.Column.prototype.getModel=function(){
if(this.ModelNode==null){
this.ModelNode=this.surface.columnsNode.childNodes[this.column];
}
return this.ModelNode;
};
nitobi.grid.Column.prototype.getHeaderElement=function(){
return nitobi.grid.Column.getColumnHeaderElement(this.grid.uid,this.column,this.surface.key);
};
nitobi.grid.Column.prototype.getHeaderCopy=function(){
return $("columnheader_"+this.column+"_"+this.grid.uid+"_"+this.surface.key+"copy");
};
nitobi.grid.Column.prototype.getEditor=function(){
};
nitobi.grid.Column.prototype.getStyle=function(){
var _362=this.getClassName();
return nitobi.html.getClass(_362);
};
nitobi.grid.Column.prototype.getHeaderStyle=function(){
var _363="acolumnheader"+this.grid.uid+"_"+this.column;
return nitobi.html.getClass(_363);
};
nitobi.grid.Column.prototype.getDataStyle=function(){
var _364="ntb-column-data"+this.grid.uid+"_"+this.column;
return nitobi.html.getClass(_364);
};
nitobi.grid.Column.prototype.getEditor=function(){
return nitobi.form.ControlFactory.instance.getEditor(this.grid,this);
};
nitobi.grid.Column.prototype.xGET=function(){
var node=null,_366="@"+arguments[0],val="";
var _368=this.modelNodes[_366];
if(_368!=null){
node=_368;
}else{
node=this.modelNodes[_366]=this.getModel().selectSingleNode(_366);
}
if(node!=null){
val=node.nodeValue;
}
return val;
};
nitobi.grid.Column.prototype.xSET=function(){
var node=this.getModel();
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}
};
nitobi.grid.Column.prototype.xbSETMODEL=function(){
var node=this.getModel();
if(node!=null){
node.setAttribute(arguments[0],nitobi.lang.boolToStr(arguments[1][0]));
}
};
nitobi.grid.Column.prototype.eSET=function(name,_36c){
var _36d=_36c[0];
var _36e=_36d;
var _36f=name.substr(2);
_36f=_36f.substr(0,_36f.length-5);
if(typeof (_36d)=="string"){
_36e=function(_370){
return eval(_36d);
};
}
if(typeof (this[name])!="undefined"){
alert("unsubscribe");
this.unsubscribe(_36f,this[name]);
}
var guid=this.subscribe(_36f,_36e);
this.jSET(name,[guid]);
};
nitobi.grid.Column.prototype.jSET=function(name,val){
this[name]=val[0];
};
nitobi.grid.Column.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Column.prototype.subscribe=function(evt,func,_378){
if(typeof (_378)=="undefined"){
_378=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_378,func));
};
nitobi.grid.Column.prototype.unsubscribe=function(evt,func){
return nitobi.event.unsubscribe(evt+this.uid,func);
};
nitobi.grid.Column.getColumnHeaderElement=function(_37b,_37c,_37d){
return $("columnheader_"+_37c+"_"+_37b+"_"+_37d);
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.ColumnEventArgs=function(_37e,_37f){
this.grid=_37e;
this.column=_37f;
this.event=nitobi.html.Event;
};
nitobi.grid.ColumnEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.ColumnEventArgs.prototype.getColumn=function(){
return this.column;
};
nitobi.grid.ColumnEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.grid.ColumnEventArgs.prototype.getDirection=function(){
};
nitobi.grid.ColumnResizer=function(grid){
this.grid=grid;
this.hScrollClass=null;
this.grid_id=this.grid.UiContainer.parentid;
this.line=document.getElementById("ntb-column-resizeline"+this.grid.uid);
this.lineStyle=this.line.style;
if(nitobi.browser.IE){
this.surface=document.getElementById("ebagridresizesurface_");
if(this.surface==null){
this.surface=document.createElement("div");
this.surface.id="ebagridresizesurface_";
this.surface.className="ntb-column-resize-surface";
this.grid.UiContainer.appendChild(this.surface);
}
}
this.column;
this.onAfterResize=new nitobi.base.Event();
};
nitobi.grid.ColumnResizer.prototype.startResize=function(grid,_382,_383,evt){
this.grid=grid;
this.column=_382;
var x=nitobi.html.getEventCoords(evt).x;
if(nitobi.browser.IE){
this.surface.style.display="block";
nitobi.drawing.align(this.surface,this.grid.element,nitobi.drawing.align.SAMEHEIGHT|nitobi.drawing.align.SAMEWIDTH|nitobi.drawing.align.ALIGNTOP|nitobi.drawing.align.ALIGNLEFT);
}
this.x=x;
this.lineStyle.display="block";
this.lineStyle.left=x+"px";
var _386=_382.surface;
var ss=this.grid.scroller.scrollSurface;
var _388=ss.scrollTop;
var _389=(_386.headerAttached?23:_386.calculateOffsetTop()-_388);
this.lineStyle.height=ss.offsetHeight-(_386.key=="0"?0:_389)+"px";
var _38a=(_386.key=="0"?0:_388);
nitobi.drawing.align(this.line,_383,nitobi.drawing.align.ALIGNTOP,0,0,nitobi.html.getHeight(_383)+1-(nitobi.browser.MOZ&&!_386.headerAttached?_38a:0));
nitobi.ui.startDragOperation(this.line,evt,false,true,this,this.endResize);
};
nitobi.grid.ColumnResizer.prototype.endResize=function(_38b){
var x=_38b.x;
var Y=_38b.y;
if(nitobi.browser.IE){
this.surface.style.display="none";
}
var ls=this.lineStyle;
ls.display="none";
ls.top="-3000px";
ls.left="-3000px";
this.dx=x-this.x;
this.onAfterResize.notify(this);
};
nitobi.grid.ColumnResizer.prototype.dispose=function(){
this.grid=null;
this.line=null;
this.lineStyle=null;
this.surface=null;
};
nitobi.grid.GridResizer=function(grid){
this.grid=grid;
this.widthFixed=false;
this.heightFixed=false;
this.minHeight=0;
this.minWidth=0;
this.box=document.getElementById("ntb-grid-resizebox"+grid.uid);
this.onAfterResize=new nitobi.base.Event();
};
nitobi.grid.GridResizer.prototype.startResize=function(grid,_391){
this.grid=grid;
var _392=null;
var x,y;
var _395=nitobi.html.getEventCoords(_391);
x=_395.x;
y=_395.y;
this.x=x;
this.y=y;
var w=grid.getWidth();
var h=grid.getHeight();
var L=grid.element.offsetLeft;
var T=grid.element.offsetTop;
this.resizeW=!this.widthFixed;
this.resizeH=!this.heightFixed;
if(this.resizeW||this.resizeH){
this.box.style.cursor=(this.resizeW&&this.resizeH)?"nw-resize":(this.resizeW)?"w-resize":"n-resize";
this.box.style.display="block";
var _39a=nitobi.drawing.align.SAMEWIDTH|nitobi.drawing.align.SAMEHEIGHT|nitobi.drawing.align.ALIGNTOP|nitobi.drawing.align.ALIGNLEFT;
nitobi.drawing.align(this.box,this.grid.element,_39a,0,0,0,0,false);
this.dd=new nitobi.ui.DragDrop(this.box,false,false);
this.dd.onDragStop.subscribe(this.endResize,this);
this.dd.onMouseMove.subscribe(this.resize,this);
this.dd.startDrag(_391);
}
};
nitobi.grid.GridResizer.prototype.resize=function(){
var x=this.dd.x;
var y=this.dd.y;
var rect=this.grid.UiContainer.getBoundingClientRect();
var L=rect.left;
var T=rect.top;
this.box.style.display="block";
if((x-L)>this.minWidth){
this.box.style.width=(x-L)+"px";
}
if((y-T)>this.minHeight){
this.box.style.height=(y-T)+"px";
}
};
nitobi.grid.GridResizer.prototype.endResize=function(){
var x=this.dd.x;
var y=this.dd.y;
this.box.style.display="none";
var _3a2=this.grid.getWidth();
var _3a3=this.grid.getHeight();
this.newWidth=Math.max(parseInt(_3a2)+(x-this.x),this.minWidth);
this.newHeight=Math.max(parseInt(_3a3)+(y-this.y),this.minHeight);
if(isNaN(this.newWidth)||isNaN(this.newHeight)){
return;
}
this.onAfterResize.notify(this);
};
nitobi.grid.GridResizer.prototype.dispose=function(){
this.grid=null;
};
nitobi.data.FormatConverter={};
nitobi.data.FormatConverter.convertHtmlTableToEbaXml=function(_3a4,_3a5,_3a6){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"xml\" omit-xml-declaration=\"no\" />";
s+="<xsl:template match=\"//TABLE\"><ntb:data id=\"_default\">";
s+="<xsl:apply-templates /></ntb:data> </xsl:template>";
s+="<xsl:template match = \"//TR\">  <xsl:element name=\"ntb:e\"> <xsl:attribute name=\"xi\"><xsl:value-of select=\"position()-1+"+parseInt(_3a6)+"\"/></xsl:attribute>";
for(var _3a8=0;_3a8<_3a5.length;_3a8++){
s+="<xsl:attribute name=\""+_3a5[_3a8]+"\" ><xsl:value-of select=\"TD["+parseInt(_3a8+1)+"]\"/></xsl:attribute>";
}
s+="</xsl:element></xsl:template>";
s+="</xsl:stylesheet>";
var _3a9=nitobi.xml.createXmlDoc(_3a4);
var _3aa=nitobi.xml.createXslProcessor(s);
var _3ab=nitobi.xml.transformToXml(_3a9,_3aa);
return _3ab;
};
nitobi.data.FormatConverter.convertTsvToEbaXml=function(tsv,_3ad,_3ae){
if(!nitobi.browser.IE&&tsv[tsv.length-1]!="\n"){
tsv=tsv+"\n";
}
var _3af="<TABLE><TBODY>"+tsv.replace(/[\&\r]/g,"").replace(/([^\t\n]*)[\t]/g,"<TD>$1</TD>").replace(/([^\n]*?)\n/g,"<TR>$1</TR>").replace(/\>([^\<]*)\<\/TR/g,"><TD>$1</TD></TR")+"</TBODY></TABLE>";
if(_3af.indexOf("<TBODY><TR>")==-1){
_3af=_3af.replace(/TBODY\>(.*)\<\/TBODY/,"TBODY><TR><TD>$1</TD></TR></TBODY");
}
return nitobi.data.FormatConverter.convertHtmlTableToEbaXml(_3af,_3ad,_3ae);
};
nitobi.data.FormatConverter.convertTsvToJs=function(tsv){
var _3b1="["+tsv.replace(/[\&\r]/g,"").replace(/([^\t\n]*)[\t]/g,"$1\",\"").replace(/([^\n]*?)\n/g,"[\"$1\"],")+"]";
return _3b1;
};
nitobi.data.FormatConverter.convertEbaXmlToHtmlTable=function(_3b2,_3b3,_3b4,_3b5){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"html\" omit-xml-declaration=\"yes\" /><xsl:template match = \"*\"><xsl:apply-templates /></xsl:template><xsl:template match = \"/\">";
s+="<TABLE><TBODY><xsl:for-each select=\"//ntb:e[@xi>"+parseInt(_3b4-1)+" and @xi &lt; "+parseInt(_3b5+1)+"]\" ><TR>";
for(var _3b7=0;_3b7<_3b3.length;_3b7++){
s+="<TD><xsl:value-of select=\"@"+_3b3[_3b7]+"\" /></TD>";
}
s+="</TR></xsl:for-each></TBODY></TABLE></xsl:template></xsl:stylesheet>";
var _3b8=nitobi.xml.createXslProcessor(s);
return nitobi.xml.transformToXml(_3b2,_3b8).xml.replace(/xmlns:ntb="http:\/\/www.nitobi.com"/,"");
};
nitobi.data.FormatConverter.convertEbaXmlToTsv=function(_3b9,_3ba,_3bb,_3bc){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"text\" omit-xml-declaration=\"yes\" /><xsl:template match = \"*\"><xsl:apply-templates /></xsl:template><xsl:template match = \"/\">";
s+="<xsl:for-each select=\"//ntb:e[@xi>"+parseInt(_3bb-1)+" and @xi &lt; "+parseInt(_3bc+1)+"]\" >\n";
for(var _3be=0;_3be<_3ba.length;_3be++){
s+="<xsl:value-of select=\"@"+_3ba[_3be]+"\" />";
if(_3be<_3ba.length-1){
s+="<xsl:text>&#x09;</xsl:text>";
}
}
s+="<xsl:text>&#xa;</xsl:text></xsl:for-each></xsl:template></xsl:stylesheet>";
var _3bf=nitobi.xml.createXslProcessor(s);
return nitobi.xml.transformToString(_3b9,_3bf).replace(/xmlns:ntb="http:\/\/www.nitobi.com"/,"");
};
nitobi.data.FormatConverter.getDataColumns=function(data){
var _3c1=0;
if(data!=null&&data!=""){
if(data.substr(0,1)=="<"){
_3c1=data.toLowerCase().substr(0,data.toLowerCase().indexOf("</tr>")).split("</td>").length-1;
}else{
_3c1=data.substr(0,data.indexOf("\n")).split("\t").length;
}
}else{
_3c1=0;
}
return _3c1;
};
nitobi.data.FormatConverter.getDataRows=function(data){
var _3c3=0;
if(data!=null&&data!=""){
if(data.substr(0,1)=="<"){
_3c3=data.toLowerCase().split("</tr>").length-1;
}else{
retValArray=data.split("\n");
_3c3=retValArray.length;
if(retValArray[retValArray.length-1]==""){
_3c3--;
}
}
}else{
_3c3=0;
}
return _3c3;
};
nitobi.grid.DateColumn=function(grid,_3c5,_3c6){
nitobi.grid.DateColumn.baseConstructor.call(this,grid,_3c5,_3c6);
};
nitobi.lang.extend(nitobi.grid.DateColumn,nitobi.grid.Column);
var ntb_datep=nitobi.grid.DateColumn.prototype;
ntb_datep.setMask=function(){
this.xSET("Mask",arguments);
};
ntb_datep.getMask=function(){
return this.xGET("Mask",arguments);
};
ntb_datep.setCalendarEnabled=function(){
this.xSET("CalendarEnabled",arguments);
};
ntb_datep.isCalendarEnabled=function(){
return nitobi.lang.toBool(this.xGET("CalendarEnabled",arguments),false);
};
nitobi.lang.defineNs("nitobi.grid.Declaration");
nitobi.grid.Declaration.parse=function(_3c7){
var _3c8={};
_3c8.grid=nitobi.xml.parseHtml(_3c7);
var _3c9=_3c7.firstChild;
while(_3c9!=null){
if(typeof (_3c9.tagName)!="undefined"){
var tag=_3c9.tagName.replace(/ntb\:/gi,"").toLowerCase();
if(tag=="inlinehtml"){
_3c8[tag]=_3c9;
}else{
var _3cb="http://www.nitobi.com";
if(tag=="columndefinition"){
var sXml;
if(nitobi.browser.IE){
sXml=("<"+nitobi.xml.nsPrefix+"grid xmlns:ntb=\""+_3cb+"\"><"+nitobi.xml.nsPrefix+"columns>"+_3c9.parentNode.innerHTML.substring(31).replace(/\=\s*([^\"^\s^\>]+)/g,"=\"$1\" ")+"</"+nitobi.xml.nsPrefix+"columns></"+nitobi.xml.nsPrefix+"grid>");
}else{
sXml="<"+nitobi.xml.nsPrefix+"grid xmlns:ntb=\""+_3cb+"\"><"+nitobi.xml.nsPrefix+"columns>"+_3c9.parentNode.innerHTML.replace(/\=\s*([^\"^\s^\>]+)/g,"=\"$1\" ")+"</"+nitobi.xml.nsPrefix+"columns></"+nitobi.xml.nsPrefix+"grid>";
}
sXml=sXml.replace(/\&nbsp\;/gi," ");
_3c8["columndefinitions"]=nitobi.xml.createXmlDoc();
_3c8["columndefinitions"].validateOnParse=false;
_3c8["columndefinitions"]=nitobi.xml.loadXml(_3c8["columndefinitions"],sXml);
break;
}else{
if(tag=="columns"){
var id=_3c9.getAttribute("id");
if(_3c8[tag]==null){
_3c8[tag]=[];
}
if(id==null){
id="";
}
_3c8[tag].push(nitobi.xml.parseHtml(_3c9));
}else{
_3c8[tag]=nitobi.xml.parseHtml(_3c9);
}
}
}
}
_3c9=_3c9.nextSibling;
}
return _3c8;
};
nitobi.grid.Declaration.loadDataSources=function(_3ce,grid){
var _3d0=new Array();
if(_3ce["datasources"]){
_3d0=_3ce.datasources.selectNodes("//"+nitobi.xml.nsPrefix+"datasources/*");
}
if(_3d0.length>0){
for(var i=0;i<_3d0.length;i++){
var id=_3d0[i].getAttribute("id");
if(id!="_default"){
var _3d3=_3d0[i].xml.replace(/fieldnames=/g,"FieldNames=").replace(/keys=/g,"Keys=");
_3d3="<ntb:treegrid xmlns:ntb=\"http://www.nitobi.com\"><ntb:datasources>"+_3d3+"</ntb:datasources></ntb:treegrid>";
var _3d4=new nitobi.data.DataTable("local",grid.getPagingMode()!=nitobi.grid.PAGINGMODE_NONE,{GridId:grid.getID()},{GridId:grid.getID()},grid.isAutoKeyEnabled());
_3d4.initialize(id,_3d3);
_3d4.initializeXml(_3d3);
grid.data.add(_3d4);
var _3d5=grid.model.selectNodes("//nitobi.grid.Column[@DatasourceId='"+id+"']");
for(var j=0;j<_3d5.length;j++){
grid.editorDataReady(_3d5[j]);
}
}
}
}
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.EditCompleteEventArgs=function(obj,_3d8,_3d9,cell){
this.editor=obj;
this.cell=cell;
this.databaseValue=_3d9;
this.displayValue=_3d8;
};
nitobi.grid.EditCompleteEventArgs.prototype.dispose=function(){
this.editor=null;
this.cell=null;
this.metadata=null;
};
nitobi.data.GetCompleteEventArgs=function(_3db,_3dc,_3dd,_3de,_3df,_3e0,obj,_3e2,_3e3){
this.firstRow=_3db;
this.lastRow=_3dc;
this.callback=_3e2;
this.dataSource=_3e0;
this.context=obj;
this.ajaxCallback=_3df;
this.startXi=_3dd;
this.pageSize=_3de;
this.lastPage=false;
this.numRowsReturned=_3e3;
this.lastRowReturned=_3dc;
};
nitobi.data.GetCompleteEventArgs.prototype.dispose=function(){
this.callback=null;
this.context=null;
this.dataSource=null;
this.ajaxCallback.clear();
this.ajaxCallback==null;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.MODE_STANDARDPAGING="standard";
nitobi.grid.MODE_LOCALSTANDARDPAGING="localstandard";
nitobi.grid.MODE_LIVESCROLLING="livescrolling";
nitobi.grid.MODE_LOCALLIVESCROLLING="locallivescrolling";
nitobi.grid.MODE_NONPAGING="nonpaging";
nitobi.grid.MODE_LOCALNONPAGING="localnonpaging";
nitobi.grid.MODE_SMARTPAGING="smartpaging";
nitobi.grid.MODE_PAGEDLIVESCROLLING="pagedlivescrolling";
nitobi.grid.RENDERMODE_ONDEMAND="ondemand";
nitobi.lang.defineNs("nitobi.GridFactory");
nitobi.GridFactory.createGrid=function(_3e4,_3e5,_3e6){
var _3e7="";
var _3e8="";
var _3e9="";
_3e6=nitobi.html.getElement(_3e6);
if(_3e6!=null){
xDeclaration=nitobi.grid.Declaration.parse(_3e6);
_3e4=xDeclaration.grid.documentElement.getAttribute("mode");
var _3ea=nitobi.GridFactory.isGetHandler(xDeclaration);
var _3eb=nitobi.GridFactory.isDatasourceId(xDeclaration);
var _3ec=false;
if(_3e4==nitobi.grid.MODE_LOCALLIVESCROLLING){
_3e7=nitobi.grid.PAGINGMODE_LIVESCROLLING;
_3e8=nitobi.data.DATAMODE_LOCAL;
}else{
if(_3e4==nitobi.grid.MODE_LIVESCROLLING){
_3e7=nitobi.grid.PAGINGMODE_LIVESCROLLING;
_3e8=nitobi.data.DATAMODE_CACHING;
}else{
if(_3e4==nitobi.grid.MODE_NONPAGING){
_3ec=true;
_3e7=nitobi.grid.PAGINGMODE_NONE;
_3e8=nitobi.data.DATAMODE_LOCAL;
}else{
if(_3e4==nitobi.grid.MODE_LOCALNONPAGING){
_3e7=nitobi.grid.PAGINGMODE_NONE;
_3e8=nitobi.data.DATAMODE_LOCAL;
}else{
if(_3e4==nitobi.grid.MODE_LOCALSTANDARDPAGING){
_3e7=nitobi.grid.PAGINGMODE_STANDARD;
_3e8=nitobi.data.DATAMODE_LOCAL;
}else{
if(_3e4==nitobi.grid.MODE_STANDARDPAGING){
_3e7=nitobi.grid.PAGINGMODE_STANDARD;
_3e8=nitobi.data.DATAMODE_PAGING;
}else{
if(_3e4==nitobi.grid.MODE_PAGEDLIVESCROLLING){
_3e7=nitobi.grid.PAGINGMODE_STANDARD;
_3e8=nitobi.data.DATAMODE_PAGING;
_3e9=nitobi.grid.RENDERMODE_ONDEMAND;
}else{
}
}
}
}
}
}
}
}
var id=_3e6.getAttribute("id");
_3e4=(_3e4||nitobi.grid.MODE_STANDARDPAGING).toLowerCase();
var grid=null;
if(_3e4==nitobi.grid.MODE_LOCALSTANDARDPAGING){
grid=new nitobi.grid.GridLocalPage(id);
}else{
if(_3e4==nitobi.grid.MODE_LIVESCROLLING){
grid=new nitobi.grid.GridLiveScrolling(id);
}else{
if(_3e4==nitobi.grid.MODE_LOCALLIVESCROLLING){
grid=new nitobi.grid.GridLiveScrolling(id);
}else{
if(_3e4==nitobi.grid.MODE_NONPAGING||_3e4==nitobi.grid.MODE_LOCALNONPAGING){
grid=new nitobi.grid.GridNonpaging(id);
}else{
if(_3e4==nitobi.grid.MODE_STANDARDPAGING||_3e4==nitobi.grid.MODE_PAGEDLIVESCROLLING){
grid=new nitobi.grid.GridStandard(id);
}
}
}
}
}
grid.setDeclaration(xDeclaration);
grid.configureDefaults();
grid.setPagingMode(_3e7);
grid.setDataMode(_3e8);
grid.setRenderMode(_3e9);
nitobi.GridFactory.processDeclaration(grid,_3e6,xDeclaration);
_3e6.jsObject=grid;
return grid;
};
nitobi.GridFactory.processDeclaration=function(grid,_3f0,_3f1){
if(_3f1!=null){
if(typeof (_3f1.inlinehtml)=="undefined"){
var _3f2=document.createElement("ntb:inlinehtml");
_3f2.setAttribute("parentid","grid"+grid.uid);
_3f0.insertAdjacentElement("beforeEnd",_3f2);
grid.Declaration.inlinehtml=_3f2;
}
if(this.data==null||this.data.tables==null||this.data.tables.length==0){
var _3f3=new nitobi.data.DataSet();
_3f3.initialize();
grid.connectToDataSet(_3f3);
}
var _3f4=grid.Declaration.columndefinitions||grid.Declaration.columns||[];
var _3f5=grid.getRootColumns();
var _3f6=grid.model.selectSingleNode("//ntb:columns");
if(_3f6!=null){
_3f6.parentNode.removeChild(_3f6);
}
var len=_3f4.length;
for(var i=0;i<len;i++){
var _3f9=_3f4[i];
var id=_3f9.documentElement.getAttribute("id");
if(typeof (_3f9)!="undefined"&&_3f9!=null){
grid.defineColumns(_3f9.documentElement,((id==_3f5)||_3f4.length==1?true:false));
}
}
nitobi.grid.Declaration.loadDataSources(_3f1,grid);
grid.attachToParentDomElement(grid.Declaration.inlinehtml);
var _3fb=grid.getDataMode();
var _3fc=grid.getDatasourceId();
var _3fd=grid.getGetHandler();
if(_3fc!=null&&_3fc!=""){
grid.connectToTable(grid.data.getTable(_3fc));
grid.scroller.surface.setRowCount(grid.data.getTable(_3fc).getRemoteRowCount());
}else{
grid.ensureConnected();
if(grid.mode.toLowerCase()==nitobi.grid.MODE_LIVESCROLLING&&_3f1!=null&&_3f1.datasources!=null){
var _3fe=_3f1.datasources.selectNodes("//ntb:datasource[@id='_default']/ntb:data/ntb:e").length;
if(_3fe>0){
var _3ff=grid.data.getTable("_default");
_3ff.initializeXmlData(_3f1.grid.xml);
_3ff.initializeXml(_3f1.grid.xml);
_3ff.descriptor.leap(0,_3fe*2);
_3ff.syncRowCount();
}
}
}
window.setTimeout(function(){
grid.bind();
},50);
}
};
nitobi.GridFactory.isLocal=function(_400){
var _401=_400.grid.documentElement.getAttribute("datasourceid");
var _402=_400.grid.documentElement.getAttribute("gethandler");
if(_402!=null&&_402!=""){
return false;
}else{
if(_401!=null&&_401!=""){
return true;
}else{
throw ("Non-paging grid requires either a gethandler or a local datasourceid to be specified.");
}
}
};
nitobi.GridFactory.isGetHandler=function(_403){
var _404=_403.grid.documentElement.getAttribute("gethandler");
if(_404!=null&&_404!=""){
return true;
}
return false;
};
nitobi.GridFactory.isDatasourceId=function(_405){
var _406=_405.grid.documentElement.getAttribute("datasourceid");
if(_406!=null&&_406!=""){
return true;
}
return false;
};
nitobi.grid.hover=function(_407,_408,_409){
if(!_409){
return;
}
var id=_407.getAttribute("id");
var _40b=id.replace(/__/g,"||");
var _40c=_40b.split("_");
var row=_40c[3];
var uid=_40c[5].replace(/\|\|/g,"__");
var _40f=document.getElementById("cell_"+row+"_0_"+uid);
var _410=_40f.parentNode;
var _411=_410.childNodes[_410.childNodes.length-1];
var id=_411.getAttribute("id");
var _40c=id.split("_");
var _412=document.getElementById("cell_"+row+"_"+(Number(_40c[4])+1)+"_"+uid);
var _413=null;
if(_412!=null){
_413=_412.parentNode;
}
if(_408){
var _414=nitobi.grid.RowHoverColor||"white";
_410.style.backgroundColor=_414;
if(_413){
_413.style.backgroundColor=_414;
}
}else{
_410.style.backgroundColor="";
if(_413){
_413.style.backgroundColor="";
}
}
if(_408){
nitobi.html.addClass(_407,"ntb-cell-hover");
}else{
nitobi.html.removeClass(_407,"ntb-cell-hover");
}
};
nitobi.initTreeGrids=function(){
var _415=[];
var _416=document.getElementsByTagName(nitobi.browser.MOZ||nitobi.browser.SAFARI?"ntb:treegrid":"treegrid");
for(var i=0;i<_416.length;i++){
if(_416[i].jsObject==null){
_416[i].jsObject=nitobi.GridFactory.createGrid(null,null,_416[i]);
_415.push(_416[i].jsObject);
}
}
return _415;
};
nitobi.initTreeGrid=function(id){
var grid=nitobi.html.getElement(id);
if(grid!=null){
grid.jsObject=nitobi.GridFactory.createGrid(null,null,grid);
}
return grid.jsObject;
};
nitobi.initComponents=function(){
nitobi.initGrids();
};
nitobi.getGrid=function(_41a){
return document.getElementById(_41a).jsObject;
};
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.initTreeGrid",null,false,"ntb:treegrid"));
nitobi.grid.GridLiveScrolling=function(uid){
nitobi.grid.GridLiveScrolling.baseConstructor.call(this,uid);
this.mode="livescrolling";
};
nitobi.lang.extend(nitobi.grid.GridLiveScrolling,nitobi.grid.TreeGrid);
nitobi.grid.GridLiveScrolling.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridLiveScrolling.base.createChildren.call(this,args);
nitobi.grid.GridLiveScrolling.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD);
};
nitobi.grid.GridLiveScrolling.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
if(this.getGetHandler()!=""){
this.ensureConnected();
var rows=this.getRowsPerPage();
if(this.datatable.mode=="local"){
rows=null;
}
this.datatable.get(0,rows,this,this.getComplete);
}else{
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
}
};
nitobi.grid.GridLiveScrolling.prototype.getComplete=function(_41e){
nitobi.grid.GridLiveScrolling.base.getComplete.call(this,_41e);
if(!this.columnsDefined){
this.defineColumnsFinalize();
}
this.bindComplete();
};
nitobi.grid.GridLiveScrolling.prototype.pageSelect=function(dir){
var _420=this.Scroller.getUnrenderedBlocks();
var rows=_420.last-_420.first;
this.reselect(0,rows*dir);
};
nitobi.grid.GridLiveScrolling.prototype.page=function(dir){
var _423=this.Scroller.getUnrenderedBlocks();
var rows=_423.last-_423.first;
this.move(0,rows*dir);
};
nitobi.grid.LoadingScreen=function(grid){
this.loadingScreen=null;
this.grid=grid;
this.loadingImg=null;
};
nitobi.grid.LoadingScreen.prototype.initialize=function(){
this.loadingScreen=document.createElement("div");
var _426=this.findCssUrl();
var msg="";
if(_426==null){
msg="Loading...";
}else{
msg="<img src='"+_426+"loading.gif'  class='ntb-loading-Icon' valign='absmiddle'></img>";
}
this.loadingScreen.innerHTML="<table style='padding:0px;margin:0px;' border='0' width='100%' height='100%'><tr style='padding:0px;margin:0px;'><td style='padding:0px;margin:0px;text-align:center;font:verdana;font-size:10pt;'>"+msg+"</td></tr></table>";
this.loadingScreen.className="ntb-loading";
var lss=this.loadingScreen.style;
lss.verticalAlign="middle";
lss.visibility="hidden";
lss.position="absolute";
lss.top="0px";
lss.left="0px";
};
nitobi.grid.LoadingScreen.prototype.attachToElement=function(_429){
_429.appendChild(this.loadingScreen);
};
nitobi.grid.LoadingScreen.prototype.findCssUrl=function(){
var _42a=nitobi.html.findParentStylesheet(".ntb-loading-Icon");
if(_42a==null){
return null;
}
var _42b=nitobi.html.normalizeUrl(_42a.href);
if(nitobi.browser.IE){
while(_42a.parentStyleSheet){
_42a=_42a.parentStyleSheet;
_42b=nitobi.html.normalizeUrl(_42a.href)+_42b;
}
}
return _42b;
};
nitobi.grid.LoadingScreen.prototype.show=function(){
try{
this.resize();
this.loadingScreen.style.visibility="visible";
this.loadingScreen.style.display="block";
}
catch(e){
}
};
nitobi.grid.LoadingScreen.prototype.resize=function(){
this.loadingScreen.style.width=this.grid.getWidth()+"px";
this.loadingScreen.style.height=this.grid.getHeight()+"px";
};
nitobi.grid.LoadingScreen.prototype.hide=function(){
this.loadingScreen.style.display="none";
};
nitobi.grid.GridLocalPage=function(uid){
nitobi.grid.GridLocalPage.baseConstructor.call(this,uid);
this.mode="localpaging";
this.setPagingMode(nitobi.grid.PAGINGMODE_STANDARD);
this.setDataMode("local");
};
nitobi.lang.extend(nitobi.grid.GridLocalPage,nitobi.grid.TreeGrid);
nitobi.grid.GridLocalPage.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridLocalPage.base.createChildren.call(this,args);
nitobi.grid.GridLiveScrolling.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD|nitobi.ui.Toolbars.VisibleToolbars.PAGING);
this.toolbars.subscribe("NextPage",nitobi.lang.close(this,this.pageNext));
this.toolbars.subscribe("PreviousPage",nitobi.lang.close(this,this.pagePrevious));
this.subscribe("EndOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["nextPage"+this.toolbars.uid].disable();
});
this.subscribe("TopOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["previousPage"+this.toolbars.uid].disable();
});
this.subscribe("NotTopOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["previousPage"+this.toolbars.uid].enable();
});
this.subscribe("NotEndOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["nextPage"+this.toolbars.uid].enable();
});
};
nitobi.grid.GridLocalPage.prototype.pagePrevious=function(){
this.fire("BeforeLoadPreviousPage");
this.loadDataPage(Math.max(this.getCurrentPageIndex()-1,0));
this.fire("AfterLoadPreviousPage");
};
nitobi.grid.GridLocalPage.prototype.pageNext=function(){
this.fire("BeforeLoadNextPage");
this.loadDataPage(this.getCurrentPageIndex()+1);
this.fire("AfterLoadNextPage");
};
nitobi.grid.GridLocalPage.prototype.loadDataPage=function(_432){
this.fire("BeforeLoadDataPage");
if(_432>-1){
this.setCurrentPageIndex(_432);
this.setDisplayedRowCount(this.getRowsPerPage());
var _433=this.getCurrentPageIndex()*this.getRowsPerPage();
var rows=this.getRowsPerPage()-this.getfreezetop();
this.setDisplayedRowCount(rows);
var _435=_433+rows;
if(_435>=this.getRowCount()){
this.fire("EndOfData");
}else{
this.fire("NotEndOfData");
}
if(_433==0){
this.fire("TopOfData");
}else{
this.fire("NotTopOfData");
}
this.clearSurfaces();
this.updateCellRanges();
this.scrollVertical(0);
}
this.fire("AfterLoadDataPage");
};
nitobi.grid.GridLocalPage.prototype.setRowsPerPage=function(rows){
this.setDisplayedRowCount(this.getRowsPerPage());
this.data.table.pageSize=this.getRowsPerPage();
};
nitobi.grid.GridLocalPage.prototype.pageStartIndexChanges=function(){
};
nitobi.grid.GridLocalPage.prototype.hitFirstPage=function(){
this.fire("FirstPage");
};
nitobi.grid.GridLocalPage.prototype.hitLastPage=function(){
this.fire("LastPage");
};
nitobi.grid.GridLocalPage.prototype.bind=function(){
nitobi.grid.GridLocalPage.base.bind.call(this);
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
};
nitobi.grid.GridLocalPage.prototype.pageUpKey=function(){
this.pagePrevious();
};
nitobi.grid.GridLocalPage.prototype.pageDownKey=function(){
this.pageNext();
};
nitobi.grid.GridLocalPage.prototype.renderMiddle=function(){
nitobi.grid.GridLocalPage.base.renderMiddle.call(this,arguments);
var _437=this.getfreezetop();
endRow=this.getRowsPerPage()-1;
this.Scroller.view.midcenter.renderGap(_437,endRow,false);
};
nitobi.grid.GridNonpaging=function(uid){
nitobi.grid.GridNonpaging.baseConstructor.call(this);
this.mode="nonpaging";
};
nitobi.lang.extend(nitobi.grid.GridNonpaging,nitobi.grid.TreeGrid);
nitobi.grid.GridNonpaging.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridNonpaging.base.createChildren.call(this,args);
nitobi.grid.GridNonpaging.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD);
};
nitobi.grid.GridNonpaging.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
if(this.getGetHandler()!=""){
this.ensureConnected();
this.datatable.get(0,null,this,this.getComplete);
}else{
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
}
};
nitobi.grid.GridNonpaging.prototype.getComplete=function(_43a){
nitobi.grid.GridNonpaging.base.getComplete.call(this,_43a);
this.finalizeRowCount(_43a.numRowsReturned);
this.defineColumnsFinalize();
this.bindComplete();
};
nitobi.grid.GridNonpaging.prototype.renderMiddle=function(){
nitobi.grid.GridNonpaging.base.renderMiddle.call(this,arguments);
var _43b=this.getfreezetop();
endRow=this.getRowCount();
this.Scroller.view.midcenter.renderGap(_43b,endRow,false);
};
nitobi.grid.GridStandard=function(uid){
nitobi.grid.GridStandard.baseConstructor.call(this,uid);
this.mode="standard";
};
nitobi.lang.extend(nitobi.grid.GridStandard,nitobi.grid.TreeGrid);
nitobi.grid.GridStandard.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridStandard.base.createChildren.call(this,args);
nitobi.grid.GridStandard.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD|nitobi.ui.Toolbars.VisibleToolbars.PAGING);
this.toolbars.subscribe("NextPage",nitobi.lang.close(this,this.pageNext));
this.toolbars.subscribe("PreviousPage",nitobi.lang.close(this,this.pagePrevious));
this.subscribe("EndOfData",this.disableNextPage);
this.subscribe("TopOfData",this.disablePreviousPage);
this.subscribe("NotTopOfData",this.enablePreviousPage);
this.subscribe("NotEndOfData",this.enableNextPage);
this.subscribe("TableConnected",nitobi.lang.close(this,this.subscribeToRowCountReady));
this.subscribe("BeforeLoadDataPage",nitobi.lang.close(this.scroller,this.scroller.purgeSurfaces));
this.subscribe("BeforeLoadDataPage",this.clearSubHeaders);
};
nitobi.grid.GridStandard.prototype.connectToTable=function(_43e){
if(nitobi.grid.GridStandard.base.connectToTable.call(this,_43e)!=false){
this.datatable.subscribe("RowInserted",nitobi.lang.close(this,this.incrementDisplayedRowCount));
this.datatable.subscribe("RowDeleted",nitobi.lang.close(this,this.decrementDisplayedRowCount));
}
};
nitobi.grid.GridStandard.prototype.incrementDisplayedRowCount=function(_43f){
this.setDisplayedRowCount(this.getDisplayedRowCount()+(_43f||1));
this.updateCellRanges();
};
nitobi.grid.GridStandard.prototype.decrementDisplayedRowCount=function(_440){
this.setDisplayedRowCount(this.getDisplayedRowCount()-(_440||1));
this.updateCellRanges();
};
nitobi.grid.GridStandard.prototype.subscribeToRowCountReady=function(){
};
nitobi.grid.GridStandard.prototype.updateDisplayedRowCount=function(_441){
this.setDisplayedRowCount(_441.numRowsReturned);
};
nitobi.grid.GridStandard.prototype.disableNextPage=function(){
this.disableButton("nextPage");
};
nitobi.grid.GridStandard.prototype.disablePreviousPage=function(){
this.disableButton("previousPage");
};
nitobi.grid.GridStandard.prototype.disableButton=function(_442){
var t=this.getToolbars().pagingToolbar;
if(t!=null){
t.getUiElements()[_442+this.toolbars.uid].disable();
}
};
nitobi.grid.GridStandard.prototype.enableNextPage=function(){
this.enableButton("nextPage");
};
nitobi.grid.GridStandard.prototype.enablePreviousPage=function(){
this.enableButton("previousPage");
};
nitobi.grid.GridStandard.prototype.enableButton=function(_444){
var t=this.getToolbars().pagingToolbar;
if(t!=null){
t.getUiElements()[_444+this.toolbars.uid].enable();
}
};
nitobi.grid.GridStandard.prototype.pagePrevious=function(){
this.fire("BeforeLoadPreviousPage");
this.loadDataPage(Math.max(this.getCurrentPageIndex()-1,0));
this.fire("AfterLoadPreviousPage");
};
nitobi.grid.GridStandard.prototype.pageNext=function(){
this.fire("BeforeLoadNextPage");
this.loadDataPage(this.getCurrentPageIndex()+1);
this.fire("AfterLoadNextPage");
};
nitobi.grid.GridStandard.prototype.loadDataPage=function(_446){
this.fire("BeforeLoadDataPage");
if(_446>-1){
if(this.sortColumn){
if(this.datatable.sortColumn){
for(var i=0;i<this.getColumnCount();i++){
var _448=this.getColumnObject(i);
if(_448.getColumnName()==this.datatable.sortColumn){
this.setSortStyle(i,this.datatable.sortDir);
break;
}
}
}else{
this.setSortStyle(this.sortColumn.column,"",true);
}
}
this.setCurrentPageIndex(_446);
var _449=this.getCurrentPageIndex()*this.getRowsPerPage();
var rows=this.getRowsPerPage()-this.getfreezetop();
this.datatable.flush();
this.datatable.get(_449,rows,this,this.afterLoadDataPage);
}
this.fire("AfterLoadDataPage");
};
nitobi.grid.GridStandard.prototype.afterLoadDataPage=function(_44b){
this.setDisplayedRowCount(_44b.numRowsReturned);
this.setRowCount(_44b.numRowsReturned);
if(_44b.numRowsReturned!=this.getRowsPerPage()){
this.fire("EndOfData");
}else{
this.fire("NotEndOfData");
}
if(this.getCurrentPageIndex()==0){
this.fire("TopOfData");
}else{
this.fire("NotTopOfData");
}
this.clearSurfaces();
this.updateCellRanges();
this.scrollVertical(0);
};
nitobi.grid.GridStandard.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
this.setCurrentPageIndex(0);
this.disablePreviousPage();
this.enableNextPage();
this.ensureConnected();
this.datatable.get(0,this.getRowsPerPage(),this,this.getComplete);
};
nitobi.grid.GridStandard.prototype.getComplete=function(_44c){
this.afterLoadDataPage(_44c);
nitobi.grid.GridStandard.base.getComplete.call(this,_44c);
this.defineColumnsFinalize();
this.bindComplete();
};
nitobi.grid.GridStandard.prototype.renderMiddle=function(){
nitobi.grid.GridStandard.base.renderMiddle.call(this,arguments);
var _44d=this.getfreezetop();
endRow=this.getRowsPerPage()-1;
this.Scroller.view.midcenter.renderGap(_44d,endRow,false);
};
nitobi.grid.NumberColumn=function(grid,_44f,_450){
nitobi.grid.NumberColumn.baseConstructor.call(this,grid,_44f,_450);
};
nitobi.lang.extend(nitobi.grid.NumberColumn,nitobi.grid.Column);
var ntb_numberp=nitobi.grid.NumberColumn.prototype;
ntb_numberp.setAlign=function(){
this.xSET("Align",arguments);
};
ntb_numberp.getAlign=function(){
return this.xGET("Align",arguments);
};
ntb_numberp.setMask=function(){
this.xSET("Mask",arguments);
};
ntb_numberp.getMask=function(){
return this.xGET("Mask",arguments);
};
ntb_numberp.setNegativeMask=function(){
this.xSET("NegativeMask",arguments);
};
ntb_numberp.getNegativeMask=function(){
return this.xGET("NegativeMask",arguments);
};
ntb_numberp.setGroupingSeparator=function(){
this.xSET("GroupingSeparator",arguments);
};
ntb_numberp.getGroupingSeparator=function(){
return this.xGET("GroupingSeparator",arguments);
};
ntb_numberp.setDecimalSeparator=function(){
this.xSET("DecimalSeparator",arguments);
};
ntb_numberp.getDecimalSeparator=function(){
return this.xGET("DecimalSeparator",arguments);
};
ntb_numberp.setOnKeyDownEvent=function(){
this.xSET("OnKeyDownEvent",arguments);
};
ntb_numberp.getOnKeyDownEvent=function(){
return this.xGET("OnKeyDownEvent",arguments);
};
ntb_numberp.setOnKeyUpEvent=function(){
this.xSET("OnKeyUpEvent",arguments);
};
ntb_numberp.getOnKeyUpEvent=function(){
return this.xGET("OnKeyUpEvent",arguments);
};
ntb_numberp.setOnKeyPressEvent=function(){
this.xSET("OnKeyPressEvent",arguments);
};
ntb_numberp.getOnKeyPressEvent=function(){
return this.xGET("OnKeyPressEvent",arguments);
};
ntb_numberp.setOnChangeEvent=function(){
this.xSET("OnChangeEvent",arguments);
};
ntb_numberp.getOnChangeEvent=function(){
return this.xGET("OnChangeEvent",arguments);
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCopyEventArgs=function(_451,data,_453){
nitobi.grid.OnCopyEventArgs.baseConstructor.apply(this,arguments);
};
nitobi.lang.extend(nitobi.grid.OnCopyEventArgs,nitobi.grid.SelectionEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnPasteEventArgs=function(_454,data,_456){
nitobi.grid.OnPasteEventArgs.baseConstructor.apply(this,arguments);
};
nitobi.lang.extend(nitobi.grid.OnPasteEventArgs,nitobi.grid.SelectionEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterCellEditEventArgs=function(_457,cell){
nitobi.grid.OnAfterCellEditEventArgs.baseConstructor.call(this,_457,cell);
};
nitobi.lang.extend(nitobi.grid.OnAfterCellEditEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterColumnResizeEventArgs=function(_459,_45a){
nitobi.grid.OnAfterColumnResizeEventArgs.baseConstructor.call(this,_459,_45a);
};
nitobi.lang.extend(nitobi.grid.OnAfterColumnResizeEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterRowDeleteEventArgs=function(_45b,row){
nitobi.grid.OnAfterRowDeleteEventArgs.baseConstructor.call(this,_45b,row);
};
nitobi.lang.extend(nitobi.grid.OnAfterRowDeleteEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterRowInsertEventArgs=function(_45d,row){
nitobi.grid.OnAfterRowInsertEventArgs.baseConstructor.call(this,_45d,row);
};
nitobi.lang.extend(nitobi.grid.OnAfterRowInsertEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterSortEventArgs=function(_45f,_460,_461){
nitobi.grid.OnAfterSortEventArgs.baseConstructor.call(this,_45f,_460);
this.direction=_461;
};
nitobi.lang.extend(nitobi.grid.OnAfterSortEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.grid.OnAfterSortEventArgs.prototype.getDirection=function(){
return this.direction;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeCellEditEventArgs=function(_462,cell){
nitobi.grid.OnBeforeCellEditEventArgs.baseConstructor.call(this,_462,cell);
};
nitobi.lang.extend(nitobi.grid.OnBeforeCellEditEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeColumnResizeEventArgs=function(_464,_465){
nitobi.grid.OnBeforeColumnResizeEventArgs.baseConstructor.call(this,_464,_465);
};
nitobi.lang.extend(nitobi.grid.OnBeforeColumnResizeEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeRowDeleteEventArgs=function(_466,row){
nitobi.grid.OnBeforeRowDeleteEventArgs.baseConstructor.call(this,_466,row);
};
nitobi.lang.extend(nitobi.grid.OnBeforeRowDeleteEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeRowInsertEventArgs=function(_468,row){
nitobi.grid.OnBeforeRowInsertEventArgs.baseConstructor.call(this,_468,row);
};
nitobi.lang.extend(nitobi.grid.OnBeforeRowInsertEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeSortEventArgs=function(_46a,_46b,_46c){
nitobi.grid.OnBeforeSortEventArgs.baseConstructor.call(this,_46a,_46b);
this.direction=_46c;
};
nitobi.lang.extend(nitobi.grid.OnBeforeSortEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.grid.OnBeforeSortEventArgs.prototype.getDirection=function(){
return this.direction;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeCellClickEventArgs=function(_46d,cell){
nitobi.grid.OnBeforeCellClickEventArgs.baseConstructor.call(this,_46d,cell);
};
nitobi.lang.extend(nitobi.grid.OnBeforeCellClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellBlurEventArgs=function(_46f,cell){
nitobi.grid.OnCellBlurEventArgs.baseConstructor.call(this,_46f,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellBlurEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellClickEventArgs=function(_471,cell){
nitobi.grid.OnCellClickEventArgs.baseConstructor.call(this,_471,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellDblClickEventArgs=function(_473,cell){
nitobi.grid.OnCellDblClickEventArgs.baseConstructor.call(this,_473,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellDblClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellFocusEventArgs=function(_475,cell){
nitobi.grid.OnCellFocusEventArgs.baseConstructor.call(this,_475,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellFocusEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellValidateEventArgs=function(_477,cell,_479,_47a){
nitobi.grid.OnCellValidateEventArgs.baseConstructor.call(this,_477,cell);
this.oldValue=_47a;
this.newValue=_479;
};
nitobi.lang.extend(nitobi.grid.OnCellValidateEventArgs,nitobi.grid.CellEventArgs);
nitobi.grid.OnCellValidateEventArgs.prototype.getOldValue=function(){
return this.oldValue;
};
nitobi.grid.OnCellValidateEventArgs.prototype.getNewValue=function(){
return this.newValue;
};
nitobi.grid.OnContextMenuEventArgs=function(){
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnHeaderClickEventArgs=function(_47b,_47c){
nitobi.grid.OnHeaderClickEventArgs.baseConstructor.call(this,_47b,_47c);
};
nitobi.lang.extend(nitobi.grid.OnHeaderClickEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnRowBlurEventArgs=function(_47d,row){
nitobi.grid.OnRowBlurEventArgs.baseConstructor.call(this,_47d,row);
};
nitobi.lang.extend(nitobi.grid.OnRowBlurEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnRowFocusEventArgs=function(_47f,row){
nitobi.grid.OnRowFocusEventArgs.baseConstructor.call(this,_47f,row);
};
nitobi.lang.extend(nitobi.grid.OnRowFocusEventArgs,nitobi.grid.RowEventArgs);
nitobi.grid.Row=function(grid,row,key){
this.key=key;
this.grid=grid;
this.row=row;
this.Row=row;
this.DomNode=nitobi.grid.Row.getRowElement(grid,row);
};
nitobi.grid.Row.prototype.getData=function(){
if(this.DataNode==null){
this.DataNode=this.grid.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi="+this.Row+"]");
}
return this.DataNode;
};
nitobi.grid.Row.prototype.getStyle=function(){
return this.DomNode.style;
};
nitobi.grid.Row.prototype.getCell=function(_484){
return this.grid.getCellObject(this.row,_484);
};
nitobi.grid.Row.prototype.getKey=function(_485){
return this.key;
};
nitobi.grid.Row.prototype.isExpanded=function(){
if(this.rowElement.getAttribute("expanded")=="true"){
return true;
}else{
return false;
}
};
nitobi.grid.Row.prototype.getIndex=function(){
return parseInt(this.rowElement.getAttribute("xi"));
};
nitobi.grid.Row.prototype.getPathToRow=function(){
var _486=this.rowElement.getAttribute("xi");
return this.key.substr(0,this.key.length-(_486.length+1));
};
nitobi.grid.Row.getRowElement=function(grid,row){
return nitobi.grid.Row.getRowElements(grid,row).mid;
};
nitobi.grid.Row.findRowElement=function(path,grid){
return $("row_"+path+"_"+grid.uid);
};
nitobi.grid.Row.getRowElements=function(grid,row,_48d){
_48d=_48d||"";
var C=nitobi.grid.Cell;
var _48f=grid.getFrozenLeftColumnCount();
var cell=C.getCellElement(grid,row,_48f,_48d);
var _491=(cell?cell.parentNode:null);
if(!_48f){
return {left:null,mid:_491};
}
var rows={};
rows.left=C.getCellElement(grid,row,0).parentNode;
rows.mid=_491;
return rows;
};
nitobi.grid.Row.getRowNumber=function(_493){
return parseInt(_493.getAttribute("xi"));
};
nitobi.grid.Row.prototype.xGETMETA=function(){
var node=this.MetaNode;
node=node.selectSingleNode("@"+arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Row.prototype.xSETMETA=function(){
var node=this.MetaNode;
if(null==node){
var meta=this.grid.data.selectSingleNode("//root/gridmeta");
var _497=this.MetaNode=this.grid.data.createNode(1,"r","");
_497.setAttribute("xi",this.row);
meta.appendChild(_497);
node=this.MetaNode=_497;
}
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.RowRenderer=function(_498,_499,_49a,_49b,_49c,_49d,_49e,_49f){
this.rowHeight=_49e;
this.xmlDataSource=_498;
this.dataTableId="";
this.definitions=_499;
this.columnSet="";
this.surfaceKey=_49c;
this.firstColumn=_49a;
this.uniqueId=_49b;
this.showHeaders=_49d;
this.rowHover=_49f;
this.mergeDoc=nitobi.xml.createXmlDoc("<ntb:root xmlns:ntb=\"http://www.nitobi.com\"><ntb:columns><ntb:stub/></ntb:columns><ntb:data><ntb:stub/></ntb:data></ntb:root>");
this.mergeDocCols=this.mergeDoc.selectSingleNode("//ntb:columns");
this.mergeDocData=this.mergeDoc.selectSingleNode("//ntb:data");
};
nitobi.grid.RowRenderer.prototype.render=function(_4a0,rows,_4a2,_4a3,_4a4,_4a5){
var _4a0=Number(_4a0)||0;
var rows=Number(rows)||0;
var xt=nitobi.grid.rowXslProc;
xt.addParameter("start",_4a0,"");
xt.addParameter("end",_4a0+rows,"");
xt.addParameter("sortColumn",_4a4,"");
xt.addParameter("sortDirection",_4a5,"");
xt.addParameter("dataTableId",this.dataTableId,"");
xt.addParameter("columnSet",this.columnSet,"");
xt.addParameter("showHeaders",this.showHeaders+0,"");
xt.addParameter("firstColumn",this.firstColumn,"");
this.lastColumn=this.definitions.childNodes.length;
xt.addParameter("lastColumn",this.lastColumn,"");
xt.addParameter("uniqueId",this.uniqueId,"");
xt.addParameter("rowHover",this.rowHover,"");
xt.addParameter("surfaceKey",this.surfaceKey,"");
var data=this.xmlDataSource.xmlDoc();
if(data.documentElement.firstChild==null){
return "";
}
var root=this.mergeDoc;
this.mergeDocCols.replaceChild((!nitobi.browser.IE?root.importNode(this.definitions,true):this.definitions.cloneNode(true)),this.mergeDocCols.firstChild);
this.mergeDocData.replaceChild((!nitobi.browser.IE?root.importNode(data.documentElement,true):data.documentElement.cloneNode(true)),this.mergeDocData.firstChild);
s2=nitobi.xml.transformToString(root,xt,"xml");
s2=s2.replace(/ATOKENTOREPLACE/g,"&nbsp;");
s2=s2.replace(/\#\&lt\;\#/g,"<").replace(/\#\&gt\;\#/g,">").replace(/\#\&eq\;\#/g,"=").replace(/\#\&quot\;\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
return s2;
};
nitobi.grid.RowRenderer.prototype.setColumnDefinitions=function(_4a9){
this.definitions=_4a9;
if(this.definitions){
this.lastColumn=this.definitions.selectNodes("//ntb:column").length;
}
};
nitobi.grid.RowRenderer.prototype.generateXslTemplate=function(_4aa,_4ab,_4ac,_4ad,_4ae,_4af,_4b0,id){
this.showIndicators=_4af;
this.showHeaders=_4ae;
this.firstColumn=_4ac;
this.lastColumn=_4ac+_4ad;
this.rowHover=_4b0;
this.frozenColumnId=(id?id:"");
return;
try{
var path=(typeof (gApplicationPath)=="undefined"?window.location.href.substr(0,window.location.href.lastIndexOf("/")+1):gApplicationPath);
var imp=this.xmlTemplate.selectNodes("//xsl:import");
for(var i=0;i<imp.length;i++){
imp[i].setAttribute("href",path+"xsl/"+imp[i].getAttribute("href"));
}
}
catch(e){
}
};
nitobi.grid.RowRenderer.prototype.dispose=function(){
this.xslTemplate=null;
this.xmlDataSource=null;
};
EBAScroller_RENDERTIMEOUT=100;
EBAScroller_VIEWPANES=new Array("topleft","topcenter","midleft","midcenter");
nitobi.grid.Scroller3x3=function(_4b5,_4b6,rows,_4b8,_4b9,_4ba){
this.disposal=[];
this.htmlNode;
this.height=_4b6;
this.freezetop=_4b9;
this.freezeleft=_4ba;
this.lastScrollTop=-1;
this.uid=nitobi.base.getUid();
this.onRenderComplete=new nitobi.base.Event();
this.onRangeUpdate=new nitobi.base.Event();
this.onHtmlReady=new nitobi.base.Event();
this.owner=_4b5;
this.scrollSurface=null;
this.startRow=_4b9;
this.headerHeight=23;
this.rowHeight=23;
this.lastTimeoutId=0;
this.scrollTopPercent=0;
this.dataTable=null;
this.cacheMap=new nitobi.collections.CacheMap(-1,-1);
this.surface=new nitobi.grid.Surface(this,this.owner,"0");
this.surface.headerAttached=false;
this.surface.isVisible=true;
if(rootColumns=this.owner.getRootColumnsElement()){
this.surface.columnSetId=rootColumns.getAttribute("id");
}
this.surface.columnsNode=this.owner.getRootColumnsElement();
this.surface.subscribeColumnEvents();
this.surface.sortLocal=this.owner.getSortMode()=="local"||(this.owner.getDataMode()=="local"&&this.owner.getSortMode()!="remote");
this.setCellRanges();
this.surfaceMap={};
};
nitobi.grid.Scroller3x3.prototype.updateCellRanges=function(cols,rows,frzL,frzT){
this.columns=cols;
this.rows=rows;
this.freezetop=frzT;
this.freezeleft=frzL;
this.surface.updateCellRanges(cols,frzL,frzT);
this.setCellRanges();
};
nitobi.grid.Scroller3x3.prototype.setCellRanges=function(){
var _4bf=null;
if(this.implementsStandardPaging()){
_4bf=this.getDisplayedRowCount();
}
this.surface.setCellRanges(_4bf);
};
nitobi.grid.Scroller3x3.prototype.resize=function(_4c0){
this.height=_4c0;
};
nitobi.grid.Scroller3x3.prototype.setScrollLeftRelative=function(_4c1){
this.setScrollLeft(this.scrollLeft+_4c1);
};
nitobi.grid.Scroller3x3.prototype.setScrollLeftPercent=function(_4c2){
this.setScrollLeft(Math.round((this.surface.view.midcenter.element.scrollWidth-this.surface.view.midcenter.element.clientWidth)*_4c2));
};
nitobi.grid.Scroller3x3.prototype.setScrollLeft=function(_4c3){
this.surface.view.midcenter.element.scrollLeft=_4c3;
this.surface.view.topcenter.element.scrollLeft=_4c3;
$("ntb-grid-subheader-container"+this.owner.uid).scrollLeft=_4c3;
};
nitobi.grid.Scroller3x3.prototype.getScrollLeft=function(){
return this.scrollSurface.scrollLeft;
};
nitobi.grid.Scroller3x3.prototype.setScrollTopRelative=function(_4c4){
this.setScrollTop(this.getScrollTop()+_4c4);
};
nitobi.grid.Scroller3x3.prototype.setScrollTopPercent=function(_4c5){
this.setScrollTop(Math.round((this.surface.view.midcenter.element.scrollHeight-this.surface.view.midcenter.element.clientHeight)*_4c5));
};
nitobi.grid.Scroller3x3.prototype.getScrollTopPercent=function(){
return this.scrollSurface.scrollTop/(this.surface.view.midcenter.element.scrollHeight-this.surface.view.midcenter.element.clientHeight);
};
nitobi.grid.Scroller3x3.prototype.setScrollTop=function(_4c6){
this.surface.view.midcenter.element.scrollTop=_4c6;
this.surface.view.midleft.element.scrollTop=_4c6;
this.render();
};
nitobi.grid.Scroller3x3.prototype.getScrollTop=function(){
return this.scrollSurface.scrollTop;
};
nitobi.grid.Scroller3x3.prototype.clearSurface=function(_4c7,_4c8,_4c9,_4ca,_4cb){
_4cb=_4cb||"0";
var _4cc=this.getSurface(_4cb);
if(_4cc.cacheMap){
_4cc.cacheMap.flush();
}
_4c9=true;
if(_4c7){
_4c8=true;
_4c9=true;
_4ca=true;
}
if(_4c8){
_4cc.clearHeader();
}
if(_4c9){
_4cc.clearData();
}
if(_4ca){
}
};
nitobi.grid.Scroller3x3.prototype.mapToHtml=function(_4cd){
var uid=this.owner.uid;
this.surface.mapToHtml(uid);
this.scrollSurface=$("gridvp_3_"+uid+"_"+this.surface.key);
this.htmlNode=$("ntb-grid-scroller");
};
nitobi.grid.Scroller3x3.prototype.render=function(_4cf){
if(this.owner.isBound()&&(this.getScrollTop()!=this.lastScrollTop||_4cf||this.scrollTopPercent>0.9)){
var _4d0=nitobi.lang.close(this,this.performRender,[]);
window.clearTimeout(this.lastTimeoutId);
this.lastTimeoutId=window.setTimeout(_4d0,EBAScroller_RENDERTIMEOUT);
this.resetHeaders();
}
};
nitobi.grid.Scroller3x3.prototype.performRender=function(){
var _4d1=this.getScrollTop();
this.surface.renderAtScrollPosition(_4d1);
this.onRenderComplete.notify();
};
nitobi.grid.Scroller3x3.prototype.renderGap=function(low,high){
this.surface.renderGap(low,high);
};
nitobi.grid.Scroller3x3.prototype.flushCache=function(){
if(Boolean(this.surface.cacheMap)){
this.surface.cacheMap.flush();
}
};
nitobi.grid.Scroller3x3.prototype.reRender=function(_4d4,_4d5){
this.surface.reRender(_4d4,_4d5);
};
nitobi.grid.Scroller3x3.prototype.getViewportByCoords=function(row,_4d7,_4d8){
var _4d9=this.getSurface(_4d8);
var _4da=0;
if(row>=_4da&&row<this.owner.getfreezetop()&&_4d7>=this.owner.getFrozenLeftColumnCount()&&_4d7<this.owner.getColumnCount()){
return _4d9.view.topcenter;
}
if(row>=this.owner.getfreezetop()+_4da&&row<this.owner.getDisplayedRowCount()+_4da&&_4d7>=this.owner.getFrozenLeftColumnCount()&&_4d7<_4d9.columnsNode.childNodes.length){
return _4d9.view.midcenter;
}
};
nitobi.grid.Scroller3x3.prototype.getRowsPerPage=function(){
return this.owner.getRowsPerPage();
};
nitobi.grid.Scroller3x3.prototype.getDisplayedRowCount=function(){
return this.owner.getDisplayedRowCount();
};
nitobi.grid.Scroller3x3.prototype.getCurrentPageIndex=function(){
return this.owner.getCurrentPageIndex();
};
nitobi.grid.Scroller3x3.prototype.implementsStandardPaging=function(){
return Boolean(this.owner.getPagingMode().toLowerCase()=="standard");
};
nitobi.grid.Scroller3x3.prototype.implementsShowAll=function(){
return Boolean(this.owner.getPagingMode().toLowerCase()==nitobi.grid.PAGINGMODE_NONE);
};
nitobi.grid.Scroller3x3.prototype.setDataTable=function(_4db){
this.dataTable=_4db;
this.surface.setDataTable(_4db);
this.surface.dataTable.subscribe("TotalRowCountReady",nitobi.lang.close(this.surface,this.surface.setRowCount));
};
nitobi.grid.Scroller3x3.prototype.getDataTable=function(){
return this.dataTable;
};
nitobi.grid.Scroller3x3.prototype.handleHtmlReady=function(){
this.onHtmlReady.notify();
};
nitobi.grid.Scroller3x3.prototype.getTop=function(){
return this.freezetop*this.rowHeight+this.headerHeight;
};
nitobi.grid.Scroller3x3.prototype.setRowHeight=function(_4dc){
this.rowHeight=_4dc;
this.setViewportProperty("RowHeight",_4dc);
};
nitobi.grid.Scroller3x3.prototype.setHeaderHeight=function(_4dd){
this.headerHeight=_4dd;
this.setViewportProperty("HeaderHeight",_4dd);
};
nitobi.grid.Scroller3x3.prototype.setViewportProperty=function(_4de,_4df){
this.surface.setViewportProperty(_4de,_4df);
};
nitobi.grid.Scroller3x3.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Scroller3x3.prototype.subscribe=function(evt,func,_4e4){
if(typeof (_4e4)=="undefined"){
_4e4=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_4e4,func));
};
nitobi.grid.Scroller3x3.prototype.createRenderers=function(data){
this.surface.createRenderers(data);
};
nitobi.grid.Scroller3x3.prototype.getSurface=function(path){
if(this.surfaceMap[path]!=null){
return this.surfaceMap[path];
}
if(typeof path=="string"){
path=path.split("_");
}
var _4e7=this.surface;
for(var i=1;i<path.length;i++){
_4e7=_4e7.surfaces[path[i]];
}
return (_4e7?this.surfaceMap[path]=_4e7:null);
};
nitobi.grid.Scroller3x3.prototype.purgeSurfaces=function(){
this.surface.purgeSurfaces();
};
nitobi.grid.Scroller3x3.prototype.resetHeaders=function(){
this.surface.checkHeaders();
};
nitobi.grid.Scroller3x3.prototype.dispose=function(){
try{
(this.cacheMap!=null?this.cacheMap.flush():"");
this.cacheMap=null;
var _4e9=this.disposal.length;
for(var i=0;i<_4e9;i++){
if(typeof (this.disposal[i])=="function"){
this.disposal[i].call(this);
}
this.disposal[i]=null;
}
for(var v in this.view){
this.view[v].dispose();
}
for(var item in this){
if(this[item]!=null&&this[item].dispose instanceof Function){
this[item].dispose();
}
}
}
catch(e){
}
};
nitobi.grid.Selection=function(_4ed,_4ee){
nitobi.grid.Selection.baseConstructor.call(this,_4ed);
this.owner=_4ed;
var t=new Date();
this.selecting=false;
this.expanding=false;
this.resizingRow=false;
this.created=false;
this.freezeTop=this.owner.getfreezetop();
this.freezeLeft=this.owner.getFrozenLeftColumnCount();
this.rowHeight=23;
this.onAfterExpand=new nitobi.base.Event();
this.onBeforeExpand=new nitobi.base.Event();
this.onMouseUp=new nitobi.base.Event();
this.expandEndCell=null;
this.expandStartCell=null;
this.dragFillEnabled=_4ee||false;
};
nitobi.lang.extend(nitobi.grid.Selection,nitobi.collections.CellSet);
nitobi.grid.Selection.prototype.setRange=function(_4f0,_4f1,_4f2,_4f3,_4f4){
nitobi.grid.Selection.base.setRange.call(this,_4f0,_4f1,_4f2,_4f3);
this.startCell=this.owner.getCellElement(_4f0,_4f1,_4f4);
this.endCell=this.owner.getCellElement(_4f2,_4f3,_4f4);
};
nitobi.grid.Selection.prototype.setRangeWithDomNodes=function(_4f5,_4f6,_4f7){
this.setRange(nitobi.grid.Cell.getRowNumber(_4f5),nitobi.grid.Cell.getColumnNumber(_4f5),nitobi.grid.Cell.getRowNumber(_4f6),nitobi.grid.Cell.getColumnNumber(_4f6),_4f7);
};
nitobi.grid.Selection.prototype.createBoxes=function(){
if(!this.created){
var uid=this.owner.uid;
var H=nitobi.html;
var _4fa=H.createElement("div",{"class":"ntb-grid-selection-grabby"});
this.expanderGrabbyEvents=[{type:"mousedown",handler:this.handleGrabbyMouseDown},{type:"mouseup",handler:this.handleGrabbyMouseUp},{type:"click",handler:this.handleGrabbyClick}];
H.attachEvents(_4fa,this.expanderGrabbyEvents,this);
this.boxexpanderGrabby=_4fa;
this.box=this.createBox("selectbox"+uid);
this.boxl=this.createBox("selectboxl"+uid);
this.events=[{type:"mousemove",handler:this.shrink},{type:"mouseup",handler:this.handleSelectionMouseUp},{type:"mousedown",handler:this.handleSelectionMouseDown},{type:"click",handler:this.handleSelectionClick},{type:"dblclick",handler:this.handleDblClick}];
H.attachEvents(this.box,this.events,this);
H.attachEvents(this.boxl,this.events,this);
var sv=this.owner.scroller.surface.view;
sv.midcenter.surface.appendChild(this.box);
sv.midleft.surface.appendChild(this.boxl);
this.clear();
this.created=true;
}
};
nitobi.grid.Selection.prototype.createBox=function(id){
var _4fd;
var cell;
if(nitobi.browser.IE){
cell=_4fd=document.createElement("div");
}else{
_4fd=nitobi.html.createTable({"cellpadding":0,"cellspacing":0,"border":0},{"backgroundColor":"transparent"});
cell=_4fd.rows[0].cells[0];
}
_4fd.className="ntb-grid-selection ntb-grid-selection-border";
_4fd.setAttribute("id","ntb-grid-selection-"+id);
var _4ff=nitobi.html.createElement("div",{"id":id,"class":"ntb-grid-selection-background"});
cell.appendChild(_4ff);
return _4fd;
};
nitobi.grid.Selection.prototype.clearBoxes=function(){
if(this.box!=null){
this.clearBox(this.box);
}
if(this.boxl!=null){
this.clearBox(this.boxl);
}
this.created=false;
delete this.box;
delete this.boxl;
this.box=null;
this.boxl=null;
};
nitobi.grid.Selection.prototype.clearBox=function(box){
nitobi.html.detachEvents(box,this.events);
if(box.parentNode!=null){
box.parentNode.removeChild(box);
}
box=null;
};
nitobi.grid.Selection.prototype.handleGrabbyMouseDown=function(evt){
this.selecting=true;
this.setExpanding(true,"vert");
var _502=this.getTopLeftCell();
var _503=this.getBottomRightCell();
this.expandStartCell=_502;
this.expandEndCell=_503;
var _504=this.owner.getScrollSurface();
this.expandStartCoords=this.box.getBoundingClientRect(_504.scrollTop+document.body.scrollTop,_504.scrollLeft+document.body.scrollLeft);
this.expandStartHeight=Math.abs(_502.getRow()-_503.getRow())+1;
this.expandStartWidth=Math.abs(_502.getColumn()-_503.getColumn())+1;
this.expandStartTopRow=_502.getRow();
this.expandStartBottomRow=_503.getRow();
this.expandStartLeftColumn=_502.getColumn();
this.expandStartRightColumn=_503.getColumn();
var Cell=nitobi.grid.Cell;
if(Cell.getRowNumber(this.startCell)>Cell.getRowNumber(this.endCell)){
var _506=this.startCell;
this.startCell=this.endCell;
this.endCell=_506;
}
this.onBeforeExpand.notify(this);
};
nitobi.grid.Selection.prototype.handleGrabbyMouseUp=function(evt){
if(this.expanding){
this.selecting=false;
this.setExpanding(false);
this.onAfterExpand.notify({source:this,surfacePath:nitobi.grid.Cell.getSurfacePath(this.startCell)});
}
};
nitobi.grid.Selection.prototype.handleGrabbyClick=function(evt){
};
nitobi.grid.Selection.prototype.expand=function(cell,dir){
this.setExpanding(true,dir);
var Cell=nitobi.grid.Cell;
var _50c;
var _50d=this.expandStartTopRow,_50e=this.expandStartLeftColumn;
var _50f=this.expandStartBottomRow,_510=this.expandStartRightColumn;
var _511=Cell.getRowNumber(this.endCell),_512=Cell.getColumnNumber(this.endCell);
var _513=Cell.getRowNumber(this.startCell),_514=Cell.getColumnNumber(this.startCell);
var _515=Cell.getColumnNumber(cell);
var _516=Cell.getRowNumber(cell);
var _517=Cell.getSurfacePath(cell);
var _518=_514,_519=_513;
var o=this.owner;
if(dir=="horiz"){
if(_514<_512&_515<_514){
this.changeEndCellWithDomNode(o.getCellElement(_50f,_515,_517));
this.changeStartCellWithDomNode(o.getCellElement(_50d,_510,surfacepath));
}else{
if(_514>_512&&_515>_514){
this.changeEndCellWithDomNode(o.getCellElement(_50f,_515,_517));
this.changeStartCellWithDomNode(o.getCellElement(_50d,_50e,_517));
}else{
this.changeEndCellWithDomNode(o.getCellElement((_513==_50f?_50d:_50f),_515,_517));
}
}
}else{
if(_513<_511&_516<_513){
this.changeEndCellWithDomNode(o.getCellElement(_516,_510,_517));
this.changeStartCellWithDomNode(o.getCellElement(_50f,_50e,_517));
}else{
if(_513>_511&&_516>_513){
this.changeEndCellWithDomNode(o.getCellElement(_516,_510,_517));
this.changeStartCellWithDomNode(o.getCellElement(_50d,_50e,_517));
}else{
this.changeEndCellWithDomNode(o.getCellElement(_516,(_514==_510?_50e:_510),_517));
}
}
}
this.alignBoxes();
};
nitobi.grid.Selection.prototype.shrink=function(evt){
if(nitobi.html.Css.hasClass(evt.srcElement,"ntb-grid-selection-border")||nitobi.html.Css.hasClass(evt.srcElement,"ntb-grid-selection-grabby")){
return;
}
if(this.endCell!=this.startCell&&this.selecting){
var _51c=this.owner.getScrollSurface();
var Cell=nitobi.grid.Cell;
var _51e=Cell.getRowNumber(this.endCell),_51f=Cell.getColumnNumber(this.endCell);
var _520=Cell.getRowNumber(this.startCell),_521=Cell.getColumnNumber(this.startCell);
var _522=nitobi.html.getEventCoords(evt);
var evtY=_522.y,evtX=_522.x;
if(nitobi.browser.IE||document.compatMode=="BackCompat"){
evtY=evt.clientY,evtX=evt.clientX;
}
var _525=this.endCell.getBoundingClientRect(_51c.scrollTop+document.body.scrollTop,_51c.scrollLeft+document.body.scrollLeft);
var _526=_525.top,_527=_525.left;
if(_51e>_520&&evtY<_526){
_51e=_51e-Math.floor(((_526-4)-evtY)/this.rowHeight)-1;
}else{
if(evtY>_525.bottom){
_51e=_51e+Math.floor((evtY-_526)/this.rowHeight);
}
}
if(_51f>_521&&evtX<_527){
_51f--;
}else{
if(evtX>_525.right){
_51f++;
}
}
if(this.expanding){
var _528=this.expandStartCell.getRow(),_529=this.expandStartCell.getColumn();
var _52a=this.expandEndCell.getRow(),_52b=this.expandEndCell.getColumn();
if(_51f>=this.expandStartLeftColumn&&_51f<=this.expandStartRightColumn){
if(_51f>=_521&&_51f<_52b){
_51f=_52b;
}else{
if(_51f<=_521&&_51f>_529){
_51f=_529;
}
}
if(_51f>=_521&&_51f<=this.expandStartRightColumn){
_51f=this.expandStartRightColumn;
}
}
if(_51e>=this.expandStartTopRow&&_51e<=this.expandStartBottomRow){
if(_520<_51e&&_51e<=_52a){
_51e=_52a;
}else{
if(_520>_51e&&_51e>=_528){
_51e=_528;
}else{
if(_520==_51e){
_51e=(_520==_528?_52a:_528);
}
}
}
}
}
var _52c=nitobi.grid.Cell.getSurfacePath(this.endCell);
var _52d=this.owner.getCellElement(_51e,_51f,_52c);
var _52e=this.owner.getCellElement(_520,_521,_52c);
if(_52d!=null&&_52d!=this.endCell||_52e!=null&&_52e!=this.startCell){
this.changeEndCellWithDomNode(_52d);
this.changeStartCellWithDomNode(_52e);
this.alignBoxes();
this.owner.ensureCellInView(_52d);
}
}
};
nitobi.grid.Selection.prototype.getHeight=function(){
var rect=this.box.getBoundingClientRect();
return rect.top-rect.bottom;
};
nitobi.grid.Selection.prototype.collapse=function(cell){
if(!cell){
cell=this.startCell;
}
if(!cell){
return;
}
var _531=nitobi.grid.Cell.getSurfacePath(cell);
this.setRangeWithDomNodes(cell,cell,_531);
if((this.box==null)||(this.box.parentNode==null)||(this.boxl==null)||(this.boxl.parentNode==null)){
this.created=false;
this.createBoxes();
}
this.alignBoxes();
this.selecting=false;
};
nitobi.grid.Selection.prototype.startSelecting=function(_532,_533){
this.selecting=true;
this.setRangeWithDomNodes(_532,_533);
this.shrink();
};
nitobi.grid.Selection.prototype.clearSelection=function(cell){
this.collapse(cell);
};
nitobi.grid.Selection.prototype.resizeSelection=function(cell){
this.endCell=cell;
this.shrink();
};
nitobi.grid.Selection.prototype.moveSelection=function(cell){
this.collapse(cell);
};
nitobi.grid.Selection.prototype.alignBoxes=function(){
var _537=this.endCell||this.startCell;
var sc=this.getCoords();
var _539=sc.top.y;
var _53a=sc.top.x;
var _53b=sc.bottom.y;
var _53c=sc.bottom.x;
var _53d=nitobi.lang.isStandards();
var ox=oy=(nitobi.browser.IE?-1:0);
var ow=oh=(nitobi.browser.IE&&_53d?-1:1);
if(nitobi.browser.SAFARI){
oy=ox=-1;
if(_53d){
oh=ow=-1;
}
}
if(_53c>=this.freezeLeft&&_53b>=this.freezeTop){
var e=this.box;
e.style.display="block";
this.align(e,this.startCell,_537,286265344,oh,ow,oy,ox);
if(this.dragFillEnabled){
(e.rows!=null?e.rows[0].cells[0]:e).appendChild(this.boxexpanderGrabby);
}
}else{
this.box.style.display="none";
}
if(_53c<this.freezeLeft||_53a<this.freezeLeft){
var e=this.boxl;
e.style.display="block";
this.align(e,this.startCell,_537,286265344,oh,ow,oy,ox);
if(this.box.style.display=="none"){
if(this.dragFillEnabled){
(e.rows!=null?e.rows[0].cells[0]:e).appendChild(this.boxexpanderGrabby);
}
}
}else{
this.boxl.style.display="none";
}
};
nitobi.grid.Selection.prototype.redraw=function(cell){
if(!this.selecting){
this.setRangeWithDomNodes(cell,cell);
}else{
this.changeEndCellWithDomNode(cell);
}
this.alignBoxes();
};
nitobi.grid.Selection.prototype.changeStartCellWithDomNode=function(cell){
this.startCell=cell;
var Cell=nitobi.grid.Cell;
this.changeStartCell(Cell.getRowNumber(cell),Cell.getColumnNumber(cell));
};
nitobi.grid.Selection.prototype.changeEndCellWithDomNode=function(cell){
this.endCell=cell;
var Cell=nitobi.grid.Cell;
this.changeEndCell(Cell.getRowNumber(cell),Cell.getColumnNumber(cell));
};
nitobi.grid.Selection.prototype.init=function(cell){
this.createBoxes();
var t=new Date();
this.selecting=true;
this.setRangeWithDomNodes(cell,cell);
};
nitobi.grid.Selection.prototype.clear=function(){
if(!this.box){
return;
}
var bs=this.box.style;
bs.display="none";
bs.top="-1000px";
bs.left="-1000px";
bs.width="1px";
bs.height="1px";
var bls=this.boxl.style;
bls.display="none";
bls.top="-1000px";
bls.left="-1000px";
bls.width="1px";
bls.height="1px";
this.selecting=false;
};
nitobi.grid.Selection.prototype.handleSelectionClick=function(evt){
if(!this.selected()){
if(NTB_SINGLECLICK==null){
if(nitobi.browser.IE){
evt=nitobi.lang.copy(evt);
}
NTB_SINGLECLICK=window.setTimeout(nitobi.lang.close(this,this.edit,[evt]),150);
}
}else{
this.collapse();
this.owner.focus();
}
};
nitobi.grid.Selection.prototype.handleDblClick=function(evt){
if(!this.selected()){
window.clearTimeout(NTB_SINGLECLICK);
NTB_SINGLECLICK=null;
if(this.owner.handleDblClick(evt)){
this.edit(evt);
}
}else{
this.collapse();
}
};
nitobi.grid.Selection.prototype.edit=function(evt){
NTB_SINGLECLICK=null;
if(this.owner.activeCell&&this.owner.activeCell.getAttribute("ebatype")=="expander"){
this.owner.toggleSurface(this.owner.activeCell);
}else{
this.owner.edit(evt);
}
};
nitobi.grid.Selection.prototype.select=function(_54d,_54e){
this.selectWithCoords(_54d.getRowNumber(),_54d.getColumnNumber(),_54e.getRowNumber(),_54e.getColumnNumber());
};
nitobi.grid.Selection.prototype.selectWithCoords=function(_54f,_550,_551,_552,_553){
this.setRange(_54f,_550,_551,_552,_553);
this.createBoxes();
this.alignBoxes();
};
nitobi.grid.Selection.prototype.handleSelectionMouseUp=function(evt){
if(this.expanding){
this.handleGrabbyMouseUp(evt);
}
this.stopSelecting();
this.onMouseUp.notify(this);
};
nitobi.grid.Selection.prototype.handleSelectionMouseDown=function(evt){
};
nitobi.grid.Selection.prototype.stopSelecting=function(){
this.selecting=true;
if(!this.selected()){
this.collapse(this.startCell);
}
this.selecting=false;
};
nitobi.grid.Selection.prototype.getStartCell=function(){
return this.startCell;
};
nitobi.grid.Selection.prototype.getEndCell=function(){
return this.endCell;
};
nitobi.grid.Selection.prototype.getTopLeftCell=function(){
var _556=this.getCoords();
var _557=nitobi.grid.Cell.getSurfacePath(this.startCell);
var _558=this.owner.scroller.getSurface(_557);
return new nitobi.grid.Cell(this.owner,_556.top.y,_556.top.x,_558);
};
nitobi.grid.Selection.prototype.getBottomRightCell=function(){
var _559=this.getCoords();
var _55a=nitobi.grid.Cell.getSurfacePath(this.startCell);
var _55b=this.owner.scroller.getSurface(_55a);
return new nitobi.grid.Cell(this.owner,_559.bottom.y,_559.bottom.x,_55b);
};
nitobi.grid.Selection.prototype.getHeight=function(){
var _55c=this.getCoords();
return _55c.bottom.y-_55c.top.y+1;
};
nitobi.grid.Selection.prototype.getWidth=function(){
var _55d=this.getCoords();
return _55d.bottom.x-_55d.top.x+1;
};
nitobi.grid.Selection.prototype.getRowByCoords=function(_55e){
return (_55e.parentNode.offsetTop/_55e.parentNode.offsetHeight);
};
nitobi.grid.Selection.prototype.getColumnByCoords=function(_55f){
var _560=(this.indicator?-2:0);
if(_55f.parentNode.parentNode.getAttribute("id").substr(0,6)!="freeze"){
_560+=2-(this.freezeColumn*3);
}else{
_560+=2;
}
return Math.floor((_55f.sourceIndex-_55f.parentNode.sourceIndex-_560)/3);
};
nitobi.grid.Selection.prototype.selected=function(){
return (this.endCell==this.startCell)?false:true;
};
nitobi.grid.Selection.prototype.setRowHeight=function(_561){
this.rowHeight=_561;
};
nitobi.grid.Selection.prototype.getRowHeight=function(){
return this.rowHeight;
};
nitobi.grid.Selection.prototype.setExpanding=function(val,dir){
if(val&&this.expanding){
return;
}
this.expanding=val;
this.expandingVertical=(dir=="horiz"?false:true);
var C=nitobi.html.Css;
var _565="ntb-grid-selection-border";
var _566=_565+"-active";
if(val){
C.swapClass(this.box,_565,_566);
C.swapClass(this.boxl,_565,_566);
}else{
C.swapClass(this.box,_566,_565);
C.swapClass(this.boxl,_566,_565);
}
};
nitobi.grid.Selection.prototype.dispose=function(){
};
nitobi.grid.Selection.prototype.align=function(_567,_568,_569,_56a,oh,ow,oy,ox,show){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_56a;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(!_568||!(_568.getBoundingClientRect)){
return;
}
ad=_568.getBoundingClientRect();
bd=_569.getBoundingClientRect();
sd=_567.getBoundingClientRect();
at=ad.top;
ab=ad.bottom;
al=ad.left;
ar=ad.right;
bt=bd.top;
bb=bd.bottom;
bl=bd.left;
br=bd.right;
tt=ad.top;
tb=bd.bottom;
tl=ad.left;
tr=bd.right;
th=Math.abs(tb-tt);
tw=Math.abs(tr-tl);
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
var H=nitobi.html;
if(a&268435456){
_567.style.height=(Math.max(bb-at,ab-bt)+oh)+"px";
}
if(a&16777216){
_567.style.width=(Math.max(br-al,ar-bl)+ow)+"px";
}
if(a&1048576){
_567.style.top=(H.getStyleTop(_567)+Math.min(tt,bt)-st+oy)+"px";
}
if(a&65536){
_567.style.top=(H.getStyleTop(_567)+tt-st+th-sh+oy)+"px";
}
if(a&4096){
_567.style.left=(H.getStyleLeft(_567)-sl+Math.min(tl,bl)+ox)+"px";
}
if(a&256){
_567.style.left=(H.getStyleLeft(_567)-sl+tl+tw-sw+ox)+"px";
}
if(a&16){
_567.style.top=(H.getStyleTop(_567)+tt-st+oy+Math.floor((th-sh)/2))+"px";
}
if(a&1){
_567.style.left=(H.getStyleLeft(_567)-sl+tl+ox+Math.floor((tw-sw)/2))+"px";
}
};
nitobi.grid.Surface=function(_580,grid,key,_583){
this.grid=grid;
this.scroller=_580;
this.uid=nitobi.component.getUniqueId();
this.key=key||0;
this.rowIndex=_583;
this.columnSetId;
this.cachedColumns=[];
this.cachedCells={};
this.columnsNode;
this.rows=0;
this.sortLocal=false;
this.headerAttached=false;
this.eventMap={};
this.onRenderComplete=new nitobi.base.Event();
this.onRangeUpdate=new nitobi.base.Event();
this.onHtmlReady=new nitobi.base.Event();
this.onSetVisible=new nitobi.base.Event();
this.onBeforeToggle=new nitobi.base.Event();
this.onAfterToggle=new nitobi.base.Event();
this.onBeforeExpand=new nitobi.base.Event();
this.eventMap["BeforeExpand"]=this.onBeforeExpand;
this.onAfterExpand=new nitobi.base.Event();
this.eventMap["AfterExpand"]=this.onAfterExpand;
this.onBeforeCollapse=new nitobi.base.Event();
this.eventMap["BeforeCollapse"]=this.onBeforeCollapse;
this.onAfterCollapse=new nitobi.base.Event();
this.eventMap["AfterCollapse"]=this.onAfterCollapse;
this.showEffect=nitobi.effects.families[(this.grid.isEffectsEnabled()?"blind":"none")].show;
this.hideEffect=nitobi.effects.families[(this.grid.isEffectsEnabled()?"blind":"none")].hide;
this.effect;
this.rowHeight=23;
this.lastTimeoutId=0;
this.dataTable=null;
this.cacheMap=new nitobi.collections.CacheMap();
var VP=nitobi.grid.Viewport;
this.view={topleft:new VP(this.grid,0,this),topcenter:new VP(this.grid,1,this),midleft:new VP(this.grid,3,this),midcenter:new VP(this.grid,4,this)};
this.surfaces={};
this.isVisible=false;
this.surfaceXslProc=nitobi.xml.createXslProcessor(nitobi.grid.surfaceXslProc.stylesheet);
this.view.midcenter.onHtmlReady.subscribe(this.handleHtmlReady,this);
};
nitobi.grid.Surface.prototype.handleHtmlReady=function(){
this.onHtmlReady.notify();
};
nitobi.grid.Surface.prototype.getUnrenderedBlocks=function(_585,_586,_587){
var pair={first:0,last:this.displayedRowCount-1};
if(this.grid.getPagingMode().toLowerCase()==nitobi.grid.PAGINGMODE_NONE&&this.key=="0"){
return pair;
}
var MC=this.view.midcenter;
var b0=this.findBlockAtCoord(_585);
var b1=this.findBlockAtCoord(_585+this.scroller.height);
var _58c=null;
var _58d=null;
var _58e=0;
if(b0==null){
return pair;
}
var _58f=this.calculateOffsetTop();
var _590=nitobi.html.getChildNodeByAttribute(b0,"className","ntb-grid-subgroup");
var _591=0;
if(_590){
_591=_590.offsetHeight;
}
_58c=b0.top+Math.floor((_585-(_58f+b0.offsetTop+this.rowHeight)-_591)/this.rowHeight);
if(_58c<0){
_58c=0;
}
if(b1){
_58d=b1.top+Math.floor((_585+this.scroller.scrollSurface.offsetHeight-b1.offsetTop)/this.rowHeight)+_58e;
}else{
_58d=_58c+Math.floor(this.view.midcenter.surface.offsetHeight/this.rowHeight)+_58e;
}
_58d=Math.min(_58d,this.rows-1);
_58c=Math.max(Math.min(_58c,this.rows-1),0);
if(this.grid.getPagingMode()==nitobi.grid.MODE_STANDARDPAGING&&this.key=="0"){
var _592=0;
if(_587==nitobi.grid.RENDERMODE_ONDEMAND){
var _593=_58c+_592;
var last=Math.min(_58d+_592,_592+this.getDisplayedRowCount()-1);
pair={first:_593,last:last};
}else{
var _593=_592;
var last=_593+this.displayedRowCount-1;
pair={first:_593,last:last};
}
}else{
pair={first:_58c,last:_58d};
}
this.onRangeUpdate.notify(pair);
return pair;
};
nitobi.grid.Surface.prototype.calculateOffsetTop=function(){
var _595=this.view.midcenter.element;
var _596=this.scroller.scrollSurface;
for(var ly=0;_595!=_596&&_595!=null;_595=_595.offsetParent){
ly+=_595.offsetTop;
}
return ly;
};
nitobi.grid.Surface.prototype.findBlockAtCoord=function(top){
var _599=this.view.midcenter.container.childNodes;
for(var i=0;i<_599.length;i++){
var _59b=_599[i];
var rt;
rt=this.calculateOffsetTop()+_59b.offsetTop;
var rb=rt+_59b.offsetHeight;
if(top>=rt&&top<=rb){
return _59b;
}
}
};
nitobi.grid.Surface.prototype.updateCellRanges=function(cols,frzL,frzT,frzR,frzB){
this.columns=cols;
this.freezetop=frzT;
this.freezeleft=frzL;
};
nitobi.grid.Surface.prototype.setCellRanges=function(_5a3){
};
nitobi.grid.Surface.prototype.clearData=function(){
this.view.midcenter.clear(false,false,true,null,this.rows);
};
nitobi.grid.Surface.prototype.clearHeader=function(){
this.view.topcenter.clear(true);
};
nitobi.grid.Surface.prototype.mapToHtml=function(uid){
this.htmlNode=$(this.key+"_surface"+uid);
for(var i=0;i<4;i++){
var node=$("gridvp_"+i+"_"+uid+"_"+this.key);
this.view[EBAScroller_VIEWPANES[i]].mapToHtml(node,nitobi.html.getFirstChild(node),null);
}
};
nitobi.grid.Surface.prototype.initializeBlock=function(_5a7){
for(var i=0;i<4;i++){
this.view[EBAScroller_VIEWPANES[i]].makeLastBlock(0,_5a7*5);
}
};
nitobi.grid.Surface.prototype.renderAtScrollPosition=function(_5a9){
var _5aa=this.getBlocksInView(_5a9);
if(_5aa==null){
return true;
}
var _5ab=true;
for(var i=0;i<_5aa.length;i++){
var _5ad=_5aa[i];
for(var j=0;j<_5ad.childNodes.length;j++){
var _5af=_5ad.childNodes[j];
if(_5af.nodeType==1&&_5af.className=="ntb-surface"){
var id=_5af.getAttribute("id");
var key=id.match(/(.*?)_surface/);
key=key[1];
var _5b2=key.split("_");
var _5b3=this.surfaces[_5b2.pop()];
_5ab=_5b3.renderAtScrollPosition(_5a9);
}
}
}
if(_5ab){
var _5b4=this.getUnrenderedBlocks(_5a9);
this.performRender(_5b4);
var _5b5=nitobi.html.getFirstChild(this.htmlNode).getBoundingClientRect();
var _5b6=_5a9+this.scroller.scrollSurface.offsetHeight;
var _5b7;
if((Math.abs(_5b5.top)<=_5a9&&Math.abs(_5b5.bottom)>=_5b6)||(this.grid.getPagingMode()==nitobi.grid.MODE_STANDARDPAGING)){
_5b7=false;
}else{
_5b7=true;
}
}
this.onRenderComplete.notify();
return _5b7;
};
nitobi.grid.Surface.prototype.performRender=function(_5b8){
var mc=this.view.midcenter;
var ml=this.view.midleft;
var _5bb=this.dataTable;
var _5bc=_5b8.first;
var last=_5b8.last;
var gaps=this.cacheMap.gaps(_5bc,last);
var _5bf=(this.pagingMode=="livescrolling"?(_5bc+last<=0):(_5bc+last<=-1));
if(_5bf){
this.onHtmlReady.notify();
}else{
if(gaps[0]!=null){
var low=gaps[0].low;
var high=gaps[0].high;
var rows=high-low+1;
if(!_5bb.inCache(low,rows)){
if(low==null||rows==null){
alert("low or rows =null");
}
_5bb.get(low,rows);
var _5c3=_5bb.cachedRanges(low,high);
for(var i=0;i<_5c3.length;i++){
var _5c5=this.cacheMap.gaps(_5c3[i].low,_5c3[i].high);
for(var j=0;j<_5c5.length;j++){
_5b8.first=_5c5[j].low;
_5b8.last=_5c5[j].high;
this.renderGap(_5c5[j].low,_5c5[j].high);
}
}
return false;
}else{
this.renderGap(low,high);
}
}
}
};
nitobi.grid.Surface.prototype.getBlocksInView=function(_5c7){
var _5c8=this.view.midcenter;
var _5c9=this.findBlockAtCoord(_5c7);
var _5ca=this.findBlockAtCoord(_5c7+this.scroller.height);
if(_5c9==null){
return;
}
var _5cb=[_5c9];
if(_5ca==null||_5c9==_5ca){
return _5cb;
}
var _5cc=_5c9.nextSibling;
while(_5cc!=_5ca.nextSibling&&_5cc!=null){
if(_5cc.nodeType==1){
_5cb.push(_5cc);
}
_5cc=_5cc.nextSibling;
}
return _5cb;
};
nitobi.grid.Surface.prototype.renderGap=function(low,high){
var gaps=this.cacheMap.gaps(low,high);
var mc=this.view.midcenter;
var ml=this.view.midleft;
if(gaps[0]!=null){
var low=gaps[0].low;
var high=gaps[0].high;
var rows=high-low+1;
this.cacheMap.insert(low,high);
mc.renderGap(low,high,this.dataTable.id,this.key);
}
};
nitobi.grid.Surface.prototype.reRender=function(_5d3,end){
var _5d5=this.view.midleft.clearBlocks(_5d3,end);
this.view.midcenter.clearBlocks(_5d3,end);
this.cacheMap.remove(_5d5.top,_5d5.bottom);
this.performRender({first:_5d5.top,last:_5d5.bottom});
};
nitobi.grid.Surface.prototype.setSort=function(col,dir){
this.view.topleft.setSort(col,dir);
this.view.topcenter.setSort(col,dir);
this.view.midleft.setSort(col,dir);
this.view.midcenter.setSort(col,dir);
};
nitobi.grid.Surface.prototype.setViewportProperty=function(_5d8,_5d9){
var sv=this.view;
for(var i=0;i<EBAScroller_VIEWPANES.length;i++){
sv[EBAScroller_VIEWPANES[i]]["set"+_5d8](_5d9);
}
};
nitobi.grid.Surface.prototype.createRenderers=function(data){
var ci=this.grid.isColumnIndicatorsEnabled();
var rh=this.grid.isRowHighlightEnabled();
var rowh=this.grid.getRowHeight();
this.view.topleft.rowRenderer=new nitobi.grid.RowRenderer(data,this.columnsNode,0,this.grid.uid,this.key,ci,rh,rowh);
this.view.topcenter.rowRenderer=new nitobi.grid.RowRenderer(data,this.columnsNode,0,this.grid.uid,this.key,ci,rh,rowh);
this.view.midleft.rowRenderer=new nitobi.grid.RowRenderer(data,this.columnsNode,0,this.grid.uid,this.key,0,rh,rowh);
this.view.midcenter.rowRenderer=new nitobi.grid.RowRenderer(data,this.columnsNode,0,this.grid.uid,this.key,0,rh,rowh);
};
nitobi.grid.Surface.prototype.setDataTable=function(_5e0){
this.dataTable=_5e0;
this.dataTable.descriptor.isAtEndOfTable=true;
this.view.midleft.rowRenderer.dataTableId=this.dataTable.id;
this.view.midcenter.rowRenderer.dataTableId=this.dataTable.id;
};
nitobi.grid.Surface.prototype.splitBlock=function(row){
return this.view.midcenter.splitBlock(row);
};
nitobi.grid.Surface.prototype.renderContainer=function(uid,_5e3){
_5e3=_5e3||false;
this.surfaceXslProc.addParameter("uniqueId",uid,"");
this.surfaceXslProc.addParameter("columnsId",this.columnsNode.getAttribute("id"),"");
this.surfaceXslProc.addParameter("surfaceKey",this.key,"");
this.surfaceXslProc.addParameter("isSubgroup",_5e3.toString(),"");
this.surfaceXslProc.addParameter("groupOffset",this.grid.getGroupOffset(),"");
var _5e4=nitobi.xml.transformToString(nitobi.xml.createXmlDoc(""),this.surfaceXslProc);
return _5e4;
};
nitobi.grid.Surface.prototype.renderHeader=function(){
var tc=this.view.topcenter;
tc.top=23;
tc.left=0;
tc.renderGap(0,0,false,this.key);
};
nitobi.grid.Surface.prototype.connectToTable=function(_5e6){
this.dataTable=_5e6;
this.view.midleft.rowRenderer.dataTableId=this.dataTable.id;
this.view.midcenter.rowRenderer.dataTableId=this.dataTable.id;
this.fieldMap=_5e6.fieldMap;
this.tempGuid=this.dataTable.subscribe("DataReady",nitobi.lang.close(this,this.initialize));
this.dataTable.subscribe("RowDeleted",nitobi.lang.close(this,this.syncWithData));
this.dataTable.subscribe("RowInserted",nitobi.lang.close(this,this.syncWithData));
};
nitobi.grid.Surface.prototype.initialize=function(_5e7){
this.bindColumns();
this.rows=this.dataTable.getTotalRowCount();
this.displayedRowCount=this.rows;
this.renderHeader();
this.initializeBlock((this.rows-1)/5);
this.onRenderComplete.notify(this.rows);
this.dataTable.subscribe("DataReady",nitobi.lang.close(this,this.handleDataReady));
this.performRender({first:_5e7.firstRow,last:(_5e7.lastRow>this.rows?this.rows:_5e7.lastRow)});
this.onSetVisible.subscribeOnce(this.grid.handleToggleSurface,this.grid);
this.setVisible(true);
nitobi.event.unsubscribe("DataReady"+this.dataTable.uid,this.tempGuid);
};
nitobi.grid.Surface.prototype.handleOnBeforeToggle=function(e){
this.isVisible=e;
if(e==true){
this.grid.resizeSurfaces();
this.grid.adjustHorizontalScrollBars();
}
};
nitobi.grid.Surface.prototype.handleOnAfterToggle=function(_5e9){
this.isVisible=_5e9;
if(e==false){
this.grid.resizeSurfaces();
this.grid.adjustHorizontalScrollBars();
}
if(nitobi.browser.IE&&nitobi.lang.isStandards()){
this.htmlNode.style.position="static";
}
var e=new nitobi.base.EventArgs(this);
e.visible=_5e9;
this.onSetVisible.notify(e);
};
nitobi.grid.Surface.prototype.handleDataReady=function(_5eb){
this.performRender({first:_5eb.firstRow,last:(_5eb.lastRow>this.rows?this.rows:_5eb.lastRow)});
};
nitobi.grid.Surface.prototype.bindColumns=function(){
var _5ec=this.columnsNode.childNodes;
for(var i=0;i<_5ec.length;i++){
var _5ee=_5ec[i];
var _5ef=_5ee.getAttribute("xdatafld");
if(this.dataTable.fieldMap[_5ef]){
_5ee.setAttribute("xdatafld",this.dataTable.fieldMap[_5ef]);
}
}
};
nitobi.grid.Surface.prototype.getColumnObject=function(_5f0){
var _5f1=null;
if(_5f0>this.columnsNode.childNodes.length-1){
return null;
}
if(_5f0>=0){
_5f1=this.cachedColumns[_5f0];
if(_5f1==null){
var _5f2=this.columnsNode.childNodes[_5f0].getAttribute("DataType");
switch(_5f2){
case "number":
_5f1=new nitobi.grid.NumberColumn(this.grid,_5f0,this);
break;
case "date":
_5f1=new nitobi.grid.DateColumn(this.grid,_5f0,this);
break;
default:
_5f1=new nitobi.grid.TextColumn(this.grid,_5f0,this);
break;
}
this.cachedColumns[_5f0]=_5f1;
}
}
if(_5f1==null||_5f1.getModel()==null){
return null;
}else{
return _5f1;
}
};
nitobi.grid.Surface.prototype.getCellObject=function(row,col){
var _5f5=col;
if(row>this.rows-1||col>this.columnsNode.childNodes.length-1){
return null;
}
var cell=this.cachedCells[row+"_"+col];
if(cell==null){
if(typeof (col)=="string"){
var node=this.columnsNode.selectSingleNode("//ntb:column[@xdatafld_org='"+col+"']");
if(node!=null){
col=parseInt(node.getAttribute("xi"));
}
}
if(typeof (col)=="number"){
cell=new nitobi.grid.Cell(this.grid,row,col,this);
}else{
cell=null;
}
this.cachedCells[row+"_"+col]=this.cachedCells[row+"_"+_5f5]=cell||"";
}else{
if(cell==""){
cell=null;
}
}
return cell;
};
nitobi.grid.Surface.prototype.recalculateRowCount=function(){
var _5f8=this.displayedRowCount;
for(var id in this.surfaces){
var _5fa=this.surfaces[id];
if(_5fa.isVisible){
_5f8+=_5fa.recalculateRowCount();
}
}
return _5f8;
};
nitobi.grid.Surface.prototype.sort=function(_5fb,_5fc){
var _5fd=this.getColumnObject(_5fb);
this.setSortStyle(_5fb,_5fc);
var _5fe=_5fd.getColumnName();
var _5ff=_5fd.getDataType();
this.dataTable.sort(_5fe,_5fc,_5ff,this.sortLocal);
if(!this.sortLocal){
this.dataTable.flush();
}
if(this.key=="0"){
this.grid.scroller.surfaceMap={};
}
this.purgeSurfaces();
};
nitobi.grid.Surface.prototype.setSortStyle=function(_600,_601){
var _602=this.getColumnObject(_600);
_602.setSortDirection(_601);
this.setColumnSortOrder(_600,_601);
this.sortColumn=_602;
this.sortColumnCell=_602.getHeaderElement();
this.setSort(_600,_601);
};
nitobi.grid.Surface.prototype.setColumnSortOrder=function(_603,_604){
this.clearColumnHeaderSortOrder();
var _605=this.getColumnObject(_603);
var _606=_605.getHeaderElement();
var _607=_605.getHeaderCopy();
var CSS=nitobi.html.Css;
var css=_606.className;
if(_607){
var _60a=_607.className;
}
if(_604==""){
_606.className=css.replace(/(ntb-column-indicator-border\S*)/g,"")+" ntb-column-indicator-border";
if(_607){
_607.className=_60a.replace(/(ntb-column-indicator-border\S*)/g,"")+" ntb-column-indicator-border";
}
_604="Desc";
}else{
var _60b=function(m){
var repl=(_604=="Desc"?"descending":"ascending");
return (m.indexOf("hover")>0?m.replace("hover",repl+"hover"):m+repl);
};
_606.className=css.replace(/(ntb-column-indicator-border\S*)/g,_60b);
if(_607){
_607.className=_60a.replace(/(ntb-column-indicator-border\S*)/g,_60b);
}
}
_605.setSortDirection(_604);
this.sortColumn=_605;
this.sortColumnCell=_606;
};
nitobi.grid.Surface.prototype.clearColumnHeaderSortOrder=function(){
if(this.sortColumn){
var _60e=this.sortColumn;
var _60f=_60e.getHeaderElement();
var _610=_60e.getHeaderCopy();
var css=_60f.className;
css=css.replace(/ascending/gi,"").replace(/descending/gi,"");
_60f.className=css;
if(_610){
_610.className=css;
}
this.sortColumn=null;
}
};
nitobi.grid.Surface.prototype.insertRow=function(_612){
var _613=this.dataTable.getTemplateNode();
for(var i=0;i<this.columnsNode.childNodes.length;i++){
var _615=this.getColumnObject(i);
var _616=_615.getInitial();
if(_616==null||_616==""){
var _617=_615.getDataType();
if(_617==null||_617==""){
_617="text";
}
switch(_617){
case "text":
_616="";
break;
case "number":
_616=0;
break;
case "date":
_616="1900-01-01";
break;
}
}
var att=_615.getxdatafld().substr(1);
if(att!=null&&att!=""){
_613.setAttribute(att,_616);
}
}
this.displayedRowCount++;
this.clear();
this.grid.selection.clearBoxes();
this.dataTable.createRecord(_613,_612);
};
nitobi.grid.Surface.prototype.clear=function(){
this.clearData();
this.cacheMap.flush();
this.purgeSurfaces();
};
nitobi.grid.Surface.prototype.deleteRow=function(_619){
this.displayedRowCount--;
this.clear();
this.onHtmlReady.subscribeOnce(nitobi.lang.close(this,this.handleAfterDeleteRow,[_619]));
this.dataTable.deleteRecord(_619);
};
nitobi.grid.Surface.prototype.handleAfterDeleteRow=function(xi){
this.grid.setActiveCell(this.grid.getCellElement(xi,0,this.key));
};
nitobi.grid.Surface.prototype.syncWithData=function(){
var _61b=this.scroller.scrollSurface.scrollTop+this.scroller.headerHeight;
var _61c=this.getUnrenderedBlocks(_61b);
this.performRender(_61c);
};
nitobi.grid.Surface.prototype.purgeSurfaces=function(){
for(var key in this.surfaces){
this.surfaces[key].purgeSurfaces();
}
this.surfaces={};
delete this.scroller.surfaceMap[this.key];
};
nitobi.grid.Surface.prototype.setRowCount=function(rows){
this.rows=rows;
this.displayedRowCount=this.rows;
};
nitobi.grid.Surface.prototype.save=function(){
for(var key in this.surfaces){
var _620=this.surfaces[key];
_620.save();
}
if(this.dataTable.log.selectNodes("//"+nitobi.xml.nsPrefix+"data/*").length==0){
return;
}
this.dataTable.save(nitobi.lang.close(this.grid,this.grid.saveCompleteHandler),this.grid.getOnBeforeSaveEvent());
};
nitobi.grid.Surface.prototype.calculateWidth=function(){
var _621=this.columnsNode.childNodes;
var cols=_621.length;
start=0;
end=cols;
var wT=0;
for(var i=start;i<end;i++){
if(_621[i].getAttribute("Visible")=="1"||_621[i].getAttribute("visible")=="1"){
wT+=Number(_621[i].getAttribute("Width"));
}
}
var _625=nitobi.html.getFirstChild(this.htmlNode).offsetLeft;
return wT+_625;
};
nitobi.grid.Surface.prototype.subscribeColumnEvents=function(){
if(this.columnsNode==null){
return;
}
var _626=this.columnsNode.selectSingleNode("//ntb:column[@type='EXPAND']");
if(_626==null){
return;
}
for(var name in this.eventMap){
var ev=_626.getAttribute(name);
if(ev!=null&&ev!=""){
this.eventMap[name].subscribe(ev,this,name);
}
}
};
nitobi.grid.Surface.prototype.getDepth=function(){
if(this.depth){
return this.depth;
}
return this.depth=this.key.split("_").length;
};
nitobi.grid.Surface.prototype.checkHeaders=function(){
var s=this.surfaces;
var _62a=this.grid.getSubHeaderContainer().offsetHeight;
for(var key in s){
var _62c=s[key];
var rt=_62c.calculateOffsetTop()-(nitobi.browser.IE6?_62e:0);
var rb=rt+_62c.view.midcenter.surface.offsetHeight;
var _630=this.scroller.scrollSurface.scrollTop;
var _631=_630+this.scroller.scrollSurface.offsetHeight;
var _62e=this.grid.getHeaderHeight();
if(_62c.isVisible&&_62c.headerAttached&&(rb<=_630+_62a||(rt>=_630+_62a&&rt-(nitobi.browser.IE6?_62e:0)<=_631))){
_62c.clearTopHeader();
}else{
if(_62c.isVisible&&_630+_62e+_62a>=rt&&_630+_62a+_62e<=rb&&!_62c.headerAttached){
_62c.attachTopHeader();
}
}
_62c.checkHeaders();
}
};
nitobi.grid.Surface.prototype.attachTopHeader=function(){
var _632=this.header=this.view.topcenter.element.cloneNode(true);
var Css=nitobi.html.Css;
sbStyle=_632.style;
sbStyle.left=((this.getDepth()-1)*this.grid.getGroupOffset())+1+"px";
sbStyle.position="relative";
sbStyle.overflow="visible";
Css.removeClass(_632,"ntb-grid-header");
Css.addClass(nitobi.html.getFirstChild(_632),"ntb-grid-header");
var _634=this.grid.getSubHeaderContainer();
_634.appendChild(_632);
for(var i=0;i<this.columnsNode.childNodes.length;i++){
var col=this.getColumnObject(i);
var _637=col.getHeaderElement();
var id=_637.getAttribute("id");
_637.setAttribute("id",id+"copy");
}
_634.style.display="block";
this.headerAttached=true;
};
nitobi.grid.Surface.prototype.clearTopHeader=function(){
if(this.header){
this.grid.getSubHeaderContainer().removeChild(this.header);
this.headerAttached=false;
this.header=null;
if(this.grid.getSubHeaderContainer().childNodes.length==0){
this.grid.getSubHeaderContainer().style.display="none";
}
}
};
nitobi.grid.Surface.prototype.setVisible=function(_639){
if(this.grid.isEffectsEnabled()){
if(this.effect){
this.effect.end();
}
var _63a={};
var _63b=(_639?new this.showEffect(this.htmlNode,_63a):new this.hideEffect(this.htmlNode,_63a));
this.effect=_63b;
if(nitobi.browser.IE&&nitobi.lang.isStandards()){
this.htmlNode.style.position="relative";
}
_63b.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_63b.onBeforeStart.subscribe(nitobi.lang.close(this,this.handleOnBeforeToggle,[_639]));
_63b.onFinish.subscribe(nitobi.lang.close(this,this.handleOnAfterToggle,[_639]));
_63b.start();
}else{
this.handleOnBeforeToggle(_639);
if(_639){
nitobi.html.Css.removeClass(this.htmlNode,NTB_CSS_HIDE);
}else{
nitobi.html.Css.addClass(this.htmlNode,NTB_CSS_HIDE);
}
this.handleOnAfterToggle(_639);
}
};
nitobi.grid.Surface.prototype.expand=function(){
this.parent.onBeforeExpand.notify();
this.setVisible(true);
};
nitobi.grid.Surface.prototype.collapse=function(){
this.parent.onBeforeCollapse.notify();
this.setVisible(false);
};
nitobi.grid.Surface.prototype.isCellInSurface=function(cell){
if(!cell){
return false;
}
return nitobi.grid.Cell.getSurfacePath(cell).indexOf(this.key)==0;
};
nitobi.grid.Surface.prototype.dispose=function(){
this.htmlNode=null;
this.surfaces=null;
this.cachedColumns=null;
this.cachedCells=null;
};
nitobi.grid.TextColumn=function(grid,_63e,_63f){
nitobi.grid.TextColumn.baseConstructor.call(this,grid,_63e,_63f);
};
nitobi.lang.extend(nitobi.grid.TextColumn,nitobi.grid.Column);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Toolbars=function(_640){
this.uid="nitobiToolbar_"+nitobi.base.getUid();
this.toolbars={};
this.visibleToolbars=_640;
};
nitobi.ui.Toolbars.VisibleToolbars={};
nitobi.ui.Toolbars.VisibleToolbars.STANDARD=1;
nitobi.ui.Toolbars.VisibleToolbars.PAGING=1<<1;
nitobi.ui.Toolbars.prototype.initialize=function(){
this.enabled=true;
this.toolbarXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.toolbarDoc));
this.toolbarPagingXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.pagingToolbarDoc));
};
nitobi.ui.Toolbars.prototype.attachToParent=function(_641){
this.initialize();
this.container=_641;
if(this.standardToolbar==null&&this.visibleToolbars){
this.makeToolbar();
this.render();
}
};
nitobi.ui.Toolbars.prototype.setWidth=function(_642){
this.width=_642;
};
nitobi.ui.Toolbars.prototype.getWidth=function(){
return this.width;
};
nitobi.ui.Toolbars.prototype.setHeight=function(_643){
this.height=_643;
};
nitobi.ui.Toolbars.prototype.getHeight=function(){
return this.height;
};
nitobi.ui.Toolbars.prototype.setRowInsertEnabled=function(_644){
this.rowInsertEnabled=_644;
};
nitobi.ui.Toolbars.prototype.isRowInsertEnabled=function(){
return this.rowInsertEnabled;
};
nitobi.ui.Toolbars.prototype.setRowDeleteEnabled=function(_645){
this.rowDeleteEnabled=_645;
};
nitobi.ui.Toolbars.prototype.isRowDeleteEnabled=function(){
return this.rowDeleteEnabled;
};
nitobi.ui.Toolbars.prototype.makeToolbar=function(){
var _646=this.findCssUrl();
this.toolbarXml.documentElement.setAttribute("id","toolbar"+this.uid);
this.toolbarXml.documentElement.setAttribute("image_directory",_646);
var _647=this.toolbarXml.selectNodes("/toolbar/items/*");
for(var i=0;i<_647.length;i++){
if(_647[i].nodeType!=8){
_647[i].setAttribute("id",_647[i].getAttribute("id")+this.uid);
}
}
this.standardToolbar=new nitobi.ui.Toolbar(this.toolbarXml,"toolbar"+this.uid);
this.toolbarPagingXml.documentElement.setAttribute("id","toolbarpaging"+this.uid);
this.toolbarPagingXml.documentElement.setAttribute("image_directory",_646);
_647=(this.toolbarPagingXml.selectNodes("/toolbar/items/*"));
for(var i=0;i<_647.length;i++){
if(_647[i].nodeType!=8){
_647[i].setAttribute("id",_647[i].getAttribute("id")+this.uid);
}
}
this.pagingToolbar=new nitobi.ui.Toolbar(this.toolbarPagingXml,"toolbarpaging"+this.uid);
};
nitobi.ui.Toolbars.prototype.getToolbar=function(id){
return eval("this."+id);
};
nitobi.ui.Toolbars.prototype.findCssUrl=function(){
var _64a=nitobi.html.Css.findParentStylesheet(".ntb-toolbar");
if(_64a==null){
_64a=nitobi.html.Css.findParentStylesheet(".ntb-grid");
if(_64a==null){
nitobi.lang.throwError("The CSS for the toolbar could not be found.  Try moving the nitobi.grid.css file to a location accessible to the browser's javascript or moving it to the top of the stylesheet list. findParentStylesheet returned "+_64a);
}
}
return nitobi.html.Css.getPath(_64a);
};
nitobi.ui.Toolbars.prototype.isToolbarEnabled=function(){
return this.enabled;
};
nitobi.ui.Toolbars.prototype.render=function(){
var _64b=this.container;
_64b.style.visibility="hidden";
var xsl=nitobi.ui.ToolbarXsl;
if(xsl.indexOf("xsl:stylesheet")==-1){
xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"xml\" version=\"4.0\" />"+xsl+"</xsl:stylesheet>";
}
var _64d=nitobi.xml.createXslDoc(xsl);
var _64e=nitobi.xml.transformToString(this.standardToolbar.getXml(),_64d,"xml");
_64b.innerHTML=_64e;
_64b.style.zIndex="1000";
var _64f=nitobi.xml.transformToString(this.pagingToolbar.getXml(),_64d,"xml");
_64b.innerHTML+=_64f;
_64d=null;
xmlDoc=null;
this.standardToolbar.attachToTag();
this.pagingToolbar.attachToTag();
this.resize();
var _650=this;
var _651=this.standardToolbar.getUiElements();
for(eachbutton in _651){
switch(eachbutton){
case "save"+this.uid:
_651[eachbutton].onClick=function(){
_650.fire("Save");
};
break;
case "newRecord"+this.uid:
_651[eachbutton].onClick=function(){
_650.fire("InsertRow");
};
if(!this.isRowInsertEnabled()){
_651[eachbutton].disable();
}
break;
case "deleteRecord"+this.uid:
_651[eachbutton].onClick=function(){
_650.fire("DeleteRow");
};
if(!this.isRowDeleteEnabled()){
_651[eachbutton].disable();
}
break;
case "refresh"+this.uid:
_651[eachbutton].onClick=function(){
var _652=confirm("Refreshing will discard any changes you have made. Is it OK to refresh?");
if(_652){
_650.fire("Refresh");
}
};
break;
default:
}
}
var _653=this.pagingToolbar.getUiElements();
var _650=this;
for(eachPbutton in _653){
switch(eachPbutton){
case "previousPage"+this.uid:
_653[eachPbutton].onClick=function(){
_650.fire("PreviousPage");
};
_653[eachPbutton].disable();
break;
case "nextPage"+this.uid:
_653[eachPbutton].onClick=function(){
_650.fire("NextPage");
};
break;
default:
}
}
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.STANDARD){
this.standardToolbar.show();
}else{
this.standardToolbar.hide();
}
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.PAGING){
this.pagingToolbar.show();
}else{
this.pagingToolbar.hide();
}
_64b.style.visibility="visible";
};
nitobi.ui.Toolbars.prototype.resize=function(){
var _654=this.getWidth();
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.PAGING){
_654=_654-parseInt(this.pagingToolbar.getWidth());
this.standardToolbar.setHeight(this.getHeight());
}
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.STANDARD){
this.standardToolbar.setWidth(_654);
this.standardToolbar.setHeight(this.getHeight());
}
};
nitobi.ui.Toolbars.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.ui.Toolbars.prototype.subscribe=function(evt,func,_659){
if(typeof (_659)=="undefined"){
_659=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_659,func));
};
nitobi.ui.Toolbars.prototype.dispose=function(){
this.toolbarXml=null;
this.toolbarPagingXml=null;
if(this.toolbar&&this.toolbar.dispose){
this.toolbar.dispose();
this.toolbar=null;
}
if(this.toolbarPaging&&this.toolbarPaging.dispose){
this.toolbarPaging.dispose();
this.toolbarPaging=null;
}
};
var EBA_SELECTION_BUFFER=15;
var NTB_SINGLECLICK=null;
nitobi.grid.Viewport=function(grid,_65b,_65c){
this.disposal=[];
this.surface=_65c;
this.element=null;
this.rowHeight=23;
this.headerHeight=23;
this.sortColumn=0;
this.sortDir=1;
this.uid=nitobi.base.getUid();
this.region=_65b;
this.scrollIncrement=0;
this.grid=grid;
this.startRow=0;
this.rows=0;
this.startColumn=0;
this.columns=0;
this.rowRenderer=null;
this.onHtmlReady=new nitobi.base.Event();
};
nitobi.grid.Viewport.prototype.mapToHtml=function(_65d,_65e){
this.surface=_65e;
this.element=_65d;
this.container=nitobi.html.getFirstChild(_65e);
};
nitobi.grid.Viewport.prototype.makeLastBlock=function(low,high){
if(this.lastEmptyBlock==null&&this.grid&&this.region>2&&this.region<5&&this.container){
if(this.container.lastChild){
low=Math.max(low,this.container.lastChild.bottom);
}
this.lastEmptyBlock=this.renderEmptyBlock(low,high);
}
};
nitobi.grid.Viewport.prototype.setCellRanges=function(_661,rows,_663,_664){
this.startRow=_661;
this.rows=rows;
this.startColumn=_663;
this.columns=_664;
this.makeLastBlock(this.startRow,this.startRow+rows-1);
if(this.lastEmptyBlock!=null&&this.region>2&&this.region<5&&this.rows>0){
var _665=this.startRow+this.rows-1;
if(this.lastEmptyBlock.top>_665){
this.container.removeChild(this.lastEmptyBlock);
this.lastEmptyBlock=null;
}else{
this.lastEmptyBlock.bottom=_665;
this.lastEmptyBlock.style.height=(this.rowHeight*(this.lastEmptyBlock.bottom-this.lastEmptyBlock.top+1))+"px";
if(this.lastEmptyBlock.bottom<this.lastEmptyBlock.top){
throw "blocks are miss aligned.";
}
}
}
};
nitobi.grid.Viewport.prototype.clear=function(_666,_667,_668,_669,rows){
var uid=this.grid.uid;
if(this.surface&&_666){
this.surface.innerHTML="<div id=\"gridvpcontainer_"+this.region+"_"+uid+"\"></div>";
}
if(this.element&&_669){
this.element.innerHTML="<div id=\"gridvpsurface_"+this.region+"_"+uid+"\"><div id=\"gridvpcontainer_"+this.region+"_"+uid+"\"></div></div>";
}
if(this.surface&&_668){
nitobi.html.getFirstChild(this.surface).innerHTML="";
}
this.surface=nitobi.html.getFirstChild(this.element);
this.container=nitobi.html.getFirstChild(this.surface);
if(this.grid&&this.region>2&&this.region<5){
this.lastEmptyBlock=null;
}
this.makeLastBlock(0,(rows!=null?rows-1:0));
};
nitobi.grid.Viewport.prototype.setSort=function(_66c,_66d){
this.sortColumn=_66c;
this.sortDir=_66d;
};
nitobi.grid.Viewport.prototype.renderGap=function(top,_66f){
var _670=activeRow=null;
var _671=this.findBlock(top);
var o=this.renderInsideEmptyBlock(top,_66f,_671);
if(o==null){
return;
}
o.setAttribute("rendered","true");
var rows=_66f-top+1;
o.innerHTML=this.rowRenderer.render(top,rows,_670,activeRow,this.sortColumn,this.sortDir);
this.onHtmlReady.notify(this);
};
nitobi.grid.Viewport.prototype.findBlock=function(row){
var blk=this.container.childNodes;
for(var i=0;i<blk.length;i++){
if(row>=blk[i].top&&row<=blk[i].bottom){
return blk[i];
}
}
};
nitobi.grid.Viewport.prototype.findBlockAtCoord=function(top){
var blk=this.container.childNodes;
for(var i=0;i<blk.length;i++){
var rt=blk[i].offsetTop;
var rb=rt+blk[i].offsetHeight;
if(top>=rt&&top<=rb){
return blk[i];
}
}
};
nitobi.grid.Viewport.prototype.getBlocks=function(_67c,_67d){
var _67e=[];
var _67f=this.findBlock(_67c);
var _680=_67f;
_67e.push(_67f);
while(_67d>_680.bottom){
var _681=_680.nextSibling;
if(_681!=null){
_680=_681;
}else{
break;
}
_67e.push(_680);
}
return _67e;
};
nitobi.grid.Viewport.prototype.clearBlocks=function(_682,_683){
var _684=this.getBlocks(_682,_683);
var len=_684.length;
var top=_684[0].top;
var _687=_684[len-1].bottom;
var _688=_684[len-1].nextSibling;
for(var i=0;i<len;i++){
_684[i].parentNode.removeChild(_684[i]);
}
this.renderEmptyBlock(top,_687,_688);
return {"top":top,"bottom":_687};
};
nitobi.grid.Viewport.prototype.splitBlock=function(row){
row=parseInt(row);
var _68b=this.getBlocks(row,row)[0];
var top=_68b.top,_68d=_68b.bottom;
var _68e=nitobi.html.getFirstChild(nitobi.html.getFirstChild(_68b));
var _68f;
var i=_68b.childNodes.length-1;
while(i>0&&_68b.childNodes[i].nodeType==3&&_68b.childNodes[i].tagName.toLowerCase()!="table"){
i--;
}
if(i>0){
_68f=_68b.childNodes[i];
}
var _691=row-top;
var _692=_68e.cloneNode(true);
for(var i=_68e.rows.length-1;i>_691;i--){
_692.deleteRow(i);
}
this.updateBlock(_68b,top,row);
var _693=_68e.cloneNode(true);
for(var i=0;i<_691+1;i++){
_693.deleteRow(0);
}
var _694=this.renderBlock(parseInt(row)+1,_68d,_68b.nextSibling);
var _695=document.createElement("div");
_695.appendChild(_693);
_694.appendChild(_695);
_68e.parentNode.replaceChild(_692,_68e);
_68b.insertAdjacentElement("afterEnd",_694);
if(_68f){
_694.appendChild(_68f);
}
return {top:_68b,bottom:_694};
};
nitobi.grid.Viewport.prototype.renderInsideEmptyBlock=function(top,_697,_698){
if(_698==null){
return this.renderBlock(top,_697);
}
if(top==_698.top&&_697>=_698.bottom){
var _699=this.renderBlock(top,_697,_698);
this.container.replaceChild(_699,_698);
if(_698.bottom<_698.top){
throw "Render error";
}
return _699;
}
if(top==_698.top&&_697<_698.bottom){
_698.top=_697+1;
_698.style.height=(this.rowHeight*(_698.bottom-_698.top+1))+"px";
_698.rows=_698.bottom-_698.top+1;
if(_698.bottom<_698.top){
throw "Render error";
}
return this.renderBlock(top,_697,_698);
}
if(top>_698.top&&_697>=_698.bottom){
_698.bottom=top-1;
_698.style.height=(this.rowHeight*(_698.bottom-_698.top+1))+"px";
if(_698.bottom<_698.top){
throw "Render error";
}
return this.renderBlock(top,_697,_698.nextSibling);
}
if(top>_698.top&&_697<_698.bottom){
var _69a=this.renderEmptyBlock(_698.top,top-1,_698);
_698.top=_697+1;
_698.style.height=(this.rowHeight*(_698.bottom-_698.top+1))+"px";
if(_698.bottom<_698.top){
throw "Render error";
}
return this.renderBlock(top,_697,_698);
}
throw "Could not insert "+top+"-"+_697+_698.outerHTML;
};
nitobi.grid.Viewport.prototype.renderEmptyBlock=function(top,_69c,_69d){
var o=this.renderBlock(top,_69c,_69d);
o.setAttribute("id","eba_grid_emptyblock_"+this.region+"_"+top+"_"+_69c+"_"+this.uid);
o.setAttribute("rendered","false");
o.style.height=((_69c-top+1)*this.rowHeight)+"px";
return o;
};
nitobi.grid.Viewport.prototype.renderBlock=function(top,_6a0,_6a1){
var o=document.createElement("div");
o.setAttribute("id","eba_grid_block_"+this.region+"_"+top+"_"+_6a0+"_"+this.grid.uid);
o.top=top;
o.bottom=_6a0;
o.left=this.startColumn;
o.right=this.startColumn+this.columns;
o.rows=_6a0-top+1;
o.columns=this.columns;
if(_6a1){
this.container.insertBefore(o,_6a1);
}else{
this.container.insertBefore(o,null);
}
return o;
};
nitobi.grid.Viewport.prototype.updateBlock=function(_6a3,top,_6a5){
_6a3.setAttribute("id","eba_grid_block_"+this.region+"_"+top+"_"+_6a5+"_"+this.uid);
_6a3.top=top;
_6a3.bottom=_6a5;
_6a3.rows=_6a5-top+1;
_6a3.left=this.startColumn;
_6a3.right=this.startColumn+this.columns;
_6a3.columns=this.columns;
};
nitobi.grid.Viewport.prototype.setHeaderHeight=function(_6a6){
this.headerHeight=_6a6;
};
nitobi.grid.Viewport.prototype.setRowHeight=function(_6a7){
this.rowHeight=_6a7;
};
nitobi.grid.Viewport.prototype.dispose=function(){
this.element=null;
this.container=null;
nitobi.lang.dispose(this,this.disposal);
return;
};
nitobi.grid.Viewport.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Viewport.prototype.subscribe=function(evt,func,_6ac){
if(typeof (_6ac)=="undefined"){
_6ac=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_6ac,func));
};
nitobi.grid.Viewport.prototype.attach=function(evt,func,_6af){
return nitobi.html.attachEvent(_6af,evt,nitobi.lang.close(this,func));
};
nitobi.lang.defineNs("nitobi.data");
if(false){
nitobi.data=function(){
};
}
nitobi.data.DATAMODE_UNBOUND="unbound";
nitobi.data.DATAMODE_LOCAL="local";
nitobi.data.DATAMODE_REMOTE="remote";
nitobi.data.DATAMODE_CACHING="caching";
nitobi.data.DATAMODE_STATIC="static";
nitobi.data.DATAMODE_PAGING="paging";
nitobi.data.DataSet=function(){
var _6b0="http://www.nitobi.com";
this.doc=nitobi.xml.createXmlDoc("<"+nitobi.xml.nsPrefix+"datasources xmlns:ntb=\""+_6b0+"\"></"+nitobi.xml.nsPrefix+"datasources>");
};
nitobi.data.DataSet.prototype.initialize=function(){
this.tables=new Array();
};
nitobi.data.DataSet.prototype.add=function(_6b1){
this.tables[_6b1.id]=_6b1;
};
nitobi.data.DataSet.prototype.getTable=function(_6b2){
return this.tables[_6b2];
};
nitobi.data.DataSet.prototype.xmlDoc=function(){
var root=this.doc.documentElement;
while(root.hasChildNodes()){
root.removeChild(root.firstChild);
}
for(var i in this.tables){
if(this.tables[i].xmlDoc&&this.tables[i].xmlDoc.documentElement){
var _6b5=this.tables[i].xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource").cloneNode(true);
this.doc.selectSingleNode("/"+nitobi.xml.nsPrefix+"datasources").appendChild(nitobi.xml.importNode(this.doc,_6b5,true));
}
}
return this.doc;
};
nitobi.data.DataSet.prototype.dispose=function(){
for(var _6b6 in this.tables){
this.tables[_6b6].dispose();
}
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.DataTable=function(mode,_6b8,_6b9,_6ba,_6bb){
if(_6b8==null){
}
this.estimateRowCount=_6b8;
this.version=3;
this.uid=nitobi.base.getUid();
this.mode=mode||"caching";
this.setAutoKeyEnabled(_6bb);
this.columns=new Array();
this.keys=new Array();
this.types=new Array();
this.defaults=new Array();
this.columnsConfigured=false;
this.pagingConfigured=false;
this.id="_default";
this.fieldMap={};
if(_6b9){
this.saveHandlerArgs=_6b9;
}else{
this.saveHandlerArgs={};
}
if(_6ba){
this.getHandlerArgs=_6ba;
}else{
this.getHandlerArgs={};
}
this.setGetHandlerParameter("RequestType","GET");
this.setSaveHandlerParameter("RequestType","SAVE");
this.batchInsert=false;
this.batchInsertRowCount=0;
};
nitobi.data.DataTable.DEFAULT_LOG="<"+nitobi.xml.nsPrefix+"grid "+nitobi.xml.nsDecl+"><"+nitobi.xml.nsPrefix+"datasources id='id'><"+nitobi.xml.nsPrefix+"datasource id=\"{id}\"><"+nitobi.xml.nsPrefix+"datasourcestructure /><"+nitobi.xml.nsPrefix+"data id=\"_default\"></"+nitobi.xml.nsPrefix+"data></"+nitobi.xml.nsPrefix+"datasource></"+nitobi.xml.nsPrefix+"datasources></"+nitobi.xml.nsPrefix+"grid>";
nitobi.data.DataTable.DEFAULT_DATA="<"+nitobi.xml.nsPrefix+"datasource "+nitobi.xml.nsDecl+" id=\"{id}\"><"+nitobi.xml.nsPrefix+"datasourcestructure FieldNames=\"{fields}\" Keys=\"{keys}\" types=\"{types}\" defaults=\"{defaults}\"></"+nitobi.xml.nsPrefix+"datasourcestructure><"+nitobi.xml.nsPrefix+"data id=\"{id}\"></"+nitobi.xml.nsPrefix+"data></"+nitobi.xml.nsPrefix+"datasource>";
nitobi.data.DataTable.prototype.initialize=function(_6bc,_6bd,_6be,_6bf,_6c0,sort,_6c2,_6c3,_6c4){
this.setGetHandlerParameter("TableId",_6bc);
this.setSaveHandlerParameter("TableId",_6bc);
this.id=_6bc;
this.datastructure=null;
this.descriptor=new nitobi.data.DataTableDescriptor(this,nitobi.lang.close(this,this.syncRowCount),this.estimateRowCount);
this.pageFirstRow=0;
this.pageRowCount=0;
this.pageSize=_6c0;
this.minPageSize=10;
this.requestCache=new nitobi.collections.CacheMap(-1,-1);
this.dataCache=new nitobi.collections.CacheMap(-1,-1);
this.flush();
this.sortColumn=sort;
this.sortDir=_6c2||"Asc";
this.filter=new Array();
this.onGenerateKey=_6c3;
this.remoteRowCount=0;
this.setRowCountKnown(false);
if(_6bf==null){
_6bf=0;
}
if(this.mode!="unbound"){
if(_6bd!=null){
this.ajaxCallbackPool=new nitobi.ajax.HttpRequestPool(nitobi.ajax.HttpRequestPool_MAXCONNECTIONS);
this.ajaxCallbackPool.context=this;
this.setGetHandler(_6bd);
this.setSaveHandler(_6be);
}
this.ajaxCallback=new nitobi.ajax.HttpRequest();
this.ajaxCallback.responseType="xml";
}else{
if(_6bd!=null&&typeof (_6bd)!="string"){
this.initializeXml(_6bd);
}
}
this.sortXslProc=nitobi.xml.createXslProcessor(nitobi.data.sortXslProc.stylesheet);
this.requestQueue=new Array();
this.async=true;
};
nitobi.data.DataTable.prototype.setOnGenerateKey=function(_6c5){
this.onGenerateKey=_6c5;
};
nitobi.data.DataTable.prototype.getOnGenerateKey=function(){
return this.onGenerateKey;
};
nitobi.data.DataTable.prototype.setAutoKeyEnabled=function(val){
this.autoKeyEnabled=val;
};
nitobi.data.DataTable.prototype.isAutoKeyEnabled=function(){
return this.autoKeyEnabled;
};
nitobi.data.DataTable.prototype.initializeXml=function(oXml){
this.replaceData(oXml);
var rows=this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"e").length;
if(rows>0){
var s=this.xmlDoc.xml;
s=nitobi.xml.transformToString(this.xmlDoc,this.sortXslProc,"xml");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,s);
this.dataCache.insert(0,rows-1);
if(this.mode=="local"){
this.setRowCountKnown(true);
}
}
this.setRemoteRowCount(rows);
this.fire("DataInitalized");
};
nitobi.data.DataTable.prototype.initializeXmlData=function(oXml){
var sXml=oXml;
if(typeof (oXml)=="object"){
sXml=oXml.xml;
}
sXml=sXml.replace(/fieldnames=/g,"FieldNames=").replace(/keys=/g,"Keys=");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,sXml);
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
};
nitobi.data.DataTable.prototype.replaceData=function(oXml){
this.initializeXmlData(oXml);
var _6cd=this.datastructure.getAttribute("FieldNames");
var keys=this.datastructure.getAttribute("Keys");
var _6cf=this.datastructure.getAttribute("Defaults");
var _6d0=this.datastructure.getAttribute("Types");
this.initializeColumns(_6cd,keys,_6d0,_6cf);
};
nitobi.data.DataTable.prototype.initializeSchema=function(){
var _6d1=this.columns.join("|");
var keys=this.keys.join("|");
var _6d3=this.defaults.join("|");
var _6d4=this.types.join("|");
this.dataCache.flush();
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.data.DataTable.DEFAULT_DATA.replace(/\{id\}/g,this.id).replace(/\{fields\}/g,_6d1).replace(/\{keys\}/g,keys).replace(/\{defaults\}/g,_6d3).replace(/\{types\}/g,_6d4));
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
};
nitobi.data.DataTable.prototype.initializeColumns=function(_6d5,keys,_6d7,_6d8){
if(null!=_6d5){
var _6d9=this.columns.join("|");
if(_6d9==_6d5){
return;
}
this.columns=_6d5.split("|");
}
if(null!=keys){
this.keys=keys.split("|");
}
if(null!=_6d7){
this.types=_6d7.split("|");
}
if(null!=_6d8){
this.defaults=_6d8.split("|");
}
if(this.xmlDoc.documentElement==null){
this.initializeSchema();
}
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
var ds=this.datastructure;
if(_6d5){
ds.setAttribute("FieldNames",_6d5);
}
if(keys){
ds.setAttribute("Keys",keys);
}
if(_6d8){
ds.setAttribute("Defaults",_6d8);
}
if(_6d7){
ds.setAttribute("Types",_6d7);
}
this.makeFieldMap();
this.fire("ColumnsInitialized");
};
nitobi.data.DataTable.prototype.getTemplateNode=function(_6db){
var _6dc=null;
if(_6db==null){
_6db=this.defaults;
}
_6dc=nitobi.xml.createElement(this.xmlDoc,"e");
for(var i=0;i<this.columns.length;i++){
var _6de=(i>25?String.fromCharCode(Math.floor(i/26)+97):"")+(String.fromCharCode(i%26+97));
if(this.defaults[i]==null){
_6dc.setAttribute(_6de,"");
}else{
_6dc.setAttribute(_6de,this.defaults[i]);
}
}
return _6dc;
};
nitobi.data.DataTable.prototype.commitProperties=function(){
if(this.mode=="unbound"){
}
};
nitobi.data.DataTable.prototype.flush=function(){
this.flushCache();
this.flushLog();
this.xmlDoc=nitobi.xml.createXmlDoc();
};
nitobi.data.DataTable.prototype.clearData=function(){
this.flushCache();
this.flushLog();
if(this.xmlDoc){
var _6df=this.xmlDoc.selectSingleNode("//ntb:data");
nitobi.xml.removeChildren(_6df);
}
};
nitobi.data.DataTable.prototype.flushCache=function(){
if(this.mode=="caching"||this.mode=="paging"){
this.dataCache.flush();
}
if(this.mode!="unbound"){
this.requestCache.flush();
}
};
nitobi.data.DataTable.prototype.join=function(_6e0,_6e1,_6e2,_6e3){
};
nitobi.data.DataTable.prototype.merge=function(xd){
};
nitobi.data.DataTable.prototype.getField=function(_6e5,_6e6){
var r=this.getRecord(_6e5);
var a=this.fieldMap[_6e6];
if(a&&r){
return r.getAttribute(a.substring(1));
}else{
return null;
}
};
nitobi.data.DataTable.prototype.getRecord=function(_6e9){
var data=this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi='"+_6e9+"']");
if(data.length==0){
return null;
}
return data[0];
};
nitobi.data.DataTable.prototype.beginBatchInsert=function(){
this.batchInsert=true;
this.batchInsertRowCount=0;
};
nitobi.data.DataTable.prototype.commitBatchInsert=function(){
this.batchInsert=false;
var _6eb=this.batchInsertRowCount;
this.batchInsertRowCount=0;
this.setRemoteRowCount(this.remoteRowCount+_6eb);
if(_6eb>0){
this.fire("RowInserted",_6eb);
}
};
nitobi.data.DataTable.prototype.createRecord=function(_6ec,_6ed){
var xi=_6ed;
this.adjustXi(parseInt(xi),1);
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _6f0=_6ec||this.getTemplateNode();
var _6f1=nitobi.component.getUniqueId();
var _6f2=_6f0.cloneNode(true);
_6f2.setAttribute("xi",xi);
_6f2.setAttribute("xid",_6f1);
_6f2.setAttribute("xac","i");
if(this.onGenerateKey){
var _6f3=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("Keys").split("|");
var xml=null;
for(var j=0;j<_6f3.length;j++){
var _6f6=this.fieldMap[_6f3[j]].substring(1);
var _6f7=_6f2.getAttribute(_6f6);
if(!_6f7||_6f7==""){
if(!xml){
xml=eval(this.onGenerateKey);
}
if(typeof (xml)=="string"||typeof (xml)=="number"){
_6f2.setAttribute(_6f6,xml);
}else{
try{
var ck1=j%26;
var ck2=Math.floor(j/26);
var _6fa=(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
_6f2.setAttribute(_6f6,xml.selectSingleNode("//"+nitobi.xml.nsPrefix+"e").getAttribute(_6fa));
}
catch(e){
}
}
}
}
}
data.appendChild(nitobi.xml.importNode(data.ownerDocument,_6f2,true));
if(this.log!=null){
var _6fb=_6f2.cloneNode(true);
_6fb.setAttribute("xac","i");
_6fb.setAttribute("xid",_6f1);
this.logData.appendChild(nitobi.xml.importNode(this.logData.ownerDocument,_6fb,true));
}
this.dataCache.insertIntoRange(_6ed);
this.batchInsertRowCount++;
if(!this.batchInsert){
this.commitBatchInsert();
}
return _6f2;
};
nitobi.data.DataTable.prototype.updateRecord=function(xi,_6fd,_6fe){
var _6ff=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xi='"+xi+"']");
var xid=_6ff.getAttribute("xid")||"error - unknown xid";
var _701=(_6ff.getAttribute(_6fd)!=_6fe);
if(!_701){
return;
}
var _702="";
var _703=_6fd;
if(_6ff.getAttribute(_6fd)==null&&this.fieldMap[_6fd]!=null){
_703=this.fieldMap[_6fd].substring(1);
}
_702=_6ff.getAttribute(_703);
_6ff.setAttribute(_703,_6fe);
var _704="u";
var _705="u";
if(null==this.log){
this.flushLog();
}
var _706=_6ff.cloneNode(true);
_706.setAttribute("xac","u");
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _707=this.logData.selectSingleNode("./"+nitobi.xml.nsPrefix+"e[@xid='"+xid+"']");
_706=nitobi.xml.importNode(this.logData.ownerDocument,_706,true);
if(null==_707){
_706=nitobi.xml.importNode(this.logData.ownerDocument,_706,true);
this.logData.appendChild(_706);
_706.setAttribute("xid",xid);
}else{
_706.setAttribute("xac",_707.getAttribute("xac"));
this.logData.replaceChild(_706,_707);
}
if((true==this.AutoSave)){
this.save();
}
this.fire("RowUpdated",{"field":_6fd,"newValue":_6fe,"oldValue":_702,"record":_706});
};
nitobi.data.DataTable.prototype.deleteRecord=function(_708){
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _70a=data.selectSingleNode("*[@xi = '"+_708+"']");
this.removeRecordFromXml(_708,_70a,data);
this.setRemoteRowCount(this.remoteRowCount-1);
this.fire("RowDeleted");
};
nitobi.data.DataTable.prototype.deleteRecordsArray=function(_70b){
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _70d=null;
var _70e=null;
for(var i=0;i<_70b.length;i++){
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
_70e=_70b[i]-i;
_70d=data.selectSingleNode("*[@xi = '"+_70e+"']");
this.removeRecordFromXml(_70e,_70d,data);
}
this.setRemoteRowCount(this.remoteRowCount-_70b.length);
this.fire("RowDeleted");
};
nitobi.data.DataTable.prototype.removeRecordFromXml=function(_710,_711,data){
if(_711==null){
throw "Index out of bounds in delete.";
}
var xid=_711.getAttribute("xid");
var xDel=this.logData.selectSingleNode("*[@xid='"+xid+"']");
var sTag="";
if(xDel!=null){
sTag=xDel.getAttribute("xac");
this.logData.removeChild(xDel);
}
if(sTag!="i"){
var _716=_711.cloneNode(true);
_716.setAttribute("xac","d");
this.logData.appendChild(_716);
}
data.removeChild(_711);
this.adjustXi(parseInt(_710)+1,-1);
this.dataCache.removeFromRange(_710);
};
nitobi.data.DataTable.prototype.adjustXi=function(_717,_718){
nitobi.data.adjustXiXslProc.addParameter("startingIndex",_717,"");
nitobi.data.adjustXiXslProc.addParameter("adjustment",_718,"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,nitobi.data.adjustXiXslProc,"xml"));
if(this.log!=null){
this.log=nitobi.xml.loadXml(this.log,nitobi.xml.transformToString(this.log,nitobi.data.adjustXiXslProc,"xml"));
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
}
};
nitobi.data.DataTable.prototype.setGetHandler=function(val){
this.getHandler=val;
for(var name in this.getHandlerArgs){
this.setGetHandlerParameter(name,this.getHandlerArgs[name]);
}
};
nitobi.data.DataTable.prototype.getGetHandler=function(){
return this.getHandler;
};
nitobi.data.DataTable.prototype.setSaveHandler=function(val){
this.postHandler=val;
for(var name in this.saveHandlerArgs){
this.setSaveHandlerParameter(name,this.saveHandlerArgs[name]);
}
};
nitobi.data.DataTable.prototype.getSaveHandler=function(){
return this.postHandler;
};
nitobi.data.DataTable.prototype.save=function(_71d,_71e){
if(!eval(_71e||"true")){
return;
}
try{
if(this.version==2.8){
var _71f=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("FieldNames").split("|");
var _720=this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac = 'i']");
for(var i=0;i<_720.length;i++){
for(var j=0;j<_71f.length;j++){
var _723=_720[i].getAttribute(this.fieldMap[_71f[j]].substring(1));
if(!_723){
_720[i].setAttribute(this.fieldMap[_71f[j]].substring(1),"");
}
}
_720[i].setAttribute("xf",this.parentValue);
}
var _724=this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac = 'u']");
for(var i=0;i<_724.length;i++){
for(var j=0;j<_71f.length;j++){
var _723=_724[i].getAttribute(this.fieldMap[_71f[j]].substring(1));
if(!_723){
_724[i].setAttribute(this.fieldMap[_71f[j]].substring(1),"");
}
}
}
nitobi.data.updategramTranslatorXslProc.addParameter("xkField",this.fieldMap["_xk"].substring(1),"");
nitobi.data.updategramTranslatorXslProc.addParameter("fields",_71f.join("|").replace(/\|_xk/,""));
nitobi.data.updategramTranslatorXslProc.addParameter("datasourceId",this.id,"");
this.log=nitobi.xml.transformToXml(this.log,nitobi.data.updategramTranslatorXslProc);
}
var _725=this.getSaveHandler();
(_725.indexOf("?")==-1)?_725+="?":_725+="&";
_725+="TableId="+this.id;
_725+="&uid="+(new Date().getTime());
this.ajaxCallback=this.ajaxCallbackPool.reserve();
this.ajaxCallback.handler=_725;
this.ajaxCallback.responseType="xml";
this.ajaxCallback.context=this;
this.ajaxCallback.completeCallback=nitobi.lang.close(this,this.saveComplete);
this.ajaxCallback.params=new nitobi.data.SaveCompleteEventArgs(_71d);
if(this.version>2.8&&this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac='i']").length>0&&this.isAutoKeyEnabled()){
this.ajaxCallback.async=false;
}
if(this.log.documentElement.nodeName=="root"){
this.log=nitobi.xml.loadXml(this.log,this.log.xml.replace(/xmlns:ntb=\"http:\/\/www.nitobi.com\"/g,""));
var _71f=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("FieldNames").split("|");
_71f.splice(_71f.length-1,1);
_71f=_71f.join("|");
this.log.documentElement.setAttribute("fields",_71f);
this.log.documentElement.setAttribute("keys",_71f);
}
if(this.isAutoKeyEnabled()&&this.version<3){
alert("AutoKey is not supported in this schema version. You must upgrade to Nitobi Grid Xml Schema version 3 or greater.");
}
this.ajaxCallback.post(this.log);
this.flushLog();
}
catch(err){
throw err;
}
};
nitobi.data.DataTable.prototype.flushLog=function(){
this.log=nitobi.xml.createXmlDoc(nitobi.data.DataTable.DEFAULT_LOG.replace(/\{id\}/g,this.id).replace(/\{fields\}/g,this.columns).replace(/\{keys\}/g,this.keys).replace(/\{defaults\}/g,this.defaults).replace(/\{types\}/g,this.types));
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
};
nitobi.data.DataTable.prototype.updateAutoKeys=function(_726){
try{
var _727=_726.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xac='i']");
if(typeof (_727)=="undefined"||_727==null){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, the inserts could not be parsed.");
}
var keys=_726.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure")[0].getAttribute("keys").split("|");
if(typeof (keys)=="undefined"||keys==null||keys.length==0){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, no keys could be found. Ensure that the keys are sent in the request response.");
}
for(var i=0;i<_727.length;i++){
var _72a=this.getRecord(_727[i].getAttribute("xi"));
for(var j=0;j<keys.length;j++){
var att=this.fieldMap[keys[j]].substring(1);
_72a.setAttribute(att,_727[i].getAttribute(att));
}
}
}
catch(err){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, the inserts could not be parsed.",err);
}
};
nitobi.data.DataTable.prototype.saveComplete=function(_72d){
var xd=_72d.response;
var _72d=_72d.params;
try{
if(this.isAutoKeyEnabled()&&this.version>2.8){
this.updateAutoKeys(xd);
}
if(this.version==2.8&&!this.onGenerateKey){
var rows=xd.selectNodes("//insert");
for(var i=0;i<rows.length;i++){
var xk=rows[i].getAttribute("xk");
if(xk!=null){
var _732=this.findWithoutMap("xid",rows[i].getAttribute("xid"))[0];
var key=this.fieldMap["_xk"].substring(1);
_732.setAttribute(key,xk);
}
}
}
if(null!=_72d.result){
}
var node=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource")||xd.selectSingleNode("/root");
var e=null;
if(node){
e=node.getAttribute("error");
}
if(e){
this.setHandlerError(e);
}else{
this.setHandlerError(null);
}
this.ajaxCallbackPool.release(this.ajaxCallback);
var _736=new nitobi.data.OnAfterSaveEventArgs(this,xd);
_72d.callback.call(this,_736);
}
catch(err){
this.ajaxCallbackPool.release(this.ajaxCallback);
ebaErrorReport(err,"",EBA_ERROR);
}
};
nitobi.data.DataTable.prototype.makeFieldMap=function(){
var _737=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource");
var cf=0;
var ck=0;
this.fieldMap=new Array();
var cF=this.columns.length;
for(var i=0;i<cF;i++){
var _73c=this.columns[i];
this.fieldMap[_73c]=this.getFieldName(ck);
ck++;
}
};
nitobi.data.DataTable.prototype.getFieldName=function(_73d){
var ck1=_73d%26;
var ck2=Math.floor(_73d/26);
return "@"+(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
};
nitobi.data.DataTable.prototype.find=function(_740,_741){
var _742=this.fieldMap[_740];
if(_742){
return this.findWithoutMap(_742,_741);
}else{
return new Array();
}
};
nitobi.data.DataTable.prototype.findWithoutMap=function(_743,_744){
if(_743.charAt(0)!="@"){
_743="@"+_743;
}
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"e["+_743+"=\""+_744+"\"]");
};
nitobi.data.DataTable.prototype.sort=function(_745,dir,type,_748){
if(_748){
_745=this.fieldMap[_745];
_745=_745.substring(1);
dir=(dir=="Desc")?"descending":"ascending";
type=(type=="number")?"number":"text";
this.sortXslProc.addParameter("column",_745,"");
this.sortXslProc.addParameter("dir",dir,"");
this.sortXslProc.addParameter("type",type,"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,this.sortXslProc,"xml"));
this.fire("DataSorted");
}else{
this.sortColumn=_745;
this.sortDir=dir||"Asc";
}
};
nitobi.data.DataTable.prototype.syncRowCount=function(){
this.setRemoteRowCount(this.descriptor.estimatedRowCount);
};
nitobi.data.DataTable.prototype.setRemoteRowCount=function(rows){
var _74a=this.remoteRowCount;
this.remoteRowCount=rows;
if(this.remoteRowCount!=_74a){
this.fire("RowCountChanged",rows);
}
};
nitobi.data.DataTable.prototype.getRemoteRowCount=function(){
return this.remoteRowCount;
};
nitobi.data.DataTable.prototype.getRows=function(){
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e").length;
};
nitobi.data.DataTable.prototype.getXmlDoc=function(){
return this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']");
};
nitobi.data.DataTable.prototype.getRowNodes=function(){
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
};
nitobi.data.DataTable.prototype.getColumns=function(){
return this.fieldMap.length;
};
nitobi.data.DataTable.prototype.setGetHandlerParameter=function(name,_74c){
if(this.getHandler!=null&&this.getHandler!=""){
this.getHandler=nitobi.html.setUrlParameter(this.getHandler,name,_74c);
}
this.getHandlerArgs[name]=_74c;
};
nitobi.data.DataTable.prototype.setSaveHandlerParameter=function(name,_74e){
if(this.postHandler!=null&&this.postHandler!=""){
this.postHandler=nitobi.html.setUrlParameter(this.getSaveHandler(),name,_74e);
}
this.saveHandlerArgs[name]=_74e;
};
nitobi.data.DataTable.prototype.getChangeLogSize=function(){
if(null==this.log){
return 0;
}
return this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e").length;
};
nitobi.data.DataTable.prototype.getChangeLogXmlDoc=function(){
return this.log;
};
nitobi.data.DataTable.prototype.getDataXmlDoc=function(){
return this.xmlDoc;
};
nitobi.data.DataTable.prototype.dispose=function(){
this.flush();
this.ajaxCallbackPool.context=null;
for(var item in this){
if(this[item]!=null&&this[item].dispose instanceof Function){
this[item].dispose();
}
this[item]=null;
}
};
nitobi.data.DataTable.prototype.getTable=function(_750,_751,_752){
this.errorCallback=_752;
var _753=this.ajaxCallbackPool.reserve();
var _754=this.getGetHandler();
_753.handler=_754;
_753.responseType="xml";
_753.context=this;
_753.completeCallback=nitobi.lang.close(this,this.getComplete);
_753.async=this.async;
_753.params=new nitobi.data.GetCompleteEventArgs(null,null,0,null,_753,this,_750,_751);
if(typeof (_751)!="function"||this.async==false){
_753.async=false;
return this.getComplete({"response":_753.get(),"params":_753.params});
}else{
_753.get();
}
};
nitobi.data.DataTable.prototype.getComplete=function(_755){
var xd=_755.response;
var _757=_755.params;
if(this.mode!="caching"){
this.xmlDoc=nitobi.xml.createXmlDoc();
}
if(null==xd||null==xd.xml||""==xd.xml){
var _758="No parse error.";
if(nitobi.xml.hasParseError(xd)){
if(xd==null){
_758="Blank Response was Given";
}else{
_758=nitobi.xml.getParseErrorReason(xd);
}
}
if(this.errorCallback){
this.errorCallback.call(this.context);
}
this.fire("DataReady",_757);
return _757;
}else{
if(typeof (this.successCallback)=="function"){
this.successCallback.call(this.context);
}
}
if(!this.configured){
this.configureFromData(xd);
}
xd=this.parseResponse(xd,_757);
xd=this.assignRowIds(xd);
var _759=null;
_759=xd.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
var _75a;
var _75b=_759.length;
if(_757.pageSize==null){
_757.pageSize=_75b;
_757.lastRow=_757.startXi+_757.pageSize-1;
_757.firstRow=_757.startXi;
}
if(0!=_75b){
_75a=parseInt(_759[_759.length-1].getAttribute("xi"));
if(this.mode=="paging"){
this.dataCache.insert(0,_757.pageSize-1);
}else{
this.dataCache.insert(_757.firstRow,_75a);
}
}else{
_75a=-1;
_757.pageSize=0;
if(this.totalRowCount==null){
var pct=this.descriptor.lastKnownRow/this.descriptor.estimatedRowCount||0;
this.fire("PastEndOfData",pct);
}
}
_757.numRowsReturned=_75b;
_757.lastRowReturned=_75a;
var _75d=_757.startXi;
var _75e=_757.pageSize;
if(!isNaN(_75d)&&!isNaN(_75e)&&_75d!=0){
this.requestCache.remove(_75d,_75d+_75e-1);
}
if(this.mode!="caching"){
this.replaceData(xd);
}else{
this.mergeData(xd);
}
if(!this.totalRowCount){
var _75f=this.xmlDoc.selectSingleNode("//ntb:datasource").getAttribute("totalrowcount");
_75f=parseInt(_75f);
if(!isNaN(_75f)){
this.totalRowCount=_75f;
}
this.fire("TotalRowCountReady",this.totalRowCount);
}
var _760=this.xmlDoc.selectSingleNode("//ntb:datasource").getAttribute("parentfield");
var _761=this.xmlDoc.selectSingleNode("//ntb:datasource").getAttribute("parentvalue");
this.parentField=_760||"";
this.parentValue=_761||"";
this.updateFromDescriptor(_757);
this.fire("RowCountReady",_757);
if(null!=_757.ajaxCallback){
this.ajaxCallbackPool.release(_757.ajaxCallback);
}
this.executeRequests();
var node=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource");
var e=null;
if(node){
e=node.getAttribute("error");
}
if(e){
this.setHandlerError(e);
}else{
this.setHandlerError(null);
}
this.fire("DataReady",_757);
if(null!=_757.callback&&null!=_757.context){
_757.callback.call(_757.context,_757);
_757.dispose();
_757=null;
}else{
return _757;
}
};
nitobi.data.DataTable.prototype.executeRequests=function(){
var _764=this.requestQueue;
this.requestQueue=new Array();
for(var i=0;i<_764.length;i++){
_764[i].call();
}
};
nitobi.data.DataTable.prototype.updateFromDescriptor=function(_766){
if(this.totalRowCount==null){
this.descriptor.update(_766);
}
if(this.mode=="paging"){
this.setRemoteRowCount(_766.numRowsReturned);
}else{
if(this.totalRowCount!=null){
this.setRemoteRowCount(this.getTotalRowCount());
}else{
this.setRemoteRowCount(this.descriptor.estimatedRowCount);
}
}
this.setRowCountKnown(this.descriptor.isAtEndOfTable);
};
nitobi.data.DataTable.prototype.setRowCountKnown=function(_767){
var _768=this.rowCountKnown;
this.rowCountKnown=_767;
if(_767&&this.rowCountKnown!=_768){
this.fire("RowCountKnown",this.remoteRowCount);
}
};
nitobi.data.DataTable.prototype.getRowCountKnown=function(){
return this.rowCountKnown;
};
nitobi.data.DataTable.prototype.configureFromData=function(xd){
this.version=this.inferDataVersion(xd);
if(this.mode=="unbound"){
}
if(this.mode=="static"){
}
if(this.mode=="paging"){
}
if(this.mode=="caching"){
}
};
nitobi.data.DataTable.prototype.mergeData=function(xd){
if(this.xmlDoc.xml==""){
this.initializeXml(xd);
return;
}
var p=nitobi.xml.nsPrefix;
var _76c="//"+p+"datasource[@id = '"+this.id+"']/"+p+"data";
var _76d=xd.selectNodes(_76c+"//"+p+"e");
var _76e=this.xmlDoc.selectSingleNode(_76c);
var len=_76d.length;
for(var i=0;i<len;i++){
if(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi='"+_76d[i].getAttribute("xi")+"']")){
continue;
}
_76e.appendChild(nitobi.xml.importNode(_76e.ownerDocument,_76d[i],true));
}
};
nitobi.data.DataTable.prototype.assignRowIds=function(xd){
nitobi.data.addXidXslProc.addParameter("guid",nitobi.component.getUniqueId(),"");
var doc=nitobi.xml.loadXml(xd,nitobi.xml.transformToString(xd,nitobi.data.addXidXslProc,"xml"));
return doc;
};
nitobi.data.DataTable.prototype.inferDataVersion=function(xd){
if(xd.selectSingleNode("/root")){
return 2.8;
}
return 3;
};
nitobi.data.DataTable.prototype.parseResponse=function(xd,_775){
if(this.version==2.8){
return this.parseLegacyResponse(xd,_775);
}else{
return this.parseStructuredResponse(xd,_775);
}
};
nitobi.data.DataTable.prototype.parseLegacyResponse=function(xd,_777){
var _778=this.mode=="paging"?0:_777.startXi;
nitobi.data.dataTranslatorXslProc.addParameter("start",_778,"");
nitobi.data.dataTranslatorXslProc.addParameter("id",this.id,"");
var _779=xd.selectSingleNode("/root").getAttribute("fields");
var _77a=_779.split("|");
var i=_77a.length;
var _77c=(i>25?String.fromCharCode(Math.floor(i/26)+96):"")+(String.fromCharCode(i%26+97));
nitobi.data.dataTranslatorXslProc.addParameter("xkField",_77c,"");
xd=nitobi.xml.transformToXml(xd,nitobi.data.dataTranslatorXslProc);
return xd;
};
nitobi.data.DataTable.prototype.parseStructuredResponse=function(xd,_77e){
xd=nitobi.xml.loadXml(xd,"<ntb:grid xmlns:ntb=\"http://www.nitobi.com\"><ntb:datasources>"+xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']").xml+"</ntb:datasources></ntb:grid>");
var _77f=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
var _780=this.mode=="paging"?0:_77e.startXi;
if(_77f){
if(_77f.getAttribute("xi")!=_780){
nitobi.data.adjustXiXslProc.addParameter("startingIndex","0","");
nitobi.data.adjustXiXslProc.addParameter("adjustment",_780,"");
xd=nitobi.xml.loadXml(xd,nitobi.xml.transformToString(xd,nitobi.data.adjustXiXslProc,"xml"));
}
}
return xd;
};
nitobi.data.DataTable.prototype.forceGet=function(_781,_782,_783,_784,_785,_786){
this.errorCallback=_785;
this.successCallback=_786;
this.context=_783;
var _787=this.getGetHandler();
(_787.indexOf("?")==-1)?_787+="?":_787+="&";
_787+="StartRecordIndex=0&start=0&PageSize="+_782+"&SortColumn="+(this.sortColumn||"")+"&SortDirection="+this.sortDir+"&TableId="+this.id+"&uid="+(new Date().getTime());
var _788=this.ajaxCallbackPool.reserve();
_788.handler=_787;
_788.responseType="xml";
_788.context=this;
_788.completeCallback=nitobi.lang.close(this,this.getComplete);
_788.params=new nitobi.data.GetCompleteEventArgs(0,_782-1,0,_782,_788,this,_783,_784);
_788.get();
return;
};
nitobi.data.DataTable.prototype.getPage=function(_789,_78a,_78b,_78c,_78d,_78e){
var _78f=_789+_78a-1;
var _790=this.dataCache.gaps(0,_78a-1);
var _791=_790.length;
if(_791){
var _792=this.requestCache.gaps(_789,_78f);
if(_792.length==0){
var _793=nitobi.lang.close(this,this.get,arguments);
this.requestQueue.push(_793);
return;
}
this.getFromServer(_789,_78f,_789,_78f,_78b,_78c,_78d);
}else{
this.getFromCache(_789,_78a,_78b,_78c,_78d);
}
};
nitobi.data.DataTable.prototype.get=function(_794,_795,_796,_797,_798){
this.errorCallback=_798;
var _799=null;
if(this.mode=="caching"){
_799=this.getCached(_794,_795,_796,_797,_798);
}
if(this.mode=="local"||this.mode=="static"){
_799=this.getTable(_796,_797,_798);
}
if(this.mode=="paging"){
_799=this.getPage(_794,_795,_796,_797,_798);
}
return _799;
};
nitobi.data.DataTable.prototype.inCache=function(_79a,_79b){
if(this.mode=="local"){
return true;
}
var _79c=_79a,_79d=_79a+_79b-1;
var _79e=this.getRemoteRowCount()-1;
if(this.getRowCountKnown()&&_79e<_79d){
_79d=_79e;
}
var _79f=this.dataCache.gaps(_79c,_79d);
var _7a0=_79f.length;
return !(_7a0>0);
};
nitobi.data.DataTable.prototype.cachedRanges=function(_7a1,_7a2){
return this.dataCache.ranges(_7a1,_7a2);
};
nitobi.data.DataTable.prototype.getCached=function(_7a3,_7a4,_7a5,_7a6,_7a7,_7a8){
if(_7a4==null){
return this.getFromServer(_7a9,null,_7a3,null,_7a5,_7a6,_7a7);
}
var _7a9=_7a3,_7aa=_7a3+_7a4-1;
var _7ab=this.dataCache.gaps(_7a9,_7aa);
var _7ac=_7ab.length;
if(this.mode!="unbound"&&_7ac>0){
var low=_7ab[_7ac-1].low;
var high=_7ab[_7ac-1].high;
var _7af=this.requestCache.gaps(low,high);
if(_7af.length==0){
var _7b0=nitobi.lang.close(this,this.get,arguments);
this.requestQueue.push(_7b0);
return;
}
return this.getFromServer(_7a9,_7aa,low,high,_7a5,_7a6,_7a7);
}else{
this.getFromCache(_7a3,_7a4,_7a5,_7a6,_7a7);
}
};
nitobi.data.DataTable.prototype.getFromServer=function(_7b1,_7b2,low,high,_7b5,_7b6,_7b7){
this.requestCache.insert(low,high);
var _7b8=(_7b2==null?null:(high-low+1));
var _7b9=(_7b8==null?"":_7b8);
var _7ba=this.getGetHandler();
(_7ba.indexOf("?")==-1)?_7ba+="?":_7ba+="&";
_7ba+="StartRecordIndex="+low+"&start="+low+"&PageSize="+(_7b9)+"&SortColumn="+(this.sortColumn||"")+"&SortDirection="+this.sortDir+"&uid="+(new Date().getTime());
var _7bb=this.ajaxCallbackPool.reserve();
_7bb.handler=_7ba;
_7bb.responseType="xml";
_7bb.context=this;
_7bb.completeCallback=nitobi.lang.close(this,this.getComplete);
_7bb.async=this.async;
_7bb.params=new nitobi.data.GetCompleteEventArgs(_7b1,_7b2,low,_7b8,_7bb,this,_7b5,_7b6);
return _7bb.get();
};
nitobi.data.DataTable.prototype.getFromCache=function(_7bc,_7bd,_7be,_7bf,_7c0){
var _7c1=_7bc,_7c2=_7bc+_7bd-1;
if(_7c1>0||_7c2>0){
if(typeof (_7bf)=="function"){
var _7c3=new nitobi.data.GetCompleteEventArgs(_7c1,_7c2,_7c1,_7c2-_7c1+1,null,this,_7be,_7bf);
_7c3.callback.call(_7c3.context,_7c3);
}
}
};
nitobi.data.DataTable.prototype.mergeFromXml=function(_7c4,_7c5){
var _7c6=Number(_7c4.documentElement.firstChild.getAttribute("xi"));
var _7c7=Number(_7c4.documentElement.lastChild.getAttribute("xi"));
var _7c8=this.dataCache.gaps(_7c6,_7c7);
if(this.mode=="local"&&_7c8.length==1){
this.dataCache.insert(_7c8[0].low,_7c8[0].high);
this.mergeFromXmlGetComplete(_7c4,_7c5,_7c6,_7c7);
this.batchInsertRowCount=(_7c8[0].high-_7c8[0].low+1);
this.commitBatchInsert();
return;
}
if(_7c8.length==0){
this.mergeFromXmlGetComplete(_7c4,_7c5,_7c6,_7c7);
}else{
if(_7c8.length==1){
this.get(_7c8[0].low,_7c8[0].high-_7c8[0].low+1,this,nitobi.lang.close(this,this.mergeFromXmlGetComplete,[_7c4,_7c5,_7c6,_7c7]));
}else{
this.forceGet(_7c6,_7c7,this,nitobi.lang.close(this,this.mergeFromXmlGetComplete,[_7c4,_7c5,_7c6,_7c7]));
}
}
};
nitobi.data.DataTable.prototype.mergeFromXmlGetComplete=function(_7c9,_7ca,_7cb,_7cc){
var _7cd=nitobi.xml.createElement(this.xmlDoc,"newdata");
_7cd.appendChild(_7c9.documentElement.cloneNode(true));
this.xmlDoc.documentElement.appendChild(nitobi.xml.importNode(this.xmlDoc,_7cd,true));
nitobi.data.mergeEbaXmlXslProc.addParameter("startRowIndex",_7cb,"");
nitobi.data.mergeEbaXmlXslProc.addParameter("endRowIndex",_7cc,"");
nitobi.data.mergeEbaXmlXslProc.addParameter("guid",nitobi.component.getUniqueId(),"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,nitobi.data.mergeEbaXmlXslProc,"xml"));
_7cd=nitobi.xml.createElement(this.log,"newdata");
this.log.documentElement.appendChild(nitobi.xml.importNode(this.log,_7cd,true));
_7cd.appendChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata").firstChild.cloneNode(true));
this.log=nitobi.xml.loadXml(this.log,nitobi.xml.transformToString(this.log,nitobi.data.mergeEbaXmlToLogXslProc,"xml"));
this.xmlDoc.documentElement.removeChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
this.log.documentElement.removeChild(this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
_7ca.call();
};
nitobi.data.DataTable.prototype.fillColumn=function(_7ce,_7cf){
nitobi.data.fillColumnXslProc.addParameter("column",this.fieldMap[_7ce].substring(1));
nitobi.data.fillColumnXslProc.addParameter("value",_7cf);
this.xmlDoc.loadXML(nitobi.xml.transformToString(this.xmlDoc,nitobi.data.fillColumnXslProc,"xml"));
var _7d0=parseFloat((new Date()).getTime());
var _7d1=nitobi.xml.createElement(this.log,"newdata");
this.log.documentElement.appendChild(nitobi.xml.importNode(this.log,_7d1,true));
_7d1.appendChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data").cloneNode(true));
nitobi.data.mergeEbaXmlToLogXslProc.addParameter("defaultAction","u");
this.log.loadXML(nitobi.xml.transformToString(this.log,nitobi.data.mergeEbaXmlToLogXslProc,"xml"));
nitobi.data.mergeEbaXmlToLogXslProc.addParameter("defaultAction","");
this.log.documentElement.removeChild(this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
};
nitobi.data.DataTable.prototype.getTotalRowCount=function(){
return this.totalRowCount;
};
nitobi.data.DataTable.prototype.setHandlerError=function(_7d2){
this.handlerError=_7d2;
};
nitobi.data.DataTable.prototype.getHandlerError=function(){
return this.handlerError;
};
nitobi.data.DataTable.prototype.dispose=function(){
this.sortXslProc=null;
this.requestQueue=null;
this.fieldMap=null;
};
nitobi.data.DataTable.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.data.DataTable.prototype.subscribe=function(evt,func,_7d7){
if(typeof (_7d7)=="undefined"){
_7d7=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_7d7,func));
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.DataTableDescriptor=function(_7d8,_7d9,_7da){
this.disposal=[];
this.estimatedRowCount=0;
this.leapMultiplier=2;
this.estimateRowCount=(_7da==null?true:_7da);
this.lastKnownRow=0;
this.isAtEndOfTable=false;
this.table=_7d8;
this.lowestEmptyRow=0;
this.tableProjectionUpdatedEvent=_7d9;
this.disposal.push(this.tableProjectionUpdatedEvent);
};
nitobi.data.DataTableDescriptor.prototype.startPeek=function(){
this.enablePeek=true;
this.peek();
};
nitobi.data.DataTableDescriptor.prototype.peek=function(){
var _7db;
if(this.lowestEmptyRow>0){
var _7dc=this.lowestEmptyRow-this.lastKnownRow;
_7db=this.lastKnownRow+Math.round(_7dc/2);
}else{
_7db=(this.estimatedRowCount*this.leapMultiplier);
}
this.table.get(Math.round(_7db),1,this,this.peekComplete);
};
nitobi.data.DataTableDescriptor.prototype.peekComplete=function(_7dd){
if(this.enablePeek){
window.setTimeout(nitobi.lang.close(this,this.peek),1000);
}
};
nitobi.data.DataTableDescriptor.prototype.stopPeek=function(){
this.enablePeek=false;
};
nitobi.data.DataTableDescriptor.prototype.leap=function(_7de,_7df){
if(this.lowestEmptyRow>0){
var _7e0=this.lowestEmptyRow-this.lastKnownRow;
this.estimatedRowCount=this.lastKnownRow+Math.round(_7e0/2);
}else{
if(_7de==null||_7df==null){
this.estimatedRowCount=0;
}else{
if(this.estimateRowCount){
this.estimatedRowCount=(this.estimatedRowCount*_7de)+_7df;
}
}
}
this.fireProjectionUpdatedEvent();
};
nitobi.data.DataTableDescriptor.prototype.update=function(_7e1,_7e2){
if(null==_7e2){
_7e2=false;
}
if(this.isAtEndOfTable&&!_7e2){
return false;
}
var _7e3=(_7e1!=null&&_7e1.numRowsReturned==0&&_7e1.startXi==0);
var _7e4=(_7e1!=null&&_7e1.lastRow!=_7e1.lastRowReturned);
if(null==_7e1){
_7e1={lastPage:false,pageSize:1,firstRow:0,lastRow:0,startXi:0};
}
var _7e5=(_7e3)||(_7e4)||(this.isAtEndOfTable)||((this.lastKnownRow==this.estimatedRowCount-1)&&(this.estimatedRowCount==this.lowestEmptyRow));
if(_7e1.pageSize==0&&!_7e5){
this.lowestEmptyRow=this.lowestEmptyRow>0?Math.min(_7e1.startXi,this.lowestEmptyRow):_7e1.startXi;
this.leap();
return true;
}
this.lastKnownRow=Math.max(_7e1.lastRowReturned,this.lastKnownRow);
if(_7e5&&!_7e2){
if(_7e1.lastRowReturned>=0){
this.estimatedRowCount=_7e1.lastRowReturned+1;
this.isAtEndOfTable=true;
}else{
if(_7e3){
this.estimatedRowCount=0;
this.isAtEndOfTable=true;
}else{
this.estimatedRowCount=this.lastKnownRow+Math.ceil((_7e1.lastRow-this.lastKnownRow)/2);
}
}
this.fireProjectionUpdatedEvent();
this.stopPeek();
return true;
}
if(!this.estimateRowCount){
this.estimatedRowCount=this.lastKnownRow+1;
}
if(this.estimatedRowCount==0){
this.estimatedRowCount=(_7e1.lastRow+1)*(this.estimateRowCount?2:1);
}
if((this.estimatedRowCount>(_7e1.lastRow+1)&&!_7e2)||!this.estimateRowCount){
return false;
}
if(!this.isAtEndOfTable){
this.leap(this.leapMultiplier,0);
return true;
}
return false;
};
nitobi.data.DataTableDescriptor.prototype.reset=function(){
this.estimatedRowCount=0;
this.leapMultiplier=2;
this.lastKnownRow=0;
this.isAtEndOfTable=false;
this.lowestEmptyRow=0;
this.fireProjectionUpdatedEvent();
};
nitobi.data.DataTableDescriptor.prototype.fireProjectionUpdatedEvent=function(_7e6){
if(this.tableProjectionUpdatedEvent!=null){
this.tableProjectionUpdatedEvent(_7e6);
}
};
nitobi.data.DataTableDescriptor.prototype.dispose=function(){
nitobi.lang.dispose(this,this.disposal);
};
nitobi.lang.defineNs("nitobi.data");
if(false){
nitobi.data=function(){
};
}
nitobi.data.DataTableEventArgs=function(_7e7){
this.source=_7e7;
this.event=nitobi.html.Event;
};
nitobi.data.DataTableEventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.data.DataTableEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.data.GetCompleteEventArgs=function(_7e8,_7e9,_7ea,_7eb,_7ec,_7ed,obj,_7ef){
this.firstRow=_7e8;
this.lastRow=_7e9;
this.callback=_7ef;
this.dataSource=_7ed;
this.context=obj;
this.ajaxCallback=_7ec;
this.startXi=_7ea;
this.pageSize=_7eb;
this.lastPage=false;
this.status="success";
};
nitobi.data.GetCompleteEventArgs.prototype.dispose=function(){
this.callback=null;
this.context=null;
this.dataSource=null;
this.ajaxCallback.clear();
this.ajaxCallback==null;
};
nitobi.data.SaveCompleteEventArgs=function(_7f0){
this.callback=_7f0;
};
nitobi.data.SaveCompleteEventArgs.prototype.initialize=function(){
};
nitobi.data.OnAfterSaveEventArgs=function(_7f1,_7f2,_7f3){
nitobi.data.OnAfterSaveEventArgs.baseConstructor.call(this,_7f1);
this.success=_7f3;
this.responseData=_7f2;
};
nitobi.lang.extend(nitobi.data.OnAfterSaveEventArgs,nitobi.data.DataTableEventArgs);
nitobi.data.OnAfterSaveEventArgs.prototype.getResponseData=function(){
return this.responseData;
};
nitobi.data.OnAfterSaveEventArgs.prototype.getSuccess=function(){
return this.success;
};
nitobi.lang.defineNs("nitobi.form");
if(false){
nitobi.form=function(){
};
}
nitobi.form.Control=function(){
this.owner=null;
this.placeholder=null;
var div=nitobi.html.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' class='ntb-input-border'><tr><td></td></tr></table>";
var ph=this.placeholder=div.firstChild;
this.cell=null;
this.ignoreBlur=false;
this.editCompleteHandler=function(){
};
this.onKeyUp=new nitobi.base.Event();
this.onKeyDown=new nitobi.base.Event();
this.onKeyPress=new nitobi.base.Event();
this.onChange=new nitobi.base.Event();
this.onCancel=new nitobi.base.Event();
this.onTab=new nitobi.base.Event();
this.onEnter=new nitobi.base.Event();
};
nitobi.form.Control.prototype.initialize=function(){
};
nitobi.form.Control.prototype.mimic=function(){
};
nitobi.form.Control.prototype.deactivate=function(evt){
if(this.ignoreBlur){
return false;
}
this.ignoreBlur=true;
};
nitobi.form.Control.prototype.bind=function(_7f7,cell){
this.owner=_7f7;
this.cell=cell;
this.ignoreBlur=false;
};
nitobi.form.Control.prototype.hide=function(){
this.placeholder.style.left="-2000px";
};
nitobi.form.Control.prototype.attachToParent=function(_7f9){
_7f9.appendChild(this.placeholder);
};
nitobi.form.Control.prototype.show=function(){
this.placeholder.style.display="block";
};
nitobi.form.Control.prototype.focus=function(){
this.control.focus();
this.ignoreBlur=false;
};
nitobi.form.Control.prototype.align=function(){
var oY=1;
var oX=1;
if(nitobi.browser.MOZ){
var _7fc=this.owner.getScrollSurface();
var _7fd=this.owner.getActiveView().region;
if(_7fd==3||_7fd==4){
oY=_7fc.scrollTop-nitobi.form.EDITOR_OFFSETY;
}
if(_7fd==1||_7fd==4){
oX=_7fc.scrollLeft-nitobi.form.EDITOR_OFFSETX;
}
}
nitobi.drawing.align(this.placeholder,this.cell.getDomNode(),286265344,1,1,-oY,-oX);
};
nitobi.form.Control.prototype.selectText=function(){
this.focus();
if(this.control&&this.control.createTextRange){
var _7fe=this.control.createTextRange();
_7fe.collapse(false);
_7fe.select();
}
};
nitobi.form.Control.prototype.checkValidity=function(evt){
var _800=this.deactivate(evt);
if(_800==false){
nitobi.html.cancelBubble(evt);
return false;
}
return true;
};
nitobi.form.Control.prototype.handleKey=function(evt){
var k=evt.keyCode;
if(this.onKeyDown.notify(evt)==false){
return;
}
var K=nitobi.form.Keys;
var y=0;
var x=0;
if(k==K.UP){
y=-1;
}else{
if(k==K.DOWN){
y=1;
}else{
if(k==K.TAB){
x=1;
if(evt.shiftKey){
x=-1;
}
if(nitobi.browser.IE){
evt.keyCode="";
}
}else{
if(k==K.ENTER){
y=1;
}else{
if(k==K.ESC){
this.ignoreBlur=true;
this.hide();
this.owner.focus();
this.onCancel.notify(this);
}
return;
}
}
}
}
if(!this.checkValidity(evt)){
return;
}
this.owner.move(x,y);
nitobi.html.cancelBubble(evt);
};
nitobi.form.Control.prototype.handleKeyUp=function(evt){
this.onKeyUp.notify(evt);
};
nitobi.form.Control.prototype.handleKeyPress=function(evt){
this.onKeyPress.notify(evt);
};
nitobi.form.Control.prototype.handleChange=function(evt){
this.onChange.notify(evt);
};
nitobi.form.Control.prototype.setEditCompleteHandler=function(_809){
this.editCompleteHandler=_809;
};
nitobi.form.Control.prototype.eSET=function(name,args){
var _80c=args[0];
var _80d=_80c;
var _80e=name.substr(2);
_80e=_80e.substr(0,_80e.length-5);
if(typeof (_80c)=="string"){
_80d=function(){
return nitobi.event.evaluate(_80c,arguments[0]);
};
}
if(this[_80e]!=null){
this[name].unSubscribe(this[_80e]);
}
var guid=this[name].subscribe(_80d);
this.jSET(_80e,[guid]);
return guid;
};
nitobi.form.Control.prototype.afterDeactivate=function(text,_811){
_811=_811||text;
if(this.editCompleteHandler!=null){
var _812=new nitobi.grid.EditCompleteEventArgs(this,text,_811,this.cell);
var _813=this.editCompleteHandler.call(this.owner,_812);
if(!_813){
this.ignoreBlur=false;
}
return _813;
}
};
nitobi.form.Control.prototype.jSET=function(name,val){
this[name]=val[0];
};
nitobi.form.Control.prototype.dispose=function(){
for(var item in this){
}
};
nitobi.form.IBlurable=function(_817,_818){
this.selfBlur=false;
this.elements=_817;
var H=nitobi.html;
for(var i=0;i<this.elements.length;i++){
var e=this.elements[i];
H.attachEvent(e,"mousedown",this.handleMouseDown,this);
H.attachEvent(e,"blur",this.handleBlur,this);
H.attachEvent(e,"focus",this.handleFocus,this);
H.attachEvent(e,"mouseup",this.handleMouseUp,this);
}
this.blurFunc=_818;
this.lastFocus=null;
};
nitobi.form.IBlurable.prototype.removeBlurable=function(){
for(var i=0;i<elems.length;i++){
nitobi.html.detachEvent(elems[i],"mousedown",this.handleMouseDown,this);
}
};
nitobi.form.IBlurable.prototype.handleMouseDown=function(evt){
if(this.lastFocus!=evt.srcElement){
this.selfBlur=true;
}else{
this.selfBlur=false;
}
this.lastFocus=evt.srcElement;
};
nitobi.form.IBlurable.prototype.handleBlur=function(evt){
if(!this.selfBlur){
this.blurFunc(evt);
}
this.selfBlur=false;
};
nitobi.form.IBlurable.prototype.handleFocus=function(){
this.selfBlur=false;
};
nitobi.form.IBlurable.prototype.handleMouseUp=function(){
this.selfBlur=false;
};
nitobi.form.Text=function(){
nitobi.form.Text.baseConstructor.call(this);
var ph=this.placeholder;
ph.setAttribute("id","text_span");
ph.style.top="-3000px";
ph.style.left="-3000px";
var tc=this.control=nitobi.html.createElement("input",{"id":"ntb-textbox"},{width:"100px"});
tc.setAttribute("maxlength",255);
this.events=[{type:"keydown",handler:this.handleKey},{type:"keyup",handler:this.handleKeyUp},{type:"keypress",handler:this.handleKeyPress},{type:"change",handler:this.handleChange},{type:"blur",handler:this.deactivate}];
};
nitobi.lang.extend(nitobi.form.Text,nitobi.form.Control);
nitobi.form.Text.prototype.initialize=function(){
var _821=this.placeholder.rows[0].cells[0];
_821.appendChild(this.control);
nitobi.html.attachEvents(this.control,this.events,this);
};
nitobi.form.Text.prototype.bind=function(_822,cell,_824){
nitobi.form.Text.base.bind.apply(this,arguments);
if(_824!=null&&_824!=""){
this.control.value=_824;
}else{
this.control.value=cell.getValue();
}
var _825=this.cell.getColumnObject().getModel();
this.eSET("onKeyPress",[_825.getAttribute("OnKeyPressEvent")]);
this.eSET("onKeyDown",[_825.getAttribute("OnKeyDownEvent")]);
this.eSET("onKeyUp",[_825.getAttribute("OnKeyUpEvent")]);
this.eSET("onChange",[_825.getAttribute("OnChangeEvent")]);
this.control.setAttribute("maxlength",_825.getAttribute("MaxLength"));
nitobi.html.Css.addClass(this.control,"ntb-column-data"+this.owner.uid+"_"+(this.cell.getColumn()+1));
};
nitobi.form.Text.prototype.mimic=function(){
this.align();
nitobi.html.fitWidth(this.placeholder,this.control);
this.selectText();
};
nitobi.form.Text.prototype.focus=function(){
this.control.focus();
};
nitobi.form.Text.prototype.deactivate=function(evt){
if(nitobi.form.Text.base.deactivate.apply(this,arguments)==false){
return;
}
nitobi.html.Css.removeClass(this.control,"ntb-column-data"+this.owner.uid+"_"+(this.cell.getColumn()+1));
return this.afterDeactivate(this.control.value);
};
nitobi.form.Text.prototype.dispose=function(){
nitobi.html.detachEvents(this.control,this.events);
var _827=this.placeholder.parentNode;
_827.removeChild(this.placeholder);
this.control=null;
this.owner=null;
this.cell=null;
};
nitobi.form.Checkbox=function(){
};
nitobi.lang.extend(nitobi.form.Checkbox,nitobi.form.Control);
nitobi.form.Checkbox.prototype.mimic=function(){
if(false==eval(this.owner.getOnCellValidateEvent())){
return;
}
this.toggle();
this.deactivate();
};
nitobi.form.Checkbox.prototype.deactivate=function(){
this.afterDeactivate(this.value);
};
nitobi.form.Checkbox.prototype.attachToParent=function(){
};
nitobi.form.Checkbox.prototype.toggle=function(){
var _828=this.cell.getColumnObject();
var _829=_828.getModel();
var _82a=_829.getAttribute("CheckedValue");
if(_82a==""||_82a==null){
_82a=1;
}
var _82b=_829.getAttribute("UnCheckedValue");
if(_82b==""||_82b==null){
_82b=0;
}
this.value=(this.cell.getData().value==_82a)?_82b:_82a;
};
nitobi.form.Checkbox.prototype.hide=function(){
};
nitobi.form.Checkbox.prototype.dispose=function(){
this.metadata=null;
this.owner=null;
this.context=null;
};
nitobi.form.Date=function(){
nitobi.form.Date.baseConstructor.call(this);
};
nitobi.lang.extend(nitobi.form.Date,nitobi.form.Text);
nitobi.lang.defineNs("nitobi.form");
nitobi.form.EDITOR_OFFSETX=0;
nitobi.form.EDITOR_OFFSETY=0;
nitobi.form.ControlFactory=function(){
this.editors={};
};
nitobi.form.ControlFactory.prototype.getEditor=function(_82c,_82d,_82e){
var _82f=null;
if(null==_82d){
ebaErrorReport("getEditor: column parameter is null","",EBA_DEBUG);
return _82f;
}
var _830=_82d.getType();
var _831=_82d.getType();
var _832="nitobi.Grid"+_830+_831+"Editor";
_82f=this.editors[_832];
if(_82f==null||_82f.control==null){
switch(_830){
case "LINK":
case "HYPERLINK":
_82f=new nitobi.form.Link;
break;
case "IMAGE":
return null;
case "BUTTON":
return null;
case "LOOKUP":
_82f=new nitobi.form.Lookup();
break;
case "LISTBOX":
_82f=new nitobi.form.ListBox();
break;
case "PASSWORD":
_82f=new nitobi.form.Password();
break;
case "TEXTAREA":
_82f=new nitobi.form.TextArea();
break;
case "CHECKBOX":
_82f=new nitobi.form.Checkbox();
break;
default:
if(_831=="DATE"){
if(_82d.isCalendarEnabled()){
_82f=new nitobi.form.Calendar();
}else{
_82f=new nitobi.form.Date();
}
}else{
if(_831=="NUMBER"){
_82f=new nitobi.form.Number();
}else{
_82f=new nitobi.form.Text();
}
}
break;
}
_82f.initialize();
}
this.editors[_832]=_82f;
return _82f;
};
nitobi.form.ControlFactory.prototype.dispose=function(){
for(var _833 in this.editors){
this.editors[_833].dispose();
}
};
nitobi.form.ControlFactory.instance=new nitobi.form.ControlFactory();
nitobi.lang.defineNs("nitobi.form");
nitobi.form.Keys={UP:38,DOWN:40,ENTER:13,TAB:9,ESC:27};
nitobi.form.ListBox=function(){
nitobi.form.ListBox.baseConstructor.call(this);
var ph=this.placeholder;
ph.setAttribute("id","listbox_span");
ph.style.top="-1000px";
ph.style.left="-1000px";
this.metadata=null;
this.keypress=false;
this.typedString=null;
this.events=[{type:"change",handler:this.deactivate},{type:"keydown",handler:this.handleKey},{type:"keyup",handler:this.handleKeyUp},{type:"keypress",handler:this.handleKeyPress},{type:"blur",handler:this.deactivate}];
};
nitobi.lang.extend(nitobi.form.ListBox,nitobi.form.Control);
nitobi.form.ListBox.prototype.initialize=function(){
};
nitobi.form.ListBox.prototype.bind=function(_835,cell){
nitobi.form.ListBox.base.bind.apply(this,arguments);
var _837=cell.getColumnObject().getModel();
var _838=_837.getAttribute("DatasourceId");
this.dataTable=this.owner.data.getTable(_838);
this.eSET("onKeyPress",[_837.getAttribute("OnKeyPressEvent")]);
this.eSET("onKeyDown",[_837.getAttribute("OnKeyDownEvent")]);
this.eSET("onKeyUp",[_837.getAttribute("OnKeyUpEvent")]);
this.eSET("onChange",[_837.getAttribute("OnChangeEvent")]);
this.bindComplete(cell.getValue());
};
nitobi.form.ListBox.prototype.bindComplete=function(_839){
var _83a=this.dataTable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.dataTable.id+"']");
var _83b=this.cell.getColumnObject();
var _83c=_83b.getModel();
var _83d=_83c.getAttribute("DisplayFields");
var _83e=_83c.getAttribute("ValueField");
var xsl=nitobi.form.listboxXslProc;
xsl.addParameter("DisplayFields",_83d,"");
xsl.addParameter("ValueField",_83e,"");
xsl.addParameter("val",_839,"");
this.listXml=nitobi.xml.transformToXml(nitobi.xml.createXmlDoc(_83a.xml),xsl);
this.placeholder.rows[0].cells[0].innerHTML=nitobi.xml.serialize(this.listXml);
var tc=this.control=nitobi.html.getFirstChild(this.placeholder.rows[0].cells[0]);
tc.style.width="100%";
tc.style.height=(this.cell.DomNode.offsetHeight-2)+"px";
nitobi.html.attachEvents(tc,this.events,this);
nitobi.html.Css.addClass(tc.className,this.cell.getDomNode().className);
this.align();
this.focus();
if(typeof (_839)!="undefined"&&_839!=null&&_839!=""){
return this.searchComplete(_839);
}
};
nitobi.form.ListBox.prototype.deactivate=function(ok){
if(this.keypress){
this.keypress=false;
return;
}
if(nitobi.form.ListBox.base.deactivate.apply(this,arguments)==false){
return;
}
if(this.onChange.notify(this)==false){
return;
}
var c=this.control;
var text="",_844="";
if(ok||ok==null){
text=c.options[c.selectedIndex].text;
_844=c.options[c.selectedIndex].value;
}else{
_844=this.cell.getValue();
var len=c.options.length;
for(var i=0;i<len;i++){
if(c.options[i].value==_844){
text=c.options[i].text;
}
}
}
this.typedString=null;
return this.afterDeactivate(nitobi.html.encode(text),_844);
};
nitobi.form.ListBox.prototype.handleKey=function(evt){
var k=evt.keyCode;
this.keypress=false;
var K=nitobi.form.Keys;
switch(k){
case K.DOWN:
if(this.control.selectedIndex<this.control.options.length-1){
this.keypress=true;
}
break;
case K.UP:
if(this.control.selectedIndex>0){
this.keypress=true;
}
break;
case K.ENTER:
case K.TAB:
case K.ESC:
return nitobi.form.ListBox.base.handleKey.call(this,evt);
default:
nitobi.html.cancelEvent(evt);
return this.searchComplete(String.fromCharCode(k));
}
};
nitobi.form.ListBox.prototype.searchComplete=function(_84a,_84b){
if(typeof (_84b)!="undefined"&&_84b!=""){
this.typedString=_84b;
this.maxLinearSearch=500;
}else{
this.typedString=this.typedString+_84a;
}
var c=this.control;
var _84d=c.options.length;
if(_84d>this.maxLinearSearch){
var _84e=this.searchBinary(this.typedString,0,(_84d-1));
if(_84e){
for(i=_84e;i>0;i--){
if(c.options[i].text.toLowerCase().substr(0,this.typedString.length)!=this.typedString.toLowerCase()){
c.selectedIndex=i+1;
break;
}
}
}
}else{
for(i=1;i<_84d;i++){
if(c.options[i].text.toLowerCase().substr(0,this.typedString.length)==this.typedString.toLowerCase()){
c.selectedIndex=i;
break;
}
}
}
clearTimeout(this.timerid);
var _84f=this;
this.timerid=setTimeout(function(){
_84f.typedString="";
},1000);
return false;
};
nitobi.form.ListBox.prototype.searchBinary=function(_850,low,high){
if(low>high){
return null;
}
var c=this.control;
var mid=Math.floor((high+low)/2);
var _855=c.options[mid].text.toLowerCase().substr(0,_850.length);
var _856=_850.toLowerCase();
if(_856==_855){
return mid;
}else{
if(_856<_855){
return this.searchBinary(_850,low,(mid-1));
}else{
if(_856>_855){
return this.searchBinary(_850,(mid+1),high);
}else{
return null;
}
}
}
};
nitobi.form.ListBox.prototype.dispose=function(){
nitobi.html.detachEvents(this.control,this.events);
this.placeholder=null;
this.control=null;
this.listXml=null;
this.element=null;
this.metadata=null;
this.owner=null;
};
nitobi.form.Lookup=function(){
nitobi.form.Lookup.baseConstructor.call(this);
this.selectClicked=false;
this.bVisible=false;
var div=nitobi.html.createElement("div");
div.innerHTML="<table class='ntb-input-border' border='0' cellpadding='0' cellspacing='0'><tr><td class=\"ntb-lookup-text\"></td></tr><tr><td style=\"position:relative;\"><div style=\"position:relative;top:0px;left:0px;\"></div></td></tr></table>";
var ph=this.placeholder=div.firstChild;
ph.setAttribute("id","lookup_span");
ph.style.top="-2000px";
ph.style.left="-2000px";
var tc=this.textControl=nitobi.html.createElement("input",{autocomplete:"off"},{zIndex:"2000",width:"100px"});
tc.setAttribute("id","ntb-lookup-text");
this.control=tc;
this.textEvents=[{"type":"keydown","handler":this.handleKey},{"type":"keyup","handler":this.filter},{"type":"keypress","handler":this.handleKeyPress},{"type":"change","handler":this.handleChange}];
ph.rows[0].cells[0].appendChild(tc);
this.selectPlaceholder=ph.rows[1].cells[0].firstChild;
this.selectEvents=[{"type":"click","handler":this.handleSelectClicked}];
this.firstKeyup=false;
this.autocompleted=false;
this.referenceColumn=null;
this.autoComplete=null;
this.autoClear=null;
this.getOnEnter=null;
this.listXml=null;
this.listXmlLower=null;
this.editCompleteHandler=null;
this.delay=0;
this.timeoutId=null;
var xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">";
xsl+="<xsl:output method=\"text\" version=\"4.0\"/><xsl:param name='searchValue'/>";
xsl+="<xsl:template match=\"/\"><xsl:apply-templates select='//option[starts-with(.,$searchValue)][1]' /></xsl:template>";
xsl+="<xsl:template match=\"option\"><xsl:value-of select='@rn' /></xsl:template></xsl:stylesheet>";
var _85b=nitobi.xml.createXslDoc(xsl);
this.searchXslProc=nitobi.xml.createXslProcessor(_85b);
_85b=null;
};
nitobi.lang.extend(nitobi.form.Lookup,nitobi.form.Control);
nitobi.lang.implement(nitobi.form.Lookup,nitobi.ui.IDataBoundList);
nitobi.lang.implement(nitobi.form.Lookup,nitobi.form.IBlurable);
nitobi.form.Lookup.prototype.initialize=function(){
this.firstKeyup=false;
nitobi.html.attachEvents(this.textControl,this.textEvents,this);
nitobi.html.attachEvents(this.selectPlaceholder,this.selectEvents,this);
};
nitobi.form.Lookup.prototype.hideSelect=function(){
this.selectControl.style.display="none";
this.bVisible=false;
};
nitobi.form.Lookup.prototype.bind=function(_85c,cell,_85e){
nitobi.form.Lookup.base.bind.apply(this,arguments);
var col=this.column=this.cell.getColumnObject();
var _860=this.column.getModel();
this.datasourceId=col.getDatasourceId();
this.getHandler=col.getGetHandler();
this.delay=col.getDelay();
this.size=col.getSize();
this.referenceColumn=col.getReferenceColumn();
this.autoComplete=col.isAutoComplete();
this.autoClear=col.isAutoClear();
this.getOnEnter=col.isGetOnEnter();
this.displayFields=col.getDisplayFields();
this.valueField=col.getValueField();
this.eSET("onKeyPress",[col.getOnKeyPressEvent()]);
this.eSET("onKeyDown",[col.getOnKeyDownEvent()]);
this.eSET("onKeyUp",[col.getOnKeyUpEvent()]);
this.eSET("onChange",[col.getOnChangeEvent()]);
var _861=nitobi.form.listboxXslProc;
_861.addParameter("DisplayFields",this.displayFields,"");
_861.addParameter("ValueField",this.valueField,"");
this.dataTable=this.owner.data.getTable(this.datasourceId);
this.dataTable.setGetHandler(this.getHandler);
this.dataTable.async=false;
if(_85e.length<=0){
_85e=this.cell.getValue();
}
this.get(_85e,true);
};
nitobi.form.Lookup.prototype.bindComplete=function(_862){
var _863=this.dataTable.getXmlDoc();
var _864=nitobi.form.listboxXslProc;
_864.addParameter("DisplayFields",this.displayFields,"");
_864.addParameter("ValueField",this.valueField,"");
_864.addParameter("val",nitobi.xml.constructValidXpathQuery(this.cell.getValue(),false),"");
if(nitobi.browser.IE&&document.compatMode=="CSS1Compat"){
_864.addParameter("size",6,"");
}
this.listXml=nitobi.xml.transformToXml(nitobi.xml.createXmlDoc(_863.xml),nitobi.form.listboxXslProc);
this.listXmlLower=nitobi.xml.createXmlDoc(this.listXml.xml.toLowerCase());
if(nitobi.browser.IE&&document.compatMode=="CSS1Compat"){
_864.addParameter("size","","");
}
this.selectPlaceholder.innerHTML=nitobi.xml.serialize(this.listXml);
var tc=this.textControl;
var sc=this.selectControl=nitobi.html.getFirstChild(this.selectPlaceholder);
sc.setAttribute("id","ntb-lookup-options");
sc.setAttribute("size",this.size);
sc.style.display="none";
if(nitobi.browser.IE6&&document.compatMode!="CSS1Compat"){
sc.style.height="100%";
}
nitobi.form.IBlurable.call(this,[tc,sc],this.deactivate);
this.selectClicked=false;
this.bVisible=false;
this.align();
nitobi.html.fitWidth(this.placeholder,tc);
if(this.autoComplete){
var rn=this.search(_862);
if(rn>0){
sc.selectedIndex=rn-1;
tc.value=sc[sc.selectedIndex].text;
nitobi.html.highlight(tc,tc.value.length-(tc.value.length-_862.length));
this.autocompleted=true;
}else{
var row=_863.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+this.valueField+"='"+_862+"']");
if(row!=null){
tc.value=row.getAttribute(this.displayFields);
var rn=this.search(tc.value);
sc.selectedIndex=parseInt(rn)-1;
}else{
tc.value=_862;
sc.selectedIndex=-1;
}
}
}else{
tc.value=_862;
sc.selectedIndex=-1;
}
tc.parentNode.style.height=nitobi.html.getHeight(this.cell.getDomNode())+"px";
sc.style.display="inline";
tc.focus();
};
nitobi.form.Lookup.prototype.handleSelectClicked=function(evt){
this.textControl.value=this.selectControl.selectedIndex!=-1?this.selectControl.options[this.selectControl.selectedIndex].text:"";
this.deactivate(evt);
};
nitobi.form.Lookup.prototype.focus=function(evt){
this.textControl.focus();
};
nitobi.form.Lookup.prototype.deactivate=function(evt){
if(nitobi.form.Lookup.base.deactivate.apply(this,arguments)==false){
return;
}
var sc=this.selectControl;
var tc=this.textControl;
var text="",_86f="";
if(evt!=null&&evt!=false){
if(sc.selectedIndex>=0){
_86f=sc.options[sc.selectedIndex].value;
text=sc.options[sc.selectedIndex].text;
}else{
if(this.column.getModel().getAttribute("ForceValidOption")!="true"){
_86f=tc.value;
text=_86f;
}else{
if(this.autoClear){
_86f="";
text="";
}else{
_86f=this.cell.getValue();
var len=sc.options.length;
for(var i=0;i<len;i++){
if(sc.options[i].value==_86f){
text=sc.options[i].text;
}
}
}
}
}
}else{
_86f=this.cell.getValue();
var len=sc.options.length;
var _872=false;
for(var i=0;i<len;i++){
if(sc.options[i].value==_86f){
text=sc.options[i].text;
_872=true;
break;
}
}
if(!_872&&this.autoClear){
_86f="";
text="";
}
}
nitobi.html.detachEvents(sc,this.textEvents);
window.clearTimeout(this.timeoutId);
return this.afterDeactivate(nitobi.html.encode(text),_86f);
};
nitobi.form.Lookup.prototype.handleKey=function(evt,_874){
var k=evt.keyCode;
if(k!=40&&k!=38){
nitobi.form.Lookup.base.handleKey.call(this,evt);
}
};
nitobi.form.Lookup.prototype.search=function(_876){
_876=nitobi.xml.constructValidXpathQuery(_876,false);
this.searchXslProc.addParameter("searchValue",_876.toLowerCase(),"");
var _877=nitobi.xml.transformToString(this.listXmlLower,this.searchXslProc);
if(""==_877){
_877=0;
}else{
_877=parseInt(_877);
}
return _877;
};
nitobi.form.Lookup.prototype.filter=function(evt,o){
var k=evt.keyCode;
if(this.onKeyUp.notify(evt)==false){
return;
}
if(!this.firstKeyup&&k!=38&&k!=40){
this.firstKeyup=true;
return;
}
var tc=this.textControl;
var sc=this.selectControl;
switch(k){
case 38:
if(sc.selectedIndex==-1){
sc.selectedIndex=0;
}
if(sc.selectedIndex>0){
sc.selectedIndex--;
}
tc.value=sc.options[sc.selectedIndex].text;
nitobi.html.highlight(tc,tc.value.length);
tc.select();
break;
case 40:
if(sc.selectedIndex<(sc.length-1)){
sc.selectedIndex++;
}
tc.value=sc.options[sc.selectedIndex].text;
nitobi.html.highlight(tc,tc.value.length);
tc.select();
break;
default:
if((!this.getOnEnter&&((k<193&&k>46)||k==8||k==32))||(this.getOnEnter&&k==13)){
var _87d=tc.value;
this.get(_87d);
}
}
};
nitobi.form.Lookup.prototype.get=function(_87e,_87f){
if(this.getHandler!=null&&this.getHandler!=""){
if(_87f||!this.delay){
this.doGet(_87e);
}else{
if(this.timeoutId){
window.clearTimeout(this.timeoutId);
this.timeoutId=null;
}
this.timeoutId=window.setTimeout(nitobi.lang.close(this,this.doGet,[_87e]),this.delay);
}
}else{
this.bindComplete(_87e);
}
};
nitobi.form.Lookup.prototype.doGet=function(_880){
if(_880){
this.dataTable.setGetHandlerParameter("SearchString",_880);
}
if(this.referenceColumn!=null&&this.referenceColumn!=""){
var _881=this.owner.getCellValue(this.cell.row,this.referenceColumn);
this.dataTable.setGetHandlerParameter("ReferenceColumn",_881);
}
this.dataTable.get(null,this.pageSize,this);
this.timeoutId=null;
this.bindComplete(_880);
};
nitobi.form.Lookup.prototype.dispose=function(){
this.placeholder=null;
nitobi.html.detachEvents(this.textEvents,this);
this.selectControl=null;
this.textControl=null;
this.dataTable=null;
this.owner=null;
};
nitobi.form.Number=function(){
nitobi.form.Number.baseConstructor.call(this);
this.defaultValue=0;
};
nitobi.lang.extend(nitobi.form.Number,nitobi.form.Text);
nitobi.form.Number.prototype.handleKey=function(evt){
nitobi.form.Number.base.handleKey.call(this,evt);
var k=evt.keyCode;
if(!this.isValidKey(k)){
nitobi.html.cancelEvent(evt);
return false;
}
};
nitobi.form.Number.prototype.isValidKey=function(k){
if((k<48||k>57)&&(k<37||k>40)&&(k<96||k>105)&&k!=190&&k!=110&&k!=189&&k!=109&&k!=9&&k!=45&&k!=46&&k!=8){
return false;
}
return true;
};
nitobi.form.Number.prototype.bind=function(_885,cell,_887){
var _888=_887.charCodeAt(0);
if(_888>=97){
_888=_888-32;
}
var k=this.isValidKey(_888)?_887:"";
nitobi.form.Number.base.bind.call(this,_885,cell,k);
};
nitobi.form.Password=function(){
nitobi.form.Password.baseConstructor.call(this,true);
this.control.type="password";
};
nitobi.lang.extend(nitobi.form.Password,nitobi.form.Text);
nitobi.form.TextArea=function(){
nitobi.form.TextArea.baseConstructor.call(this);
var div=nitobi.html.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' class='ntb-input-border'><tr><td></td></table>";
var ph=this.placeholder=div.firstChild;
ph.style.top="-3000px";
ph.style.left="-3000px";
this.control=nitobi.html.createElement("textarea",{},{width:"100px"});
};
nitobi.lang.extend(nitobi.form.TextArea,nitobi.form.Text);
nitobi.form.TextArea.prototype.initialize=function(){
this.placeholder.rows[0].cells[0].appendChild(this.control);
document.body.appendChild(this.placeholder);
nitobi.html.attachEvents(this.control,this.events,this);
};
nitobi.form.TextArea.prototype.mimic=function(){
nitobi.form.TextArea.base.mimic.call(this);
var phs=this.placeholder.style;
};
nitobi.form.TextArea.prototype.handleKey=function(evt){
var k=evt.keyCode;
if(k==40||k==38||k==37||k==39||(k==13&&evt.shiftKey)){
}else{
nitobi.form.TextArea.base.handleKey.call(this,evt);
}
};
nitobi.form.Calendar=function(){
nitobi.form.Calendar.baseConstructor.call(this);
var div=nitobi.html.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' style='table-layout:fixed;' class='ntb-input-border'><tr><td>"+"<input id='ntb-datepicker-input' type='text' maxlength='255' style='width:100%;' />"+"</td><td class='ntb-datepicker-button'><a id='ntb-datepicker-button' href='#' onclick='return false;'></a></td></tr><tr><td colspan='2' style='width:1px;height:1px;position:relative;'><!-- --></td></tr><colgroup><col></col><col style='width:20px;'></col></colgroup></table>";
this.control=div.getElementsByTagName("input")[0];
var ph=this.placeholder=div.firstChild;
ph.setAttribute("id","calendar_span");
ph.style.top="-3000px";
ph.style.left="-3000px";
var pd=this.pickerDiv=nitobi.html.createElement("div",{},{position:"absolute"});
this.isPickerVisible=false;
nitobi.html.Css.addClass(pd,NTB_CSS_HIDE);
ph.rows[1].cells[0].appendChild(pd);
};
nitobi.lang.extend(nitobi.form.Calendar,nitobi.form.Control);
nitobi.form.Calendar.prototype.initialize=function(){
this.datePicker=new nitobi.calendar.DatePicker(nitobi.component.getUniqueId());
this.datePicker.setContainer(this.pickerDiv);
this.datePicker.onSetDate.subscribe(this.handlePick,this);
var tc=this.control;
var H=nitobi.html;
H.attachEvent(tc,"keydown",this.handleKey,this,false);
H.attachEvent(tc,"blur",this.deactivate,this,false);
H.attachEvent(this.pickerDiv,"mousedown",this.handleCalendarMouseDown,this);
H.attachEvent(this.pickerDiv,"mouseup",this.handleCalendarMouseUp,this);
var a=this.placeholder.getElementsByTagName("a")[0];
H.attachEvent(a,"mousedown",this.handleClick,this);
H.attachEvent(a,"mouseup",this.handleMouseUp,this);
};
nitobi.form.Calendar.prototype.bind=function(_895,cell,_897){
this.isPickerVisible=false;
nitobi.html.Css.addClass(this.pickerDiv,NTB_CSS_HIDE);
nitobi.form.Calendar.base.bind.apply(this,arguments);
if(_897!=null&&_897!=""){
this.control.value=_897;
}else{
this.control.value=cell.getValue();
}
this.column=this.cell.getColumnObject();
this.control.maxlength=this.column.getModel().getAttribute("MaxLength");
};
nitobi.form.Calendar.prototype.mimic=function(){
this.align();
var _898=this.placeholder.offsetWidth;
var _899=this.placeholder.rows[0].cells[1].offsetWidth;
this.control.style.width=_898-_899-(document.compatMode=="BackCompat"?0:8)+"px";
this.selectText();
};
nitobi.form.Calendar.prototype.deactivate=function(){
if(nitobi.form.Calendar.base.deactivate.apply(this,arguments)==false){
return;
}
this.afterDeactivate(this.control.value);
};
nitobi.form.Calendar.prototype.handleClick=function(evt){
if(!this.isPickerVisible){
this.datePicker.setDate(nitobi.base.DateMath.parseIso8601(this.control.value));
this.datePicker.render();
}
this.ignoreBlur=true;
nitobi.ui.Effects.setVisible(this.pickerDiv,!this.isPickerVisible,"none",this.setVisibleComplete,this);
};
nitobi.form.Calendar.prototype.handleMouseUp=function(evt){
this.control.focus();
this.ignoreBlur=false;
};
nitobi.form.Calendar.prototype.handleCalendarMouseDown=function(evt){
this.ignoreBlur=true;
};
nitobi.form.Calendar.prototype.handleCalendarMouseUp=function(evt){
this.handleMouseUp(evt);
};
nitobi.form.Calendar.prototype.setVisibleComplete=function(){
this.isPickerVisible=!this.isPickerVisible;
};
nitobi.form.Calendar.prototype.handlePick=function(){
var date=this.datePicker.getDate();
var _89f=nitobi.base.DateMath.toIso8601(date);
this.control.value=_89f;
this.datePicker.hide();
};
nitobi.form.Calendar.prototype.dispose=function(){
nitobi.html.detachEvent(this.control,"keydown",this.handleKey);
nitobi.html.detachEvent(this.control,"blur",this.deactivate);
var _8a0=this.placeholder.parentNode;
_8a0.removeChild(this.placeholder);
this.control=null;
this.placeholder=null;
this.owner=null;
this.cell=null;
};
nitobi.ui.UiElement=function(xml,xsl,id){
if(arguments.length>0){
this.initialize(xml,xsl,id);
}
};
nitobi.ui.UiElement.prototype.initialize=function(xml,xsl,id){
this.m_Xml=xml;
this.m_Xsl=xsl;
this.m_Id=id;
this.m_HtmlElementHandle=null;
};
nitobi.ui.UiElement.prototype.getHeight=function(){
return this.getHtmlElementHandle().style.height;
};
nitobi.ui.UiElement.prototype.setHeight=function(_8a7){
this.getHtmlElementHandle().style.height=_8a7+"px";
};
nitobi.ui.UiElement.prototype.getId=function(){
return this.m_Id;
};
nitobi.ui.UiElement.prototype.setId=function(id){
this.m_Id=id;
};
nitobi.ui.UiElement.prototype.getWidth=function(){
return this.getHtmlElementHandle().style.width;
};
nitobi.ui.UiElement.prototype.setWidth=function(_8a9){
this.getHtmlElementHandle().style.width=_8a9+"px";
};
nitobi.ui.UiElement.prototype.getXml=function(){
return this.m_Xml;
};
nitobi.ui.UiElement.prototype.setXml=function(xml){
this.m_Xml=xml;
};
nitobi.ui.UiElement.prototype.getXsl=function(){
return this.m_Xsl;
};
nitobi.ui.UiElement.prototype.setXsl=function(xsl){
this.m_Xsl=xsl;
};
nitobi.ui.UiElement.prototype.getHtmlElementHandle=function(){
if(!this.m_HtmlElementHandle){
this.m_HtmlElementHandle=document.getElementById(this.m_Id);
}
return this.m_HtmlElementHandle;
};
nitobi.ui.UiElement.prototype.setHtmlElementHandle=function(_8ac){
this.m_HtmlElementHandle=_8ac;
};
nitobi.ui.UiElement.prototype.hide=function(){
var tag=this.getHtmlElementHandle();
tag.style.visibility="hidden";
tag.style.position="absolute";
};
nitobi.ui.UiElement.prototype.show=function(){
var tag=this.getHtmlElementHandle();
tag.style.visibility="visible";
};
nitobi.ui.UiElement.prototype.isVisible=function(){
var tag=this.getHtmlElementHandle();
return tag.style.visibility=="visible";
};
nitobi.ui.UiElement.prototype.beginFloatMode=function(){
var tag=this.getHtmlElementHandle();
tag.style.position="absolute";
};
nitobi.ui.UiElement.prototype.isFloating=function(){
var tag=this.getHtmlElementHandle();
return tag.style.position=="absolute";
};
nitobi.ui.UiElement.prototype.setX=function(x){
var tag=this.getHtmlElementHandle();
tag.style.left=x+"px";
};
nitobi.ui.UiElement.prototype.getX=function(){
var tag=this.getHtmlElementHandle();
return tag.style.left;
};
nitobi.ui.UiElement.prototype.setY=function(y){
var tag=this.getHtmlElementHandle();
tag.style.top=y+"px";
};
nitobi.ui.UiElement.prototype.getY=function(){
var tag=this.getHtmlElementHandle();
return tag.style.top;
};
nitobi.ui.UiElement.prototype.render=function(_8b8,_8b9,_8ba){
var xsl=this.m_Xsl;
if(xsl!=null&&xsl.indexOf("xsl:stylesheet")==-1){
xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"html\" version=\"4.0\" />"+xsl+"</xsl:stylesheet>";
}
if(null==_8b9){
_8b9=nitobi.xml.createXslDoc(xsl);
}
if(null==_8ba){
_8ba=nitobi.xml.createXmlDoc(this.m_Xml);
}
Eba.Error.assert(nitobi.xml.isValidXml(_8ba),"Tried to render invalid XML according to Mozilla. The XML is "+_8ba.xml);
var html=nitobi.xml.transform(_8ba,_8b9);
if(html.xml){
html=html.xml;
}
if(null==_8b8){
document.body.insertAdjacentHTML("beforeEnd",html);
}else{
_8b8.innerHTML=html;
}
this.attachToTag();
};
nitobi.ui.UiElement.prototype.attachToTag=function(){
var _8bd=this.getHtmlElementHandle();
if(_8bd!=null){
_8bd.object=this;
_8bd.jsobject=this;
_8bd.javascriptObject=this;
}
};
nitobi.ui.UiElement.prototype.dispose=function(){
var _8be=this.getHtmlElementHandle();
if(_8be!=null){
_8be.object=null;
}
this.m_Xml=null;
this.m_Xsl=null;
this.m_HtmlElementHandle=null;
};
nitobi.ui.InteractiveUiElement=function(_8bf){
this.enable();
};
nitobi.lang.extend(nitobi.ui.InteractiveUiElement,nitobi.ui.UiElement);
nitobi.ui.InteractiveUiElement.prototype.enable=function(){
this.m_Enabled=true;
};
nitobi.ui.InteractiveUiElement.prototype.disable=function(){
this.m_Enabled=false;
};
nitobi.ui.ButtonXsl="<xsl:template match=\"button\">"+"<div class=\"ntb-button\" onmousemove=\"return false;\" onmousedown=\"if (this.object.m_Enabled) this.className='ntb-button-down';\" onmouseup=\"this.className='ntb-button';\" onmouseover=\"if (this.object.m_Enabled) this.className='ntb-button-highlight';\" onmouseout=\"this.className='ntb-button';\" align=\"center\">"+"<xsl:attribute name=\"image_disabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image_disabled)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image_disabled\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"image_enabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"title\">"+"<xsl:value-of select=\"@tooltip_text\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"onclick\">"+"<xsl:value-of select='concat(&quot;v&quot;,&quot;a&quot;,&quot;r&quot;,&quot; &quot;,&quot;e&quot;,&quot;=&quot;,&quot;&apos;&quot;,@onclick_event,&quot;&apos;&quot;,&quot;;&quot;,&quot;e&quot;,&quot;v&quot;,&quot;a&quot;,&quot;l&quot;,&quot;(&quot;,&quot;t&quot;,&quot;h&quot;,&quot;i&quot;,&quot;s&quot;,&quot;.&quot;,&quot;o&quot;,&quot;b&quot;,&quot;j&quot;,&quot;e&quot;,&quot;c&quot;,&quot;t&quot;,&quot;.&quot;,&quot;o&quot;,&quot;n&quot;,&quot;C&quot;,&quot;l&quot;,&quot;i&quot;,&quot;c&quot;,&quot;k&quot;,&quot;H&quot;,&quot;a&quot;,&quot;n&quot;,&quot;d&quot;,&quot;l&quot;,&quot;e&quot;,&quot;r&quot;,&quot;(&quot;,&quot;e&quot;,&quot;)&quot;,&quot;)&quot;,&quot;;&quot;,&apos;&apos;)' />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('float:left;width:',../../@height,'px;height:',../../@height - 1,'px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('float:left;width:',@width,'px;height:',@height,'px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<img border=\"0\">"+"<xsl:attribute name=\"src\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:variable name=\"top_offset\">"+"<xsl:choose>"+"<xsl:when test=\"@top_offset\">"+"<xsl:value-of select=\"@top_offset\" />"+"</xsl:when>"+"<xsl:otherwise>"+"0"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:variable>"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:',((../../@height - @height) div 2) - 1 + number($top_offset),'px;MARGIN-BOTTOM:0px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('MARGIN-TOP:',(@height - @image_height) div 2,'px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"</img><![CDATA[ ]]>"+"</div>"+"</xsl:template>";
nitobi.ui.Button=function(xml,id){
this.initialize(xml,nitobi.ui.ButtonXsl,id);
this.enable();
};
nitobi.lang.extend(nitobi.ui.Button,nitobi.ui.InteractiveUiElement);
nitobi.ui.Button.prototype.onClickHandler=function(_8c2){
if(this.m_Enabled){
eval(_8c2);
}
};
nitobi.ui.Button.prototype.disable=function(){
nitobi.ui.Button.base.disable.call(this);
var _8c3=this.getHtmlElementHandle();
_8c3.childNodes[0].src=_8c3.getAttribute("image_disabled");
};
nitobi.ui.Button.prototype.enable=function(){
nitobi.ui.Button.base.enable.call(this);
var _8c4=this.getHtmlElementHandle();
_8c4.childNodes[0].src=_8c4.getAttribute("image_enabled");
};
nitobi.ui.Button.prototype.dispose=function(){
nitobi.ui.Button.base.dispose.call(this);
};
nitobi.ui.BinaryStateButtonXsl="<xsl:template match=\"binarystatebutton\">"+"<div class=\"ntb-binarybutton\" onmousemove=\"return false;\" onmousedown=\"if (this.object.m_Enabled) this.className='ntb-button-down';\" onmouseup=\"(this.object.isChecked()?this.object.check():this.object.uncheck())\" onmouseover=\"if (this.object.m_Enabled) this.className='ntb-button-highlight';\" onmouseout=\"(this.object.isChecked()?this.object.check():this.object.uncheck())\" align=\"center\">"+"<xsl:attribute name=\"image_disabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image_disabled)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image_disabled\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"image_enabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"title\">"+"<xsl:value-of select=\"@tooltip_text\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"onclick\">"+"<xsl:value-of select='concat(\"this.object.toggle();\",&quot;v&quot;,&quot;a&quot;,&quot;r&quot;,&quot; &quot;,&quot;e&quot;,&quot;=&quot;,&quot;&apos;&quot;,@onclick_event,&quot;&apos;&quot;,&quot;;&quot;,&quot;e&quot;,&quot;v&quot;,&quot;a&quot;,&quot;l&quot;,&quot;(&quot;,&quot;t&quot;,&quot;h&quot;,&quot;i&quot;,&quot;s&quot;,&quot;.&quot;,&quot;o&quot;,&quot;b&quot;,&quot;j&quot;,&quot;e&quot;,&quot;c&quot;,&quot;t&quot;,&quot;.&quot;,&quot;o&quot;,&quot;n&quot;,&quot;C&quot;,&quot;l&quot;,&quot;i&quot;,&quot;c&quot;,&quot;k&quot;,&quot;H&quot;,&quot;a&quot;,&quot;n&quot;,&quot;d&quot;,&quot;l&quot;,&quot;e&quot;,&quot;r&quot;,&quot;(&quot;,&quot;e&quot;,&quot;)&quot;,&quot;)&quot;,&quot;;&quot;,&apos;&apos;)' />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('float:left;width:',../../@height,'px;height:',../../@height - 1,'px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('float:left;width:',@width,'px;height:',@height,'px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<img border=\"0\">"+"<xsl:attribute name=\"src\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:variable name=\"top_offset\">"+"<xsl:choose>"+"<xsl:when test=\"@top_offset\">"+"<xsl:value-of select=\"@top_offset\" />"+"</xsl:when>"+"<xsl:otherwise>"+"0"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:variable>"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:',((../../@height - @height) div 2) - 1 + number($top_offset),'px;MARGIN-BOTTOM:0px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('MARGIN-TOP:',(@height - @image_height) div 2,'px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"</img><![CDATA[ ]]>"+"</div>"+"</xsl:template>";
nitobi.ui.BinaryStateButton=function(xml,id){
this.initialize(xml,nitobi.ui.BinaryStateButtonXsl,id);
this.m_Checked=false;
};
nitobi.lang.extend(nitobi.ui.BinaryStateButton,nitobi.ui.Button);
nitobi.ui.BinaryStateButton.prototype.isChecked=function(){
return this.m_Checked;
};
nitobi.ui.BinaryStateButton.prototype.check=function(){
var _8c7=this.getHtmlElementHandle();
_8c7.className="ntb-button-checked";
this.m_Checked=true;
};
nitobi.ui.BinaryStateButton.prototype.uncheck=function(){
var _8c8=this.getHtmlElementHandle();
_8c8.className="ntb-button";
this.m_Checked=false;
};
nitobi.ui.BinaryStateButton.prototype.toggle=function(){
var _8c9=this.getHtmlElementHandle();
if(_8c9.className=="ntb-button-checked"){
this.uncheck();
}else{
this.check();
}
};
nitobi.ui.ToolbarXsl="<xsl:template match=\"//toolbar\">"+"<div style=\"z-index:800\">"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">float:left;position:relative;"+"<xsl:value-of select=\"concat('width:',@width,'px;height:',@height,'px')\" />"+"</xsl:attribute>"+"<xsl:apply-templates />"+"</div>"+"</xsl:template>"+nitobi.ui.ButtonXsl+nitobi.ui.BinaryStateButtonXsl+"<xsl:template match=\"separator\">"+"<div align='center'>"+"<xsl:attribute name=\"style\">"+"<xsl:value-of select=\"concat('float:left;width:',@width,';height:',@height)\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<img border='0'>"+"<xsl:attribute name=\"src\">"+"<xsl:value-of select=\"concat(//@image_directory,@image)\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:3','px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:attribute>"+"</img>"+"</div>"+"</xsl:template>";
nitobi.ui.Toolbar=function(xml,id){
nitobi.ui.Toolbar.baseConstructor.call(this);
this.initialize(xml,nitobi.ui.ToolbarXsl,id);
};
nitobi.lang.extend(nitobi.ui.Toolbar,nitobi.ui.InteractiveUiElement);
nitobi.ui.Toolbar.prototype.getUiElements=function(){
return this.m_UiElements;
};
nitobi.ui.Toolbar.prototype.setUiElements=function(_8cc){
this.m_UiElements=_8cc;
};
nitobi.ui.Toolbar.prototype.attachButtonObjects=function(){
if(!this.m_UiElements){
this.m_UiElements=new Array();
var tag=this.getHtmlElementHandle();
var _8ce=tag.childNodes;
for(var i=0;i<_8ce.length;i++){
var _8d0=_8ce[i];
if(_8d0.nodeType!=3){
var _8d1;
switch(_8d0.className){
case ("ntb-button"):
_8d1=new nitobi.ui.Button(null,_8d0.id);
break;
case ("ntb-binarybutton"):
_8d1=new nitobi.ui.BinaryStateButton(null,_8d0.id);
break;
default:
_8d1=new nitobi.ui.UiElement(null,null,_8d0.id);
break;
}
_8d1.attachToTag();
this.m_UiElements[_8d0.id]=_8d1;
}
}
}
};
nitobi.ui.Toolbar.prototype.render=function(_8d2){
nitobi.ui.Toolbar.base.base.render.call(this,_8d2);
this.attachButtonObjects();
};
nitobi.ui.Toolbar.prototype.disableAllElements=function(){
for(var i in this.m_UiElements){
if(this.m_UiElements[i].disable){
this.m_UiElements[i].disable();
}
}
};
nitobi.ui.Toolbar.prototype.enableAllElements=function(){
for(var i in this.m_UiElements){
if(this.m_UiElements[i].enable){
this.m_UiElements[i].enable();
}
}
};
nitobi.ui.Toolbar.prototype.attachToTag=function(){
nitobi.ui.Toolbar.base.base.attachToTag.call(this);
this.attachButtonObjects();
};
nitobi.ui.Toolbar.prototype.dispose=function(){
if(typeof (this.m_UiElements)!="undefined"){
for(var _8d5 in this.m_UiElements){
this.m_UiElements[_8d5].dispose();
}
this.m_UiElements=null;
}
nitobi.ui.Toolbar.base.dispose.call(this);
};
nitobi.lang.defineNs("nitobi.calendar");
if(false){
nitobi.calendar=function(){
};
}
nitobi.calendar.DatePicker=function(_8d6){
nitobi.prepare();
nitobi.calendar.DatePicker.baseConstructor.call(this,_8d6);
this.renderer.setTemplate(nitobi.calendar.datePickerTemplate);
this.blurInput=true;
this.onDateSelected=new nitobi.base.Event();
this.eventMap["dateselected"]=this.onDateSelected;
this.onSetInvalidDate=new nitobi.base.Event();
this.eventMap["setinvaliddate"]=this.onSetInvalidDate;
this.onSetDisabledDate=new nitobi.base.Event();
this.eventMap["setdisableddate"]=this.onSetDisabledDate;
this.onSetOutOfRangeDate=new nitobi.base.Event();
this.eventMap["setoutofrangedate"]=this.onSetOutOfRangeDate;
this.onEventDateSelected=new nitobi.base.Event();
this.eventMap["eventdateselected"]=this.onEventDateSelected;
this.eventsManager=new nitobi.calendar.EventsManager(this.getEventsUrl());
this.eventsManager.onDataReady.subscribe(this.renderChildren,this);
var _8d7=this.getSelectedDate();
if(_8d7&&!this.isOutOfRange(_8d7)&&!nitobi.base.DateMath.invalid(_8d7)){
this.setStartDate(nitobi.base.DateMath.getMonthStart(_8d7));
}else{
this.setDateAttribute("selecteddate",null);
var _8d8=this.getMinDate();
var _8d9;
if(_8d8){
_8d9=_8d8;
}else{
_8d9=new Date();
}
this.setStartDate(nitobi.base.DateMath.getMonthStart(_8d9));
}
this.subscribeDeclarationEvents();
};
nitobi.lang.extend(nitobi.calendar.DatePicker,nitobi.ui.Element);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.calendar.DatePicker",null,false,"ntb:datepicker"));
nitobi.calendar.DatePicker.prototype.render=function(){
var _8da=this.getInput();
if(_8da){
_8da.detachEvents();
}
nitobi.calendar.DatePicker.base.render.call(this);
if(_8da){
_8da.attachEvents();
}
if(nitobi.browser.IE&&_8da){
var _8db=_8da.getHtmlNode("input");
var _8dc=nitobi.html.Css.getStyle(_8db,"height");
nitobi.html.Css.setStyle(_8db,"height",parseInt(_8dc)-2+"px");
}
if(this.eventsManager){
this.eventsManager.getFromServer();
}else{
this.renderChildren();
}
};
nitobi.calendar.DatePicker.prototype.renderChildren=function(){
var cal=this.getCalendar();
var _8de=this.getInput();
if(cal){
cal.render();
if(!_8de){
var C=nitobi.html.Css;
var _8e0=cal.getHtmlNode();
var body=cal.getHtmlNode("body");
C.swapClass(_8e0,"nitobi-hide",NTB_CSS_SMALL);
cal.getHtmlNode().style.width=body.offsetWidth+"px";
C.removeClass(_8e0,NTB_CSS_SMALL);
}
}
if(this.getSelectedDate()&&_8de){
_8de.setValue(this.formatDate(this.getSelectedDate(),_8de.getDisplayMask()));
}
if(this.getSelectedDate()){
var _8e2=this.getHtmlNode("value");
if(_8e2){
_8e2.value=this.formatDate(this.getSelectedDate(),this.getSubmitMask());
}
}
var _8e3=this.getHtmlNode("button");
if(_8e3){
nitobi.html.attachEvent(_8e3,"click",cal.handleToggleClick,cal);
}
};
nitobi.calendar.DatePicker.prototype.getCalendar=function(){
return this.getObject(nitobi.calendar.Calendar.profile);
};
nitobi.calendar.DatePicker.prototype.getInput=function(){
return this.getObject(nitobi.calendar.DateInput.profile);
};
nitobi.calendar.DatePicker.prototype.getSelectedDate=function(){
return this.getDateAttr("selecteddate");
};
nitobi.calendar.DatePicker.prototype.getDateAttr=function(attr){
var _8e5=this.getAttribute(attr,null);
if(_8e5){
if(typeof (_8e5)=="string"){
return this.parseLanguage(_8e5);
}else{
return new Date(_8e5);
}
}
return null;
};
nitobi.calendar.DatePicker.prototype.setSelectedDate=function(date){
if(typeof (date)!="object"){
date=new Date(date);
}
if(this.validate(date)){
this._setSelectedDate(date);
}
};
nitobi.calendar.DatePicker.prototype._setSelectedDate=function(date,_8e8){
this.setDateAttribute("selecteddate",date);
var _8e9=this.getHtmlNode("value");
if(_8e9){
_8e9.value=this.formatDate(date,this.getSubmitMask());
}
var _8ea=this.getInput();
if(_8ea){
var _8eb=_8ea.getDisplayMask();
var _8ec=this.formatDate(date,_8eb);
_8ea.setValue(_8ec);
_8ea.setInvalidStyle(false);
}
var _8ed=this.getCalendar();
if(_8ed){
_8ed.clearHighlight(date);
var dm=nitobi.base.DateMath;
var _8ef=dm.getMonthStart(this.getStartDate());
var _8f0=_8ed.getMonthColumns()*_8ed.getMonthRows()-1;
var _8f1=dm.getMonthEnd(dm.add(dm.clone(_8ef),"m",_8f0));
if(dm.between(date,_8ef,_8f1)){
_8ed.highlight(date);
}
if(_8e8){
this.setStartDate(dm.getMonthStart(dm.clone(date)));
_8ed.render();
}
}
var _8f2=this.getEventsManager();
if(_8f2.isEvent(date)){
var _8ef=_8f2.eventsCache[date.valueOf()];
var _8f3=this.eventsManager.getEventInfo(_8ef);
this.onEventDateSelected.notify({events:_8f3});
}
this.onDateSelected.notify(new nitobi.ui.ElementEventArgs(this,this.onDateSelected));
};
nitobi.calendar.DatePicker.prototype.validate=function(_8f4){
var E=nitobi.ui.ElementEventArgs;
if(nitobi.base.DateMath.invalid(_8f4)){
this.onSetInvalidDate.notify(new E(this,this.onSetInvalidDate));
return false;
}
if(this.isOutOfRange(_8f4)){
this.onSetOutOfRangeDate.notify(new E(this,this.onSetOutOfRangeDate));
return false;
}
if(this.isDisabled(_8f4)){
this.onSetDisabledDate.notify(new E(this,this.onSetDisabledDate));
return false;
}
return true;
};
nitobi.calendar.DatePicker.prototype.isDisabled=function(date){
return this.getEventsManager().isDisabled(date);
};
nitobi.calendar.DatePicker.prototype.isOutOfRange=function(date){
var dm=nitobi.base.DateMath;
var _8f9=this.getMinDate();
var _8fa=this.getMaxDate();
var _8fb=false;
if(_8f9&&_8fa){
_8fb=!dm.between(date,_8f9,_8fa);
}else{
if(_8f9&&_8fa==null){
_8fb=dm.before(date,_8f9);
}else{
if(_8f9==null&&_8fa){
_8fb=dm.after(date,_8fa);
}
}
}
return _8fb;
};
nitobi.calendar.DatePicker.prototype.clear=function(){
var _8fc=this.getHtmlNode("value");
if(_8fc){
_8fc.value="";
}
this.setDateAttribute("selecteddate",null);
};
nitobi.calendar.DatePicker.prototype.getTheme=function(){
return this.getAttribute("theme","");
};
nitobi.calendar.DatePicker.prototype.getSubmitMask=function(){
return this.getAttribute("submitmask","yyyy-MM-dd");
};
nitobi.calendar.DatePicker.prototype.setSubmitMask=function(mask){
this.setAttribute("submitmask",mask);
};
nitobi.calendar.DatePicker.prototype.getStartDate=function(){
return this.getDateAttribute("startdate");
};
nitobi.calendar.DatePicker.prototype.setStartDate=function(date){
this.setDateAttribute("startdate",date);
};
nitobi.calendar.DatePicker.prototype.getEventsUrl=function(){
return this.getAttribute("eventsurl","");
};
nitobi.calendar.DatePicker.prototype.setEventsUrl=function(url){
this.setAttribute("eventsurl",url);
};
nitobi.calendar.DatePicker.prototype.getEventsManager=function(){
return this.eventsManager;
};
nitobi.calendar.DatePicker.prototype.isShimEnabled=function(){
return this.getBoolAttribute("shimenabled",false);
};
nitobi.calendar.DatePicker.prototype.getMinDate=function(){
return this.getDateAttr("mindate");
};
nitobi.calendar.DatePicker.prototype.setMinDate=function(_900){
this.setAttribute("mindate",_900);
};
nitobi.calendar.DatePicker.prototype.getMaxDate=function(){
return this.getDateAttr("maxdate");
};
nitobi.calendar.DatePicker.prototype.setMaxDate=function(_901){
this.setAttribute("maxdate",_901);
};
nitobi.calendar.DatePicker.prototype.parseLanguage=function(date){
var dm=nitobi.base.DateMath;
var _904=Date.parse(date);
if(_904&&typeof (_904)=="object"&&!isNaN(_904)&&!dm.invalid(_904)){
return _904;
}
if(date==""||date==null){
return null;
}
date=date.toLowerCase();
var _905=dm.resetTime(new Date());
switch(date){
case "today":
date=_905;
break;
case "tomorrow":
date=dm.add(_905,"d",1);
break;
case "yesterday":
date=dm.subtract(_905,"d",1);
break;
case "last week":
date=dm.subtract(_905,"d",7);
break;
case "next week":
date=dm.add(_905,"d",7);
break;
case "last year":
date=dm.subtract(_905,"y",1);
break;
case "last month":
date=dm.subtract(_905,"m",1);
break;
case "next month":
date=dm.add(_905,"m",1);
break;
case "next year":
date=dm.add(_905,"y",1);
break;
default:
date=dm.resetTime(new Date(date));
break;
}
if(dm.invalid(date)){
return null;
}else{
return date;
}
};
nitobi.calendar.DatePicker.longDayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
nitobi.calendar.DatePicker.shortDayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
nitobi.calendar.DatePicker.minDayNames=["S","M","T","W","T","F","S"];
nitobi.calendar.DatePicker.longMonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
nitobi.calendar.DatePicker.shortMonthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
nitobi.calendar.DatePicker.navConfirmText="OK";
nitobi.calendar.DatePicker.navCancelText="Cancel";
nitobi.calendar.DatePicker.navOutOfRangeText="That date is out of range.";
nitobi.calendar.DatePicker.navInvalidYearText="You must enter a valid year.";
nitobi.calendar.DatePicker.prototype.getMinDayNames=function(){
return this.initJsAttr("minDayNames");
};
nitobi.calendar.DatePicker.prototype.getLongDayNames=function(){
return this.initJsAttr("longDayNames");
};
nitobi.calendar.DatePicker.prototype.getShortDayNames=function(){
return this.initJsAttr("shortDayNames");
};
nitobi.calendar.DatePicker.prototype.getLongMonthNames=function(){
return this.initJsAttr("longMonthNames");
};
nitobi.calendar.DatePicker.prototype.getShortMonthNames=function(){
return this.initJsAttr("shortMonthNames");
};
nitobi.calendar.DatePicker.prototype.getNavConfirmText=function(){
return this.initLocaleAttr("navConfirmText");
};
nitobi.calendar.DatePicker.prototype.getNavCancelText=function(){
return this.initLocaleAttr("navCancelText");
};
nitobi.calendar.DatePicker.prototype.getNavOutOfRangeText=function(){
return this.initLocaleAttr("navOutOfRangeText");
};
nitobi.calendar.DatePicker.prototype.getNavInvalidYearText=function(){
return this.initLocaleAttr("navInvalidYearText");
};
nitobi.calendar.DatePicker.prototype.initJsAttr=function(_906){
if(this[_906]){
return this[_906];
}
var attr=this.getAttribute(_906.toLowerCase(),"");
if(attr!=""){
attr=eval("("+attr+")");
return this[_906]=attr;
}
return this[_906]=nitobi.calendar.DatePicker[_906];
};
nitobi.calendar.DatePicker.prototype.initLocaleAttr=function(_908){
if(this[_908]){
return this[_908];
}
var text=this.getAttribute(_908.toLowerCase(),"");
if(text!=""){
return this[_908]=text;
}else{
return this[_908]=nitobi.calendar.DatePicker[_908];
}
};
nitobi.calendar.DatePicker.prototype.parseDate=function(date,mask){
var _90c={};
while(mask.length>0){
var c=mask.charAt(0);
var _90e=new RegExp(c+"+");
var _90f=_90e.exec(mask)[0];
if(c!="d"&&c!="y"&&c!="M"&&c!="N"&&c!="E"){
mask=mask.substring(_90f.length);
date=date.substring(_90f.length);
}else{
var _910=mask.charAt(_90f.length);
var _911=(_910==""?date:date.substring(0,date.indexOf(_910)));
var _912=this.validateFormat(_911,_90f);
if(_912.valid){
_90c[_912.unit]=_912.value;
}else{
return null;
}
mask=mask.substring(_90f.length);
date=date.substring(_911.length);
}
}
var date=new Date(_90c.y,_90c.m,_90c.d);
return date;
};
nitobi.calendar.DatePicker.prototype.validateFormat=function(_913,_914){
var _915={valid:false,unit:"",value:""};
switch(_914){
case "d":
case "dd":
var _916=parseInt(_913);
var _917;
if(_914=="d"){
_917=!isNaN(_913)&&_913.charAt(0)!="0"&&_913.length<=2;
}else{
_917=!isNaN(_913)&&_913.length==2;
}
if(_917){
_915.valid=true;
_915.unit="d";
_915.value=_913;
}else{
_915.valid=false;
}
break;
case "y":
case "yyyy":
if(isNaN(_913)){
_915.valid=false;
}else{
_915.valid=true;
_915.unit="y";
_915.value=_913;
}
break;
case "M":
case "MM":
var _916=parseInt(_913,10);
var _917;
if(_914=="M"){
_917=!isNaN(_913)&&_913.charAt(0)!="0"&&_913.length<=2&&_916>=1&&_916<=12;
}else{
_917=!isNaN(_913)&_913.length==2&&_916>=1&&_916<=12;
}
if(_917){
_915.valid=true;
_915.unit="m";
_915.value=_916-1;
}else{
_915.valid=false;
}
break;
case "MMM":
case "NNN":
case "E":
case "EE":
var _918;
if(_914=="MMM"){
_918=this.getLongMonthNames();
}else{
if(_914=="NNN"){
_918=this.getShortMonthNames();
}else{
if(_914=="E"){
_918=this.getShortDayNames();
}else{
_918=this.getLongDayNames();
}
}
}
var i;
for(i=0;i<_918.length;i++){
var _91a=_918[i];
if(_913.toLowerCase()==_91a.toLowerCase()){
break;
}
}
if(i<_918.length){
_915.valid=true;
if(_914=="MMM"||_914=="NNN"){
_915.unit="m";
}else{
_915.unit="dl";
}
_915.value=i;
}else{
_915.valid=false;
}
break;
}
return _915;
};
nitobi.calendar.DatePicker.prototype.formatDate=function(date,mask){
var _91d={};
var year=date.getFullYear()+"";
var _91f=date.getMonth()+1+"";
var _920=date.getDate()+"";
var day=date.getDay();
_91d["y"]=_91d["yyyy"]=year;
_91d["yy"]=year.substring(2,4);
_91d["M"]=_91f+"";
_91d["MM"]=nitobi.lang.padZeros(_91f,2);
_91d["MMM"]=this.getLongMonthNames()[_91f-1];
_91d["NNN"]=this.getShortMonthNames()[_91f-1];
_91d["d"]=_920;
_91d["dd"]=nitobi.lang.padZeros(_920,2);
_91d["EE"]=this.getLongDayNames()[day];
_91d["E"]=this.getShortDayNames()[day];
var _922="";
while(mask.length>0){
var c=mask.charAt(0);
var _924=new RegExp(c+"+");
var _925=_924.exec(mask)[0];
_922+=_91d[_925]||_925;
mask=mask.substring(_925.length);
}
return _922;
};


var temp_ntb_modelDoc='<state	 xmlns:ntb="http://www.nitobi.com"	ID="mySheet"	Version="3.01" 	element="grid" 		uniqueID="_hkj342">    <ntb:treegrid    	Theme="nitobi"    	CellBorder="0"     	CellBorderX="0"    	CellBorderY="0"		Height="300"		Width="700"		skin="default"		RowHeight="23"					indicatorHeight="23"		HeaderHeight="23"		scrollbarWidth="26"		scrollbarHeight="26"		ToolbarHeight="25"				top="23"		left="0"		minHeight="60"		minWidth="250"		PrimaryDatasourceSize="0" 		containerHeight=""		containerWidth=""		columnsdefined="0"		renderframe="0"		renderindicators="0"		renderheader="0"		renderfooter="0"		renderleft="0"		renderright="0"		rendercenter="0"		selected="1"		activeView=""		highlightCell=""		scrolling="0"		EditMode="0"		prevCell=""		prevText=""		prevData=""		FrozenLeftColumnCount="0"		DatasourceSizeEstimate="0"    	DatasourceId=""  		freezeright="0"		freezetop="0"		ToolbarEnabled="1"    	Expanding="0"			GridResizeEnabled="0"		RowHighlightEnabled="0"		RowSelectEnabled="0"		MultiRowSelectEnabled="0"		AutoKeyEnabled="0"			ToolbarContainerEmpty="false"			TooltipsEnabled="1"		RowIndicatorsEnabled="0"		ColumnIndicatorsEnabled="1"		HScrollbarEnabled="1"		VScrollbarEnabled="1"		rowselect="0"		AutoSaveEnabled="0"		autoAdd="0"		remoteSort="0"		ForceValidate="1"		showErrors="0"		columnGraying="0"		keymode=""			keyboardPaging="0"		RowInsertEnabled="1"		RowDeleteEnabled="1"		allowEdit="1"		allowFormula="1"		PasteEnabled="1"		CopyEnabled="1"				expandRowsOnPaste="1"		expandColumnsOnPast="1"		datalog="myXMLLog"		xselect="//root"		xorder="@a"		asynchronous="1"		fieldMap=""    	GetHandler="" 		getHandler=""		SaveHandler=""		lastSaveHandlerResponse=""		sortColumn="0"		curSortColumn="0"		descending="0"		curSortColumnDesc="0"		RowCount="0"		ColumnCount="0"		nextXK="32"		CurrentPageIndex="0"		PagingMode="standard"		DataMode="caching"		RenderMode=""    	LiveScrollingMode="Leap"		RowsPerPage="20"		pageStart="0"		normalColor="#FFFFFF"		normalColor2="#FFFFFF"		activeColor="#FFFFFF"		selectionColor="#FFFFFF"		highlightColor="#FFFFFF"		columnGrayingColor="#FFFFFF"		SingleClickEditEnabled="0"		LastError=""		SortEnabled="1"    	SortMode="default"    	EnterTab="down"    	    	WidthFixed="0"     	HeightFixed="0"    	MinWidth="20"     	MinHeight="0"    	DragFillEnabled="1"    	RootColumns=""     	ViewableWidth="0"    	GroupOffset="0"    	EffectsEnabled="false"	>    </ntb:treegrid>    <Defaults>    	<nitobi.grid.Grid></nitobi.grid.Grid>		<ntb:column			Width="100"			type="TEXT"			Visible="1"			SortEnabled="1"			/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." type="TEXT" editor="TEXT"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." type="NUMBER" editor="NUMBER"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." type="TEXTAREA" editor="TEXTAREA"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." ImageUrl="" type="IMAGE" editor="IMAGE"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." OpenWindow="1" type="LINK" editor="LINK"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" NegativeMask="" GroupingSeparator="," DecimalSeparator="." CalendarEnabled="1" type="DATE" editor="DATE"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." DatasourceId="" Datasource="" DisplayFields="" ValueField="" Delay="" Size="6" ForceValidOption="0" type="LOOKUP" editor="LOOKUP"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." DatasourceId="" Datasource="" DisplayFields="" ValueField="" type="LISTBOX" editor="LISTBOX"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." type="PASSWORD" editor="PASSWORD"/>    	<ntb:column Align="right" ClassName="" CssStyle="" ColumnName="" DataType="number" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="#,###.00" NegativeMask="" GroupingSeparator="," DecimalSeparator="." DatasourceId="" Datasource="" DisplayFields="" ValueField="" CheckedValue="" UnCheckedValue="" type="CHECKBOX" editor="CHECKBOX"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="TEXT" editor="TEXT"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="NUMBER" editor="NUMBER"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="TEXTAREA" editor="TEXTAREA"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" ImageUrl="" type="IMAGE" editor="IMAGE"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" OpenWindow="1" type="LINK" editor="LINK"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="DATE" editor="DATE"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" DatasourceId="" Datasource="" DisplayFields="" ValueField="" Delay="" Size="6" ForceValidOption="0" type="LOOKUP" editor="LOOKUP"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" DatasourceId="" Datasource="" DisplayFields="" ValueField="" type="LISTBOX" editor="LISTBOX"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="PASSWORD" editor="PASSWORD"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="date" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" DatasourceId="" Datasource="" DisplayFields="" ValueField="" CheckedValue="" UnCheckedValue="" type="CHECKBOX" editor="CHECKBOX"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" type="TEXT" editor="TEXT"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" type="NUMBER" editor="NUMBER"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" type="TEXTAREA" editor="TEXTAREA"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" ImageUrl="" type="IMAGE" editor="IMAGE"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" OpenWindow="1" type="LINK" editor="LINK"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" Mask="M/d/yyyy" CalendarEnabled="1" type="DATE" editor="DATE"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" DatasourceId="" Datasource="" DisplayFields="" ValueField="" Delay="" Size="6" ForceValidOption="0" type="LOOKUP" editor="LOOKUP"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" DatasourceId="" Datasource="" DisplayFields="" ValueField="" type="LISTBOX" editor="LISTBOX"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" type="PASSWORD" editor="PASSWORD"/>    	<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="text" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" DatasourceId="" Datasource="" DisplayFields="" ValueField="" CheckedValue="" UnCheckedValue="" type="CHECKBOX" editor="CHECKBOX"/>				<ntb:column Align="left" ClassName="" CssStyle="" ColumnName="" DataType="expand" Editable="1" Initial="" Label="" GetHandler="" DataSource="" Template="" TemplateUrl="" MaxLength="255" SortDirection="Desc" SortEnabled="1" Width="100" Visible="1" xdatafld="" Value="" xi="100" type="EXPAND" editor="EXPAND"/>		<nitobi.grid.Row></nitobi.grid.Row>		<nitobi.grid.Cell></nitobi.grid.Cell>		<ntb:e />    </Defaults>    	<declaration>	</declaration>	<columnDefinitions>	</columnDefinitions></state>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.modelDoc = nitobi.xml.createXmlDoc(temp_ntb_modelDoc);

var temp_ntb_toolbarDoc='<?xml version="1.0" encoding="utf-8"?><toolbar id="toolbarthis.uid" title="Grid" height="25" width="110" image_directory="http://localhost/vss/EBALib/v13/Common/Toolbar/Styles/default">	<items>		<button id="save" onclick_event="this.onClick()" height="14" width="14" image="save.gif"			image_disabled="save_disabled.gif" tooltip_text="Save Changes" />		<!-- <button id="discardChanges" onclick_event="testclick(this);" height="17" width="16" top_offset="-2"			image="cancelsave.gif" image_disabled="cancelsave_disabled.gif" tooltip_text="Discard Changes" /> -->		<separator id="toolbar1_separator1" height="20" width="5" image="separator.jpg" />		<button id="newRecord" onclick_event="this.onClick()" height="11" width="14" image="newrecord.gif"			image_disabled="newrecord_disabled.gif" tooltip_text="New Record" />		<button id="deleteRecord" onclick_event="this.onClick()" height="11" width="14" image="deleterecord.gif"			image_disabled="deleterecord_disabled.gif" tooltip_text="Delete Record" />		<separator id="toolbar1_separator2" height="20" width="5" image="separator.jpg" />		<button id="refresh" onclick_event="this.onClick()" height="14" width="16" image="refresh.gif"			image_disabled="refresh_disabled.gif" tooltip_text="Refresh" />		<!--<separator id="toolbar1_separator3" height="20" width="5" image="separator.jpg" />		<button id="toolbar1_button4" onclick_event="testclick(this);" height="11" width="10" image="left.gif"			image_disabled="left_disabled.gif" tooltip_text="Previous Page" />		<button id="toolbar1_button5" onclick_event="testclick(this);" height="11" width="10" image="right.gif"			image_disabled="right_disabled.gif" tooltip_text="Next Page" />		-->	</items></toolbar>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.toolbarDoc = nitobi.xml.createXmlDoc(temp_ntb_toolbarDoc);

var temp_ntb_pagingToolbarDoc='<?xml version="1.0" encoding="utf-8"?><toolbar id="toolbarpagingthis.uid" title="Paging" height="25" width="60" image_directory="http://localhost/vss/EBALib/v13/Common/Toolbar/Styles/default">	<items>		<button id="previousPage" onclick_event="this.onClick()" height="14" width="14" image="left.gif"			image_disabled="left_disabled.gif" tooltip_text="Previous Page" />		<button id="nextPage" onclick_event="this.onClick()" height="14" width="16" image="right.gif"			image_disabled="right_disabled.gif" tooltip_text="Next Page" />	</items></toolbar>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.pagingToolbarDoc = nitobi.xml.createXmlDoc(temp_ntb_pagingToolbarDoc);


var temp_ntb_addXidXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <x:p-x:n-guid"x:s-0"/><x:t- match="/"> <x:at-/></x:t-><x:t- match="node()|@*"> <xsl:copy> <xsl:if test="not(@xid)"> <x:a-x:n-xid" ><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:if> <x:at-x:s-./* | text() | @*"> </x:at-> </xsl:copy></x:t-> <x:t- match="text()"> <x:v-x:s-."/></x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.addXidXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_addXidXslProc));

var temp_ntb_adjustXiXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-startingIndex"x:s-5"></x:p-> <x:p-x:n-startingGroup"x:s-5"></x:p-> <x:p-x:n-adjustment"x:s--1"></x:p-> <x:t- match="*|@*"> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <!--[@id=\'_default\']--> <x:t- match="//ntb:data/ntb:e|@*"> <x:c-> <x:wh- test="number(@xi) &gt;= number($startingIndex)"> <xsl:copy> <x:at-x:s-@*|node()" /> <x:ct-x:n-increment-xi" /> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-> <x:t-x:n-increment-xi"> <x:a-x:n-xi"> <x:v-x:s-number(@xi) + number($adjustment)" /> </x:a-> </x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.adjustXiXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_adjustXiXslProc));

var temp_ntb_dataTranslatorXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-start"x:s-0"></x:p-> <x:p-x:n-id"x:s-\'_default\'"></x:p-> <x:p-x:n-xkField"x:s-\'a\'"></x:p-> <x:p-x:n-totalRowCount"x:s-//root/@totalrowcount"/> <x:p-x:n-parentfield"x:s-//root/@parentfield"/> <x:p-x:n-parentvalue"x:s-//root/@parentvalue"/> <x:t- match="//root"> <ntb:treegrid xmlns:ntb="http://www.nitobi.com"> <ntb:datasources> <ntb:datasource id="{$id}" totalrowcount="{$totalRowCount}"> <xsl:if test="$parentfield"> <x:a-x:n-parentfield"><x:v-x:s-$parentfield"/></x:a-> </xsl:if> <xsl:if test="$parentvalue"> <x:a-x:n-parentvalue"><x:v-x:s-$parentvalue"/></x:a-> </xsl:if> <xsl:if test="@error"> <x:a-x:n-error"><x:v-x:s-@error" /></x:a-> </xsl:if> <ntb:datasourcestructure id="{$id}"> <x:a-x:n-FieldNames"><x:v-x:s-@fields" />|_xk</x:a-> <x:a-x:n-Keys">_xk</x:a-> </ntb:datasourcestructure> <ntb:data id="{$id}"> <xsl:for-eachx:s-//e"> <x:at-x:s-."> <x:w-x:n-xi"x:s-position()-1"></x:w-> </x:at-> </xsl:for-each> </ntb:data> </ntb:datasource> </ntb:datasources> </ntb:treegrid> </x:t-> <x:t- match="e"> <x:p-x:n-xi"x:s-0"></x:p-> <ntb:e> <xsl:copy-ofx:s-@*[not(name() = \'xk\')]"></xsl:copy-of> <xsl:if test="not(@xi)"><x:a-x:n-xi"><x:v-x:s-$start + $xi" /></x:a-></xsl:if> <x:a-x:n-{$xkField}"><x:v-x:s-@xk" /></x:a-> </ntb:e> </x:t-> <x:t- match="lookups"></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.dataTranslatorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dataTranslatorXslProc));

var temp_ntb_dateFormatTemplatesXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"> <!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --><d:ms> <d:m i="1" l="31" a="Jan">January</d:m> <d:m i="2" l="28" a="Feb">February</d:m> <d:m i="3" l="31" a="Mar">March</d:m> <d:m i="4" l="30" a="Apr">April</d:m> <d:m i="5" l="31" a="May">May</d:m> <d:m i="6" l="30" a="Jun">June</d:m> <d:m i="7" l="31" a="Jul">July</d:m> <d:m i="8" l="31" a="Aug">August</d:m> <d:m i="9" l="30" a="Sep">September</d:m> <d:m i="10" l="31" a="Oct">October</d:m> <d:m i="11" l="30" a="Nov">November</d:m> <d:m i="12" l="31" a="Dec">December</d:m></d:ms><d:ds> <d:d a="Sun">Sunday</d:d> <d:d a="Mon">Monday</d:d> <d:d a="Tue">Tuesday</d:d> <d:d a="Wed">Wednesday</d:d> <d:d a="Thu">Thursday</d:d> <d:d a="Fri">Friday</d:d> <d:d a="Sat">Saturday</d:d></d:ds><x:t-x:n-d:format-date"> <x:p-x:n-date-time" /> <x:p-x:n-mask"x:s-\'MMM d, yy\'"/> <x:p-x:n-date-year" /> <x:va-x:n-formatted"> <x:va-x:n-date-time-length"x:s-string-length($date-time)" /> <x:va-x:n-timezone"x:s-\'\'" /> <x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /> <x:va-x:n-dt-length"x:s-string-length($dt)" /> <x:c-> <x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"> <!--that means we just have a time--> <x:va-x:n-hour"x:s-substring($dt, 1, 2)" /> <x:va-x:n-min"x:s-substring($dt, 4, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 7)" /> <xsl:if test="$hour &lt;= 23 and $min &lt;= 59 and $sec &lt;= 60"> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-\'NaN\'" /> <x:w-x:n-month"x:s-\'NaN\'" /> <x:w-x:n-day"x:s-\'NaN\'" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </xsl:if> </x:wh-> <x:wh- test="substring($dt, 2, 1) = \'-\' or substring($dt, 3, 1) = \'-\'"> <x:c-> <x:wh- test="$dt-length = 5 or $dt-length = 6"> <!--D-MMM,DD-MMM--> <x:va-x:n-year"x:s-$date-year" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-after($dt,\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="$dt-length = 8 or $dt-length = 9"> <!--D-MMM-YY,DD-MMM-YY--> <x:va-x:n-year"x:s-concat(\'20\',substring-after(substring-after($dt,\'-\'),\'-\'))" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:o-> <!--D-MMM-YYYY,DD-MMM-YYYY--> <x:va-x:n-year"x:s-substring-after(substring-after($dt,\'-\'),\'-\')" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:o-> <!--($neg * -2)--> <x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /> <x:va-x:n-month"x:s-substring($dt, 6, 2)" /> <x:va-x:n-day"x:s-substring($dt, 9, 2)" /> <x:c-> <x:wh- test="$dt-length = 10"> <!--that means we just have a date--> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"> <!--that means we have a date + time--> <x:va-x:n-hour"x:s-substring($dt, 12, 2)" /> <x:va-x:n-min"x:s-substring($dt, 15, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 18)" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> </x:c-> </x:o-> </x:c-> </x:va-> <x:v-x:s-$formatted" /> </x:t-><x:t-x:n-d:_format-date"> <x:p-x:n-year" /> <x:p-x:n-month"x:s-1" /> <x:p-x:n-day"x:s-1" /> <x:p-x:n-hour"x:s-0" /> <x:p-x:n-minute"x:s-0" /> <x:p-x:n-second"x:s-0" /> <x:p-x:n-timezone"x:s-\'Z\'" /> <x:p-x:n-mask"x:s-\'\'" /> <x:va-x:n-char"x:s-substring($mask, 1, 1)" /> <x:c-> <x:wh- test="not($mask)" /> <!--replaced escaping with \' here/--> <x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"> <x:v-x:s-$char" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, 2)" /> </x:ct-> </x:wh-> <x:o-> <x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /> <x:va-x:n-mask-length"> <x:c-> <x:wh- test="$next-different-char"> <x:v-x:s-string-length(substring-before($mask, $next-different-char))" /> </x:wh-> <x:o-> <x:v-x:s-string-length($mask)" /> </x:o-> </x:c-> </x:va-> <x:c-> <!--took our the era designator--> <x:wh- test="$char = \'M\'"> <x:c-> <x:wh- test="$mask-length >= 3"> <x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$month-node" /> </x:wh-> <x:o-> <x:v-x:s-$month-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$mask-length = 2"> <x:v-x:s-format-number($month, \'00\')" /> </x:wh-> <x:o-> <x:v-x:s-$month" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'E\'"> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:va-x:n-y-1"x:s-$year - 1" /> <x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /> <x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$day-node" /> </x:wh-> <x:o-> <x:v-x:s-$day-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'a\'"> <x:c-> <x:wh- test="$hour >= 12">PM</x:wh-> <x:o->AM</x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'z\'"> <x:c-> <x:wh- test="$timezone = \'Z\'">UTC</x:wh-> <x:o->UTC<x:v-x:s-$timezone" /></x:o-> </x:c-> </x:wh-> <x:o-> <x:va-x:n-padding"x:s-\'00\'" /> <!--removed padding--> <x:c-> <x:wh- test="$char = \'y\'"> <x:c-> <x:wh- test="$mask-length &gt; 2"><x:v-x:s-format-number($year, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'d\'"> <x:v-x:s-format-number($day, $padding)" /> </x:wh-> <x:wh- test="$char = \'h\'"> <x:va-x:n-h"x:s-$hour mod 12" /> <x:c-> <x:wh- test="$h"><x:v-x:s-format-number($h, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(12, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'H\'"> <x:v-x:s-format-number($hour, $padding)" /> </x:wh-> <x:wh- test="$char = \'k\'"> <x:c-> <x:wh- test="$hour"><x:v-x:s-format-number($hour, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(24, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'K\'"> <x:v-x:s-format-number($hour mod 12, $padding)" /> </x:wh-> <x:wh- test="$char = \'m\'"> <x:v-x:s-format-number($minute, $padding)" /> </x:wh-> <x:wh- test="$char = \'s\'"> <x:v-x:s-format-number($second, $padding)" /> </x:wh-> <x:wh- test="$char = \'S\'"> <x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /> </x:wh-> <x:wh- test="$char = \'F\'"> <x:v-x:s-floor($day div 7) + 1" /> </x:wh-> <x:o-> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:v-x:s-format-number($days, $padding)" /> <!--removed week in year--> <!--removed week in month--> </x:o-> </x:c-> </x:o-> </x:c-> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /> </x:ct-> </x:o-> </x:c-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.dateFormatTemplatesXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dateFormatTemplatesXslProc));

var temp_ntb_dateXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" extension-element-prefixes="d"> <xsl:output method="text" version="4.0" omit-xml-declaration="yes" /> <!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --><d:ms> <d:m i="1" l="31" a="Jan">January</d:m> <d:m i="2" l="28" a="Feb">February</d:m> <d:m i="3" l="31" a="Mar">March</d:m> <d:m i="4" l="30" a="Apr">April</d:m> <d:m i="5" l="31" a="May">May</d:m> <d:m i="6" l="30" a="Jun">June</d:m> <d:m i="7" l="31" a="Jul">July</d:m> <d:m i="8" l="31" a="Aug">August</d:m> <d:m i="9" l="30" a="Sep">September</d:m> <d:m i="10" l="31" a="Oct">October</d:m> <d:m i="11" l="30" a="Nov">November</d:m> <d:m i="12" l="31" a="Dec">December</d:m></d:ms><d:ds> <d:d a="Sun">Sunday</d:d> <d:d a="Mon">Monday</d:d> <d:d a="Tue">Tuesday</d:d> <d:d a="Wed">Wednesday</d:d> <d:d a="Thu">Thursday</d:d> <d:d a="Fri">Friday</d:d> <d:d a="Sat">Saturday</d:d></d:ds><x:t-x:n-d:format-date"> <x:p-x:n-date-time" /> <x:p-x:n-mask"x:s-\'MMM d, yy\'"/> <x:p-x:n-date-year" /> <x:va-x:n-formatted"> <x:va-x:n-date-time-length"x:s-string-length($date-time)" /> <x:va-x:n-timezone"x:s-\'\'" /> <x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /> <x:va-x:n-dt-length"x:s-string-length($dt)" /> <x:c-> <x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"> <!--that means we just have a time--> <x:va-x:n-hour"x:s-substring($dt, 1, 2)" /> <x:va-x:n-min"x:s-substring($dt, 4, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 7)" /> <xsl:if test="$hour &lt;= 23 and $min &lt;= 59 and $sec &lt;= 60"> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-\'NaN\'" /> <x:w-x:n-month"x:s-\'NaN\'" /> <x:w-x:n-day"x:s-\'NaN\'" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </xsl:if> </x:wh-> <x:wh- test="substring($dt, 2, 1) = \'-\' or substring($dt, 3, 1) = \'-\'"> <x:c-> <x:wh- test="$dt-length = 5 or $dt-length = 6"> <!--D-MMM,DD-MMM--> <x:va-x:n-year"x:s-$date-year" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-after($dt,\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="$dt-length = 8 or $dt-length = 9"> <!--D-MMM-YY,DD-MMM-YY--> <x:va-x:n-year"x:s-concat(\'20\',substring-after(substring-after($dt,\'-\'),\'-\'))" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:o-> <!--D-MMM-YYYY,DD-MMM-YYYY--> <x:va-x:n-year"x:s-substring-after(substring-after($dt,\'-\'),\'-\')" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:o-> <!--($neg * -2)--> <x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /> <x:va-x:n-month"x:s-substring($dt, 6, 2)" /> <x:va-x:n-day"x:s-substring($dt, 9, 2)" /> <x:c-> <x:wh- test="$dt-length = 10"> <!--that means we just have a date--> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"> <!--that means we have a date + time--> <x:va-x:n-hour"x:s-substring($dt, 12, 2)" /> <x:va-x:n-min"x:s-substring($dt, 15, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 18)" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> </x:c-> </x:o-> </x:c-> </x:va-> <x:v-x:s-$formatted" /> </x:t-><x:t-x:n-d:_format-date"> <x:p-x:n-year" /> <x:p-x:n-month"x:s-1" /> <x:p-x:n-day"x:s-1" /> <x:p-x:n-hour"x:s-0" /> <x:p-x:n-minute"x:s-0" /> <x:p-x:n-second"x:s-0" /> <x:p-x:n-timezone"x:s-\'Z\'" /> <x:p-x:n-mask"x:s-\'\'" /> <x:va-x:n-char"x:s-substring($mask, 1, 1)" /> <x:c-> <x:wh- test="not($mask)" /> <!--replaced escaping with \' here/--> <x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"> <x:v-x:s-$char" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, 2)" /> </x:ct-> </x:wh-> <x:o-> <x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /> <x:va-x:n-mask-length"> <x:c-> <x:wh- test="$next-different-char"> <x:v-x:s-string-length(substring-before($mask, $next-different-char))" /> </x:wh-> <x:o-> <x:v-x:s-string-length($mask)" /> </x:o-> </x:c-> </x:va-> <x:c-> <!--took our the era designator--> <x:wh- test="$char = \'M\'"> <x:c-> <x:wh- test="$mask-length >= 3"> <x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$month-node" /> </x:wh-> <x:o-> <x:v-x:s-$month-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$mask-length = 2"> <x:v-x:s-format-number($month, \'00\')" /> </x:wh-> <x:o-> <x:v-x:s-$month" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'E\'"> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:va-x:n-y-1"x:s-$year - 1" /> <x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /> <x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$day-node" /> </x:wh-> <x:o-> <x:v-x:s-$day-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'a\'"> <x:c-> <x:wh- test="$hour >= 12">PM</x:wh-> <x:o->AM</x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'z\'"> <x:c-> <x:wh- test="$timezone = \'Z\'">UTC</x:wh-> <x:o->UTC<x:v-x:s-$timezone" /></x:o-> </x:c-> </x:wh-> <x:o-> <x:va-x:n-padding"x:s-\'00\'" /> <!--removed padding--> <x:c-> <x:wh- test="$char = \'y\'"> <x:c-> <x:wh- test="$mask-length &gt; 2"><x:v-x:s-format-number($year, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'d\'"> <x:v-x:s-format-number($day, $padding)" /> </x:wh-> <x:wh- test="$char = \'h\'"> <x:va-x:n-h"x:s-$hour mod 12" /> <x:c-> <x:wh- test="$h"><x:v-x:s-format-number($h, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(12, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'H\'"> <x:v-x:s-format-number($hour, $padding)" /> </x:wh-> <x:wh- test="$char = \'k\'"> <x:c-> <x:wh- test="$hour"><x:v-x:s-format-number($hour, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(24, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'K\'"> <x:v-x:s-format-number($hour mod 12, $padding)" /> </x:wh-> <x:wh- test="$char = \'m\'"> <x:v-x:s-format-number($minute, $padding)" /> </x:wh-> <x:wh- test="$char = \'s\'"> <x:v-x:s-format-number($second, $padding)" /> </x:wh-> <x:wh- test="$char = \'S\'"> <x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /> </x:wh-> <x:wh- test="$char = \'F\'"> <x:v-x:s-floor($day div 7) + 1" /> </x:wh-> <x:o-> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:v-x:s-format-number($days, $padding)" /> <!--removed week in year--> <!--removed week in month--> </x:o-> </x:c-> </x:o-> </x:c-> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /> </x:ct-> </x:o-> </x:c-></x:t-> <x:t- match="/"> <x:ct-x:n-d:format-date"> <x:w-x:n-date-time"x:s-//date" /> <x:w-x:n-date-year"x:s-//year" /> <x:w-x:n-mask"x:s-//mask" /> </x:ct-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.dateXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dateXslProc));

var temp_ntb_declarationConverterXslProc='<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:t- match="/"> <ntb:treegrid xmlns:ntb="http://www.nitobi.com"> <ntb:columns> <x:at-x:s-//ntb:columndefinition" mode="columndef" /> </ntb:columns> <ntb:datasources> <x:at-x:s-//ntb:columndefinition" mode="datasources" /> </ntb:datasources> </ntb:treegrid> </x:t-> <x:t- match="ntb:columndefinition" mode="columndef"> <x:c-> <x:wh- test="@type=\'TEXT\' or @type=\'TEXTAREA\' or @type=\'LISTBOX\' or @type=\'LOOKUP\' or @type=\'CHECKBOX\' or @type=\'LINK\' or @type=\'IMAGE\' or @type=\'\' or not(@type)"> <ntb:textcolumn> <xsl:copy-ofx:s-@*" /> <x:c-> <x:wh- test="@type=\'TEXT\'"> <ntb:texteditor><xsl:copy-ofx:s-@*" /></ntb:texteditor> </x:wh-> <x:wh- test="@type=\'TEXTAREA\'"> <ntb:textareaeditor><xsl:copy-ofx:s-@*" /></ntb:textareaeditor> </x:wh-> <x:wh- test="@type=\'LISTBOX\'"> <ntb:listboxeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> <x:a-x:n-ValueField"> <x:c-> <x:wh- test="@show">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> </ntb:listboxeditor> </x:wh-> <x:wh- test="@type=\'CHECKBOX\'"> <ntb:checkboxeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:o-></x:o-> </x:c-></x:a-> <x:a-x:n-ValueField">a</x:a-> </ntb:checkboxeditor> </x:wh-> <x:wh- test="@type=\'LOOKUP\'"> <ntb:lookupeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:o-></x:o-> </x:c-></x:a-> <x:a-x:n-ValueField"> <x:c-> <x:wh- test="@show">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> </ntb:lookupeditor> </x:wh-> <x:wh- test="@type=\'LINK\'"> <ntb:linkeditor><xsl:copy-ofx:s-@*" /></ntb:linkeditor> </x:wh-> <x:wh- test="@type=\'IMAGE\'"> <ntb:imageeditor><xsl:copy-ofx:s-@*" /></ntb:imageeditor> </x:wh-> </x:c-> </ntb:textcolumn> </x:wh-> <x:wh- test="@type=\'NUMBER\'"> <ntb:numbercolumn><xsl:copy-ofx:s-@*" /></ntb:numbercolumn> </x:wh-> <x:wh- test="@type=\'DATE\' or @type=\'CALENDAR\'"> <ntb:datecolumn> <xsl:copy-ofx:s-@*" /> <x:c-> <x:wh- test="@type=\'DATE\'"> <ntb:dateeditor><xsl:copy-ofx:s-@*" /></ntb:dateeditor> </x:wh-> <x:wh- test="@type=\'CALENDAR\'"> <ntb:calendareditor><xsl:copy-ofx:s-@*" /></ntb:calendareditor> </x:wh-> </x:c-> </ntb:datecolumn> </x:wh-> </x:c-> </x:t-> <x:t- match="ntb:columndefinition" mode="datasources"> <xsl:if test="@values and @values!=\'\'"> <ntb:datasource> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <ntb:datasourcestructure> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <x:a-x:n-FieldNames">a|b</x:a-> <x:a-x:n-Keys">a</x:a-> </ntb:datasourcestructure> <ntb:data> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <x:ct-x:n-values"> <x:w-x:n-valuestring"x:s-@values" /> </x:ct-> </ntb:data> </ntb:datasource> </xsl:if> </x:t-> <x:t-x:n-values"> <x:p-x:n-valuestring" /> <x:va-x:n-bstring"> <x:c-> <x:wh- test="contains($valuestring,\',\')"><x:v-x:s-substring-after(substring-before($valuestring,\',\'),\':\')" /></x:wh-> <x:o-><x:v-x:s-substring-after($valuestring,\':\')" /></x:o-> </x:c-> </x:va-> <ntb:e> <x:a-x:n-a"><x:v-x:s-substring-before($valuestring,\':\')" /></x:a-> <x:a-x:n-b"><x:v-x:s-$bstring" /></x:a-> </ntb:e> <xsl:if test="contains($valuestring,\',\')"> <x:ct-x:n-values"> <x:w-x:n-valuestring"x:s-substring-after($valuestring,\',\')" /> </x:ct-> </xsl:if> </x:t-> </xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.declarationConverterXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_declarationConverterXslProc));

var temp_ntb_frameCssXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:ntb="http://www.nitobi.com" xmlns:user="http://mycompany.com/mynamespace" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-IE"x:s-\'false\'"/><x:p-x:n-useBorders"x:s-\'false\'"/><x:va-x:n-g"x:s-//ntb:treegrid"></x:va-><x:va-x:n-u"x:s-//state/@uniqueID"></x:va-><xsl:keyx:n-style" match="//s" use="@k" /><x:t- match = "/"> <x:va-x:n-t"x:s-$g/@Theme"></x:va-> <x:va-x:n-showvscroll"><x:c-><x:wh- test="($g/@VScrollbarEnabled=\'true\' or $g/@VScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showhscroll"><x:c-><x:wh- test="($g/@HScrollbarEnabled=\'true\' or $g/@HScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showtoolbar"><x:c-><x:wh- test="($g/@ToolbarEnabled=\'true\' or $g/@ToolbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-scrollerHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@ToolbarHeight)*$showtoolbar)" /> <x:va-x:n-scrollerWidth"x:s-number($g/@Width)-(number($g/@scrollbarWidth)*number($g/@VScrollbarEnabled))" /> <x:va-x:n-midHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@ToolbarHeight)*$showtoolbar)-number($g/@top)"/> <x:va-x:n-rowHeight"><x:c-><x:wh- test="$useBorders=\'true\'"><x:v-x:s-number($g/@RowHeight) - number($g/@CellBorderY)"/></x:wh-><x:o-><x:v-x:s-$g/@RowHeight"/></x:o-></x:c-></x:va-> #grid<x:v-x:s-$u" /> { height:<x:v-x:s-$g/@Height" />px; width:<x:v-x:s-$g/@Width" />px; overflow:hidden;text-align:left; <xsl:if test="$IE=\'true\'"> position:relative; </xsl:if> } .vScrollbarRange<x:v-x:s-$u" /> {} .ntb-grid-datablock, .ntb-grid-headerblock { table-layout:fixed; <xsl:if test="$IE=\'true\'"> width:0px; </xsl:if> } .<x:v-x:s-$t"/> .ntb-cell {overflow:hidden;white-space:nowrap;} .<x:v-x:s-$t"/> .ntb-cell-border {overflow:hidden;white-space:nowrap;<xsl:if test="$IE=\'true\'">height:auto;</xsl:if>} .ntb-grid-headershow<x:v-x:s-$u" /> {padding:0px;<xsl:if test="not($g/@ColumnIndicatorsEnabled=1)">display:none;</xsl:if>} .ntb-grid-vscrollshow<x:v-x:s-$u" /> {padding:0px;<xsl:if test="not($g/@VScrollbarEnabled=1)">display:none;</xsl:if>} #ntb-grid-hscrollshow<x:v-x:s-$u" /> {padding:0px;<xsl:if test="not($g/@HScrollbarEnabled=1)">display:none;</xsl:if>} .ntb-grid-toolbarshow<x:v-x:s-$u" /> {<xsl:if test="not($g/@ToolbarEnabled=1) and not($g/@ToolbarEnabled=\'true\')">display:none;</xsl:if>} .ntb-grid-height<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@Height" />px;overflow:hidden;} .ntb-grid-width<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@Width" />px;overflow:hidden;} .ntb-grid-overlay<x:v-x:s-$u" /> {position:relative;z-index:1000;top:0px;left:0px;} .ntb-grid-scroller<x:v-x:s-$u" /> { overflow:hidden; text-align:left; -moz-user-select: none; -khtml-user-select: none; user-select: none; } .ntb-grid-scrollerwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$scrollerWidth"/>px;} .ntb-grid-topheight<x:v-x:s-$u" /> {overflow:hidden;<xsl:if test="$g/@top=0">display:none;</xsl:if>} .ntb-grid-leftwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@left" />px;overflow:hidden;text-align:left;} .ntb-grid-centerwidth<x:v-x:s-$u" />-0 {width:<x:v-x:s-number($g/@Width)-number($g/@left)-(number($g/@scrollbarWidth)*$showvscroll)" />px;} .ntb-grid-scrollbarheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@scrollbarHeight" />px;} .ntb-grid-scrollbarwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@scrollbarWidth" />px;} .ntb-grid-toolbarheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@ToolbarHeight" />px;} .ntb-grid-surfaceheight<x:v-x:s-$u" /> {height:100px;} .ntb-grid {padding:0px;margin:0px;border:1px solid #cccccc} .ntb-scroller {padding:0px;} .ntb-scrollcorner {padding:0px;} .ntb-input-border { table-layout:fixed; overflow:hidden; position:absolute; z-index:2000; top:-2000px; left:-2000px; } .ntb-column-resize-surface { filter:alpha(opacity=1); background-color:white; position:absolute; display:none; top:-1000px; left:-5000px; width:100px; height:100px; z-index:800; } .<x:v-x:s-$t"/> .ntb-column-indicator { overflow:hidden; white-space: nowrap; } .ntb-row<x:v-x:s-$u" /> {height:<x:v-x:s-$rowHeight" />px;line-height:<x:v-x:s-$rowHeight" />px;margin:0px;} .ntb-header-row<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@HeaderHeight" />px;} <x:at-x:s-//ntb:columns" /></x:t-><x:t-x:n-get-pane-width"> <x:p-x:n-column-id"/> <x:p-x:n-start-column"/> <x:p-x:n-end-column"/> <x:p-x:n-current-width"/> <x:c-> <x:wh- test="$start-column &lt;= $end-column"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-$start-column+1"/> <x:w-x:n-end-column"x:s-$end-column"/> <x:w-x:n-current-width"x:s-number($current-width) + number(//ntb:columns[@id=$column-id]/ntb:column[$start-column]/@Width)"/> <x:w-x:n-column-id"x:s-$column-id"/> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-$current-width"/> </x:o-> </x:c-></x:t-><x:t-x:n-get-depth"> <x:p-x:n-root-column-id"/> <x:p-x:n-current-column-id"/> <x:p-x:n-current-depth"/> <x:c-> <x:wh- test="$root-column-id != $current-column-id"> <x:ct-x:n-get-depth"> <x:w-x:n-current-column-id"x:s-//ntb:columns/ntb:column[@ChildColumnSet=$current-column-id and @type=\'EXPAND\']/../@id"/> <x:w-x:n-root-column-id"x:s-$root-column-id"/> <x:w-x:n-current-depth"x:s-number($current-depth) + 1"/> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-$current-depth"/> </x:o-> </x:c-></x:t-><x:t- match="ntb:columns"> <x:va-x:n-showvscroll"><x:c-><x:wh- test="($g/@VScrollbarEnabled=\'true\' or $g/@VScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showhscroll"><x:c-><x:wh- test="($g/@HScrollbarEnabled=\'true\' or $g/@HScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showtoolbar"><x:c-><x:wh- test="($g/@ToolbarEnabled=\'true\' or $g/@ToolbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-scrollerHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@ToolbarHeight)*$showtoolbar)" /> <x:va-x:n-scrollerWidth"x:s-number($g/@Width)-(number($g/@scrollbarWidth)*number($g/@VScrollbarEnabled))" /> <x:va-x:n-midHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@ToolbarHeight)*$showtoolbar)-number($g/@top)"/> <x:va-x:n-frozen-columns-width"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-number(1)"/> <x:w-x:n-end-column"x:s-number($g/@FrozenLeftColumnCount)"/> <x:w-x:n-current-width"x:s-number(0)"/> <x:w-x:n-column-id"x:s-@id"/> </x:ct-> </x:va-> <x:va-x:n-unfrozen-columns-width"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-number($g/@FrozenLeftColumnCount)+1"/> <x:w-x:n-end-column"x:s-count(*)"/> <x:w-x:n-current-width"x:s-number(0)"/> <x:w-x:n-column-id"x:s-@id"/> </x:ct-> </x:va-> <x:va-x:n-depth"> <x:ct-x:n-get-depth"> <x:w-x:n-root-column-id"x:s-$g/@RootColumns"/> <x:w-x:n-current-column-id"x:s-@id"/> <x:w-x:n-current-depth"x:s-number(0)"/> </x:ct-> </x:va-> <x:va-x:n-total-columns-width"> <x:v-x:s-number($frozen-columns-width) + number($unfrozen-columns-width)"/> </x:va-> <x:va-x:n-id"><x:v-x:s-@id"/></x:va-> .ntb-grid-midheight<x:v-x:s-$u" />-0 {overflow:hidden;height:<x:c-><x:wh- test="($total-columns-width &gt; $g/@Width)"><x:v-x:s-$midHeight"/></x:wh-><x:o-><x:v-x:s-number($midHeight) + number($g/@scrollbarHeight)"/></x:o-></x:c->px;} <xsl:if test="$id = $g/@RootColumns"> .ntb-grid-scrollerheight<x:v-x:s-$u" /> {height: <x:c-><x:wh- test="($total-columns-width &gt; $g/@Width)"><x:v-x:s-$scrollerHeight"/></x:wh-><x:o-><x:v-x:s-number($scrollerHeight) + number($g/@scrollbarHeight)"/></x:o-></x:c->px;} </xsl:if> .hScrollbarRange<x:v-x:s-$u" /> { width:<x:v-x:s-$total-columns-width"/>px; } <x:c-> <x:wh- test="$id = $g/@RootColumns"> .ntb-grid-surfacewidth<x:v-x:s-$u" />-<x:v-x:s-@id"/> {width:<x:v-x:s-number($g/@ViewableWidth)"/>px;} </x:wh-> <x:o-> .ntb-grid-surfacewidth<x:v-x:s-$u" />-<x:v-x:s-@id"/> {width:<x:v-x:s-number($g/@ViewableWidth)-(number($depth) * number($g/@GroupOffset)) - (number($depth) + 1)"/>px;} </x:o-> </x:c-> <xsl:for-eachx:s-*"> <x:va-x:n-p"><x:v-x:s-position()"/></x:va-> <x:va-x:n-w"><x:v-x:s-@Width"/></x:va-> #grid<x:v-x:s-$u" /> .ntb-column<x:v-x:s-$u" /><xsl:if test="$id!=&quot;&quot;">_<x:v-x:s-$id"/></xsl:if>_<xsl:number value="$p" /> {width:<x:v-x:s-number($w)-number($g/@CellBorder)" />px;} #grid<x:v-x:s-$u" /> .ntb-column-data<x:v-x:s-$u" />_<xsl:number value="$p" /> {text-align:<x:v-x:s-@Align"/>;} </xsl:for-each></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.frameCssXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_frameCssXslProc));

var temp_ntb_frameXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:ntb="http://www.nitobi.com" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-browser"x:s-\'IE\'"/><x:p-x:n-scrollbarWidth"x:s-17" /><x:t- match = "/"><x:va-x:n-u"x:s-state/@uniqueID" /><x:va-x:n-Id"x:s-state/@ID" /><x:va-x:n-resizeEnabled"x:s-//ntb:treegrid/@GridResizeEnabled" /><x:va-x:n-offset"> <x:c-> <x:wh- test="$browser=\'IE\'">1</x:wh-> <x:o->0</x:o-> </x:c-></x:va-> &lt;div id="grid<x:v-x:s-$u" />" class="ntb-grid ntb-grid-reset <x:v-x:s-//ntb:treegrid/@Theme" />" style="overflow:visible;"&gt; &lt;div style="height:0px;width:0px;position:relative;"&gt; &lt;div id="ntb-grid-overlay<x:v-x:s-$u" />" class="ntb-grid-overlay<x:v-x:s-$u" />"&gt;&lt;/div&gt; <!-- Firefox or IE just uses a hidden div for keynav since on Mac at least it doesn\'t capture the paste event on an input --> <xsl:if test="not($browser=\'SAFARI\')">&lt;div id="ntb-grid-keynav<x:v-x:s-$u" />" tabindex="1" style="position:absolute;left:-3000px;width:1px;height:1px;border:0px;background-color:transparent;"&gt;&lt;/div&gt;</xsl:if> <!-- Safari can\'t capture key events on divs so need to use an input --> <xsl:if test="$browser=\'SAFARI\'">&lt;input type="text" id="ntb-grid-keynav<x:v-x:s-$u" />" tabindex="1" style="position:absolute;left:-3000px;width:1px;height:1px;border:0px;background-color:transparent;"&gt;&lt;/input&gt;</xsl:if> &lt;/div&gt; &lt;table cellpadding="0" cellspacing="0" border="0" &gt; &lt;tr&gt; &lt;td id="ntb-grid-scroller<x:v-x:s-$u" />" class="ntb-grid-scrollerheight<x:v-x:s-$u" /> ntb-grid-scrollerwidth<x:v-x:s-$u" />" &gt; &lt;div id="ntb-grid-scrollerarea<x:v-x:s-$u" />" class="ntb-grid-scrollerheight<x:v-x:s-$u" />" style="overflow:hidden;" &gt; &lt;div tabindex="2" id="ntb-grid-surface-container-<x:v-x:s-$u" />" class="ntb-grid-scroller<x:v-x:s-$u" /> ntb-grid-scrollerheight<x:v-x:s-$u" />" &gt; <!-- The contents of this div will be filled in by surfaceXsl.xslt --> &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td id="ntb-grid-vscrollshow<x:v-x:s-$u" />" class="ntb-grid-scrollerheight<x:v-x:s-$u" />"&gt;&lt;div id="vscrollclip<x:v-x:s-$u" />" class="ntb-grid-scrollerheight<x:v-x:s-$u" /> ntb-grid-scrollbarwidth<x:v-x:s-$u"/> ntb-scrollbar" style="overflow:hidden;" &gt;&lt;div id="vscroll<x:v-x:s-$u" />" class="ntb-scrollbar" style="height:100%;width:<x:v-x:s-number($offset)+number(//ntb:treegrid/@scrollbarWidth)"/>px;position:relative;top:0px;left:-<x:v-x:s-$offset"/>px;overflow-x:hidden;overflow-y:scroll;" &gt;&lt;div class="vScrollbarRange<x:v-x:s-$u" />" style="WIDTH:1px;overflow:hidden;"&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt; &lt;/tr&gt; &lt;tr id="ntb-grid-hscrollshow<x:v-x:s-$u" />" &gt; &lt;td &gt;&lt;div id="hscrollclip<x:v-x:s-$u" />" class="ntb-grid-scrollbarheight<x:v-x:s-$u" /> ntb-grid-scrollerwidth<x:v-x:s-$u" /> ntb-hscrollbar" style="overflow:hidden;" &gt; &lt;div id="hscroll<x:v-x:s-$u" />" class="ntb-grid-scrollbarheight<x:v-x:s-$u" /> ntb-grid-scrollerwidth<x:v-x:s-$u" /> ntb-scrollbar" style="overflow-x:scroll;overflow-y:hidden;height:<x:v-x:s-number($offset)+number(//ntb:treegrid/@scrollbarHeight)"/>px;position:relative;top:-<x:v-x:s-$offset"/>px;left:0px;" &gt; &lt;div class="hScrollbarRange<x:v-x:s-$u" />" style="HEIGHT:1px;overflow:hidden;"&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-grid-vscrollshow<x:v-x:s-$u" /> ntb-scrollcorner" &gt;&lt;/td&gt; &lt;/tr&gt; &lt;/table&gt; &lt;div id="toolbarContainer<x:v-x:s-$u" />" style="overflow:hidden;" class="ntb-grid-toolbarshow<x:v-x:s-$u" /> ntb-grid-toolbarheight<x:v-x:s-$u" /> ntb-grid-width<x:v-x:s-$u" /> ntb-toolbar"&gt;&lt;/div&gt; &lt;div id="ntb-grid-toolscontainer<x:v-x:s-$u"/>" style="height:0px;"&gt; <!-- In IE quirks the textarea has a forced height so need it to have a relative positioned container --> &lt;div style="position:relative;overflow:hidden;height:0px;"&gt; &lt;textarea id="ntb-clipboard<x:v-x:s-$u"/>" class="ntb-clipboard" &gt;&lt;/textarea&gt; &lt;/div&gt; &lt;div id="ntb-column-resizeline<x:v-x:s-$u" />" class="ntb-column-resizeline"&gt;&lt;/div&gt; &lt;div id="ntb-grid-resizebox<x:v-x:s-$u" />" class="ntb-grid-resizebox"&gt;&lt;/div&gt; &lt;/div&gt; <xsl:if test="$resizeEnabled = 1"> &lt;div id="ntb-grid-resizecontainer<x:v-x:s-$u"/>" style="height:0px;position:relative;"&gt; &lt;div id="ntb-grid-resizeright<x:v-x:s-$u" />" class="ntb-resize-indicator-right"&gt;&lt;/div&gt; &lt;div id="ntb-grid-resizebottom<x:v-x:s-$u" />" class="ntb-resize-indicator-bottom"&gt;&lt;/div&gt; &lt;/div&gt; </xsl:if> &lt;/div&gt;</x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.frameXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_frameXslProc));

var temp_ntb_listboxXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes"/> <x:p-x:n-size"></x:p-> <x:p-x:n-DisplayFields"x:s-\'\'"></x:p-> <x:p-x:n-ValueField"x:s-\'\'"></x:p-> <x:p-x:n-val"x:s-\'\'"></x:p-> <x:t- match="/"> <!--<x:va-x:n-cell"x:s-/root/metadata/r[@xi=$row]/*[@xi=$col]"></x:va->--> <select id="ntb-listbox" class="ntb-input ntb-lookup-options"> <xsl:if test="$size"> <x:a-x:n-size">6</x:a-> </xsl:if> <!--<x:c-> <x:wh- test="$DatasourceId">--> <xsl:for-eachx:s-/ntb:datasource/ntb:data/*"> <xsl:sortx:s-@*[name(.)=substring-before($DisplayFields,\'|\')]" data-type="text" order="ascending" /> <option> <x:a-x:n-value"> <x:v-x:s-@*[name(.)=$ValueField]"></x:v-> </x:a-> <x:a-x:n-rn"> <x:v-x:s-position()"></x:v-> </x:a-> <xsl:if test="@*[name(.)=$ValueField and .=$val]"> <x:a-x:n-selected">true</x:a-> </xsl:if> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-$DisplayFields" /> </x:ct-> </option> </xsl:for-each> <!--</x:wh-> <x:o-> </x:o-> </x:c->--> </select> </x:t-> <x:t-x:n-print-displayfields"> <x:p-x:n-field" /> <x:c-> <x:wh- test="contains($field,\'|\')" > <!-- Here we hardcode a spacer \', \' - this should probably be moved elsewhere. --> <x:v-x:s-concat(@*[name(.)=substring-before($field,\'|\')],\', \')"></x:v-> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-substring-after($field,\'|\')" /> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-@*[name(.)=$field]"></x:v-> </x:o-> </x:c-> </x:t-> </xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.listboxXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_listboxXslProc));

var temp_ntb_mergeEbaXmlToLogXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes"/> <x:p-x:n-defaultAction"></x:p-> <x:p-x:n-startXid"x:s-100" ></x:p-> <xsl:keyx:n-newData" match="/ntb:treegrid/ntb:newdata/ntb:data/ntb:e" use="@xid" /> <xsl:keyx:n-oldData" match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data/ntb:e" use="@xid" /> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <xsl:if test="not(key(\'newData\',@xid))"> <xsl:copy> <xsl:copy-ofx:s-@*" /> </xsl:copy> </xsl:if> </x:t-> <x:t- match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data"> <xsl:copy> <x:at-x:s-@*|node()" /> <xsl:for-eachx:s-/ntb:treegrid/ntb:newdata/ntb:data/ntb:e"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <xsl:if test="$defaultAction"> <x:va-x:n-oldNode"x:s-key(\'oldData\',@xid)" /> <x:c-> <x:wh- test="$oldNode"> <x:va- name=\'xid\'x:s-@xid" /> <x:a-x:n-xac"><x:v-x:s-$oldNode/@xac" /></x:a-> </x:wh-> <x:o-> <x:a-x:n-xac"><x:v-x:s-$defaultAction" /></x:a-> </x:o-> </x:c-> </xsl:if> </xsl:copy> </xsl:for-each> </xsl:copy> </x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.mergeEbaXmlToLogXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_mergeEbaXmlToLogXslProc));

var temp_ntb_mergeEbaXmlXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="no" /> <x:p-x:n-startRowIndex"x:s-100" ></x:p-> <x:p-x:n-endRowIndex"x:s-200" ></x:p-> <x:p-x:n-guid"x:s-1"></x:p-> <xsl:keyx:n-newData" match="/ntb:treegrid/ntb:newdata/ntb:data/ntb:e" use="@xi" /> <xsl:keyx:n-oldData" match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data/ntb:e" use="@xi" /> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <x:c-> <x:wh- test="(number(@xi) &gt;= $startRowIndex) and (number(@xi) &lt;= $endRowIndex)"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <xsl:copy-ofx:s-key(\'newData\',@xi)/@*" /> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-> <x:t- match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data"> <xsl:copy> <x:at-x:s-@*|node()" /> <xsl:for-eachx:s-/ntb:treegrid/ntb:newdata/ntb:data/ntb:e"> <xsl:if test="not(key(\'oldData\',@xi))"> <xsl:elementx:n-ntb:e" namespace="http://www.nitobi.com"> <xsl:copy-ofx:s-@*" /> <x:a-x:n-xid"><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:element> </xsl:if> </xsl:for-each> </xsl:copy> </x:t-> <x:t- match="/ntb:treegrid/ntb:newdata/ntb:data/ntb:e"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <x:va-x:n-oldData"x:s-key(\'oldData\',@xi)"/> <x:c-> <x:wh- test="$oldData"> <xsl:copy-ofx:s-$oldData/@*" /> <xsl:copy-ofx:s-@*" /> <x:a-x:n-xac">u</x:a-> <xsl:if test="$oldData/@xac=\'i\'"> <x:a-x:n-xac">i</x:a-> </xsl:if> </x:wh-> <x:o-> <x:a-x:n-xid"><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> <x:a-x:n-xac">i</x:a-> </x:o-> </x:c-> </xsl:copy> </x:t-> </xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.mergeEbaXmlXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_mergeEbaXmlXslProc));

var temp_ntb_numberFormatTemplatesXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"> <!--http://www.w3schools.com/xsl/func_formatnumber.asp--><!-- <xsl:decimal-formatx:n-name" decimal-separator="char" grouping-separator="char" infinity="string" minus-sign="char" NaN="string" percent="char" per-mille="char" zero-digit="char" digit="char" pattern-separator="char"/> --><xsl:decimal-formatx:n-NA" decimal-separator="." grouping-separator="," /><xsl:decimal-formatx:n-EU" decimal-separator="," grouping-separator="." /><x:t-x:n-n:format"> <x:p-x:n-number"x:s-0" /> <x:p-x:n-mask"x:s-\'#.00\'" /> <x:p-x:n-group"x:s-\',\'" /> <x:p-x:n-decimal"x:s-\'.\'" /> <x:va-x:n-formattedNumber"> <x:c-> <x:wh- test="$group=\'.\' and $decimal=\',\'"> <x:v-x:s-format-number($number, $mask, \'EU\')" /> </x:wh-> <x:o-> <x:v-x:s-format-number($number, $mask, \'NA\')" /> </x:o-> </x:c-> </x:va-> <xsl:if test="not(string($formattedNumber) = \'NaN\')"> <x:v-x:s-$formattedNumber" /> </xsl:if></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.numberFormatTemplatesXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_numberFormatTemplatesXslProc));

var temp_ntb_numberXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"><xsl:output method="text" version="4.0" omit-xml-declaration="yes" /><x:p-x:n-number"x:s-0" /><x:p-x:n-mask"x:s-\'#.00\'" /><x:p-x:n-group"x:s-\',\'" /><x:p-x:n-decimal"x:s-\'.\'" /> <!--http://www.w3schools.com/xsl/func_formatnumber.asp--><!-- <xsl:decimal-formatx:n-name" decimal-separator="char" grouping-separator="char" infinity="string" minus-sign="char" NaN="string" percent="char" per-mille="char" zero-digit="char" digit="char" pattern-separator="char"/> --><xsl:decimal-formatx:n-NA" decimal-separator="." grouping-separator="," /><xsl:decimal-formatx:n-EU" decimal-separator="," grouping-separator="." /><x:t-x:n-n:format"> <x:p-x:n-number"x:s-0" /> <x:p-x:n-mask"x:s-\'#.00\'" /> <x:p-x:n-group"x:s-\',\'" /> <x:p-x:n-decimal"x:s-\'.\'" /> <x:va-x:n-formattedNumber"> <x:c-> <x:wh- test="$group=\'.\' and $decimal=\',\'"> <x:v-x:s-format-number($number, $mask, \'EU\')" /> </x:wh-> <x:o-> <x:v-x:s-format-number($number, $mask, \'NA\')" /> </x:o-> </x:c-> </x:va-> <xsl:if test="not(string($formattedNumber) = \'NaN\')"> <x:v-x:s-$formattedNumber" /> </xsl:if></x:t-><x:t- match="/"> <x:ct-x:n-n:format"> <x:w-x:n-number"x:s-$number" /> <x:w-x:n-mask"x:s-$mask" /> <x:w-x:n-group"x:s-$group" /> <x:w-x:n-decimal"x:s-$decimal" /> </x:ct-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.numberXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_numberXslProc));

var temp_ntb_rowXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"><xsl:output method="xml" omit-xml-declaration="yes"/> <x:p-x:n-showHeaders"x:s-\'0\'" /><x:p-x:n-firstColumn"x:s-\'0\'" /><x:p-x:n-lastColumn"x:s-\'0\'" /><x:p-x:n-uniqueId"x:s-\'0\'" /><x:p-x:n-rowHover"x:s-\'0\'" /><x:p-x:n-frozenColumnId"x:s-\'\'" /><x:p-x:n-start" /><x:p-x:n-end" /><x:p-x:n-activeColumn"x:s-\'0\'" /><x:p-x:n-activeRow"x:s-\'0\'" /><x:p-x:n-sortColumn"x:s-\'0\'" /><x:p-x:n-sortDirection"x:s-\'Asc\'" /><x:p-x:n-dataTableId"x:s-\'_default\'" /><x:p-x:n-columnSet"x:s-\'_default\'"/><x:p-x:n-columns"x:s-/ntb:root/ntb:columns/*/*" /><x:p-x:n-columnsId"x:s-/ntb:root/ntb:columns/ntb:columns/@id" /><x:p-x:n-surfaceKey"x:s-\'\'"/><xsl:keyx:n-data-source" match="//ntb:datasources/ntb:datasource" use="@id" /><xsl:keyx:n-group" match="ntb:e" use="@a" /><!-- <xsl:for-eachx:s-ntb:e[count(. | key(\'group\', @a)[1]) = 1]"> <xsl:sortx:s-@a" /> <x:v-x:s-@a" />,<br /> <xsl:for-eachx:s-key(\'group\', @a)"> <xsl:sortx:s-@b" /> <x:v-x:s-@b" /> (<x:v-x:s-@c" />)<br /> </xsl:for-each> </xsl:for-each>--><!--This is an incude for the date fromatting XSLT that gets replaced at compile time--> <!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --><d:ms> <d:m i="1" l="31" a="Jan">January</d:m> <d:m i="2" l="28" a="Feb">February</d:m> <d:m i="3" l="31" a="Mar">March</d:m> <d:m i="4" l="30" a="Apr">April</d:m> <d:m i="5" l="31" a="May">May</d:m> <d:m i="6" l="30" a="Jun">June</d:m> <d:m i="7" l="31" a="Jul">July</d:m> <d:m i="8" l="31" a="Aug">August</d:m> <d:m i="9" l="30" a="Sep">September</d:m> <d:m i="10" l="31" a="Oct">October</d:m> <d:m i="11" l="30" a="Nov">November</d:m> <d:m i="12" l="31" a="Dec">December</d:m></d:ms><d:ds> <d:d a="Sun">Sunday</d:d> <d:d a="Mon">Monday</d:d> <d:d a="Tue">Tuesday</d:d> <d:d a="Wed">Wednesday</d:d> <d:d a="Thu">Thursday</d:d> <d:d a="Fri">Friday</d:d> <d:d a="Sat">Saturday</d:d></d:ds><x:t-x:n-d:format-date"> <x:p-x:n-date-time" /> <x:p-x:n-mask"x:s-\'MMM d, yy\'"/> <x:p-x:n-date-year" /> <x:va-x:n-formatted"> <x:va-x:n-date-time-length"x:s-string-length($date-time)" /> <x:va-x:n-timezone"x:s-\'\'" /> <x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /> <x:va-x:n-dt-length"x:s-string-length($dt)" /> <x:c-> <x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"> <!--that means we just have a time--> <x:va-x:n-hour"x:s-substring($dt, 1, 2)" /> <x:va-x:n-min"x:s-substring($dt, 4, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 7)" /> <xsl:if test="$hour &lt;= 23 and $min &lt;= 59 and $sec &lt;= 60"> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-\'NaN\'" /> <x:w-x:n-month"x:s-\'NaN\'" /> <x:w-x:n-day"x:s-\'NaN\'" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </xsl:if> </x:wh-> <x:wh- test="substring($dt, 2, 1) = \'-\' or substring($dt, 3, 1) = \'-\'"> <x:c-> <x:wh- test="$dt-length = 5 or $dt-length = 6"> <!--D-MMM,DD-MMM--> <x:va-x:n-year"x:s-$date-year" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-after($dt,\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="$dt-length = 8 or $dt-length = 9"> <!--D-MMM-YY,DD-MMM-YY--> <x:va-x:n-year"x:s-concat(\'20\',substring-after(substring-after($dt,\'-\'),\'-\'))" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:o-> <!--D-MMM-YYYY,DD-MMM-YYYY--> <x:va-x:n-year"x:s-substring-after(substring-after($dt,\'-\'),\'-\')" /> <x:va-x:n-month"x:s-document(\'\')/*/d:ms/d:m[@a = substring-before(substring-after($dt,\'-\'),\'-\')]/@i" /> <x:va-x:n-day"x:s-substring-before($dt,\'-\')" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:o-> <!--($neg * -2)--> <x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /> <x:va-x:n-month"x:s-substring($dt, 6, 2)" /> <x:va-x:n-day"x:s-substring($dt, 9, 2)" /> <x:c-> <x:wh- test="$dt-length = 10"> <!--that means we just have a date--> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"> <!--that means we have a date + time--> <x:va-x:n-hour"x:s-substring($dt, 12, 2)" /> <x:va-x:n-min"x:s-substring($dt, 15, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 18)" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> </x:c-> </x:o-> </x:c-> </x:va-> <x:v-x:s-$formatted" /> </x:t-><x:t-x:n-d:_format-date"> <x:p-x:n-year" /> <x:p-x:n-month"x:s-1" /> <x:p-x:n-day"x:s-1" /> <x:p-x:n-hour"x:s-0" /> <x:p-x:n-minute"x:s-0" /> <x:p-x:n-second"x:s-0" /> <x:p-x:n-timezone"x:s-\'Z\'" /> <x:p-x:n-mask"x:s-\'\'" /> <x:va-x:n-char"x:s-substring($mask, 1, 1)" /> <x:c-> <x:wh- test="not($mask)" /> <!--replaced escaping with \' here/--> <x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"> <x:v-x:s-$char" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, 2)" /> </x:ct-> </x:wh-> <x:o-> <x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /> <x:va-x:n-mask-length"> <x:c-> <x:wh- test="$next-different-char"> <x:v-x:s-string-length(substring-before($mask, $next-different-char))" /> </x:wh-> <x:o-> <x:v-x:s-string-length($mask)" /> </x:o-> </x:c-> </x:va-> <x:c-> <!--took our the era designator--> <x:wh- test="$char = \'M\'"> <x:c-> <x:wh- test="$mask-length >= 3"> <x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$month-node" /> </x:wh-> <x:o-> <x:v-x:s-$month-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$mask-length = 2"> <x:v-x:s-format-number($month, \'00\')" /> </x:wh-> <x:o-> <x:v-x:s-$month" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'E\'"> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:va-x:n-y-1"x:s-$year - 1" /> <x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /> <x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$day-node" /> </x:wh-> <x:o-> <x:v-x:s-$day-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'a\'"> <x:c-> <x:wh- test="$hour >= 12">PM</x:wh-> <x:o->AM</x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'z\'"> <x:c-> <x:wh- test="$timezone = \'Z\'">UTC</x:wh-> <x:o->UTC<x:v-x:s-$timezone" /></x:o-> </x:c-> </x:wh-> <x:o-> <x:va-x:n-padding"x:s-\'00\'" /> <!--removed padding--> <x:c-> <x:wh- test="$char = \'y\'"> <x:c-> <x:wh- test="$mask-length &gt; 2"><x:v-x:s-format-number($year, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'d\'"> <x:v-x:s-format-number($day, $padding)" /> </x:wh-> <x:wh- test="$char = \'h\'"> <x:va-x:n-h"x:s-$hour mod 12" /> <x:c-> <x:wh- test="$h"><x:v-x:s-format-number($h, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(12, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'H\'"> <x:v-x:s-format-number($hour, $padding)" /> </x:wh-> <x:wh- test="$char = \'k\'"> <x:c-> <x:wh- test="$hour"><x:v-x:s-format-number($hour, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(24, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'K\'"> <x:v-x:s-format-number($hour mod 12, $padding)" /> </x:wh-> <x:wh- test="$char = \'m\'"> <x:v-x:s-format-number($minute, $padding)" /> </x:wh-> <x:wh- test="$char = \'s\'"> <x:v-x:s-format-number($second, $padding)" /> </x:wh-> <x:wh- test="$char = \'S\'"> <x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /> </x:wh-> <x:wh- test="$char = \'F\'"> <x:v-x:s-floor($day div 7) + 1" /> </x:wh-> <x:o-> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:v-x:s-format-number($days, $padding)" /> <!--removed week in year--> <!--removed week in month--> </x:o-> </x:c-> </x:o-> </x:c-> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /> </x:ct-> </x:o-> </x:c-></x:t-><!--This is an incude for the number fromatting XSLT that gets replaced at compile time--> <!--http://www.w3schools.com/xsl/func_formatnumber.asp--><!-- <xsl:decimal-formatx:n-name" decimal-separator="char" grouping-separator="char" infinity="string" minus-sign="char" NaN="string" percent="char" per-mille="char" zero-digit="char" digit="char" pattern-separator="char"/> --><xsl:decimal-formatx:n-NA" decimal-separator="." grouping-separator="," /><xsl:decimal-formatx:n-EU" decimal-separator="," grouping-separator="." /><x:t-x:n-n:format"> <x:p-x:n-number"x:s-0" /> <x:p-x:n-mask"x:s-\'#.00\'" /> <x:p-x:n-group"x:s-\',\'" /> <x:p-x:n-decimal"x:s-\'.\'" /> <x:va-x:n-formattedNumber"> <x:c-> <x:wh- test="$group=\'.\' and $decimal=\',\'"> <x:v-x:s-format-number($number, $mask, \'EU\')" /> </x:wh-> <x:o-> <x:v-x:s-format-number($number, $mask, \'NA\')" /> </x:o-> </x:c-> </x:va-> <xsl:if test="not(string($formattedNumber) = \'NaN\')"> <x:v-x:s-$formattedNumber" /> </xsl:if></x:t-><x:t- match = "/"> <div> <x:c-> <x:wh- test="$showHeaders = 1"> <table cellpadding="0" cellspacing="0" border="0" class="ntb-grid-headerblock"> <tr> <x:a-x:n-class">ntb-header-row<x:v-x:s-$uniqueId" /></x:a-> <xsl:for-eachx:s-$columns"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> <td ebatype="columnheader" xi="{position()-1}" col="{position()-1}"> <x:a-x:n-id">columnheader_<x:v-x:s-position()-1"/>_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/></x:a-> <x:a-x:n-path"><x:v-x:s-$surfaceKey"></x:v-></x:a-> <x:a-x:n-onmouseover">$(\'grid<x:v-x:s-$uniqueId" />\').jsObject.handleHeaderMouseOver(this);</x:a-> <x:a-x:n-onmouseout">$(\'grid<x:v-x:s-$uniqueId" />\').jsObject.handleHeaderMouseOut(this);</x:a-> <!-- note that the ntb-columnUID_POSITION class is for a safari bug --> <x:a-x:n-class">ntb-column-indicator-border<x:c-><x:wh- test="$sortColumn=position()-1 and $sortDirection=\'Asc\'">ascending</x:wh-><x:wh- test="$sortColumn=position()-1 and $sortDirection=\'Desc\'">descending</x:wh-><x:o-></x:o-></x:c-><xsl:text> </xsl:text>ntb-column<x:v-x:s-$uniqueId"/><xsl:if test="$columnsId">_<x:v-x:s-$columnsId"/></xsl:if>_<x:v-x:s-position()" /></x:a-> <div class="ntb-column-indicator"> <x:c-> <x:wh- test="@Label and not(@Label = \'\') and not(@Label = \' \')"><x:v-x:s-@Label" /></x:wh-> <x:wh- test="ntb:label and not(ntb:label = \'\') and not(ntb:label = \' \')"><x:v-x:s-ntb:label" /></x:wh-> <x:o->ATOKENTOREPLACE</x:o-> </x:c-> </div> </td> </xsl:if> </xsl:for-each> </tr> <x:ct-x:n-colgroup" /> </table> </x:wh-> <x:o-> <table cellpadding="0" cellspacing="0" border="0" class="ntb-grid-datablock"> <x:at-x:s-key(\'data-source\', $dataTableId)/ntb:data/ntb:e[@xi &gt;= $start and @xi &lt; $end]" > <xsl:sortx:s-@xi" data-type="number" /> </x:at-> <x:ct-x:n-colgroup" /> </table> </x:o-> </x:c-> </div></x:t-><x:t-x:n-colgroup"> <colgroup> <xsl:for-eachx:s-$columns"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> <col> <x:a-x:n-class">ntb-column<x:v-x:s-$uniqueId"/><xsl:if test="$columnsId">_<x:v-x:s-$columnsId"/></xsl:if>_<x:v-x:s-position()" /><xsl:text> </xsl:text><xsl:if test="not(@Editable=\'1\')">ntb-column-readonly</xsl:if></x:a-> </col> </xsl:if> </xsl:for-each> </colgroup></x:t-><x:t- match="ntb:e"> <x:va-x:n-rowClass"> <xsl:if test="@xi mod 2 = 0">ntb-row-alternate</xsl:if> <!-- <xsl:if test="<x:v-x:s-@rowselectattr=1"/>">ebarowselected</xsl:if> --> </x:va-> <x:va-x:n-xi"x:s-@xi" /> <x:va-x:n-row"x:s-." /> <tr class="ntb-row {$rowClass} ntb-row{$uniqueId}" xi="{$xi}" path="{$surfaceKey}"> <x:a-x:n-id">row_<x:v-x:s-$surfaceKey" />_<x:v-x:s-$xi" /><x:v-x:s-$frozenColumnId"/>_<x:v-x:s-$uniqueId" /></x:a-> <xsl:for-eachx:s-$columns"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> <x:ct-x:n-render-cell"> <x:w-x:n-row"x:s-$row"/> <x:w-x:n-xi"x:s-$xi"/> </x:ct-> </xsl:if> </xsl:for-each> </tr></x:t-> <x:t-x:n-render-cell"> <x:p-x:n-row" /> <x:p-x:n-xi" /> <x:va-x:n-xdatafld"x:s-substring-after(@xdatafld,\'@\')"/> <x:va-x:n-pos"x:s-position()-1"/> <x:va-x:n-value"><x:c-><x:wh- test="not(@xdatafld = \'\')"><x:v-x:s-$row/@*[name()=$xdatafld]" /></x:wh-><!-- @Value will actuall have some escaped XSLT in it like any other bound property --><x:o-><x:v-x:s-@Value" /></x:o-></x:c-></x:va-> <td id="cell_{$xi}_{$pos}_{$uniqueId}_{$surfaceKey}" style="vertical-align:middle;" xi="{$xi}" col="{$pos}" path="{$surfaceKey}"> <x:a-x:n-style"><x:ct-x:n-CssStyle"><x:w-x:n-row"x:s-$row"/></x:ct-></x:a-> <!-- note the use of the ntb-column<x:v-x:s-$uniqueId"/>_<x:v-x:s-position()" /> class ... that is for a safari bug --> <x:a-x:n-class">ntb-cell-border<xsl:text> </xsl:text>ntb-column-data<x:v-x:s-$uniqueId"/>_<x:v-x:s-position()" /><xsl:text> </xsl:text>ntb-column-<x:c-><x:wh- test="$sortColumn=$pos and $sortDirection=\'Asc\'">ascending</x:wh-><x:wh- test="$sortColumn=$pos and $sortDirection=\'Desc\'">descending</x:wh-><x:o-></x:o-></x:c-><xsl:text> </xsl:text><x:c-><x:wh- test="@DataType = \'expand\'">ntb-column-collapsed</x:wh-><x:o->ntb-column-<x:v-x:s-@DataType"/></x:o-></x:c-><xsl:text> </xsl:text><x:ct-x:n-ClassName"><x:w-x:n-row"x:s-$row"/></x:ct-><xsl:text> </xsl:text><xsl:if test="@type = \'NUMBER\' and $value &lt; 0">ntb-cell-negativenumber</xsl:if>ntb-column<x:v-x:s-$uniqueId"/><xsl:if test="$columnsId">_<x:v-x:s-$columnsId"/></xsl:if>_<x:v-x:s-position()" /></x:a-> <x:c-> <x:wh- test="@type = \'EXPAND\'"> <x:a-x:n-ebatype">expander</x:a-> </x:wh-> <x:o-> <x:a-x:n-ebatype">cell</x:a-> </x:o-> </x:c-> <div style="overflow:hidden;white-space:nowrap;"> <x:a-x:n-class">ntb-row<x:v-x:s-$uniqueId"/><xsl:text> </xsl:text>ntb-column-data<x:v-x:s-$uniqueId"/>_<x:v-x:s-position()" /><xsl:text> </xsl:text>ntb-cell</x:a-> <xsl:if test="@TooltipsEnabled=\'1\'"> <x:a-x:n-title"> <x:v-x:s-$value"/> </x:a-> </xsl:if> <x:ct-x:n-render-value"> <x:w-x:n-value"x:s-$value"/> <x:w-x:n-mask"x:s-@Mask"/> <x:w-x:n-negativeMask"x:s-@NegativeMask"/> <x:w-x:n-groupseparator"x:s-@GroupingSeparator"/> <x:w-x:n-decimalseparator"x:s-@DecimalSeparator"/> <x:w-x:n-datasource"x:s-@DatasourceId"/> <x:w-x:n-valuefield"x:s-@ValueField"/> <x:w-x:n-displayfields"x:s-@DisplayFields"/> <x:w-x:n-checkedvalue"x:s-@CheckedValue"/> <x:w-x:n-imageurl"x:s-@ImageUrl"/> </x:ct-> </div> </td> </x:t-> <x:t-x:n-render-value"> <x:p-x:n-value" /> <x:p-x:n-mask" /> <x:p-x:n-negativeMask" /> <x:p-x:n-groupseparator" /> <x:p-x:n-decimalseparator" /> <x:p-x:n-datasource" /> <x:p-x:n-valuefield" /> <x:p-x:n-displayfields" /> <x:p-x:n-checkedvalue" /> <x:p-x:n-imageurl" /> <x:c-> <x:wh- test="@type = \'TEXT\' or @type = \'\'"> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </x:wh-> <x:wh- test="@type = \'NUMBER\'"> <x:va-x:n-number-mask"> <x:c-> <x:wh- test="$mask"><x:v-x:s-$mask" /></x:wh-> <x:o->#,###.00</x:o-> </x:c-> </x:va-> <x:va-x:n-negative-number-mask"> <x:c-> <x:wh- test="$negativeMask and not($negativeMask=\'\')"><x:v-x:s-$negativeMask" /></x:wh-> <x:o-><x:v-x:s-$number-mask" /></x:o-> </x:c-> </x:va-> <x:va-x:n-number"> <x:c-> <x:wh- test="$value &lt; 0"> <x:ct-x:n-n:format"> <x:w-x:n-number"x:s-translate($value,\'-\',\'\')" /> <x:w-x:n-mask"x:s-$negative-number-mask" /> <x:w-x:n-group"x:s-$groupseparator" /> <x:w-x:n-decimal"x:s-$decimalseparator" /> </x:ct-> </x:wh-> <x:o-> <x:ct-x:n-n:format"> <x:w-x:n-number"x:s-$value" /> <x:w-x:n-mask"x:s-$number-mask" /> <x:w-x:n-group"x:s-$groupseparator" /> <x:w-x:n-decimal"x:s-$decimalseparator" /> </x:ct-> </x:o-> </x:c-> </x:va-> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$number" /> </x:ct-> </x:wh-> <x:wh- test="@type = \'LOOKUP\'"> <x:c-> <x:wh- test="$valuefield = $displayfields"> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </x:wh-> <x:o-> <x:ct-x:n-replaceblank"> <x:w-x:n-value"> <x:c-> <x:wh- test="$datasource"> <x:va-x:n-preset-value" > <xsl:for-eachx:s-key(\'data-source\',$datasource)//*"> <xsl:if test="@*[name(.)=$valuefield and .=$value]"> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-$displayfields" /> </x:ct-> </xsl:if> </xsl:for-each> </x:va-> <x:c-> <x:wh- test="$preset-value=\'\'"> <x:v-x:s-$value"/> </x:wh-> <x:o-> <x:v-x:s-$preset-value"/> </x:o-> </x:c-> </x:wh-> <x:o-> <x:v-x:s-$value"/> </x:o-> </x:c-> </x:w-> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:wh- test="@type = \'LISTBOX\'"> <x:c-> <x:wh- test="$datasource"> <x:va-x:n-temp-value"> <xsl:for-eachx:s-key(\'data-source\',$datasource)//*"> <xsl:if test="@*[name(.)=$valuefield and .=$value]"> <x:ct-x:n-replaceblank"> <x:w-x:n-value"> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-$displayfields" /> </x:ct-> </x:w-> </x:ct-> </xsl:if> </xsl:for-each> </x:va-> <x:c-> <x:wh- test="not($temp-value = \'\')"> <x:v-x:s-$temp-value"/> </x:wh-> <x:o-> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:o-> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </x:o-> </x:c-> </x:wh-> <x:wh- test="@type = \'CHECKBOX\'"> <xsl:for-eachx:s-key(\'data-source\',$datasource)//*"> <xsl:if test="@*[name(.)=$valuefield and .=$value]"> <x:va-x:n-checkString"> <x:c-> <x:wh- test="$value=$checkedvalue">checked</x:wh-> <x:o->unchecked</x:o-> </x:c-> </x:va-> <div style="overflow:hidden;"> <div class="ntb-checkbox ntb-checkbox-{$checkString}" checked="{$value}" width="10" >ATOKENTOREPLACE</div> <div class="ntb-checkbox-text"><x:v-x:s-@*[name(.)=$displayfields]" /></div> </div> </xsl:if> </xsl:for-each> </x:wh-> <x:wh- test="@type = \'IMAGE\'"> <x:va-x:n-url"> <x:c-> <x:wh- test="$imageurl and not($imageurl=\'\')"><x:v-x:s-$imageurl" /></x:wh-> <x:o-><x:v-x:s-$value" /></x:o-> </x:c-> </x:va-> <!-- image editor --> <img border="0" src="{$url}" align="middle" class="ntb-image" /> </x:wh-> <x:wh- test="@type = \'DATE\'"> <x:va-x:n-date-mask"> <x:c-> <x:wh- test="$mask"><x:v-x:s-$mask" /></x:wh-> <x:o->MMM d, yy</x:o-> </x:c-> </x:va-> <x:va-x:n-date"> <x:ct-x:n-d:format-date"> <x:w-x:n-date-time"x:s-$value" /> <x:w-x:n-mask"x:s-$date-mask" /> </x:ct-> </x:va-> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$date" /> </x:ct-> </x:wh-> <x:wh- test="@type = \'TEXTAREA\'"> <x:ct-x:n-replace-break"> <x:w-x:n-text"> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </x:w-> </x:ct-> </x:wh-> <x:wh- test="@type = \'PASSWORD\'">*********</x:wh-> <x:wh- test="@type = \'LINK\'"> <span class="ntb-hyperlink-editor"> <x:ct-x:n-replaceblank"> <x:w-x:n-value"x:s-$value" /> </x:ct-> </span> </x:wh-> <x:wh- test="@type = \'EXPAND\'"> <x:a-x:n-style">height:1px;</x:a-> </x:wh-> <x:o-></x:o-> </x:c-> </x:t-><x:t-x:n-replaceblank"> <x:p-x:n-value" /> <x:c-> <x:wh- test="not($value) or $value = \'\' or $value = \' \'">ATOKENTOREPLACE</x:wh-> <x:o-><x:v-x:s-$value" /></x:o-> </x:c-></x:t-><x:t-x:n-replace"> <x:p-x:n-text"/> <x:p-x:n-search"/> <x:p-x:n-replacement"/> <x:c-> <x:wh- test="contains($text, $search)"> <x:v-x:s-substring-before($text, $search)"/> <x:v-x:s-$replacement"/> <x:ct-x:n-replace"> <x:w-x:n-text"x:s-substring-after($text,$search)"/> <x:w-x:n-search"x:s-$search"/> <x:w-x:n-replacement"x:s-$replacement"/> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-$text"/> </x:o-> </x:c-></x:t-><x:t-x:n-print-displayfields"> <x:p-x:n-field" /> <x:c-> <x:wh- test="contains($field,\'|\')" > <!-- Here we hardcode a spacer \', \' - this should probably be moved elsewhere. --> <x:v-x:s-concat(@*[name(.)=substring-before($field,\'|\')],\', \')" /> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-substring-after($field,\'|\')" /> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-@*[name(.)=$field]" /> </x:o-> </x:c-></x:t-><x:t-x:n-replace-break"> <x:p-x:n-text"/> <x:ct-x:n-replace"> <x:w-x:n-text"x:s-$text"/> <x:w-x:n-search"x:s-\'&amp;amp;#xa;\'"/> <x:w-x:n-replacement"x:s-\'&amp;lt;br/&amp;gt;\'"/> </x:ct-></x:t-><x:t-x:n-ClassName"> <x:p-x:n-row"/> <x:va-x:n-class"x:s-@ClassName"/> <x:va-x:n-value"x:s-$row/@*[name()=$class]"/> <x:c-> <x:wh- test="$value"><x:v-x:s-$value"/></x:wh-> <x:o-><x:v-x:s-$class"/></x:o-> </x:c-></x:t-><x:t-x:n-CssStyle"> <x:p-x:n-row"/> <x:va-x:n-style"x:s-@CssStyle"/> <x:va-x:n-value"x:s-$row/@*[name()=$style]"/> <x:c-> <x:wh- test="$value"><x:v-x:s-$value"/></x:wh-> <x:o-><x:v-x:s-$style"/></x:o-> </x:c-></x:t-><!--This can be used as an insertion point for column templates--> <!--COLUMN-TYPE-TEMPLATES--></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.rowXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_rowXslProc));

var temp_ntb_sortXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-column"x:s-@xi"> </x:p-> <x:p-x:n-dir"x:s-\'ascending\'"> </x:p-> <x:p-x:n-type"x:s-\'text\'"> </x:p-> <x:t- match="*|@*"> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="ntb:data"> <xsl:copy> <x:at-x:s-@*"/> <xsl:for-eachx:s-ntb:e"> <xsl:sortx:s-@*[name() =$column]" order="{$dir}" data-type="{$type}"/> <xsl:copy> <x:a-x:n-xi"> <x:v-x:s-position()-1" /> </x:a-> <x:at-x:s-@*" /> </xsl:copy> </xsl:for-each> </xsl:copy> </x:t-><x:t- match="@xi" /></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.sortXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_sortXslProc));

var temp_ntb_fillColumnXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="no" /> <x:p-x:n-startRowIndex"x:s-0" ></x:p-> <x:p-x:n-endRowIndex"x:s-10000" ></x:p-> <x:p-x:n-value"x:s-test"></x:p-> <x:p-x:n-column"x:s-a"></x:p-> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:treegrid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <x:c-> <x:wh- test="(number(@xi) &gt;= $startRowIndex) and (number(@xi) &lt;= $endRowIndex)"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <x:a-x:n-{$column}"><x:v-x:s-$value" /></x:a-> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.fillColumnXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_fillColumnXslProc));

var temp_ntb_updategramTranslatorXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes"/> <x:p-x:n-datasourceId"x:s-\'_default\'"></x:p-> <x:p-x:n-xkField" ></x:p-> <x:t- match="/"> <root> <x:at-x:s-//ntb:datasource[@id=$datasourceId]/ntb:data/ntb:e" /> </root> </x:t-> <x:t- match="ntb:e"> <x:c-> <x:wh- test="@xac=\'d\'"> <delete xi="{@xi}" xk="{@*[name() = $xkField]}"></delete> </x:wh-> <x:wh- test="@xac=\'i\'"> <insert><xsl:copy-ofx:s-@*[not(name() = $xkField) and not(name() = \'xac\')]" /><x:a-x:n-xk"><x:v-x:s-@*[name() = $xkField]" /></x:a-></insert> </x:wh-> <x:wh- test="@xac=\'u\'"> <update><xsl:copy-ofx:s-@*[not(name() = $xkField) and not(name() = \'xac\')]" /><x:a-x:n-xk"><x:v-x:s-@*[name() = $xkField]" /></x:a-></update> </x:wh-> </x:c-> </x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.updategramTranslatorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_updategramTranslatorXslProc));

var temp_ntb_surfaceXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:ntb="http://www.nitobi.com" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-IE"x:s-\'false\'"/><x:p-x:n-scrollbarWidth"x:s-17" /><x:p-x:n-isSubgroup"x:s-\'false\'" /><x:p-x:n-uniqueId" /><x:p-x:n-surfaceKey"x:s-0" /><x:p-x:n-columnsId" /><x:p-x:n-groupOffset"/><x:t- match = "/"> &lt;div id="<x:v-x:s-$surfaceKey"/>_surface<x:v-x:s-$uniqueId"/>" class="ntb-surface<xsl:if test="$isSubgroup=\'true\'"> nitobi-hide</xsl:if>" style="overflow:hidden;"> &lt;table cellpadding="0" cellspacing="0" border="0" <x:c-><x:wh- test="$isSubgroup=\'true\'">class="ntb-grid-subgroup" style="left:<x:v-x:s-$groupOffset"/>px;position:relative;"</x:wh-><x:o->class="ntb-grid-scroller"</x:o-></x:c->&gt; <!-- &lt;tr class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> " &gt; --> &lt;tr id="ntb-grid-header<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey" />" class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> "&gt; &lt;td class="ntb-scroller ntb-grid-topheight<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvp_0_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> ntb-grid-leftwidth<x:v-x:s-$uniqueId" />"&gt; &lt;div id="gridvpsurface_0_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt; &lt;div id="gridvpcontainer_0_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-scroller" &gt; &lt;div id="gridvp_1_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> ntb-grid-centerwidth<x:v-x:s-$uniqueId" />-<x:v-x:s-$surfaceKey" /> ntb-grid-header"&gt; &lt;div id="gridvpsurface_1_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-surfacewidth<x:v-x:s-$uniqueId" />-<x:v-x:s-$columnsId"/>" &gt; &lt;div id="gridvpcontainer_1_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;/tr&gt; <xsl:if test="$surfaceKey=0"> &lt;tr class="ntb-grid-subheader-container"&gt; &lt;td&gt; &lt;/td&gt; &lt;td&gt; &lt;div id="ntb-grid-subheader-container<x:v-x:s-$uniqueId"/>" class="ntb-grid-centerwidth<x:v-x:s-$uniqueId"/>-0" style="display:none;overflow: hidden; position: absolute; z-index: 100;"&gt;&lt;/div&gt; &lt;/td&gt; &lt;/tr&gt; </xsl:if> &lt;tr id="ntb-grid-data<x:v-x:s-$uniqueId" />" class="ntb-grid-scroller" &gt; <!-- &lt;tr class="ntb-grid-scroller" &gt; --> &lt;td class="ntb-scroller" &gt; &lt;div style="position:relative;"&gt; <!--&lt;div id="ntb-frozenshadow<x:v-x:s-$uniqueId" />" class="ntb-frozenshadow"&gt;&lt;/div&gt;--> &lt;div id="gridvp_2_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-midheight<x:v-x:s-$uniqueId" />-<x:v-x:s-$surfaceKey" /> ntb-grid-leftwidth<x:v-x:s-$uniqueId" />" style="position:relative;"&gt; &lt;div id="gridvpsurface_2_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt; &lt;div id="gridvpcontainer_2_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-scroller" &gt; &lt;div id="gridvp_3_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-midheight<x:v-x:s-$uniqueId"/>-<x:v-x:s-$surfaceKey" /> ntb-grid-centerwidth<x:v-x:s-$uniqueId" />-<x:v-x:s-$surfaceKey" />" style="position:relative;"&gt; &lt;div id="gridvpsurface_3_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" class="ntb-grid-surfacewidth<x:v-x:s-$uniqueId" />-<x:v-x:s-$columnsId"></x:v->" &gt; &lt;div id="gridvpcontainer_3_<x:v-x:s-$uniqueId" />_<x:v-x:s-$surfaceKey"/>" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;/tr&gt; &lt;/table&gt; &lt;/div&gt;</x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.surfaceXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_surfaceXslProc));


