(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isb=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isq)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="b"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="q"){processStatics(init.statics[b2]=b3.q,b4)
delete b3.q}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.dT"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.dT"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.dT(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.c5=function(){}
var dart=[["","",,H,{"^":"",mB:{"^":"b;a"}}],["","",,J,{"^":"",
P:function(a){return void 0},
dZ:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cW:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dW==null){H.lX()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(P.fu("Return interceptor for "+H.l(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$dm()]
if(v!=null)return v
v=H.m1(a)
if(v!=null)return v
if(typeof a=="function")return C.I
y=Object.getPrototypeOf(a)
if(y==null)return C.u
if(y===Object.prototype)return C.u
if(typeof w=="function"){Object.defineProperty(w,$.$get$dm(),{value:C.n,enumerable:false,writable:true,configurable:true})
return C.n}return C.n},
q:{"^":"b;",
u:function(a,b){return a===b},
gZ:function(a){return H.bT(a)},
i:["eu",function(a){return"Instance of '"+H.bo(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintSize|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGRect|SVGUnitTypes|Screen|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TextMetrics|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContext|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLBuffer|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
i2:{"^":"q;",
i:function(a){return String(a)},
gZ:function(a){return a?519018:218159},
$isa8:1},
ey:{"^":"q;",
u:function(a,b){return null==b},
i:function(a){return"null"},
gZ:function(a){return 0},
$isR:1},
dn:{"^":"q;",
gZ:function(a){return 0},
i:["ev",function(a){return String(a)}]},
iI:{"^":"dn;"},
dK:{"^":"dn;"},
cm:{"^":"dn;",
i:function(a){var z=a[$.$get$ef()]
if(z==null)return this.ev(a)
return"JavaScript function for "+H.l(J.au(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isdf:1},
bl:{"^":"q;$ti",
h:function(a,b){H.E(b,H.A(a,0))
if(!!a.fixed$length)H.t(P.J("add"))
a.push(b)},
bV:function(a,b){if(!!a.fixed$length)H.t(P.J("removeAt"))
if(b<0||b>=a.length)throw H.d(P.cq(b,null,null))
return a.splice(b,1)[0]},
T:function(a,b){var z
if(!!a.fixed$length)H.t(P.J("remove"))
for(z=0;z<a.length;++z)if(J.W(a[z],b)){a.splice(z,1)
return!0}return!1},
aE:function(a,b){var z,y
H.p(b,"$ish",[H.A(a,0)],"$ash")
if(!!a.fixed$length)H.t(P.J("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.C)(b),++y)a.push(b[y])},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[H.A(a,0)]})
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(P.bD(a))}},
B:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.m(z,y,H.l(a[y]))
return z.join(b)},
ia:function(a){return this.B(a,"")},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
bY:function(a,b,c){var z=a.length
if(b>z)throw H.d(P.ap(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.d(P.ap(c,b,a.length,"end",null))
if(b===c)return H.a([],[H.A(a,0)])
return H.a(a.slice(b,c),[H.A(a,0)])},
gcI:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.i0())},
i7:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.W(a[z],b))return z
return-1},
i6:function(a,b){return this.i7(a,b,0)},
au:function(a,b){var z
for(z=0;z<a.length;++z)if(J.W(a[z],b))return!0
return!1},
i:function(a){return P.dj(a,"[","]")},
ga1:function(a){return new J.av(a,a.length,0,[H.A(a,0)])},
gZ:function(a){return H.bT(a)},
gl:function(a){return a.length},
sl:function(a,b){if(!!a.fixed$length)H.t(P.J("set length"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.cx(b,"newLength",null))
if(b<0)throw H.d(P.ap(b,0,null,"newLength",null))
a.length=b},
k:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aJ(a,b))
if(b>=a.length||b<0)throw H.d(H.aJ(a,b))
return a[b]},
m:function(a,b,c){H.z(b)
H.E(c,H.A(a,0))
if(!!a.immutable$list)H.t(P.J("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aJ(a,b))
if(b>=a.length||b<0)throw H.d(H.aJ(a,b))
a[b]=c},
$isF:1,
$asF:I.c5,
$ish:1,
$isc:1,
q:{
i1:function(a,b){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(P.cx(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.d(P.ap(a,0,4294967295,"length",null))
return J.ev(new Array(a),b)},
ev:function(a,b){return J.bM(H.a(a,[b]))},
bM:function(a){H.cu(a)
a.fixed$length=Array
return a}}},
mA:{"^":"bl;$ti"},
av:{"^":"b;a,b,c,0d,$ti",
gP:function(a){return this.d},
H:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cJ:{"^":"q;",
cv:function(a,b){var z
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=C.e.gbS(b)
if(this.gbS(a)===z)return 0
if(this.gbS(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbS:function(a){return a===0?1/a<0:a<0},
aa:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(P.J(""+a+".toInt()"))},
b4:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(P.J(""+a+".floor()"))},
am:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(P.J(""+a+".round()"))},
hS:function(a,b,c){if(C.e.cv(b,c)>0)throw H.d(H.aI(b))
if(this.cv(a,b)<0)return b
if(this.cv(a,c)>0)return c
return a},
ek:function(a,b){var z
if(b>20)throw H.d(P.ap(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbS(a))return"-"+z
return z},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gZ:function(a){return a&0x1FFFFFFF},
cW:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ex:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.dw(a,b)},
a_:function(a,b){return(a|0)===a?a/b|0:this.dw(a,b)},
dw:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(P.J("Result of truncating division is "+H.l(z)+": "+H.l(a)+" ~/ "+b))},
er:function(a,b){if(b<0)throw H.d(H.aI(b))
return b>31?0:a<<b>>>0},
by:function(a,b){var z
if(a>0)z=this.hd(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
hd:function(a,b){return b>31?0:a>>>b},
U:function(a,b){if(typeof b!=="number")throw H.d(H.aI(b))
return a<b},
$isy:1,
$isZ:1},
ex:{"^":"cJ;",
cO:function(a,b){var z=this.er(1,b-1)
return((a&z-1)>>>0)-((a&z)>>>0)},
$isx:1},
ew:{"^":"cJ;"},
dl:{"^":"q;",
cu:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aJ(a,b))
if(b<0)throw H.d(H.aJ(a,b))
if(b>=a.length)H.t(H.aJ(a,b))
return a.charCodeAt(b)},
bt:function(a,b){if(b>=a.length)throw H.d(H.aJ(a,b))
return a.charCodeAt(b)},
n:function(a,b){H.U(b)
if(typeof b!=="string")throw H.d(P.cx(b,null,null))
return a+b},
bZ:function(a,b,c){H.z(c)
if(c==null)c=a.length
if(b<0)throw H.d(P.cq(b,null,null))
if(b>c)throw H.d(P.cq(b,null,null))
if(c>a.length)throw H.d(P.cq(c,null,null))
return a.substring(b,c)},
cY:function(a,b){return this.bZ(a,b,null)},
j:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.x)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
iq:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.j(c,z)+a},
aL:function(a,b){return this.iq(a,b," ")},
hT:function(a,b,c){if(c>a.length)throw H.d(P.ap(c,0,a.length,null,null))
return H.h9(a,b,c)},
i:function(a){return a},
gZ:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gl:function(a){return a.length},
$isF:1,
$asF:I.c5,
$iseP:1,
$iso:1}}],["","",,H,{"^":"",
i0:function(){return new P.jo("No element")},
a9:{"^":"jV;a",
gl:function(a){return this.a.length},
k:function(a,b){return C.i.cu(this.a,b)},
$asdL:function(){return[P.x]},
$asw:function(){return[P.x]},
$ash:function(){return[P.x]},
$asc:function(){return[P.x]}},
hJ:{"^":"h;"},
eC:{"^":"b;a,b,c,0d,$ti",
gP:function(a){return this.d},
H:function(){var z,y,x,w
z=this.a
y=J.bf(z)
x=y.gl(z)
w=this.b
if(w==null?x!=null:w!==x)throw H.d(P.bD(z))
w=this.c
if(typeof x!=="number")return H.e(x)
if(w>=x){this.d=null
return!1}this.d=y.J(z,w);++this.c
return!0}},
ij:{"^":"h;a,b,$ti",
ga1:function(a){return new H.ik(J.bA(this.a),this.b,this.$ti)},
gl:function(a){return J.bB(this.a)},
J:function(a,b){return this.b.$1(J.d0(this.a,b))},
$ash:function(a,b){return[b]}},
ik:{"^":"dk;0a,b,c,$ti",
H:function(){var z=this.b
if(z.H()){this.a=this.c.$1(z.gP(z))
return!0}this.a=null
return!1},
gP:function(a){return this.a},
$asdk:function(a,b){return[b]}},
ka:{"^":"h;a,b,$ti",
ga1:function(a){return new H.kb(J.bA(this.a),this.b,this.$ti)}},
kb:{"^":"dk;a,b,$ti",
H:function(){var z,y
for(z=this.a,y=this.b;z.H();)if(y.$1(z.gP(z)))return!0
return!1},
gP:function(a){var z=this.a
return z.gP(z)}},
cF:{"^":"b;$ti"},
dL:{"^":"b;$ti",
m:function(a,b,c){H.z(b)
H.E(c,H.al(this,"dL",0))
throw H.d(P.J("Cannot modify an unmodifiable list"))}},
jV:{"^":"cK+dL;"}}],["","",,H,{"^":"",
lS:function(a){return init.types[H.z(a)]},
m_:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.P(a).$isI},
l:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.au(a)
if(typeof z!=="string")throw H.d(H.aI(a))
return z},
bT:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
iU:function(a,b){var z,y
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.j(z,3)
y=H.U(z[3])
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return},
bo:function(a){var z,y,x,w,v,u,t,s,r
z=J.P(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.A||!!J.P(a).$isdK){v=C.q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.i.bt(w,0)===36)w=C.i.cY(w,1)
r=H.dX(H.cu(H.bg(a)),0,null)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+r,init.mangledGlobalNames)},
eS:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
iW:function(a){var z,y,x,w
z=H.a([],[P.x])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.C)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.d(H.aI(w))
if(w<=65535)C.a.h(z,w)
else if(w<=1114111){C.a.h(z,55296+(C.e.by(w-65536,10)&1023))
C.a.h(z,56320+(w&1023))}else throw H.d(H.aI(w))}return H.eS(z)},
eT:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.d(H.aI(x))
if(x<0)throw H.d(H.aI(x))
if(x>65535)return H.iW(a)}return H.eS(a)},
iV:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.by(z,10))>>>0,56320|z&1023)}throw H.d(P.ap(a,0,1114111,null,null))},
ak:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
iT:function(a){return a.b?H.ak(a).getUTCFullYear()+0:H.ak(a).getFullYear()+0},
iR:function(a){return a.b?H.ak(a).getUTCMonth()+1:H.ak(a).getMonth()+1},
iN:function(a){return a.b?H.ak(a).getUTCDate()+0:H.ak(a).getDate()+0},
iO:function(a){return a.b?H.ak(a).getUTCHours()+0:H.ak(a).getHours()+0},
iQ:function(a){return a.b?H.ak(a).getUTCMinutes()+0:H.ak(a).getMinutes()+0},
iS:function(a){return a.b?H.ak(a).getUTCSeconds()+0:H.ak(a).getSeconds()+0},
iP:function(a){return a.b?H.ak(a).getUTCMilliseconds()+0:H.ak(a).getMilliseconds()+0},
e:function(a){throw H.d(H.aI(a))},
j:function(a,b){if(a==null)J.bB(a)
throw H.d(H.aJ(a,b))},
aJ:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aK(!0,b,"index",null)
z=H.z(J.bB(a))
if(!(b<0)){if(typeof z!=="number")return H.e(z)
y=b>=z}else y=!0
if(y)return P.S(b,a,"index",null,z)
return P.cq(b,"index",null)},
lO:function(a,b,c){if(a>c)return new P.cM(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.cM(a,c,!0,b,"end","Invalid value")
return new P.aK(!0,b,"end",null)},
aI:function(a){return new P.aK(!0,a,null,null)},
lJ:function(a){if(typeof a!=="number")throw H.d(H.aI(a))
return a},
d:function(a){var z
if(a==null)a=new P.eO()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hb})
z.name=""}else z.toString=H.hb
return z},
hb:function(){return J.au(this.dartException)},
t:function(a){throw H.d(a)},
C:function(a){throw H.d(P.bD(a))},
aV:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.mb(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.by(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dp(H.l(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.eN(H.l(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$fd()
u=$.$get$fe()
t=$.$get$ff()
s=$.$get$fg()
r=$.$get$fk()
q=$.$get$fl()
p=$.$get$fi()
$.$get$fh()
o=$.$get$fn()
n=$.$get$fm()
m=v.ai(y)
if(m!=null)return z.$1(H.dp(H.U(y),m))
else{m=u.ai(y)
if(m!=null){m.method="call"
return z.$1(H.dp(H.U(y),m))}else{m=t.ai(y)
if(m==null){m=s.ai(y)
if(m==null){m=r.ai(y)
if(m==null){m=q.ai(y)
if(m==null){m=p.ai(y)
if(m==null){m=s.ai(y)
if(m==null){m=o.ai(y)
if(m==null){m=n.ai(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.eN(H.U(y),m))}}return z.$1(new H.jU(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.f1()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aK(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.f1()
return a},
by:function(a){var z
if(a==null)return new H.fK(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fK(a)},
lR:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
lZ:function(a,b,c,d,e,f){H.i(a,"$isdf")
switch(H.z(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.d(P.u("Unsupported number of arguments for wrapped closure"))},
bv:function(a,b){var z
H.z(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.lZ)
a.$identity=z
return z},
hx:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.P(d).$isc){z.$reflectionInfo=d
x=H.iZ(z).r}else x=d
w=e?Object.create(new H.jq().constructor.prototype):Object.create(new H.d3(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function(){this.$initialize()}
else{u=$.aB
if(typeof u!=="number")return u.n()
$.aB=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.ea(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.lS,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.e4:H.d4
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.ea(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
hu:function(a,b,c,d){var z=H.d4
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ea:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hw(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hu(y,!w,z,b)
if(y===0){w=$.aB
if(typeof w!=="number")return w.n()
$.aB=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.bC
if(v==null){v=H.cz("self")
$.bC=v}return new Function(w+H.l(v)+";return "+u+"."+H.l(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aB
if(typeof w!=="number")return w.n()
$.aB=w+1
t+=w
w="return function("+t+"){return this."
v=$.bC
if(v==null){v=H.cz("self")
$.bC=v}return new Function(w+H.l(v)+"."+H.l(z)+"("+t+");}")()},
hv:function(a,b,c,d){var z,y
z=H.d4
y=H.e4
switch(b?-1:a){case 0:throw H.d(H.j7("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hw:function(a,b){var z,y,x,w,v,u,t,s
z=$.bC
if(z==null){z=H.cz("self")
$.bC=z}y=$.e3
if(y==null){y=H.cz("receiver")
$.e3=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hv(w,!u,x,b)
if(w===1){z="return function(){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+");"
y=$.aB
if(typeof y!=="number")return y.n()
$.aB=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+", "+s+");"
y=$.aB
if(typeof y!=="number")return y.n()
$.aB=y+1
return new Function(z+y+"}")()},
dT:function(a,b,c,d,e,f,g){var z,y
z=J.bM(H.cu(b))
H.z(c)
y=!!J.P(d).$isc?J.bM(d):d
return H.hx(a,z,c,y,!!e,f,g)},
U:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.d(H.az(a,"String"))},
lP:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.az(a,"double"))},
m5:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.az(a,"num"))},
fZ:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.d(H.az(a,"bool"))},
z:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.d(H.az(a,"int"))},
h7:function(a,b){throw H.d(H.az(a,H.U(b).substring(3)))},
m7:function(a,b){var z=J.bf(b)
throw H.d(H.ht(a,z.bZ(b,3,z.gl(b))))},
i:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.P(a)[b])return a
H.h7(a,b)},
k:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.P(a)[b]
else z=!0
if(z)return a
H.m7(a,b)},
cu:function(a){if(a==null)return a
if(!!J.P(a).$isc)return a
throw H.d(H.az(a,"List"))},
m0:function(a,b){if(a==null)return a
if(!!J.P(a).$isc)return a
if(J.P(a)[b])return a
H.h7(a,b)},
h_:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.z(z)]
else return a.$S()}return},
cs:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.h_(J.P(a))
if(z==null)return!1
y=H.h3(z,null,b,null)
return y},
f:function(a,b){var z,y
if(a==null)return a
if($.dP)return a
$.dP=!0
try{if(H.cs(a,b))return a
z=H.cv(b)
y=H.az(a,z)
throw H.d(y)}finally{$.dP=!1}},
dU:function(a,b){if(a!=null&&!H.dS(a,b))H.t(H.az(a,H.cv(b)))
return a},
fU:function(a){var z
if(a instanceof H.v){z=H.h_(J.P(a))
if(z!=null)return H.cv(z)
return"Closure"}return H.bo(a)},
ma:function(a){throw H.d(new P.hC(H.U(a)))},
h0:function(a){return init.getIsolateTag(a)},
a:function(a,b){a.$ti=b
return a},
bg:function(a){if(a==null)return
return a.$ti},
np:function(a,b,c){return H.bz(a["$as"+H.l(c)],H.bg(b))},
bx:function(a,b,c,d){var z
H.U(c)
H.z(d)
z=H.bz(a["$as"+H.l(c)],H.bg(b))
return z==null?null:z[d]},
al:function(a,b,c){var z
H.U(b)
H.z(c)
z=H.bz(a["$as"+H.l(b)],H.bg(a))
return z==null?null:z[c]},
A:function(a,b){var z
H.z(b)
z=H.bg(a)
return z==null?null:z[b]},
cv:function(a){var z=H.bh(a,null)
return z},
bh:function(a,b){var z,y
H.p(b,"$isc",[P.o],"$asc")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dX(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(a===-2)return"dynamic"
if(typeof a==="number"){H.z(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.j(b,y)
return H.l(b[y])}if('func' in a)return H.lz(a,b)
if('futureOr' in a)return"FutureOr<"+H.bh("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
lz:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.o]
H.p(b,"$isc",z,"$asc")
if("bounds" in a){y=a.bounds
if(b==null){b=H.a([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.h(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.j(b,r)
t=C.i.n(t,b[r])
q=y[u]
if(q!=null&&q!==P.b)t+=" extends "+H.bh(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.bh(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.bh(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.bh(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.lQ(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.U(z[l])
n=n+m+H.bh(i[h],b)+(" "+H.l(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
dX:function(a,b,c){var z,y,x,w,v,u
H.p(c,"$isc",[P.o],"$asc")
if(a==null)return""
z=new P.cr("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.bh(u,c)}v="<"+z.i(0)+">"
return v},
bz:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
c4:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bg(a)
y=J.P(a)
if(y[b]==null)return!1
return H.fX(H.bz(y[d],z),null,c,null)},
p:function(a,b,c,d){var z,y
H.U(b)
H.cu(c)
H.U(d)
if(a==null)return a
z=H.c4(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.dX(c,0,null)
throw H.d(H.az(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
fX:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.at(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.at(a[y],b,c[y],d))return!1
return!0},
nn:function(a,b,c){return a.apply(b,H.bz(J.P(b)["$as"+H.l(c)],H.bg(b)))},
h4:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="b"||a.builtin$cls==="R"||a===-1||a===-2||H.h4(z)}return!1},
dS:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="b"||b.builtin$cls==="R"||b===-1||b===-2||H.h4(b)
return z}z=b==null||b===-1||b.builtin$cls==="b"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.dS(a,"type" in b?b.type:null))return!0
if('func' in b)return H.cs(a,b)}y=J.P(a).constructor
x=H.bg(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.at(y,null,b,null)
return z},
E:function(a,b){if(a!=null&&!H.dS(a,b))throw H.d(H.az(a,H.cv(b)))
return a},
at:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.at(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="R")return!0
if('func' in c)return H.h3(a,b,c,d)
if('func' in a)return c.builtin$cls==="df"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.at("type" in a?a.type:null,b,x,d)
else if(H.at(a,b,x,d))return!0
else{if(!('$is'+"bF" in y.prototype))return!1
w=y.prototype["$as"+"bF"]
v=H.bz(w,z?a.slice(1):null)
return H.at(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=H.cv(t)
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.fX(H.bz(r,z),b,u,d)},
h3:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.at(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.at(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.at(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.at(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.m4(m,b,l,d)},
m4:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.at(c[w],d,a[w],b))return!1}return!0},
no:function(a,b,c){Object.defineProperty(a,H.U(b),{value:c,enumerable:false,writable:true,configurable:true})},
m1:function(a){var z,y,x,w,v,u
z=H.U($.h1.$1(a))
y=$.cV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cX[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.U($.fW.$2(a,z))
if(z!=null){y=$.cV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cX[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cY(x)
$.cV[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cX[z]=x
return x}if(v==="-"){u=H.cY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.h6(a,x)
if(v==="*")throw H.d(P.fu(z))
if(init.leafTags[z]===true){u=H.cY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.h6(a,x)},
h6:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dZ(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cY:function(a){return J.dZ(a,!1,null,!!a.$isI)},
m3:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cY(z)
else return J.dZ(z,c,null,null)},
lX:function(){if(!0===$.dW)return
$.dW=!0
H.lY()},
lY:function(){var z,y,x,w,v,u,t,s
$.cV=Object.create(null)
$.cX=Object.create(null)
H.lT()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.h8.$1(v)
if(u!=null){t=H.m3(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
lT:function(){var z,y,x,w,v,u,t
z=C.F()
z=H.bu(C.C,H.bu(C.H,H.bu(C.p,H.bu(C.p,H.bu(C.G,H.bu(C.D,H.bu(C.E(C.q),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.h1=new H.lU(v)
$.fW=new H.lV(u)
$.h8=new H.lW(t)},
bu:function(a,b){return a(b)||b},
h9:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
ha:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
iY:{"^":"b;a,b,c,d,e,f,r,0x",q:{
iZ:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bM(z)
y=z[0]
x=z[1]
return new H.iY(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
jI:{"^":"b;a,b,c,d,e,f",
ai:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
q:{
aG:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.a([],[P.o])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jI(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cP:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
iD:{"^":"a5;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.l(this.a)
return"NullError: method not found: '"+z+"' on null"},
q:{
eN:function(a,b){return new H.iD(a,b==null?null:b.method)}}},
i5:{"^":"a5;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.l(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.l(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.l(this.a)+")"},
q:{
dp:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.i5(a,y,z?null:b.receiver)}}},
jU:{"^":"a5;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
mb:{"^":"v:18;a",
$1:function(a){if(!!J.P(a).$isa5)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fK:{"^":"b;a,0b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isay:1},
v:{"^":"b;",
i:function(a){return"Closure '"+H.bo(this).trim()+"'"},
gem:function(){return this},
$isdf:1,
gem:function(){return this}},
f6:{"^":"v;"},
jq:{"^":"f6;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d3:{"^":"f6;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d3))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gZ:function(a){var z,y
z=this.c
if(z==null)y=H.bT(this.a)
else y=typeof z!=="object"?J.bi(z):H.bT(z)
return(y^H.bT(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.l(this.d)+"' of "+("Instance of '"+H.bo(z)+"'")},
q:{
d4:function(a){return a.a},
e4:function(a){return a.c},
cz:function(a){var z,y,x,w,v
z=new H.d3("self","target","receiver","name")
y=J.bM(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
jJ:{"^":"a5;a",
i:function(a){return this.a},
q:{
az:function(a,b){return new H.jJ("TypeError: "+H.l(P.cE(a))+": type '"+H.fU(a)+"' is not a subtype of type '"+b+"'")}}},
hs:{"^":"a5;a",
i:function(a){return this.a},
q:{
ht:function(a,b){return new H.hs("CastError: "+H.l(P.cE(a))+": type '"+H.fU(a)+"' is not a subtype of type '"+b+"'")}}},
j6:{"^":"a5;a",
i:function(a){return"RuntimeError: "+H.l(this.a)},
q:{
j7:function(a){return new H.j6(a)}}},
aM:{"^":"ih;a,0b,0c,0d,0e,0f,r,$ti",
gl:function(a){return this.a},
gaK:function(a){return new H.eB(this,[H.A(this,0)])},
dH:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.dh(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.dh(y,b)}else return this.i8(b)},
i8:function(a){var z=this.d
if(z==null)return!1
return this.cH(this.c7(z,J.bi(a)&0x3ffffff),a)>=0},
k:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bv(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.bv(w,b)
x=y==null?null:y.b
return x}else return this.i9(b)},
i9:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.c7(z,J.bi(a)&0x3ffffff)
x=this.cH(y,a)
if(x<0)return
return y[x].b},
m:function(a,b,c){var z,y,x,w,v,u
H.E(b,H.A(this,0))
H.E(c,H.A(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.c9()
this.b=z}this.d6(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.c9()
this.c=y}this.d6(y,b,c)}else{x=this.d
if(x==null){x=this.c9()
this.d=x}w=J.bi(b)&0x3ffffff
v=this.c7(x,w)
if(v==null)this.cf(x,w,[this.ca(b,c)])
else{u=this.cH(v,b)
if(u>=0)v[u].b=c
else v.push(this.ca(b,c))}}},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[H.A(this,0),H.A(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(P.bD(this))
z=z.c}},
d6:function(a,b,c){var z
H.E(b,H.A(this,0))
H.E(c,H.A(this,1))
z=this.bv(a,b)
if(z==null)this.cf(a,b,this.ca(b,c))
else z.b=c},
fm:function(){this.r=this.r+1&67108863},
ca:function(a,b){var z,y
z=new H.i9(H.E(a,H.A(this,0)),H.E(b,H.A(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.fm()
return z},
cH:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.W(a[y].a,b))return y
return-1},
i:function(a){return P.eF(this)},
bv:function(a,b){return a[b]},
c7:function(a,b){return a[b]},
cf:function(a,b,c){a[b]=c},
fd:function(a,b){delete a[b]},
dh:function(a,b){return this.bv(a,b)!=null},
c9:function(){var z=Object.create(null)
this.cf(z,"<non-identifier-key>",z)
this.fd(z,"<non-identifier-key>")
return z},
$iseA:1},
i9:{"^":"b;a,b,0c,0d"},
eB:{"^":"hJ;a,$ti",
gl:function(a){return this.a.a},
ga1:function(a){var z,y
z=this.a
y=new H.ia(z,z.r,this.$ti)
y.c=z.e
return y}},
ia:{"^":"b;a,b,0c,0d,$ti",
gP:function(a){return this.d},
H:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.bD(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
lU:{"^":"v:18;a",
$1:function(a){return this.a(a)}},
lV:{"^":"v:30;a",
$2:function(a,b){return this.a(a,b)}},
lW:{"^":"v:28;a",
$1:function(a){return this.a(H.U(a))}},
i3:{"^":"b;a,b,0c,0d",
i:function(a){return"RegExp/"+this.a+"/"},
$iseP:1,
q:{
i4:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(P.eo("Illegal RegExp pattern ("+String(w)+")",a,null))}}}}],["","",,H,{"^":"",
lQ:function(a){return J.ev(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
m6:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
c0:function(a){var z,y,x,w
z=J.P(a)
if(!!z.$isF)return a
y=z.gl(a)
if(typeof y!=="number")return H.e(y)
x=new Array(y)
x.fixed$length=Array
w=0
while(!0){y=z.gl(a)
if(typeof y!=="number")return H.e(y)
if(!(w<y))break
C.a.m(x,w,z.k(a,w));++w}return x},
aH:function(a,b,c){if(a>>>0!==a||a>=c)throw H.d(H.aJ(b,a))},
ly:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.d(H.lO(a,b,c))
return b},
iz:{"^":"q;",$isn8:1,"%":"DataView;ArrayBufferView;dt|fE|fF|iy|fG|fH|b4"},
dt:{"^":"iz;",
gl:function(a){return a.length},
$isF:1,
$asF:I.c5,
$isI:1,
$asI:I.c5},
iy:{"^":"fF;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
m:function(a,b,c){H.z(b)
H.lP(c)
H.aH(b,a,a.length)
a[b]=c},
$ascF:function(){return[P.y]},
$asw:function(){return[P.y]},
$ish:1,
$ash:function(){return[P.y]},
$isc:1,
$asc:function(){return[P.y]},
"%":"Float32Array|Float64Array"},
b4:{"^":"fH;",
m:function(a,b,c){H.z(b)
H.z(c)
H.aH(b,a,a.length)
a[b]=c},
$ascF:function(){return[P.x]},
$asw:function(){return[P.x]},
$ish:1,
$ash:function(){return[P.x]},
$isc:1,
$asc:function(){return[P.x]}},
mJ:{"^":"b4;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"Int16Array"},
mK:{"^":"b4;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"Int32Array"},
mL:{"^":"b4;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"Int8Array"},
mM:{"^":"b4;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
mN:{"^":"b4;",
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
mO:{"^":"b4;",
gl:function(a){return a.length},
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
iA:{"^":"b4;",
gl:function(a){return a.length},
k:function(a,b){H.aH(b,a,a.length)
return a[b]},
bY:function(a,b,c){return new Uint8Array(a.subarray(b,H.ly(b,c,a.length)))},
"%":";Uint8Array"},
fE:{"^":"dt+w;"},
fF:{"^":"fE+cF;"},
fG:{"^":"dt+w;"},
fH:{"^":"fG+cF;"}}],["","",,P,{"^":"",
kf:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lG()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.bv(new P.kh(z),1)).observe(y,{childList:true})
return new P.kg(z,y,x)}else if(self.setImmediate!=null)return P.lH()
return P.lI()},
nc:[function(a){self.scheduleImmediate(H.bv(new P.ki(H.f(a,{func:1,ret:-1})),0))},"$1","lG",4,0,11],
nd:[function(a){self.setImmediate(H.bv(new P.kj(H.f(a,{func:1,ret:-1})),0))},"$1","lH",4,0,11],
ne:[function(a){P.dG(C.m,H.f(a,{func:1,ret:-1}))},"$1","lI",4,0,11],
dG:function(a,b){var z
H.f(b,{func:1,ret:-1})
z=C.e.a_(a.a,1000)
return P.le(z<0?0:z,b)},
f8:function(a,b){var z
H.f(b,{func:1,ret:-1,args:[P.aq]})
z=C.e.a_(a.a,1000)
return P.lf(z<0?0:z,b)},
lC:function(a,b){if(H.cs(a,{func:1,args:[P.b,P.ay]}))return b.iA(a,null,P.b,P.ay)
if(H.cs(a,{func:1,args:[P.b]}))return H.f(a,{func:1,ret:null,args:[P.b]})
throw H.d(P.cx(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
lB:function(){var z,y
for(;z=$.bt,z!=null;){$.c2=null
y=z.b
$.bt=y
if(y==null)$.c1=null
z.a.$0()}},
nm:[function(){$.dQ=!0
try{P.lB()}finally{$.c2=null
$.dQ=!1
if($.bt!=null)$.$get$dM().$1(P.fY())}},"$0","fY",0,0,3],
fT:function(a){var z=new P.fz(H.f(a,{func:1,ret:-1}))
if($.bt==null){$.c1=z
$.bt=z
if(!$.dQ)$.$get$dM().$1(P.fY())}else{$.c1.b=z
$.c1=z}},
lF:function(a){var z,y,x
H.f(a,{func:1,ret:-1})
z=$.bt
if(z==null){P.fT(a)
$.c2=$.c1
return}y=new P.fz(a)
x=$.c2
if(x==null){y.b=z
$.c2=y
$.bt=y}else{y.b=x.b
x.b=y
$.c2=y
if(y.b==null)$.c1=y}},
m8:function(a){var z,y
z={func:1,ret:-1}
H.f(a,z)
y=$.T
if(C.j===y){P.cU(null,null,C.j,a)
return}y.toString
P.cU(null,null,y,H.f(y.cq(a),z))},
dF:function(a,b){var z,y
z={func:1,ret:-1}
H.f(b,z)
y=$.T
if(y===C.j){y.toString
return P.dG(a,b)}return P.dG(a,H.f(y.cq(b),z))},
cO:function(a,b){var z,y,x
z={func:1,ret:-1,args:[P.aq]}
H.f(b,z)
y=$.T
if(y===C.j){y.toString
return P.f8(a,b)}x=y.dD(b,P.aq)
$.T.toString
return P.f8(a,H.f(x,z))},
cT:function(a,b,c,d,e){var z={}
z.a=d
P.lF(new P.lD(z,e))},
fR:function(a,b,c,d,e){var z,y
H.f(d,{func:1,ret:e})
y=$.T
if(y===c)return d.$0()
$.T=c
z=y
try{y=d.$0()
return y}finally{$.T=z}},
fS:function(a,b,c,d,e,f,g){var z,y
H.f(d,{func:1,ret:f,args:[g]})
H.E(e,g)
y=$.T
if(y===c)return d.$1(e)
$.T=c
z=y
try{y=d.$1(e)
return y}finally{$.T=z}},
lE:function(a,b,c,d,e,f,g,h,i){var z,y
H.f(d,{func:1,ret:g,args:[h,i]})
H.E(e,h)
H.E(f,i)
y=$.T
if(y===c)return d.$2(e,f)
$.T=c
z=y
try{y=d.$2(e,f)
return y}finally{$.T=z}},
cU:function(a,b,c,d){var z
H.f(d,{func:1,ret:-1})
z=C.j!==c
if(z)d=!(!z||!1)?c.cq(d):c.hQ(d,-1)
P.fT(d)},
kh:{"^":"v:14;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
kg:{"^":"v:31;a,b,c",
$1:function(a){var z,y
this.a.a=H.f(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ki:{"^":"v:2;a",
$0:function(){this.a.$0()}},
kj:{"^":"v:2;a",
$0:function(){this.a.$0()}},
fN:{"^":"b;a,0b,c",
eQ:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.bv(new P.lh(this,b),0),a)
else throw H.d(P.J("`setTimeout()` not found."))},
eR:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.bv(new P.lg(this,a,Date.now(),b),0),a)
else throw H.d(P.J("Periodic timer."))},
$isaq:1,
q:{
le:function(a,b){var z=new P.fN(!0,0)
z.eQ(a,b)
return z},
lf:function(a,b){var z=new P.fN(!1,0)
z.eR(a,b)
return z}}},
lh:{"^":"v:3;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
lg:{"^":"v:2;a,b,c,d",
$0:function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.e.ex(w,x)}z.c=y
this.d.$1(z)}},
bs:{"^":"b;0a,b,c,d,e,$ti",
ih:function(a){if(this.c!==6)return!0
return this.b.b.cN(H.f(this.d,{func:1,ret:P.a8,args:[P.b]}),a.a,P.a8,P.b)},
i5:function(a){var z,y,x,w
z=this.e
y=P.b
x={futureOr:1,type:H.A(this,1)}
w=this.b.b
if(H.cs(z,{func:1,args:[P.b,P.ay]}))return H.dU(w.iI(z,a.a,a.b,null,y,P.ay),x)
else return H.dU(w.cN(H.f(z,{func:1,args:[P.b]}),a.a,null,y),x)}},
aT:{"^":"b;dv:a<,b,0h5:c<,$ti",
ej:function(a,b,c){var z,y,x,w
z=H.A(this,0)
H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.T
if(y!==C.j){y.toString
H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.lC(b,y)}H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.aT(0,$.T,[c])
w=b==null?1:3
this.d7(new P.bs(x,w,a,b,[z,c]))
return x},
iN:function(a,b){return this.ej(a,null,b)},
d7:function(a){var z,y
z=this.a
if(z<=1){a.a=H.i(this.c,"$isbs")
this.c=a}else{if(z===2){y=H.i(this.c,"$isaT")
z=y.a
if(z<4){y.d7(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.cU(null,null,z,H.f(new P.kx(this,a),{func:1,ret:-1}))}},
dr:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.i(this.c,"$isbs")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.i(this.c,"$isaT")
y=u.a
if(y<4){u.dr(a)
return}this.a=y
this.c=u.c}z.a=this.bx(a)
y=this.b
y.toString
P.cU(null,null,y,H.f(new P.kC(z,this),{func:1,ret:-1}))}},
cd:function(){var z=H.i(this.c,"$isbs")
this.c=null
return this.bx(z)},
bx:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
de:function(a){var z,y,x,w
z=H.A(this,0)
H.dU(a,{futureOr:1,type:z})
y=this.$ti
x=H.c4(a,"$isbF",y,"$asbF")
if(x){z=H.c4(a,"$isaT",y,null)
if(z)P.fB(a,this)
else P.ky(a,this)}else{w=this.cd()
H.E(a,z)
this.a=4
this.c=a
P.c_(this,w)}},
c3:[function(a,b){var z
H.i(b,"$isay")
z=this.cd()
this.a=8
this.c=new P.an(a,b)
P.c_(this,z)},function(a){return this.c3(a,null)},"j3","$2","$1","gf9",4,2,41],
$isbF:1,
q:{
ky:function(a,b){var z,y,x
b.a=1
try{a.ej(new P.kz(b),new P.kA(b),null)}catch(x){z=H.aV(x)
y=H.by(x)
P.m8(new P.kB(b,z,y))}},
fB:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.i(a.c,"$isaT")
if(z>=4){y=b.cd()
b.a=a.a
b.c=a.c
P.c_(b,y)}else{y=H.i(b.c,"$isbs")
b.a=2
b.c=a
a.dr(y)}},
c_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.i(y.c,"$isan")
y=y.b
u=v.a
t=v.b
y.toString
P.cT(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.c_(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.i(r,"$isan")
y=y.b
u=r.a
t=r.b
y.toString
P.cT(null,null,y,u,t)
return}o=$.T
if(o==null?q!=null:o!==q)$.T=q
else o=null
y=b.c
if(y===8)new P.kF(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.kE(x,b,r).$0()}else if((y&2)!==0)new P.kD(z,x,b).$0()
if(o!=null)$.T=o
y=x.b
if(!!J.P(y).$isbF){if(y.a>=4){n=H.i(t.c,"$isbs")
t.c=null
b=t.bx(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.fB(y,t)
return}}m=b.b
n=H.i(m.c,"$isbs")
m.c=null
b=m.bx(n)
y=x.a
u=x.b
if(!y){H.E(u,H.A(m,0))
m.a=4
m.c=u}else{H.i(u,"$isan")
m.a=8
m.c=u}z.a=m
y=m}}}},
kx:{"^":"v:2;a,b",
$0:function(){P.c_(this.a,this.b)}},
kC:{"^":"v:2;a,b",
$0:function(){P.c_(this.b,this.a.a)}},
kz:{"^":"v:14;a",
$1:function(a){var z=this.a
z.a=0
z.de(a)}},
kA:{"^":"v:38;a",
$2:function(a,b){this.a.c3(a,H.i(b,"$isay"))},
$1:function(a){return this.$2(a,null)}},
kB:{"^":"v:2;a,b,c",
$0:function(){this.a.c3(this.b,this.c)}},
kF:{"^":"v:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.ei(H.f(w.d,{func:1}),null)}catch(v){y=H.aV(v)
x=H.by(v)
if(this.d){w=H.i(this.a.a.c,"$isan").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.i(this.a.a.c,"$isan")
else u.b=new P.an(y,x)
u.a=!0
return}if(!!J.P(z).$isbF){if(z instanceof P.aT&&z.gdv()>=4){if(z.gdv()===8){w=this.b
w.b=H.i(z.gh5(),"$isan")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.iN(new P.kG(t),null)
w.a=!1}}},
kG:{"^":"v:39;a",
$1:function(a){return this.a}},
kE:{"^":"v:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.A(x,0)
v=H.E(this.c,w)
u=H.A(x,1)
this.a.b=x.b.b.cN(H.f(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.aV(t)
y=H.by(t)
x=this.a
x.b=new P.an(z,y)
x.a=!0}}},
kD:{"^":"v:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.i(this.a.a.c,"$isan")
w=this.c
if(w.ih(z)&&w.e!=null){v=this.b
v.b=w.i5(z)
v.a=!1}}catch(u){y=H.aV(u)
x=H.by(u)
w=H.i(this.a.a.c,"$isan")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.an(y,x)
s.a=!0}}},
fz:{"^":"b;a,0b"},
dB:{"^":"b;$ti",
gl:function(a){var z,y
z={}
y=new P.aT(0,$.T,[P.x])
z.a=0
this.ic(new P.jt(z,this),!0,new P.ju(z,y),y.gf9())
return y}},
jt:{"^":"v;a,b",
$1:function(a){H.E(a,H.al(this.b,"dB",0));++this.a.a},
$S:function(){return{func:1,ret:P.R,args:[H.al(this.b,"dB",0)]}}},
ju:{"^":"v:2;a,b",
$0:function(){this.b.de(this.a.a)}},
f3:{"^":"b;$ti"},
js:{"^":"b;"},
aq:{"^":"b;"},
an:{"^":"b;a,b",
i:function(a){return H.l(this.a)},
$isa5:1},
ln:{"^":"b;",$isnb:1},
lD:{"^":"v:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.eO()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.i(0)
throw x}},
l0:{"^":"ln;",
iJ:function(a){var z,y,x
H.f(a,{func:1,ret:-1})
try{if(C.j===$.T){a.$0()
return}P.fR(null,null,this,a,-1)}catch(x){z=H.aV(x)
y=H.by(x)
P.cT(null,null,this,z,H.i(y,"$isay"))}},
iK:function(a,b,c){var z,y,x
H.f(a,{func:1,ret:-1,args:[c]})
H.E(b,c)
try{if(C.j===$.T){a.$1(b)
return}P.fS(null,null,this,a,b,-1,c)}catch(x){z=H.aV(x)
y=H.by(x)
P.cT(null,null,this,z,H.i(y,"$isay"))}},
hQ:function(a,b){return new P.l2(this,H.f(a,{func:1,ret:b}),b)},
cq:function(a){return new P.l1(this,H.f(a,{func:1,ret:-1}))},
dD:function(a,b){return new P.l3(this,H.f(a,{func:1,ret:-1,args:[b]}),b)},
ei:function(a,b){H.f(a,{func:1,ret:b})
if($.T===C.j)return a.$0()
return P.fR(null,null,this,a,b)},
cN:function(a,b,c,d){H.f(a,{func:1,ret:c,args:[d]})
H.E(b,d)
if($.T===C.j)return a.$1(b)
return P.fS(null,null,this,a,b,c,d)},
iI:function(a,b,c,d,e,f){H.f(a,{func:1,ret:d,args:[e,f]})
H.E(b,e)
H.E(c,f)
if($.T===C.j)return a.$2(b,c)
return P.lE(null,null,this,a,b,c,d,e,f)},
iA:function(a,b,c,d){return H.f(a,{func:1,ret:b,args:[c,d]})}},
l2:{"^":"v;a,b,c",
$0:function(){return this.a.ei(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
l1:{"^":"v:3;a,b",
$0:function(){return this.a.iJ(this.b)}},
l3:{"^":"v;a,b,c",
$1:function(a){var z=this.c
return this.a.iK(this.b,H.E(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
ic:function(a,b,c){H.cu(a)
return H.p(H.lR(a,new H.aM(0,0,[b,c])),"$iseA",[b,c],"$aseA")},
ib:function(a,b){return new H.aM(0,0,[a,b])},
id:function(a,b,c,d){return new P.kN(0,0,[d])},
i_:function(a,b,c){var z,y
if(P.dR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$c3()
C.a.h(y,a)
try{P.lA(a,z)}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=P.f4(b,H.m0(z,"$ish"),", ")+c
return y.charCodeAt(0)==0?y:y},
dj:function(a,b,c){var z,y,x
if(P.dR(a))return b+"..."+c
z=new P.cr(b)
y=$.$get$c3()
C.a.h(y,a)
try{x=z
x.a=P.f4(x.gaS(),a,", ")}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=z
y.a=y.gaS()+c
y=z.gaS()
return y.charCodeAt(0)==0?y:y},
dR:function(a){var z,y
for(z=0;y=$.$get$c3(),z<y.length;++z)if(a===y[z])return!0
return!1},
lA:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga1(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.H())return
w=H.l(z.gP(z))
C.a.h(b,w)
y+=w.length+2;++x}if(!z.H()){if(x<=5)return
if(0>=b.length)return H.j(b,-1)
v=b.pop()
if(0>=b.length)return H.j(b,-1)
u=b.pop()}else{t=z.gP(z);++x
if(!z.H()){if(x<=4){C.a.h(b,H.l(t))
return}v=H.l(t)
if(0>=b.length)return H.j(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gP(z);++x
for(;z.H();t=s,s=r){r=z.gP(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2;--x}C.a.h(b,"...")
return}}u=H.l(t)
v=H.l(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.h(b,q)
C.a.h(b,u)
C.a.h(b,v)},
eF:function(a){var z,y,x
z={}
if(P.dR(a))return"{...}"
y=new P.cr("")
try{C.a.h($.$get$c3(),a)
x=y
x.a=x.gaS()+"{"
z.a=!0
J.hg(a,new P.ii(z,y))
z=y
z.a=z.gaS()+"}"}finally{z=$.$get$c3()
if(0>=z.length)return H.j(z,-1)
z.pop()}z=y.gaS()
return z.charCodeAt(0)==0?z:z},
kN:{"^":"kH;a,0b,0c,0d,0e,0f,r,$ti",
ga1:function(a){return P.fD(this,this.r,H.A(this,0))},
gl:function(a){return this.a},
h:function(a,b){var z,y
H.E(b,H.A(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.dO()
this.b=z}return this.dc(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.dO()
this.c=y}return this.dc(y,b)}else return this.eS(0,b)},
eS:function(a,b){var z,y,x
H.E(b,H.A(this,0))
z=this.d
if(z==null){z=P.dO()
this.d=z}y=this.df(b)
x=z[y]
if(x==null)z[y]=[this.c2(b)]
else{if(this.dk(x,b)>=0)return!1
x.push(this.c2(b))}return!0},
T:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ds(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ds(this.c,b)
else return this.h_(0,b)},
h_:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.fi(z,b)
x=this.dk(y,b)
if(x<0)return!1
this.dz(y.splice(x,1)[0])
return!0},
dc:function(a,b){H.E(b,H.A(this,0))
if(H.i(a[b],"$isdN")!=null)return!1
a[b]=this.c2(b)
return!0},
ds:function(a,b){var z
if(a==null)return!1
z=H.i(a[b],"$isdN")
if(z==null)return!1
this.dz(z)
delete a[b]
return!0},
dd:function(){this.r=this.r+1&67108863},
c2:function(a){var z,y
z=new P.dN(H.E(a,H.A(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.dd()
return z},
dz:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.dd()},
df:function(a){return J.bi(a)&0x3ffffff},
fi:function(a,b){return a[this.df(b)]},
dk:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.W(a[y].a,b))return y
return-1},
q:{
dO:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
dN:{"^":"b;a,0b,0c"},
kO:{"^":"b;a,b,0c,0d,$ti",
gP:function(a){return this.d},
H:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.bD(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=H.E(z.a,H.A(this,0))
this.c=z.b
return!0}}},
q:{
fD:function(a,b,c){var z=new P.kO(a,b,[c])
z.c=a.e
return z}}},
kH:{"^":"j8;"},
cK:{"^":"kP;",$ish:1,$isc:1},
w:{"^":"b;$ti",
ga1:function(a){return new H.eC(a,this.gl(a),0,[H.bx(this,a,"w",0)])},
J:function(a,b){return this.k(a,b)},
iP:function(a,b){var z,y,x
z=H.a([],[H.bx(this,a,"w",0)])
C.a.sl(z,this.gl(a))
y=0
while(!0){x=this.gl(a)
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
C.a.m(z,y,this.k(a,y));++y}return z},
iO:function(a){return this.iP(a,!0)},
i1:function(a,b,c,d){var z
H.E(d,H.bx(this,a,"w",0))
P.dv(b,c,this.gl(a),null,null,null)
for(z=b;z<c;++z)this.m(a,z,d)},
i:function(a){return P.dj(a,"[","]")}},
ih:{"^":"am;"},
ii:{"^":"v:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.l(a)
z.a=y+": "
z.a+=H.l(b)}},
am:{"^":"b;$ti",
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[H.bx(this,a,"am",0),H.bx(this,a,"am",1)]})
for(z=J.bA(this.gaK(a));z.H();){y=z.gP(z)
b.$2(y,this.k(a,y))}},
gl:function(a){return J.bB(this.gaK(a))},
i:function(a){return P.eF(a)},
$isab:1},
ja:{"^":"b;$ti",
i:function(a){return P.dj(this,"{","}")},
J:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.e1("index"))
if(b<0)H.t(P.ap(b,0,null,"index",null))
for(z=P.fD(this,this.r,H.A(this,0)),y=0;z.H();){x=z.d
if(b===y)return x;++y}throw H.d(P.S(b,this,"index",null,y))},
$ish:1},
j8:{"^":"ja;"},
kP:{"^":"b+w;"}}],["","",,P,{"^":"",d9:{"^":"b;$ti"},ec:{"^":"js;$ti"},hL:{"^":"d9;",
$asd9:function(){return[P.o,[P.c,P.x]]}},k_:{"^":"hL;a"},k0:{"^":"ec;",
hV:function(a,b,c){var z,y,x,w
z=a.length
P.dv(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(0)
x=new Uint8Array(y*3)
w=new P.lm(0,0,x)
if(w.ff(a,b,z)!==z)w.dB(C.i.cu(a,z-1),0)
return C.t.bY(x,0,w.b)},
hU:function(a){return this.hV(a,0,null)},
$asec:function(){return[P.o,[P.c,P.x]]}},lm:{"^":"b;a,b,c",
dB:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
x=y+1
w=z.length
if((b&64512)===56320){v=65536+((a&1023)<<10)|b&1023
this.b=x
if(y>=w)return H.j(z,y)
z[y]=240|v>>>18
y=x+1
this.b=y
if(x>=w)return H.j(z,x)
z[x]=128|v>>>12&63
x=y+1
this.b=x
if(y>=w)return H.j(z,y)
z[y]=128|v>>>6&63
this.b=x+1
if(x>=w)return H.j(z,x)
z[x]=128|v&63
return!0}else{this.b=x
if(y>=w)return H.j(z,y)
z[y]=224|a>>>12
y=x+1
this.b=y
if(x>=w)return H.j(z,x)
z[x]=128|a>>>6&63
this.b=y+1
if(y>=w)return H.j(z,y)
z[y]=128|a&63
return!1}},
ff:function(a,b,c){var z,y,x,w,v,u,t
if(b!==c&&(C.i.cu(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=b;x<c;++x){w=C.i.bt(a,x)
if(w<=127){v=this.b
if(v>=y)break
this.b=v+1
z[v]=w}else if((w&64512)===55296){if(this.b+3>=y)break
u=x+1
if(this.dB(w,C.i.bt(a,u)))x=u}else if(w<=2047){v=this.b
t=v+1
if(t>=y)break
this.b=t
if(v>=y)return H.j(z,v)
z[v]=192|w>>>6
this.b=t+1
z[t]=128|w&63}else{v=this.b
if(v+2>=y)break
t=v+1
this.b=t
if(v>=y)return H.j(z,v)
z[v]=224|w>>>12
v=t+1
this.b=v
if(t>=y)return H.j(z,t)
z[t]=128|w>>>6&63
this.b=v+1
if(v>=y)return H.j(z,v)
z[v]=128|w&63}}return x}}}],["","",,P,{"^":"",
h2:function(a,b,c){var z=H.iU(a,c)
if(z!=null)return z
throw H.d(P.eo(a,null,null))},
hN:function(a){var z=J.P(a)
if(!!z.$isv)return z.i(a)
return"Instance of '"+H.bo(a)+"'"},
ie:function(a,b,c,d){var z,y
H.E(b,d)
z=J.i1(a,d)
if(a!==0&&!0)for(y=0;y<z.length;++y)C.a.m(z,y,b)
return H.p(z,"$isc",[d],"$asc")},
eD:function(a,b,c){var z,y,x
z=[c]
y=H.a([],z)
for(x=J.bA(a);x.H();)C.a.h(y,H.E(x.gP(x),c))
if(b)return y
return H.p(J.bM(y),"$isc",z,"$asc")},
dC:function(a,b,c){var z,y
z=P.x
H.p(a,"$ish",[z],"$ash")
if(a.constructor===Array){H.p(a,"$isbl",[z],"$asbl")
y=a.length
c=P.dv(b,c,y,null,null,null)
if(b<=0){if(typeof c!=="number")return c.U()
z=c<y}else z=!0
return H.eT(z?C.a.bY(a,b,c):a)}return P.jv(a,b,c)},
jv:function(a,b,c){var z,y,x
H.p(a,"$ish",[P.x],"$ash")
z=J.bA(a)
for(y=0;y<b;++y)if(!z.H())throw H.d(P.ap(b,0,y,null,null))
x=[]
for(;z.H();)x.push(z.gP(z))
return H.eT(x)},
j_:function(a,b,c){return new H.i3(a,H.i4(a,!1,!0,!1))},
fQ:function(a,b,c,d){var z,y,x,w,v,u
H.p(a,"$isc",[P.x],"$asc")
if(c===C.o){z=$.$get$fP().b
z=z.test(b)}else z=!1
if(z)return b
y=C.y.hU(H.E(b,H.al(c,"d9",0)))
for(z=y.length,x=0,w="";x<z;++x){v=y[x]
if(v<128){u=v>>>4
if(u>=8)return H.j(a,u)
u=(a[u]&1<<(v&15))!==0}else u=!1
if(u)w+=H.iV(v)
else w=w+"%"+"0123456789ABCDEF"[v>>>4&15]+"0123456789ABCDEF"[v&15]}return w.charCodeAt(0)==0?w:w},
cE:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.au(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hN(a)},
u:function(a){return new P.fA(a)},
cL:function(a,b,c,d){var z,y
H.f(b,{func:1,ret:d,args:[P.x]})
z=H.a([],[d])
C.a.sl(z,a)
for(y=0;y<a;++y)C.a.m(z,y,b.$1(y))
return z},
e0:function(a){H.m6(a)},
a8:{"^":"b;"},
"+bool":0,
aL:{"^":"b;a,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aL))return!1
return this.a===b.a&&this.b===b.b},
gZ:function(a){var z=this.a
return(z^C.e.by(z,30))&1073741823},
i:function(a){var z,y,x,w,v,u,t
z=P.hD(H.iT(this))
y=P.ci(H.iR(this))
x=P.ci(H.iN(this))
w=P.ci(H.iO(this))
v=P.ci(H.iQ(this))
u=P.ci(H.iS(this))
t=P.hE(H.iP(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
q:{
hD:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
hE:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
ci:function(a){if(a>=10)return""+a
return"0"+a}}},
y:{"^":"Z;"},
"+double":0,
bE:{"^":"b;a",
U:function(a,b){return C.e.U(this.a,H.i(b,"$isbE").a)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.bE))return!1
return this.a===b.a},
gZ:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.hI()
y=this.a
if(y<0)return"-"+new P.bE(0-y).i(0)
x=z.$1(C.e.a_(y,6e7)%60)
w=z.$1(C.e.a_(y,1e6)%60)
v=new P.hH().$1(y%1e6)
return""+C.e.a_(y,36e8)+":"+H.l(x)+":"+H.l(w)+"."+H.l(v)},
q:{
cj:function(a,b,c,d,e,f){return new P.bE(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
hH:{"^":"v:17;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hI:{"^":"v:17;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a5:{"^":"b;"},
eO:{"^":"a5;",
i:function(a){return"Throw of null."}},
aK:{"^":"a5;a,b,c,d",
gc5:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gc4:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.l(z)
w=this.gc5()+y+x
if(!this.a)return w
v=this.gc4()
u=P.cE(this.b)
return w+v+": "+H.l(u)},
q:{
hk:function(a){return new P.aK(!1,null,null,a)},
cx:function(a,b,c){return new P.aK(!0,a,b,c)},
e1:function(a){return new P.aK(!1,null,a,"Must not be null")}}},
cM:{"^":"aK;e,f,a,b,c,d",
gc5:function(){return"RangeError"},
gc4:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.l(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.l(z)
else if(x>z)y=": Not in range "+H.l(z)+".."+H.l(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.l(z)}return y},
q:{
cq:function(a,b,c){return new P.cM(null,null,!0,a,b,"Value not in range")},
ap:function(a,b,c,d,e){return new P.cM(b,c,!0,a,d,"Invalid value")},
dv:function(a,b,c,d,e,f){var z
if(typeof a!=="number")return H.e(a)
if(0<=a){if(typeof c!=="number")return H.e(c)
z=a>c}else z=!0
if(z)throw H.d(P.ap(a,0,c,"start",f))
if(b!=null){if(!(a>b)){if(typeof c!=="number")return H.e(c)
z=b>c}else z=!0
if(z)throw H.d(P.ap(b,a,c,"end",f))
return b}return c}}},
hZ:{"^":"aK;e,l:f>,a,b,c,d",
gc5:function(){return"RangeError"},
gc4:function(){if(J.hc(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.l(z)},
q:{
S:function(a,b,c,d,e){var z=H.z(e!=null?e:J.bB(b))
return new P.hZ(b,z,!0,a,c,"Index out of range")}}},
jW:{"^":"a5;a",
i:function(a){return"Unsupported operation: "+this.a},
q:{
J:function(a){return new P.jW(a)}}},
jT:{"^":"a5;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
q:{
fu:function(a){return new P.jT(a)}}},
jo:{"^":"a5;a",
i:function(a){return"Bad state: "+this.a}},
hz:{"^":"a5;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.l(P.cE(z))+"."},
q:{
bD:function(a){return new P.hz(a)}}},
iG:{"^":"b;",
i:function(a){return"Out of Memory"},
$isa5:1},
f1:{"^":"b;",
i:function(a){return"Stack Overflow"},
$isa5:1},
hC:{"^":"a5;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
fA:{"^":"b;a",
i:function(a){return"Exception: "+this.a}},
hT:{"^":"b;a,b,c",
i:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.i.bZ(x,0,75)+"..."
return y+"\n"+x},
q:{
eo:function(a,b,c){return new P.hT(a,b,c)}}},
x:{"^":"Z;"},
"+int":0,
h:{"^":"b;$ti",
gl:function(a){var z,y
z=this.ga1(this)
for(y=0;z.H();)++y
return y},
J:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.e1("index"))
if(b<0)H.t(P.ap(b,0,null,"index",null))
for(z=this.ga1(this),y=0;z.H();){x=z.gP(z)
if(b===y)return x;++y}throw H.d(P.S(b,this,"index",null,y))},
i:function(a){return P.i_(this,"(",")")}},
dk:{"^":"b;$ti"},
c:{"^":"b;$ti",$ish:1},
"+List":0,
ab:{"^":"b;$ti"},
R:{"^":"b;",
gZ:function(a){return P.b.prototype.gZ.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
Z:{"^":"b;"},
"+num":0,
b:{"^":";",
u:function(a,b){return this===b},
gZ:function(a){return H.bT(this)},
i:function(a){return"Instance of '"+H.bo(this)+"'"},
toString:function(){return this.i(this)}},
ay:{"^":"b;"},
o:{"^":"b;",$iseP:1},
"+String":0,
cr:{"^":"b;aS:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
f4:function(a,b,c){var z=J.bA(b)
if(!z.H())return a
if(c.length===0){do a+=H.l(z.gP(z))
while(z.H())}else{a+=H.l(z.gP(z))
for(;z.H();)a=a+c+H.l(z.gP(z))}return a}}}}],["","",,W,{"^":"",
hj:function(a){var z=document.createElement("a")
return z},
d7:function(a,b){var z=document.createElement("canvas")
return z},
hK:function(a){H.i(a,"$isaj")
return"wheel"},
cR:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fC:function(a,b,c,d){var z,y
z=W.cR(W.cR(W.cR(W.cR(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
fV:function(a,b){var z
H.f(a,{func:1,ret:-1,args:[b]})
z=$.T
if(z===C.j)return a
return z.dD(a,b)},
bK:{"^":"a1;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLInputElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
mc:{"^":"q;0l:length=","%":"AccessibleNodeList"},
md:{"^":"bK;",
i:function(a){return String(a)},
"%":"HTMLAnchorElement"},
me:{"^":"bK;",
i:function(a){return String(a)},
"%":"HTMLAreaElement"},
ho:{"^":"q;","%":";Blob"},
d6:{"^":"bK;",
bW:function(a,b,c){if(c!=null)return a.getContext(b,P.lK(c,null))
return a.getContext(b)},
en:function(a,b){return this.bW(a,b,null)},
$isd6:1,
"%":"HTMLCanvasElement"},
e7:{"^":"q;",$ise7:1,"%":"CanvasRenderingContext2D"},
mk:{"^":"L;0l:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
mm:{"^":"hB;0l:length=","%":"CSSPerspective"},
aY:{"^":"q;",$isaY:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
mn:{"^":"kn;0l:length=",
eo:function(a,b){var z=a.getPropertyValue(this.f6(a,b))
return z==null?"":z},
f6:function(a,b){var z,y
z=$.$get$ed()
y=z[b]
if(typeof y==="string")return y
y=this.he(a,b)
z[b]=y
return y},
he:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.hF()+b
if(z in a)return z
return b},
gcr:function(a){return a.bottom},
gav:function(a){return a.height},
gah:function(a){return a.left},
gal:function(a){return a.right},
gbm:function(a){return a.top},
gaz:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hA:{"^":"b;",
gah:function(a){return this.eo(a,"left")}},
ee:{"^":"q;","%":"CSSImageValue|CSSKeywordValue|CSSNumericValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue|CSSUnitValue;CSSStyleValue"},
hB:{"^":"q;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
mo:{"^":"ee;0l:length=","%":"CSSTransformValue"},
mp:{"^":"ee;0l:length=","%":"CSSUnparsedValue"},
mq:{"^":"q;0l:length=","%":"DataTransferItemList"},
mr:{"^":"q;",
i:function(a){return String(a)},
"%":"DOMException"},
ms:{"^":"kp;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.p(c,"$isa7",[P.Z],"$asa7")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[[P.a7,P.Z]]},
$isI:1,
$asI:function(){return[[P.a7,P.Z]]},
$asw:function(){return[[P.a7,P.Z]]},
$ish:1,
$ash:function(){return[[P.a7,P.Z]]},
$isc:1,
$asc:function(){return[[P.a7,P.Z]]},
$asB:function(){return[[P.a7,P.Z]]},
"%":"ClientRectList|DOMRectList"},
hG:{"^":"q;",
i:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(this.gaz(a))+" x "+H.l(this.gav(a))},
u:function(a,b){var z
if(b==null)return!1
z=H.c4(b,"$isa7",[P.Z],"$asa7")
if(!z)return!1
z=J.c6(b)
return a.left===z.gah(b)&&a.top===z.gbm(b)&&this.gaz(a)===z.gaz(b)&&this.gav(a)===z.gav(b)},
gZ:function(a){return W.fC(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gaz(a)&0x1FFFFFFF,this.gav(a)&0x1FFFFFFF)},
gcr:function(a){return a.bottom},
gav:function(a){return a.height},
gah:function(a){return a.left},
gal:function(a){return a.right},
gbm:function(a){return a.top},
gaz:function(a){return a.width},
$isa7:1,
$asa7:function(){return[P.Z]},
"%":";DOMRectReadOnly"},
mt:{"^":"kr;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.U(c)
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[P.o]},
$isI:1,
$asI:function(){return[P.o]},
$asw:function(){return[P.o]},
$ish:1,
$ash:function(){return[P.o]},
$isc:1,
$asc:function(){return[P.o]},
$asB:function(){return[P.o]},
"%":"DOMStringList"},
mu:{"^":"q;0l:length=","%":"DOMTokenList"},
km:{"^":"cK;a,b",
gl:function(a){return this.b.length},
k:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.j(z,b)
return H.i(z[b],"$isa1")},
m:function(a,b,c){var z
H.z(b)
H.i(c,"$isa1")
z=this.b
if(b>>>0!==b||b>=z.length)return H.j(z,b)
this.a.replaceChild(c,z[b])},
h:function(a,b){this.a.appendChild(b)
return b},
ga1:function(a){var z=this.iO(this)
return new J.av(z,z.length,0,[H.A(z,0)])},
$asw:function(){return[W.a1]},
$ash:function(){return[W.a1]},
$asc:function(){return[W.a1]}},
a1:{"^":"L;",
gdF:function(a){return new W.km(a,a.children)},
gdG:function(a){return P.iX(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,P.Z)},
i:function(a){return a.localName},
$isa1:1,
"%":";Element"},
ai:{"^":"q;",$isai:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
aj:{"^":"q;",
dC:["es",function(a,b,c,d){H.f(c,{func:1,args:[W.ai]})
if(c!=null)this.eU(a,b,c,!1)}],
eU:function(a,b,c,d){return a.addEventListener(b,H.bv(H.f(c,{func:1,args:[W.ai]}),1),!1)},
$isaj:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OffscreenCanvas|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|VisualViewport|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|XMLHttpRequest|XMLHttpRequestEventTarget|XMLHttpRequestUpload|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;fI|fJ|fL|fM"},
aZ:{"^":"ho;",$isaZ:1,"%":"File"},
mv:{"^":"kw;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isaZ")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.aZ]},
$isI:1,
$asI:function(){return[W.aZ]},
$asw:function(){return[W.aZ]},
$ish:1,
$ash:function(){return[W.aZ]},
$isc:1,
$asc:function(){return[W.aZ]},
$asB:function(){return[W.aZ]},
"%":"FileList"},
mw:{"^":"aj;0l:length=","%":"FileWriter"},
mx:{"^":"bK;0l:length=","%":"HTMLFormElement"},
b_:{"^":"q;",$isb_:1,"%":"Gamepad"},
my:{"^":"q;0l:length=","%":"History"},
mz:{"^":"kJ;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isL")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.L]},
$isI:1,
$asI:function(){return[W.L]},
$asw:function(){return[W.L]},
$ish:1,
$ash:function(){return[W.L]},
$isc:1,
$asc:function(){return[W.L]},
$asB:function(){return[W.L]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
cH:{"^":"q;0dJ:data=",$iscH:1,"%":"ImageData"},
et:{"^":"bK;",$iset:1,"%":"HTMLImageElement"},
bO:{"^":"dH;",$isbO:1,"%":"KeyboardEvent"},
mD:{"^":"q;",
i:function(a){return String(a)},
"%":"Location"},
mE:{"^":"q;0l:length=","%":"MediaList"},
mF:{"^":"aj;",
dC:function(a,b,c,d){H.f(c,{func:1,args:[W.ai]})
if(b==="message")a.start()
this.es(a,b,c,!1)},
"%":"MessagePort"},
mG:{"^":"kQ;",
k:function(a,b){return P.aU(a.get(H.U(b)))},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.o,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aU(y.value[1]))}},
gaK:function(a){var z=H.a([],[P.o])
this.N(a,new W.iv(z))
return z},
gl:function(a){return a.size},
$asam:function(){return[P.o,null]},
$isab:1,
$asab:function(){return[P.o,null]},
"%":"MIDIInputMap"},
iv:{"^":"v:5;a",
$2:function(a,b){return C.a.h(this.a,a)}},
mH:{"^":"kR;",
k:function(a,b){return P.aU(a.get(H.U(b)))},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.o,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aU(y.value[1]))}},
gaK:function(a){var z=H.a([],[P.o])
this.N(a,new W.iw(z))
return z},
gl:function(a){return a.size},
$asam:function(){return[P.o,null]},
$isab:1,
$asab:function(){return[P.o,null]},
"%":"MIDIOutputMap"},
iw:{"^":"v:5;a",
$2:function(a,b){return C.a.h(this.a,a)}},
b3:{"^":"q;",$isb3:1,"%":"MimeType"},
mI:{"^":"kT;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isb3")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b3]},
$isI:1,
$asI:function(){return[W.b3]},
$asw:function(){return[W.b3]},
$ish:1,
$ash:function(){return[W.b3]},
$isc:1,
$asc:function(){return[W.b3]},
$asB:function(){return[W.b3]},
"%":"MimeTypeArray"},
ax:{"^":"dH;",$isax:1,"%":"PointerEvent;DragEvent|MouseEvent"},
kl:{"^":"cK;a",
m:function(a,b,c){var z,y
H.z(b)
H.i(c,"$isL")
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.j(y,b)
z.replaceChild(c,y[b])},
ga1:function(a){var z=this.a.childNodes
return new W.en(z,z.length,-1,[H.bx(C.J,z,"B",0)])},
gl:function(a){return this.a.childNodes.length},
k:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.j(z,b)
return z[b]},
$asw:function(){return[W.L]},
$ash:function(){return[W.L]},
$asc:function(){return[W.L]}},
L:{"^":"aj;",
iE:function(a,b){var z,y
try{z=a.parentNode
J.he(z,b,a)}catch(y){H.aV(y)}return a},
i:function(a){var z=a.nodeValue
return z==null?this.eu(a):z},
h0:function(a,b,c){return a.replaceChild(b,c)},
$isL:1,
"%":"Attr|Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},
iC:{"^":"kV;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isL")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.L]},
$isI:1,
$asI:function(){return[W.L]},
$asw:function(){return[W.L]},
$ish:1,
$ash:function(){return[W.L]},
$isc:1,
$asc:function(){return[W.L]},
$asB:function(){return[W.L]},
"%":"NodeList|RadioNodeList"},
b5:{"^":"q;0l:length=",$isb5:1,"%":"Plugin"},
mR:{"^":"kZ;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isb5")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b5]},
$isI:1,
$asI:function(){return[W.b5]},
$asw:function(){return[W.b5]},
$ish:1,
$ash:function(){return[W.b5]},
$isc:1,
$asc:function(){return[W.b5]},
$asB:function(){return[W.b5]},
"%":"PluginArray"},
mT:{"^":"l4;",
k:function(a,b){return P.aU(a.get(H.U(b)))},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.o,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aU(y.value[1]))}},
gaK:function(a){var z=H.a([],[P.o])
this.N(a,new W.j5(z))
return z},
gl:function(a){return a.size},
$asam:function(){return[P.o,null]},
$isab:1,
$asab:function(){return[P.o,null]},
"%":"RTCStatsReport"},
j5:{"^":"v:5;a",
$2:function(a,b){return C.a.h(this.a,a)}},
mV:{"^":"bK;0l:length=","%":"HTMLSelectElement"},
b8:{"^":"aj;",$isb8:1,"%":"SourceBuffer"},
mW:{"^":"fJ;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isb8")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b8]},
$isI:1,
$asI:function(){return[W.b8]},
$asw:function(){return[W.b8]},
$ish:1,
$ash:function(){return[W.b8]},
$isc:1,
$asc:function(){return[W.b8]},
$asB:function(){return[W.b8]},
"%":"SourceBufferList"},
b9:{"^":"q;",$isb9:1,"%":"SpeechGrammar"},
mX:{"^":"l6;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isb9")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b9]},
$isI:1,
$asI:function(){return[W.b9]},
$asw:function(){return[W.b9]},
$ish:1,
$ash:function(){return[W.b9]},
$isc:1,
$asc:function(){return[W.b9]},
$asB:function(){return[W.b9]},
"%":"SpeechGrammarList"},
ba:{"^":"q;0l:length=",$isba:1,"%":"SpeechRecognitionResult"},
mZ:{"^":"l9;",
k:function(a,b){return a.getItem(H.U(b))},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.o,P.o]})
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gaK:function(a){var z=H.a([],[P.o])
this.N(a,new W.jr(z))
return z},
gl:function(a){return a.length},
$asam:function(){return[P.o,P.o]},
$isab:1,
$asab:function(){return[P.o,P.o]},
"%":"Storage"},
jr:{"^":"v:25;a",
$2:function(a,b){return C.a.h(this.a,a)}},
bb:{"^":"q;",$isbb:1,"%":"CSSStyleSheet|StyleSheet"},
bc:{"^":"aj;",$isbc:1,"%":"TextTrack"},
bd:{"^":"aj;",$isbd:1,"%":"TextTrackCue|VTTCue"},
n2:{"^":"ld;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isbd")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bd]},
$isI:1,
$asI:function(){return[W.bd]},
$asw:function(){return[W.bd]},
$ish:1,
$ash:function(){return[W.bd]},
$isc:1,
$asc:function(){return[W.bd]},
$asB:function(){return[W.bd]},
"%":"TextTrackCueList"},
n3:{"^":"fM;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isbc")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bc]},
$isI:1,
$asI:function(){return[W.bc]},
$asw:function(){return[W.bc]},
$ish:1,
$ash:function(){return[W.bc]},
$isc:1,
$asc:function(){return[W.bc]},
$asB:function(){return[W.bc]},
"%":"TextTrackList"},
n4:{"^":"q;0l:length=","%":"TimeRanges"},
be:{"^":"q;",$isbe:1,"%":"Touch"},
bp:{"^":"dH;",$isbp:1,"%":"TouchEvent"},
n5:{"^":"lj;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isbe")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.be]},
$isI:1,
$asI:function(){return[W.be]},
$asw:function(){return[W.be]},
$ish:1,
$ash:function(){return[W.be]},
$isc:1,
$asc:function(){return[W.be]},
$asB:function(){return[W.be]},
"%":"TouchList"},
n6:{"^":"q;0l:length=","%":"TrackDefaultList"},
dH:{"^":"ai;","%":"CompositionEvent|FocusEvent|TextEvent;UIEvent"},
n9:{"^":"q;",
i:function(a){return String(a)},
"%":"URL"},
na:{"^":"aj;0l:length=","%":"VideoTrackList"},
bZ:{"^":"ax;",
ghY:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(P.J("deltaY is not supported"))},
ghX:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.d(P.J("deltaX is not supported"))},
$isbZ:1,
"%":"WheelEvent"},
kc:{"^":"aj;",
h1:function(a,b){return a.requestAnimationFrame(H.bv(H.f(b,{func:1,ret:-1,args:[P.Z]}),1))},
fe:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
"%":"DOMWindow|Window"},
nf:{"^":"lp;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isaY")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.aY]},
$isI:1,
$asI:function(){return[W.aY]},
$asw:function(){return[W.aY]},
$ish:1,
$ash:function(){return[W.aY]},
$isc:1,
$asc:function(){return[W.aY]},
$asB:function(){return[W.aY]},
"%":"CSSRuleList"},
ng:{"^":"hG;",
i:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(a.width)+" x "+H.l(a.height)},
u:function(a,b){var z
if(b==null)return!1
z=H.c4(b,"$isa7",[P.Z],"$asa7")
if(!z)return!1
z=J.c6(b)
return a.left===z.gah(b)&&a.top===z.gbm(b)&&a.width===z.gaz(b)&&a.height===z.gav(b)},
gZ:function(a){return W.fC(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gav:function(a){return a.height},
gaz:function(a){return a.width},
"%":"ClientRect|DOMRect"},
ni:{"^":"lr;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isb_")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.b_]},
$isI:1,
$asI:function(){return[W.b_]},
$asw:function(){return[W.b_]},
$ish:1,
$ash:function(){return[W.b_]},
$isc:1,
$asc:function(){return[W.b_]},
$asB:function(){return[W.b_]},
"%":"GamepadList"},
nj:{"^":"lt;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isL")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.L]},
$isI:1,
$asI:function(){return[W.L]},
$asw:function(){return[W.L]},
$ish:1,
$ash:function(){return[W.L]},
$isc:1,
$asc:function(){return[W.L]},
$asB:function(){return[W.L]},
"%":"MozNamedAttrMap|NamedNodeMap"},
nk:{"^":"lv;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isba")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.ba]},
$isI:1,
$asI:function(){return[W.ba]},
$asw:function(){return[W.ba]},
$ish:1,
$ash:function(){return[W.ba]},
$isc:1,
$asc:function(){return[W.ba]},
$asB:function(){return[W.ba]},
"%":"SpeechRecognitionResultList"},
nl:{"^":"lx;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a[b]},
m:function(a,b,c){H.z(b)
H.i(c,"$isbb")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){if(b>>>0!==b||b>=a.length)return H.j(a,b)
return a[b]},
$isF:1,
$asF:function(){return[W.bb]},
$isI:1,
$asI:function(){return[W.bb]},
$asw:function(){return[W.bb]},
$ish:1,
$ash:function(){return[W.bb]},
$isc:1,
$asc:function(){return[W.bb]},
$asB:function(){return[W.bb]},
"%":"StyleSheetList"},
ks:{"^":"dB;a,b,c,$ti",
ic:function(a,b,c,d){var z=H.A(this,0)
H.f(a,{func:1,ret:-1,args:[z]})
H.f(c,{func:1,ret:-1})
return W.a4(this.a,this.b,a,!1,z)}},
nh:{"^":"ks;a,b,c,$ti"},
kt:{"^":"f3;a,b,c,d,e,$ti",
hk:function(){var z=this.d
if(z!=null&&this.a<=0)J.hf(this.b,this.c,z,!1)},
q:{
a4:function(a,b,c,d,e){var z=c==null?null:W.fV(new W.ku(c),W.ai)
z=new W.kt(0,a,b,z,!1,[e])
z.hk()
return z}}},
ku:{"^":"v:6;a",
$1:function(a){return this.a.$1(H.i(a,"$isai"))}},
B:{"^":"b;$ti",
ga1:function(a){return new W.en(a,this.gl(a),-1,[H.bx(this,a,"B",0)])}},
en:{"^":"b;a,b,c,0d,$ti",
H:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.hd(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gP:function(a){return this.d}},
kn:{"^":"q+hA;"},
ko:{"^":"q+w;"},
kp:{"^":"ko+B;"},
kq:{"^":"q+w;"},
kr:{"^":"kq+B;"},
kv:{"^":"q+w;"},
kw:{"^":"kv+B;"},
kI:{"^":"q+w;"},
kJ:{"^":"kI+B;"},
kQ:{"^":"q+am;"},
kR:{"^":"q+am;"},
kS:{"^":"q+w;"},
kT:{"^":"kS+B;"},
kU:{"^":"q+w;"},
kV:{"^":"kU+B;"},
kY:{"^":"q+w;"},
kZ:{"^":"kY+B;"},
l4:{"^":"q+am;"},
fI:{"^":"aj+w;"},
fJ:{"^":"fI+B;"},
l5:{"^":"q+w;"},
l6:{"^":"l5+B;"},
l9:{"^":"q+am;"},
lc:{"^":"q+w;"},
ld:{"^":"lc+B;"},
fL:{"^":"aj+w;"},
fM:{"^":"fL+B;"},
li:{"^":"q+w;"},
lj:{"^":"li+B;"},
lo:{"^":"q+w;"},
lp:{"^":"lo+B;"},
lq:{"^":"q+w;"},
lr:{"^":"lq+B;"},
ls:{"^":"q+w;"},
lt:{"^":"ls+B;"},
lu:{"^":"q+w;"},
lv:{"^":"lu+B;"},
lw:{"^":"q+w;"},
lx:{"^":"lw+B;"}}],["","",,P,{"^":"",
lN:function(a){var z,y
z=J.P(a)
if(!!z.$iscH){y=z.gdJ(a)
if(y.constructor===Array)if(typeof CanvasPixelArray!=="undefined"){y.constructor=CanvasPixelArray
y.BYTES_PER_ELEMENT=1}return a}return new P.fO(a.data,a.height,a.width)},
lM:function(a){if(a instanceof P.fO)return{data:a.a,height:a.b,width:a.c}
return a},
aU:function(a){var z,y,x,w,v
if(a==null)return
z=P.ib(P.o,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w){v=H.U(y[w])
z.m(0,v,a[v])}return z},
lK:function(a,b){var z={}
a.N(0,new P.lL(z))
return z},
ek:function(){var z=$.ej
if(z==null){z=J.d_(window.navigator.userAgent,"Opera",0)
$.ej=z}return z},
hF:function(){var z,y
z=$.eg
if(z!=null)return z
y=$.eh
if(y==null){y=J.d_(window.navigator.userAgent,"Firefox",0)
$.eh=y}if(y)z="-moz-"
else{y=$.ei
if(y==null){y=!P.ek()&&J.d_(window.navigator.userAgent,"Trident/",0)
$.ei=y}if(y)z="-ms-"
else z=P.ek()?"-o-":"-webkit-"}$.eg=z
return z},
fO:{"^":"b;dJ:a>,b,c",$iscH:1},
lL:{"^":"v:16;a",
$2:function(a,b){this.a[a]=b}},
hQ:{"^":"cK;a,b",
gbw:function(){var z,y,x
z=this.b
y=H.al(z,"w",0)
x=W.a1
return new H.ij(new H.ka(z,H.f(new P.hR(),{func:1,ret:P.a8,args:[y]}),[y]),H.f(new P.hS(),{func:1,ret:x,args:[y]}),[y,x])},
m:function(a,b,c){var z
H.z(b)
H.i(c,"$isa1")
z=this.gbw()
J.hh(z.b.$1(J.d0(z.a,b)),c)},
h:function(a,b){this.b.a.appendChild(b)},
gl:function(a){return J.bB(this.gbw().a)},
k:function(a,b){var z=this.gbw()
return z.b.$1(J.d0(z.a,b))},
ga1:function(a){var z=P.eD(this.gbw(),!1,W.a1)
return new J.av(z,z.length,0,[H.A(z,0)])},
$asw:function(){return[W.a1]},
$ash:function(){return[W.a1]},
$asc:function(){return[W.a1]}},
hR:{"^":"v:40;",
$1:function(a){return!!J.P(H.i(a,"$isL")).$isa1}},
hS:{"^":"v:26;",
$1:function(a){return H.k(H.i(a,"$isL"),"$isa1")}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
cS:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
kK:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
l_:{"^":"b;$ti",
gal:function(a){var z=this.a
if(typeof z!=="number")return z.n()
return H.E(z+this.c,H.A(this,0))},
gcr:function(a){var z=this.b
if(typeof z!=="number")return z.n()
return H.E(z+this.d,H.A(this,0))},
i:function(a){return"Rectangle ("+H.l(this.a)+", "+H.l(this.b)+") "+this.c+" x "+this.d},
u:function(a,b){var z,y,x,w
if(b==null)return!1
z=H.c4(b,"$isa7",[P.Z],"$asa7")
if(!z)return!1
z=this.a
y=J.c6(b)
x=y.gah(b)
if(z==null?x==null:z===x){x=this.b
w=y.gbm(b)
if(x==null?w==null:x===w){if(typeof z!=="number")return z.n()
w=H.A(this,0)
if(H.E(z+this.c,w)===y.gal(b)){if(typeof x!=="number")return x.n()
z=H.E(x+this.d,w)===y.gcr(b)}else z=!1}else z=!1}else z=!1
return z},
gZ:function(a){var z,y,x,w,v
z=this.a
y=J.bi(z)
x=this.b
w=J.bi(x)
if(typeof z!=="number")return z.n()
v=H.A(this,0)
z=H.E(z+this.c,v)
if(typeof x!=="number")return x.n()
v=H.E(x+this.d,v)
return P.kK(P.cS(P.cS(P.cS(P.cS(0,y),w),z&0x1FFFFFFF),v&0x1FFFFFFF))}},
a7:{"^":"l_;ah:a>,bm:b>,az:c>,av:d>,$ti",q:{
iX:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.U()
if(c<0)z=-c*0
else z=c
H.E(z,e)
if(typeof d!=="number")return d.U()
if(d<0)y=-d*0
else y=d
return new P.a7(a,b,z,H.E(y,e),[e])}}}}],["","",,P,{"^":"",bP:{"^":"q;",$isbP:1,"%":"SVGLength"},mC:{"^":"kM;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.z(b)
H.i(c,"$isbP")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asw:function(){return[P.bP]},
$ish:1,
$ash:function(){return[P.bP]},
$isc:1,
$asc:function(){return[P.bP]},
$asB:function(){return[P.bP]},
"%":"SVGLengthList"},bS:{"^":"q;",$isbS:1,"%":"SVGNumber"},mP:{"^":"kX;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.z(b)
H.i(c,"$isbS")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asw:function(){return[P.bS]},
$ish:1,
$ash:function(){return[P.bS]},
$isc:1,
$asc:function(){return[P.bS]},
$asB:function(){return[P.bS]},
"%":"SVGNumberList"},mS:{"^":"q;0l:length=","%":"SVGPointList"},n_:{"^":"lb;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.z(b)
H.U(c)
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asw:function(){return[P.o]},
$ish:1,
$ash:function(){return[P.o]},
$isc:1,
$asc:function(){return[P.o]},
$asB:function(){return[P.o]},
"%":"SVGStringList"},n0:{"^":"a1;",
gdF:function(a){return new P.hQ(a,new W.kl(a))},
"%":"SVGAElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGDefsElement|SVGDescElement|SVGDiscardElement|SVGElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGGradientElement|SVGGraphicsElement|SVGImageElement|SVGLineElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRadialGradientElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement|SVGTitleElement|SVGUseElement|SVGViewElement"},bU:{"^":"q;",$isbU:1,"%":"SVGTransform"},n7:{"^":"ll;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return a.getItem(b)},
m:function(a,b,c){H.z(b)
H.i(c,"$isbU")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asw:function(){return[P.bU]},
$ish:1,
$ash:function(){return[P.bU]},
$isc:1,
$asc:function(){return[P.bU]},
$asB:function(){return[P.bU]},
"%":"SVGTransformList"},kL:{"^":"q+w;"},kM:{"^":"kL+B;"},kW:{"^":"q+w;"},kX:{"^":"kW+B;"},la:{"^":"q+w;"},lb:{"^":"la+B;"},lk:{"^":"q+w;"},ll:{"^":"lk+B;"}}],["","",,P,{"^":"",mf:{"^":"q;0l:length=","%":"AudioBuffer"},mg:{"^":"kk;",
k:function(a,b){return P.aU(a.get(H.U(b)))},
N:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.o,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aU(y.value[1]))}},
gaK:function(a){var z=H.a([],[P.o])
this.N(a,new P.hm(z))
return z},
gl:function(a){return a.size},
$asam:function(){return[P.o,null]},
$isab:1,
$asab:function(){return[P.o,null]},
"%":"AudioParamMap"},hm:{"^":"v:5;a",
$2:function(a,b){return C.a.h(this.a,a)}},mh:{"^":"aj;0l:length=","%":"AudioTrackList"},hn:{"^":"aj;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},mQ:{"^":"hn;0l:length=","%":"OfflineAudioContext"},kk:{"^":"q+am;"}}],["","",,P,{"^":"",dy:{"^":"q;",
iM:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=J.P(g)
if(!!z.$iscH)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,P.lM(g))
return}if(!!z.$iset)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.hk("Incorrect number or type of arguments"))},
iL:function(a,b,c,d,e,f,g){return this.iM(a,b,c,d,e,f,g,null,null,null)},
$isdy:1,
"%":"WebGLRenderingContext"},jR:{"^":"q;",$isjR:1,"%":"WebGLUniformLocation"}}],["","",,P,{"^":"",mY:{"^":"l8;",
gl:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.S(b,a,null,null,null))
return P.aU(a.item(b))},
m:function(a,b,c){H.z(b)
H.i(c,"$isab")
throw H.d(P.J("Cannot assign element of immutable List."))},
J:function(a,b){return this.k(a,b)},
$asw:function(){return[[P.ab,,,]]},
$ish:1,
$ash:function(){return[[P.ab,,,]]},
$isc:1,
$asc:function(){return[[P.ab,,,]]},
$asB:function(){return[[P.ab,,,]]},
"%":"SQLResultSetRowList"},l7:{"^":"q+w;"},l8:{"^":"l7+B;"}}],["","",,L,{"^":"",iE:{"^":"b;a",q:{
iF:function(a){var z,y,x,w,v,u,t,s
z=new Array(256)
z.fixed$length=Array
y=[P.x]
x=H.a(z,y)
z=new Array(256)
z.fixed$length=Array
w=H.a(z,y)
for(v=0;v<256;++v)C.a.m(w,v,v)
u=P.h2("6364136223846793005",null,null)
t=P.h2("1442695040888963407",null,null)
if(typeof u!=="number")return H.e(u)
if(typeof t!=="number")return H.e(t)
a=C.e.cO(C.e.cO(C.e.cO(a*u+t,64)*u+t,64)*u+t,64)
for(v=255;v>=0;--v){z=a*u+t
a=((z&-1)>>>0)-(z&0)
s=C.e.cW(a+31,v+1)
if(s>=256)return H.j(w,s)
C.a.m(x,v,w[s])
w[s]=w[v]}return new L.iE(x)}}}}],["","",,B,{"^":"",hO:{"^":"b;a,b,c,d,0e",
ac:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=new B.b6(a,b)
y=this.c.v(0,z).v(0,$.$get$de().j(0,a+b))
x=y.a
w=y.b
v=2-x*x-w*w
if(v>0){u=v*v
t=this.e
s=this.b.n(0,z)
r=this.a
q=r[C.h.aa(s.a)&255]
s=C.h.aa(s.b)
if(typeof q!=="number")return q.n()
s=r[q+s&255]
if(typeof s!=="number")return s.cU()
p=(s&14)>>>1
s=$.$get$el()
if(p>=8)return H.j(s,p)
o=s[p]
this.e=t+u*u*(o.a*x+o.b*w)}}},b6:{"^":"b;a,b",
n:function(a,b){return new B.b6(this.a+b.a,this.b+b.b)},
v:function(a,b){return new B.b6(this.a-b.a,this.b-b.b)},
j:function(a,b){return new B.b6(this.a*b,this.b*b)},
i:function(a){return H.l(this.a)+", "+H.l(this.b)},
q:{
aF:function(a,b){return new B.b6(a,b)}}}}],["","",,O,{"^":"",af:{"^":"b;0a,0b,0c,0d,$ti",
bq:function(a){this.a=H.a([],[a])
this.b=null
this.c=null
this.d=null},
bX:function(a,b,c){var z=H.al(this,"af",0)
H.f(b,{func:1,ret:P.a8,args:[[P.h,z]]})
z={func:1,ret:-1,args:[P.x,[P.h,z]]}
H.f(a,z)
H.f(c,z)
this.b=b
this.c=a
this.d=c},
bp:function(a,b){return this.bX(a,null,b)},
b9:function(a){var z
H.p(a,"$ish",[H.al(this,"af",0)],"$ash")
z=this.b
if(z!=null)return z.$1(a)
return!0},
dm:function(a,b){var z
H.p(b,"$ish",[H.al(this,"af",0)],"$ash")
z=this.c
if(z!=null)z.$2(a,b)},
eH:function(a,b){var z
H.p(b,"$ish",[H.al(this,"af",0)],"$ash")
z=this.d
if(z!=null)z.$2(a,b)},
gl:function(a){return this.a.length},
ga1:function(a){var z=this.a
return new J.av(z,z.length,0,[H.A(z,0)])},
J:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.j(z,b)
return z[b]},
h:function(a,b){var z,y,x
z=H.al(this,"af",0)
H.E(b,z)
z=[z]
if(this.b9(H.a([b],z))){y=this.a
x=y.length
C.a.h(y,b)
this.dm(x,H.a([b],z))}},
aE:function(a,b){var z,y
H.p(b,"$ish",[H.al(this,"af",0)],"$ash")
if(this.b9(b)){z=this.a
y=z.length
C.a.aE(z,b)
this.dm(y,b)}},
T:function(a,b){var z
H.E(b,H.al(this,"af",0))
z=C.a.i6(this.a,b)
if(z>0){this.bV(0,z)
return!0}return!1},
bV:function(a,b){var z
if(b<0||b>=this.a.length)return
z=C.a.bV(this.a,b)
this.eH(b,H.a([z],[H.al(this,"af",0)]))
return z},
$ish:1,
q:{
da:function(a){var z=new O.af([a])
z.bq(a)
return z}}},dr:{"^":"b;0a,0b",
gl:function(a){return this.a.length},
gt:function(){var z=this.b
if(z==null){z=D.K()
this.b=z}return z},
eG:function(a){var z=this.b
if(!(z==null))z.A(a)},
aO:function(){return this.eG(null)},
gW:function(a){var z=this.a
if(z.length>0)return C.a.gcI(z)
else return V.bn()},
ef:function(a){var z=this.a
if(a==null)C.a.h(z,V.bn())
else C.a.h(z,a)
this.aO()},
cM:function(){var z=this.a
if(z.length>0){z.pop()
this.aO()}}}}],["","",,E,{"^":"",d2:{"^":"b;"},ah:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0a4:z@,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx",
d9:function(){var z,y
this.e=null
for(z=this.y.a,z=new J.av(z,z.length,0,[H.A(z,0)]);z.H();){y=z.d
if(y.f==null)y.d9()}},
scX:function(a){var z,y,x,w
z=this.d
if(z==null?a!=null:z!==a){this.c=null
this.d=a
this.e=null
if(z!=null){y=z.gt()
y.toString
x=H.f(this.gbT(),{func:1,ret:-1,args:[D.n]})
C.a.T(y.a,x)}y=this.d
if(y!=null){y=y.gt()
y.toString
x=H.f(this.gbT(),{func:1,ret:-1,args:[D.n]})
C.a.h(y.a,x)}w=new D.G("shapeBuilder",z,this.d,this,[F.dz])
w.b=!0
this.a2(w)}},
ab:function(a,b){var z,y,x,w
z=this.r
y=z!=null?z.ao(0,b,this):null
if(!J.W(y,this.x)){x=this.x
this.x=y
w=new D.G("matrix",x,y,this,[V.aD])
w.b=!0
this.a2(w)}z=this.f
if(z!=null)z.ab(0,b)
for(z=this.y.a,z=new J.av(z,z.length,0,[H.A(z,0)]);z.H();)z.d.ab(0,b)},
b5:function(a){var z,y,x
if(!this.b)return
z=a.dx
y=this.x
z.toString
if(y==null)C.a.h(z.a,z.gW(z))
else C.a.h(z.a,y.j(0,z.gW(z)))
z.aO()
a.eg(this.f)
z=a.dy
x=(z&&C.a).gcI(z)
if(x!=null&&this.d!=null)x.iD(a,this)
for(z=this.y.a,z=new J.av(z,z.length,0,[H.A(z,0)]);z.H();)z.d.b5(a)
a.ee()
a.dx.cM()},
gt:function(){var z=this.z
if(z==null){z=D.K()
this.z=z}return z},
a2:function(a){var z=this.z
if(!(z==null))z.A(a)},
a6:function(){return this.a2(null)},
io:[function(a){H.i(a,"$isn")
this.e=null
this.a2(a)},function(){return this.io(null)},"jR","$1","$0","gbT",0,2,1],
ip:[function(a){this.a2(H.i(a,"$isn"))},function(){return this.ip(null)},"jS","$1","$0","gec",0,2,1],
im:[function(a){this.a2(H.i(a,"$isn"))},function(){return this.im(null)},"jQ","$1","$0","geb",0,2,1],
ik:[function(a){this.a2(H.i(a,"$isn"))},function(){return this.ik(null)},"jO","$1","$0","gea",0,2,1],
jN:[function(a,b){var z,y,x,w,v,u,t
H.p(b,"$ish",[E.ah],"$ash")
for(z=b.length,y=this.gea(),x={func:1,ret:-1,args:[D.n]},w=[x],v=0;v<b.length;b.length===z||(0,H.C)(b),++v){u=b[v]
if(u!=null){if(u.ga4()==null){t=new D.bk()
t.a=H.a([],w)
t.c=0
u.sa4(t)}t=u.ga4()
t.toString
H.f(y,x)
C.a.h(t.a,y)}}this.a6()},"$2","gij",8,0,7],
jP:[function(a,b){var z,y,x,w,v,u,t
H.p(b,"$ish",[E.ah],"$ash")
for(z=b.length,y=this.gea(),x={func:1,ret:-1,args:[D.n]},w=[x],v=0;v<b.length;b.length===z||(0,H.C)(b),++v){u=b[v]
if(u!=null){if(u.ga4()==null){t=new D.bk()
t.a=H.a([],w)
t.c=0
u.sa4(t)}t=u.ga4()
t.toString
H.f(y,x)
C.a.T(t.a,y)}}this.a6()},"$2","gil",8,0,7],
$isaO:1,
q:{
bj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
z=new E.ah()
z.a=d
z.b=!0
y=O.da(E.ah)
z.y=y
y.bp(z.gij(),z.gil())
z.z=null
z.Q=null
z.ch=null
z.cx=null
z.cy=null
z.db=null
z.dx=null
z.dy=null
z.fr=null
z.fx=null
y=z.c
if(y==null?e!=null:y!==e){z.c=e
z.d=e
z.e=null
if(y!=null){x=y.gt()
x.toString
w=H.f(z.gbT(),{func:1,ret:-1,args:[D.n]})
C.a.T(x.a,w)}x=z.c
if(x!=null){x=x.gt()
x.toString
w=H.f(z.gbT(),{func:1,ret:-1,args:[D.n]})
C.a.h(x.a,w)}v=new D.G("shape",y,z.c,z,[F.f0])
v.b=!0
z.a2(v)}y=z.f
if(y==null?f!=null:y!==f){if(y!=null){y=y.gt()
y.toString
x=H.f(z.gec(),{func:1,ret:-1,args:[D.n]})
C.a.T(y.a,x)}u=z.f
z.f=f
if(f!=null){y=f.gt()
y.toString
x=H.f(z.gec(),{func:1,ret:-1,args:[D.n]})
C.a.h(y.a,x)}z.d9()
v=new D.G("technique",u,z.f,z,[O.dD])
v.b=!0
z.a2(v)}if(!J.W(z.r,c)){t=z.r
if(t!=null){y=t.gt()
y.toString
x=H.f(z.geb(),{func:1,ret:-1,args:[D.n]})
C.a.T(y.a,x)}if(c!=null){y=c.gt()
y.toString
x=H.f(z.geb(),{func:1,ret:-1,args:[D.n]})
C.a.h(y.a,x)}z.r=c
v=new D.G("mover",t,c,z,[U.a6])
v.b=!0
z.a2(v)}if(a!=null)z.y.aE(0,a)
return z}}},j0:{"^":"b;a,b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr",
eB:function(a,b){var z,y,x,w,v
this.c=512
this.d=512
this.e=0
z=new P.aL(Date.now(),!1)
this.f=z
this.r=z
this.x=z
this.y=0
this.z=null
this.Q=null
this.ch=null
this.cx=null
z=new O.dr()
y=[V.aD]
z.a=H.a([],y)
x=z.gt()
x.toString
w={func:1,ret:-1,args:[D.n]}
v=H.f(new E.j2(this),w)
C.a.h(x.a,v)
this.cy=z
z=new O.dr()
z.a=H.a([],y)
v=z.gt()
v.toString
x=H.f(new E.j3(this),w)
C.a.h(v.a,x)
this.db=z
z=new O.dr()
z.a=H.a([],y)
y=z.gt()
y.toString
w=H.f(new E.j4(this),w)
C.a.h(y.a,w)
this.dx=z
z=H.a([],[O.dD])
this.dy=z
C.a.h(z,null)
this.fr=new H.aM(0,0,[P.o,A.f_])},
giy:function(){var z,y
z=this.z
if(z==null){z=this.cy
z=z.gW(z)
y=this.db
y=z.j(0,y.gW(y))
this.z=y
z=y}return z},
eg:function(a){var z,y
z=this.dy
y=a==null?(z&&C.a).gcI(z):a;(z&&C.a).h(z,y)},
ee:function(){var z=this.dy
if(z.length>1)z.pop()},
q:{
j1:function(a,b){var z=new E.j0(a,b)
z.eB(a,b)
return z}}},j2:{"^":"v:8;a",
$1:function(a){var z
H.i(a,"$isn")
z=this.a
z.z=null
z.ch=null}},j3:{"^":"v:8;a",
$1:function(a){var z
H.i(a,"$isn")
z=this.a
z.z=null
z.Q=null
z.ch=null
z.cx=null}},j4:{"^":"v:8;a",
$1:function(a){var z
H.i(a,"$isn")
z=this.a
z.ch=null
z.cx=null}},jp:{"^":"n;c,a,0b"},jD:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0a4:x@,0y,0z,0Q,0ch",
gt:function(){var z=this.x
if(z==null){z=D.K()
this.x=z}return z},
eJ:[function(a){var z
H.i(a,"$isn")
z=this.x
if(!(z==null))z.A(a)
this.iG()},function(){return this.eJ(null)},"eI","$1","$0","gd0",0,2,1],
gi4:function(){var z,y,x
z=Date.now()
y=C.e.a_(P.cj(0,0,0,z-this.Q.a,0,0).a,1000)/1000
if(y<=0)return 0
x=this.ch
this.ch=0
this.Q=new P.aL(z,!1)
return x/y},
dt:function(){var z,y,x,w
z=window.devicePixelRatio
y=this.b.clientWidth
if(typeof y!=="number")return y.j()
if(typeof z!=="number")return H.e(z)
x=C.h.b4(y*z)
y=this.b.clientHeight
if(typeof y!=="number")return y.j()
w=C.h.b4(y*z)
y=this.b
if(y.width!==x||y.height!==w){y.width=x
y.height=w}P.dF(C.m,this.giF())},
iG:[function(){var z,y
if(!this.z){this.z=!0
z=window
y=H.f(new E.jF(this),{func:1,ret:-1,args:[P.Z]})
C.w.fe(z)
C.w.h1(z,W.fV(y,P.Z))}},"$0","giF",0,0,3],
iC:function(){var z,y,x,w,v
try{++this.ch
this.z=!1
this.dt()
if(this.d!=null){x=this.e;++x.e
x.r=x.x
w=Date.now()
x.x=new P.aL(w,!1)
x.y=P.cj(0,0,0,w-x.r.a,0,0).a*0.000001
w=x.cy
C.a.sl(w.a,0)
w.aO()
w=x.db
C.a.sl(w.a,0)
w.aO()
w=x.dx
C.a.sl(w.a,0)
w.aO()
w=x.dy;(w&&C.a).sl(w,0)
x=x.dy;(x&&C.a).h(x,null)
this.d.b5(this.e)}}catch(v){z=H.aV(v)
y=H.by(v)
P.e0("Error: "+H.l(z))
P.e0("Stack: "+H.l(y))
throw H.d(z)}},
q:{
jE:function(a,b,c,d,e){var z,y,x,w
z=J.P(a)
if(!!z.$isd6)return E.f7(a,!0,!0,!0,!1)
y=W.d7(null,null)
x=y.style
x.width="100%"
x.height="100%"
z.gdF(a).h(0,y)
w=E.f7(y,!0,!0,!0,!1)
w.a=a
return w},
f7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
z=new E.jD()
y=P.ic(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1],P.o,null)
x=C.k.bW(a,"webgl",y)
x=H.i(x==null?C.k.bW(a,"experimental-webgl",y):x,"$isdy")
if(x==null)H.t(P.u("Failed to get the rendering context for WebGL."))
z.b=a
z.a=a
z.c=x
z.e=E.j1(x,a)
w=new T.jy(x)
w.b=H.z(x.getParameter(3379))
w.c=H.z(x.getParameter(34076))
w.d=0
w.e=0
z.f=w
w=new X.jX(a)
v=new X.i7()
v.c=new X.V(!1,!1,!1)
v.d=P.id(null,null,null,P.x)
w.b=v
v=new X.ix(w)
v.f=0
v.r=new V.M(0,0)
v.x=new V.M(0,0)
v.Q=1
v.ch=1
w.c=v
v=new X.ig(w)
v.r=0
v.x=new V.M(0,0)
v.Q=1
v.ch=1
v.cx=1
v.cy=1
w.d=v
v=new X.jH(w)
v.e=0
v.f=new V.M(0,0)
v.r=new V.M(0,0)
w.e=v
w.f=!1
w.r=!1
w.x=!1
v=H.a([],[[P.f3,P.b]])
w.z=v
u=document
t=W.ax
s={func:1,ret:-1,args:[t]}
C.a.h(v,W.a4(u,"contextmenu",H.f(w.gfD(),s),!1,t))
v=w.z
r=W.ai
q={func:1,ret:-1,args:[r]};(v&&C.a).h(v,W.a4(a,"focus",H.f(w.gfG(),q),!1,r))
v=w.z;(v&&C.a).h(v,W.a4(a,"blur",H.f(w.gfw(),q),!1,r))
v=w.z
p=W.bO
o={func:1,ret:-1,args:[p]};(v&&C.a).h(v,W.a4(u,"keyup",H.f(w.gcb(),o),!1,p))
v=w.z;(v&&C.a).h(v,W.a4(u,"keydown",H.f(w.gc0(),o),!1,p))
p=w.z;(p&&C.a).h(p,W.a4(a,"mousedown",H.f(w.gfM(),s),!1,t))
p=w.z;(p&&C.a).h(p,W.a4(a,"mouseup",H.f(w.gfO(),s),!1,t))
p=w.z;(p&&C.a).h(p,W.a4(a,"mousemove",H.f(w.gfN(),s),!1,t))
p=w.z
o=W.bZ;(p&&C.a).h(p,W.a4(a,H.U(W.hK(a)),H.f(w.gfP(),{func:1,ret:-1,args:[o]}),!1,o))
o=w.z;(o&&C.a).h(o,W.a4(u,"mousemove",H.f(w.gfE(),s),!1,t))
o=w.z;(o&&C.a).h(o,W.a4(u,"mouseup",H.f(w.gfF(),s),!1,t))
t=w.z;(t&&C.a).h(t,W.a4(u,"pointerlockchange",H.f(w.gfQ(),q),!1,r))
r=w.z
q=W.bp
u={func:1,ret:-1,args:[q]};(r&&C.a).h(r,W.a4(a,"touchstart",H.f(w.gfX(),u),!1,q))
r=w.z;(r&&C.a).h(r,W.a4(a,"touchend",H.f(w.gfV(),u),!1,q))
r=w.z;(r&&C.a).h(r,W.a4(a,"touchmove",H.f(w.gfW(),u),!1,q))
z.r=w
z.y=!0
z.z=!1
z.Q=new P.aL(Date.now(),!1)
z.ch=0
z.dt()
return z}}},jF:{"^":"v:32;a",
$1:function(a){var z
H.m5(a)
z=this.a
if(z.z){z.z=!1
z.iC()}}}}],["","",,Z,{"^":"",fx:{"^":"b;a,b",q:{
fy:function(a,b,c){var z
H.p(c,"$isc",[P.y],"$asc")
z=a.createBuffer()
a.bindBuffer(b,z)
a.bufferData(b,new Float32Array(H.c0(c)),35044)
a.bindBuffer(b,null)
return new Z.fx(b,z)},
cQ:function(a,b,c){var z
H.p(c,"$isc",[P.x],"$asc")
z=a.createBuffer()
a.bindBuffer(b,z)
a.bufferData(b,new Int16Array(H.c0(c)),35044)
a.bindBuffer(b,null)
return new Z.fx(b,z)}}},cA:{"^":"d2;a,b,c,d,e",
aF:function(a){var z,y,x
try{a.a.enableVertexAttribArray(this.e)
a.a.vertexAttribPointer(this.e,this.b,5126,!1,this.d,this.c)}catch(y){z=H.aV(y)
x=P.u('Failed to bind buffer attribute "'+J.au(this.a)+'": '+H.l(z))
throw H.d(x)}},
i:function(a){return"["+J.au(this.a)+", Size: "+this.b+", Offset: "+this.c+", Stride: "+this.d+", Attr: "+H.l(this.e)+"]"}},k9:{"^":"b;a",$ismi:1},d5:{"^":"b;a,0b,c,d",
b3:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if((w.a.a&a.a)!==0)return w}return},
aF:function(a){var z,y
z=this.a
a.a.bindBuffer(z.a,z.b)
for(z=this.c,y=z.length-1;y>=0;--y)z[y].aF(a)},
bn:function(a){var z,y,x
for(z=this.c,y=z.length-1;y>=0;--y){x=z[y]
a.a.disableVertexAttribArray(x.e)}a.a.bindBuffer(this.a.a,null)},
b5:function(a){var z,y,x,w,v
z=this.b.length
for(y=0;y<z;++y){x=this.b
if(y>=x.length)return H.j(x,y)
w=x[y]
x=w.c
v=x.a
a.a.bindBuffer(v,x.b)
a.a.drawElements(w.a,w.b,5123,0)
a.a.bindBuffer(v,null)}},
i:function(a){var z,y,x,w,v,u
z=[P.o]
y=H.a([],z)
for(x=this.b,w=x.length,v=0;v<x.length;x.length===w||(0,H.C)(x),++v)C.a.h(y,x[v].i(0))
u=H.a([],z)
for(z=this.c,x=z.length,v=0;v<x;++v)C.a.h(u,J.au(z[v]))
return"Buffer:  ["+this.a.i(0)+"]\nIndices: "+C.a.B(y,", ")+"\nAttrs:   "+C.a.B(u,", ")},
$isn1:1},bL:{"^":"b;a,b,c",
i:function(a){return"Type: "+this.a+", Count: "+this.b+", ["+("Instance of '"+H.bo(this.c)+"'")+"]"}},ad:{"^":"b;a",
gdI:function(a){var z,y
z=this.a
y=(z&$.$get$a0().a)!==0?1:0
if((z&$.$get$ae().a)!==0)++y
if((z&$.$get$aR().a)!==0)++y
if((z&$.$get$a3().a)!==0)++y
if((z&$.$get$aS().a)!==0)++y
if((z&$.$get$bX().a)!==0)++y
if((z&$.$get$bY().a)!==0)++y
if((z&$.$get$br().a)!==0)++y
return(z&$.$get$aQ().a)!==0?y+1:y},
gb6:function(a){var z,y
z=this.a
y=(z&$.$get$a0().a)!==0?3:0
if((z&$.$get$ae().a)!==0)y+=3
if((z&$.$get$aR().a)!==0)y+=3
if((z&$.$get$a3().a)!==0)y+=2
if((z&$.$get$aS().a)!==0)y+=3
if((z&$.$get$bX().a)!==0)y+=3
if((z&$.$get$bY().a)!==0)y+=4
if((z&$.$get$br().a)!==0)++y
return(z&$.$get$aQ().a)!==0?y+4:y},
cl:function(a){var z,y,x
z=$.$get$a0()
y=this.a
if((y&z.a)!==0){if(0===a)return z
x=1}else x=0
z=$.$get$ae()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aR()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$a3()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aS()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$bX()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$bY()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$br()
if((y&z.a)!==0){if(x===a)return z;++x}z=$.$get$aQ()
if((y&z.a)!==0)if(x===a)return z
return $.$get$fw()},
u:function(a,b){if(b==null)return!1
if(!(b instanceof Z.ad))return!1
return this.a===b.a},
i:function(a){var z,y
z=H.a([],[P.o])
y=this.a
if((y&$.$get$a0().a)!==0)C.a.h(z,"Pos")
if((y&$.$get$ae().a)!==0)C.a.h(z,"Norm")
if((y&$.$get$aR().a)!==0)C.a.h(z,"Binm")
if((y&$.$get$a3().a)!==0)C.a.h(z,"Txt2D")
if((y&$.$get$aS().a)!==0)C.a.h(z,"TxtCube")
if((y&$.$get$bX().a)!==0)C.a.h(z,"Clr3")
if((y&$.$get$bY().a)!==0)C.a.h(z,"Clr4")
if((y&$.$get$br().a)!==0)C.a.h(z,"Weight")
if((y&$.$get$aQ().a)!==0)C.a.h(z,"Bending")
if(z.length<=0)return"None"
return C.a.B(z,"|")},
q:{
aA:function(a){return new Z.ad(a)}}}}],["","",,D,{"^":"",d8:{"^":"b;"},bk:{"^":"b;0a,0b,0c",
A:function(a){var z,y,x,w
z={}
z.a=a
y=this.a
x=y.length
if(a==null){a=new D.n(null)
a.b=!0
z.a=a
w=a}else w=a
if(this.c>0){if(this.b==null)this.b=w}else C.a.N(y,new D.hP(z))
return x!==0},
dK:function(){return this.A(null)},
iH:function(a,b,c){var z,y
z=this.c
if(z>0){--z
this.c=z
if(z<=0)z=this.b!=null
else z=!1
if(z){y=this.b
this.b=null
this.A(y)}}},
ay:function(a){return this.iH(a,!0,!1)},
q:{
K:function(){var z=new D.bk()
z.a=H.a([],[{func:1,ret:-1,args:[D.n]}])
z.c=0
return z}}},hP:{"^":"v:33;a",
$1:function(a){var z
H.f(a,{func:1,ret:-1,args:[D.n]})
z=this.a.a
z.b
a.$1(z)}},n:{"^":"b;a,0b"},ck:{"^":"n;c,d,a,0b,$ti"},cl:{"^":"n;c,d,a,0b,$ti"},G:{"^":"n;c,d,e,a,0b,$ti",
i:function(a){return"ValueChanged: "+this.c+", "+H.l(this.d)+" => "+H.l(this.e)}}}],["","",,X,{"^":"",e5:{"^":"b;a,b",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.e5))return!1
z=this.a
y=b.a
if(z==null?y!=null:z!==y)return!1
if(!this.b.u(0,b.b))return!1
return!0},
i:function(a){return this.b.i(0)+H.l(this.a)},
q:{"^":"mj<"}},Q:{"^":"b;a,b",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.Q))return!1
z=this.a
y=b.a
if(z==null?y!=null:z!==y)return!1
if(!this.b.u(0,b.b))return!1
return!0},
i:function(a){return this.b.i(0)+H.l(this.a)}},bN:{"^":"n;c,a,0b"},i6:{"^":"af;0e,0f,0r,0x,0y,0a,0b,0c,0d",
gt:function(){var z=this.e
if(z==null){z=D.K()
this.e=z}return z},
gag:function(){var z=this.y
if(z==null){z=D.K()
this.y=z}return z},
d1:function(a){var z=this.e
if(!(z==null))z.A(a)},
iY:[function(a){var z,y,x
H.p(a,"$ish",[X.Q],"$ash")
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.C)(a),++y){x=a[y]
if(C.a.au(this.a,x))return!1}return!0},"$1","geM",4,0,35],
iX:[function(a,b){var z=X.Q
z=new D.ck(a,H.p(b,"$ish",[z],"$ash"),this,[z])
z.b=!0
this.d1(z)},"$2","geK",8,0,19],
iZ:[function(a,b){var z=X.Q
z=new D.cl(a,H.p(b,"$ish",[z],"$ash"),this,[z])
z.b=!0
this.d1(z)},"$2","geN",8,0,19],
eL:[function(a){var z
H.i(a,"$isn")
if(!this.r&&a instanceof X.bN){z=a.c
if(C.a.au(this.a,z)){this.r=!0
z=this.y
if(!(z==null))z.A(a)}}},"$1","gc0",4,0,0],
fJ:[function(a){var z
H.i(a,"$isn")
if(this.r&&a instanceof X.bN){z=a.c
if(C.a.au(this.a,z))this.r=!1}},"$1","gcb",4,0,0],
a5:function(a){var z,y,x,w
if(this.f!=null)return!1
this.f=a
z=a.b
y=z.b
if(y==null){y=D.K()
z.b=y}x={func:1,ret:-1,args:[D.n]}
w=H.f(this.gc0(),x)
C.a.h(y.a,w)
y=z.a
if(y==null){y=D.K()
z.a=y
z=y}else z=y
x=H.f(this.gcb(),x)
C.a.h(z.a,x)
return!0},
$ash:function(){return[X.Q]},
$asaf:function(){return[X.Q]},
q:{
aC:function(){var z=new X.i6()
z.bq(X.Q)
z.e=null
z.f=null
z.r=!1
z.x=null
z.y=null
z.bX(z.geK(),z.geM(),z.geN())
return z}}},i7:{"^":"b;0a,0b,0c,0d",
iv:function(a){var z,y
this.c=a.b
this.d.h(0,a.a)
z=this.a
if(z==null)return!1
y=new X.bN(a,this)
y.b=!0
return z.A(y)},
ir:function(a){var z,y
this.c=a.b
this.d.T(0,a.a)
z=this.b
if(z==null)return!1
y=new X.bN(a,this)
y.b=!0
return z.A(y)}},eE:{"^":"du;x,y,c,d,e,a,0b"},ig:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy",
aC:function(a,b){var z,y,x,w,v,u,t,s,r
z=new P.aL(Date.now(),!1)
y=this.x
x=b.a
w=this.Q
if(typeof x!=="number")return x.j()
v=b.b
u=this.ch
if(typeof v!=="number")return v.j()
t=y.a
if(typeof t!=="number")return t.n()
y=y.b
if(typeof y!=="number")return y.n()
s=new V.M(t+x*w,y+v*u)
u=this.a.gbE()
r=new X.bQ(a,new V.M(0,0),this.x,this.y,this.z,u,s,z,this)
r.b=!0
this.z=z
this.x=s
return r},
cL:function(a,b){var z
this.r=a.a
z=this.b
if(z==null)return!1
z.A(this.aC(a,b))
return!0},
bh:function(a,b){var z,y
z=this.r
y=a.a
if(typeof y!=="number")return y.ep()
if(typeof z!=="number")return z.cU()
this.r=(z&~y)>>>0
z=this.c
if(z==null)return!1
z.A(this.aC(a,b))
return!0},
bg:function(a,b){var z=this.d
if(z==null)return!1
z.A(this.aC(a,b))
return!0},
iw:function(a){return!1},
fL:function(a,b,c){var z,y,x
if(this.f==null)return
z=new P.aL(Date.now(),!1)
y=this.f
x=new X.eE(c,a,this.a.gbE(),b,z,this)
x.b=!0
y.A(x)
this.y=z
this.x=new V.M(0,0)}},V:{"^":"b;a,b,c",
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof X.V))return!1
if(this.a!==b.a)return!1
z=this.b
y=b.b
if(z==null?y!=null:z!==y)return!1
z=this.c
y=b.c
if(z==null?y!=null:z!==y)return!1
return!0},
i:function(a){var z=this.a?"Ctrl+":""
z+=this.b?"Alt+":""
return z+(this.c?"Shift+":"")}},bQ:{"^":"du;x,y,z,Q,ch,c,d,e,a,0b"},ix:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch",
c6:function(a,b,c){var z,y,x
z=new P.aL(Date.now(),!1)
y=this.a.gbE()
x=new X.bQ(a,this.r,this.x,this.y,this.z,y,b,z,this)
x.b=!0
if(c){this.y=z
this.r=b}this.z=z
this.x=b
return x},
cL:function(a,b){var z
this.f=a.a
z=this.b
if(z==null)return!1
z.A(this.c6(a,b,!0))
return!0},
bh:function(a,b){var z,y
z=this.f
y=a.a
if(typeof y!=="number")return y.ep()
if(typeof z!=="number")return z.cU()
this.f=(z&~y)>>>0
z=this.c
if(z==null)return!1
z.A(this.c6(a,b,!0))
return!0},
bg:function(a,b){var z=this.d
if(z==null)return!1
z.A(this.c6(a,b,!1))
return!0},
ix:function(a,b){return!1}},du:{"^":"n;"},fb:{"^":"du;x,y,z,Q,ch,c,d,e,a,0b"},jH:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y",
aC:function(a,b){var z,y,x,w
H.p(a,"$isc",[V.M],"$asc")
z=new P.aL(Date.now(),!1)
y=a.length>0?a[0]:new V.M(0,0)
x=this.a.gbE()
w=new X.fb(a,this.f,this.r,this.x,this.y,x,y,z,this)
w.b=!0
if(b){this.x=z
this.f=y}this.y=z
this.r=y
return w},
iu:function(a){var z
H.p(a,"$isc",[V.M],"$asc")
z=this.b
if(z==null)return!1
z.A(this.aC(a,!0))
return!0},
is:function(a){var z
H.p(a,"$isc",[V.M],"$asc")
z=this.c
if(z==null)return!1
z.A(this.aC(a,!0))
return!0},
it:function(a){var z
H.p(a,"$isc",[V.M],"$asc")
z=this.d
if(z==null)return!1
z.A(this.aC(a,!1))
return!0}},jX:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z",
gbE:function(){var z=this.a
return V.dw(0,0,(z&&C.k).gdG(z).c,C.k.gdG(z).d)},
di:function(a){var z,y
z=a.keyCode
y=a.ctrlKey||a.metaKey
return new X.Q(z,new X.V(y,a.altKey,a.shiftKey))},
aX:function(a){var z,y
z=this.b
y=a.ctrlKey||a.metaKey
z.c=new X.V(y,a.altKey,a.shiftKey)},
cg:function(a){var z,y
z=this.b
y=a.ctrlKey||a.metaKey
z.c=new X.V(y,a.altKey,a.shiftKey)},
aD:function(a){var z,y,x,w,v
z=this.a.getBoundingClientRect()
y=a.pageX
x=a.pageY
w=z.left
if(typeof y!=="number")return y.v()
v=z.top
if(typeof x!=="number")return x.v()
return new V.M(y-w,x-v)},
ba:function(a){return new V.a_(a.movementX,a.movementY)},
cc:function(a){var z,y,x,w,v,u,t,s
z=this.a.getBoundingClientRect()
y=H.a([],[V.M])
for(x=a.touches,w=x.length,v=0;v<x.length;x.length===w||(0,H.C)(x),++v){u=x[v]
t=C.h.am(u.pageX)
C.h.am(u.pageY)
s=z.left
C.h.am(u.pageX)
C.a.h(y,new V.M(t-s,C.h.am(u.pageY)-z.top))}return y},
aA:function(a){var z,y
z=a.buttons
y=a.ctrlKey||a.metaKey
return new X.e5(z,new X.V(y,a.altKey,a.shiftKey))},
c8:function(a){var z,y,x,w,v,u
z=this.a.getBoundingClientRect()
y=a.pageX
x=a.pageY
w=z.left
if(typeof y!=="number")return y.v()
v=y-w
if(v<0)return!1
y=z.top
if(typeof x!=="number")return x.v()
u=x-y
if(u<0)return!1
return v<z.width&&u<z.height},
jo:[function(a){this.f=!0},"$1","gfG",4,0,6],
jg:[function(a){this.f=!1},"$1","gfw",4,0,6],
jl:[function(a){H.i(a,"$isax")
if(this.f&&this.c8(a))a.preventDefault()},"$1","gfD",4,0,4],
fJ:[function(a){var z
H.i(a,"$isbO")
if(!this.f)return
z=this.di(a)
if(this.b.iv(z))a.preventDefault()},"$1","gcb",4,0,20],
eL:[function(a){var z
H.i(a,"$isbO")
if(!this.f)return
z=this.di(a)
if(this.b.ir(z))a.preventDefault()},"$1","gc0",4,0,20],
js:[function(a){var z,y,x,w
H.i(a,"$isax")
z=this.a
z.focus()
this.f=!0
this.aX(a)
if(this.x){y=this.aA(a)
x=this.ba(a)
if(this.d.cL(y,x))a.preventDefault()
return}if(this.r){this.y=a
z.requestPointerLock()
return}y=this.aA(a)
w=this.aD(a)
if(this.c.cL(y,w))a.preventDefault()},"$1","gfM",4,0,4],
ju:[function(a){var z,y,x
H.i(a,"$isax")
this.aX(a)
z=this.aA(a)
if(this.x){y=this.ba(a)
if(this.d.bh(z,y))a.preventDefault()
return}if(this.r)return
x=this.aD(a)
if(this.c.bh(z,x))a.preventDefault()},"$1","gfO",4,0,4],
jn:[function(a){var z,y,x
H.i(a,"$isax")
if(!this.c8(a)){this.aX(a)
z=this.aA(a)
if(this.x){y=this.ba(a)
if(this.d.bh(z,y))a.preventDefault()
return}if(this.r)return
x=this.aD(a)
if(this.c.bh(z,x))a.preventDefault()}},"$1","gfF",4,0,4],
jt:[function(a){var z,y,x
H.i(a,"$isax")
this.aX(a)
z=this.aA(a)
if(this.x){y=this.ba(a)
if(this.d.bg(z,y))a.preventDefault()
return}if(this.r)return
x=this.aD(a)
if(this.c.bg(z,x))a.preventDefault()},"$1","gfN",4,0,4],
jm:[function(a){var z,y,x
H.i(a,"$isax")
if(!this.c8(a)){this.aX(a)
z=this.aA(a)
if(this.x){y=this.ba(a)
if(this.d.bg(z,y))a.preventDefault()
return}if(this.r)return
x=this.aD(a)
if(this.c.bg(z,x))a.preventDefault()}},"$1","gfE",4,0,4],
jv:[function(a){var z,y
H.i(a,"$isbZ")
this.aX(a)
z=new V.a_((a&&C.v).ghX(a),C.v.ghY(a)).w(0,180)
if(this.x){if(this.d.iw(z))a.preventDefault()
return}if(this.r)return
y=this.aD(a)
if(this.c.ix(z,y))a.preventDefault()},"$1","gfP",4,0,34],
jw:[function(a){var z,y,x,w,v
z=document.pointerLockElement
y=this.a
x=z==null?y==null:z===y
if(x!==this.x){this.x=x
w=this.aA(this.y)
v=this.aD(this.y)
this.d.fL(w,v,x)}},"$1","gfQ",4,0,6],
jD:[function(a){var z
H.i(a,"$isbp")
this.a.focus()
this.f=!0
this.cg(a)
z=this.cc(a)
if(this.e.iu(z))a.preventDefault()},"$1","gfX",4,0,12],
jB:[function(a){var z
H.i(a,"$isbp")
this.cg(a)
z=this.cc(a)
if(this.e.is(z))a.preventDefault()},"$1","gfV",4,0,12],
jC:[function(a){var z
H.i(a,"$isbp")
this.cg(a)
z=this.cc(a)
if(this.e.it(z))a.preventDefault()},"$1","gfW",4,0,12]}}],["","",,D,{"^":"",cD:{"^":"b;0a,0b,0c,0d",
gt:function(){var z=this.d
if(z==null){z=D.K()
this.d=z}return z},
aV:[function(a){var z
H.i(a,"$isn")
z=this.d
if(!(z==null))z.A(a)},function(){return this.aV(null)},"jh","$1","$0","gfz",0,2,1],
$isa2:1,
$isaO:1},a2:{"^":"b;",$isaO:1},i8:{"^":"af;0e,0f,0r,0x,0y,0z,0Q,0ch,0a,0b,0c,0d",
gt:function(){var z=this.Q
if(z==null){z=D.K()
this.Q=z}return z},
aV:function(a){var z=this.Q
if(!(z==null))z.A(a)},
fK:[function(a){var z
H.i(a,"$isn")
z=this.ch
if(!(z==null))z.A(a)},function(){return this.fK(null)},"jr","$1","$0","gdn",0,2,1],
jx:[function(a){var z,y,x
H.p(a,"$ish",[D.a2],"$ash")
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.C)(a),++y){x=a[y]
if(x==null||this.fa(x))return!1}return!0},"$1","gfR",4,0,29],
jb:[function(a,b){var z,y,x,w,v,u,t,s
z=D.a2
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gdn(),w={func:1,ret:-1,args:[D.n]},v=[w],u=0;u<b.length;b.length===y||(0,H.C)(b),++u){t=H.i(b[u],"$isa2")
if(t instanceof D.cD)C.a.h(this.e,t)
s=t.d
if(s==null){s=new D.bk()
s.a=H.a([],v)
s.c=0
t.d=s}H.f(x,w)
C.a.h(s.a,x)}z=new D.ck(a,b,this,[z])
z.b=!0
this.aV(z)},"$2","gfq",8,0,21],
jz:[function(a,b){var z,y,x,w,v,u,t,s
z=D.a2
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gdn(),w={func:1,ret:-1,args:[D.n]},v=[w],u=0;u<b.length;b.length===y||(0,H.C)(b),++u){t=H.i(b[u],"$isa2")
if(t instanceof D.cD)C.a.T(this.e,t)
s=t.d
if(s==null){s=new D.bk()
s.a=H.a([],v)
s.c=0
t.d=s}H.f(x,w)
C.a.T(s.a,x)}z=new D.cl(a,b,this,[z])
z.b=!0
this.aV(z)},"$2","gfT",8,0,21],
fa:function(a){var z=C.a.au(this.e,a)
return z},
$ash:function(){return[D.a2]},
$asaf:function(){return[D.a2]}},iM:{"^":"b;",$isa2:1,$isaO:1},jn:{"^":"b;",$isa2:1,$isaO:1},jA:{"^":"b;",$isa2:1,$isaO:1},jB:{"^":"b;",$isa2:1,$isaO:1},jC:{"^":"b;",$isa2:1,$isaO:1}}],["","",,V,{"^":"",
ml:[function(a,b){if(typeof b!=="number")return b.v()
if(typeof a!=="number")return H.e(a)
return Math.abs(b-a)<=1e-9},"$2","iu",8,0,27],
cZ:function(a,b,c){var z
if(c<=b)return b
z=c-b
a=C.h.cW(a-b,z)
return(a<0?a+z:a)+b},
D:function(a,b,c){if(a==null)return C.i.aL("null",c)
return C.i.aL(C.h.ek($.m.$2(a,0)?0:a,b),c+b+1)},
bw:function(a,b,c){var z,y,x,w,v,u
H.p(a,"$isc",[P.y],"$asc")
z=H.a([],[P.o])
for(y=a.length,x=0,w=0;w<a.length;a.length===y||(0,H.C)(a),++w){v=V.D(a[w],b,c)
x=Math.max(x,v.length)
C.a.h(z,v)}for(u=z.length-1;u>=0;--u){if(u>=z.length)return H.j(z,u)
C.a.m(z,u,C.i.aL(z[u],x))}return z},
e_:function(a,b){return C.h.aa(Math.pow(b,C.l.b4(Math.log(H.lJ(a))/Math.log(b))))},
aa:{"^":"b;a,b,c",
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aa))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+"]"}},
aW:{"^":"b;a,b,c,d",
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aW))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+", "+V.D(this.d,3,0)+"]"}},
b0:{"^":"b;a",
u:function(a,b){if(b==null)return!1
if(!(b instanceof V.b0))return!1
return this.a===b.a},
i:function(a){var z,y,x
$.$get$eq()
$.$get$dg()
z=H.a([],[P.o])
y=this.a
x=$.$get$b2().a
if((y&x)===x)C.a.h(z,"XPos")
x=$.$get$dh().a
if((y&x)===x)C.a.h(z,"XCenter")
x=$.$get$b1().a
if((y&x)===x)C.a.h(z,"XNeg")
x=$.$get$bH().a
if((y&x)===x)C.a.h(z,"YPos")
x=$.$get$di().a
if((y&x)===x)C.a.h(z,"YCenter")
x=$.$get$bG().a
if((y&x)===x)C.a.h(z,"YNeg")
x=$.$get$bJ().a
if((y&x)===x)C.a.h(z,"ZPos")
x=$.$get$es().a
if((y&x)===x)C.a.h(z,"ZCenter")
x=$.$get$bI().a
if((y&x)===x)C.a.h(z,"ZNeg")
if(z.length<=0)return"None"
return C.a.B(z,"|")},
q:{
ao:function(a){return new V.b0(a)}}},
cI:{"^":"b;a,b,c,d",
i:function(a){return this.a.i(0)+" <"+this.b.i(0)+"> "+H.l(this.c)+" "+H.l(this.d)}},
aN:{"^":"b;a,b,c,d,e,f,r,x,y",
aj:function(a,b){var z=H.a([this.a,this.d,this.r,this.b,this.e,this.x,this.c,this.f,this.y],[P.y])
return z},
be:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=this.e
x=this.y
if(typeof y!=="number")return y.j()
if(typeof x!=="number")return H.e(x)
w=y*x
v=this.f
u=this.x
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
if(typeof z!=="number")return z.j()
t=this.d
s=this.b
if(typeof s!=="number")return s.j()
r=s*x
q=this.c
if(typeof q!=="number")return H.e(q)
p=u*q
if(typeof t!=="number")return t.j()
o=this.r
n=s*v-y*q
if(typeof o!=="number")return o.j()
m=z*(w-v*u)-t*(r-p)+o*n
if($.m.$2(m,0))return new V.aN(1,0,0,0,1,0,0,0,1)
l=1/m
return new V.aN((w-u*v)*l,(p-r)*l,n*l,(o*v-t*x)*l,(z*x-o*q)*l,(t*q-z*v)*l,(t*u-o*y)*l,(o*s-z*u)*l,(z*y-t*s)*l)},
an:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
t=this.d
if(typeof t!=="number")return t.j()
s=this.e
if(typeof s!=="number")return s.j()
r=this.f
if(typeof r!=="number")return r.j()
q=this.r
if(typeof q!=="number")return q.j()
p=this.x
if(typeof p!=="number")return p.j()
o=this.y
if(typeof o!=="number")return o.j()
return new V.H(z*y+x*w+v*u,t*y+s*w+r*u,q*y+p*w+o*u)},
M:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
t=this.d
if(typeof t!=="number")return t.j()
s=this.e
if(typeof s!=="number")return s.j()
r=this.f
if(typeof r!=="number")return r.j()
q=this.r
if(typeof q!=="number")return q.j()
p=this.x
if(typeof p!=="number")return p.j()
o=this.y
if(typeof o!=="number")return o.j()
return new V.r(z*y+x*w+v*u,t*y+s*w+r*u,q*y+p*w+o*u)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aN))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
z=b.e
if(!$.m.$2(z,this.e))return!1
z=b.f
if(!$.m.$2(z,this.f))return!1
z=b.r
if(!$.m.$2(z,this.r))return!1
z=b.x
if(!$.m.$2(z,this.x))return!1
z=b.y
if(!$.m.$2(z,this.y))return!1
return!0},
i:function(a){var z,y,x,w,v,u,t,s
z=[P.y]
y=V.bw(H.a([this.a,this.d,this.r],z),3,0)
x=V.bw(H.a([this.b,this.e,this.x],z),3,0)
w=V.bw(H.a([this.c,this.f,this.y],z),3,0)
z=y.length
if(0>=z)return H.j(y,0)
v="["+y[0]+", "
u=x.length
if(0>=u)return H.j(x,0)
v=v+x[0]+", "
t=w.length
if(0>=t)return H.j(w,0)
v=v+w[0]+",\n"
if(1>=z)return H.j(y,1)
s=" "+y[1]+", "
if(1>=u)return H.j(x,1)
s=s+x[1]+", "
if(1>=t)return H.j(w,1)
s=v+(s+w[1]+",\n")
if(2>=z)return H.j(y,2)
z=" "+y[2]+", "
if(2>=u)return H.j(x,2)
z=z+x[2]+", "
if(2>=t)return H.j(w,2)
return s+(z+w[2]+"]")},
q:{
eJ:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return new V.aN(z,0,-y,0,1,0,y,0,z)}}},
aD:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
aj:function(a,b){var z=H.a([this.a,this.e,this.y,this.cx,this.b,this.f,this.z,this.cy,this.c,this.r,this.Q,this.db,this.d,this.x,this.ch,this.dx],[P.y])
return z},
be:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.a
y=this.f
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=this.e
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=z*y-x*w
u=this.r
if(typeof u!=="number")return H.e(u)
t=this.c
if(typeof t!=="number")return t.j()
s=z*u-t*w
r=this.x
if(typeof r!=="number")return H.e(r)
q=this.d
if(typeof q!=="number")return q.j()
p=z*r-q*w
o=x*u-t*y
n=x*r-q*y
m=t*r-q*u
l=this.y
k=this.cy
if(typeof l!=="number")return l.j()
if(typeof k!=="number")return H.e(k)
j=this.z
i=this.cx
if(typeof j!=="number")return j.j()
if(typeof i!=="number")return H.e(i)
h=l*k-j*i
g=this.db
if(typeof g!=="number")return H.e(g)
f=this.Q
if(typeof f!=="number")return f.j()
e=l*g-f*i
d=this.dx
if(typeof d!=="number")return H.e(d)
c=this.ch
if(typeof c!=="number")return c.j()
b=l*d-c*i
a=j*g-f*k
a0=j*d-c*k
a1=f*d-c*g
a2=v*a1-s*a0+p*a+o*b-n*e+m*h
if($.m.$2(a2,0))return V.bn()
a3=1/a2
a4=-w
a5=-i
return V.aE((y*a1-u*a0+r*a)*a3,(-x*a1+t*a0-q*a)*a3,(k*m-g*n+d*o)*a3,(-j*m+f*n-c*o)*a3,(a4*a1+u*b-r*e)*a3,(z*a1-t*b+q*e)*a3,(a5*m+g*p-d*s)*a3,(l*m-f*p+c*s)*a3,(w*a0-y*b+r*h)*a3,(-z*a0+x*b-q*h)*a3,(i*n-k*p+d*v)*a3,(-l*n+j*p-c*v)*a3,(a4*a+y*e-u*h)*a3,(z*a-x*e+t*h)*a3,(a5*o+k*s-g*v)*a3,(l*o-j*s+f*v)*a3)},
j:function(a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.a
y=a7.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a7.e
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a7.y
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
t=this.d
s=a7.cx
if(typeof t!=="number")return t.j()
if(typeof s!=="number")return H.e(s)
r=a7.b
if(typeof r!=="number")return H.e(r)
q=a7.f
if(typeof q!=="number")return H.e(q)
p=a7.z
if(typeof p!=="number")return H.e(p)
o=a7.cy
if(typeof o!=="number")return H.e(o)
n=a7.c
if(typeof n!=="number")return H.e(n)
m=a7.r
if(typeof m!=="number")return H.e(m)
l=a7.Q
if(typeof l!=="number")return H.e(l)
k=a7.db
if(typeof k!=="number")return H.e(k)
j=a7.d
if(typeof j!=="number")return H.e(j)
i=a7.x
if(typeof i!=="number")return H.e(i)
h=a7.ch
if(typeof h!=="number")return H.e(h)
g=a7.dx
if(typeof g!=="number")return H.e(g)
f=this.e
if(typeof f!=="number")return f.j()
e=this.f
if(typeof e!=="number")return e.j()
d=this.r
if(typeof d!=="number")return d.j()
c=this.x
if(typeof c!=="number")return c.j()
b=this.y
if(typeof b!=="number")return b.j()
a=this.z
if(typeof a!=="number")return a.j()
a0=this.Q
if(typeof a0!=="number")return a0.j()
a1=this.ch
if(typeof a1!=="number")return a1.j()
a2=this.cx
if(typeof a2!=="number")return a2.j()
a3=this.cy
if(typeof a3!=="number")return a3.j()
a4=this.db
if(typeof a4!=="number")return a4.j()
a5=this.dx
if(typeof a5!=="number")return a5.j()
return V.aE(z*y+x*w+v*u+t*s,z*r+x*q+v*p+t*o,z*n+x*m+v*l+t*k,z*j+x*i+v*h+t*g,f*y+e*w+d*u+c*s,f*r+e*q+d*p+c*o,f*n+e*m+d*l+c*k,f*j+e*i+d*h+c*g,b*y+a*w+a0*u+a1*s,b*r+a*q+a0*p+a1*o,b*n+a*m+a0*l+a1*k,b*j+a*i+a0*h+a1*g,a2*y+a3*w+a4*u+a5*s,a2*r+a3*q+a4*p+a5*o,a2*n+a3*m+a4*l+a5*k,a2*j+a3*i+a4*h+a5*g)},
an:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
t=this.e
if(typeof t!=="number")return t.j()
s=this.f
if(typeof s!=="number")return s.j()
r=this.r
if(typeof r!=="number")return r.j()
q=this.y
if(typeof q!=="number")return q.j()
p=this.z
if(typeof p!=="number")return p.j()
o=this.Q
if(typeof o!=="number")return o.j()
return new V.H(z*y+x*w+v*u,t*y+s*w+r*u,q*y+p*w+o*u)},
M:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
t=this.d
if(typeof t!=="number")return H.e(t)
s=this.e
if(typeof s!=="number")return s.j()
r=this.f
if(typeof r!=="number")return r.j()
q=this.r
if(typeof q!=="number")return q.j()
p=this.x
if(typeof p!=="number")return H.e(p)
o=this.y
if(typeof o!=="number")return o.j()
n=this.z
if(typeof n!=="number")return n.j()
m=this.Q
if(typeof m!=="number")return m.j()
l=this.ch
if(typeof l!=="number")return H.e(l)
return new V.r(z*y+x*w+v*u+t,s*y+r*w+q*u+p,o*y+n*w+m*u+l)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aD))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
z=b.e
if(!$.m.$2(z,this.e))return!1
z=b.f
if(!$.m.$2(z,this.f))return!1
z=b.r
if(!$.m.$2(z,this.r))return!1
z=b.x
if(!$.m.$2(z,this.x))return!1
z=b.y
if(!$.m.$2(z,this.y))return!1
z=b.z
if(!$.m.$2(z,this.z))return!1
z=b.Q
if(!$.m.$2(z,this.Q))return!1
z=b.ch
if(!$.m.$2(z,this.ch))return!1
z=b.cx
if(!$.m.$2(z,this.cx))return!1
z=b.cy
if(!$.m.$2(z,this.cy))return!1
z=b.db
if(!$.m.$2(z,this.db))return!1
z=b.dx
if(!$.m.$2(z,this.dx))return!1
return!0},
i:function(a){return this.O()},
e5:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=[P.y]
y=V.bw(H.a([this.a,this.e,this.y,this.cx],z),b,c)
x=V.bw(H.a([this.b,this.f,this.z,this.cy],z),b,c)
w=V.bw(H.a([this.c,this.r,this.Q,this.db],z),b,c)
v=V.bw(H.a([this.d,this.x,this.ch,this.dx],z),b,c)
z=y.length
if(0>=z)return H.j(y,0)
u="["+y[0]+", "
t=x.length
if(0>=t)return H.j(x,0)
u=u+x[0]+", "
s=w.length
if(0>=s)return H.j(w,0)
u=u+w[0]+", "
r=v.length
if(0>=r)return H.j(v,0)
u=u+v[0]+",\n"
q=a+" "
if(1>=z)return H.j(y,1)
q=q+y[1]+", "
if(1>=t)return H.j(x,1)
q=q+x[1]+", "
if(1>=s)return H.j(w,1)
q=q+w[1]+", "
if(1>=r)return H.j(v,1)
q=u+(q+v[1]+",\n")
u=a+" "
if(2>=z)return H.j(y,2)
u=u+y[2]+", "
if(2>=t)return H.j(x,2)
u=u+x[2]+", "
if(2>=s)return H.j(w,2)
u=u+w[2]+", "
if(2>=r)return H.j(v,2)
u=q+(u+v[2]+",\n")
q=a+" "
if(3>=z)return H.j(y,3)
q=q+y[3]+", "
if(3>=t)return H.j(x,3)
q=q+x[3]+", "
if(3>=s)return H.j(w,3)
q=q+w[3]+", "
if(3>=r)return H.j(v,3)
return u+(q+v[3]+"]")},
O:function(){return this.e5("",3,0)},
F:function(a){return this.e5(a,3,0)},
q:{
aE:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return new V.aD(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)},
bn:function(){return V.aE(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},
co:function(a,b,c){return V.aE(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1)},
ds:function(a,b,c,d){return V.aE(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,d)},
eL:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return V.aE(1,0,0,0,0,z,-y,0,0,y,z,0,0,0,0,1)},
eM:function(a){var z,y
z=Math.cos(a)
y=Math.sin(a)
return V.aE(z,0,-y,0,0,1,0,0,y,0,z,0,0,0,0,1)},
eK:function(a,b,c){var z,y,x,w,v
z=c.w(0,Math.sqrt(c.D(c)))
y=b.bd(z)
x=y.w(0,Math.sqrt(y.D(y)))
w=z.bd(x)
v=new V.H(a.a,a.b,a.c)
return V.aE(x.a,w.a,z.a,x.K(0).D(v),x.b,w.b,z.b,w.K(0).D(v),x.c,w.c,z.c,z.K(0).D(v),0,0,0,1)}}},
M:{"^":"b;a,b",
v:function(a,b){var z,y,x,w
z=this.a
y=b.a
if(typeof z!=="number")return z.v()
if(typeof y!=="number")return H.e(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.v()
if(typeof w!=="number")return H.e(w)
return new V.M(z-y,x-w)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.M))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+"]"}},
r:{"^":"b;a,b,c",
n:function(a,b){var z,y,x,w,v,u
z=this.a
y=b.a
if(typeof z!=="number")return z.n()
if(typeof y!=="number")return H.e(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.n()
if(typeof w!=="number")return H.e(w)
v=this.c
u=b.c
if(typeof v!=="number")return v.n()
if(typeof u!=="number")return H.e(u)
return new V.r(z+y,x+w,v+u)},
v:function(a,b){var z,y,x,w,v,u
z=this.a
y=b.a
if(typeof z!=="number")return z.v()
if(typeof y!=="number")return H.e(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.v()
if(typeof w!=="number")return H.e(w)
v=this.c
u=b.c
if(typeof v!=="number")return v.v()
if(typeof u!=="number")return H.e(u)
return new V.r(z-y,x-w,v-u)},
j:function(a,b){var z,y,x
z=this.a
if(typeof z!=="number")return z.j()
y=this.b
if(typeof y!=="number")return y.j()
x=this.c
if(typeof x!=="number")return x.j()
return new V.r(z*b,y*b,x*b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.r))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+"]"},
q:{
b7:function(a,b,c){return new V.r(a,b,c)}}},
cp:{"^":"b;a,b,c,d",
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.cp))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+", "+V.D(this.d,3,0)+"]"}},
eU:{"^":"b;a,b,c,d,e,f",
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.eU))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
z=b.e
if(!$.m.$2(z,this.e))return!1
z=b.f
if(!$.m.$2(z,this.f))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+", "+V.D(this.d,3,0)+", "+V.D(this.e,3,0)+", "+V.D(this.f,3,0)+"]"},
q:{
eV:function(a,b){return new V.eU(a.a,a.b,a.c,b.a,b.b,b.c)}}},
eX:{"^":"b;a,b,c,d",
gax:function(){var z,y
z=this.c
y=this.d
if(z>y)return y
else return z},
e9:function(a){var z,y,x,w,v,u,t
z=$.$get$er()
y=a.a
x=this.a
if(typeof y!=="number")return y.U()
if(y<x){w=$.$get$b1()
z=new V.b0(z.a|w.a)}else if(y>=x+this.c){w=$.$get$b2()
z=new V.b0(z.a|w.a)}else{w=$.$get$dh()
z=new V.b0(z.a|w.a)}w=a.b
v=this.b
if(typeof w!=="number")return w.U()
if(w<v)z=new V.b0(z.a|$.$get$bG().a)
else{u=z.a
z=w>=v+this.d?new V.b0(u|$.$get$bH().a):new V.b0(u|$.$get$di().a)}u=z.a
t=$.$get$b1().a
if(!((u&t)===t)){t=$.$get$b2().a
if((u&t)===t){y=x+this.c
x=y}else x=y}y=$.$get$bG().a
if(!((u&y)===y)){y=$.$get$bH().a
if((u&y)===y){y=v+this.d
v=y}else v=w}return new V.M(x,v)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.eX))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+", "+V.D(this.d,3,0)+"]"},
q:{
dw:function(a,b,c,d){if(c<0){a+=c
c=-c}if(d<0){b+=d
d=-d}return new V.eX(a,b,c,d)}}},
dx:{"^":"b;a,b,c,d,e,f",
iz:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.a
if(typeof z!=="number")return z.n()
y=z+this.d
x=this.b
if(typeof x!=="number")return x.n()
w=x+this.e
v=this.c
if(typeof v!=="number")return v.n()
u=v+this.f
t=a1.a
if(typeof t!=="number")return t.U()
if(t<z){s=z-t
r=a1.d
if(typeof r!=="number")return H.e(r)
if(s>r)return
s/=r
q=$.$get$b1()
p=z
o=!1
n=-1}else if(t>y){s=y-t
r=a1.d
if(typeof r!=="number")return H.e(r)
if(s<r)return
s/=r
q=$.$get$b2()
p=y
o=!1
n=1}else{o=!0
s=-1
n=null
p=null
q=null}r=a1.b
if(typeof r!=="number")return r.U()
if(r<x){m=x-r
l=a1.e
if(typeof l!=="number")return H.e(l)
if(m>l)return
m/=l
k=$.$get$bG()
j=x
o=!1
i=-1}else if(r>w){m=w-r
l=a1.e
if(typeof l!=="number")return H.e(l)
if(m<l)return
m/=l
k=$.$get$bH()
j=w
o=!1
i=1}else{m=-1
i=null
j=null
k=null}l=a1.c
if(typeof l!=="number")return l.U()
if(l<v){h=v-l
g=a1.f
if(typeof g!=="number")return H.e(g)
if(h>g)return
h/=g
f=$.$get$bI()
e=v
o=!1
d=-1}else if(l>u){h=u-l
g=a1.f
if(typeof g!=="number")return H.e(g)
if(h<g)return
h/=g
f=$.$get$bJ()
e=u
o=!1
d=1}else{h=-1
d=null
e=null
f=null}if(o){z=new V.H(a1.d,a1.e,a1.f)
return new V.cI(new V.r(t,r,l),z.w(0,Math.sqrt(z.D(z))).K(0),0,$.$get$dg())}if(m>s)c=h>m?2:1
else c=h>s?2:0
switch(c){case 0:z=a1.e
if(typeof z!=="number")return z.j()
b=r+z*s
if(b<x||b>w)return
z=a1.f
if(typeof z!=="number")return z.j()
a=l+z*s
if(a<v||a>u)return
return new V.cI(new V.r(p,b,a),new V.H(n,0,0),s,q)
case 1:x=a1.d
if(typeof x!=="number")return x.j()
a0=t+x*m
if(a0<z||a0>y)return
z=a1.f
if(typeof z!=="number")return z.j()
a=l+z*m
if(a<v||a>u)return
return new V.cI(new V.r(a0,j,a),new V.H(0,i,0),m,k)
default:v=a1.d
if(typeof v!=="number")return v.j()
a0=t+v*h
if(a0<z||a0>y)return
z=a1.e
if(typeof z!=="number")return z.j()
b=r+z*h
if(b<x||b>w)return
return new V.cI(new V.r(a0,b,e),new V.H(0,0,d),h,f)}},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.dx))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
z=b.d
if(!$.m.$2(z,this.d))return!1
z=b.e
if(!$.m.$2(z,this.e))return!1
z=b.f
if(!$.m.$2(z,this.f))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+", "+V.D(this.d,3,0)+", "+V.D(this.e,3,0)+", "+V.D(this.f,3,0)+"]"},
q:{
eY:function(a,b,c,d,e,f){return new V.dx(a,b,c,d,e,f)}}},
a_:{"^":"b;a,b",
ib:[function(a){return Math.sqrt(this.D(this))},"$0","gl",1,0,22],
D:function(a){var z,y,x,w
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
return z*y+x*w},
j:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.j()
y=this.b
if(typeof y!=="number")return y.j()
return new V.a_(z*b,y*b)},
w:function(a,b){var z,y
if($.m.$2(b,0))return new V.a_(0,0)
z=this.a
if(typeof z!=="number")return z.w()
y=this.b
if(typeof y!=="number")return y.w()
return new V.a_(z/b,y/b)},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.a_))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+"]"}},
H:{"^":"b;a,b,c",
ib:[function(a){return Math.sqrt(this.D(this))},"$0","gl",1,0,22],
D:function(a){var z,y,x,w,v,u
z=this.a
y=a.a
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.b
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=this.c
u=a.c
if(typeof v!=="number")return v.j()
if(typeof u!=="number")return H.e(u)
return z*y+x*w+v*u},
bd:function(a){var z,y,x,w,v,u
z=this.b
y=a.c
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.e(y)
x=this.c
w=a.b
if(typeof x!=="number")return x.j()
if(typeof w!=="number")return H.e(w)
v=a.a
if(typeof v!=="number")return H.e(v)
u=this.a
if(typeof u!=="number")return u.j()
return new V.H(z*y-x*w,x*v-u*y,u*w-z*v)},
n:function(a,b){var z,y,x,w,v,u
z=this.a
y=b.a
if(typeof z!=="number")return z.n()
if(typeof y!=="number")return H.e(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.n()
if(typeof w!=="number")return H.e(w)
v=this.c
u=b.c
if(typeof v!=="number")return v.n()
if(typeof u!=="number")return H.e(u)
return new V.H(z+y,x+w,v+u)},
K:function(a){var z,y,x
z=this.a
if(typeof z!=="number")return z.K()
y=this.b
if(typeof y!=="number")return y.K()
x=this.c
if(typeof x!=="number")return x.K()
return new V.H(-z,-y,-x)},
w:function(a,b){var z,y,x
if($.m.$2(b,0))return new V.H(0,0,0)
z=this.a
if(typeof z!=="number")return z.w()
y=this.b
if(typeof y!=="number")return y.w()
x=this.c
if(typeof x!=="number")return x.w()
return new V.H(z/b,y/b,x/b)},
e6:function(){if(!$.m.$2(0,this.a))return!1
if(!$.m.$2(0,this.b))return!1
if(!$.m.$2(0,this.c))return!1
return!0},
u:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.H))return!1
z=b.a
if(!$.m.$2(z,this.a))return!1
z=b.b
if(!$.m.$2(z,this.b))return!1
z=b.c
if(!$.m.$2(z,this.c))return!1
return!0},
i:function(a){return"["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+"]"},
q:{
bV:function(a,b,c){return new V.H(a,b,c)}}}}],["","",,U,{"^":"",hy:{"^":"d8;0a,0b,0c,0d,0e,0f,0r,0x,0y",
c1:function(a){var z,y,x
z=this.a
y=this.c
x=this.b
if(z)return V.cZ(a,y,x)
else{if(a<y)z=y
else z=a>x?x:a
return z}},
gt:function(){var z=this.y
if(z==null){z=D.K()
this.y=z}return z},
E:function(a){var z=this.y
if(!(z==null))z.A(a)},
scQ:function(a,b){var z=this.a
if(z!==b){this.a=b
z=new D.G("warp",z,b,this,[P.a8])
z.b=!0
this.E(z)}},
scJ:function(a){var z,y
z=this.b
if(!$.m.$2(z,a)){y=this.b
this.b=a
if(a<this.c){this.c=a
this.d=a}else{z=this.d
if(a<z)this.d=this.c1(z)}z=new D.G("maximumLocation",y,this.b,this,[P.y])
z.b=!0
this.E(z)}},
scK:function(a){var z,y
z=this.c
if(!$.m.$2(z,a)){y=this.c
this.c=a
if(this.b<a){this.b=a
this.d=a}else{z=this.d
if(a>z)this.d=this.c1(z)}z=new D.G("minimumLocation",y,this.c,this,[P.y])
z.b=!0
this.E(z)}},
sS:function(a,b){var z,y
b=this.c1(b==null?0:b)
z=this.d
if(!$.m.$2(z,b)){y=this.d
this.d=b
z=new D.G("location",y,b,this,[P.y])
z.b=!0
this.E(z)}},
saw:function(a){var z,y,x
z=this.e
if(!$.m.$2(z,a)){y=this.e
this.e=a
z=this.f
x=-a
if(z<x)z=x
else if(z>a)z=a
this.f=z
z=new D.G("maximumVelocity",y,a,this,[P.y])
z.b=!0
this.E(z)}},
sG:function(a){var z,y,x
z=a==null?0:a
y=this.e
a=-y
if(!(z<a))a=z>y?y:z
z=this.f
if(!$.m.$2(z,a)){x=this.f
this.f=a
z=new D.G("velocity",x,a,this,[P.y])
z.b=!0
this.E(z)}},
saH:function(a){var z,y
if(a<0)a=0
else if(a>1)a=1
z=this.x
if(!$.m.$2(z,a)){y=this.x
this.x=a
z=new D.G("dampening",y,a,this,[P.y])
z.b=!0
this.E(z)}},
ab:function(a,b){var z,y,x,w
z=this.f
if($.m.$2(z,0)){z=this.r
z=!$.m.$2(z,0)}else z=!0
if(z){y=this.f+this.r*b
z=this.e
x=-z
if(y<x)y=x
else if(y>z)y=z
this.sS(0,this.d+y*b)
z=this.x
if(!$.m.$2(z,0)){w=y*Math.pow(1-this.x,b)
if(y<0){if(w<y)w=y
else if(w>0)w=0}else if(w<0)w=0
else if(w>y)w=y
y=w}this.sG(y)}},
q:{
c7:function(){var z=new U.hy()
z.a=!0
z.b=1e12
z.c=-1e12
z.d=0
z.e=100
z.f=0
z.x=0
z.r=0
return z}}},eb:{"^":"a6;0a,0b",
gt:function(){var z=this.b
if(z==null){z=D.K()
this.b=z}return z},
ao:function(a,b,c){return this.a},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.eb))return!1
return J.W(this.a,b.a)},
i:function(a){return"Constant: "+this.a.F("          ")},
q:{
aX:function(a){var z=new U.eb()
z.a=a
return z}}},ep:{"^":"af;0e,0f,0r,0a,0b,0c,0d",
gt:function(){var z=this.e
if(z==null){z=D.K()
this.e=z}return z},
E:[function(a){var z
H.i(a,"$isn")
z=this.e
if(!(z==null))z.A(a)},function(){return this.E(null)},"ar","$1","$0","gaq",0,2,1],
j_:[function(a,b){var z,y,x,w,v,u,t
z=U.a6
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gaq(),w={func:1,ret:-1,args:[D.n]},v=0;v<b.length;b.length===y||(0,H.C)(b),++v){u=b[v]
if(u!=null){t=u.gt()
t.toString
H.f(x,w)
C.a.h(t.a,x)}}z=new D.ck(a,b,this,[z])
z.b=!0
this.E(z)},"$2","geO",8,0,23],
jy:[function(a,b){var z,y,x,w,v,u,t
z=U.a6
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gaq(),w={func:1,ret:-1,args:[D.n]},v=0;v<b.length;b.length===y||(0,H.C)(b),++v){u=b[v]
if(u!=null){t=u.gt()
t.toString
H.f(x,w)
C.a.T(t.a,x)}}z=new D.cl(a,b,this,[z])
z.b=!0
this.E(z)},"$2","gfS",8,0,23],
ao:function(a,b,c){var z,y,x,w
z=this.r
y=b.e
if(typeof z!=="number")return z.U()
if(z<y){this.r=y
z=this.e
if(!(z==null))++z.c
for(z=this.a,z=new J.av(z,z.length,0,[H.A(z,0)]),x=null;z.H();){y=z.d
if(y!=null){w=y.ao(0,b,c)
if(w!=null)x=x==null?w:w.j(0,x)}}this.f=x==null?V.bn():x
z=this.e
if(!(z==null))z.ay(0)}return this.f},
u:function(a,b){var z,y,x,w
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.ep))return!1
z=this.a.length
for(y=0;y<z;++y){x=this.a
if(y>=x.length)return H.j(x,y)
x=x[y]
w=b.a
if(y>=w.length)return H.j(w,y)
if(!J.W(x,w[y]))return!1}return!0},
i:function(a){return"Group"},
$ash:function(){return[U.a6]},
$asaf:function(){return[U.a6]},
$isa6:1,
q:{
cG:function(a){var z=new U.ep()
z.bq(U.a6)
z.bp(z.geO(),z.gfS())
z.aE(0,a)
z.e=null
z.f=V.bn()
z.r=0
return z}}},eu:{"^":"b;0a,0b,0c,0d",
gt:function(){var z=this.b
if(z==null){z=D.K()
this.b=z}return z},
E:[function(a){var z
H.i(a,"$isn")
z=this.b
if(!(z==null))z.A(a)},function(){return this.E(null)},"ar","$1","$0","gaq",0,2,1],
ao:function(a,b,c){var z,y,x
z=this.d
y=b.e
if(z<y){this.d=y
z=this.b
if(!(z==null))++z.c
z=this.a
z=z==null?null:z.ao(0,b,c)
x=z==null?null:z.be(0)
this.c=x==null?V.bn():x
z=this.b
if(!(z==null))z.ay(0)}return this.c},
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.eu))return!1
z=this.a
y=b.a
if(z==null?y!=null:z!==y)return!1
return!0},
i:function(a){return"Invert"},
$isa6:1},a6:{"^":"d8;"},eZ:{"^":"a6;0a,0b,0c,0d,0e,0f,0r,0x,0y",
gt:function(){var z=this.y
if(z==null){z=D.K()
this.y=z}return z},
E:function(a){var z=this.y
if(!(z==null))z.A(a)},
sel:function(a){var z,y
a=V.cZ(a,0,6.283185307179586)
z=this.a
if(!$.m.$2(z,a)){y=this.a
this.a=a
z=new D.G("yaw",y,a,this,[P.y])
z.b=!0
this.E(z)}},
sed:function(a,b){var z,y
b=V.cZ(b,0,6.283185307179586)
z=this.b
if(!$.m.$2(z,b)){y=this.b
this.b=b
z=new D.G("pitch",y,b,this,[P.y])
z.b=!0
this.E(z)}},
seh:function(a){var z,y
a=V.cZ(a,0,6.283185307179586)
z=this.c
if(!$.m.$2(z,a)){y=this.c
this.c=a
z=new D.G("roll",y,a,this,[P.y])
z.b=!0
this.E(z)}},
ao:function(a,b,c){var z,y,x,w
z=this.r
y=b.e
if(z<y){this.r=y
z=this.y
if(!(z==null))++z.c
this.sel(this.a+this.d*b.y)
this.sed(0,this.b+this.e*b.y)
this.seh(this.c+this.f*b.y)
z=this.c
x=Math.cos(z)
w=Math.sin(z)
this.x=V.aE(x,-w,0,0,w,x,0,0,0,0,1,0,0,0,0,1).j(0,V.eM(this.b)).j(0,V.eL(this.a))
z=this.y
if(!(z==null))z.ay(0)}return this.x},
u:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof U.eZ))return!1
z=this.a
y=b.a
if(!$.m.$2(z,y))return!1
z=this.b
y=b.b
if(!$.m.$2(z,y))return!1
z=this.c
y=b.c
if(!$.m.$2(z,y))return!1
z=this.d
y=b.d
if(!$.m.$2(z,y))return!1
z=this.e
y=b.e
if(!$.m.$2(z,y))return!1
z=this.f
y=b.f
if(!$.m.$2(z,y))return!1
return!0},
i:function(a){return"Rotater: ["+V.D(this.a,3,0)+", "+V.D(this.b,3,0)+", "+V.D(this.c,3,0)+"], ["+V.D(this.d,3,0)+", "+V.D(this.e,3,0)+", "+V.D(this.f,3,0)+"]"}},jY:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx",
gt:function(){var z=this.fx
if(z==null){z=D.K()
this.fx=z}return z},
E:[function(a){var z
H.i(a,"$isn")
z=this.fx
if(!(z==null))z.A(a)},function(){return this.E(null)},"ar","$1","$0","gaq",0,2,1],
a5:function(a){var z,y,x
if(this.a!=null)return!1
this.a=a
z=a.c
y=z.b
if(y==null){y=D.K()
z.b=y
z=y}else z=y
y={func:1,ret:-1,args:[D.n]}
x=H.f(this.gfn(),y)
C.a.h(z.a,x)
x=this.a.c
z=x.d
if(z==null){z=D.K()
x.d=z}x=H.f(this.gfo(),y)
C.a.h(z.a,x)
x=this.a.c
z=x.c
if(z==null){z=D.K()
x.c=z}x=H.f(this.gfp(),y)
C.a.h(z.a,x)
x=this.a.d
z=x.f
if(z==null){z=D.K()
x.f=z}x=H.f(this.gfk(),y)
C.a.h(z.a,x)
x=this.a.d
z=x.d
if(z==null){z=D.K()
x.d=z}x=H.f(this.gfl(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.b
if(z==null){z=D.K()
x.b=z}x=H.f(this.ghh(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.d
if(z==null){z=D.K()
x.d=z}x=H.f(this.ghg(),y)
C.a.h(z.a,x)
x=this.a.e
z=x.c
if(z==null){z=D.K()
x.c=z}y=H.f(this.ghf(),y)
C.a.h(z.a,y)
return!0},
as:function(a){var z,y
z=a.a
y=a.b
if(this.f){if(typeof z!=="number")return z.K()
z=-z}if(this.r){if(typeof y!=="number")return y.K()
y=-y}return new V.a_(z,y)},
j8:[function(a){a=H.k(H.i(a,"$isn"),"$isbQ")
if(!J.W(this.d,a.x.b))return
this.cx=!0
this.ch=!0
this.cy=this.c.d
this.db=this.b.d},"$1","gfn",4,0,0],
j9:[function(a){var z,y,x,w,v,u,t
a=H.k(H.i(a,"$isn"),"$isbQ")
if(!this.cx)return
if(this.ch){z=a.d.v(0,a.y)
z=new V.a_(z.a,z.b)
z=z.D(z)
y=this.Q
if(typeof y!=="number")return H.e(y)
if(z<y)return
this.ch=!1}if(this.e){z=a.c
y=a.d.v(0,a.y)
z=this.as(new V.a_(y.a,y.b).j(0,2).w(0,z.gax()))
this.dx=z
y=this.c
z=z.a
if(typeof z!=="number")return z.K()
x=this.y
if(typeof x!=="number")return H.e(x)
y.sG(-z*10*x)
x=this.b
z=this.dx.b
if(typeof z!=="number")return z.K()
y=this.x
if(typeof y!=="number")return H.e(y)
x.sG(-z*10*y)}else{z=a.c
y=a.d
x=y.v(0,a.y)
w=this.as(new V.a_(x.a,x.b).j(0,2).w(0,z.gax()))
x=this.c
v=w.a
if(typeof v!=="number")return v.K()
u=this.y
if(typeof u!=="number")return H.e(u)
t=this.cy
if(typeof t!=="number")return H.e(t)
x.sS(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.K()
v=this.x
if(typeof v!=="number")return H.e(v)
x=this.db
if(typeof x!=="number")return H.e(x)
t.sS(0,-u*v+x)
this.b.sG(0)
this.c.sG(0)
y=y.v(0,a.z)
this.dx=this.as(new V.a_(y.a,y.b).j(0,2).w(0,z.gax()))}this.ar()},"$1","gfo",4,0,0],
ja:[function(a){var z,y,x
H.i(a,"$isn")
if(!this.cx)return
this.cx=!1
if(this.ch)return
z=this.dx
if(z.D(z)>0.0001){z=this.c
y=this.dx.a
if(typeof y!=="number")return y.K()
x=this.y
if(typeof x!=="number")return H.e(x)
z.sG(-y*10*x)
x=this.b
y=this.dx.b
if(typeof y!=="number")return y.K()
z=this.x
if(typeof z!=="number")return H.e(z)
x.sG(-y*10*z)
this.ar()}},"$1","gfp",4,0,0],
j6:[function(a){if(H.k(H.i(a,"$isn"),"$iseE").x){this.ch=!0
this.cy=this.c.d
this.db=this.b.d}},"$1","gfk",4,0,0],
j7:[function(a){var z,y,x,w,v,u,t
a=H.k(H.i(a,"$isn"),"$isbQ")
if(!J.W(this.d,a.x.b))return
z=a.c
y=a.d
x=y.v(0,a.y)
w=this.as(new V.a_(x.a,x.b).j(0,2).w(0,z.gax()))
x=this.c
v=w.a
if(typeof v!=="number")return v.K()
u=this.y
if(typeof u!=="number")return H.e(u)
t=this.cy
if(typeof t!=="number")return H.e(t)
x.sS(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.K()
v=this.x
if(typeof v!=="number")return H.e(v)
x=this.db
if(typeof x!=="number")return H.e(x)
t.sS(0,-u*v+x)
this.b.sG(0)
this.c.sG(0)
y=y.v(0,a.z)
this.dx=this.as(new V.a_(y.a,y.b).j(0,2).w(0,z.gax()))
this.ar()},"$1","gfl",4,0,0],
jH:[function(a){H.i(a,"$isn")
this.cx=!0
this.ch=!0
this.cy=this.c.d
this.db=this.b.d},"$1","ghh",4,0,0],
jG:[function(a){var z,y,x,w,v,u,t
a=H.k(H.i(a,"$isn"),"$isfb")
if(!this.cx)return
if(this.ch){z=a.d.v(0,a.y)
z=new V.a_(z.a,z.b)
z=z.D(z)
y=this.Q
if(typeof y!=="number")return H.e(y)
if(z<y)return
this.ch=!1}if(this.e){z=a.c
y=a.d.v(0,a.y)
z=this.as(new V.a_(y.a,y.b).j(0,2).w(0,z.gax()))
this.dx=z
y=this.c
z=z.a
if(typeof z!=="number")return z.K()
x=this.y
if(typeof x!=="number")return H.e(x)
y.sG(-z*10*x)
x=this.b
z=this.dx.b
if(typeof z!=="number")return z.K()
y=this.x
if(typeof y!=="number")return H.e(y)
x.sG(-z*10*y)}else{z=a.c
y=a.d
x=y.v(0,a.y)
w=this.as(new V.a_(x.a,x.b).j(0,2).w(0,z.gax()))
x=this.c
v=w.a
if(typeof v!=="number")return v.K()
u=this.y
if(typeof u!=="number")return H.e(u)
t=this.cy
if(typeof t!=="number")return H.e(t)
x.sS(0,-v*u+t)
t=this.b
u=w.b
if(typeof u!=="number")return u.K()
v=this.x
if(typeof v!=="number")return H.e(v)
x=this.db
if(typeof x!=="number")return H.e(x)
t.sS(0,-u*v+x)
this.b.sG(0)
this.c.sG(0)
y=y.v(0,a.z)
this.dx=this.as(new V.a_(y.a,y.b).j(0,2).w(0,z.gax()))}this.ar()},"$1","ghg",4,0,0],
jF:[function(a){var z,y,x
H.i(a,"$isn")
if(!this.cx)return
this.cx=!1
if(this.ch)return
z=this.dx
if(z.D(z)>0.0001){z=this.c
y=this.dx.a
if(typeof y!=="number")return y.K()
x=this.y
if(typeof x!=="number")return H.e(x)
z.sG(-y*10*x)
x=this.b
y=this.dx.b
if(typeof y!=="number")return y.K()
z=this.x
if(typeof z!=="number")return H.e(z)
x.sG(-y*10*z)
this.ar()}},"$1","ghf",4,0,0],
ao:function(a,b,c){var z,y,x
z=this.dy
y=b.e
if(typeof z!=="number")return z.U()
if(z<y){this.dy=y
x=b.y
this.c.ab(0,x)
this.b.ab(0,x)
this.fr=V.eL(this.b.d).j(0,V.eM(this.c.d))}return this.fr},
$isa6:1},jZ:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy",
gt:function(){var z=this.dx
if(z==null){z=D.K()
this.dx=z}return z},
E:[function(a){var z
H.i(a,"$isn")
z=this.dx
if(!(z==null))z.A(a)},function(){return this.E(null)},"ar","$1","$0","gaq",0,2,1],
sG:function(a){this.r.sG(a.a)
this.x.sG(a.b)
this.y.sG(a.c)},
gS:function(a){return new V.r(this.r.d,this.x.d,this.y.d)},
sS:function(a,b){H.i(b,"$isr")
this.r.sS(0,b.a)
this.x.sS(0,b.b)
this.y.sS(0,b.c)},
jq:[function(a){this.E(H.i(a,"$isn"))},"$1","gfI",4,0,0],
cj:function(a,b,c,d,e){if(a.r){if(typeof e!=="number")return e.n()
e+=d}else if(b.r){if(typeof e!=="number")return e.v()
e-=d}else{if(typeof e!=="number")return e.iW()
e=e>0?e-Math.min(e,c):e+Math.min(-e,c)}return e},
ao:function(a,b,c){var z,y,x,w,v,u,t
z=this.cy
y=b.e
if(typeof z!=="number")return z.U()
if(z<y){this.cy=y
x=this.gS(this)
w=b.y
if(w>0.1)w=0.1
z=this.ch
if(typeof z!=="number")return z.j()
v=z*w
z=this.cx
if(typeof z!=="number")return z.j()
u=z*w
t=new V.H(this.r.f,this.x.f,this.y.f)
z=this.Q
if(z!=null)t=z.an(t)
t=new V.H(this.cj(this.a,this.b,v,u,t.a),this.cj(this.c,this.d,v,u,t.b),this.cj(this.e,this.f,v,u,t.c))
z=this.z
this.sG(z!=null?z.an(t):t)
this.r.ab(0,w)
this.x.ab(0,w)
this.y.ab(0,w)
if(this.dy!=null){z=this.gS(this)
this.sS(0,this.dy.$2(x,z))}this.db=V.co(this.r.d,-this.x.d,this.y.d)}return this.db},
$isa6:1}}],["","",,M,{"^":"",hM:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x",
b7:[function(a){var z
H.i(a,"$isn")
z=this.x
if(!(z==null))z.A(a)},function(){return this.b7(null)},"j0","$1","$0","gaP",0,2,1],
ji:[function(a,b){var z,y,x,w,v,u,t,s
z=E.ah
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gaP(),w={func:1,ret:-1,args:[D.n]},v=[w],u=0;u<b.length;b.length===y||(0,H.C)(b),++u){t=b[u]
if(t!=null){if(t.ga4()==null){s=new D.bk()
s.a=H.a([],v)
s.c=0
t.sa4(s)}s=t.ga4()
s.toString
H.f(x,w)
C.a.h(s.a,x)}}z=new D.ck(a,b,this,[z])
z.b=!0
this.b7(z)},"$2","gfA",8,0,7],
jj:[function(a,b){var z,y,x,w,v,u,t,s
z=E.ah
H.p(b,"$ish",[z],"$ash")
for(y=b.length,x=this.gaP(),w={func:1,ret:-1,args:[D.n]},v=[w],u=0;u<b.length;b.length===y||(0,H.C)(b),++u){t=b[u]
if(t!=null){if(t.ga4()==null){s=new D.bk()
s.a=H.a([],v)
s.c=0
t.sa4(s)}s=t.ga4()
s.toString
H.f(x,w)
C.a.T(s.a,x)}}z=new D.cl(a,b,this,[z])
z.b=!0
this.b7(z)},"$2","gfB",8,0,7],
gt:function(){var z=this.x
if(z==null){z=D.K()
this.x=z}return z},
b5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=new E.jp(a,this)
z.b=!0
y=this.e
if(!(y==null))y.A(z)
a.eg(this.c)
y=this.b
y.toString
a.a.bindFramebuffer(36160,null)
a.a.enable(2884)
a.a.enable(2929)
a.a.depthFunc(513)
x=a.a
w=x.drawingBufferWidth
v=x.drawingBufferHeight
u=y.r
if(typeof w!=="number")return H.e(w)
t=C.h.am(u.a*w)
if(typeof v!=="number")return H.e(v)
s=C.h.am(u.b*v)
r=C.h.am(u.c*w)
a.c=r
u=C.h.am(u.d*v)
a.d=u
x.viewport(t,s,r,u)
a.a.clearDepth(y.c)
x=a.a
y=y.a
x.clearColor(y.a,y.b,y.c,y.d)
a.a.clear(16640)
y=this.a
x=a.c
u=a.d
r=a.cy
q=y.b
p=y.c
o=y.d
n=o-p
m=1/Math.tan(q*0.5)
r.ef(V.aE(-m/(x/u),0,0,0,0,m,0,0,0,0,o/n,-o*p/n,0,0,1,0))
x=$.eQ
if(x==null){x=V.eK(new V.r(0,0,0),new V.H(0,1,0),new V.H(0,0,-1))
$.eQ=x
l=x}else l=x
x=y.a
if(x!=null){k=x.ao(0,a,y)
if(k!=null)l=k.j(0,l)}a.db.ef(l)
for(y=this.d.a,y=new J.av(y,y.length,0,[H.A(y,0)]);y.H();)y.d.ab(0,a)
for(y=this.d.a,y=new J.av(y,y.length,0,[H.A(y,0)]);y.H();)y.d.b5(a)
this.a.toString
a.cy.cM()
a.db.cM()
this.b.toString
a.ee()},
$ismU:1}}],["","",,A,{"^":"",e2:{"^":"b;a,b,c"},hl:{"^":"b;a",
k:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(w.b===b)return w}return},
i0:function(){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
w.a.enableVertexAttribArray(w.c)}},
hZ:function(){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
w.a.disableVertexAttribArray(w.c)}}},im:{"^":"f_;0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,0r2,0rx,0ry,0x1,0x2,0y1,0y2,0b1,0aI,0b2,0bF,0dL,0dM,0bG,0bH,0dN,0dO,0bI,0bJ,0dP,0dQ,0bK,0dR,0dS,0bL,0dT,0dU,0bM,0bN,0bO,0dV,0dW,0bP,0bQ,0dX,0dY,0bR,0dZ,0cz,0e_,0cA,0e0,0cB,0e1,0cC,0e2,0cD,0e3,0cE,a,b,0c,0d,0e,0f,0r",
ez:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
this.x=a2
z=new P.cr("")
y=a2.fx
if(y){z.a="uniform mat4 objMat;\n"
x="uniform mat4 objMat;\n"}else x=""
w=a2.fy
if(w){x+="uniform mat4 viewObjMat;\n"
z.a=x}x+="uniform mat4 projViewObjMat;\n"
z.a=x
x+="\n"
z.a=x
x+="attribute vec3 posAttr;\n"
z.a=x
v=a2.r1
if(v){x+="attribute vec3 normAttr;\n"
z.a=x}u=a2.r2
if(u){x+="attribute vec3 binmAttr;\n"
z.a=x}z.a=x+"\n"
a2.hr(z)
a2.hy(z)
a2.hs(z)
a2.hG(z)
a2.hH(z)
a2.hA(z)
a2.hL(z)
x=z.a+="vec4 getPos()\n"
x+="{\n"
z.a=x
t=a2.x1
x+="   return projViewObjMat*vec4("+(t?"bendPos":"posAttr")+", 1.0);\n"
z.a=x
x+="}\n"
z.a=x
x+="\n"
z.a=x
x+="void main()\n"
z.a=x
x+="{\n"
z.a=x
if(t){x+="   setupBendData();\n"
z.a=x}if(v){x+="   normalVec = getNorm();\n"
z.a=x}if(u){x+="   binormalVec = getBinm();\n"
z.a=x}if(a2.rx){x+="   txt2D = getTxt2D();\n"
z.a=x}if(a2.ry){x+="   txtCube = getTxtCube();\n"
z.a=x}if(a2.k3){x+="   objPos = getObjPos();\n"
z.a=x}if(a2.k4){x+="   viewPos = getViewPos();\n"
z.a=x}x+="   gl_Position = getPos();\n"
z.a=x
x+="}\n"
z.a=x
x+="\n"
z.a=x
v=this.x
z=new P.cr("")
z.a="precision mediump float;\n"
z.a="precision mediump float;\n\n"
u=v.r1
if(u){z.a="precision mediump float;\n\nvarying vec3 normalVec;\n"
t="precision mediump float;\n\nvarying vec3 normalVec;\n"}else t="precision mediump float;\n\n"
if(v.r2){t+="varying vec3 binormalVec;\n"
z.a=t}if(v.rx){t+="varying vec2 txt2D;\n"
z.a=t}if(v.ry){t+="varying vec3 txtCube;\n"
z.a=t}if(v.k3){t+="varying vec3 objPos;\n"
z.a=t}if(v.k4){t+="varying vec3 viewPos;\n"
z.a=t}t+="\n"
z.a=t
s=v.y2
if(s){t+="uniform mat4 colorMat;\n"
z.a=t}if(v.fr){t+="uniform mat4 invViewMat;\n"
z.a=t}z.a=t+"\n"
v.hv(z)
v.hq(z)
v.ht(z)
v.hw(z)
v.hE(z)
t=v.dy
if(t){r=z.a+="// === Enviromental ===\n"
r+="\n"
z.a=r
r+="uniform samplerCube envSampler;\n"
z.a=r
r+="uniform int nullEnvTxt;\n"
z.a=r
z.a=r+"\n"
v.hC(z)
v.hD(z)}v.hz(z)
r=z.a+="// === Alpha ===\n"
r+="\n"
z.a=r
q=v.y
if(q!==C.b){r+="uniform float alpha;\n"
z.a=r
if(q!==C.f){r+="uniform int nullAlphaTxt;\n"
z.a=r
if(q===C.c){r+="uniform sampler2D alphaTxt;\n"
z.a=r}else if(q===C.d){r+="uniform samplerCube alphaTxt;\n"
z.a=r}}r+="\n"
z.a=r}r+="float alphaValue()\n"
z.a=r
r+="{\n"
z.a=r
switch(q){case C.b:r+="   return 1.0;\n"
z.a=r
break
case C.f:r+="   return alpha;\n"
z.a=r
break
case C.c:r+="   if(nullAlphaTxt > 0) return alpha;\n"
z.a=r
r+="   float a = alpha*texture2D(alphaTxt, txt2D).a;\n"
z.a=r
r+="   if (a <= 0.000001) discard;\n"
z.a=r
r+="   return a;\n"
z.a=r
break
case C.d:r+="   if(nullAlphaTxt > 0) return alpha;\n"
z.a=r
r+="   float a = alpha*textureCube(alphaTxt, txtCube).a;\n"
z.a=r
r+="   if (a <= 0.000001) discard;\n"
z.a=r
r+="   return a;\n"
z.a=r
break}r+="}\n"
z.a=r
r+="\n"
z.a=r
q=v.k2
if(q){r+="// === Lighting ===\n"
z.a=r
r+="\n"
z.a=r
r+="vec3 lightValue(vec3 norm, vec3 litClr, vec3 litVec)\n"
z.a=r
r+="{\n"
z.a=r
z.a=r+"   if ((litClr.r < 0.001) && (litClr.g < 0.001) && (litClr.b < 0.001)) return litClr;\n"
p=H.a([],[P.o])
if(v.b!==C.b)C.a.h(p,"ambient()")
if(v.c!==C.b)C.a.h(p,"diffuse(norm, litVec)")
if(v.d!==C.b)C.a.h(p,"invDiffuse(norm, litVec)")
if(v.e!==C.b)C.a.h(p,"specular(norm, litVec)")
r=z.a+="   return litClr*("+C.a.B(p," + ")+");\n"
r+="}\n"
z.a=r
z.a=r+"\n"
v.hu(z)
v.hB(z)
v.hF(z)
v.hI(z)
v.hJ(z)
v.hK(z)
v.hx(z)}r=z.a+="// === Main ===\n"
r+="\n"
z.a=r
r+="void main()\n"
z.a=r
r+="{\n"
z.a=r
r+="   float alpha = alphaValue();\n"
z.a=r
if(u){u=r+"   vec3 norm = normal();\n"
z.a=u}else u=r
if(t)z.a=u+"   vec3 refl = reflect(normalize(viewPos), norm);\n"
o=H.a([],[P.o])
if(q){z.a+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
C.a.h(o,"lightAccum")
if(v.c!==C.b)z.a+="   setDiffuseColor();\n"
if(v.d!==C.b)z.a+="   setInvDiffuseColor();\n"
if(v.e!==C.b)z.a+="   setSpecularColor();\n"
if(v.z>0)z.a+="   lightAccum += allDirLightValues(norm);\n"
if(v.Q>0)z.a+="   lightAccum += allPointLightValues(norm);\n"
if(v.ch>0)z.a+="   lightAccum += allSpotLightValues(norm);\n"
if(v.cx>0)z.a+="   lightAccum += allTxtDirLightValues(norm);\n"
if(v.cy>0)z.a+="   lightAccum += allTxtPointLightValues(norm);\n"
if(v.db>0)z.a+="   lightAccum += allTxtSpotLightValues(norm);\n"
if(v.dx<=0)z.a+="   lightAccum += nonLightValues(norm);\n"}if(v.a!==C.b)C.a.h(o,"emission()")
if(v.r!==C.b)C.a.h(o,"reflect(refl)")
if(v.x!==C.b)C.a.h(o,"refract(refl)")
if(o.length<=0)C.a.h(o,"vec3(0.0, 0.0, 0.0)")
n="vec4("+C.a.B(o," + ")+", alpha);"
v=z.a
if(s){v+="   gl_FragColor = colorMat*"+n+"\n"
z.a=v}else{v+="   gl_FragColor = "+n+"\n"
z.a=v}v+="}\n"
z.a=v
this.c=this.dj(x.charCodeAt(0)==0?x:x,35633)
this.d=this.dj(v.charCodeAt(0)==0?v:v,35632)
v=this.a
x=v.createProgram()
this.e=x
v.attachShader(x,this.c)
v.attachShader(this.e,this.d)
v.linkProgram(this.e)
if(!H.fZ(v.getProgramParameter(this.e,35714))){m=v.getProgramInfoLog(this.e)
v.deleteProgram(this.e)
H.t(P.u("Failed to link shader: "+H.l(m)))}this.ha()
this.hc()
this.y=this.f.k(0,"posAttr")
this.Q=this.f.k(0,"normAttr")
this.z=this.f.k(0,"binmAttr")
this.ch=this.f.k(0,"txt2DAttr")
this.cx=this.f.k(0,"txtCubeAttr")
this.cy=this.f.k(0,"bendAttr")
if(a2.fr)this.fy=H.k(this.r.p(0,"invViewMat"),"$isaP")
if(y)this.db=H.k(this.r.p(0,"objMat"),"$isaP")
if(w)this.dx=H.k(this.r.p(0,"viewObjMat"),"$isaP")
this.fr=H.k(this.r.p(0,"projViewObjMat"),"$isaP")
if(a2.x2)this.go=H.k(this.r.p(0,"txt2DMat"),"$isdJ")
if(a2.y1)this.id=H.k(this.r.p(0,"txtCubeMat"),"$isaP")
if(a2.y2)this.k1=H.k(this.r.p(0,"colorMat"),"$isaP")
this.k3=H.a([],[A.aP])
y=a2.b1
if(y>0){this.k2=H.i(this.r.p(0,"bendMatCount"),"$isO")
for(l=0;l<y;++l){x=this.k3
w=this.r
v="bendValues["+l+"].mat"
k=w.k(0,v)
if(k==null)H.t(P.u("Required uniform value, "+v+", was not defined or used in shader."));(x&&C.a).h(x,H.k(k,"$isaP"))}}y=a2.a
if(y!==C.b){this.k4=H.k(this.r.p(0,"emissionClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.r1=H.k(this.r.p(0,"emissionTxt"),"$isar")
this.rx=H.k(this.r.p(0,"nullEmissionTxt"),"$isO")
break
case C.d:this.r2=H.k(this.r.p(0,"emissionTxt"),"$isas")
this.rx=H.k(this.r.p(0,"nullEmissionTxt"),"$isO")
break}}y=a2.b
if(y!==C.b){this.ry=H.k(this.r.p(0,"ambientClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.x1=H.k(this.r.p(0,"ambientTxt"),"$isar")
this.y1=H.k(this.r.p(0,"nullAmbientTxt"),"$isO")
break
case C.d:this.x2=H.k(this.r.p(0,"ambientTxt"),"$isas")
this.y1=H.k(this.r.p(0,"nullAmbientTxt"),"$isO")
break}}y=a2.c
if(y!==C.b){this.y2=H.k(this.r.p(0,"diffuseClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.b1=H.k(this.r.p(0,"diffuseTxt"),"$isar")
this.b2=H.k(this.r.p(0,"nullDiffuseTxt"),"$isO")
break
case C.d:this.aI=H.k(this.r.p(0,"diffuseTxt"),"$isas")
this.b2=H.k(this.r.p(0,"nullDiffuseTxt"),"$isO")
break}}y=a2.d
if(y!==C.b){this.bF=H.k(this.r.p(0,"invDiffuseClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.dL=H.k(this.r.p(0,"invDiffuseTxt"),"$isar")
this.bG=H.k(this.r.p(0,"nullInvDiffuseTxt"),"$isO")
break
case C.d:this.dM=H.k(this.r.p(0,"invDiffuseTxt"),"$isas")
this.bG=H.k(this.r.p(0,"nullInvDiffuseTxt"),"$isO")
break}}y=a2.e
if(y!==C.b){this.bJ=H.k(this.r.p(0,"shininess"),"$isY")
this.bH=H.k(this.r.p(0,"specularClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.dN=H.k(this.r.p(0,"specularTxt"),"$isar")
this.bI=H.k(this.r.p(0,"nullSpecularTxt"),"$isO")
break
case C.d:this.dO=H.k(this.r.p(0,"specularTxt"),"$isas")
this.bI=H.k(this.r.p(0,"nullSpecularTxt"),"$isO")
break}}switch(a2.f){case C.b:break
case C.f:break
case C.c:this.dP=H.k(this.r.p(0,"bumpTxt"),"$isar")
this.bK=H.k(this.r.p(0,"nullBumpTxt"),"$isO")
break
case C.d:this.dQ=H.k(this.r.p(0,"bumpTxt"),"$isas")
this.bK=H.k(this.r.p(0,"nullBumpTxt"),"$isO")
break}if(a2.dy){this.dR=H.k(this.r.p(0,"envSampler"),"$isas")
this.dS=H.k(this.r.p(0,"nullEnvTxt"),"$isO")
y=a2.r
if(y!==C.b){this.bL=H.k(this.r.p(0,"reflectClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.dT=H.k(this.r.p(0,"reflectTxt"),"$isar")
this.bM=H.k(this.r.p(0,"nullReflectTxt"),"$isO")
break
case C.d:this.dU=H.k(this.r.p(0,"reflectTxt"),"$isas")
this.bM=H.k(this.r.p(0,"nullReflectTxt"),"$isO")
break}}y=a2.x
if(y!==C.b){this.bN=H.k(this.r.p(0,"refraction"),"$isY")
this.bO=H.k(this.r.p(0,"refractClr"),"$isN")
switch(y){case C.b:break
case C.f:break
case C.c:this.dV=H.k(this.r.p(0,"refractTxt"),"$isar")
this.bP=H.k(this.r.p(0,"nullRefractTxt"),"$isO")
break
case C.d:this.dW=H.k(this.r.p(0,"refractTxt"),"$isas")
this.bP=H.k(this.r.p(0,"nullRefractTxt"),"$isO")
break}}}y=a2.y
if(y!==C.b){this.bQ=H.k(this.r.p(0,"alpha"),"$isY")
switch(y){case C.b:break
case C.f:break
case C.c:this.dX=H.k(this.r.p(0,"alphaTxt"),"$isar")
this.bR=H.k(this.r.p(0,"nullAlphaTxt"),"$isO")
break
case C.d:this.dY=H.k(this.r.p(0,"alphaTxt"),"$isas")
this.bR=H.k(this.r.p(0,"nullAlphaTxt"),"$isO")
break}}this.cz=H.a([],[A.fo])
this.cA=H.a([],[A.fp])
this.cB=H.a([],[A.fq])
this.cC=H.a([],[A.fr])
this.cD=H.a([],[A.fs])
this.cE=H.a([],[A.ft])
if(a2.k2){y=a2.z
if(y>0){this.dZ=H.i(this.r.p(0,"dirLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="dirLights["+l+"].viewDir"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="dirLights["+l+"].color"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.cz;(x&&C.a).h(x,new A.fo(l,k,j))}}y=a2.Q
if(y>0){this.e_=H.i(this.r.p(0,"pntLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="pntLights["+l+"].point"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="pntLights["+l+"].viewPnt"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.r
w="pntLights["+l+"].color"
i=x.k(0,w)
if(i==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(i,"$isN")
x=this.r
w="pntLights["+l+"].att0"
h=x.k(0,w)
if(h==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(h,"$isY")
x=this.r
w="pntLights["+l+"].att1"
g=x.k(0,w)
if(g==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(g,"$isY")
x=this.r
w="pntLights["+l+"].att2"
f=x.k(0,w)
if(f==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(f,"$isY")
x=this.cA;(x&&C.a).h(x,new A.fp(l,k,j,i,h,g,f))}}y=a2.ch
if(y>0){this.e0=H.i(this.r.p(0,"spotLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="spotLights["+l+"].objPnt"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="spotLights["+l+"].objDir"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.r
w="spotLights["+l+"].viewPnt"
i=x.k(0,w)
if(i==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(i,"$isN")
x=this.r
w="spotLights["+l+"].color"
h=x.k(0,w)
if(h==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(h,"$isN")
x=this.r
w="spotLights["+l+"].cutoff"
g=x.k(0,w)
if(g==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(g,"$isY")
x=this.r
w="spotLights["+l+"].coneAngle"
f=x.k(0,w)
if(f==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(f,"$isY")
x=this.r
w="spotLights["+l+"].att0"
e=x.k(0,w)
if(e==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(e,"$isY")
x=this.r
w="spotLights["+l+"].att1"
d=x.k(0,w)
if(d==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(d,"$isY")
x=this.r
w="spotLights["+l+"].att2"
c=x.k(0,w)
if(c==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(c,"$isY")
x=this.cB;(x&&C.a).h(x,new A.fq(l,k,j,i,h,g,f,e,d,c))}}y=a2.cx
if(y>0){this.e1=H.i(this.r.p(0,"txtDirLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="txtDirLights["+l+"].objUp"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="txtDirLights["+l+"].objRight"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.r
w="txtDirLights["+l+"].objDir"
i=x.k(0,w)
if(i==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(i,"$isN")
x=this.r
w="txtDirLights["+l+"].viewDir"
h=x.k(0,w)
if(h==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(h,"$isN")
x=this.r
w="txtDirLights["+l+"].color"
g=x.k(0,w)
if(g==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(g,"$isN")
x=this.r
w="txtDirLights["+l+"].nullTxt"
f=x.k(0,w)
if(f==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(f,"$isO")
x=this.r
w="txtDirLightsTxt2D"+l
e=x.k(0,w)
if(e==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(e,"$isar")
x=this.cC;(x&&C.a).h(x,new A.fr(l,k,j,i,h,g,e,f))}}y=a2.cy
if(y>0){this.e2=H.i(this.r.p(0,"txtPntLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="txtPntLights["+l+"].point"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="txtPntLights["+l+"].viewPnt"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.r
w="txtPntLights["+l+"].invViewRotMat"
i=x.k(0,w)
if(i==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(i,"$isdJ")
x=this.r
w="txtPntLights["+l+"].color"
h=x.k(0,w)
if(h==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(h,"$isN")
x=this.r
w="txtPntLights["+l+"].nullTxt"
g=x.k(0,w)
if(g==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(g,"$isO")
x=this.r
w="txtPntLights["+l+"].att0"
f=x.k(0,w)
if(f==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(f,"$isY")
x=this.r
w="txtPntLights["+l+"].att1"
e=x.k(0,w)
if(e==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(e,"$isY")
x=this.r
w="txtPntLights["+l+"].att2"
d=x.k(0,w)
if(d==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(d,"$isY")
x=this.r
w="txtPntLightsTxtCube"+l
c=x.k(0,w)
if(c==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(c,"$isas")
x=this.cD;(x&&C.a).h(x,new A.fs(l,k,j,i,h,c,g,f,e,d))}}y=a2.db
if(y>0){this.e3=H.i(this.r.p(0,"txtSpotLightCount"),"$isO")
for(l=0;l<y;++l){x=this.r
w="txtSpotLights["+l+"].objPnt"
k=x.k(0,w)
if(k==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(k,"$isN")
x=this.r
w="txtSpotLights["+l+"].objDir"
j=x.k(0,w)
if(j==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(j,"$isN")
x=this.r
w="txtSpotLights["+l+"].objUp"
i=x.k(0,w)
if(i==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(i,"$isN")
x=this.r
w="txtSpotLights["+l+"].objRight"
h=x.k(0,w)
if(h==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(h,"$isN")
x=this.r
w="txtSpotLights["+l+"].viewPnt"
g=x.k(0,w)
if(g==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(g,"$isN")
x=this.r
w="txtSpotLights["+l+"].nullTxt"
f=x.k(0,w)
if(f==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(f,"$isO")
x=this.r
w="txtSpotLights["+l+"].color"
e=x.k(0,w)
if(e==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(e,"$isN")
x=this.r
w="txtSpotLights["+l+"].tuScalar"
d=x.k(0,w)
if(d==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(d,"$isY")
x=this.r
w="txtSpotLights["+l+"].tvScalar"
c=x.k(0,w)
if(c==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(c,"$isY")
x=this.r
w="txtSpotLights["+l+"].att0"
b=x.k(0,w)
if(b==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(b,"$isY")
x=this.r
w="txtSpotLights["+l+"].att1"
a=x.k(0,w)
if(a==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(a,"$isY")
x=this.r
w="txtSpotLights["+l+"].att2"
a0=x.k(0,w)
if(a0==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(a0,"$isY")
x=this.r
w="txtSpotLightsTxt2D"+l
a1=x.k(0,w)
if(a1==null)H.t(P.u("Required uniform value, "+w+", was not defined or used in shader."))
H.k(a1,"$isar")
x=this.cE;(x&&C.a).h(x,new A.ft(l,k,j,i,h,g,a1,f,e,d,c,b,a,a0))}}}},
ak:function(a,b,c){if(c==null||!c.ga9(c))b.a.uniform1i(b.d,1)
else{a.eq(c)
b.a.uniform1i(b.d,0)}},
af:function(a,b,c){b.a.uniform1i(b.d,1)},
q:{
il:function(a,b){var z,y
z=a.aI
y=new A.im(b,z)
y.eD(b,z)
y.ez(a,b)
return y}}},iq:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,b1,aI,b2",
hr:function(a){var z,y,x
if(!this.x1)return
z=a.a+="struct BendingValue\n"
z+="{\n"
a.a=z
z+="   mat4 mat;\n"
a.a=z
z+="};\n"
a.a=z
a.a=z+"uniform int bendMatCount;\n"
z=a.a+="uniform BendingValue bendValues["+this.b1+"];\n"
z+="attribute vec4 bendAttr;\n"
a.a=z
z+="\n"
a.a=z
z+="float weightSum;\n"
a.a=z
z+="vec3 bendPos;\n"
a.a=z
y=this.r1
if(y){z+="vec3 bendNorm;\n"
a.a=z}x=this.r2
if(x){z+="vec3 bendBinm;\n"
a.a=z}z+="\n"
a.a=z
z+="void adjustBend(float bendVal)\n"
a.a=z
z+="{\n"
a.a=z
z+="   if(bendVal >= 0.0)\n"
a.a=z
z+="   {\n"
a.a=z
z+="      int index = int(floor((bendVal + 0.5)*0.5));\n"
a.a=z
z+="      if(index < bendMatCount)\n"
a.a=z
z+="      {\n"
a.a=z
z+="         float weight = clamp(bendVal - float(index)*2.0, 0.0, 1.0);\n"
a.a=z
z+="         mat4 m = bendValues[index].mat;\n"
a.a=z
z+="         weightSum += weight;\n"
a.a=z
z+="         bendPos += (m*vec4(posAttr, 1.0)).xyz*weight;\n"
a.a=z
if(y){z+="         bendNorm += (m*vec4(normAttr, 0.0)).xyz*weight;\n"
a.a=z}if(x){z+="         bendBinm += (m*vec4(binmAttr, 0.0)).xyz*weight;\n"
a.a=z}z+="      }\n"
a.a=z
z+="   }\n"
a.a=z
z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="void setupBendData()\n"
a.a=z
z+="{\n"
a.a=z
z+="   bendPos = vec3(0.0, 0.0, 0.0);\n"
a.a=z
if(y){z+="   bendNorm = vec3(0.0, 0.0, 0.0);\n"
a.a=z}if(x){z+="   bendBinm = vec3(0.0, 0.0, 0.0);\n"
a.a=z}z+="   weightSum = 0.0;\n"
a.a=z
z+="   adjustBend(bendAttr.x);\n"
a.a=z
z+="   adjustBend(bendAttr.y);\n"
a.a=z
z+="   adjustBend(bendAttr.z);\n"
a.a=z
z+="   adjustBend(bendAttr.w);\n"
a.a=z
z+="   if(weightSum < 1.0)\n"
a.a=z
z+="   {\n"
a.a=z
z+="      float weight = 1.0 - weightSum;\n"
a.a=z
z+="      bendPos += posAttr*weight;\n"
a.a=z
if(y){z+="      bendNorm += normAttr*weight;\n"
a.a=z}if(x){z+="      bendBinm += binmAttr*weight;\n"
a.a=z}z+="   }\n"
a.a=z
z+="   else\n"
a.a=z
z+="   {\n"
a.a=z
z+="      bendPos = bendPos/weightSum;\n"
a.a=z
z+="   }\n"
a.a=z
if(y){z+="   bendNorm = normalize(bendNorm);\n"
a.a=z}if(x){z+="   bendBinm = normalize(bendBinm);\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
hy:function(a){var z
if(!this.r1)return
z=a.a+="varying vec3 normalVec;\n"
z+="\n"
a.a=z
z+="vec3 getNorm()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return normalize((viewObjMat*vec4("+(this.x1?"bendNorm":"normAttr")+", 0.0)).xyz);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hs:function(a){var z
if(!this.r2)return
z=a.a+="varying vec3 binormalVec;\n"
z+="\n"
a.a=z
z+="vec3 getBinm()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return normalize((viewObjMat*vec4("+(this.x1?"bendBinm":"binmAttr")+", 0.0)).xyz);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hG:function(a){var z,y
if(!this.rx)return
z=this.x2
if(z)a.a+="uniform mat3 txt2DMat;\n"
y=a.a+="attribute vec2 txt2DAttr;\n"
y+="varying vec2 txt2D;\n"
a.a=y
y+="\n"
a.a=y
y+="vec2 getTxt2D()\n"
a.a=y
y+="{\n"
a.a=y
if(z){z=y+"   return (txt2DMat*vec3(txt2DAttr, 1.0)).xy;\n"
a.a=z}else{z=y+"   return vec3(txt2DAttr, 1.0).xy;\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
hH:function(a){var z,y
if(!this.ry)return
z=this.y1
if(z)a.a+="uniform mat4 txtCubeMat;\n"
y=a.a+="attribute vec3 txtCubeAttr;\n"
y+="varying vec3 txtCube;\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 getTxtCube()\n"
a.a=y
y+="{\n"
a.a=y
if(z){z=y+"   return (txtCubeMat*vec4(txtCubeAttr, 1.0)).xyz;\n"
a.a=z}else{z=y+"   return vec4(txtCubeAttr, 1.0).xyz;\n"
a.a=z}z+="}\n"
a.a=z
a.a=z+"\n"},
hA:function(a){var z
if(!this.k3)return
z=a.a+="varying vec3 objPos;\n"
z+="\n"
a.a=z
z+="vec3 getObjPos()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return (objMat*vec4("+(this.x1?"bendPos":"posAttr")+", 1.0)).xyz;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hL:function(a){var z
if(!this.k4)return
z=a.a+="varying vec3 viewPos;\n"
z+="\n"
a.a=z
z+="vec3 getViewPos()\n"
a.a=z
z+="{\n"
a.a=z
z+="   return (viewObjMat*vec4("+(this.x1?"bendPos":"posAttr")+", 1.0)).xyz;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
aB:function(a,b,c){var z
if(b===C.b)return
z=a.a+="uniform vec3 "+c+"Clr;\n"
if(b===C.f)return
if(0>=c.length)return H.j(c,0)
z+="uniform int null"+(c[0].toUpperCase()+C.i.cY(c,1))+"Txt;\n"
a.a=z
if(b===C.c)a.a=z+("uniform sampler2D "+c+"Txt;\n")
else if(b===C.d)a.a=z+("uniform samplerCube "+c+"Txt;\n")},
hv:function(a){var z,y
z=this.a
if(z===C.b)return
y=a.a+="// === Emission ===\n"
a.a=y+"\n"
this.aB(a,z,"emission")
y=a.a+="\n"
y+="vec3 emission()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   return emissionClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullEmissionTxt > 0) return emissionClr;\n"
a.a=z
z+="   return emissionClr*texture2D(emissionTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullEmissionTxt > 0) return emissionClr;\n"
a.a=z
z+="   return emissionClr*textureCube(emissionTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
a.a=z+"\n"},
hq:function(a){var z,y
z=this.b
if(z===C.b)return
y=a.a+="// === Ambient ===\n"
a.a=y+"\n"
this.aB(a,z,"ambient")
y=a.a+="\n"
y+="vec3 ambient()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   return ambientClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullAmbientTxt > 0) return ambientClr;\n"
a.a=z
z+="   return ambientClr*texture2D(ambientTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullAmbientTxt > 0) return ambientClr;\n"
a.a=z
z+="   return ambientClr*textureCube(ambientTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
a.a=z+"\n"},
ht:function(a){var z,y
z=this.c
if(z===C.b)return
y=a.a+="// === Diffuse ===\n"
a.a=y+"\n"
this.aB(a,z,"diffuse")
y=a.a+="vec3 diffuseColor;\n"
y+="\n"
a.a=y
y+="void setDiffuseColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   diffuseColor = diffuseClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullDiffuseTxt > 0) diffuseColor = diffuseClr;\n"
a.a=z
z+="   else diffuseColor = diffuseClr*texture2D(diffuseTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullDiffuseTxt > 0) diffuseColor = diffuseClr;\n"
a.a=z
z+="   else diffuseColor = diffuseClr*textureCube(diffuseTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 diffuse(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   float scalar = dot(norm, -litVec);\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return diffuseColor*scalar;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hw:function(a){var z,y
z=this.d
if(z===C.b)return
y=a.a+="// === Inverse Diffuse ===\n"
a.a=y+"\n"
this.aB(a,z,"invDiffuse")
y=a.a+="vec3 invDiffuseColor;\n"
y+="\n"
a.a=y
y+="void setInvDiffuseColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   invDiffuseColor = invDiffuseClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullInvDiffuseTxt > 0) invDiffuseColor = invDiffuseClr;\n"
a.a=z
z+="   else invDiffuseColor = invDiffuseClr*texture2D(invDiffuseTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullInvDiffuseTxt > 0) invDiffuseColor = invDiffuseClr;\n"
a.a=z
z+="   else invDiffuseColor = invDiffuseClr*textureCube(invDiffuseTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 invDiffuse(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   float scalar = 1.0 - clamp(dot(norm, -litVec), 0.0, 1.0);\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return invDiffuseColor*scalar;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hE:function(a){var z,y
z=this.e
if(z===C.b)return
y=a.a+="// === Specular ===\n"
a.a=y+"\n"
this.aB(a,z,"specular")
y=a.a+="uniform float shininess;\n"
y+="vec3 specularColor;\n"
a.a=y
y+="\n"
a.a=y
y+="void setSpecularColor()\n"
a.a=y
y+="{\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   specularColor = specularClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullSpecularTxt > 0) specularColor = specularClr;\n"
a.a=z
z+="   else specularColor = specularClr*texture2D(specularTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullSpecularTxt > 0) specularColor = specularClr;\n"
a.a=z
z+="   else specularColor = specularClr*textureCube(specularTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="}\n"
a.a=z
z+="\n"
a.a=z
z+="vec3 specular(vec3 norm, vec3 litVec)\n"
a.a=z
z+="{\n"
a.a=z
z+="   if(dot(norm, -litVec) < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 lightRef = normalize(reflect(litVec, norm));\n"
a.a=z
z+="   float scalar = dot(lightRef, -normalize(viewPos));\n"
a.a=z
z+="   if(scalar < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   return specularColor*pow(scalar, shininess);\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hz:function(a){var z,y
if(!this.r1)return
z=a.a+="// === Normal ===\n"
z+="\n"
a.a=z
y=this.f
switch(y){case C.b:break
case C.f:break
case C.c:z+="uniform sampler2D bumpTxt;\n"
a.a=z
z+="uniform int nullBumpTxt;\n"
a.a=z
z+="\n"
a.a=z
break
case C.d:z+="uniform samplerCube bumpTxt;\n"
a.a=z
z+="uniform int nullBumpTxt;\n"
a.a=z
z+="\n"
a.a=z
break}z+="vec3 normal()\n"
a.a=z
z+="{\n"
a.a=z
switch(y){case C.b:z+="   return normalize(normalVec);\n"
a.a=z
break
case C.f:z+="   return normalize(normalVec);\n"
a.a=z
break
case C.c:z+="   if(nullBumpTxt > 0) return normalVec;\n"
a.a=z
z+="   vec3 color = texture2D(bumpTxt, txt2D).rgb;\n"
a.a=z
z+="   vec3 n = normalize(normalVec);\n"
a.a=z
z+="   vec3 b = normalize(binormalVec);\n"
a.a=z
z+="   vec3 c = normalize(cross(b, n));\n"
a.a=z
z+="   b = cross(n, c);\n"
a.a=z
z+="   mat3 mat = mat3( b.x,  b.y,  b.z,\n"
a.a=z
z+="                   -c.x, -c.y, -c.z,\n"
a.a=z
z+="                    n.x,  n.y,  n.z);\n"
a.a=z
z+="   return mat * normalize(2.0*color - 1.0);\n"
a.a=z
break
case C.d:z+="   if(nullBumpTxt > 0) return normalVec;\n"
a.a=z
z+="   vec3 color = textureCube(bumpTxt, txtCube).rgb;\n"
a.a=z
z+="   vec3 n = normalize(normalVec);\n"
a.a=z
z+="   vec3 b = normalize(binormalVec);\n"
a.a=z
z+="   vec3 c = cross(b, n);\n"
a.a=z
z+="   b = cross(n, c);\n"
a.a=z
z+="   mat3 mat = mat3( b.x,  b.y,  b.z,\n"
a.a=z
z+="                   -c.x, -c.y, -c.z,\n"
a.a=z
z+="                    n.x,  n.y,  n.z);\n"
a.a=z
z+="   return mat * normalize(2.0*color - 1.0);\n"
a.a=z
break}z+="}\n"
a.a=z
a.a=z+"\n"},
hC:function(a){var z,y
z=this.r
if(z===C.b)return
y=a.a+="// === Reflection ===\n"
a.a=y+"\n"
this.aB(a,z,"reflect")
y=a.a+="\n"
y+="vec3 reflect(vec3 refl)\n"
a.a=y
y+="{\n"
a.a=y
y+="   if(nullEnvTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   vec3 scalar = reflectClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullReflectTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = reflectClr*texture2D(reflectTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullReflectTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = reflectClr*textureCube(reflectTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="   vec3 invRefl = vec3(invViewMat*vec4(refl, 0.0));\n"
a.a=z
z+="   return scalar*textureCube(envSampler, invRefl).rgb;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hD:function(a){var z,y
z=this.x
if(z===C.b)return
y=a.a+="// === Refraction ===\n"
a.a=y+"\n"
this.aB(a,z,"refract")
y=a.a+="uniform float refraction;\n"
y+="\n"
a.a=y
y+="vec3 refract(vec3 refl)\n"
a.a=y
y+="{\n"
a.a=y
y+="   if(nullEnvTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
switch(z){case C.b:z=y
break
case C.f:z=y+"   vec3 scalar = refractClr;\n"
a.a=z
break
case C.c:z=y+"   if(nullRefractTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = refractClr*texture2D(refractTxt, txt2D).rgb;\n"
a.a=z
break
case C.d:z=y+"   if(nullRefractTxt > 0) return vec3(0.0, 0.0, 0.0);\n"
a.a=z
z+="   vec3 scalar = refractClr*textureCube(refractTxt, txtCube).rgb;\n"
a.a=z
break
default:z=y}z+="   vec3 refr = mix(-refl, viewPos, refraction);\n"
a.a=z
z+="   vec3 invRefr = vec3(invViewMat*vec4(refr, 0.0));\n"
a.a=z
z+="   return scalar*textureCube(envSampler, invRefr).rgb;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hu:function(a){var z,y
z=this.z
if(z<=0)return
y=a.a+="// === Directional Light ===\n"
y+="\n"
a.a=y
y+="struct DirLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 viewDir;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int dirLightCount;\n"
y=a.a+="uniform DirLight dirLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 allDirLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= dirLightCount) break;\n"
a.a=z
z+="      DirLight lit = dirLights[i];\n"
a.a=z
z+="      lightAccum += lightValue(norm, lit.color, lit.viewDir);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hB:function(a){var z,y
z=this.Q
if(z<=0)return
y=a.a+="// === Point Light ===\n"
y+="\n"
a.a=y
y+="struct PointLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 point;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int pntLightCount;\n"
y=a.a+="uniform PointLight pntLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 pointLightValue(vec3 norm, PointLight lit)\n"
a.a=y
y+="{\n"
a.a=y
y+="   float dist = length(objPos - lit.point);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   return lightValue(norm, lit.color*attenuation, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allPointLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= pntLightCount) break;\n"
a.a=z
z+="      lightAccum += pointLightValue(norm, pntLights[i]);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hF:function(a){var z,y
z=this.ch
if(z<=0)return
y=a.a+="// === Spot Light ===\n"
y+="\n"
a.a=y
y+="struct SpotLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objPnt;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float cutoff;\n"
a.a=y
y+="   float coneAngle;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int spotLightCount;\n"
y=a.a+="uniform SpotLight spotLights["+z+"];\n"
y+="\n"
a.a=y
y+="vec3 spotLightValue(vec3 norm, SpotLight lit)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 dir = objPos - lit.objPnt;\n"
a.a=y
y+="   float dist = length(dir);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   float angle = acos(dot(normalize(dir), lit.objDir));\n"
a.a=y
y+="   float scale = (lit.cutoff-angle)/(lit.cutoff-lit.coneAngle);\n"
a.a=y
y+="   if(scale <= 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   if(scale > 1.0) scale = 1.0;\n"
a.a=y
y+="   return lightValue(norm, lit.color*attenuation*scale, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allSpotLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
a.a=y+"   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
z=a.a+="   for(int i = 0; i < "+z+"; ++i)\n"
z+="   {\n"
a.a=z
z+="      if(i >= spotLightCount) break;\n"
a.a=z
z+="      lightAccum += spotLightValue(norm, spotLights[i]);\n"
a.a=z
z+="   }\n"
a.a=z
z+="   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hI:function(a){var z,y,x
z=this.cx
if(z<=0)return
y=a.a+="// === Texture Directional Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedDirLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objUp;\n"
a.a=y
y+="   vec3 objRight;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 viewDir;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtDirLightCount;\n"
y=a.a+="uniform TexturedDirLight txtDirLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform sampler2D txtDirLightsTxt2D"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtDirLightValue(vec3 norm, TexturedDirLight lit, sampler2D txt2D)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      vec3 offset = objPos + lit.objDir*dot(objPos, lit.objDir);\n"
a.a=y
y+="      float tu = dot(offset, lit.objUp);\n"
a.a=y
y+="      float tv = dot(offset, lit.objRight);\n"
a.a=y
y+="      color = lit.color*texture2D(txt2D, vec2(tu, tv)).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, color, lit.viewDir);\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtDirLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtDirLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtDirLightValue(norm, txtDirLights["+x+"], txtDirLightsTxt2D"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hJ:function(a){var z,y,x
z=this.cy
if(z<=0)return
y=a.a+="// === Texture Point Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedPointLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 point;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   mat3 invViewRotMat;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtPntLightCount;\n"
y=a.a+="uniform TexturedPointLight txtPntLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform samplerCube txtPntLightsTxtCube"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtPointLightValue(vec3 norm, TexturedPointLight lit, samplerCube txtCube)\n"
a.a=y
y+="{\n"
a.a=y
y+="   float dist = length(objPos - lit.point);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   vec3 normDir = normalize(viewPos - lit.viewPnt);\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      vec3 invNormDir = lit.invViewRotMat*normDir;\n"
a.a=y
y+="      color = lit.color*textureCube(txtCube, invNormDir).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, attenuation*color, normDir);\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtPointLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtPntLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtPointLightValue(norm, txtPntLights["+x+"], txtPntLightsTxtCube"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hK:function(a){var z,y,x
z=this.db
if(z<=0)return
y=a.a+="// === Texture Spot Light ===\n"
y+="\n"
a.a=y
y+="struct TexturedSpotLight\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 objPnt;\n"
a.a=y
y+="   vec3 objDir;\n"
a.a=y
y+="   vec3 objUp;\n"
a.a=y
y+="   vec3 objRight;\n"
a.a=y
y+="   vec3 viewPnt;\n"
a.a=y
y+="   int nullTxt;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   float tuScalar;\n"
a.a=y
y+="   float tvScalar;\n"
a.a=y
y+="   float att0;\n"
a.a=y
y+="   float att1;\n"
a.a=y
y+="   float att2;\n"
a.a=y
y+="};\n"
a.a=y
y+="\n"
a.a=y
a.a=y+"uniform int txtSpotLightCount;\n"
y=a.a+="uniform TexturedSpotLight txtSpotLights["+z+"];\n"
for(x=0;x<z;++x)y=a.a+="uniform sampler2D txtSpotLightsTxt2D"+x+";\n"
y+="\n"
a.a=y
y+="vec3 txtSpotLightValue(vec3 norm, TexturedSpotLight lit, sampler2D txt2D)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 dir = objPos - lit.objPnt;\n"
a.a=y
y+="   float dist = length(dir);\n"
a.a=y
y+="   float attenuation = 1.0/(lit.att0 + (lit.att1 + lit.att2*dist)*dist);\n"
a.a=y
y+="   if(attenuation <= 0.005) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   vec3 normDir = normalize(dir);\n"
a.a=y
y+="   float zScale = dot(normDir, lit.objDir);\n"
a.a=y
y+="   if(zScale < 0.0) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="   normDir = normDir/zScale;\n"
a.a=y
y+="   vec3 color;\n"
a.a=y
y+="   if(lit.nullTxt > 0) color = lit.color;\n"
a.a=y
y+="   else\n"
a.a=y
y+="   {\n"
a.a=y
y+="      float tu = dot(normDir, lit.objUp)*lit.tuScalar+0.5;\n"
a.a=y
y+="      if((tu > 1.0) || (tu < 0.0)) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="      float tv = dot(normDir, lit.objRight)*lit.tvScalar+0.5;\n"
a.a=y
y+="      if((tv > 1.0) || (tv < 0.0)) return vec3(0.0, 0.0, 0.0);\n"
a.a=y
y+="      color = lit.color*texture2D(txt2D, vec2(tu, tv)).xyz;\n"
a.a=y
y+="   }\n"
a.a=y
y+="   return lightValue(norm, color*attenuation, normalize(viewPos - lit.viewPnt));\n"
a.a=y
y+="}\n"
a.a=y
y+="\n"
a.a=y
y+="vec3 allTxtSpotLightValues(vec3 norm)\n"
a.a=y
y+="{\n"
a.a=y
y+="   vec3 lightAccum = vec3(0.0, 0.0, 0.0);\n"
a.a=y
for(x=0;x<z;++x){a.a+="   if(txtSpotLightCount <= "+x+") return lightAccum;\n"
y=a.a+="   lightAccum += txtSpotLightValue(norm, txtSpotLights["+x+"], txtSpotLightsTxt2D"+x+");\n"}z=y+"   return lightAccum;\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
hx:function(a){var z
if(this.dx>0)return
z=a.a+="// === No Lights ===\n"
z+="\n"
a.a=z
z+="vec3 nonLightValues(vec3 norm)\n"
a.a=z
z+="{\n"
a.a=z
z+="   return lightValue(norm, vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 1.0));\n"
a.a=z
z+="}\n"
a.a=z
a.a=z+"\n"},
i:function(a){return this.aI}},fo:{"^":"b;a,b,c"},fr:{"^":"b;a,b,c,d,e,f,r,x"},fp:{"^":"b;a,b,c,d,e,f,r"},fs:{"^":"b;a,b,c,d,e,f,r,x,y,z"},fq:{"^":"b;a,b,c,d,e,f,r,x,y,z"},ft:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},f_:{"^":"d2;",
eD:function(a,b){this.c=null
this.d=null
this.e=null
this.f=null
this.r=null},
dj:function(a,b){var z,y,x
z=this.a
y=z.createShader(b)
z.shaderSource(y,a)
z.compileShader(y)
if(!H.fZ(z.getShaderParameter(y,35713))){x=z.getShaderInfoLog(y)
z.deleteShader(y)
throw H.d(P.u("Error compiling shader '"+H.l(y)+"': "+H.l(x)))}return y},
ha:function(){var z,y,x,w,v,u
z=H.a([],[A.e2])
y=this.a
x=H.z(y.getProgramParameter(this.e,35721))
if(typeof x!=="number")return H.e(x)
w=0
for(;w<x;++w){v=y.getActiveAttrib(this.e,w)
u=y.getAttribLocation(this.e,v.name)
C.a.h(z,new A.e2(y,v.name,u))}this.f=new A.hl(z)},
hc:function(){var z,y,x,w,v,u
z=H.a([],[A.ag])
y=this.a
x=H.z(y.getProgramParameter(this.e,35718))
if(typeof x!=="number")return H.e(x)
w=0
for(;w<x;++w){v=y.getActiveUniform(this.e,w)
u=y.getUniformLocation(this.e,v.name)
C.a.h(z,this.hW(v.type,v.size,v.name,u))}this.r=new A.jQ(z)},
aT:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.O(z,y,b,c)
else return A.dI(z,y,b,a,c)},
fb:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.ar(z,y,b,c)
else return A.dI(z,y,b,a,c)},
fc:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.as(z,y,b,c)
else return A.dI(z,y,b,a,c)},
bz:function(a,b){return new P.fA(a+" uniform variables are unsupported by all browsers.\n"+("Please change the type of "+H.l(b)+"."))},
hW:function(a,b,c,d){switch(a){case 5120:return this.aT(b,c,d)
case 5121:return this.aT(b,c,d)
case 5122:return this.aT(b,c,d)
case 5123:return this.aT(b,c,d)
case 5124:return this.aT(b,c,d)
case 5125:return this.aT(b,c,d)
case 5126:return new A.Y(this.a,this.e,c,d)
case 35664:return new A.jL(this.a,this.e,c,d)
case 35665:return new A.N(this.a,this.e,c,d)
case 35666:return new A.jO(this.a,this.e,c,d)
case 35667:return new A.jM(this.a,this.e,c,d)
case 35668:return new A.jN(this.a,this.e,c,d)
case 35669:return new A.jP(this.a,this.e,c,d)
case 35674:return new A.jS(this.a,this.e,c,d)
case 35675:return new A.dJ(this.a,this.e,c,d)
case 35676:return new A.aP(this.a,this.e,c,d)
case 35678:return this.fb(b,c,d)
case 35680:return this.fc(b,c,d)
case 35670:throw H.d(this.bz("BOOL",c))
case 35671:throw H.d(this.bz("BOOL_VEC2",c))
case 35672:throw H.d(this.bz("BOOL_VEC3",c))
case 35673:throw H.d(this.bz("BOOL_VEC4",c))
default:throw H.d(P.u("Unknown uniform variable type "+H.l(a)+" for "+H.l(c)+"."))}}},cB:{"^":"b;a,b",
i:function(a){return this.b}},ag:{"^":"b;"},jQ:{"^":"b;a",
k:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(w.c===b)return w}return},
p:function(a,b){var z=this.k(0,b)
if(z==null)throw H.d(P.u("Required uniform value, "+b+", was not defined or used in shader."))
return z},
i:function(a){return this.O()},
i3:function(a){var z,y,x,w
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.C)(z),++w)x+=z[w].i(0)+a
return x},
O:function(){return this.i3("\n")}},O:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform1i: "+H.l(this.c)}},jM:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform2i: "+H.l(this.c)}},jN:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform3i: "+H.l(this.c)}},jP:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform4i: "+H.l(this.c)}},jK:{"^":"ag;0e,0f,a,b,c,d",
i:function(a){return"Uniform1iv: "+H.l(this.c)},
q:{
dI:function(a,b,c,d,e){var z=new A.jK(a,b,c,e)
z.f=d
z.e=P.ie(d,0,!1,P.x)
return z}}},Y:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform1f: "+H.l(this.c)}},jL:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform2f: "+H.l(this.c)}},N:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform3f: "+H.l(this.c)}},jO:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform4f: "+H.l(this.c)}},jS:{"^":"ag;a,b,c,d",
i:function(a){return"Uniform1Mat2 "+H.l(this.c)}},dJ:{"^":"ag;a,b,c,d",
ap:function(a){var z=new Float32Array(H.c0(H.p(a,"$isc",[P.y],"$asc")))
this.a.uniformMatrix3fv(this.d,!1,z)},
i:function(a){return"UniformMat3: "+H.l(this.c)}},aP:{"^":"ag;a,b,c,d",
ap:function(a){var z=new Float32Array(H.c0(H.p(a,"$isc",[P.y],"$asc")))
this.a.uniformMatrix4fv(this.d,!1,z)},
i:function(a){return"UniformMat4: "+H.l(this.c)}},ar:{"^":"ag;a,b,c,d",
eq:function(a){var z,y,x
z=a==null||!a.ga9(a)
y=this.a
x=this.d
if(z)y.uniform1i(x,0)
else y.uniform1i(x,a.ga8(a))},
i:function(a){return"UniformSampler2D: "+H.l(this.c)}},as:{"^":"ag;a,b,c,d",
i:function(a){return"UniformSamplerCube: "+H.l(this.c)}}}],["","",,F,{"^":"",aw:{"^":"b;0a,0b,0c,0d,0e",
gi_:function(){return this.a==null||this.b==null||this.c==null},
f5:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.r
z=this.b
x=z==null?null:z.r
z=this.c
w=z==null?null:z.r
v=new V.H(0,0,0)
if(y!=null)v=v.n(0,y)
if(x!=null)v=v.n(0,x)
if(w!=null)v=v.n(0,w)
if(v.e6())return
return v.w(0,Math.sqrt(v.D(v)))},
f8:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.f
z=this.b
x=z==null?null:z.f
z=this.c
w=z==null?null:z.f
if(y==null||x==null||w==null)return
z=x.v(0,y)
z=new V.H(z.a,z.b,z.c)
v=z.w(0,Math.sqrt(z.D(z)))
z=w.v(0,y)
z=new V.H(z.a,z.b,z.c)
z=v.bd(z.w(0,Math.sqrt(z.D(z))))
return z.w(0,Math.sqrt(z.D(z)))},
ct:function(){if(this.d!=null)return!0
var z=this.f5()
if(z==null){z=this.f8()
if(z==null)return!1}this.d=z
this.a.a.a6()
return!0},
f4:function(){var z,y,x,w,v
z=this.a
y=z==null?null:z.x
z=this.b
x=z==null?null:z.x
z=this.c
w=z==null?null:z.x
v=new V.H(0,0,0)
if(y!=null)v=v.n(0,y)
if(x!=null)v=v.n(0,x)
if(w!=null)v=v.n(0,w)
if(v.e6())return
return v.w(0,Math.sqrt(v.D(v)))},
f7:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a
y=z==null
x=y?null:z.f
w=this.b
v=w==null
u=v?null:w.f
t=this.c
s=t==null
r=s?null:t.f
if(x==null||u==null||r==null)return
q=y?null:z.y
p=v?null:w.y
o=s?null:t.y
if(q==null||p==null||o==null)return
z=p.b
y=o.b
if(typeof z!=="number")return z.v()
if(typeof y!=="number")return H.e(y)
n=z-y
if($.m.$2(n,0)){z=r.v(0,u)
z=new V.H(z.a,z.b,z.c)
m=z.w(0,Math.sqrt(z.D(z)))
z=o.a
p=p.a
if(typeof z!=="number")return z.v()
if(typeof p!=="number")return H.e(p)
if(z-p<0)m=m.K(0)}else{y=q.b
if(typeof y!=="number")return H.e(y)
l=(z-y)/n
y=r.v(0,u).j(0,l).n(0,u).v(0,x)
y=new V.H(y.a,y.b,y.c)
m=y.w(0,Math.sqrt(y.D(y)))
o=o.a
p=p.a
if(typeof o!=="number")return o.v()
if(typeof p!=="number")return H.e(p)
q=q.a
if(typeof q!=="number")return H.e(q)
if((o-p)*l+p-q<0)m=m.K(0)}z=this.d
if(z!=null){k=z.w(0,Math.sqrt(z.D(z)))
z=k.bd(m)
z=z.w(0,Math.sqrt(z.D(z))).bd(k)
m=z.w(0,Math.sqrt(z.D(z)))}return m},
cs:function(){if(this.e!=null)return!0
var z=this.f4()
if(z==null){z=this.f7()
if(z==null)return!1}this.e=z
this.a.a.a6()
return!0},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.O()},
F:function(a){var z,y
if(this.gi_())return a+"disposed"
z=a+C.i.aL(J.au(this.a.e),0)+", "+C.i.aL(J.au(this.b.e),0)+", "+C.i.aL(J.au(this.c.e),0)+" {"
y=this.d
z=y!=null?z+(y.i(0)+", "):z+"-, "
y=this.e
return y!=null?z+(y.i(0)+"}"):z+"-}"},
O:function(){return this.F("")}},ez:{"^":"b;"},eR:{"^":"b;"},eW:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q",
gt:function(){var z=this.Q
if(z==null){z=D.K()
this.Q=z}return z},
bc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
H.p(a,"$isc",[F.bW],"$asc")
z=a.length
y=new Array(z*this.c)
y.fixed$length=Array
x=H.a(y,[P.y])
for(y=this.a,w=0,v=0;v<this.b;++v){u=y.cl(v)
for(t=0;t<z;++t){if(t>=a.length)return H.j(a,t)
s=a[t].e7(u)
r=w+t*this.c
for(q=0;q<s.length;++q){C.a.m(x,r,s[q]);++r}}w+=u.gb6(u)}p=$.$get$a0()
if((y.a&p.a)!==0){y=this.z
if(y==null){if(0>=a.length)return H.j(a,0)
y=a[0].f
y=V.eY(y.a,y.b,y.c,0,0,0)
this.z=y}for(v=z-1;v>=0;--v){if(v>=a.length)return H.j(a,v)
p=a[v].f
o=p.a
n=p.b
p=p.c
m=y.d
l=y.a
if(typeof o!=="number")return o.U()
if(typeof l!=="number")return H.e(l)
if(o<l){m+=l-o
k=o}else{if(o>l+m)m=o-l
k=l}j=y.e
o=y.b
if(typeof n!=="number")return n.U()
if(typeof o!=="number")return H.e(o)
if(n<o){j+=o-n
i=n}else{if(n>o+j)j=n-o
i=o}h=y.f
y=y.c
if(typeof p!=="number")return p.U()
if(typeof y!=="number")return H.e(y)
if(p<y){h+=y-p
g=p}else{if(p>y+h)h=p-y
g=y}y=new V.dx(k,i,g,m,j,h)
this.z=y}}r=this.d
this.d=r+z
C.a.aE(this.f,x)
this.a6()
return r},
bb:function(a){var z,y,x,w,v,u,t
z=P.x
H.p(a,"$isc",[z],"$asc")
y=a.length
if(y>=3){x=new Array((y-2)*3)
x.fixed$length=Array
w=H.a(x,[z])
if(0>=a.length)return H.j(a,0)
v=a[0]
for(u=2,t=0;u<y;++u,t+=3){C.a.m(w,t,v)
z=u-1
if(z>=a.length)return H.j(a,z)
C.a.m(w,t+1,a[z])
if(u>=a.length)return H.j(a,u)
C.a.m(w,t+2,a[u])}C.a.aE(this.y,w)
this.a6()}},
hP:function(a){var z,y,x,w,v,u,t,s,r,q
z=P.x
H.p(a,"$isc",[z],"$asc")
y=a.length
if(y>=3){x=new Array((y-2)*3)
x.fixed$length=Array
w=H.a(x,[z])
for(v=!1,u=2,t=0;u<y;++u,t+=3){z=a.length
x=u-2
s=t+1
r=t+2
q=u-1
if(v){if(x>=z)return H.j(a,x)
C.a.m(w,t,a[x])
if(q>=a.length)return H.j(a,q)
C.a.m(w,s,a[q])
if(u>=a.length)return H.j(a,u)
C.a.m(w,r,a[u])
v=!1}else{if(q>=z)return H.j(a,q)
C.a.m(w,t,a[q])
if(x>=a.length)return H.j(a,x)
C.a.m(w,s,a[x])
if(u>=a.length)return H.j(a,u)
C.a.m(w,r,a[u])
v=!0}}C.a.aE(this.y,w)
this.a6()}},
a2:function(a){var z=this.Q
if(!(z==null))z.A(a)},
a6:function(){return this.a2(null)},
aG:function(){return!1},
aY:function(){return!1},
bD:function(){return!1},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.a
if(!J.W(b,z))throw H.d(P.u("Shape was reduced to "+H.l(z)+" so can not build for "+H.l(b)+"."))
if(this.e==null){y=this.c*4
x=new Array(this.b)
x.fixed$length=Array
this.e=H.a(x,[Z.cA])
for(w=0,v=0;v<this.b;++v){u=z.cl(v)
t=u.gb6(u)
x=this.e;(x&&C.a).m(x,v,new Z.cA(u,t,w*4,y,0))
w+=t}}x=a.a
s=new Z.d5(Z.fy(x,34962,H.p(this.f,"$isc",[P.y],"$asc")),this.e,z)
z=H.a([],[Z.bL])
s.b=z
r=this.r
if(r.length!==0){q=Z.cQ(x,34963,H.p(r,"$isc",[P.x],"$asc"))
C.a.h(z,new Z.bL(0,this.r.length,q))}r=this.x
if(r.length!==0){q=Z.cQ(x,34963,H.p(r,"$isc",[P.x],"$asc"))
C.a.h(z,new Z.bL(1,this.x.length,q))}r=this.y
if(r.length!==0){q=Z.cQ(x,34963,H.p(r,"$isc",[P.x],"$asc"))
C.a.h(z,new Z.bL(4,this.y.length,q))}return s},
$isdz:1},f0:{"^":"b;0a,0b,0c,0d,0e",
gt:function(){var z=this.e
if(z==null){z=D.K()
this.e=z}return z},
aG:function(){var z,y
z=this.e
if(!(z==null))++z.c
y=this.d.aG()||!1
if(!this.a.aG())y=!1
z=this.e
if(!(z==null))z.ay(0)
return y},
aY:function(){var z,y
z=this.e
if(!(z==null))++z.c
y=this.d.aY()||!1
if(!this.a.aY())y=!1
z=this.e
if(!(z==null))z.ay(0)
return y},
bD:function(){var z=this.e
if(!(z==null))++z.c
this.a.bD()
z=this.e
if(!(z==null))z.ay(0)
return!0},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a.c.length
y=b.gdI(b)
x=b.gb6(b)
w=x*4
v=new Array(z*x)
v.fixed$length=Array
u=P.y
t=H.a(v,[u])
v=new Array(y)
v.fixed$length=Array
s=H.a(v,[Z.cA])
for(r=0,q=0;q<y;++q){p=b.cl(q)
o=p.gb6(p)
C.a.m(s,q,new Z.cA(p,o,r*4,w,0))
for(n=0;n<z;++n){v=this.a.c
if(n>=v.length)return H.j(v,n)
m=v[n].e7(p)
l=r+n*x
for(k=0;k<m.length;++k){C.a.m(t,l,m[k]);++l}}r+=o}v=a.a
j=new Z.d5(Z.fy(v,34962,H.p(t,"$isc",[u],"$asc")),s,b)
j.b=H.a([],[Z.bL])
this.b.b
this.c.b
if(this.d.b.length!==0){u=P.x
i=H.a([],[u])
for(q=0;h=this.d.b,q<h.length;++q){h=h[q].a
h.a.a.bA()
C.a.h(i,h.e)
h=this.d.b
if(q>=h.length)return H.j(h,q)
h=h[q].b
h.a.a.bA()
C.a.h(i,h.e)
h=this.d.b
if(q>=h.length)return H.j(h,q)
h=h[q].c
h.a.a.bA()
C.a.h(i,h.e)}g=Z.cQ(v,34963,H.p(i,"$isc",[u],"$asc"))
C.a.h(j.b,new Z.bL(4,i.length,g))}return j},
i:function(a){var z=H.a([],[P.o])
if(this.a.c.length!==0){C.a.h(z,"Vertices:")
C.a.h(z,this.a.F("   "))}this.b.b
this.c.b
if(this.d.b.length!==0){C.a.h(z,"Faces:")
C.a.h(z,this.d.F("   "))}return C.a.B(z,"\n")},
a2:function(a){var z=this.e
if(!(z==null))z.A(a)},
a6:function(){return this.a2(null)},
$isdz:1},dz:{"^":"d8;"},jb:{"^":"b;a,0b",
hM:function(a){var z,y,x,w,v,u,t,s
H.p(a,"$isc",[F.bW],"$asc")
z=H.a([],[F.aw])
y=a[0]
for(x=2;x<4;++x){w=a[x-1]
v=a[x]
this.a.a.h(0,y)
this.a.a.h(0,w)
this.a.a.h(0,v)
u=new F.aw()
t=y.a
if(t==null)H.t(P.u("May not create a face with a first vertex which is not attached to a shape."))
s=w.a
if(t==null?s==null:t===s){s=v.a
s=t==null?s!=null:t!==s
t=s}else t=!0
if(t)H.t(P.u("May not create a face with vertices attached to different shapes."))
u.a=y
C.a.h(y.d.b,u)
u.b=w
C.a.h(w.d.c,u)
u.c=v
C.a.h(v.d.d,u)
C.a.h(u.a.a.d.b,u)
w=u.a.a.e
if(!(w==null))w.A(null)
C.a.h(z,u)}return z},
gl:function(a){return this.b.length},
aG:function(){var z,y,x,w
for(z=this.b,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.C)(z),++w)if(!z[w].ct())x=!1
return x},
aY:function(){var z,y,x,w
for(z=this.b,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.C)(z),++w)if(!z[w].cs())x=!1
return x},
i:function(a){return this.O()},
F:function(a){var z,y,x,w
z=H.a([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w)C.a.h(z,y[w].F(a))
return C.a.B(z,"\n")},
O:function(){return this.F("")}},jc:{"^":"b;a,0b",
gl:function(a){return 0},
i:function(a){return this.O()},
F:function(a){var z,y,x
z=H.a([],[P.o])
for(y=0;!1;++y){x=this.b
if(y>=0)return H.j(x,y)
C.a.h(z,x[y].F(a+(""+y+". ")))}return C.a.B(z,"\n")},
O:function(){return this.F("")}},jd:{"^":"b;a,0b",
gl:function(a){return 0},
i:function(a){return this.O()},
F:function(a){var z,y,x
z=H.a([],[P.o])
for(y=this.b,x=0;!1;++x){if(x>=0)return H.j(y,x)
C.a.h(z,y[x].F(a))}return C.a.B(z,"\n")},
O:function(){return this.F("")}},bW:{"^":"b;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx",
e7:function(a){var z,y
z=J.P(a)
if(z.u(a,$.$get$a0())){z=this.f
y=[P.y]
if(z==null)return H.a([0,0,0],y)
else return H.a([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$ae())){z=this.r
y=[P.y]
if(z==null)return H.a([0,1,0],y)
else return H.a([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$aR())){z=this.x
y=[P.y]
if(z==null)return H.a([0,0,1],y)
else return H.a([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$a3())){z=this.y
y=[P.y]
if(z==null)return H.a([0,0],y)
else return H.a([z.a,z.b],y)}else if(z.u(a,$.$get$aS())){z=this.z
y=[P.y]
if(z==null)return H.a([0,0,0],y)
else return H.a([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$bX())){z=this.Q
y=[P.y]
if(z==null)return H.a([1,1,1],y)
else return H.a([z.a,z.b,z.c],y)}else if(z.u(a,$.$get$bY())){z=this.Q
y=[P.y]
if(z==null)return H.a([1,1,1,1],y)
else return H.a([z.a,z.b,z.c,z.d],y)}else if(z.u(a,$.$get$br()))return H.a([this.ch],[P.y])
else if(z.u(a,$.$get$aQ())){z=this.cx
y=[P.y]
if(z==null)return H.a([-1,-1,-1,-1],y)
else return H.a([z.a,z.b,z.c,z.d],y)}else return H.a([],[P.y])},
ct:function(){var z,y
z={}
if(this.r!=null)return!0
y=this.a
if(y!=null){y=y.e
if(!(y==null))++y.c}z.a=new V.H(0,0,0)
this.d.N(0,new F.k8(z))
z=z.a
this.r=z.w(0,Math.sqrt(z.D(z)))
z=this.a
if(z!=null){z.a6()
z=this.a.e
if(!(z==null))z.ay(0)}return!0},
cs:function(){var z,y
z={}
if(this.x!=null)return!0
y=this.a
if(y!=null){y=y.e
if(!(y==null))++y.c}z.a=new V.H(0,0,0)
this.d.N(0,new F.k7(z))
z=z.a
this.x=z.w(0,Math.sqrt(z.D(z)))
z=this.a
if(z!=null){z.a6()
z=this.a.e
if(!(z==null))z.ay(0)}return!0},
u:function(a,b){if(b==null)return!1
return this===b},
i:function(a){return this.O()},
F:function(a){var z,y,x
z=H.a([],[P.o])
C.a.h(z,C.i.aL(J.au(this.e),0))
y=this.f
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.r
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.x
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.y
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.z
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
y=this.Q
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
C.a.h(z,V.D(this.ch,3,0))
y=this.cx
if(y!=null)C.a.h(z,y.i(0))
else C.a.h(z,"-")
x=C.a.B(z,", ")
return a+"{"+x+"}"},
O:function(){return this.F("")},
q:{
bq:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=new F.bW()
y=new F.k6(z)
y.b=H.a([],[F.eR])
z.b=y
y=new F.k5(z)
x=[F.ez]
y.b=H.a([],x)
y.c=H.a([],x)
z.c=y
y=new F.k2(z)
x=[F.aw]
y.b=H.a([],x)
y.c=H.a([],x)
y.d=H.a([],x)
z.d=y
z.e=0
y=h.a
z.f=(y&$.$get$a0().a)!==0?d:null
z.r=(y&$.$get$ae().a)!==0?e:null
z.x=(y&$.$get$aR().a)!==0?b:null
z.y=(y&$.$get$a3().a)!==0?f:null
z.z=(y&$.$get$aS().a)!==0?g:null
z.Q=(y&$.$get$fv().a)!==0?c:null
z.ch=(y&$.$get$br().a)!==0?i:0
z.cx=(y&$.$get$aQ().a)!==0?a:null
return z}}},k8:{"^":"v:9;a",
$1:function(a){var z,y
H.i(a,"$isaw")
z=a==null?null:a.d
if(z!=null){y=this.a
y.a=y.a.n(0,z)}}},k7:{"^":"v:9;a",
$1:function(a){var z,y
H.i(a,"$isaw")
z=a==null?null:a.e
if(z!=null){y=this.a
y.a=y.a.n(0,z)}}},k1:{"^":"b;a,0b,0c",
bA:function(){var z,y,x,w
if(this.b){z=this.c
y=z.length
for(x=0,w=0;w<y;++w){if(w>=z.length)return H.j(z,w)
z[w].e=x;++x}this.b=!1}},
h:function(a,b){var z=b.a
if(z!=null){if(z===this.a)return!1
throw H.d(P.u("May not add a vertex already attached to another shape to this shape."))}z=this.c
b.e=z.length
b.a=this.a
C.a.h(z,b)
this.a.a6()
return!0},
hO:function(a,b,c,d,e,f,g,h,i){var z=F.bq(a,b,c,d,e,f,g,h,i)
this.h(0,z)
return z},
bB:function(a,b,c,d,e,f){return this.hO(a,null,b,c,null,d,e,f,0)},
gl:function(a){return this.c.length},
aG:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x)z[x].ct()
return!0},
aY:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x)z[x].cs()
return!0},
bD:function(){var z,y,x,w,v,u,t,s
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
if(w.z==null){v=w.r
u=v.a
if(typeof u!=="number")return u.j()
t=v.b
if(typeof t!=="number")return t.j()
s=v.c
if(typeof s!=="number")return s.j()
s=v.w(0,Math.sqrt(u*u+t*t+s*s))
if(!J.W(w.z,s)){w.z=s
v=w.a
if(v!=null){v=v.e
if(!(v==null))v.A(null)}}}}return!0},
i:function(a){return this.O()},
F:function(a){var z,y,x,w
this.bA()
z=H.a([],[P.o])
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w)C.a.h(z,y[w].F(a))
return C.a.B(z,"\n")},
O:function(){return this.F("")}},k2:{"^":"b;a,0b,0c,0d",
gl:function(a){return this.b.length+this.c.length+this.d.length},
N:function(a,b){H.f(b,{func:1,ret:-1,args:[F.aw]})
C.a.N(this.b,b)
C.a.N(this.c,new F.k3(this,b))
C.a.N(this.d,new F.k4(this,b))},
i:function(a){return this.O()},
F:function(a){var z,y,x,w
z=H.a([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w)C.a.h(z,y[w].F(a))
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w)C.a.h(z,y[w].F(a))
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.C)(y),++w)C.a.h(z,y[w].F(a))
return C.a.B(z,"\n")},
O:function(){return this.F("")}},k3:{"^":"v:9;a,b",
$1:function(a){H.i(a,"$isaw")
if(!J.W(a.a,this.a))this.b.$1(a)}},k4:{"^":"v:9;a,b",
$1:function(a){var z
H.i(a,"$isaw")
z=this.a
if(!J.W(a.a,z)&&!J.W(a.b,z))this.b.$1(a)}},k5:{"^":"b;a,0b,0c",
gl:function(a){return 0},
i:function(a){return this.O()},
F:function(a){var z,y,x
z=H.a([],[P.o])
for(y=this.b,x=0;!1;++x){if(x>=0)return H.j(y,x)
C.a.h(z,y[x].F(a))}for(y=this.c,x=0;!1;++x){if(x>=0)return H.j(y,x)
C.a.h(z,y[x].F(a))}return C.a.B(z,"\n")},
O:function(){return this.F("")}},k6:{"^":"b;a,0b",
gl:function(a){return 0},
i:function(a){return this.O()},
F:function(a){var z,y,x
z=H.a([],[P.o])
for(y=this.b,x=0;!1;++x){if(x>=0)return H.j(y,x)
C.a.h(z,y[x].F(a))}return C.a.B(z,"\n")},
O:function(){return this.F("")}}}],["","",,O,{"^":"",eH:{"^":"dD;0a,0b,0c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy",
gt:function(){var z=this.dy
if(z==null){z=D.K()
this.dy=z}return z},
X:[function(a){var z
H.i(a,"$isn")
z=this.dy
if(!(z==null))z.A(a)},function(){return this.X(null)},"eP","$1","$0","gbr",0,2,1],
h3:[function(a){H.i(a,"$isn")
this.a=null
this.X(a)},function(){return this.h3(null)},"jE","$1","$0","gh2",0,2,1],
jc:[function(a,b){var z=V.aD
z=new D.ck(a,H.p(b,"$ish",[z],"$ash"),this,[z])
z.b=!0
this.X(z)},"$2","gfs",8,0,15],
jd:[function(a,b){var z=V.aD
z=new D.cl(a,H.p(b,"$ish",[z],"$ash"),this,[z])
z.b=!0
this.X(z)},"$2","gft",8,0,15],
dg:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.dx
y=C.e.a_(z.e.length+3,4)*4
x=C.e.a_(z.f.length+3,4)*4
w=C.e.a_(z.r.length+3,4)*4
v=C.e.a_(z.x.length+3,4)*4
u=C.e.a_(z.y.length+3,4)*4
t=C.e.a_(z.z.length+3,4)*4
s=C.e.a_(this.e.a.length+3,4)*4
z=this.b!=null
r=this.c!=null
q=this.f.c
p=this.r.c
o=this.x.c
n=this.y.c
m=this.z.c
l=this.Q.c
k=this.cx.c
j=this.cy.c
i=this.db.c
h="MaterialLight_"+C.e.i(q.a)+C.e.i(p.a)+C.e.i(o.a)+C.e.i(n.a)+C.e.i(m.a)+C.e.i(l.a)+C.e.i(k.a)+C.e.i(j.a)+C.e.i(i.a)+"_"
h+=z?"1":"0"
h+=r?"1":"0"
h+"0"
h=h+"0_"+s+"_"+y+"_"+x+"_"+w+"_"+v+"_"+u+"_"+t
g=k!==C.b||j!==C.b
f=p!==C.b||o!==C.b||n!==C.b||m!==C.b
e=m===C.b
d=!e||g
c=o!==C.b||n!==C.b||!e||l!==C.b||g
e=l===C.b
b=!e
a=q===C.c||p===C.c||o===C.c||n===C.c||m===C.c||l===C.c||k===C.c||j===C.c||i===C.c
a0=q===C.d||p===C.d||o===C.d||n===C.d||m===C.d||l===C.d||k===C.d||j===C.d||i===C.d
a1=x+u+v+w+t>0
a2=s>0
a3=c||!e||d
a4=z&&a
a5=r&&a0
a6=$.$get$a0()
if(c){z=$.$get$ae()
a6=new Z.ad(a6.a|z.a)}if(b){z=$.$get$aR()
a6=new Z.ad(a6.a|z.a)}if(a){z=$.$get$a3()
a6=new Z.ad(a6.a|z.a)}if(a0){z=$.$get$aS()
a6=new Z.ad(a6.a|z.a)}if(a2){z=$.$get$aQ()
a6=new Z.ad(a6.a|z.a)}return new A.iq(q,p,o,n,m,l,k,j,i,y,x,w,v,u,t,y+x+w+v+u+t,g,g,a1,a3,!0,!1,!1,f,a1,d,c,b,a,a0,a2,a4,a5,!1,s,h.charCodeAt(0)==0?h:h,a6)},
R:function(a,b){H.p(a,"$isc",[T.dE],"$asc")
if(b!=null)if(!C.a.au(a,b)){b.sa8(0,a.length)
C.a.h(a,b)}},
ab:function(a,b){var z,y,x,w,v
for(z=this.dx.a,z=new J.av(z,z.length,0,[H.A(z,0)]);z.H();){y=z.d
x=new V.H(0,0,1)
y.a=x
w=y.b
if(w!=null){v=w.a
if(v!=null)y.a=v.an(x)}}},
iD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
if(z==null){z=this.dg()
y=a.fr.k(0,z.aI)
if(y==null){y=A.il(z,a.a)
x=y.b
if(x.length===0)H.t(P.u("May not cache a shader with no name."))
if(a.fr.dH(0,x))H.t(P.u('Shader cache already contains a shader by the name "'+x+'".'))
a.fr.m(0,x,y)}this.a=y
b.e=null
z=y}w=z.x
v=w.b2
z=b.e
if(!(z instanceof Z.d5)){b.e=null
z=null}if(z==null||!J.W(z.d,v)){z=w.r1
if(z)b.d.aG()
u=w.r2
if(u)b.d.aY()
t=w.ry
if(t)b.d.bD()
s=b.d.dE(new Z.k9(a.a),v)
s.b3($.$get$a0()).e=this.a.y.c
if(z)s.b3($.$get$ae()).e=this.a.Q.c
if(u)s.b3($.$get$aR()).e=this.a.z.c
if(w.rx)s.b3($.$get$a3()).e=this.a.ch.c
if(t)s.b3($.$get$aS()).e=this.a.cx.c
if(w.x1)s.b3($.$get$aQ()).e=this.a.cy.c
b.e=s}z=T.dE
r=H.a([],[z])
u=this.a
a.a.useProgram(u.e)
u.f.i0()
if(w.fx){u=this.a
t=a.dx
t=t.gW(t)
u=u.db
u.toString
u.ap(t.aj(0,!0))}if(w.fy){u=this.a
t=a.cx
if(t==null){t=a.db
t=t.gW(t)
q=a.dx
q=t.j(0,q.gW(q))
a.cx=q
t=q}u=u.dx
u.toString
u.ap(t.aj(0,!0))}u=this.a
t=a.ch
if(t==null){t=a.giy()
q=a.dx
q=t.j(0,q.gW(q))
a.ch=q
t=q}u=u.fr
u.toString
u.ap(t.aj(0,!0))
if(w.x2){u=this.a
t=this.b
u=u.go
u.toString
u.ap(t.aj(0,!0))}if(w.y1){u=this.a
t=this.c
u=u.id
u.toString
u.ap(t.aj(0,!0))}if(w.y2){u=this.a
t=this.d
u=u.k1
u.toString
u.ap(C.B.aj(t,!0))}if(w.b1>0){p=this.e.a.length
u=this.a.k2
u.a.uniform1i(u.d,p)
for(u=[P.y],o=0;o<p;++o){t=this.a
q=this.e.a
if(o>=q.length)return H.j(q,o)
q=q[o]
t.toString
H.i(q,"$isaD")
t=t.k3
if(o>=t.length)return H.j(t,o)
t=t[o]
n=new Float32Array(H.c0(H.p(q.aj(0,!0),"$isc",u,"$asc")))
t.a.uniformMatrix4fv(t.d,!1,n)}}switch(w.a){case C.b:break
case C.f:u=this.a
t=this.f.f
u=u.k4
u.toString
q=t.a
m=t.b
t=t.c
u.a.uniform3f(u.d,q,m,t)
break
case C.c:this.R(r,this.f.d)
u=this.a
t=this.f.d
u.ak(u.r1,u.rx,t)
t=this.a
u=this.f.f
t=t.k4
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break
case C.d:this.R(r,this.f.e)
u=this.a
t=this.f.e
u.af(u.r2,u.rx,t)
t=this.a
u=this.f.f
t=t.k4
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break}if(w.k2){switch(w.b){case C.b:break
case C.f:u=this.a
t=this.r.f
u=u.ry
u.toString
q=t.a
m=t.b
t=t.c
u.a.uniform3f(u.d,q,m,t)
break
case C.c:this.R(r,this.r.d)
u=this.a
t=this.r.d
u.ak(u.x1,u.y1,t)
t=this.a
u=this.r.f
t=t.ry
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break
case C.d:this.R(r,this.r.e)
u=this.a
t=this.r.e
u.af(u.x2,u.y1,t)
t=this.a
u=this.r.f
t=t.ry
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break}switch(w.c){case C.b:break
case C.f:u=this.a
t=this.x.f
u=u.y2
u.toString
q=t.a
m=t.b
t=t.c
u.a.uniform3f(u.d,q,m,t)
break
case C.c:this.R(r,this.x.d)
u=this.a
t=this.x.d
u.ak(u.b1,u.b2,t)
t=this.a
u=this.x.f
t=t.y2
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break
case C.d:this.R(r,this.x.e)
u=this.a
t=this.x.e
u.af(u.aI,u.b2,t)
t=this.a
u=this.x.f
t=t.y2
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break}switch(w.d){case C.b:break
case C.f:u=this.a
t=this.y.f
u=u.bF
u.toString
q=t.a
m=t.b
t=t.c
u.a.uniform3f(u.d,q,m,t)
break
case C.c:this.R(r,this.y.d)
u=this.a
t=this.y.d
u.ak(u.dL,u.bG,t)
t=this.a
u=this.y.f
t=t.bF
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break
case C.d:this.R(r,this.y.e)
u=this.a
t=this.y.e
u.af(u.dM,u.bG,t)
t=this.a
u=this.y.f
t=t.bF
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
break}switch(w.e){case C.b:break
case C.f:u=this.a
t=this.z.f
u=u.bH
u.toString
q=t.a
m=t.b
t=t.c
u.a.uniform3f(u.d,q,m,t)
t=this.a
m=this.z.ch
t=t.bJ
t.a.uniform1f(t.d,m)
break
case C.c:this.R(r,this.z.d)
u=this.a
t=this.z.d
u.ak(u.dN,u.bI,t)
t=this.a
u=this.z.f
t=t.bH
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
u=this.a
m=this.z.ch
u=u.bJ
u.a.uniform1f(u.d,m)
break
case C.d:this.R(r,this.z.e)
u=this.a
t=this.z.e
u.af(u.dO,u.bI,t)
t=this.a
u=this.z.f
t=t.bH
t.toString
q=u.a
m=u.b
u=u.c
t.a.uniform3f(t.d,q,m,u)
u=this.a
m=this.z.ch
u=u.bJ
u.a.uniform1f(u.d,m)
break}if(w.z>0){p=this.dx.e.length
u=this.a.dZ
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.e,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
q=this.a.cz
if(k>=q.length)return H.j(q,k)
h=q[k]
q=l.an(i.a)
m=q.a
if(typeof m!=="number")return m.j()
g=q.b
if(typeof g!=="number")return g.j()
f=q.c
if(typeof f!=="number")return f.j()
f=q.w(0,Math.sqrt(m*m+g*g+f*f))
g=h.b
g.a.uniform3f(g.d,f.a,f.b,f.c)
f=i.c
g=h.c
g.a.uniform3f(g.d,f.a,f.b,f.c);++k}}if(w.Q>0){p=this.dx.f.length
u=this.a.e_
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.f,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
q=this.a.cA
if(k>=q.length)return H.j(q,k)
h=q[k]
q=i.gbi(i)
m=h.b
g=q.gcR(q)
f=q.gcS(q)
q=q.gcT(q)
m.a.uniform3f(m.d,g,f,q)
q=l.M(i.gbi(i))
f=h.c
f.a.uniform3f(f.d,q.a,q.b,q.c)
q=i.gat(i)
f=h.d
g=q.gbU()
m=q.gbo()
q=q.gbC()
f.a.uniform3f(f.d,g,m,q)
q=i.gcm()
m=h.e
m.a.uniform1f(m.d,q)
q=i.gcn()
m=h.f
m.a.uniform1f(m.d,q)
q=i.gco()
m=h.r
m.a.uniform1f(m.d,q);++k}}if(w.ch>0){p=this.dx.r.length
u=this.a.e0
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.r,t=u.length,k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
q=this.a.cB
if(k>=q.length)return H.j(q,k)
h=q[k]
q=i.gbi(i)
m=h.b
g=q.gcR(q)
f=q.gcS(q)
q=q.gcT(q)
m.a.uniform3f(m.d,g,f,q)
q=i.gcw(i).jM()
f=h.c
g=q.gaZ(q)
m=q.gb_(q)
q=q.gb0()
f.a.uniform3f(f.d,g,m,q)
q=l.M(i.gbi(i))
m=h.d
m.a.uniform3f(m.d,q.a,q.b,q.c)
q=i.gat(i)
m=h.e
g=q.gbU()
f=q.gbo()
q=q.gbC()
m.a.uniform3f(m.d,g,f,q)
q=i.gjL()
f=h.f
f.a.uniform1f(f.d,q)
q=i.gjK()
f=h.r
f.a.uniform1f(f.d,q)
q=i.gcm()
f=h.x
f.a.uniform1f(f.d,q)
q=i.gcn()
f=h.y
f.a.uniform1f(f.d,q)
q=i.gco()
f=h.z
f.a.uniform1f(f.d,q);++k}}if(w.cx>0){p=this.dx.x.length
u=this.a.e1
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.x,t=u.length,q=[z],k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
m=this.a.cC
if(k>=m.length)return H.j(m,k)
h=m[k]
m=i.gbj()
H.p(r,"$isc",q,"$asc")
if(!C.a.au(r,m)){m.sa8(0,r.length)
C.a.h(r,m)}m=i.gcw(i)
g=h.d
f=m.gaZ(m)
e=m.gb_(m)
m=m.gb0()
g.a.uniform3f(g.d,f,e,m)
m=i.giS()
e=h.b
f=m.gaZ(m)
g=m.gb_(m)
m=m.gb0()
e.a.uniform3f(e.d,f,g,m)
m=i.gal(i)
g=h.c
f=m.gaZ(m)
e=m.gb_(m)
m=m.gb0()
g.a.uniform3f(g.d,f,e,m)
m=l.an(i.gcw(i))
e=m.a
if(typeof e!=="number")return e.j()
f=m.b
if(typeof f!=="number")return f.j()
g=m.c
if(typeof g!=="number")return g.j()
g=m.w(0,Math.sqrt(e*e+f*f+g*g))
f=h.e
f.a.uniform3f(f.d,g.a,g.b,g.c)
g=i.gat(i)
f=h.f
e=g.gbU()
m=g.gbo()
g=g.gbC()
f.a.uniform3f(f.d,e,m,g)
g=i.gbj()
m=g.ga9(g)
if(!m){m=h.x
m.a.uniform1i(m.d,1)}else{m=h.r
f=g.ga9(g)
e=m.a
m=m.d
if(!f)e.uniform1i(m,0)
else e.uniform1i(m,g.ga8(g))
m=h.x
m.a.uniform1i(m.d,0)}++k}}if(w.cy>0){p=this.dx.y.length
u=this.a.e2
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.y,t=u.length,q=[P.y],m=[z],k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
g=this.a.cD
if(k>=g.length)return H.j(g,k)
h=g[k]
g=i.gbj()
H.p(r,"$isc",m,"$asc")
if(!C.a.au(r,g)){g.sa8(0,r.length)
C.a.h(r,g)}d=l.j(0,i.gW(i))
g=i.gW(i).M(new V.r(0,0,0))
f=h.b
e=g.gcR(g)
c=g.gcS(g)
g=g.gcT(g)
f.a.uniform3f(f.d,e,c,g)
g=d.M(new V.r(0,0,0))
c=h.c
c.a.uniform3f(c.d,g.a,g.b,g.c)
g=d.be(0)
c=h.d
n=new Float32Array(H.c0(H.p(new V.aN(g.a,g.b,g.c,g.e,g.f,g.r,g.y,g.z,g.Q).aj(0,!0),"$isc",q,"$asc")))
c.a.uniformMatrix3fv(c.d,!1,n)
c=i.gat(i)
g=h.e
e=c.gbU()
f=c.gbo()
c=c.gbC()
g.a.uniform3f(g.d,e,f,c)
c=i.gbj()
g=c.ga9(c)
if(!g){g=h.r
g.a.uniform1i(g.d,1)}else{g=h.f
f=c.ga9(c)
e=g.a
g=g.d
if(!f)e.uniform1i(g,0)
else e.uniform1i(g,c.ga8(c))
g=h.r
g.a.uniform1i(g.d,0)}g=i.gcm()
f=h.x
f.a.uniform1f(f.d,g)
g=i.gcn()
f=h.y
f.a.uniform1f(f.d,g)
g=i.gco()
f=h.z
f.a.uniform1f(f.d,g);++k}}if(w.db>0){p=this.dx.z.length
u=this.a.e3
u.a.uniform1i(u.d,p)
u=a.db
l=u.gW(u)
for(u=this.dx.z,t=u.length,z=[z],k=0,j=0;j<u.length;u.length===t||(0,H.C)(u),++j){i=u[j]
q=this.a.cE
if(k>=q.length)return H.j(q,k)
h=q[k]
q=i.gbj()
H.p(r,"$isc",z,"$asc")
if(!C.a.au(r,q)){q.sa8(0,r.length)
C.a.h(r,q)}q=i.gbi(i)
m=h.b
g=q.gcR(q)
f=q.gcS(q)
q=q.gcT(q)
m.a.uniform3f(m.d,g,f,q)
q=i.gcw(i)
f=h.c
g=q.gaZ(q)
m=q.gb_(q)
q=q.gb0()
f.a.uniform3f(f.d,g,m,q)
q=i.giS()
m=h.d
g=q.gaZ(q)
f=q.gb_(q)
q=q.gb0()
m.a.uniform3f(m.d,g,f,q)
q=i.gal(i)
f=h.e
g=q.gaZ(q)
m=q.gb_(q)
q=q.gb0()
f.a.uniform3f(f.d,g,m,q)
q=l.M(i.gbi(i))
m=h.f
m.a.uniform3f(m.d,q.a,q.b,q.c)
q=i.gbj()
m=q.ga9(q)
if(!m){q=h.x
q.a.uniform1i(q.d,1)}else{m=h.r
g=q.ga9(q)
f=m.a
m=m.d
if(!g)f.uniform1i(m,0)
else f.uniform1i(m,q.ga8(q))
q=h.x
q.a.uniform1i(q.d,0)}q=i.gat(i)
m=h.y
g=q.gbU()
f=q.gbo()
q=q.gbC()
m.a.uniform3f(m.d,g,f,q)
q=i.gjT()
f=h.z
f.a.uniform1f(f.d,q)
q=i.gjU()
f=h.Q
f.a.uniform1f(f.d,q)
q=i.gcm()
f=h.ch
f.a.uniform1f(f.d,q)
q=i.gcn()
f=h.cx
f.a.uniform1f(f.d,q)
q=i.gco()
f=h.cy
f.a.uniform1f(f.d,q);++k}}}switch(w.f){case C.b:break
case C.f:break
case C.c:this.R(r,this.Q.d)
z=this.a
u=this.Q.d
z.ak(z.dP,z.bK,u)
break
case C.d:this.R(r,this.Q.e)
z=this.a
u=this.Q.e
z.af(z.dQ,z.bK,u)
break}if(w.fr){z=this.a
u=a.Q
if(u==null){u=a.db
u=u.gW(u).be(0)
a.Q=u}z=z.fy
z.toString
z.ap(u.aj(0,!0))}if(w.dy){this.R(r,this.ch)
z=this.a
u=this.ch
z.af(z.dR,z.dS,u)
switch(w.r){case C.b:break
case C.f:z=this.a
u=this.cx.f
z=z.bL
z.toString
t=u.a
q=u.b
u=u.c
z.a.uniform3f(z.d,t,q,u)
break
case C.c:this.R(r,this.cx.d)
z=this.a
u=this.cx.d
z.ak(z.dT,z.bM,u)
u=this.a
z=this.cx.f
u=u.bL
u.toString
t=z.a
q=z.b
z=z.c
u.a.uniform3f(u.d,t,q,z)
break
case C.d:this.R(r,this.cx.e)
z=this.a
u=this.cx.e
z.af(z.dU,z.bM,u)
u=this.a
z=this.cx.f
u=u.bL
u.toString
t=z.a
q=z.b
z=z.c
u.a.uniform3f(u.d,t,q,z)
break}switch(w.x){case C.b:break
case C.f:z=this.a
u=this.cy.f
z=z.bO
z.toString
t=u.a
q=u.b
u=u.c
z.a.uniform3f(z.d,t,q,u)
u=this.a
q=this.cy.ch
u=u.bN
u.a.uniform1f(u.d,q)
break
case C.c:this.R(r,this.cy.d)
z=this.a
u=this.cy.d
z.ak(z.dV,z.bP,u)
u=this.a
z=this.cy.f
u=u.bO
u.toString
t=z.a
q=z.b
z=z.c
u.a.uniform3f(u.d,t,q,z)
z=this.a
q=this.cy.ch
z=z.bN
z.a.uniform1f(z.d,q)
break
case C.d:this.R(r,this.cy.e)
z=this.a
u=this.cy.e
z.af(z.dW,z.bP,u)
u=this.a
z=this.cy.f
u=u.bO
u.toString
t=z.a
q=z.b
z=z.c
u.a.uniform3f(u.d,t,q,z)
z=this.a
q=this.cy.ch
z=z.bN
z.a.uniform1f(z.d,q)
break}}z=w.y
u=z!==C.b
if(u){switch(z){case C.b:break
case C.f:z=this.a
t=this.db.f
z=z.bQ
z.a.uniform1f(z.d,t)
break
case C.c:this.R(r,this.db.d)
z=this.a
t=this.db.d
z.ak(z.dX,z.bR,t)
t=this.a
z=this.db.f
t=t.bQ
t.a.uniform1f(t.d,z)
break
case C.d:this.R(r,this.db.e)
z=this.a
t=this.db.e
z.af(z.dY,z.bR,t)
t=this.a
z=this.db.f
t=t.bQ
t.a.uniform1f(t.d,z)
break}a.a.enable(3042)
a.a.blendFunc(770,771)}for(o=0;o<r.length;++o)r[o].aF(a)
z=b.e
z.aF(a)
z.b5(a)
z.bn(a)
if(u)a.a.disable(3042)
for(o=0;o<r.length;++o)r[o].bn(a)
z=this.a
z.toString
a.a.useProgram(null)
z.f.hZ()},
i:function(a){var z=this.a
if(z!=null)return z.b
else return this.dg().aI},
q:{
eI:function(){var z,y,x,w
z=new O.eH()
y=O.da(V.aD)
z.e=y
y.bp(z.gfs(),z.gft())
y=new O.bm(z,"emission")
y.c=C.b
y.f=new V.aa(0,0,0)
z.f=y
y=new O.bm(z,"ambient")
y.c=C.b
y.f=new V.aa(0,0,0)
z.r=y
y=new O.bm(z,"diffuse")
y.c=C.b
y.f=new V.aa(0,0,0)
z.x=y
y=new O.bm(z,"invDiffuse")
y.c=C.b
y.f=new V.aa(0,0,0)
z.y=y
y=new O.is(z,"specular")
y.c=C.b
y.f=new V.aa(0,0,0)
y.ch=100
z.z=y
y=new O.ip(z,"bump")
y.c=C.b
z.Q=y
z.ch=null
y=new O.bm(z,"reflect")
y.c=C.b
y.f=new V.aa(0,0,0)
z.cx=y
y=new O.ir(z,"refract")
y.c=C.b
y.f=new V.aa(0,0,0)
y.ch=1
z.cy=y
y=new O.io(z,"alpha")
y.c=C.b
y.f=1
z.db=y
y=new D.i8()
y.bq(D.a2)
y.e=H.a([],[D.cD])
y.f=H.a([],[D.iM])
y.r=H.a([],[D.jn])
y.x=H.a([],[D.jA])
y.y=H.a([],[D.jB])
y.z=H.a([],[D.jC])
y.Q=null
y.ch=null
y.bX(y.gfq(),y.gfR(),y.gfT())
z.dx=y
x=y.Q
if(x==null){x=D.K()
y.Q=x
y=x}else y=x
x={func:1,ret:-1,args:[D.n]}
w=H.f(z.gh2(),x)
C.a.h(y.a,w)
w=z.dx
y=w.ch
if(y==null){y=D.K()
w.ch=y}x=H.f(z.gbr(),x)
C.a.h(y.a,x)
z.dy=null
return z}}},io:{"^":"dq;0f,a,b,0c,0d,0e",
h6:function(a){var z,y
z=this.f
if(!$.m.$2(z,a)){y=this.f
this.f=a
z=new D.G(this.b,y,a,this,[P.y])
z.b=!0
this.a.X(z)}},
aW:function(){this.d_()
this.h6(1)}},dq:{"^":"b;",
X:[function(a){this.a.X(H.i(a,"$isn"))},function(){return this.X(null)},"eP","$1","$0","gbr",0,2,1],
aW:["d_",function(){}],
h8:function(a){var z,y,x
z=this.d
if(z==null?a!=null:z!==a){if(z!=null){z=z.gt()
z.toString
y=H.f(this.gbr(),{func:1,ret:-1,args:[D.n]})
C.a.T(z.a,y)}x=this.d
this.d=a
if(a!=null){z=a.gt()
z.toString
y=H.f(this.gbr(),{func:1,ret:-1,args:[D.n]})
C.a.h(z.a,y)}z=new D.G(this.b+".texture2D",x,this.d,this,[T.cN])
z.b=!0
this.a.X(z)}},
h9:function(a){},
sbk:function(a){var z
if(a==null){if(this.c===C.c){this.c=C.f
z=this.a
z.a=null
z.X(null)}}else{z=this.c
if(z!==C.c){if(z===C.b)this.aW()
this.c=C.c
this.h9(null)
z=this.a
z.a=null
z.X(null)}}this.h8(a)}},ip:{"^":"dq;a,b,0c,0d,0e"},bm:{"^":"dq;0f,a,b,0c,0d,0e",
du:function(a){var z,y
if(!J.W(this.f,a)){z=this.f
this.f=a
y=new D.G(this.b+".color",z,a,this,[V.aa])
y.b=!0
this.a.X(y)}},
aW:["c_",function(){this.d_()
this.du(new V.aa(1,1,1))}],
sat:function(a,b){var z
if(this.c===C.b){this.c=C.f
this.aW()
z=this.a
z.a=null
z.X(null)}this.du(b)}},ir:{"^":"bm;0ch,0f,a,b,0c,0d,0e",
h7:function(a){var z,y
z=this.ch
if(!$.m.$2(z,a)){y=this.ch
this.ch=a
z=new D.G(this.b+".refraction",y,a,this,[P.y])
z.b=!0
this.a.X(z)}},
aW:function(){this.c_()
this.h7(1)}},is:{"^":"bm;0ch,0f,a,b,0c,0d,0e",
ce:function(a){var z,y
z=this.ch
if(!$.m.$2(z,a)){y=this.ch
this.ch=a
z=new D.G(this.b+".shininess",y,a,this,[P.y])
z.b=!0
this.a.X(z)}},
aW:function(){this.c_()
this.ce(100)}},dD:{"^":"b;"}}],["","",,T,{"^":"",dE:{"^":"d2;"},cN:{"^":"dE;"},jw:{"^":"cN;0a,0b,0c,0d,0e,0f",
ga8:function(a){return this.a},
sa8:function(a,b){this.a=b
return b},
ga9:function(a){var z=this.d
z=z==null?null:z.ga9(z)
if(z==null){z=this.c
z=z==null?null:z.ga9(z)}return z==null?!1:z},
gt:function(){var z=this.f
if(z==null){z=D.K()
this.f=z}return z},
aF:function(a){var z
if(this.d==null){z=this.c
this.d=z
if(!(z==null))z.aF(a)}},
bn:function(a){var z=this.d
if(z!=null){z.bn(a)
this.d=null}}},jx:{"^":"cN;0a,0b,0c,0d,0e,0f,0r,0x,0y",
ga8:function(a){return this.a},
sa8:function(a,b){this.a=b
return b},
ga9:function(a){return this.d},
gt:function(){var z=this.y
if(z==null){z=D.K()
this.y=z}return z},
aF:function(a){if(!this.c&&this.d){this.c=!0
a.a.activeTexture(33984+this.a)
a.a.bindTexture(3553,this.b)}},
bn:function(a){if(this.c){this.c=!1
a.a.activeTexture(33984+this.a)
a.a.bindTexture(3553,null)}}},jy:{"^":"b;a,0b,0c,0d,0e",
ig:function(a,b,c,d,e){var z,y,x,w
z=this.a
y=z.createTexture()
z.bindTexture(3553,y)
z.texParameteri(3553,10242,33071)
z.texParameteri(3553,10243,33071)
z.texParameteri(3553,10241,9987)
z.texParameteri(3553,10240,9729)
z.bindTexture(3553,null);++this.d
x=document.createElement("img")
x.src=a
w=new T.jx()
w.a=0
w.b=y
w.c=!1
w.d=!1
w.e=0
w.f=0
w.r=0
w.x=0
z=W.ai
W.a4(x,"load",H.f(new T.jz(this,w,x,!1,y,!1,!0),{func:1,ret:-1,args:[z]}),!1,z)
return w},
ie:function(a,b,c,d){return this.ig(a,!1,b,c,d)},
h4:function(a,b,c){var z,y,x,w
b=V.e_(b,2)
z=V.e_(a.width,2)
y=V.e_(a.height,2)
z=Math.min(z,b)
y=Math.min(y,b)
if(a.width===z&&a.height===y)return a
else{x=W.d7(null,null)
x.width=z
x.height=y
w=H.i(C.k.en(x,"2d"),"$ise7")
w.imageSmoothingEnabled=!1
w.drawImage(a,0,0,x.width,x.height)
return P.lN(w.getImageData(0,0,x.width,x.height))}}},jz:{"^":"v:24;a,b,c,d,e,f,r",
$1:function(a){var z,y,x,w
z=this.b
y=this.c
z.e=y.width
z.f=y.height
x=this.a
w=x.h4(y,x.b,this.d)
z.r=y.width
z.x=y.height
y=x.a
y.bindTexture(3553,this.e)
y.pixelStorei(37440,this.f?1:0)
C.K.iL(y,3553,0,6408,6408,5121,w)
if(this.r)y.generateMipmap(3553)
y.bindTexture(3553,null)
if(!z.d){z.d=!0
z=z.y
if(!(z==null))z.dK()}++x.e}}}],["","",,V,{"^":"",hi:{"^":"b;",
bf:function(a,b){return!0},
i:function(a){return"all"},
$iscn:1},cn:{"^":"b;"},eG:{"^":"b;",
bf:["ew",function(a,b){var z,y,x
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x)if(z[x].bf(0,b))return!0
return!1}],
i:["cZ",function(a){var z,y,x,w,v
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.C)(z),++w){v=z[w]
if(x.length!==0)x+=", "
x+=v.i(0)}return x}],
$iscn:1},bR:{"^":"eG;0a",
bf:function(a,b){return!this.ew(0,b)},
i:function(a){return"!["+this.cZ(0)+"]"}},j9:{"^":"b;0a",
eC:function(a){var z,y
if(a.a.length<=0)throw H.d(P.u("May not create a SetMatcher with zero characters."))
z=new H.aM(0,0,[P.x,P.a8])
for(y=new H.eC(a,a.gl(a),0,[H.al(a,"w",0)]);y.H();)z.m(0,y.d,!0)
this.a=z},
bf:function(a,b){return this.a.dH(0,b)},
i:function(a){var z=this.a
return P.dC(new H.eB(z,[H.A(z,0)]),0,null)},
$iscn:1,
q:{
ac:function(a){var z=new V.j9()
z.eC(a)
return z}}},f2:{"^":"b;a,b,0c,0d",
gii:function(a){return this.b},
B:function(a,b){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if(w.b.b===b)return w}w=new V.fc(this.a.L(0,b))
w.a=H.a([],[V.cn])
w.c=!1
C.a.h(this.c,w)
return w},
i2:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
if(w.bf(0,a))return w}return},
i:function(a){return this.b}},f9:{"^":"b;a,b,c",
i:function(a){var z,y
z=H.ha(this.b,"\n","\\n")
y=H.ha(z,"\t","\\t")
return this.a+":"+this.c+':"'+y+'"'}},fa:{"^":"b;a,b,0c",
i:function(a){return this.b}},jG:{"^":"b;0a,0b,0c",
L:function(a,b){var z=this.a.k(0,b)
if(z==null){z=new V.f2(this,b)
z.c=H.a([],[V.fc])
this.a.m(0,b,z)}return z},
bl:function(a){var z,y
z=this.b.k(0,a)
if(z==null){z=new V.fa(this,a)
y=P.o
z.c=new H.aM(0,0,[y,y])
this.b.m(0,a,z)}return z},
iQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=H.a([],[V.f9])
y=this.c
x=[P.x]
w=H.a([],x)
for(v=a.length,u=null,t=0;!0;){if(t>=v){if(u!=null)C.a.h(z,u)
return z}s=C.i.bt(a,t)
r=y.i2(s)
if(r==null){if(u==null){C.a.h(w,s)
q=P.dC(w,0,null)
throw H.d(P.u("Untokenizable string [state: "+y.gii(y)+", index "+t+']: "'+q+'"'))}C.a.h(z,u)
t=u.c+1
w=H.a([],x)
y=this.c
u=null}else{if(!r.c)C.a.h(w,s)
y=r.b
if(y.d!=null){q=P.dC(w,0,null)
p=y.d
o=p.c.k(0,q)
u=new V.f9(o==null?p.b:o,q,t)}++t}}}},fc:{"^":"eG;b,0c,0a",
i:function(a){return this.b.b+": "+this.cZ(0)}}}],["","",,X,{"^":"",e6:{"^":"b;",$isaO:1},hU:{"^":"f5;0a,0b,0c,0d,0e,0f,0r,0x",
gt:function(){var z=this.x
if(z==null){z=D.K()
this.x=z}return z}},iH:{"^":"b;0a,0b,0c,0d,0e",
gt:function(){var z=this.e
if(z==null){z=D.K()
this.e=z}return z},
b8:[function(a){var z
H.i(a,"$isn")
z=this.e
if(!(z==null))z.A(a)},function(){return this.b8(null)},"j1","$1","$0","gd2",0,2,1],
se8:function(a){var z,y,x
if(!J.W(this.a,a)){z=this.a
if(z!=null){z=z.gt()
z.toString
y=H.f(this.gd2(),{func:1,ret:-1,args:[D.n]})
C.a.T(z.a,y)}x=this.a
this.a=a
if(a!=null){z=a.gt()
z.toString
y=H.f(this.gd2(),{func:1,ret:-1,args:[D.n]})
C.a.h(z.a,y)}z=new D.G("mover",x,this.a,this,[U.a6])
z.b=!0
this.b8(z)}},
$isaO:1,
$ise6:1},f5:{"^":"b;"}}],["","",,V,{"^":"",jj:{"^":"b;0a,0b",
eE:function(a,b){var z,y,x,w,v,u,t
z=document
y=z.body
x=z.createElement("div")
x.className="scrollTop"
y.appendChild(x)
w=z.createElement("div")
w.className="scrollPage"
y.appendChild(w)
v=z.createElement("div")
v.className="pageCenter"
w.appendChild(v)
if(a.length!==0){z.title=a
u=z.createElement("div")
u.className="pageTitle"
u.textContent=a
v.appendChild(u)}t=z.createElement("div")
this.a=t
v.appendChild(t)
this.b=null
t=W.ai
W.a4(z,"scroll",H.f(new V.jm(x),{func:1,ret:-1,args:[t]}),!1,t)},
hN:function(a,b,c){var z,y,x,w
a=H.z(C.e.hS(a,0,4))
if(c.length===0)c=P.fQ(C.r,b,C.o,!1)
z=document.createElement("div")
z.className="textHeader"
z.id=c
y=z.style
x=""+(28-a*3)+"px"
y.fontSize=x
w=W.hj(null)
w.href="#"+c
w.textContent=b
z.appendChild(w)
this.a.appendChild(z)},
ck:function(a,b){return this.hN(a,b,"")},
V:function(a){var z,y,x,w,v,u,t,s,r,q,p
H.p(a,"$isc",[P.o],"$asc")
this.hb()
z=document
y=z.createElement("div")
y.className="textPar"
for(x=this.b.iQ(C.a.ia(a)),w=x.length,v=0;v<x.length;x.length===w||(0,H.C)(x),++v){u=x[v]
switch(u.a){case"Bold":t=z.createElement("div")
t.className="boldPar"
t.textContent=u.b
y.appendChild(t)
break
case"Italic":t=z.createElement("div")
t.className="italicPar"
t.textContent=u.b
y.appendChild(t)
break
case"Code":t=z.createElement("div")
t.className="codePar"
t.textContent=u.b
y.appendChild(t)
break
case"Link":s=u.b
if(H.h9(s,"|",0)){r=s.split("|")
q=z.createElement("a")
q.className="linkPar"
if(1>=r.length)return H.j(r,1)
q.href=r[1]
q.textContent=r[0]
y.appendChild(q)}else{p=P.fQ(C.r,s,C.o,!1)
q=z.createElement("a")
q.className="linkPar"
q.href="#"+p
q.textContent=s
y.appendChild(q)}break
case"Other":t=z.createElement("div")
t.className="normalPar"
t.textContent=u.b
y.appendChild(t)
break}}this.a.appendChild(y)},
hb:function(){var z,y,x,w
if(this.b!=null)return
z=new V.jG()
y=P.o
z.a=new H.aM(0,0,[y,V.f2])
z.b=new H.aM(0,0,[y,V.fa])
z.c=z.L(0,"Start")
y=z.L(0,"Start").B(0,"Bold")
x=V.ac(new H.a9("*"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Bold").B(0,"Bold")
x=new V.bR()
w=[V.cn]
x.a=H.a([],w)
C.a.h(y.a,x)
y=V.ac(new H.a9("*"))
C.a.h(x.a,y)
y=z.L(0,"Bold").B(0,"BoldEnd")
x=V.ac(new H.a9("*"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Start").B(0,"Italic")
x=V.ac(new H.a9("_"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Italic").B(0,"Italic")
x=new V.bR()
x.a=H.a([],w)
C.a.h(y.a,x)
y=V.ac(new H.a9("_"))
C.a.h(x.a,y)
y=z.L(0,"Italic").B(0,"ItalicEnd")
x=V.ac(new H.a9("_"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Start").B(0,"Code")
x=V.ac(new H.a9("`"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Code").B(0,"Code")
x=new V.bR()
x.a=H.a([],w)
C.a.h(y.a,x)
y=V.ac(new H.a9("`"))
C.a.h(x.a,y)
y=z.L(0,"Code").B(0,"CodeEnd")
x=V.ac(new H.a9("`"))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"Start").B(0,"LinkHead")
x=V.ac(new H.a9("["))
C.a.h(y.a,x)
y.c=!0
y=z.L(0,"LinkHead").B(0,"LinkTail")
x=V.ac(new H.a9("|"))
C.a.h(y.a,x)
x=z.L(0,"LinkHead").B(0,"LinkEnd")
y=V.ac(new H.a9("]"))
C.a.h(x.a,y)
x.c=!0
x=z.L(0,"LinkHead").B(0,"LinkHead")
y=new V.bR()
y.a=H.a([],w)
C.a.h(x.a,y)
x=V.ac(new H.a9("|]"))
C.a.h(y.a,x)
x=z.L(0,"LinkTail").B(0,"LinkEnd")
y=V.ac(new H.a9("]"))
C.a.h(x.a,y)
x.c=!0
x=z.L(0,"LinkTail").B(0,"LinkTail")
y=new V.bR()
y.a=H.a([],w)
C.a.h(x.a,y)
x=V.ac(new H.a9("|]"))
C.a.h(y.a,x)
C.a.h(z.L(0,"Start").B(0,"Other").a,new V.hi())
x=z.L(0,"Other").B(0,"Other")
y=new V.bR()
y.a=H.a([],w)
C.a.h(x.a,y)
x=V.ac(new H.a9("*_`["))
C.a.h(y.a,x)
x=z.L(0,"BoldEnd")
x.d=x.a.bl("Bold")
x=z.L(0,"ItalicEnd")
x.d=x.a.bl("Italic")
x=z.L(0,"CodeEnd")
x.d=x.a.bl("Code")
x=z.L(0,"LinkEnd")
x.d=x.a.bl("Link")
x=z.L(0,"Other")
x.d=x.a.bl("Other")
this.b=z},
q:{
jk:function(a,b){var z=new V.jj()
z.eE(a,!0)
return z}}},jm:{"^":"v:24;a",
$1:function(a){P.dF(C.m,new V.jl(this.a))}},jl:{"^":"v:2;a",
$0:function(){var z,y,x
z=C.h.am(document.documentElement.scrollTop)
y=this.a.style
x=H.l(-0.01*z)+"px"
y.top=x}}}],["","",,B,{"^":"",
hr:function(a){switch(a){case 0:return"air"
case 1:return"water"
case 100:return"boundary"
case 101:return"dirt"
case 102:return"turf"
case 103:return"rock"
case 104:return"sand"
case 105:return"dryLeaves"
case 106:return"trunk-ud"
case 107:return"trunk-ns"
case 108:return"trunk-ew"
case 109:return"brick"
case 110:return"redShine"
case 111:return"whiteShine"
case 112:return"yellowShine"
case 113:return"blackShine"
case 114:return"leaves"
case 115:return"wood-ud"
case 116:return"wood-ns"
case 117:return"wood-ew"
case 200:return"grass"
case 201:return"fern"
case 202:return"whiteFlower"
case 203:return"blueFlower"
case 204:return"redFlower"
case 205:return"mushroom"}return"undefined"},
hq:function(a,b){var z
if(a===b)return!1
if(b===0)return!0
if(a===1)return b>=200&&b<=205
if(!(a>=200&&a<=205))if(b!==1)z=b>=200&&b<=205
else z=!0
else z=!1
return z},
h5:function(){var z,y,x
z=V.jk("3Dart Craft",!0)
y=[P.o]
z.V(H.a(["This example is in development and may still have a few issues and glitches."],y))
x=W.d7(null,null)
x.className="pageLargeCanvas"
x.id="targetCanvas"
z.a.appendChild(x)
z.ck(1,"About")
z.V(H.a(["3Dart Craft is an example of how [3Dart|https://github.com/Grant-Nelson/ThreeDart] can be used ","to create a [voxel|https://en.wikipedia.org/wiki/Voxel] environment for browser driven video games. ","This example has no server backing it so none of the changes are persisted. It would take very little ","to turn this into a simple online game."],y))
z.V(H.a(["\xab[Back to Examples List|../../]"],y))
z.ck(1,"Controls")
z.V(H.a(["\u2022 _Currently there are no controls for mobile browsers_"],y))
z.V(H.a(["\u2022 *Esc* to release the mouse capture"],y))
z.V(H.a(["\u2022 *W* or *Up arrow* to move forward"],y))
z.V(H.a(["\u2022 *S* or *Down arrow* to move backward"],y))
z.V(H.a(["\u2022 *A* or *Left arrow* to strife left"],y))
z.V(H.a(["\u2022 *D* or *Right arror* to strife right"],y))
z.V(H.a(["\u2022 *Space bar* to jump"],y))
z.V(H.a(["\u2022 *Tab* cycles the block selected which can be placed"],y))
z.V(H.a(["\u2022 *Shift-Tab* cycles the selection in the reverse direction"],y))
z.V(H.a(["\u2022 *Left click* or *Q* removes the currently highlighted block"],y))
z.V(H.a(["\u2022 *Right click* or *E* places the selected block on the highlighted block"],y))
z.V(H.a(["\u2022 *O* to return the starting location"],y))
z.ck(1,"Help wanted")
z.V(H.a(["There is still much to be done, many cool new features, and several little bugs. ","If you would like to contribute to this example, have an idea, find a bug, or just want to learn more about it, ","check out the [project page|https://github.com/Grant-Nelson/ThreeDart/projects/1] or ","[source code|https://github.com/Grant-Nelson/ThreeDart/tree/master/web/examples/craft]."],y))
z.V(H.a(["There are tons of ways to contribute. You could even start your own example. ","See the [3Dart Project|https://github.com/Grant-Nelson/ThreeDart] for more."],y))
P.dF(C.m,B.m2())},
nq:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
z=document.getElementById("targetCanvas")
if(z==null)H.t(P.u("Failed to find an element with the identifier, targetCanvas."))
y=E.jE(z,!0,!0,!0,!1)
x=new B.it(y)
w=P.x
x.b=new H.aM(0,0,[w,B.X])
x.c=new H.aM(0,0,[w,[P.c,P.x]])
x.d=H.a([],[O.eH])
v=new V.aa(1,1,1)
u=new V.r(0,0,0)
t=new V.r(0.5,-1,0.2).v(0,u)
t=U.aX(V.eK(u,new V.H(0,0,1),new V.H(t.a,t.b,t.c)))
u=new D.cD()
u.c=new V.aa(1,1,1)
u.a=new V.H(0,0,1)
s=u.b
u.b=t
t=t.gt()
t.toString
r=H.f(u.gfz(),{func:1,ret:-1,args:[D.n]})
C.a.h(t.a,r)
t=new D.G("mover",s,u.b,u,[U.a6])
t.b=!0
u.aV(t)
if(!u.c.u(0,v)){s=u.c
u.c=v
t=new D.G("color",s,v,u,[V.aa])
t.b=!0
u.aV(t)}x.e=u
q=x.I(x.C("boundary"),!1)
p=x.I(x.C("brick"),!1)
o=x.I(x.C("dirt"),!1)
n=x.I(x.C("dryLeavesSide"),!1)
m=x.I(x.C("dryLeavesTop"),!1)
l=x.I(x.C("leaves"),!1)
k=x.I(x.C("rock"),!1)
j=x.I(x.C("sand"),!1)
i=x.I(x.C("trunkEnd"),!1)
h=x.I(x.C("trunkSide"),!1)
g=x.I(x.C("trunkTilted"),!1)
f=x.I(x.C("turfSide"),!1)
e=x.I(x.C("turfTop"),!1)
d=x.I(x.C("woodEnd"),!1)
c=x.I(x.C("woodSide"),!1)
b=x.I(x.C("woodTilted"),!1)
a=x.I(x.C("blackShine"),!0)
a0=x.I(x.C("redShine"),!0)
a1=x.I(x.C("yellowShine"),!0)
a2=x.I(x.C("whiteShine"),!0)
a3=x.I(x.C("mushroomBottom"),!1)
a4=x.I(x.C("mushroomSide"),!1)
a5=x.I(x.C("mushroomTop"),!1)
a6=x.I(x.C("grass"),!1)
a7=x.I(x.C("fern"),!1)
a8=x.I(x.C("blueFlowers"),!1)
a9=x.I(x.C("redFlowers"),!1)
b0=x.I(x.C("whiteFlowers"),!1)
u=T.cN
t=P.eD([x.C("water1"),x.C("water2"),x.C("water3")],!0,u)
r=new T.jw()
r.a=0
r.b=0
r.e=H.p(t,"$isc",[u],"$asc")
x.x=r
b1=x.I(r,!0)
x.b.m(0,100,new B.X(q,q,q,q,q,q))
x.b.m(0,101,new B.X(o,o,o,o,o,o))
x.b.m(0,102,new B.X(e,o,f,f,f,f))
x.b.m(0,103,new B.X(k,k,k,k,k,k))
x.b.m(0,104,new B.X(j,j,j,j,j,j))
x.b.m(0,105,new B.X(m,o,n,n,n,n))
x.b.m(0,106,new B.X(i,i,h,h,h,h))
x.b.m(0,107,new B.X(h,h,g,g,i,i))
x.b.m(0,108,new B.X(g,g,i,i,g,g))
x.b.m(0,109,new B.X(p,p,p,p,p,p))
x.b.m(0,110,new B.X(a0,a0,a0,a0,a0,a0))
x.b.m(0,111,new B.X(a2,a2,a2,a2,a2,a2))
x.b.m(0,112,new B.X(a1,a1,a1,a1,a1,a1))
x.b.m(0,113,new B.X(a,a,a,a,a,a))
x.b.m(0,114,new B.X(l,l,l,l,l,l))
x.b.m(0,115,new B.X(d,d,c,c,c,c))
x.b.m(0,116,new B.X(c,c,b,b,d,d))
x.b.m(0,117,new B.X(b,b,d,d,b,b))
x.b.m(0,1,new B.X(b1,b1,b1,b1,b1,b1))
w=[w]
u=H.p(H.a([a6],w),"$isc",w,"$asc")
x.c.m(0,200,u)
u=H.p(H.a([a7],w),"$isc",w,"$asc")
x.c.m(0,201,u)
u=H.p(H.a([b0],w),"$isc",w,"$asc")
x.c.m(0,202,u)
u=H.p(H.a([a8],w),"$isc",w,"$asc")
x.c.m(0,203,u)
u=H.p(H.a([a9],w),"$isc",w,"$asc")
x.c.m(0,204,u)
w=H.p(H.a([a5,a3,a4],w),"$isc",w,"$asc")
x.c.m(0,205,w)
x.f=x.d5("selection")
x.r=x.d5("crosshair")
b2=B.ke(x)
b3=B.iK(y,b2)
b4=new M.hM()
w=O.da(E.ah)
b4.d=w
w.bp(b4.gfA(),b4.gfB())
b4.e=null
b4.f=null
b4.r=null
b4.x=null
b5=new X.iH()
b5.b=1.0471975511965976
b5.c=0.1
b5.d=2000
b5.se8(null)
w=b5.b
if(!$.m.$2(w,1.0471975511965976)){s=b5.b
b5.b=1.0471975511965976
w=new D.G("fov",s,1.0471975511965976,b5,[P.y])
w.b=!0
b5.b8(w)}w=b5.c
if(!$.m.$2(w,0.1)){s=b5.c
b5.c=0.1
w=new D.G("near",s,0.1,b5,[P.y])
w.b=!0
b5.b8(w)}w=b5.d
if(!$.m.$2(w,2000)){s=b5.d
b5.d=2000
w=new D.G("far",s,2000,b5,[P.y])
w.b=!0
b5.b8(w)}w=b4.a
if(w!==b5){if(w!=null){w=w.gt()
w.toString
u=H.f(b4.gaP(),{func:1,ret:-1,args:[D.n]})
C.a.T(w.a,u)}s=b4.a
b4.a=b5
w=b5.gt()
w.toString
u=H.f(b4.gaP(),{func:1,ret:-1,args:[D.n]})
C.a.h(w.a,u)
w=new D.G("camera",s,b4.a,b4,[X.e6])
w.b=!0
b4.b7(w)}b6=new X.hU()
w=new V.aW(0,0,0,1)
b6.a=w
b6.b=!0
b6.c=2000
b6.d=!0
b6.e=0
b6.f=!1
w=V.dw(0,0,1,1)
b6.r=w
w=b4.b
if(w!==b6){if(w!=null){w=w.gt()
w.toString
u=H.f(b4.gaP(),{func:1,ret:-1,args:[D.n]})
C.a.T(w.a,u)}s=b4.b
b4.b=b6
w=b6.gt()
w.toString
u=H.f(b4.gaP(),{func:1,ret:-1,args:[D.n]})
C.a.h(w.a,u)
w=new D.G("target",s,b4.b,b4,[X.f5])
w.b=!0
b4.b7(w)}w=b4.e
if(w==null){w=D.K()
b4.e=w}u={func:1,ret:-1,args:[D.n]}
t=H.f(b2.giT(b2),u)
C.a.h(w.a,t)
b4.a.se8(b3.r)
for(w=b2.d,t=w.length,b7=0;b7<w.length;w.length===t||(0,H.C)(w),++b7){b8=w[b7]
r=b4.d
b9=H.A(r,0)
H.E(b8,b9)
c0=[b9]
if(r.b9(H.a([b8],c0))){c1=r.a
c2=c1.length
C.a.h(c1,b8)
b9=H.p(H.a([b8],c0),"$ish",[b9],"$ash")
r=r.c
if(r!=null)r.$2(c2,b9)}}b4.d.h(0,b3.cy)
b2.e=b3
w=y.d
if(w!==b4){if(w!=null){w=w.gt()
w.toString
t=H.f(y.gd0(),u)
C.a.T(w.a,t)}y.d=b4
w=b4.gt()
w.toString
u=H.f(y.gd0(),u)
C.a.h(w.a,u)
y.eI()}b3.cV()
w=b4.b
v=new V.aW(0.576,0.784,0.929,1)
if(!w.a.u(0,v)){s=w.a
w.a=v
u=new D.G("color",s,v,w,[V.aW])
u.b=!0
w=w.x
if(!(w==null))w.A(u)}P.cO(C.z,new B.m9(y))},"$0","m2",0,0,3],
hp:{"^":"b;a,b,c,d,e,f",
i:function(a){return H.l(this.f)+".block("+this.a+", "+this.b+", "+this.c+", ("+this.d+", "+this.e+"), "+B.hr(this.gaM(this))+")"},
gaM:function(a){var z=this.f
z=z==null?null:z.a3(this.a,this.b,this.c)
if(z==null)z=this.b<0?100:0
return z}},
iB:{"^":"b;a,b"},
e8:{"^":"b;a,b,c,0d,0e,0f,0r",
ey:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=new Uint8Array(12288)
C.t.i1(z,0,12288,0)
this.d=z
this.e=H.a([],[E.ah])
for(z=this.c.d,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
v=E.bj(null,!0,null,"",null,null)
u=w.y
t=H.A(u,0)
H.E(v,t)
s=[t]
if(u.b9(H.a([v],s))){r=u.a
q=r.length
C.a.h(r,v)
t=H.p(H.a([v],s),"$ish",[t],"$ash")
u=u.c
if(u!=null)u.$2(q,t)}u=this.e;(u&&C.a).h(u,v)}this.f=!0
this.r=!0},
iB:function(a){var z,y,x,w,v,u
for(z=this.c.d,y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.C)(z),++w){v=z[w].y
u=this.e
if(x>=u.length)return H.j(u,x)
v.T(0,u[x]);++x}},
i:function(a){return"chunk("+this.a+", "+this.b+")"},
a3:function(a,b,c){var z,y
if(b<0)return 100
if(b>=48||a<0||a>=16||c<0||c>=16)return 0
z=this.d
y=(a*48+b)*16+c
if(y<0||y>=12288)return H.j(z,y)
return z[y]},
aN:function(a,b,c){var z,y
if(b<0)return 100
if(b>=48)return 0
if(a<0){z=this.gah(this)
z=z==null?null:z.aN(a+16,b,c)
return z==null?0:z}if(a>=16){z=this.gal(this)
z=z==null?null:z.aN(a-16,b,c)
return z==null?0:z}if(c<0){z=this.gcp(this)
z=z==null?null:z.aN(a,b,c+16)
return z==null?0:z}if(c>=16){z=this.gcG()
z=z==null?null:z.aN(a,b,c-16)
return z==null?0:z}z=this.d
y=(a*48+b)*16+c
if(y<0||y>=12288)return H.j(z,y)
return z[y]},
a7:function(a,b,c,d){var z,y
H.z(a)
H.z(b)
if(b<0||b>=48||a<0||a>=16||c<0||c>=16)return!1
z=this.d
y=(a*48+b)*16+c
if(y<0||y>=12288)return H.j(z,y)
z[y]=d
return!0},
gah:function(a){return this.c.aJ(this.a-16,this.b)},
gcG:function(){return this.c.aJ(this.a,this.b+16)},
gal:function(a){return this.c.aJ(this.a+16,this.b)},
gcp:function(a){return this.c.aJ(this.a,this.b-16)},
cP:function(a,b,c){var z,y
for(z=47;z>=0;--z){y=this.a3(a,z,b)
if(y>=100&&y<=117)return z}return c},
iR:function(a,b){return this.cP(a,b,48)},
iU:function(){if(!this.f)return
this.f=!1
var z=B.dA(this.c.a,null)
z.hR(this)
z.cF(0,this.e)},
sbu:function(a){var z,y,x
for(z=this.e,y=z.length,x=0;x<y;++x)z[x].b=a},
iV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.r){this.sbu(!1)
return}z=V.dw(this.a,this.b,16,16)
y=z.e9(a)
x=y.a
w=a.a
if(typeof x!=="number")return x.v()
if(typeof w!=="number")return H.e(w)
v=x-w
x=y.b
u=a.b
if(typeof x!=="number")return x.v()
if(typeof u!=="number")return H.e(u)
t=x-u
if(v*v+t*t<100){this.sbu(!0)
return}s=z.e9(b)
x=b.a
if(typeof x!=="number")return x.v()
r=b.b
if(typeof r!=="number")return r.v()
r=new V.a_(x-w,r-u)
q=r.w(0,Math.sqrt(r.D(r)))
r=s.a
if(typeof r!=="number")return r.v()
x=s.b
if(typeof x!=="number")return x.v()
p=new V.a_(r-w,x-u)
o=p.D(p)
if(o>1e4){this.sbu(!1)
return}this.sbu(q.D(p.w(0,o))>0)},
q:{
e9:function(a,b,c){var z=new B.e8(a,b,c)
z.ey(a,b,c)
return z}}},
hV:{"^":"b;0a,0b,0c",
e4:function(a){var z
this.c=a
this.fZ()
this.hl()
this.f2()
this.f0()
this.hj()
this.eW()
this.fY()
this.eT()
this.hi()
a.r=!1
a.f=!0
z=a.gah(a)
if(!(z==null))z.f=!0
z=a.gal(a)
if(!(z==null))z.f=!0
z=a.gcG()
if(!(z==null))z.f=!0
z=a.gcp(a)
if(!(z==null))z.f=!0},
ae:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=this.a
y=this.c
x=(a+y.a)*c
y=(b+y.b)*c
w=new B.b6(x,y)
v=w.n(0,$.$get$em().j(0,x+y))
y=Math.floor(v.a)
x=Math.floor(v.b)
u=new B.b6(y,x)
t=u.n(0,$.$get$de().j(0,y+x))
s=v.v(0,u)
w=new B.hO(z.a,u,w.v(0,t),s)
w.e=0
w.ac(1,0)
w.ac(0,1)
z=s.a
x=s.b
r=z+x
if(r<=1){q=1-r
if(q>z||q>x)if(z>x)w.ac(1,-1)
else w.ac(-1,1)
else w.ac(1,1)
w.ac(0,0)}else{q=2-r
if(q<z||q<x)if(z>x)w.ac(2,0)
else w.ac(0,2)
else w.ac(0,0)
w.ac(1,1)}return w.e/47*0.5+0.5},
ci:function(a,b){var z,y
z=this.b
y=(a+3)*22+(b+3)
if(y<0||y>=484)return H.j(z,y)
return z[y]},
fZ:function(){var z,y,x,w,v
for(z=0,y=-3;y<19;++y)for(x=-3;x<19;++x){w=C.h.aa(Math.pow(0.6*this.ae(y,x,0.001)+0.3*this.ae(y,x,0.01)+0.1*this.ae(y,x,0.1),2)*48)
if(w>=48)w=47
v=this.b
if(z<0||z>=484)return H.j(v,z)
v[z]=w;++z}},
hl:function(){var z,y
for(z=0;z<16;++z)for(y=0;y<16;++y)this.hm(z,y)},
hm:function(a,b){var z,y,x,w,v
z=this.ci(a,b)
for(y=z-2,x=z<8,w=0;w<=z;++w){if(x)v=y<=w?104:103
else if(z===w)v=102
else v=y<=w?101:103
this.c.a7(a,w,b,v)}},
f2:function(){var z,y
for(z=0;z<16;++z)for(y=0;y<16;++y)this.f3(z,y)},
f3:function(a,b){var z,y
z=this.c.cP(a,b,0)
if(z<8)for(y=8;y>z;--y)this.c.a7(a,y,b,1)},
f0:function(){var z,y
for(z=-1;z<=16;++z)for(y=-1;y<=16;++y)this.f1(z,y)},
f1:function(a,b){var z,y,x,w,v,u
if(this.ci(a,b)<8)for(z=10;z>6;--z)for(y=-1;y<=1;++y)for(x=a+y,w=-1;w<=1;++w){v=b+w
u=this.c.a3(x,z,v)
if(u===102||u===105)this.c.a7(x,z,v,104)}},
hj:function(){var z,y
for(z=-3;z<19;++z)for(y=-3;y<19;++y)if(this.ae(z,y,1.5)<0.1)this.eX(z,y)},
eX:function(a,b){var z,y,x,w
z=this.c
y=a+z.a
if(y>=-30)if(y<30){z=b+z.b
z=z>=-30&&z<30}else z=!1
else z=!1
if(z)return
x=this.ci(a,b)
if(x<10)return
for(w=1;w<8;++w)this.c.a7(a,x+w,b,106)
this.eY(a,b)
this.eZ(a,x+8,b)},
eY:function(a,b){var z,y,x,w,v,u
for(z=-3;z<=3;++z)for(y=z*z,x=a+z,w=-3;w<=3;++w)if(y+w*w<=10)for(v=b+w,u=47;u>=0;--u)if(this.c.a3(x,u,v)===102){this.c.a7(x,u,v,105)
break}},
eZ:function(a,b,c){var z,y,x,w,v,u,t,s
for(z=-3;z<=3;++z)for(y=z*z,x=a+z,w=-3;w<=3;++w)for(v=y+w*w,u=b+w,t=-3;t<=3;++t)if(v+t*t<=12){s=c+t
if(this.c.a3(x,u,s)===0)this.c.a7(x,u,s,114)}},
fY:function(){var z,y,x,w,v
for(z=0;z<16;++z)for(y=z-400,x=z+400,w=0;w<16;++w)if(this.ae(z,w,12.5)<0.1)this.aR(z,w,204)
else if(this.ae(x,w,12.5)<0.1)this.aR(z,w,203)
else{v=w+400
if(this.ae(z,v,12.5)<0.1)this.aR(z,w,202)
else if(this.ae(x,v,12.5)<0.15)this.aR(z,w,200)
else if(this.ae(y,w,12.5)<0.1)this.aR(z,w,201)
else if(this.ae(z,w-400,12.5)<0.08)this.aR(z,w,205)}},
aR:function(a,b,c){var z,y
z=this.c.cP(a,b,0)
y=this.c.a3(a,z,b)
if(y!==102&&y!==105)return
this.c.a7(a,z+1,b,c)},
eW:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.c
y=z.a
if(y+16>=-30)if(y<=30){z=z.b
z=z+16<-30||z>30}else z=!0
else z=!0
if(z)return
x=new B.hX(this)
for(w=30;w>=0;w-=2){v=30-w+3
for(u=-v,z=w-1,t=u;t<=v;++t)for(s=u;s<=v;++s){x.$4(t,w,s,111)
x.$4(t,z,s,111)}for(y=u-1,r=u-2,q=v+1,p=v+2,o=-2;o<=2;++o){x.$4(y,w,o,109)
x.$4(y,z,o,109)
x.$4(r,z,o,109)
x.$4(q,w,o,109)
x.$4(q,z,o,109)
x.$4(p,z,o,109)
x.$4(o,w,y,109)
x.$4(o,z,y,109)
x.$4(o,z,r,109)
x.$4(o,w,q,109)
x.$4(o,z,q,109)
x.$4(o,z,p,109)}z=w+1
x.$4(y,z,2,109)
x.$4(r,w,2,109)
x.$4(y,z,-2,109)
x.$4(r,w,-2,109)
x.$4(q,z,2,109)
x.$4(p,w,2,109)
x.$4(q,z,-2,109)
x.$4(p,w,-2,109)
x.$4(2,z,y,109)
x.$4(2,w,r,109)
x.$4(-2,z,y,109)
x.$4(-2,w,r,109)
x.$4(2,z,q,109)
x.$4(2,w,p,109)
x.$4(-2,z,q,109)
x.$4(-2,w,p,109)}},
eT:function(){var z,y,x
z=this.c
y=z.a
if(y+16>=-36)if(y<=12){z=z.b
z=z+16<-28||z>-22}else z=!0
else z=!0
if(z)return
x=new B.hW(this,-12,40,-25)
z=[P.x]
x.$5(110,0,0,H.a([0,1,2,3,4,4,3,2,4,4,3,2,1,0],z),H.a([1,0,0,0,1,2,3,3,4,5,6,6,6,5],z))
x.$5(110,6,0,H.a([0,1,2,3,4,4,4,3,2,1,0,0,0,0,0,0],z),H.a([0,0,0,1,2,3,4,5,6,6,6,5,4,3,2,1],z))
x.$5(113,12,0,H.a([0,0,0,0,0,1,2,1,2,3,3,3,3,3],z),H.a([2,3,4,5,6,1,1,4,4,2,3,4,5,6],z))
x.$5(113,17,0,H.a([0,0,0,0,0,0,1,2,1,2,3,3,3,3],z),H.a([1,2,3,4,5,6,1,1,4,4,2,3,5,6],z))
x.$5(113,22,0,H.a([0,2,1,1,1,1,1,1],z),H.a([1,1,1,2,3,4,5,6],z))},
hi:function(){var z,y,x,w,v,u
z=this.c
y=z.a
if(y+16>=-3)if(y<=3){z=z.b
z=z+16<-3||z>3}else z=!0
else z=!0
if(z)return
x=new B.hY(this)
for(w=-3;w<=3;++w)for(v=0;v<=7;++v)for(z=2+v,u=-3;u<=3;++u)x.$4(w,z,u,0)
x.$4(0,2,0,113)
x.$4(0,3,0,112)
x.$4(0,4,0,112)
x.$4(0,5,0,112)
x.$4(0,6,0,112)}},
hX:{"^":"v;a",
$4:function(a,b,c,d){var z=this.a.c
z.a7(a-z.a,b,c-z.b,d)}},
hW:{"^":"v;a,b,c,d",
$5:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=[P.x]
H.p(d,"$isc",z,"$asc")
H.p(e,"$isc",z,"$asc")
for(y=d.length-1,z=this.a,x=this.b+b,w=this.c+c,v=this.d;y>=0;--y){u=z.c
if(y>=d.length)return H.j(d,y)
t=d[y]
if(typeof t!=="number")return H.e(t)
s=u.a
if(y>=e.length)return H.j(e,y)
r=e[y]
if(typeof r!=="number")return H.e(r)
u.a7(x+t-s,w-r,v-u.b,a)}}},
hY:{"^":"v;a",
$4:function(a,b,c,d){var z=this.a.c
z.a7(a-z.a,b,c-z.b,d)}},
m9:{"^":"v:36;a",
$1:function(a){H.i(a,"$isaq")
P.e0(C.h.ek(this.a.gi4(),2)+" fps")}},
X:{"^":"b;a,b,c,d,e,f"},
it:{"^":"b;a,0b,0c,0d,0e,0f,0r,0x",
C:function(a){var z="./textures/"+a+".png"
return this.a.f.ie(z,!0,!1,!1)},
I:function(a,b){var z,y,x
z=O.eI()
z.dx.h(0,this.e)
y=z.r
y.sat(0,new V.aa(0.8,0.8,0.8))
y=z.x
y.sat(0,new V.aa(0.4,0.4,0.4))
z.r.sbk(a)
z.x.sbk(a)
z.db.sbk(a)
if(b){y=z.z
y.sat(0,new V.aa(0.5,0.5,0.5))
if(y.c===C.b){y.c=C.f
y.c_()
y.ce(100)
x=y.a
x.a=null
x.X(null)}y.ce(3)}C.a.h(this.d,z)
return this.d.length-1},
d5:function(a){var z,y
z=this.C(a)
y=O.eI()
y.f.sbk(z)
y.db.sbk(z)
return y}},
iJ:{"^":"b;0a,0b,c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db",
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.r
z.r=!0
y=z.d
y.Q=0.4
y.ch=0.4
y=new U.jZ()
x=X.aC()
x.h(0,new X.Q(39,new X.V(!1,!1,!1)))
x.h(0,new X.Q(68,new X.V(!1,!1,!1)))
w=x.gag()
w.toString
v={func:1,ret:-1,args:[D.n]}
u=H.f(y.gfI(),v)
C.a.h(w.a,u)
y.a=x
x=X.aC()
x.h(0,new X.Q(37,new X.V(!1,!1,!1)))
x.h(0,new X.Q(65,new X.V(!1,!1,!1)))
C.a.h(x.gag().a,u)
y.b=x
x=X.aC()
x.h(0,new X.Q(81,new X.V(!1,!1,!1)))
C.a.h(x.gag().a,u)
y.c=x
x=X.aC()
x.h(0,new X.Q(69,new X.V(!1,!1,!1)))
C.a.h(x.gag().a,u)
y.d=x
x=X.aC()
x.h(0,new X.Q(40,new X.V(!1,!1,!1)))
x.h(0,new X.Q(83,new X.V(!1,!1,!1)))
C.a.h(x.gag().a,u)
y.e=x
x=X.aC()
x.h(0,new X.Q(38,new X.V(!1,!1,!1)))
x.h(0,new X.Q(87,new X.V(!1,!1,!1)))
C.a.h(x.gag().a,u)
y.f=x
x=U.c7()
x.saw(30)
x.saH(0)
u=x.gt()
u.toString
w=H.f(y.gaq(),v)
C.a.h(u.a,w)
y.r=x
x=U.c7()
x.saw(30)
x.saH(0)
C.a.h(x.gt().a,w)
y.x=x
x=U.c7()
x.saw(30)
x.saH(0)
C.a.h(x.gt().a,w)
y.y=x
y.z=null
y.Q=null
y.ch=60
y.cx=15
y.cy=0
y.db=null
y.dx=null
y.dy=null
y.a.a5(z)
y.b.a5(z)
y.c.a5(z)
y.d.a5(z)
y.e.a5(z)
y.f.a5(z)
y.r.saw(6)
y.x.saw(60)
z=y.x
x=z.r
if(!$.m.$2(x,-100)){t=z.r
z.r=-100
x=new D.G("acceleration",t,-100,z,[P.y])
x.b=!0
z.E(x)}y.y.saw(6)
y.dy=H.f(this.gfj(),{func:1,ret:V.r,args:[V.r,V.r]})
this.a=y
z=a.r
y=new U.jY()
x=U.c7()
x.scQ(0,!0)
x.scJ(6.283185307179586)
x.scK(0)
x.sS(0,0)
x.saw(100)
x.sG(0)
x.saH(0.5)
y.b=x
x=x.gt()
x.toString
w=H.f(y.gaq(),v)
C.a.h(x.a,w)
x=U.c7()
x.scQ(0,!0)
x.scJ(6.283185307179586)
x.scK(0)
x.sS(0,0)
x.saw(100)
x.sG(0)
x.saH(0.5)
y.c=x
C.a.h(x.gt().a,w)
y.d=null
y.e=!1
y.f=!1
y.r=!1
y.x=2.5
y.y=2.5
y.z=2
y.Q=4
y.cx=!1
y.ch=!1
y.cy=0
y.db=0
y.dx=null
y.dy=0
y.fr=null
y.fx=null
s=new X.V(!1,!1,!1)
t=y.d
y.d=s
x=new D.G("modifiers",t,s,y,[X.V])
x.b=!0
y.E(x)
x=y.f
if(x!==!1){y.f=!1
x=new D.G("invertX",x,!1,y,[P.a8])
x.b=!0
y.E(x)}x=y.r
if(x!==!1){y.r=!1
x=new D.G("invertY",x,!1,y,[P.a8])
x.b=!0
y.E(x)}y.a5(z)
y.b.scJ(1.5707963267948966)
y.b.scK(-1.5707963267948966)
y.b.saH(1)
y.c.saH(1)
y.b.scQ(0,!1)
this.b=y
z=y.gt()
z.toString
y=H.f(new B.iL(this),v)
C.a.h(z.a,y)
y=U.a6
z=[y]
x=U.cG(H.a([this.a,this.b],z))
w=x.gt()
w.toString
u=H.f(this.ghn(),v)
C.a.h(w.a,u)
this.r=x
x=this.b
u=new U.eu()
u.c=V.bn()
u.d=0
if(null!=x){u.a=x
x=x.gt()
x.toString
w=H.f(u.gaq(),v)
C.a.h(x.a,w)
y=new D.G("mover",null,u.a,u,[y])
y.b=!0
u.E(y)}this.x=U.cG(H.a([u,this.a,U.aX(V.ds(1,-1,1,1))],z))
y=U.aX(V.co(-0.5,-0.5,-0.5))
x=new U.eZ()
x.a=0
x.b=0
x.c=0
x.d=0
x.e=0
x.f=0
x.r=0
x.sel(-0.1)
x.sed(0,0)
x.seh(0)
w=x.d
if(!$.m.$2(w,0)){t=x.d
x.d=0
w=new D.G("deltaYaw",t,0,x,[P.y])
w.b=!0
x.E(w)}w=x.e
if(!$.m.$2(w,0.1)){t=x.e
x.e=0.1
w=new D.G("deltaPitch",t,0.1,x,[P.y])
w.b=!0
x.E(w)}w=x.f
if(!$.m.$2(w,0)){t=x.f
x.f=0
w=new D.G("deltaRoll",t,0,x,[P.y])
w.b=!0
x.E(w)}this.y=U.cG(H.a([y,x,U.aX(V.co(0.5,0.5,0.5)),U.aX(V.ds(0.04,-0.04,0.04,1)),U.aX(V.co(-0.15,0.06,-0.2)),this.x],z))
this.z=U.cG(H.a([U.aX(V.ds(0.005,-0.005,0.005,1)),U.aX(V.co(0,0,-0.2)),this.x],z))
z=X.aC()
z.h(0,new X.Q(32,new X.V(!1,!1,!1)))
z.a5(a.r)
z=z.gag()
z.toString
y=H.f(this.gfH(),v)
C.a.h(z.a,y)
this.d=!0
y=X.aC()
y.h(0,new X.Q(9,new X.V(!1,!1,!1)))
y.h(0,new X.Q(9,new X.V(!1,!1,!0)))
y.a5(a.r)
y=y.gag()
y.toString
z=H.f(this.gfv(),v)
C.a.h(y.a,z)
z=X.aC()
z.h(0,new X.Q(69,new X.V(!1,!1,!1)))
z.h(0,new X.Q(81,new X.V(!1,!1,!1)))
z.a5(a.r)
z=z.gag()
z.toString
y=H.f(this.gfu(),v)
C.a.h(z.a,y)
y=a.r.d
z=y.b
if(z==null){z=D.K()
y.b=z}y=H.f(this.gfC(),v)
C.a.h(z.a,y)
y=X.aC()
y.h(0,new X.Q(79,new X.V(!1,!1,!1)))
y.a5(a.r)
y=y.gag()
y.toString
v=H.f(this.gfU(),v)
C.a.h(y.a,v)
v=this.z
y=$.$get$a0()
z=$.$get$a3()
z=new Z.ad(y.a|z.a)
r=new F.f0()
y=new F.k1(r)
y.b=!1
x=F.bW
y.c=H.a([],[x])
r.a=y
y=new F.jd(r)
y.b=H.a([],[F.eR])
r.b=y
y=new F.jc(r)
y.b=H.a([],[F.ez])
r.c=y
y=new F.jb(r)
y.b=H.a([],[F.aw])
r.d=y
r.e=null
y=r.a
w=new V.H(-1,-1,1)
w=w.w(0,Math.sqrt(w.D(w)))
q=y.bB(new V.cp(1,2,4,6),new V.aW(1,0,0,1),new V.r(-1,-1,0),new V.M(0,1),w,z)
y=r.a
w=new V.H(1,-1,1)
w=w.w(0,Math.sqrt(w.D(w)))
p=y.bB(new V.cp(0,3,4,6),new V.aW(0,0,1,1),new V.r(1,-1,0),new V.M(1,1),w,z)
y=r.a
w=new V.H(1,1,1)
w=w.w(0,Math.sqrt(w.D(w)))
o=y.bB(new V.cp(0,2,5,6),new V.aW(0,1,0,1),new V.r(1,1,0),new V.M(1,0),w,z)
y=r.a
w=new V.H(-1,1,1)
w=w.w(0,Math.sqrt(w.D(w)))
n=y.bB(new V.cp(0,2,4,7),new V.aW(1,1,0,1),new V.r(-1,1,0),new V.M(0,0),w,z)
r.d.hM(H.a([q,p,o,n],[x]))
r.aG()
z=this.c
this.Q=E.bj(null,!0,v,"",r,z.a.r)
this.ch=E.bj(null,!0,this.y,"",null,null)
v=E.ah
this.db=H.a([],[v])
for(y=z.a.d,x=y.length,m=0;m<y.length;y.length===x||(0,H.C)(y),++m){l=E.bj(null,!0,null,"",null,y[m])
w=this.ch.y
u=H.A(w,0)
H.E(l,u)
k=[u]
if(w.b9(H.a([l],k))){j=w.a
i=j.length
C.a.h(j,l)
u=H.p(H.a([l],k),"$ish",[u],"$ash")
w=w.c
if(w!=null)w.$2(i,u)}w=this.db;(w&&C.a).h(w,l)}this.e=0
z=E.bj(null,!0,null,"",null,z.a.f)
this.cx=z
this.f=null
this.cy=E.bj(H.a([this.Q,this.ch,z],[v]),!0,null,"",null,null)
this.dA()},
cV:function(){var z,y
z=this.c.aJ(C.l.aa(0.5),C.l.aa(0.5))
y=z==null?null:z.iR(C.l.aa(0.5),C.l.aa(0.5))
if(y==null)y=0
this.a.sS(0,new V.r(0.5,y+60,0.5))
this.a.sG(new V.H(0,0,0))},
jA:[function(a){H.i(a,"$isn")
this.cV()},"$1","gfU",4,0,0],
ad:function(a,b,c){var z,y
z=this.c.a3(a,b,c)
y=z.gaM(z)
return y>=100&&y<=117},
jp:[function(a){H.i(a,"$isn")
if(this.d)this.a.x.sG(30)},"$1","gfH",4,0,0],
jf:[function(a){var z,y
a=H.k(H.i(a,"$isn"),"$isbN")
$.$get$cy()
z=a.c
y=this.e
if(z.b.c){if(typeof y!=="number")return y.v()
z=y-1
this.e=z
if(z<0)this.e=19}else{if(typeof y!=="number")return y.n()
z=y+1
this.e=z
if(z>=20)this.e=0}this.dA()},"$1","gfv",4,0,0],
je:[function(a){this.da(H.k(H.i(a,"$isn"),"$isbN").c.a===69)},"$1","gfu",4,0,0],
jk:[function(a){this.da(H.k(H.i(a,"$isn"),"$isbQ").x.a===2)},"$1","gfC",4,0,0],
da:function(a){var z,y,x,w,v,u,t
z=this.f
if(z==null)return
if(a){y=this.dl(z,this.dq())
z=y.a
this.f=z
x=$.$get$cy()
w=this.e
if(w>>>0!==w||w>=20)return H.j(x,w)
v=x[w]
if(v===106){x=y.b
w=$.$get$b2()
u=$.$get$b1()
w=w.a
u=u.a
x=x.a
if((x&(w|u))!==0)v=108
else{w=$.$get$bJ()
u=$.$get$bI()
if((x&(w.a|u.a))!==0)v=107}}else if(v===115){x=y.b
w=$.$get$b2()
u=$.$get$b1()
w=w.a
u=u.a
x=x.a
if((x&(w|u))!==0)v=117
else{w=$.$get$bJ()
u=$.$get$bI()
if((x&(w.a|u.a))!==0)v=116}}}else v=0
t=z.f
if(t!=null){t.a7(z.a,z.b,z.c,v)
t.f=!0
if(this.f.a<=0){z=t.gah(t)
if(!(z==null))z.f=!0}if(this.f.c<=0){z=t.gcp(t)
if(!(z==null))z.f=!0}if(this.f.a>=15){z=t.gal(t)
if(!(z==null))z.f=!0}if(this.f.c>=15){z=t.gcG()
if(!(z==null))z.f=!0}}},
j5:[function(a,b){var z,y,x,w,v,u,t,s,r,q
z=b.a
y=b.b
x=b.c
w=J.cw(a.a)+0.5
v=J.cw(a.b)+0.5
u=J.cw(a.c)+0.5
this.d=!1
if(typeof y!=="number")return y.v()
if(this.ad(z,y-0.25,x)){y=v-0.25
this.a.x.sG(0)}if(this.ad(z,y-2+0.25,x)){y=v+0.25
this.a.x.sG(0)
this.d=!0}if(typeof z!=="number")return z.v()
t=z-0.25
s=y-0.5
if(this.ad(t,s,x)||this.ad(t,y-1.5,x)){z=w-0.25
this.a.r.sG(0)}else{t=z+0.25
if(this.ad(t,s,x)||this.ad(t,y-1.5,x)){z=w+0.25
this.a.r.sG(0)}}if(typeof x!=="number")return x.v()
t=x-0.25
if(this.ad(z,s,t)||this.ad(z,y-1.5,t)){x=u-0.25
this.a.y.sG(0)}else{t=x+0.25
if(this.ad(z,s,t)||this.ad(z,y-1.5,t)){x=u+0.25
this.a.y.sG(0)}}t=this.c
while(!0){r=t.a3(z,y-2+0.25,x)
s=r.gaM(r)
if(!(s>=100&&s<=117)){r=t.a3(z,y,x)
s=r.gaM(r)
q=s>=100&&s<=117
s=q}else s=!0
if(!s)break
y=v+0.25;++v
this.a.x.sG(0)
this.d=!0}return new V.r(z,y,x)},"$2","gfj",8,0,37],
dq:function(){var z=this.x.f
return V.eV(z.M(new V.r(0,0,0)),z.an(new V.H(0,0,-6)))},
dl:function(a,b){var z,y,x,w,v,u
z=a.a+a.d
y=a.b
x=a.c+a.e
w=V.eY(z,y,x,1,1,1).iz(b)
if(w==null)return
else{v=w.d
u=J.P(v)
if(u.u(v,$.$get$b1()))z-=0.9
else if(u.u(v,$.$get$b2()))z+=1.1
else if(u.u(v,$.$get$bG()))y-=0.9
else if(u.u(v,$.$get$bH()))y+=1.1
else if(u.u(v,$.$get$bI()))x-=0.9
else if(u.u(v,$.$get$bJ()))x+=1.1
else return}return new B.iB(this.c.a3(z,y,x),v)},
jI:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
H.i(a,"$isn")
z=this.dq()
y=z.a
x=z.d
if(typeof y!=="number")return y.n()
if(typeof x!=="number")return H.e(x)
w=z.b
v=z.e
if(typeof w!=="number")return w.n()
if(typeof v!=="number")return H.e(v)
u=z.c
t=z.f
if(typeof u!=="number")return u.n()
if(typeof t!=="number")return H.e(t)
s=V.eV(new V.r(y+x,w+v,u+t),new V.H(x,v,t).K(0))
r=this.c.a3(y,w,u)
q=0
while(!0){y=r!=null
if(!(y&&r.gaM(r)===0))break
y=this.dl(r,s)
r=y==null?null:y.a;++q}if(y)y=q<1||r.gaM(r)===0||r.gaM(r)===100
else y=!1
if(y)r=null
this.f=r
if(r==null)this.cx.b=!1
else{y=$.$get$a0()
x=$.$get$a3()
p=B.dA(null,new Z.ad(y.a|x.a))
x=this.f
o=new V.r(x.d+x.a+0.5,x.b+0.5,x.e+x.c+0.5)
n=p.Y(0)
x=$.$get$ca()
y=$.$get$cf()
w=$.$get$cg()
v=$.$get$cb()
p.a0(n,o,x,y,w,v,$.$get$ch(),!0,1.1)
u=$.$get$cd()
t=$.$get$c8()
m=$.$get$c9()
l=$.$get$ce()
p.a0(n,o,u,t,m,l,$.$get$cc(),!0,1.1)
p.a0(n,o,x,t,u,y,$.$get$dc(),!0,1.1)
p.a0(n,o,w,l,m,v,$.$get$dd(),!0,1.1)
p.a0(n,o,y,u,l,w,$.$get$cC(),!0,1.1)
p.a0(n,o,v,m,t,x,$.$get$db(),!0,1.1)
p.cF(0,H.a([this.cx],[E.ah]))
this.cx.b=!0}},"$1","ghn",4,0,0],
dA:function(){var z,y,x
z=B.dA(this.c.a,null)
y=$.$get$cy()
x=this.e
if(x>>>0!==x||x>=20)return H.j(y,x)
z.d3(null,0,0,0,y[x],!1,1)
z.cF(0,this.db)},
q:{
iK:function(a,b){var z=new B.iJ(b)
z.eA(a,b)
return z}}},
iL:{"^":"v:8;a",
$1:function(a){var z,y,x
H.i(a,"$isn")
z=this.a
y=z.a
z=V.eJ(-z.b.c.d)
if(!J.W(y.z,z)){x=y.z
y.z=z
y.Q=z.be(0)
z=new D.G("velocityRotation",x,y.z,y,[V.aN])
z.b=!0
y.E(z)}}},
je:{"^":"b;a,b,0c",
hR:function(a){var z,y,x
for(z=15;z>=0;--z)for(y=47;y>=-1;--y)for(x=15;x>=0;--x)this.d3(a,z,y,x,a.aN(z,y,x),!1,1)},
cF:function(a,b){var z,y,x,w
H.p(b,"$isc",[E.ah],"$asc")
for(z=b.length-1;z>=0;--z){if(z>=b.length)return H.j(b,z)
y=b[z]
x=this.c
if(z>=x.length)return H.j(x,z)
w=x[z]
if(w!=null){y.scX(w)
y.b=w.f.length!==0}else{y.scX(null)
y.b=!1}}this.c=null},
Y:function(a){var z,y
H.z(a)
z=this.c
if(a>>>0!==a||a>=z.length)return H.j(z,a)
y=z[a]
if(y==null){z=this.b
y=new F.eW(z)
y.b=z.gdI(z)
y.c=z.gb6(z)
y.d=0
y.f=H.a([],[P.y])
z=[P.x]
y.r=H.a([],z)
y.x=H.a([],z)
y.y=H.a([],z)
z=this.c;(z&&C.a).m(z,a,y)}return y},
d3:function(a,b,c,d,e,f,g){var z,y,x,w
z=new V.r(b,c,d)
if(a!=null){b+=a.a
d+=a.b}y=new V.r(b+0.5,c+0.5,d+0.5)
if(e===0)return
else if(e===1)this.d4(a,y,z,e,!1,g)
else if(e>=200&&e<=205)if(e===201){x=this.a.c.k(0,201)
w=J.bf(x)
this.bs(this.Y(w.k(x,0)),y,0.3141592653589793)
this.bs(this.Y(w.k(x,0)),y,1.7278759594743864)
this.bs(this.Y(w.k(x,0)),y,3.6128315516282616)
this.bs(this.Y(w.k(x,0)),y,5.026548245743669)}else if(e===205)this.eV(y)
else{x=this.a.c.k(0,e)
w=J.bf(x)
this.d8(this.Y(w.k(x,0)),y,0.39269908169872414,!0)
this.d8(this.Y(w.k(x,0)),y,1.9634954084936207,!0)}else if(e>=100&&e<=117)this.d4(a,y,z,e,!1,g)},
aU:function(a,b,c,d){var z,y
z=$.$get$a0()
y=$.$get$a3()
return F.bq(null,null,null,a,b,new V.M(c,d),null,new Z.ad(z.a|y.a|$.$get$ae().a),0)},
a0:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v
z=a.bc(H.a([this.aU(b.n(0,c.j(0,i)),g,0,0),this.aU(b.n(0,d.j(0,i)),g,0,1),this.aU(b.n(0,e.j(0,i)),g,1,1),this.aU(b.n(0,f.j(0,i)),g,1,0)],[F.bW]))
y=z+1
x=z+2
w=z+3
v=[P.x]
a.bb(H.a([z,y,x,w],v))
if(h)a.bb(H.a([x,y,z,w],v))},
d4:function(a,b,c,d,e,f){var z=this.a.b.k(0,d)
if(this.aQ(a,d,c,0,1,0))this.a0(this.Y(z.a),b,$.$get$ca(),$.$get$cf(),$.$get$cg(),$.$get$cb(),$.$get$ch(),!1,f)
if(this.aQ(a,d,c,0,-1,0))this.a0(this.Y(z.b),b,$.$get$cd(),$.$get$c8(),$.$get$c9(),$.$get$ce(),$.$get$cc(),!1,f)
if(this.aQ(a,d,c,-1,0,0))this.a0(this.Y(z.c),b,$.$get$ca(),$.$get$c8(),$.$get$cd(),$.$get$cf(),$.$get$dc(),!1,f)
if(this.aQ(a,d,c,1,0,0))this.a0(this.Y(z.d),b,$.$get$cg(),$.$get$ce(),$.$get$c9(),$.$get$cb(),$.$get$dd(),!1,f)
if(this.aQ(a,d,c,0,0,1))this.a0(this.Y(z.e),b,$.$get$cf(),$.$get$cd(),$.$get$ce(),$.$get$cg(),$.$get$cC(),!1,f)
if(this.aQ(a,d,c,0,0,-1))this.a0(this.Y(z.f),b,$.$get$cb(),$.$get$c9(),$.$get$c8(),$.$get$ca(),$.$get$db(),!1,f)},
aQ:function(a,b,c,d,e,f){if(a==null)return!0
e+=J.d1(c.b)
if(e<0)return!1
if(e>=48)return!0
return B.hq(b,a.aN(d+J.d1(c.a),e,f+J.d1(c.c)))},
d8:function(a,b,c,d){var z,y,x,w
z=Math.cos(c)*0.5
y=Math.sin(c)*0.5
x=-y
w=-z
this.a0(a,b,new V.r(z,0,x),new V.r(z,-0.5,x),new V.r(w,-0.5,y),new V.r(w,0,y),new V.H(y,0,z),!0,1)},
bs:function(a,b,c){var z=V.eJ(c)
this.a0(a,b,z.M(new V.r(0.4,-0.1,-0.4)),z.M(new V.r(0,-0.5,0)),z.M(new V.r(0.4,-0.1,0.4)),z.M(new V.r(0.8,0,0)),$.$get$ch(),!0,1)},
eV:function(a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.a.c.k(0,205)
y=J.bf(z)
x=this.Y(y.k(z,0))
w=this.Y(y.k(z,1))
v=this.Y(y.k(z,2))
z=[F.bW]
u=H.a([],z)
t=H.a([],z)
for(y=a7.a,s=a7.b,r=a7.c,q=0;q<=2;q+=0.25){p=3.141592653589793*q
o=Math.cos(p)
n=Math.sin(p)
m=new V.aN(o,0,-n,0,1,0,n,0,o)
p=m.M(new V.r(0.07,-0.1,0))
l=p.a
if(typeof y!=="number")return y.n()
if(typeof l!=="number")return H.e(l)
k=p.b
if(typeof s!=="number")return s.n()
if(typeof k!=="number")return H.e(k)
p=p.c
if(typeof r!=="number")return r.n()
if(typeof p!=="number")return H.e(p)
j=$.$get$cC()
i=m.an(j)
h=Math.abs(q-1)
g=$.$get$a0()
f=$.$get$a3()
C.a.h(u,F.bq(null,null,null,new V.r(y+l,s+k,r+p),i,new V.M(h,0),null,new Z.ad(g.a|f.a|$.$get$ae().a),0))
f=m.M(new V.r(0.1,-0.5,0))
g=f.a
if(typeof g!=="number")return H.e(g)
i=f.b
if(typeof i!=="number")return H.e(i)
f=f.c
if(typeof f!=="number")return H.e(f)
j=m.an(j)
p=$.$get$a0()
k=$.$get$a3()
C.a.h(u,F.bq(null,null,null,new V.r(y+g,s+i,r+f),j,new V.M(h,1),null,new Z.ad(p.a|k.a|$.$get$ae().a),0))
e=m.M(new V.r(0.1,-0.5,0))
d=m.M(new V.r(0.1,0,0))
k=e.a
if(typeof k!=="number")return H.e(k)
p=e.b
if(typeof p!=="number")return H.e(p)
h=e.c
if(typeof h!=="number")return H.e(h)
j=$.$get$cc()
f=d.a
if(typeof f!=="number")return f.n()
i=d.c
if(typeof i!=="number")return i.n()
g=$.$get$a0()
l=$.$get$a3()
C.a.h(t,F.bq(null,null,null,new V.r(y+k,s+p,r+h),j,new V.M(f+0.5,i+0.5),null,new Z.ad(g.a|l.a|$.$get$ae().a),0))}c=v.bc(u)
b=w.bc(t)
p=P.x
v.hP(P.cL(u.length,new B.jf(c),!0,p))
w.bb(P.cL(t.length,new B.jg(b),!0,p))
a=H.a([],z)
a0=H.a([],z)
C.a.h(a,this.aU(a7.n(0,new V.r(0,0.05,0)),$.$get$ch(),0.5,0.5))
C.a.h(a0,this.aU(a7.n(0,new V.r(0,-0.1,0)),$.$get$cc(),0.5,0.5))
for(q=0;q<=1;q+=0.1){z=-6.283185307179586*q
o=Math.cos(z)
n=Math.sin(z)
a1=new V.aN(o,0,-n,0,1,0,n,0,o)
e=a1.M(new V.r(0.4,-0.15,0))
d=a1.M(new V.r(0.5,0,0))
z=e.a
if(typeof y!=="number")return y.n()
if(typeof z!=="number")return H.e(z)
l=e.b
if(typeof s!=="number")return s.n()
if(typeof l!=="number")return H.e(l)
k=e.c
if(typeof r!=="number")return r.n()
if(typeof k!=="number")return H.e(k)
j=d.a
if(typeof j!=="number")return j.n()
i=d.c
if(typeof i!=="number")return i.n()
h=$.$get$a0()
g=$.$get$a3()
C.a.h(a,F.bq(null,null,null,new V.r(y+z,s+l,r+k),null,new V.M(j+0.5,i+0.5),null,new Z.ad(h.a|g.a|$.$get$ae().a),0))
g=6.283185307179586*q
o=Math.cos(g)
n=Math.sin(g)
a2=new V.aN(o,0,-n,0,1,0,n,0,o)
a3=a2.M(new V.r(0.4,-0.15,0))
a4=a2.M(new V.r(0.5,0,0))
g=a3.a
if(typeof g!=="number")return H.e(g)
h=a3.b
if(typeof h!=="number")return H.e(h)
i=a3.c
if(typeof i!=="number")return H.e(i)
j=a4.a
if(typeof j!=="number")return j.n()
k=a4.c
if(typeof k!=="number")return k.n()
l=$.$get$a0()
z=$.$get$a3()
C.a.h(a0,F.bq(null,null,null,new V.r(y+g,s+h,r+i),null,new V.M(j+0.5,k+0.5),null,new Z.ad(l.a|z.a|$.$get$ae().a),0))}a5=x.bc(a)
a6=w.bc(a0)
x.bb(P.cL(a.length,new B.jh(a5),!0,p))
w.bb(P.cL(a0.length,new B.ji(a6),!0,p))},
q:{
dA:function(a,b){var z,y,x
z=new B.je(a,b)
if(b==null){y=$.$get$a0()
x=$.$get$a3()
z.b=new Z.ad(y.a|x.a|$.$get$ae().a)}y=a==null?null:a.d
y=y==null?null:y.length
if(y==null)y=1
y=new Array(y)
y.fixed$length=Array
z.c=H.a(y,[F.eW])
return z}}},
jf:{"^":"v:10;a",
$1:function(a){return this.a+a}},
jg:{"^":"v:10;a",
$1:function(a){return this.a+a}},
jh:{"^":"v:10;a",
$1:function(a){return this.a+a}},
ji:{"^":"v:10;a",
$1:function(a){return this.a+a}},
kd:{"^":"b;a,0b,0c,0d,0e,0f",
eF:function(a){var z,y,x,w,v,u,t
z=new B.hV()
z.a=L.iF(0)
z.b=new Uint8Array(484)
this.b=z
this.c=H.a([],[B.e8])
this.d=H.a([],[E.ah])
this.f=null
for(z=this.a.d,y=z.length,x=0;x<z.length;z.length===y||(0,H.C)(z),++x){w=z[x]
C.a.h(this.d,E.bj(null,!0,null,"",null,w))}for(v=-32;v<32;v+=16)for(u=-32;u<32;u+=16){t=B.e9(v,u,this)
C.a.h(this.c,t)
this.b.e4(t)}P.cO(P.cj(0,0,0,750,0,0),this.ghp())
P.cO(P.cj(0,0,0,70,0,0),this.gfh())
P.cO(P.cj(0,0,0,250,0,0),this.gf_())},
aJ:function(a,b){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if(w.a===a&&w.b===b)return w}return},
a3:function(a,b,c){var z,y,x,w,v,u
z=C.e.a_(J.ct(a).aa(a),16)*16
y=C.e.a_(J.ct(c).aa(c),16)*16
if(a<0)z-=16
if(c<0)y-=16
x=this.aJ(z,y)
w=C.h.b4(a)-z
v=J.cw(b)
u=C.h.b4(c)-y
if(w<0)w+=16
return new B.hp(w,v,u<0?u+16:u,z,y,x)},
jJ:[function(a){H.i(a,"$isaq")
this.ho(this.e.x.f.M(new V.r(0,0,0)))},"$1","ghp",4,0,13],
j4:[function(a){H.i(a,"$isaq")
this.fg(this.e.x.f.M(new V.r(0,0,0)))},"$1","gfh",4,0,13],
j2:[function(a){var z,y,x,w
H.i(a,"$isaq")
z=this.a.x
y=z.b
x=z.e
w=x.length
y=(y+1)%w
if(y<w){z.b=y
z.c=x[y]
z=z.f
if(!(z==null))z.dK()}},"$1","gf_",4,0,13],
ho:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a3(a.a,a.b,a.c)
y=this.f
x=z.f
if(y==null?x!=null:y!==x){this.f=x
y=z.d
w=y-160
v=y+160
x=z.e
u=x-160
t=x+160
for(s=this.c.length-1;s>=0;--s){r=this.c
if(s>=r.length)return H.j(r,s)
q=r[s]
r=q.a
if(w<=r)if(v>r){r=q.b
r=u>r||t<=r}else r=!0
else r=!0
if(r){q.iB(0)
C.a.bV(this.c,s)}}p=y-64
o=y+64
n=x-64
m=x+64
for(l=p;l<o;l+=16)for(k=n;k<m;k+=16)if(this.aJ(l,k)==null)C.a.h(this.c,B.e9(l,k,this))}},
fg:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a
if(typeof z!=="number")return z.v()
y=z-8
z=a.c
if(typeof z!=="number")return z.v()
x=z-8
for(z=this.c,w=z.length,v=null,u=1e6,t=0;t<w;++t){s=z[t]
if(s.r){r=s.a-y
q=s.b-x
p=r*r+q*q
if(v==null||u>p){u=p
v=s}}}if(v!=null)this.b.e4(v)},
ab:[function(a,b){var z,y,x,w,v,u,t,s,r
H.i(b,"$isn")
z=this.e.x.f
y=z.M(new V.r(0,0,0))
x=z.M(new V.r(0,0,-16))
w=new V.M(y.a,y.c)
v=new V.M(x.a,x.c)
for(u=this.c,t=u.length,s=0;s<u.length;u.length===t||(0,H.C)(u),++s){r=u[s]
r.iU()
r.iV(w,v)}},"$1","giT",5,0,0],
q:{
ke:function(a){var z=new B.kd(a)
z.eF(a)
return z}}}},1]]
setupProgram(dart,0,0)
J.P=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ex.prototype
return J.ew.prototype}if(typeof a=="string")return J.dl.prototype
if(a==null)return J.ey.prototype
if(typeof a=="boolean")return J.i2.prototype
if(a.constructor==Array)return J.bl.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cm.prototype
return a}if(a instanceof P.b)return a
return J.cW(a)}
J.bf=function(a){if(typeof a=="string")return J.dl.prototype
if(a==null)return a
if(a.constructor==Array)return J.bl.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cm.prototype
return a}if(a instanceof P.b)return a
return J.cW(a)}
J.dV=function(a){if(a==null)return a
if(a.constructor==Array)return J.bl.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cm.prototype
return a}if(a instanceof P.b)return a
return J.cW(a)}
J.ct=function(a){if(typeof a=="number")return J.cJ.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.dK.prototype
return a}
J.c6=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.cm.prototype
return a}if(a instanceof P.b)return a
return J.cW(a)}
J.W=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.P(a).u(a,b)}
J.hc=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ct(a).U(a,b)}
J.hd=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.m_(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bf(a).k(a,b)}
J.he=function(a,b,c){return J.c6(a).h0(a,b,c)}
J.hf=function(a,b,c,d){return J.c6(a).dC(a,b,c,d)}
J.d_=function(a,b,c){return J.bf(a).hT(a,b,c)}
J.d0=function(a,b){return J.dV(a).J(a,b)}
J.cw=function(a){return J.ct(a).b4(a)}
J.hg=function(a,b){return J.dV(a).N(a,b)}
J.bi=function(a){return J.P(a).gZ(a)}
J.bA=function(a){return J.dV(a).ga1(a)}
J.bB=function(a){return J.bf(a).gl(a)}
J.hh=function(a,b){return J.c6(a).iE(a,b)}
J.d1=function(a){return J.ct(a).aa(a)}
J.au=function(a){return J.P(a).i(a)}
I.dY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.k=W.d6.prototype
C.A=J.q.prototype
C.a=J.bl.prototype
C.l=J.ew.prototype
C.e=J.ex.prototype
C.B=J.ey.prototype
C.h=J.cJ.prototype
C.i=J.dl.prototype
C.I=J.cm.prototype
C.t=H.iA.prototype
C.J=W.iC.prototype
C.u=J.iI.prototype
C.K=P.dy.prototype
C.n=J.dK.prototype
C.v=W.bZ.prototype
C.w=W.kc.prototype
C.x=new P.iG()
C.y=new P.k0()
C.j=new P.l0()
C.b=new A.cB(0,"ColorSourceType.None")
C.f=new A.cB(1,"ColorSourceType.Solid")
C.c=new A.cB(2,"ColorSourceType.Texture2D")
C.d=new A.cB(3,"ColorSourceType.TextureCube")
C.m=new P.bE(0)
C.z=new P.bE(5e6)
C.C=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.D=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.p=function(hooks) { return hooks; }

C.E=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.F=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.G=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.H=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.r=H.a(I.dY([0,0,65498,45055,65535,34815,65534,18431]),[P.x])
C.o=new P.k_(!1)
$.aB=0
$.bC=null
$.e3=null
$.dP=!1
$.h1=null
$.fW=null
$.h8=null
$.cV=null
$.cX=null
$.dW=null
$.bt=null
$.c1=null
$.c2=null
$.dQ=!1
$.T=C.j
$.ej=null
$.ei=null
$.eh=null
$.eg=null
$.m=V.iu()
$.eQ=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["ef","$get$ef",function(){return H.h0("_$dart_dartClosure")},"dm","$get$dm",function(){return H.h0("_$dart_js")},"fd","$get$fd",function(){return H.aG(H.cP({
toString:function(){return"$receiver$"}}))},"fe","$get$fe",function(){return H.aG(H.cP({$method$:null,
toString:function(){return"$receiver$"}}))},"ff","$get$ff",function(){return H.aG(H.cP(null))},"fg","$get$fg",function(){return H.aG(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fk","$get$fk",function(){return H.aG(H.cP(void 0))},"fl","$get$fl",function(){return H.aG(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fi","$get$fi",function(){return H.aG(H.fj(null))},"fh","$get$fh",function(){return H.aG(function(){try{null.$method$}catch(z){return z.message}}())},"fn","$get$fn",function(){return H.aG(H.fj(void 0))},"fm","$get$fm",function(){return H.aG(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dM","$get$dM",function(){return P.kf()},"c3","$get$c3",function(){return[]},"fP","$get$fP",function(){return P.j_("^[\\-\\.0-9A-Z_a-z~]*$",!0,!1)},"ed","$get$ed",function(){return{}},"el","$get$el",function(){return H.a([B.aF(5,2),B.aF(2,5),B.aF(-5,2),B.aF(-2,5),B.aF(5,-2),B.aF(2,-5),B.aF(-5,-2),B.aF(-2,-5)],[B.b6])},"em","$get$em",function(){return B.aF(-0.211324865405187,-0.211324865405187)},"de","$get$de",function(){return B.aF(0.366025403784439,0.366025403784439)},"fw","$get$fw",function(){return Z.aA(0)},"a0","$get$a0",function(){return Z.aA(1)},"ae","$get$ae",function(){return Z.aA(2)},"aR","$get$aR",function(){return Z.aA(4)},"a3","$get$a3",function(){return Z.aA(8)},"aS","$get$aS",function(){return Z.aA(16)},"bX","$get$bX",function(){return Z.aA(32)},"bY","$get$bY",function(){return Z.aA(64)},"fv","$get$fv",function(){return Z.aA(96)},"br","$get$br",function(){return Z.aA(128)},"aQ","$get$aQ",function(){return Z.aA(256)},"er","$get$er",function(){return V.ao(0)},"eq","$get$eq",function(){return V.ao(511)},"b2","$get$b2",function(){return V.ao(1)},"dh","$get$dh",function(){return V.ao(2)},"b1","$get$b1",function(){return V.ao(4)},"bH","$get$bH",function(){return V.ao(8)},"di","$get$di",function(){return V.ao(16)},"bG","$get$bG",function(){return V.ao(32)},"bJ","$get$bJ",function(){return V.ao(64)},"es","$get$es",function(){return V.ao(128)},"bI","$get$bI",function(){return V.ao(256)},"dg","$get$dg",function(){return V.ao(146)},"cy","$get$cy",function(){return H.a([101,102,103,104,105,106,115,109,110,111,112,113,1,114,200,201,202,203,204,205],[P.x])},"ch","$get$ch",function(){return V.bV(0,1,0)},"cc","$get$cc",function(){return V.bV(0,-1,0)},"dc","$get$dc",function(){return V.bV(1,0,0)},"dd","$get$dd",function(){return V.bV(-1,0,0)},"cC","$get$cC",function(){return V.bV(0,0,1)},"db","$get$db",function(){return V.bV(0,0,-1)},"cf","$get$cf",function(){return V.b7(-0.5,0.5,0.5)},"cg","$get$cg",function(){return V.b7(0.5,0.5,0.5)},"cd","$get$cd",function(){return V.b7(-0.5,-0.5,0.5)},"ce","$get$ce",function(){return V.b7(0.5,-0.5,0.5)},"ca","$get$ca",function(){return V.b7(-0.5,0.5,-0.5)},"cb","$get$cb",function(){return V.b7(0.5,0.5,-0.5)},"c8","$get$c8",function(){return V.b7(-0.5,-0.5,-0.5)},"c9","$get$c9",function(){return V.b7(0.5,-0.5,-0.5)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:-1,args:[D.n]},{func:1,ret:-1,opt:[D.n]},{func:1,ret:P.R},{func:1,ret:-1},{func:1,ret:-1,args:[W.ax]},{func:1,ret:-1,args:[P.o,,]},{func:1,ret:-1,args:[W.ai]},{func:1,ret:-1,args:[P.x,[P.h,E.ah]]},{func:1,ret:P.R,args:[D.n]},{func:1,ret:P.R,args:[F.aw]},{func:1,ret:P.x,args:[P.x]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[W.bp]},{func:1,ret:-1,args:[P.aq]},{func:1,ret:P.R,args:[,]},{func:1,ret:-1,args:[P.x,[P.h,V.aD]]},{func:1,ret:P.R,args:[,,]},{func:1,ret:P.o,args:[P.x]},{func:1,args:[,]},{func:1,ret:-1,args:[P.x,[P.h,X.Q]]},{func:1,ret:-1,args:[W.bO]},{func:1,ret:-1,args:[P.x,[P.h,D.a2]]},{func:1,ret:P.y},{func:1,ret:-1,args:[P.x,[P.h,U.a6]]},{func:1,ret:P.R,args:[W.ai]},{func:1,ret:-1,args:[P.o,P.o]},{func:1,ret:W.a1,args:[W.L]},{func:1,ret:P.a8,args:[P.y,P.y]},{func:1,args:[P.o]},{func:1,ret:P.a8,args:[[P.h,D.a2]]},{func:1,args:[,P.o]},{func:1,ret:P.R,args:[{func:1,ret:-1}]},{func:1,ret:P.R,args:[P.Z]},{func:1,ret:P.R,args:[{func:1,ret:-1,args:[D.n]}]},{func:1,ret:-1,args:[W.bZ]},{func:1,ret:P.a8,args:[[P.h,X.Q]]},{func:1,ret:P.R,args:[P.aq]},{func:1,ret:V.r,args:[V.r,V.r]},{func:1,ret:P.R,args:[,],opt:[,]},{func:1,ret:[P.aT,,],args:[,]},{func:1,ret:P.a8,args:[W.L]},{func:1,ret:-1,args:[P.b],opt:[P.ay]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.ma(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.dY=a.dY
Isolate.c5=a.c5
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(B.h5,[])
else B.h5([])})})()
//# sourceMappingURL=main.dart.js.map
