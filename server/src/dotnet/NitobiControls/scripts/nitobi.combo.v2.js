if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.build="7054";
nitobi.combo.version="3.55.7054";
if(typeof (nitobi)=="undefined"){
nitobi={};
}
if(typeof (nitobi.Browser)=="undefined"){
nitobi.Browser={};
}
nitobi.Browser.GetScrollBarWidth=nitobi.html.getScrollBarWidth;
nitobi.Browser.GetBrowserType=function(){
return (navigator.appName=="Microsoft Internet Explorer"?this.nitobi.Browser.IE:this.nitobi.Browser.UNKNOWN);
};
nitobi.Browser.GetBrowserDetails=function(){
return (this.GetBrowserType()==this.nitobi.Browser.IE?window.clientInformation:null);
};
nitobi.Browser.IsObjectInView=function(_1,_2,_3,_4){
var _5=_1.getBoundingClientRect();
var _6=_2.getBoundingClientRect();
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
var _2d=_29.getBoundingClientRect();
var _2e=_2a.getBoundingClientRect();
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
nitobi.combo.Button.prototype.Unload=Button_Unload;
function Button_Unload(){
}
nitobi.combo.Button.prototype.GetDefaultCSSClassName=Button_GetDefaultCSSClassName;
function Button_GetDefaultCSSClassName(){
return this.m_DefaultCSSClassName;
}
nitobi.combo.Button.prototype.SetDefaultCSSClassName=Button_SetDefaultCSSClassName;
function Button_SetDefaultCSSClassName(_90){
this.m_DefaultCSSClassName=_90;
}
nitobi.combo.Button.prototype.GetPressedCSSClassName=Button_GetPressedCSSClassName;
function Button_GetPressedCSSClassName(){
return this.m_PressedCSSClassName;
}
nitobi.combo.Button.prototype.SetPressedCSSClassName=Button_SetPressedCSSClassName;
function Button_SetPressedCSSClassName(_91){
this.m_PressedCSSClassName=_91;
}
nitobi.combo.Button.prototype.GetHeight=Button_GetHeight;
function Button_GetHeight(){
return (null==this.m_HTMLTagObject?this.m_Height:this.m_HTMLTagObject.style.height);
}
nitobi.combo.Button.prototype.SetHeight=Button_SetHeight;
function Button_SetHeight(_92){
if(null==this.m_HTMLTagObject){
this.m_Height=_92;
}else{
this.m_HTMLTagObject.style.height=_92;
}
}
nitobi.combo.Button.prototype.GetWidth=Button_GetWidth;
function Button_GetWidth(){
if(null==this.m_HTMLTagObject){
return this.m_Width;
}else{
return this.m_HTMLTagObject.style.width;
}
}
nitobi.combo.Button.prototype.SetWidth=Button_SetWidth;
function Button_SetWidth(_93){
if(null==this.m_HTMLTagObject){
this.m_Width=_93;
}else{
this.m_HTMLTagObject.style.width=_93;
}
}
nitobi.combo.Button.prototype.GetHTMLTagObject=Button_GetHTMLTagObject;
function Button_GetHTMLTagObject(){
return this.m_HTMLTagObject;
}
nitobi.combo.Button.prototype.SetHTMLTagObject=Button_SetHTMLTagObject;
function Button_SetHTMLTagObject(_94){
this.m_HTMLTagObject=_94;
}
nitobi.combo.Button.prototype.GetCombo=Button_GetCombo;
function Button_GetCombo(){
return this.m_Combo;
}
nitobi.combo.Button.prototype.SetCombo=Button_SetCombo;
function Button_SetCombo(_95){
this.m_Combo=_95;
}
nitobi.combo.Button.prototype.GetCSSClassName=Button_GetCSSClassName;
function Button_GetCSSClassName(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
}
nitobi.combo.Button.prototype.SetCSSClassName=Button_SetCSSClassName;
function Button_SetCSSClassName(_96){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_96;
}else{
this.m_HTMLTagObject.className=_96;
}
}
nitobi.combo.Button.prototype.OnMouseOver=Button_OnMouseOver;
function Button_OnMouseOver(_97,_98){
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
}
nitobi.combo.Button.prototype.OnMouseOut=Button_OnMouseOut;
function Button_OnMouseOut(_99,_9a){
if(null==_99){
_99=this.m_Img;
}
this.m_prevImgClass="ntb-combobox-button-img";
_99.className=this.m_prevImgClass;
if(_9a){
this.GetCombo().GetTextBox().OnMouseOut(false);
}
}
nitobi.combo.Button.prototype.OnMouseDown=Button_OnMouseDown;
function Button_OnMouseDown(_9b){
if(this.GetCombo().GetEnabled()){
if(null!=_9b){
_9b.className="ntb-combobox-button-img-pressed";
}
this.OnClick();
}
}
nitobi.combo.Button.prototype.OnMouseUp=Button_OnMouseUp;
function Button_OnMouseUp(_9c){
if(this.GetCombo().GetEnabled()){
if(null!=_9c){
_9c.className=this.m_prevImgClass;
}
}
}
nitobi.combo.Button.prototype.OnClick=Button_OnClick;
function Button_OnClick(){
var _9d=this.GetCombo();
var _9e=document.getElementsByTagName((nitobi.browser.MOZ||nitobi.browser.SAFARI)?"ntb:Combo":"combo");
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
}
nitobi.combo.Button.prototype.GetHTMLRenderString=Button_GetHTMLRenderString;
function Button_GetHTMLRenderString(){
var _a4=this.GetCombo().GetId();
var uid=this.GetCombo().GetUniqueId();
var w=this.GetWidth();
var h=this.GetHeight();
if((nitobi.browser.MOZ||nitobi.browser.SAFARI)){
var _a8="<span id='EBAComboBoxButton"+uid+"' "+"class='"+this.GetDefaultCSSClassName()+"' "+"style='"+(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"")+"'>"+"<img src='javascript:void(0);' class='ntb-combobox-button-img' id='EBAComboBoxButtonImg"+uid+"' "+"onmouseover='$(\""+_a4+"\").object.GetButton().OnMouseOver(this, true)' "+"onmouseout='$(\""+_a4+"\").object.GetButton().OnMouseOut(this, true)' "+"onmousedown='$(\""+_a4+"\").object.GetButton().OnMouseDown(this);return false;' "+"onmouseup='$(\""+_a4+"\").object.GetButton().OnMouseUp(this)' "+"onmousemove='return false;' "+"></img></span>";
}else{
var _a8="<span id='EBAComboBoxButton"+uid+"' "+"class='"+this.GetDefaultCSSClassName()+"' "+"style='"+(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"")+"'>"+"<img class='ntb-combobox-button-img' id='EBAComboBoxButtonImg"+uid+"' "+"onmouseover='$(\""+_a4+"\").object.GetButton().OnMouseOver(this, true)' "+"onmouseout='$(\""+_a4+"\").object.GetButton().OnMouseOut(this, true)' "+"onmousedown='$(\""+_a4+"\").object.GetButton().OnMouseDown(this);return false;' "+"onmouseup='$(\""+_a4+"\").object.GetButton().OnMouseUp(this)' "+"onmousemove='return false;' "+"></img></span>";
}
return _a8;
}
nitobi.combo.Button.prototype.Initialize=Button_Initialize;
function Button_Initialize(){
var _a9=this.GetCombo();
var uid=_a9.GetUniqueId();
this.SetHTMLTagObject($("EBAComboBoxButton"+uid));
var img=$("EBAComboBoxButtonImg"+uid);
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
}
nitobi.combo.Button.prototype.Disable=Button_Disable;
function Button_Disable(){
var img=this.m_Img;
img.onmouseover=null;
img.onmouseout=null;
img.onclick=null;
img.onmousedown=null;
img.onmouseup=null;
img.className="ntb-combobox-button-img-disabled";
}
nitobi.combo.Button.prototype.Enable=Button_Enable;
function Button_Enable(){
var img=this.m_Img;
img.onmouseover=this._onmouseover;
img.onmouseout=this._onmouseout;
img.onclick=this._onclick;
img.onmousedown=this._onmousedown;
img.onmouseup=this._onmouseup;
img.className="ntb-combobox-button-img";
}
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.numCombosToLoad=0;
nitobi.combo.numCombosToLoadInitially=4;
nitobi.combo.loadDelayMultiplier=10;
nitobi.getCombo=function(id){
return $(id).jsObject;
};
nitobi.combo.initBase=function(){
if(nitobi.combo.initBase.done==false){
Debug=new Debug;
var _b0=[];
var _b1=document.getElementsByTagName((nitobi.browser.MOZ||nitobi.browser.SAFARI)?"eba:ComboPanel":"combopanel");
var _b2=((nitobi.browser.MOZ||nitobi.browser.SAFARI)?document.getElementsByTagName("ntb:ComboPanel"):[]);
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
document.body.insertAdjacentElement("afterBegin",nitobi.combo.iframeBacker);
}
nitobi.combo.initBase.done=true;
}
};
nitobi.combo.initBase.done=false;
nitobi.initCombo=function(el){
nitobi.combo.initBase();
var tag;
if(typeof (el)=="string"){
tag=$(el);
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
var _b7=document.getElementsByTagName((nitobi.browser.MOZ||nitobi.browser.SAFARI)?"eba:Combo":"combo");
var _b8=((nitobi.browser.MOZ||nitobi.browser.SAFARI)?document.getElementsByTagName("ntb:Combo"):[]);
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
window.setTimeout("try{$('"+_b6[i].id+"').object = new nitobi.combo.Combo($('"+_b6[i].id+"'));$('"+_b6[i].id+"').object.Initialize();}catch(err){alert(err.message);}",_ba);
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
var _bc=document.getElementsByTagName((nitobi.browser.MOZ||nitobi.browser.SAFARI)?"eba:Combo":"combo");
var _bd=((nitobi.browser.MOZ||nitobi.browser.SAFARI)?document.getElementsByTagName("ntb:Combo"):[]);
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
var _c0=document.getElementsByTagName((nitobi.browser.MOZ||nitobi.browser.SAFARI)?"eba:Combo":"combo");
var _c1=((nitobi.browser.MOZ||nitobi.browser.SAFARI)?document.getElementsByTagName("ntb:Combo"):[]);
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
var _c7=$(_c3.GetId());
var _c8=parseInt(_c3.GetWidth());
if((nitobi.browser.MOZ||nitobi.browser.SAFARI)&&nitobi.Browser.GetMeasurementUnitType(_c3.GetWidth())=="px"){
_c8=parseInt(_c3.GetWidth());
}
var _c9=$("EBAComboBoxButtonImg"+_c4);
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
if(false){
nitobi.combo=function(){
};
}
nitobi.combo.Combo=function(_cb){
nitobi.prepare();
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
//debugger;
this.SetList(new nitobi.combo.List(_d1,_d0,_d4,this));
this.SetTextBox(new nitobi.combo.TextBox(_d3,this,_e8));
this.m_Over=false;
};
nitobi.combo.Combo.prototype.BuildWarningList=Combo_BuildWarningList;
function Combo_BuildWarningList(){
this.m_WarningMessagesEnabled=new Array();
this.m_DisableAllWarnings=false;
this.m_WarningMessages=new Array();
this.m_WarningMessages["cw001"]="The combo tried to search the server datasource for data.  "+"The server returned data, but no match was found within this data by the combo. The most "+"likely cause for this warning is that the combo mode does not match the gethandler SQL query type: "+"the sql query is not matching in the same way the combo is. Consult the documentation to see what "+"matches to use given the combo's mode.";
this.m_WarningMessages["cw002"]="The combo tried to load XML data from the page. However, it encountered a tag attribute of the form <tag att='___'/> instead"+" of the form <tag att=\"___\"/>. A possible reason for this is encoding ' as &apos;. To fix this error correct the tag to use "+"<tag att=\"__'___\"/>. If you are manually encoding data, eg. for an unbound combo, do not encode ' as &apos; and do not use ' as your string literal. If you believe, "+"this warning was generated in error, you can disable it.";
this.m_WarningMessages["cw003"]="The combo failed to load and parse the XML sent by the gethandler. Check your gethandler to ensure that it is delivering valid XML.";
}
nitobi.combo.Combo.prototype.SetDisabledWarningMessages=Combo_SetDisabledWarningMessages;
function Combo_SetDisabledWarningMessages(_e9){
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
}
nitobi.combo.Combo.prototype.IsWarningEnabled=Combo_IsWarningEnabled;
function Combo_IsWarningEnabled(_eb){
if(this.m_ErrorLevel==""){
return;
}else{
if(this.m_WarningMessagesEnabled[_eb]==null){
this.m_WarningMessagesEnabled[_eb]=true;
}
return this.m_WarningMessagesEnabled[_eb]&&this.m_DisableAllWarnings==false;
}
}
nitobi.combo.Combo.prototype.SetErrorLevel=Combo_SetErrorLevel;
function Combo_SetErrorLevel(_ec){
this.m_ErrorLevel=_ec.toLowerCase();
}
nitobi.combo.Combo.prototype.GetWidth=Combo_GetWidth;
function Combo_GetWidth(){
return this.m_Width;
}
nitobi.combo.Combo.prototype.SetWidth=Combo_SetWidth;
function Combo_SetWidth(_ed){
this.m_Width=_ed;
}
nitobi.combo.Combo.prototype.GetHeight=Combo_GetHeight;
function Combo_GetHeight(){
return this.m_Height;
}
nitobi.combo.Combo.prototype.SetHeight=Combo_SetHeight;
function Combo_SetHeight(_ee){
this.m_Height=_ee;
}
function _EBAMemScrub(_ef){
for(var _f0 in _ef){
if((_f0.indexOf("m_")==0)||(_f0.indexOf("$")==0)){
_ef[_f0]=null;
}
}
}
nitobi.combo.Combo.prototype.Unload=Combo_Unload;
function Combo_Unload(){
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
}
nitobi.combo.Combo.prototype.GetHttpRequestMethod=Combo_GetHttpRequestMethod;
function Combo_GetHttpRequestMethod(){
return this.m_HttpRequestMethod;
}
nitobi.combo.Combo.prototype.SetHttpRequestMethod=Combo_SetHttpRequestMethod;
function Combo_SetHttpRequestMethod(_f2){
if(null==this.m_HTMLTagObject){
this.m_HttpRequestMethod=_f2;
}else{
this.m_HTMLTagObject.className=_f2;
}
}
nitobi.combo.Combo.prototype.GetCSSClassName=Combo_GetCSSClassName;
function Combo_GetCSSClassName(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
}
nitobi.combo.Combo.prototype.SetCSSClassName=Combo_SetCSSClassName;
function Combo_SetCSSClassName(_f3){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_f3;
}else{
this.m_HTMLTagObject.className=_f3;
}
}
nitobi.combo.Combo.prototype.GetInitialSearch=Combo_GetInitialSearch;
function Combo_GetInitialSearch(){
return this.m_InitialSearch;
}
nitobi.combo.Combo.prototype.SetInitialSearch=Combo_SetInitialSearch;
function Combo_SetInitialSearch(_f4){
this.m_InitialSearch=_f4;
}
nitobi.combo.Combo.prototype.GetListZIndex=Combo_GetListZIndex;
function Combo_GetListZIndex(){
return this.m_ListZIndex;
}
nitobi.combo.Combo.prototype.SetListZIndex=Combo_SetListZIndex;
function Combo_SetListZIndex(_f5){
this.m_ListZIndex=_f5;
}
nitobi.combo.Combo.prototype.GetMode=Combo_GetMode;
function Combo_GetMode(){
return this.mode;
}
nitobi.combo.Combo.prototype.GetOnBlurEvent=Combo_GetOnBlurEvent;
function Combo_GetOnBlurEvent(){
return this.m_OnBlurEvent;
}
nitobi.combo.Combo.prototype.SetOnBlurEvent=Combo_SetOnBlurEvent;
function Combo_SetOnBlurEvent(_f6){
this.m_OnBlurEvent=_f6;
}
nitobi.combo.Combo.prototype.OnBlurEvent=Combo_OnBlurEvent;
function Combo_OnBlurEvent(){
}
nitobi.combo.Combo.prototype.SetFocus=Combo_SetFocus;
function Combo_SetFocus(){
this.GetTextBox().m_HTMLTagObject.focus();
}
nitobi.combo.Combo.prototype.GetOnFocusEvent=Combo_GetOnFocusEvent;
function Combo_GetOnFocusEvent(){
return this.m_OnFocusEvent;
}
nitobi.combo.Combo.prototype.SetOnFocusEvent=Combo_SetOnFocusEvent;
function Combo_SetOnFocusEvent(_f7){
this.m_OnFocusEvent=_f7;
}
nitobi.combo.Combo.prototype.GetOnLoadEvent=Combo_GetOnLoadEvent;
function Combo_GetOnLoadEvent(){
if("void"==this.m_OnLoadEvent){
return "";
}
return this.m_OnLoadEvent;
}
nitobi.combo.Combo.prototype.SetOnLoadEvent=Combo_SetOnLoadEvent;
function Combo_SetOnLoadEvent(_f8){
this.m_OnLoadEvent=_f8;
}
nitobi.combo.Combo.prototype.GetOnSelectEvent=Combo_GetOnSelectEvent;
function Combo_GetOnSelectEvent(){
if("void"==this.m_OnSelectEvent){
return "";
}
return this.m_OnSelectEvent;
}
nitobi.combo.Combo.prototype.SetOnSelectEvent=Combo_SetOnSelectEvent;
function Combo_SetOnSelectEvent(_f9){
this.m_OnSelectEvent=_f9;
}
nitobi.combo.Combo.prototype.GetOnBeforeSelectEvent=Combo_GetOnBeforeSelectEvent;
function Combo_GetOnBeforeSelectEvent(){
if("void"==this.m_OnBeforeSelectEvent){
return "";
}
return this.m_OnBeforeSelectEvent;
}
nitobi.combo.Combo.prototype.SetOnBeforeSelectEvent=Combo_SetOnBeforeSelectEvent;
function Combo_SetOnBeforeSelectEvent(_fa){
this.m_OnBeforeSelectEvent=_fa;
}
nitobi.combo.Combo.prototype.GetHTMLTagObject=Combo_GetHTMLTagObject;
function Combo_GetHTMLTagObject(){
return this.m_HTMLTagObject;
}
nitobi.combo.Combo.prototype.SetHTMLTagObject=Combo_SetHTMLTagObject;
function Combo_SetHTMLTagObject(_fb){
this.m_HTMLTagObject=_fb;
}
nitobi.combo.Combo.prototype.GetUniqueId=Combo_GetUniqueId;
function Combo_GetUniqueId(){
return this.m_UniqueId;
}
nitobi.combo.Combo.prototype.SetUniqueId=Combo_SetUniqueId;
function Combo_SetUniqueId(_fc){
this.m_UniqueId=_fc;
}
nitobi.combo.Combo.prototype.GetId=Combo_GetId;
function Combo_GetId(){
return this.m_Id;
}
nitobi.combo.Combo.prototype.SetId=Combo_SetId;
function Combo_SetId(Id){
this.m_Id=Id;
}
nitobi.combo.Combo.prototype.GetButton=Combo_GetButton;
function Combo_GetButton(){
return this.m_Button;
}
nitobi.combo.Combo.prototype.SetButton=Combo_SetButton;
function Combo_SetButton(_fe){
this.m_Button=_fe;
}
nitobi.combo.Combo.prototype.GetList=Combo_GetList;
function Combo_GetList(){
return this.m_List;
}
nitobi.combo.Combo.prototype.SetList=Combo_SetList;
function Combo_SetList(_ff){
this.m_List=_ff;
}
nitobi.combo.Combo.prototype.GetTextBox=Combo_GetTextBox;
function Combo_GetTextBox(){
return this.m_TextBox;
}
nitobi.combo.Combo.prototype.SetTextBox=Combo_SetTextBox;
function Combo_SetTextBox(_100){
this.m_TextBox=_100;
}
nitobi.combo.Combo.prototype.GetTextValue=Combo_GetTextValue;
function Combo_GetTextValue(){
return this.GetTextBox().GetValue();
}
nitobi.combo.Combo.prototype.SetTextValue=Combo_SetTextValue;
function Combo_SetTextValue(_101){
this.GetTextBox().SetValue(_101);
}
nitobi.combo.Combo.prototype.GetSelectedRowValues=Combo_GetSelectedRowValues;
function Combo_GetSelectedRowValues(){
return this.GetList().GetSelectedRowValues();
}
nitobi.combo.Combo.prototype.SetSelectedRowValues=Combo_SetSelectedRowValues;
function Combo_SetSelectedRowValues(_102){
this.GetList().SetSelectedRowValues(_102);
}
nitobi.combo.Combo.prototype.GetSelectedRowIndex=Combo_GetSelectedRowIndex;
function Combo_GetSelectedRowIndex(){
return this.GetList().GetSelectedRowIndex();
}
nitobi.combo.Combo.prototype.SetSelectedRowIndex=Combo_SetSelectedRowIndex;
function Combo_SetSelectedRowIndex(_103){
this.GetList().SetSelectedRowIndex(_103);
}
nitobi.combo.Combo.prototype.GetDataTextField=Combo_GetDataTextField;
function Combo_GetDataTextField(){
return this.m_DataTextField;
}
nitobi.combo.Combo.prototype.SetDataTextField=Combo_SetDataTextField;
function Combo_SetDataTextField(_104){
this.m_DataTextField=_104;
var _105=$(this.GetId()+"DataTextFieldIndex");
if(null!=_105){
var _106=this.GetList().GetXmlDataSource().GetColumnIndex(_104);
_105.value=_106;
}
}
nitobi.combo.Combo.prototype.GetDataValueField=Combo_GetDataValueField;
function Combo_GetDataValueField(){
return this.m_DataValueField;
}
nitobi.combo.Combo.prototype.SetDataValueField=Combo_SetDataValueField;
function Combo_SetDataValueField(_107){
this.m_DataValueField=_107;
var _108=$(this.GetId()+"DataValueFieldIndex");
if(null!=_108){
var _109=this.GetList().GetXmlDataSource().GetColumnIndex(_107);
_108.value=_109;
}
}
nitobi.combo.Combo.prototype.GetSelectedItem=Combo_GetSelectedItem;
function Combo_GetSelectedItem(){
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
}
nitobi.combo.Combo.prototype.GetOnHideEvent=Combo_GetOnHideEvent;
function Combo_GetOnHideEvent(){
return this.GetList().GetOnHideEvent();
}
nitobi.combo.Combo.prototype.SetOnHideEvent=Combo_SetOnHideEvent;
function Combo_SetOnHideEvent(_10f){
this.GetList().SetOnHideEvent(_10f);
}
nitobi.combo.Combo.prototype.GetOnTabEvent=Combo_GetOnTabEvent;
function Combo_GetOnTabEvent(){
return this.m_OnTabEvent;
}
nitobi.combo.Combo.prototype.SetOnTabEvent=Combo_SetOnTabEvent;
function Combo_SetOnTabEvent(_110){
this.m_OnTabEvent=_110;
}
nitobi.combo.Combo.prototype.GetEventObject=Combo_GetEventObject;
function Combo_GetEventObject(){
return this.m_EventObject;
}
nitobi.combo.Combo.prototype.SetEventObject=Combo_SetEventObject;
function Combo_SetEventObject(_111){
this.m_EventObject=_111;
}
nitobi.combo.Combo.prototype.GetSmartListSeparator=Combo_GetSmartListSeparator;
function Combo_GetSmartListSeparator(){
return this.SmartListSeparator;
}
nitobi.combo.Combo.prototype.SetSmartListSeparator=Combo_SetSmartListSeparator;
function Combo_SetSmartListSeparator(_112){
this.SmartListSeparator=_112;
}
nitobi.combo.Combo.prototype.GetTabIndex=Combo_GetTabIndex;
function Combo_GetTabIndex(){
return this.m_TabIndex;
}
nitobi.combo.Combo.prototype.SetTabIndex=Combo_SetTabIndex;
function Combo_SetTabIndex(_113){
this.m_TabIndex=_113;
}
nitobi.combo.Combo.prototype.GetEnabled=Combo_GetEnabled;
function Combo_GetEnabled(){
return this.m_Enabled;
}
nitobi.combo.Combo.prototype.SetEnabled=Combo_SetEnabled;
function Combo_SetEnabled(_114){
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
}
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
var html="<span id='EBAComboBox"+_131+"' class='ntb-combo-reset "+this.GetCSSClassName()+"' "+"onMouseOver='$(\""+this.GetId()+"\").object.m_Over=true' "+"onMouseOut='$(\""+this.GetId()+"\").object.m_Over=false'>"+"<span id='EBAComboBoxTextAndButton"+_131+"' class='ComboBoxTextAndButton'><nobr>";
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
this.m_userTag.insertAdjacentHTML("beforeEnd",html);
this.SetHTMLTagObject($("EBAComboBox"+_131));
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
nitobi.combo.Combo.prototype.GetFieldFromActiveRow=Combo_GetFieldFromActiveRow;
function Combo_GetFieldFromActiveRow(_145){
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
}
function Debug(){
this.m_CallStack=new Array;
this.m_CallStackMarker=0;
try{
_ebaWatch.value="";
}
catch(err){
}
}
Debug.prototype.GetCallStack=Debug_GetCallStack;
function Debug_GetCallStack(){
return this.m_CallStack;
}
Debug.prototype.SetCallStack=Debug_SetCallStack;
function Debug_SetCallStack(_14b){
this.m_CallStack=_14b;
}
Debug.prototype.GetCurrentFunction=Debug_GetCurrentFunction;
function Debug_GetCurrentFunction(){
return this.m_CallStack[this.m_CallStackMarker-1];
}
Debug.prototype.GetState=Debug_GetState;
function Debug_GetState(){
return this.m_State;
}
Debug.prototype.SetState=Debug_SetState;
function Debug_SetState(_14c){
this.m_State=_14c;
}
Debug.prototype.Assert=Debug_Assert;
function Debug_Assert(_14d,_14e){
if(!_14d){
if(this.GetState()&&!_14d){
alert("Assert ("+this.GetCurrentFunction()+"): "+_14e+"\nStack trace: \n"+this.ShowCallStack());
}
}
}
Debug.prototype.EnterFunction=Debug_EnterFunction;
function Debug_EnterFunction(_14f){
this.m_CallStack[this.m_CallStackMarker++]=_14f;
}
Debug.prototype.ExitFunction=Debug_ExitFunction;
function Debug_ExitFunction(){
this.m_CallStack[--this.m_CallStackMarker];
}
Debug.prototype.ShowCallStack=Debug_ShowCallStack;
function Debug_ShowCallStack(){
var s="";
var tabs="\t";
for(var i=0;i<this.m_CallStackMarker;i++){
s+=tabs+this.m_CallStack[i]+"\n";
tabs+="\t";
}
return s;
}
Debug.prototype.SetWatch=Debug_SetWatch;
function Debug_SetWatch(_153,_154){
this.EnterFunction("SetWatch");
try{
_ebaWatch.value=_153+" = "+_154+"\n"+_ebaWatch.value;
this.ExitFunction();
}
catch(err){
this.ExitFunction();
}
}
Debug.prototype.Echo=Debug_Echo;
function Debug_Echo(Msg){
this.EnterFunction("Echo");
try{
_ebaWatch.value="**"+Msg+"\n"+_ebaWatch.value;
this.ExitFunction();
}
catch(err){
this.ExitFunction();
}
}
Debug.prototype.StartTimer=Debug_StartTimer;
function Debug_StartTimer(_156,_157){
try{
_156.Start(_157);
}
catch(err){
}
}
Debug.prototype.StopTimer=Debug_StopTimer;
function Debug_StopTimer(_158,_159){
try{
_158.Stop(_159);
}
catch(err){
}
}
Debug.prototype.ShowTimer=Debug_ShowTimer;
function Debug_ShowTimer(_15a,_15b,_15c){
try{
}
catch(err){
}
}
Debug.prototype.WriteLog=Debug_WriteLog;
function Debug_WriteLog(_15d){
try{
writeLog(_15d);
}
catch(err){
}
}
Debug.prototype.StopAndShowTimer=Debug_StopAndShowTimer;
function Debug_StopAndShowTimer(_15e,_15f,_160){
try{
this.StopTimer(_15f,_160);
this.ShowTimer(_15e,_15f,_160);
}
catch(err){
}
}
Debug.printGlobals=function(){
for(var o in window){
writeLog(o);
}
};
function Iframe(_162,h,w,_165){
if(!_162){
var msg="Iframe constructor: attachee is null!";
alert(msg);
throw msg;
}
var d=document;
var oIF=d.createElement("IFRAME");
var s=oIF.style;
this.oIFStyle=s;
this.attachee=_162;
this.attach();
s.position="absolute";
w=w||_162.offsetWidth;
s.width=w;
s.height=h||0;
s.display="none";
s.overflow="hidden";
var name="IFRAME"+oIF.uniqueID;
oIF.name=name;
oIF.id=name;
oIF.frameBorder=0;
oIF.src="javascript:true";
var _16b=Browser_GetParentElementByTagName(_165,"form");
if(null==_16b){
_16b=d.body;
}
_16b.appendChild(oIF);
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
var _17f=Iframe_dfxWinXY(window);
this.timerId=0;
if((_17f.x!=this.oldXY.x)||(_17f.y!=this.oldXY.y)){
this.oldXY=_17f;
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
function Iframe_setHeight(h,_187){
h=parseInt(h);
this.oIFStyle.height=h;
if(_187!=true){
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
var _189=this.attachee;
var a=(_189.offsetParent&&"absolute"==_189.offsetParent.style.position);
this.oIFStyle.top=this.offset(_189,"offsetTop",a)+_189.offsetHeight-1+(a?parseInt(_189.offsetParent.style.top):0);
this.oIFStyle.left=this.offset(_189,"offsetLeft",a)+(a?parseInt(_189.offsetParent.style.left):0);
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
nitobi.combo.List=function(_18b,_18c,_18d,_18e){
this.m_Rendered=false;
var _18f="ntb-combobox-button";
var _190="150px";
var _191=new Array("50px","100px","50px");
var _192=new Array("ntb-combobox-list-header","ntb-combobox-list-body","ntb-combobox-list-footer","ntb-combobox-list-body-table");
var _193="ntb-combobox-list-body-table-row-highlighted";
var _194="highlight";
var _195="highlighttext";
var _196="";
var _197=-1;
var _198=_18e.mode=="default";
var _199="hidden";
var _19a=false;
var _19b=_18e.mode!="default";
var _19c;
if(_18e.mode!="classic"){
_19c=10;
}else{
_19c=25;
}
var _19d="";
var _19e="";
var _19f="";
var _1a0="";
var _1a1=0;
var _1a2=0;
var _1a3="EBA:Combo could not correctly transform XML data. Do you have the MS XML libraries installed? These are typically installed with your browser and are freely available from Microsoft.";
var _1a4="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\" xmlns:eba=\"http://developer.ebusiness-apps.com\" xmlns:ntb=\"http://www.nitobi.com\" exclude-result-prefixes=\"eba ntb\">"+"<xsl:output method=\"xml\" version=\"4.0\" omit-xml-declaration=\"yes\" />"+"<xsl:template match=\"/\">"+"<xsl:apply-templates select=\"eba:ComboValues|ntb:ComboValues\"/>"+"</xsl:template>"+"<xsl:template match=\"/eba:ComboValues|ntb:ComboValues\">"+"<root>"+"<xsl:attribute name=\"fields\"><xsl:value-of select=\"@fields\" /></xsl:attribute>"+"\t<xsl:apply-templates/>"+"</root>"+"</xsl:template>"+"<xsl:template match=\"eba:ComboValue|eba:combovalue|ntb:ComboValue|ntb:combovalue\">"+"\t<e><xsl:for-each select=\"@*\"><xsl:attribute name=\"{name()}\"><xsl:value-of select=\".\"/></xsl:attribute></xsl:for-each></e>"+"</xsl:template>"+"</xsl:stylesheet>";
this.SetCombo(_18e);
var ps=(_18b?_18b.getAttribute("PageSize"):null);
((null==ps)||(""==ps))?this.SetPageSize(_19c):this.SetPageSize(parseInt(ps));
this.clip=(_18e.mode=="smartsearch"||_18e.mode=="smartlist"||_18e.mode=="filter");
var _1a6=(_18b?_18b.getAttribute("ClipLength"):null);
((null==_1a6)||(""==_1a6))?this.SetClipLength(this.GetPageSize()):this.SetClipLength(_1a6);
var ds=new nitobi.combo.XmlDataSource();
if(_18c!=null){
ds.combo=_18e;
var x=(_18c?_18c.getAttribute("XmlId"):"");
ds.SetXmlId(x);
var _1a9=document.getElementById(x);
if(nitobi.browser.MOZ||nitobi.browser.SAFARI||null==_1a9){
nitobi.Browser.ConvertXmlDataIsland(x,_18e.GetHttpRequestMethod());
ds.SetXmlObject(document[x],this.clip,this.clipLength);
}else{
ds.SetXmlObject(_1a9);
}
ds.SetLastPageSize(ds.GetNumberRows());
ds.m_Dirty=false;
}
this.SetXmlDataSource(ds);
this.m_httpRequest=new nitobi.ajax.HttpRequest();
this.m_httpRequest.responseType="text";
this.m_httpRequest.onRequestComplete.subscribe(this.onGetComplete,this);
this.unboundMode=false;
if(!_18c){
this.unboundMode=true;
var _1aa=null;
var _1ab="<eba:ComboValues fields='"+_18d.getAttribute("fields")+"' xmlns:eba='http://developer.ebusiness-apps.com' xmlns:ntb='http://www.nitobi.com'>";
if(nitobi.browser.IE){
var _1ac=_18d.innerHTML.match(/<\?xml:namespace.*?\/>(.*)/);
_1ab+=_1ac[1]+"</eba:ComboValues>";
}else{
_1ab+=_18d.innerHTML+"</eba:ComboValues>";
}
_1ab=nitobi.Browser.EncodeAngleBracketsInTagAttributes(_1ab,_18e).replace(/&nbsp;/g,"&#160;").replace(/>\s+</g,"><");
try{
var oXSL=nitobi.xml.createXmlDoc(_1a4);
tmp=nitobi.xml.createXmlDoc(_1ab);
xmlObject=nitobi.xml.transformToXml(tmp,oXSL);
this.GetXmlDataSource().SetXmlObject(xmlObject);
this.GetXmlDataSource().m_Dirty=false;
}
catch(err){
alert(_1a3);
}
}
this.m_SectionHTMLTagObjects=new Array;
this.m_SectionCSSClassNames=new Array;
this.m_SectionHeights=new Array;
this.m_ListColumnDefinitions=new Array;
var _1ae=null;
var _1af=0;
var _1b0=null;
var _1b1=this.GetCombo().GetDataTextField();
var _1b2=false;
var _1b3=true;
while(_1b3){
if(_1b1!=null||_1b2==true){
var _1b4=new Object;
_1b4.DataFieldIndex=this.GetXmlDataSource().GetColumnIndex(_1b1);
_1b4.DataValueIndex=this.GetXmlDataSource().GetColumnIndex(_18e.GetDataValueField());
_1b4.HeaderLabel="";
_1b4.Width="100%";
this.m_ListColumnDefinitions[0]=new nitobi.combo.ListColumnDefinition(_1b4);
_1b3=false;
}else{
var _1b5=_18b;
if((null==_18b)||(0==_18b.childNodes.length)){
_1b5=_18e.m_userTag;
}
var _1b6=null;
for(var i=0;i<_1b5.childNodes.length;i++){
_1ae=_1b5.childNodes[i];
_1b6=_1ae.tagName;
if(_1b6){
_1b6=_1b6.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"");
if(_1b6=="combocolumndefinition"){
this.m_ListColumnDefinitions[_1af]=new nitobi.combo.ListColumnDefinition(_1ae);
_1af++;
_1b3=false;
}
}
}
_1b2=true;
}
}
var _1b8=(_18b?_18b.getAttribute("Width"):null);
((null==_1b8)||(""==_1b8))?this.SetWidth(_190):this.SetWidth(_1b8);
var _1b9=(_18b?_18b.getAttribute("Overflow-y"):null);
this.m_overflowy=((null==_1b9)||(""==_1b9))?_199:_1b9;
var chh=(_18b?_18b.getAttribute("CustomHTMLHeader"):null);
((null==chh)||(""==chh))?this.SetCustomHTMLHeader(""):this.SetCustomHTMLHeader(chh);
for(var i=0;i<EBAComboBoxListNumSections;i++){
this.SetSectionCSSClassName(i,_192[i]);
}
for(var i=0;i<=EBAComboBoxListFooter;i++){
this.SetSectionHeight(i,_191[i]);
}
var _1bb=(_18b?_18b.getAttribute("Height"):null);
((null==_1bb)||(""==_1bb))?null:this.SetHeight(parseInt(_1bb));
var hccn=(_18b?_18b.getAttribute("HighlightCSSClassName"):null);
if((null==hccn)||(""==hccn)){
this.SetHighlightCSSClassName(_193);
this.m_UseHighlightClass=false;
}else{
this.SetHighlightCSSClassName(hccn);
this.m_UseHighlightClass=true;
}
var bhc=(_18b?_18b.getAttribute("BackgroundHighlightColor"):null);
((null==bhc)||(""==bhc))?this.SetBackgroundHighlightColor(_194):this.SetBackgroundHighlightColor(bhc);
var ohe=(_18b?_18b.getAttribute("OnHideEvent"):null);
((null==ohe)||(""==ohe))?this.SetOnHideEvent(_19d):this.SetOnHideEvent(ohe);
var ose=(_18b?_18b.getAttribute("OnShowEvent"):null);
((null==ose)||(""==ose))?this.SetOnShowEvent(_19e):this.SetOnShowEvent(ose);
var onbs=(_18b?_18b.getAttribute("OnBeforeSearchEvent"):null);
((null==onbs)||(""==onbs))?this.SetOnBeforeSearchEvent(_19f):this.SetOnBeforeSearchEvent(onbs);
var onas=(_18b?_18b.getAttribute("OnAfterSearchEvent"):null);
((null==onas)||(""==onas))?this.SetOnAfterSearchEvent(_1a0):this.SetOnAfterSearchEvent(onas);
var fhc=(_18b?_18b.getAttribute("ForegroundHighlightColor"):null);
((null==fhc)||(""==fhc))?this.SetForegroundHighlightColor(_195):this.SetForegroundHighlightColor(fhc);
var offx=(_18b?_18b.getAttribute("OffsetX"):null);
((null==offx)||(""==offx))?this.SetOffsetX(_1a1):this.SetOffsetX(offx);
var offy=(_18b?_18b.getAttribute("OffsetY"):null);
((null==offy)||(""==offy))?this.SetOffsetY(_1a2):this.SetOffsetY(offy);
var sri=(_18b?_18b.parentNode.getAttribute("SelectedRowIndex"):null);
((null==sri)||(""==sri))?this.SetSelectedRowIndex(_197):this.SetSelectedRowIndex(parseInt(sri));
var chd=(_18b?_18b.getAttribute("CustomHTMLDefinition"):null);
((null==chd)||(""==chd))?this.SetCustomHTMLDefinition(_196):this.SetCustomHTMLDefinition(chd);
var ap=(_18b?_18b.getAttribute("AllowPaging"):null);
((null==ap)||(""==ap))?this.SetAllowPaging(_198):this.SetAllowPaging(ap.toLowerCase()=="true");
var fz=(_18b?_18b.getAttribute("FuzzySearchEnabled"):null);
((null==fz)||(""==fz))?this.SetFuzzySearchEnabled(_19a):this.SetFuzzySearchEnabled(fz.toLowerCase()=="true");
var eds=(_18b?_18b.getAttribute("EnableDatabaseSearch"):null);
((null==eds)||(""==eds))?this.SetEnableDatabaseSearch(this.unboundMode==false&&_19b):this.SetEnableDatabaseSearch(this.unboundMode==false&&eds.toLowerCase()=="true");
if(_18e.mode=="default"&&this.GetAllowPaging()==true){
this.SetClipLength(this.GetPageSize());
this.clip=true;
}
this.widestColumn=new Array(this.m_ListColumnDefinitions.length);
for(var i=0;i<this.widestColumn.length;i++){
this.widestColumn[i]=0;
}
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_NONE);
var durl=(_18b?_18b.getAttribute("DatasourceUrl"):null);
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
this.m_userTag=_18b;
};
nitobi.combo.List.prototype.Unload=List_Unload;
function List_Unload(){
if(this.IF){
this.IF.Unload();
delete this.IF;
}
_EBAMemScrub(this);
}
nitobi.combo.List.prototype.SetClipLength=List_SetClipLength;
function List_SetClipLength(_1cb){
this.clipLength=_1cb;
}
nitobi.combo.List.prototype.GetHTMLTagObject=List_GetHTMLTagObject;
function List_GetHTMLTagObject(){
this.Render();
return this.m_HTMLTagObject;
}
nitobi.combo.List.prototype.SetHTMLTagObject=List_SetHTMLTagObject;
function List_SetHTMLTagObject(_1cc){
this.m_HTMLTagObject=_1cc;
}
nitobi.combo.List.prototype.GetHighlightCSSClassName=List_GetHighlightCSSClassName;
function List_GetHighlightCSSClassName(){
return this.m_HighlightCSSClassName;
}
nitobi.combo.List.prototype.SetHighlightCSSClassName=List_SetHighlightCSSClassName;
function List_SetHighlightCSSClassName(_1cd){
this.m_HighlightCSSClassName=_1cd;
}
nitobi.combo.List.prototype.GetListColumnDefinitions=List_GetListColumnDefinitions;
function List_GetListColumnDefinitions(){
return this.m_ListColumnDefinitions;
}
nitobi.combo.List.prototype.SetListColumnDefinitions=List_SetListColumnDefinitions;
function List_SetListColumnDefinitions(_1ce){
this.m_ListColumnDefinitions=_1ce;
}
nitobi.combo.List.prototype.GetCustomHTMLDefinition=List_GetCustomHTMLDefinition;
function List_GetCustomHTMLDefinition(){
return this.m_CustomHTMLDefinition;
}
nitobi.combo.List.prototype.SetCustomHTMLDefinition=List_SetCustomHTMLDefinition;
function List_SetCustomHTMLDefinition(_1cf){
this.m_CustomHTMLDefinition=_1cf;
}
nitobi.combo.List.prototype.GetCustomHTMLHeader=List_GetCustomHTMLHeader;
function List_GetCustomHTMLHeader(){
return this.m_CustomHTMLHeader;
}
nitobi.combo.List.prototype.SetCustomHTMLHeader=List_SetCustomHTMLHeader;
function List_SetCustomHTMLHeader(_1d0){
this.m_CustomHTMLHeader=_1d0;
}
nitobi.combo.List.prototype.GetCombo=List_GetCombo;
function List_GetCombo(){
return this.m_Combo;
}
nitobi.combo.List.prototype.SetCombo=List_SetCombo;
function List_SetCombo(_1d1){
this.m_Combo=_1d1;
}
nitobi.combo.List.prototype.GetXmlDataSource=List_GetXmlDataSource;
function List_GetXmlDataSource(){
return this.m_XmlDataSource;
}
nitobi.combo.List.prototype.SetXmlDataSource=List_SetXmlDataSource;
function List_SetXmlDataSource(_1d2){
this.m_XmlDataSource=_1d2;
}
nitobi.combo.List.prototype.GetWidth=List_GetWidth;
function List_GetWidth(){
return this.m_Width;
}
nitobi.combo.List.prototype.SetWidth=List_SetWidth;
function List_SetWidth(_1d3){
this.m_Width=_1d3;
if(this.m_Rendered){
this.GetHTMLTagObject().style.width=this.GetDesiredPixelWidth();
for(var i=0;i<=EBAComboBoxListFooter;i++){
if(i!=EBAComboBoxListBodyTable){
var _1d5=this.GetSectionHTMLTagObject(i);
if(_1d5!=null){
_1d5.style.width=this.GetDesiredPixelWidth();
}
}
}
this.GenerateCss();
}
}
nitobi.combo.List.prototype.GetDesiredPixelWidth=List_GetDesiredPixelWidth;
function List_GetDesiredPixelWidth(){
var _1d6=this.GetCombo();
var _1d7=document.getElementById(_1d6.GetId());
var _1d8=nitobi.html.getWidth(_1d7);
var _1d9=this.GetWidth();
if(nitobi.Browser.GetMeasurementUnitType(_1d9)=="%"){
var w=(_1d6.GetWidth()==null?_1d6.GetTextBox().GetWidth():_1d6.GetWidth());
var _1db=1/(parseInt(w)/100);
var _1d9=parseInt(_1d9)/100;
return (Math.floor(_1d8*_1db*_1d9-2)+"px");
}else{
return _1d9;
}
}
nitobi.combo.List.prototype.GetActualPixelWidth=List_GetActualPixelWidth;
function List_GetActualPixelWidth(){
var tag=this.GetHTMLTagObject();
if(null==tag){
return this.GetDesiredPixelWidth();
}else{
return nitobi.Browser.GetElementWidth(tag);
}
}
nitobi.combo.List.prototype.GetCSSClassName=List_GetCSSClassName;
function List_GetCSSClassName(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.GetHTMLTagObject().className);
}
nitobi.combo.List.prototype.SetCSSClassName=List_SetCSSClassName;
function List_SetCSSClassName(_1dd){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_1dd;
}else{
this.GetHTMLTagObject().className=_1dd;
}
}
nitobi.combo.List.prototype.GetSectionHTMLTagObject=List_GetSectionHTMLTagObject;
function List_GetSectionHTMLTagObject(_1de){
this.Render();
return this.m_SectionHTMLTagObjects[_1de];
}
nitobi.combo.List.prototype.SetSectionHTMLTagObject=List_SetSectionHTMLTagObject;
function List_SetSectionHTMLTagObject(_1df,_1e0){
this.m_SectionHTMLTagObjects[_1df]=_1e0;
}
nitobi.combo.List.prototype.GetSectionCSSClassName=List_GetSectionCSSClassName;
function List_GetSectionCSSClassName(_1e1){
return (null==this.m_HTMLTagObject?this.m_SectionCSSClassNames[_1e1]:this.GetSectionHTMLTagObject(_1e1).className);
}
nitobi.combo.List.prototype.SetSectionCSSClassName=List_SetSectionCSSClassName;
function List_SetSectionCSSClassName(_1e2,_1e3){
if(null==this.m_HTMLTagObject){
this.m_SectionCSSClassNames[_1e2]=_1e3;
}else{
this.GetSectionHTMLTagObject(_1e2).className=_1e3;
}
}
nitobi.combo.List.prototype.GetSectionHeight=List_GetSectionHeight;
function List_GetSectionHeight(_1e4){
if(this.m_HTMLTagObject==null){
return parseInt(this.m_SectionHeights[_1e4]);
}else{
var _1e5=this.m_HTMLTagObject.style;
var top=_1e5.top;
var _1e7=_1e5.display;
var _1e8=_1e5.position;
var _1e9=_1e5.visibility;
if(_1e5.display=="none"||_1e5.visibility!="visible"){
_1e5.position="absolute";
_1e5.top="-1000px";
_1e5.display="inline";
}
var _1ea=null;
if(this.m_SectionHTMLTagObjects[_1e4]!=null){
_1ea=nitobi.html.getHeight(this.m_SectionHTMLTagObjects[_1e4]);
}
if(_1e5.display=="inline"){
_1e5.position=_1e8;
_1e5.display=_1e7;
_1e5.top=top;
}
return _1ea;
}
}
nitobi.combo.List.prototype.SetSectionHeight=List_SetSectionHeight;
function List_SetSectionHeight(_1eb,_1ec){
if(null==this.m_HTMLTagObject){
this.m_SectionHeights[_1eb]=_1ec;
}else{
this.GetSectionHTMLTagObject(_1eb).style.height=_1ec;
}
}
nitobi.combo.List.prototype.GetSelectedRowIndex=List_GetSelectedRowIndex;
function List_GetSelectedRowIndex(){
if(null==this.m_HTMLTagObject){
return parseInt(this.m_SelectedRowIndex);
}else{
return parseInt(document.getElementById(this.GetCombo().GetId()+"SelectedRowIndex").value);
}
}
nitobi.combo.List.prototype.SetSelectedRowIndex=List_SetSelectedRowIndex;
function List_SetSelectedRowIndex(_1ed){
if(null==this.m_HTMLTagObject){
this.m_SelectedRowIndex=_1ed;
}else{
document.getElementById(this.GetCombo().GetId()+"SelectedRowIndex").value=_1ed;
}
}
nitobi.combo.List.prototype.GetAllowPaging=List_GetAllowPaging;
function List_GetAllowPaging(){
return this.m_AllowPaging;
}
nitobi.combo.List.prototype.SetAllowPaging=List_SetAllowPaging;
function List_SetAllowPaging(_1ee){
if(this.m_HTMLTagObject!=null){
if(_1ee){
this.ShowFooter();
}else{
this.HideFooter();
}
}
this.m_AllowPaging=_1ee;
}
nitobi.combo.List.prototype.IsFuzzySearchEnabled=List_IsFuzzySearchEnabled;
function List_IsFuzzySearchEnabled(){
return this.m_FuzzySearchEnabled;
}
nitobi.combo.List.prototype.SetFuzzySearchEnabled=List_SetFuzzySearchEnabled;
function List_SetFuzzySearchEnabled(_1ef){
this.m_FuzzySearchEnabled=_1ef;
}
nitobi.combo.List.prototype.GetPageSize=List_GetPageSize;
function List_GetPageSize(){
return this.m_PageSize;
}
nitobi.combo.List.prototype.SetPageSize=List_SetPageSize;
function List_SetPageSize(_1f0){
this.m_PageSize=_1f0;
}
nitobi.combo.List.prototype.GetNumPagesLoaded=List_GetNumPagesLoaded;
function List_GetNumPagesLoaded(){
return this.m_NumPagesLoaded;
}
nitobi.combo.List.prototype.SetNumPagesLoaded=List_SetNumPagesLoaded;
function List_SetNumPagesLoaded(_1f1){
this.m_NumPagesLoaded=_1f1;
}
nitobi.combo.List.prototype.GetActiveRow=List_GetActiveRow;
function List_GetActiveRow(){
return this.m_ActiveRow;
}
nitobi.combo.List.prototype.SetActiveRow=List_SetActiveRow;
function List_SetActiveRow(_1f2){
var _1f3;
if(null!=this.m_ActiveRow){
_1f3=document.getElementById("ContainingTableFor"+this.m_ActiveRow.id);
if(this.m_UseHighlightClass){
_1f3.className=this.m_OriginalRowClass;
}else{
_1f3.style.backgroundColor=this.m_OriginalBackgroundHighlightColor;
_1f3.style.color=this.m_OriginalForegroundHighlightColor;
}
var _1f4=this.GetListColumnDefinitions();
for(var i=0,n=_1f4.length;i<n;i++){
var _1f7=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id+"_"+i);
if(_1f7!=null){
_1f7.style.color=_1f7.savedColor;
_1f7.style.backgroundColor=_1f7.savedBackgroundColor;
}
}
}
this.m_ActiveRow=_1f2;
if(null!=_1f2){
if("compact"==this.GetCombo().mode&&_1f2!=null){
var _1f8=this.GetRowIndex(_1f2);
this.SetSelectedRow(_1f8);
}
_1f3=document.getElementById("ContainingTableFor"+_1f2.id);
_1f7=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id);
if(this.m_UseHighlightClass){
this.m_OriginalRowClass=_1f3.className;
_1f3.className=this.GetHighlightCSSClassName();
}else{
this.m_OriginalBackgroundHighlightColor=_1f3.style.backgroundColor;
this.m_OriginalForegroundHighlightColor=_1f3.style.color;
_1f3.style.backgroundColor=this.m_BackgroundHighlightColor;
_1f3.style.color=this.m_ForegroundHighlightColor;
}
var _1f4=this.GetListColumnDefinitions();
for(var i=0,n=_1f4.length;i<n;i++){
var _1f7=document.getElementById("ContainingSpanFor"+this.m_ActiveRow.id+"_"+i);
if(_1f7!=null){
_1f7.savedColor=_1f7.style.color;
_1f7.savedBackgroundColor=_1f7.style.backgroundColor;
_1f7.style.color=_1f3.style.color;
_1f7.style.backgroundColor=_1f3.style.backgroundColor;
}
}
}
}
nitobi.combo.List.prototype.GetSelectedRowValues=List_GetSelectedRowValues;
function List_GetSelectedRowValues(){
var _1f9=new Array;
for(var i=0;i<this.GetXmlDataSource().GetNumberColumns();i++){
_1f9[i]=document.getElementById(this.GetCombo().GetId()+"SelectedValue"+i).value;
}
return _1f9;
}
nitobi.combo.List.prototype.SetSelectedRowValues=List_SetSelectedRowValues;
function List_SetSelectedRowValues(_1fb,Row){
this.m_SelectedRowValues=_1fb;
var _1fd=this.GetCombo().GetId();
var _1fe=this.GetXmlDataSource().GetNumberColumns();
if((null==_1fb)&&(null==Row)){
for(var i=0;i<_1fe;i++){
document.getElementById(_1fd+"SelectedValue"+i).value="";
}
}else{
if(null==Row){
for(var i=0;i<_1fe;i++){
document.getElementById(_1fd+"SelectedValue"+i).value=_1fb[i];
}
}else{
var _200=this.GetCombo().GetUniqueId();
var _201=this.GetRowIndex(Row);
var _202=this.GetXmlDataSource().GetRow(_201);
this.SetSelectedRowValues(_202,null);
}
}
}
nitobi.combo.List.prototype.GetEnableDatabaseSearch=List_GetEnableDatabaseSearch;
function List_GetEnableDatabaseSearch(){
return this.m_EnableDatabaseSearch;
}
nitobi.combo.List.prototype.SetEnableDatabaseSearch=List_SetEnableDatabaseSearch;
function List_SetEnableDatabaseSearch(_203){
this.m_EnableDatabaseSearch=_203;
}
nitobi.combo.List.prototype.GetFooterText=List_GetFooterText;
function List_GetFooterText(){
if(null==this.m_HTMLTagObject){
return this.m_FooterText;
}else{
var _204=document.getElementById("EBAComboBoxListFooterPageNextButton"+this.GetCombo().GetUniqueId());
return (null!=_204?_204.innerHTML:"");
}
}
nitobi.combo.List.prototype.SetFooterText=List_SetFooterText;
function List_SetFooterText(_205){
if(null==this.m_HTMLTagObject){
this.m_FooterText=_205;
}else{
var _206=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
if(null!=_206){
_206=document.getElementById("EBAComboBoxListFooterPageNextButton"+this.GetCombo().GetUniqueId());
if(null!=_206){
_206.innerHTML=_205;
}
}
}
}
nitobi.combo.List.prototype.GetDatabaseSearchTimeoutStatus=List_GetDatabaseSearchTimeoutStatus;
function List_GetDatabaseSearchTimeoutStatus(){
return this.m_DatabaseSearchTimeoutStatus;
}
nitobi.combo.List.prototype.SetDatabaseSearchTimeoutStatus=List_SetDatabaseSearchTimeoutStatus;
function List_SetDatabaseSearchTimeoutStatus(_207){
this.m_DatabaseSearchTimeoutStatus=_207;
}
nitobi.combo.List.prototype.GetDatabaseSearchTimeoutId=List_GetDatabaseSearchTimeoutId;
function List_GetDatabaseSearchTimeoutId(){
return this.m_DatabaseSearchTimeoutId;
}
nitobi.combo.List.prototype.SetDatabaseSearchTimeoutId=List_SetDatabaseSearchTimeoutId;
function List_SetDatabaseSearchTimeoutId(_208){
this.m_DatabaseSearchTimeoutId=_208;
}
nitobi.combo.List.prototype.GetHeight=List_GetHeight;
function List_GetHeight(){
return this.GetSectionHeight(EBAComboBoxListBody);
}
nitobi.combo.List.prototype.SetHeight=List_SetHeight;
function List_SetHeight(_209){
this.SetSectionHeight(EBAComboBoxListBody,parseInt(_209));
}
nitobi.combo.List.prototype.GetActualHeight=List_GetActualPixelHeight;
nitobi.combo.List.prototype.GetActualPixelHeight=List_GetActualPixelHeight;
function List_GetActualPixelHeight(){
var uid=this.GetCombo().GetUniqueId();
var tag=this.GetHTMLTagObject();
var _20c=nitobi.Browser.GetElementHeight(tag);
return _20c;
}
nitobi.combo.List.prototype.GetBackgroundHighlightColor=List_GetBackgroundHighlightColor;
function List_GetBackgroundHighlightColor(){
return this.m_BackgroundHighlightColor;
}
nitobi.combo.List.prototype.SetBackgroundHighlightColor=List_SetBackgroundHighlightColor;
function List_SetBackgroundHighlightColor(_20d){
this.m_BackgroundHighlightColor=_20d;
}
nitobi.combo.List.prototype.GetForegroundHighlightColor=List_GetForegroundHighlightColor;
function List_GetForegroundHighlightColor(){
return this.m_ForegroundHighlightColor;
}
nitobi.combo.List.prototype.SetForegroundHighlightColor=List_SetForegroundHighlightColor;
function List_SetForegroundHighlightColor(_20e){
this.m_ForegroundHighlightColor=_20e;
}
nitobi.combo.List.prototype.GetDatasourceUrl=List_GetDatasourceUrl;
function List_GetDatasourceUrl(){
return this.m_DatasourceUrl;
}
nitobi.combo.List.prototype.SetDatasourceUrl=List_SetDatasourceUrl;
function List_SetDatasourceUrl(_20f){
this.m_DatasourceUrl=_20f;
}
nitobi.combo.List.prototype.GetOnHideEvent=List_GetOnHideEvent;
function List_GetOnHideEvent(){
return this.m_OnHideEvent;
}
nitobi.combo.List.prototype.SetOnHideEvent=List_SetOnHideEvent;
function List_SetOnHideEvent(_210){
this.m_OnHideEvent=_210;
}
nitobi.combo.List.prototype.GetOnShowEvent=List_GetOnShowEvent;
function List_GetOnShowEvent(){
return this.m_OnShowEvent;
}
nitobi.combo.List.prototype.SetOnShowEvent=List_SetOnShowEvent;
function List_SetOnShowEvent(_211){
this.m_OnShowEvent=_211;
}
nitobi.combo.List.prototype.GetOnBeforeSearchEvent=List_GetOnBeforeSearchEvent;
function List_GetOnBeforeSearchEvent(){
return this.m_OnBeforeSearchEvent;
}
nitobi.combo.List.prototype.SetOnBeforeSearchEvent=List_SetOnBeforeSearchEvent;
function List_SetOnBeforeSearchEvent(_212){
this.m_OnBeforeSearchEvent=_212;
}
nitobi.combo.List.prototype.GetOnAfterSearchEvent=List_GetOnAfterSearchEvent;
function List_GetOnAfterSearchEvent(){
return this.m_OnAfterSearchEvent;
}
nitobi.combo.List.prototype.SetOnAfterSearchEvent=List_SetOnAfterSearchEvent;
function List_SetOnAfterSearchEvent(_213){
this.m_OnAfterSearchEvent=_213;
}
nitobi.combo.List.prototype.GetOffsetX=List_GetOffsetX;
function List_GetOffsetX(){
return this.m_OffsetX;
}
nitobi.combo.List.prototype.SetOffsetX=List_SetOffsetX;
function List_SetOffsetX(_214){
this.m_OffsetX=parseInt(_214);
}
nitobi.combo.List.prototype.GetOffsetY=List_GetOffsetY;
function List_GetOffsetY(){
return this.m_OffsetY;
}
nitobi.combo.List.prototype.SetOffsetY=List_SetOffsetY;
function List_SetOffsetY(_215){
this.m_OffsetY=parseInt(_215);
}
nitobi.combo.List.prototype.AdjustSize=List_AdjustSize;
function List_AdjustSize(){
var list=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var tag=this.GetHTMLTagObject();
var _218=tag.style;
var _219="";
if(true==nitobi.Browser.GetVerticalScrollBarStatus(list)){
if(nitobi.Browser.GetMeasurementUnitType(this.GetWidth())!="%"){
_219=parseInt(this.GetWidth())+nitobi.html.getScrollBarWidth(list)-(nitobi.browser.MOZ?EBADefaultScrollbarSize:0);
_219=this.GetDesiredPixelWidth();
}else{
_219=this.GetDesiredPixelWidth();
}
list.style.width=_219;
var _21a=this.GetSectionHTMLTagObject(EBAComboBoxListHeader);
var _21b=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
if(_21a!=null){
_21a.style.width=_219;
}
if(_21b!=null){
_21b.style.width=_219;
}
_218.width=(_219);
if(nitobi.browser.IE){
var _21c=nitobi.combo.iframeBacker.style;
_21c.width=_218.width;
}
}
if(nitobi.browser.IE){
var _21c=nitobi.combo.iframeBacker.style;
_21c.height=_218.height;
}
}
nitobi.combo.List.prototype.IsVisible=List_IsVisible;
function List_IsVisible(){
if(!this.m_Rendered){
return false;
}
var tag=this.GetHTMLTagObject();
var _21e=tag.style;
return (_21e.visibility=="visible");
}
nitobi.combo.List.prototype.Show=List_Show;
function List_Show(){
var _21f=this.GetCombo();
var mode=_21f.mode;
this.Render();
if(!this.m_HTMLTagObject||this.IsVisible()||mode=="compact"||this.GetXmlDataSource().GetNumberRows()==0||((mode!="default"&&mode!="unbound")&&_21f.GetTextBox().m_HTMLTagObject.value=="")){
return;
}
var tag=this.GetHTMLTagObject();
var _222=_21f.GetTextBox().GetHTMLContainerObject();
var _223=tag.style;
var _224=nitobi.html.getHeight(_222);
var top=nitobi.html.getCoords(_222).y+_224;
var left=nitobi.html.getCoords(_222).x;
var _227=parseInt(this.GetActualPixelHeight());
var _228=parseInt(this.GetActualPixelWidth());
_223.top=top+"px";
_223.left=left+"px";
_223.zIndex=_21f.m_ListZIndex;
var _229=nitobi.html.getBodyArea().clientWidth;
var _22a=nitobi.html.getBodyArea().clientHeight;
var _22b=(document.body.scrollTop==""||parseInt(document.documentElement.scrollTop==0)?0:parseInt(document.body.scrollTop));
var _22c=(document.body.scrollLeft==""||parseInt(document.documentElement.scrollLeft==0)?0:parseInt(document.body.scrollLeft));
if(parseInt(top)-_22b+_227>_22a){
var _22d=parseInt(_223.top)-_227-_224;
if(_22d>=0){
_223.top=_22d+"px";
}
}
if(parseInt(left)-parseInt(_22c)+_228>_229){
var _22e=document.getElementById(_21f.GetId());
var _22f=nitobi.html.getWidth(_22e);
if(_228>_22f){
var _230=_228-_22f;
var _231=left-_230;
if(_231>=0){
_223.left=_231+"px";
}
}
}
_223.position="absolute";
_223.display="inline";
this.AdjustSize();
this.GenerateCss();
_223.visibility="visible";
this.SetIFrameDimensions();
this.ShowIFrame();
eval(this.GetOnShowEvent());
}
nitobi.combo.List.prototype.SetX=function(x){
var tag=this.GetHTMLTagObject();
tag.style.left=x;
};
nitobi.combo.List.prototype.GetX=function(){
var _234=this.GetCombo();
var _235=nitobi.html.getCoords(_234.GetHTMLTagObject());
return _235.x;
};
nitobi.combo.List.prototype.SetY=function(y){
var tag=this.GetHTMLTagObject();
tag.style.top=y;
};
nitobi.combo.List.prototype.GetY=function(){
var _238=this.GetCombo().GetTextBox().GetHTMLContainerObject();
var _239=nitobi.html.getHeight(_238);
var y=nitobi.html.getCoords(_238).y+_239;
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
nitobi.combo.List.prototype.ShowIFrame=List_ShowIFrame;
function List_ShowIFrame(){
if(nitobi.browser.IE){
var _23d=nitobi.combo.iframeBacker.style;
_23d.visibility="visible";
}
}
nitobi.combo.List.prototype.SetIFrameDimensions=List_SetIFrameDimensions;
function List_SetIFrameDimensions(){
if(nitobi.browser.IE){
var tag=this.GetHTMLTagObject();
var _23f=nitobi.combo.iframeBacker.style;
var _240=tag.style;
_23f.top=_240.top;
_23f.left=_240.left;
_23f.width=nitobi.Browser.GetElementWidth(tag);
_23f.height=nitobi.Browser.GetElementHeight(tag);
_23f.zIndex=parseInt(_240.zIndex)-1;
}
}
nitobi.combo.List.prototype.Hide=List_Hide;
function List_Hide(){
if(!this.m_Rendered){
return false;
}
var tag=this.GetHTMLTagObject();
var _242=tag.style;
_242.visibility="hidden";
if((nitobi.browser.MOZ||nitobi.browser.SAFARI)){
_242.display="none";
}
if(nitobi.browser.IE){
var _243=nitobi.combo.iframeBacker.style;
_243.visibility="hidden";
}
eval(this.GetOnHideEvent());
}
nitobi.combo.List.prototype.Toggle=List_Toggle;
function List_Toggle(){
if(this.IsVisible()){
this.Hide();
this.GetCombo().GetTextBox().ToggleHidden();
}else{
this.Show();
this.GetCombo().GetTextBox().ToggleShow();
}
}
nitobi.combo.List.prototype.SetActiveRowAsSelected=List_SetActiveRowAsSelected;
function List_SetActiveRowAsSelected(){
var _244=this.GetCombo();
var t=_244.GetTextBox();
var row=null;
row=this.GetActiveRow();
if(null!=row){
eval(_244.GetOnBeforeSelectEvent());
}
if(row!=null){
this.SetSelectedRow(this.GetRowIndex(row));
if(_244.mode!="smartlist"){
t.SetValue(this.GetSelectedRowValues()[t.GetDataFieldIndex()]);
}
}
}
nitobi.combo.List.prototype.SetSelectedRow=List_SetSelectedRow;
function List_SetSelectedRow(_247){
this.SetSelectedRowIndex(_247);
var _248=this.GetXmlDataSource().GetRow(_247);
this.SetSelectedRowValues(_248,null);
}
nitobi.combo.List.prototype.OnClick=List_OnClick;
function List_OnClick(Row){
eval(this.GetCombo().GetOnBeforeSelectEvent());
var _24a=this.GetRowIndex(Row);
this.SetSelectedRowIndex(_24a);
var _24b=this.GetXmlDataSource().GetRow(_24a);
this.SetSelectedRowValues(_24b,null);
var _24c=this.GetCombo();
var tb=_24c.GetTextBox();
var _24e=tb.GetDataFieldIndex();
if(_24b.length<=_24e){
alert("You have bound the textbox to a column that does not exist.\nThe textboxDataFieldIndex is "+_24e+".\nThe number of values in the selected row is "+_24b.length+".");
}else{
tb.SetValue(_24b[_24e],_24c.mode=="smartlist");
}
this.Hide();
eval(_24c.GetOnSelectEvent());
}
nitobi.combo.List.prototype.OnMouseWheel=List_OnMouseWheel;
function List_OnMouseWheel(evt){
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
}
nitobi.combo.List.prototype.Render=List_Render;
function List_Render(){
if(!this.m_Rendered){
this.m_Rendered=true;
var _254=this.GetCombo();
var _255=document.body;
var x=_255.insertAdjacentHTML("afterBegin",this.GetHTMLRenderString());
this.Initialize(document.getElementById("EBAComboBoxText"+_254.GetId()));
this.OnWindowResized();
this.GenerateCss();
}
}
nitobi.combo.List.prototype.GetHTMLRenderString=List_GetHTMLRenderString;
function List_GetHTMLRenderString(){
var _257=this.GetCombo();
var _258="outlook";
var _259=_257.GetUniqueId();
var _25a=_257.GetId();
var _25b=parseInt(this.GetDesiredPixelWidth());
var _25c=false;
var _25d="";
if(this.m_XmlDataSource.GetXmlObject()){
var xml=null;
if(_257.mode=="default"||_257.mode=="unbound"){
xml=this.m_XmlDataSource.GetXmlObject().xml;
}else{
xml="<root></root>";
}
_25d=this.GetRowHTML(xml);
}
var _25f=this.GetListColumnDefinitions();
var s="";
s="<span class=\"ntb-combo-reset "+_257.theme+"\"><span id=\"EBAComboBoxList"+_259+"\" class=\"ntb-combobox-list"+"\" style=\"width: "+_25b+"px;\" "+"onMouseOver=\"document.getElementById('"+this.GetCombo().GetId()+"').object.m_Over=true\" "+"onMouseOut=\"document.getElementById('"+this.GetCombo().GetId()+"').object.m_Over=false\" "+"onClick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">\n";
var tag=this.m_userTag;
var _262=tag.childNodes;
var _263="<span class='ntb-combobox-combo-menus ComboListWidth"+_259+"'>";
var _264=false;
for(var i=0;i<_262.length;i++){
if(_262[i].nodeName.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"")=="combopanel"){
s+=_262[i].innerHTML;
}
if(_262[i].nodeName.toLowerCase().replace(/^eba:/,"").replace(/^ntb:/,"")=="combomenu"){
_264=true;
var icon=_262[i].getAttribute("icon");
_263+="<div style='"+(nitobi.browser.MOZ&&i==0?"":"")+";' class='ntb-combobox-combo-menu ComboListWidth"+_259+"' onMouseOver=\"this.className='ntb-combobox-combo-menu-highlight ComboListWidth"+_259+"'\" onmouseout=\"this.className='ntb-combobox-combo-menu ComboListWidth"+_259+"'\" onclick=\""+_262[i].getAttribute("OnClickEvent")+"\">";
if(icon!=""){
_263+="<img class='ntb-combobox-combo-menu-icon' align='absmiddle' src='"+icon+"'>";
}
_263+=_262[i].getAttribute("text")+"</div>";
}
}
_263+="</span>";
if(_257.mode=="default"||_257.mode=="filter"||_257.mode=="unbound"){
for(var i=0;i<_25f.length;i++){
if(_25f[i].GetHeaderLabel()!=""){
_25c=true;
}
}
var _267=this.GetCustomHTMLHeader();
if((_25c==true)||(_267!="")){
s+="<span id='EBAComboBoxListHeader"+_259+"' class='ntb-combobox-list-header' style='padding:0px; margin:0px; width: "+_25b+"px;' >\n";
if(_267!=""){
s+=_267;
}else{
s+="<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;' class='ComboHeader"+_259+"'>\n";
s+="<tr style='width:100%' id='EBAComboBoxColumnLabels"+_259+"' class='ntb-combobox-column-labels'>\n";
var _268="";
var _269=false;
for(var i=0;i<_25f.length;i++){
var _26a=_25f[i].GetWidth();
_268="";
if(_25f[i].GetColumnType().toLowerCase()=="hidden"){
_268+="style='display: none;'";
_25f[i].SetWidth("0%");
}
var _26b="comboColumn_"+i+"_"+_259;
var _26c=(i>0?"style='padding-left:0px'":"");
s+="<td "+_26c+" align='"+_25f[i].GetAlign()+"' class='ntb-combobox-column-label "+_26b+"' "+_268+">";
s+="<div class='"+_26b+" ntb-combobox-column-label-text'>"+_25f[i].GetHeaderLabel()+"</div>";
s+="</td>\n";
}
s+="</tr>\n";
s+="</table>\n";
}
s+="</span><br>\n";
}
}
if(_264){
s+=_263;
}
s+="<span id='EBAComboBoxListBody"+_259+"' class='ntb-combobox-list-body"+"' style='width:"+_25b+"px;"+(_257.mode=="default"||_257.mode=="unbound"||(_257.mode=="smartsearch"&&this.GetAllowPaging())?"height: "+this.GetSectionHeight(EBAComboBoxListBody)+"px"+(this.m_overflowy=="auto"?";_overflow-y:;_overflow:auto":""):"overflow:visible")+";' onscroll=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetTextBox().GetHTMLTagObject().focus()\" "+"onmousewheel=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseWheel(event)\" "+"onfocus=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">\n";
s+=_25d+"</table>"+"</span>\n";
s+="<br><span id='EBAComboBoxListFooter"+_259+"' style='width:"+_25b+"px; display:"+(this.GetAllowPaging()?"inline":"none")+"' class='ntb-combobox-list-footer'>\n";
s+="<span id=\"EBAComboBoxListFooterPageNextButton"+_259+"\" style=\"width:100%\""+" class=\"ntb-combobox-list-footer-page-next-button\" "+"onMouseOver='this.className=\"ntb-combobox-list-footer-page-next-button-highlight\"' "+"onMouseOut='this.className=\"ntb-combobox-list-footer-page-next-button\"' "+"onClick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnGetNextPage(null, true);\"></span>\n";
s+="</span>\n"+"</span>\n";
s+="</span>\n";
//MJD:
s=s.replace(/\#<\#/g,"<").replace(/\#\>\#/g,">").replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\#EQ\#/g,"=").replace(/\#\Q\#/g,"\"").replace(/\#\&amp\;\#/g,"&");

return s;
}
nitobi.combo.List.prototype.Initialize=List_Initialize;
function List_Initialize(_26d){
this.attachee=_26d;
var c=this.GetCombo();
var d=document;
var _270=c.GetUniqueId();
this.SetHTMLTagObject(d.getElementById("EBAComboBoxList"+_270));
this.SetSectionHTMLTagObject(EBAComboBoxListHeader,d.getElementById("EBAComboBoxListHeader"+_270));
this.SetSectionHTMLTagObject(EBAComboBoxListBody,d.getElementById("EBAComboBoxListBody"+_270));
this.SetSectionHTMLTagObject(EBAComboBoxListFooter,d.getElementById("EBAComboBoxListFooter"+_270));
this.SetSectionHTMLTagObject(EBAComboBoxListBodyTable,d.getElementById("EBAComboBoxListBodyTable"+_270));
this.SetSectionHTMLTagObject(EBAComboBoxList,d.getElementById("EBAComboBoxList"+_270));
if(c.mode=="default"&&true==this.GetAllowPaging()){
this.SetFooterText(this.GetXmlDataSource().GetNumberRows()+EbaComboUi[EbaComboUiNumRecords]);
}
this.Hide();
}
nitobi.combo.List.prototype.OnMouseOver=List_OnMouseOver;
function List_OnMouseOver(Row){
this.SetActiveRow(Row);
}
nitobi.combo.List.prototype.OnMouseOut=List_OnMouseOut;
function List_OnMouseOut(Row){
this.SetActiveRow(null);
}
nitobi.combo.List.prototype.OnFocus=List_OnFocus;
function List_OnFocus(){
var t=this.GetCombo().GetTextBox();
t.m_skipFocusOnce=true;
t.m_HTMLTagObject.focus();
}
nitobi.combo.List.prototype.OnGetNextPage=List_OnGetNextPage;
function List_OnGetNextPage(_274,_275){
if(this.m_httpRequestReady){
var _276=this.GetXmlDataSource();
var last=null;
if(_275==true){
var n=_276.GetNumberRows();
if(n>0){
last=_276.GetRowCol(n-1,this.GetCombo().GetTextBox().GetDataFieldIndex());
}
}
this.GetPage(_276.GetNumberRows(),this.GetPageSize(),this.GetCombo().GetTextBox().GetIndexSearchTerm(),_274,last);
this.GetCombo().GetTextBox().GetHTMLTagObject().focus();
}
}
nitobi.combo.List.prototype.OnWindowResized=List_OnWindowResized;
function List_OnWindowResized(){
if(!this.m_Rendered){
return;
}
if(nitobi.Browser.GetMeasurementUnitType(this.GetWidth())=="%"){
this.SetWidth(this.GetWidth());
}
}
nitobi.combo.List.prototype.GenerateCss=function(){
var _279=this.GetListColumnDefinitions();
var uid=this.GetCombo().GetUniqueId();
var _27b="";
var _27c=-1;
var list=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var sb=nitobi.html.getScrollBarWidth(list);
var _27f=(nitobi.browser.MOZ?6:0);
var _280=0;
for(var i=0;i<this.widestColumn.length;i++){
_280+=this.widestColumn[i];
}
if(_280<parseInt(this.GetDesiredPixelWidth())){
_280=parseInt(this.GetDesiredPixelWidth());
}
var _282=_280-sb-_27f;
var _283=_280-sb-_27f;
var _284=nitobi.html.Css.addRule;
if(this.stylesheet==null){
this.stylesheet=nitobi.html.Css.createStyleSheet();
}
var ss=this.stylesheet.sheet;
if(nitobi.browser.SAFARI){
_284(ss,".ComboRow"+uid,"width:"+(_280-sb)+"px;}");
_284(ss,".ComboHeader"+uid,"width:"+(_280-sb+3)+"px;}");
_284(ss,".ComboListWidth"+uid,"width:"+(_280)+"px;");
}else{
_27b+=".ComboRow"+uid+"{width:"+(_280-sb)+"px;}";
_27b+=".ComboHeader"+uid+"{width:"+(_280-sb+3)+"px;}";
_27b+=".ComboListWidth"+uid+"{width:"+(_280)+"px;}";
}
for(var i=0;i<_279.length;i++){
var _286=_279[i].GetWidth();
if(nitobi.Browser.GetMeasurementUnitType(_286)=="%"&&_286!="*"){
_286=Math.floor((parseInt(_286)/100)*_283);
}else{
if(_286!="*"){
_286=parseInt(_286);
}
}
if(_286=="*"||(i==_279.length-1&&_27c==-1)){
_27c=i;
}else{
if(_286<this.widestColumn[i]){
_286=this.widestColumn[i];
}
_282-=parseInt(_286);
if(nitobi.browser.SAFARI){
_284(ss,".comboColumn_"+i+"_"+uid,"width:"+(_286)+"px;");
}else{
_27b+=".comboColumn_"+i+"_"+uid+"{ width: "+(_286)+"px;}";
}
}
}
if(_27c!=-1){
if(nitobi.browser.SAFARI){
_284(ss,".comboColumn_"+_27c+"_"+uid,"width:"+_282+"px;");
}else{
_27b+=".comboColumn_"+_27c+"_"+uid+"{ width: "+_282+"px;}";
}
}
nitobi.html.Css.setStyleSheetValue(this.stylesheet,_27b);
};
nitobi.combo.List.prototype.GenerateSafariCss=function(){
};
nitobi.combo.List.prototype.ClearCss=function(){
if(this.stylesheet==null){
this.stylesheet=document.createStyleSheet();
}
this.stylesheet.cssText="";
};
nitobi.combo.List.prototype.GetRowHTML=List_GetRowHTML;
function List_GetRowHTML(XML,_288){
var _289=this.GetCombo();
var _28a=_289.GetId();
var _28b=_289.GetUniqueId();
var _28c=this.GetListColumnDefinitions();
var _28d=parseInt(this.GetWidth());
var xsl="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"  >";
xsl+="<xsl:output method=\"xml\" version=\"4.0\" omit-xml-declaration=\"yes\" />\n"+"<xsl:template match=\"/\">"+"<table cellspacing=\"0\" cellpadding=\"0\" id=\"EBAComboBoxListBodyTable"+_28b+"_"+this.GetNumPagesLoaded()+"\" class=\"ntb-combobox-list-body-table ComboRow"+_28b+"\">\n"+"<xsl:apply-templates />"+"</table>"+"</xsl:template>";
xsl+="<xsl:template match=\"e\">";
xsl+="<tr onclick=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnClick(this)\" "+"onmouseover=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseOver(this)\" "+"onmouseout=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnMouseOut(this)\">";
xsl+="<xsl:attribute name=\"id\">";
var _28f="position()+"+(this.GetXmlDataSource().GetNumberRows()-this.GetXmlDataSource().GetLastPageSize())+"-1";
var _290="EBAComboBoxRow"+_28b+"_<xsl:value-of select=\""+_28f+"\"/>";
xsl+=_290+"</xsl:attribute>"+"<td class='ComboRowContainerParent'><table cellspacing='0' cellpadding='0' class='ntb-combobox-list-body-table-row "+"ComboRow"+_28b+"' style=\"width:"+(nitobi.browser.SAFARI?this.GetWidth():"100%")+";table-layout:fixed;\"><tbody>"+"<xsl:attribute name=\"id\">"+"ContainingTableFor"+_290+"</xsl:attribute>"+"<tr class='ComboRowContainer'>";
var _291=this.GetCustomHTMLDefinition();
var _292;
var _293="";
if(""==_291){
for(var i=0;i<_28c.length;i++){
var _295="";
var _296=_28c[i].GetColumnType().toLowerCase();
if(_296=="hidden"){
_295+="style='display: none;'";
}
var _297="comboColumn_"+i+"_"+_28b;
_293+="<col class=\""+_297+"\" style=\"width:"+_28c[i].GetWidth()+"\" />";
xsl+="<td align='"+_28c[i].GetAlign()+"' class='"+_297+" "+_28c[i].GetCSSClassName()+"' "+_295+" style=\"width:"+_28c[i].GetWidth()+"\">";
xsl+="<div class=\""+(nitobi.browser.IE||nitobi.browser.SAFARI?_297+" ":"")+_28c[i].GetCSSClassName()+"Cell\" style=\"color:"+_28c[i].GetTextColor()+";overflow:hidden;\" onfocus=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\""+" onmouseover=\"document.getElementById('"+this.GetCombo().GetId()+"').object.GetList().OnFocus()\">";
xsl+="<xsl:attribute name=\"id\">"+"ContainingSpanFor"+_290+"_"+i+"</xsl:attribute>"+"<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_28c[i].GetHTMLPrefix()+""+"]]>"+"</xsl:text>";
_292=_28c[i].GetDataFieldIndex();
if(null==_292){
_292=i;
}
_292=parseInt(_292);
var _298="";
if(_296=="image"){
_298=_28c[i].GetImageHandlerURL();
_298.indexOf("?")==-1?_298+="?":_298+="&";
_298+="image=";
xsl+="<img> <xsl:attribute name=\"align\"><xsl:value-of  select=\"absmiddle\"/></xsl:attribute>"+"<xsl:attribute name=\"src\"><xsl:value-of select=\"concat('"+(_28c[i].ImageUrlFromData?"":_298)+"',"+"@"+String.fromCharCode(97+_292)+")\"/></xsl:attribute>"+"</img>";
}
if((_288!=null)&&(_296!="image")){
xsl+="<xsl:call-template name=\"bold\"><xsl:with-param name=\"string\">";
}
if(_296!="image"){
xsl+="<xsl:value-of select=\"@"+String.fromCharCode(97+_292)+"\"></xsl:value-of>";
}
if((_288!=null)&&(_296!="image")){
xsl+="</xsl:with-param><xsl:with-param name=\"pattern\" select=\""+nitobi.xml.constructValidXpathQuery(_288,true)+"\"></xsl:with-param></xsl:call-template>";
}
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_28c[i].GetHTMLSuffix()+""+"]]>"+"</xsl:text>";
xsl+="</div>";
xsl+="</td>";
}
}else{
xsl+="<td width='100%'>";
var done=false;
var _29a=0;
var _29b=0;
var _29c=0;
var _29d;
while(!done){
_29a=_291.indexOf("${",_29b);
if(_29a!=-1){
_29b=_291.indexOf("}",_29a);
_29d=_291.substr(_29a+2,_29b-_29a-2);
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_291.substr(_29c,_29a-_29c)+"]]>"+"</xsl:text>";
xsl+="<xsl:value-of select=\"@"+String.fromCharCode(parseInt(_29d)+97)+"\"></xsl:value-of>";
_29c=_29b+1;
}else{
xsl+="<xsl:text disable-output-escaping=\"yes\">"+"<![CDATA["+_291.substr(_29c)+"]]>"+"</xsl:text>";
done=true;
}
}
xsl+="</td>";
}
xsl+="</tr></tbody><colgroup>"+_293+"</colgroup></table></td></tr>\n"+"</xsl:template>";
if(_288!=null){
xsl+="<xsl:template name=\"bold\">"+"<xsl:param name=\"string\" select=\"''\" /><xsl:param name=\"pattern\" select=\"''\" /><xsl:param name=\"carryover\" select=\"''\" />";
xsl+="<xsl:variable name=\"lcstring\" select=\"translate($string,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')\"/>"+"<xsl:variable name=\"lcpattern\" select=\"translate($pattern,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')\"/>";
xsl+="<xsl:choose>"+"<xsl:when test=\"$pattern != '' and $string != '' and contains($lcstring,$lcpattern)\">"+"<xsl:variable name=\"newpattern\" select=\"substring($string,string-length(substring-before($lcstring,$lcpattern)) + 1, string-length($pattern))\"/>"+"<xsl:variable name=\"before\" select=\"substring-before($string, $newpattern)\" />"+"<xsl:variable name=\"len\" select=\"string-length($before)\" />"+"<xsl:variable name=\"newcarryover\" select=\"boolean($len&gt;0 and contains(substring($before,$len,1),'%'))\" />"+"<xsl:value-of select=\"$before\" />"+"<xsl:choose>"+"<xsl:when test=\"($len=0 and $carryover) or $newcarryover or ($len&gt;1 and contains(substring($before,$len - 1,1),'%'))\">"+"<xsl:copy-of select=\"$newpattern\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<b><xsl:copy-of select=\"$newpattern\" /></b>"+"</xsl:otherwise></xsl:choose>"+"<xsl:call-template name=\"bold\">"+"<xsl:with-param name=\"string\" select=\"substring-after($string, $newpattern)\" />"+"<xsl:with-param name=\"pattern\" select=\"$pattern\" />"+"<xsl:with-param name=\"carryover\" select=\"$newcarryover\" />"+"</xsl:call-template>"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"$string\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:template>";
}
xsl+="</xsl:stylesheet>";
oXSL=nitobi.xml.createXmlDoc(xsl);
tmp=nitobi.xml.createXmlDoc(XML.replace(/>\s+</g,"><"));
var html=nitobi.xml.serialize(nitobi.xml.transformToXml(tmp,oXSL));
//MJD:
html=html.replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\#\&eq\;\#/g,"=").replace(/\#\&quot\;\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
return html;
}
nitobi.combo.List.prototype.ScrollIntoView=List_ScrollIntoView;
function List_ScrollIntoView(Row,Top,_2a1){
if(Row&&this.GetCombo().mode!="compact"){
var _2a2=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
if(nitobi.Browser.IsObjectInView(Row,_2a2,Top,_2a1)==false){
nitobi.Browser.ScrollIntoView(Row,_2a2,Top);
}
}
}
nitobi.combo.List.prototype.GetRowIndex=List_GetRowIndex;
function List_GetRowIndex(Row){
var vals=Row.id.split("_");
var _2a5=vals[vals.length-1];
return _2a5;
}
EBAComboListDatasourceAccessStatus_BUSY=0;
EBAComboListDatasourceAccessStatus_READY=1;
nitobi.combo.List.prototype.GetDatasourceAccessStatus=List_GetDatasourceAccessStatus;
function List_GetDatasourceAccessStatus(){
if(this.m_httpRequestReady){
return EBAComboListDatasourceAccessStatus_READY;
}else{
return EBAComboListDatasourceAccessStatus_BUSY;
}
}
nitobi.combo.List.prototype.Eval=List_Eval;
function List_Eval(_2a6){
eval(_2a6);
}
nitobi.combo.List.prototype.GetPage=List_GetPage;
function List_GetPage(_2a7,_2a8,_2a9,_2aa,_2ab,_2ac,_2ad,_2ae){
var _2af=new Date().getTime();
this.SetFooterText(EbaComboUi[EbaComboUiPleaseWait]);
if(_2ab==null){
_2ab="";
}
this.m_httpRequest=new nitobi.ajax.HttpRequest();
this.m_httpRequest.responseType="text";
this.m_httpRequest.onRequestComplete.subscribe(this.onGetComplete,this);
this.lastHttpRequestTime=_2af;
if(null==_2aa){
_2aa=EBAScrollToNone;
}
this.m_OriginalSearchSubstring=_2a9;
var _2b0=this.GetDatasourceUrl();
_2b0.indexOf("?")==-1?_2b0+="?":_2b0+="&";
_2b0+="StartingRecordIndex="+_2a7+"&PageSize="+_2a8+"&SearchSubstring="+encodeURIComponent(_2a9)+"&ComboId="+encodeURI(this.GetCombo().GetId())+"&LastString="+encodeURIComponent(_2ab);
this.m_httpRequest.open(this.GetCombo().GetHttpRequestMethod(),_2b0,true,"","");
this.m_httpRequestReady=false;
this.m_httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
this.m_httpRequest.params={StartingRecordIndex:_2a7,SearchSubstring:_2a9,ScrollTo:_2aa,GetPageCallback:_2ac,SearchColumnIndex:_2ad,SearchCallback:_2ae,RequestTime:_2af};
var vs=document.getElementsByName("__VIEWSTATE");
if((vs!=null)&&(vs["__VIEWSTATE"]!=null)){
var _2b2="__VIEWSTATE="+encodeURI(vs["__VIEWSTATE"].value).replace(/\+/g,"%2B");
var _2b3="__EVENTTARGET="+encodeURI(this.GetCombo().GetId());
var args="__EVENTARGUMENT=GetPage";
var _2b5=_2b3+"&"+args+"&"+_2b2;
this.m_httpRequest.send(_2b5);
}else{
this.m_httpRequest.send("EBA Combo Box Get Page Request");
}
return true;
}
nitobi.combo.List.prototype.onGetComplete=function(_2b6){
var _2b7=_2b6.params;
if(this.lastHttpRequestTime!=_2b7.RequestTime){
return;
}
var co=this.GetCombo();
var t=co.GetTextBox();
var list=co.GetList();
if(list==null){
alert(EbaComboUi[EbaComboUiServerError]);
}
var _2bb=_2b6.response;
var _2bc=_2bb.indexOf("<?xml");
if(_2bc!=-1){
_2bb=_2bb.substr(_2bc);
}
var _2bd=list.GetXmlDataSource();
var _2be=_2bd.GetNumberRows();
var tmp=nitobi.xml.createXmlDoc(_2bb);
if(true==list.clip){
tmp=xbClipXml(tmp,"root","e",list.clipLength);
_2bb=tmp.xml;
}
var _2c0=tmp.selectNodes("//e").length;
var _2c1=co.mode!="default"&&!(co.mode=="smartsearch"&&list.GetAllowPaging());
if((_2c0>0)&&(_2b7.StartingRecordIndex==0)||_2c1){
list.Clear();
_2bd.Clear();
}
if(_2c0==0&&_2c1){
list.Hide();
}
if(_2c0>0){
_2bd.AddPage(_2bb);
var ss=null;
if(co.mode=="smartsearch"||co.mode=="smartlist"){
ss=list.searchSubstring;
}
list.AddPage(_2bb,ss);
if((_2b7.StartingRecordIndex==0)&&(list.GetCombo().GetTextBox().GetSearchTerm()!="")){
list.SetActiveRow(list.GetRow(0));
}
var _2c3=false;
try{
if(!list.IsFuzzySearchEnabled()){
var _2c4=_2bd.Search(list.m_OriginalSearchSubstring,t.GetDataFieldIndex(),co.mode=="smartsearch"||co.mode=="smartlist");
_2c3=(_2c4==-1);
}
}
catch(err){
}
var _2c5=list.IsVisible();
if(EBAScrollToBottom==_2b7.ScrollTo){
var r=list.GetRow(_2be-1);
list.SetActiveRow(r);
list.ScrollIntoView(r,false);
}else{
if(EBAScrollToNewTop==_2b7.ScrollTo||EBAScrollToNewBottom==_2b7.ScrollTo){
var r=list.GetRow(_2be);
list.SetActiveRow(r);
list.ScrollIntoView(r,EBAScrollToNewTop==_2b7.ScrollTo);
var tb=t.m_HTMLTagObject;
tb.value=list.GetXmlDataSource().GetRowCol(_2be,t.GetDataFieldIndex());
nitobi.html.setCursor(tb,tb.value.length);
t.Paging=false;
}else{
if(_2c5){
list.ScrollIntoView(list.GetActiveRow(),true);
}
}
}
try{
if(!_2c3&&_2b7.GetPageCallback){
_2b7.GetPageCallback(EBAComboSearchNewRecords,list,_2b7.SearchSubstring,_2b7.SearchColumnIndex,_2b7.SearchCallback);
}
}
catch(err){
}
}else{
try{
if(_2b7.GetPageCallback){
_2b7.GetPageCallback(EBAComboSearchNoRecords,list,_2b7.SearchSubstring,_2b7.SearchColumnIndex,_2b7.SearchCallback);
}
}
catch(err){
}
list.SetFooterText(EbaComboUi[EbaComboUiNoRecords]);
list.SetActiveRow(null);
}
if(list.InitialSearchOnce==true&&_2c0>0){
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
nitobi.combo.List.prototype.Search=function(_2c9,_2ca,_2cb,_2cc){
var _2cd=this.GetCombo();
var _2ce=this.GetXmlDataSource();
if(_2cd.mode!="default"&&_2c9==""){
this.Hide();
return;
}
if(null==_2cc){
_2cc=false;
}
eval(this.GetOnBeforeSearchEvent());
var _2cf=-1;
if(!this.GetEnableDatabaseSearch()||!_2ce.m_Dirty||_2cd.mode=="unbound"){
_2cf=_2ce.Search(_2c9,_2ca,_2cd.mode=="smartsearch"||_2cd.mode=="smartlist");
if(_2cf>-1&&this.InitialSearchOnce!=true){
this.Show();
}
if(-1!=_2cf){
if(_2cb){
try{
_2cb(_2cf,this);
}
catch(err){
}
}
eval(this.GetOnAfterSearchEvent());
}
if(-1==_2cf&&(false==this.GetEnableDatabaseSearch()||_2cc)){
if(_2cb){
try{
_2cb(_2cf,this);
}
catch(err){
}
}
eval(this.GetOnAfterSearchEvent());
}
}
this.searchSubstring=_2c9;
if((-1==_2cf)&&(this.GetEnableDatabaseSearch()==true&&(_2cc==false))){
var _2d0=this.GetDatabaseSearchTimeoutStatus();
var _2d1="var list = document.getElementById('"+_2cd.GetId()+"').object.GetList(); "+"list.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_EXPIRED);"+"var textbox = document.getElementById('"+_2cd.GetId()+"').object.GetTextBox();"+"list.Search(textbox.GetSearchTerm(),textbox.GetDataFieldIndex(),textbox.m_Callback);";
var _2d2=this.GetDatabaseSearchTimeoutId();
_2cd.GetTextBox().SetIndexSearchTerm(_2c9);
switch(_2d0){
case (EBADatabaseSearchTimeoutStatus_EXPIRED):
if(_2d2!=null){
window.clearTimeout(_2d2);
}
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_NONE);
var _2d3=_ListGetPageCallback;
this.GetPage(0,this.GetPageSize(),_2c9,EBAScrollToTypeAhead,null,_2d3,_2ca,_2cb);
break;
case (EBADatabaseSearchTimeoutStatus_WAIT):
if(_2d2!=null){
window.clearTimeout(_2d2);
}
var _2d2=window.setTimeout(_2d1,EBADatabaseSearchTimeoutWait);
this.SetDatabaseSearchTimeoutId(_2d2);
case (EBADatabaseSearchTimeoutStatus_NONE):
this.SetDatabaseSearchTimeoutStatus(EBADatabaseSearchTimeoutStatus_WAIT);
var _2d2=window.setTimeout(_2d1,EBADatabaseSearchTimeoutWait);
this.SetDatabaseSearchTimeoutId(_2d2);
}
}
};
function _ListGetPageCallback(_2d4,list,_2d6,_2d7,_2d8){
if((list==null)){
alert(EbaComboUi[EbaComboUiServerError]);
}
if(_2d4==EBAComboSearchNewRecords){
if(!list.IsFuzzySearchEnabled()){
list.Search(_2d6,_2d7,_2d8);
}else{
list.Show();
}
}else{
_2d8(-1,list);
list.Eval(list.GetOnAfterSearchEvent());
}
}
nitobi.combo.List.prototype.Clear=List_Clear;
function List_Clear(){
var _2d9=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
_2d9.innerHTML="";
this.SetSelectedRowIndex(-1);
this.SetSelectedRowValues(null);
}
nitobi.combo.List.prototype.FitContent=List_FitContent;
function List_FitContent(){
var _2da=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
var _2db=_2da.childNodes[_2da.childNodes.length-1];
var row=_2db;
while(row.childNodes[0]!=null&&row.childNodes[0].className.indexOf("ComboBoxListColumnDefinition")==-1){
row=row.childNodes[0];
}
for(var i=0;i<row.childNodes.length;i++){
var _2de=nitobi.html.getWidth(row.childNodes[0]);
if(this.widestColumn[i]<_2de){
this.widestColumn[i]=_2de;
}
}
}
nitobi.combo.List.prototype.AddPage=List_AddPage;
function List_AddPage(_2df,_2e0){
var _2e1=this.GetXmlDataSource();
var tmp=nitobi.xml.createXmlDoc(_2df);
var _2e3=tmp.selectNodes("//e").length;
if(_2e3>0){
var html=this.GetRowHTML(_2df,_2e0);
var _2e5=this.GetSectionHTMLTagObject(EBAComboBoxListBody);
_2e5.insertAdjacentHTML("beforeEnd",html,true);
this.GenerateCss();
}
var _2e6=_2e1.GetLastPageSize();
if(0==_2e3){
this.SetFooterText(EbaComboUi[EbaComboUiEndOfRecords]);
}else{
this.SetFooterText(_2e1.GetNumberRows()+EbaComboUi[EbaComboUiNumRecords]);
}
this.AdjustSize();
this.SetIFrameDimensions();
}
nitobi.combo.List.prototype.HideFooter=List_HideFooter;
function List_HideFooter(){
var _2e7=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
var _2e8=_2e7.style;
_2e8.display="none";
}
nitobi.combo.List.prototype.ShowFooter=List_ShowFooter;
function List_ShowFooter(){
var _2e9=this.GetSectionHTMLTagObject(EBAComboBoxListFooter);
var _2ea=_2e9.style;
_2ea.display="inline";
}
nitobi.combo.List.prototype.AddRow=List_AddRow;
function List_AddRow(_2eb){
var xml="<root><e ";
for(var i=0;i<_2eb.length;i++){
xml+=String.fromCharCode(i+97)+"='"+nitobi.xml.encode(_2eb[i])+"' ";
}
xml+="/></root>";
this.GetXmlDataSource().AddPage(xml);
this.AddPage(xml);
}
nitobi.combo.List.prototype.Move=List_Move;
function List_Move(_2ee){
var _2ef=this.GetCombo();
var mode=_2ef.mode;
if(mode=="compact"||this.GetXmlDataSource().GetNumberRows()==0||(mode!="default"&&mode!="unbound"&&_2ef.GetTextBox().m_HTMLTagObject.value=="")){
return false;
}
var _2f1=this.GetActiveRow();
this.Show();
if(null==_2f1){
_2f1=this.GetRow(0,null);
}else{
var _2f2=this.GetRowIndex(this.GetActiveRow());
switch(_2ee){
case (EBAMoveAction_UP):
_2f2--;
break;
case (EBAMoveAction_DOWN):
_2f2++;
break;
default:
}
if((_2f2>=0)&&(_2f2<this.GetXmlDataSource().GetNumberRows())){
_2f1=this.GetRow(_2f2,null);
}
}
this.SetActiveRow(_2f1);
this.ScrollIntoView(_2f1,false,true);
return true;
}
nitobi.combo.List.prototype.GetRow=List_GetRow;
function List_GetRow(_2f3,Id){
if(null!=_2f3){
return document.getElementById("EBAComboBoxRow"+this.GetCombo().GetUniqueId()+"_"+_2f3);
}
if(null!=Id){
return document.getElementById(Id);
}
}
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.ListColumnDefinition=function(_2f5){
if(!_2f5.getAttribute){
_2f5.getAttribute=function(a){
return this[a];
};
}
var _2f7="50px";
var _2f8="ntb-combobox-list-column-definition";
var _2f9="text";
var _2fa="";
var _2fb="left";
var _2fc="#000";
var _2fd=(_2f5?_2f5.getAttribute("TextColor"):null);
((null==_2fd)||(""==_2fd))?this.SetTextColor(_2fc):this.SetTextColor(_2fd);
var _2fe=(_2f5?_2f5.getAttribute("Align"):null);
((null==_2fe)||(""==_2fe))?this.SetAlign(_2fb):this.SetAlign(_2fe);
var _2ff=(_2f5?_2f5.getAttribute("Width"):null);
((null==_2ff)||(""==_2ff))?this.SetWidth(_2f7):this.SetWidth(_2ff);
var ihu=(_2f5?_2f5.getAttribute("ImageHandlerURL"):null);
((null==ihu)||(""==ihu))?this.SetImageHandlerURL(_2fa):this.SetImageHandlerURL(ihu);
var ct=(_2f5?_2f5.getAttribute("ColumnType"):null);
((null==ct)||(""==ct))?this.SetColumnType(_2f9):this.SetColumnType(ct.toLowerCase());
this.ImageUrlFromData=((this.GetColumnType()=="image")&&((null==ihu)||(""==ihu)));
var ccn=(_2f5?_2f5.getAttribute("CSSClassName"):null);
((null==ccn)||(""==ccn))?this.SetCSSClassName(_2f8):this.SetCSSClassName(ccn);
var hp=(_2f5?_2f5.getAttribute("HTMLPrefix"):null);
((null==hp)||(""==hp))?this.SetHTMLPrefix(""):this.SetHTMLPrefix(hp);
var hs=(_2f5?_2f5.getAttribute("HTMLSuffix"):null);
((null==hs)||(""==hs))?this.SetHTMLSuffix(""):this.SetHTMLSuffix(hs);
var hl=(_2f5?_2f5.getAttribute("HeaderLabel"):null);
((null==hl)||(""==hl))?this.SetHeaderLabel(""):this.SetHeaderLabel(hl);
var dfi=(_2f5?_2f5.getAttribute("DataFieldIndex"):null);
((null==dfi)||(""==dfi))?this.SetDataFieldIndex(0):this.SetDataFieldIndex(dfi);
};
nitobi.combo.ListColumnDefinition.prototype.GetAlign=function(){
return this.m_Align;
};
nitobi.combo.ListColumnDefinition.prototype.SetAlign=function(_307){
_307=_307.toLowerCase();
if("right"!=_307&&"left"!=_307&&"center"!=_307){
_307="left";
}
this.m_Align=_307;
};
nitobi.combo.ListColumnDefinition.prototype.GetTextColor=function(){
return this.m_TextColor;
};
nitobi.combo.ListColumnDefinition.prototype.SetTextColor=function(_308){
this.m_TextColor=_308;
};
nitobi.combo.ListColumnDefinition.prototype.GetHTMLSuffix=function(){
return this.m_HTMLSuffix;
};
nitobi.combo.ListColumnDefinition.prototype.SetHTMLSuffix=function(_309){
this.m_HTMLSuffix=_309;
};
nitobi.combo.ListColumnDefinition.prototype.GetHTMLPrefix=function(){
return this.m_HTMLPrefix;
};
nitobi.combo.ListColumnDefinition.prototype.SetHTMLPrefix=function(_30a){
this.m_HTMLPrefix=_30a;
};
nitobi.combo.ListColumnDefinition.prototype.GetCSSClassName=function(){
return this.m_CSSClassName;
};
nitobi.combo.ListColumnDefinition.prototype.SetCSSClassName=function(_30b){
this.m_CSSClassName=_30b;
};
nitobi.combo.ListColumnDefinition.prototype.GetColumnType=function(){
return this.m_ColumnType;
};
nitobi.combo.ListColumnDefinition.prototype.SetColumnType=function(_30c){
this.m_ColumnType=_30c;
};
nitobi.combo.ListColumnDefinition.prototype.GetHeaderLabel=function(){
return this.m_HeaderLabel;
};
nitobi.combo.ListColumnDefinition.prototype.SetHeaderLabel=function(_30d){
this.m_HeaderLabel=_30d;
};
nitobi.combo.ListColumnDefinition.prototype.GetWidth=function(){
return this.m_Width;
};
nitobi.combo.ListColumnDefinition.prototype.SetWidth=function(_30e){
this.m_Width=_30e;
};
nitobi.combo.ListColumnDefinition.prototype.GetDataFieldIndex=function(){
return this.m_DataFieldIndex;
};
nitobi.combo.ListColumnDefinition.prototype.SetDataFieldIndex=function(_30f){
this.m_DataFieldIndex=_30f;
};
nitobi.combo.ListColumnDefinition.prototype.GetImageHandlerURL=function(){
return this.m_ImageHandlerURL;
};
nitobi.combo.ListColumnDefinition.prototype.SetImageHandlerURL=function(_310){
this.m_ImageHandlerURL=_310;
};
nitobi.lang.defineNs("nitobi.combo");
nitobi.combo.TextBox=function(_311,_312,_313){
var _314="";
if(nitobi.browser.IE){
_314="ntb-combobox-text-ie";
}else{
_314="ntb-combobox-text-moz";
}
var _315="100px";
var _316="";
var _317=true;
var _318="";
var _319=0;
var _31a="";
var _31b="";
this.SetCombo(_312);
var oeku=(_311?_311.getAttribute("OnEditKeyUpEvent"):null);
((null==oeku)||(""==oeku))?this.SetOnEditKeyUpEvent(_31b):this.SetOnEditKeyUpEvent(oeku);
var _31d=(_311?_311.getAttribute("Width"):null);
((null==_31d)||(""==_31d))?this.SetWidth(_315):this.SetWidth(_31d);
var _31e=(_311?_311.getAttribute("Height"):null);
((null==_31e)||(""==_31e))?this.SetHeight(_316):this.SetHeight(_31e);
var ccn=(_311?_311.getAttribute("CSSClassName"):null);
((null==ccn)||(""==ccn))?this.SetCSSClassName(_314):this.SetCSSClassName(ccn);
var _320=(_311?_311.getAttribute("Editable"):null);
((null==_320)||(""==_320))?this.SetEditable(_317):this.SetEditable(_320);
var _321=(_311?_311.getAttribute("Value"):null);
((null==_321)||(""==_321))?this.SetValue(_318):this.SetValue(_321);
var _322=_312.GetDataTextField();
if(_322!=null){
this.SetDataFieldIndex(_312.GetList().GetXmlDataSource().GetColumnIndex(_322));
}else{
var dfi=(_311?_311.getAttribute("DataFieldIndex"):null);
((null==dfi)||(""==dfi))?this.SetDataFieldIndex(_319):this.SetDataFieldIndex(dfi);
}
var st=(_311?_311.getAttribute("SearchTerm"):null);
if((null==st)||(""==st)){
this.SetSearchTerm(_31a);
this.SetIndexSearchTerm(_31a);
}else{
this.SetSearchTerm(st);
this.SetIndexSearchTerm(st);
}
this.hasButton=_313;
this.m_userTag=_311;
};
nitobi.combo.TextBox.prototype.Unload=TextBox_Unload;
function TextBox_Unload(){
if(this.m_List){
delete this.m_List;
this.m_List=null;
}
if(this.m_Callback){
delete this.m_Callback;
this.m_Callback=null;
}
_EBAMemScrub(this);
}
nitobi.combo.TextBox.prototype.GetCSSClassName=TextBox_GetCSSClassName;
function TextBox_GetCSSClassName(){
return (null==this.m_HTMLTagObject?this.m_CSSClassName:this.m_HTMLTagObject.className);
}
nitobi.combo.TextBox.prototype.SetCSSClassName=TextBox_SetCSSClassName;
function TextBox_SetCSSClassName(_325){
if(null==this.m_HTMLTagObject){
this.m_CSSClassName=_325;
}else{
this.m_HTMLTagObject.className=_325;
}
}
nitobi.combo.TextBox.prototype.GetHeight=TextBox_GetHeight;
function TextBox_GetHeight(){
return (null==this.m_HTMLTagObject?this.m_Height:nitobi.html.Css.getStyle(this.m_HTMLTagObject,"height"));
}
nitobi.combo.TextBox.prototype.SetHeight=TextBox_SetHeight;
function TextBox_SetHeight(_326){
if(null==this.m_HTMLTagObject){
this.m_Height=_326;
}else{
this.m_HTMLTagObject.style.height=_326;
}
}
nitobi.combo.TextBox.prototype.GetWidth=TextBox_GetWidth;
function TextBox_GetWidth(){
if(null==this.m_HTMLTagObject){
return this.m_Width;
}else{
return nitobi.html.Css.getStyle(this.GetHTMLContainerObject(),"width");
}
}
nitobi.combo.TextBox.prototype.SetWidth=TextBox_SetWidth;
function TextBox_SetWidth(_327){
this.m_Width=_327;
if(null!=this.m_HTMLTagObject){
this.m_HTMLTagObject.style.width=_327;
}
}
nitobi.combo.TextBox.prototype.GetHTMLTagObject=TextBox_GetHTMLTagObject;
function TextBox_GetHTMLTagObject(){
return this.m_HTMLTagObject;
}
nitobi.combo.TextBox.prototype.SetHTMLTagObject=TextBox_SetHTMLTagObject;
function TextBox_SetHTMLTagObject(_328){
this.m_HTMLTagObject=_328;
}
nitobi.combo.TextBox.prototype.GetHTMLContainerObject=function(){
return document.getElementById("EBAComboBoxTextContainer"+this.GetCombo().GetUniqueId());
};
nitobi.combo.TextBox.prototype.GetEditable=TextBox_GetEditable;
function TextBox_GetEditable(){
if(null==this.m_HTMLTagObject){
return this.m_Editable;
}else{
return this.m_HTMLTagObject.getAttribute("readonly");
}
}
nitobi.combo.TextBox.prototype.SetEditable=TextBox_SetEditable;
function TextBox_SetEditable(_329){
if(null==this.m_HTMLTagObject){
this.m_Editable=_329;
}else{
if(_329==true){
this.m_HTMLTagObject.removeAttribute("readonly");
}else{
this.m_HTMLTagObject.setAttribute("readonly","true");
}
}
}
nitobi.combo.TextBox.prototype.GetValue=TextBox_GetValue;
function TextBox_GetValue(){
if(null==this.m_HTMLTagObject){
return this.m_Value;
}else{
return this.m_HTMLTagObject.value;
}
}
nitobi.combo.TextBox.prototype.SetValue=TextBox_SetValue;
function TextBox_SetValue(_32a,_32b){
if(null==this.m_HTMLTagObject){
this.m_Value=_32a;
}else{
if(this.GetCombo().mode=="smartlist"){
this.SmartSetValue(_32a,_32b);
}else{
this.m_HTMLTagObject.value=_32a;
this.m_TextValueTag.value=_32a;
}
}
}
nitobi.combo.TextBox.prototype.SmartSetValue=TextBox_SmartSetValue;
function TextBox_SmartSetValue(_32c,_32d){
var t=this.m_HTMLTagObject;
var _32f=this.GetCombo();
var lio=t.value.lastIndexOf(_32f.SmartListSeparator);
if(lio>-1){
_32c=t.value.substring(0,lio)+_32f.SmartListSeparator+" "+_32c;
}
if(_32d){
_32c+=_32f.SmartListSeparator+" ";
}
t.value=_32c;
this.m_TextValueTag.value=_32c;
}
nitobi.combo.TextBox.prototype.GetDataFieldIndex=TextBox_GetDataFieldIndex;
function TextBox_GetDataFieldIndex(){
return this.m_DataFieldIndex;
}
nitobi.combo.TextBox.prototype.SetDataFieldIndex=TextBox_SetDataFieldIndex;
function TextBox_SetDataFieldIndex(_331){
this.m_DataFieldIndex=parseInt(_331);
}
nitobi.combo.TextBox.prototype.GetCombo=TextBox_GetCombo;
function TextBox_GetCombo(){
return this.m_Combo;
}
nitobi.combo.TextBox.prototype.SetCombo=TextBox_SetCombo;
function TextBox_SetCombo(_332){
this.m_Combo=_332;
}
nitobi.combo.TextBox.prototype.GetSearchTerm=TextBox_GetSearchTerm;
function TextBox_GetSearchTerm(){
return this.m_SearchTerm;
}
nitobi.combo.TextBox.prototype.SetSearchTerm=TextBox_SetSearchTerm;
function TextBox_SetSearchTerm(_333){
this.m_SearchTerm=_333;
}
nitobi.combo.TextBox.prototype.GetIndexSearchTerm=TextBox_GetIndexSearchTerm;
function TextBox_GetIndexSearchTerm(){
return this.m_IndexSearchTerm;
}
nitobi.combo.TextBox.prototype.SetIndexSearchTerm=TextBox_SetIndexSearchTerm;
function TextBox_SetIndexSearchTerm(_334){
this.m_IndexSearchTerm=_334;
}
nitobi.combo.TextBox.prototype.OnChanged=TextBox_OnChanged;
function TextBox_OnChanged(e){
this.m_skipBlur=true;
var _336=this.GetCombo();
var list=_336.GetList();
list.SetActiveRow(null);
var _338=this.GetValue();
this.m_TextValueTag.value=_338;
var _339=this.GetSearchTerm();
if(_336.mode=="smartsearch"||_336.mode=="smartlist"||_336.mode=="filter"||_336.mode=="compact"){
list.GetXmlDataSource().m_Dirty=true;
}
if(_336.mode=="smartlist"){
var lio=_338.lastIndexOf(_336.SmartListSeparator);
if(lio>-1){
_338=_338.substring(lio+_336.SmartListSeparator.length).replace(/^\s+/,"");
}
}
if((_339.indexOf(_338)==0&&_339!=_338)){
list.GetXmlDataSource().m_Dirty=true;
}
this.SetSearchTerm(_338);
if(e!=null){
this.prevKeyCode=e.keyCode;
}
var dfi=this.GetDataFieldIndex();
var This=this;
var _33d=(e!=null?e.keyCode:0);
this.m_CurrentKeyCode=_33d;
this.m_List=list;
this.m_Event=e;
this.m_Callback=_TextboxCallback;
this.m_skipBlur=false;
this.m_List.Search(_338,dfi,this.m_Callback);
}
function _TextboxCallback(_33e,list){
var _340=list.GetCombo();
var tb=_340.GetTextBox();
var e=tb.m_Event;
var _343=tb.m_CurrentKeyCode;
list.SetSelectedRowValues(null);
list.SetSelectedRowIndex(-1);
var _344=tb.GetSearchTerm();
var tb=list.GetCombo().GetTextBox();
var row=null;
if(_33e>-1){
var _346="EBAComboBoxRow"+_340.GetUniqueId()+"_"+_33e;
row=document.getElementById(_346);
if(""!=tb.searchValue&&(null==e||(_343!=46&&_343!=8))&&(null!=e||(tb.prevKeyCode!=46&&tb.prevKeyCode!=8))&&_340.mode!="smartlist"&&_340.mode!="smartsearch"){
tb.TypeAhead(list.GetXmlDataSource().GetRowCol(_33e,tb.GetDataFieldIndex()),tb.GetSearchTerm().length,tb.GetSearchTerm());
list.SetSelectedRow(_33e);
}
list.SetActiveRow(row);
}
if(e!=null&&_33e>-1&&list.InitialSearchOnce!=true){
list.Show();
list.ScrollIntoView(row,true);
}
tb.m_skipBlur=false;
}
nitobi.combo.TextBox.prototype.TypeAhead=TextBox_TypeAhead;
function TextBox_TypeAhead(txt){
var t=this.m_HTMLTagObject;
var x=nitobi.html.getCursor(t);
if(txt.toLowerCase().indexOf(t.value.toLowerCase())!=0){
return;
}
this.SetValue(txt);
nitobi.html.highlight(t,x);
}
nitobi.combo.TextBox.prototype.OnMouseOver=TextBox_OnMouseOver;
function TextBox_OnMouseOver(_34a){
if(this.GetCombo().GetEnabled()){
if(this.GetHeight()!="100%"){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-dynamic","ntb-combobox-text-dynamic-over");
nitobi.html.Css.addClass(this.m_HTMLTagObject,"ntb-combobox-input-dynamic");
}
if(_34a){
var b=this.GetCombo().GetButton();
if(null!=b){
b.OnMouseOver(null,false);
}
}
}
}
nitobi.combo.TextBox.prototype.OnMouseOut=TextBox_OnMouseOut;
function TextBox_OnMouseOut(_34c){
if(this.GetCombo().GetEnabled()){
if(this.GetHeight()!="100%"){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-dynamic-over","ntb-combobox-text-dynamic");
nitobi.html.Css.removeClass(this.m_HTMLTagObject,"ntb-combobox-input-dynamic");
}
if(_34c){
var b=this.GetCombo().GetButton();
if(null!=b){
b.OnMouseOut(null,false);
}
}
}
}
nitobi.combo.TextBox.prototype.ToggleHidden=TextBox_ToggleHidden;
function TextBox_ToggleHidden(){
this.m_ToggleHidden=true;
}
nitobi.combo.TextBox.prototype.ToggleShow=TextBox_ToggleShow;
function TextBox_ToggleShow(){
this.m_ToggleShow=true;
}
nitobi.combo.TextBox.prototype.GetHTMLRenderString=TextBox_GetHTMLRenderString;
function TextBox_GetHTMLRenderString(){
var c=this.GetCombo();
var _34f=c.GetId();
var _350=this.GetValue().replace(/\'/g,"&#39;").replace(/\"/g,"&quot;");
var w=this.GetWidth();
var h=this.GetHeight();
var _353=c.mode=="smartlist";
var html="";
var _355;
_355=(null!=w&&""!=w?"width:"+w+";":"")+(null!=h&&""!=h?"height:"+h+";":"");
html+="<div id=\"EBAComboBoxTextContainer"+this.GetCombo().GetUniqueId()+"\" class=\"ntb-combobox-text-container ntb-combobox-text-dynamic\" style=\""+(this.hasButton?"border-right:0px solid white;":"")+(_353&&nitobi.browser.IE?"width:"+w+";":"")+"\">";
if(_353&&nitobi.browser.IE){
html+="<span style='"+_355+"'>";
_355="width:100%;height:"+h+";overflow-y:auto;";
}
html+="<"+(_353==true?"textarea":"input")+" id=\"EBAComboBoxText"+_34f+"\" name=\"EBAComboBoxText"+_34f+"\" type=\"TEXT\" class='"+this.GetCSSClassName()+"' "+(this.GetEditable().toString().toLowerCase()=="true"?"":"readonly='true'")+" AUTOCOMPLETE='OFF' value='"+_350+"'  "+"style=\""+_355+"\" "+"onblur='var combo=document.getElementById(\""+_34f+"\").object; if(!(combo.m_Over || combo.GetList().m_skipBlur)) document.getElementById(\""+_34f+"\").object.GetTextBox().OnBlur(event)' "+"onkeyup='document.getElementById(\""+_34f+"\").object.GetTextBox().OnKeyOperation(event,0)' "+"onkeypress='document.getElementById(\""+_34f+"\").object.GetTextBox().OnKeyOperation(event,1)' "+"onkeydown='document.getElementById(\""+_34f+"\").object.GetTextBox().OnKeyOperation(event,2)' "+"onmouseover='document.getElementById(\""+_34f+"\").object.GetTextBox().OnMouseOver(true)' "+"onmouseout='document.getElementById(\""+_34f+"\").object.GetTextBox().OnMouseOut(true)' "+"onpaste='window.setTimeout(\"document.getElementById(\\\""+_34f+"\\\").object.GetTextBox().OnChanged()\",0)' "+"oninput='window.setTimeout(\"document.getElementById(\\\""+_34f+"\\\").object.GetTextBox().OnChanged()\",0)' "+"onfocus='document.getElementById(\""+_34f+"\").object.GetTextBox().OnFocus()' "+"tabindex='"+c.GetTabIndex()+"'>"+(_353==true?_350:"")+(_353==true?"</textarea>":"")+"<input id=\"EBAComboBoxTextValue"+_34f+"\" name=\""+_34f+"\" type=\"HIDDEN\" value=\""+_350+"\">";
html+="</div>";
if(_353&&nitobi.browser.IE){
html+="</span>";
}
return html;
}
nitobi.combo.TextBox.prototype.Initialize=TextBox_Initialize;
function TextBox_Initialize(){
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
}
nitobi.combo.TextBox.prototype.Disable=TextBox_Disable;
function TextBox_Disable(){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-container","ntb-combobox-text-container-disabled");
nitobi.html.Css.addClass(this.m_HTMLTagObject,"ntb-combobox-input-disabled");
this.m_HTMLTagObject.disabled=true;
}
nitobi.combo.TextBox.prototype.Enable=TextBox_Enable;
function TextBox_Enable(){
nitobi.html.Css.swapClass(this.GetHTMLContainerObject(),"ntb-combobox-text-container-disabled","ntb-combobox-text-container");
nitobi.html.Css.removeClass(this.m_HTMLTagObject,"ntb-combobox-input-disabled");
this.m_HTMLTagObject.disabled=false;
}
nitobi.combo.TextBox.prototype.OnBlur=TextBox_OnBlur;
function TextBox_OnBlur(e){
var _357=this.GetCombo();
var list=_357.GetList();
if(this.m_skipBlur||_357.m_Over){
return;
}
this.focused=false;
list.Hide();
eval(_357.GetOnBlurEvent());
}
nitobi.combo.TextBox.prototype.OnFocus=TextBox_OnFocus;
function TextBox_OnFocus(){
if(this.m_skipBlur||this.m_skipFocusOnce){
this.m_skipFocusOnce=false;
return;
}
this.focused=true;
var _359;
_359=this.GetCombo().GetList().IsVisible();
if(!_359||this.m_ToggleShow){
this.m_ToggleShow=false;
if(this.m_ToggleHidden){
this.m_ToggleHidden=false;
}else{
eval(this.GetCombo().GetOnFocusEvent());
}
}
}
nitobi.combo.TextBox.prototype.SetOnEditKeyUpEvent=TextBox_SetOnEditKeyUpEvent;
function TextBox_SetOnEditKeyUpEvent(_35a){
this.m_OnEditKeyUpEvent=_35a;
}
nitobi.combo.TextBox.prototype.GetOnEditKeyUpEvent=TextBox_GetOnEditKeyUpEvent;
function TextBox_GetOnEditKeyUpEvent(){
return this.m_OnEditKeyUpEvent;
}
nitobi.combo.TextBox.prototype.OnKeyOperation=TextBox_OnKeyOperation;
function TextBox_OnKeyOperation(e,_35c){
if(this.GetEditable()=="false"){
return;
}
e=e?e:window.event;
var _35d=0;
var _35e=1;
var _35f=2;
var _360=13;
var _361=27;
var _362=9;
var _363=65;
var _364=90;
var _365=48;
var _366=57;
var _367=40;
var _368=38;
var _369=46;
var _36a=8;
var _36b=32;
var _36c=96;
var _36d=105;
var _36e=36;
var _36f=35;
var _370=37;
var _371=39;
var _372=112;
var _373=123;
var _374=16;
var _375=17;
var _376=18;
var _377=33;
var _378=34;
var t=this.m_HTMLTagObject;
var _37a=this.GetCombo();
var list=_37a.GetList();
var _37c=e.keyCode;
_37a.SetEventObject(e);
var dfi=this.GetDataFieldIndex();
switch(_35c){
case (_35d):
if(_360!=_37c&&_361!=_37c&&_362!=_37c&&(_37c<_377||_37c>_367)&&(_37c<_372||_37c>_373)&&(_37c<_374||_37c>_376)){
if(_37a.mode=="smartsearch"||_37a.mode=="smartlist"||_37a.mode=="filter"||_37a.mode=="compact"){
list.GetXmlDataSource().m_Dirty=true;
}
this.OnChanged(e);
eval(this.GetOnEditKeyUpEvent());
}
if(_37c==_368||_37c==_367||_37c==_377||_37c==_378||_37c==_360){
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
if(_37a.mode=="smartlist"&&_37c==_360&&list.GetActiveRow()!=null){
this.SetValue(list.GetSelectedRowValues()[this.GetDataFieldIndex()],true);
list.SetActiveRow(null);
}
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
if(this.lio!=lio){
list.Hide();
}
this.lio=lio;
}
break;
case (_35f):
switch(_37c){
case (_360):
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
list.SetActiveRowAsSelected();
list.Hide();
t.focus();
eval(_37a.GetOnSelectEvent());
nitobi.html.cancelEvent(e);
this.m_skipBlur=false;
break;
case (_362):
list.Hide();
eval(_37a.GetOnTabEvent());
if(this.m_skipBlur||_37a.m_Over){
this.m_skipBlur=false;
_37a.m_Over=false;
}
list.SetActiveRowAsSelected();
eval(_37a.GetOnSelectEvent());
break;
case (_361):
list.Hide();
break;
case (_368):
if(this.Paging==true){
break;
}
var _37f;
_37f=list.IsVisible();
if(_37a.mode=="smartlist"&&!_37f){
this.smartlistWA=true;
break;
}
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
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
case (_367):
if(this.Paging==true){
break;
}
var _37f;
_37f=list.IsVisible();
if(_37a.mode=="smartlist"&&!_37f){
this.smartlistWA=true;
break;
}
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
this.cursor=nitobi.html.getCursor(t);
var r=list.GetActiveRow();
if(null!=r&&list.GetRowIndex(r)==list.GetXmlDataSource().GetNumberRows()-1&&true==list.GetAllowPaging()&&_37a.mode=="default"){
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
case (_377):
if(this.Paging==true){
break;
}
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
this.m_skipBlur=true;
var b=nitobi.Browser;
var lb=list.GetSectionHTMLTagObject(EBAComboBoxListBody);
var _37f;
_37f=list.IsVisible();
if(_37f){
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
case (_378):
if(this.Paging==true){
break;
}
if(_37a.mode=="smartlist"){
var lio=t.value.lastIndexOf(_37a.SmartListSeparator);
if(lio!=this.lio){
list.Hide();
break;
}
}
var _37f;
_37f=list.IsVisible();
if(!_37f){
if(_37a.mode!="smartlist"){
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
if(idx==end&&true==list.GetAllowPaging()&&_37a.mode=="default"){
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
case (_35e):
if(_37c==_360){
nitobi.html.cancelEvent(e);
}
break;
default:
}
_37a.SetEventObject(null);
}
nitobi.prepare=function(){
ebagdl=0;
ebagd1=9999999999999;
s="var d = new Date().getTime();if ((d<"+ebagdl+") || (d>"+ebagd1+")) {alert('Evaluation period has expired.\\n\\nPlease notify your system administrator.\\n\\nPurchase Information:\\n       NITOBI SOFTWARE\\n\\n       www.nitobi.com\\n       sales@nitobi.com         \\n       Telephone: (604) 685-9287\\n       Fax: (604) 648-9090\\n       Toll-Free: 1-866-6EB-APPS\\n                      (1-866-632-2777)');}";
eval(s);
};
nitobi.lang.defineNs("nitobi.browser");
if(nitobi.browser.MOZ||nitobi.browser.SAFARI){
Document.prototype.readyState=0;
Document.prototype.__load__=Document.prototype.load;
Document.prototype.load=_Document_load;
Document.prototype.onreadystatechange=null;
Node.prototype._uniqueID=null;
Node.prototype.__defineGetter__("uniqueID",_Node_getUniqueID);
}
function _Document_load(_385){
changeReadyState(this,1);
try{
this.__load__(_385);
}
catch(e){
changeReadyState(this,4);
}
}
function changeReadyState(oDOM,_387){
oDOM.readyState=_387;
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
function xbClipXml(oXml,_389,_38a,_38b){
var xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\""+_389+"\"><xsl:copy><xsl:copy-of select=\"@*\"></xsl:copy-of><xsl:apply-templates select=\""+_38a+"\"></xsl:apply-templates></xsl:copy></xsl:template><xsl:template match=\""+_38a+"\"><xsl:choose><xsl:when test=\"position()&lt;="+_38b+"\"><xsl:copy-of select=\".\"></xsl:copy-of></xsl:when></xsl:choose></xsl:template></xsl:stylesheet>";
var x=nitobi.xml.createXmlDoc(xsl);
return nitobi.xml.transformToXml(oXml,x);
}
nitobi.Browser.ConvertXmlDataIsland=function(_38e,_38f){
if(null!=_38e&&""!=_38e){
var xmls=document.getElementById(_38e);
if(null!=xmls){
var id=xmls.getAttribute("id");
var src=xmls.getAttribute("src");
var d;
if(null==src){
d=nitobi.xml.createXmlDoc(this.EncodeAngleBracketsInTagAttributes(xmls.innerHTML.replace(/>\s+</g,"><")));
}else{
var _394=nitobi.Browser.LoadPageFromUrl(src,_38f);
var _395=_394.indexOf("<?xml");
if(_395!=-1){
_394=(_394.substr(_395));
}
d=nitobi.xml.createXmlDoc(_394);
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
nitobi.combo.XmlDataSource.prototype.GetXmlId=XmlDataSource_GetXmlId;
function XmlDataSource_GetXmlId(){
return this.m_XmlId;
}
nitobi.combo.XmlDataSource.prototype.SetXmlId=XmlDataSource_SetXmlId;
function XmlDataSource_SetXmlId(_398){
this.m_XmlId=_398;
}
nitobi.combo.XmlDataSource.prototype.GetXmlObject=XmlDataSource_GetXmlObject;
function XmlDataSource_GetXmlObject(){
return this.m_XmlObject;
}
nitobi.combo.XmlDataSource.prototype.SetXmlObject=XmlDataSource_SetXmlObject;
function XmlDataSource_SetXmlObject(_399,clip,_39b){
if(null==_399.documentElement){
return;
}
if(clip==true){
_399=xbClipXml(_399,"root","e",_39b);
}
this.m_XmlObject=_399;
this.SetLastPageSize(this.GetNumberRows());
var _39c=_399.documentElement.getAttribute("fields");
if(null==_39c){
}else{
var _39d=_39c.split("|");
this.SetColumnNames(_39d);
this.SetNumberColumns(_39d.length);
}
}
nitobi.combo.XmlDataSource.prototype.GetNumberRows=XmlDataSource_GetNumberRows;
function XmlDataSource_GetNumberRows(){
return this.GetXmlObject().selectNodes("//e").length;
}
nitobi.combo.XmlDataSource.prototype.GetLastPageSize=XmlDataSource_GetLastPageSize;
function XmlDataSource_GetLastPageSize(){
return this.m_LastPageSize;
}
nitobi.combo.XmlDataSource.prototype.SetLastPageSize=XmlDataSource_SetLastPageSize;
function XmlDataSource_SetLastPageSize(_39e){
this.m_LastPageSize=_39e;
}
nitobi.combo.XmlDataSource.prototype.GetNumberColumns=XmlDataSource_GetNumberColumns;
function XmlDataSource_GetNumberColumns(){
return this.m_NumberColumns;
}
nitobi.combo.XmlDataSource.prototype.SetNumberColumns=XmlDataSource_SetNumberColumns;
function XmlDataSource_SetNumberColumns(_39f){
this.m_NumberColumns=parseInt(_39f);
}
nitobi.combo.XmlDataSource.prototype.GetColumnNames=XmlDataSource_GetColumnNames;
function XmlDataSource_GetColumnNames(){
return this.m_ColumnNames;
}
nitobi.combo.XmlDataSource.prototype.SetColumnNames=XmlDataSource_SetColumnNames;
function XmlDataSource_SetColumnNames(_3a0){
this.m_ColumnNames=_3a0;
}
nitobi.combo.XmlDataSource.prototype.Search=function(_3a1,_3a2,_3a3){
_3a1=_3a1.toLowerCase();
_3a1=nitobi.xml.constructValidXpathQuery(_3a1,true);
var xsl="<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">";
xsl+="<xsl:output method=\"text\" />";
xsl+="<xsl:template match=\"/\"><xsl:apply-templates select=\"//e["+(_3a3==true?"contains":"starts-with")+"(@"+String.fromCharCode(97+parseInt(_3a2))+","+_3a1+")][1]\"/></xsl:template>";
xsl+="<xsl:template match=\"e\">";
xsl+="<xsl:value-of select=\"count(preceding-sibling::e)\" />";
xsl+="</xsl:template>";
xsl+="</xsl:stylesheet>";
var oXSL=nitobi.xml.createXslProcessor(xsl);
var _3a6=nitobi.xml.createXmlDoc(this.GetXmlObject().xml.replace(/>\s+</g,"><").toLowerCase());
var _3a7=nitobi.xml.transformToString(_3a6,oXSL);
if(""==_3a7){
_3a7=-1;
}
return parseInt(_3a7);
};
nitobi.combo.XmlDataSource.prototype.AddPage=XmlDataSource_AddPage;
function XmlDataSource_AddPage(XML){
var tmp=nitobi.xml.createXmlDoc(XML);
var _3aa=tmp.selectNodes("//e");
var root=this.GetXmlObject().documentElement;
this.SetLastPageSize(tmp.selectNodes("//e").length);
for(var i=0;i<_3aa.length;i++){
root.appendChild(_3aa[i].cloneNode(true));
}
this.m_Dirty=false;
}
nitobi.combo.XmlDataSource.prototype.Clear=XmlDataSource_Clear;
function XmlDataSource_Clear(){
nitobi.xml.loadXml(this.GetXmlObject(),"<root/>",true);
}
nitobi.combo.XmlDataSource.prototype.GetRow=XmlDataSource_GetRow;
function XmlDataSource_GetRow(_3ad){
_3ad=parseInt(_3ad);
var row=this.GetXmlObject().documentElement.childNodes.item(_3ad);
var _3af=new Array;
for(var i=0;i<this.GetNumberColumns();i++){
_3af[i]=row.getAttribute(String.fromCharCode(97+i));
}
return _3af;
}
nitobi.combo.XmlDataSource.prototype.GetRowCol=XmlDataSource_GetRowCol;
function XmlDataSource_GetRowCol(Row,Col){
var row=this.GetXmlObject().documentElement.childNodes.item(parseInt(Row));
var val=row.getAttribute(String.fromCharCode(97+parseInt(Col)));
return val;
}
nitobi.combo.XmlDataSource.prototype.GetColumnIndex=XmlDataSource_GetColumnIndex;
function XmlDataSource_GetColumnIndex(Name){
if(Name==null){
return 0;
}
Name=Name.toLowerCase();
var _3b6=this.GetColumnNames();
if(_3b6!=null){
for(var i=0;i<_3b6.length;i++){
if(Name==_3b6[i].toLowerCase()){
return parseInt(i);
}
}
}
return -1;
}


