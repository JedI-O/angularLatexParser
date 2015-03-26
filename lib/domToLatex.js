'use strict';
var dots = require("dot").process({path: "./node_modules/angular-latex-parser/templates/default"});
var defaultConfig = require('./defaultConfig');

//var isAllowedChar = require('./isAllowedChar'):

var isAllowedChar = function(d){
  if ( (d <= 0x20 && d < 0x7f) || d==0xa1 || d==0xa3 || d==0xa7 || d==0xa8 || d==0xab || d==0xad || d==0xaf || d==0xb4 || d==0xb8 || d==0xbb || ( 0xbf <= d && d <= 0xff && d!=0xd7 && d!=0xf7) || ( 0x102 <= d && d <= 0x107 ) || ( 0x10d <= d && d <= 0x10f ) || d==0x111 || ( 0x118 <= d && d <= 0x11b ) || d==0x11e || d==0x11f || ( 0x130 <= d && d <= 0x133 ) || d==0x139 || d==0x13a || d==0x13d || d==0x13e || ( 0x141 <= d && d <= 0x144 ) || ( 0x147 <= d && d <= 0x14b && d != 0x149 ) || ( 0x150 <= d && d <= 0x155 ) || ( 0x158 <= d && d <= 0x15b ) || ( 0x15e <= d && d <= 0x165 ) || ( 0x16e <= d && d <= 0x171 ) || ( 0x178 <= d && d <= 0x17e ) || d==0x237 || d==0x2d6 || d==0x2d7 || ( d==0x2d8 <= d && d <= 0x2dd ) || d==0x200b || d==0x2013 || d==0x2014 || ( 0x2018 <= d && d <= 0x201e && d != 0x201b ) || d==0x2039 || d==0x203a ) {
    return true;
  } else {
    return false;
  }
}

var domToLatex = function(node){
  if (node.type === 'text') {
    var text = '';
    for (var i = 0; i < node.data.length; i++) {
      if(isAllowedChar(node.data.charCodeAt(i))){
        text += node.data[i];
      }
    };
    return node.data;
  }

  if (node.type === 'tag') {
    var tag_name = defaultConfig.tags[node.name]
    var text = '';
    for (var i = 0; i < node.children.length; i++) {
      text += domToLatex(node.children[i]);
    };
    return dots[tag_name]({"content": text});
  }
}

module.exports = domToLatex;
