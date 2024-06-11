import { html } from 'satori-html';
import { withBase, parseURL } from 'ufo';
import twemoji from 'twemoji';
import { b as base64ToArrayBuffer, c as readPublicAsset, e as readPublicAssetBase64, w as wasmLoader, s as satoriOptions, a as fonts } from '../utils.mjs';
import { b as useStorage } from '../nitro/node-server.mjs';
import { initialize, svg2png as svg2png$1 } from 'svg2png-wasm';
import satori$2 from 'satori';

const cachedFonts = {};
async function loadFont(font) {
  if (cachedFonts[font])
    return cachedFonts[font];
  let data;
  const storageKey = `assets:nuxt-og-imagee:font:${font}`;
  if (await useStorage().hasItem(storageKey)) {
    data = base64ToArrayBuffer(await useStorage().getItem(storageKey));
    return cachedFonts[font] = { name: font, data, style: "normal" };
  }
  const [name, weight] = font.split(":");
  if (name === "Inter" && ["400", "700"].includes(weight)) {
    const data2 = await readPublicAsset(`/inter-latin-ext-${weight}-normal.woff`);
    if (data2)
      return cachedFonts[font] = { name, weight: Number(weight), data: data2, style: "normal" };
  }
  if (!data) {
    const fontUrl = await globalThis.$fetch("/api/og-image-font", {
      query: { name, weight }
    });
    data = await globalThis.$fetch(fontUrl, {
      responseType: "arrayBuffer"
    });
  }
  await useStorage().setItem(storageKey, Buffer.from(data).toString("base64"));
  return cachedFonts[font] = { name, weight: Number(weight), data, style: "normal" };
}
async function walkSatoriTree(url, node, plugins) {
  if (!node.props?.children)
    return;
  if (Array.isArray(node.props.children) && node.props.children.length === 0) {
    delete node.props.children;
    return;
  }
  for (const child of node.props.children || []) {
    if (child) {
      for (const plugin of plugins) {
        if (plugin.filter(child))
          await plugin.transform(child);
      }
      await walkSatoriTree(url, child, plugins);
    }
  }
}
function defineSatoriTransformer(transformer) {
  return transformer;
}

const imageSrc = defineSatoriTransformer((url) => {
  return {
    filter: (node) => node.type === "img",
    transform: async (node) => {
      const src = node.props?.src;
      if (src && src.startsWith("/")) {
        const file = await readPublicAssetBase64(src);
        if (file)
          node.props.src = file;
        else
          node.props.src = withBase(src, `${url.protocol}//${url.host}`);
      }
    }
  };
});

const twClasses = defineSatoriTransformer(() => {
  return {
    filter: (node) => !!node.props?.class && !node.props?.tw,
    transform: async (node) => {
      node.props.tw = node.props.class;
    }
  };
});

const flex = defineSatoriTransformer(() => {
  return {
    filter: (node) => node.type === "div" && (Array.isArray(node.props?.children) && node.props?.children.length >= 1) && (!node.props.style?.display && !node.props?.class?.includes("hidden")),
    transform: async (node) => {
      node.props.style = node.props.style || {};
      node.props.style.display = "flex";
      if (!node.props?.class?.includes("flex-"))
        node.props.style.flexDirection = "column";
    }
  };
});

const emojis = defineSatoriTransformer(() => {
  return {
    filter: (node) => node.type === "img" && node.props?.class?.includes("emoji"),
    transform: async (node) => {
      node.props.style = node.props.style || {};
      node.props.style.height = "1em";
      node.props.style.width = "1em";
      node.props.style.margin = "0 .05em 0 .1em";
      node.props.style.verticalAlign = "0.1em";
    }
  };
});

const encoding = defineSatoriTransformer(() => {
  return {
    filter: (node) => typeof node.props?.children === "string",
    transform: async (node) => {
      node.props.children = node.props.children.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
    }
  };
});

async function svg2png(svg, options) {
  const loader = wasmLoader("/* NUXT_OG_IMAGE_SVG2PNG_WASM */", "/svg2png.wasm", options.baseUrl);
  if (!await loader.loaded())
    await initialize(await loader.load()).catch(() => {
    });
  return await svg2png$1(svg, options);
}

async function loadSvg2png() {
 return svg2png
}

function satori$1(nodes, options) {
  return satori$2(nodes, options);
}

async function loadSatori() {
  return satori$1
}

const satoriFonts = [];
let fontLoadPromise = null;
function loadFonts(fonts2) {
  if (fontLoadPromise)
    return fontLoadPromise;
  return fontLoadPromise = Promise.all(fonts2.map((font) => loadFont(font)));
}
const satori = {
  name: "satori",
  createPng: async function createPng(baseUrl, options) {
    const svg = await this.createSvg(baseUrl, options);
    const svg2png = await loadSvg2png();
    return svg2png(svg, { baseUrl, ...options });
  },
  createVNode: async function createVNode(baseUrl, options) {
    const url = parseURL(baseUrl);
    const html$1 = await globalThis.$fetch("/api/og-image-html", {
      query: { path: url.pathname, options: JSON.stringify(options) }
    });
    const body = html$1.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1];
    const emojiedFont = twemoji.parse(body, {
      folder: "svg",
      ext: ".svg"
    });
    const satoriTree = html(emojiedFont);
    await walkSatoriTree(url, satoriTree, [
      // @todo add user land support
      emojis(url),
      twClasses(url),
      imageSrc(url),
      flex(url),
      encoding(url)
    ]);
    return satoriTree;
  },
  createSvg: async function createSvg(baseUrl, options) {
    const vnodes = await this.createVNode(baseUrl, options);
    if (!satoriFonts.length)
      satoriFonts.push(...await loadFonts(fonts));
    const satori = await loadSatori();
    return await satori(vnodes, {
      ...satoriOptions,
      baseUrl,
      fonts: satoriFonts,
      embedFont: true,
      width: options.width,
      height: options.height
    });
  }
};

async function screenshot(browser, options) {
  const page = await browser.newPage({
    colorScheme: options.colorScheme
  });
  await page.setViewportSize({
    width: options.width || 1200,
    height: options.height || 630
  });
  if (options.path.startsWith("html:")) {
    await page.evaluate((html) => {
      document.open("text/html");
      document.write(html);
      document.close();
    }, options.path.substring(5));
    await page.waitForLoadState("networkidle");
  } else {
    await page.goto(`${options.host}${options.path}`, {
      timeout: 1e4,
      waitUntil: "networkidle"
    });
  }
  if (options.delay)
    await page.waitForTimeout(options.delay);
  if (options.mask) {
    await page.evaluate((mask) => {
      for (const el of document.querySelectorAll(mask))
        el.style.display = "none";
    }, options.mask);
  }
  if (options.selector)
    return await page.locator(options.selector).screenshot();
  return await page.screenshot();
}

async function loadBrowser() {
 return () => {}
}

const browser = {
  name: "browser",
  createSvg: async function createSvg() {
    throw new Error("Browser provider can't create SVGs.");
  },
  createVNode: async function createVNode() {
    throw new Error("Browser provider can't create VNodes.");
  },
  createPng: async function createPng(basePath, options) {
    const url = new URL(basePath);
    const createBrowser = await loadBrowser();
    const browser = await createBrowser();
    if (browser) {
      return screenshot(browser, {
        ...options,
        host: url.origin,
        path: `/api/og-image-html?path=${url.pathname}`
      });
    }
    return null;
  }
};

async function useProvider(provider) {
  if (provider === 'satori')
    return satori
  if (provider === 'browser')
    return browser
}

export { useProvider as u };
//# sourceMappingURL=provider.mjs.map
