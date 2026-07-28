"use strict";
exports.id = 494;
exports.ids = [494];
exports.modules = {

/***/ 385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ t)
/* harmony export */ });
/**
 * UI strings per locale. Content copy comes from WordPress; these are the
 * interface-owned strings only (labels, states, form messages).
 */const STRINGS={skipToContent:{es:'Saltar al contenido',en:'Skip to content'},menuOpen:{es:'Abrir menú',en:'Open menu'},menuClose:{es:'Cerrar menú',en:'Close menu'},cart:{es:'Pedido',en:'Order'},cartEmpty:{es:'Tu pedido está vacío.',en:'Your order is empty.'},addToCart:{es:'Agregar al pedido',en:'Add to order'},outOfStock:{es:'Agotado',en:'Sold out'},seasonal:{es:'De temporada',en:'Seasonal'},viewCoffee:{es:'Ver café',en:'View coffee'},price:{es:'Precio',en:'Price'},origin:{es:'Origen',en:'Origin'},producer:{es:'Productor',en:'Producer'},altitude:{es:'Altitud',en:'Altitude'},variety:{es:'Variedad',en:'Variety'},process:{es:'Proceso',en:'Process'},roast:{es:'Tueste',en:'Roast'},tastingNotes:{es:'Notas de cata',en:'Tasting notes'},brewMethods:{es:'Métodos de preparación',en:'Brew methods'},hours:{es:'Horario',en:'Hours'},hoursUnavailable:{es:'Consulta horarios en Google Maps',en:'Check hours on Google Maps'},amenities:{es:'Servicios',en:'Amenities'},gettingThere:{es:'Cómo llegar',en:'Getting there'},neighborhoodGuide:{es:'La zona',en:'The neighborhood'},readingTime:{es:'min de lectura',en:'min read'},relatedPosts:{es:'Sigue leyendo',en:'Keep reading'},relatedCoffees:{es:'Otros cafés',en:'More coffees'},formName:{es:'Nombre',en:'Name'},formEmail:{es:'Correo electrónico',en:'Email'},formPhone:{es:'Teléfono',en:'Phone'},formCompany:{es:'Empresa',en:'Company'},formMessage:{es:'Mensaje',en:'Message'},formSend:{es:'Enviar',en:'Send'},formSending:{es:'Enviando…',en:'Sending…'},formSuccess:{es:'Gracias — te responderemos muy pronto.',en:'Thank you — we will get back to you shortly.'},formError:{es:'No se pudo enviar. Inténtalo de nuevo.',en:'Something went wrong. Please try again.'},formRequired:{es:'Este campo es obligatorio.',en:'This field is required.'},checkoutTitle:{es:'Confirmar pedido',en:'Checkout'},fulfillmentPickup:{es:'Recoger en tienda',en:'Pickup in store'},fulfillmentDelivery:{es:'Entrega local',en:'Local delivery'},deliveryAddress:{es:'Dirección de entrega',en:'Delivery address'},orderNotes:{es:'Notas (opcional)',en:'Notes (optional)'},placeOrder:{es:'Hacer pedido',en:'Place order'},codNote:{es:'Pagas al recibir — efectivo o terminal.',en:'Pay on delivery — cash or card terminal.'},orderConfirmed:{es:'Pedido recibido',en:'Order received'},orderNumber:{es:'Número de pedido',en:'Order number'},quantity:{es:'Cantidad',en:'Quantity'},remove:{es:'Quitar',en:'Remove'},subtotal:{es:'Subtotal',en:'Subtotal'},deliveryFee:{es:'Envío local',en:'Local delivery'},total:{es:'Total',en:'Total'},continueShopping:{es:'Seguir explorando',en:'Keep browsing'},notFoundTitle:{es:'Página no encontrada',en:'Page not found'},notFoundBody:{es:'La página que buscas no existe o cambió de lugar.',en:'The page you are looking for does not exist or has moved.'},backHome:{es:'Volver al inicio',en:'Back home'},switchLocale:{es:'English',en:'Español'},harvest:{es:'Cosecha',en:'Harvest'},availability:{es:'Disponibilidad',en:'Availability'},addedToCart:{es:'Agregado',en:'Added'},coffeesSection:{es:'Cafés',en:'Coffees'},subscriptionsSection:{es:'Suscripciones',en:'Subscriptions'},journalTitle:{es:'Journal',en:'Journal'},menuTitle:{es:'Menú',en:'Menu'},allPosts:{es:'Todo',en:'All'},closed:{es:'Cerrado',en:'Closed'},dayMon:{es:'Lunes',en:'Monday'},dayTue:{es:'Martes',en:'Tuesday'},dayWed:{es:'Miércoles',en:'Wednesday'},dayThu:{es:'Jueves',en:'Thursday'},dayFri:{es:'Viernes',en:'Friday'},daySat:{es:'Sábado',en:'Saturday'},daySun:{es:'Domingo',en:'Sunday'},qtyIncrease:{es:'Aumentar cantidad',en:'Increase quantity'},qtyDecrease:{es:'Disminuir cantidad',en:'Decrease quantity'},deliveryFeeNote:{es:'El costo de envío local se calcula al confirmar tu pedido.',en:'The local delivery fee is calculated at checkout.'},checkoutContact:{es:'Datos de contacto',en:'Contact details'},checkoutFulfillment:{es:'Entrega',en:'Fulfillment'}};function t(key,locale){return STRINGS[key][locale];}

