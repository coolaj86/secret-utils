secret-utils
============

Common `crypto` snippets (generate random bytes, salt, hash password, etc)

You should use the Node.js modules for `bcrypt` or `scrypt`,
but if you'd rather have pure Node.js JavaScript without compiled modules,
well, here you go.

```bash
npm install secret-utils
```

```javascript
var secretutils = require('secret-utils')
  ;

secretutils.url64(92);
// NOTE: 96 bytes becomes a 128-char string
```

API
===

  * createShadow
  * testSecret
  * url64
  * random
  * int
  * hashsum
  * md5sum
  * alphanum

#### `createShadow(secret[, hashtype[, salt ]])`

Given a secret (password, passphrase, etc), returns a shadow, hashtype, and salt.

`hashtype` defaults to `md5` (despite collisions being possible, I'd hardly say that md5 is "broken")

`salt` defaults to `url64(32)`

```javascript
{ salt: '8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc='
, shadow: 'f486460617d1501b51e6807c5e4f2ded'
, hashtype: 'md5'
}
```

#### `testSecret(salt, secret, shadow[, hashtype ])`

Given a salt, secret, shadow (and hashtype), determine if the secret matches the shadow.

`hashtype` defaults to `md5`

returns `true` or `false`

#### `genSalt(len)`

Creates some salt like so: `return url64(len || 32);`

#### `url64(len)`

Creates a url-safe base64 string with a given entropy

```javascript
crypto.randomBytes(len || 32)
  .toString('base64')
 .replace(/\+/g, '-')     // Convert '+' to '-'
 .replace(/\//g, '_')     // Convert '/' to '_'
 .replace(/=+$/, '')      // Remove ending '='
 ;
```

#### `random(len[, encoding])`

Generate a securely random `Buffer` with `len` bytes of entropy, optionally encoded as a string.

#### `int(min, max)`

Generate a securely random 48-bit integer.

#### `hashsum(hashtype, str)`

Return the hash of a given string. Useful for short strings, not for large buffers.

```javascript
return require('crypto').createHash(hashtype).update(val).digest('hex');
```

#### `md5sum(str)`

Return the md5sum of a given string. Useful for short strings, not for large buffers.

```javascript
return require('crypto').createHash('md5').update(val).digest('hex');
```

#### `alphanum(len)`

Return an alphanumeric (A-Za-z0-9) string (insecure, using `Math.random()`).

Why?
====

Most of the `crypto` functions are built on a stream-esque API,
but many of the common use cases for crypto involve very short strings.

`md5sum(str)` is simply easier to read (and write) at-a-glance
than `require('crypto').createHash('md5').update(val).digest('hex');`

Removing a minor annoyance, that's all.

Thanks
======

Code snatched from

* `crypto-rand`
* `urlsafe-base64`
