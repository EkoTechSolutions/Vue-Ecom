globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, setHeader, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import gracefulShutdown from 'http-graceful-shutdown';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/**": {
        "robots": "index, follow"
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "trailingSlash": false,
    "titleSeparator": "|",
    "siteName": "V-Store",
    "siteUrl": "https://vue-ecom.vercel.app",
    "siteDescription": "A Full StoreFront built with Nuxt 3 + Pinia 2 + Bootstrap 5....",
    "language": "en-US",
    "nuxt-unhead": {
      "seoOptimise": true,
      "resolveAliases": false
    }
  },
  "indexable": true
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function trapUnhandledNodeErrors() {
  {
    process.on(
      "unhandledRejection",
      (err) => console.error("[nitro] [unhandledRejection] " + err)
    );
    process.on(
      "uncaughtException",
      (err) => console.error("[nitro]  [uncaughtException] " + err)
    );
  }
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/fi.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"43e-z7wlQ8FE3P2RuLAJrk8k5YxliJ4\"",
    "mtime": "2024-06-11T02:03:21.487Z",
    "size": 1086,
    "path": "../public/fi.ico"
  },
  "/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"6b33-oh1Jt7Iht9GJlf/GTE/wPxDFIXs\"",
    "mtime": "2024-06-11T02:03:22.751Z",
    "size": 27443,
    "path": "../public/index.html"
  },
  "/inter-latin-ext-400-normal.woff": {
    "type": "font/woff",
    "etag": "\"abcc-ScgUlgU6NMSchk9cXQMUZeQG8fc\"",
    "mtime": "2024-06-11T02:03:21.497Z",
    "size": 43980,
    "path": "../public/inter-latin-ext-400-normal.woff"
  },
  "/inter-latin-ext-700-normal.woff": {
    "type": "font/woff",
    "etag": "\"bb34-btkmYi1MS9GkMFR4+gGPWRFxwKU\"",
    "mtime": "2024-06-11T02:03:21.496Z",
    "size": 47924,
    "path": "../public/inter-latin-ext-700-normal.woff"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3f-TwuSf1IaIfFPEv7TN+Jz+VkGAk8\"",
    "mtime": "2024-06-11T02:03:22.754Z",
    "size": 63,
    "path": "../public/robots.txt"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"266-rA8GGfvcq8yTCaXUPiM0fVUnLXM\"",
    "mtime": "2024-06-11T02:03:22.798Z",
    "size": 614,
    "path": "../public/sitemap.xml"
  },
  "/svg2png.wasm": {
    "type": "application/wasm",
    "etag": "\"1bf667-JsF09mJVeSqlxzPPOrdAtUEgwrc\"",
    "mtime": "2024-06-11T02:03:21.494Z",
    "size": 1832551,
    "path": "../public/svg2png.wasm"
  },
  "/yoga.wasm": {
    "type": "application/wasm",
    "etag": "\"15a52-70hm7K4ZL9h3JwZ88sDAz5+4sCA\"",
    "mtime": "2024-06-11T02:03:21.489Z",
    "size": 88658,
    "path": "../public/yoga.wasm"
  },
  "/_nuxt/1.80b302b9.jpg": {
    "type": "image/jpeg",
    "etag": "\"300a-QR60EfiRzdGHqAoEzhIutI+Ce2E\"",
    "mtime": "2024-06-11T02:03:21.486Z",
    "size": 12298,
    "path": "../public/_nuxt/1.80b302b9.jpg"
  },
  "/_nuxt/10.7f32307a.jpg": {
    "type": "image/jpeg",
    "etag": "\"6630-8+B0A3bByeqUdCzDIKNO9r6/u+g\"",
    "mtime": "2024-06-11T02:03:21.486Z",
    "size": 26160,
    "path": "../public/_nuxt/10.7f32307a.jpg"
  },
  "/_nuxt/11.ff8e7a96.jpg": {
    "type": "image/jpeg",
    "etag": "\"257c-ZYjVz7MjmZBOwsiUoCNMoYFE8RA\"",
    "mtime": "2024-06-11T02:03:21.486Z",
    "size": 9596,
    "path": "../public/_nuxt/11.ff8e7a96.jpg"
  },
  "/_nuxt/12.10513028.jpg": {
    "type": "image/jpeg",
    "etag": "\"1509d-5utOX8V9/wWvwzKptFT5B8yoGtM\"",
    "mtime": "2024-06-11T02:03:21.486Z",
    "size": 86173,
    "path": "../public/_nuxt/12.10513028.jpg"
  },
  "/_nuxt/13.f2a2f010.jpg": {
    "type": "image/jpeg",
    "etag": "\"45cd-iROgVG1sVCqgZHLTpTrfxOvnZKs\"",
    "mtime": "2024-06-11T02:03:21.485Z",
    "size": 17869,
    "path": "../public/_nuxt/13.f2a2f010.jpg"
  },
  "/_nuxt/14.dc697c72.jpg": {
    "type": "image/jpeg",
    "etag": "\"11336-NJytyalVuVP28u65MGuBNvnJl1Q\"",
    "mtime": "2024-06-11T02:03:21.485Z",
    "size": 70454,
    "path": "../public/_nuxt/14.dc697c72.jpg"
  },
  "/_nuxt/2.233395f3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ee4-kyYMdT2gnBWQnIS3MLD4Sf43TmE\"",
    "mtime": "2024-06-11T02:03:21.485Z",
    "size": 7908,
    "path": "../public/_nuxt/2.233395f3.jpg"
  },
  "/_nuxt/3.cda4e63e.jpg": {
    "type": "image/jpeg",
    "etag": "\"5cca-W0rqZxusiRrgF91zXk0wOev14ms\"",
    "mtime": "2024-06-11T02:03:21.484Z",
    "size": 23754,
    "path": "../public/_nuxt/3.cda4e63e.jpg"
  },
  "/_nuxt/33.a7b67584.jpg": {
    "type": "image/jpeg",
    "etag": "\"25ad4-DazgGTHwoIEu9t/dm/FxRLcvNKc\"",
    "mtime": "2024-06-11T02:03:21.484Z",
    "size": 154324,
    "path": "../public/_nuxt/33.a7b67584.jpg"
  },
  "/_nuxt/4.f6b0676e.jpg": {
    "type": "image/jpeg",
    "etag": "\"21c7-p6ydBS9DiwCNe4vcRF2WKmIkNoo\"",
    "mtime": "2024-06-11T02:03:21.484Z",
    "size": 8647,
    "path": "../public/_nuxt/4.f6b0676e.jpg"
  },
  "/_nuxt/5.5bda5a49.jpg": {
    "type": "image/jpeg",
    "etag": "\"31ee-65cDJiB7QAg8bL7SzDLkEBmfSmw\"",
    "mtime": "2024-06-11T02:03:21.484Z",
    "size": 12782,
    "path": "../public/_nuxt/5.5bda5a49.jpg"
  },
  "/_nuxt/6.19dce8f2.jpg": {
    "type": "image/jpeg",
    "etag": "\"225b-XLXXdXs8gwlw6sysjsnajWJgzV8\"",
    "mtime": "2024-06-11T02:03:21.483Z",
    "size": 8795,
    "path": "../public/_nuxt/6.19dce8f2.jpg"
  },
  "/_nuxt/7.9e3e48de.jpg": {
    "type": "image/jpeg",
    "etag": "\"5804-dfb+EqUPT2NYWWl3ThCEf/f7TRg\"",
    "mtime": "2024-06-11T02:03:21.483Z",
    "size": 22532,
    "path": "../public/_nuxt/7.9e3e48de.jpg"
  },
  "/_nuxt/8.2f4b0a45.jpg": {
    "type": "image/jpeg",
    "etag": "\"77a9-S4OA2pcZ1RnUnlk5Z6jALwwV/8U\"",
    "mtime": "2024-06-11T02:03:21.483Z",
    "size": 30633,
    "path": "../public/_nuxt/8.2f4b0a45.jpg"
  },
  "/_nuxt/9.b0dd9fd8.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fda-Lk8bDkIwFDUAIGztQyBvl9nO0Q4\"",
    "mtime": "2024-06-11T02:03:21.483Z",
    "size": 8154,
    "path": "../public/_nuxt/9.b0dd9fd8.jpg"
  },
  "/_nuxt/Card.bf791602.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f7-KUCq+IjS4pgBQXlrrG1LbnihHbE\"",
    "mtime": "2024-06-11T02:03:21.482Z",
    "size": 503,
    "path": "../public/_nuxt/Card.bf791602.css"
  },
  "/_nuxt/Card.vue.d13916d1.js": {
    "type": "application/javascript",
    "etag": "\"475-M+x19zoeBWATmQ2hjRJ9e+zjL1c\"",
    "mtime": "2024-06-11T02:03:21.482Z",
    "size": 1141,
    "path": "../public/_nuxt/Card.vue.d13916d1.js"
  },
  "/_nuxt/Contact.be17e36b.js": {
    "type": "application/javascript",
    "etag": "\"5a7-X/ZMRpOAAsMWiFeLav3HXx15MWs\"",
    "mtime": "2024-06-11T02:03:21.482Z",
    "size": 1447,
    "path": "../public/_nuxt/Contact.be17e36b.js"
  },
  "/_nuxt/Contact.ed60ce77.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4cb-lh1yEyH3+bktsHh/lOPSHcsix6U\"",
    "mtime": "2024-06-11T02:03:21.482Z",
    "size": 1227,
    "path": "../public/_nuxt/Contact.ed60ce77.css"
  },
  "/_nuxt/Notification.6bbc6d2d.js": {
    "type": "application/javascript",
    "etag": "\"102-VJ09f9iBwJZavpl251CmG5ICHwk\"",
    "mtime": "2024-06-11T02:03:21.482Z",
    "size": 258,
    "path": "../public/_nuxt/Notification.6bbc6d2d.js"
  },
  "/_nuxt/Products.7f60fa16.js": {
    "type": "application/javascript",
    "etag": "\"130d-9kVK745d01ewTG5hb505rqSDqZA\"",
    "mtime": "2024-06-11T02:03:21.481Z",
    "size": 4877,
    "path": "../public/_nuxt/Products.7f60fa16.js"
  },
  "/_nuxt/Products.d81de501.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"407-dUWKbvaBoRjlzjxU1fdZv7XSgSM\"",
    "mtime": "2024-06-11T02:03:21.481Z",
    "size": 1031,
    "path": "../public/_nuxt/Products.d81de501.css"
  },
  "/_nuxt/_id_.77aa0a72.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"617-dMOFjPh7o2x8AtnWwEAHz+Lr9GU\"",
    "mtime": "2024-06-11T02:03:21.481Z",
    "size": 1559,
    "path": "../public/_nuxt/_id_.77aa0a72.css"
  },
  "/_nuxt/_id_.e82c9d48.js": {
    "type": "application/javascript",
    "etag": "\"1289-6wfyV7sR0EUSlsog50ltd7mdzIw\"",
    "mtime": "2024-06-11T02:03:21.481Z",
    "size": 4745,
    "path": "../public/_nuxt/_id_.e82c9d48.js"
  },
  "/_nuxt/cart.0c5b64f3.svg": {
    "type": "image/svg+xml",
    "etag": "\"558-BP7mlJ6529VLUgbHX1DbzZ+3a5Q\"",
    "mtime": "2024-06-11T02:03:21.481Z",
    "size": 1368,
    "path": "../public/_nuxt/cart.0c5b64f3.svg"
  },
  "/_nuxt/default.c06b3e40.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1423-38JmNr8782B1r2oLIoO0Bylv1A4\"",
    "mtime": "2024-06-11T02:03:21.480Z",
    "size": 5155,
    "path": "../public/_nuxt/default.c06b3e40.css"
  },
  "/_nuxt/default.ecccbd61.js": {
    "type": "application/javascript",
    "etag": "\"3485-7FhUoBSSf7rW+/5e0Y4Xt4RyeDc\"",
    "mtime": "2024-06-11T02:03:21.480Z",
    "size": 13445,
    "path": "../public/_nuxt/default.ecccbd61.js"
  },
  "/_nuxt/entry.0de8da1c.js": {
    "type": "application/javascript",
    "etag": "\"38b7f-XHIT+XuP++zgFWfHspBIu3HU8Fk\"",
    "mtime": "2024-06-11T02:03:21.480Z",
    "size": 232319,
    "path": "../public/_nuxt/entry.0de8da1c.js"
  },
  "/_nuxt/entry.3a188460.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"375d9-xqklBfLpclTdqDv9mXdDunpX98w\"",
    "mtime": "2024-06-11T02:03:21.479Z",
    "size": 226777,
    "path": "../public/_nuxt/entry.3a188460.css"
  },
  "/_nuxt/error-component.c155f483.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66c-x9JGbvZkI7SjQKmVtLEOM/vPdwU\"",
    "mtime": "2024-06-11T02:03:21.479Z",
    "size": 1644,
    "path": "../public/_nuxt/error-component.c155f483.css"
  },
  "/_nuxt/error-component.fc4a2867.js": {
    "type": "application/javascript",
    "etag": "\"2a3-XyhHhITLVb166uMSFCskN4IF8d4\"",
    "mtime": "2024-06-11T02:03:21.479Z",
    "size": 675,
    "path": "../public/_nuxt/error-component.fc4a2867.js"
  },
  "/_nuxt/fi-logo.15058b2b.svg": {
    "type": "image/svg+xml",
    "etag": "\"5aa-Uj6KlI4FfOGG0yc2Sqn0PWUVgcw\"",
    "mtime": "2024-06-11T02:03:21.478Z",
    "size": 1450,
    "path": "../public/_nuxt/fi-logo.15058b2b.svg"
  },
  "/_nuxt/index.234df5cf.js": {
    "type": "application/javascript",
    "etag": "\"be9-h3WTtypop3jieFAgEgFrti4Osoc\"",
    "mtime": "2024-06-11T02:03:21.478Z",
    "size": 3049,
    "path": "../public/_nuxt/index.234df5cf.js"
  },
  "/_nuxt/index.362a9548.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"138-fk6UR+4IuTb9Qwfn/t9aWIyJFco\"",
    "mtime": "2024-06-11T02:03:21.478Z",
    "size": 312,
    "path": "../public/_nuxt/index.362a9548.css"
  },
  "/_nuxt/jum1.40b7898b.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbc1-rvRovJWv++YrcSZsvuZQ/4fSUf8\"",
    "mtime": "2024-06-11T02:03:21.478Z",
    "size": 52161,
    "path": "../public/_nuxt/jum1.40b7898b.jpg"
  },
  "/_nuxt/jum2.5296dd3f.jpg": {
    "type": "image/jpeg",
    "etag": "\"c0da-mJdlDDsHlMI3jO+hMCv5a6hSgWs\"",
    "mtime": "2024-06-11T02:03:21.477Z",
    "size": 49370,
    "path": "../public/_nuxt/jum2.5296dd3f.jpg"
  },
  "/_nuxt/jum22.fcb18f36.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c066-PXbyJj+gzCfFwHjMkF1wcdIIQvg\"",
    "mtime": "2024-06-11T02:03:21.477Z",
    "size": 114790,
    "path": "../public/_nuxt/jum22.fcb18f36.jpg"
  },
  "/_nuxt/jum3.7d76dc99.jpg": {
    "type": "image/jpeg",
    "etag": "\"16e99-g2F4yi9fQb8DhqOcjaLYi8+yheM\"",
    "mtime": "2024-06-11T02:03:21.477Z",
    "size": 93849,
    "path": "../public/_nuxt/jum3.7d76dc99.jpg"
  },
  "/_nuxt/new.98d2880f.js": {
    "type": "application/javascript",
    "etag": "\"15e-kqTy0KdMpMmK3cuQi3SW643VrjA\"",
    "mtime": "2024-06-11T02:03:21.476Z",
    "size": 350,
    "path": "../public/_nuxt/new.98d2880f.js"
  },
  "/_nuxt/new.f5f5011e.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e4c5-Mp7t/is8fTegK9JQCxxqZzyO+Gs\"",
    "mtime": "2024-06-11T02:03:21.476Z",
    "size": 124101,
    "path": "../public/_nuxt/new.f5f5011e.jpg"
  },
  "/_nuxt/nuxt-link.7576bba2.js": {
    "type": "application/javascript",
    "etag": "\"10e1-Oek2uxWF68m22aeW5y1mxqBJW94\"",
    "mtime": "2024-06-11T02:03:21.476Z",
    "size": 4321,
    "path": "../public/_nuxt/nuxt-link.7576bba2.js"
  },
  "/_nuxt/speaker.889da98f.js": {
    "type": "application/javascript",
    "etag": "\"6c-4ErmYFhoSQ5IV0t+7dM4WX3EfKA\"",
    "mtime": "2024-06-11T02:03:21.475Z",
    "size": 108,
    "path": "../public/_nuxt/speaker.889da98f.js"
  },
  "/_nuxt/speaker.a5b09f45.jpg": {
    "type": "image/jpeg",
    "etag": "\"1473e-3x0OjJSjqmWnNwSeGdKBXAiEFw8\"",
    "mtime": "2024-06-11T02:03:21.475Z",
    "size": 83774,
    "path": "../public/_nuxt/speaker.a5b09f45.jpg"
  },
  "/_nuxt/table-1.a719f755.jpg": {
    "type": "image/jpeg",
    "etag": "\"483b-0ljxEX1GopPlO+/ztQVzUHybAJY\"",
    "mtime": "2024-06-11T02:03:21.475Z",
    "size": 18491,
    "path": "../public/_nuxt/table-1.a719f755.jpg"
  },
  "/_nuxt/table-2.15f28746.jpg": {
    "type": "image/jpeg",
    "etag": "\"71bd-M7ORYlRENjxnMWTbnP6Hj6UBuLM\"",
    "mtime": "2024-06-11T02:03:21.474Z",
    "size": 29117,
    "path": "../public/_nuxt/table-2.15f28746.jpg"
  },
  "/_nuxt/table-3.d4376d9d.jpg": {
    "type": "image/jpeg",
    "etag": "\"b760-1/ZKFW408z8Z4vUk62TxTShb6pw\"",
    "mtime": "2024-06-11T02:03:21.473Z",
    "size": 46944,
    "path": "../public/_nuxt/table-3.d4376d9d.jpg"
  },
  "/_nuxt/useAsset.e6e320bc.js": {
    "type": "application/javascript",
    "etag": "\"39670-8O4mgIRlNMesuAdwhfTfHdbO08c\"",
    "mtime": "2024-06-11T02:03:21.472Z",
    "size": 235120,
    "path": "../public/_nuxt/useAsset.e6e320bc.js"
  },
  "/contact/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"60c3-l5W/P/3mx17bVk67JuojvC0+XEY\"",
    "mtime": "2024-06-11T02:03:22.795Z",
    "size": 24771,
    "path": "../public/contact/index.html"
  },
  "/products/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"69cc-GjdDQSPqK9n2nqlj3zoj9iu2Tdw\"",
    "mtime": "2024-06-11T02:03:22.778Z",
    "size": 27084,
    "path": "../public/products/index.html"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const disallow = [];
const sitemap = ["https://vue-ecom.vercel.app/sitemap.xml"];
const indexable = true;
const robotsDisabledValue = "noindex, nofollow";

const asArray = (v) => Array.isArray(v) ? v : [v];
const _yqucSz = defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "text/plain");
  const debug = "";
  const sitemapLink = (sitemap && indexable ? asArray(sitemap || []) : []).map((path) => `Sitemap: ${path}`).join("\n");
  const disallowedPaths = (asArray(disallow || []) ).map((path) => `Disallow: ${path}`).join("\n");
  return `${debug}User-agent: *
${disallowedPaths}
${sitemapLink}`;
});

const _cTY70U = defineEventHandler((event) => {
  if (event.path === "/robots.txt")
    return;
  const routeRules = getRouteRules(event);
  if (typeof routeRules.robots === "string")
    setHeader(event, "X-Robots-Tag", routeRules.robots);
  else if (routeRules.index === false || indexable === false)
    setHeader(event, "X-Robots-Tag", robotsDisabledValue);
});

const _lazy_14ma9P = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });
const _lazy_zZSEHY = () => import('../handlers/og.png.mjs');
const _lazy_ud7M5C = () => import('../handlers/html.mjs');
const _lazy_ELHcSs = () => import('../handlers/options.mjs');
const _lazy_YOm7aK = () => import('../handlers/svg.mjs');
const _lazy_jLWNsL = () => import('../handlers/vnode.mjs');
const _lazy_2iLsRC = () => import('../handlers/font.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_14ma9P, lazy: true, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _yqucSz, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _cTY70U, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _lazy_zZSEHY, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-html', handler: _lazy_ud7M5C, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-options', handler: _lazy_ELHcSs, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-svg', handler: _lazy_YOm7aK, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-vnode', handler: _lazy_jLWNsL, lazy: true, middleware: false, method: undefined },
  { route: '/api/og-image-font', handler: _lazy_2iLsRC, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_14ma9P, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  gracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const listener = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { useRuntimeConfig as a, useStorage as b, defineCachedEventHandler as d, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
