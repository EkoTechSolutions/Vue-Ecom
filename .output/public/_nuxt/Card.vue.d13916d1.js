import{_ as d}from"./nuxt-link.7576bba2.js";import{g as _,h as p,o as e,c as n,F as u,k as g,a as t,i as a,b as h,w as m,t as l}from"./entry.0de8da1c.js";import{u as b}from"./useAsset.e6e320bc.js";const C={class:"row justify-content-center text-center"},f={class:"card"},v=["src"],y={class:"overlay"},k=["onClick"],x=["onClick"],A={class:"card-body"},$={class:"card-title"},w={class:"card-text"},S=_({__name:"Card",props:{cards:{}},setup(B){const c=p();return(o,N)=>{const r=d;return e(),n("div",C,[(e(!0),n(u,null,g(o.cards,s=>(e(),n("div",{class:"col-10 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3",key:s.id},[t("div",f,[t("img",{class:"card-img-top",src:("useAsset"in o?o.useAsset:a(b))(s.img),alt:"Card-image-cap",title:"Card-image-cap",loading:"lazy"},null,8,v),t("div",y,[t("button",{type:"button",class:"btn btn-light btn-lg",onClick:i=>a(c).inCart(s)},"Add +",8,k),h(r,{to:`/details/${s.id}`},{default:m(()=>[t("button",{type:"button",onClick:i=>a(c).addtoInfo(s.id),class:"btn btn-light btn-lg"},"Info",8,x)]),_:2},1032,["to"])]),t("div",A,[t("h5",$,l(s.title),1),t("p",w,"$"+l(s.price),1)])])]))),128))])}}});export{S as _};
