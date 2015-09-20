(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("templates/index", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              <tr>\n                <td>"
    + escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"username","hash":{},"data":data}) : helper)))
    + "</td>\n                <td>"
    + escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lastName","hash":{},"data":data}) : helper)))
    + "</td>\n                <td>"
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "</td>\n              </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "<!doctype html>\n\n";
  stack1 = this.invokePartial(partials.header, '    ', 'header', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <!-- hijacking: on/off - animation: none/scaleDown/rotate/gallery/catch/opacity/fixed/parallax -->\n    <body data-hijacking=\"on\" data-animation=\"parallax\">\n\n        <section class=\"cd-section visible\">\n            <div>\n                <div class=\"cd-section__wrapper\">\n                    <div class=\"cd-section__container one\">\n                        <h1>A look back at the future of our communication.</h1>\n                        <p>A collection of little-known, non-standard punctuation marks, curated with the goal of bringing them to acceptance in today’s written language.</p>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <script id=\"some-template\" type=\"text/x-handlebars-template\">\n        <table>\n          <thead>\n            <th>Username</th>\n            <th>Real Name</th>\n            <th>Email</th>\n          </thead>\n          <tbody>\n";
  stack1 = ((helper = (helper = helpers.users || (depth0 != null ? depth0.users : depth0)) != null ? helper : helperMissing),(options={"name":"users","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.users) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </tbody>\n        </table>\n      </script>\n\n        <section class=\"cd-section\">\n            <div>\n                <div class=\"cd-section__wrapper\">\n                    <div class=\"cd-section__container punctuation-container two\">\n                        <a href=\"#\" class=\"how-to-use\"> . . .?</a>\n                        <h1 class=\"punctuation-title\">\n\n                            <!-- For mobile only -->\n                            <svg class=\"punctuation-icon--mobile\" xmlns=\"http://www.w3.org/2000/svg\" width=\"23.8\" height=\"158.8\" viewBox=\"0 0 23.8 158.8\"><path d=\"M5.7 96l-3.2-96h18.8l-3.2 96h-12.4zM7.6 158.8l-7.6-6.2c6.4-4.2 12.2-12 13-18.6-.4.2-1.8.4-2.8.4-5.4 0-9.6-4.4-9.6-10.2 0-5.8 4.6-10.8 10.6-10.8 6.8 0 12.6 5.6 12.6 15.2 0 12.2-7 23.6-16.2 30.2z\"/></svg>\n\n                            Exclamation<br>Comma\n\n                        </h1>\n                        <p class=\"tag\">Invented</p>\n                        <p class=\"punctuation-body\"> 1943; Sigmund Silber, Leonard Storch, Haagen Ernst</p>\n                        <p class=\"tag\">Description</p>\n                        <p class=\"punctuation-body\">Now you can be excited or inquisitive without having to end a sentence! A Canadian patent was filed for these in 1992, but it lapsed in 1995, so use them freely, but not too often.</p>\n                    </div>\n                    <div class=\"cd-section__container icon__container one-icon\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"23.8\" height=\"158.8\" viewBox=\"0 0 23.8 158.8\"><path d=\"M5.7 96l-3.2-96h18.8l-3.2 96h-12.4zM7.6 158.8l-7.6-6.2c6.4-4.2 12.2-12 13-18.6-.4.2-1.8.4-2.8.4-5.4 0-9.6-4.4-9.6-10.2 0-5.8 4.6-10.8 10.6-10.8 6.8 0 12.6 5.6 12.6 15.2 0 12.2-7 23.6-16.2 30.2z\"/></svg>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"cd-section\">\n            <div>\n                <div class=\"cd-section__wrapper\">\n                    <div class=\"cd-section__container punctuation-container two\">\n                        <a href=\"#\" class=\"how-to-use\"> . . .?</a>\n\n\n\n                        <h1 class=\"punctuation-title\">\n\n                            <!-- For mobile only -->\n                            <svg class=\"punctuation-icon--mobile\" xmlns=\"http://www.w3.org/2000/svg\" width=\"143.2\" height=\"135.4\" viewBox=\"0 0 143.2 135.4\"><path d=\"M111 1.5c-15-3.3-28.4-1.1-39.4 5.3-11-6.4-24.4-8.6-39.4-5.3-23.8 5.4-35.2 22-31.5 38.8 6.6 29.5 44.8 23.6 49.1 42.7.7 3.1-.2 7.4-3 10.5l13.1 2.6c4.3-5.7 5.2-11.6 3.8-17.7-5.5-24.7-41.1-18.8-45.7-39.5-2.2-9.8 3.6-19.9 18.8-23.2 14.8-3.3 25.4.9 34.8 9 9.4-8.1 20-12.4 34.8-9 15.2 3.4 21 13.5 18.8 23.2-4.6 20.7-40.2 14.8-45.7 39.6-1.3 6.1-.4 12 3.8 17.7l13.1-2.6c-2.8-3.1-3.7-7.4-3-10.5 4.3-19.1 42.5-13.3 49.1-42.7 3.8-16.9-7.7-33.5-31.5-38.9zM69.5 113.7c-5.9 1.3-9.6 7.3-8.3 13.1 1.3 5.9 7.3 9.6 13.1 8.3 5.9-1.3 9.6-7.3 8.3-13.1-1.3-5.8-7.3-9.6-13.1-8.3z\"/></svg>\n\n                            Love Point\n\n                        </h1>\n\n                        <p class=\"tag\">Invented</p>\n                        <p class=\"punctuation-body\"> 1943; Sigmund Silber, Leonard Storch, Haagen Ernst</p>\n                        <p class=\"tag\">Description</p>\n                        <p class=\"punctuation-body\">Now you can be excited or inquisitive without having to end a sentence! A Canadian patent was filed for these in 1992, but it lapsed in 1995, so use them freely, but not too often.</p>\n                    </div>\n                    <div class=\"cd-section__container icon__container one-icon\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"143.2\" height=\"135.4\" viewBox=\"0 0 143.2 135.4\"><path d=\"M111 1.5c-15-3.3-28.4-1.1-39.4 5.3-11-6.4-24.4-8.6-39.4-5.3-23.8 5.4-35.2 22-31.5 38.8 6.6 29.5 44.8 23.6 49.1 42.7.7 3.1-.2 7.4-3 10.5l13.1 2.6c4.3-5.7 5.2-11.6 3.8-17.7-5.5-24.7-41.1-18.8-45.7-39.5-2.2-9.8 3.6-19.9 18.8-23.2 14.8-3.3 25.4.9 34.8 9 9.4-8.1 20-12.4 34.8-9 15.2 3.4 21 13.5 18.8 23.2-4.6 20.7-40.2 14.8-45.7 39.6-1.3 6.1-.4 12 3.8 17.7l13.1-2.6c-2.8-3.1-3.7-7.4-3-10.5 4.3-19.1 42.5-13.3 49.1-42.7 3.8-16.9-7.7-33.5-31.5-38.9zM69.5 113.7c-5.9 1.3-9.6 7.3-8.3 13.1 1.3 5.9 7.3 9.6 13.1 8.3 5.9-1.3 9.6-7.3 8.3-13.1-1.3-5.8-7.3-9.6-13.1-8.3z\"/></svg>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"cd-section\">\n            <div>\n                <div class=\"cd-section__wrapper\">\n                    <div class=\"cd-section__container\">\n                        <h2>A look back at the future of our communication.</h2>\n                        <p>A collection of little-known, non-standard punctuation marks, curated with the goal of bringing them to acceptance in today’s written language.</p>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"cd-section\">\n            <div>\n                <div class=\"cd-section__wrapper\">\n                    <div class=\"cd-section__container\">\n                        <h2>A look back at the future of our communication.</h2>\n                        <p>A collection of little-known, non-standard punctuation marks, curated with the goal of bringing them to acceptance in today’s written language.</p>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <!-- <nav>\n            <ul class=\"cd-vertical-nav\">\n                <li><a href=\"#0\" class=\"cd-prev inactive\">Next</a></li>\n                <li><a href=\"#0\" class=\"cd-next\">Prev</a></li>\n            </ul>\n        </nav> -->\n\n";
  stack1 = this.invokePartial(partials.footer, '        ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </body>\n</html>\n";
},"usePartial":true,"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map