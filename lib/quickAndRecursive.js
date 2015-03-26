var htmlparser = require('htmlparser2');
var _ = require('lodash');
var dots = require("dot").process({path: "../templates/default"});


var html = "<h1>h1. This is a v" + "ery large header.</h1>\
          <h2>h2. This is a large header.</h2>\
          <h2>Paragraphs are nice</h2>\
          <p>\
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
          </p>\
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\
          <h2>Un-ordered lists are great for making quick outlines bulleted.</h2>\
          <ul>\
            <li>List item with a much longer description or more content.</li>\
            <li>List item</li>\
            <li>List item\
              <ul>\
                <li>Nested List Item</li>\
                <li>Nested List Item</li>\
                <li>Nested List Item</li>\
              </ul>\
            </li>\
            <li>List item</li>\
            <li>List item</li>\
            <li>List item</li>\
          </ul>\
          <h3>Ordered lists are great for lists that need order, duh.</h3>\
          <ol>\
            <li>List Item 1</li>\
            <li>List Item 2</li>\
            <li>List Item 3</li>\
          </ol>\
          <p><b>Lorem </b><u><b>ipsum </b></u><i><b>dolor </b></i><u><b>sit </b></u><b>amet,</b><b><i> cons</i></b><i>etet</i><i>ur sad</i><b><i>ipscing</i><u> elitr, se</u>d diam nonu<i>my eirmod tempor inv<u>idunt ut lab</u>ore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet c<u>lita ka</u>sd gubergre</i>n, no se<u>a tak</u><i>im</i></b><i>ata s</i><i>anctus es</i><b><i>t Lo</i></b><b>rem</b><u><b> ipsum do</b></u><i><b>lor</b></i><u><b> sit </b></u><b>amet.</b><br/></p>\
          ";

var config = {
  allowedTags: ['h1', 'h2', 'p', 'br', 'b', 'u', 'i', 'li', 'ol', 'ul']
}

var config2 = {
  tags: {
    h1 : 'h1',
    h2 : 'h2',
    h3 : 'h2',
    h4 : 'h2',
    h5 : 'h2',
    p  : 'p',
    div: 'p',
    br : 'br',
    b  : 'b',
    u  : 'u',
    i  : 'i',
    ol : 'ol',
    ul : 'ul',
    li : 'li'
  },
}

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
    var tag_name = config2.tags[node.name]
    var text = '';
    for (var i = 0; i < node.children.length; i++) {
      text += domToLatex(node.children[i]);
    };
    return dots[tag_name]({"content": text});
  }
}


var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error) {
        // [...do something for errors...]
    } else {
        for (var i = 0; i < dom.length; i++) {
          console.log(domToLatex(dom[i]));
        };
    }
});
var parser = new htmlparser.Parser(handler);
console.log(html.length);
parser.write(html);
parser.done();
console.log(html.length);
