(function() {
    'use strict';
    var m = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
      , p = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
      , q = p(this)
      , r = function(a, b) {
        if (b)
            a: {
                var c = q;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var f = a[d];
                    if (!(f in c))
                        break a;
                    c = c[f]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && b != null && m(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    };
    r("globalThis", function(a) {
        return a || q
    });
    /*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    let t = globalThis.trustedTypes, u;
    function v() {
        let a = null;
        if (!t)
            return a;
        try {
            const b = c => c;
            a = t.createPolicy("goog#html", {
                createHTML: b,
                createScript: b,
                createScriptURL: b
            })
        } catch (b) {}
        return a
    }
    ;var w = class {
        constructor(a) {
            this.B = a
        }
        toString() {
            return this.B + ""
        }
    }
    ;
    function x(a) {
        u === void 0 && (u = v());
        var b = u;
        return new w(b ? b.createScriptURL(a) : a)
    }
    ;function A(a, ...b) {
        if (b.length === 0)
            return x(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return x(c)
    }
    ;A`api/tag_assistant_api_bin.js`;
    A`api/content_script_bin.js`;
    A`api/start_debug_content_script_bin.js`;
    A`api/start_prod_debug_content_script_bin.js`;
    var B = function(a, b, c=null) {
        if (b == null)
            return b;
        const d = typeof b;
        if (d === "boolean" || d === "string" || d === "number")
            return b;
        if (d === "function")
            return "Function";
        if (d === "object") {
            const g = a.m.indexOf(b);
            if (g !== -1) {
                a.cycles[c] = a.o[g];
                return
            }
            try {
                if (b && typeof b[Symbol.iterator] === "function") {
                    var f = [];
                    a.m.push(b);
                    a.o.push(c);
                    var e = 0;
                    for (var k of b)
                        f.push(B(a, k, c == null ? `${e}` : `${c}.${e}`)),
                        e++;
                    return f
                }
                if (b instanceof Node) {
                    a = [];
                    c = b;
                    do {
                        if (c instanceof Element) {
                            const y = c.classList ? [...c.classList].join(".") : ""
                              , z = (c.tagName ? c.tagName.toLowerCase() : "") + (y ? "." + y : "") + (c.id ? "#" + c.id : "");
                            z && a.unshift(z)
                        }
                        c = c.parentNode
                    } while (c != null);
                    var h;
                    const l = (h = (e = b.toString().match(/\[object (\w+)\]/)) == null ? void 0 : e[1]) != null ? h : b.toString()
                      , n = a.join(" > ");
                    return n ? `${l}: ${n}` : l
                }
                k = {};
                a.m.push(b);
                a.o.push(c);
                for (const [l,n] of Object.entries(b))
                    e = l,
                    h = n,
                    f = e.replace(/\\/g, "\\\\").replace(/\./, "\\."),
                    k[e] = B(a, h, c == null ? `${f}` : `${c}.${f}`);
                return k
            } catch (l) {
                console.log("Object inspection failed: %o", l)
            }
        }
        try {
            return String(b)
        } catch (g) {
            console.log("Failed to convert to string: %o", g);
            try {
                return String(Object.prototype.toString.call(b))
            } catch (l) {
                return `[${d}]`
            }
        }
    };
    class C {
        constructor() {
            this.cycles = {};
            this.m = [];
            this.o = []
        }
    }
    ;var E = function(a) {
        const b = a.g["google.tagmanager.ta.prodqueue"];
        if (b) {
            D(a, [...b]);
            var c = b.push;
            b.push = (...d) => {
                D(a, d);
                return c.apply(b, d)
            }
        } else
            Date.now() - a.A < 1E4 && a.g.setTimeout( () => {
                E(a)
            }
            , 300)
    }
      , D = function(a, b) {
        for (const c of b)
            b = new C,
            b = {
                sanitized: B(b, c),
                cycles: b.cycles
            },
            a.h({
                type: "MEMO",
                data: {
                    memo: b,
                    sequence: a.s,
                    pageId: a.pageId
                }
            }),
            a.s++
    }
      , F = class {
        constructor(a, b) {
            this.g = a;
            this.h = b;
            this.A = Date.now();
            this.s = 0;
            b = new Uint8Array(16);
            a.crypto.getRandomValues(b);
            this.pageId = a.btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
            E(this)
        }
    }
    ;
    function G(a) {
        if (a == null || a.length === 0)
            return !1;
        a = Number(a);
        const b = (new Date(Date.now())).getTime();
        return a < b + 3E5 && a > b - 9E5
    }
    ;function H(a) {
        return a.replace(/([\?&])gtm_debug=x&/, "$1").replace(/[\?&]gtm_debug=x($|#)/, "$1")
    }
    ;let I = window;
    function J() {
        let a = I.google_tags_first_party;
        Array.isArray(a) || (a = []);
        const b = {};
        for (const c of a)
            b[c] = !0;
        return Object.freeze(b)
    }
    class K {
        constructor() {
            this.container = {};
            this.destination = {};
            this.canonical = {};
            this.pending = [];
            this.siloed = [];
            this.injectedFirstPartyContainers = {};
            this.injectedFirstPartyContainers = J()
        }
    }
    ;var L = function(a) {
        const b = a.g.document.documentElement.getAttribute("data-tag-assistant-prod-present");
        if (G(b))
            a.startProdDebug();
        else {
            const c = d => {
                d.detail.startProdDebug && a.startProdDebug();
                a.g.document.removeEventListener("TADebugSignal", c)
            }
            ;
            a.g.document.addEventListener("TADebugSignal", c)
        }
    }
      , N = function(a, b) {
        a.l.push(b);
        a.u || (a.u = !0,
        a.g.document.addEventListener("prerenderingchange", () => {
            for (const c of a.l)
                M(a, c);
            a.l.length = 0
        }
        , {
            once: !0
        }))
    }
      , M = function(a, b) {
        a.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
            detail: b
        }))
    }
      , P = function(a) {
        a.g === a.g.top && (a.j = a.g.setInterval( () => {
            a.h({
                type: "PING"
            })
        }
        , 1E3),
        a.g.document.readyState === "complete" ? O(a) : a.g.addEventListener("load", () => {
            O(a)
        }
        ))
    }
      , O = function(a, b) {
        if (b !== "RESEND_MEMOS" || a.g === a.g.top) {
            b = a.h;
            var c = Object, d = c.assign, f = a.g, e;
            var k = H(f.location.href);
            var h;
            if (!(h = f.document.title) && (h = f.location.href,
            h !== "/")) {
                try {
                    var g = new URL(h);
                    g.search = "";
                    g.hash = "";
                    h = g.toString()
                } catch (l) {}
                g = h.split("/");
                h = g[g.length - 1] || g[g.length - 2]
            }
            k = {
                href: k,
                title: h,
                referrer: H((e = f.document.referrer) != null ? e : ""),
                readyState: f.document.readyState
            };
            e = a.g;
            e = e.google_tag_manager = e.google_tag_manager || {};
            e = e.debugGroupId || (e.debugGroupId = String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random())));
            b.call(a, {
                type: "PAGE_SUMMARY",
                data: d.call(c, {}, k, {
                    groupId: e,
                    pageId: ""
                })
            })
        }
    }
      , R = function(a) {
        a.i || (Q(a),
        a.i = a.g.setInterval( () => {
            Q(a)
        }
        , 1500))
    }
      , Q = function(a) {
        var b = {};
        var c = I.google_tag_data;
        I.google_tag_data = c === void 0 ? b : c;
        b = I.google_tag_data;
        c = b.tidr;
        c && typeof c === "object" || (c = new K,
        b.tidr = c);
        c.container || (c.container = {});
        c.destination || (c.destination = {});
        c.canonical || (c.canonical = {});
        c.pending || (c.pending = []);
        c.siloed || (c.siloed = []);
        c.injectedFirstPartyContainers || (c.injectedFirstPartyContainers = J());
        b = [];
        for (const [,d] of Object.entries(c.container))
            if (c = d,
            c.scriptContainerId != null) {
                switch (c.state) {
                case 2:
                    break;
                default:
                    continue
                }
                b.push({
                    ctid: c.scriptContainerId,
                    aliases: S(c.containers || [c.scriptContainerId]),
                    destinations: S(c.destinations || []),
                    canonicalId: c.canonicalContainerId,
                    parent: c.parent,
                    context: c.context
                })
            }
        b.length && a.h({
            type: "SIDE_PANEL",
            subType: "sp_list_tags",
            data: {
                tags: b
            }
        })
    }
      , U = class {
        constructor(a) {
            this.g = T;
            this.v = a;
            this.enableUntaggedPageReporting = !1;
            this.l = [];
            this.u = !1;
            this.g.document.addEventListener("__TAG_ASSISTANT_API_MESSAGE", b => {
                b = b.detail;
                a: {
                    var c = b == null ? void 0 : b.type;
                    if (typeof c !== "string")
                        c = !1;
                    else
                        switch (c) {
                        case "API_INSTALLED":
                        case "CHECK_DEBUG":
                        case "DISCONNECT":
                        case "PIPE_MESSAGE":
                        case "RECONNECT":
                        case "WINDOWS_CLOSED":
                            c = !0;
                            break a;
                        default:
                            c = !1
                        }
                }
                if (c)
                    a: if (c = b == null ? void 0 : b.source,
                    typeof c !== "string")
                        c = !1;
                    else
                        switch (c) {
                        case "PAGE":
                        case "EXTENSION":
                            c = !0;
                            break a;
                        default:
                            c = !1
                        }
                if (c && b.type === "PIPE_MESSAGE" && b.source === "EXTENSION") {
                    c = b.data;
                    const d = b.origin;
                    if (c.type === "SIDE_PANEL")
                        c.subType === "sp_list_tags" && R(this),
                        c.subType === "sp_off" && (this.g.clearInterval(this.i),
                        this.i = void 0);
                    else {
                        if (b = !this.enableUntaggedPageReporting)
                            a: {
                                try {
                                    if (c.type !== "PING") {
                                        b = !1;
                                        break a
                                    }
                                    let f, e;
                                    b = (e = (f = c.flags) == null ? void 0 : f.enableUntaggedPageReporting) != null ? e : !1;
                                    break a
                                } catch (f) {
                                    b = !1;
                                    break a
                                }
                                b = void 0
                            }
                        b ? (this.enableUntaggedPageReporting = !0,
                        P(this)) : c.type === "RESEND_MEMOS" && !this.receiver && this.enableUntaggedPageReporting && O(this, "RESEND_MEMOS");
                        this.receiver && this.receiver(c, d)
                    }
                }
            }
            );
            this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
                detail: {
                    type: "API_INSTALLED",
                    source: "PAGE"
                }
            }));
            this.g.addEventListener("pagehide", () => {
                this.i != null && (this.g.clearInterval(this.i),
                this.i = void 0)
            }
            );
            L(this)
        }
        setReceiver(a) {
            this.receiver = a
        }
        sendMessage(a) {
            this.j && (this.g.clearInterval(this.j),
            this.j = void 0);
            this.h(a)
        }
        h(a) {
            a = {
                type: "PIPE_MESSAGE",
                source: "PAGE",
                data: a,
                origin: this.g.origin
            };
            this.g.document.prerendering ? N(this, a) : M(this, a)
        }
        disconnect() {
            this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
                detail: {
                    type: "DISCONNECT",
                    source: "PAGE"
                }
            }));
            this.v()
        }
        startProdDebug() {
            this.C = this.C || new F(this.g,a => {
                this.h(a)
            }
            )
        }
    }
    ;
    function S(a) {
        const b = [];
        for (const c of a)
            c != null && b.push(c);
        return b
    }
    ;const T = window;
    T.__TAG_ASSISTANT_API || (T.__TAG_ASSISTANT_API = new U( () => {
        T.__TAG_ASSISTANT_API = void 0
    }
    ));
}
).call(this);
