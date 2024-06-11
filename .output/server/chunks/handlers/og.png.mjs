import { defineEventHandler, setHeader, createError } from 'h3';
import { parseURL, withoutTrailingSlash, withBase } from 'ufo';
import { f as fetchOptions, u as useHostname } from '../utils.mjs';
import { u as useProvider } from '../rollup/provider.mjs';
import 'node:fs';
import 'pathe';
import '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:url';
import 'http-graceful-shutdown';
import 'satori-html';
import 'twemoji';
import 'svg2png-wasm';
import 'satori';

const og_png = defineEventHandler(async (e) => {
  const path = parseURL(e.path).pathname;
  if (!path.endsWith("__og_image__/og.png"))
    return;
  const basePath = withoutTrailingSlash(
    path.replace("__og_image__/og.png", "")
  );
  setHeader(e, "Content-Type", "image/png");
  setHeader(e, "Cache-Control", "no-cache, no-store, must-revalidate");
  setHeader(e, "Pragma", "no-cache");
  setHeader(e, "Expires", "0");
  const options = await fetchOptions(e, basePath);
  const provider = await useProvider(options.provider);
  if (!provider) {
    throw createError({
      statusCode: 500,
      statusMessage: `Provider ${options.provider} is missing.`
    });
  }
  return provider.createPng(withBase(basePath, useHostname(e)), options);
});

export { og_png as default };
//# sourceMappingURL=og.png.mjs.map