/***/ }),

/***/ 3522:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ organizationJsonLd),
/* harmony export */   k: () => (/* binding */ SEO)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7905);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Head-API SEO component: localized metadata, canonical + hreflang pairs
 * (only when a real translation exists), OpenGraph/Twitter, and JSON-LD.
 */const SITE_URL='https://gramo.cafe';const SITE_NAME='Gramo Café';function SEO({title,description,locale,pathname,translationPath,imageUrl,jsonLd,noindex=false}){const url=`${SITE_URL}${pathname}`;const fullTitle=title===SITE_NAME?title:`${title} — ${SITE_NAME}`;const ogLocale=locale==='es'?'es_MX':'en_US';return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",null,fullTitle),description?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{name:"description",content:description}):null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("link",{rel:"canonical",href:url}),noindex?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{name:"robots",content:"noindex,nofollow"}):null,translationPath?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("link",{rel:"alternate",hrefLang:locale==='es'?'es-MX':'en',href:url}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("link",{rel:"alternate",hrefLang:locale==='es'?'en':'es-MX',href:`${SITE_URL}${translationPath}`}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("link",{rel:"alternate",hrefLang:"x-default",href:locale==='es'?url:`${SITE_URL}${translationPath}`})):null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:site_name",content:SITE_NAME}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:type",content:"website"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:title",content:fullTitle}),description?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:description",content:description}):null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:url",content:url}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:locale",content:ogLocale}),imageUrl?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{property:"og:image",content:imageUrl}):null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta",{name:"twitter:card",content:imageUrl?'summary_large_image':'summary'}),jsonLd?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("script",{type:"application/ld+json"},JSON.stringify(jsonLd)):null);}/** Sitewide Organization + CafeOrCoffeeShop graph for the home pages. */function organizationJsonLd(){return{'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':`${SITE_URL}/#org`,name:SITE_NAME,url:`${SITE_URL}/`,sameAs:['https://www.instagram.com/gramo.cafe/','https://www.facebook.com/gramo.cafe/']},{'@type':'CafeOrCoffeeShop','@id':`${SITE_URL}/#cafe`,name:SITE_NAME,servesCuisine:'Coffee',url:`${SITE_URL}/`,parentOrganization:{'@id':`${SITE_URL}/#org`},address:{'@type':'PostalAddress',addressLocality:'Cuernavaca',addressRegion:'Morelos',addressCountry:'MX'}}]};}

/***/ }),

/***/ 4399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $g: () => (/* binding */ formatPrice),
/* harmony export */   VV: () => (/* binding */ formatMxn),
/* harmony export */   Yq: () => (/* binding */ formatDate)
/* harmony export */ });
/**
 * Formatting helpers for the stock-sheet voice: MXN prices in tabular
 * numerals and localized long dates.
 *//** "$450 MXN" — whole pesos stay whole, fractions keep two decimals. */function formatMxn(price){return`${formatPrice(price)} MXN`;}/** "$450" / "$52.50" — the bare stock-sheet price. */function formatPrice(price){const value=Number.isInteger(price)?String(price):price.toFixed(2);return`$${value}`;}/** Long-form date in the page's locale (es-MX / en-US). */function formatDate(iso,locale){const date=new Date(iso);if(Number.isNaN(date.getTime()))return'';return new Intl.DateTimeFormat(locale==='es'?'es-MX':'en-US',{day:'numeric',month:'long',year:'numeric'}).format(date);}

