(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{310:function(t,e,s){"use strict";s.r(e);var a=s(13),n=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"string"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#string"}},[t._v("#")]),t._v(" String")]),t._v(" "),e("p",[t._v("Strings in this library are exteremely versatile: you choose the encoding format and the header size.")]),t._v(" "),e("blockquote",[e("p",[t._v("String header will determine the max size of string: they encode the length of the encoded string output.")])]),t._v(" "),e("p",[e("code",[t._v("sd.string")]),t._v(" is a "),e("code",[t._v("sd.StringFactory")]),t._v(": it creates "),e("code",[t._v("sd.SerDes<string>")]),t._v(" with the specified encoding scheme and header size.")]),t._v(" "),e("h2",{attrs:{id:"usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),e("p",[t._v("This is how you can create a UTF8 encoded string with a maximum length of 255 (because the range of "),e("code",[t._v("sd.uint8")]),t._v(" is [0, 255]).")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sd"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sd"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utf8"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sd"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("uint8"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),e("p",[t._v("There are no input validation. Passing a string which too long will result in unexpected behaviors. Inputing a non-string value will most likely result in an error.")])]),t._v(" "),e("h2",{attrs:{id:"encodings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#encodings"}},[t._v("#")]),t._v(" Encodings")]),t._v(" "),e("p",[t._v("Sir Dez comes with built-in string encodings.")]),t._v(" "),e("ul",[e("li",[t._v("For compact and fast strings that require all unicode characters, use "),e("code",[t._v("sd.utf8js")]),t._v(".")]),t._v(" "),e("li",[t._v("For longer compact strings that require all unicode characters, use "),e("code",[t._v("sd.utf8")]),t._v(".")]),t._v(" "),e("li",[t._v("For fast encoding that require all unicode characters, use "),e("code",[t._v("sd.ucs2")]),t._v(" (utf16).")]),t._v(" "),e("li",[t._v("For compact and fast encoding which only need the first 255 characters, use "),e("code",[t._v("sd.latin1")]),t._v(" (ascii).")])]),t._v(" "),e("h2",{attrs:{id:"headers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#headers"}},[t._v("#")]),t._v(" Headers")]),t._v(" "),e("p",[t._v("Headers determine the size of the string.")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("sd.uint8")]),t._v(" for strings of length [0, ~255].")]),t._v(" "),e("li",[e("code",[t._v("sd.uint16")]),t._v(" for strings of length [0, ~65 535].")]),t._v(" "),e("li",[e("code",[t._v("sd.uint32")]),t._v(" for strings of length [0, ~4 294 967 295]")])]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),e("p",[t._v("An "),e("strong",[t._v("~")]),t._v(" have been added because it is only an approximation. Depending the contents of string and the encoding, the number will change. The header determines the length of the encoded string payload, and not the length of the string in JavaScript (UTF16).")])]),t._v(" "),e("h2",{attrs:{id:"specifications"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#specifications"}},[t._v("#")]),t._v(" Specifications")]),t._v(" "),e("p",[t._v("The header is encoded before the main body of the string containing the encoded string.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("[header][encoded string]\n")])])]),e("p",[t._v("For example, if we have a string composed of ascii characters: "),e("code",[t._v('"hello world"')]),t._v(". The length of the string will be 11, hence the header value will be 11.")]),t._v(" "),e("p",[t._v("In the actual implementation, because the payload length is only known after the encoding process, we skip the header to write it after.")])])}),[],!1,null,null,null);e.default=n.exports}}]);