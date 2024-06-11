import { a as useMainStore, b as useRoute, u as useHead, e as useRuntimeConfig, f as useRouter, g as useSchemaOrg, h as defineWebSite, i as defineWebPage, s as serverUseHead, d as useNuxtApp, _ as _export_sfc } from '../server.mjs';
import { useSSRContext, mergeProps, unref, defineComponent, computed, withCtx, createTextVNode, toDisplayString, ref, createVNode } from 'vue';
import { klona } from 'klona';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { withBase, withoutTrailingSlash } from 'ufo';
import { _ as __nuxt_component_0$1 } from './nuxt-link-5d0b373b.mjs';
import { u as useAsset, _ as _imports_0, a as _imports_1, b as _imports_2, c as _imports_3, d as _imports_0$1 } from './useAsset-2c2d2edb.mjs';
import { _ as __nuxt_component_0$2 } from './Notification-5b3bed98.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import 'vue-router';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import './new-447e3bc7.mjs';
import './speaker-9e99ac69.mjs';

function useServerHead(input, options = {}) {
  return serverUseHead(input, { ...options, mode: "server" });
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const robotsEnabledValue = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const robotsDisabledValue = "noindex, nofollow";
function defineRobotMeta() {
  {
    const nuxtApp = useNuxtApp();
    useHead({
      meta: [
        {
          name: "robots",
          content: () => {
            var _a, _b, _c, _d;
            const routeRules = (_d = (_c = (_b = (_a = nuxtApp == null ? void 0 : nuxtApp.ssrContext) == null ? void 0 : _a.event) == null ? void 0 : _b.context) == null ? void 0 : _c._nitro) == null ? void 0 : _d.routeRules;
            if (typeof routeRules.robots === "string")
              return routeRules.robots;
            return (routeRules == null ? void 0 : routeRules.index) === false ? robotsDisabledValue : robotsEnabledValue;
          }
        }
      ]
    }, { mode: "server" });
  }
}
const siteUrl = "https://vue-ecom.vercel.app";
function resolveTrailingSlash(path) {
  return withoutTrailingSlash(path);
}
function resolveAbsoluteInternalLink(path) {
  return withBase(resolveTrailingSlash(path), siteUrl);
}
function createInternalLinkResolver() {
  return (path) => {
    return withBase(withoutTrailingSlash(path), siteUrl);
  };
}
function titleCase(s) {
  s = s.replaceAll("-", " ");
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
}
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "SeoKit",
  __ssrInlineRender: true,
  props: {
    siteUrl: {},
    siteName: {},
    siteDescription: {},
    siteImage: {},
    titleSeparator: {},
    language: {}
  },
  setup(__props) {
    const props = __props;
    const runtimeConfig = useRuntimeConfig().public;
    const appConfig = useAppConfig();
    const SeoKitPublicRuntimeConfigKeys = [
      "siteName",
      "siteDescription",
      "siteImage",
      "siteUrl",
      "titleSeparator",
      "trailingSlash",
      "language"
    ];
    const siteMeta = computed(() => {
      const runtimeConfigExtract = {};
      for (const k of SeoKitPublicRuntimeConfigKeys) {
        if (runtimeConfig[k])
          runtimeConfigExtract[k] = runtimeConfig[k];
      }
      const propExtract = {};
      for (const k of SeoKitPublicRuntimeConfigKeys) {
        if (props[k])
          propExtract[k] = props[k];
      }
      return {
        ...runtimeConfigExtract,
        // app config has the highest priority
        // @ts-expect-error untyped
        ...appConfig.site,
        ...propExtract
      };
    });
    const router = useRouter();
    const route = router.currentRoute;
    const resolveUrl = createInternalLinkResolver();
    function computeMeta() {
      var _a, _b, _c, _d, _e;
      const meta = [
        {
          property: "og:url",
          content: resolveUrl(((_a = route.value) == null ? void 0 : _a.path) || "/")
        },
        {
          property: "og:locale",
          content: siteMeta.value.language
        }
      ];
      if (siteMeta.value.siteName) {
        meta.push({
          property: "og:site_name",
          content: siteMeta.value.siteName
        });
      }
      let ogImage = ((_c = (_b = route.value) == null ? void 0 : _b.meta) == null ? void 0 : _c.image) || siteMeta.value.siteImage;
      if (typeof ogImage === "string") {
        if (ogImage.startsWith("/"))
          ogImage = resolveAbsoluteInternalLink(ogImage);
        meta.push({
          property: "og:image",
          content: ogImage
        });
      }
      const description = ((_e = (_d = route.value) == null ? void 0 : _d.meta) == null ? void 0 : _e.description) || siteMeta.value.siteDescription;
      if (description) {
        meta.push({
          name: "description",
          content: description
        });
      }
      return meta;
    }
    useHead({
      templateParams: {
        // @ts-expect-error untyped
        siteName: () => siteMeta.value.siteName,
        // @ts-expect-error untyped
        siteDescription: () => siteMeta.value.siteDescription,
        // @ts-expect-error untyped
        siteImage: () => siteMeta.value.siteImage,
        // @ts-expect-error untyped
        siteUrl: () => siteMeta.value.siteUrl,
        // @ts-expect-error untyped
        titleSeparator: () => siteMeta.value.titleSeparator,
        // @ts-expect-error untyped
        trailingSlash: () => siteMeta.value.trailingSlash,
        // @ts-expect-error untyped
        language: () => siteMeta.value.language
      },
      htmlAttrs: {
        lang: () => siteMeta.value.language
      },
      title: () => {
        var _a, _b, _c, _d, _e;
        if (typeof ((_b = (_a = route.value) == null ? void 0 : _a.meta) == null ? void 0 : _b.title) === "string")
          return (_d = (_c = route.value) == null ? void 0 : _c.meta) == null ? void 0 : _d.title;
        const path = ((_e = route.value) == null ? void 0 : _e.path) || "/";
        const lastSegment = path.split("/").pop();
        return lastSegment ? titleCase(lastSegment) : null;
      },
      link: [
        {
          rel: "canonical",
          href: () => {
            var _a;
            return resolveUrl(((_a = route.value) == null ? void 0 : _a.path) || "/");
          }
        }
      ],
      meta: computeMeta
    });
    useServerHead({
      meta: [
        {
          property: "og:type",
          content: "website"
        }
      ],
      link: [
        {
          rel: "profile",
          href: "https://gmpg.org/xfn/11"
        }
      ]
    });
    defineRobotMeta();
    useSchemaOrg([
      defineWebSite({
        name: () => {
          var _a;
          return ((_a = siteMeta.value) == null ? void 0 : _a.siteName) || "";
        },
        inLanguage: () => {
          var _a;
          return ((_a = siteMeta.value) == null ? void 0 : _a.language) || "";
        },
        description: () => {
          var _a;
          return ((_a = siteMeta.value) == null ? void 0 : _a.siteDescription) || "";
        }
      }),
      defineWebPage()
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-seo-kit/components/SeoKit.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "dropdown d-xl-none d-lg-none mr-auto" }, _attrs))}><img src="https://img.icons8.com/office/35/menu--v1.png" width="28" height="28" data-bs-toggle="dropdown" data-bs-target="#navd" aria-haspopup="true" aria-expanded="false" alt="mobile-menu" title="mobile-menu"><div class="dropdown-menu hb" aria-labelledby="navd">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "dropdown-item",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "dropdown-item",
    to: "/products"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Products`);
      } else {
        return [
          createTextVNode("Products")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "dropdown-item",
    to: "/contact"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact us`);
      } else {
        return [
          createTextVNode("Contact us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/MobileMenu.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$c = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({ class: "navbar-brand py-0 pl-5" }, _attrs))}><img${ssrRenderAttr("src", _imports_0$1)} width="40" height="40" alt="site-logo" title="site-logo"></span>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/Logo.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "NavLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const navLinks = [
      {
        name: "Home",
        Link: "/"
      },
      {
        name: "Products",
        Link: "/products"
      },
      {
        name: "Contact",
        Link: "/contact"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "navbar-item bc d-none d-xl-block d-lg-block py-0" }, _attrs))}><!--[-->`);
      ssrRenderList(navLinks, (link, idx) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.Link,
          id: idx
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/NavLinks.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "searc d-none d-xl-block d-lg-block pr-3" }, _attrs))} data-v-c16eef0b><input type="search" class="search" data-v-c16eef0b></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/SearchBar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-c16eef0b"]]);
const _sfc_main$9 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "user" }, _attrs))}><img data-bs-toggle="modal" data-bs-target="#userModal" width="25" height="25" src="https://img.icons8.com/ultraviolet/40/gender-neutral-user.png" alt="gender-neutral-user" title="gender-neutral-user"></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/Profile.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CartButton",
  __ssrInlineRender: true,
  emits: ["open"],
  setup(__props) {
    const store = useMainStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bag" }, _attrs))} data-v-50fea22a><img class="pb-1" src="https://img.icons8.com/ultraviolet/70/shopping-cart.png" alt="move-by-trolley" title="cart-trolley" data-v-50fea22a>`);
      if (unref(store).itemsNumber) {
        _push(`<span class="mb-3" data-v-50fea22a>${ssrInterpolate(unref(store).itemsNumber)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/CartButton.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-50fea22a"]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "modal fade",
    tabindex: "-1",
    id: "userModal",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, _attrs))}><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-bs-dismiss="modal" style="${ssrRenderStyle({ "outline-style": "none" })}" aria-label="Close"><span>x</span></button><form class="px-3 py-2"><div class="form-group"><label for="exampleDropdownFormEmail1">Email address</label><input type="email" class="form-control" placeholder="email~example.com"></div><div class="form-group"><label for="exampleDropdownFormPassword1">Password</label><input type="password" class="form-control" placeholder="Password"></div><div class="form-check"><input type="checkbox" class="form-check-input"><label class="form-check-label" for="dropdownCheck"> Remember me </label></div><button type="submit" class="btn-xl btn-success mt-3">Sign in</button></form></div><div class="modal-footer"><a class="dropdown-item" href="#">Forgot password?</a><a class="dropdown-item text-right" href="#">Sign up</a></div></div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/UserModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    useMainStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4" data-v-b510fda2><img${ssrRenderAttr("src", ("useAsset" in _ctx ? _ctx.useAsset : unref(useAsset))(_ctx.item.img))} style="${ssrRenderStyle({ "width": "90px" })}" alt="cart-item" title="cart-item" data-v-b510fda2></div><div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6" data-v-b510fda2><h4 data-v-b510fda2>${ssrInterpolate(_ctx.item.title)}</h4><h6 data-v-b510fda2>$${ssrInterpolate(_ctx.item.price)}</h6></div><div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4" data-v-b510fda2><span class="remove-btn" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-b510fda2>remove</span></div><!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cart/Item.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-b510fda2"]]);
useMainStore();
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "row align-items-center p-2",
    style: { "background": "#7dcf85" }
  }, _attrs))}><div class="col pl-3 pt-3"><h4>Subtotal</h4><p class="fs-6 px-3" style="${ssrRenderStyle({ "color": "#303E49", "margin-top": "-8px" })}">${ssrInterpolate(`(${_ctx.store.itemsNumber} items)`)}</p></div><div class="col text-center pr-3"><h4>$${ssrInterpolate(_ctx.store.totalPrice)}</h4></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cart/Total.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$4 = {
  __name: "Cart",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const cart = __props;
    const store = useMainStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Notification = __nuxt_component_0$2;
      const _component_CartItem = __nuxt_component_1$1;
      const _component_CartTotal = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ff50436b><div class="${ssrRenderClass(["cart", cart.isOpen ? "on" : ""])}" data-v-ff50436b><div class="cart-menu" data-v-ff50436b><p class="text-center mt-4 pb-2 h3" data-v-ff50436b>Cart</p><hr data-v-ff50436b>`);
      if (!unref(store).itemsNumber) {
        _push(ssrRenderComponent(_component_Notification, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Your cart is empty, try to Add stuff. `);
            } else {
              return [
                createTextVNode(" Your cart is empty, try to Add stuff. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(store).cartItems, (item) => {
        _push(`<div class="row" data-v-ff50436b>`);
        _push(ssrRenderComponent(_component_CartItem, { item }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(store).itemsNumber) {
        _push(`<div data-v-ff50436b><hr data-v-ff50436b>`);
        _push(ssrRenderComponent(_component_CartTotal, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="${ssrRenderClass(["modal", cart.isOpen ? "" : "off"])}" data-v-ff50436b></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/Cart.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ff50436b"]]);
const _sfc_main$3 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = ref(false);
    const cartState = () => cart.value = !cart.value;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderMobileMenu = __nuxt_component_0;
      const _component_HeaderLogo = __nuxt_component_1$2;
      const _component_HeaderNavLinks = _sfc_main$b;
      const _component_HeaderSearchBar = __nuxt_component_3$1;
      const _component_HeaderProfile = __nuxt_component_4;
      const _component_HeaderCartButton = __nuxt_component_5;
      const _component_HeaderUserModal = __nuxt_component_6;
      const _component_HeaderCart = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}><nav class="navbar">`);
      _push(ssrRenderComponent(_component_HeaderMobileMenu, null, null, _parent));
      _push(`<div class="navbar-group">`);
      _push(ssrRenderComponent(_component_HeaderLogo, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderNavLinks, null, null, _parent));
      _push(`</div><div class="navbar-group">`);
      _push(ssrRenderComponent(_component_HeaderSearchBar, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderProfile, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderCartButton, { onOpen: cartState }, null, _parent));
      _push(`</div></nav>`);
      _push(ssrRenderComponent(_component_HeaderUserModal, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderCart, {
        "is-open": unref(cart),
        onCloseCart: cartState
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$3;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Newsletter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "newsletter-area" }, _attrs))} data-v-624a9687><div class="container" data-v-624a9687><div class="row justify-content-between" data-v-624a9687><div class="col-12 col-lg-6" data-v-624a9687><div class="newsletter-text" data-v-624a9687><h2 data-v-624a9687>Join our Newsletter</h2><p data-v-624a9687>Nulla ac convallis lorem, eget euismod nisl. bibendum nec.</p></div></div><div class="col-12 col-lg-4" data-v-624a9687><div class="newsletter-form" data-v-624a9687><form data-v-624a9687><input class="nl-email" placeholder="Your E-mail" data-v-624a9687><button class="input-button" data-v-624a9687>Submit</button></form></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Newsletter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-624a9687"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer_area" }, _attrs))} data-v-aa922d4a><div class="container" data-v-aa922d4a><div class="row justify-content-between" data-v-aa922d4a><div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3" data-v-aa922d4a><div class="footer-widget" data-v-aa922d4a><div class="footer-title" data-v-aa922d4a>Navigate</div><ul class="list-unstyled" data-v-aa922d4a>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>About Us</li>`);
      } else {
        return [
          createVNode("li", null, "About Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Blog</li>`);
      } else {
        return [
          createVNode("li", null, "Blog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Contact Us</li>`);
      } else {
        return [
          createVNode("li", null, "Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Sitemap</li>`);
      } else {
        return [
          createVNode("li", null, "Sitemap")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</ul></div></div><div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3" data-v-aa922d4a><div class="footer-widget" data-v-aa922d4a><div class="footer-title" data-v-aa922d4a>Collection</div><ul class="list-unstyled" data-v-aa922d4a>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>New arrivals</li>`);
      } else {
        return [
          createVNode("li", null, "New arrivals")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Featured</li>`);
      } else {
        return [
          createVNode("li", null, "Featured")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Catalog</li>`);
      } else {
        return [
          createVNode("li", null, "Catalog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Brands</li>`);
      } else {
        return [
          createVNode("li", null, "Brands")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</ul></div></div><div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3" data-v-aa922d4a><div class="footer-widget" data-v-aa922d4a><div class="footer-title" data-v-aa922d4a>Categories</div><ul class="list-unstyled" data-v-aa922d4a>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Tables</li>`);
      } else {
        return [
          createVNode("li", null, "Tables")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Lamps</li>`);
      } else {
        return [
          createVNode("li", null, "Lamps")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Chairs</li>`);
      } else {
        return [
          createVNode("li", null, "Chairs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<li data-v-aa922d4a${_scopeId}>Sofas</li>`);
      } else {
        return [
          createVNode("li", null, "Sofas")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</ul></div></div><div class="col-12 col-xl-6 col-lg-3 col-md-3 col-sm-12 text-left text-md-right pb-5" data-v-aa922d4a><div class="footer-widget" data-v-aa922d4a><h3 data-v-aa922d4a>399 Crowfield Road,</h3><h4 data-v-aa922d4a>Phoenix, Arizona 85012</h4><a href="mailto:#" data-v-aa922d4a>asff@fdsfsdc.com</a><h5 data-v-aa922d4a>+602-926-5809</h5></div></div></div><div class="row justify-content-between" data-v-aa922d4a><div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6" data-v-aa922d4a><div class="tiny-footer" data-v-aa922d4a><p data-v-aa922d4a>Copyright \xA9 All Rights Reserved 2020 </p></div></div><div class="col-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 text-right" data-v-aa922d4a><div class="social-info" data-v-aa922d4a><strong data-v-aa922d4a>Get social</strong><img width="35" height="25" loading="lazy"${ssrRenderAttr("src", _imports_0)} alt="twitter-icon" title="twitter-icon" data-v-aa922d4a><img width="35" height="25" loading="lazy"${ssrRenderAttr("src", _imports_1)} alt="pinterest-icon" title="pinterest-icon" data-v-aa922d4a><img width="35" height="25" loading="lazy"${ssrRenderAttr("src", _imports_2)} alt="facebook-icon" title="facebook-icon" data-v-aa922d4a><img width="35" height="25" loading="lazy"${ssrRenderAttr("src", _imports_3)} alt="instagram-icon" title="instagram-icon" data-v-aa922d4a></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-aa922d4a"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useHead({
      title: "V-Store",
      meta: [
        { property: "og:title", content: `V-Store - ${route.meta.title}` },
        { property: "og:image", content: useAsset("jum1.jpg") }
      ],
      link: [
        { rel: "canonical", href: process.env.NUXT_PUBLIC_SITE_URL || "https://vue-ecom.vercel.app" },
        { rel: "icon", type: "image/x-icon", href: "/fi.ico" }
      ],
      htmlAttrs: { lang: "en-US" }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SeoKit = _sfc_main$e;
      const _component_Header = __nuxt_component_1;
      const _component_Newsletter = __nuxt_component_2;
      const _component_Footer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SeoKit, null, null, _parent));
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (unref(route).path != "/contact") {
        _push(ssrRenderComponent(_component_Newsletter, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-ea0bdc70.mjs.map