/***/ }),

/***/ 4665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ CartTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(230);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/state/cart.tsx
var cart = __webpack_require__(6932);
// EXTERNAL MODULE: ./src/i18n/routes.ts
var routes = __webpack_require__(9753);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
// EXTERNAL MODULE: ./src/lib/format.ts
var format = __webpack_require__(4399);
;// ./src/templates/cart.module.scss
// Exports
var cart_module_cart = "cart-module--cart--b965e";
var inner = "cart-module--inner--e797d";
var title = "cart-module--title--cb299";
var empty = "cart-module--empty--d3760";
var emptyText = "cart-module--emptyText--0b79d";
var continueLink = "cart-module--continueLink--16865";
var cart_module_lines = "cart-module--lines--fef4e";
var cart_module_line = "cart-module--line--4e4cf";
var thumb = "cart-module--thumb--58863";
var thumbPlaceholder = "cart-module--thumbPlaceholder--7b21c";
var lineBody = "cart-module--lineBody--31f71";
var lineTitle = "cart-module--lineTitle--b0bd7";
var linePrice = "cart-module--linePrice--231c5";
var stepper = "cart-module--stepper--a1ced";
var stepButton = "cart-module--stepButton--1554a";
var qty = "cart-module--qty--a23bc";
var lineTotal = "cart-module--lineTotal--22924";
var cart_module_remove = "cart-module--remove--5f7a7";
var summary = "cart-module--summary--35b59";
var subtotalRow = "cart-module--subtotalRow--e8309";
var subtotalLabel = "cart-module--subtotalLabel--0a6d5";
var subtotalValue = "cart-module--subtotalValue--c64fe";
var deliveryNote = "cart-module--deliveryNote--d5543";
var checkoutButton = "cart-module--checkoutButton--32eda";

;// ./src/templates/cart.tsx
/**
 * Cart — the order as plate rows: thumbnail, title, accessible ± quantity
 * stepper, tabular line totals and remove. Subtotal closes the sheet with
 * the delivery-fee note; checkout is the one copper action. Client-only
 * state renders after hydration so static HTML never mismatches.
 */










function CartTemplate({
  pageContext
}) {
  const locale = pageContext.locale;
  const {
    lines,
    hydrated,
    setQty,
    remove,
    subtotal
  } = (0,cart/* useCart */._)();
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("section", {
    className: cart_module_cart
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: inner
  }, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, (0,strings.t)('cart', locale)), !hydrated ? null : lines.length === 0 ? /*#__PURE__*/index_js_.createElement("div", {
    className: empty
  }, /*#__PURE__*/index_js_.createElement("p", {
    className: emptyText
  }, (0,strings.t)('cartEmpty', locale)), /*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link, {
    to: routes/* STATIC_ROUTES */._v.coffee[locale],
    className: continueLink
  }, (0,strings.t)('continueShopping', locale))) : /*#__PURE__*/index_js_.createElement(index_js_.Fragment, null, /*#__PURE__*/index_js_.createElement("ul", {
    className: cart_module_lines
  }, lines.map(line => /*#__PURE__*/index_js_.createElement("li", {
    key: line.productId,
    className: cart_module_line
  }, line.imageUrl ? /*#__PURE__*/index_js_.createElement("img", {
    src: line.imageUrl,
    alt: "",
    className: thumb,
    loading: "lazy",
    width: 72,
    height: 72
  }) : /*#__PURE__*/index_js_.createElement("span", {
    className: thumbPlaceholder,
    "aria-hidden": "true"
  }), /*#__PURE__*/index_js_.createElement("div", {
    className: lineBody
  }, /*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link, {
    to: (0,routes/* pathFor */.p0)('coffee', locale, line.slug),
    className: lineTitle
  }, line.title), /*#__PURE__*/index_js_.createElement("p", {
    className: linePrice
  }, (0,format/* formatMxn */.VV)(line.price))), /*#__PURE__*/index_js_.createElement("div", {
    className: stepper
  }, /*#__PURE__*/index_js_.createElement("button", {
    type: "button",
    className: stepButton,
    onClick: () => setQty(line.productId, line.qty - 1),
    "aria-label": (0,strings.t)('qtyDecrease', locale)
  }, "\u2212"), /*#__PURE__*/index_js_.createElement("span", {
    className: qty,
    "aria-label": (0,strings.t)('quantity', locale)
  }, line.qty), /*#__PURE__*/index_js_.createElement("button", {
    type: "button",
    className: stepButton,
    onClick: () => setQty(line.productId, line.qty + 1),
    "aria-label": (0,strings.t)('qtyIncrease', locale)
  }, "+")), /*#__PURE__*/index_js_.createElement("p", {
    className: lineTotal
  }, (0,format/* formatMxn */.VV)(line.price * line.qty)), /*#__PURE__*/index_js_.createElement("button", {
    type: "button",
    className: cart_module_remove,
    onClick: () => remove(line.productId)
  }, (0,strings.t)('remove', locale))))), /*#__PURE__*/index_js_.createElement("div", {
    className: summary
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: subtotalRow
  }, /*#__PURE__*/index_js_.createElement("span", {
    className: subtotalLabel
  }, (0,strings.t)('subtotal', locale)), /*#__PURE__*/index_js_.createElement("span", {
    className: subtotalValue
  }, (0,format/* formatMxn */.VV)(subtotal))), /*#__PURE__*/index_js_.createElement("p", {
    className: deliveryNote
  }, (0,strings.t)('deliveryFeeNote', locale)), /*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link, {
    to: routes/* STATIC_ROUTES */._v.checkout[locale],
    className: checkoutButton
  }, (0,strings.t)('checkoutTitle', locale)))))));
}
function Head({
  pageContext,
  location
}) {
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (0,strings.t)('cart', pageContext.locale),
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    noindex: true
  });
}

