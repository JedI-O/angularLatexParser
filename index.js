'use strict';

var htmlparser = require('htmlparser2');
var domToLatex = require('./lib/domToLatex');

globalLatex = '';

var handler = new htmlparser.DomHandler(function (error, dom) {
  if (!error) {
    globalLatex = '';
    for (var i = 0; i < dom.length; i++) {
      globalLatex += domToLatex(dom[i]);
    }
    return globalLatex;
  }
});

var htmlToLatex = new htmlparser.Parser(handler);

module.exports = htmlToLatex;
