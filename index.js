'use strict';

var htmlparser = require('htmlparser2');
var domToLatex = require('./lib/domToLatex');

module.exports = function(parserCall, parserOptions, options) {

  var globalLatex = '';

  var handler = new htmlparser.DomHandler(function (error, dom) {
    if (!error) {
      globalLatex = '';
      console.log('type: ' + options.latexType);
      for (var i = 0; i < dom.length; i++) {
        globalLatex += domToLatex(dom[i], options.latexType);
      }
      return globalLatex;
    }
  });

  var htmlToLatex = new htmlparser.Parser(handler);
 
  switch (parserCall) {
    case 'parseComplete': 
      if(parserOptions.length === 1) {
        htmlToLatex.parseComplete(parserOptions[0]);
      } else {
        return null;
      }
    break;
  }
  return globalLatex;

}
