'use strict';

var crypto = require('crypto')
  ;

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getInsecureRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function alphanum(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length
    , i
    ;

  for (i = 0; i < len; i += 1) {
    buf.push(chars[getInsecureRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}

function int(min, max) {
    // rand, randInt(min, max), randRange(n) [0-n)
  var secRand = require('crypto-rand')
    ;  

  return secRand.randInt(min, max);
}

function url64(len) {
  var UrlSafeBase64 = require('urlsafe-base64')
    ;

  return UrlSafeBase64.encode(crypto.randomBytes(len || 32));
}

function createShadow(secret, hashtype, salt) {
  hashtype = hashtype || 'md5';

  if (!salt) {
    salt = url64(32);
  }

  var hash = crypto.createHash(hashtype)
    , shadow
    ;

  hash.update(salt);
  hash.update(secret);
  shadow = hash.digest('hex');

  return { salt: salt, shadow: shadow, hashtype: hashtype };
}

function random(len, encoding) {
  if (encoding) {
    return crypto.randomBytes(len || 32).toString(encoding);
  } else {
    return crypto.randomBytes(len || 32);
  }
}

function testSecret(salt, secret, shadow, hashtype) {
  hashtype = hashtype || 'md5';

  var hash = crypto.createHash(hashtype)
    ;

  hash.update(salt);
  hash.update(secret);

  return shadow === hash.digest('hex');
}

function md5sum(val) {
  return crypto.createHash('md5').update(val).digest('hex');
}

function hashsum(hashtype, val) {
  return crypto.createHash(hashtype).update(val).digest('hex');
}

// deprecated
module.exports.createSecretHash = createShadow;
module.exports.testSecretHash = testSecret;
module.exports.randomBytes = random;
module.exports.testShadow = testSecret;

// API
module.exports.createShadow = createShadow;
module.exports.testSecret = testSecret;
module.exports.url64 = url64;
module.exports.genSalt = url64;
module.exports.random = random;
module.exports.alphanum = alphanum;
module.exports.int = int;
module.exports.md5sum = md5sum;
module.exports.hashsum = hashsum;
