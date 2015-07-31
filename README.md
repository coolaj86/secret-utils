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

secretutils.url64(32);
// '1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc'
```

API
===

  * createShadow
  * testSecret
  * url64
  * random
  * int
  * hashsum
  * sha1sum
  * sha256sum
  * alphanum

### .createShadow()

`createShadow(secret[, hashtype[, salt ]])`

```javascript
secretutils.createShadow("secret");

// output
{ salt: '1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc'
, shadow: '133f928c735d225a8221fdc613fc9c0c'
, hashtype: 'sha256'
}
```

Given a secret (password, passphrase, etc), returns a shadow, hashtype, and salt.

`hashtype` defaults to `sha256`

`salt` defaults to `url64(32)`



### .testSecret()

`testSecret(salt, secret, shadow[, hashtype ])`

```javascript
secretutils.testSecret('1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc', "secret", '133f928c735d225a8221fdc613fc9c0c');
// true
```

Given a salt, secret, shadow (and hashtype), determine if the secret matches the shadow.

`hashtype` defaults to `sha256`

returns `true` or `false`

### .genSalt()

`genSalt(len)`

```javascript
secretutils.genSalt(32);
// '1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc'
```

Alias of `.url64(len)`

### .url64()

`url64(len)`

```javascript
secretutils.url64(32);
// '1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc'
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
secretutils.hashsum('sha1', '1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc' + 'secret');
// '133f928c735d225a8221fdc613fc9c0c'
```

Return the hash of a given string. Useful for short strings, not for large buffers.

Source:

```javascript
return require('crypto').createHash(hashtype).update(val).digest('hex');
```

### .sha1sum()

`sha1sum(str)`

```javascript
secretutils.sha1sum('1cCk4GzgSDjbuFSRHOrte5_WHW02oYQwaxetY72UxPc' + 'secret');
// '133f928c735d225a8221fdc613fc9c0c'
```

Return the sha1sum of a given string. Useful for short strings, not for large buffers.

Source:

```javascript
return require('crypto').createHash('sha1').update(val).digest('hex');
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

`sha1sum(str)` is simply easier to read (and write) at-a-glance
than `require('crypto').createHash('sha1').update(val).digest('hex');`

Removing a minor annoyance, that's all.

Thanks
======

Code snatched from

* `crypto-rand`
* `urlsafe-base64`
