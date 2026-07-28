"use strict";
exports.id = 749;
exports.ids = [749];
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

/***/ 8781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ useBlockMedia)
/* harmony export */ });
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(230);
/**
 * Media resolved for block content: every image referenced from blocksJson
 * was pulled through the sharp pipeline at build time as a GramoMedia node.
 * This hook exposes lookup by URL or attachment ID so block components swap
 * raw URLs for GatsbyImage data.
 */function useBlockMedia(){const data=(0,gatsby__WEBPACK_IMPORTED_MODULE_0__.useStaticQuery)("2054176718");const nodes=data.allGramoMedia.nodes;const urlMap=new Map();const idMap=new Map();for(const node of nodes){urlMap.set(node.url,node);if(node.attachmentId)idMap.set(node.attachmentId,node);}return{byUrl:url=>{var _urlMap$get$localFile,_urlMap$get,_urlMap$get$localFile2,_urlMap$get$localFile3;return url?(_urlMap$get$localFile=(_urlMap$get=urlMap.get(url))===null||_urlMap$get===void 0?void 0:(_urlMap$get$localFile2=_urlMap$get.localFile)===null||_urlMap$get$localFile2===void 0?void 0:(_urlMap$get$localFile3=_urlMap$get$localFile2.childImageSharp)===null||_urlMap$get$localFile3===void 0?void 0:_urlMap$get$localFile3.gatsbyImageData)!==null&&_urlMap$get$localFile!==void 0?_urlMap$get$localFile:null:null;},byAttachmentId:id=>{var _idMap$get$localFile$,_idMap$get,_idMap$get$localFile,_idMap$get$localFile$2;return id?(_idMap$get$localFile$=(_idMap$get=idMap.get(id))===null||_idMap$get===void 0?void 0:(_idMap$get$localFile=_idMap$get.localFile)===null||_idMap$get$localFile===void 0?void 0:(_idMap$get$localFile$2=_idMap$get$localFile.childImageSharp)===null||_idMap$get$localFile$2===void 0?void 0:_idMap$get$localFile$2.gatsbyImageData)!==null&&_idMap$get$localFile$!==void 0?_idMap$get$localFile$:null:null;},altFor:url=>{var _urlMap$get$alt,_urlMap$get2;return url?(_urlMap$get$alt=(_urlMap$get2=urlMap.get(url))===null||_urlMap$get2===void 0?void 0:_urlMap$get2.alt)!==null&&_urlMap$get$alt!==void 0?_urlMap$get$alt:'':'';}};}

/***/ }),

/***/ 8844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  h: () => (/* binding */ CoffeeCard)
});

// NAMESPACE OBJECT: ./src/components/CoffeeCard.module.scss
var CoffeeCard_module_namespaceObject = {};
__webpack_require__.r(CoffeeCard_module_namespaceObject);
__webpack_require__.d(CoffeeCard_module_namespaceObject, {
  body: () => (body),
  bronze: () => (bronze),
  card: () => (card),
  copper: () => (copper),
  dataRow: () => (CoffeeCard_module_dataRow),
  image: () => (CoffeeCard_module_image),
  imagePlaceholder: () => (imagePlaceholder),
  keySquare: () => (keySquare),
  name: () => (CoffeeCard_module_name),
  notes: () => (CoffeeCard_module_notes),
  olive: () => (olive),
  price: () => (price),
  priceRow: () => (priceRow),
  stock: () => (stock),
  walnut: () => (walnut)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(230);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/i18n/routes.ts
var routes = __webpack_require__(9753);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
// EXTERNAL MODULE: ./src/lib/format.ts
var format = __webpack_require__(4399);
// EXTERNAL MODULE: ./src/lib/pigments.ts
var pigments = __webpack_require__(9098);
;// ./src/components/CoffeeCard.module.scss
// Exports
var card = "CoffeeCard-module--card--51485";
var CoffeeCard_module_image = "CoffeeCard-module--image--737e3";
var imagePlaceholder = "CoffeeCard-module--imagePlaceholder--f59bb";
var body = "CoffeeCard-module--body--5cfd3";
var keySquare = "CoffeeCard-module--keySquare--a9e20";
var walnut = "CoffeeCard-module--walnut--63306";
var olive = "CoffeeCard-module--olive--6989a";
var bronze = "CoffeeCard-module--bronze--af3dc";
var copper = "CoffeeCard-module--copper--12db2";
var CoffeeCard_module_name = "CoffeeCard-module--name--d9566";
var CoffeeCard_module_dataRow = "CoffeeCard-module--dataRow--1097f";
var CoffeeCard_module_notes = "CoffeeCard-module--notes--c5ad4";
var priceRow = "CoffeeCard-module--priceRow--5b215";
var price = "CoffeeCard-module--price--324de";
var stock = "CoffeeCard-module--stock--6ac30";

;// ./src/components/CoffeeCard.tsx
/**
 * Coffee card — a paper plate in the catalog grammar: pigment key square,
 * serif name, small-caps data rows (origin · altitude), tasting notes as
 * small caps, price in tabular MXN numerals. The whole card links to the
 * coffee's detail page.
 */function CoffeeCard({coffee,locale,index=0}){var _ref,_coffee$localImage$ch,_coffee$localImage,_coffee$localImage$ch2,_coffee$tastingNotes,_coffee$imageAlt,_styles$pigment,_styles$pigment2;const pigment=(0,pigments/* pigmentAt */.Y)(index);const name=(_ref=locale==='en'?coffee.nameEn:null)!==null&&_ref!==void 0?_ref:coffee.title;const image=(_coffee$localImage$ch=(_coffee$localImage=coffee.localImage)===null||_coffee$localImage===void 0?void 0:(_coffee$localImage$ch2=_coffee$localImage.childImageSharp)===null||_coffee$localImage$ch2===void 0?void 0:_coffee$localImage$ch2.gatsbyImageData)!==null&&_coffee$localImage$ch!==void 0?_coffee$localImage$ch:null;const purchasable=coffee.purchasable===true;const notes=((_coffee$tastingNotes=coffee.tastingNotes)!==null&&_coffee$tastingNotes!==void 0?_coffee$tastingNotes:[]).map(note=>{var _note$noteEn;return locale==='en'?(_note$noteEn=note===null||note===void 0?void 0:note.noteEn)!==null&&_note$noteEn!==void 0?_note$noteEn:note===null||note===void 0?void 0:note.noteEs:note===null||note===void 0?void 0:note.noteEs;}).filter(note=>Boolean(note));const dataRow=[coffee.origin,coffee.altitude].filter(Boolean).join(' · ');return/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:(0,routes/* pathFor */.p0)('coffee',locale,coffee.slug),className:card},image?/*#__PURE__*/index_js_.createElement("div",{className:CoffeeCard_module_image},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:(_coffee$imageAlt=coffee.imageAlt)!==null&&_coffee$imageAlt!==void 0?_coffee$imageAlt:name})):/*#__PURE__*/index_js_.createElement("div",{className:`${imagePlaceholder} ${(_styles$pigment=CoffeeCard_module_namespaceObject[pigment])!==null&&_styles$pigment!==void 0?_styles$pigment:''}`,"aria-hidden":"true"}),/*#__PURE__*/index_js_.createElement("div",{className:body},/*#__PURE__*/index_js_.createElement("span",{className:`${keySquare} ${(_styles$pigment2=CoffeeCard_module_namespaceObject[pigment])!==null&&_styles$pigment2!==void 0?_styles$pigment2:''}`,"aria-hidden":"true"}),/*#__PURE__*/index_js_.createElement("h3",{className:CoffeeCard_module_name},name),dataRow?/*#__PURE__*/index_js_.createElement("p",{className:CoffeeCard_module_dataRow},dataRow):null,notes.length>0?/*#__PURE__*/index_js_.createElement("p",{className:CoffeeCard_module_notes},notes.join(' · ')):null,/*#__PURE__*/index_js_.createElement("p",{className:priceRow},coffee.price!=null?/*#__PURE__*/index_js_.createElement("span",{className:price},(0,format/* formatMxn */.VV)(coffee.price)):null,!purchasable?/*#__PURE__*/index_js_.createElement("span",{className:stock},(0,strings.t)('outOfStock',locale)):null)));}

