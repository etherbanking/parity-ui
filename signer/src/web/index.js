!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("parity-signer",[],n):"object"==typeof exports?exports["parity-signer"]=n():e["parity-signer"]=n()}(this,function(){return function(e){function n(t){if(o[t])return o[t].exports;var r=o[t]={exports:{},id:t,loaded:!1};return e[t].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var o={};return n.m=e,n.c=o,n.p="",n(0)}({0:function(module,exports,__webpack_require__){eval("'use strict';\n\n__webpack_require__(838);\n\nvar app = window.paritySigner; // exposed by app.js\n\ninitApp();\n\nfunction initApp() {\n  var initToken = window.localStorage.getItem('sysuiToken');\n  // TODO [ToDr] Hardcoded address should replaced with options\n  var address =  true ? window.location.host : '127.0.0.1:8180';\n  app(initToken, tokenSetter, address);\n}\n\nfunction tokenSetter(token, cb) {\n  window.localStorage.setItem('sysuiToken', token);\n  window.location.reload();\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./index.js\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./index.js?")},838:function(module,exports,__webpack_require__){eval('module.exports = __webpack_require__.p + "index.html";\n\n/*****************\n ** WEBPACK FOOTER\n ** ./index.html\n ** module id = 838\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./index.html?')}})});