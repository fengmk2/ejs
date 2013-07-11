
"use strict";

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');

var root = path.dirname(__dirname);
var fixturesDir = path.join(root, 'test', 'fixtures');
var names = fs.readdirSync(fixturesDir);

var fixtures = {};

for (var i = 0; i < names.length; i++) {
  var name = names[i];
  var filepath = path.join(fixturesDir, name);
  if (fs.statSync(filepath).isDirectory()) {
    continue;
  }

  fixtures[name] = fs.readFileSync(filepath, 'utf8');
}

var testTplfile = path.join(root, 'test', 'ejs_browser_tpl.js');
var js = fs.readFileSync(testTplfile, 'utf8').replace('##REPLACE_HOLDER##', JSON.stringify(fixtures));
fs.writeFileSync(path.join(root, 'test', 'ejs_browser.js'), js);
