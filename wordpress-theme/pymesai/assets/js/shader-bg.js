"use strict";(()=>{var V=Object.defineProperty;var O=(t,e,i)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var o=(t,e,i)=>O(t,typeof e!="symbol"?e+"":e,i);var E=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;var B=1920*1080*4,v=class{constructor(e,i,r,a,l=0,n=0,s=2,h=B,c=[]){o(this,"parentElement");o(this,"canvasElement");o(this,"gl");o(this,"program",null);o(this,"uniformLocations",{});o(this,"fragmentShader");o(this,"rafId",null);o(this,"lastRenderTime",0);o(this,"currentFrame",0);o(this,"speed",0);o(this,"currentSpeed",0);o(this,"providedUniforms");o(this,"mipmaps",[]);o(this,"hasBeenDisposed",!1);o(this,"resolutionChanged",!0);o(this,"textures",new Map);o(this,"minPixelRatio");o(this,"maxPixelCount");o(this,"isSafari",L());o(this,"uniformCache",{});o(this,"textureUnitMap",new Map);o(this,"ownerDocument");o(this,"initProgram",()=>{let e=C(this.gl,E,this.fragmentShader);e&&(this.program=e)});o(this,"setupPositionAttribute",()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});o(this,"setupUniforms",()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){let a=`${i}AspectRatio`;e[a]=this.gl.getUniformLocation(this.program,a)}}),this.uniformLocations=e});o(this,"renderScale",1);o(this,"parentWidth",0);o(this,"parentHeight",0);o(this,"parentDevicePixelWidth",0);o(this,"parentDevicePixelHeight",0);o(this,"devicePixelsSupported",!1);o(this,"resizeObserver",null);o(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var i;if(e!=null&&e.borderBoxSize[0]){let r=(i=e.devicePixelContentBoxSize)==null?void 0:i[0];r!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=r.inlineSize,this.parentDevicePixelHeight=r.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});o(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});o(this,"handleResize",()=>{var f;let e=0,i=0,r=Math.max(1,window.devicePixelRatio),a=(f=visualViewport==null?void 0:visualViewport.scale)!=null?f:1;if(this.devicePixelsSupported){let u=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*u*a,i=this.parentDevicePixelHeight*u*a}else{let u=Math.max(r,this.minPixelRatio)*a;if(this.isSafari){let d=I(this.ownerDocument);u*=Math.max(1,d)}e=Math.round(this.parentWidth)*u,i=Math.round(this.parentHeight)*u}let l=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),n=Math.min(1,l),s=Math.round(e*n),h=Math.round(i*n),c=s/Math.round(this.parentWidth);(this.canvasElement.width!==s||this.canvasElement.height!==h||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=s,this.canvasElement.height=h,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});o(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});o(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});o(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let a=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+a);let l=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,l),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let n=this.gl.getError();if(n!==this.gl.NO_ERROR||l===null){console.error("Paper Shaders: WebGL error when uploading texture:",n);return}this.textures.set(e,l);let s=this.uniformLocations[e];if(s){this.gl.uniform1i(s,a);let h=`${e}AspectRatio`,c=this.uniformLocations[h];if(c){let f=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(c,f)}}});o(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,a)=>this.areUniformValuesEqual(r,i[a])):!1);o(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let a=r;if(r instanceof HTMLImageElement&&(a=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],a))return;this.uniformCache[i]=a;let l=this.uniformLocations[i];if(!l){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let n=null,s=null;if(r[0]!==void 0&&Array.isArray(r[0])){let h=r[0].length;if(r.every(c=>c.length===h))n=r.flat(),s=h;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else n=r,s=n.length;switch(s){case 2:this.gl.uniform2fv(l,n);break;case 3:this.gl.uniform3fv(l,n);break;case 4:this.gl.uniform4fv(l,n);break;case 9:this.gl.uniformMatrix3fv(l,!1,n);break;case 16:this.gl.uniformMatrix4fv(l,!1,n);break;default:console.warn(`Unsupported uniform array length: ${s}`)}}else typeof r=="number"?this.gl.uniform1f(l,r):typeof r=="boolean"?this.gl.uniform1i(l,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});o(this,"getCurrentFrame",()=>this.currentFrame);o(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});o(this,"setSpeed",(e=1)=>{this.speed=e,this.setCurrentSpeed(this.ownerDocument.hidden?0:e)});o(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});o(this,"setMaxPixelCount",(e=B)=>{this.maxPixelCount=e,this.handleResize()});o(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});o(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});o(this,"handleDocumentVisibilityChange",()=>{this.setCurrentSpeed(this.ownerDocument.hidden?0:this.speed)});o(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if((e==null?void 0:e.nodeType)===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let d=this.ownerDocument.createElement("style");d.innerHTML=D,d.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(d)}let f=this.ownerDocument.createElement("canvas");this.canvasElement=f,this.parentElement.prepend(f),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=c,this.currentFrame=n,this.minPixelRatio=s,this.maxPixelCount=h;let u=f.getContext("webgl2",a);if(!u)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(l),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function F(t,e,i){let r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function C(t,e,i){let r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),a=r?r.precision:null;a&&a<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let l=F(t,t.VERTEX_SHADER,e),n=F(t,t.FRAGMENT_SHADER,i);if(!l||!n)return null;let s=t.createProgram();return s?(t.attachShader(s,l),t.attachShader(s,n),t.linkProgram(s),t.getProgramParameter(s,t.LINK_STATUS)?(t.detachShader(s,l),t.detachShader(s,n),t.deleteShader(l),t.deleteShader(n),s):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(s)),t.deleteProgram(s),t.deleteShader(l),t.deleteShader(n),null)):null}var D=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function L(){let t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function I(t){var s,h;let e=(s=visualViewport==null?void 0:visualViewport.scale)!=null?s:1,i=(h=visualViewport==null?void 0:visualViewport.width)!=null?h:window.innerWidth,r=window.innerWidth-t.documentElement.clientWidth,a=e*i+r,l=outerWidth/a,n=Math.round(100*l);return n%5===0?n/100:n===33?1/3:n===67?2/3:n===133?4/3:l}var m={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0};var b={none:0,contain:1,cover:2};var z=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,P=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`;var T=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var R={maxColorCount:10},y=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${R.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${z}
${P}
${T}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${R.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;function U(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:w;if(typeof t!="string")return w;let e,i,r,a=1;if(t.startsWith("#"))[e,i,r,a]=G(t);else if(t.startsWith("rgb"))[e,i,r,a]=W(t);else if(t.startsWith("hsl"))[e,i,r,a]=N(H(t));else return console.error("Unsupported color format",t),w;return[x(e,0,1),x(i,0,1),x(r,0,1),x(a,0,1)]}function G(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(l=>l+l).join("")),t.length===6&&(t=t+"ff");let e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,a=parseInt(t.slice(6,8),16)/255;return[e,i,r,a]}function W(t){var i,r,a;let e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0")/255,parseInt((r=e[2])!=null?r:"0")/255,parseInt((a=e[3])!=null?a:"0")/255,e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function H(t){var i,r,a;let e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0"),parseInt((r=e[2])!=null?r:"0"),parseInt((a=e[3])!=null?a:"0"),e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function N(t){let[e,i,r,a]=t,l=e/360,n=i/100,s=r/100,h,c,f;if(i===0)h=c=f=s;else{let u=(g,S,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<.16666666666666666?g+(S-g)*6*p:p<.5?S:p<.6666666666666666?g+(S-g)*(.6666666666666666-p)*6:g),d=s<.5?s*(1+n):s+n-s*n,_=2*s-d;h=u(_,d,l+1/3),c=u(_,d,l),f=u(_,d,l-1/3)}return[h,c,f,a]}var x=(t,e,i)=>Math.min(Math.max(t,e),i),w=[0,0,0,1];function M(t,{colors:e,speed:i=.3,distortion:r=.8,swirl:a=.1,wireframe:l=!1}){let n={u_colors:e.map(U),u_colorsCount:e.length,u_distortion:r,u_swirl:a,u_grainMixer:0,u_grainOverlay:0,u_fit:b[m.fit],u_rotation:m.rotation,u_scale:m.scale,u_offsetX:m.offsetX,u_offsetY:m.offsetY,u_originX:m.originX,u_originY:m.originY,u_worldWidth:m.worldWidth,u_worldHeight:m.worldHeight};return new v(t,y,n,void 0,i,0)}function A(){var t=document.getElementById("pymes-mesh-base"),e=document.getElementById("pymes-mesh-wire");t&&M(t,{colors:["#000000","#FF5B14","#FFBA08","#1a0500","#E8185C"],speed:.3,distortion:.8,swirl:.1}),e&&M(e,{colors:["#000000","#ffffff","#FF5B14","#FFBA08"],speed:.2,distortion:.8,swirl:.1})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",A):A();})();
