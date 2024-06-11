import { _ as __nuxt_component_0$2 } from './nuxt-link-5d0b373b.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, reactive, withCtx, createVNode, computed, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead, a as useMainStore, _ as _export_sfc } from '../server.mjs';
import { u as useAsset } from './useAsset-2c2d2edb.mjs';
import { _ as __nuxt_component_0$3 } from './Notification-5b3bed98.mjs';
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

const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-34090473><h1 class="pt-3 text-center" data-v-34090473>New arrivals</h1><nav class="d-flex justify-content-center" aria-label="breadcrumb" data-v-34090473><ol class="breadcrumb" data-v-34090473><li class="breadcrumb-item" data-v-34090473>`);
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
  _push(`</li><li class="breadcrumb-item active" aria-current="page" data-v-34090473>Products</li></ol></nav></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/BreadCrumbs.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-34090473"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DropDownFilters",
  __ssrInlineRender: true,
  emits: ["sortItem"],
  setup(__props, { emit }) {
    const sort = ref("DEFAULT");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex" }, _attrs))} data-v-fa30a20a><div class="dropdown flex-fill px-4 px-sm-0" data-v-fa30a20a><a class="btn btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-v-fa30a20a>SORT BY <span style="${ssrRenderStyle({ "color": "#f2be00" })}" data-v-fa30a20a>${ssrInterpolate(unref(sort))}</span></a><div class="dropdown-menu" aria-labelledby="dropdownMenuLink" data-v-fa30a20a><a class="dropdown-item" value="newset" data-v-fa30a20a>Newest</a><a class="dropdown-item" value="price" data-v-fa30a20a>Price</a><a class="dropdown-item" value="trending" data-v-fa30a20a>Trending</a></div></div><div class="dropdown d-block d-lg-none d-xl-none px-4 px-sm-0" data-v-fa30a20a><button class="btn btn-light dropdown-toggle" role="button" id="MenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-v-fa30a20a>CATAGORIES</button></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/DropDownFilters.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-fa30a20a"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FilterBar",
  __ssrInlineRender: true,
  setup(__props) {
    const info = reactive({
      types: [
        { name: "Table", value: "table" },
        { name: "Lamps", value: "lamp" },
        { name: "Chairs", value: "chair" },
        { name: "Sofas", value: "sofa" }
      ],
      colors: [
        // TODO change the background colors to better and more subtle ones
        { name: "yellow", value: "#FFC015" },
        { name: "blue", value: "#829FAA" },
        { name: "white", value: "#BFB8AE" },
        { name: "silver", value: "#817A77" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-3 d-none d-lg-block d-xl-block" }, _attrs))} data-v-777edd39><div class="card-selector" data-v-777edd39><div class="card-body p-5" data-v-777edd39><div class="search-title" data-v-777edd39><h4 data-v-777edd39>Catagories +</h4><!--[-->`);
      ssrRenderList(unref(info).types, (item) => {
        _push(`<h6${ssrRenderAttr("value", item.value)} data-v-777edd39>${ssrInterpolate(item.name)}</h6>`);
      });
      _push(`<!--]--></div><div class="search-title" data-v-777edd39><h4 data-v-777edd39>Filter by +</h4><div class="colors" data-v-777edd39><h5 data-v-777edd39>Color</h5><!--[-->`);
      ssrRenderList(unref(info).colors, (item) => {
        _push(`<span class="circle" style="${ssrRenderStyle(`background-color:${item.value}`)}"${ssrRenderAttr("value", item.name)} data-v-777edd39></span>`);
      });
      _push(`<!--]--></div></div><div class="search-title" data-v-777edd39><h5 data-v-777edd39>Price Range</h5><input type="range" min="0" max="100" value="50" class="slider" data-v-777edd39></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/FilterBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-777edd39"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    cards: {}
  },
  setup(__props) {
    const store = useMainStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row justify-content-center text-center" }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.cards, (item) => {
        _push(`<div class="col-10 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3"><div class="card"><img class="card-img-top"${ssrRenderAttr("src", ("useAsset" in _ctx ? _ctx.useAsset : unref(useAsset))(item.img))} alt="Card-image-cap" title="Card-image-cap" loading="lazy"><div class="overlay"><button type="button" class="btn btn-light btn-lg">Add +</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/details/${item.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="button" class="btn btn-light btn-lg"${_scopeId}>Info</button>`);
            } else {
              return [
                createVNode("button", {
                  type: "button",
                  onClick: ($event) => unref(store).addtoInfo(item.id),
                  class: "btn btn-light btn-lg"
                }, "Info", 8, ["onClick"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="card-body"><h5 class="card-title">${ssrInterpolate(item.title)}</h5><p class="card-text">$${ssrInterpolate(item.price)}</p></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MoreButton",
  __ssrInlineRender: true,
  emits: ["incrementCards"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-content-center mx-5 mx-sm-0 pt-1" }, _attrs))} data-v-7b46423c><button type="button" class="flex-fill btn btn-outline-secondary" data-v-7b46423c>More +</button></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/MoreButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7b46423c"]]);
const _sfc_main$1 = {
  __name: "Grid",
  __ssrInlineRender: true,
  setup(__props) {
    useMainStore();
    const grid = reactive({
      cards: [],
      showCards: 6
    });
    const slicedCards = computed(() => grid.cards.slice(0, grid.showCards));
    const sortItems = (value) => {
      grid.cards.sort((a, b) => {
        if (value === "newset")
          return a.title.length * 2 - b.title.length * 4;
        if (value === "price")
          return a.price - b.price;
        if (value === "trending")
          return a.type.length - b.type.length;
      });
      return grid.sortButton = value.toUpperCase();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductsDropDownFilters = __nuxt_component_0;
      const _component_ProductsFilterBar = __nuxt_component_1$1;
      const _component_ProductsCard = _sfc_main$3;
      const _component_ProductsMoreButton = __nuxt_component_3;
      const _component_Notification = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mb-4" }, _attrs))}><div class="mx-3">`);
      _push(ssrRenderComponent(_component_ProductsDropDownFilters, { onSortItem: sortItems }, null, _parent));
      _push(`</div>`);
      if (unref(grid).cards.length !== 0) {
        _push(`<div class="main-grid d-flex p-3">`);
        _push(ssrRenderComponent(_component_ProductsFilterBar, null, null, _parent));
        _push(`<div class="col-11 col-md-12 col-lg-8 mx-auto" style="${ssrRenderStyle({ "margin-left": "25px !important" })}">`);
        _push(ssrRenderComponent(_component_ProductsCard, { cards: unref(slicedCards) }, null, _parent));
        if (unref(grid).cards.length !== 0) {
          _push(ssrRenderComponent(_component_ProductsMoreButton, {
            onIncrementCards: ($event) => unref(grid).showCards += 6
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(ssrRenderComponent(_component_Notification, { class: "my-5 py-5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4${_scopeId}>Sorry, we can&#39;t find any product with this features</h4>`);
            } else {
              return [
                createVNode("h4", null, "Sorry, we can't find any product with this features")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/Grid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = {
  __name: "Products",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      link: [{ rel: "canonical", href: "https://vue-ecom.vercel.app/products" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductsBreadCrumbs = __nuxt_component_0$1;
      const _component_ProductsGrid = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_ProductsBreadCrumbs, null, null, _parent));
      _push(ssrRenderComponent(_component_ProductsGrid, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Products-2068db14.mjs.map