/***/ }),

/***/ 9098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ pigmentAt)
/* harmony export */ });
/* unused harmony export PIGMENTS */
/**
 * The four hand-laid chart pigments, rotated wherever a list of items needs
 * a key square or underline (cards, stats, tasting-note chips).
 */const PIGMENTS=['walnut','olive','bronze','copper'];function pigmentAt(index){var _PIGMENTS;return(_PIGMENTS=PIGMENTS[(index%PIGMENTS.length+PIGMENTS.length)%PIGMENTS.length])!==null&&_PIGMENTS!==void 0?_PIGMENTS:'walnut';}

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

/***/ 9491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  x: () => (/* binding */ CoreHtml)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ../node_modules/html-react-parser/esm/index.mjs
var esm = __webpack_require__(1490);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/hooks/useBlockMedia.ts
var useBlockMedia = __webpack_require__(8781);
;// ./src/components/blocks/CoreHtml.module.scss
// Exports
var prose = "CoreHtml-module--prose--1eaa6";
var CoreHtml_module_image = "CoreHtml-module--image--dcc46";

;// ./src/components/blocks/CoreHtml.tsx
/**
 * Renders a core-block HTML leaf from blocksJson: parses the rendered
 * WordPress markup into React, keeps the semantic elements, and swaps any
 * wp-image-N <img> for GatsbyImage when the build resolved it.
 */function CoreHtml({html}){const media=(0,useBlockMedia/* useBlockMedia */.n)();if(!html.trim())return null;const options={replace:node=>{var _node$attribs$href,_node$attribs$href2;if(!(node instanceof esm/* Element */.Hg))return undefined;if(node.name==='img'){var _node$attribs$src,_node$attribs$class,_ref;const src=(_node$attribs$src=node.attribs.src)!==null&&_node$attribs$src!==void 0?_node$attribs$src:'';const classMatch=/wp-image-(\d+)/.exec((_node$attribs$class=node.attribs.class)!==null&&_node$attribs$class!==void 0?_node$attribs$class:'');const imageData=(_ref=classMatch?media.byAttachmentId(Number(classMatch[1])):null)!==null&&_ref!==void 0?_ref:media.byUrl(src);if(imageData){var _node$attribs$alt;return/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:imageData,alt:(_node$attribs$alt=node.attribs.alt)!==null&&_node$attribs$alt!==void 0?_node$attribs$alt:media.altFor(src),className:CoreHtml_module_image});}return undefined;}// External links open safely.
if(node.name==='a'&&/^https?:\/\//.test((_node$attribs$href=node.attribs.href)!==null&&_node$attribs$href!==void 0?_node$attribs$href:'')&&!((_node$attribs$href2=node.attribs.href)!==null&&_node$attribs$href2!==void 0?_node$attribs$href2:'').includes('gramo.cafe')){return/*#__PURE__*/index_js_.createElement("a",{href:node.attribs.href,rel:"noopener noreferrer",target:"_blank"},(0,esm/* domToReact */.zd)(node.children,options));}return undefined;}};return/*#__PURE__*/index_js_.createElement("div",{className:prose},(0,esm/* default */.Ay)(html,options));}

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
//# sourceMappingURL=749.js.map