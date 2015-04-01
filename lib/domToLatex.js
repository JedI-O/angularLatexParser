'use strict';
var sanitizeLatex    = require('latex-sanitizer');

var templates        = {};
templates['article'] = require("dot").process({path: "./node_modules/latex-parser/templates/defaultArticle"});
templates['letter']  = require("dot").process({path: "./node_modules/latex-parser/templates/defaultLetter"});

var config           = {};
config['article']    = require('./articleConfig');
config['letter']     = require('./letterConfig');

var parseStyles = function(inlineStyle, tag_name, classType){

  // Parses styles like text-align: center to 
  //    style[1] = text-align
  //    style[2] = center
  var CSS_REGEX = /([\w-]+)\s*:\s*([^;]+)\s*;?/g;
  var style;

  var styleTemplates = [];
  while ((style = CSS_REGEX.exec(inlineStyle)) !== null) {
    // check if found style is allowed and defined for this tag
    if (typeof config[classType]['allowedStyles'][style[1]] !== 'undefined' && config[classType]['allowedStyles'][style[1]].indexOf(tag_name) !== -1) {
      if (typeof config[classType]['styles'][style[1]][style[2]] !== 'undefined') {
        styleTemplates.push(config[classType]['styles'][style[1]][style[2]]);
      }
    }
  }

  return styleTemplates;
}

var domToLatex = function(node, classType){
  classType = classType || 'article';

  //console.log(classType);
  
  // end of recursion
  if (node.type === 'text') {
    return sanitizeLatex(node.data);
  }

  if (node.type === 'tag') {
    // get the tagname to use
    var tag_name = config[classType].tags[node.name] || 'text'
    
    // recursivly build all children
    var text = '';
    for (var i = 0; i < node.children.length; i++) {
      text += domToLatex(node.children[i], classType);
    };

    // add style-templates if any are given
    if(typeof node.attribs.style !== 'undefined'){
      var styleTemplates = parseStyles(node.attribs.style, tag_name, classType);
      for (var i = 0; i < styleTemplates.length; i++) {
        if(typeof templates[classType][styleTemplates[i]] !== 'undefined'){
          text = templates[classType][styleTemplates[i]]({"content": text});
        }
      };
    }

    // use tag templates
    if(typeof templates[classType][tag_name] !== 'undefined'){
      return templates[classType][tag_name]({"content": text});
    } else {
      return text;
    }
  }
}

module.exports = domToLatex;
