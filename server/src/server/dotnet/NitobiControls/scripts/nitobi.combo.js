/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.Browser=function(){
};
nitobi.Browser.GetScrollBarWidth=nitobi.html.getScrollBarWidth;
nitobi.Browser.GetBrowserType=function(){
return (navigator.appName=="Microsoft Internet Explorer"?this.nitobi.Browser.IE:this.nitobi.Browser.UNKNOWN);
};
nitobi.Browser.GetBrowserDetails=function(){
return (this.GetBrowserType()==this.nitobi.Browser.IE?window.clientInformation:null);
};
nitobi.Browser.IsObjectInView=function(_1,_2,_3,_4){
var _5=nitobi.html.getBoundingClientRect(_1);
var _6=nitobi.html.getBoundingClientRect(_2);
if(nitobi.browser.MOZ){
_6.top+=_2.scrollTop;
_6.bottom+=_2.scrollTop;
_6.left+=_2.scrollLeft;
_6.right+=_2.scrollLeft;
}
var _7=((true==_3?(_5.top==_6.top):(_5.top>=_6.top)&&(_5.bottom<=_6.bottom))&&(_4?true:(_5.right<=_6.right)&&(_5.left>=_6.left)));
return _7;
};
nitobi.Browser.VAdjust=function(_8,_9){
var v=(_8.offsetParent?_8.offsetParent.offsetTop:0);
var id=_8.id;
var _c=id.substring(0,1+id.lastIndexOf("_"))+"0";
var _d=_9.ownerDocument;
if(null==_d){
_d=_9.document;
}
var oF=_d.getElementById(_c);
return v-(oF.offsetParent?oF.offsetParent.offsetTop:0);
};
nitobi.Browser.WheelUntil=function(_f,inc,_11,idx,_13,_14){
var min=(inc?-1:0);
var max=(inc?_13:_13+1);
while(idx>min&&idx<max){
if(inc){
idx++;
}else{
idx--;
}
var r=_11.GetRow(idx);
var _18=this.IsObjectInView(r,_14,false,true);
if(_18==_f){
return idx;
}
}
return idx;
};
nitobi.Browser.WheelUp=function(_19){
var top=_19.GetRow(0);
var _1b=_19.GetXmlDataSource().GetNumberRows()-1;
var _1c=_19.GetRow(_1b);
var _1d=_19.GetSectionHTMLTagObject(EBAComboBoxListBody);
var i=parseInt(_1d.scrollTop/top.offsetHeight);
var r=(i>_1b?_1c:_19.GetRow(i));
var _20=r.offsetTop-_1d.scrollTop+nitobi.Browser.VAdjust(r,_1d);
if(this.IsObjectInView(r,_1d,false,true)){
i=this.WheelUntil(false,false,_19,i,_1b,_1d);
}else{
if(_20<0){
i=this.WheelUntil(true,true,_19,i,_1b,_1d);
i--;
}else{
i=this.WheelUntil(true,false,_19,i,_1b,_1d);
i=this.WheelUntil(false,false,_19,i,_1b,_1d);
}
}
this.ScrollIntoView(_19.GetRow(i),_1d,true,false);
};
nitobi.Browser.WheelDown=function(_21){
var top=_21.GetRow(0);
var _23=_21.GetXmlDataSource().GetNumberRows()-1;
var _24=_21.GetRow(_23);
var _25=_21.GetSectionHTMLTagObject(EBAComboBoxListBody);
var i=parseInt(_25.scrollTop/top.offsetHeight);
var r=(i>_23?_24:_21.GetRow(i));
var _28=r.offsetTop-_25.scrollTop+nitobi.Browser.VAdjust(r,_25);
if(this.IsObjectInView(r,_25,false,true)){
i=1+this.WheelUntil(false,false,_21,i,_23,_25);
}else{
if(_28<0){
i=this.WheelUntil(true,true,_21,i,_23,_25);
}else{
i=this.WheelUntil(true,false,_21,i,_23,_25);
i=1+this.WheelUntil(false,false,_21,i,_23,_25);
}
}
r=_21.GetRow(i);
_28=r.offsetTop-_25.scrollTop+nitobi.Browser.VAdjust(r,_25);
if(0==_28&&i!=_23){
r=_21.GetRow(1+i);
}
this.ScrollIntoView(r,_25,true,false);
};
nitobi.Browser.ScrollIntoView=function(_29,_2a,Top,_2c){
var _2d=nitobi.html.getBoundingClientRect(_29);
var _2e=nitobi.html.getBoundingClientRect(_2a);
var _2f=_29.offsetTop-_2a.scrollTop;
var v=nitobi.Browser.VAdjust(_29,_2a);
_2f+=v;
var _31=_29.offsetLeft-_2a.scrollLeft;
var _32=_31+_29.offsetWidth-_2a.offsetWidth;
var _33=_2f+_29.offsetHeight-_2a.offsetHeight;
var _34=0;
var _35=0;
var _36=this.GetScrollBarWidth(_2a);
if(this.GetVerticalScrollBarStatus(_2a)==true){
_34=_36;
}
if(_31<0){
_2a.scrollLeft+=_31;
}else{
if(_32>0){
if(_2d.left-_32>_2e.left){
_2a.scrollLeft+=_32+_34;
}else{
_2a.scrollLeft+=_31;
}
}
}
if((_2f<0||true==Top)&&true!=_2c){
_2a.scrollTop+=_2f;
}else{
if(_33>0||true==_2c){
if(_2d.top-_33>_2e.top||true==_2c){
_2a.scrollTop+=_33+_35;
}else{
_2a.scrollTop+=_2f;
}
}
}
};
nitobi.Browser.GetVerticalScrollBarStatus=function(_37){
return this.GetScrollBarWidth(_37)>0;
};
nitobi.Browser.GetHorizontalScrollBarStatus=function(_38){
return (_38.scrollWidth>_38.offsetWidth-this.GetScrollBarWidth(_38));
};
nitobi.Browser.HTMLUnencode=function(_39){
var _3a=_39;
var _3b=new Array(/&amp;/g,/&lt;/g,/&quot;/g,/&gt;/g,/&nbsp;/g);
var _3c=new Array("&","<","\"",">"," ");
for(var i=0;i<_3b.length;i++){
_3a=_3a.replace(_3b[i],_3c[i]);
}
return (_3a);
};
nitobi.Browser.EncodeAngleBracketsInTagAttributes=function(str){
str=str.replace(/'"'/g,"\"&quot;\"");
var _3f=str.match(/".*?"/g);
if(_3f){
for(var i=0;i<_3f.length;i++){
val=_3f[i];
val=val.replace(/</g,"&lt;");
val=val.replace(/>/g,"&gt;");
str=str.replace(_3f[i],val);
}
}
return str;
};
nitobi.Browser.LoadPageFromUrl=function(Url,_42){
if(_42==null){
_42="GET";
}
var _43=new nitobi.ajax.HttpRequest();
_43.responseType="text";
_43.abort();
_43.open(_42,Url,false,"","");
_43.send("EBA Combo Box Get Page Request");
return (_43.responseText);
};
nitobi.Browser.GetMeasurementUnitType=function(_44){
if(_44==null||_44==""){
return "";
}
var _45=_44.search(/\D/g);
var _46=_44.substring(_45);
return (_46);
};
nitobi.Browser.GetMeasurementUnitValue=function(_47){
var _48=_47.search(/\D/g);
var _49=_47.substring(0,_48);
return Number(_49);
};
nitobi.Browser.GetElementWidth=function(_4a){
if(_4a==null){
throw ("Element in GetElementWidth is null");
}
var _4b=_4a.style;
var top=_4b.top;
var _4d=_4b.display;
var _4e=_4b.position;
var _4f=_4b.visibility;
var _50=nitobi.html.Css.getStyle(_4a,"visibility");
var _51=nitobi.html.Css.getStyle(_4a,"display");
var _52=0;
if(_51=="none"||_50=="hidden"){
_4b.position="absolute";
_4b.top=-1000;
_4b.display="inline";
_4b.visibility="visible";
}
var _53=nitobi.html.getWidth(_4a);
if(_4b.display=="inline"){
_4b.position=_4e;
_4b.top=top;
_4b.display=_4d;
_4b.visibility=_4f;
}
return parseInt(_53);
};
nitobi.Browser.GetElementHeight=function(_54){
if(_54==null){
throw ("Element in GetElementHeight is null");
}
var _55=_54.style;
var top=_55.top;
var _57=_55.display;
var _58=_55.position;
var _59=_55.visibility;
if(_55.display=="none"||_55.visibility!="visible"){
_55.position="absolute";
_55.top="-1000px";
_55.display="inline";
_55.visibility="visible";
}
var _5a=nitobi.html.getHeight(_54);
if(_55.display=="inline"){
_55.position=_58;
_55.top=top;
_55.display=_57;
_55.visibility=_59;
}
return parseInt(_5a);
};
nitobi.Browser.GetParentElementByTagName=function(_5b,_5c){
_5c=_5c.toLowerCase();
var _5d;
do{
_5b=_5b.parentElement;
if(_5b!=null){
_5d=_5b.tagName.toLowerCase();
}
}while((_5d!=_5c)&&(_5b!=null));
return _5b;
};
nitobi.lang.defineNs("nitobi.drawing");
nitobi.drawing.rgb=function(r,g,b){
return "#"+((r*65536)+(g*256)+b).toString(16);
};
nitobi.drawing.align=function(_61,_62,_63,oh,ow,oy,ox,_68){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_63;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(nitobi.browser.IE){
td=_62.getBoundingClientRect();
sd=_61.getBoundingClientRect();
tt=td.top;
tb=td.bottom;
tl=td.left;
tr=td.right;
th=Math.abs(tb-tt);
tw=Math.abs(tr-tl);
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
}
if(nitobi.browser.MOZ){
td=document.getBoxObjectFor(_62);
sd=document.getBoxObjectFor(_61);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}
if(a&268435456){
_61.style.height=th+oh;
}
if(a&16777216){
_61.style.width=tw+ow;
}
if(a&1048576){
_61.style.top=nitobi.html.getStyleTop(_61)+tt-st+oy;
}
if(a&65536){
_61.style.top=nitobi.html.getStyleTop(_61)+tt-st+th-sh+oy;
}
if(a&4096){
_61.style.left=nitobi.html.getStyleLeft(_61)-sl+tl+ox;
}
if(a&256){
_61.style.left=nitobi.html.getStyleLeft(_61)-sl+tl+tw-sw+ox;
}
if(a&16){
_61.style.top=nitobi.html.getStyleTop(_61)+tt-st+oy+Math.floor((th-sh)/2);
}
if(a&1){
_61.style.left=nitobi.html.getStyleLeft(_61)-sl+tl+ox+Math.floor((tw-sw)/2);
}
if(_68){
src.style.top=st-2;
src.style.left=sl-2;
src.style.height=sh;
src.style.width=sw;
tgt.style.top=tt-2;
tgt.style.left=tl-2;
tgt.style.height=th;
tgt.style.width=tw;
if(document.getBoundingClientRect){
sd=_61.getBoundingClientRect();
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
}
if(document.getBoxObjectFor){
sd=document.getBoxObjectFor(_61);
st=sd.screenY;
sl=sd.screenX;
sw=sd.width;
sh=sd.height;
}
src2.style.top=st-2;
src2.style.left=sl-2;
src2.style.height=sh;
src2.style.width=sw;
}
};
nitobi.drawing.align.SAMEHEIGHT=268435456;
nitobi.drawing.align.SAMEWIDTH=16777216;
nitobi.drawing.align.ALIGNTOP=1048576;
nitobi.drawing.align.ALIGNBOTTOM=65536;
nitobi.drawing.align.ALIGNLEFT=4096;
nitobi.drawing.align.ALIGNRIGHT=256;
nitobi.drawing.align.ALIGNMIDDLEVERT=16;
nitobi.drawing.align.ALIGNMIDDLEHORIZ=1;
nitobi.drawing.alignOuterBox=function(_78,_79,_7a,oh,ow,oy,ox,_7f){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
if(nitobi.browser.MOZ){
td=document.getBoxObjectFor(_79);
sd=document.getBoxObjectFor(_78);
var _80=parseInt(document.defaultView.getComputedStyle(_79,"").getPropertyValue("border-left-width"));
var _81=parseInt(document.defaultView.getComputedStyle(_79,"").getPropertyValue("border-top-width"));
var _82=parseInt(document.defaultView.getComputedStyle(_78,"").getPropertyValue("border-top-width"));
var _83=parseInt(document.defaultView.getComputedStyle(_78,"").getPropertyValue("border-bottom-width"));
var _84=parseInt(document.defaultView.getComputedStyle(_78,"").getPropertyValue("border-left-width"));
var _85=parseInt(document.defaultView.getComputedStyle(_78,"").getPropertyValue("border-right-width"));
oy=oy+_82-_81;
ox=ox+_84-_80;
}
nitobi.drawing.align(_78,_79,_7a,oh,ow,oy,ox,_7f);
};
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.Button=function(_86,_87){
try{
var _88="ntb-combobox-button";
var _89="ntb-combobox-button-pressed";
var _8a="";
var _8b="";
this.SetCombo(_87);
var _8c=(_86?_86.getAttribute("Width"):null);
((null==_8c)||(_8c==""))?this.SetWidth(_8a):this.SetWidth(_8c);
var _8d=(_86?_86.getAttribute("Height"):null);
((null==_8d)||(_8d==""))?this.SetHeight(_8b):this.SetHeight(_8d);
var _8e=(_86?_86.getAttribute("DefaultCSSClassName"):null);
((null==_8e)||(_8e==""))?this.SetDefaultCSSClassName(_88):this.SetDefaultCSSClassName(_8e);
var _8f=(_86?_86.getAttribute("PressedCSSClassName"):null);
((null==_8f)||(_8f==""))?this.SetPressedCSSClassName(_89):this.SetPressedCSSClassName(_8f);
this.SetCSSClassName(this.GetDefaultCSSClassName());
this.m_userTag=_86;
this.m_prevImgClass="ntb-combobox-button-img";
}
catch(err){
}
};
nitobi.combo.Button.prototype.Unload=function(){
};
nitobi.combo.Button.prototype.GetDefaultCSSClassName=function(){
return this.m_DefaultCSSClassName;
};
nitobi.combo.Button.prototype.SetDefaultCSSClassName=function(_90){
this.m_DefaultCSSClassName=_90;
};
nitobi.combo.Button.prototype.GetPressedCSSClassName=function(){
return this.m_PressedCSSClassName;
};
nitobi.combo.Button.prototype.SetPressedCSSClassName=function(_91){
this.m_PressedCSSClassName=_91;
};
nitobi.combo.Button.prototype.GetHeight=function(){
return (null==this.m_HTMLTagObject?this.m_Height:this.m_HTMLTagObject.style.height);
};
nitobi.combo.Button.prototype.SetHeight=function(_92){
if(null==this.m_HTMLTagObject){
this.m_Height=_92;
}else{
this.m_HTMLTagObject.style.height=_92;
}
};
nitobi.combo.Button.prototype.GetWidth=function(){
if(null==this.m_HTMLTagObject){
return this.m_Width;
}else{
return this.m_HTMLTagObject.style.width;
}
};
nitobi.combo.Button.prototype.SetWidth=function(_93){
if(null==this.m_HTMLTagObject){
this.m_Width=_93;
}else{
this.m_HTMLTagObject.style.width=_93;
}
};
nitobi.combo.Button.prototype.GetHTMLTagObject=function(){
return this.m_HTMLTagObject;
};
nitobi.combo.Button.prototype.SetHTMLTagObject=function(_94){
this.m_HTMLTagObject=_94;
};
nitobi.combo.Button.prototype.GetCombo=function(){
return this.m_Combo;
};
nitobi.combo.Button.prototype.SetCombo=function(_95){
this.m_Combo=_95;
};
nitobi.combo.Button.prototype.GetCSSClassName=function(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
};
nitobi.combo.Button.prototype.SetCSSClassName=function(_96){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_96;
}else{
this.m_HTMLTagObject.className=_96;
}
};
nitobi.combo.Button.prototype.OnMouseOver=function(_97,_98){
if(this.GetCombo().GetEnabled()){
if(null==_97){
_97=this.m_Img;
}
this.m_prevImgClass="ntb-combobox-button-img-over";
_97.className=this.m_prevImgClass;
if(_98){
this.GetCombo().GetTextBox().OnMouseOver(false);
}
}
};
nitobi.combo.Button.prototype.OnMouseOut=function(_99,_9a){
if(null==_99){
_99=this.m_Img;
}
this.m_prevImgClass="ntb-combobox-button-img";
_99.className=this.m_prevImgClass;
if(_9a){
this.GetCombo().GetTextBox().OnMouseOut(false);
}
};
nitobi.combo.Button.prototype.OnMouseDown=function(_9b){
if(this.GetCombo().GetEnabled()){
if(null!=_9b){
_9b.className="ntb-combobox-button-img-pressed";
}
this.OnClick();
}
};
nitobi.combo.Button.prototype.OnMouseUp=function(_9c){
if(this.GetCombo().GetEnabled()){
if(null!=_9c){
_9c.className=this.m_prevImgClass;
}
}
};
nitobi.combo.Button.prototype.OnClick=function(){
var _9d=this.GetCombo();
var _9e=document.getElementsByTagName((!nitobi.browser.IE)?"ntb:Combo":"combo");
for(var i=0;i<_9e.length;i++){
var _a0=_9e[i].object;
try{
if(_9d.GetId()!=_a0.GetId()){
_a0.GetList().Hide();
}
}
catch(err){
}
}
var l=_9d.GetList();
l.Toggle();
var t=_9d.GetTextBox();
var tb=t.GetHTMLTagObject();
if(t.focused){
t.m_skipFocusOnce=true;
}
tb.focus();
};
nitobi.combo.Button.prototype.GetHTMLRenderString=function(){
var _a4=this.GetCombo().GetId();
var uid=this.GetCombo().GetUniqueId();
var w=this.GetWidth();
var h=this.GetHeight();
if((!nitobi.browser.IE)){
var _a8="<span id='EBAComboBoxButton"+uid+"' "+"class='"+this.GetDefaultCSSClassName()+"' "+"style='"+(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"")+"'>"+"<img src='javascript:void(0);' class='ntb-combobox-button-img' id='EBAComboBoxButtonImg"+uid+"' "+"onmouseover='$ntb(\""+_a4+"\").object.GetButton().OnMouseOver(this, true)' "+"onmouseout='$ntb(\""+_a4+"\").object.GetButton().OnMouseOut(this, true)' "+"onmousedown='$ntb(\""+_a4+"\").object.GetButton().OnMouseDown(this);return false;' "+"onmouseup='$ntb(\""+_a4+"\").object.GetButton().OnMouseUp(this)' "+"onmousemove='return false;' "+"></img></span>";
}else{
var _a8="<span id='EBAComboBoxButton"+uid+"' "+"class='"+this.GetDefaultCSSClassName()+"' "+"style='"+(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"")+"'>"+"<img class='ntb-combobox-button-img' id='EBAComboBoxButtonImg"+uid+"' "+"onmouseover='$ntb(\""+_a4+"\").object.GetButton().OnMouseOver(this, true)' "+"onmouseout='$ntb(\""+_a4+"\").object.GetButton().OnMouseOut(this, true)' "+"onmousedown='$ntb(\""+_a4+"\").object.GetButton().OnMouseDown(this);return false;' "+"onmouseup='$ntb(\""+_a4+"\").object.GetButton().OnMouseUp(this)' "+"onmousemove='return false;' "+"></img></span>";
}
return _a8;
};
nitobi.combo.Button.prototype.Initialize=function(){
var _a9=this.GetCombo();
var uid=_a9.GetUniqueId();
this.SetHTMLTagObject($ntb("EBAComboBoxButton"+uid));
var img=$ntb("EBAComboBoxButtonImg"+uid);
var _ac=nitobi.html.Css.getStyle(img,"background-image");
_ac=_ac.replace(/button\.gif/g,"blank.gif");
if(nitobi.browser.IE){
_ac=_ac.substr(5,_ac.length-7);
}else{
_ac=_ac.substr(4,_ac.length-5);
_ac=_ac.replace(/\\\(/g,"(");
_ac=_ac.replace(/\\\)/g,")");
}
img.src=_ac;
this.m_Img=img;
this._onmouseover=img.onmouseover;
this._onmouseout=img.onmouseout;
this._onclick=img.onclick;
this._onmousedown=img.onmousedown;
this._onmouseup=img.onmouseup;
if(!this.GetCombo().GetEnabled()){
this.Disable();
}
this.m_userTag=null;
};
nitobi.combo.Button.prototype.Disable=function(){
var img=this.m_Img;
img.onmouseover=null;
img.onmouseout=null;
img.onclick=null;
img.onmousedown=null;
img.onmouseup=null;
img.className="ntb-combobox-button-img-disabled";
};
nitobi.combo.Button.prototype.Enable=function(){
var img=this.m_Img;
img.onmouseover=this._onmouseover;
img.onmouseout=this._onmouseout;
img.onclick=this._onclick;
img.onmousedown=this._onmousedown;
img.onmouseup=this._onmouseup;
img.className="ntb-combobox-button-img";
};
nitobi.lang.defineNs("nitobi.combo");
if(nitobi.combo==null){
nitobi.combo=function(){
};
}
nitobi.combo.numCombosToLoad=0;
nitobi.combo.numCombosToLoadInitially=4;
nitobi.combo.loadDelayMultiplier=10;
nitobi.getCombo=function(id){
return $ntb(id).jsObject;
};
nitobi.combo.initBase=function(){
if(nitobi.combo.initBase.done==false){
var _b0=[];
var _b1=document.getElementsByTagName((!nitobi.browser.IE)?"eba:ComboPanel":"combopanel");
var _b2=((!nitobi.browser.IE)?document.getElementsByTagName("ntb:ComboPanel"):[]);
for(var i=0;i<_b2.length;i++){
_b0.push(_b2[i]);
}
for(var i=0;i<_b1.length;i++){
_b0.push(_b1[i]);
}
for(var i=0;i<_b0.length;i++){
_b0[i].style.display="none";
}
nitobi.combo.createLanguagePack();
if(nitobi.browser.IE){
nitobi.combo.iframeBacker=document.createElement("IFRAME");
nitobi.combo.iframeBacker.style.position="absolute";
nitobi.combo.iframeBacker.style.zindex="1000";
nitobi.combo.iframeBacker.style.visibility="hidden";
nitobi.combo.iframeBacker.name="nitobi.combo.iframeBacker_Id";
nitobi.combo.iframeBacker.id="nitobi.combo.iframeBacker_Id";
nitobi.combo.iframeBacker.frameBorder=0;
nitobi.combo.iframeBacker.src="javascript:true";
nitobi.html.insertAdjacentElement(document.body,"afterBegin",nitobi.combo.iframeBacker);
}
nitobi.combo.initBase.done=true;
}
};
nitobi.combo.initBase.done=false;
nitobi.initCombo=function(el){
nitobi.combo.initBase();
var tag;
if(typeof (el)=="string"){
tag=$ntb(el);
}else{
tag=el;
}
tag.object=new nitobi.combo.Combo(tag);
tag.object.Initialize();
tag.object.GetList().Render();
return tag.object;
};
nitobi.initCombos=function(){
nitobi.combo.initBase();
var _b6=[];
var _b7=document.getElementsByTagName((!nitobi.browser.IE)?"eba:Combo":"combo");
var _b8=((!nitobi.browser.IE)?document.getElementsByTagName("ntb:Combo"):[]);
for(var i=0;i<_b8.length;i++){
_b6.push(_b8[i]);
}
for(var i=0;i<_b7.length;i++){
_b6.push(_b7[i]);
}
if(0==document.styleSheets.length){
alert("You are missing a link to the Web ComboBoxes' style sheet.");
}else{
nitobi.combo.numCombosToLoad=_b6.length;
for(var i=0;i<_b6.length;i++){
try{
if(i>=nitobi.combo.numCombosToLoadInitially){
var _ba=i*nitobi.combo.loadDelayMultiplier;
window.setTimeout("try{$ntb('"+_b6[i].id+"').object = new nitobi.combo.Combo($ntb('"+_b6[i].id+"'));$ntb('"+_b6[i].id+"').object.Initialize();}catch(err){alert(err.message);}",_ba);
}else{
nitobi.initCombo(_b6[i]);
}
}
catch(err){
alert(err.message);
}
}
}
};
function InitializeEbaCombos(){
nitobi.initCombos();
}
nitobi.combo.finishInit=function(){
nitobi.combo.resize();
nitobi.html.attachEvent(window,"resize",nitobi.combo.resize);
if(window.addEventListener){
window.addEventListener("unload",nitobi.combo.unloadAll,false);
}else{
if(document.addEventListener){
document.addEventListener("unload",nitobi.combo.unloadAll,false);
}else{
if(window.attachEvent){
window.attachEvent("onunload",nitobi.combo.unloadAll);
}else{
if(window.onunload){
window.XTRonunload=window.onunload;
}
window.onunload=nitobi.combo.unloadAll;
}
}
}
try{
eval("try{OnAfterIntializeEbaCombos()} catch(err){}");
}
catch(err){
}
};
nitobi.combo.unloadAll=function(){
var _bb=[];
var _bc=document.getElementsByTagName((!nitobi.browser.IE)?"eba:Combo":"combo");
var _bd=((!nitobi.browser.IE)?document.getElementsByTagName("ntb:Combo"):[]);
for(var i=0;i<_bd.length;i++){
_bb.push(_bd[i]);
}
for(var i=0;i<_bc.length;i++){
_bb.push(_bc[i]);
}
if(_bb){
for(var i=0;i<_bb.length;i++){
if((_bb[i])&&(_bb[i].object)){
_bb[i].object.Unload();
_bb[i].object=null;
}
}
_bb=null;
}
if(nitobi.browser.IE){
if(nitobi.combo.iframeBacker){
delete nitobi.combo.iframeBacker;
nitobi.combo.iframeBacker=null;
}
}
};
nitobi.combo.resize=function(){
var _bf=[];
var _c0=document.getElementsByTagName((!nitobi.browser.IE)?"eba:Combo":"combo");
var _c1=((!nitobi.browser.IE)?document.getElementsByTagName("ntb:Combo"):[]);
for(var i=0;i<_c1.length;i++){
_bf.push(_c1[i]);
}
for(var i=0;i<_c0.length;i++){
_bf.push(_c0[i]);
}
for(var i=0;i<_bf.length;i++){
var _c3=_bf[i].object;
if("smartlist"!=_c3.mode){
if(_c3.GetWidth()!=null){
var _c4=_c3.GetUniqueId();
var _c5=_c3.GetTextBox();
var _c6=_c3.GetList();
var _c7=$ntb(_c3.GetId());
var _c8=parseInt(_c3.GetWidth());
if((!nitobi.browser.IE)&&nitobi.Browser.GetMeasurementUnitType(_c3.GetWidth())=="px"){
_c8=parseInt(_c3.GetWidth());
}
var _c9=$ntb("EBAComboBoxButtonImg"+_c4);
var _ca;
if(null!=_c9){
_ca=nitobi.html.getWidth(_c9);
}else{
_ca=0;
}
_c5.SetWidth((_c8-_ca)+"px");
_c6.OnWindowResized();
}
}
}
};
nitobi.combo.Combo=function(_cb){
var _cc="";
var _cd="GET";
var _ce="You must specify an Id for the combo box";
var _cf="ntb:Combo could not correctly transform XML data. Do you have the MS XML libraries installed? These are typically installed with your browser and are freely available from Microsoft.";
this.Version="3.5";
((null==_cb.id)||(""==_cb.id))?alert(_ce):this.SetId(_cb.id);
var _d0=null;
var _d1=null;
var _d2=null;
var _d3=null;
_cb.object=this;
_cb.jsObject=this;
this.m_userTag=_cb;
var _d4=null;
this.BuildWarningList();
var _d5=this.m_userTag.getAttribute("DisabledWarningMessages");
if(!((null==_d5)||(""==_d5))){
this.SetDisabledWarningMessages(_d5);
}
var _d6=this.m_userTag.getAttribute("ErrorLevel");
((null==_d6)||(""==_d6))?this.SetErrorLevel(""):this.SetErrorLevel(_d6);
_cb.innerHTML=_cb.innerHTML.replace(/>\s+</g,"><").replace(/^\s+</,"<").replace(/>\s+$/,">");
var dtf=_cb.getAttribute("DataTextField");
var dvf=_cb.getAttribute("DataValueField");
if((null==dtf)||(""==dtf)){
dtf=dvf;
_cb.setAttribute("DataTextField",dtf);
}
this.SetDataTextField(dtf);
this.SetDataValueField(dvf);
if((null!=dtf)&&(""!=dtf)){
if((null==dvf)||(""==dvf)){
dvf=dtf;
}
this.SetDataValueField(dvf);
}
for(var i=0;i<_cb.childNodes.length;i++){
var _da=_cb.childNodes[i];
var n=_da.tagName;
if(n){
n=n.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"");
switch(n){
case "combobutton":
_d2=_da;
break;
case "combotextbox":
_d3=_da;
break;
case "combolist":
_d1=_da;
break;
case "xmldatasource":
_d0=_da;
break;
case "combovalues":
_d4=_da;
}
}
}
var _dc="default";
var _dd=this.m_userTag.getAttribute("Mode");
if(null!=_dd){
_dd=_dd.toLowerCase();
}
switch(_dd){
case "smartsearch":
case "smartlist":
case "compact":
case "filter":
case "unbound":
this.mode=_dd;
break;
default:
this.mode=_dc;
}
var _de=(_d1==null?null:_d1.getAttribute("DatasourceUrl"));
if((_d4==null&&_de==null)&&this.mode!="compact"){
this.mode=_dc;
}
var _df=25;
if(null!=_d1){
var ps=_d1.getAttribute("PageSize");
if(ps!=null&&ps!=""){
_df=ps;
}
}
var _e1=_cb.getAttribute("InitialSearch");
this.m_InitialSearch="";
if((null==_e1)||(""==_e1)){
this.m_InitialSearch=_cc;
}else{
this.m_InitialSearch=_e1;
}
var rt=_cb.getAttribute("HttpRequestMethod");
((null==rt)||(""==rt))?this.SetHttpRequestMethod(_cd):this.SetHttpRequestMethod(rt);
this.m_NoDataIsland=_d4==null&&_de!=null&&_d0==null;
if(this.m_NoDataIsland){
var id=_cb.id+"XmlDataSource";
_d1.setAttribute("XmlId",id);
_d0=_d1;
_de+=(_de.indexOf("?")==-1?"?":"&");
_de+="PageSize="+_df;
_de+="&StartingRecordIndex=0"+"&ComboId="+encodeURI(this.GetId())+"&LastString=";
if(this.m_InitialSearch!=null&&this.m_InitialSearch!=""){
_de+="&SearchSubstring="+encodeURI(this.m_InitialSearch);
}
var _e4=nitobi.Browser.LoadPageFromUrl(_de,this.GetHttpRequestMethod());
var _e5=_e4.indexOf("<?xml");
if(_e5!=-1){
_e4=(_e4.substr(_e5));
}
var d=nitobi.xml.createXmlDoc(_e4);
d.async=false;
var d2=nitobi.xml.createXmlDoc(d.xml.replace(/>\s+</g,"><"));
d2=xbClipXml(d2,"root","e",_df);
document[id]=d2;
}
var _e8=(this.mode==_dc||this.mode=="unbound");
if(_e8){
this.SetButton(new nitobi.combo.Button(_d2,this));
}
this.SetList(new nitobi.combo.List(_d1,_d0,_d4,this));
this.SetTextBox(new nitobi.combo.TextBox(_d3,this,_e8));
this.m_Over=false;
};
nitobi.combo.Combo.prototype.BuildWarningList=function(){
this.m_WarningMessagesEnabled=new Array();
this.m_DisableAllWarnings=false;
this.m_WarningMessages=new Array();
this.m_WarningMessages["cw001"]="The combo tried to search the server datasource for data.  "+"The server returned data, but no match was found within this data by the combo. The most "+"likely cause for this warning is that the combo mode does not match the gethandler SQL query type: "+"the sql query is not matching in the same way the combo is. Consult the documentation to see what "+"matches to use given the combo's mode.";
this.m_WarningMessages["cw002"]="The combo tried to load XML data from the page. However, it encountered a tag attribute of the form <tag att='___'/> instead"+" of the form <tag att=\"___\"/>. A possible reason for this is encoding ' as &apos;. To fix this error correct the tag to use "+"<tag att=\"__'___\"/>. If you are manually encoding data, eg. for an unbound combo, do not encode ' as &apos; and do not use ' as your string literal. If you believe, "+"this warning was generated in error, you can disable it.";
this.m_WarningMessages["cw003"]="The combo failed to load and parse the XML sent by the gethandler. Check your gethandler to ensure that it is delivering valid XML.";
};
nitobi.combo.Combo.prototype.SetDisabledWarningMessages=function(_e9){
if(_e9=="*"){
this.m_DisableAllWarnings=true;
}else{
this.m_DisableAllWarnings=false;
_e9=_e9.toLowerCase();
_e9=_e9.split(",");
for(var i=0;i<_e9.length;i++){
this.m_WarningMessagesEnabled[_e9[i]]=false;
}
}
};
nitobi.combo.Combo.prototype.IsWarningEnabled=function(_eb){
if(this.m_ErrorLevel==""){
return;
}else{
if(this.m_WarningMessagesEnabled[_eb]==null){
this.m_WarningMessagesEnabled[_eb]=true;
}
return this.m_WarningMessagesEnabled[_eb]&&this.m_DisableAllWarnings==false;
}
};
nitobi.combo.Combo.prototype.SetErrorLevel=function(_ec){
this.m_ErrorLevel=_ec.toLowerCase();
};
nitobi.combo.Combo.prototype.GetWidth=function(){
return this.m_Width;
};
nitobi.combo.Combo.prototype.SetWidth=function(_ed){
this.m_Width=_ed;
};
nitobi.combo.Combo.prototype.GetHeight=function(){
return this.m_Height;
};
nitobi.combo.Combo.prototype.SetHeight=function(_ee){
this.m_Height=_ee;
};
function _EBAMemScrub(_ef){
for(var _f0 in _ef){
if((_f0.indexOf("m_")==0)||(_f0.indexOf("$")==0)){
_ef[_f0]=null;
}
}
}
nitobi.combo.Combo.prototype.Unload=function(){
if(this.m_Callback){
delete this.m_Callback;
this.m_Callback=null;
}
if(this.m_TextBox){
this.m_TextBox.Unload();
delete this.m_TextBox;
this.m_TextBox=null;
}
if(this.m_List){
this.m_List.Unload();
delete this.m_List;
this.m_List=null;
}
if(this.m_Button){
this.m_Button.Unload();
delete m_Button;
}
var _f1=this.GetHTMLTagObject();
_EBAMemScrub(this);
_EBAMemScrub(_f1);
};
nitobi.combo.Combo.prototype.GetHttpRequestMethod=function(){
return this.m_HttpRequestMethod;
};
nitobi.combo.Combo.prototype.SetHttpRequestMethod=function(_f2){
if(null==this.m_HTMLTagObject){
this.m_HttpRequestMethod=_f2;
}else{
this.m_HTMLTagObject.className=_f2;
}
};
nitobi.combo.Combo.prototype.GetCSSClassName=function(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
};
nitobi.combo.Combo.prototype.SetCSSClassName=function(_f3){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_f3;
}else{
this.m_HTMLTagObject.className=_f3;
}
};
nitobi.combo.Combo.prototype.GetInitialSearch=function(){
return this.m_InitialSearch;
};
nitobi.combo.Combo.prototype.SetInitialSearch=function(_f4){
this.m_InitialSearch=_f4;
};
nitobi.combo.Combo.prototype.GetListZIndex=function(){
return this.m_ListZIndex;
};
nitobi.combo.Combo.prototype.SetListZIndex=function(_f5){
this.m_ListZIndex=_f5;
};
nitobi.combo.Combo.prototype.GetMode=function(){
return this.mode;
};
nitobi.combo.Combo.prototype.GetOnBlurEvent=function(){
return this.m_OnBlurEvent;
};
nitobi.combo.Combo.prototype.SetOnBlurEvent=function(_f6){
this.m_OnBlurEvent=_f6;
};
nitobi.combo.Combo.prototype.OnBlurEvent=function(){
};
nitobi.combo.Combo.prototype.SetFocus=function(){
this.GetTextBox().m_HTMLTagObject.focus();
};
nitobi.combo.Combo.prototype.GetOnFocusEvent=function(){
return this.m_OnFocusEvent;
};
nitobi.combo.Combo.prototype.SetOnFocusEvent=function(_f7){
this.m_OnFocusEvent=_f7;
};
nitobi.combo.Combo.prototype.GetOnLoadEvent=function(){
if("void"==this.m_OnLoadEvent){
return "";
}
return this.m_OnLoadEvent;
};
nitobi.combo.Combo.prototype.SetOnLoadEvent=function(_f8){
this.m_OnLoadEvent=_f8;
};
nitobi.combo.Combo.prototype.GetOnSelectEvent=function(){
if("void"==this.m_OnSelectEvent){
return "";
}
return this.m_OnSelectEvent;
};
nitobi.combo.Combo.prototype.SetOnSelectEvent=function(_f9){
this.m_OnSelectEvent=_f9;
};
nitobi.combo.Combo.prototype.GetOnBeforeSelectEvent=function(){
if("void"==this.m_OnBeforeSelectEvent){
return "";
}
return this.m_OnBeforeSelectEvent;
};
nitobi.combo.Combo.prototype.SetOnBeforeSelectEvent=function(_fa){
this.m_OnBeforeSelectEvent=_fa;
};
nitobi.combo.Combo.prototype.GetHTMLTagObject=function(){
return this.m_HTMLTagObject;
};
nitobi.combo.Combo.prototype.SetHTMLTagObject=function(_fb){
this.m_HTMLTagObject=_fb;
};
nitobi.combo.Combo.prototype.GetUniqueId=function(){
return this.m_UniqueId;
};
nitobi.combo.Combo.prototype.SetUniqueId=function(_fc){
this.m_UniqueId=_fc;
};
nitobi.combo.Combo.prototype.GetId=function(){
return this.m_Id;
};
nitobi.combo.Combo.prototype.SetId=function(Id){
this.m_Id=Id;
};
nitobi.combo.Combo.prototype.GetButton=function(){
return this.m_Button;
};
nitobi.combo.Combo.prototype.SetButton=function(_fe){
this.m_Button=_fe;
};
nitobi.combo.Combo.prototype.GetList=function(){
return this.m_List;
};
nitobi.combo.Combo.prototype.SetList=function(_ff){
this.m_List=_ff;
};
nitobi.combo.Combo.prototype.GetTextBox=function(){
return this.m_TextBox;
};
nitobi.combo.Combo.prototype.SetTextBox=function(_100){
this.m_TextBox=_100;
};
nitobi.combo.Combo.prototype.GetTextValue=function(){
return this.GetTextBox().GetValue();
};
nitobi.combo.Combo.prototype.SetTextValue=function(_101){
this.GetTextBox().SetValue(_101);
};
nitobi.combo.Combo.prototype.GetSelectedRowValues=function(){
return this.GetList().GetSelectedRowValues();
};
nitobi.combo.Combo.prototype.SetSelectedRowValues=function(_102){
this.GetList().SetSelectedRowValues(_102);
};
nitobi.combo.Combo.prototype.GetSelectedRowIndex=function(){
return this.GetList().GetSelectedRowIndex();
};
nitobi.combo.Combo.prototype.SetSelectedRowIndex=function(_103){
this.GetList().SetSelectedRowIndex(_103);
};
nitobi.combo.Combo.prototype.GetDataTextField=function(){
return this.m_DataTextField;
};
nitobi.combo.Combo.prototype.SetDataTextField=function(_104){
this.m_DataTextField=_104;
var _105=$ntb(this.GetId()+"DataTextFieldIndex");
if(null!=_105){
var _106=this.GetList().GetXmlDataSource().GetColumnIndex(_104);
_105.value=_106;
}
};
nitobi.combo.Combo.prototype.GetDataValueField=function(){
return this.m_DataValueField;
};
nitobi.combo.Combo.prototype.SetDataValueField=function(_107){
this.m_DataValueField=_107;
var _108=$ntb(this.GetId()+"DataValueFieldIndex");
if(null!=_108){
var _109=this.GetList().GetXmlDataSource().GetColumnIndex(_107);
_108.value=_109;
}
};
nitobi.combo.Combo.prototype.GetSelectedItem=function(){
var _10a=new Object;
_10a.Value=null;
_10a.Text=null;
var _10b=this.GetList().GetSelectedRowIndex();
if(-1!=_10b){
var _10c=this.GetList().GetXmlDataSource();
var row=_10c.GetRow(_10b);
var _10e=_10c.GetColumnIndex(this.GetDataValueField());
if(-1!=_10e){
_10a.Value=row[_10e];
}
_10e=_10c.GetColumnIndex(this.GetDataTextField());
if(-1!=_10e){
_10a.Text=row[_10e];
}
}
return _10a;
};
nitobi.combo.Combo.prototype.GetOnHideEvent=function(){
return this.GetList().GetOnHideEvent();
};
nitobi.combo.Combo.prototype.SetOnHideEvent=function(_10f){
this.GetList().SetOnHideEvent(_10f);
};
nitobi.combo.Combo.prototype.GetOnTabEvent=function(){
return this.m_OnTabEvent;
};
nitobi.combo.Combo.prototype.SetOnTabEvent=function(_110){
this.m_OnTabEvent=_110;
};
nitobi.combo.Combo.prototype.GetEventObject=function(){
return this.m_EventObject;
};
nitobi.combo.Combo.prototype.SetEventObject=function(_111){
this.m_EventObject=_111;
};
nitobi.combo.Combo.prototype.GetSmartListSeparator=function(){
return this.SmartListSeparator;
};
nitobi.combo.Combo.prototype.SetSmartListSeparator=function(_112){
this.SmartListSeparator=_112;
};
nitobi.combo.Combo.prototype.GetTabIndex=function(){
return this.m_TabIndex;
};
nitobi.combo.Combo.prototype.SetTabIndex=function(_113){
this.m_TabIndex=_113;
};
nitobi.combo.Combo.prototype.GetEnabled=function(){
return this.m_Enabled;
};
nitobi.combo.Combo.prototype.SetEnabled=function(_114){
this.m_Enabled=_114;
var t=this.GetTextBox();
if(null!=t.GetHTMLTagObject()){
if(_114){
t.Enable();
}else{
t.Disable();
}
}
var b=this.GetButton();
if(null!=b&&null!=b.m_Img){
if(_114){
b.Enable();
}else{
b.Disable();
}
}
};
nitobi.combo.Combo.prototype.Initialize=function(){
var _117="ComboBox";
var _118="outlook";
var _119="";
var _11a="";
var _11b="";
var _11c="";
var _11d="";
var _11e="";
var _11f="0";
var _120=true;
var _121="default";
var _122=1000;
var _123=",";
var _124="";
var _125="";
var _126=this.m_userTag.getAttribute("ListZIndex");
((null==_126)||(""==_126))?this.SetListZIndex(_122):this.SetListZIndex(_126);
this.SetWidth(this.m_userTag.getAttribute("Width"));
this.SetHeight(this.m_userTag.getAttribute("Height"));
this.theme=this.m_userTag.getAttribute("theme");
if((this.theme==null)||(""==this.theme)){
this.theme=_118;
}
var sls=this.m_userTag.getAttribute("SmartListSeparator");
((null==sls)||(""==sls))?this.SetSmartListSeparator(_123):this.SetSmartListSeparator(sls);
var _128=this.m_userTag.getAttribute("Enabled");
((null==_128)||(""==_128))?this.SetEnabled(_120):this.SetEnabled("true"==_128.toLowerCase());
var _129=this.m_userTag.getAttribute("TabIndex");
((null==_129)||(""==_129))?this.SetTabIndex(_11f):this.SetTabIndex(_129);
var _12a=this.m_userTag.getAttribute("OnTabEvent");
((null==_12a)||(""==_12a))?this.SetOnTabEvent(_11e):this.SetOnTabEvent(_12a);
this.SetEventObject(null);
var _12b=this.m_userTag.getAttribute("OnFocusEvent");
((null==_12b)||(""==_12b))?this.SetOnFocusEvent(_11d):this.SetOnFocusEvent(_12b);
var _12c=this.m_userTag.getAttribute("OnBlurEvent");
((null==_12c)||(""==_12c))?this.SetOnBlurEvent(_11c):this.SetOnBlurEvent(_12c);
var ose=this.m_userTag.getAttribute("OnSelectEvent");
((null==ose)||(""==ose))?this.SetOnSelectEvent(_119):this.SetOnSelectEvent(ose);
var ole=this.m_userTag.getAttribute("OnLoadEvent");
((null==ole)||(""==ole))?this.SetOnLoadEvent(_11a):this.SetOnLoadEvent(ole);
var obse=this.m_userTag.getAttribute("OnBeforeSelectEvent");
((null==obse)||(""==obse))?this.SetOnBeforeSelectEvent(_11b):this.SetOnBeforeSelectEvent(obse);
var css=this.m_userTag.getAttribute("CSSClassName");
((null==css)||(""==css))?this.SetCSSClassName(_117):this.SetCSSClassName(css);
var _131=this.m_userTag.uniqueID;
this.SetUniqueId(_131);
if(this.GetWidth()!=null){
if("smartlist"==this.mode){
this.m_TextBox.SetWidth(this.GetWidth());
this.m_TextBox.SetHeight(this.GetHeight());
}
if(nitobi.Browser.GetMeasurementUnitType(this.GetWidth())=="%"){
this.m_userTag.style.display="block";
}else{
this.m_userTag.style.display="inline";
}
if("smartlist"==this.mode){
this.m_userTag.style.height=this.GetHeight();
}else{
this.m_userTag.style.overflow="hidden";
}
}
var html="<span id='EBAComboBox"+_131+"' class='ntb-combo-reset "+this.GetCSSClassName()+"' "+"onMouseOver='$ntb(\""+this.GetId()+"\").object.m_Over=true' "+"onMouseOut='$ntb(\""+this.GetId()+"\").object.m_Over=false'>"+"<span id='EBAComboBoxTextAndButton"+_131+"' class='ComboBoxTextAndButton'><nobr>";
var id="";
var _134=this.GetId();
for(var i=0,n=this.GetList().GetXmlDataSource().GetNumberColumns();i<n;i++){
id=_134+"SelectedValue"+i;
html+="<input type='HIDDEN' id='"+id+"' name='"+id+"'></input>";
}
id=_134+"SelectedRowIndex";
html+="<input type='HIDDEN' id='"+id+"' name='"+id+"' value='"+this.GetSelectedRowIndex()+"'></input>";
var _137=this.GetDataTextField();
id=_134+"DataTextFieldIndex";
var _138=this.GetList().m_XmlDataSource.GetColumnIndex(_137);
html+="<input type='HIDDEN' id='"+id+"' name='"+id+"' value='"+_138+"'></input>";
id=_134+"DataValueFieldIndex";
var _139=this.GetDataValueField();
_138=this.GetList().m_XmlDataSource.GetColumnIndex(_139);
html+="<input type='HIDDEN' id='"+id+"' name='"+id+"' value='"+_138+"'></input>";
html+="<div class=\" ntb-combo-reset "+this.theme+"\">";
html+=this.GetTextBox().GetHTMLRenderString();
var _13a=(this.mode=="default"||this.mode=="unbound");
if(_13a){
html+=this.GetButton().GetHTMLRenderString();
}
html+="<div style=\"overflow: hidden; display: block; clear: both; float: none; height: 0px; width: auto;\"><!-- --></div>";
html+="</div>";
html+="</nobr></span></span>";
nitobi.html.insertAdjacentHTML(this.m_userTag,"beforeEnd",html);
this.SetHTMLTagObject($ntb("EBAComboBox"+_131));
this.GetTextBox().Initialize();
if(_13a){
this.GetButton().Initialize();
}
var is=this.m_InitialSearch;
if(null!=is&&""!=is){
this.InitialSearch(is);
}
eval(this.GetOnLoadEvent());
this.m_userTag=null;
nitobi.combo.numCombosToLoad--;
if(nitobi.combo.numCombosToLoad==0){
nitobi.combo.finishInit();
}
};
nitobi.combo.Combo.prototype.InitialSearch=function(_13c){
var list=this.GetList();
var tb=this.GetTextBox();
var dfi=tb.GetDataFieldIndex();
list.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_EXPIRED);
list.InitialSearchOnce=true;
this.m_Callback=_EbaComboCallback;
list.Search(_13c,dfi,this.m_Callback,this.m_NoDataIsland);
};
function _EbaComboCallback(_140,list){
if(_140>=0){
var tb=list.GetCombo().GetTextBox();
var row=list.GetRow(_140);
list.SetActiveRow(row);
list.SetSelectedRow(_140);
tb.SetValue(list.GetSelectedRowValues()[tb.GetDataFieldIndex()]);
list.scrollOnce=true;
list.InitialSearchOnce=false;
}else{
var _144=list.GetCombo();
_144.SetTextValue(_144.GetInitialSearch());
}
}
nitobi.combo.Combo.prototype.GetFieldFromActiveRow=function(_145){
var l=this.GetList();
if(null!=l){
var r=l.GetActiveRow();
if(null!=r){
var y=l.GetRowIndex(r);
var d=l.GetXmlDataSource();
var x=d.GetColumnIndex(_145);
return d.GetRowCol(y,x);
}
}
return null;
};
function Iframe(_14b,h,w,_14e){
if(!_14b){
var msg="Iframe constructor: attachee is null!";
alert(msg);
throw msg;
}
var d=document;
var oIF=d.createElement("IFRAME");
var s=oIF.style;
this.oIFStyle=s;
this.attachee=_14b;
this.attach();
s.position="absolute";
w=w||_14b.offsetWidth;
s.width=w;
s.height=h||0;
s.display="none";
s.overflow="hidden";
var name="IFRAME"+oIF.uniqueID;
oIF.name=name;
oIF.id=name;
oIF.frameBorder=0;
oIF.src="javascript:true";
var _154=Browser_GetParentElementByTagName(_14e,"form");
if(null==_154){
_154=d.body;
}
_154.appendChild(oIF);
var oF=window.frames[name];
var oD=oF.document;
oD.open();
oD.write("<html><head></head><body style=\"margin:0;background-color:white;\"><span id=\"bodySpan\" class=\"ntb-combobox-list-outer-border\" style=\"overflow:hidden;float:left;border-width:1px;border-style:solid;width:"+(w-(nitobi.browser.MOZ?2:0))+";height:"+(h-(nitobi.browser.MOZ?2:0))+";\"></span></body></html>");
oD.close();
var dss=d.styleSheets;
var ss=oD.createElement("LINK");
for(var i=0,n=dss.length;i<n;i++){
var ss2=ss.cloneNode(true);
ss2.rel=(nitobi.browser.IE?dss[i].owningElement.rel:dss[i].ownerNode.rel);
ss2.type="text/css";
ss2.href=dss[i].href;
ss2.title=dss[i].title;
oD.body.appendChild(ss2);
}
var head=oD.getElementsByTagName("head")[0];
var ds=(d.scripts?d.scripts:d.getElementsByTagName("script"));
var st=oD.createElement("SCRIPT");
var src=null;
for(var i=0,n=ds.length;i<n;i++){
src=ds[i].src;
if(""!=src){
var st2=st.cloneNode(true);
st2.language=ds[i].language;
st2.src=src;
head.appendChild(st2);
}
}
this.oIF=oIF;
this.oF=oF;
this.d=oD;
this.bodySpan=oD.getElementById("bodySpan");
this.bodySpanStyle=this.bodySpan.style;
if(window.addEventListener){
window.addEventListener("resize",this,false);
}else{
if(window.attachEvent){
if(!window.g_Iframe_oIFs){
window.g_Iframe_oIFs=new Array;
window.g_Iframe_onresize=window.onresize;
Iframe_oResize();
window.onresize=window.oResize.check1;
}
window.g_Iframe_oIFs[name]=this;
}
}
}
Iframe.prototype.Unload=Iframe_Unload;
function Iframe_Unload(){
if(this.oIF){
delete this.oIF;
}
}
var g_Iframe_oIFs=null;
var g_Iframe_onresize=null;
function Iframe_onafterresize(){
for(var f in window.g_Iframe_oIFs){
var oIF=window.g_Iframe_oIFs[f];
oIF.attach();
}
if(window.g_Iframe_onresize){
window.g_Iframe_onresize();
}
}
function Iframe_dfxWinXY(w){
var b,d,x,y;
x=y=0;
var d=window.document;
if(d.body){
b=d.documentElement.clientWidth?d.documentElement:d.body;
x=b.clientWidth||0;
y=b.clientHeight||0;
}
return {x:x,y:y};
}
function Iframe_oResize(){
window.oResize={CHECKTIME:500,oldXY:Iframe_dfxWinXY(window),timerId:0,check1:function(){
window.oResize.check2();
},check2:function(){
if(this.timerId){
window.clearTimeout(this.timerId);
}
this.timerId=setTimeout("window.oResize.check3()",this.CHECKTIME);
},check3:function(){
var _168=Iframe_dfxWinXY(window);
this.timerId=0;
if((_168.x!=this.oldXY.x)||(_168.y!=this.oldXY.y)){
this.oldXY=_168;
Iframe_onafterresize();
}
}};
}
Iframe.prototype.handleEvent=Iframe_handleEvent;
function Iframe_handleEvent(evt){
switch(evt.type){
case "resize":
if(this.isVisible()){
this.attach();
}
break;
}
}
Iframe.prototype.offset=Iframe_offset;
function Iframe_offset(o,attr,a){
var x=(a?o[attr]:0);
var _o=o;
while(o){
x+=(a?0:o[attr]);
if(nitobi.browser.IE&&"TABLE"==o.tagName&&"0"!=o.border&&""!=o.border){
x++;
}
o=o.offsetParent;
}
return x;
}
Iframe.prototype.setHeight=Iframe_setHeight;
function Iframe_setHeight(h,_170){
h=parseInt(h);
this.oIFStyle.height=h;
if(_170!=true){
this.bodySpanStyle.height=(h-(nitobi.browser.MOZ?parseInt(this.bodySpanStyle.borderTopWidth)+parseInt(this.bodySpanStyle.borderBottomWidth):0));
}
}
Iframe.prototype.setWidth=Iframe_setWidth;
function Iframe_setWidth(w){
w=parseInt(w);
this.oIFStyle.width=w;
this.bodySpanStyle.width=(w-(nitobi.browser.MOZ?parseInt(this.bodySpanStyle.borderLeftWidth)+parseInt(this.bodySpanStyle.borderRightWidth):0));
}
Iframe.prototype.show=Iframe_show;
function Iframe_show(){
this.attach();
this.oIFStyle.display="inline";
}
Iframe.prototype.hide=Iframe_hide;
function Iframe_hide(){
this.oIFStyle.display="none";
}
Iframe.prototype.toggle=Iframe_toggle;
function Iframe_toggle(){
if(this.isVisible()){
this.hide();
}else{
this.show();
}
}
Iframe.prototype.isVisible=Iframe_isVisible;
function Iframe_isVisible(){
return "inline"==this.oIFStyle.display;
}
Iframe.prototype.attach=Iframe_attach;
function Iframe_attach(){
var _172=this.attachee;
var a=(_172.offsetParent&&"absolute"==_172.offsetParent.style.position);
this.oIFStyle.top=this.offset(_172,"offsetTop",a)+_172.offsetHeight-1+(a?parseInt(_172.offsetParent.style.top):0);
this.oIFStyle.left=this.offset(_172,"offsetLeft",a)+(a?parseInt(_172.offsetParent.style.left):0);
}
var EbaComboUiServerError=0;
var EbaComboUiNoRecords=1;
var EbaComboUiEndOfRecords=2;
var EbaComboUiNumRecords=3;
var EbaComboUiPleaseWait=4;
nitobi.combo.createLanguagePack=function(){
try{
if(typeof (EbaComboUi)=="undefined"){
EbaComboUi=new Array();
EbaComboUi[EbaComboUiServerError]="The ComboBox tried to retrieve information from the server, but an error occured. Please try again later.";
EbaComboUi[EbaComboUiNoRecords]="No new records.";
EbaComboUi[EbaComboUiEndOfRecords]="End of records.";
EbaComboUi[EbaComboUiNumRecords]=" records.";
EbaComboUi[EbaComboUiPleaseWait]="Please Wait...";
}
}
catch(err){
alert("The default language pack could not be loaded.  "+err.message);
}
};
nitobi.lang.defineNs("nitobi.combo");
EBAComboBoxListHeader=0;
EBAComboBoxListBody=1;
EBAComboBoxListFooter=2;
EBAComboBoxListBodyTable=3;
EBAComboBoxListNumSections=4;
EBAComboBoxList=5;
EBADatabaseSearchTimeoutStatus_WAIT=0;
EBADatabaseSearchTimeoutStatus_EXPIRED=1;
EBADatabaseSearchTimeoutStatus_NONE=2;
EBADatabaseSearchTimeoutWait=200;
EBAMoveAction_UP=0;
EBAMoveAction_DOWN=1;
EBAScrollToNone=0;
EBAScrollToTop=1;
EBAScrollToBottom=2;
EBAScrollToNewTop=3;
EBAScrollToTypeAhead=4;
EBAScrollToNewBottom=5;
EBAComboSearchNoRecords=0;
EBAComboSearchNewRecords=1;
EBADefaultScrollbarSize=18;
nitobi.combo.List=function(_174,_175,_176,_177){
this.m_Rendered=false;
var _178="ntb-combobox-button";
var _179="150px";
var _17a=new Array("50px","100px","50px");
var _17b=new Array("ntb-combobox-list-header","ntb-combobox-list-body","ntb-combobox-list-footer","ntb-combobox-list-body-table");
var _17c="ntb-combobox-list-body-table-row-highlighted";
var _17d="highlight";
var _17e="highlighttext";
var _17f="";
var _180=-1;
var _181=_177.mode=="default";
var _182="hidden";
var _183=false;
var _184=_177.mode!="default";
var _185;
if(_177.mode!="classic"){
_185=10;
}else{
_185=25;
}
var _186="";
var _187="";
var _188="";
var _189="";
var _18a=0;
var _18b=0;
var _18c="EBA:Combo could not correctly transform XML data. Do you have the MS XML libraries installed? These are typically installed with your browser and are freely available from Microsoft.";
var _18d="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\" xmlns:eba=\"http://developer.ebusiness-apps.com\" xmlns:ntb=\"http://www.nitobi.com\" exclude-result-prefixes=\"eba ntb\">"+"<xsl:output method=\"xml\" version=\"4.0\" omit-xml-declaration=\"yes\" />"+"<xsl:template match=\"/\">"+"<xsl:apply-templates select=\"eba:ComboValues|ntb:ComboValues\"/>"+"</xsl:template>"+"<xsl:template match=\"/eba:ComboValues|ntb:ComboValues\">"+"<root>"+"<xsl:attribute name=\"fields\"><xsl:value-of select=\"@fields\" /></xsl:attribute>"+"\t<xsl:apply-templates/>"+"</root>"+"</xsl:template>"+"<xsl:template match=\"eba:ComboValue|eba:combovalue|ntb:ComboValue|ntb:combovalue\">"+"\t<e><xsl:for-each select=\"@*\"><xsl:attribute name=\"{name()}\"><xsl:value-of select=\".\"/></xsl:attribute></xsl:for-each></e>"+"</xsl:template>"+"</xsl:stylesheet>";
this.SetCombo(_177);
var ps=(_174?_174.getAttribute("PageSize"):null);
((null==ps)||(""==ps))?this.SetPageSize(_185):this.SetPageSize(parseInt(ps));
this.clip=(_177.mode=="smartsearch"||_177.mode=="smartlist"||_177.mode=="filter");
var _18f=(_174?_174.getAttribute("ClipLength"):null);
((null==_18f)||(""==_18f))?this.SetClipLength(this.GetPageSize()):this.SetClipLength(_18f);
var ds=new nitobi.combo.XmlDataSource();
if(_175!=null){
ds.combo=_177;
var x=(_175?_175.getAttribute("XmlId"):"");
ds.SetXmlId(x);
var _192=document.getElementById(x);
if(!nitobi.browser.IE||null==_192){
nitobi.Browser.ConvertXmlDataIsland(x,_177.GetHttpRequestMethod());
ds.SetXmlObject(document[x],this.clip,this.clipLength);
}else{
ds.SetXmlObject(_192);
}
ds.SetLastPageSize(ds.GetNumberRows());
ds.m_Dirty=false;
}
this.SetXmlDataSource(ds);
this.m_httpRequest=new nitobi.ajax.HttpRequest();
this.m_httpRequest.responseType="text";
this.m_httpRequest.onRequestComplete.subscribe(this.onGetComplete,this);
this.unboundMode=false;
if(!_175){
this.unboundMode=true;
var _193=null;
var _194="<eba:ComboValues fields='"+_176.getAttribute("fields")+"' xmlns:eba='http://developer.ebusiness-apps.com' xmlns:ntb='http://www.nitobi.com'>";
if(nitobi.browser.IE){
var _195=_176.innerHTML.match(/<\?xml:namespace.*?\/>(.*)/);
_194+=_195[1]+"</eba:ComboValues>";
}else{
_194+=_176.innerHTML+"</eba:ComboValues>";
}
_194=nitobi.Browser.EncodeAngleBracketsInTagAttributes(_194,_177).replace(/&nbsp;/g,"&#160;").replace(/>\s+</g,"><");
try{
var oXSL=nitobi.xml.createXmlDoc(_18d);
tmp=nitobi.xml.createXmlDoc(_194);
xmlObject=nitobi.xml.transformToXml(tmp,oXSL);
this.GetXmlDataSource().SetXmlObject(xmlObject);
this.GetXmlDataSource().m_Dirty=false;
}
catch(err){
alert(_18c);
}
}
this.m_SectionHTMLTagObjects=new Array;
this.m_SectionCSSClassNames=new Array;
this.m_SectionHeights=new Array;
this.m_ListColumnDefinitions=new Array;
var _197=null;
var _198=0;
var _199=null;
var _19a=this.GetCombo().GetDataTextField();
var _19b=false;
var _19c=true;
while(_19c){
if(_19a!=null||_19b==true){
var _19d=new Object;
_19d.DataFieldIndex=this.GetXmlDataSource().GetColumnIndex(_19a);
_19d.DataValueIndex=this.GetXmlDataSource().GetColumnIndex(_177.GetDataValueField());
_19d.HeaderLabel="";
_19d.Width="100%";
this.m_ListColumnDefinitions[0]=new nitobi.combo.ListColumnDefinition(_19d);
_19c=false;
}else{
var _19e=_174;
if((null==_174)||(0==_174.childNodes.length)){
_19e=_177.m_userTag;
}
var _19f=null;
for(var i=0;i<_19e.childNodes.length;i++){
_197=_19e.childNodes[i];
_19f=_197.tagName;
if(_19f){
_19f=_19f.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"");
if(_19f=="combocolumndefinition"){
this.m_ListColumnDefinitions[_198]=new nitobi.combo.ListColumnDefinition(_197);
_198++;
_19c=false;
}
}
}
_19b=true;
}
}
var _1a1=(_174?_174.getAttribute("Width"):null);
((null==_1a1)||(""==_1a1))?this.SetWidth(_179):this.SetWidth(_1a1);
var _1a2=(_174?_174.getAttribute("Overflow-y"):null);
this.m_overflowy=((null==_1a2)||(""==_1a2))?_182:_1a2;
var chh=(_174?_174.getAttribute("CustomHTMLHeader"):null);
((null==chh)||(""==chh))?this.SetCustomHTMLHeader(""):this.SetCustomHTMLHeader(chh);
for(var i=0;i<EBAComboBoxListNumSections;i++){
this.SetSectionCSSClassName(i,_17b[i]);
}
for(var i=0;i<=EBAComboBoxListFooter;i++){
this.SetSectionHeight(i,_17a[i]);
}
var _1a4=(_174?_174.getAttribute("Height"):null);
((null==_1a4)||(""==_1a4))?null:this.SetHeight(parseInt(_1a4));
var hccn=(_174?_174.getAttribute("HighlightCSSClassName"):null);
if((null==hccn)||(""==hccn)){
this.SetHighlightCSSClassName(_17c);
this.m_UseHighlightClass=false;
}else{
this.SetHighlightCSSClassName(hccn);
this.m_UseHighlightClass=true;
}
var bhc=(_174?_174.getAttribute("BackgroundHighlightColor"):null);
((null==bhc)||(""==bhc))?this.SetBackgroundHighlightColor(_17d):this.SetBackgroundHighlightColor(bhc);
var ohe=(_174?_174.getAttribute("OnHideEvent"):null);
((null==ohe)||(""==ohe))?this.SetOnHideEvent(_186):this.SetOnHideEvent(ohe);
var ose=(_174?_174.getAttribute("OnShowEvent"):null);
((null==ose)||(""==ose))?this.SetOnShowEvent(_187):this.SetOnShowEvent(ose);
var onbs=(_174?_174.getAttribute("OnBeforeSearchEvent"):null);
((null==onbs)||(""==onbs))?this.SetOnBeforeSearchEvent(_188):this.SetOnBeforeSearchEvent(onbs);
var onas=(_174?_174.getAttribute("OnAfterSearchEvent"):null);
((null==onas)||(""==onas))?this.SetOnAfterSearchEvent(_189):this.SetOnAfterSearchEvent(onas);
var fhc=(_174?_174.getAttribute("ForegroundHighlightColor"):null);
((null==fhc)||(""==fhc))?this.SetForegroundHighlightColor(_17e):this.SetForegroundHighlightColor(fhc);
var offx=(_174?_174.getAttribute("OffsetX"):null);
((null==offx)||(""==offx))?this.SetOffsetX(_18a):this.SetOffsetX(offx);
var offy=(_174?_174.getAttribute("OffsetY"):null);
((null==offy)||(""==offy))?this.SetOffsetY(_18b):this.SetOffsetY(offy);
var sri=(_174?_174.parentNode.getAttribute("SelectedRowIndex"):null);
((null==sri)||(""==sri))?this.SetSelectedRowIndex(_180):this.SetSelectedRowIndex(parseInt(sri));
var chd=(_174?_174.getAttribute("CustomHTMLDefinition"):null);
((null==chd)||(""==chd))?this.SetCustomHTMLDefinition(_17f):this.SetCustomHTMLDefinition(chd);
var ap=(_174?_174.getAttribute("AllowPaging"):null);
((null==ap)||(""==ap))?this.SetAllowPaging(_181):this.SetAllowPaging(ap.toLowerCase()=="true");
var fz=(_174?_174.getAttribute("FuzzySearchEnabled"):null);
((null==fz)||(""==fz))?this.SetFuzzySearchEnabled(_183):this.SetFuzzySearchEnabled(fz.toLowerCase()=="true");
var eds=(_174?_174.getAttribute("EnableDatabaseSearch"):null);
((null==eds)||(""==eds))?this.SetEnableDatabaseSearch(this.unboundMode==false&&_184):this.SetEnableDatabaseSearch(this.unboundMode==false&&eds.toLowerCase()=="true");
if(_177.mode=="default"&&this.GetAllowPaging()==true){
this.SetClipLength(this.GetPageSize());
this.clip=true;
}
this.widestColumn=new Array(this.m_ListColumnDefinitions.length);
for(var i=0;i<this.widestColumn.length;i++){
this.widestColumn[i]=0;
}
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_NONE);
var durl=(_174?_174.getAttribute("DatasourceUrl"):null);
if((null==durl)||(""==durl)||this.unboundMode==true){
this.SetDatasourceUrl(document.location.toString());
this.SetEnableDatabaseSearch(false);
this.unboundMode=true;
}else{
this.SetDatasourceUrl(durl);
this.SetEnableDatabaseSearch(true);
}
this.m_httpRequestReady=true;
this.SetNumPagesLoaded(0);
this.m_userTag=_174;
};
nitobi.combo.List.prototype.Unload=function(){
if(this.IF){
this.IF.Unload();
delete this.IF;
}
_EBAMemScrub(this);
};
nitobi.combo.List.prototype.SetClipLength=function(_1b4){
this.clipLength=_1b4;
};
nitobi.combo.List.prototype.GetHTMLTagObject=function(){
this.Render();
return this.m_HTMLTagObject;
};
nitobi.combo.List.prototype.SetHTMLTagObject=function(_1b5){
this.m_HTMLTagObject=_1b5;
};
nitobi.combo.List.prototype.GetHighlightCSSClassName=function(){
return this.m_HighlightCSSClassName;
};
nitobi.combo.List.prototype.SetHighlightCSSClassName=function(_1b6){
this.m_HighlightCSSClassName=_1b6;
};
nitobi.combo.List.prototype.GetListColumnDefinitions=function(){
return this.m_ListColumnDefinitions;
};
nitobi.combo.List.prototype.SetListColumnDefinitions=function(_1b7){
this.m_ListColumnDefinitions=_1b7;
};
nitobi.combo.List.prototype.GetCustomHTMLDefinition=function(){
return this.m_CustomHTMLDefinition;
};
nitobi.combo.List.prototype.SetCustomHTMLDefinition=function(_1b8){
this.m_CustomHTMLDefinition=_1b8;
};
nitobi.combo.List.prototype.GetCustomHTMLHeader=function(){
return this.m_CustomHTMLHeader;
};
nitobi.combo.List.prototype.SetCustomHTMLHeader=function(_1b9){
this.m_CustomHTMLHeader=_1b9;
};
nitobi.combo.List.prototype.GetCombo=function(){
return this.m_Combo;
};
nitobi.combo.List.prototype.SetCombo=function(_1ba){
this.m_Combo=_1ba;
};
nitobi.combo.List.prototype.GetXmlDataSource=function(){
return this.m_XmlDataSource;
};
nitobi.combo.List.prototype.SetXmlDataSource=function(_1bb){
this.m_XmlDataSource=_1bb;
};
nitobi.combo.List.prototype.GetWidth=function(){
return this.m_Width;
};
nitobi.combo.List.prototype.SetWidth=function(_1bc){
this.m_Width=_1bc;
if(this.m_Rendered){
this.GetHTMLTagObject().style.width=this.GetDesiredPixelWidth();
for(var i=0;i<=EBAComboBoxListFooter;i++){
if(i!=EBAComboBoxListBodyTable){
var _1be=this.GetSectionHTMLTagObject(i);
if(_1be!=null){
_1be.style.width=this.GetDesiredPixelWidth();
}
}
}
this.GenerateCss();
}
};
nitobi.combo.List.prototype.GetDesiredPixelWidth=function(){
var _1bf=this.GetCombo();
var _1c0=document.getElementById(_1bf.GetId());
var _1c1=nitobi.html.getWidth(_1c0);
var _1c2=this.GetWidth();
if(nitobi.Browser.GetMeasurementUnitType(_1c2)=="%"){
var w=(_1bf.GetWidth()==null?_1bf.GetTextBox().GetWidth():_1bf.GetWidth());
var _1c4=1/(parseInt(w)/100);
var _1c2=parseInt(_1c2)/100;
return (Math.floor(_1c1*_1c4*_1c2-2)+"px");
}else{
return _1c2;
}
};
nitobi.combo.List.prototype.GetActualPixelWidth=function(){
var tag=this.GetHTMLTagObject();
if(null==tag){
return this.GetDesiredPixelWidth();
}else{
return nitobi.Browser.GetElementWidth(tag);
}
};
nitobi.combo.List.prototype.GetCSSClassName=function(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.GetHTMLTagObject().className);
};
nitobi.combo.List.prototype.SetCSSClassName=function(_1c6){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_1c6;
}else{
this.GetHTMLTagObject().className=_1c6;
}
};
nitobi.combo.List.prototype.GetSectionHTMLTagObject=function(_1c7){
this.Render();
return this.m_SectionHTMLTagObjects[_1c7];
};
nitobi.combo.List.prototype.SetSectionHTMLTagObject=List_SetSectionHTMLTagObject;
function List_SetSectionHTMLTagObject(_1c8,_1c9){
this.m_SectionHTMLTagObjects[_1c8]=_1c9;
}
nitobi.combo.List.prototype.GetSectionCSSClassName=function(_1ca){
return (null==this.m_HTMLTagObject?this.m_SectionCSSClassNames[_1ca]:this.GetSectionHTMLTagObject(_1ca).className);
};
nitobi.combo.List.prototype.SetSectionCSSClassName=function(_1cb,_1cc){
if(null==this.m_HTMLTagObject){
this.m_SectionCSSClassNames[_1cb]=_1cc;
}else{
this.GetSectionHTMLTagObject(_1cb).className=_1cc;
}
};
nitobi.combo.List.prototype.GetSectionHeight=function(_1cd){
if(this.m_HTMLTagObject==null){
return parseInt(this.m_SectionHeights[_1cd]);
}else{
var _1ce=this.m_HTMLTagObject.style;
var top=_1ce.top;
var _1d0=_1ce.display;
var _1d1=_1ce.position;
var _1d2=_1ce.visibility;
if(_1ce.display=="none"||_1ce.visibility!="visible"){
_1ce.position="absolute";
_1ce.top="-1000px";
_1ce.display="inline";
}
var _1d3=null;
if(this.m_SectionHTMLTagObjects[_1cd]!=null){
_1d3=nitobi.html.getHeight(this.m_SectionHTMLTagObjects[_1cd]);
}
if(_1ce.display=="inline"){
_1ce.position=_1d1;
_1ce.display=_1d0;
_1ce.top=top;
}
return _1d3;
}
};
nitobi.combo.List.prototype.SetSectionHeight=function(_1d4,_1d5){
if(null==this.m_HTMLTagObject){
this.m_SectionHeights[_1d4]=_1d5;
}else{
this.GetSectionHTMLTagObject(_1d4).style.height=_1d5;
}
};
nitobi.combo.List.prototype.GetSelectedRowIndex=function(){
if(null==this.m_HTMLTagObject){
return parseInt(this.m_SelectedRowIndex);
}else{
return parseInt(document.getElementById(this.GetCombo().GetId()+"SelectedRowIndex").value);
}
};
nitobi.combo.List.prototype.SetSelectedRowIndex=function(_1d6){
if(null==this.m_HTMLTagObject){
this.m_SelectedRowIndex=_1d6;
}else{
document.getElementById(this.GetCombo().GetId()+"SelectedRowIndex").value=_1d6;
}
};
nitobi.combo.List.prototype.GetAllowPaging=function(){
return this.m_AllowPaging;
};
nitobi.combo.List.prototype.SetAllowPaging=function(_1d7){
if(this.m_HTMLTagObject!=null){
if(_1d7){
this.ShowFooter();
}else{
this.HideFooter();
}
}
this.m_AllowPaging=_1d7;
};
nitobi.combo.List.prototype.IsFuzzySearchEnabled=function(){
return this.m_FuzzySearchEnabled;
};
nitobi.combo.List.prototype.SetFuzzySearchEnabled=function(_1d8){
this.m_FuzzySearchEnabled=_1d8;
};
nitobi.combo.List.prototype.GetPageSize=function(){
return this.m_PageSize;
};
nitobi.combo.List.prototype.SetPageSize=function(_1d9){
this.m_PageSize=_1d9;
};
nitobi.combo.List.prototype.GetNumPagesLoaded=function(){
return this.m_NumPagesLoaded;
};
nitobi.combo.List.prototype.SetNumPagesLoaded=function(_1da){
this.m_NumPagesLoaded=_1da;
};
nitobi.combo.List.prototype.GetActiveRow=function(){
return this.m_ActiveRow;
};
nitobi.combo.List.prototype.SetActiveRow=function(_1db){
var _1dc;
if(null!=this.m_ActiveRow){
_1dc=document.getElementById("ContainingTableFor"+this.m_ActiveRow.id);
if(this.m_UseHighlightClass){
_1dc.className=this.m_OriginalRowClass;
}else{
_1dc.style.backgroundColor=this.m_OriginalBackgroundHighlightColor;
_1dc.style.color=this.m_OriginalForegroundHighlightColor;
}
var _1dd=this.GetListColumnDefinitions();
for(var i=0,n=_1dd.length;i<n;i++){
var _1e0=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id+"_"+i);
if(_1e0!=null){
_1e0.style.color=_1e0.savedColor;
_1e0.style.backgroundColor=_1e0.savedBackgroundColor;
}
}
}
this.m_ActiveRow=_1db;
if(null!=_1db){
if("compact"==this.GetCombo().mode&&_1db!=null){
var _1e1=this.GetRowIndex(_1db);
this.SetSelectedRow(_1e1);
}
_1dc=document.getElementById("ContainingTableFor"+_1db.id);
_1e0=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id);
if(this.m_UseHighlightClass){
this.m_OriginalRowClass=_1dc.className;
_1dc.className=this.GetHighlightCSSClassName();
}else{
this.m_OriginalBackgroundHighlightColor=_1dc.style.backgroundColor;
this.m_OriginalForegroundHighlightColor=_1dc.style.color;
_1dc.style.backgroundColor=this.m_BackgroundHighlightColor;
_1dc.style.color=this.m_ForegroundHighlightColor;
}
var _1dd=this.GetListColumnDefinitions();
for(var i=0,n=_1dd.length;i<n;i++){
var _1e0=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id+"_"+i);
if(_1e0!=null){
_1e0.savedColor=_1e0.style.color;
_1e0.savedBackgroundColor=_1e0.style.backgroundColor;
_1e0.style.color=_1dc.style.color;
_1e0.style.backgroundColor=_1dc.style.backgroundColor;
}
}
}
};
nitobi.combo.List.prototype.GetSelectedRowValues=function(){
var _1e2=new Array;
for(var i=0;i<this.GetXmlDataSource().GetNumberColumns();i++){
_1e2[i]=document.getElementById(this.GetCombo().GetId()+"SelectedValue"+i).value;
}
return _1e2;
};
nitobi.combo.List.prototype.SetSelectedRowValues=function(_1e4,Row){
this.m_SelectedRowValues=_1e4;
var _1e6=this.GetCombo().GetId();
var _1e7=this.GetXmlDataSource().GetNumberColumns();
if((null==_1e4)&&(null==Row)){
for(var i=0;i<_1e7;i++){
document.getElementById(_1e6+"SelectedValue"+i).value="";
}
}else{
if(null==Row){
for(var i=0;i<_1e7;i++){
document.getElementById(_1e6+"SelectedValue"+i).value=_1e4[i];
}
}else{
var _1e9=this.GetCombo().GetUniqueId();
var _1ea=this.GetRowIndex(Row);
var _1eb=this.GetXmlDataSource().GetRow(_1ea);
this.SetSelectedRowValues(_1eb,null);
}
}
};
nitobi.combo.List.prototype.GetEnableDatabaseSearch=function(){
return this.m_EnableDatabaseSearch;
};
nitobi.combo.List.prototype.SetEnableDatabaseSearch=function(_1ec){
this.m_EnableDatabaseSearch=_1ec;
};
nitobi.combo.List.prototype.GetFooterText=function(){
if(null==this.m_HTMLTagObject){
return this.m_FooterText;
}else{
var _1ed=document.getElementById("EBAComboBoxListFooterPageNextButton"+this.GetCombo().GetUniqueId());
return (null!=_1ed?_1ed.innerHTML:"");
}
};
nitobi.combo.List.prototype.SetFooterText=function(_1ee){
if(null==this.m_HTMLTagObject){
this.m_FooterText=_1ee;
}else{
var _1ef=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
if(null!=_1ef){
_1ef=document.getElementById("EBAComboBoxListFooterPageNextButton"+this.GetCombo().GetUniqueId());
if(null!=_1ef){
_1ef.innerHTML=_1ee;
}
}
}
};
nitobi.combo.List.prototype.GetDatabaseSearchTimeoutStatus=function(){
return this.m_DatabaseSearchTimeoutStatus;
};
nitobi.combo.List.prototype.SetDatabaseSearchTimeoutStatus=function(_1f0){
this.m_DatabaseSearchTimeoutStatus=_1f0;
};
nitobi.combo.List.prototype.GetDatabaseSearchTimeoutId=function(){
return this.m_DatabaseSearchTimeoutId;
};
nitobi.combo.List.prototype.SetDatabaseSearchTimeoutId=function(_1f1){
this.m_DatabaseSearchTimeoutId=_1f1;
};
nitobi.combo.List.prototype.GetHeight=function(){
return this.GetSectionHeight(EBAComboBoxListBody);
};
nitobi.combo.List.prototype.SetHeight=function(_1f2){
this.SetSectionHeight(EBAComboBoxListBody,parseInt(_1f2));
};
nitobi.combo.List.prototype.GetActualHeight=function(){
var uid=this.GetCombo().GetUniqueId();
var tag=this.GetHTMLTagObject();
var _1f5=nitobi.Browser.GetElementHeight(tag);
return _1f5;
};
nitobi.combo.List.prototype.GetActualPixelHeight=nitobi.combo.List.prototype.GetActualHeight;
nitobi.combo.List.prototype.GetBackgroundHighlightColor=function(){
return this.m_BackgroundHighlightColor;
};
nitobi.combo.List.prototype.SetBackgroundHighlightColor=function(_1f6){
this.m_BackgroundHighlightColor=_1f6;
};
nitobi.combo.List.prototype.GetForegroundHighlightColor=function(){
return this.m_ForegroundHighlightColor;
};
nitobi.combo.List.prototype.SetForegroundHighlightColor=function(_1f7){
this.m_ForegroundHighlightColor=_1f7;
};
nitobi.combo.List.prototype.GetDatasourceUrl=function(){
return this.m_DatasourceUrl;
};
nitobi.combo.List.prototype.SetDatasourceUrl=function(_1f8){
this.m_DatasourceUrl=_1f8;
};
nitobi.combo.List.prototype.GetOnHideEvent=function(){
return this.m_OnHideEvent;
};
nitobi.combo.List.prototype.SetOnHideEvent=function(_1f9){
this.m_OnHideEvent=_1f9;
};
nitobi.combo.List.prototype.GetOnShowEvent=function(){
return this.m_OnShowEvent;
};
nitobi.combo.List.prototype.SetOnShowEvent=function(_1fa){
this.m_OnShowEvent=_1fa;
};
nitobi.combo.List.prototype.GetOnBeforeSearchEvent=function(){
return this.m_OnBeforeSearchEvent;
};
nitobi.combo.List.prototype.SetOnBeforeSearchEvent=function(_1fb){
this.m_OnBeforeSearchEvent=_1fb;
};
nitobi.combo.List.prototype.GetOnAfterSearchEvent=function(){
return this.m_OnAfterSearchEvent;
};
nitobi.combo.List.prototype.SetOnAfterSearchEvent=function(_1fc){
this.m_OnAfterSearchEvent=_1fc;
};
nitobi.combo.List.prototype.GetOffsetX=function(){
return this.m_OffsetX;
};
nitobi.combo.List.prototype.SetOffsetX=function(_1fd){
this.m_OffsetX=parseInt(_1fd);
};
nitobi.combo.List.prototype.GetOffsetY=function(){
return this.m_OffsetY;
};
nitobi.combo.List.prototype.SetOffsetY=function(_1fe){
this.m_OffsetY=parseInt(_1fe);
};
nitobi.combo.List.prototype.AdjustSize=function(){
var list=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var tag=this.GetHTMLTagObject();
var _201=tag.style;
var _202="";
if(true==nitobi.Browser.GetVerticalScrollBarStatus(list)){
if(nitobi.Browser.GetMeasurementUnitType(this.GetWidth())!="%"){
_202=parseInt(this.GetWidth())+nitobi.html.getScrollBarWidth(list)-(nitobi.browser.MOZ?EBADefaultScrollbarSize:0);
_202=this.GetDesiredPixelWidth();
}else{
_202=this.GetDesiredPixelWidth();
}
list.style.width=_202;
var _203=this.GetSectionHTMLTagObject(EBAComboBoxListHeader);
var _204=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
if(_203!=null){
_203.style.width=_202;
}
if(_204!=null){
_204.style.width=_202;
}
_201.width=(_202);
if(nitobi.browser.IE){
var _205=nitobi.combo.iframeBacker.style;
_205.width=_201.width;
}
}
if(nitobi.browser.IE){
var _205=nitobi.combo.iframeBacker.style;
_205.height=_201.height;
}
};
nitobi.combo.List.prototype.IsVisible=function(){
if(!this.m_Rendered){
return false;
}
var tag=this.GetHTMLTagObject();
var _207=tag.style;
return (_207.visibility=="visible");
};
nitobi.combo.List.prototype.Show=function(){
var _208=this.GetCombo();
var mode=_208.mode;
this.Render();
if(!this.m_HTMLTagObject||this.IsVisible()||mode=="compact"||this.GetXmlDataSource().GetNumberRows()==0||((mode!="default"&&mode!="unbound")&&_208.GetTextBox().m_HTMLTagObject.value=="")){
return;
}
var tag=this.GetHTMLTagObject();
var _20b=_208.GetTextBox().GetHTMLContainerObject();
var _20c=tag.style;
var _20d=nitobi.html.getHeight(_20b);
var top=nitobi.html.getCoords(_20b).y+_20d;
var left=nitobi.html.getCoords(_20b).x;
var _210=parseInt(this.GetActualPixelHeight());
var _211=parseInt(this.GetActualPixelWidth());
_20c.top=top+"px";
_20c.left=left+"px";
_20c.zIndex=_208.m_ListZIndex;
var _212=nitobi.html.getBodyArea().clientWidth;
var _213=nitobi.html.getBodyArea().clientHeight;
var _214=(document.body.scrollTop==""||parseInt(document.documentElement.scrollTop==0)?0:parseInt(document.body.scrollTop));
var _215=(document.body.scrollLeft==""||parseInt(document.documentElement.scrollLeft==0)?0:parseInt(document.body.scrollLeft));
if(parseInt(top)-_214+_210>_213){
var _216=parseInt(_20c.top)-_210-_20d;
if(_216>=0){
_20c.top=_216+"px";
}
}
if(parseInt(left)-parseInt(_215)+_211>_212){
var _217=document.getElementById(_208.GetId());
var _218=nitobi.html.getWidth(_217);
if(_211>_218){
var _219=_211-_218;
var _21a=left-_219;
if(_21a>=0){
_20c.left=_21a+"px";
}
}
}
_20c.position="absolute";
_20c.display="inline";
this.AdjustSize();
this.GenerateCss();
_20c.visibility="visible";
this.SetIFrameDimensions();
this.ShowIFrame();
eval(this.GetOnShowEvent());
};
nitobi.combo.List.prototype.SetX=function(x){
var tag=this.GetHTMLTagObject();
tag.style.left=x;
};
nitobi.combo.List.prototype.GetX=function(){
var _21d=this.GetCombo();
var _21e=nitobi.html.getCoords(_21d.GetHTMLTagObject());
return _21e.x;
};
nitobi.combo.List.prototype.SetY=function(y){
var tag=this.GetHTMLTagObject();
tag.style.top=y;
};
nitobi.combo.List.prototype.GetY=function(){
var _221=this.GetCombo().GetTextBox().GetHTMLContainerObject();
var _222=nitobi.html.getHeight(_221);
var y=nitobi.html.getCoords(_221).y+_222;
return y;
};
nitobi.combo.List.prototype.SetFrameX=function(x){
if(nitobi.browser.IE){
nitobi.combo.iframeBacker.style.left=x;
}
};
nitobi.combo.List.prototype.SetFrameY=function(y){
if(nitobi.browser.IE){
nitobi.combo.iframeBacker.style.top=y;
}
};
nitobi.combo.List.prototype.GetFrame=function(){
if(nitobi.browser.IE){
return nitobi.combo.iframeBacker;
}else{
return null;
}
};
nitobi.combo.List.prototype.ShowIFrame=function(){
if(nitobi.browser.IE){
var _226=nitobi.combo.iframeBacker.style;
_226.visibility="visible";
}
};
nitobi.combo.List.prototype.SetIFrameDimensions=function(){
if(nitobi.browser.IE){
var tag=this.GetHTMLTagObject();
var _228=nitobi.combo.iframeBacker.style;
var _229=tag.style;
_228.top=_229.top;
_228.left=_229.left;
_228.width=nitobi.Browser.GetElementWidth(tag);
_228.height=nitobi.Browser.GetElementHeight(tag);
_228.zIndex=(isNaN(parseInt(_229.zIndex))?0:parseInt(_229.zIndex)-1);
}
};
nitobi.combo.List.prototype.Hide=function(){
if(!this.m_Rendered){
return false;
}
var tag=this.GetHTMLTagObject();
var _22b=tag.style;
_22b.visibility="hidden";
if((!nitobi.browser.IE)){
_22b.display="none";
}
if(nitobi.browser.IE){
var _22c=nitobi.combo.iframeBacker.style;
_22c.visibility="hidden";
}
eval(this.GetOnHideEvent());
};
nitobi.combo.List.prototype.Toggle=function(){
if(this.IsVisible()){
this.Hide();
this.GetCombo().GetTextBox().ToggleHidden();
}else{
this.Show();
this.GetCombo().GetTextBox().ToggleShow();
}
};
nitobi.combo.List.prototype.SetActiveRowAsSelected=function(){
var _22d=this.GetCombo();
var t=_22d.GetTextBox();
var row=null;
row=this.GetActiveRow();
if(null!=row){
eval(_22d.GetOnBeforeSelectEvent());
}
if(row!=null){
this.SetSelectedRow(this.GetRowIndex(row));
if(_22d.mode!="smartlist"){
t.SetValue(this.GetSelectedRowValues()[t.GetDataFieldIndex()]);
}
}
};
nitobi.combo.List.prototype.SetSelectedRow=function(_230){
this.SetSelectedRowIndex(_230);
var _231=this.GetXmlDataSource().GetRow(_230);
this.SetSelectedRowValues(_231,null);
};
nitobi.combo.List.prototype.OnClick=function(Row){
eval(this.GetCombo().GetOnBeforeSelectEvent());
var _233=this.GetRowIndex(Row);
this.SetSelectedRowIndex(_233);
var _234=this.GetXmlDataSource().GetRow(_233);
this.SetSelectedRowValues(_234,null);
var _235=this.GetCombo();
var tb=_235.GetTextBox();
var _237=tb.GetDataFieldIndex();
if(_234.length<=_237){
alert("You have bound the textbox to a column that does not exist.\nThe textboxDataFieldIndex is "+_237+".\nThe number of values in the selected row is "+_234.length+".");
}else{
tb.SetValue(_234[_237],_235.mode=="smartlist");
}
this.Hide();
eval(_235.GetOnSelectEvent());
};
nitobi.combo.List.prototype.OnMouseWheel=function(evt){
if(nitobi.browser.IE){
var b=nitobi.Browser;
var lb=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var top=this.GetRow(0);
var bot=this.GetRow(this.GetXmlDataSource().GetNumberRows()-1);
if(null!=top){
if(evt.wheelDelta>=120){
b.WheelUp(this);
}else{
if(evt.wheelDelta<=-120){
b.WheelDown(this);
}
}
evt.cancelBubble=true;
evt.returnValue=false;
}
}
};
nitobi.combo.List.prototype.Render=function(){
if(!this.m_Rendered){
this.m_Rendered=true;
var _23d=this.GetCombo();
var _23e=document.body;
var x=nitobi.html.insertAdjacentHTML(_23e,"afterBegin",this.GetHTMLRenderString());
this.Initialize(document.getElementById("EBAComboBoxText"+_23d.GetId()));
this.OnWindowResized();
this.GenerateCss();
}
};
nitobi.combo.List.prototype.GetHTMLRenderString=function(){
var _240=this.GetCombo();
var _241="outlook";
var _242=_240.GetUniqueId();
var _243=_240.GetId();
var _244=parseInt(this.GetDesiredPixelWidth());
var _245=false;
var _246="";
if(this.m_XmlDataSource.GetXmlObject()){
var xml=null;
if(_240.mode=="default"||_240.mode=="unbound"){
xml=this.m_XmlDataSource.GetXmlObject().xml;
}else{
xml="<root></root>";
}
_246=this.GetRowHTML(xml);
}
var _248=this.GetListColumnDefinitions();
var s="";
s="<span class=\"ntb-combo-reset "+_240.theme+"\"><span id=\"EBAComboBoxList"+_242+"\" class=\"ntb-combobox-list"+"\" style=\"width: "+_244+"px;\" "+"onMouseOver=\"document.getElementById('"+this.GetCombo().GetId()+"').object.m_Over=true\" "+"onMouseOut=\"document.getElementById('"+this.GetCombo().GetId()+"').object.m_Over=false\" "+"onClick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">\n";
var tag=this.m_userTag;
var _24b=tag.childNodes;
var _24c="<span class='ntb-combobox-combo-menus ComboListWidth"+_242+"'>";
var _24d=false;
for(var i=0;i<_24b.length;i++){
if(_24b[i].nodeName.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"")=="combopanel"){
s+=_24b[i].innerHTML;
}
if(_24b[i].nodeName.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"")=="combomenu"){
_24d=true;
var icon=_24b[i].getAttribute("icon");
_24c+="<div style='"+(nitobi.browser.MOZ&&i==0?"":"")+";' class='ntb-combobox-combo-menu ComboListWidth"+_242+"' onMouseOver=\"this.className='ntb-combobox-combo-menu-highlight ComboListWidth"+_242+"'\" onmouseout=\"this.className='ntb-combobox-combo-menu ComboListWidth"+_242+"'\" onclick=\""+_24b[i].getAttribute("OnClickEvent")+"\">";
if(icon!=""){
_24c+="<img class='ntb-combobox-combo-menu-icon' align='absmiddle' src='"+icon+"'>";
}
_24c+=_24b[i].getAttribute("text")+"</div>";
}
}
_24c+="</span>";
if(_240.mode=="default"||_240.mode=="filter"||_240.mode=="unbound"){
for(var i=0;i<_248.length;i++){
if(_248[i].GetHeaderLabel()!=""){
_245=true;
}
}
var _250=this.GetCustomHTMLHeader();
if((_245==true)||(_250!="")){
s+="<span id='EBAComboBoxListHeader"+_242+"' class='ntb-combobox-list-header' style='padding:0px; margin:0px; width: "+_244+"px;' >\n";
if(_250!=""){
s+=_250;
}else{
s+="<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;' class='ComboHeader"+_242+"'>\n";
s+="<tr style='width:100%' id='EBAComboBoxColumnLabels"+_242+"' class='ntb-combobox-column-labels'>\n";
var _251="";
var _252=false;
for(var i=0;i<_248.length;i++){
var _253=_248[i].GetWidth();
_251="";
if(_248[i].GetColumnType().toLowerCase()=="hidden"){
_251+="style='display: none;'";
_248[i].SetWidth("0%");
}
var _254="comboColumn_"+i+"_"+_242;
var _255=(i>0?"style='padding-left:0px'":"");
s+="<td "+_255+" align='"+_248[i].GetAlign()+"' class='ntb-combobox-column-label "+_254+"' "+_251+">";
s+="<div class='"+_254+" ntb-combobox-column-label-text'>"+_248[i].GetHeaderLabel()+"</div>";
s+="</td>\n";
}
s+="</tr>\n";
s+="</table>\n";
}
s+="</span><br>\n";
}
}
if(_24d){
s+=_24c;
}
s+="<span id='EBAComboBoxListBody"+_242+"' class='ntb-combobox-list-body"+"' style='width:"+_244+"px;"+(_240.mode=="default"||_240.mode=="unbound"||(_240.mode=="smartsearch"&&this.GetAllowPaging())?"height: "+this.GetSectionHeight(EBAComboBoxListBody)+"px"+(this.m_overflowy=="auto"?";_overflow-y:;_overflow:auto":""):"overflow:visible")+";' onscroll=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetTextBox().GetHTMLTagObject().focus()\" "+"onmousewheel=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseWheel(event)\" "+"onfocus=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">\n";
s+=_246+"</table>"+"</span>\n";
s+="<br><span id='EBAComboBoxListFooter"+_242+"' style='width:"+_244+"px; display:"+(this.GetAllowPaging()?"inline":"none")+"' class='ntb-combobox-list-footer'>\n";
s+="<span id=\"EBAComboBoxListFooterPageNextButton"+_242+"\" style=\"width:100%\""+" class=\"ntb-combobox-list-footer-page-next-button\" "+"onMouseOver='this.className=\"ntb-combobox-list-footer-page-next-button-highlight\"' "+"onMouseOut='this.className=\"ntb-combobox-list-footer-page-next-button\"' "+"onClick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnGetNextPage(null, true);\"></span>\n";
s+="</span>\n"+"</span>\n";
s+="</span>\n";
s=s.replace(/\#<\#/g,"<").replace(/\#\>\#/g,">").replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\#EQ\#/g,"=").replace(/\#\Q\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
return s;
};
nitobi.combo.List.prototype.Initialize=function(_256){
this.attachee=_256;
var c=this.GetCombo();
var d=document;
var _259=c.GetUniqueId();
this.SetHTMLTagObject(d.getElementById("EBAComboBoxList"+_259));
this.SetSectionHTMLTagObject(EBAComboBoxListHeader,d.getElementById("EBAComboBoxListHeader"+_259));
this.SetSectionHTMLTagObject(EBAComboBoxListBody,d.getElementById("EBAComboBoxListBody"+_259));
this.SetSectionHTMLTagObject(EBAComboBoxListFooter,d.getElementById("EBAComboBoxListFooter"+_259));
this.SetSectionHTMLTagObject(EBAComboBoxListBodyTable,d.getElementById("EBAComboBoxListBodyTable"+_259));
this.SetSectionHTMLTagObject(EBAComboBoxList,d.getElementById("EBAComboBoxList"+_259));
if(c.mode=="default"&&true==this.GetAllowPaging()){
this.SetFooterText(this.GetXmlDataSource().GetNumberRows()+EbaComboUi[EbaComboUiNumRecords]);
}
this.Hide();
};
nitobi.combo.List.prototype.OnMouseOver=function(Row){
this.SetActiveRow(Row);
};
nitobi.combo.List.prototype.OnMouseOut=function(Row){
this.SetActiveRow(null);
};
nitobi.combo.List.prototype.OnFocus=function(){
var t=this.GetCombo().GetTextBox();
t.m_skipFocusOnce=true;
t.m_HTMLTagObject.focus();
};
nitobi.combo.List.prototype.OnGetNextPage=function(_25d,_25e){
if(this.m_httpRequestReady){
var _25f=this.GetXmlDataSource();
var last=null;
if(_25e==true){
var n=_25f.GetNumberRows();
if(n>0){
last=_25f.GetRowCol(n-1,this.GetCombo().GetTextBox().GetDataFieldIndex());
}
}
this.GetPage(_25f.GetNumberRows(),this.GetPageSize(),this.GetCombo().GetTextBox().GetIndexSearchTerm(),_25d,last);
this.GetCombo().GetTextBox().GetHTMLTagObject().focus();
}
};
nitobi.combo.List.prototype.OnWindowResized=function(){
if(!this.m_Rendered){
return;
}
if(nitobi.Browser.GetMeasurementUnitType(this.GetWidth())=="%"){
this.SetWidth(this.GetWidth());
}
};
nitobi.combo.List.prototype.GenerateCss=function(){
var _262=this.GetListColumnDefinitions();
var uid=this.GetCombo().GetUniqueId();
var _264="";
var _265=-1;
var list=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var sb=nitobi.html.getScrollBarWidth(list);
var _268=(nitobi.browser.MOZ?6:0);
var _269=0;
for(var i=0;i<this.widestColumn.length;i++){
_269+=this.widestColumn[i];
}
if(_269<parseInt(this.GetDesiredPixelWidth())){
_269=parseInt(this.GetDesiredPixelWidth());
}
var _26b=_269-sb-_268;
var _26c=_269-sb-_268;
var _26d=nitobi.html.Css.addRule;
if(this.stylesheet==null){
this.stylesheet=nitobi.html.Css.createStyleSheet();
}
var ss=this.stylesheet.sheet;
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
_26d(ss,".ComboRow"+uid,"width:"+(_269-sb)+"px;}");
_26d(ss,".ComboHeader"+uid,"width:"+(_269-sb+3)+"px;}");
_26d(ss,".ComboListWidth"+uid,"width:"+(_269)+"px;");
}else{
_264+=".ComboRow"+uid+"{width:"+(_269-sb)+"px;}";
_264+=".ComboHeader"+uid+"{width:"+(_269-sb+3)+"px;}";
_264+=".ComboListWidth"+uid+"{width:"+(_269)+"px;}";
}
for(var i=0;i<_262.length;i++){
var _26f=_262[i].GetWidth();
if(nitobi.Browser.GetMeasurementUnitType(_26f)=="%"&&_26f!="*"){
_26f=Math.floor((parseInt(_26f)/100)*_26c);
}else{
if(_26f!="*"){
_26f=parseInt(_26f);
}
}
if(_26f=="*"||(i==_262.length-1&&_265==-1)){
_265=i;
}else{
if(_26f<this.widestColumn[i]){
_26f=this.widestColumn[i];
}
_26b-=parseInt(_26f);
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
_26d(ss,".comboColumn_"+i+"_"+uid,"width:"+(_26f)+"px;");
}else{
_264+=".comboColumn_"+i+"_"+uid+"{ width: "+(_26f)+"px;}";
}
}
}
if(_265!=-1){
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
_26d(ss,".comboColumn_"+_265+"_"+uid,"width:"+_26b+"px;");
}else{
_264+=".comboColumn_"+_265+"_"+uid+"{ width: "+_26b+"px;}";
}
}
nitobi.html.Css.setStyleSheetValue(this.stylesheet,_264);
};
nitobi.combo.List.prototype.ClearCss=function(){
if(this.stylesheet==null){
this.stylesheet=document.createStyleSheet();
}
this.stylesheet.cssText="";
};
nitobi.combo.List.prototype.GetRowHTML=function(XML,_271){
var _272=this.GetCombo();
var _273=_272.GetId();
var _274=_272.GetUniqueId();
var _275=this.GetListColumnDefinitions();
var _276=parseInt(this.GetWidth());
var xsl="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"  >";
xsl+="<xsl:output method=\"xml\" version=\"4.0\" omit-xml-declaration=\"yes\" />\n"+"<xsl:template match=\"/\">"+"<table cellspacing=\"0\" cellpadding=\"0\" id=\"EBAComboBoxListBodyTable"+_274+"_"+this.GetNumPagesLoaded()+"\" class=\"ntb-combobox-list-body-table ComboRow"+_274+"\">\n"+"<xsl:apply-templates />"+"</table>"+"</xsl:template>";
xsl+="<xsl:template match=\"e\">";
xsl+="<tr onclick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnClick(this)\" "+"onmouseover=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseOver(this)\" "+"onmouseout=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseOut(this)\">";
xsl+="<xsl:attribute name=\"id\">";
var _278="position()+"+(this.GetXmlDataSource().GetNumberRows()-this.GetXmlDataSource().GetLastPageSize())+"-1";
var _279="EBAComboBoxRow"+_274+"_<xsl:value-of select=\""+_278+"\"/>";
xsl+=_279+"</xsl:attribute>"+"<td class='ComboRowContainerParent'><table cellspacing='0' cellpadding='0' class='ntb-combobox-list-body-table-row "+"ComboRow"+_274+"' style=\"width:"+(nitobi.browser.SAFARI||nitobi.browser.CHROME?this.GetWidth():"100%")+";table-layout:fixed;\"><tbody>"+"<xsl:attribute name=\"id\">"+"ContainingTableFor"+_279+"</xsl:attribute>"+"<tr class='ComboRowContainer'>";
var _27a=this.GetCustomHTMLDefinition();
var _27b;
var _27c="";
if(""==_27a){
for(var i=0;i<_275.length;i++){
var _27e="";
var _27f=_275[i].GetColumnType().toLowerCase();
if(_27f=="hidden"){
_27e+="style='display: none;'";
}
var _280="comboColumn_"+i+"_"+_274;
_27c+="<col class=\""+_280+"\" style=\"width:"+_275[i].GetWidth()+"\" />";
xsl+="<td align='"+_275[i].GetAlign()+"' class='"+_280+" "+_275[i].GetCSSClassName()+"' "+_27e+" style=\"width:"+_275[i].GetWidth()+"\">";
xsl+="<div class=\""+(nitobi.browser.IE||nitobi.browser.SAFARI||nitobi.browser.CHROME?_280+" ":"")+_275[i].GetCSSClassName()+"Cell\" style=\"color:"+_275[i].GetTextColor()+";overflow:hidden;\" onfocus=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\""+" onmouseover=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">";
xsl+="<xsl:attribute name=\"id\">"+"ContainingSpanFor"+_279+"_"+i+"</xsl:attribute>"+"<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_275[i].GetHTMLPrefix()+""+"]]>"+"</xsl:text>";
_27b=_275[i].GetDataFieldIndex();
if(null==_27b){
_27b=i;
}
_27b=parseInt(_27b);
var _281="";
if(_27f=="image"){
_281=_275[i].GetImageHandlerURL();
_281.indexOf("?")==-1?_281+="?":_281+="&";
_281+="image=";
xsl+="<img> <xsl:attribute name=\"align\"><xsl:value-of  select=\"absmiddle\"/></xsl:attribute>"+"<xsl:attribute name=\"src\"><xsl:value-of select=\"concat('"+(_275[i].ImageUrlFromData?"":_281)+"',"+"@"+String.fromCharCode(97+_27b)+")\"/></xsl:attribute>"+"</img>";
}
if((_271!=null)&&(_27f!="image")){
xsl+="<xsl:call-template name=\"bold\"><xsl:with-param name=\"string\">";
}
if(_27f!="image"){
xsl+="<xsl:value-of select=\"@"+String.fromCharCode(97+_27b)+"\"></xsl:value-of>";
}
if((_271!=null)&&(_27f!="image")){
xsl+="</xsl:with-param><xsl:with-param name=\"pattern\" select=\""+nitobi.xml.constructValidXpathQuery(_271,true)+"\"></xsl:with-param></xsl:call-template>";
}
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_275[i].GetHTMLSuffix()+""+"]]>"+"</xsl:text>";
xsl+="</div>";
xsl+="</td>";
}
}else{
xsl+="<td width='100%'>";
var done=false;
var _283=0;
var _284=0;
var _285=0;
var _286;
while(!done){
_283=_27a.indexOf("${",_284);
if(_283!=-1){
_284=_27a.indexOf("}",_283);
_286=_27a.substr(_283+2,_284-_283-2);
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_27a.substr(_285,_283-_285)+"]]>"+"</xsl:text>";
xsl+="<xsl:value-of select=\"@"+String.fromCharCode(parseInt(_286)+97)+"\"></xsl:value-of>";
_285=_284+1;
}else{
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_27a.substr(_285)+"]]>"+"</xsl:text>";
done=true;
}
}
xsl+="</td>";
}
xsl+="</tr></tbody><colgroup>"+_27c+"</colgroup></table></td></tr>\n"+"</xsl:template>";
if(_271!=null){
xsl+="<xsl:template name=\"bold\">"+"<xsl:param name=\"string\" select=\"''\" /><xsl:param name=\"pattern\" select=\"''\" /><xsl:param name=\"carryover\" select=\"''\" />";
xsl+="<xsl:variable name=\"lcstring\" select=\"translate($string,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')\"/>"+"<xsl:variable name=\"lcpattern\" select=\"translate($pattern,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')\"/>";
xsl+="<xsl:choose>"+"<xsl:when test=\"$pattern != '' and $string != '' and contains($lcstring,$lcpattern)\">"+"<xsl:variable name=\"newpattern\" select=\"substring($string,string-length(substring-before($lcstring,$lcpattern)) + 1, string-length($pattern))\"/>"+"<xsl:variable name=\"before\" select=\"substring-before($string, $newpattern)\" />"+"<xsl:variable name=\"len\" select=\"string-length($before)\" />"+"<xsl:variable name=\"newcarryover\" select=\"boolean($len&gt;0 and contains(substring($before,$len,1),'%'))\" />"+"<xsl:value-of select=\"$before\" />"+"<xsl:choose>"+"<xsl:when test=\"($len=0 and $carryover) or $newcarryover or ($len&gt;1 and contains(substring($before,$len - 1,1),'%'))\">"+"<xsl:copy-of select=\"$newpattern\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<b><xsl:copy-of select=\"$newpattern\" /></b>"+"</xsl:otherwise></xsl:choose>"+"<xsl:call-template name=\"bold\">"+"<xsl:with-param name=\"string\" select=\"substring-after($string, $newpattern)\" />"+"<xsl:with-param name=\"pattern\" select=\"$pattern\" />"+"<xsl:with-param name=\"carryover\" select=\"$newcarryover\" />"+"</xsl:call-template>"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"$string\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:template>";
}
xsl+="</xsl:stylesheet>";
oXSL=nitobi.xml.createXmlDoc(xsl);
tmp=nitobi.xml.createXmlDoc(XML.replace(/>\s+</g,"><"));
var html=nitobi.xml.serialize(nitobi.xml.transformToXml(tmp,oXSL));
html=html.replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\#\&eq\;\#/g,"=").replace(/\#\&quot\;\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
return html;
};
nitobi.combo.List.prototype.ScrollIntoView=function(Row,Top,_28a){
if(Row&&this.GetCombo().mode!="compact"){
var _28b=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
if(nitobi.Browser.IsObjectInView(Row,_28b,Top,_28a)==false){
nitobi.Browser.ScrollIntoView(Row,_28b,Top);
}
}
};
nitobi.combo.List.prototype.GetRowIndex=function(Row){
var vals=Row.id.split("_");
var _28e=vals[vals.length-1];
return _28e;
};
EBAComboListDatasourceAccessStatus_BUSY=0;
EBAComboListDatasourceAccessStatus_READY=1;
nitobi.combo.List.prototype.GetDatasourceAccessStatus=function(){
if(this.m_httpRequestReady){
return EBAComboListDatasourceAccessStatus_READY;
}else{
return EBAComboListDatasourceAccessStatus_BUSY;
}
};
nitobi.combo.List.prototype.Eval=function(_28f){
eval(_28f);
};
nitobi.combo.List.prototype.GetPage=function(_290,_291,_292,_293,_294,_295,_296,_297){
var _298=new Date().getTime();
this.SetFooterText(EbaComboUi[EbaComboUiPleaseWait]);
if(_294==null){
_294="";
}
this.m_httpRequest=new nitobi.ajax.HttpRequest();
this.m_httpRequest.responseType="text";
this.m_httpRequest.onRequestComplete.subscribe(this.onGetComplete,this);
this.lastHttpRequestTime=_298;
if(null==_293){
_293=EBAScrollToNone;
}
this.m_OriginalSearchSubstring=_292;
var _299=this.GetDatasourceUrl();
_299.indexOf("?")==-1?_299+="?":_299+="&";
_299+="StartingRecordIndex="+_290+"&PageSize="+_291+"&SearchSubstring="+encodeURIComponent(_292)+"&ComboId="+encodeURI(this.GetCombo().GetId())+"&LastString="+encodeURIComponent(_294);
this.m_httpRequest.open(this.GetCombo().GetHttpRequestMethod(),_299,true,"","");
this.m_httpRequestReady=false;
this.m_httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
this.m_httpRequest.params={StartingRecordIndex:_290,SearchSubstring:_292,ScrollTo:_293,GetPageCallback:_295,SearchColumnIndex:_296,SearchCallback:_297,RequestTime:_298};
var vs=document.getElementsByName("__VIEWSTATE");
if((vs!=null)&&(vs["__VIEWSTATE"]!=null)){
var _29b="__VIEWSTATE="+encodeURI(vs["__VIEWSTATE"].value).replace(/\+/g,"%2B");
var _29c="__EVENTTARGET="+encodeURI(this.GetCombo().GetId());
var args="__EVENTARGUMENT=GetPage";
var _29e=_29c+"&"+args+"&"+_29b;
this.m_httpRequest.send(_29e);
}else{
this.m_httpRequest.send("EBA Combo Box Get Page Request");
}
return true;
};
nitobi.combo.List.prototype.onGetComplete=function(_29f){
var _2a0=_29f.params;
if(this.lastHttpRequestTime!=_2a0.RequestTime){
return;
}
var co=this.GetCombo();
var t=co.GetTextBox();
var list=co.GetList();
if(list==null){
alert(EbaComboUi[EbaComboUiServerError]);
}
var _2a4=_29f.response;
var _2a5=_2a4.indexOf("<?xml");
if(_2a5!=-1){
_2a4=_2a4.substr(_2a5);
}
var _2a6=list.GetXmlDataSource();
var _2a7=_2a6.GetNumberRows();
var tmp=nitobi.xml.createXmlDoc(_2a4);
if(true==list.clip){
tmp=xbClipXml(tmp,"root","e",list.clipLength);
_2a4=tmp.xml;
}
var _2a9=tmp.selectNodes("//e").length;
var _2aa=co.mode!="default"&&!(co.mode=="smartsearch"&&list.GetAllowPaging());
if((_2a9>0)&&(_2a0.StartingRecordIndex==0)||_2aa){
list.Clear();
_2a6.Clear();
}
if(_2a9==0&&_2aa){
list.Hide();
}
if(_2a9>0){
_2a6.AddPage(_2a4);
var ss=null;
if(co.mode=="smartsearch"||co.mode=="smartlist"){
ss=list.searchSubstring;
}
list.AddPage(_2a4,ss);
if((_2a0.StartingRecordIndex==0)&&(list.GetCombo().GetTextBox().GetSearchTerm()!="")){
list.SetActiveRow(list.GetRow(0));
}
var _2ac=false;
try{
if(!list.IsFuzzySearchEnabled()){
var _2ad=_2a6.Search(list.m_OriginalSearchSubstring,t.GetDataFieldIndex(),co.mode=="smartsearch"||co.mode=="smartlist");
_2ac=(_2ad==-1);
}
}
catch(err){
}
var _2ae=list.IsVisible();
if(EBAScrollToBottom==_2a0.ScrollTo){
var r=list.GetRow(_2a7-1);
list.SetActiveRow(r);
list.ScrollIntoView(r,false);
}else{
if(EBAScrollToNewTop==_2a0.ScrollTo||EBAScrollToNewBottom==_2a0.ScrollTo){
var r=list.GetRow(_2a7);
list.SetActiveRow(r);
list.ScrollIntoView(r,EBAScrollToNewTop==_2a0.ScrollTo);
var tb=t.m_HTMLTagObject;
tb.value=list.GetXmlDataSource().GetRowCol(_2a7,t.GetDataFieldIndex());
nitobi.html.setCursor(tb,tb.value.length);
t.Paging=false;
}else{
if(_2ae){
list.ScrollIntoView(list.GetActiveRow(),true);
}
}
}
try{
if(!_2ac&&_2a0.GetPageCallback){
_2a0.GetPageCallback(EBAComboSearchNewRecords,list,_2a0.SearchSubstring,_2a0.SearchColumnIndex,_2a0.SearchCallback);
}
}
catch(err){
}
}else{
try{
if(_2a0.GetPageCallback){
_2a0.GetPageCallback(EBAComboSearchNoRecords,list,_2a0.SearchSubstring,_2a0.SearchColumnIndex,_2a0.SearchCallback);
}
}
catch(err){
}
list.SetFooterText(EbaComboUi[EbaComboUiNoRecords]);
list.SetActiveRow(null);
}
if(list.InitialSearchOnce==true&&_2a9>0){
list.InitialSearchOnce=false;
var row=list.GetRow(0);
list.SetActiveRow(row);
list.SetSelectedRowValues(null,row);
list.SetSelectedRowIndex(0);
var tb=co.GetTextBox();
tb.SetValue(list.GetSelectedRowValues()[tb.GetDataFieldIndex()]);
}
list.m_httpRequestReady=true;
t.Paging=false;
};
nitobi.combo.List.prototype.Search=function(_2b2,_2b3,_2b4,_2b5){
var _2b6=this.GetCombo();
var _2b7=this.GetXmlDataSource();
if(_2b6.mode!="default"&&_2b2==""){
this.Hide();
return;
}
if(null==_2b5){
_2b5=false;
}
eval(this.GetOnBeforeSearchEvent());
var _2b8=-1;
if(!this.GetEnableDatabaseSearch()||!_2b7.m_Dirty||_2b6.mode=="unbound"){
_2b8=_2b7.Search(_2b2,_2b3,_2b6.mode=="smartsearch"||_2b6.mode=="smartlist");
if(_2b8>-1&&this.InitialSearchOnce!=true){
this.Show();
}
if(-1!=_2b8){
if(_2b4){
try{
_2b4(_2b8,this);
}
catch(err){
}
}
eval(this.GetOnAfterSearchEvent());
}
if(-1==_2b8&&(false==this.GetEnableDatabaseSearch()||_2b5)){
if(_2b4){
try{
_2b4(_2b8,this);
}
catch(err){
}
}
eval(this.GetOnAfterSearchEvent());
}
}
this.searchSubstring=_2b2;
if((-1==_2b8)&&(this.GetEnableDatabaseSearch()==true&&(_2b5==false))){
var _2b9=this.GetDatabaseSearchTimeoutStatus();
var _2ba="var list = document.getElementById('"+_2b6.GetId()+"').object.GetList(); "+"list.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_EXPIRED);"+"var textbox = document.getElementById('"+_2b6.GetId()+"').object.GetTextBox();"+"list.Search(textbox.GetSearchTerm(),textbox.GetDataFieldIndex(),textbox.m_Callback);";
var _2bb=this.GetDatabaseSearchTimeoutId();
_2b6.GetTextBox().SetIndexSearchTerm(_2b2);
switch(_2b9){
case (EBADatabaseSearchTimeoutStatus_EXPIRED):
if(_2bb!=null){
window.clearTimeout(_2bb);
}
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_NONE);
var _2bc=_ListGetPageCallback;
this.GetPage(0,this.GetPageSize(),_2b2,EBAScrollToTypeAhead,null,_2bc,_2b3,_2b4);
break;
case (EBADatabaseSearchTimeoutStatus_WAIT):
if(_2bb!=null){
window.clearTimeout(_2bb);
}
var _2bb=window.setTimeout(_2ba,EBADatabaseSearchTimeoutWait);
this.SetDatabaseSearchTimeoutId(_2bb);
case (EBADatabaseSearchTimeoutStatus_NONE):
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_WAIT);
var _2bb=window.setTimeout(_2ba,EBADatabaseSearchTimeoutWait);
this.SetDatabaseSearchTimeoutId(_2bb);
}
}
};
function _ListGetPageCallback(_2bd,list,_2bf,_2c0,_2c1){
if((list==null)){
alert(EbaComboUi[EbaComboUiServerError]);
}
if(_2bd==EBAComboSearchNewRecords){
if(!list.IsFuzzySearchEnabled()){
list.Search(_2bf,_2c0,_2c1);
}else{
list.Show();
}
}else{
_2c1(-1,list);
list.Eval(list.GetOnAfterSearchEvent());
}
}
nitobi.combo.List.prototype.Clear=function(){
var _2c2=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
_2c2.innerHTML="";
this.SetSelectedRowIndex(-1);
this.SetSelectedRowValues(null);
};
nitobi.combo.List.prototype.FitContent=function(){
var _2c3=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var _2c4=_2c3.childNodes[_2c3.childNodes.length-1];
var row=_2c4;
while(row.childNodes[0]!=null&&row.childNodes[0].className.indexOf("ComboBoxListColumnDefinition")==-1){
row=row.childNodes[0];
}
for(var i=0;i<row.childNodes.length;i++){
var _2c7=nitobi.html.getWidth(row.childNodes[0]);
if(this.widestColumn[i]<_2c7){
this.widestColumn[i]=_2c7;
}
}
};
nitobi.combo.List.prototype.AddPage=function(_2c8,_2c9){
var _2ca=this.GetXmlDataSource();
var tmp=nitobi.xml.createXmlDoc(_2c8);
var _2cc=tmp.selectNodes("//e").length;
if(_2cc>0){
var html=this.GetRowHTML(_2c8,_2c9);
var _2ce=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
nitobi.html.insertAdjacentHTML(_2ce,"beforeEnd",html,true);
this.GenerateCss();
}
var _2cf=_2ca.GetLastPageSize();
if(0==_2cc){
this.SetFooterText(EbaComboUi[EbaComboUiEndOfRecords]);
}else{
this.SetFooterText(_2ca.GetNumberRows()+EbaComboUi[EbaComboUiNumRecords]);
}
this.AdjustSize();
this.SetIFrameDimensions();
};
nitobi.combo.List.prototype.HideFooter=function(){
var _2d0=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
var _2d1=_2d0.style;
_2d1.display="none";
};
nitobi.combo.List.prototype.ShowFooter=function(){
var _2d2=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
var _2d3=_2d2.style;
_2d3.display="inline";
};
nitobi.combo.List.prototype.AddRow=function(_2d4){
var xml="<root><e ";
for(var i=0;i<_2d4.length;i++){
xml+=String.fromCharCode(i+97)+"='"+nitobi.xml.encode(_2d4[i])+"' ";
}
xml+="/></root>";
this.GetXmlDataSource().AddPage(xml);
this.AddPage(xml);
};
nitobi.combo.List.prototype.Move=function(_2d7){
var _2d8=this.GetCombo();
var mode=_2d8.mode;
if(mode=="compact"||this.GetXmlDataSource().GetNumberRows()==0||(mode!="default"&&mode!="unbound"&&_2d8.GetTextBox().m_HTMLTagObject.value=="")){
return false;
}
var _2da=this.GetActiveRow();
this.Show();
if(null==_2da){
_2da=this.GetRow(0,null);
}else{
var _2db=this.GetRowIndex(this.GetActiveRow());
switch(_2d7){
case (EBAMoveAction_UP):
_2db--;
break;
case (EBAMoveAction_DOWN):
_2db++;
break;
default:
}
if((_2db>=0)&&(_2db<this.GetXmlDataSource().GetNumberRows())){
_2da=this.GetRow(_2db,null);
}
}
this.SetActiveRow(_2da);
this.ScrollIntoView(_2da,false,true);
return true;
};
nitobi.combo.List.prototype.GetRow=function(_2dc,Id){
if(null!=_2dc){
return document.getElementById("EBAComboBoxRow"+this.GetCombo().GetUniqueId()+"_"+_2dc);
}
if(null!=Id){
return document.getElementById(Id);
}
};
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.ListColumnDefinition=function(_2de){
if(!_2de.getAttribute){
_2de.getAttribute=function(a){
return this[a];
};
}
var _2e0="50px";
var _2e1="ntb-combobox-list-column-definition";
var _2e2="text";
var _2e3="";
var _2e4="left";
var _2e5="#000";
var _2e6=(_2de?_2de.getAttribute("TextColor"):null);
((null==_2e6)||(""==_2e6))?this.SetTextColor(_2e5):this.SetTextColor(_2e6);
var _2e7=(_2de?_2de.getAttribute("Align"):null);
((null==_2e7)||(""==_2e7))?this.SetAlign(_2e4):this.SetAlign(_2e7);
var _2e8=(_2de?_2de.getAttribute("Width"):null);
((null==_2e8)||(""==_2e8))?this.SetWidth(_2e0):this.SetWidth(_2e8);
var ihu=(_2de?_2de.getAttribute("ImageHandlerURL"):null);
((null==ihu)||(""==ihu))?this.SetImageHandlerURL(_2e3):this.SetImageHandlerURL(ihu);
var ct=(_2de?_2de.getAttribute("ColumnType"):null);
((null==ct)||(""==ct))?this.SetColumnType(_2e2):this.SetColumnType(ct.toLowerCase());
this.ImageUrlFromData=((this.GetColumnType()=="image")&&((null==ihu)||(""==ihu)));
var ccn=(_2de?_2de.getAttribute("CSSClassName"):null);
((null==ccn)||(""==ccn))?this.SetCSSClassName(_2e1):this.SetCSSClassName(ccn);
var hp=(_2de?_2de.getAttribute("HTMLPrefix"):null);
((null==hp)||(""==hp))?this.SetHTMLPrefix(""):this.SetHTMLPrefix(hp);
var hs=(_2de?_2de.getAttribute("HTMLSuffix"):null);
((null==hs)||(""==hs))?this.SetHTMLSuffix(""):this.SetHTMLSuffix(hs);
var hl=(_2de?_2de.getAttribute("HeaderLabel"):null);
((null==hl)||(""==hl))?this.SetHeaderLabel(""):this.SetHeaderLabel(hl);
var dfi=(_2de?_2de.getAttribute("DataFieldIndex"):null);
((null==dfi)||(""==dfi))?this.SetDataFieldIndex(0):this.SetDataFieldIndex(dfi);
};
nitobi.combo.ListColumnDefinition.prototype.GetAlign=function(){
return this.m_Align;
};
nitobi.combo.ListColumnDefinition.prototype.SetAlign=function(_2f0){
_2f0=_2f0.toLowerCase();
if("right"!=_2f0&&"left"!=_2f0&&"center"!=_2f0){
_2f0="left";
}
this.m_Align=_2f0;
};
nitobi.combo.ListColumnDefinition.prototype.GetTextColor=function(){
return this.m_TextColor;
};
nitobi.combo.ListColumnDefinition.prototype.SetTextColor=function(_2f1){
this.m_TextColor=_2f1;
};
nitobi.combo.ListColumnDefinition.prototype.GetHTMLSuffix=function(){
return this.m_HTMLSuffix;
};
nitobi.combo.ListColumnDefinition.prototype.SetHTMLSuffix=function(_2f2){
this.m_HTMLSuffix=_2f2;
};
nitobi.combo.ListColumnDefinition.prototype.GetHTMLPrefix=function(){
return this.m_HTMLPrefix;
};
nitobi.combo.ListColumnDefinition.prototype.SetHTMLPrefix=function(_2f3){
this.m_HTMLPrefix=_2f3;
};
nitobi.combo.ListColumnDefinition.prototype.GetCSSClassName=function(){
return this.m_CSSClassName;
};
nitobi.combo.ListColumnDefinition.prototype.SetCSSClassName=function(_2f4){
this.m_CSSClassName=_2f4;
};
nitobi.combo.ListColumnDefinition.prototype.GetColumnType=function(){
return this.m_ColumnType;
};
nitobi.combo.ListColumnDefinition.prototype.SetColumnType=function(_2f5){
this.m_ColumnType=_2f5;
};
nitobi.combo.ListColumnDefinition.prototype.GetHeaderLabel=function(){
return this.m_HeaderLabel;
};
nitobi.combo.ListColumnDefinition.prototype.SetHeaderLabel=function(_2f6){
this.m_HeaderLabel=_2f6;
};
nitobi.combo.ListColumnDefinition.prototype.GetWidth=function(){
return this.m_Width;
};
nitobi.combo.ListColumnDefinition.prototype.SetWidth=function(_2f7){
this.m_Width=_2f7;
};
nitobi.combo.ListColumnDefinition.prototype.GetDataFieldIndex=function(){
return this.m_DataFieldIndex;
};
nitobi.combo.ListColumnDefinition.prototype.SetDataFieldIndex=function(_2f8){
this.m_DataFieldIndex=_2f8;
};
nitobi.combo.ListColumnDefinition.prototype.GetImageHandlerURL=function(){
return this.m_ImageHandlerURL;
};
nitobi.combo.ListColumnDefinition.prototype.SetImageHandlerURL=function(_2f9){
this.m_ImageHandlerURL=_2f9;
};
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.TextBox=function(_2fa,_2fb,_2fc){
var _2fd="";
if(nitobi.browser.IE){
_2fd="ntb-combobox-text-ie";
}else{
_2fd="ntb-combobox-text-moz";
}
var _2fe="100px";
var _2ff="";
var _300=true;
var _301="";
var _302=0;
var _303="";
var _304="";
this.SetCombo(_2fb);
var oeku=(_2fa?_2fa.getAttribute("OnEditKeyUpEvent"):null);
((null==oeku)||(""==oeku))?this.SetOnEditKeyUpEvent(_304):this.SetOnEditKeyUpEvent(oeku);
var _306=(_2fa?_2fa.getAttribute("Width"):null);
((null==_306)||(""==_306))?this.SetWidth(_2fe):this.SetWidth(_306);
var _307=(_2fa?_2fa.getAttribute("Height"):null);
((null==_307)||(""==_307))?this.SetHeight(_2ff):this.SetHeight(_307);
var ccn=(_2fa?_2fa.getAttribute("CSSClassName"):null);
((null==ccn)||(""==ccn))?this.SetCSSClassName(_2fd):this.SetCSSClassName(ccn);
var _309=(_2fa?_2fa.getAttribute("Editable"):null);
((null==_309)||(""==_309))?this.SetEditable(_300):this.SetEditable(_309);
var _30a=(_2fa?_2fa.getAttribute("Value"):null);
((null==_30a)||(""==_30a))?this.SetValue(_301):this.SetValue(_30a);
var _30b=_2fb.GetDataTextField();
if(_30b!=null){
this.SetDataFieldIndex(_2fb.GetList().GetXmlDataSource().GetColumnIndex(_30b));
}else{
var dfi=(_2fa?_2fa.getAttribute("DataFieldIndex"):null);
((null==dfi)||(""==dfi))?this.SetDataFieldIndex(_302):this.SetDataFieldIndex(dfi);
}
var st=(_2fa?_2fa.getAttribute("SearchTerm"):null);
if((null==st)||(""==st)){
this.SetSearchTerm(_303);
this.SetIndexSearchTerm(_303);
}else{
this.SetSearchTerm(st);
this.SetIndexSearchTerm(st);
}
this.hasButton=_2fc;
this.m_userTag=_2fa;
};
nitobi.combo.TextBox.prototype.Unload=function(){
if(this.m_List){
delete this.m_List;
this.m_List=null;
}
if(this.m_Callback){
delete this.m_Callback;
this.m_Callback=null;
}
_EBAMemScrub(this);
};
nitobi.combo.TextBox.prototype.GetCSSClassName=function(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
};
nitobi.combo.TextBox.prototype.SetCSSClassName=function(_30e){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_30e;
}else{
this.m_HTMLTagObject.className=_30e;
}
};
nitobi.combo.TextBox.prototype.GetHeight=function(){
return (null==this.m_HTMLTagObject?this.m_Height:nitobi.html.Css.getStyle(this.m_HTMLTagObject,"height"));
};
nitobi.combo.TextBox.prototype.SetHeight=function(_30f){
if(null==this.m_HTMLTagObject){
this.m_Height=_30f;
}else{
this.m_HTMLTagObject.style.height=_30f;
}
};
nitobi.combo.TextBox.prototype.GetWidth=function(){
if(null==this.m_HTMLTagObject){
return this.m_Width;
}else{
return nitobi.html.Css.getStyle(this.GetHTMLContainerObject(),"width");
}
};
nitobi.combo.TextBox.prototype.SetWidth=function(_310){
this.m_Width=_310;
if(null!=this.m_HTMLTagObject){
this.m_HTMLTagObject.style.width=_310;
}
};
nitobi.combo.TextBox.prototype.GetHTMLTagObject=function(){
return this.m_HTMLTagObject;
};
nitobi.combo.TextBox.prototype.SetHTMLTagObject=function(_311){
this.m_HTMLTagObject=_311;
};
nitobi.combo.TextBox.prototype.GetHTMLContainerObject=function(){
return document.getElementById("EBAComboBoxTextContainer"+this.GetCombo().GetUniqueId());
};
nitobi.combo.TextBox.prototype.GetEditable=function(){
if(null==this.m_HTMLTagObject){
return this.m_Editable;
}else{
return this.m_HTMLTagObject.getAttribute("readonly");
}
};
nitobi.combo.TextBox.prototype.SetEditable=function(_312){
if(null==this.m_HTMLTagObject){
this.m_Editable=_312;
}else{
if(_312==true){
this.m_HTMLTagObject.removeAttribute("readonly");
}else{
this.m_HTMLTagObject.setAttribute("readonly","true");
}
}
};
nitobi.combo.TextBox.prototype.GetValue=function(){
if(null==this.m_HTMLTagObject){
return this.m_Value;
}else{
return this.m_HTMLTagObject.value;
}
};
nitobi.combo.TextBox.prototype.SetValue=function(_313,_314){
if(null==this.m_HTMLTagObject){
this.m_Value=_313;
}else{
if(this.GetCombo().mode=="smartlist"){
this.SmartSetValue(_313,_314);
}else{
this.m_HTMLTagObject.value=_313;
this.m_TextValueTag.value=_313;
}
}
};
nitobi.combo.TextBox.prototype.SmartSetValue=function(_315,_316){
var t=this.m_HTMLTagObject;
var _318=this.GetCombo();
var lio=t.value.lastIndexOf(_318.SmartListSeparator);
if(lio>-1){
_315=t.value.substring(0,lio)+_318.SmartListSeparator+" "+_315;
}
if(_316){
_315+=_318.SmartListSeparator+" ";
}
t.value=_315;
this.m_TextValueTag.value=_315;
};
nitobi.combo.TextBox.prototype.GetDataFieldIndex=function(){
return this.m_DataFieldIndex;
};
nitobi.combo.TextBox.prototype.SetDataFieldIndex=function(_31a){
this.m_DataFieldIndex=parseInt(_31a);
};
nitobi.combo.TextBox.prototype.GetCombo=function(){
return this.m_Combo;
};
nitobi.combo.TextBox.prototype.SetCombo=function(_31b){
this.m_Combo=_31b;
};
nitobi.combo.TextBox.prototype.GetSearchTerm=function(){
return this.m_SearchTerm;
};
nitobi.combo.TextBox.prototype.SetSearchTerm=function(_31c){
this.m_SearchTerm=_31c;
};
nitobi.combo.TextBox.prototype.GetIndexSearchTerm=function(){
return this.m_IndexSearchTerm;
};
nitobi.combo.TextBox.prototype.SetIndexSearchTerm=function(_31d){
this.m_IndexSearchTerm=_31d;
};
nitobi.combo.TextBox.prototype.OnChanged=function(e){
this.m_skipBlur=true;
var _31f=this.GetCombo();
var list=_31f.GetList();
list.SetActiveRow(null);
var _321=this.GetValue();
this.m_TextValueTag.value=_321;
var _322=this.GetSearchTerm();
if(_31f.mode=="smartsearch"||_31f.mode=="smartlist"||_31f.mode=="filter"||_31f.mode=="compact"){
list.GetXmlDataSource().m_Dirty=true;
}
if(_31f.mode=="smartlist"){
var lio=_321.lastIndexOf(_31f.SmartListSeparator);
if(lio>-1){
_321=_321.substring(lio+_31f.SmartListSeparator.length).replace(/^\s+/,"");
}
}
if((_322.indexOf(_321)==0&&_322!=_321)){
list.GetXmlDataSource().m_Dirty=true;
}
this.SetSearchTerm(_321);
if(e!=null){
this.prevKeyCode=e.keyCode;
}
var dfi=this.GetDataFieldIndex();
var This=this;
var _326=(e!=null?e.keyCode:0);
this.m_CurrentKeyCode=_326;
this.m_List=list;
this.m_Event=e;
this.m_Callback=_TextboxCallback;
this.m_skipBlur=false;
this.m_List.Search(_321,dfi,this.m_Callback);
};
function _TextboxCallback(_327,list){
var _329=list.GetCombo();
var tb=_329.GetTextBox();
var e=tb.m_Event;
var _32c=tb.m_CurrentKeyCode;
list.SetSelectedRowValues(null);
list.SetSelectedRowIndex(-1);
var _32d=tb.GetSearchTerm();
var tb=list.GetCombo().GetTextBox();
var row=null;
if(_327>-1){
var _32f="EBAComboBoxRow"+_329.GetUniqueId()+"_"+_327;
row=document.getElementById(_32f);
if(""!=tb.searchValue&&(null==e||(_32c!=46&&_32c!=8))&&(null!=e||(tb.prevKeyCode!=46&&tb.prevKeyCode!=8))&&_329.mode!="smartlist"&&_329.mode!="smartsearch"){
tb.TypeAhead(list.GetXmlDataSource().GetRowCol(_327,tb.GetDataFieldIndex()),tb.GetSearchTerm().length,tb.GetSearchTerm());
list.SetSelectedRow(_327);
}
list.SetActiveRow(row);
}
if(e!=null&&_327>-1&&list.InitialSearchOnce!=true){
list.Show();
list.ScrollIntoView(row,true);
}
tb.m_skipBlur=false;
}
nitobi.combo.TextBox.prototype.TypeAhead=function(txt){
var t=this.m_HTMLTagObject;
var x=nitobi.html.getCursor(t);
if(txt.toLowerCase().indexOf(t.value.toLowerCase())!=0){
return;
}
this.SetValue(txt);
nitobi.html.highlight(t,x);
};
nitobi.combo.TextBox.prototype.OnMouseOver=function(_333){
if(this.GetCombo().GetEnabled()){
if(this.GetHeight()!="100%"){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-dynamic","ntb-combobox-text-dynamic-over");
nitobi.html.Css.addClass(this.m_HTMLTagObject,"ntb-combobox-input-dynamic");
}
if(_333){
var b=this.GetCombo().GetButton();
if(null!=b){
b.OnMouseOver(null,false);
}
}
}
};
nitobi.combo.TextBox.prototype.OnMouseOut=function(_335){
if(this.GetCombo().GetEnabled()){
if(this.GetHeight()!="100%"){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-dynamic-over","ntb-combobox-text-dynamic");
nitobi.html.Css.removeClass(this.m_HTMLTagObject,"ntb-combobox-input-dynamic");
}
if(_335){
var b=this.GetCombo().GetButton();
if(null!=b){
b.OnMouseOut(null,false);
}
}
}
};
nitobi.combo.TextBox.prototype.ToggleHidden=function(){
this.m_ToggleHidden=true;
};
nitobi.combo.TextBox.prototype.ToggleShow=function(){
this.m_ToggleShow=true;
};
nitobi.combo.TextBox.prototype.GetHTMLRenderString=function(){
var c=this.GetCombo();
var _338=c.GetId();
var _339=this.GetValue().replace(/\'/g,"&#39;").replace(/\"/g,"&quot;");
var w=this.GetWidth();
var h=this.GetHeight();
var _33c=c.mode=="smartlist";
var html="";
var _33e;
_33e=(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"");
html+="<div id=\"EBAComboBoxTextContainer"+this.GetCombo().GetUniqueId()+"\" class=\"ntb-combobox-text-container ntb-combobox-text-dynamic\" style=\""+(this.hasButton?"border-right:0px solid white;":"")+(_33c&&nitobi.browser.IE?"width:"+w+";":"")+"\">";
if(_33c&&nitobi.browser.IE){
html+="<span style='"+_33e+"'>";
_33e="width:100%;height:"+h+";overflow-y:auto;";
}
html+="<"+(_33c==true?"textarea":"input")+" id=\"EBAComboBoxText"+_338+"\" name=\"EBAComboBoxText"+_338+"\" type=\"TEXT\" class='"+this.GetCSSClassName()+"' "+(this.GetEditable().toString().toLowerCase()=="true"?"":"readonly='true'")+" AUTOCOMPLETE='OFF' value='"+_339+"'  "+"style=\""+_33e+"\" "+"onblur='var combo=document.getElementById(\""+_338+"\").object; if(!(combo.m_Over || combo.GetList().m_skipBlur)) document.getElementById(\""+_338+"\").object.GetTextBox().OnBlur(event)' "+"onkeyup='document.getElementById(\""+_338+"\").object.GetTextBox().OnKeyOperation(event,0)' "+"onkeypress='document.getElementById(\""+_338+"\").object.GetTextBox().OnKeyOperation(event,1)' "+"onkeydown='document.getElementById(\""+_338+"\").object.GetTextBox().OnKeyOperation(event,2)' "+"onmouseover='document.getElementById(\""+_338+"\").object.GetTextBox().OnMouseOver(true)' "+"onmouseout='document.getElementById(\""+_338+"\").object.GetTextBox().OnMouseOut(true)' "+"onpaste='window.setTimeout(\"document.getElementById(\\\""+_338+"\\\").object.GetTextBox().OnChanged()\",0)' "+"oninput='window.setTimeout(\"document.getElementById(\\\""+_338+"\\\").object.GetTextBox().OnChanged()\",0)' "+"onfocus='document.getElementById(\""+_338+"\").object.GetTextBox().OnFocus()' "+"tabindex='"+c.GetTabIndex()+"'>"+(_33c==true?_339:"")+(_33c==true?"</textarea>":"")+"<input id=\"EBAComboBoxTextValue"+_338+"\" name=\""+_338+"\" type=\"HIDDEN\" value=\""+_339+"\">";
html+="</div>";
if(_33c&&nitobi.browser.IE){
html+="</span>";
}
return html;
};
nitobi.combo.TextBox.prototype.Initialize=function(){
this.m_ToggleHidden=false;
this.m_ToggleShow=false;
this.focused=false;
this.m_skipBlur=false;
this.m_skipFocusOnce=false;
this.prevKeyCode=-1;
this.skipKeyUp=false;
this.SetHTMLTagObject(document.getElementById("EBAComboBoxText"+this.GetCombo().GetId()));
this.m_TextValueTag=document.getElementById("EBAComboBoxTextValue"+this.GetCombo().GetId());
if(!this.GetCombo().GetEnabled()){
this.Disable();
}
this.m_userTag=null;
};
nitobi.combo.TextBox.prototype.Disable=function(){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-container","ntb-combobox-text-container-disabled");
nitobi.html.Css.addClass(this.m_HTMLTagObject,"ntb-combobox-input-disabled");
this.m_HTMLTagObject.disabled=true;
};
nitobi.combo.TextBox.prototype.Enable=function(){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-container-disabled","ntb-combobox-text-container");
nitobi.html.Css.removeClass(this.m_HTMLTagObject,"ntb-combobox-input-disabled");
this.m_HTMLTagObject.disabled=false;
};
nitobi.combo.TextBox.prototype.OnBlur=function(e){
var _340=this.GetCombo();
var list=_340.GetList();
if(this.m_skipBlur||_340.m_Over){
return;
}
this.focused=false;
list.Hide();
eval(_340.GetOnBlurEvent());
};
nitobi.combo.TextBox.prototype.OnFocus=function(){
if(this.m_skipBlur||this.m_skipFocusOnce){
this.m_skipFocusOnce=false;
return;
}
this.focused=true;
var _342;
_342=this.GetCombo().GetList().IsVisible();
if(!_342||this.m_ToggleShow){
this.m_ToggleShow=false;
if(this.m_ToggleHidden){
this.m_ToggleHidden=false;
}else{
eval(this.GetCombo().GetOnFocusEvent());
}
}
};
nitobi.combo.TextBox.prototype.SetOnEditKeyUpEvent=function(_343){
this.m_OnEditKeyUpEvent=_343;
};
nitobi.combo.TextBox.prototype.GetOnEditKeyUpEvent=function(){
return this.m_OnEditKeyUpEvent;
};
nitobi.combo.TextBox.prototype.OnKeyOperation=function(e,_345){
if(this.GetEditable()=="false"){
return;
}
e=e?e:window.event;
var _346=0;
var _347=1;
var _348=2;
var _349=13;
var _34a=27;
var _34b=9;
var _34c=65;
var _34d=90;
var _34e=48;
var _34f=57;
var _350=40;
var _351=38;
var _352=46;
var _353=8;
var _354=32;
var _355=96;
var _356=105;
var _357=36;
var _358=35;
var _359=37;
var _35a=39;
var _35b=112;
var _35c=123;
var _35d=16;
var _35e=17;
var _35f=18;
var _360=33;
var _361=34;
var t=this.m_HTMLTagObject;
var _363=this.GetCombo();
var list=_363.GetList();
var _365=e.keyCode;
_363.SetEventObject(e);
var dfi=this.GetDataFieldIndex();
switch(_345){
case (_346):
if(_349!=_365&&_34a!=_365&&_34b!=_365&&(_365<_360||_365>_350)&&(_365<_35b||_365>_35c)&&(_365<_35d||_365>_35f)){
if(_363.mode=="smartsearch"||_363.mode=="smartlist"||_363.mode=="filter"||_363.mode=="compact"){
list.GetXmlDataSource().m_Dirty=true;
}
this.OnChanged(e);
eval(this.GetOnEditKeyUpEvent());
}
if(_365==_351||_365==_350||_365==_360||_365==_361||_365==_349){
if(this.smartlistWA==true){
this.smartlistWA=false;
}else{
if(nitobi.browser.IE){
t.value=t.value;
}else{
nitobi.html.setCursor(t,t.value.length);
}
}
}
if(_363.mode=="smartlist"&&_365==_349&&list.GetActiveRow()!=null){
this.SetValue(list.GetSelectedRowValues()[this.GetDataFieldIndex()],true);
list.SetActiveRow(null);
}
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(this.lio!=lio){
list.Hide();
}
this.lio=lio;
}
break;
case (_348):
switch(_365){
case (_349):
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
list.SetActiveRowAsSelected();
list.Hide();
t.focus();
eval(_363.GetOnSelectEvent());
nitobi.html.cancelEvent(e);
this.m_skipBlur=false;
break;
case (_34b):
list.Hide();
eval(_363.GetOnTabEvent());
if(this.m_skipBlur||_363.m_Over){
this.m_skipBlur=false;
_363.m_Over=false;
}
list.SetActiveRowAsSelected();
eval(_363.GetOnSelectEvent());
break;
case (_34a):
list.Hide();
break;
case (_351):
if(this.Paging==true){
break;
}
var _368;
_368=list.IsVisible();
if(_363.mode=="smartlist"&&!_368){
this.smartlistWA=true;
break;
}
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
this.cursor=nitobi.html.getCursor(t);
if(true==list.Move(EBAMoveAction_UP)){
t.focus();
this.SetValue(list.GetXmlDataSource().GetRowCol(list.GetRowIndex(list.GetActiveRow()),dfi));
}
this.m_skipBlur=false;
break;
case (_350):
if(this.Paging==true){
break;
}
var _368;
_368=list.IsVisible();
if(_363.mode=="smartlist"&&!_368){
this.smartlistWA=true;
break;
}
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
this.cursor=nitobi.html.getCursor(t);
var r=list.GetActiveRow();
if(null!=r&&list.GetRowIndex(r)==list.GetXmlDataSource().GetNumberRows()-1&&true==list.GetAllowPaging()&&_363.mode=="default"){
list.SetActiveRow(null);
this.Paging=true;
list.OnGetNextPage(EBAScrollToNewBottom,true);
}else{
if(true==list.Move(EBAMoveAction_DOWN)){
t.focus();
this.SetValue(list.GetXmlDataSource().GetRowCol(list.GetRowIndex(list.GetActiveRow()),dfi));
}
}
this.m_skipBlur=false;
break;
case (_360):
if(this.Paging==true){
break;
}
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
var b=nitobi.Browser;
var lb=list.GetSectionHTMLTagObject(EBAComboBoxListBody);
var _368;
_368=list.IsVisible();
if(_368){
var r=list.GetActiveRow()||list.GetRow(0);
if(null!=r){
var idx=list.GetRowIndex(r);
while(0!=idx){
r=list.GetRow(--idx);
if(!b.IsObjectInView(r,lb)){
break;
}
}
b.ScrollIntoView(r,lb,false,true);
list.SetActiveRow(r);
this.SetValue(list.GetXmlDataSource().GetRowCol(idx,dfi));
}
}
this.m_skipBlur=false;
break;
case (_361):
if(this.Paging==true){
break;
}
if(_363.mode=="smartlist"){
var lio=t.value.lastIndexOf(_363.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
var _368;
_368=list.IsVisible();
if(!_368){
if(_363.mode!="smartlist"){
list.Show();
}
}else{
this.m_skipBlur=true;
var b=nitobi.Browser;
var lb=list.GetSectionHTMLTagObject(EBAComboBoxListBody);
var r=list.GetActiveRow()||list.GetRow(0);
var idx=list.GetRowIndex(r);
var end=list.GetXmlDataSource().GetNumberRows()-1;
while(idx!=end){
r=list.GetRow(++idx);
if(!b.IsObjectInView(r,lb)){
break;
}
}
if(idx==end&&true==list.GetAllowPaging()&&_363.mode=="default"){
list.SetActiveRow(null);
this.Paging=true;
list.OnGetNextPage(EBAScrollToNewTop,true);
}else{
b.ScrollIntoView(r,lb,true,false);
list.SetActiveRow(r);
this.SetValue(list.GetXmlDataSource().GetRowCol(idx,dfi));
}
this.m_skipBlur=false;
}
break;
default:
}
break;
case (_347):
if(_365==_349){
nitobi.html.cancelEvent(e);
}
break;
default:
}
_363.SetEventObject(null);
};
nitobi.lang.defineNs("nitobi.browser");
if(!nitobi.browser.IE){
Document.prototype.readyState=0;
Document.prototype.__load__=Document.prototype.load;
Document.prototype.load=_Document_load;
Document.prototype.onreadystatechange=null;
Node.prototype._uniqueID=null;
Node.prototype.__defineGetter__("uniqueID",_Node_getUniqueID);
}
function _Document_load(_36e){
changeReadyState(this,1);
try{
this.__load__(_36e);
}
catch(e){
changeReadyState(this,4);
}
}
function changeReadyState(oDOM,_370){
oDOM.readyState=_370;
if(oDOM.onreadystatechange!=null&&(typeof oDOM.onreadystatechange)=="function"){
oDOM.onreadystatechange();
}
}
_Node_getUniqueID.i=1;
function _Node_getUniqueID(){
if(null==this._uniqueID){
this._uniqueID="mz__id"+_Node_getUniqueID.i++;
}
return this._uniqueID;
}
function XmlDataIslands(){
}
function xbClipXml(oXml,_372,_373,_374){
var xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\""+_372+"\"><xsl:copy><xsl:copy-of select=\"@*\"></xsl:copy-of><xsl:apply-templates select=\""+_373+"\"></xsl:apply-templates></xsl:copy></xsl:template><xsl:template match=\""+_373+"\"><xsl:choose><xsl:when test=\"position()&lt;="+_374+"\"><xsl:copy-of select=\".\"></xsl:copy-of></xsl:when></xsl:choose></xsl:template></xsl:stylesheet>";
var x=nitobi.xml.createXmlDoc(xsl);
return nitobi.xml.transformToXml(oXml,x);
}
nitobi.Browser.ConvertXmlDataIsland=function(_377,_378){
if(null!=_377&&""!=_377){
var xmls=document.getElementById(_377);
if(null!=xmls){
var id=xmls.getAttribute("id");
var src=xmls.getAttribute("src");
var d;
if(null==src){
d=nitobi.xml.createXmlDoc(this.EncodeAngleBracketsInTagAttributes(xmls.innerHTML.replace(/>\s+</g,"><")));
}else{
var _37d=nitobi.Browser.LoadPageFromUrl(src,_378);
var _37e=_37d.indexOf("<?xml");
if(_37e!=-1){
_37d=(_37d.substr(_37e));
}
d=nitobi.xml.createXmlDoc(_37d);
var d2=nitobi.xml.createXmlDoc(this.EncodeAngleBracketsInTagAttributes(d.xml.replace(/>\s+</g,"><")));
d=d2;
}
document[id]=d;
var p=(xmls.parentNode?xmls.parentNode:xmls.parentElement);
p.removeChild(xmls);
}
}
};
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.XmlDataSource=function(){
this.combo=null;
this.m_Dirty=true;
this.SetLastPageSize(0);
this.SetNumberColumns(0);
};
nitobi.combo.XmlDataSource.prototype.GetXmlId=function(){
return this.m_XmlId;
};
nitobi.combo.XmlDataSource.prototype.SetXmlId=function(_381){
this.m_XmlId=_381;
};
nitobi.combo.XmlDataSource.prototype.GetXmlObject=function(){
return this.m_XmlObject;
};
nitobi.combo.XmlDataSource.prototype.SetXmlObject=function(_382,clip,_384){
if(null==_382.documentElement){
return;
}
if(clip==true){
_382=xbClipXml(_382,"root","e",_384);
}
this.m_XmlObject=_382;
this.SetLastPageSize(this.GetNumberRows());
var _385=_382.documentElement.getAttribute("fields");
if(null==_385){
}else{
var _386=_385.split("|");
this.SetColumnNames(_386);
this.SetNumberColumns(_386.length);
}
};
nitobi.combo.XmlDataSource.prototype.GetNumberRows=function(){
return this.GetXmlObject().selectNodes("//e").length;
};
nitobi.combo.XmlDataSource.prototype.GetLastPageSize=function(){
return this.m_LastPageSize;
};
nitobi.combo.XmlDataSource.prototype.SetLastPageSize=function(_387){
this.m_LastPageSize=_387;
};
nitobi.combo.XmlDataSource.prototype.GetNumberColumns=function(){
return this.m_NumberColumns;
};
nitobi.combo.XmlDataSource.prototype.SetNumberColumns=function(_388){
this.m_NumberColumns=parseInt(_388);
};
nitobi.combo.XmlDataSource.prototype.GetColumnNames=function(){
return this.m_ColumnNames;
};
nitobi.combo.XmlDataSource.prototype.SetColumnNames=function(_389){
this.m_ColumnNames=_389;
};
nitobi.combo.XmlDataSource.prototype.Search=function(_38a,_38b,_38c){
_38a=_38a.toLowerCase();
_38a=nitobi.xml.constructValidXpathQuery(_38a,true);
var xsl="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">";
xsl+="<xsl:output method=\"text\" />";
xsl+="<xsl:template match=\"/\"><xsl:apply-templates select=\"//e["+(_38c==true?"contains":"starts-with")+"(@"+String.fromCharCode(97+parseInt(_38b))+","+_38a+")][1]\"/></xsl:template>";
xsl+="<xsl:template match=\"e\">";
xsl+="<xsl:value-of select=\"count(preceding-sibling::e)\" />";
xsl+="</xsl:template>";
xsl+="</xsl:stylesheet>";
var oXSL=nitobi.xml.createXslProcessor(xsl);
var _38f=nitobi.xml.createXmlDoc(this.GetXmlObject().xml.replace(/>\s+</g,"><").toLowerCase());
var _390=nitobi.xml.transformToString(_38f,oXSL);
if(""==_390){
_390=-1;
}
return parseInt(_390);
};
nitobi.combo.XmlDataSource.prototype.AddPage=function(XML){
var tmp=nitobi.xml.createXmlDoc(XML);
var _393=tmp.selectNodes("//e");
var root=this.GetXmlObject().documentElement;
this.SetLastPageSize(tmp.selectNodes("//e").length);
for(var i=0;i<_393.length;i++){
root.appendChild(_393[i].cloneNode(true));
}
this.m_Dirty=false;
};
nitobi.combo.XmlDataSource.prototype.Clear=function(){
nitobi.xml.loadXml(this.GetXmlObject(),"<root/>",true);
};
nitobi.combo.XmlDataSource.prototype.GetRow=function(_396){
_396=parseInt(_396);
var row=this.GetXmlObject().documentElement.childNodes.item(_396);
var _398=new Array;
for(var i=0;i<this.GetNumberColumns();i++){
_398[i]=row.getAttribute(String.fromCharCode(97+i));
}
return _398;
};
nitobi.combo.XmlDataSource.prototype.GetRowCol=function(Row,Col){
var row=this.GetXmlObject().documentElement.childNodes.item(parseInt(Row));
var val=row.getAttribute(String.fromCharCode(97+parseInt(Col)));
return val;
};
nitobi.combo.XmlDataSource.prototype.GetColumnIndex=function(Name){
if(Name==null){
return 0;
}
Name=Name.toLowerCase();
var _39f=this.GetColumnNames();
if(_39f!=null){
for(var i=0;i<_39f.length;i++){
if(Name==_39f[i].toLowerCase()){
return parseInt(i);
}
}
}
return -1;
};


