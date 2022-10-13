(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  'use strict';
  var x;
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var ba =
    'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function ca(a) {
    a = [
      'object' == typeof globalThis && globalThis,
      a,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error('Cannot find global object');
  }
  var y = ca(this);
  function B(a, b) {
    if (b)
      a: {
        var c = y;
        a = a.split('.');
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d &&
          null != b &&
          ba(c, a, { configurable: !0, writable: !0, value: b });
      }
  }
  B('Symbol', function (a) {
    function b(g) {
      if (this instanceof b) throw new TypeError('Symbol is not a constructor');
      return new c(d + (g || '') + '_' + e++, g);
    }
    function c(g, f) {
      this.g = g;
      ba(this, 'description', { configurable: !0, writable: !0, value: f });
    }
    if (a) return a;
    c.prototype.toString = function () {
      return this.g;
    };
    var d = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      e = 0;
    return b;
  });
  B('Symbol.iterator', function (a) {
    if (a) return a;
    a = Symbol('Symbol.iterator');
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = y[b[c]];
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        ba(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return da(aa(this));
          },
        });
    }
    return a;
  });
  function da(a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function C(a) {
    var b =
      'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: aa(a) };
  }
  function ea(a) {
    if (!(a instanceof Array)) {
      a = C(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  var fa =
      'function' == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    ha;
  if ('function' == typeof Object.setPrototypeOf) ha = Object.setPrototypeOf;
  else {
    var ia;
    a: {
      var ja = { a: !0 },
        ka = {};
      try {
        ka.__proto__ = ja;
        ia = ka.a;
        break a;
      } catch (a) {}
      ia = !1;
    }
    ha = ia
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
          return a;
        }
      : null;
  }
  var la = ha;
  function D(a, b) {
    a.prototype = fa(b.prototype);
    a.prototype.constructor = a;
    if (la) la(a, b);
    else
      for (var c in b)
        if ('prototype' != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.ra = b.prototype;
  }
  function ma() {
    this.l = !1;
    this.i = null;
    this.h = void 0;
    this.g = 1;
    this.u = this.o = 0;
    this.j = null;
  }
  function na(a) {
    if (a.l) throw new TypeError('Generator is already running');
    a.l = !0;
  }
  ma.prototype.s = function (a) {
    this.h = a;
  };
  function oa(a, b) {
    a.j = { fa: b, ga: !0 };
    a.g = a.o || a.u;
  }
  ma.prototype.return = function (a) {
    this.j = { return: a };
    this.g = this.u;
  };
  function F(a, b, c) {
    a.g = c;
    return { value: b };
  }
  function pa(a) {
    this.g = new ma();
    this.h = a;
  }
  function qa(a, b) {
    na(a.g);
    var c = a.g.i;
    if (c)
      return ra(
        a,
        'return' in c
          ? c['return']
          : function (d) {
              return { value: d, done: !0 };
            },
        b,
        a.g.return
      );
    a.g.return(b);
    return G(a);
  }
  function ra(a, b, c, d) {
    try {
      var e = b.call(a.g.i, c);
      if (!(e instanceof Object))
        throw new TypeError('Iterator result ' + e + ' is not an object');
      if (!e.done) return (a.g.l = !1), e;
      var g = e.value;
    } catch (f) {
      return (a.g.i = null), oa(a.g, f), G(a);
    }
    a.g.i = null;
    d.call(a.g, g);
    return G(a);
  }
  function G(a) {
    for (; a.g.g; )
      try {
        var b = a.h(a.g);
        if (b) return (a.g.l = !1), { value: b.value, done: !1 };
      } catch (c) {
        (a.g.h = void 0), oa(a.g, c);
      }
    a.g.l = !1;
    if (a.g.j) {
      b = a.g.j;
      a.g.j = null;
      if (b.ga) throw b.fa;
      return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }
  function sa(a) {
    this.next = function (b) {
      na(a.g);
      a.g.i ? (b = ra(a, a.g.i.next, b, a.g.s)) : (a.g.s(b), (b = G(a)));
      return b;
    };
    this.throw = function (b) {
      na(a.g);
      a.g.i ? (b = ra(a, a.g.i['throw'], b, a.g.s)) : (oa(a.g, b), (b = G(a)));
      return b;
    };
    this.return = function (b) {
      return qa(a, b);
    };
    this[Symbol.iterator] = function () {
      return this;
    };
  }
  function ta(a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function g(f) {
        f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
      }
      g(a.next());
    });
  }
  function I(a) {
    return ta(new sa(new pa(a)));
  }
  B('Promise', function (a) {
    function b(f) {
      this.h = 0;
      this.i = void 0;
      this.g = [];
      this.s = !1;
      var h = this.j();
      try {
        f(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    }
    function c() {
      this.g = null;
    }
    function d(f) {
      return f instanceof b
        ? f
        : new b(function (h) {
            h(f);
          });
    }
    if (a) return a;
    c.prototype.h = function (f) {
      if (null == this.g) {
        this.g = [];
        var h = this;
        this.i(function () {
          h.l();
        });
      }
      this.g.push(f);
    };
    var e = y.setTimeout;
    c.prototype.i = function (f) {
      e(f, 0);
    };
    c.prototype.l = function () {
      for (; this.g && this.g.length; ) {
        var f = this.g;
        this.g = [];
        for (var h = 0; h < f.length; ++h) {
          var k = f[h];
          f[h] = null;
          try {
            k();
          } catch (l) {
            this.j(l);
          }
        }
      }
      this.g = null;
    };
    c.prototype.j = function (f) {
      this.i(function () {
        throw f;
      });
    };
    b.prototype.j = function () {
      function f(l) {
        return function (m) {
          k || ((k = !0), l.call(h, m));
        };
      }
      var h = this,
        k = !1;
      return { resolve: f(this.D), reject: f(this.l) };
    };
    b.prototype.D = function (f) {
      if (f === this)
        this.l(new TypeError('A Promise cannot resolve to itself'));
      else if (f instanceof b) this.H(f);
      else {
        a: switch (typeof f) {
          case 'object':
            var h = null != f;
            break a;
          case 'function':
            h = !0;
            break a;
          default:
            h = !1;
        }
        h ? this.A(f) : this.o(f);
      }
    };
    b.prototype.A = function (f) {
      var h = void 0;
      try {
        h = f.then;
      } catch (k) {
        this.l(k);
        return;
      }
      'function' == typeof h ? this.I(h, f) : this.o(f);
    };
    b.prototype.l = function (f) {
      this.u(2, f);
    };
    b.prototype.o = function (f) {
      this.u(1, f);
    };
    b.prototype.u = function (f, h) {
      if (0 != this.h)
        throw Error(
          'Cannot settle(' +
            f +
            ', ' +
            h +
            '): Promise already settled in state' +
            this.h
        );
      this.h = f;
      this.i = h;
      2 === this.h && this.G();
      this.B();
    };
    b.prototype.G = function () {
      var f = this;
      e(function () {
        if (f.C()) {
          var h = y.console;
          'undefined' !== typeof h && h.error(f.i);
        }
      }, 1);
    };
    b.prototype.C = function () {
      if (this.s) return !1;
      var f = y.CustomEvent,
        h = y.Event,
        k = y.dispatchEvent;
      if ('undefined' === typeof k) return !0;
      'function' === typeof f
        ? (f = new f('unhandledrejection', { cancelable: !0 }))
        : 'function' === typeof h
        ? (f = new h('unhandledrejection', { cancelable: !0 }))
        : ((f = y.document.createEvent('CustomEvent')),
          f.initCustomEvent('unhandledrejection', !1, !0, f));
      f.promise = this;
      f.reason = this.i;
      return k(f);
    };
    b.prototype.B = function () {
      if (null != this.g) {
        for (var f = 0; f < this.g.length; ++f) g.h(this.g[f]);
        this.g = null;
      }
    };
    var g = new c();
    b.prototype.H = function (f) {
      var h = this.j();
      f.M(h.resolve, h.reject);
    };
    b.prototype.I = function (f, h) {
      var k = this.j();
      try {
        f.call(h, k.resolve, k.reject);
      } catch (l) {
        k.reject(l);
      }
    };
    b.prototype.then = function (f, h) {
      function k(p, n) {
        return 'function' == typeof p
          ? function (q) {
              try {
                l(p(q));
              } catch (t) {
                m(t);
              }
            }
          : n;
      }
      var l,
        m,
        r = new b(function (p, n) {
          l = p;
          m = n;
        });
      this.M(k(f, l), k(h, m));
      return r;
    };
    b.prototype.catch = function (f) {
      return this.then(void 0, f);
    };
    b.prototype.M = function (f, h) {
      function k() {
        switch (l.h) {
          case 1:
            f(l.i);
            break;
          case 2:
            h(l.i);
            break;
          default:
            throw Error('Unexpected state: ' + l.h);
        }
      }
      var l = this;
      null == this.g ? g.h(k) : this.g.push(k);
      this.s = !0;
    };
    b.resolve = d;
    b.reject = function (f) {
      return new b(function (h, k) {
        k(f);
      });
    };
    b.race = function (f) {
      return new b(function (h, k) {
        for (var l = C(f), m = l.next(); !m.done; m = l.next())
          d(m.value).M(h, k);
      });
    };
    b.all = function (f) {
      var h = C(f),
        k = h.next();
      return k.done
        ? d([])
        : new b(function (l, m) {
            function r(q) {
              return function (t) {
                p[q] = t;
                n--;
                0 == n && l(p);
              };
            }
            var p = [],
              n = 0;
            do
              p.push(void 0),
                n++,
                d(k.value).M(r(p.length - 1), m),
                (k = h.next());
            while (!k.done);
          });
    };
    return b;
  });
  function ua(a, b) {
    a instanceof String && (a += '');
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var g = c++;
            return { value: b(g, a[g]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  var va =
    'function' == typeof Object.assign
      ? Object.assign
      : function (a, b) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
              for (var e in d)
                Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  B('Object.assign', function (a) {
    return a || va;
  });
  B('Object.is', function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  B('Array.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var g = d[c];
            if (g === b || Object.is(g, b)) return !0;
          }
          return !1;
        };
  });
  B('String.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          if (null == this)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined"
            );
          if (b instanceof RegExp)
            throw new TypeError(
              'First argument to String.prototype.includes must not be a regular expression'
            );
          return -1 !== this.indexOf(b, c || 0);
        };
  });
  B('Array.prototype.keys', function (a) {
    return a
      ? a
      : function () {
          return ua(this, function (b) {
            return b;
          });
        };
  });
  var wa = this || self;
  function J(a, b) {
    a = a.split('.');
    var c = wa;
    a[0] in c ||
      'undefined' == typeof c.execScript ||
      c.execScript('var ' + a[0]);
    for (var d; a.length && (d = a.shift()); )
      a.length || void 0 === b
        ? c[d] && c[d] !== Object.prototype[d]
          ? (c = c[d])
          : (c = c[d] = {})
        : (c[d] = b);
  }
  function K() {
    throw Error('Invalid UTF8');
  }
  function xa(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b;
  }
  var ya,
    za = 'undefined' !== typeof TextDecoder,
    Aa,
    Ba = 'undefined' !== typeof TextEncoder;
  var Ca = {},
    L = null;
  function Da(a) {
    var b;
    void 0 === b && (b = 0);
    Ea();
    b = Ca[b];
    for (
      var c = Array(Math.floor(a.length / 3)), d = b[64] || '', e = 0, g = 0;
      e < a.length - 2;
      e += 3
    ) {
      var f = a[e],
        h = a[e + 1],
        k = a[e + 2],
        l = b[f >> 2];
      f = b[((f & 3) << 4) | (h >> 4)];
      h = b[((h & 15) << 2) | (k >> 6)];
      k = b[k & 63];
      c[g++] = l + f + h + k;
    }
    l = 0;
    k = d;
    switch (a.length - e) {
      case 2:
        (l = a[e + 1]), (k = b[(l & 15) << 2] || d);
      case 1:
        (a = a[e]), (c[g] = b[a >> 2] + b[((a & 3) << 4) | (l >> 4)] + k + d);
    }
    return c.join('');
  }
  function Fa(a) {
    var b = a.length,
      c = (3 * b) / 4;
    c % 3
      ? (c = Math.floor(c))
      : -1 != '=.'.indexOf(a[b - 1]) &&
        (c = -1 != '=.'.indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
      e = 0;
    Ga(a, function (g) {
      d[e++] = g;
    });
    return e !== c ? d.subarray(0, e) : d;
  }
  function Ga(a, b) {
    function c(k) {
      for (; d < a.length; ) {
        var l = a.charAt(d++),
          m = L[l];
        if (null != m) return m;
        if (!/^[\s\xa0]*$/.test(l))
          throw Error('Unknown base64 encoding at char: ' + l);
      }
      return k;
    }
    Ea();
    for (var d = 0; ; ) {
      var e = c(-1),
        g = c(0),
        f = c(64),
        h = c(64);
      if (64 === h && -1 === e) break;
      b((e << 2) | (g >> 4));
      64 != f &&
        (b(((g << 4) & 240) | (f >> 2)), 64 != h && b(((f << 6) & 192) | h));
    }
  }
  function Ea() {
    if (!L) {
      L = {};
      for (
        var a =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
              ''
            ),
          b = ['+/=', '+/', '-_=', '-_.', '-_'],
          c = 0;
        5 > c;
        c++
      ) {
        var d = a.concat(b[c].split(''));
        Ca[c] = d;
        for (var e = 0; e < d.length; e++) {
          var g = d[e];
          void 0 === L[g] && (L[g] = e);
        }
      }
    }
  }
  var Ha = 'function' === typeof Uint8Array;
  function Ia(a) {
    return Ha && null != a && a instanceof Uint8Array;
  }
  var Ja;
  function Ka(a) {
    this.L = a;
    if (null !== a && 0 === a.length)
      throw Error('ByteString should be constructed with non-empty values');
  }
  var La = 'function' === typeof Uint8Array.prototype.slice,
    M = 0,
    N = 0;
  function Ma(a, b) {
    if (a.constructor === Uint8Array) return a;
    if (a.constructor === ArrayBuffer) return new Uint8Array(a);
    if (a.constructor === Array) return new Uint8Array(a);
    if (a.constructor === String) return Fa(a);
    if (a.constructor === Ka) {
      if (!b && (b = a.L) && b.constructor === Uint8Array) return b;
      b = a.L;
      b = null == b || Ia(b) ? b : 'string' === typeof b ? Fa(b) : null;
      return (a = a.L = b) ? new Uint8Array(a) : Ja || (Ja = new Uint8Array(0));
    }
    if (a instanceof Uint8Array)
      return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    throw Error(
      'Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers'
    );
  }
  function Na(a, b) {
    return Error('Invalid wire type: ' + a + ' (at position ' + b + ')');
  }
  function Oa() {
    return Error('Failed to read varint, encoding is invalid.');
  }
  function Pa(a, b) {
    b = void 0 === b ? {} : b;
    b = void 0 === b.v ? !1 : b.v;
    this.h = null;
    this.g = this.i = this.j = 0;
    this.v = b;
    a && Qa(this, a);
  }
  function Qa(a, b) {
    a.h = Ma(b, a.v);
    a.j = 0;
    a.i = a.h.length;
    a.g = a.j;
  }
  Pa.prototype.reset = function () {
    this.g = this.j;
  };
  function O(a) {
    if (a.g > a.i)
      throw Error(
        'Tried to read past the end of the data ' + a.g + ' > ' + a.i
      );
  }
  function Q(a) {
    var b = a.h,
      c = b[a.g],
      d = c & 127;
    if (128 > c) return (a.g += 1), O(a), d;
    c = b[a.g + 1];
    d |= (c & 127) << 7;
    if (128 > c) return (a.g += 2), O(a), d;
    c = b[a.g + 2];
    d |= (c & 127) << 14;
    if (128 > c) return (a.g += 3), O(a), d;
    c = b[a.g + 3];
    d |= (c & 127) << 21;
    if (128 > c) return (a.g += 4), O(a), d;
    c = b[a.g + 4];
    a.g += 5;
    d |= (c & 15) << 28;
    if (128 > c) return O(a), d;
    if (
      128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      128 <= b[a.g++]
    )
      throw Oa();
    O(a);
    return d;
  }
  var Ra = [];
  function Sa() {
    this.g = [];
  }
  Sa.prototype.length = function () {
    return this.g.length;
  };
  Sa.prototype.end = function () {
    var a = this.g;
    this.g = [];
    return a;
  };
  function R(a, b) {
    for (; 127 < b; ) a.g.push((b & 127) | 128), (b >>>= 7);
    a.g.push(b);
  }
  function Ta(a) {
    var b = {},
      c = void 0 === b.W ? !1 : b.W;
    this.l = { v: void 0 === b.v ? !1 : b.v };
    this.W = c;
    b = this.l;
    Ra.length
      ? ((c = Ra.pop()), b && (c.v = b.v), a && Qa(c, a), (a = c))
      : (a = new Pa(a, b));
    this.g = a;
    this.j = this.g.g;
    this.h = this.i = -1;
  }
  Ta.prototype.reset = function () {
    this.g.reset();
    this.j = this.g.g;
    this.h = this.i = -1;
  };
  function Ua(a) {
    var b = a.g;
    if (b.g == b.i) return !1;
    a.j = a.g.g;
    var c = Q(a.g) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(0 <= c && 5 >= c)) throw Na(c, a.j);
    if (1 > b)
      throw Error('Invalid field number: ' + b + ' (at position ' + a.j + ')');
    a.i = b;
    a.h = c;
    return !0;
  }
  function Va(a) {
    switch (a.h) {
      case 0:
        if (0 != a.h) Va(a);
        else
          a: {
            a = a.g;
            for (var b = a.g, c = b + 10; b < c; )
              if (0 === (a.h[b++] & 128)) {
                a.g = b;
                O(a);
                break a;
              }
            throw Oa();
          }
        break;
      case 1:
        a = a.g;
        a.g += 8;
        O(a);
        break;
      case 2:
        2 != a.h ? Va(a) : ((b = Q(a.g) >>> 0), (a = a.g), (a.g += b), O(a));
        break;
      case 5:
        a = a.g;
        a.g += 4;
        O(a);
        break;
      case 3:
        b = a.i;
        do {
          if (!Ua(a)) throw Error('Unmatched start-group tag: stream EOF');
          if (4 == a.h) {
            if (a.i != b) throw Error('Unmatched end-group tag');
            break;
          }
          Va(a);
        } while (1);
        break;
      default:
        throw Na(a.h, a.j);
    }
  }
  var Wa = [];
  function Xa() {
    this.i = [];
    this.h = 0;
    this.g = new Sa();
  }
  function S(a, b) {
    0 !== b.length && (a.i.push(b), (a.h += b.length));
  }
  function Ya(a, b) {
    if ((b = b.ca)) {
      S(a, a.g.end());
      for (var c = 0; c < b.length; c++) S(a, b[c]);
    }
  }
  var T =
    'function' === typeof Symbol && 'symbol' === typeof Symbol()
      ? Symbol(void 0)
      : void 0;
  function Za(a, b) {
    Object.isFrozen(a) ||
      (T
        ? (a[T] |= b)
        : void 0 !== a.N
        ? (a.N |= b)
        : Object.defineProperties(a, {
            N: { value: b, configurable: !0, writable: !0, enumerable: !1 },
          }));
  }
  function $a(a) {
    var b;
    T ? (b = a[T]) : (b = a.N);
    return null == b ? 0 : b;
  }
  function U(a) {
    Za(a, 1);
    return a;
  }
  function ab(a) {
    return Array.isArray(a) ? !!($a(a) & 2) : !1;
  }
  function bb(a) {
    if (!Array.isArray(a)) throw Error('cannot mark non-array as immutable');
    Za(a, 2);
  }
  function cb(a) {
    return (
      null !== a &&
      'object' === typeof a &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  var db = Object.freeze(U([]));
  function eb(a) {
    if (ab(a.m)) throw Error('Cannot mutate an immutable Message');
  }
  var fb =
    'undefined' != typeof Symbol && 'undefined' != typeof Symbol.hasInstance;
  function gb(a) {
    return { value: a, configurable: !1, writable: !1, enumerable: !1 };
  }
  function V(a, b, c) {
    return -1 === b
      ? null
      : b >= a.i
      ? a.g
        ? a.g[b]
        : void 0
      : (void 0 === c ? 0 : c) && a.g && ((c = a.g[b]), null != c)
      ? c
      : a.m[b + a.h];
  }
  function W(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    eb(a);
    b < a.i && !d
      ? (a.m[b + a.h] = c)
      : ((a.g || (a.g = a.m[a.i + a.h] = {}))[b] = c);
  }
  function hb(a, b, c, d) {
    c = void 0 === c ? !0 : c;
    d = void 0 === d ? !1 : d;
    var e = V(a, b, d);
    null == e && (e = db);
    if (ab(a.m)) c && (bb(e), Object.freeze(e));
    else if (e === db || ab(e)) (e = U(e.slice())), W(a, b, e, d);
    return e;
  }
  function X(a, b, c) {
    a = V(a, b);
    a = null == a ? a : +a;
    return null == a ? (void 0 === c ? 0 : c) : a;
  }
  function ib(a, b, c, d) {
    a.j || (a.j = {});
    var e = ab(a.m),
      g = a.j[c];
    if (!g) {
      d = hb(a, c, !0, void 0 === d ? !1 : d);
      g = [];
      e = e || ab(d);
      for (var f = 0; f < d.length; f++) (g[f] = new b(d[f])), e && bb(g[f].m);
      e && (bb(g), Object.freeze(g));
      a.j[c] = g;
    }
    return g;
  }
  function jb(a, b, c, d, e) {
    var g = void 0 === g ? !1 : g;
    eb(a);
    g = ib(a, c, b, g);
    c = d ? d : new c();
    a = hb(a, b);
    void 0 != e
      ? (g.splice(e, 0, c), a.splice(e, 0, c.m))
      : (g.push(c), a.push(c.m));
    return c;
  }
  function kb(a, b) {
    a = V(a, b);
    return null == a ? 0 : a;
  }
  function lb(a, b) {
    a = V(a, b);
    return null == a ? '' : a;
  }
  function mb(a) {
    switch (typeof a) {
      case 'number':
        return isFinite(a) ? a : String(a);
      case 'object':
        if (a && !Array.isArray(a)) {
          if (Ia(a)) return Da(a);
          if (a instanceof Ka) {
            var b = a.L;
            b =
              null == b || 'string' === typeof b
                ? b
                : Ha && b instanceof Uint8Array
                ? Da(b)
                : null;
            return (a.L = b) || '';
          }
        }
    }
    return a;
  }
  function nb(a) {
    var b = ob;
    b = void 0 === b ? pb : b;
    return qb(a, b);
  }
  function rb(a, b) {
    if (null != a) {
      if (Array.isArray(a)) a = qb(a, b);
      else if (cb(a)) {
        var c = {},
          d;
        for (d in a) c[d] = rb(a[d], b);
        a = c;
      } else a = b(a);
      return a;
    }
  }
  function qb(a, b) {
    for (var c = a.slice(), d = 0; d < c.length; d++) c[d] = rb(c[d], b);
    Array.isArray(a) && $a(a) & 1 && U(c);
    return c;
  }
  function ob(a) {
    if (a && 'object' == typeof a && a.toJSON) return a.toJSON();
    a = mb(a);
    return Array.isArray(a) ? nb(a) : a;
  }
  function pb(a) {
    return Ia(a) ? new Uint8Array(a) : a;
  }
  function sb(a, b, c) {
    a || (a = tb);
    tb = null;
    var d = this.constructor.h;
    a || (a = d ? [d] : []);
    this.h = (d ? 0 : -1) - (this.constructor.g || 0);
    this.j = void 0;
    this.m = a;
    a: {
      d = this.m.length;
      a = d - 1;
      if (d && ((d = this.m[a]), cb(d))) {
        this.i = a - this.h;
        this.g = d;
        break a;
      }
      void 0 !== b && -1 < b
        ? ((this.i = Math.max(b, a + 1 - this.h)), (this.g = void 0))
        : (this.i = Number.MAX_VALUE);
    }
    if (c)
      for (b = 0; b < c.length; b++)
        if (((a = c[b]), a < this.i))
          (a += this.h),
            (d = this.m[a]) ? Array.isArray(d) && U(d) : (this.m[a] = db);
        else {
          d = this.g || (this.g = this.m[this.i + this.h] = {});
          var e = d[a];
          e ? Array.isArray(e) && U(e) : (d[a] = db);
        }
  }
  sb.prototype.toJSON = function () {
    return nb(this.m);
  };
  sb.prototype.toString = function () {
    return this.m.toString();
  };
  var tb;
  function ub() {
    sb.apply(this, arguments);
  }
  D(ub, sb);
  if (fb) {
    var vb = {};
    Object.defineProperties(
      ub,
      ((vb[Symbol.hasInstance] = gb(function () {
        throw Error('Cannot perform instanceof checks for MutableMessage');
      })),
      vb)
    );
  }
  function wb(a, b, c) {
    if (c) {
      var d = {},
        e;
      for (e in c) {
        var g = c[e],
          f = g.ja;
        f ||
          ((d.F = g.pa || g.ha.P),
          g.ba
            ? ((d.U = xb(g.ba)),
              (f = (function (h) {
                return function (k, l, m) {
                  return h.F(k, l, m, h.U);
                };
              })(d)))
            : g.da
            ? ((d.T = yb(g.X.g, g.da)),
              (f = (function (h) {
                return function (k, l, m) {
                  return h.F(k, l, m, h.T);
                };
              })(d)))
            : (f = d.F),
          (g.ja = f));
        f(b, a, g.X);
        d = { F: d.F, U: d.U, T: d.T };
      }
    }
    Ya(b, a);
  }
  var zb = Symbol();
  function Ab(a, b, c) {
    return (
      a[zb] ||
      (a[zb] = function (d, e) {
        return b(d, e, c);
      })
    );
  }
  function Bb(a) {
    var b = a[zb];
    if (!b) {
      var c = Cb(a);
      b = function (d, e) {
        return Db(d, e, c);
      };
      a[zb] = b;
    }
    return b;
  }
  function Eb(a) {
    var b = a.ba;
    if (b) return Bb(b);
    if ((b = a.oa)) return Ab(a.X.g, b, a.da);
  }
  function Fb(a) {
    var b = Eb(a),
      c = a.X,
      d = a.ha.O;
    return b
      ? function (e, g) {
          return d(e, g, c, b);
        }
      : function (e, g) {
          return d(e, g, c);
        };
  }
  function Gb(a, b, c, d, e, g) {
    a = a();
    var f = 0;
    a.length && 'number' !== typeof a[0] && (c(b, a[0]), f++);
    for (; f < a.length; ) {
      c = a[f++];
      for (var h = f + 1; h < a.length && 'number' !== typeof a[h]; ) h++;
      var k = a[f++];
      h -= f;
      switch (h) {
        case 0:
          d(b, c, k);
          break;
        case 1:
          d(b, c, k, a[f++]);
          break;
        case 2:
          e(b, c, k, a[f++], a[f++]);
          break;
        case 3:
          h = a[f++];
          var l = a[f++],
            m = a[f++];
          Array.isArray(m) ? e(b, c, k, h, l, m) : g(b, c, k, h, l, m);
          break;
        case 4:
          g(b, c, k, a[f++], a[f++], a[f++], a[f++]);
          break;
        default:
          throw Error('unexpected number of binary field arguments: ' + h);
      }
    }
    return b;
  }
  var Hb = Symbol();
  function xb(a) {
    var b = a[Hb];
    if (!b) {
      var c = Ib(a);
      b = function (d, e) {
        return Jb(d, e, c);
      };
      a[Hb] = b;
    }
    return b;
  }
  function yb(a, b) {
    var c = a[Hb];
    c ||
      ((c = function (d, e) {
        return wb(d, e, b);
      }),
      (a[Hb] = c));
    return c;
  }
  var Kb = Symbol();
  function Lb(a, b) {
    a.push(b);
  }
  function Mb(a, b, c) {
    a.push(b, c.P);
  }
  function Nb(a, b, c, d, e) {
    var g = xb(e),
      f = c.P;
    a.push(b, function (h, k, l) {
      return f(h, k, l, d, g);
    });
  }
  function Ob(a, b, c, d, e, g) {
    var f = yb(d, g),
      h = c.P;
    a.push(b, function (k, l, m) {
      return h(k, l, m, d, f);
    });
  }
  function Ib(a) {
    var b = a[Kb];
    return b ? b : Gb(a, (a[Kb] = []), Lb, Mb, Nb, Ob);
  }
  var Pb = Symbol();
  function Qb(a, b) {
    a[0] = b;
  }
  function Rb(a, b, c, d) {
    var e = c.O;
    a[b] = d
      ? function (g, f, h) {
          return e(g, f, h, d);
        }
      : e;
  }
  function Sb(a, b, c, d, e, g) {
    var f = c.O,
      h = Bb(e);
    a[b] = function (k, l, m) {
      return f(k, l, m, d, h, g);
    };
  }
  function Tb(a, b, c, d, e, g, f) {
    var h = c.O,
      k = Ab(d, e, g);
    a[b] = function (l, m, r) {
      return h(l, m, r, d, k, f);
    };
  }
  function Cb(a) {
    var b = a[Pb];
    return b ? b : Gb(a, (a[Pb] = {}), Qb, Rb, Sb, Tb);
  }
  function Db(a, b, c) {
    for (; Ua(b) && 4 != b.h; ) {
      var d = b.i,
        e = c[d];
      if (!e) {
        var g = c[0];
        g && (g = g[d]) && (e = c[d] = Fb(g));
      }
      if (!e || !e(b, a, d))
        if (((e = b), (d = a), (g = e.j), Va(e), !e.W)) {
          var f = e.g.h;
          e = e.g.g;
          e =
            g === e
              ? Ja || (Ja = new Uint8Array(0))
              : La
              ? f.slice(g, e)
              : new Uint8Array(f.subarray(g, e));
          (g = d.ca) ? g.push(e) : (d.ca = [e]);
        }
    }
    return a;
  }
  function Ub(a, b, c) {
    if (Wa.length) {
      var d = Wa.pop();
      a && (Qa(d.g, a), (d.i = -1), (d.h = -1));
      a = d;
    } else a = new Ta(a);
    try {
      return Db(new b(), a, Cb(c));
    } finally {
      (b = a.g),
        (b.h = null),
        (b.j = 0),
        (b.i = 0),
        (b.g = 0),
        (b.v = !1),
        (a.i = -1),
        (a.h = -1),
        100 > Wa.length && Wa.push(a);
    }
  }
  function Jb(a, b, c) {
    for (var d = c.length, e = 1 == d % 2, g = e ? 1 : 0; g < d; g += 2)
      (0, c[g + 1])(b, a, c[g]);
    wb(a, b, e ? c[0] : void 0);
  }
  function Vb(a, b) {
    var c = new Xa();
    Jb(a, c, Ib(b));
    S(c, c.g.end());
    a = new Uint8Array(c.h);
    b = c.i;
    for (var d = b.length, e = 0, g = 0; g < d; g++) {
      var f = b[g];
      a.set(f, e);
      e += f.length;
    }
    c.i = [a];
    return a;
  }
  function Wb(a, b) {
    return { O: a, P: b };
  }
  var Y = Wb(
      function (a, b, c) {
        if (5 !== a.h) return !1;
        a = a.g;
        var d = a.h[a.g];
        var e = a.h[a.g + 1];
        var g = a.h[a.g + 2],
          f = a.h[a.g + 3];
        a.g += 4;
        O(a);
        e = ((d << 0) | (e << 8) | (g << 16) | (f << 24)) >>> 0;
        a = 2 * (e >> 31) + 1;
        d = (e >>> 23) & 255;
        e &= 8388607;
        W(
          b,
          c,
          255 == d
            ? e
              ? NaN
              : Infinity * a
            : 0 == d
            ? a * Math.pow(2, -149) * e
            : a * Math.pow(2, d - 150) * (e + Math.pow(2, 23))
        );
        return !0;
      },
      function (a, b, c) {
        b = V(b, c);
        if (null != b) {
          R(a.g, 8 * c + 5);
          a = a.g;
          var d = b;
          d = (c = 0 > d ? 1 : 0) ? -d : d;
          0 === d
            ? 0 < 1 / d
              ? (M = N = 0)
              : ((N = 0), (M = 2147483648))
            : isNaN(d)
            ? ((N = 0), (M = 2147483647))
            : 3.4028234663852886e38 < d
            ? ((N = 0), (M = ((c << 31) | 2139095040) >>> 0))
            : 1.1754943508222875e-38 > d
            ? ((d = Math.round(d / Math.pow(2, -149))),
              (N = 0),
              (M = ((c << 31) | d) >>> 0))
            : ((b = Math.floor(Math.log(d) / Math.LN2)),
              (d *= Math.pow(2, -b)),
              (d = Math.round(8388608 * d)),
              16777216 <= d && ++b,
              (N = 0),
              (M = ((c << 31) | ((b + 127) << 23) | (d & 8388607)) >>> 0));
          c = M;
          a.g.push((c >>> 0) & 255);
          a.g.push((c >>> 8) & 255);
          a.g.push((c >>> 16) & 255);
          a.g.push((c >>> 24) & 255);
        }
      }
    ),
    Xb = Wb(
      function (a, b, c) {
        if (0 !== a.h) return !1;
        for (var d = a.g, e = 128, g = 0, f = (a = 0); 4 > f && 128 <= e; f++)
          (e = d.h[d.g++]), O(d), (g |= (e & 127) << (7 * f));
        128 <= e &&
          ((e = d.h[d.g++]),
          O(d),
          (g |= (e & 127) << 28),
          (a |= (e & 127) >> 4));
        if (128 <= e)
          for (f = 0; 5 > f && 128 <= e; f++)
            (e = d.h[d.g++]), O(d), (a |= (e & 127) << (7 * f + 3));
        if (128 > e) {
          d = g >>> 0;
          e = a >>> 0;
          if ((a = e & 2147483648))
            (d = (~d + 1) >>> 0), (e = ~e >>> 0), 0 == d && (e = (e + 1) >>> 0);
          d = 4294967296 * e + (d >>> 0);
        } else throw Oa();
        W(b, c, a ? -d : d);
        return !0;
      },
      function (a, b, c) {
        b = V(b, c);
        if (null != b && null != b) {
          R(a.g, 8 * c);
          a = a.g;
          var d = b;
          c = 0 > d;
          d = Math.abs(d);
          b = d >>> 0;
          d = Math.floor((d - b) / 4294967296);
          d >>>= 0;
          c &&
            ((d = ~d >>> 0),
            (b = (~b >>> 0) + 1),
            4294967295 < b && ((b = 0), d++, 4294967295 < d && (d = 0)));
          M = b;
          N = d;
          c = M;
          for (b = N; 0 < b || 127 < c; )
            a.g.push((c & 127) | 128),
              (c = ((c >>> 7) | (b << 25)) >>> 0),
              (b >>>= 7);
          a.g.push(c);
        }
      }
    ),
    Yb = Wb(
      function (a, b, c) {
        if (0 !== a.h) return !1;
        W(b, c, Q(a.g));
        return !0;
      },
      function (a, b, c) {
        b = V(b, c);
        if (null != b && null != b)
          if ((R(a.g, 8 * c), (a = a.g), (c = b), 0 <= c)) R(a, c);
          else {
            for (b = 0; 9 > b; b++) a.g.push((c & 127) | 128), (c >>= 7);
            a.g.push(1);
          }
      }
    ),
    Zb = Wb(
      function (a, b, c) {
        if (2 !== a.h) return !1;
        var d = Q(a.g) >>> 0;
        a = a.g;
        var e = a.g;
        a.g += d;
        O(a);
        a = a.h;
        var g;
        if (za)
          (g = ya) || (g = ya = new TextDecoder('utf-8', { fatal: !0 })),
            (g = g.decode(a.subarray(e, e + d)));
        else {
          d = e + d;
          for (var f = [], h = null, k, l, m; e < d; )
            (k = a[e++]),
              128 > k
                ? f.push(k)
                : 224 > k
                ? e >= d
                  ? K()
                  : ((l = a[e++]),
                    194 > k || 128 !== (l & 192)
                      ? (e--, K())
                      : f.push(((k & 31) << 6) | (l & 63)))
                : 240 > k
                ? e >= d - 1
                  ? K()
                  : ((l = a[e++]),
                    128 !== (l & 192) ||
                    (224 === k && 160 > l) ||
                    (237 === k && 160 <= l) ||
                    128 !== ((g = a[e++]) & 192)
                      ? (e--, K())
                      : f.push(((k & 15) << 12) | ((l & 63) << 6) | (g & 63)))
                : 244 >= k
                ? e >= d - 2
                  ? K()
                  : ((l = a[e++]),
                    128 !== (l & 192) ||
                    0 !== ((k << 28) + (l - 144)) >> 30 ||
                    128 !== ((g = a[e++]) & 192) ||
                    128 !== ((m = a[e++]) & 192)
                      ? (e--, K())
                      : ((k =
                          ((k & 7) << 18) |
                          ((l & 63) << 12) |
                          ((g & 63) << 6) |
                          (m & 63)),
                        (k -= 65536),
                        f.push(((k >> 10) & 1023) + 55296, (k & 1023) + 56320)))
                : K(),
              8192 <= f.length && ((h = xa(h, f)), (f.length = 0));
          g = xa(h, f);
        }
        W(b, c, g);
        return !0;
      },
      function (a, b, c) {
        b = V(b, c);
        if (null != b) {
          var d = !1;
          d = void 0 === d ? !1 : d;
          if (Ba) {
            if (
              d &&
              /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(
                b
              )
            )
              throw Error('Found an unpaired surrogate');
            b = (Aa || (Aa = new TextEncoder())).encode(b);
          } else {
            for (
              var e = 0, g = new Uint8Array(3 * b.length), f = 0;
              f < b.length;
              f++
            ) {
              var h = b.charCodeAt(f);
              if (128 > h) g[e++] = h;
              else {
                if (2048 > h) g[e++] = (h >> 6) | 192;
                else {
                  if (55296 <= h && 57343 >= h) {
                    if (56319 >= h && f < b.length) {
                      var k = b.charCodeAt(++f);
                      if (56320 <= k && 57343 >= k) {
                        h = 1024 * (h - 55296) + k - 56320 + 65536;
                        g[e++] = (h >> 18) | 240;
                        g[e++] = ((h >> 12) & 63) | 128;
                        g[e++] = ((h >> 6) & 63) | 128;
                        g[e++] = (h & 63) | 128;
                        continue;
                      } else f--;
                    }
                    if (d) throw Error('Found an unpaired surrogate');
                    h = 65533;
                  }
                  g[e++] = (h >> 12) | 224;
                  g[e++] = ((h >> 6) & 63) | 128;
                }
                g[e++] = (h & 63) | 128;
              }
            }
            b = g.subarray(0, e);
          }
          R(a.g, 8 * c + 2);
          R(a.g, b.length);
          S(a, a.g.end());
          S(a, b);
        }
      }
    ),
    $b = Wb(
      function (a, b, c, d, e) {
        if (2 !== a.h) return !1;
        b = jb(b, c, d);
        c = a.g.i;
        d = Q(a.g) >>> 0;
        var g = a.g.g + d,
          f = g - c;
        0 >= f && ((a.g.i = g), e(b, a), (f = g - a.g.g));
        if (f)
          throw Error(
            'Message parsing ended unexpectedly. Expected to read ' +
              (d +
                ' bytes, instead read ' +
                (d - f) +
                ' bytes, either the data ended unexpectedly or the message misreported its own length')
          );
        a.g.g = g;
        a.g.i = c;
        return !0;
      },
      function (a, b, c, d, e) {
        b = ib(b, d, c);
        if (null != b)
          for (d = 0; d < b.length; d++) {
            var g = a;
            R(g.g, 8 * c + 2);
            var f = g.g.end();
            S(g, f);
            f.push(g.h);
            g = f;
            e(b[d], a);
            f = a;
            var h = g.pop();
            for (h = f.h + f.g.length() - h; 127 < h; )
              g.push((h & 127) | 128), (h >>>= 7), f.h++;
            g.push(h);
            f.h++;
          }
      }
    );
  function Z() {
    ub.apply(this, arguments);
  }
  D(Z, ub);
  if (fb) {
    var ac = {};
    Object.defineProperties(
      Z,
      ((ac[Symbol.hasInstance] = gb(Object[Symbol.hasInstance])), ac)
    );
  }
  function bc(a) {
    Z.call(this, a);
  }
  D(bc, Z);
  function cc() {
    return [1, Yb, 2, Y, 3, Zb, 4, Zb];
  }
  function dc(a) {
    Z.call(this, a, -1, ec);
  }
  D(dc, Z);
  dc.prototype.addClassification = function (a, b) {
    jb(this, 1, bc, a, b);
    return this;
  };
  function fc() {
    return [1, $b, bc, cc];
  }
  var ec = [1];
  function gc(a) {
    Z.call(this, a);
  }
  D(gc, Z);
  function hc() {
    return [1, Y, 2, Y, 3, Y, 4, Y, 5, Y];
  }
  function ic(a) {
    Z.call(this, a, -1, jc);
  }
  D(ic, Z);
  function kc() {
    return [1, $b, gc, hc];
  }
  var jc = [1];
  function lc(a) {
    Z.call(this, a);
  }
  D(lc, Z);
  function mc() {
    return [1, Y, 2, Y, 3, Y, 4, Y, 5, Y, 6, Xb];
  }
  function nc(a, b, c) {
    c = a.createShader(0 === c ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
    a.shaderSource(c, b);
    a.compileShader(c);
    if (!a.getShaderParameter(c, a.COMPILE_STATUS))
      throw Error(
        'Could not compile WebGL shader.\n\n' + a.getShaderInfoLog(c)
      );
    return c;
  }
  function oc(a) {
    return ib(a, bc, 1).map(function (b) {
      return {
        index: kb(b, 1),
        score: X(b, 2),
        label: null != V(b, 3) ? lb(b, 3) : void 0,
        displayName: null != V(b, 4) ? lb(b, 4) : void 0,
      };
    });
  }
  function pc(a) {
    return {
      x: X(a, 1),
      y: X(a, 2),
      z: X(a, 3),
      visibility: null != V(a, 4) ? X(a, 4) : void 0,
    };
  }
  function qc(a) {
    return a.map(function (b) {
      return ib(Ub(b, ic, kc), gc, 1).map(pc);
    });
  }
  function rc(a, b) {
    this.h = a;
    this.g = b;
    this.l = 0;
  }
  function sc(a, b, c) {
    tc(a, b);
    if ('function' === typeof a.g.canvas.transferToImageBitmap)
      return Promise.resolve(a.g.canvas.transferToImageBitmap());
    if (c) return Promise.resolve(a.g.canvas);
    if ('function' === typeof createImageBitmap)
      return createImageBitmap(a.g.canvas);
    void 0 === a.i && (a.i = document.createElement('canvas'));
    return new Promise(function (d) {
      a.i.height = a.g.canvas.height;
      a.i.width = a.g.canvas.width;
      a.i
        .getContext('2d', {})
        .drawImage(a.g.canvas, 0, 0, a.g.canvas.width, a.g.canvas.height);
      d(a.i);
    });
  }
  function tc(a, b) {
    var c = a.g;
    if (void 0 === a.o) {
      var d = nc(
          c,
          '\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }',
          0
        ),
        e = nc(
          c,
          '\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }',
          1
        ),
        g = c.createProgram();
      c.attachShader(g, d);
      c.attachShader(g, e);
      c.linkProgram(g);
      if (!c.getProgramParameter(g, c.LINK_STATUS))
        throw Error(
          'Could not compile WebGL program.\n\n' + c.getProgramInfoLog(g)
        );
      d = a.o = g;
      c.useProgram(d);
      e = c.getUniformLocation(d, 'sampler0');
      a.j = {
        K: c.getAttribLocation(d, 'aVertex'),
        J: c.getAttribLocation(d, 'aTex'),
        qa: e,
      };
      a.u = c.createBuffer();
      c.bindBuffer(c.ARRAY_BUFFER, a.u);
      c.enableVertexAttribArray(a.j.K);
      c.vertexAttribPointer(a.j.K, 2, c.FLOAT, !1, 0, 0);
      c.bufferData(
        c.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        c.STATIC_DRAW
      );
      c.bindBuffer(c.ARRAY_BUFFER, null);
      a.s = c.createBuffer();
      c.bindBuffer(c.ARRAY_BUFFER, a.s);
      c.enableVertexAttribArray(a.j.J);
      c.vertexAttribPointer(a.j.J, 2, c.FLOAT, !1, 0, 0);
      c.bufferData(
        c.ARRAY_BUFFER,
        new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]),
        c.STATIC_DRAW
      );
      c.bindBuffer(c.ARRAY_BUFFER, null);
      c.uniform1i(e, 0);
    }
    d = a.j;
    c.useProgram(a.o);
    c.canvas.width = b.width;
    c.canvas.height = b.height;
    c.viewport(0, 0, b.width, b.height);
    c.activeTexture(c.TEXTURE0);
    a.h.bindTexture2d(b.glName);
    c.enableVertexAttribArray(d.K);
    c.bindBuffer(c.ARRAY_BUFFER, a.u);
    c.vertexAttribPointer(d.K, 2, c.FLOAT, !1, 0, 0);
    c.enableVertexAttribArray(d.J);
    c.bindBuffer(c.ARRAY_BUFFER, a.s);
    c.vertexAttribPointer(d.J, 2, c.FLOAT, !1, 0, 0);
    c.bindFramebuffer(
      c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER,
      null
    );
    c.clearColor(0, 0, 0, 0);
    c.clear(c.COLOR_BUFFER_BIT);
    c.colorMask(!0, !0, !0, !0);
    c.drawArrays(c.TRIANGLE_FAN, 0, 4);
    c.disableVertexAttribArray(d.K);
    c.disableVertexAttribArray(d.J);
    c.bindBuffer(c.ARRAY_BUFFER, null);
    a.h.bindTexture2d(0);
  }
  function uc(a) {
    this.g = a;
  }
  var vc = new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0,
    65, 0, 253, 15, 26, 11,
  ]);
  function wc(a, b) {
    return b + a;
  }
  function xc(a, b) {
    window[a] = b;
  }
  function yc(a) {
    var b = document.createElement('script');
    b.setAttribute('src', a);
    b.setAttribute('crossorigin', 'anonymous');
    return new Promise(function (c) {
      b.addEventListener(
        'load',
        function () {
          c();
        },
        !1
      );
      b.addEventListener(
        'error',
        function () {
          c();
        },
        !1
      );
      document.body.appendChild(b);
    });
  }
  function zc() {
    return I(function (a) {
      switch (a.g) {
        case 1:
          return (a.o = 2), F(a, WebAssembly.instantiate(vc), 4);
        case 4:
          a.g = 3;
          a.o = 0;
          break;
        case 2:
          return (a.o = 0), (a.j = null), a.return(!1);
        case 3:
          return a.return(!0);
      }
    });
  }
  function Ac(a) {
    this.g = a;
    this.listeners = {};
    this.j = {};
    this.H = {};
    this.o = {};
    this.u = {};
    this.I = this.s = this.$ = !0;
    this.D = Promise.resolve();
    this.Z = '';
    this.C = {};
    this.locateFile = (a && a.locateFile) || wc;
    if ('object' === typeof window)
      var b =
        window.location.pathname
          .toString()
          .substring(0, window.location.pathname.toString().lastIndexOf('/')) +
        '/';
    else if ('undefined' !== typeof location)
      b =
        location.pathname
          .toString()
          .substring(0, location.pathname.toString().lastIndexOf('/')) + '/';
    else
      throw Error(
        'solutions can only be loaded on a web page or in a web worker'
      );
    this.aa = b;
    if (a.options) {
      b = C(Object.keys(a.options));
      for (var c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        var d = a.options[c].default;
        void 0 !== d && (this.j[c] = 'function' === typeof d ? d() : d);
      }
    }
  }
  x = Ac.prototype;
  x.close = function () {
    this.i && this.i.delete();
    return Promise.resolve();
  };
  function Bc(a) {
    var b, c, d, e, g, f, h, k, l, m, r;
    return I(function (p) {
      switch (p.g) {
        case 1:
          if (!a.$) return p.return();
          b =
            void 0 === a.g.files
              ? []
              : 'function' === typeof a.g.files
              ? a.g.files(a.j)
              : a.g.files;
          return F(p, zc(), 2);
        case 2:
          c = p.h;
          if ('object' === typeof window)
            return (
              xc('createMediapipeSolutionsWasm', { locateFile: a.locateFile }),
              xc('createMediapipeSolutionsPackedAssets', {
                locateFile: a.locateFile,
              }),
              (f = b.filter(function (n) {
                return void 0 !== n.data;
              })),
              (h = b.filter(function (n) {
                return void 0 === n.data;
              })),
              (k = Promise.all(
                f.map(function (n) {
                  var q = Cc(a, n.url);
                  if (void 0 !== n.path) {
                    var t = n.path;
                    q = q.then(function (w) {
                      a.overrideFile(t, w);
                      return Promise.resolve(w);
                    });
                  }
                  return q;
                })
              )),
              (l = Promise.all(
                h.map(function (n) {
                  return void 0 === n.simd || (n.simd && c) || (!n.simd && !c)
                    ? yc(a.locateFile(n.url, a.aa))
                    : Promise.resolve();
                })
              ).then(function () {
                var n, q, t;
                return I(function (w) {
                  if (1 == w.g)
                    return (
                      (n = window.createMediapipeSolutionsWasm),
                      (q = window.createMediapipeSolutionsPackedAssets),
                      (t = a),
                      F(w, n(q), 2)
                    );
                  t.h = w.h;
                  w.g = 0;
                });
              })),
              (m = (function () {
                return I(function (n) {
                  a.g.graph && a.g.graph.url
                    ? (n = F(n, Cc(a, a.g.graph.url), 0))
                    : ((n.g = 0), (n = void 0));
                  return n;
                });
              })()),
              F(p, Promise.all([l, k, m]), 7)
            );
          if ('function' !== typeof importScripts)
            throw Error(
              'solutions can only be loaded on a web page or in a web worker'
            );
          d = b
            .filter(function (n) {
              return void 0 === n.simd || (n.simd && c) || (!n.simd && !c);
            })
            .map(function (n) {
              return a.locateFile(n.url, a.aa);
            });
          importScripts.apply(null, ea(d));
          e = a;
          return F(p, createMediapipeSolutionsWasm(Module), 6);
        case 6:
          e.h = p.h;
          a.l = new OffscreenCanvas(1, 1);
          a.h.canvas = a.l;
          g = a.h.GL.createContext(a.l, {
            antialias: !1,
            alpha: !1,
            na: 'undefined' !== typeof WebGL2RenderingContext ? 2 : 1,
          });
          a.h.GL.makeContextCurrent(g);
          console.log(a, 'thi si a');
          a.C = a.h.GL.currentContext.GLctx;
          p.g = 4;
          break;
        case 7:
          a.l = document.createElement('canvas');
          r = a.l.getContext('webgl2', {});
          if (!r && ((r = a.l.getContext('webgl', {})), !r))
            return (
              alert(
                'Failed to create WebGL canvas context when passing video frame.'
              ),
              p.return()
            );
          a.G = r;
          a.h.canvas = a.l;
          a.h.createContext(a.l, !0, !0, {});
        case 4:
          (a.i = new a.h.SolutionWasm()), (a.$ = !1), (p.g = 0);
      }
    });
  }
  function Dc(a) {
    var b, c, d, e, g, f, h, k;
    return I(function (l) {
      if (1 == l.g) {
        if (a.g.graph && a.g.graph.url && a.Z === a.g.graph.url)
          return l.return();
        a.s = !0;
        if (!a.g.graph || !a.g.graph.url) {
          l.g = 2;
          return;
        }
        a.Z = a.g.graph.url;
        return F(l, Cc(a, a.g.graph.url), 3);
      }
      2 != l.g && ((b = l.h), a.i.loadGraph(b));
      c = C(Object.keys(a.C));
      for (d = c.next(); !d.done; d = c.next())
        (e = d.value), a.i.overrideFile(e, a.C[e]);
      a.C = {};
      if (a.g.listeners)
        for (g = C(a.g.listeners), f = g.next(); !f.done; f = g.next())
          (h = f.value), Ec(a, h);
      k = a.j;
      a.j = {};
      a.setOptions(k);
      l.g = 0;
    });
  }
  x.reset = function () {
    var a = this;
    return I(function (b) {
      a.i && (a.i.reset(), (a.o = {}), (a.u = {}));
      b.g = 0;
    });
  };
  x.setOptions = function (a, b) {
    var c = this;
    if ((b = b || this.g.options)) {
      for (
        var d = [], e = [], g = {}, f = C(Object.keys(a)), h = f.next();
        !h.done;
        g = { R: g.R, S: g.S }, h = f.next()
      ) {
        var k = h.value;
        (k in this.j && this.j[k] === a[k]) ||
          ((this.j[k] = a[k]),
          (h = b[k]),
          void 0 !== h &&
            (h.onChange &&
              ((g.R = h.onChange),
              (g.S = a[k]),
              d.push(
                (function (l) {
                  return function () {
                    var m;
                    return I(function (r) {
                      if (1 == r.g) return F(r, l.R(l.S), 2);
                      m = r.h;
                      !0 === m && (c.s = !0);
                      r.g = 0;
                    });
                  };
                })(g)
              )),
            h.graphOptionXref &&
              ((k = {
                valueNumber: 1 === h.type ? a[k] : 0,
                valueBoolean: 0 === h.type ? a[k] : !1,
                valueString: 2 === h.type ? a[k] : '',
              }),
              (h = Object.assign(
                Object.assign(
                  Object.assign({}, { calculatorName: '', calculatorIndex: 0 }),
                  h.graphOptionXref
                ),
                k
              )),
              e.push(h))));
      }
      if (0 !== d.length || 0 !== e.length)
        (this.s = !0),
          (this.B = (void 0 === this.B ? [] : this.B).concat(e)),
          (this.A = (void 0 === this.A ? [] : this.A).concat(d));
    }
  };
  function Fc(a) {
    var b, c, d, e, g, f, h;
    return I(function (k) {
      switch (k.g) {
        case 1:
          if (!a.s) return k.return();
          if (!a.A) {
            k.g = 2;
            break;
          }
          b = C(a.A);
          c = b.next();
        case 3:
          if (c.done) {
            k.g = 5;
            break;
          }
          d = c.value;
          return F(k, d(), 4);
        case 4:
          c = b.next();
          k.g = 3;
          break;
        case 5:
          a.A = void 0;
        case 2:
          if (a.B) {
            e = new a.h.GraphOptionChangeRequestList();
            g = C(a.B);
            for (f = g.next(); !f.done; f = g.next())
              (h = f.value), e.push_back(h);
            a.i.changeOptions(e);
            e.delete();
            a.B = void 0;
          }
          a.s = !1;
          k.g = 0;
      }
    });
  }
  x.initialize = function () {
    var a = this;
    return I(function (b) {
      return 1 == b.g
        ? F(b, Bc(a), 2)
        : 3 != b.g
        ? F(b, Dc(a), 3)
        : F(b, Fc(a), 0);
    });
  };
  function Cc(a, b) {
    var c, d;
    return I(function (e) {
      if (b in a.H) return e.return(a.H[b]);
      c = a.locateFile(b, '');
      d = fetch(c).then(function (g) {
        return g.arrayBuffer();
      });
      a.H[b] = d;
      return e.return(d);
    });
  }
  x.overrideFile = function (a, b) {
    this.i ? this.i.overrideFile(a, b) : (this.C[a] = b);
  };
  x.clearOverriddenFiles = function () {
    this.C = {};
    this.i && this.i.clearOverriddenFiles();
  };
  x.send = function (a, b) {
    var c = this,
      d,
      e,
      g,
      f,
      h,
      k,
      l,
      m,
      r;
    return I(function (p) {
      switch (p.g) {
        case 1:
          if (!c.g.inputs) return p.return();
          d = 1e3 * (void 0 === b || null === b ? performance.now() : b);
          return F(p, c.D, 2);
        case 2:
          return F(p, c.initialize(), 3);
        case 3:
          e = new c.h.PacketDataList();
          g = C(Object.keys(a));
          for (f = g.next(); !f.done; f = g.next())
            if (((h = f.value), (k = c.g.inputs[h]))) {
              a: {
                var n = a[h];
                switch (k.type) {
                  case 'video':
                    var q = c.o[k.stream];
                    q || ((q = new rc(c.h, c.G)), (c.o[k.stream] = q));
                    0 === q.l && (q.l = q.h.createTexture());
                    if (
                      'undefined' !== typeof HTMLVideoElement &&
                      n instanceof HTMLVideoElement
                    ) {
                      var t = n.videoWidth;
                      var w = n.videoHeight;
                    } else
                      'undefined' !== typeof HTMLImageElement &&
                      n instanceof HTMLImageElement
                        ? ((t = n.naturalWidth), (w = n.naturalHeight))
                        : ((t = n.width), (w = n.height));
                    w = { glName: q.l, width: t, height: w };
                    t = q.g;
                    t.canvas.width = w.width;
                    t.canvas.height = w.height;
                    t.activeTexture(t.TEXTURE0);
                    q.h.bindTexture2d(q.l);
                    t.texImage2D(
                      t.TEXTURE_2D,
                      0,
                      t.RGBA,
                      t.RGBA,
                      t.UNSIGNED_BYTE,
                      n
                    );
                    q.h.bindTexture2d(0);
                    q = w;
                    break a;
                  case 'detections':
                    q = c.o[k.stream];
                    q || ((q = new uc(c.h)), (c.o[k.stream] = q));
                    q.data || (q.data = new q.g.DetectionListData());
                    q.data.reset(n.length);
                    for (w = 0; w < n.length; ++w) {
                      t = n[w];
                      var v = q.data,
                        A = v.setBoundingBox,
                        H = w;
                      var E = t.ea;
                      var u = new lc();
                      W(u, 1, E.ka);
                      W(u, 2, E.la);
                      W(u, 3, E.height);
                      W(u, 4, E.width);
                      W(u, 5, E.rotation);
                      W(u, 6, E.ia);
                      E = Vb(u, mc);
                      A.call(v, H, E);
                      if (t.Y)
                        for (v = 0; v < t.Y.length; ++v) {
                          u = t.Y[v];
                          var z = u.visibility ? !0 : !1;
                          A = q.data;
                          H = A.addNormalizedLandmark;
                          E = w;
                          u = Object.assign(Object.assign({}, u), {
                            visibility: z ? u.visibility : 0,
                          });
                          z = new gc();
                          W(z, 1, u.x);
                          W(z, 2, u.y);
                          W(z, 3, u.z);
                          u.visibility && W(z, 4, u.visibility);
                          u = Vb(z, hc);
                          H.call(A, E, u);
                        }
                      if (t.V)
                        for (v = 0; v < t.V.length; ++v)
                          (A = q.data),
                            (H = A.addClassification),
                            (E = w),
                            (u = t.V[v]),
                            (z = new bc()),
                            W(z, 2, u.score),
                            u.index && W(z, 1, u.index),
                            u.label && W(z, 3, u.label),
                            u.displayName && W(z, 4, u.displayName),
                            (u = Vb(z, cc)),
                            H.call(A, E, u);
                    }
                    q = q.data;
                    break a;
                  default:
                    q = {};
                }
              }
              l = q;
              m = k.stream;
              switch (k.type) {
                case 'video':
                  e.pushTexture2d(
                    Object.assign(Object.assign({}, l), {
                      stream: m,
                      timestamp: d,
                    })
                  );
                  break;
                case 'detections':
                  r = l;
                  r.stream = m;
                  r.timestamp = d;
                  e.pushDetectionList(r);
                  break;
                default:
                  throw Error("Unknown input config type: '" + k.type + "'");
              }
            }
          c.i.send(e);
          return F(p, c.D, 4);
        case 4:
          e.delete(), (p.g = 0);
      }
    });
  };
  function Gc(a, b, c) {
    var d, e, g, f, h, k, l, m, r, p, n, q, t, w;
    return I(function (v) {
      switch (v.g) {
        case 1:
          if (!c) return v.return(b);
          d = {};
          e = 0;
          g = C(Object.keys(c));
          for (f = g.next(); !f.done; f = g.next())
            (h = f.value),
              (k = c[h]),
              'string' !== typeof k &&
                'texture' === k.type &&
                void 0 !== b[k.stream] &&
                ++e;
          1 < e && (a.I = !1);
          l = C(Object.keys(c));
          f = l.next();
        case 2:
          if (f.done) {
            v.g = 4;
            break;
          }
          m = f.value;
          r = c[m];
          if ('string' === typeof r)
            return (t = d), (w = m), F(v, Hc(a, m, b[r]), 14);
          p = b[r.stream];
          if ('detection_list' === r.type) {
            if (p) {
              var A = p.getRectList();
              for (
                var H = p.getLandmarksList(),
                  E = p.getClassificationsList(),
                  u = [],
                  z = 0;
                z < A.size();
                ++z
              ) {
                var P = Ub(A.get(z), lc, mc);
                P = {
                  ea: {
                    ka: X(P, 1),
                    la: X(P, 2),
                    height: X(P, 3),
                    width: X(P, 4),
                    rotation: X(P, 5, 0),
                    ia: kb(P, 6),
                  },
                  Y: ib(Ub(H.get(z), ic, kc), gc, 1).map(pc),
                  V: oc(Ub(E.get(z), dc, fc)),
                };
                u.push(P);
              }
              A = u;
            } else A = [];
            d[m] = A;
            v.g = 7;
            break;
          }
          if ('proto_list' === r.type) {
            if (p) {
              A = Array(p.size());
              for (H = 0; H < p.size(); H++) A[H] = p.get(H);
              p.delete();
            } else A = [];
            d[m] = A;
            v.g = 7;
            break;
          }
          if (void 0 === p) {
            v.g = 3;
            break;
          }
          if ('float_list' === r.type) {
            d[m] = p;
            v.g = 7;
            break;
          }
          if ('proto' === r.type) {
            d[m] = p;
            v.g = 7;
            break;
          }
          if ('texture' !== r.type)
            throw Error("Unknown output config type: '" + r.type + "'");
          n = a.u[m];
          n || ((n = new rc(a.h, a.G)), (a.u[m] = n));
          return F(v, sc(n, p, a.I), 13);
        case 13:
          (q = v.h), (d[m] = q);
        case 7:
          r.transform && d[m] && (d[m] = r.transform(d[m]));
          v.g = 3;
          break;
        case 14:
          t[w] = v.h;
        case 3:
          f = l.next();
          v.g = 2;
          break;
        case 4:
          return v.return(d);
      }
    });
  }
  function Hc(a, b, c) {
    var d;
    return I(function (e) {
      return 'number' === typeof c ||
        c instanceof Uint8Array ||
        c instanceof a.h.Uint8BlobList
        ? e.return(c)
        : c instanceof a.h.Texture2dDataOut
        ? ((d = a.u[b]),
          d || ((d = new rc(a.h, a.G)), (a.u[b] = d)),
          e.return(sc(d, c, a.I)))
        : e.return(void 0);
    });
  }
  function Ec(a, b) {
    for (
      var c = b.name || '$',
        d = [].concat(ea(b.wants)),
        e = new a.h.StringList(),
        g = C(b.wants),
        f = g.next();
      !f.done;
      f = g.next()
    )
      e.push_back(f.value);
    g = a.h.PacketListener.implement({
      onResults: function (h) {
        for (var k = {}, l = 0; l < b.wants.length; ++l) k[d[l]] = h.get(l);
        var m = a.listeners[c];
        m &&
          (a.D = Gc(a, k, b.outs).then(function (r) {
            r = m(r);
            for (var p = 0; p < b.wants.length; ++p) {
              var n = k[d[p]];
              'object' === typeof n &&
                n.hasOwnProperty &&
                n.hasOwnProperty('delete') &&
                n.delete();
            }
            r && (a.D = r);
          }));
      },
    });
    a.i.attachMultiListener(e, g);
    e.delete();
  }
  x.onResults = function (a, b) {
    this.listeners[b || '$'] = a;
  };
  J('Solution', Ac);
  J('OptionType', {
    BOOL: 0,
    NUMBER: 1,
    ma: 2,
    0: 'BOOL',
    1: 'NUMBER',
    2: 'STRING',
  });
  function Ic(a) {
    void 0 === a && (a = 0);
    return 1 === a ? 'hand_landmark_full.tflite' : 'hand_landmark_lite.tflite';
  }
  function Jc(a) {
    var b = this;
    a = a || {};
    this.g = new Ac({
      locateFile: a.locateFile,
      files: function (c) {
        return [
          { url: 'hands_solution_packed_assets_loader.js' },
          { simd: !1, url: 'hands_solution_wasm_bin.js' },
          { simd: !0, url: 'hands_solution_simd_wasm_bin.js' },
          { data: !0, url: Ic(c.modelComplexity) },
        ];
      },
      graph: { url: 'hands.binarypb' },
      inputs: { image: { type: 'video', stream: 'input_frames_gpu' } },
      listeners: [
        {
          wants: [
            'multi_hand_landmarks',
            'multi_hand_world_landmarks',
            'image_transformed',
            'multi_handedness',
          ],
          outs: {
            image: 'image_transformed',
            multiHandLandmarks: {
              type: 'proto_list',
              stream: 'multi_hand_landmarks',
              transform: qc,
            },
            multiHandWorldLandmarks: {
              type: 'proto_list',
              stream: 'multi_hand_world_landmarks',
              transform: qc,
            },
            multiHandedness: {
              type: 'proto_list',
              stream: 'multi_handedness',
              transform: function (c) {
                return c.map(function (d) {
                  return oc(Ub(d, dc, fc))[0];
                });
              },
            },
          },
        },
      ],
      options: {
        useCpuInference: {
          type: 0,
          graphOptionXref: {
            calculatorType: 'InferenceCalculator',
            fieldName: 'use_cpu_inference',
          },
          default:
            'object' !== typeof window || void 0 === window.navigator
              ? !1
              : 'iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod'
                  .split(';')
                  .includes(navigator.platform) ||
                (navigator.userAgent.includes('Mac') &&
                  'ontouchend' in document),
        },
        selfieMode: {
          type: 0,
          graphOptionXref: {
            calculatorType: 'GlScalerCalculator',
            calculatorIndex: 1,
            fieldName: 'flip_horizontal',
          },
        },
        maxNumHands: {
          type: 1,
          graphOptionXref: {
            calculatorType: 'ConstantSidePacketCalculator',
            calculatorName: 'ConstantSidePacketCalculator',
            fieldName: 'int_value',
          },
        },
        modelComplexity: {
          type: 1,
          graphOptionXref: {
            calculatorType: 'ConstantSidePacketCalculator',
            calculatorName: 'ConstantSidePacketCalculatorModelComplexity',
            fieldName: 'int_value',
          },
          onChange: function (c) {
            var d, e, g;
            return I(function (f) {
              if (1 == f.g)
                return (
                  (d = Ic(c)),
                  (e = 'third_party/mediapipe/modules/hand_landmark/' + d),
                  F(f, Cc(b.g, d), 2)
                );
              g = f.h;
              b.g.overrideFile(e, g);
              return f.return(!0);
            });
          },
        },
        minDetectionConfidence: {
          type: 1,
          graphOptionXref: {
            calculatorType: 'TensorsToDetectionsCalculator',
            calculatorName:
              'handlandmarktrackinggpu__palmdetectiongpu__TensorsToDetectionsCalculator',
            fieldName: 'min_score_thresh',
          },
        },
        minTrackingConfidence: {
          type: 1,
          graphOptionXref: {
            calculatorType: 'ThresholdingCalculator',
            calculatorName:
              'handlandmarktrackinggpu__handlandmarkgpu__ThresholdingCalculator',
            fieldName: 'threshold',
          },
        },
      },
    });
  }
  x = Jc.prototype;
  x.close = function () {
    this.g.close();
    return Promise.resolve();
  };
  x.onResults = function (a) {
    this.g.onResults(a);
  };
  x.initialize = function () {
    var a = this;
    return I(function (b) {
      return F(b, a.g.initialize(), 0);
    });
  };
  x.reset = function () {
    this.g.reset();
  };
  x.send = function (a) {
    var b = this;
    return I(function (c) {
      return F(c, b.g.send(a), 0);
    });
  };
  x.setOptions = function (a) {
    this.g.setOptions(a);
  };
  J('Hands', Jc);
  J('HAND_CONNECTIONS', [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [9, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [13, 17],
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20],
  ]);
  J('VERSION', '0.4.1646424915');
}.call(this));
