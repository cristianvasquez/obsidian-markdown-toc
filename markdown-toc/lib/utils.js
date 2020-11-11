'use strict';

/**
 * Module dependencies
 */

const diacritics = require('diacritics-map');

/**
 * Lazily required module dependencies
 */

// require('concat-stream', 'concat');
// require('gray-matter', 'matter');
// require('list-item', 'li');
const li = require('list-item')

// require('markdown-link', 'mdlink');
const mdlink = require('markdown-link')

// require('minimist');
// require('mixin-deep', 'merge');

const merge = require('mixin-deep')
// require('object.pick', 'pick');
const pick = require('object.pick')

// require('remarkable', 'Remarkable');
// require('repeat-string', 'repeat');
// require('strip-color');
const stripColor = require('strip-color')


/**
 * Get the "title" from a markdown link
 */

const getTitle = function(str) {
  if (/^\[[^\]]+]\(/.test(str)) {
    let m = /^\[([^\]]+)]/.exec(str);
    if (m) return m[1];
  }
  return str;
};

/**
 * Slugify the url part of a markdown link.
 *
 * @name  options.slugify
 * @param  {String} `str` The string to slugify
 * @param  {Object} `options` Pass a custom slugify function on `options.slugify`
 * @return {String}
 * @api public
 */

const slugify = function(str, options) {
  options = options || {};
  if (options.slugify === false) return str;
  if (typeof options.slugify === 'function') {
    return options.slugify(str, options);
  }

  str = getTitle(str);
  str = stripColor(str);
  str = str.toLowerCase();

  // `.split()` is often (but not always) faster than `.replace()`
  str = str.split(' ').join('-');
  str = str.split(/\t/).join('--');
  if (options.stripHeadingTags !== false) {
    str = str.split(/<\/?[^>]+>/).join('');
  }
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  str = replaceDiacritics(str);
  if (options.num) {
    str += '-' + options.num;
  }
  return str;
};

function replaceDiacritics(str) {
  return str.replace(/[À-ž]/g, function(ch) {
    return diacritics[ch] || ch;
  });
}

/**
 * Expose `utils` modules
 */

module.exports = {
  getTitle:getTitle,
  slugify:slugify,
  merge:merge,
  pick:pick,
  mdlink:mdlink,
  li:li
};
