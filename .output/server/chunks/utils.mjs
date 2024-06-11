import { existsSync, promises } from 'node:fs';
import { getQuery, getRequestHeader } from 'h3';
import { join } from 'pathe';
import { a as useRuntimeConfig } from './nitro/node-server.mjs';

const defaults = {"component":"OgImageBasic","width":1200,"height":630};
const fonts = ["Inter:400","Inter:700"];
const satoriOptions = {};
const assetDirs = ["/Users/mac/Documents/Projekty_GitHUB/Vue-Ecom/public","/Users/mac/Documents/Projekty_GitHUB/Vue-Ecom/node_modules/nuxt-og-image/dist/runtime/public-assets"];

function wasmLoader(key, fallback, baseUrl) {
  let promise;
  let loaded = false;
  return {
    loaded() {
      if (loaded)
        return true;
      if (typeof promise !== "undefined")
        return promise;
      return false;
    },
    async load() {
      promise = promise || new Promise(async (resolve) => {
        let wasm;
        try {
          wasm = await key;
          if (typeof wasm === "string")
            wasm = void 0;
        } catch (e) {
        }
        if (!wasm)
          wasm = await readPublicAsset(fallback);
        if (!wasm) {
          const url = new URL(baseUrl);
          wasm = await (await fetch(`${url.origin}${fallback}`)).arrayBuffer();
        }
        loaded = true;
        resolve(wasm);
      });
      return promise;
    }
  };
}
function fetchOptions(e, path) {
  const fetchOptions2 = {
    baseURL: useHostname(e)
  };
  return globalThis.$fetch("/api/og-image-options", {
    query: {
      ...getQuery(e),
      path
    },
    ...fetchOptions2
  });
}
function base64ToArrayBuffer(base64) {
  const buffer = Buffer.from(base64, "base64");
  return new Uint8Array(buffer).buffer;
}
function renderIsland(payload) {
  return globalThis.$fetch(`/__nuxt_island/${payload.component}`, {
    query: { props: JSON.stringify(payload) }
  });
}
function useHostname(e) {
  const host = getRequestHeader(e, "host") || process.env.NITRO_HOST || process.env.HOST || "localhost";
  const protocol = getRequestHeader(e, "x-forwarded-proto") || "http";
  const useHttp = host.includes("127.0.0.1") || host.includes("localhost") || protocol === "http";
  const port = host.includes(":") ? host.split(":").pop() : process.env.NITRO_PORT || process.env.PORT;
  const base = useRuntimeConfig().app.baseURL;
  return `http${useHttp ? "" : "s"}://${host.includes(":") ? host.split(":")[0] : host}${port ? `:${port}` : ""}${base}`;
}
const r = (base, key) => {
  return join(base, key.replace(/:/g, "/"));
};
async function readPublicAsset(file, encoding) {
  for (const assetDir of assetDirs) {
    const path = r(assetDir, file);
    if (existsSync(path))
      return await promises.readFile(path, { encoding });
  }
}
async function readPublicAssetBase64(file) {
  const base64 = await readPublicAsset(file, "base64");
  if (base64) {
    let type = "image/jpeg";
    const ext = file.split(".").pop();
    if (ext === "svg")
      type = "image/svg+xml";
    else if (ext === "png")
      type = "image/png";
    return `data:${type};base64,${base64}`;
  }
}

export { fonts as a, base64ToArrayBuffer as b, readPublicAsset as c, defaults as d, readPublicAssetBase64 as e, fetchOptions as f, renderIsland as r, satoriOptions as s, useHostname as u, wasmLoader as w };
//# sourceMappingURL=utils.mjs.map
