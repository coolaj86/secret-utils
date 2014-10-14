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

secretutils.url64(96);
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

### .createShadow()

`createShadow(secret[, hashtype[, salt ]])`

```javascript
secretutils.createShadow("secret");

// output
{ salt: '8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc='
, shadow: 'f486460617d1501b51e6807c5e4f2ded'
, hashtype: 'md5'
}
```

Given a secret (password, passphrase, etc), returns a shadow, hashtype, and salt.

`hashtype` defaults to `md5` (despite collisions being possible, I'd hardly say that md5 is "broken")

`salt` defaults to `url64(32)`



### .testSecret()

`testSecret(salt, secret, shadow[, hashtype ])`

```javascript
secretutils.testSecret('8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc=', "secret", 'f486460617d1501b51e6807c5e4f2ded');
// true
```

Given a salt, secret, shadow (and hashtype), determine if the secret matches the shadow.

`hashtype` defaults to `md5`

returns `true` or `false`

### .genSalt()

`genSalt(len)`

```javascript
secretutils.genSalt(32);
// '8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc='
```

Alias of `.url64(len)`

### .url64()

`url64(len)`

```javascript
secretutils.url64(32);
// '8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc='
```

Creates a url-safe base64 string with a given entropy

NOTE that a length of 96 bytes would become a 128-char string

Source:

```javascript
crypto.randomBytes(len || 32)
  .toString('base64')
 .replace(/\+/g, '-')     // Convert '+' to '-'
 .replace(/\//g, '_')     // Convert '/' to '_'
 .replace(/=+$/, '')      // Remove ending '='
 ;
```

### .random()

`random(len[, encoding])`

```javascript
secretutils.random(32);
// <Buffer ce ef 12 c3 47 a9 98 88 1f ... >
```

Generate a securely random `Buffer` with `len` bytes of entropy, optionally encoded as a string.

### .int()

`int(min, max)`

```javascript
secretutils.int(1, 6);
// 1
```

Generate a securely random 48-bit integer.

### .hashsum()

`hashsum(hashtype, str)`

```javascript
secretutils.hashsum('md5', '8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc=' + 'secret');
// 'f486460617d1501b51e6807c5e4f2ded'
```

Return the hash of a given string. Useful for short strings, not for large buffers.

Source:

```javascript
return require('crypto').createHash(hashtype).update(val).digest('hex');
```

### .md5sum()

`md5sum(str)`

```javascript
secretutils.md5sum('8B3Mfmrt5kXVg9nfIFHxUY9F4ii3bIJGKr7uoQHsTgc=' + 'secret');
// 'f486460617d1501b51e6807c5e4f2ded'
```

Return the md5sum of a given string. Useful for short strings, not for large buffers.

Source:

```javascript
return require('crypto').createHash('md5').update(val).digest('hex');
```

### .alphanum()

`alphanum(len)`

```javascript
secretutils.alphanum(16);
// ktp827asite9kp7x
```

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
