'use strict';
var sanitizeLatex = require('latex-sanitizer');

var templates = require("dot").process({path: "./node_modules/angular-latex-parser/templates/default"});
var config = require('./defaultConfig');

var parseStyles = function(inlineStyle, tag_name){

  // Parses styles like text-align: center to 
  //    style[1] = text-align
  //    style[2] = center
  var CSS_REGEX = /([\w-]+)\s*:\s*([^;]+)\s*;?/g;
  var style = CSS_REGEX.exec(inlineStyle);

  var styleTemplates = [];
  while (style !== null) {
    // check if found style is allowed and defined for this tag
    if (config['allowedStyles'][style[1]] !== 'undefined' && config['allowedStyles'][style[1]].indexOf(tag_name) !== -1) {
      if (config['styles'][style[1]][style[2]] !== 'undefined') {
        styleTemplates.push(config['styles'][style[1]][style[2]]);
      }
      style = CSS_REGEX.exec(inlineStyle);
    };
  }

  return styleTemplates;
}

var domToLatex = function(node){
  // end of recursion
  if (node.type === 'text') {
    return sanitizeLatex(node.data);
  }

  if (node.type === 'tag') {
    // get the tagname to use
    var tag_name = config.tags[node.name]
    
    // recursivly build all children
    var text = '';
    for (var i = 0; i < node.children.length; i++) {
      text += domToLatex(node.children[i]);
    };

    // add style-templates if any are given
    if(typeof node.attribs.style !== 'undefined'){
      var styleTemplates = parseStyles(node.attribs.style, tag_name);
      for (var i = 0; i < styleTemplates.length; i++) {
        if(typeof templates[styleTemplates[i]] !== 'undefined'){
          text = templates[styleTemplates[i]]({"content": text});
        }
      };
    }

    // use tag templates
    if(typeof templates[tag_name] !== 'undefined'){
      return templates[tag_name]({"content": text});
    } else {
      return text;
    }
  }
}

module.exports = domToLatex;
