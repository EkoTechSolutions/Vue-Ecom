import { _ as __nuxt_component_0$1 } from './nuxt-link-5d0b373b.mjs';
import { useSSRContext, defineComponent, withCtx, createTextVNode, toDisplayString, ref, unref, reactive, computed, mergeProps, createElementBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, a as useMainStore, b as useRoute } from '../server.mjs';
import { u as useAsset } from './useAsset-2c2d2edb.mjs';
import 'ufo';
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
import 'klona';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  props: {
    details: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a32b68ea><nav class="row justify-content-start" aria-label="breadcrumb" data-v-a32b68ea><ol class="breadcrumb" data-v-a32b68ea><li class="breadcrumb-item" data-v-a32b68ea>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
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
      _push(`</li><li class="breadcrumb-item" data-v-a32b68ea>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
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
      _push(`</li><li class="breadcrumb-item" data-v-a32b68ea>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.details.type)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.details.type), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active" data-v-a32b68ea>${ssrInterpolate(_ctx.details.title)}</li></ol></nav></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Details/Breadcrumb.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a32b68ea"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Box",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    useMainStore();
    const quantity = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-2f2a1d26><div class="row mb-5" data-v-2f2a1d26><div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12" data-v-2f2a1d26><img class="img-fluid"${ssrRenderAttr("src", ("useAsset" in _ctx ? _ctx.useAsset : unref(useAsset))(_ctx.item.img))} data-v-2f2a1d26></div><div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start" data-v-2f2a1d26><div class="info pt-xl-0 pt-lg-0 pt-5" data-v-2f2a1d26><span class="float-left pr-3" data-v-2f2a1d26>\u2605\u2605\u2605\u2605\u2605</span><h6 style="${ssrRenderStyle({ "width": "190px" })}" data-v-2f2a1d26>3 reviews</h6><h1 class="font-weight-bold text-uppercase pt-3" data-v-2f2a1d26>${ssrInterpolate(_ctx.item.title)}</h1><h4 data-v-2f2a1d26>$${ssrInterpolate(_ctx.item.price)}</h4><br data-v-2f2a1d26><br data-v-2f2a1d26><br data-v-2f2a1d26><div class="control number text-center" data-v-2f2a1d26><button class="decrement-button" style="${ssrRenderStyle({ "border-right": "0.2px solid lightgrey", "float": "left", "margin-right": "11px" })}" data-v-2f2a1d26>\u2212</button><span data-v-2f2a1d26>${ssrInterpolate(unref(quantity))}</span><button class="increment-button" style="${ssrRenderStyle({ "border-left": "0.2px solid lightgrey", "margin-left": "16px" })}" data-v-2f2a1d26>+</button><br data-v-2f2a1d26><br data-v-2f2a1d26></div><button class="add-to-cart-button" data-v-2f2a1d26>ADD TO CART</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Details/Box.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2f2a1d26"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Text",
  __ssrInlineRender: true,
  setup(__props) {
    const text = reactive({
      moreInfo: ["DESCRIPTION", "WARRANTY", "REVIEWS"],
      active: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e21b0481><div class="more info d-flex justify-content-between text-center" data-v-e21b0481><!--[-->`);
      ssrRenderList(unref(text).moreInfo, (info, index) => {
        _push(`<div class="${ssrRenderClass([[index === unref(text).active ? "col4 active" : ""], "col4 flex-fill"])}" data-v-e21b0481><h6 data-v-e21b0481>${ssrInterpolate(info)}</h6></div>`);
      });
      _push(`<!--]--></div><div class="container pt-3" data-v-e21b0481><div class="row" data-v-e21b0481><p data-v-e21b0481>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Details/Text.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e21b0481"]]);
const __nuxt_component_3 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useMainStore();
    useRoute();
    const item = reactive({
      details: {},
      relatedItems: []
    });
    computed(() => {
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * store.items.length);
        item.relatedItems.push(store.items[randomIndex]);
      }
      return item.relatedItems;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DetailsBreadcrumb = __nuxt_component_0;
      const _component_DetailsBox = __nuxt_component_1;
      const _component_DetailsText = __nuxt_component_2;
      const _component_ClientOnly = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "container py-5",
        style: { "padding-top": "70px" }
      }, _attrs))} data-v-da086d6a>`);
      _push(ssrRenderComponent(_component_DetailsBreadcrumb, {
        details: unref(item).details
      }, null, _parent));
      _push(ssrRenderComponent(_component_DetailsBox, {
        item: unref(item).details
      }, null, _parent));
      _push(ssrRenderComponent(_component_DetailsText, null, null, _parent));
      _push(`<div class="related-item" data-v-da086d6a><hr data-v-da086d6a><h6 class="pb-4" data-v-da086d6a>RELATED PRODUCTS</h6>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Details/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da086d6a"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-23d6f39f.mjs.map