/***/ }),

/***/ 9281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  P: () => (/* binding */ Layout)
});

// NAMESPACE OBJECT: ./src/components/Layout.module.scss
var Layout_module_namespaceObject = {};
__webpack_require__.r(Layout_module_namespaceObject);
__webpack_require__.d(Layout_module_namespaceObject, {
  uF: () => (Layout_module_announcement),
  Op: () => (cartCount),
  nA: () => (cartLink),
  qr: () => (footer),
  Um: () => (footerInner),
  s6: () => (footerLink),
  Np: () => (footerNav),
  OJ: () => (footerNote),
  pA: () => (footerSocial),
  _U: () => (footerTagline),
  dJ: () => (footerWordmark),
  wx: () => (header),
  $s: () => (headerActions),
  El: () => (headerInner),
  lN: () => (localeSwitch),
  oe: () => (menuToggle),
  C$: () => (nav),
  MC: () => (navLink),
  E5: () => (navLinkActive),
  cQ: () => (navOpen),
  vf: () => (shell),
  Ss: () => (wordmark)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(230);
;// ./src/hooks/useSettings.ts
/**
 * Site settings from the sourced GramoSettings singleton.
 */const EMPTY={nav:[],footer:[],footerNote:{es:'',en:''},announcement:{enabled:false,text:{es:'',en:''},url:null},social:{instagram:null,facebook:null,spotify:null,linktree:null,whatsappCommunity:null},business:{name:'Gramo Café',tagline:null,phone:null,phoneLink:null,whatsapp:null,email:null,instagramHandle:null}};function useSettings(){var _data$gramoSettings;const data=(0,gatsby_browser_entry.useStaticQuery)("2346234640");return(_data$gramoSettings=data.gramoSettings)!==null&&_data$gramoSettings!==void 0?_data$gramoSettings:EMPTY;}
// EXTERNAL MODULE: ./src/state/cart.tsx
var cart = __webpack_require__(6932);
// EXTERNAL MODULE: ./src/i18n/routes.ts
var routes = __webpack_require__(9753);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
;// ./src/components/Layout.module.scss
// Exports
var shell = "Layout-module--shell--1ae80";
var Layout_module_announcement = "Layout-module--announcement--979d5";
var header = "Layout-module--header--cb58e";
var headerInner = "Layout-module--headerInner--5a8e7";
var wordmark = "Layout-module--wordmark--92fdc";
var menuToggle = "Layout-module--menuToggle--dec31";
var nav = "Layout-module--nav--c09b2";
var navLink = "Layout-module--navLink--a4ec1";
var navLinkActive = "Layout-module--navLinkActive--526dd";
var headerActions = "Layout-module--headerActions--8948d";
var localeSwitch = "Layout-module--localeSwitch--1d973";
var cartLink = "Layout-module--cartLink--0034b";
var cartCount = "Layout-module--cartCount--783e4";
var navOpen = "Layout-module--navOpen--85712";
var footer = "Layout-module--footer--c8f9a";
var footerInner = "Layout-module--footerInner--df997";
var footerWordmark = "Layout-module--footerWordmark--19a2e";
var footerTagline = "Layout-module--footerTagline--b811d";
var footerNav = "Layout-module--footerNav--06cba";
var footerLink = "Layout-module--footerLink--a1661";
var footerSocial = "Layout-module--footerSocial--6b181";
var footerNote = "Layout-module--footerNote--59207";

;// ./src/components/Layout.tsx
/**
 * Site shell — announcement bar, board-strip header, footer — in the
 * Coffee Data Portraits grammar. Wraps every page; locale comes from
 * pageContext so nav labels and the switcher resolve per language.
 */function localized(text,locale){var _ref,_ref2;if(!text)return'';return(_ref=(_ref2=locale==='es'?text.es:text.en)!==null&&_ref2!==void 0?_ref2:text.es)!==null&&_ref!==void 0?_ref:'';}/** Localize a nav path written in ES form when rendering the EN chrome. */function localizePath(path,locale){var _map$path;if(locale==='es')return path;const map={'/':'/en/','/cafe/':'/en/coffee/','/menu/':'/en/menu/','/ubicaciones/':'/en/locations/','/nosotros/':'/en/about/','/journal/':'/en/journal/','/suscripciones/':'/en/subscriptions/','/mayoreo/':'/en/wholesale/','/empleo/':'/en/careers/','/contacto/':'/en/contact/','/proceso/':'/en/process/','/privacidad/':'/en/privacy/'};return(_map$path=map[path])!==null&&_map$path!==void 0?_map$path:`/en${path}`;}function Layout({locale,translationPath,children}){const settings=useSettings();const{count,hydrated}=(0,cart/* useCart */._)();const[menuOpen,setMenuOpen]=index_js_.useState(false);const announcement=settings.announcement;const switchTarget=translationPath!==null&&translationPath!==void 0?translationPath:(0,routes/* homeFor */.vh)(locale==='es'?'en':'es');return/*#__PURE__*/index_js_.createElement("div",{className:shell},/*#__PURE__*/index_js_.createElement("a",{href:"#contenido",className:"skip-link"},(0,strings.t)('skipToContent',locale)),announcement.enabled&&localized(announcement.text,locale)!==''?/*#__PURE__*/index_js_.createElement("div",{className:Layout_module_announcement,role:"region","aria-label":"Aviso"},announcement.url?/*#__PURE__*/index_js_.createElement("a",{href:announcement.url},localized(announcement.text,locale)):/*#__PURE__*/index_js_.createElement("span",null,localized(announcement.text,locale))):null,/*#__PURE__*/index_js_.createElement("header",{className:header},/*#__PURE__*/index_js_.createElement("div",{className:headerInner},/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:(0,routes/* homeFor */.vh)(locale),className:wordmark},"GRAMO"),/*#__PURE__*/index_js_.createElement("button",{type:"button",className:menuToggle,"aria-expanded":menuOpen,"aria-controls":"nav-principal",onClick:()=>setMenuOpen(open=>!open)},menuOpen?(0,strings.t)('menuClose',locale):(0,strings.t)('menuOpen',locale)),/*#__PURE__*/index_js_.createElement("nav",{id:"nav-principal",className:`${nav} ${menuOpen?navOpen:''}`,"aria-label":locale==='es'?'Navegación principal':'Main navigation'},settings.nav.map(item=>/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{key:item.path,to:localizePath(item.path,locale),className:navLink,activeClassName:navLinkActive,onClick:()=>setMenuOpen(false)},localized(item.label,locale)))),/*#__PURE__*/index_js_.createElement("div",{className:headerActions},/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:switchTarget,className:localeSwitch,"aria-label":(0,strings.t)('switchLocale',locale)},locale==='es'?'EN':'ES'),/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:routes/* STATIC_ROUTES */._v.cart[locale],className:cartLink},/*#__PURE__*/index_js_.createElement("span",null,(0,strings.t)('cart',locale)),/*#__PURE__*/index_js_.createElement("span",{className:cartCount,"aria-hidden":!hydrated||count===0},hydrated&&count>0?count:''))))),/*#__PURE__*/index_js_.createElement("main",{id:"contenido"},children),/*#__PURE__*/index_js_.createElement("footer",{className:footer},/*#__PURE__*/index_js_.createElement("div",{className:footerInner},/*#__PURE__*/index_js_.createElement("div",{className:Layout_module_namespaceObject.footerBrand},/*#__PURE__*/index_js_.createElement("p",{className:footerWordmark},"GRAMO"),settings.business.tagline?/*#__PURE__*/index_js_.createElement("p",{className:footerTagline},settings.business.tagline):null),/*#__PURE__*/index_js_.createElement("nav",{className:footerNav,"aria-label":locale==='es'?'Enlaces del pie':'Footer links'},settings.footer.map(item=>/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{key:item.path,to:localizePath(item.path,locale),className:footerLink},localized(item.label,locale)))),/*#__PURE__*/index_js_.createElement("div",{className:footerSocial},settings.social.instagram?/*#__PURE__*/index_js_.createElement("a",{href:settings.social.instagram,rel:"noopener noreferrer",target:"_blank"},"Instagram"):null,settings.social.spotify?/*#__PURE__*/index_js_.createElement("a",{href:settings.social.spotify,rel:"noopener noreferrer",target:"_blank"},"Spotify"):null,settings.social.whatsappCommunity?/*#__PURE__*/index_js_.createElement("a",{href:settings.social.whatsappCommunity,rel:"noopener noreferrer",target:"_blank"},"WhatsApp"):null)),/*#__PURE__*/index_js_.createElement("div",{className:footerNote},/*#__PURE__*/index_js_.createElement("span",null,localized(settings.footerNote,locale)),/*#__PURE__*/index_js_.createElement("span",null,"\xA9 ",new Date().getFullYear()," Gramo Caf\xE9 \xB7 Cuernavaca \xB7 CDMX"))));}

