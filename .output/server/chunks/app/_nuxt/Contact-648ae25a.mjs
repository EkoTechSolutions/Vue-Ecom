import { ssrRenderComponent, ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __vite_glob_0_27 } from './speaker-9e99ac69.mjs';
import { useSSRContext } from 'vue';
import { u as useHead, _ as _export_sfc } from '../server.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(_attrs)} data-v-7c7539ea><div class="container-fluid py-5" data-v-7c7539ea><div class="row d-flex" data-v-7c7539ea><div class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 order-sm-0 order-12" style="${ssrRenderStyle({ "margin-right": "-120px" })}" data-v-7c7539ea><img class="img-fluid"${ssrRenderAttr("src", __vite_glob_0_27)} alt="speaker" title="speaker" data-v-7c7539ea></div><div class="col-12 col-xl-6 col-lg-5 col-md-6 col-sm-12 order-first order-xl-0" data-v-7c7539ea><h1 data-v-7c7539ea>Hello there</h1><h2 style="${ssrRenderStyle({ "color": "grey" })}" data-v-7c7539ea>got a thought to discuss?</h2><form data-v-7c7539ea><div class="form-group" data-v-7c7539ea><input type="text" class="form-control" required data-v-7c7539ea><label class="label" for="name" data-v-7c7539ea>Name</label></div><div class="form-group" data-v-7c7539ea><input type="email" class="form-control" required data-v-7c7539ea><label class="label" for="E-mail" data-v-7c7539ea>E-mail</label></div><div class="form-group" data-v-7c7539ea><textarea class="form-control" style="${ssrRenderStyle({ "overflow": "hidden", "height": "130px" })}" rows="3" required data-v-7c7539ea></textarea><label class="label" for="Message" data-v-7c7539ea>Message</label></div><button class="btn btn-light" href="#" role="button" data-v-7c7539ea>submit</button></form></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7c7539ea"]]);
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      link: [{ rel: "canonical", href: "https://vue-ecom.vercel.app/contact" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContactForm = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ContactForm, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Contact-648ae25a.mjs.map
