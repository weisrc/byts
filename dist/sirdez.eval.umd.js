(function(o,v){typeof exports=="object"&&typeof module!="undefined"?v(exports):typeof define=="function"&&define.amd?define(["exports"],v):(o=typeof globalThis!="undefined"?globalThis:o||self,v(o.sd={}))})(this,function(o){"use strict";function v(e=4096){const n=new ArrayBuffer(e);return{i:0,view:new DataView(n),bytes:new Uint8Array(n)}}function O(e){e.bytes=new Uint8Array(e.bytes.length*2),e.view=new DataView(e.bytes.buffer)}function U(e,n,s){for(;;){const i=e.bytes.length-8;e.i=0;try{if(n(e,s),e.i<i)return e.bytes}catch(r){if(e.i<i&&!(r instanceof RangeError))throw r}O(e)}}function k(e,n,s){const{length:i}=s;i<4096?(e.bytes.set(s),e.i=0):e=A(s);const r=n(e);if(e.i!==i)throw RangeError(`Expected to process ${i} bytes, processed ${e.i} bytes instead`);return r}function A(e){return{i:0,bytes:e,view:new DataView(e.buffer,e.byteOffset,e.byteLength)}}function f(e,n){return{ser:e,des:n}}const P={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++)e.view.setUint8(e.i++,n.charCodeAt(i))},decode(e,n){const s=new Array(n);for(let i=0;i<n;i++)s[i]=e.view.getUint8(e.i++);return String.fromCharCode(...s)}},K={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++)e.view.setUint16(e.i,n.charCodeAt(i)),e.i+=2},decode(e,n){const s=n/2,i=new Array(s);for(let r=0;r<s;r++)i[r]=e.view.getUint16(e.i),e.i+=2;return String.fromCharCode(...i)}},R=new TextEncoder,_=new TextDecoder,q={encode(e,n){e.i+=R.encodeInto(n,e.bytes.subarray(e.i)).written},decode:(e,n)=>_.decode(e.bytes.subarray(e.i,e.i+=n))},z={encode(e,n){const{length:s}=n;for(let i=0;i<s;i++){const r=n.charCodeAt(i);if(r<128)e.view.setUint8(e.i,r),e.i++;else if(r<2048){const t=(r&1984)<<2,u=r&63;e.view.setUint16(e.i,t|u|49280),e.i+=2}else if(r<55296||r>=57344){const t=(r&61440)<<12,u=(r&4032)<<10,w=(r&63)<<8;e.view.setUint32(e.i,t|u|w|3766517760),e.i+=3}else{const t=n.codePointAt(i++),u=(t&1835008)<<6,w=(t&258048)<<4,c=(t&4032)<<2,d=t&63;e.view.setUint32(e.i,u|w|c|d|4034953344),e.i+=4}}},decode(e,n){const s=[],i=e.i+n;for(;e.i<i;){const r=e.view.getUint8(e.i);if(r<192)s.push(r),e.i++;else if(r<224){const t=e.view.getUint8(e.i+1);e.i+=2,s.push((r&31)<<6|t&63)}else if(r<240){const t=e.view.getUint8(e.i+1),u=e.view.getUint8(e.i+2);e.i+=3,s.push((r&15)<<12|(t&63)<<6|u&63)}else{const t=e.view.getUint32(e.i),u=(r&7)<<18,w=(t&4128768)>>4,c=(t&16128)>>2,d=t&63;s.push(u|w|c|d),e.i+=4}}return String.fromCodePoint(...s)}},J=(e,n)=>f((s,i)=>{const{length:r}=i;n.ser(s,r);for(let t=0;t<r;t++)e.ser(s,i[t])},s=>{const i=n.des(s),r=new Array(i);for(let t=0;t<i;t++)r[t]=e.des(s);return r}),W=f((e,n)=>void e.view.setUint8(e.i++,+n),e=>!!e.view.getUint8(e.i++)),G=e=>f((n,s)=>{const{byteLength:i}=s;e.ser(n,i);const{i:r}=n;n.i+=i,n.bytes.set(s,r)},n=>{const s=e.des(n);return n.bytes.subarray(n.i,n.i+=s)}),Q=(e,n)=>({clazz:e,ser:n.ser,des:s=>Object.assign(new e,n.des(s))}),S=(e,n,s)=>f((i,r)=>{const{length:t}=Object.keys(r);s.ser(i,t);for(const u in r)e.ser(i,u),n.ser(i,r[u])},i=>{const r=s.des(i),t={};for(let u=0;u<r;u++)t[e.des(i)]=n.des(i);return t}),X=e=>f((n,s)=>{s==null?n.view.setUint8(n.i++,0):(n.view.setUint8(n.i++,1),e.ser(n,s))},n=>n.view.getUint8(n.i++)?e.des(n):void 0),m=f((e,n)=>{for(;;){const s=n&127;if(n>>=7,n)e.view.setUint8(e.i++,s|128);else{e.view.setUint8(e.i++,s);return}}},e=>{let n,s=0,i=0;do n=e.view.getUint8(e.i++),s+=(n&127)<<i,i+=7;while(n>127);return s}),Y=f((e,n)=>m.ser(e,n>=0?n*2:n*-2-1),e=>{const n=m.des(e);return n&1?(n+1)/-2:n/2}),j=(e,n)=>f((s,i)=>{const r=s.i;n.ser(s,i.length);const t=s.i,u=t-r;e.encode(s,i);const w=s.i,c=w-t;if(c===i.length)return;n.ser(s,c);const d=s.i-w;u!==d&&s.bytes.copyWithin(r+d,t,w),s.i=r,n.ser(s,c),s.i=w+(d-u)},s=>e.decode(s,n.des(s))),Z=e=>f((n,s)=>e().ser(n,s),n=>e().des(n));class B extends Error{constructor(n){super(`Invalid oneOf type (${n})`),this.type=n}}const H=(e,n)=>{const s=Object.keys(n),i=x(s),r=ee(i);return f((t,u)=>{const w=i[u.type];e.ser(t,w),n[u.type].ser(t,u.value)},t=>{const u=e.des(t),w=r[u];if(w===void 0)throw new B(u);const d=n[w].des(t);return{type:w,value:d}})};function x(e){const n={};for(let s=0;s<e.length;++s){const i=e[s];n[i]=s}return n}function ee(e){const n={};for(const s of Object.keys(e)){const i=e[s];n[i]=s}return n}const l=f((e,n)=>e.view.setUint8(e.i++,n),e=>e.view.getUint8(e.i++)),b=f((e,n)=>{e.view.setUint16(e.i,n),e.i+=2},e=>{const n=e.view.getUint16(e.i);return e.i+=2,n}),g=f((e,n)=>{e.view.setUint32(e.i,n),e.i+=4},e=>{const n=e.view.getUint32(e.i);return e.i+=4,n}),C=f((e,n)=>{e.view.setBigUint64(e.i,n),e.i+=8},e=>{const n=e.view.getBigUint64(e.i);return e.i+=8,n}),$=f((e,n)=>e.view.setInt8(e.i++,n),e=>e.view.getInt8(e.i++)),T=f((e,n)=>{e.view.setInt16(e.i,n),e.i+=2},e=>{const n=e.view.getInt16(e.i);return e.i+=2,n}),F=f((e,n)=>{e.view.setInt32(e.i,n),e.i+=4},e=>{const n=e.view.getInt32(e.i);return e.i+=4,n}),D=f((e,n)=>{e.view.setBigInt64(e.i,n),e.i+=8},e=>{const n=e.view.getBigInt64(e.i);return e.i+=8,n}),E=f((e,n)=>{e.view.setFloat32(e.i,n),e.i+=4},e=>{const n=e.view.getFloat32(e.i);return e.i+=4,n}),N=f((e,n)=>{e.view.setFloat64(e.i,n),e.i+=8},e=>{const n=e.view.getFloat64(e.i);return e.i+=8,n});function M(e,n,s,i){n<16?l.ser(e,s+n):n<65536?(l.ser(e,i),b.ser(e,n)):(l.ser(e,i+1),g.ser(e,n))}const ne={ser(e,n){n<32?l.ser(e,160+n):n<256?(l.ser(e,217),l.ser(e,n)):n<65536?(l.ser(e,218),b.ser(e,n)):(l.ser(e,219),g.ser(e,n))}};function se(e,n,s,i,r){const t=Object.keys(n),{length:u}=t;M(e,u,128,222);for(let w=0;w<u;w++){const c=t[w];h(e,c,s,i,r),h(e,n[c],s,i,r)}}function I(e,n,s){const i={};for(let r=0;r<n;r++)i[a(e,s)]=a(e,s);return i}function a(e,n){const s=e.view.getUint8(e.i++);switch(s){case 192:return null;case 194:return!1;case 195:return!0;case 202:return E.des(e);case 203:return N.des(e);case 204:return l.des(e);case 205:return b.des(e);case 206:return g.des(e);case 207:return Number(C.des(e));case 208:return $.des(e);case 209:return T.des(e);case 210:return F.des(e);case 211:return Number(D.des(e));case 217:return n.decode(e,l.des(e));case 218:return n.decode(e,b.des(e));case 219:return n.decode(e,g.des(e));case 220:return p(e,b.des(e),n);case 221:return p(e,g.des(e),n);case 222:return I(e,b.des(e),n);case 223:return I(e,g.des(e),n)}if(s<128)return s;if(s<144)return I(e,s-128,n);if(s<160)return p(e,s-144,n);if(s<192)return n.decode(e,s-160);if(s>=224)return s-256;throw new Error("Unsupported type")}function ie(e,n,s,i,r){const{length:t}=n;M(e,t,144,220);for(let u=0;u<t;u++)h(e,n[u],s,i,r)}function p(e,n,s){const i=Array(n);for(let r=0;r<n;r++)i[r]=a(e,s);return i}const re=(e,n)=>{n>=0?n<128?l.ser(e,n):n<256?(l.ser(e,204),l.ser(e,n)):n<65536?(l.ser(e,205),b.ser(e,n)):n<4294967296?(l.ser(e,206),g.ser(e,n)):(l.ser(e,207),C.ser(e,BigInt(n))):n>=-32?$.ser(e,n):n>=-128?(l.ser(e,208),$.ser(e,n)):n>=-32768?(l.ser(e,209),T.ser(e,n)):n>=-2147483648?(l.ser(e,210),F.ser(e,n)):(l.ser(e,211),D.ser(e,BigInt(n)))};function h(e,n,s,i,r){switch(n){case null:l.ser(e,192);return;case!1:l.ser(e,194);return;case!0:l.ser(e,195);return}switch(typeof n){case"number":Number.isInteger(n)?re(e,n):(l.ser(e,s),i(e,n));return;case"string":r(e,n);return;case"object":if(Array.isArray(n)){ie(e,n,s,i,r);return}se(e,n,s,i,r);return}}const te=(e,n=!1)=>{const{ser:s}=n?E:N,i=n?202:203,{ser:r}=j(e,ne);return f((t,u)=>h(t,u,i,s,r),t=>a(t,e))};function oe({ser:e,des:n},s){const i=v(s);return{ser:e,des:n,toBytes:r=>U(i,e,r).slice(0,i.i),toUnsafeBytes:r=>U(i,e,r).subarray(0,i.i),fromBytes:r=>k(i,n,r)}}const V=e=>isNaN(+e)?JSON.stringify(e):e,L=e=>{const n=Object.keys(e),s=Object.keys(n).map(r=>+r),i=Object.values(e);return new Function("d",`[${s.map(r=>"k"+r)}]`,`[${s.map(r=>"s"+r)}]`,`[${s.map(r=>"d"+r)}]`,`return d((c,d)=>{${s.map(r=>`s${r}(c,d[${V(n[r])}])`).join(";")}},(c)=>{const d=${e instanceof Array?"[]":"{}"};${s.map(r=>`d[${V(n[r])}]=d${r}(c)`).join(";")};return d})`)(f,n,i.map(({ser:r})=>r),i.map(({des:r})=>r))},ue=(...e)=>L(e),y=(e,n)=>{const s=e[0].toUpperCase()+e.slice(1)+n,i=n/8;return new Function("d",`return d((c,d)=>{c.view.set${s}(c.i,d);c.i+=${i}},(c)=>{const d=c.view.get${s}(c.i);c.i+=${i};return d})`)(f)},fe=y("uint",8),le=y("uint",16),we=y("uint",32),ce=y("int",8),ye=y("int",16),de=y("int",32),be=y("bigUint",64),ge=y("bigInt",64),ve=y("float",32),ae=y("float",64);o.InvalidOneOfType=B,o.array=J,o.bigInt64=ge,o.bigUint64=be,o.boolean=W,o.bytes=G,o.clazz=Q,o.contextDes=k,o.contextFromBytes=A,o.contextSer=U,o.createContext=v,o.define=f,o.float32=ve,o.float64=ae,o.growContext=O,o.int16=ye,o.int32=de,o.int8=ce,o.latin1=P,o.map=S,o.msgpack=te,o.number=y,o.oneOf=H,o.optional=X,o.rec=Z,o.size=Y,o.string=j,o.struct=L,o.tuple=ue,o.ucs2=K,o.uint16=le,o.uint32=we,o.uint8=fe,o.use=oe,o.usize=m,o.utf8=q,o.utf8js=z,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