/***/ }),

/***/ 9753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _v: () => (/* binding */ STATIC_ROUTES),
/* harmony export */   p0: () => (/* binding */ pathFor),
/* harmony export */   vh: () => (/* binding */ homeFor)
/* harmony export */ });
/* unused harmony exports LOCALES, DEFAULT_LOCALE, PREFIXES */
/**
 * The bilingual route map — single source of truth for localized paths.
 *
 * ES is the primary locale at `/`; EN lives under `/en/`. Static routes are
 * declared here; dynamic content (pages, journal, coffees, locations) derives
 * its path from these prefixes. The SEO component and the language switcher
 * both read this map so hreflang pairs can never drift from real routes.
 */const LOCALES=(/* unused pure expression or super */ null && (['es','en']));const DEFAULT_LOCALE='es';/** Static route keys → per-locale paths. */const STATIC_ROUTES={home:{es:'/',en:'/en/'},coffee:{es:'/cafe/',en:'/en/coffee/'},menu:{es:'/menu/',en:'/en/menu/'},locations:{es:'/ubicaciones/',en:'/en/locations/'},journal:{es:'/journal/',en:'/en/journal/'},cart:{es:'/pedido/',en:'/en/order/'},checkout:{es:'/pedido/confirmar/',en:'/en/order/checkout/'},orderConfirmed:{es:'/pedido/listo/',en:'/en/order/confirmed/'}};/** Content-type prefixes for dynamic nodes. */const PREFIXES={coffee:{es:'/cafe/',en:'/en/coffee/'},location:{es:'/ubicaciones/',en:'/en/locations/'},journal:{es:'/journal/',en:'/en/journal/'},journalCategory:{es:'/journal/categoria/',en:'/en/journal/category/'},page:{es:'/',en:'/en/'}};/** Build a localized path for a dynamic node. */function pathFor(type,locale,slug){return`${PREFIXES[type][locale]}${slug}/`;}/** The alternate-locale home for switcher fallbacks. */function homeFor(locale){return STATIC_ROUTES.home[locale];}

/***/ })

};
;
//# sourceMappingURL=component---src-templates-cart-tsx.js.map