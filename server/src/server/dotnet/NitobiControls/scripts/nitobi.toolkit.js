/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2008, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
if(typeof (nitobi)=="undefined"){
nitobi=function(){
};
}
if(false){
nitobi.lang=function(){
};
}
if(typeof (nitobi.lang)=="undefined"){
nitobi.lang={};
}
nitobi.lang.defineNs=function(_1){
var _2=_1.split(".");
var _3="";
var _4="";
for(var i=0;i<_2.length;i++){
_3+=_4+_2[i];
_4=".";
if(eval("typeof("+_3+")")=="undefined"){
eval(_3+"={}");
}
}
};
nitobi.lang.extend=function(_6,_7){
function inheritance(){
}
inheritance.prototype=_7.prototype;
_6.prototype=new inheritance();
_6.prototype.constructor=_6;
_6.baseConstructor=_7;
if(_7.base){
_7.prototype.base=_7.base;
}
_6.base=_7.prototype;
};
nitobi.lang.implement=function(_8,_9){
for(var _a in _9.prototype){
if(typeof (_8.prototype[_a])=="undefined"||_8.prototype[_a]==null){
_8.prototype[_a]=_9.prototype[_a];
}
}
};
nitobi.lang.setJsProps=function(p,_c){
for(var i=0;i<_c.length;i++){
var _e=_c[i];
p["set"+_e.n]=this.jSET;
p["get"+_e.n]=this.jGET;
p[_e.n]=_e.d;
}
};
nitobi.lang.setXmlProps=function(p,_10){
for(var i=0;i<_10.length;i++){
var _12=_10[i];
var s,g;
switch(_12.t){
case "i":
s=this.xSET;
g=this.xiGET;
break;
case "b":
s=this.xbSET;
g=this.xbGET;
break;
default:
s=this.xSET;
g=this.xGET;
}
p["set"+_12.n]=s;
p["get"+_12.n]=g;
p["sModel"]+=_12.n+"\""+_12.d+"\" ";
}
};
nitobi.lang.setEvents=function(p,_16){
for(var i=0;i<_16.length;i++){
var n=_16[i];
p["set"+n]=this.eSET;
p["get"+n]=this.eGET;
var nn=n.substring(0,n.length-5);
p["set"+nn]=this.eSET;
p["get"+nn]=this.eGET;
p["o"+n.substring(1)]=new nitobi.base.Event();
}
};
nitobi.lang.isDefined=function(a){
return (typeof (a)!="undefined");
};
nitobi.lang.getBool=function(a){
if(null==a){
return null;
}
if(typeof (a)=="boolean"){
return a;
}
return a.toLowerCase()=="true";
};
nitobi.lang.type={XMLNODE:0,HTMLNODE:1,ARRAY:2,XMLDOC:3};
nitobi.lang.typeOf=function(obj){
var t=typeof (obj);
if(t=="object"){
if(obj.blur&&obj.innerHTML){
return nitobi.lang.type.HTMLNODE;
}
if(obj.nodeName&&obj.nodeName.toLowerCase()==="#document"){
return nitobi.lang.type.XMLDOC;
}
if(obj.nodeName){
return nitobi.lang.type.XMLNODE;
}
if(obj instanceof Array){
return nitobi.lang.type.ARRAY;
}
}
return t;
};
nitobi.lang.toBool=function(_1e,_1f){
if(typeof (_1f)!="undefined"){
if((typeof (_1e)=="undefined")||(_1e=="")||(_1e==null)){
_1e=_1f;
}
}
_1e=_1e.toString()||"";
_1e=_1e.toUpperCase();
if((_1e=="Y")||(_1e=="1")||(_1e=="TRUE")){
return true;
}else{
return false;
}
};
nitobi.lang.boolToStr=function(_20){
if((typeof (_20)=="boolean"&&_20)||(typeof (_20)=="string"&&(_20.toLowerCase()=="true"||_20=="1"))){
return "1";
}else{
return "0";
}
return _20;
};
nitobi.lang.formatNumber=function(_21,_22,_23,_24){
var n=nitobi.form.numberXslProc;
n.addParameter("number",_21,"");
n.addParameter("mask",_22,"");
n.addParameter("group",_23,"");
n.addParameter("decimal",_24,"");
return nitobi.xml.transformToString(nitobi.xml.Empty,nitobi.form.numberXslProc);
};
nitobi.lang.close=function(_26,_27,_28){
if(null==_28){
return function(){
return _27.apply(_26,arguments);
};
}else{
return function(){
return _27.apply(_26,_28);
};
}
};
nitobi.lang.after=function(_29,_2a,_2b,_2c){
var _2d=_29[_2a];
var _2e=_2b[_2c];
if(_2c instanceof Function){
_2e=_2c;
}
_29[_2a]=function(){
_2d.apply(_29,arguments);
_2e.apply(_2b,arguments);
};
_29[_2a].orig=_2d;
};
nitobi.lang.before=function(_2f,_30,_31,_32){
var _33=_2f[_30];
var _34=function(){
};
if(_31!=null){
_34=_31[_32];
}
if(_32 instanceof Function){
_34=_32;
}
_2f[_30]=function(){
_34.apply(_31,arguments);
_33.apply(_2f,arguments);
};
_2f[_30].orig=_33;
};
nitobi.lang.forEach=function(arr,_36){
var len=arr.length;
for(var i=0;i<len;i++){
_36.call(this,arr[i],i);
}
_36=null;
};
nitobi.lang.throwError=function(_39,_3a){
var msg=_39;
if(_3a!=null){
msg+="\n - because "+nitobi.lang.getErrorDescription(_3a);
}
throw msg;
};
nitobi.lang.getErrorDescription=function(_3c){
var _3d=(typeof (_3c.description)=="undefined")?_3c:_3c.description;
return _3d;
};
nitobi.lang.newObject=function(_3e,_3f,_40){
var a=_3f;
if(null==_40){
_40=0;
}
var e="new "+_3e+"(";
var _43="";
for(var i=_40;i<a.length;i++){
e+=_43+"a["+i+"]";
_43=",";
}
e+=")";
return eval(e);
};
nitobi.lang.getLastFunctionArgs=function(_45,_46){
var a=new Array(_45.length-_46);
for(var i=_46;i<_45.length;i++){
a[i-_46]=_45[i];
}
return a;
};
nitobi.lang.getFirstHashKey=function(_49){
for(var x in _49){
return x;
}
};
nitobi.lang.getFirstFunction=function(obj){
for(var x in obj){
if(obj[x]!=null&&typeof (obj[x])=="function"&&typeof (obj[x].prototype)!="undefined"){
return {name:x,value:obj[x]};
}
}
return null;
};
nitobi.lang.copy=function(obj){
var _4e={};
for(var _4f in obj){
_4e[_4f]=obj[_4f];
}
return _4e;
};
nitobi.lang.dispose=function(_50,_51){
try{
if(_51!=null){
var _52=_51.length;
for(var i=0;i<_52;i++){
if(typeof (_51[i].dispose)=="function"){
_51[i].dispose();
}
if(typeof (_51[i])=="function"){
_51[i].call(_50);
}
_51[i]=null;
}
}
for(var _54 in _50){
if(_50[_54]!=null&&_50[_54].dispose instanceof Function){
_50[_54].dispose();
}
_50[_54]=null;
}
}
catch(e){
}
};
nitobi.lang.parseNumber=function(val){
var num=parseInt(val);
return (isNaN(num)?0:num);
};
nitobi.lang.numToAlpha=function(num){
if(typeof (nitobi.lang.numAlphaCache[num])==="string"){
return nitobi.lang.numAlphaCache[num];
}
var ck1=num%26;
var ck2=Math.floor(num/26);
var _5a=(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
nitobi.lang.alphaNumCache[_5a]=num;
nitobi.lang.numAlphaCache[num]=_5a;
return _5a;
};
nitobi.lang.alphaToNum=function(_5b){
if(typeof (nitobi.lang.alphaNumCache[_5b])==="number"){
return nitobi.lang.alphaNumCache[_5b];
}
var j=0;
var num=0;
for(var i=_5b.length-1;i>=0;i--){
num+=(_5b.charCodeAt(i)-96)*Math.pow(26,j++);
}
num=num-1;
nitobi.lang.alphaNumCache[_5b]=num;
nitobi.lang.numAlphaCache[num]=_5b;
return num;
};
nitobi.lang.alphaNumCache={};
nitobi.lang.numAlphaCache={};
nitobi.lang.toArray=function(obj,_60){
return Array.prototype.splice.call(obj,_60||0);
};
nitobi.lang.merge=function(_61,_62){
var r={};
for(var i=0;i<arguments.length;i++){
var a=arguments[i];
for(var x in arguments[i]){
r[x]=a[x];
}
}
return r;
};
nitobi.lang.xor=function(){
var b=false;
for(var j=0;j<arguments.length;j++){
if(arguments[j]&&!b){
b=true;
}else{
if(arguments[j]&&b){
return false;
}
}
}
return b;
};
nitobi.lang.zeros="00000000000000000000000000000000000000000000000000000000000000000000";
nitobi.lang.padZeros=function(num,_6a){
_6a=_6a||2;
num=num+"";
return nitobi.lang.zeros.substr(0,Math.max(_6a-num.length,0))+num;
};
nitobi.lang.noop=function(){
};
nitobi.lang.isStandards=function(){
var s=(document.compatMode=="CSS1Compat");
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
var _6c=document.createElement("div");
_6c.style.cssText="width:0px;width:1";
s=(parseInt(_6c.style.width)!=1);
}
return s;
};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.Math=function(){
};
nitobi.lang.Math.sinTable=Array();
nitobi.lang.Math.cosTable=Array();
nitobi.lang.Math.rotateCoords=function(_6d,_6e,_6f){
var _70=_6f*0.01745329277777778;
if(nitobi.lang.Math.sinTable[_70]==null){
nitobi.lang.Math.sinTable[_70]=Math.sin(_70);
nitobi.lang.Math.cosTable[_70]=Math.cos(_70);
}
var cR=nitobi.lang.Math.cosTable[_70];
var sR=nitobi.lang.Math.sinTable[_70];
var x=_6d*cR-_6e*sR;
var y=_6e*cR+_6d*sR;
return {x:x,y:y};
};
nitobi.lang.Math.returnAngle=function(_75,_76,_77,_78){
return Math.atan2(_78-_76,_77-_75)/0.01745329277777778;
};
nitobi.lang.Math.returnDistance=function(x1,y1,x2,y2){
return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
};
nitobi.lang.defineNs("nitobi");
nitobi.Object=function(){
this.disposal=new Array();
this.modelNodes={};
};
nitobi.Object.prototype.setValues=function(_7d){
for(var _7e in _7d){
if(this[_7e]!=null){
if(this[_7e].subscribe!=null){
}else{
this[_7e]=_7d[_7e];
}
}else{
if(this[_7e] instanceof Function){
this[_7e](_7d[_7e]);
}else{
if(this["set"+_7e] instanceof Function){
this["set"+_7e](_7d[_7e]);
}else{
this[_7e]=_7d[_7e];
}
}
}
}
};
nitobi.Object.prototype.xGET=function(){
var _7f=null,_80="@"+arguments[0],val="";
var _82=this.modelNodes[_80];
if(_82!=null){
_7f=_82;
}else{
_7f=this.modelNodes[_80]=this.modelNode.selectSingleNode(_80);
}
if(_7f!=null){
val=_7f.nodeValue;
}
return val;
};
nitobi.Object.prototype.xSET=function(){
var _83=null,_84="@"+arguments[0];
var _85=this.modelNodes[_84];
if(_85!=null){
_83=_85;
}else{
_83=this.modelNodes[_84]=this.modelNode.selectSingleNode(_84);
}
if(_83==null){
this.modelNode.setAttribute(arguments[0],"");
}
if(arguments[1][0]!=null&&_83!=null){
if(typeof (arguments[1][0])=="boolean"){
_83.nodeValue=nitobi.lang.boolToStr(arguments[1][0]);
}else{
_83.nodeValue=arguments[1][0];
}
}
};
nitobi.Object.prototype.eSET=function(_86,_87){
var _88=_87[0];
var _89=_88;
var _8a=_86.substr(2);
_8a=_8a.substr(0,_8a.length-5);
if(typeof (_88)=="string"){
_89=function(){
return nitobi.event.evaluate(_88,arguments[0]);
};
}
if(this[_86]!=null){
this.unsubscribe(_8a,this[_86]);
}
var _8b=this.subscribe(_8a,_89);
this.jSET(_86,[_8b]);
return _8b;
};
nitobi.Object.prototype.eGET=function(){
};
nitobi.Object.prototype.jSET=function(_8c,val){
this[_8c]=val[0];
};
nitobi.Object.prototype.jGET=function(_8e){
return this[_8e];
};
nitobi.Object.prototype.xsGET=nitobi.Object.prototype.xGET;
nitobi.Object.prototype.xsSET=nitobi.Object.prototype.xSET;
nitobi.Object.prototype.xbGET=function(){
return nitobi.lang.toBool(this.xGET.apply(this,arguments),false);
};
nitobi.Object.prototype.xiGET=function(){
return parseInt(this.xGET.apply(this,arguments));
};
nitobi.Object.prototype.xiSET=nitobi.Object.prototype.xSET;
nitobi.Object.prototype.xdGET=function(){
};
nitobi.Object.prototype.xnGET=function(){
return parseFloat(this.xGET.apply(this,arguments));
};
nitobi.Object.prototype.xbSET=function(){
this.xSET.call(this,arguments[0],[nitobi.lang.boolToStr(arguments[1][0])]);
};
nitobi.Object.prototype.fire=function(evt,_90){
return nitobi.event.notify(evt+this.uid,_90);
};
nitobi.Object.prototype.subscribe=function(evt,_92,_93){
if(this.subscribedEvents==null){
this.subscribedEvents={};
}
if(typeof (_93)=="undefined"){
_93=this;
}
var _94=nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_93,_92));
this.subscribedEvents[_94]=evt+this.uid;
return _94;
};
nitobi.Object.prototype.subscribeOnce=function(evt,_96,_97,_98){
var _99=this;
var _9a=function(){
_96.apply(_97||this,_98||arguments);
_99.unsubscribe(evt,_9b);
};
var _9b=this.subscribe(evt,_9a);
return _9b;
};
nitobi.Object.prototype.unsubscribe=function(evt,_9d){
return nitobi.event.unsubscribe(evt+this.uid,_9d);
};
nitobi.Object.prototype.dispose=function(){
if(this.disposing){
return;
}
this.disposing=true;
var _9e=this.disposal.length;
for(var i=0;i<_9e;i++){
if(disposal[i] instanceof Function){
disposal[i].call(context);
}
disposal[i]=null;
}
for(var _a0 in this){
if(this[_a0].dispose instanceof Function){
this[_a0].dispose.call(this[_a0]);
}
this[_a0]=null;
}
};
if(false){
nitobi.base=function(){
};
}
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uid=1;
nitobi.base.getUid=function(){
return "ntb__"+(nitobi.base.uid++);
};
nitobi.lang.defineNs("nitobi.browser");
if(false){
nitobi.browser=function(){
};
}
nitobi.browser.UNKNOWN=true;
nitobi.browser.IE=false;
nitobi.browser.IE6=false;
nitobi.browser.IE7=false;
nitobi.browser.IE8=false;
nitobi.browser.MOZ=false;
nitobi.browser.FF3=false;
nitobi.browser.SAFARI=false;
nitobi.browser.OPERA=false;
nitobi.browser.AIR=false;
nitobi.browser.CHROME=false;
nitobi.browser.XHR_ENABLED;
nitobi.browser.detect=function(){
var _a1=[{string:navigator.vendor,subString:"Adobe",identity:"AIR"},{string:navigator.vendor,subString:"Google",identity:"Chrome"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"},{string:navigator.vendor,subString:"Camino",identity:"Camino"}];
var _a2="Unknown";
for(var i=0;i<_a1.length;i++){
var _a4=_a1[i].string;
var _a5=_a1[i].prop;
if(_a4){
if(_a4.indexOf(_a1[i].subString)!=-1){
_a2=_a1[i].identity;
break;
}
}else{
if(_a5){
_a2=_a1[i].identity;
break;
}
}
}
nitobi.browser.IE=(_a2=="Explorer");
nitobi.browser.IE6=(nitobi.browser.IE&&!window.XMLHttpRequest);
nitobi.browser.IE7=(nitobi.browser.IE&&window.XMLHttpRequest);
nitobi.browser.MOZ=(_a2=="Netscape"||_a2=="Firefox"||_a2=="Camino");
nitobi.browser.FF3=(_a2=="Firefox"&&parseInt(navigator.userAgent.substr(navigator.userAgent.indexOf("Firefox/")+8,3))==3);
nitobi.browser.SAFARI=(_a2=="Safari");
nitobi.browser.OPERA=(_a2=="Opera");
nitobi.browser.AIR=(_a2=="AIR");
nitobi.browser.CHROME=(_a2=="Chrome");
if(nitobi.browser.SAFARI){
nitobi.browser.OPERA=true;
}
if(nitobi.browser.AIR){
nitobi.browser.SAFARI=true;
}
nitobi.browser.XHR_ENABLED=nitobi.browser.OPERA||nitobi.browser.SAFARI||nitobi.browser.MOZ||nitobi.browser.IE||nitobi.browser.CHROME;
nitobi.browser.UNKNOWN=!(nitobi.browser.IE||nitobi.browser.MOZ||nitobi.browser.SAFARI||nitobi.browser.CHROME);
};
nitobi.browser.detect();
if(nitobi.browser.IE6){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
nitobi.lang.defineNs("nitobi.browser");
nitobi.browser.Cookies=function(){
};
nitobi.lang.extend(nitobi.browser.Cookies,nitobi.Object);
nitobi.browser.Cookies.get=function(id){
var _a7,end;
if(document.cookie.length>0){
_a7=document.cookie.indexOf(id+"=");
if(_a7!=-1){
_a7+=id.length+1;
end=document.cookie.indexOf(";",_a7);
if(end==-1){
end=document.cookie.length;
}
return unescape(document.cookie.substring(_a7,end));
}
}
return null;
};
nitobi.browser.Cookies.set=function(id,_aa,_ab){
var _ac=new Date();
_ac.setTime(_ac.getTime()+(_ab*24*3600*1000));
document.cookie=id+"="+escape(_aa)+((_ab==null)?"":"; expires="+_ac.toGMTString());
};
nitobi.browser.Cookies.remove=function(id){
if(nitobi.browser.Cookies.get(id)){
document.cookie=id+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
};
nitobi.lang.defineNs("nitobi.browser");
nitobi.browser.History=function(){
this.lastPage="";
this.currentPage="";
this.onChange=new nitobi.base.Event();
this.iframeObject=nitobi.html.createElement("iframe",{"name":"ntb_history","id":"ntb_history"},{"display":"none"});
document.body.appendChild(nitobi.xml.importNode(document,this.iframeObject,true));
this.iframe=frames["ntb_history"];
this.monitor();
};
nitobi.browser.History.prototype.add=function(_ae){
this.lastPage=this.currentPage=_ae.substr(_ae.indexOf("#")+1);
this.iframe.location.href=_ae;
};
nitobi.browser.History.prototype.monitor=function(){
var _af=this.iframe.location.href.split("#");
this.currentPage=_af[1];
if(this.currentPage!=this.lastPage){
this.onChange.notify(_af[0].substring(_af[0].lastIndexOf("/")+1),this.currentPage);
this.lastPage=this.currentPage;
}
window.setTimeout(nitobi.lang.close(this,this.monitor),1500);
};
nitobi.lang.defineNs("nitobi.xml");
nitobi.xml=function(){
};
nitobi.xml.nsPrefix="ntb:";
nitobi.xml.nsDecl="xmlns:ntb=\"http://www.nitobi.com\"";
if(nitobi.browser.IE){
var inUse=false;
nitobi.xml.XslTemplate=new ActiveXObject("MSXML2.XSLTemplate.3.0");
}
if(typeof XMLSerializer!="undefined"&&typeof DOMParser!="undefined"){
nitobi.xml.Serializer=new XMLSerializer();
nitobi.xml.DOMParser=new DOMParser();
}
nitobi.xml.getChildNodes=function(_b0){
if(nitobi.browser.IE){
return _b0.childNodes;
}else{
return _b0.selectNodes("./*");
}
};
nitobi.xml.indexOfChildNode=function(_b1,_b2){
var _b3=nitobi.xml.getChildNodes(_b1);
for(var i=0;i<_b3.length;i++){
if(_b3[i]==_b2){
return i;
}
}
return -1;
};
nitobi.xml.createXmlDoc=function(xml){
if(xml!=null){
xml=xml.substring(xml.indexOf("<?xml"));
}
if(xml!=null&&xml.documentElement!=null){
return xml;
}
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("Msxml2.DOMDocument.3.0");
doc.setProperty("SelectionNamespaces","xmlns:ntb='http://www.nitobi.com'");
}else{
if(document.implementation&&document.implementation.createDocument){
doc=document.implementation.createDocument("","",null);
}
}
if(xml!=null&&typeof xml=="string"){
doc=nitobi.xml.loadXml(doc,xml);
}
return doc;
};
nitobi.xml.loadXml=function(doc,xml,_b9){
doc.async=false;
if(nitobi.browser.IE){
doc.loadXML(xml);
}else{
var _ba=nitobi.xml.DOMParser.parseFromString((xml.xml!=null?xml.xml:xml),"text/xml");
if(_b9){
while(doc.hasChildNodes()){
doc.removeChild(doc.firstChild);
}
for(var i=0;i<_ba.childNodes.length;i++){
doc.appendChild(doc.importNode(_ba.childNodes[i],true));
}
}else{
doc=_ba;
}
_ba=null;
}
return doc;
};
nitobi.xml.hasParseError=function(_bc){
if(nitobi.browser.IE){
return (_bc.parseError!=0);
}else{
if(_bc==null||_bc.documentElement==null){
return true;
}
var _bd=_bc.documentElement;
if((_bd.tagName=="parserError")||(_bd.namespaceURI=="http://www.mozilla.org/newlayout/xml/parsererror.xml")){
return true;
}
return false;
}
};
nitobi.xml.getParseErrorReason=function(_be){
if(!nitobi.xml.hasParseError(_be)){
return "";
}
if(nitobi.browser.IE){
return (_be.parseError.reason);
}else{
return (new XMLSerializer().serializeToString(_be));
}
};
nitobi.xml.createXslDoc=function(xsl){
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
}else{
doc=nitobi.xml.createXmlDoc();
}
doc=nitobi.xml.loadXml(doc,xsl||"<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:ntb=\"http://www.nitobi.com\" />");
return doc;
};
nitobi.xml.createXslProcessor=function(xsl){
var _c2=null;
var xt=null;
if(typeof (xsl)!="string"){
xsl=nitobi.xml.serialize(xsl);
}
if(nitobi.browser.IE){
_c2=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
xt=new ActiveXObject("MSXML2.XSLTemplate.3.0");
_c2.async=false;
_c2.loadXML(xsl);
xt.stylesheet=_c2;
return xt.createProcessor();
}else{
if(XSLTProcessor){
_c2=nitobi.xml.createXmlDoc(xsl);
xt=new XSLTProcessor();
xt.importStylesheet(_c2);
xt.stylesheet=_c2;
return xt;
}
}
};
nitobi.xml.parseHtml=function(_c4){
if(typeof (_c4)=="string"){
_c4=document.getElementById(_c4);
}
var _c5=nitobi.html.getOuterHtml(_c4);
var _c6="";
if(nitobi.browser.IE){
var _c7=new RegExp("(\\s+.[^=]*)='(.*?)'","g");
_c5=_c5.replace(_c7,function(m,_1,_2){
return _1+"=\""+_2.replace(/"/g,"&quot;")+"\"";
});
_c6=(_c5.substring(_c5.indexOf("/>")+2).replace(/(\s+.[^\=]*)\=\s*([^\"^\s^\>]+)/g,"$1=\"$2\" ")).replace(/\n/gi,"").replace(/(.*?:.*?\s)/i,"$1  ");
var _cb=new RegExp("=\"([^\"]*)(<)(.*?)\"","gi");
var _cc=new RegExp("=\"([^\"]*)(>)(.*?)\"","gi");
while(true){
_c6=_c6.replace(_cb,"=\"$1&lt;$3\" ");
_c6=_c6.replace(_cc,"=\"$1&gt;$3\" ");
var x=(_cb.test(_c6));
if(!_cb.test(_c6)){
break;
}
}
}else{
_c6=_c5;
_c6=_c6.replace(/\n/gi,"").replace(/\>\s*\</gi,"><").replace(/(.*?:.*?\s)/i,"$1  ");
_c6=_c6.replace(/\&/g,"&amp;");
_c6=_c6.replace(/\&amp;gt;/g,"&gt;").replace(/\&amp;lt;/g,"&lt;").replace(/\&amp;apos;/g,"&apos;").replace(/\&amp;quot;/g,"&quot;").replace(/\&amp;amp;/g,"&amp;").replace(/\&amp;eq;/g,"&eq;");
}
if(_c6.indexOf("xmlns:ntb=\"http://www.nitobi.com\"")<1){
_c6=_c6.replace(/\<(.*?)(\s|\>|\\)/,"<$1 xmlns:ntb=\"http://www.nitobi.com\"$2");
}
_c6=_c6.replace(/\&nbsp\;/gi," ");
return nitobi.xml.createXmlDoc(_c6);
};
nitobi.xml.transform=function(xml,xsl,_d0){
if(xsl.documentElement){
xsl=nitobi.xml.createXslProcessor(xsl);
}
if(nitobi.browser.IE){
xsl.input=xml;
xsl.transform();
return xsl.output;
}else{
if(XSLTProcessor){
var doc=xsl.transformToDocument(xml);
var _d2=doc.documentlement;
if(_d2&&_d2.nodeName.indexOf("ntb:")==0){
_d2.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:ntb","http://www.nitobi.com");
}
return doc;
}
}
};
nitobi.xml.transformToString=function(xml,xsl,_d5){
var _d6=nitobi.xml.transform(xml,xsl,"text");
if(nitobi.browser.MOZ){
if(_d5=="xml"){
_d6=nitobi.xml.Serializer.serializeToString(_d6);
}else{
if(_d6.documentElement.childNodes[0]==null){
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
if(_d6.documentElement.childNodes[0].data!=null){
_d6=_d6.documentElement.childNodes[0].data;
}else{
if(_d6.documentElement.childNodes[0].textContent!=null){
_d6=_d6.documentElement.childNodes[0].textContent;
}else{
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
}
}
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
if(_d5=="xml"){
_d6=nitobi.xml.Serializer.serializeToString(_d6);
}else{
var _d7=_d6.documentElement;
if(_d7.nodeName!="transformiix:result"){
_d7=_d7.getElementsByTagName("pre")[0];
}
try{
_d6=_d7.childNodes[0].data;
}
catch(e){
_d6=(_d7.data);
}
}
}
}
return _d6;
};
nitobi.xml.transformToXml=function(xml,xsl){
var _da=nitobi.xml.transform(xml,xsl,"xml");
if(typeof _da=="string"){
_da=nitobi.xml.createXmlDoc(_da);
}else{
if(_da.documentElement.nodeName=="transformiix:result"){
_da=nitobi.xml.createXmlDoc(_da.documentElement.firstChild.data);
}
}
return _da;
};
nitobi.xml.serialize=function(xml){
if(nitobi.browser.IE){
return xml.xml;
}else{
return (new XMLSerializer()).serializeToString(xml);
}
};
nitobi.xml.createXmlHttp=function(){
if(nitobi.browser.IE){
var _dc=null;
try{
_dc=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_dc=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _dc;
}else{
return new XMLHttpRequest();
}
};
nitobi.xml.createElement=function(_dd,_de,ns){
ns=ns||"http://www.nitobi.com";
var _e0=null;
if(nitobi.browser.IE){
_e0=_dd.createNode(1,nitobi.xml.nsPrefix+_de,ns);
}else{
if(_dd.createElementNS){
_e0=_dd.createElementNS(ns,nitobi.xml.nsPrefix+_de);
}
}
return _e0;
};
function nitobiXmlDecodeXslt(xsl){
return xsl.replace(/x:c-/g,"xsl:choose").replace(/x\:wh\-/g,"xsl:when").replace(/x\:o\-/g,"xsl:otherwise").replace(/x\:n\-/g," name=\"").replace(/x\:s\-/g," select=\"").replace(/x\:va\-/g,"xsl:variable").replace(/x\:v\-/g,"xsl:value-of").replace(/x\:ct\-/g,"xsl:call-template").replace(/x\:w\-/g,"xsl:with-param").replace(/x\:p\-/g,"xsl:param").replace(/x\:t\-/g,"xsl:template").replace(/x\:at\-/g,"xsl:apply-templates").replace(/x\:a\-/g,"xsl:attribute");
}
if(!nitobi.browser.IE){
Document.prototype.loadXML=function(_e2){
changeReadyState(this,1);
var p=new DOMParser();
var d=p.parseFromString(_e2,"text/xml");
while(this.hasChildNodes()){
this.removeChild(this.lastChild);
}
for(var i=0;i<d.childNodes.length;i++){
this.appendChild(this.importNode(d.childNodes[i],true));
}
changeReadyState(this,4);
};
Document.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
Node.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
XPathResult.prototype.__defineGetter__("length",function(){
return this.snapshotLength;
});
if(XSLTProcessor){
XSLTProcessor.prototype.addParameter=function(_e6,_e7,_e8){
if(_e7==null){
this.removeParameter(_e8,_e6);
}else{
this.setParameter(_e8,_e6,_e7);
}
};
}
XMLDocument.prototype.selectNodes=function(_e9,_ea){
try{
if(this.nsResolver==null){
this.nsResolver=this.createNSResolver(this.documentElement);
}
var _eb=this.evaluate(_e9,(_ea?_ea:this),new MyNSResolver(),XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var _ec=new Array(_eb.snapshotLength);
_ec.expr=_e9;
var j=0;
for(i=0;i<_eb.snapshotLength;i++){
var _ee=_eb.snapshotItem(i);
if(_ee.nodeType!=3){
_ec[j++]=_ee;
}
}
return _ec;
}
catch(e){
}
};
Document.prototype.selectNodes=XMLDocument.prototype.selectNodes;
function MyNSResolver(){
}
MyNSResolver.prototype.lookupNamespaceURI=function(_ef){
switch(_ef){
case "xsl":
return "http://www.w3.org/1999/XSL/Transform";
break;
case "ntb":
return "http://www.nitobi.com";
break;
case "d":
return "http://exslt.org/dates-and-times";
break;
case "n":
return "http://www.nitobi.com/exslt/numbers";
break;
default:
return null;
break;
}
};
XMLDocument.prototype.selectSingleNode=function(_f0,_f1){
var _f2=_f0.match(/\[\d+\]/ig);
if(_f2!=null){
var x=_f2[_f2.length-1];
if(_f0.lastIndexOf(x)+x.length!=_f0.length){
_f0+="[1]";
}
}
var _f4=this.selectNodes(_f0,_f1||null);
return ((_f4!=null&&_f4.length>0)?_f4[0]:null);
};
Document.prototype.selectSingleNode=XMLDocument.prototype.selectSingleNode;
Element.prototype.selectNodes=function(_f5){
var doc=this.ownerDocument;
return doc.selectNodes(_f5,this);
};
Element.prototype.selectSingleNode=function(_f7){
var doc=this.ownerDocument;
return doc.selectSingleNode(_f7,this);
};
}
nitobi.xml.getLocalName=function(_f9){
var _fa=_f9.indexOf(":");
if(_fa==-1){
return _f9;
}else{
return _f9.substr(_fa+1);
}
};
nitobi.xml.importNode=function(doc,_fc,_fd){
if(_fd==null){
_fd=true;
}
return (doc.importNode?doc.importNode(_fc,_fd):_fc);
};
nitobi.xml.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"&#xa;");
return str;
};
nitobi.xml.constructValidXpathQuery=function(_ff,_100){
var _101=_ff.match(/(\"|\')/g);
if(_101!=null){
var _102="concat(";
var _103="";
var _104;
for(var i=0;i<_ff.length;i++){
if(_ff.substr(i,1)=="\""){
_104="&apos;";
}else{
_104="&quot;";
}
_102+=_103+_104+nitobi.xml.encode(_ff.substr(i,1))+_104;
_103=",";
}
_102+=_103+"&apos;&apos;";
_102+=")";
_ff=_102;
}else{
var quot=(_100?"'":"");
_ff=quot+nitobi.xml.encode(_ff)+quot;
}
return _ff;
};
nitobi.xml.removeChildren=function(_107){
while(_107.firstChild){
_107.removeChild(_107.firstChild);
}
};
nitobi.xml.Empty=nitobi.xml.createXmlDoc("<root></root>");
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Url=function(){
};
nitobi.html.Url.setParameter=function(url,key,_10a){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
if(url.match(reg)){
return url.replace(reg,"$1$2="+encodeURIComponent(_10a)+"$4");
}
if(url.match(/\?/)){
url=url+"&";
}else{
url=url+"?";
}
return url+encodeURIComponent(key)+"="+encodeURIComponent(_10a);
};
nitobi.html.Url.removeParameter=function(url,key){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
return url.replace(reg,function(str,p1,p2,p3,p4,_114,s){
if(((p1)=="?")&&(p4!="&")){
return "";
}else{
return p1;
}
});
};
nitobi.html.Url.normalize=function(url,file){
if(file){
if(file.indexOf("http://")==0||file.indexOf("https://")==0||file.indexOf("/")==0){
return file;
}
}
var href=(url.match(/.*\//)||"")+"";
if(file){
return href+file;
}
return href;
};
nitobi.html.Url.randomize=function(url){
return nitobi.html.Url.setParameter(url,"ntb-random",(new Date).getTime());
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Event=function(type){
this.type=type;
this.handlers={};
this.guid=0;
this.setEnabled(true);
};
nitobi.base.Event.prototype.subscribe=function(_11b,_11c,guid){
if(_11b==null){
return;
}
var func=_11b;
if(typeof (_11b)=="string"){
var s=_11b;
s=s.replace(/\#\&lt\;\#/g,"<").replace(/\#\&gt\;\#/g,">").replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\/\*EQ\*\//g,"=").replace(/\#\Q\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
s=s.replace(/eventArgs/g,"arguments[0]");
_11b=nitobi.lang.close(_11c,function(){
eval(s);
});
}
if(typeof _11c=="object"&&_11b instanceof Function){
func=nitobi.lang.close(_11c,_11b);
}
guid=guid||func.observer_guid||_11b.observer_guid||this.guid++;
func.observer_guid=guid;
_11b.observer_guid=guid;
this.handlers[guid]=func;
return guid;
};
nitobi.base.Event.prototype.subscribeOnce=function(_120,_121){
var guid=null;
var _123=this;
var _124=function(){
_120.apply(_121||null,arguments);
_123.unSubscribe(guid);
};
guid=this.subscribe(_124);
return guid;
};
nitobi.base.Event.prototype.unSubscribe=function(guid){
if(guid instanceof Function){
guid=guid.observer_guid;
}
this.handlers[guid]=null;
delete this.handlers[guid];
};
nitobi.base.Event.prototype.notify=function(_126){
if(this.enabled){
if(arguments.length==0){
arguments=new Array();
arguments[0]=new nitobi.base.EventArgs(null,this);
arguments[0].event=this;
arguments[0].source=null;
}else{
if(typeof (arguments[0].event)!="undefined"&&arguments[0].event==null){
arguments[0].event=this;
}
}
var fail=false;
for(var item in this.handlers){
var _129=this.handlers[item];
if(_129 instanceof Function){
var rv=(_129.apply(this,arguments)==false);
fail=fail||rv;
}
}
return !fail;
}
return true;
};
nitobi.base.Event.prototype.dispose=function(){
for(var _12b in this.handlers){
this.handlers[_12b]=null;
}
this.handlers={};
};
nitobi.base.Event.prototype.setEnabled=function(_12c){
this.enabled=_12c;
};
nitobi.base.Event.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Css=function(){
};
nitobi.html.Css.onPrecached=new nitobi.base.Event();
nitobi.html.Css.swapClass=function(_12d,_12e,_12f){
if(_12d.className){
var reg=new RegExp("(\\s|^)"+_12e+"(\\s|$)");
_12d.className=_12d.className.replace(reg,"$1"+_12f+"$2");
}
};
nitobi.html.Css.replaceOrAppend=function(_131,_132,_133){
if(nitobi.html.Css.hasClass(_131,_132)){
nitobi.html.Css.swapClass(_131,_132,_133);
}else{
nitobi.html.Css.addClass(_131,_133);
}
};
nitobi.html.Css.hasClass=function(_134,_135){
if(!_135||_135===""){
return false;
}
return (new RegExp("(\\s|^)"+_135+"(\\s|$)")).test(_134.className);
};
nitobi.html.Css.addClass=function(_136,_137,_138){
if(_138==true||!nitobi.html.Css.hasClass(_136,_137)){
_136.className=_136.className?_136.className+" "+_137:_137;
}
};
nitobi.html.Css.removeClass=function(_139,_13a,_13b){
if(typeof _13a=="array"){
for(var i=0;i<_13a.length;i++){
this.removeClass(_139,_13a[i],_13b);
}
}
if(_13b==true||nitobi.html.Css.hasClass(_139,_13a)){
var reg=new RegExp("(\\s|^)"+_13a+"(\\s|$)");
_139.className=_139.className.replace(reg,"$2");
}
};
nitobi.html.Css.addRule=function(_13e,_13f,_140){
if(_13e.cssRules){
var _141=_13e.insertRule(_13f+"{"+(_140||"")+"}",_13e.cssRules.length);
return _13e.cssRules[_141];
}else{
_13e.addRule(_13f,_140||"nitobi:placeholder;");
return _13e.rules[_13e.rules.length-1];
}
};
nitobi.html.Css.getRules=function(_142){
var _143=null;
if(typeof (_142)=="number"){
_143=document.styleSheets[_142];
}else{
_143=_142;
}
if(_143==null){
return null;
}
try{
if(_143.cssRules){
return _143.cssRules;
}
if(_143.rules){
return _143.rules;
}
}
catch(e){
}
return null;
};
nitobi.html.Css.getStyleSheetsByName=function(_144){
var arr=new Array();
var ss=document.styleSheets;
var _147=new RegExp(_144.replace(".",".")+"($|\\?)");
for(var i=0;i<ss.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_147,ss[i],arr);
}
return arr;
};
nitobi.html.Css._getStyleSheetsByName=function(_149,_14a,arr){
if(_149.test(_14a.href)){
arr=arr.concat([_14a]);
}
var _14c=nitobi.html.Css.getRules(_14a);
if(_14a.href!=""&&_14a.imports){
for(var i=0;i<_14a.imports.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_149,_14a.imports[i],arr);
}
}else{
for(var i=0;i<_14c.length;i++){
var s=_14c[i].styleSheet;
if(s){
arr=nitobi.html.Css._getStyleSheetsByName(_149,s,arr);
}
}
}
return arr;
};
nitobi.html.Css.imageCache={};
nitobi.html.Css.imageCacheDidNotify=false;
nitobi.html.Css.trackPrecache=function(_14f){
nitobi.html.Css.precacheArray[_14f]=true;
var _150=false;
for(var i in nitobi.html.Css.precacheArray){
if(!nitobi.html.Css.precacheArray[i]){
_150=true;
}
}
if((!nitobi.html.Css.imageCacheDidNotify)&&(!_150)){
nitobi.html.Css.imageCacheDidNotify=true;
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.onPrecached.notify();
}
};
nitobi.html.Css.precacheArray={};
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.precacheImages=function(_152){
nitobi.html.Css.isPrecaching=true;
if(!_152){
var ss=document.styleSheets;
for(var i=0;i<ss.length;i++){
nitobi.html.Css.precacheImages(ss[i]);
}
return;
}
var _155=/.*?url\((.*?)\).*?/;
var _156=nitobi.html.Css.getRules(_152);
var url=nitobi.html.Css.getPath(_152);
for(var i=0;i<_156.length;i++){
var rule=_156[i];
if(rule.styleSheet){
nitobi.html.Css.precacheImages(rule.styleSheet);
}else{
var s=rule.style;
var _15a=s?s.backgroundImage:null;
if(_15a){
_15a=_15a.replace(_155,"$1");
_15a=nitobi.html.Url.normalize(url,_15a);
if(!nitobi.html.Css.imageCache[_15a]){
var _15b=new Image();
_15b.src=_15a;
nitobi.html.Css.precacheArray[_15a]=false;
var _15c=nitobi.lang.close({},nitobi.html.Css.trackPrecache,[_15a]);
_15b.onload=_15c;
_15b.onerror=_15c;
_15b.onabort=_15c;
nitobi.html.Css.imageCache[_15a]=_15b;
try{
if(_15b.width>0){
nitobi.html.Css.precacheArray[_15a]=true;
}
}
catch(e){
}
}
}
}
}
if(_152.href!=""&&_152.imports){
for(var i=0;i<_152.imports.length;i++){
nitobi.html.Css.precacheImages(_152.imports[i]);
}
}
};
nitobi.html.Css.getPath=function(_15d){
var href=_15d.href;
href=nitobi.html.Url.normalize(href);
if(_15d.parentStyleSheet&&href.indexOf("/")!=0&&href.indexOf("http://")!=0&&href.indexOf("https://")!=0){
href=nitobi.html.Css.getPath(_15d.parentStyleSheet)+href;
}
return href;
};
nitobi.html.Css.getSheetUrl=nitobi.html.Css.getPath;
nitobi.html.Css.findParentStylesheet=function(_15f){
var rule=nitobi.html.Css.getRule(_15f);
if(rule){
return rule.parentStyleSheet;
}
return null;
};
nitobi.html.Css.findInSheet=function(_161,_162,_163){
if(nitobi.browser.IE6&&typeof _163=="undefined"){
_163=0;
}else{
if(_163>4){
return null;
}
}
_163++;
var _164=nitobi.html.Css.getRules(_162);
for(var rule=0;rule<_164.length;rule++){
var _166=_164[rule];
var ss=_166.styleSheet;
var _168=_166.selectorText;
if(ss){
var _169=nitobi.html.Css.findInSheet(_161,ss,_163);
if(_169){
return _169;
}
}else{
if(_168!=null){
var _16a=_168.split(",");
for(var _16b=0;_16b<_16a.length;_16b++){
if(_16a[_16b].toLowerCase().replace(/^\s+|\s+$/g,"").substring(0,_161.length)==_161){
if(nitobi.browser.IE){
_166={selectorText:_168,style:_166.style,readOnly:_166.readOnly,parentStyleSheet:_162};
}
return _166;
}
}
}
}
}
var _16c=_162.imports;
if(_162.href!=""&&_16c){
var _16d=_16c.length;
for(var i=0;i<_16d;i++){
var _169=nitobi.html.Css.findInSheet(_161,_16c[i],_163);
if(_169){
return _169;
}
}
}
return null;
};
nitobi.html.Css.getClass=function(_16f,_170){
_16f=_16f.toLowerCase();
if(_16f.indexOf(".")!==0){
_16f="."+_16f;
}
if(_170){
var rule=nitobi.html.Css.getRule(_16f);
if(rule!=null){
return rule.style;
}
}else{
if(nitobi.html.Css.classCache[_16f]==null){
var rule=nitobi.html.Css.getRule(_16f);
if(rule!=null){
nitobi.html.Css.classCache[_16f]=rule.style;
}else{
return null;
}
}
return nitobi.html.Css.classCache[_16f];
}
};
nitobi.html.Css.classCache={};
nitobi.html.Css.getStyleBySelector=function(_172){
var rule=nitobi.html.Css.getRule(_172);
if(rule!=null){
return rule.style;
}
return null;
};
nitobi.html.Css.getRule=function(_174){
_174=_174.toLowerCase();
if(_174.indexOf(".")!==0){
_174="."+_174;
}
var _175=document.styleSheets;
for(var ss=0;ss<_175.length;ss++){
try{
var _177=nitobi.html.Css.findInSheet(_174,_175[ss]);
if(_177){
return _177;
}
}
catch(err){
}
}
return null;
};
nitobi.html.Css.getClassStyle=function(_178,_179){
var _17a=nitobi.html.Css.getClass(_178);
if(_17a!=null){
return _17a[_179];
}else{
return null;
}
};
nitobi.html.Css.setStyle=function(el,rule,_17d){
rule=rule.replace(/\-(\w)/g,function(_17e,p1){
return p1.toUpperCase();
});
el.style[rule]=_17d;
};
nitobi.html.Css.getStyle=function(oElm,_181){
var _182="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_181=_181.replace(/([A-Z])/g,function($1){
return "-"+$1.toLowerCase();
});
strStyle=document.defaultView.getComputedStyle(oElm,null);
_182=strStyle.getPropertyValue(_181);
}else{
if(oElm.currentStyle){
_181=_181.replace(/\-(\w)/g,function(_184,p1){
return p1.toUpperCase();
});
_182=oElm.currentStyle[_181];
}
}
return _182;
};
nitobi.html.Css.setOpacities=function(_186,_187){
if(_186.length){
for(var i=0;i<_186.length;i++){
nitobi.html.Css.setOpacity(_186[i],_187);
}
}else{
nitobi.html.Css.setOpacity(_186,_187);
}
};
nitobi.html.Css.setOpacity=function(_189,_18a){
var s=_189.style;
if(_18a>100){
_18a=100;
}
if(_18a<0){
_18a=0;
}
if(s.filter!=null){
var _18c=s.filter.match(/alpha\(opacity=[\d\.]*?\)/ig);
if(_18c!=null&&_18c.length>0){
s.filter=s.filter.replace(/alpha\(opacity=[\d\.]*?\)/ig,"alpha(opacity="+_18a+")");
}else{
s.filter+="alpha(opacity="+_18a+")";
}
}else{
s.opacity=(_18a/100);
}
};
nitobi.html.Css.getOpacity=function(_18d){
if(_18d==null){
nitobi.lang.throwError(nitobi.error.ArgExpected+" for nitobi.html.Css.getOpacity");
}
if(nitobi.browser.IE){
if(_18d.style.filter==""){
return 100;
}
var s=_18d.style.filter;
s.match(/opacity=([\d\.]*?)\)/ig);
if(RegExp.$1==""){
return 100;
}
return parseInt(RegExp.$1);
}else{
return Math.abs(_18d.style.opacity?_18d.style.opacity*100:100);
}
};
nitobi.html.Css.getCustomStyle=function(_18f,_190){
if(nitobi.browser.IE){
return nitobi.html.getClassStyle(_18f,_190);
}else{
var rule=nitobi.html.Css.getRule(_18f);
var re=new RegExp("(.*?)({)(.*?)(})","gi");
var _193=rule.cssText.match(re);
re=new RegExp("("+_190+")(:)(.*?)(;)","gi");
_193=re.exec(RegExp.$3);
}
};
nitobi.html.Css.createStyleSheet=function(_194){
var ss;
if(nitobi.browser.IE){
ss=document.createStyleSheet();
}else{
ss=document.createElement("style");
ss.setAttribute("type","text/css");
document.body.appendChild(ss);
ss.appendChild(document.createTextNode(""));
}
if(_194!=null){
nitobi.html.Css.setStyleSheetValue(ss,_194);
}
return ss;
};
nitobi.html.Css.setStyleSheetValue=function(ss,_197){
if(nitobi.browser.IE){
ss.cssText=_197;
}else{
ss.replaceChild(document.createTextNode(_197),ss.firstChild);
}
return ss;
};
if(nitobi.browser.MOZ){
HTMLStyleElement.prototype.__defineSetter__("cssText",function(_198){
this.innerHTML=_198;
});
HTMLStyleElement.prototype.__defineGetter__("cssText",function(){
return this.innerHTML;
});
}
nitobi.lang.defineNs("nitobi.drawing");
if(false){
nitobi.drawing=function(){
};
}
nitobi.drawing.Point=function(x,y){
this.x=x;
this.y=y;
};
nitobi.drawing.Point.prototype.toString=function(){
return "("+this.x+","+this.y+")";
};
nitobi.drawing.rgb=function(r,g,b){
return "#"+((r*65536)+(g*256)+b).toString(16);
};
nitobi.drawing.align=function(_19e,_19f,_1a0,oh,ow,oy,ox){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_1a0;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(_19f.getBoundingClientRect){
td=_19f.getBoundingClientRect();
sd=_19e.getBoundingClientRect();
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
}else{
if(document.getBoxObjectFor){
td=document.getBoxObjectFor(_19f);
sd=document.getBoxObjectFor(_19e);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}else{
td=nitobi.html.getCoords(_19f);
sd=nitobi.html.getCoords(_19e);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}
}
var s=_19e.style;
if(a&268435456){
s.height=(th+oh)+"px";
}
if(a&16777216){
s.width=(tw+ow)+"px";
}
if(a&1048576){
s.top=(nitobi.html.getStyleTop(_19e)+tt-st+oy)+"px";
}
if(a&65536){
s.top=(nitobi.html.getStyleTop(_19e)+tt-st+th-sh+oy)+"px";
}
if(a&4096){
s.left=(nitobi.html.getStyleLeft(_19e)-sl+tl+ox)+"px";
}
if(a&256){
s.left=(nitobi.html.getStyleLeft(_19e)-sl+tl+tw-sw+ox)+"px";
}
if(a&16){
s.top=(nitobi.html.getStyleTop(_19e)+tt-st+oy+Math.floor((th-sh)/2))+"px";
}
if(a&1){
s.left=(nitobi.html.getStyleLeft(_19e)-sl+tl+ox+Math.floor((tw-sw)/2))+"px";
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
nitobi.drawing.alignOuterBox=function(_1b5,_1b6,_1b7,oh,ow,oy,ox,show){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
if(nitobi.browser.moz){
td=document.getBoxObjectFor(_1b6);
sd=document.getBoxObjectFor(_1b5);
var _1bd=parseInt(document.defaultView.getComputedStyle(_1b6,"").getPropertyValue("border-left-width"));
var _1be=parseInt(document.defaultView.getComputedStyle(_1b6,"").getPropertyValue("border-top-width"));
var _1bf=parseInt(document.defaultView.getComputedStyle(_1b5,"").getPropertyValue("border-top-width"));
var _1c0=parseInt(document.defaultView.getComputedStyle(_1b5,"").getPropertyValue("border-bottom-width"));
var _1c1=parseInt(document.defaultView.getComputedStyle(_1b5,"").getPropertyValue("border-left-width"));
var _1c2=parseInt(document.defaultView.getComputedStyle(_1b5,"").getPropertyValue("border-right-width"));
oy=oy+_1bf-_1be;
ox=ox+_1c1-_1bd;
}
nitobi.drawing.align(_1b5,_1b6,_1b7,oh,ow,oy,ox,show);
};
nitobi.lang.defineNs("nitobi.html");
if(false){
nitobi.html=function(){
};
}
nitobi.html.createElement=function(_1c3,_1c4,_1c5){
var elem=document.createElement(_1c3);
for(var attr in _1c4){
if(attr.toLowerCase().substring(0,5)=="class"){
elem.className=_1c4[attr];
}else{
elem.setAttribute(attr,_1c4[attr]);
}
}
for(var _1c8 in _1c5){
elem.style[_1c8]=_1c5[_1c8];
}
return elem;
};
nitobi.html.createTable=function(_1c9,_1ca){
var _1cb=nitobi.html.createElement("table",_1c9,_1ca);
var _1cc=document.createElement("tbody");
var _1cd=document.createElement("tr");
var _1ce=document.createElement("td");
_1cb.appendChild(_1cc);
_1cc.appendChild(_1cd);
_1cd.appendChild(_1ce);
return _1cb;
};
nitobi.html.setBgImage=function(elem,src){
var s=nitobi.html.Css.getStyle(elem,"background-image");
if(s!=""&&nitobi.browser.IE){
s=s.replace(/(^url\(")(.*?)("\))/,"$2");
}
};
nitobi.html.fitWidth=function(_1d2,_1d3){
var w;
var C=nitobi.html.Css;
if(nitobi.browser.IE&&!nitobi.lang.isStandards()){
var _1d6=(parseInt(C.getStyle(_1d2,"width"))-parseInt(C.getStyle(_1d2,"paddingLeft"))-parseInt(C.getStyle(_1d2,"paddingRight"))-parseInt(C.getStyle(_1d2,"borderLeftWidth"))-parseInt(C.getStyle(_1d2,"borderRightWidth")));
if(_1d6<0){
_1d6=0;
}
w=_1d6+"px";
}else{
if(nitobi.lang.isStandards()){
if(nitobi.browser.IE){
var _1d6=(parseInt(_1d2.clientWidth))-(_1d3.offsetWidth-_1d3.clientWidth);
}else{
var _1d6=(parseInt(_1d2.style.width)-(_1d3.offsetWidth-parseInt(_1d2.style.width)));
}
if(_1d6<0){
_1d6=0;
}
w=_1d6+"px";
}else{
w=parseInt(_1d2.style.width)+"px";
}
}
_1d3.style.width=w;
};
nitobi.html.getDomNodeByPath=function(Node,Path){
if(nitobi.browser.IE){
}
var _1d9=Node;
var _1da=Path.split("/");
var len=_1da.length;
for(var i=0;i<len;i++){
if(_1d9.childNodes[Number(_1da[i])]!=null){
_1d9=_1d9.childNodes[Number(_1da[i])];
}else{
alert("Path expression failed."+Path);
}
var s="";
}
return _1d9;
};
nitobi.html.indexOfChildNode=function(_1de,_1df){
var _1e0=_1de.childNodes;
for(var i=0;i<_1e0.length;i++){
if(_1e0[i]==_1df){
return i;
}
}
return -1;
};
nitobi.html.evalScriptBlocks=function(node){
for(var i=0;i<node.childNodes.length;i++){
var _1e4=node.childNodes[i];
if(_1e4.nodeName.toLowerCase()=="script"){
eval(_1e4.text);
}else{
nitobi.html.evalScriptBlocks(_1e4);
}
}
};
nitobi.html.position=function(node){
var pos=nitobi.html.getStyle($ntb(node),"position");
if(pos=="static"){
node.style.position="relative";
}
};
nitobi.html.setOpacity=function(_1e7,_1e8){
var _1e9=_1e7.style;
_1e9.opacity=(_1e8/100);
_1e9.MozOpacity=(_1e8/100);
_1e9.KhtmlOpacity=(_1e8/100);
_1e9.filter="alpha(opacity="+_1e8+")";
};
nitobi.html.highlight=function(o,x,end){
end=end||o.value.length;
if(o.createTextRange){
o.focus();
var r=o.createTextRange();
r.move("character",0-end);
r.move("character",x);
r.moveEnd("textedit",1);
r.select();
}else{
if(o.setSelectionRange){
o.focus();
o.setSelectionRange(x,end);
}
}
};
nitobi.html.setCursor=function(o,x){
if(o.createTextRange){
o.focus();
var r=o.createTextRange();
r.move("character",0-o.value.length);
r.move("character",x);
r.select();
}else{
if(o.setSelectionRange){
o.setSelectionRange(x,x);
}
}
};
nitobi.html.getCursor=function(o){
if(o.createTextRange){
o.focus();
var r=document.selection.createRange().duplicate();
r.moveEnd("textedit",1);
return o.value.length-r.text.length;
}else{
if(o.setSelectionRange){
return o.selectionStart;
}
}
return -1;
};
nitobi.html.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"<br>");
return str;
};
nitobi.html.getElement=function(_1f4){
if(typeof (_1f4)=="string"){
return document.getElementById(_1f4);
}
return _1f4;
};
if(typeof ($)=="undefined"){
$=nitobi.html.getElement;
}
if(typeof ($ntb)=="undefined"){
$ntb=nitobi.html.getElement;
}
if(typeof ($F)=="undefined"){
$F=function(id){
var _1f6=$ntb(id);
if(_1f6!=null){
return _1f6.value;
}
return "";
};
}
nitobi.html.getTagName=function(elem){
if(nitobi.browser.IE&&elem.scopeName!=""){
return (elem.scopeName+":"+elem.nodeName).toLowerCase();
}else{
return elem.nodeName.toLowerCase();
}
};
nitobi.html.getStyleTop=function(elem){
var top=elem.style.top;
if(top==""){
top=nitobi.html.Css.getStyle(elem,"top");
}
return nitobi.lang.parseNumber(top);
};
nitobi.html.getStyleLeft=function(elem){
var left=elem.style.left;
if(left==""){
left=nitobi.html.Css.getStyle(elem,"left");
}
return nitobi.lang.parseNumber(left);
};
nitobi.html.getHeight=function(elem){
return elem.offsetHeight;
};
nitobi.html.getWidth=function(elem){
return elem.offsetWidth;
};
if(nitobi.browser.IE){
nitobi.html.getBox=function(elem){
var _1ff=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-top-width"));
var _200=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-left-width"));
var _201=nitobi.lang.parseNumber(document.body.scrollTop)-(_1ff==0?2:_1ff);
var _202=nitobi.lang.parseNumber(document.body.scrollLeft)-(_200==0?2:_200);
var rect=nitobi.html.getBoundingClientRect(elem);
return {top:rect.top+_201,left:rect.left+_202,bottom:rect.bottom,right:rect.right,height:rect.bottom-rect.top,width:rect.right-rect.left};
};
}else{
if(nitobi.browser.MOZ){
nitobi.html.getBox=function(elem){
var _205=0;
var _206=0;
var _207=elem.parentNode;
while(_207.nodeType==1&&_207!=document.body){
_205+=nitobi.lang.parseNumber(_207.scrollTop)-(nitobi.html.getStyle(_207,"overflow")=="auto"?nitobi.lang.parseNumber(nitobi.html.getStyle(_207,"border-top-width")):0);
_206+=nitobi.lang.parseNumber(_207.scrollLeft)-(nitobi.html.getStyle(_207,"overflow")=="auto"?nitobi.lang.parseNumber(nitobi.html.getStyle(_207,"border-left-width")):0);
_207=_207.parentNode;
}
var _208=elem.ownerDocument.getBoxObjectFor(elem);
var _209=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-left-width"));
var _20a=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-right-width"));
var _20b=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-top-width"));
var top=nitobi.lang.parseNumber(_208.y)-_205-_20b;
var left=nitobi.lang.parseNumber(_208.x)-_206-_209;
var _20e=left+nitobi.lang.parseNumber(_208.width);
var _20f=top+_208.height;
var _210=nitobi.lang.parseNumber(_208.height);
var _211=nitobi.lang.parseNumber(_208.width);
return {top:top,left:left,bottom:_20f,right:_20e,height:_210,width:_211};
};
nitobi.html.getBox.cache={};
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
nitobi.html.getBox=function(elem){
var _213=nitobi.html.getCoords(elem);
return {top:_213.y,left:_213.x,bottom:_213.y+_213.height,right:_213.x+_213.width,height:_213.height,width:_213.width};
};
}
}
}
nitobi.html.getBox2=nitobi.html.getBox;
nitobi.html.getUniqueId=function(elem){
if(elem.uniqueID){
return elem.uniqueID;
}else{
var t=(new Date()).getTime();
elem.uniqueID=t;
return t;
}
};
nitobi.html.getChildNodeById=function(elem,_217,_218){
return nitobi.html.getChildNodeByAttribute(elem,"id",_217,_218);
};
nitobi.html.getChildNodeByAttribute=function(elem,_21a,_21b,_21c){
for(var i=0;i<elem.childNodes.length;i++){
if(elem.nodeType!=3&&Boolean(elem.childNodes[i].getAttribute)){
if(elem.childNodes[i].getAttribute(_21a)==_21b){
return elem.childNodes[i];
}
}
}
if(_21c){
for(var i=0;i<elem.childNodes.length;i++){
var _21e=nitobi.html.getChildNodeByAttribute(elem.childNodes[i],_21a,_21b,_21c);
if(_21e!=null){
return _21e;
}
}
}
return null;
};
nitobi.html.getParentNodeById=function(elem,_220){
return nitobi.html.getParentNodeByAtt(elem,"id",_220);
};
nitobi.html.getParentNodeByAtt=function(elem,att,_223){
while(elem.parentNode!=null){
if(elem.parentNode.getAttribute(att)==_223){
return elem.parentNode;
}
elem=elem.parentNode;
}
return null;
};
if(nitobi.browser.IE){
nitobi.html.getFirstChild=function(node){
return node.firstChild;
};
}else{
nitobi.html.getFirstChild=function(node){
var i=0;
while(i<node.childNodes.length&&node.childNodes[i].nodeType==3){
i++;
}
return node.childNodes[i];
};
}
nitobi.html.getScroll=function(){
var _227,_228=0;
if((nitobi.browser.OPERA==false)&&(document.documentElement.scrollTop>0)){
_227=document.documentElement.scrollTop;
_228=document.documentElement.scrollLeft;
}else{
_227=document.body.scrollTop;
_228=document.body.scrollLeft;
}
if(((_227==0)&&(document.documentElement.scrollTop>0))||((_228==0)&&(document.documentElement.scrollLeft>0))){
_227=document.documentElement.scrollTop;
_228=document.documentElement.scrollLeft;
}
return {"left":_228,"top":_227};
};
nitobi.html.getCoords=function(_229){
var ew,eh;
try{
var _22c=_229;
ew=_229.offsetWidth;
eh=_229.offsetHeight;
for(var lx=0,ly=0;_229!=null;lx+=_229.offsetLeft,ly+=_229.offsetTop,_229=_229.offsetParent){
}
for(;_22c!=document.body;lx-=_22c.scrollLeft,ly-=_22c.scrollTop,_22c=_22c.parentNode){
}
}
catch(e){
}
return {"x":lx,"y":ly,"height":eh,"width":ew};
};
nitobi.html.scrollBarWidth=0;
nitobi.html.getScrollBarWidth=function(_22f){
if(nitobi.html.scrollBarWidth){
return nitobi.html.scrollBarWidth;
}
try{
if(null==_22f){
var _230="ntb-scrollbar-width";
var d=document.getElementById(_230);
if(null==d){
d=nitobi.html.createElement("div",{"id":_230},{width:"100px",height:"100px",overflow:"auto",position:"absolute",top:"-200px",left:"-5000px"});
d.innerHTML="<div style='height:200px;'></div>";
document.body.appendChild(d);
}
_22f=d;
}
if(nitobi.browser.IE){
nitobi.html.scrollBarWidth=Math.abs(_22f.offsetWidth-_22f.clientWidth-(_22f.clientLeft?_22f.clientLeft*2:0));
}else{
if(nitobi.browser.MOZ){
var b=document.getBoxObjectFor(_22f);
nitobi.html.scrollBarWidth=Math.abs((b.width-_22f.clientWidth));
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
var b=nitobi.html.getBox(_22f);
nitobi.html.scrollBarWidth=Math.abs((b.width-_22f.clientWidth));
}
}
}
}
catch(err){
}
return nitobi.html.scrollBarWidth;
};
nitobi.html.align=nitobi.drawing.align;
nitobi.html.emptyElements={HR:true,BR:true,IMG:true,INPUT:true};
nitobi.html.specialElements={TEXTAREA:true};
nitobi.html.permHeight=0;
nitobi.html.permWidth=0;
nitobi.html.getBodyArea=function(){
var _233,_234,_235,_236;
var x,y;
var _239=false;
if(nitobi.lang.isStandards()){
_239=true;
}
var de=document.documentElement;
var db=document.body;
if(self.innerHeight){
x=self.innerWidth;
y=self.innerHeight;
}else{
if(de&&de.clientHeight){
x=de.clientWidth;
y=de.clientHeight;
}else{
if(db){
x=db.clientWidth;
y=db.clientHeight;
}
}
}
_235=x;
_236=y;
if(self.pageYOffset){
x=self.pageXOffset;
y=self.pageYOffset;
}else{
if(de&&de.scrollTop){
x=de.scrollLeft;
y=de.scrollTop;
}else{
if(db){
x=db.scrollLeft;
y=db.scrollTop;
}
}
}
_233=x;
_234=y;
var _23c=db.scrollHeight;
var _23d=db.offsetHeight;
if(_23c>_23d){
x=db.scrollWidth;
y=db.scrollHeight;
}else{
x=db.offsetWidth;
y=db.offsetHeight;
}
nitobi.html.permHeight=y;
nitobi.html.permWidth=x;
if(nitobi.html.permHeight<_236){
nitobi.html.permHeight=_236;
if(nitobi.browser.IE&&_239){
_235+=20;
}
}
if(_235<nitobi.html.permWidth){
_235=nitobi.html.permWidth;
}
if(nitobi.html.permHeight>_236){
_235+=20;
}
var _23e,_23f;
_23e=de.scrollHeight;
_23f=de.scrollWidth;
return {scrollWidth:_23f,scrollHeight:_23e,scrollLeft:_233,scrollTop:_234,clientWidth:_235,clientHeight:_236,bodyWidth:nitobi.html.permWidth,bodyHeight:nitobi.html.PermHeight};
};
nitobi.html.getOuterHtml=function(node){
if(nitobi.browser.IE){
return node.outerHTML;
}else{
var html="";
switch(node.nodeType){
case Node.ELEMENT_NODE:
html+="<";
html+=node.nodeName.toLowerCase();
if(!nitobi.html.specialElements[node.nodeName]){
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="_moz-userdefined"){
html+=" "+node.attributes[a].nodeName.toLowerCase()+"=\""+node.attributes[a].nodeValue+"\"";
}
}
html+=">";
if(!nitobi.html.emptyElements[node.nodeName]){
html+=node.innerHTML;
html+="</"+node.nodeName.toLowerCase()+">";
}
}else{
switch(node.nodeName){
case "TEXTAREA":
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="value"){
html+=" "+node.attributes[a].nodeName.toUpperCase()+"=\""+node.attributes[a].nodeValue+"\"";
}else{
var _243=node.attributes[a].nodeValue;
}
}
html+=">";
html+=_243;
html+="</"+node.nodeName+">";
break;
}
}
break;
case Node.TEXT_NODE:
html+=node.nodeValue;
break;
case Node.COMMENT_NODE:
html+="<!"+"--"+node.nodeValue+"--"+">";
break;
}
return html;
}
};
nitobi.html.insertAdjacentText=function(_244,pos,s){
if(nitobi.browser.IE){
return _244.insertAdjacentText(pos,s);
}
var node=document.createTextNode(s);
nitobi.html.insertAdjacentElement(_244,pos,node);
};
nitobi.html.insertAdjacentHTML=function(_248,_249,_24a,_24b){
if(nitobi.browser.IE){
return _248.insertAdjacentHTML(_249,_24a,_24b);
}
var df;
var r=_248.ownerDocument.createRange();
switch(String(_249).toLowerCase()){
case "beforebegin":
r.setStartBefore(_248);
df=r.createContextualFragment(_24a);
_248.parentNode.insertBefore(df,_248);
break;
case "afterbegin":
r.selectNodeContents(_248);
r.collapse(true);
df=r.createContextualFragment(_24a);
_248.insertBefore(df,_248.firstChild);
break;
case "beforeend":
if(_24b==true){
_248.innerHTML=_248.innerHTML+_24a;
}else{
r.selectNodeContents(_248);
r.collapse(false);
df=r.createContextualFragment(_24a);
_248.appendChild(df);
}
break;
case "afterend":
r.setStartAfter(_248);
df=r.createContextualFragment(_24a);
_248.parentNode.insertBefore(df,_248.nextSibling);
break;
}
};
nitobi.html.insertAdjacentElement=function(_24e,pos,node){
if(nitobi.browser.IE){
return _24e.insertAdjacentElement(pos,node);
}
switch(pos){
case "beforeBegin":
_24e.parentNode.insertBefore(node,_24e);
break;
case "afterBegin":
_24e.insertBefore(node,_24e.firstChild);
break;
case "beforeEnd":
_24e.appendChild(node);
break;
case "afterEnd":
if(_24e.nextSibling){
_24e.parentNode.insertBefore(node,_24e.nextSibling);
}else{
_24e.parentNode.appendChild(node);
}
break;
}
};
nitobi.html.getClientRects=function(node,_252,_253){
if(nitobi.browser.IE){
return node.getClientRects();
}
_252=_252||0;
_253=_253||0;
var td;
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
td=nitobi.html.getCoords(node);
_252=0;
_253=0;
}else{
var td=document.getBoxObjectFor(node);
}
return new Array({top:(td.y-_252),left:(td.x-_253),bottom:(td.y+td.height-_252),right:(td.x+td.width-_253)});
};
nitobi.html.getBoundingClientRect=function(node,_256,_257){
if(node.getBoundingClientRect){
return node.getBoundingClientRect();
}
_256=_256||0;
_257=_257||0;
var td;
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
td=nitobi.html.getCoords(node);
_256=0;
_257=0;
}else{
td=document.getBoxObjectFor(node);
}
var top=td.y-_256;
var left=td.x-_257;
return {top:top,left:left,bottom:(top+td.height),right:(left+td.width)};
};
nitobi.html.Event=function(){
this.srcElement=null;
this.fromElement=null;
this.toElement=null;
this.eventSrc=null;
};
nitobi.html.handlerId=0;
nitobi.html.elementId=0;
nitobi.html.elements=[];
nitobi.html.unload=[];
nitobi.html.unloadCalled=false;
nitobi.html.attachEvents=function(_25b,_25c,_25d){
var _25e=[];
for(var i=0;i<_25c.length;i++){
var e=_25c[i];
_25e.push(nitobi.html.attachEvent(_25b,e.type,e.handler,_25d,e.capture||false));
}
return _25e;
};
nitobi.html.attachEvent=function(_261,type,_263,_264,_265,_266){
if(type=="anyclick"){
if(nitobi.browser.IE){
nitobi.html.attachEvent(_261,"dblclick",_263,_264,_265,_266);
}
type="click";
}
if(!(_263 instanceof Function)){
nitobi.lang.throwError("Event handler needs to be a Function");
}
_261=$ntb(_261);
if(type.toLowerCase()=="unload"&&_266!=true){
var _267=_263;
if(_264!=null){
_267=function(){
_263.call(_264);
};
}
return this.addUnload(_267);
}
var _268=this.handlerId++;
var _269=this.elementId++;
if(typeof (_263.ebaguid)!="undefined"){
_268=_263.ebaguid;
}else{
_263.ebaguid=_268;
}
if(typeof (_261.ebaguid)=="undefined"){
_261.ebaguid=_269;
nitobi.html.elements[_269]=_261;
}
if(typeof (_261.eba_events)=="undefined"){
_261.eba_events={};
}
if(_261.eba_events[type]==null){
_261.eba_events[type]={};
if(_261.attachEvent){
_261["eba_event_"+type]=function(){
nitobi.html.notify.call(_261,window.event);
};
_261.attachEvent("on"+type,_261["eba_event_"+type]);
if(_265&&_261.setCapture!=null){
_261.setCapture(true);
}
}else{
if(_261.addEventListener){
_261["eba_event_"+type]=function(){
nitobi.html.notify.call(_261,arguments[0]);
};
_261.addEventListener(type,_261["eba_event_"+type],_265);
}
}
}
_261.eba_events[type][_268]={handler:_263,context:_264};
return _268;
};
nitobi.html.notify=function(e){
if(!nitobi.browser.IE){
e.srcElement=e.target;
e.fromElement=e.relatedTarget;
e.toElement=e.relatedTarget;
}
var _26b=this;
e.eventSrc=_26b;
nitobi.html.Event=e;
for(var _26c in _26b.eba_events[e.type]){
var _26d=_26b.eba_events[e.type][_26c];
if(typeof (_26d.context)=="object"){
_26d.handler.call(_26d.context,e,_26b);
}else{
_26d.handler.call(_26b,e,_26b);
}
}
};
nitobi.html.detachEvents=function(_26e,_26f){
for(var i=0;i<_26f.length;i++){
var e=_26f[i];
nitobi.html.detachEvent(_26e,e.type,e.handler);
}
};
nitobi.html.detachEvent=function(_272,type,_274){
_272=$ntb(_272);
var _275=_274;
if(_274 instanceof Function){
_275=_274.ebaguid;
}
if(type=="unload"){
this.unload.splice(ebaguid,1);
}
if(_272!=null&&_272.eba_events!=null&&_272.eba_events[type]!=null&&_272.eba_events[type][_275]!=null){
var _276=_272.eba_events[type];
_276[_275]=null;
delete _276[_275];
if(nitobi.collections.isHashEmpty(_276)){
this.m_detach(_272,type,_272["eba_event_"+type]);
_272["eba_event_"+type]=null;
_272.eba_events[type]=null;
_276=null;
if(_272.nodeType==1){
_272.removeAttribute("eba_event_"+type);
}
}
}
return true;
};
nitobi.html.m_detach=function(_277,type,_279){
if(_279!=null&&_279 instanceof Function){
if(_277.detachEvent){
_277.detachEvent("on"+type,_279);
}else{
if(_277.removeEventListener){
_277.removeEventListener(type,_279,false);
}
}
_277["on"+type]=null;
if(type=="unload"){
for(var i=0;i<this.unload.length;i++){
this.unload[i].call(this);
this.unload[i]=null;
}
}
}
};
nitobi.html.detachAllEvents=function(evt){
for(var i=0;i<nitobi.html.elements.length;i++){
if(typeof (nitobi.html.elements[i])!="undefined"){
for(var _27d in nitobi.html.elements[i].eba_events){
nitobi.html.m_detach(nitobi.html.elements[i],_27d,nitobi.html.elements[i]["eba_event_"+_27d]);
if(typeof (nitobi.html.elements[i])!="undefined"&&nitobi.html.elements[i].eba_events[_27d]!=null){
for(var _27e in nitobi.html.elements[i].eba_events[_27d]){
nitobi.html.elements[i].eba_events[_27d][_27e]=null;
}
}
nitobi.html.elements[i]["eba_event_"+_27d]=null;
}
}
}
nitobi.html.elements=null;
};
nitobi.html.addUnload=function(_27f){
this.unload.push(_27f);
return this.unload.length-1;
};
nitobi.html.cancelEvent=function(evt){
nitobi.html.stopPropagation(evt);
nitobi.html.preventDefault(evt);
};
nitobi.html.stopPropagation=function(evt){
if(evt==null){
return;
}
if(nitobi.browser.IE){
evt.cancelBubble=true;
}else{
evt.stopPropagation();
}
};
nitobi.html.preventDefault=function(evt,v){
if(evt==null){
return;
}
if(nitobi.browser.IE){
evt.returnValue=false;
}else{
evt.preventDefault();
}
if(v!=null){
e.keyCode=v;
}
};
nitobi.html.getEventCoords=function(evt){
var _285={"x":evt.clientX,"y":evt.clientY};
if(nitobi.browser.IE){
_285.x+=document.documentElement.scrollLeft+document.body.scrollLeft;
_285.y+=document.documentElement.scrollTop+document.body.scrollTop;
}else{
_285.x+=window.scrollX;
_285.y+=window.scrollY;
}
return _285;
};
nitobi.html.getEvent=function(_286){
if(nitobi.browser.IE){
return window.event;
}else{
_286.srcElement=_286.target;
_286.fromElement=_286.relatedTarget;
_286.toElement=_286.relatedTarget;
return _286;
}
};
nitobi.html.createEvent=function(_287,_288,_289,_28a){
if(nitobi.browser.IE){
_289.target.fireEvent("on"+_288);
}else{
var _28b=document.createEvent(_287);
_28b.initKeyEvent(_288,true,true,document.defaultView,_289.ctrlKey,_289.altKey,_289.shiftKey,_289.metaKey,_28a.keyCode,_28a.charCode);
_289.target.dispatchEvent(_28b);
}
};
nitobi.html.unloadEventId=nitobi.html.attachEvent(window,"unload",nitobi.html.detachAllEvents,nitobi.html,false,true);
nitobi.lang.defineNs("nitobi.event");
nitobi.event=function(){
};
nitobi.event.keys={};
nitobi.event.guid=0;
nitobi.event.subscribe=function(key,_28d){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
nitobi.event.publish(key);
var guid=this.guid++;
this.keys[key].add(_28d,guid);
return guid;
};
nitobi.event.unsubscribe=function(key,guid){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]==null){
return true;
}
if(this.keys[key].remove(guid)){
this.keys[key]=null;
delete this.keys[key];
}
};
nitobi.event.evaluate=function(func,_292){
var _293=true;
if(typeof func=="string"){
func=func.replace(/eventArgs/gi,"arguments[1]");
var _294=eval(func);
_293=(typeof (_294)=="undefined"?true:_294);
}
return _293;
};
nitobi.event.publish=function(key){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]==null){
this.keys[key]=new nitobi.event.Key();
}
};
nitobi.event.notify=function(key,_297){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]!=null){
return this.keys[key].notify(_297);
}else{
return true;
}
};
nitobi.event.dispose=function(){
for(var key in this.keys){
if(typeof (this.keys[key])=="function"){
this.keys[key].dispose();
}
}
this.keys=null;
};
nitobi.event.Key=function(){
this.handlers={};
};
nitobi.event.Key.prototype.add=function(_299,guid){
ntbAssert(_299 instanceof Function,"EventKey.add requires a JavaScript function pointer as a parameter.","",EBA_THROW);
this.handlers[guid]=_299;
};
nitobi.event.Key.prototype.remove=function(guid){
this.handlers[guid]=null;
delete this.handlers[guid];
var i=true;
for(var item in this.handlers){
i=false;
break;
}
return i;
};
nitobi.event.Key.prototype.notify=function(_29e){
var fail=false;
for(var item in this.handlers){
var _2a1=this.handlers[item];
if(_2a1 instanceof Function){
var rv=(_2a1.apply(this,arguments)==false);
fail=fail||rv;
}else{
}
}
return !fail;
};
nitobi.event.Key.prototype.dispose=function(){
for(var _2a3 in this.handlers){
this.handlers[_2a3]=null;
}
};
nitobi.event.Args=function(src){
this.source=src;
};
nitobi.event.Args.prototype.callback=function(){
};
nitobi.html.cancelBubble=nitobi.html.cancelEvent;
nitobi.html.getCssRules=nitobi.html.Css.getRules;
nitobi.html.findParentStylesheet=nitobi.html.Css.findParentStylesheet;
nitobi.html.getClass=nitobi.html.Css.getClass;
nitobi.html.getStyle=nitobi.html.Css.getStyle;
nitobi.html.addClass=nitobi.html.Css.addClass;
nitobi.html.removeClass=nitobi.html.Css.removeClass;
nitobi.html.getClassStyle=nitobi.html.Css.getClassStyle;
nitobi.html.normalizeUrl=nitobi.html.Url.normalize;
nitobi.html.setUrlParameter=nitobi.html.Url.setParameter;
nitobi.lang.defineNs("nitobi.base.XmlNamespace");
nitobi.base.XmlNamespace.prefix="ntb";
nitobi.base.XmlNamespace.uri="http://www.nitobi.com";
nitobi.lang.defineNs("nitobi.collections");
if(false){
nitobi.collections=function(){
};
}
nitobi.collections.IEnumerable=function(){
this.list=new Array();
this.length=0;
};
nitobi.collections.IEnumerable.prototype.add=function(obj){
this.list[this.getLength()]=obj;
this.length++;
};
nitobi.collections.IEnumerable.prototype.insert=function(_2a6,obj){
this.list.splice(_2a6,0,obj);
this.length++;
};
nitobi.collections.IEnumerable.createNewArray=function(obj,_2a9){
var _2aa;
_2a9=_2a9||0;
if(obj.count){
_2aa=obj.count;
}
if(obj.length){
_2aa=obj.length;
}
var x=new Array(_2aa-_2a9);
for(var i=_2a9;i<_2aa;i++){
x[i-_2a9]=obj[i];
}
return x;
};
nitobi.collections.IEnumerable.prototype.get=function(_2ad){
if(_2ad<0||_2ad>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
return this.list[_2ad];
};
nitobi.collections.IEnumerable.prototype.set=function(_2ae,_2af){
if(_2ae<0||_2ae>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[_2ae]=_2af;
};
nitobi.collections.IEnumerable.prototype.indexOf=function(obj){
for(var i=0;i<this.getLength();i++){
if(this.list[i]===obj){
return i;
}
}
return -1;
};
nitobi.collections.IEnumerable.prototype.remove=function(_2b2){
var i;
if(typeof (_2b2)!="number"){
i=this.indexOf(_2b2);
}else{
i=_2b2;
}
if(-1==i||i<0||i>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[i]=null;
this.list.splice(i,1);
this.length--;
};
nitobi.collections.IEnumerable.prototype.getLength=function(){
return this.length;
};
nitobi.collections.IEnumerable.prototype.each=function(func){
var l=this.length;
var list=this.list;
for(var i=0;i<l;i++){
func(list[i]);
}
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.ISerializable=function(_2b8,id,xml,_2bb){
nitobi.Object.call(this);
if(typeof (this.ISerializableInitialized)=="undefined"){
this.ISerializableInitialized=true;
}else{
return;
}
this.xmlNode=null;
this.setXmlNode(_2b8);
if(_2b8!=null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_2b8.nodeName});
}else{
this.profile=nitobi.base.Registry.getInstance().getProfileByInstance(this);
}
this.onDeserialize=new nitobi.base.Event();
this.onSetParentObject=new nitobi.base.Event();
this.factory=nitobi.base.Factory.getInstance();
this.objectHash={};
this.onCreateObject=new nitobi.base.Event();
if(_2b8!=null){
this.deserializeFromXmlNode(this.getXmlNode());
}else{
if(this.factory!=null&&this.profile.tagName!=null){
this.createByProfile(this.profile,this.getXmlNode());
}else{
if(xml!=null&&_2b8!=null){
this.createByXml(xml);
}
}
}
this.disposal.push(this.xmlNode);
};
nitobi.lang.extend(nitobi.base.ISerializable,nitobi.Object);
nitobi.base.ISerializable.guidMap={};
nitobi.base.ISerializable.prototype.ISerializableImplemented=true;
nitobi.base.ISerializable.prototype.getProfile=function(){
return this.profile;
};
nitobi.base.ISerializable.prototype.createByProfile=function(_2bc,_2bd){
if(_2bd==null){
var xml="<"+_2bc.tagName+" xmlns:"+nitobi.base.XmlNamespace.prefix+"=\""+nitobi.base.XmlNamespace.uri+"\" />";
var _2bf=nitobi.xml.createXmlDoc(xml);
this.setXmlNode(_2bf.firstChild);
this.deserializeFromXmlNode(this.xmlNode);
}else{
this.deserializeFromXmlNode(_2bd);
this.setXmlNode(_2bd);
}
};
nitobi.base.ISerializable.prototype.createByXml=function(xml){
this.deserializeFromXml(xml);
};
nitobi.base.ISerializable.prototype.getParentObject=function(){
return this.parentObj;
};
nitobi.base.ISerializable.prototype.setParentObject=function(_2c1){
this.parentObj=_2c1;
this.onSetParentObject.notify();
};
nitobi.base.ISerializable.prototype.addChildObject=function(_2c2){
this.addToCache(_2c2);
_2c2.setParentObject(this);
var _2c3=_2c2.getXmlNode();
if(!this.areGuidsGenerated(_2c3)){
_2c3=this.generateGuids(_2c3);
_2c2.setXmlNode(_2c3);
}
_2c2.setXmlNode(this.xmlNode.appendChild(nitobi.xml.importNode(this.xmlNode.ownerDocument,_2c3,true)));
};
nitobi.base.ISerializable.prototype.insertBeforeChildObject=function(obj,_2c5){
_2c5=_2c5?_2c5.getXmlNode():null;
this.addToCache(obj);
obj.setParentObject(this);
var _2c6=obj.getXmlNode();
if(!this.areGuidsGenerated(_2c6)){
_2c6=this.generateGuids(_2c6);
obj.setXmlNode(_2c6);
}
_2c6=nitobi.xml.importNode(this.xmlNode.ownerDocument,_2c6,true);
this.xmlNode.insertBefore(_2c6,_2c5);
};
nitobi.base.ISerializable.prototype.createElement=function(name){
var _2c8;
if(this.xmlNode==null||this.xmlNode.ownerDocument==null){
_2c8=nitobi.xml.createXmlDoc();
}else{
_2c8=this.xmlNode.ownerDocument;
}
if(nitobi.browser.IE){
return _2c8.createNode(1,name,nitobi.base.XmlNamespace.uri);
}else{
if(_2c8.createElementNS){
return _2c8.createElementNS(nitobi.base.XmlNamespace.uri,name);
}else{
nitobi.lang.throwError("Unable to create a new xml node on this browser.");
}
}
};
nitobi.base.ISerializable.prototype.deleteChildObject=function(id){
this.removeFromCache(id);
var e=this.getElement(id);
if(e!=null){
e.parentNode.removeChild(e);
}
};
nitobi.base.ISerializable.prototype.addToCache=function(obj){
this.objectHash[obj.getId()]=obj;
};
nitobi.base.ISerializable.prototype.removeFromCache=function(id){
this.objectHash[id]=null;
};
nitobi.base.ISerializable.prototype.inCache=function(id){
return (this.objectHash[id]!=null);
};
nitobi.base.ISerializable.prototype.flushCache=function(){
this.objectHash={};
};
nitobi.base.ISerializable.prototype.areGuidsGenerated=function(_2ce){
if(_2ce==null||_2ce.ownerDocument==null){
return false;
}
if(nitobi.browser.IE){
var node=_2ce.ownerDocument.documentElement;
if(node==null){
return false;
}else{
var id=node.getAttribute("id");
if(id==null||id==""){
return false;
}else{
return (nitobi.base.ISerializable.guidMap[id]!=null);
}
}
}else{
return (_2ce.ownerDocument.generatedGuids==true);
}
};
nitobi.base.ISerializable.prototype.setGuidsGenerated=function(_2d1,_2d2){
if(_2d1==null||_2d1.ownerDocument==null){
return;
}
if(nitobi.browser.IE){
var node=_2d1.ownerDocument.documentElement;
if(node!=null){
var id=node.getAttribute("id");
if(id!=null&&id!=""){
nitobi.base.ISerializable.guidMap[id]=true;
}
}
}else{
_2d1.ownerDocument.generatedGuids=true;
}
};
nitobi.base.ISerializable.prototype.generateGuids=function(_2d5){
nitobi.base.uniqueIdGeneratorProc.addParameter("guid",nitobi.component.getUniqueId(),"");
var doc=nitobi.xml.transformToXml(_2d5,nitobi.base.uniqueIdGeneratorProc);
this.saveDocument=doc;
this.setGuidsGenerated(doc.documentElement,true);
return doc.documentElement;
};
nitobi.base.ISerializable.prototype.deserializeFromXmlNode=function(_2d7){
if(!this.areGuidsGenerated(_2d7)){
_2d7=this.generateGuids(_2d7);
}
this.setXmlNode(_2d7);
this.flushCache();
if(this.profile==null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_2d7.nodeName});
}
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.deserializeFromXml=function(xml){
var doc=nitobi.xml.createXmlDoc(xml);
var node=this.generateGuids(doc.firstChild);
this.setXmlNode(node);
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.getChildObject=function(id){
var obj=null;
obj=this.objectHash[id];
if(obj==null){
var _2dd=this.getElement(id);
if(_2dd==null){
return null;
}else{
obj=this.factory.createByNode(_2dd);
this.onCreateObject.notify(obj);
this.addToCache(obj);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.base.ISerializable.prototype.getChildObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getElement=function(id){
try{
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
return node;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.base.ISerializable.prototype.getFactory=function(){
return this.factory;
};
nitobi.base.ISerializable.prototype.setFactory=function(_2e1){
this.factory=factory;
};
nitobi.base.ISerializable.prototype.getXmlNode=function(){
return this.xmlNode;
};
nitobi.base.ISerializable.prototype.setXmlNode=function(_2e2){
if(nitobi.lang.typeOf(_2e2)==nitobi.lang.type.XMLDOC&&_2e2!=null){
this.ownerDocument=_2e2;
_2e2=nitobi.html.getFirstChild(_2e2);
}else{
if(_2e2!=null){
this.ownerDocument=_2e2.ownerDocument;
}
}
if(_2e2!=null&&nitobi.browser.MOZ&&_2e2.ownerDocument==null){
nitobi.lang.throwError(nitobi.error.OrphanXmlNode+" ISerializable.setXmlNode");
}
this.xmlNode=_2e2;
};
nitobi.base.ISerializable.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlNode);
};
nitobi.base.ISerializable.prototype.getAttribute=function(name,_2e4){
if(this[name]!=null){
return this[name];
}
var _2e5=this.xmlNode.getAttribute(name);
return _2e5===null?_2e4:_2e5;
};
nitobi.base.ISerializable.prototype.setAttribute=function(name,_2e7){
this[name]=_2e7;
this.xmlNode.setAttribute(name.toLowerCase(),_2e7!=null?_2e7.toString():"");
};
nitobi.base.ISerializable.prototype.setIntAttribute=function(name,_2e9){
var n=parseInt(_2e9);
if(_2e9!=null&&(typeof (n)!="number"||isNaN(n))){
nitobi.lang.throwError(name+" is not an integer and therefore cannot be set. It's value was "+_2e9);
}
this.setAttribute(name,_2e9);
};
nitobi.base.ISerializable.prototype.getIntAttribute=function(name,_2ec){
var x=this.getAttribute(name,_2ec);
if(x==null||x==""){
return 0;
}
var tx=parseInt(x);
if(isNaN(tx)){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be an int but was actually NaN");
}
return tx;
};
nitobi.base.ISerializable.prototype.setBoolAttribute=function(name,_2f0){
_2f0=nitobi.lang.getBool(_2f0);
if(_2f0!=null&&typeof (_2f0)!="boolean"){
nitobi.lang.throwError(name+" is not an boolean and therefore cannot be set. It's value was "+_2f0);
}
this.setAttribute(name,(_2f0?"true":"false"));
};
nitobi.base.ISerializable.prototype.getBoolAttribute=function(name,_2f2){
var x=this.getAttribute(name,_2f2);
if(typeof (x)=="string"&&x==""){
return null;
}
var tx=nitobi.lang.getBool(x);
if(tx==null){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be a bool but was actually "+x);
}
return tx;
};
nitobi.base.ISerializable.prototype.setDateAttribute=function(name,_2f6){
this.setAttribute(name,_2f6);
};
nitobi.base.ISerializable.prototype.getDateAttribute=function(name,_2f8){
if(this[name]){
return this[name];
}
var _2f9=this.getAttribute(name,_2f8);
return _2f9?new Date(_2f9):null;
};
nitobi.base.ISerializable.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.base.ISerializable.prototype.getChildObjectId=function(_2fa,_2fb){
var _2fc=(typeof (_2fa.className)=="string"?_2fa.tagName:_2fa.getXmlNode().nodeName);
var _2fd=_2fc;
if(_2fb){
_2fd+="[@instancename='"+_2fb+"']";
}
var node=this.getXmlNode().selectSingleNode(_2fd);
if(null==node){
return null;
}else{
return node.getAttribute("id");
}
};
nitobi.base.ISerializable.prototype.setObject=function(_2ff,_300){
if(_2ff.ISerializableImplemented!=true){
nitobi.lang.throwError(nitobi.error.ExpectedInterfaceNotFound+" ISerializable");
}
var id=this.getChildObjectId(_2ff,_300);
if(null!=id){
this.deleteChildObject(id);
}
if(_300){
_2ff.setAttribute("instancename",_300);
}
this.addChildObject(_2ff);
};
nitobi.base.ISerializable.prototype.getObject=function(_302,_303){
var id=this.getChildObjectId(_302,_303);
if(null==id){
return id;
}
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.isDescendantExists=function(id){
var node=this.getXmlNode();
var _308=node.selectSingleNode("//*[@id='"+id+"']");
return (_308!=null);
};
nitobi.base.ISerializable.prototype.getPathToLeaf=function(id){
var node=this.getXmlNode();
var _30b=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_30b.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _30c=_30b.selectNodes("./ancestor-or-self::*");
var _30d=this.getId();
var _30e=0;
for(var i=0;i<_30c.length;i++){
if(_30c[i].getAttribute("id")==_30d){
_30e=i+1;
break;
}
}
var arr=nitobi.collections.IEnumerable.createNewArray(_30c,_30e);
return arr.reverse();
};
nitobi.base.ISerializable.prototype.isDescendantInstantiated=function(id){
var node=this.getXmlNode();
var _313=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_313.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _314=_313.selectNodes("ancestor::*");
var _315=false;
var obj=this;
for(var i=0;i<_314.length;i++){
if(_315){
var _318=_314[i].getAttribute("id");
instantiated=obj.inCache(_318);
if(!instantiated){
return false;
}
obj=this.getObjectById(_318);
}
if(_314[i].getAttribute("id")==this.getId()){
_315=true;
}
}
return obj.inCache(id);
};
nitobi.lang.defineNs("nitobi.base");
if(!nitobi.base.Registry){
nitobi.base.Registry=function(){
this.classMap={};
this.tagMap={};
};
if(!nitobi.base.Registry.instance){
nitobi.base.Registry.instance=null;
}
nitobi.base.Registry.getInstance=function(){
if(nitobi.base.Registry.instance==null){
nitobi.base.Registry.instance=new nitobi.base.Registry();
}
return nitobi.base.Registry.instance;
};
nitobi.base.Registry.prototype.getProfileByClass=function(_319){
return this.classMap[_319];
};
nitobi.base.Registry.prototype.getProfileByInstance=function(_31a){
var _31b=nitobi.lang.getFirstFunction(_31a);
var p=_31b.value.prototype;
var _31d=null;
var _31e=0;
for(var _31f in this.classMap){
var _320=this.classMap[_31f].classObject;
var _321=0;
while(_320&&_31a instanceof _320){
_320=_320.baseConstructor;
_321++;
}
if(_321>_31e){
_31e=_321;
_31d=_31f;
}
}
if(_31d){
return this.getProfileByClass(_31d);
}else{
return null;
}
};
nitobi.base.Registry.prototype.getProfileByTag=function(_322){
return this.tagMap[_322];
};
nitobi.base.Registry.prototype.getCompleteProfile=function(_323){
if(nitobi.lang.isDefined(_323.className)&&_323.className!=null){
return this.classMap[_323.className];
}
if(nitobi.lang.isDefined(_323.tagName)&&_323.tagName!=null){
return this.tagMap[_323.tagName];
}
nitobi.lang.throwError("A complete class profile could not be found. Insufficient information was provided.");
};
nitobi.base.Registry.prototype.register=function(_324){
if(!nitobi.lang.isDefined(_324.tagName)||null==_324.tagName){
nitobi.lang.throwError("Illegal to register a class without a tagName.");
}
if(!nitobi.lang.isDefined(_324.className)||null==_324.className){
nitobi.lang.throwError("Illegal to register a class without a className.");
}
this.tagMap[_324.tagName]=_324;
this.classMap[_324.className]=_324;
};
}
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Factory=function(){
this.registry=nitobi.base.Registry.getInstance();
};
nitobi.lang.extend(nitobi.base.Factory,nitobi.Object);
nitobi.base.Factory.instance=null;
nitobi.base.Factory.prototype.createByClass=function(_325){
try{
return nitobi.lang.newObject(_325,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByClass) could not create the class "+_325+".",err);
}
};
nitobi.base.Factory.prototype.createByNode=function(_326){
try{
if(null==_326){
nitobi.lang.throwError(nitobi.error.ArgExpected);
}
if(nitobi.lang.typeOf(_326)==nitobi.lang.type.XMLDOC){
_326=nitobi.xml.getChildNodes(_326)[0];
}
var _327=this.registry.getProfileByTag(_326.nodeName).className;
var _328=_326.ownerDocument;
var _329=Array.prototype.slice.call(arguments,0);
var obj=nitobi.lang.newObject(_327,_329,0);
return obj;
}
catch(err){
nitobi.lang.throwError("The Factory (createByNode) could not create the class "+_327+".",err);
}
};
nitobi.base.Factory.prototype.createByProfile=function(_32b){
try{
return nitobi.lang.newObject(_32b.className,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByProfile) could not create the class "+_32b.className+".",err);
}
};
nitobi.base.Factory.prototype.createByTag=function(_32c){
var _32d=this.registry.getProfileByTag(_32c).className;
var _32e=Array.prototype.slice.call(arguments,0);
return nitobi.lang.newObject(_32d,_32e,1);
};
nitobi.base.Factory.getInstance=function(){
if(nitobi.base.Factory.instance==null){
nitobi.base.Factory.instance=new nitobi.base.Factory();
}
return nitobi.base.Factory.instance;
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Profile=function(_32f,_330,_331,_332,_333){
this.className=_32f;
this.classObject=eval(_32f);
this.schema=_330;
this.singleton=_331;
this.tagName=_332;
this.idField=_333||"id";
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Declaration=function(){
nitobi.base.Declaration.baseConstructor.call(this);
this.xmlDoc=null;
};
nitobi.lang.extend(nitobi.base.Declaration,nitobi.Object);
nitobi.base.Declaration.prototype.loadHtml=function(_334){
try{
_334=$ntb(_334);
this.xmlDoc=nitobi.xml.parseHtml(_334);
return this.xmlDoc;
}
catch(err){
nitobi.lang.throwError(nitobi.error.DeclarationParseError,err);
}
};
nitobi.base.Declaration.prototype.getXmlDoc=function(){
return this.xmlDoc;
};
nitobi.base.Declaration.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlDoc);
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.DateMath={DAY:"d",WEEK:"w",MONTH:"m",YEAR:"y",ONE_DAY_MS:86400000};
nitobi.base.DateMath._add=function(date,unit,_337){
if(unit==this.DAY){
date.setDate(date.getDate()+_337);
}else{
if(unit==this.WEEK){
date.setDate(date.getDate()+7*_337);
}else{
if(unit==this.MONTH){
date.setMonth(date.getMonth()+_337);
}else{
if(unit==this.YEAR){
date.setFullYear(date.getFullYear()+_337);
}
}
}
}
return date;
};
nitobi.base.DateMath.add=function(date,unit,_33a){
return this._add(date,unit,_33a);
};
nitobi.base.DateMath.subtract=function(date,unit,_33d){
return this._add(date,unit,-1*_33d);
};
nitobi.base.DateMath.after=function(date,_33f){
return (date-_33f)>0;
};
nitobi.base.DateMath.between=function(date,_341,end){
return (date-_341)>=0&&(end-date)>=0;
};
nitobi.base.DateMath.before=function(date,_344){
return (date-_344)<0;
};
nitobi.base.DateMath.clone=function(date){
var n=new Date(date.toString());
return n;
};
nitobi.base.DateMath.isLeapYear=function(date){
var y=date.getFullYear();
var _1=String(y/4).indexOf(".")==-1;
var _2=String(y/100).indexOf(".")==-1;
var _3=String(y/400).indexOf(".")==-1;
return (_3)?true:(_1&&!_2)?true:false;
};
nitobi.base.DateMath.getMonthDays=function(date){
return [31,(this.isLeapYear(date))?29:28,31,30,31,30,31,31,30,31,30,31][date.getMonth()];
};
nitobi.base.DateMath.getMonthEnd=function(date){
return new Date(date.getFullYear(),date.getMonth(),this.getMonthDays(date));
};
nitobi.base.DateMath.getMonthStart=function(date){
return new Date(date.getFullYear(),date.getMonth(),1);
};
nitobi.base.DateMath.isToday=function(date){
var _350=this.resetTime(new Date());
var end=this.add(this.clone(_350),this.DAY,1);
return this.between(date,_350,end);
};
nitobi.base.DateMath.isSameDay=function(date,_353){
date=this.resetTime(this.clone(date));
_353=this.resetTime(this.clone(_353));
return date.valueOf()==_353.valueOf();
};
nitobi.base.DateMath.parse=function(str){
};
nitobi.base.DateMath.getWeekNumber=function(date){
var _356=this.getJanuary1st(date);
return Math.ceil(this.getNumberOfDays(_356,date)/7);
};
nitobi.base.DateMath.getNumberOfDays=function(_357,end){
var _359=this.resetTime(this.clone(end)).getTime()-this.resetTime(this.clone(_357)).getTime();
return Math.round(_359/this.ONE_DAY_MS)+1;
};
nitobi.base.DateMath.getJanuary1st=function(date){
return new Date(date.getFullYear(),0,1);
};
nitobi.base.DateMath.resetTime=function(date){
if(nitobi.base.DateMath.invalid(date)){
return date;
}
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);
return date;
};
nitobi.base.DateMath.parseIso8601=function(date){
return new Date(date.replace(/^(....).(..).(..)(.*)$/,"$1/$2/$3$4"));
};
nitobi.base.DateMath.toIso8601=function(date){
if(nitobi.base.DateMath.invalid(date)){
return "";
}
var pz=nitobi.lang.padZeros;
return date.getFullYear()+"-"+pz(date.getMonth()+1)+"-"+pz(date.getDate())+" "+pz(date.getHours())+":"+pz(date.getMinutes())+":"+pz(date.getSeconds());
};
nitobi.base.DateMath.invalid=function(date){
return (!date)||(date.toString()=="Invalid Date");
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.EventArgs=function(_360,_361){
this.source=_360;
this.event=_361||nitobi.html.Event;
};
nitobi.base.EventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.base.EventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.IList=function(){
nitobi.base.ISerializable.call(this);
nitobi.collections.IEnumerable.call(this);
};
nitobi.lang.implement(nitobi.collections.IList,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.collections.IList,nitobi.collections.IEnumerable);
nitobi.collections.IList.prototype.IListImplemented=true;
nitobi.collections.IList.prototype.add=function(obj){
nitobi.collections.IEnumerable.prototype.add.call(this,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.addChildObject(obj);
}
};
nitobi.collections.IList.prototype.insert=function(_363,obj){
var _365=this.get(_363);
nitobi.collections.IEnumerable.prototype.insert.call(this,_363,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.insertBeforeChildObject(obj,_365);
}
};
nitobi.collections.IList.prototype.addToCache=function(obj,_367){
nitobi.base.ISerializable.prototype.addToCache.call(this,obj);
this.list[_367]=obj;
};
nitobi.collections.IList.prototype.removeFromCache=function(_368){
nitobi.base.ISerializable.prototype.removeFromCache.call(this,this.list[_368].getId());
};
nitobi.collections.IList.prototype.flushCache=function(){
nitobi.base.ISerializable.prototype.flushCache.call(this);
this.list=new Array();
};
nitobi.collections.IList.prototype.get=function(_369){
if(typeof (_369)=="object"){
return _369;
}
if(_369<0||_369>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
var obj=null;
if(this.list[_369]!=null){
obj=this.list[_369];
}
if(obj==null){
var _36b=nitobi.xml.getChildNodes(this.xmlNode)[_369];
if(_36b==null){
return null;
}else{
obj=this.factory.createByNode(_36b);
this.onCreateObject.notify(obj);
nitobi.collections.IList.prototype.addToCache.call(this,obj,_369);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.collections.IList.prototype.getById=function(id){
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
var _36e=nitobi.xml.indexOfChildNode(node.parentNode,node);
return this.get(_36e);
};
nitobi.collections.IList.prototype.set=function(_36f,_370){
if(_36f<0||_36f>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
try{
if(_370.ISerializableImplemented==true){
var obj=this.get(_36f);
if(obj.getXmlNode()!=_370.getXmlNode()){
var _372=this.xmlNode.insertBefore(_370.getXmlNode(),obj.getXmlNode());
this.xmlNode.removeChild(obj.getXmlNode());
obj.setXmlNode(_372);
}
}
_370.setParentObject(this);
nitobi.collections.IList.prototype.addToCache.call(this,_370,_36f);
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.collections.IList.prototype.remove=function(_373){
var i;
if(typeof (_373)!="number"){
i=this.indexOf(_373);
}else{
i=_373;
}
var obj=this.get(i);
nitobi.collections.IEnumerable.prototype.remove.call(this,_373);
this.xmlNode.removeChild(obj.getXmlNode());
};
nitobi.collections.IList.prototype.getLength=function(){
return nitobi.xml.getChildNodes(this.xmlNode).length;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.List=function(_376){
nitobi.collections.List.baseConstructor.call(this);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.collections.List,nitobi.Object);
nitobi.lang.implement(nitobi.collections.List,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.collections.List",null,false,"ntb:list"));
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.isHashEmpty=function(hash){
var _378=true;
for(var item in hash){
if(hash[item]!=null&&hash[item]!=""){
_378=false;
break;
}
}
return _378;
};
nitobi.collections.hashLength=function(hash){
var _37b=0;
for(var item in hash){
_37b++;
}
return _37b;
};
nitobi.collections.serialize=function(hash){
var s="";
for(var item in hash){
var _380=hash[item];
var type=typeof (_380);
if(type=="string"||type=="number"){
s+="'"+item+"':'"+_380+"',";
}
}
s=s.substring(0,s.length-1);
return "{"+s+"}";
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.setWaitScreen=function(_382){
if(_382){
var sc=nitobi.html.getBodyArea();
var me=nitobi.html.createElement("div",{"id":"NTB_waitDiv"},{"verticalAlign":"middle","color":"#000000","font":"12px Trebuchet MS, Georgia, Verdana","textAlign":"center","background":"#ffffff","border":"1px solid #000000","padding":"0px","position":"absolute","top":(sc.clientHeight/2)+sc.scrollTop-30+"px","left":(sc.clientWidth/2)+sc.scrollLeft-100+"px","width":"200px","height":"60px"});
me.innerHTML="<table height=60 width=200><tr><td valign=center height=60 align=center>Please wait..</td></tr></table>";
document.getElementsByTagName("body").item(0).appendChild(me);
}else{
var me=$ntb("NTB_waitDiv");
try{
document.getElementsByTagName("body").item(0).removeChild(me);
}
catch(e){
}
}
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IStyleable=function(_385){
this.htmlNode=_385||null;
this.onBeforeSetStyle=new nitobi.base.Event();
this.onSetStyle=new nitobi.base.Event();
};
nitobi.ui.IStyleable.prototype.getHtmlNode=function(){
return this.htmlNode;
};
nitobi.ui.IStyleable.prototype.setHtmlNode=function(node){
this.htmlNode=node;
};
nitobi.ui.IStyleable.prototype.setStyle=function(name,_388){
if(this.onBeforeSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onBeforeSetStyle,name,_388))&&this.getHtmlNode()!=null){
nitobi.html.Css.setStyle(this.getHtmlNode(),name,_388);
this.onSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onSetStyle,name,_388));
}
};
nitobi.ui.IStyleable.prototype.getStyle=function(name){
return nitobi.html.Css.getStyle(this.getHtmlNode(),name);
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.StyleEventArgs=function(_38a,_38b,_38c,_38d){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.property=_38c||null;
this.value=_38d||null;
};
nitobi.lang.extend(nitobi.ui.StyleEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IScrollable=function(_38e){
this.scrollableElement=_38e;
};
nitobi.ui.IScrollable.prototype.setScrollableElement=function(el){
this.scrollableElement=el;
};
nitobi.ui.IScrollable.prototype.getScrollableElement=function(){
return this.scrollableElement;
};
nitobi.ui.IScrollable.prototype.getScrollLeft=function(){
return this.scrollableElement.scrollLeft;
};
nitobi.ui.IScrollable.prototype.setScrollLeft=function(left){
this.scrollableElement.scrollLeft=left;
};
nitobi.ui.IScrollable.prototype.scrollLeft=function(_391){
_391=_391||25;
this.scrollableElement.scrollLeft-=_391;
};
nitobi.ui.IScrollable.prototype.scrollRight=function(_392){
_392=_392||25;
this.scrollableElement.scrollLeft+=_392;
};
nitobi.ui.IScrollable.prototype.isOverflowed=function(_393){
_393=_393||this.scrollableElement.childNodes[0];
return !(parseInt(nitobi.html.getBox(this.scrollableElement).width)>=parseInt(nitobi.html.getBox(_393).width));
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.startDragOperation=function(_394,_395,_396,_397,_398,_399){
var ddo=new nitobi.ui.DragDrop(_394,_396,_397);
ddo.onDragStop.subscribe(_399,_398);
ddo.startDrag(_395);
};
nitobi.ui.DragDrop=function(_39b,_39c,_39d){
this.allowVertDrag=(_39c!=null?_39c:true);
this.allowHorizDrag=(_39d!=null?_39d:true);
if(nitobi.browser.IE){
this.surface=document.getElementById("ebadragdropsurface_");
if(this.surface==null){
this.surface=nitobi.html.createElement("div",{"id":"ebadragdropsurface_"},{"filter":"alpha(opacity=1)","backgroundColor":"white","position":"absolute","display":"none","top":"0px","left":"0px","width":"100px","height":"100px","zIndex":"899"});
document.body.appendChild(this.surface);
}
}
if(_39b.nodeType==3){
alert("Text node not supported. Use parent element");
}
this.element=_39b;
this.zIndex=this.element.style.zIndex;
this.element.style.zIndex=900;
this.onMouseMove=new nitobi.base.Event();
this.onDragStart=new nitobi.base.Event();
this.onDragStop=new nitobi.base.Event();
this.events=[{"type":"mouseup","handler":this.handleMouseUp,"capture":true},{"type":"mousemove","handler":this.handleMouseMove,"capture":true}];
};
nitobi.ui.DragDrop.prototype.startDrag=function(_39e){
this.elementOriginTop=parseInt(this.element.style.top,10);
this.elementOriginLeft=parseInt(this.element.style.left,10);
if(isNaN(this.elementOriginLeft)){
this.elementOriginLeft=0;
}
if(isNaN(this.elementOriginTop)){
this.elementOriginTop=0;
}
var _39f=nitobi.html.getEventCoords(_39e);
x=_39f.x;
y=_39f.y;
this.originX=x;
this.originY=y;
nitobi.html.attachEvents(document,this.events,this);
nitobi.html.cancelEvent(_39e);
this.onDragStart.notify();
};
nitobi.ui.DragDrop.prototype.handleMouseMove=function(_3a0){
var x,y;
var _3a3=nitobi.html.getEventCoords(_3a0);
x=_3a3.x;
y=_3a3.y;
if(nitobi.browser.IE){
this.surface.style.display="block";
if(document.compat=="CSS1Compat"){
var _3a4=nitobi.html.getBodyArea();
var _3a5=0;
if(document.compatMode=="CSS1Compat"){
_3a5=25;
}
this.surface.style.width=(_3a4.clientWidth-_3a5)+"px";
this.surface.style.height=(_3a4.clientHeight)+"px";
}else{
this.surface.style.width=document.body.clientWidth;
this.surface.style.height=document.body.clientHeight;
}
}
if(this.allowHorizDrag){
this.element.style.left=(this.elementOriginLeft+x-this.originX)+"px";
}
if(this.allowVertDrag){
this.element.style.top=(this.elementOriginTop+y-this.originY)+"px";
}
this.x=x;
this.y=y;
this.onMouseMove.notify(this);
nitobi.html.cancelEvent(_3a0);
};
nitobi.ui.DragDrop.prototype.handleMouseUp=function(_3a6){
this.onDragStop.notify({"event":_3a6,"x":this.x,"y":this.y});
nitobi.html.detachEvents(document,this.events);
if(nitobi.browser.IE){
this.surface.style.display="none";
}
this.element.style.zIndex=this.zIndex;
this.element.object=null;
this.element=null;
};
if(typeof (nitobi.ajax)=="undefined"){
nitobi.ajax=function(){
};
}
nitobi.ajax.createXmlHttp=function(){
if(nitobi.browser.IE){
var _3a7=null;
try{
_3a7=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_3a7=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _3a7;
}else{
if(nitobi.browser.XHR_ENABLED){
return new XMLHttpRequest();
}
}
};
nitobi.lang.defineNs("nitobi.ajax");
nitobi.ajax.HttpRequest=function(){
this.handler="";
this.async=true;
this.responseType=null;
this.httpObj=nitobi.ajax.createXmlHttp();
this.onPostComplete=new nitobi.base.Event();
this.onGetComplete=new nitobi.base.Event();
this.onRequestComplete=new nitobi.base.Event();
this.onError=new nitobi.base.Event();
this.timeout=0;
this.timeoutId=null;
this.params=null;
this.data="";
this.completeCallback=null;
this.status="complete";
this.preventCache=true;
this.username="";
this.password="";
this.requestMethod="get";
this.requestHeaders={};
};
nitobi.lang.extend(nitobi.ajax.HttpRequest,nitobi.Object);
nitobi.ajax.HttpRequestPool_MAXCONNECTIONS=64;
nitobi.ajax.HttpRequest.prototype.handleResponse=function(){
var _3a8=null;
var _3a9=null;
if((this.httpObj.responseXML!=null&&this.httpObj.responseXML.documentElement!=null)&&this.responseType!="text"){
_3a8=this.httpObj.responseXML;
}else{
if(this.responseType=="xml"){
_3a8=nitobi.xml.createXmlDoc(this.httpObj.responseText);
}else{
_3a8=this.httpObj.responseText;
}
}
if(this.httpObj.status!=200){
this.onError.notify({"source":this,"status":this.httpObj.status,"message":"An error occured retrieving the data from the server. "+"Expected response type was '"+this.responseType+"'."});
}
return _3a8;
};
nitobi.ajax.HttpRequest.prototype.post=function(data,url){
this.data=data;
return this._send("POST",url,data,this.postComplete);
};
nitobi.ajax.HttpRequest.prototype.get=function(url){
return this._send("GET",url,null,this.getComplete);
};
nitobi.ajax.HttpRequest.prototype.postComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _3ad={"response":this.handleResponse(),"params":this.params};
this.responseXml=this.responseText=_3ad.response;
this.onPostComplete.notify(_3ad);
this.onRequestComplete.notify(_3ad);
if(this.completeCallback){
this.completeCallback.call(this,_3ad);
}
}
};
nitobi.ajax.HttpRequest.prototype.postXml=function(_3ae){
this.setTimeout();
if(("undefined"==typeof (_3ae.documentElement))||(null==_3ae.documentElement)||("undefined"==typeof (_3ae.documentElement.childNodes))||(1>_3ae.documentElement.childNodes.length)){
ebaErrorReport("updategram is empty. No request sent. xmlData["+_3ae+"]\nxmlData.xml["+_3ae.xml+"]");
return;
}
if(null==_3ae.xml){
var _3af=new XMLSerializer();
_3ae.xml=_3af.serializeToString(_3ae);
}
return this.post(_3ae.xml);
};
nitobi.ajax.HttpRequest.prototype._send=function(_3b0,url,data,_3b3){
this.handler=url||this.handler;
this.setTimeout();
this.status="pending";
this.httpObj.open(_3b0,(this.preventCache?this.cacheBust(this.handler):this.handler),this.async,this.username,this.password);
if(this.async){
this.httpObj.onreadystatechange=nitobi.lang.close(this,_3b3);
}
for(var item in this.requestHeaders){
this.httpObj.setRequestHeader(item,this.requestHeaders[item]);
}
if(this.responseType=="xml"){
this.httpObj.setRequestHeader("Content-Type","text/xml");
}else{
if(_3b0.toLowerCase()=="post"){
this.httpObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
}
this.httpObj.send(data);
if(!this.async){
return this.handleResponse();
}
return this.httpObj;
};
nitobi.ajax.HttpRequest.prototype.open=function(_3b5,url,_3b7,_3b8,_3b9){
this.requestMethod=_3b5;
this.async=_3b7;
this.username=_3b8;
this.password=_3b9;
this.handler=url;
};
nitobi.ajax.HttpRequest.prototype.send=function(data){
var _3bb=null;
switch(this.requestMethod.toUpperCase()){
case "POST":
_3bb=this.post(data);
break;
default:
_3bb=this.get();
break;
}
this.responseXml=this.responseText=_3bb;
};
nitobi.ajax.HttpRequest.prototype.setTimeout=function(){
if(this.timeout>0){
this.timeoutId=window.setTimeout(nitobi.lang.close(this,this.abort),this.timeout);
}
};
nitobi.ajax.HttpRequest.prototype.getComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _3bc={"response":this.handleResponse(),"params":this.params,"status":this.httpObj.status,"statusText":this.httpObj.statusText};
this.responseXml=this.responseText=_3bc.response;
this.onGetComplete.notify(_3bc);
this.onRequestComplete.notify(_3bc);
if(this.completeCallback){
this.completeCallback.call(this,_3bc);
}
}
};
nitobi.ajax.HttpRequest.prototype.setRequestHeader=function(_3bd,val){
this.requestHeaders[_3bd]=val;
};
nitobi.ajax.HttpRequest.prototype.isError=function(code){
return (code>=400&&code<600);
};
nitobi.ajax.HttpRequest.prototype.abort=function(){
this.httpObj.onreadystatechange=function(){
};
this.httpObj.abort();
};
nitobi.ajax.HttpRequest.prototype.clear=function(){
this.handler="";
this.async=true;
this.onPostComplete.dispose();
this.onGetComplete.dispose();
this.params=null;
};
nitobi.ajax.HttpRequest.prototype.cacheBust=function(url){
var _3c1=url.split("?");
var _3c2="nitobi_cachebust="+(new Date().getTime());
if(_3c1.length==1){
url+="?"+_3c2;
}else{
url+="&"+_3c2;
}
return url;
};
nitobi.ajax.HttpRequestPool=function(_3c3){
this.inUse=new Array();
this.free=new Array();
this.max=_3c3||nitobi.ajax.HttpRequestPool_MAXCONNECTIONS;
this.locked=false;
this.context=null;
};
nitobi.ajax.HttpRequestPool.prototype.reserve=function(){
this.locked=true;
var _3c4;
if(this.free.length){
_3c4=this.free.pop();
_3c4.clear();
this.inUse.push(_3c4);
}else{
if(this.inUse.length<this.max){
try{
_3c4=new nitobi.ajax.HttpRequest();
}
catch(e){
_3c4=null;
}
this.inUse.push(_3c4);
}else{
throw "No request objects available";
}
}
this.locked=false;
return _3c4;
};
nitobi.ajax.HttpRequestPool.prototype.release=function(_3c5){
var _3c6=false;
this.locked=true;
if(null!=_3c5){
for(var i=0;i<this.inUse.length;i++){
if(_3c5==this.inUse[i]){
this.free.push(this.inUse[i]);
this.inUse.splice(i,1);
_3c6=true;
break;
}
}
}
this.locked=false;
return null;
};
nitobi.ajax.HttpRequestPool.prototype.dispose=function(){
for(var i=0;i<this.inUse.length;i++){
this.inUse[i].dispose();
}
this.inUse=null;
for(var j=0;j<this.free.length;j++){
this.free[i].dispose();
}
this.free=null;
};
nitobi.ajax.HttpRequestPool.instance=null;
nitobi.ajax.HttpRequestPool.getInstance=function(){
if(nitobi.ajax.HttpRequestPool.instance==null){
nitobi.ajax.HttpRequestPool.instance=new nitobi.ajax.HttpRequestPool();
}
return nitobi.ajax.HttpRequestPool.instance;
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.UrlConnector=function(url,_3cb){
this.url=url||null;
this.transformer=_3cb||null;
this.async=true;
};
nitobi.data.UrlConnector.prototype.get=function(_3cc,_3cd){
this.request=nitobi.data.UrlConnector.requestPool.reserve();
var _3ce=this.url;
for(var p in _3cc){
_3ce=nitobi.html.Url.setParameter(_3ce,p,_3cc[p]);
}
this.request.handler=_3ce;
this.request.async=this.async;
this.request.responseType="xml";
this.request.params={dataReadyCallback:_3cd};
this.request.completeCallback=nitobi.lang.close(this,this.getComplete);
this.request.get();
};
nitobi.data.UrlConnector.prototype.getComplete=function(_3d0){
if(_3d0.params.dataReadyCallback){
var _3d1=_3d0.response;
var _3d2=_3d0.params.dataReadyCallback;
var _3d3=_3d1;
if(this.transformer){
if(typeof (this.transformer)==="function"){
_3d3=this.transformer.call(null,_3d1);
}else{
_3d3=nitobi.xml.transform(_3d1,this.transformer,"xml");
}
}
if(_3d2){
_3d2.call(null,{result:_3d3,response:_3d0.response});
}
}
nitobi.data.UrlConnector.requestPool.release(this.request);
};
nitobi.data.UrlConnector.requestPool=new nitobi.ajax.HttpRequestPool();
function ntbAssert(_3d4,_3d5,_3d6,_3d7){
}
nitobi.lang.defineNs("console");
nitobi.lang.defineNs("nitobi.debug");
if(typeof (console.log)=="undefined"){
console.log=function(s){
nitobi.debug.addDebugTools();
var t=$ntb("nitobi.log");
t.value=s+"\n"+t.value;
};
console.evalCode=function(){
var _3da=(eval($ntb("nitobi.consoleEntry").value));
};
}
nitobi.debug.addDebugTools=function(){
var sId="nitobi_debug_panel";
var div=document.getElementById(sId);
var html="<table width=100%><tr><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.log'></textarea></td><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.consoleEntry'></textarea><br/><button onclick='console.evalCode()'>Eval</button></td></tr></table>";
if(div==null){
var div=document.createElement("div");
div.setAttribute("id",sId);
div.innerHTML=html;
document.body.appendChild(div);
}else{
if(div.innerHTML==""){
div.innerHTML=html;
}
}
};
nitobi.debug.assert=function(){
};
EBA_EM_ATTRIBUTE_ERROR=1;
EBA_XHR_RESPONSE_ERROR=2;
EBA_DEBUG="debug";
EBA_WARN="warn";
EBA_ERROR="error";
EBA_THROW="throw";
EBA_DEBUG_MODE=false;
EBA_ON_ERROR="";
EBA_LAST_ERROR="";
_ebaDebug=false;
NTB_EM_ATTRIBUTE_ERROR=1;
NTB_XHR_RESPONSE_ERROR=2;
NTB_DEBUG="debug";
NTB_WARN="warn";
NTB_ERROR="error";
NTB_THROW="throw";
NTB_DEBUG_MODE=false;
NTB_ON_ERROR="";
NTB_LAST_ERROR="";
_ebaDebug=false;
function _ntbAssert(_3de,_3df){
ntbAssert(_3de,_3df,"",DEBUG);
}
function ebaSetOnErrorEvent(_3e0){
nitobi.debug.setOnErrorEvent.apply(this,arguments);
}
nitobi.debug.setOnErrorEvent=function(_3e1){
NTB_ON_ERROR=_3e1;
};
function ebaReportError(_3e2,_3e3,_3e4){
nitobi.debug.errorReport("dude stop calling this method it is now called nitobi.debug.errorReport","");
nitobi.debug.errorReport(_3e2,_3e3,_3e4);
}
function ebaErrorReport(_3e5,_3e6,_3e7){
nitobi.debug.errorReport.apply(this,arguments);
}
nitobi.debug.errorReport=function(_3e8,_3e9,_3ea){
_3ea=(_3ea)?_3ea:NTB_DEBUG;
if(NTB_DEBUG==_3ea&&!NTB_DEBUG_MODE){
return;
}
var _3eb=_3e8+"\nerror code    ["+_3e9+"]\nerror Severity["+_3ea+"]";
LastError=_3eb;
if(eval(NTB_ON_ERROR||"true")){
switch(_3e9){
case NTB_EM_ATTRIBUTE_ERROR:
confirm(_3e8);
break;
case NTB_XHR_RESPONSE_ERROR:
confirm(_3e8);
break;
default:
window.status=_3e8;
break;
}
}
if(NTB_THROW==_3ea){
throw (_3eb);
}
};
if(false){
nitobi.error=function(){
};
}
nitobi.lang.defineNs("nitobi.error");
nitobi.error.onError=new nitobi.base.Event();
if(nitobi){
if(nitobi.testframework){
if(nitobi.testframework.initEventError){
nitobi.testframework.initEventError();
}
}
}
nitobi.error.ErrorEventArgs=function(_3ec,_3ed,type){
nitobi.error.ErrorEventArgs.baseConstructor.call(this,_3ec);
this.description=_3ed;
this.type=type;
};
nitobi.lang.extend(nitobi.error.ErrorEventArgs,nitobi.base.EventArgs);
nitobi.error.isError=function(err,_3f0){
return (err.indexOf(_3f0)>-1);
};
nitobi.error.OutOfBounds="Array index out of bounds.";
nitobi.error.Unexpected="An unexpected error occurred.";
nitobi.error.ArgExpected="The argument is null and not optional.";
nitobi.error.BadArgType="The argument is not of the correct type.";
nitobi.error.BadArg="The argument is not a valid value.";
nitobi.error.XmlParseError="The XML did not parse correctly.";
nitobi.error.DeclarationParseError="The HTML declaration could not be parsed.";
nitobi.error.ExpectedInterfaceNotFound="The object does not support the properties or methods of the expected interface. Its class must implement the required interface.";
nitobi.error.NoHtmlNode="No HTML node found with id.";
nitobi.error.OrphanXmlNode="The XML node has no owner document.";
nitobi.error.HttpRequestError="The HTML page could not be loaded.";
nitobi.lang.defineNs("nitobi.html");
nitobi.html.IRenderer=function(_3f1){
this.setTemplate(_3f1);
this.parameters={};
};
nitobi.html.IRenderer.prototype.renderAfter=function(_3f2,data){
_3f2=$ntb(_3f2);
var _3f4=_3f2.parentNode;
_3f2=_3f2.nextSibling;
return this._renderBefore(_3f4,_3f2,data);
};
nitobi.html.IRenderer.prototype.renderBefore=function(_3f5,data){
_3f5=$ntb(_3f5);
return this._renderBefore(_3f5.parentNode,_3f5,data);
};
nitobi.html.IRenderer.prototype._renderBefore=function(_3f7,_3f8,data){
var s=this.renderToString(data);
var _3fb=document.createElement("div");
_3fb.innerHTML=s;
var _3fc=new Array();
if(_3fb.childNodes){
var i=0;
while(_3fb.childNodes.length){
_3fc[i++]=_3fb.firstChild;
_3f7.insertBefore(_3fb.firstChild,_3f8);
}
}else{
}
return _3fc;
};
nitobi.html.IRenderer.prototype.renderIn=function(_3fe,data){
_3fe=$ntb(_3fe);
var s=this.renderToString(data);
_3fe.innerHTML=s;
return _3fe.childNodes;
};
nitobi.html.IRenderer.prototype.renderToString=function(data){
};
nitobi.html.IRenderer.prototype.setTemplate=function(_402){
this.template=_402;
};
nitobi.html.IRenderer.prototype.getTemplate=function(){
return this.template;
};
nitobi.html.IRenderer.prototype.setParameters=function(_403){
for(var p in _403){
this.parameters[p]=_403[p];
}
};
nitobi.html.IRenderer.prototype.getParameters=function(){
return this.parameters;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.XslRenderer=function(_405){
nitobi.html.IRenderer.call(this,_405);
};
nitobi.lang.implement(nitobi.html.XslRenderer,nitobi.html.IRenderer);
nitobi.html.XslRenderer.prototype.setTemplate=function(_406){
if(typeof (_406)==="string"){
_406=nitobi.xml.createXslProcessor(_406);
}
this.template=_406;
};
nitobi.html.XslRenderer.prototype.renderToString=function(data){
if(typeof (data)==="string"){
data=nitobi.xml.createXmlDoc(data);
}
if(nitobi.lang.typeOf(data)===nitobi.lang.type.XMLNODE){
data=nitobi.xml.createXmlDoc(nitobi.xml.serialize(data));
}
var _408=this.getTemplate();
var _409=this.getParameters();
for(var p in _409){
_408.addParameter(p,_409[p],"");
}
var s=nitobi.xml.transformToString(data,_408,"xml");
for(var p in _409){
_408.addParameter(p,"","");
}
return s;
};
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_HIDE="nitobi-hide";
nitobi.ui.Element=function(id){
nitobi.ui.Element.baseConstructor.call(this);
nitobi.ui.IStyleable.call(this);
if(id!=null){
if(nitobi.lang.typeOf(id)==nitobi.lang.type.XMLNODE){
nitobi.base.ISerializable.call(this,id);
}else{
if($ntb(id)!=null){
var decl=new nitobi.base.Declaration();
var _40e=decl.loadHtml($ntb(id));
var _40f=$ntb(id);
var _410=_40f.parentNode;
var _411=_410.ownerDocument.createElement("ntb:component");
_410.insertBefore(_411,_40f);
_410.removeChild(_40f);
this.setContainer(_411);
nitobi.base.ISerializable.call(this,_40e);
}else{
nitobi.base.ISerializable.call(this);
this.setId(id);
}
}
}else{
nitobi.base.ISerializable.call(this);
}
this.eventMap={};
this.onCreated=new nitobi.base.Event("created");
this.eventMap["created"]=this.onCreated;
this.onBeforeRender=new nitobi.base.Event("beforerender");
this.eventMap["beforerender"]=this.onBeforeRender;
this.onRender=new nitobi.base.Event("render");
this.eventMap["render"]=this.onRender;
this.onBeforeSetVisible=new nitobi.base.Event("beforesetvisible");
this.eventMap["beforesetvisible"]=this.onBeforeSetVisible;
this.onSetVisible=new nitobi.base.Event("setvisible");
this.eventMap["setvisible"]=this.onSetVisible;
this.onBeforePropagate=new nitobi.base.Event("beforepropagate");
this.onEventNotify=new nitobi.base.Event("eventnotify");
this.onBeforeEventNotify=new nitobi.base.Event("beforeeventnotify");
this.onBeforePropagateToChild=new nitobi.base.Event("beforepropogatetochild");
this.subscribeDeclarationEvents();
this.setEnabled(true);
this.renderer=new nitobi.html.XslRenderer();
};
nitobi.lang.extend(nitobi.ui.Element,nitobi.Object);
nitobi.lang.implement(nitobi.ui.Element,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.ui.Element,nitobi.ui.IStyleable);
nitobi.ui.Element.htmlNodeCache={};
nitobi.ui.Element.prototype.setHtmlNode=function(_412){
var node=$ntb(_412);
this.htmlNode=node;
};
nitobi.ui.Element.prototype.getRootId=function(){
var _414=this.getParentObject();
if(_414==null){
return this.getId();
}else{
return _414.getRootId();
}
};
nitobi.ui.Element.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.ui.Element.parseId=function(id){
var ids=id.split(".");
if(ids.length<=2){
return {localName:ids[1],id:ids[0]};
}
return {localName:ids.pop(),id:ids.join(".")};
};
nitobi.ui.Element.prototype.setId=function(id){
this.setAttribute("id",id);
};
nitobi.ui.Element.prototype.notify=function(_418,id,_41a,_41b){
try{
_418=nitobi.html.getEvent(_418);
if(_41b!==false){
nitobi.html.cancelEvent(_418);
}
var _41c=nitobi.ui.Element.parseId(id).id;
if(!this.isDescendantExists(_41c)){
return false;
}
var _41d=!(_41c==this.getId());
var _41e=new nitobi.ui.ElementEventArgs(this,null,id);
var _41f=new nitobi.ui.EventNotificationEventArgs(this,null,id,_418);
_41d=_41d&&this.onBeforePropagate.notify(_41f);
var _420=true;
if(_41d){
if(_41a==null){
_41a=this.getPathToLeaf(_41c);
}
var _421=this.onBeforeEventNotify.notify(_41f);
var _422=(_421?this.onEventNotify.notify(_41f):true);
var _423=_41a.pop().getAttribute("id");
var _424=this.getObjectById(_423);
var _420=this.onBeforePropagateToChild.notify(_41f);
if(_424.notify&&_420&&_422){
_420=_424.notify(_418,id,_41a,_41b);
}
}else{
_420=this.onEventNotify.notify(_41f);
}
var _425=this.eventMap[_418.type];
if(_425!=null&&_420){
_425.notify(this.getEventArgs(_418,id));
}
return _420;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected+" Element.notify encountered a problem.",err);
}
};
nitobi.ui.Element.prototype.getEventArgs=function(_426,_427){
var _428=new nitobi.ui.ElementEventArgs(this,null,_427);
return _428;
};
nitobi.ui.Element.prototype.subscribeDeclarationEvents=function(){
for(var name in this.eventMap){
var ev=this.getAttribute("on"+name);
if(ev!=null&&ev!=""){
this.eventMap[name].subscribe(ev,this,name);
}
}
};
nitobi.ui.Element.prototype.getHtmlNode=function(name){
var id=this.getId();
id=(name!=null?id+"."+name:id);
var node=nitobi.ui.Element.htmlNodeCache[name];
if(node==null){
node=$ntb(id);
nitobi.ui.Element.htmlNodeCache[id]=node;
}
return node;
};
nitobi.ui.Element.prototype.flushHtmlNodeCache=function(){
nitobi.ui.Element.htmlNodeCache={};
};
nitobi.ui.Element.prototype.hide=function(_42e,_42f,_430){
this.setVisible(false,_42e,_42f,_430);
};
nitobi.ui.Element.prototype.show=function(_431,_432,_433){
this.setVisible(true,_431,_432,_433);
};
nitobi.ui.Element.prototype.isVisible=function(){
var node=this.getHtmlNode();
return node&&!nitobi.html.Css.hasClass(node,NTB_CSS_HIDE);
};
nitobi.ui.Element.prototype.setVisible=function(_435,_436,_437,_438){
var _439=this.getHtmlNode();
if(_439&&this.isVisible()!=_435&&this.onBeforeSetVisible.notify({source:this,event:this.onBeforeSetVisible,args:arguments})!==false){
if(this.effect){
this.effect.end();
}
if(_435){
if(_436){
var _43a=new _436(_439,_438);
_43a.callback=nitobi.lang.close(this,this.handleSetVisible,[_437]);
this.effect=_43a;
_43a.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_43a.start();
}else{
nitobi.html.Css.removeClass(_439,NTB_CSS_HIDE);
this.handleSetVisible(_437);
}
}else{
if(_436){
var _43a=new _436(_439,_438);
_43a.callback=nitobi.lang.close(this,this.handleSetVisible,[_437]);
this.effect=_43a;
_43a.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_43a.start();
}else{
nitobi.html.Css.addClass(this.getHtmlNode(),NTB_CSS_HIDE);
this.handleSetVisible(_437);
}
}
}
};
nitobi.ui.Element.prototype.handleSetVisible=function(_43b){
if(_43b){
_43b();
}
this.onSetVisible.notify(new nitobi.ui.ElementEventArgs(this,this.onSetVisible));
};
nitobi.ui.Element.prototype.setEnabled=function(_43c){
this.enabled=_43c;
};
nitobi.ui.Element.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.ui.Element.prototype.render=function(_43d,_43e){
this.flushHtmlNodeCache();
_43e=_43e||this.getState();
_43d=$ntb(_43d)||this.getContainer();
if(_43d==null){
var _43d=document.createElement("span");
document.body.appendChild(_43d);
this.setContainer(_43d);
}
this.htmlNode=this.renderer.renderIn(_43d,_43e)[0];
this.htmlNode.jsObject=this;
};
nitobi.ui.Element.prototype.getContainer=function(){
return this.container;
};
nitobi.ui.Element.prototype.setContainer=function(_43f){
this.container=$ntb(_43f);
};
nitobi.ui.Element.prototype.getState=function(){
return this.getXmlNode();
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.ElementEventArgs=function(_440,_441,_442){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.targetId=_442||null;
};
nitobi.lang.extend(nitobi.ui.ElementEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.EventNotificationEventArgs=function(_443,_444,_445,_446){
nitobi.ui.EventNotificationEventArgs.baseConstructor.apply(this,arguments);
this.htmlEvent=_446||null;
};
nitobi.lang.extend(nitobi.ui.EventNotificationEventArgs,nitobi.ui.ElementEventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Container=function(id){
nitobi.ui.Container.baseConstructor.call(this,id);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.ui.Container,nitobi.ui.Element);
nitobi.lang.implement(nitobi.ui.Container,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.ui.Container",null,false,"ntb:container"));
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_SMALL="ntb-effects-small";
NTB_CSS_HIDE="nitobi-hide";
if(false){
nitobi.ui.Effects=function(){
};
}
nitobi.ui.Effects={};
nitobi.ui.Effects.setVisible=function(_448,_449,_44a,_44b,_44c){
_44b=(_44c?nitobi.lang.close(_44c,_44b):_44b)||nitobi.lang.noop;
_448=$ntb(_448);
if(typeof _44a=="string"){
_44a=nitobi.effects.families[_44a];
}
if(!_44a){
_44a=nitobi.effects.families["none"];
}
if(_449){
var _44d=_44a.show;
}else{
var _44d=_44a.hide;
}
if(_44d){
var _44e=new _44d(_448);
_44e.callback=_44b;
_44e.start();
}else{
if(_449){
nitobi.html.Css.removeClass(_448,NTB_CSS_HIDE);
}else{
nitobi.html.Css.addClass(_448,NTB_CSS_HIDE);
}
_44b();
}
};
nitobi.ui.Effects.shrink=function(_44f,_450,_451,_452){
var rect=nitobi.html.getClientRects(_450)[0];
_44f.deltaHeight_Doctype=0-parseInt("0"+nitobi.html.getStyle(_450,"border-top-width"))-parseInt("0"+nitobi.html.getStyle(_450,"border-bottom-width"))-parseInt("0"+nitobi.html.getStyle(_450,"padding-top"))-parseInt("0"+nitobi.html.getStyle(_450,"padding-bottom"));
_44f.deltaWidth_Doctype=0-parseInt("0"+nitobi.html.getStyle(_450,"border-left-width"))-parseInt("0"+nitobi.html.getStyle(_450,"border-right-width"))-parseInt("0"+nitobi.html.getStyle(_450,"padding-left"))-parseInt("0"+nitobi.html.getStyle(_450,"padding-right"));
_44f.oldHeight=Math.abs(rect.top-rect.bottom)+_44f.deltaHeight_Doctype;
_44f.oldWidth=Math.abs(rect.right-rect.left)+_44f.deltaWidth_Doctype;
if(!(typeof (_44f.width)=="undefined")){
_44f.deltaWidth=Math.floor(Math.ceil(_44f.width-_44f.oldWidth)/(_451/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_44f.width=_44f.oldWidth;
_44f.deltaWidth=0;
}
if(!(typeof (_44f.height)=="undefined")){
_44f.deltaHeight=Math.floor(Math.ceil(_44f.height-_44f.oldHeight)/(_451/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_44f.height=_44f.oldHeight;
_44f.deltaHeight=0;
}
nitobi.ui.Effects.resize(_44f,_450,_451,_452);
};
nitobi.ui.Effects.resize=function(_454,_455,_456,_457){
var rect=nitobi.html.getClientRects(_455)[0];
var _459=Math.abs(rect.top-rect.bottom);
var _45a=Math.max(_459+_454.deltaHeight+_454.deltaHeight_Doctype,0);
if(Math.abs(_459-_454.height)<Math.abs(_454.deltaHeight)){
_45a=_454.height;
_454.deltaHeight=0;
}
var _45b=Math.abs(rect.right-rect.left);
var _45c=Math.max(_45b+_454.deltaWidth+_454.deltaWidth_Doctype,0);
_45c=(_45c>=0)?_45c:0;
if(Math.abs(_45b-_454.width)<Math.abs(_454.deltaWidth)){
_45c=_454.width;
_454.deltaWidth=0;
}
_456-=nitobi.ui.Effects.ANIMATION_INTERVAL;
if(_456>0){
window.setTimeout(nitobi.lang.closeLater(this,nitobi.ui.Effects.resize,[_454,_455,_456,_457]),nitobi.ui.Effects.ANIMATION_INTERVAL);
}
var _45d=function(){
_455.height=_45a+"px";
_455.style.height=_45a+"px";
_455.width=_45c+"px";
_455.style.width=_45c+"px";
if(_456<=0){
if(_457){
window.setTimeout(_457,0);
}
}
};
nitobi.ui.Effects.executeNextPulse.push(_45d);
};
nitobi.ui.Effects.executeNextPulse=new Array();
nitobi.ui.Effects.pulse=function(){
var p;
while(p=nitobi.ui.Effects.executeNextPulse.pop()){
p.call();
}
};
nitobi.ui.Effects.PULSE_INTERVAL=20;
nitobi.ui.Effects.ANIMATION_INTERVAL=40;
window.setInterval(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
window.setTimeout(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
nitobi.ui.Effects.fadeIntervalId={};
nitobi.ui.Effects.fadeIntervalTime=10;
nitobi.ui.Effects.cube=function(_45f){
return _45f*_45f*_45f;
};
nitobi.ui.Effects.cubeRoot=function(_460){
var T=0;
var N=parseFloat(_460);
if(N<0){
N=-N;
T=1;
}
var M=Math.sqrt(N);
var ctr=1;
while(ctr<101){
var M=M*N;
var M=Math.sqrt(Math.sqrt(M));
ctr++;
}
return M;
};
nitobi.ui.Effects.linear=function(_465){
return _465;
};
nitobi.ui.Effects.fade=function(_466,_467,time,_469,_46a){
_46a=_46a||nitobi.ui.Effects.linear;
var _46b=(new Date()).getTime()+time;
var id=nitobi.component.getUniqueId();
var _46d=(new Date()).getTime();
var el=_466;
if(_466.length){
el=_466[0];
}
var _46f=nitobi.html.Css.getOpacity(el);
var _470=(_467-_46f<0?-1:0);
nitobi.ui.Effects.fadeIntervalId[id]=window.setInterval(function(){
nitobi.ui.Effects.stepFade(_466,_467,_46d,_46b,id,_469,_46a,_470);
},nitobi.ui.Effects.fadeIntervalTime);
};
nitobi.ui.Effects.stepFade=function(_471,_472,_473,_474,id,_476,_477,_478){
var ct=(new Date()).getTime();
var _47a=_474-_473;
var nct=((ct-_473)/(_474-_473));
if(nct<=0||nct>=1){
nitobi.html.Css.setOpacities(_471,_472);
window.clearInterval(nitobi.ui.Effects.fadeIntervalId[id]);
_476();
return;
}else{
nct=Math.abs(nct+_478);
}
var no=_477(nct);
nitobi.html.Css.setOpacities(_471,no*100);
};
nitobi.lang.defineNs("nitobi.component");
if(false){
nitobi.component=function(){
};
}
nitobi.loadComponent=function(el){
var id=el;
el=$ntb(el);
if(el==null){
nitobi.lang.throwError("nitobi.loadComponent could not load the component because it could not be found on the page. The component may not have a declaration, node, or it may have a duplicated id. Id: "+id);
}
if(el.jsObject!=null){
return el.jsObject;
}
var _47f;
var _480=nitobi.html.getTagName(el);
if(_480=="ntb:grid"){
_47f=nitobi.initGrid(el.id);
}else{
if(_480==="ntb:combo"){
_47f=nitobi.initCombo(el.id);
}else{
if(_480=="ntb:treegrid"){
_47f=nitobi.initTreeGrid(el.id);
}else{
if(el.jsObject==null){
_47f=nitobi.base.Factory.getInstance().createByTag(_480,el.id,nitobi.component.renderComponent);
if(_47f.render&&!_47f.onLoadCallback){
_47f.render();
}
}else{
_47f=el.jsObject;
}
}
}
}
return _47f;
};
nitobi.component.renderComponent=function(_481){
_481.source.render();
};
nitobi.getComponent=function(id){
var el=$ntb(id);
if(el==null){
return null;
}
return el.jsObject;
};
nitobi.component.uniqueId=0;
nitobi.component.getUniqueId=function(){
return "ntbcmp_"+(nitobi.component.uniqueId++);
};
nitobi.getComponents=function(_484,_485){
if(_485==null){
_485=[];
}
if(nitobi.component.isNitobiElement(_484)){
_485.push(_484);
return;
}
var _486=_484.childNodes;
for(var i=0;i<_486.length;i++){
nitobi.getComponents(_486[i],_485);
}
return _485;
};
nitobi.component.isNitobiElement=function(_488){
var _489=nitobi.html.getTagName(_488);
if(_489.substr(0,3)=="ntb"){
return true;
}else{
return false;
}
};
nitobi.component.loadComponentsFromNode=function(_48a){
var _48b=new Array();
nitobi.getComponents(_48a,_48b);
for(var i=0;i<_48b.length;i++){
nitobi.loadComponent(_48b[i].getAttribute("id"));
}
};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects=function(){
};
}
nitobi.effects.Effect=function(_48d,_48e){
this.element=$ntb(_48d);
this.transition=_48e.transition||nitobi.effects.Transition.sinoidal;
this.duration=_48e.duration||1;
this.fps=_48e.fps||50;
this.from=typeof (_48e.from)==="number"?_48e.from:0;
this.to=typeof (_48e.from)==="number"?_48e.to:1;
this.delay=_48e.delay||0;
this.callback=typeof (_48e.callback)==="function"?_48e.callback:nitobi.lang.noop;
this.queue=_48e.queue||nitobi.effects.EffectQueue.globalQueue;
this.onBeforeFinish=new nitobi.base.Event();
this.onFinish=new nitobi.base.Event();
this.onBeforeStart=new nitobi.base.Event();
};
nitobi.effects.Effect.prototype.start=function(){
var now=new Date().getTime();
this.startOn=now+this.delay*1000;
this.finishOn=this.startOn+this.duration*1000;
this.deltaTime=this.duration*1000;
this.totalFrames=this.duration*this.fps;
this.frame=0;
this.delta=this.from-this.to;
this.queue.add(this);
};
nitobi.effects.Effect.prototype.render=function(pos){
if(!this.running){
this.onBeforeStart.notify(new nitobi.base.EventArgs(this,this.onBeforeStart));
this.setup();
this.running=true;
}
this.update(this.transition(pos*this.delta+this.from));
};
nitobi.effects.Effect.prototype.step=function(now){
if(this.startOn<=now){
if(now>=this.finishOn){
this.end();
return;
}
var pos=(now-this.startOn)/(this.deltaTime);
var _493=Math.floor(pos*this.totalFrames);
if(this.frame<_493){
this.render(pos);
this.frame=_493;
}
}
};
nitobi.effects.Effect.prototype.setup=function(){
};
nitobi.effects.Effect.prototype.update=function(pos){
};
nitobi.effects.Effect.prototype.finish=function(){
};
nitobi.effects.Effect.prototype.end=function(){
this.onBeforeFinish.notify(new nitobi.base.EventArgs(this,this.onBeforeFinish));
this.cancel();
this.render(1);
this.running=false;
this.finish();
this.callback();
this.onFinish.notify(new nitobi.base.EventArgs(this,this.onAfterFinish));
};
nitobi.effects.Effect.prototype.cancel=function(){
this.queue.remove(this);
};
nitobi.effects.factory=function(_495,_496,etc){
var args=nitobi.lang.toArray(arguments,2);
return function(_499){
var f=function(){
_495.apply(this,[_499,_496].concat(args));
};
nitobi.lang.extend(f,_495);
return new f();
};
};
nitobi.effects.families={none:{show:null,hide:null}};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects.Transition=function(){
};
}
nitobi.effects.Transition={};
nitobi.effects.Transition.sinoidal=function(x){
return (-Math.cos(x*Math.PI)/2)+0.5;
};
nitobi.effects.Transition.linear=function(x){
return x;
};
nitobi.effects.Transition.reverse=function(x){
return 1-x;
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.Scale=function(_49e,_49f,_4a0){
nitobi.effects.Scale.baseConstructor.call(this,_49e,_49f);
this.scaleX=typeof (_49f.scaleX)=="boolean"?_49f.scaleX:true;
this.scaleY=typeof (_49f.scaleY)=="boolean"?_49f.scaleY:true;
this.scaleFrom=typeof (_49f.scaleFrom)=="number"?_49f.scaleFrom:100;
this.scaleTo=_4a0;
};
nitobi.lang.extend(nitobi.effects.Scale,nitobi.effects.Effect);
nitobi.effects.Scale.prototype.setup=function(){
var _4a1=this.element.style;
var Css=nitobi.html.Css;
this.originalStyle={"top":_4a1.top,"left":_4a1.left,"width":_4a1.width,"height":_4a1.height,"overflow":Css.getStyle(this.element,"overflow")};
this.factor=(this.scaleTo-this.scaleFrom)/100;
this.dims=[this.element.scrollWidth,this.element.scrollHeight];
_4a1.width=this.dims[0]+"px";
_4a1.height=this.dims[1]+"px";
Css.setStyle(this.element,"overflow","hidden");
};
nitobi.effects.Scale.prototype.finish=function(){
for(var s in this.originalStyle){
this.element.style[s]=this.originalStyle[s];
}
};
nitobi.effects.Scale.prototype.update=function(pos){
var _4a5=(this.scaleFrom/100)+(this.factor*pos);
this.setDimensions(Math.floor(_4a5*this.dims[0])||1,Math.floor(_4a5*this.dims[1])||1);
};
nitobi.effects.Scale.prototype.setDimensions=function(x,y){
if(this.scaleX){
this.element.style.width=x+"px";
}
if(this.scaleY){
this.element.style.height=y+"px";
}
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.EffectQueue=function(){
nitobi.effects.EffectQueue.baseConstructor.call(this);
nitobi.collections.IEnumerable.call(this);
this.intervalId=0;
};
nitobi.lang.extend(nitobi.effects.EffectQueue,nitobi.Object);
nitobi.lang.implement(nitobi.effects.EffectQueue,nitobi.collections.IEnumerable);
nitobi.effects.EffectQueue.prototype.add=function(_4a8){
nitobi.collections.IEnumerable.prototype.add.call(this,_4a8);
if(!this.intervalId){
this.intervalId=window.setInterval(nitobi.lang.close(this,this.step),15);
}
};
nitobi.effects.EffectQueue.prototype.step=function(){
var now=new Date().getTime();
this.each(function(e){
e.step(now);
});
};
nitobi.effects.EffectQueue.globalQueue=new nitobi.effects.EffectQueue();
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.BlindUp=function(_4ab,_4ac){
_4ac=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_4ab.scrollHeight/100),0.5)},_4ac||{});
nitobi.effects.BlindUp.baseConstructor.call(this,_4ab,_4ac,0);
};
nitobi.lang.extend(nitobi.effects.BlindUp,nitobi.effects.Scale);
nitobi.effects.BlindUp.prototype.setup=function(){
nitobi.effects.BlindUp.base.setup.call(this);
};
nitobi.effects.BlindUp.prototype.finish=function(){
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
nitobi.effects.BlindUp.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.BlindDown=function(_4ad,_4ae){
nitobi.html.Css.swapClass(_4ad,NTB_CSS_HIDE,NTB_CSS_SMALL);
_4ae=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_4ad.scrollHeight/100),0.5)},_4ae||{});
nitobi.effects.BlindDown.baseConstructor.call(this,_4ad,_4ae,100);
};
nitobi.lang.extend(nitobi.effects.BlindDown,nitobi.effects.Scale);
nitobi.effects.BlindDown.prototype.setup=function(){
nitobi.effects.BlindDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
};
nitobi.effects.BlindDown.prototype.finish=function(){
nitobi.effects.BlindDown.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.families.blind={show:nitobi.effects.BlindDown,hide:nitobi.effects.BlindUp};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.ShadeUp=function(_4af,_4b0){
_4b0=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_4af.scrollHeight/100),0.3)},_4b0||{});
nitobi.effects.ShadeUp.baseConstructor.call(this,_4af,_4b0,0);
};
nitobi.lang.extend(nitobi.effects.ShadeUp,nitobi.effects.Scale);
nitobi.effects.ShadeUp.prototype.setup=function(){
nitobi.effects.ShadeUp.base.setup.call(this);
var _4b1=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_4b1){
var _4b2=_4b1.style;
this.fnodeStyle={position:_4b2.position,bottom:_4b2.bottom,left:_4b2.left};
this.fnode=_4b1;
_4b2.position="absolute";
_4b2.bottom="0px";
_4b2.left="0px";
_4b2.top="";
}
};
nitobi.effects.ShadeUp.prototype.finish=function(){
nitobi.effects.ShadeUp.base.finish.call(this);
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
};
nitobi.effects.ShadeDown=function(_4b4,_4b5){
nitobi.html.Css.swapClass(_4b4,NTB_CSS_HIDE,NTB_CSS_SMALL);
_4b5=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_4b4.scrollHeight/100),0.3)},_4b5||{});
nitobi.effects.ShadeDown.baseConstructor.call(this,_4b4,_4b5,100);
};
nitobi.lang.extend(nitobi.effects.ShadeDown,nitobi.effects.Scale);
nitobi.effects.ShadeDown.prototype.setup=function(){
nitobi.effects.ShadeDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
var _4b6=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_4b6){
var _4b7=_4b6.style;
this.fnodeStyle={position:_4b7.position,bottom:_4b7.bottom,left:_4b7.left,right:_4b7.right,top:_4b7.top};
this.fnode=_4b6;
_4b7.position="absolute";
_4b7.top="";
_4b7.right="";
_4b7.bottom="0px";
_4b7.left="0px";
}
};
nitobi.effects.ShadeDown.prototype.finish=function(){
nitobi.effects.ShadeDown.base.finish.call(this);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
this.fnode.style.top="0px";
this.fnode.style.left="0px";
this.fnode.style.bottom="";
this.fnode.style.right="";
return;
this.fnode.style["position"]="";
};
nitobi.effects.families.shade={show:nitobi.effects.ShadeDown,hide:nitobi.effects.ShadeUp};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.StringBuilder=function(_4b9){
if(_4b9){
if(typeof (_4b9)==="string"){
this.strings=[_4b9];
}else{
this.strings=_4b9;
}
}else{
this.strings=new Array();
}
};
nitobi.lang.StringBuilder.prototype.append=function(_4ba){
if(_4ba){
this.strings.push(_4ba);
}
return this;
};
nitobi.lang.StringBuilder.prototype.clear=function(){
this.strings.length=0;
};
nitobi.lang.StringBuilder.prototype.toString=function(){
return this.strings.join("");
};


var temp_ntb_uniqueIdGeneratorProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" /> <x:p-x:n-guid"x:s-0"/><x:t- match="/"> <x:at-/></x:t-><x:t- match="node()|@*"> <xsl:copy> <xsl:if test="not(@id)"> <x:a-x:n-id" ><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:if> <x:at-x:s-./* | text() | @*"> </x:at-> </xsl:copy></x:t-> <x:t- match="text()"> <x:v-x:s-."/></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uniqueIdGeneratorProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_uniqueIdGeneratorProc));


