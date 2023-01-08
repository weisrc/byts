(function(o,d){typeof exports=="object"&&typeof module!="undefined"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(o=typeof globalThis!="undefined"?globalThis:o||self,d(o.sd={}))})(this,function(o){"use strict";function d(e=4096){const n=new ArrayBuffer(e);return{i:0,view:new DataView(n),bytes:new Uint8Array(n)}}function T(e){e.bytes=new Uint8Array(e.bytes.length*2),e.view=new DataView(e.bytes.buffer)}function O(e,n,s){for(;;){const i=e.bytes.length-8;e.i=0;try{if(n(e,s),e.i<i)return e.bytes}catch(r){if(e.i<i&&!(r instanceof RangeError))throw r}T(e)}}function D(e,n,s){const{length:i}=s;i<4096?(e.bytes.set(s),e.i=0):e=E(s);const r=n(e);if(e.i!==i)throw RangeError(`Expected to process ${i} bytes, processed ${e.i} bytes instead`);return r}function E(e){return{i:0,bytes:e,view:new DataView(e.buffer,e.byteOffset,e.byteLength)}}function l(e,n){return{ser:e,des:n}}function F(e,n,s,i){n<16?f.ser(e,s+n):n<65536?(f.ser(e,i),b.ser(e,n)):(f.ser(e,i+1),v.ser(e,n))}const L={ser(e,n){n<32?f.ser(e,160+n):n<256?(f.ser(e,217),f.ser(e,n)):n<65536?(f.ser(e,218),b.ser(e,n)):(f.ser(e,219),v.ser(e,n))}};function N(e,n,s,i,r){const t=Object.keys(n),{length:u}=t;F(e,u,128,222);for(let w=0;w<u;w++){const y=t[w];a(e,y,s,i,r),a(e,n[y],s,i,r)}}function p(e,n,s){const i={};for(let r=0;r<n;r++)i[h(e,s)]=h(e,s);return i}function h(e,n){const s=e.view.getUint8(e.i++);switch(s){case 192:return null;case 194:return!1;case 195:return!0;case 202:return A.des(e);case 203:return B.des(e);case 204:return f.des(e);case 205:return b.des(e);case 206:return v.des(e);case 207:return Number(U.des(e));case 208:return c.des(e);case 209:return m.des(e);case 210:return I.des(e);case 211:return Number(k.des(e));case 217:return n.decode(e,f.des(e));case 218:return n.decode(e,b.des(e));case 219:return n.decode(e,v.des(e));case 220:return C(e,b.des(e),n);case 221:return C(e,v.des(e),n);case 222:return p(e,b.des(e),n);case 223:return p(e,v.des(e),n)}if(s<128)return s;if(s<144)return p(e,s-128,n);if(s<160)return C(e,s-144,n);if(s<192)return n.decode(e,s-160);if(s>=224)return s-256;throw new Error("Unsupported type")}function P(e,n,s,i,r){const{length:t}=n;F(e,t,144,220);for(let u=0;u<t;u++)a(e,n[u],s,i,r)}function C(e,n,s){const i=Array(n);for(let r=0;r<n;r++)i[r]=h(e,s);return i}const K=(e,n)=>{n>=0?n<128?f.ser(e,n):n<256?(f.ser(e,204),f.ser(e,n)):n<65536?(f.ser(e,205),b.ser(e,n)):n<4294967296?(f.ser(e,206),v.ser(e,n)):(f.ser(e,207),U.ser(e,BigInt(n))):n>=-32?c.ser(e,n):n>=-128?(f.ser(e,208),c.ser(e,n)):n>=-32768?(f.ser(e,209),m.ser(e,n)):n>=-2147483648?(f.ser(e,210),I.ser(e,n)):(f.ser(e,211),k.ser(e,BigInt(n)))};function a(e,n,s,i,r){switch(n){case null:f.ser(e,192);return;case!1:f.ser(e,194);return;case!0:f.ser(e,195);return}switch(typeof n){case"number":Number.isInteger(n)?K(e,n):(f.ser(e,s),i(e,n));return;case"string":r(e,n);return;case"object":if(Array.isArray(n)){P(e,n,s,i,r);return}N(e,n,s,i,r);return}}const R=(e,n=!1)=>{const{ser:s}=n?A:B,i=n?202:203,{ser:r}=$(e,L);return l((t,u)=>a(t,u,i,s,r),t=>h(t,e))};function _({ser:e,des:n},s){const i=d(s);return{ser:e,des:n,toBytes:r=>O(i,e,r).slice(0,i.i),toUnsafeBytes:r=>O(i,e,r).subarray(0,i.i),fromBytes:r=>D(i,n,r)}}const q={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++)e.view.setUint8(e.i++,n.charCodeAt(i))},decode(e,n){const s=new Array(n);for(let i=0;i<n;i++)s[i]=e.view.getUint8(e.i++);return String.fromCharCode(...s)}},z={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++)e.view.setUint16(e.i,n.charCodeAt(i)),e.i+=2},decode(e,n){const s=n/2,i=new Array(s);for(let r=0;r<s;r++)i[r]=e.view.getUint16(e.i),e.i+=2;return String.fromCharCode(...i)}},W=new TextEncoder,G=new TextDecoder,J={encode(e,n){e.i+=W.encodeInto(n,e.bytes.subarray(e.i)).written},decode:(e,n)=>G.decode(e.bytes.subarray(e.i,e.i+=n))},Q={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++){const r=n.charCodeAt(i);if(r<128)e.view.setUint8(e.i,r),e.i++;else if(r<2048){const t=(r&1984)<<2,u=r&63;e.view.setUint16(e.i,t|u|49280),e.i+=2}else if(r<55296||r>=57344){const t=(r&61440)<<12,u=(r&4032)<<10,w=(r&63)<<8;e.view.setUint32(e.i,t|u|w|3766517760),e.i+=3}else{const t=n.codePointAt(i++),u=(t&1835008)<<6,w=(t&258048)<<4,y=(t&4032)<<2,g=t&63;e.view.setUint32(e.i,u|w|y|g|4034953344),e.i+=4}}},decode(e,n){const s=[],i=e.i+n;for(;e.i<i;){const r=e.view.getUint8(e.i);if(r<192)s.push(r),e.i++;else if(r<224){const t=e.view.getUint8(e.i+1);e.i+=2,s.push((r&31)<<6|t&63)}else if(r<240){const t=e.view.getUint8(e.i+1),u=e.view.getUint8(e.i+2);e.i+=3,s.push((r&15)<<12|(t&63)<<6|u&63)}else{const t=e.view.getUint32(e.i),u=(r&7)<<18,w=(t&4128768)>>4,y=(t&16128)>>2,g=t&63;s.push(u|w|y|g),e.i+=4}}return String.fromCodePoint(...s)}},S=(e,n)=>l((s,i)=>{const{length:r}=i;n.ser(s,r);for(let t=0;t<r;t++)e.ser(s,i[t])},s=>{const i=n.des(s),r=new Array(i);for(let t=0;t<i;t++)r[t]=e.des(s);return r}),X=l((e,n)=>void e.view.setUint8(e.i++,+n),e=>!!e.view.getUint8(e.i++)),Y=e=>l((n,s)=>{const{byteLength:i}=s;e.ser(n,i);const{i:r}=n;n.i+=i,n.bytes.set(s,r)},n=>{const s=e.des(n);return n.bytes.subarray(n.i,n.i+=s)}),Z=(e,n)=>({clazz:e,ser:n.ser,des:s=>Object.assign(new e,n.des(s))}),H=(e,n,s)=>l((i,r)=>{const{length:t}=Object.keys(r);s.ser(i,t);for(const u in r)e.ser(i,u),n.ser(i,r[u])},i=>{const r=s.des(i),t={};for(let u=0;u<r;u++)t[e.des(i)]=n.des(i);return t}),x=e=>l((n,s)=>{s==null?n.view.setUint8(n.i++,0):(n.view.setUint8(n.i++,1),e.ser(n,s))},n=>n.view.getUint8(n.i++)?e.des(n):void 0),j=l((e,n)=>{for(;;){const s=n&127;if(n>>=7,n)e.view.setUint8(e.i++,s|128);else{e.view.setUint8(e.i++,s);return}}},e=>{let n,s=0,i=0;do n=e.view.getUint8(e.i++),s+=(n&127)<<i,i+=7;while(n>127);return s}),ee=l((e,n)=>j.ser(e,n>=0?n*2:n*-2-1),e=>{const n=j.des(e);return n&1?(n+1)/-2:n/2}),$=(e,n)=>l((s,i)=>{const r=s.i;n.ser(s,i.length);const t=s.i,u=t-r;e.encode(s,i);const w=s.i,y=w-t;if(y===i.length)return;n.ser(s,y);const g=s.i-w;u!==g&&s.bytes.copyWithin(r+g,t,w),s.i=r,n.ser(s,y),s.i=w+(g-u)},s=>e.decode(s,n.des(s))),ne=e=>l((n,s)=>e().ser(n,s),n=>e().des(n));class M extends Error{constructor(n){super(`Invalid oneOf type (${n})`),this.type=n}}const se=(e,n)=>{const s=Object.keys(n),i=ie(s),r=re(i);return l((t,u)=>{const w=i[u.type];e.ser(t,w),n[u.type].ser(t,u.value)},t=>{const u=e.des(t),w=r[u];if(w===void 0)throw new M(u);const g=n[w].des(t);return{type:w,value:g}})};function ie(e){const n={};for(let s=0;s<e.length;++s){const i=e[s];n[i]=s}return n}function re(e){const n={};for(const s of Object.keys(e)){const i=e[s];n[i]=s}return n}const f=l((e,n)=>e.view.setUint8(e.i++,n),e=>e.view.getUint8(e.i++)),b=l((e,n)=>{e.view.setUint16(e.i,n),e.i+=2},e=>{const n=e.view.getUint16(e.i);return e.i+=2,n}),v=l((e,n)=>{e.view.setUint32(e.i,n),e.i+=4},e=>{const n=e.view.getUint32(e.i);return e.i+=4,n}),U=l((e,n)=>{e.view.setBigUint64(e.i,n),e.i+=8},e=>{const n=e.view.getBigUint64(e.i);return e.i+=8,n}),c=l((e,n)=>e.view.setInt8(e.i++,n),e=>e.view.getInt8(e.i++)),m=l((e,n)=>{e.view.setInt16(e.i,n),e.i+=2},e=>{const n=e.view.getInt16(e.i);return e.i+=2,n}),I=l((e,n)=>{e.view.setInt32(e.i,n),e.i+=4},e=>{const n=e.view.getInt32(e.i);return e.i+=4,n}),k=l((e,n)=>{e.view.setBigInt64(e.i,n),e.i+=8},e=>{const n=e.view.getBigInt64(e.i);return e.i+=8,n}),A=l((e,n)=>{e.view.setFloat32(e.i,n),e.i+=4},e=>{const n=e.view.getFloat32(e.i);return e.i+=4,n}),B=l((e,n)=>{e.view.setFloat64(e.i,n),e.i+=8},e=>{const n=e.view.getFloat64(e.i);return e.i+=8,n}),te={uint8:f,uint16:b,uint32:v,int8:c,int16:m,int32:I,float32:A,float64:B,bigUint64:U,bigInt64:k},oe=(e,n)=>te[`${e}${n}`],V=e=>{const n=e instanceof Array?()=>[]:()=>({});return l((s,i)=>{for(const r in e)e[r].ser(s,i[r])},s=>{const i=n();for(const r in e)i[r]=e[r].des(s);return i})},ue=(...e)=>V(e);o.InvalidOneOfType=M,o.array=S,o.bigInt64=k,o.bigUint64=U,o.boolean=X,o.bytes=Y,o.clazz=Z,o.contextDes=D,o.contextFromBytes=E,o.contextSer=O,o.createContext=d,o.define=l,o.float32=A,o.float64=B,o.growContext=T,o.int16=m,o.int32=I,o.int8=c,o.latin1=q,o.map=H,o.msgpack=R,o.number=oe,o.oneOf=se,o.optional=x,o.rec=ne,o.size=ee,o.string=$,o.struct=V,o.tuple=ue,o.ucs2=z,o.uint16=b,o.uint32=v,o.uint8=f,o.use=_,o.usize=j,o.utf8=J,o.utf8js=Q,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
