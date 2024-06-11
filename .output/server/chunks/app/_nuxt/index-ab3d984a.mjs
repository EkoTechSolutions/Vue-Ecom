import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0$1, a as _imports_1, b as _imports_2, c as _imports_0, d as _imports_1$1 } from './new-447e3bc7.mjs';
import { _ as _export_sfc } from '../server.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import 'destr';
import 'ohash';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'unctx';
import 'vue-router';

const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "carousel" }, _attrs))} data-v-153c430c><div id="heroControls" class="carousel slide" data-bs-ride="carousel" data-v-153c430c><div class="carousel-indicators" data-v-153c430c><button type="button" data-bs-target="#heroControls" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" data-v-153c430c></button><button type="button" data-bs-target="#heroControls" data-bs-slide-to="1" aria-label="Slide 2" data-v-153c430c></button><button type="button" data-bs-target="#heroControls" data-bs-slide-to="2" aria-label="Slide 3" data-v-153c430c></button></div><div class="carousel-inner" data-v-153c430c><div class="carousel-item active" data-v-153c430c><img class="img-fluid"${ssrRenderAttr("src", _imports_0$1)} alt="First-slide" title="First-slide" data-v-153c430c></div><div class="carousel-item" data-v-153c430c><img class="img-fluid"${ssrRenderAttr("src", _imports_1)} alt="Second-slide" title="Second-slide" data-v-153c430c></div><div class="carousel-item" data-v-153c430c><img class="img-fluid"${ssrRenderAttr("src", _imports_2)} alt="Third-slide" title="Third-slide" data-v-153c430c></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/Carousel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-153c430c"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-us" }, _attrs))} data-v-03ebc875><div class="row p-4" data-v-03ebc875><div class="col-6" data-v-03ebc875><img class="float-lg-right"${ssrRenderAttr("src", _imports_0)} alt="home-img" title="home-img" loading="lazy" data-v-03ebc875></div><div class="col-12 col-sm-6" data-v-03ebc875><h2 data-v-03ebc875>New minimalist<br data-v-03ebc875>\u2013components</h2><p data-v-03ebc875>Gravity will force your feet to the ground. Don\u2019t be afraid, your mind will find your freedom. You won\u2019t miss a sunrise. You\u2019ll rise with the sun. <br data-v-03ebc875>You\u2019ll never run away from the storm. You will flow with the wind. <br data-v-03ebc875>Don\u2019t hesitate to pause. Follow the flow of the moment. And then, take the first step towards the new you. </p></div></div><div class="row p-4" data-v-03ebc875><div class="col-12 col-sm-6 text-sm-right text-md-right ml-sm-0 ml-md-5 ml-lg-5 ml-xl-5 text-lg-right order-sm-first order-12" style="${ssrRenderStyle({ "margin-right": "-8%", "z-index": "1" })}" data-v-03ebc875><h2 data-v-03ebc875>Save Space<br data-v-03ebc875>more freedom</h2><p data-v-03ebc875>Gravity will force your feet to the ground. Don\u2019t be afraid, your mind will find your freedom. You won\u2019t miss a sunrise. You\u2019ll rise with the sun. You\u2019ll never run away from the storm. You will flow with the wind. Don\u2019t hesitate to pause. Follow the flow of the moment. And then, take the first step towards the new you. </p></div><div class="col-6" data-v-03ebc875><img${ssrRenderAttr("src", _imports_1$1)} alt="home-img-2" title="home-img-2" loading="lazy" data-v-03ebc875></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/AboutUs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-03ebc875"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeCarousel = __nuxt_component_0;
      const _component_HomeAboutUs = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HomeCarousel, null, null, _parent));
      _push(ssrRenderComponent(_component_HomeAboutUs, null, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ab3d984a.mjs.map
