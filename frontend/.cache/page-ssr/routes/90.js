"use strict";
exports.id = 90;
exports.ids = [90];
exports.modules = {

/***/ 2545:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  u: () => (/* binding */ LocationCard)
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
;// ./src/components/LocationCard.module.scss
// Exports
var card = "LocationCard-module--card--e5837";
var LocationCard_module_image = "LocationCard-module--image--2f247";
var imagePlaceholder = "LocationCard-module--imagePlaceholder--5e804";
var body = "LocationCard-module--body--772bd";
var city = "LocationCard-module--city--42745";
var olive = "LocationCard-module--olive--31af0";
var bronze = "LocationCard-module--bronze--90aa6";
var LocationCard_module_name = "LocationCard-module--name--371e3";
var LocationCard_module_link = "LocationCard-module--link--3a446";
var address = "LocationCard-module--address--2d391";
var mapsLink = "LocationCard-module--mapsLink--f7410";

;// ./src/components/LocationCard.tsx
/**
 * Location card — plate with the café's photograph, the short name in big
 * serif, the city as a pigment-coded caption (Cuernavaca = olive,
 * CDMX = bronze) and the address in small type. The card links to the
 * location detail page; an optional "Cómo llegar ↗" caps link-out to Google
 * Maps sits above the stretched link.
 */function cityPigmentClass(city){var _styles$olive,_styles$bronze;const normalized=(city!==null&&city!==void 0?city:'').toLowerCase();if(normalized.includes('cuernavaca'))return(_styles$olive=olive)!==null&&_styles$olive!==void 0?_styles$olive:'';return(_styles$bronze=bronze)!==null&&_styles$bronze!==void 0?_styles$bronze:'';}function LocationCard({location,locale,showMapLink=false}){var _location$localImage$,_location$localImage,_location$localImage$2,_location$shortName;const image=(_location$localImage$=(_location$localImage=location.localImage)===null||_location$localImage===void 0?void 0:(_location$localImage$2=_location$localImage.childImageSharp)===null||_location$localImage$2===void 0?void 0:_location$localImage$2.gatsbyImageData)!==null&&_location$localImage$!==void 0?_location$localImage$:null;const name=(_location$shortName=location.shortName)!==null&&_location$shortName!==void 0?_location$shortName:location.title;return/*#__PURE__*/index_js_.createElement("article",{className:card},image?/*#__PURE__*/index_js_.createElement("div",{className:LocationCard_module_image},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:name})):/*#__PURE__*/index_js_.createElement("div",{className:imagePlaceholder,"aria-hidden":"true"}),/*#__PURE__*/index_js_.createElement("div",{className:body},location.city?/*#__PURE__*/index_js_.createElement("p",{className:`${city} ${cityPigmentClass(location.city)}`},location.city):null,/*#__PURE__*/index_js_.createElement("h3",{className:LocationCard_module_name},/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:(0,routes/* pathFor */.p0)('location',locale,location.slug),className:LocationCard_module_link},name)),location.address?/*#__PURE__*/index_js_.createElement("p",{className:address},location.address):null,showMapLink&&location.mapsUrl?/*#__PURE__*/index_js_.createElement("a",{href:location.mapsUrl,className:mapsLink,rel:"noopener noreferrer",target:"_blank"},(0,strings.t)('gettingThere',locale)," \u2197"):null));}

/***/ }),

/***/ 8378:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ postJson)
/* harmony export */ });
/* unused harmony export apiUrl */
/* provided dependency */ var fetch = __webpack_require__(4736);
/**
 * Shared REST base for the gramo/v1 endpoints (inquiry + order).
 *
 * The base URL works in both WordPress permalink styles:
 *   pretty     — https://cms.gramo.cafe/wp-json/gramo/v1
 *   rest_route — http://localhost:8888/index.php?rest_route=/gramo/v1
 *
 * In both cases appending `/inquiry` (or `/order`) directly to the trimmed
 * base yields a valid URL: for the rest_route style the query param simply
 * becomes `rest_route=/gramo/v1/inquiry`, which WordPress resolves the same
 * as the pretty path.
 */const DEFAULT_BASE='http://localhost:8888/index.php?rest_route=/gramo/v1';function apiUrl(path){var _process$env$GATSBY_A;const base=((_process$env$GATSBY_A=({}).GATSBY_API_URL)!==null&&_process$env$GATSBY_A!==void 0?_process$env$GATSBY_A:DEFAULT_BASE).replace(/\/+$/,'');return`${base}${path.startsWith('/')?path:`/${path}`}`;}/** POST a JSON payload; resolves the parsed body, rejects on network/HTTP error. */async function postJson(path,payload){const response=await fetch(apiUrl(path),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok){throw new Error(`gramo api ${path} failed: ${String(response.status)}`);}return await response.json();}

/***/ }),

/***/ 9090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  x: () => (/* binding */ BlockRenderer),
  S: () => (/* binding */ parseBlocks)
});

// NAMESPACE OBJECT: ./src/components/blocks/HeroBlock.module.scss
var HeroBlock_module_namespaceObject = {};
__webpack_require__.r(HeroBlock_module_namespaceObject);
__webpack_require__.d(HeroBlock_module_namespaceObject, {
  actions: () => (actions),
  compact: () => (compact),
  ctaPrimary: () => (ctaPrimary),
  ctaSecondary: () => (ctaSecondary),
  eyebrow: () => (eyebrow),
  full: () => (full),
  heading: () => (heading),
  hero: () => (hero),
  inner: () => (inner),
  plate: () => (plate),
  plateCaption: () => (plateCaption),
  subheading: () => (subheading),
  tall: () => (tall)
});

// NAMESPACE OBJECT: ./src/components/blocks/TestimonialsBlock.module.scss
var TestimonialsBlock_module_namespaceObject = {};
__webpack_require__.r(TestimonialsBlock_module_namespaceObject);
__webpack_require__.d(TestimonialsBlock_module_namespaceObject, {
  attribution: () => (attribution),
  bronze: () => (bronze),
  copper: () => (copper),
  heading: () => (TestimonialsBlock_module_heading),
  inner: () => (TestimonialsBlock_module_inner),
  item: () => (item),
  list: () => (list),
  mark: () => (mark),
  olive: () => (olive),
  quote: () => (quote),
  testimonials: () => (TestimonialsBlock_module_testimonials),
  walnut: () => (walnut)
});

// NAMESPACE OBJECT: ./src/components/blocks/CtaBandBlock.module.scss
var CtaBandBlock_module_namespaceObject = {};
__webpack_require__.r(CtaBandBlock_module_namespaceObject);
__webpack_require__.d(CtaBandBlock_module_namespaceObject, {
  band: () => (band),
  copy: () => (CtaBandBlock_module_copy),
  cta: () => (CtaBandBlock_module_cta),
  dark: () => (dark),
  espresso: () => (espresso),
  heading: () => (CtaBandBlock_module_heading),
  inner: () => (CtaBandBlock_module_inner),
  linen: () => (linen),
  plate: () => (CtaBandBlock_module_plate),
  text: () => (CtaBandBlock_module_text)
});

// NAMESPACE OBJECT: ./src/components/blocks/StatsBlock.module.scss
var StatsBlock_module_namespaceObject = {};
__webpack_require__.r(StatsBlock_module_namespaceObject);
__webpack_require__.d(StatsBlock_module_namespaceObject, {
  bronze: () => (StatsBlock_module_bronze),
  copper: () => (StatsBlock_module_copper),
  heading: () => (StatsBlock_module_heading),
  inner: () => (StatsBlock_module_inner),
  item: () => (StatsBlock_module_item),
  label: () => (label),
  olive: () => (StatsBlock_module_olive),
  row: () => (StatsBlock_module_row),
  stats: () => (stats),
  suffix: () => (suffix),
  value: () => (value),
  walnut: () => (StatsBlock_module_walnut)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./src/components/blocks/CoreHtml.tsx + 1 modules
var CoreHtml = __webpack_require__(9491);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(230);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/hooks/useBlockMedia.ts
var useBlockMedia = __webpack_require__(8781);
;// ./src/components/blocks/HeroBlock.module.scss
// Exports
var hero = "HeroBlock-module--hero--6bc99";
var full = "HeroBlock-module--full--24f3a";
var tall = "HeroBlock-module--tall--c5566";
var compact = "HeroBlock-module--compact--f43f6";
var inner = "HeroBlock-module--inner--89646";
var heading = "HeroBlock-module--heading--429e3";
var eyebrow = "HeroBlock-module--eyebrow--bf5ee";
var subheading = "HeroBlock-module--subheading--d22c6";
var actions = "HeroBlock-module--actions--73533";
var ctaPrimary = "HeroBlock-module--ctaPrimary--c1d49";
var ctaSecondary = "HeroBlock-module--ctaSecondary--00dfe";
var plate = "HeroBlock-module--plate--1fd24";
var plateCaption = "HeroBlock-module--plateCaption--9b1a5";

;// ./src/components/blocks/HeroBlock.tsx
/**
 * gramo/hero — the espresso-black board opening. Serif display over the
 * inked field, tracked caption eyebrow, plate-mounted photograph on the
 * right, copper plate action. The contract's first viewport lives here.
 */function CtaLink({label,url,kind}){if(!label||!url)return null;const className=kind==='primary'?ctaPrimary:ctaSecondary;if(url.startsWith('/')){return/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:url,className:className},label);}return/*#__PURE__*/index_js_.createElement("a",{href:url,className:className},label);}function HeroBlock({attributes}){var _media$byUrl,_attributes$media,_attributes$media2,_attributes$height,_styles$height,_attributes$primaryCt,_attributes$primaryCt2,_attributes$secondary,_attributes$secondary2,_attributes$media$alt,_attributes$media3,_attributes$media4;const media=(0,useBlockMedia/* useBlockMedia */.n)();const image=(_media$byUrl=media.byUrl((_attributes$media=attributes.media)===null||_attributes$media===void 0?void 0:_attributes$media.url))!==null&&_media$byUrl!==void 0?_media$byUrl:media.byAttachmentId((_attributes$media2=attributes.media)===null||_attributes$media2===void 0?void 0:_attributes$media2.id);const height=(_attributes$height=attributes.height)!==null&&_attributes$height!==void 0?_attributes$height:'full';return/*#__PURE__*/index_js_.createElement("section",{className:`${hero} ${(_styles$height=HeroBlock_module_namespaceObject[height])!==null&&_styles$height!==void 0?_styles$height:''}`},/*#__PURE__*/index_js_.createElement("div",{className:inner},/*#__PURE__*/index_js_.createElement("div",{className:HeroBlock_module_namespaceObject.copy},attributes.eyebrow?/*#__PURE__*/index_js_.createElement("p",{className:eyebrow},attributes.eyebrow):null,attributes.heading?/*#__PURE__*/index_js_.createElement("h1",{className:heading},attributes.heading):null,attributes.subheading?/*#__PURE__*/index_js_.createElement("p",{className:subheading},attributes.subheading):null,/*#__PURE__*/index_js_.createElement("div",{className:actions},/*#__PURE__*/index_js_.createElement(CtaLink,{label:(_attributes$primaryCt=attributes.primaryCta)===null||_attributes$primaryCt===void 0?void 0:_attributes$primaryCt.label,url:(_attributes$primaryCt2=attributes.primaryCta)===null||_attributes$primaryCt2===void 0?void 0:_attributes$primaryCt2.url,kind:"primary"}),/*#__PURE__*/index_js_.createElement(CtaLink,{label:(_attributes$secondary=attributes.secondaryCta)===null||_attributes$secondary===void 0?void 0:_attributes$secondary.label,url:(_attributes$secondary2=attributes.secondaryCta)===null||_attributes$secondary2===void 0?void 0:_attributes$secondary2.url,kind:"secondary"}))),image?/*#__PURE__*/index_js_.createElement("figure",{className:plate},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:(_attributes$media$alt=(_attributes$media3=attributes.media)===null||_attributes$media3===void 0?void 0:_attributes$media3.alt)!==null&&_attributes$media$alt!==void 0?_attributes$media$alt:'',loading:"eager"}),(_attributes$media4=attributes.media)!==null&&_attributes$media4!==void 0&&_attributes$media4.alt?/*#__PURE__*/index_js_.createElement("figcaption",{className:plateCaption},attributes.media.alt):null):null));}
;// ./src/components/blocks/SplitImageBlock.module.scss
// Exports
var split = "SplitImageBlock-module--split--e72a1";
var SplitImageBlock_module_inner = "SplitImageBlock-module--inner--67f84";
var SplitImageBlock_module_imageRight = "SplitImageBlock-module--imageRight--b64aa";
var SplitImageBlock_module_plate = "SplitImageBlock-module--plate--9176f";
var platePlaceholder = "SplitImageBlock-module--platePlaceholder--69ba7";
var SplitImageBlock_module_plateCaption = "SplitImageBlock-module--plateCaption--5e17e";
var SplitImageBlock_module_eyebrow = "SplitImageBlock-module--eyebrow--dbc19";
var SplitImageBlock_module_heading = "SplitImageBlock-module--heading--526fc";
var copy = "SplitImageBlock-module--copy--76a1f";

;// ./src/components/blocks/SplitImageBlock.tsx
/**
 * gramo/split-image — editorial two-column portrait: plate-mounted image on
 * one side, serif-led copy (rendered inner core blocks) on the other.
 */function SplitImageBlock({attributes,innerBlocks}){var _media$byUrl,_attributes$media,_attributes$media2,_attributes$media$alt,_attributes$media3,_attributes$media4;const media=(0,useBlockMedia/* useBlockMedia */.n)();const image=(_media$byUrl=media.byUrl((_attributes$media=attributes.media)===null||_attributes$media===void 0?void 0:_attributes$media.url))!==null&&_media$byUrl!==void 0?_media$byUrl:media.byAttachmentId((_attributes$media2=attributes.media)===null||_attributes$media2===void 0?void 0:_attributes$media2.id);const imageRight=attributes.imageSide==='right';return/*#__PURE__*/index_js_.createElement("section",{className:`${split} ${imageRight?SplitImageBlock_module_imageRight:''}`},/*#__PURE__*/index_js_.createElement("div",{className:SplitImageBlock_module_inner},image?/*#__PURE__*/index_js_.createElement("figure",{className:SplitImageBlock_module_plate},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:(_attributes$media$alt=(_attributes$media3=attributes.media)===null||_attributes$media3===void 0?void 0:_attributes$media3.alt)!==null&&_attributes$media$alt!==void 0?_attributes$media$alt:''}),(_attributes$media4=attributes.media)!==null&&_attributes$media4!==void 0&&_attributes$media4.alt?/*#__PURE__*/index_js_.createElement("figcaption",{className:SplitImageBlock_module_plateCaption},attributes.media.alt):null):/*#__PURE__*/index_js_.createElement("div",{className:platePlaceholder,"aria-hidden":"true"}),/*#__PURE__*/index_js_.createElement("div",{className:copy},attributes.eyebrow?/*#__PURE__*/index_js_.createElement("p",{className:SplitImageBlock_module_eyebrow},attributes.eyebrow):null,attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:SplitImageBlock_module_heading},attributes.heading):null,innerBlocks.map((block,index)=>typeof block.html==='string'?/*#__PURE__*/index_js_.createElement(CoreHtml/* CoreHtml */.x,{key:`${block.name}-${index}`,html:block.html}):null))));}
;// ./src/components/blocks/GalleryBlock.module.scss
// Exports
var gallery = "GalleryBlock-module--gallery--e75d9";
var GalleryBlock_module_items = "GalleryBlock-module--items--39fc4";
var grid = "GalleryBlock-module--grid--a6411";
var strip = "GalleryBlock-module--strip--418f4";
var GalleryBlock_module_plate = "GalleryBlock-module--plate--70d2d";
var caption = "GalleryBlock-module--caption--34bb2";

;// ./src/components/blocks/GalleryBlock.tsx
/**
 * gramo/gallery — archival plates in a grid (2–4 columns) or a horizontal
 * scroll-snap strip. Every image resolves through the sharp pipeline via
 * useBlockMedia; captions sit in tracked caps beneath each plate.
 */function GalleryBlock({attributes}){var _attributes$items;const media=(0,useBlockMedia/* useBlockMedia */.n)();const items=(_attributes$items=attributes.items)!==null&&_attributes$items!==void 0?_attributes$items:[];if(items.length===0)return null;const layout=attributes.layout==='strip'?'strip':'grid';const columns=Math.min(4,Math.max(2,attributes.columns||3));return/*#__PURE__*/index_js_.createElement("section",{className:gallery},/*#__PURE__*/index_js_.createElement("div",{className:`${GalleryBlock_module_items} ${layout==='strip'?strip:grid}`,style:{'--gallery-columns':columns}},items.map((item,index)=>{var _media$byUrl,_item$alt;const image=(_media$byUrl=media.byUrl(item.url))!==null&&_media$byUrl!==void 0?_media$byUrl:media.byAttachmentId(item.id);if(!image)return null;return/*#__PURE__*/index_js_.createElement("figure",{key:`${item.url}-${index}`,className:GalleryBlock_module_plate},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:(_item$alt=item.alt)!==null&&_item$alt!==void 0?_item$alt:media.altFor(item.url)}),item.caption?/*#__PURE__*/index_js_.createElement("figcaption",{className:caption},item.caption):null);})));}
// EXTERNAL MODULE: ./src/components/CoffeeCard.tsx + 1 modules
var CoffeeCard = __webpack_require__(8844);
;// ./src/components/blocks/FeaturedCoffeesBlock.module.scss
// Exports
var featured = "FeaturedCoffeesBlock-module--featured--4e951";
var FeaturedCoffeesBlock_module_inner = "FeaturedCoffeesBlock-module--inner--19613";
var FeaturedCoffeesBlock_module_heading = "FeaturedCoffeesBlock-module--heading--9492e";
var intro = "FeaturedCoffeesBlock-module--intro--f5118";
var row = "FeaturedCoffeesBlock-module--row--432b1";

;// ./src/components/blocks/FeaturedCoffeesBlock.tsx
/**
 * gramo/featured-coffees — a portrait row of coffee plates. `featured` mode
 * shows the first N purchasable non-subscription coffees; `manual` mode
 * follows the editor's productIds order. Cards are the shared CoffeeCard.
 */function FeaturedCoffeesBlock({attributes,locale}){var _attributes$productId;const data=(0,gatsby_browser_entry.useStaticQuery)("3918419446");const all=data.allGramoCoffee.nodes;const count=attributes.count>0?attributes.count:3;let coffees;if(attributes.mode==='manual'&&((_attributes$productId=attributes.productIds)!==null&&_attributes$productId!==void 0?_attributes$productId:[]).length>0){coffees=attributes.productIds.map(id=>all.find(coffee=>coffee.databaseId===id)).filter(coffee=>Boolean(coffee));}else{coffees=all.filter(coffee=>coffee.purchasable===true&&!coffee.subscriptionInterval).slice(0,count);}if(coffees.length===0)return null;return/*#__PURE__*/index_js_.createElement("section",{className:featured},/*#__PURE__*/index_js_.createElement("div",{className:FeaturedCoffeesBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:FeaturedCoffeesBlock_module_heading},attributes.heading):null,attributes.intro?/*#__PURE__*/index_js_.createElement("p",{className:intro},attributes.intro):null,/*#__PURE__*/index_js_.createElement("div",{className:row},coffees.map((coffee,index)=>/*#__PURE__*/index_js_.createElement(CoffeeCard/* CoffeeCard */.h,{key:coffee.databaseId,coffee:coffee,locale:locale,index:index})))));}
// EXTERNAL MODULE: ./src/lib/format.ts
var format = __webpack_require__(4399);
;// ./src/components/blocks/MenuSectionBlock.module.scss
// Exports
var sheet = "MenuSectionBlock-module--sheet--94018";
var MenuSectionBlock_module_inner = "MenuSectionBlock-module--inner--9799f";
var header = "MenuSectionBlock-module--header--886aa";
var rows = "MenuSectionBlock-module--rows--134ce";
var MenuSectionBlock_module_row = "MenuSectionBlock-module--row--d06ed";
var leader = "MenuSectionBlock-module--leader--81f28";
var MenuSectionBlock_module_name = "MenuSectionBlock-module--name--22069";
var price = "MenuSectionBlock-module--price--afdad";
var MenuSectionBlock_module_priceNote = "MenuSectionBlock-module--priceNote--12735";
var MenuSectionBlock_module_description = "MenuSectionBlock-module--description--90dd9";
var MenuSectionBlock_module_dietary = "MenuSectionBlock-module--dietary--071ed";
var MenuSectionBlock_module_variants = "MenuSectionBlock-module--variants--b186b";
var variantLabel = "MenuSectionBlock-module--variantLabel--2354d";

;// ./src/components/blocks/MenuSectionBlock.tsx
/**
 * gramo/menu-section — the stock-sheet: a caps section header over
 * dotted-leader rows (name … price in tabular numerals), descriptions and
 * price notes in small type, variants as sub-rows, dietary flags in olive
 * small caps. `showPrices: false` turns the sheet into a plain list.
 */function localized(text,locale){var _ref,_ref2;if(!text)return'';return(_ref=(_ref2=locale==='es'?text.es:text.en)!==null&&_ref2!==void 0?_ref2:text.es)!==null&&_ref!==void 0?_ref:'';}function MenuSectionBlock({attributes,locale}){var _ref3;const data=(0,gatsby_browser_entry.useStaticQuery)("3669839309");const section=data.allGramoMenuSection.nodes.find(node=>node.slug===attributes.sectionSlug);const entries=data.allGramoMenuEntry.nodes.filter(entry=>{var _entry$sectionSlugs;return((_entry$sectionSlugs=entry.sectionSlugs)!==null&&_entry$sectionSlugs!==void 0?_entry$sectionSlugs:[]).includes(attributes.sectionSlug);});if(!section&&entries.length===0)return null;const showPrices=attributes.showPrices!==false;const heading=attributes.headingOverride||(section?(_ref3=locale==='en'?section.nameEn:null)!==null&&_ref3!==void 0?_ref3:section.name:attributes.sectionSlug);return/*#__PURE__*/index_js_.createElement("section",{className:sheet},/*#__PURE__*/index_js_.createElement("div",{className:MenuSectionBlock_module_inner},/*#__PURE__*/index_js_.createElement("h2",{className:header},heading),/*#__PURE__*/index_js_.createElement("ul",{className:rows},entries.map(entry=>{var _ref4,_entry$variants;const name=(_ref4=locale==='en'?entry.nameEn:null)!==null&&_ref4!==void 0?_ref4:entry.title;const description=localized(entry.description,locale);const priceNote=localized(entry.priceNote,locale);const dietary=localized(entry.dietary,locale);const variants=((_entry$variants=entry.variants)!==null&&_entry$variants!==void 0?_entry$variants:[]).filter(variant=>Boolean(variant));return/*#__PURE__*/index_js_.createElement("li",{key:entry.databaseId,className:MenuSectionBlock_module_row},/*#__PURE__*/index_js_.createElement("div",{className:leader},/*#__PURE__*/index_js_.createElement("span",{className:MenuSectionBlock_module_name},name),showPrices&&entry.price!=null?/*#__PURE__*/index_js_.createElement("span",{className:price},(0,format/* formatPrice */.$g)(entry.price),priceNote?/*#__PURE__*/index_js_.createElement("span",{className:MenuSectionBlock_module_priceNote}," ",priceNote):null):null),description?/*#__PURE__*/index_js_.createElement("p",{className:MenuSectionBlock_module_description},description):null,dietary?/*#__PURE__*/index_js_.createElement("p",{className:MenuSectionBlock_module_dietary},dietary):null,variants.length>0?/*#__PURE__*/index_js_.createElement("ul",{className:MenuSectionBlock_module_variants},variants.map((variant,index)=>{var _ref5,_ref6;const label=(_ref5=(_ref6=locale==='en'?variant.labelEn:null)!==null&&_ref6!==void 0?_ref6:variant.labelEs)!==null&&_ref5!==void 0?_ref5:'';return/*#__PURE__*/index_js_.createElement("li",{key:`${entry.databaseId}-${index}`,className:leader},/*#__PURE__*/index_js_.createElement("span",{className:variantLabel},label),showPrices&&variant.price?/*#__PURE__*/index_js_.createElement("span",{className:price},variant.price):null);})):null);}))));}
// EXTERNAL MODULE: ./src/lib/pigments.ts
var pigments = __webpack_require__(9098);
;// ./src/components/blocks/TestimonialsBlock.module.scss
// Exports
var TestimonialsBlock_module_testimonials = "TestimonialsBlock-module--testimonials--69e1c";
var TestimonialsBlock_module_inner = "TestimonialsBlock-module--inner--bdbd9";
var TestimonialsBlock_module_heading = "TestimonialsBlock-module--heading--e7869";
var list = "TestimonialsBlock-module--list--f9908";
var item = "TestimonialsBlock-module--item--4fb30";
var quote = "TestimonialsBlock-module--quote--1f92f";
var mark = "TestimonialsBlock-module--mark--9ee40";
var walnut = "TestimonialsBlock-module--walnut--60a2f";
var olive = "TestimonialsBlock-module--olive--93106";
var bronze = "TestimonialsBlock-module--bronze--c0f68";
var copper = "TestimonialsBlock-module--copper--fdeed";
var attribution = "TestimonialsBlock-module--attribution--54137";

;// ./src/components/blocks/TestimonialsBlock.tsx
/**
 * gramo/testimonials — large serif-italic quotes with an oversized opening
 * quote mark in an alternating pigment, attribution in tracked caps beneath
 * a thin rule. `latest` takes the newest N; `manual` follows the editor's
 * id order.
 */function TestimonialsBlock_localized(text,locale){var _ref,_ref2;if(!text)return'';return(_ref=(_ref2=locale==='es'?text.es:text.en)!==null&&_ref2!==void 0?_ref2:text.es)!==null&&_ref!==void 0?_ref:'';}function TestimonialsBlock({attributes,locale}){var _attributes$testimoni;const data=(0,gatsby_browser_entry.useStaticQuery)("3359569318");const all=data.allGramoTestimonial.nodes;const count=attributes.count>0?attributes.count:2;let testimonials;if(attributes.mode==='manual'&&((_attributes$testimoni=attributes.testimonialIds)!==null&&_attributes$testimoni!==void 0?_attributes$testimoni:[]).length>0){testimonials=attributes.testimonialIds.map(id=>all.find(node=>node.databaseId===id)).filter(node=>Boolean(node));}else{testimonials=all.slice(0,count);}const visible=testimonials.filter(node=>TestimonialsBlock_localized(node.quote,locale)!=='');if(visible.length===0)return null;return/*#__PURE__*/index_js_.createElement("section",{className:TestimonialsBlock_module_testimonials},/*#__PURE__*/index_js_.createElement("div",{className:TestimonialsBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:TestimonialsBlock_module_heading},attributes.heading):null,/*#__PURE__*/index_js_.createElement("div",{className:list},visible.map((node,index)=>{var _styles$pigmentAt;return/*#__PURE__*/index_js_.createElement("figure",{key:node.databaseId,className:item},/*#__PURE__*/index_js_.createElement("blockquote",{className:quote},/*#__PURE__*/index_js_.createElement("span",{className:`${mark} ${(_styles$pigmentAt=TestimonialsBlock_module_namespaceObject[(0,pigments/* pigmentAt */.Y)(index)])!==null&&_styles$pigmentAt!==void 0?_styles$pigmentAt:''}`,"aria-hidden":"true"},"\u201C"),/*#__PURE__*/index_js_.createElement("p",null,TestimonialsBlock_localized(node.quote,locale))),TestimonialsBlock_localized(node.attribution,locale)?/*#__PURE__*/index_js_.createElement("figcaption",{className:attribution},TestimonialsBlock_localized(node.attribution,locale)):null);}))));}
;// ./src/components/blocks/CtaBandBlock.module.scss
// Exports
var band = "CtaBandBlock-module--band--46f4e";
var espresso = "CtaBandBlock-module--espresso--f1ddb";
var dark = "CtaBandBlock-module--dark--f0c82";
var CtaBandBlock_module_text = "CtaBandBlock-module--text--115ec";
var CtaBandBlock_module_plate = "CtaBandBlock-module--plate--c1064";
var linen = "CtaBandBlock-module--linen--f47df";
var CtaBandBlock_module_inner = "CtaBandBlock-module--inner--5cf1d";
var CtaBandBlock_module_copy = "CtaBandBlock-module--copy--64ecb";
var CtaBandBlock_module_heading = "CtaBandBlock-module--heading--973be";
var CtaBandBlock_module_cta = "CtaBandBlock-module--cta--12989";

;// ./src/components/blocks/CtaBandBlock.tsx
/**
 * gramo/cta-band — a full-width pigment band: espresso/dark tones sit on
 * the inked board with cream text, linen on deep paper with ink. Serif
 * heading, body copy, one copper plate action, and an optional photograph
 * mounted as a subtle right-side plate.
 */function CtaBandBlock({attributes}){var _media$byUrl,_attributes$media,_attributes$media2,_styles$tone,_attributes$media$alt,_attributes$media3;const media=(0,useBlockMedia/* useBlockMedia */.n)();const image=(_media$byUrl=media.byUrl((_attributes$media=attributes.media)===null||_attributes$media===void 0?void 0:_attributes$media.url))!==null&&_media$byUrl!==void 0?_media$byUrl:media.byAttachmentId((_attributes$media2=attributes.media)===null||_attributes$media2===void 0?void 0:_attributes$media2.id);const tone=attributes.tone==='linen'?'linen':attributes.tone==='dark'?'dark':'espresso';if(!attributes.heading&&!attributes.text)return null;const cta=attributes.cta;const ctaEl=cta!==null&&cta!==void 0&&cta.label&&cta.url?cta.url.startsWith('/')?/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:cta.url,className:CtaBandBlock_module_cta},cta.label):/*#__PURE__*/index_js_.createElement("a",{href:cta.url,className:CtaBandBlock_module_cta},cta.label):null;return/*#__PURE__*/index_js_.createElement("section",{className:`${band} ${(_styles$tone=CtaBandBlock_module_namespaceObject[tone])!==null&&_styles$tone!==void 0?_styles$tone:''}`},/*#__PURE__*/index_js_.createElement("div",{className:CtaBandBlock_module_inner},/*#__PURE__*/index_js_.createElement("div",{className:CtaBandBlock_module_copy},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:CtaBandBlock_module_heading},attributes.heading):null,attributes.text?/*#__PURE__*/index_js_.createElement("p",{className:CtaBandBlock_module_text},attributes.text):null,ctaEl),image?/*#__PURE__*/index_js_.createElement("div",{className:CtaBandBlock_module_plate},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:(_attributes$media$alt=(_attributes$media3=attributes.media)===null||_attributes$media3===void 0?void 0:_attributes$media3.alt)!==null&&_attributes$media$alt!==void 0?_attributes$media$alt:''})):null));}
;// ./src/components/blocks/StatsBlock.module.scss
// Exports
var stats = "StatsBlock-module--stats--f59c0";
var StatsBlock_module_inner = "StatsBlock-module--inner--7d11c";
var StatsBlock_module_heading = "StatsBlock-module--heading--234e8";
var StatsBlock_module_row = "StatsBlock-module--row--3d9d8";
var StatsBlock_module_item = "StatsBlock-module--item--f1125";
var value = "StatsBlock-module--value--0ab02";
var StatsBlock_module_walnut = "StatsBlock-module--walnut--c4769";
var StatsBlock_module_olive = "StatsBlock-module--olive--f8276";
var StatsBlock_module_bronze = "StatsBlock-module--bronze--518ee";
var StatsBlock_module_copper = "StatsBlock-module--copper--c177a";
var suffix = "StatsBlock-module--suffix--a3eb5";
var label = "StatsBlock-module--label--efb2c";

;// ./src/components/blocks/StatsBlock.tsx
/**
 * gramo/stats — the data-portrait moment: big serif numerals over tracked
 * caps labels, each stat on its own rotating pigment underline. Numeric
 * values count up once on first view (IntersectionObserver +
 * requestAnimationFrame, no library); under prefers-reduced-motion the
 * final values render statically. SSR always carries the final values.
 */const COUNT_DURATION_MS=900;function prefersReducedMotion(){return typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;}function StatValue({value,start}){var _value$split$1$length,_value$split$;const numeric=/^\d+(\.\d+)?$/.test(value.trim())?Number(value.trim()):null;const decimals=numeric!=null&&value.includes('.')?(_value$split$1$length=(_value$split$=value.split('.')[1])===null||_value$split$===void 0?void 0:_value$split$.length)!==null&&_value$split$1$length!==void 0?_value$split$1$length:0:0;const[display,setDisplay]=index_js_.useState(numeric);index_js_.useEffect(()=>{if(numeric==null||!start||prefersReducedMotion())return undefined;let raf=0;const t0=performance.now();const tick=now=>{const progress=Math.min(1,(now-t0)/COUNT_DURATION_MS);const eased=1-(1-progress)**3;setDisplay(numeric*eased);if(progress<1)raf=requestAnimationFrame(tick);};setDisplay(0);raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf);},[numeric,start]);if(numeric==null)return/*#__PURE__*/index_js_.createElement(index_js_.Fragment,null,value);return/*#__PURE__*/index_js_.createElement(index_js_.Fragment,null,(display!==null&&display!==void 0?display:numeric).toFixed(decimals));}function StatsBlock({attributes}){var _attributes$items;const items=((_attributes$items=attributes.items)!==null&&_attributes$items!==void 0?_attributes$items:[]).filter(item=>Boolean(item===null||item===void 0?void 0:item.value));const ref=index_js_.useRef(null);const[inView,setInView]=index_js_.useState(false);index_js_.useEffect(()=>{const el=ref.current;if(!el||typeof IntersectionObserver==='undefined'){setInView(true);return undefined;}const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setInView(true);observer.disconnect();}},{threshold:0.35});observer.observe(el);return()=>observer.disconnect();},[]);if(items.length===0)return null;return/*#__PURE__*/index_js_.createElement("section",{className:stats,ref:ref},/*#__PURE__*/index_js_.createElement("div",{className:StatsBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:StatsBlock_module_heading},attributes.heading):null,/*#__PURE__*/index_js_.createElement("dl",{className:StatsBlock_module_row},items.map((item,index)=>{var _styles$pigmentAt;return/*#__PURE__*/index_js_.createElement("div",{key:`${item.label}-${index}`,className:StatsBlock_module_item},/*#__PURE__*/index_js_.createElement("dd",{className:`${value} ${(_styles$pigmentAt=StatsBlock_module_namespaceObject[(0,pigments/* pigmentAt */.Y)(index)])!==null&&_styles$pigmentAt!==void 0?_styles$pigmentAt:''}`},/*#__PURE__*/index_js_.createElement(StatValue,{value:item.value,start:inView}),item.suffix?/*#__PURE__*/index_js_.createElement("span",{className:suffix},item.suffix):null),/*#__PURE__*/index_js_.createElement("dt",{className:label},item.label));}))));}
;// ./src/components/blocks/FaqBlock.module.scss
// Exports
var faq = "FaqBlock-module--faq--6924b";
var FaqBlock_module_inner = "FaqBlock-module--inner--c91d2";
var FaqBlock_module_heading = "FaqBlock-module--heading--42241";
var FaqBlock_module_intro = "FaqBlock-module--intro--72cf7";
var FaqBlock_module_list = "FaqBlock-module--list--7e17b";
var FaqBlock_module_item = "FaqBlock-module--item--dc62f";
var summary = "FaqBlock-module--summary--f2a7a";
var FaqBlock_module_question = "FaqBlock-module--question--9dfae";
var marker = "FaqBlock-module--marker--e5f8f";
var body = "FaqBlock-module--body--711ac";

;// ./src/components/blocks/FaqBlock.tsx
/**
 * gramo/faq — ledger-row accordions from gramo/faq-item inner blocks:
 * native <details>/<summary> (keyboard support for free) styled in the
 * world's grammar — 1px ink rules, a plus that rotates to × on open.
 */function faqItemBody(item){var _item$innerBlocks;return((_item$innerBlocks=item.innerBlocks)!==null&&_item$innerBlocks!==void 0?_item$innerBlocks:[]).map((block,index)=>typeof block.html==='string'?/*#__PURE__*/index_js_.createElement(CoreHtml/* CoreHtml */.x,{key:`${block.name}-${index}`,html:block.html}):null).filter(node=>node!==null);}function FaqBlock({attributes,innerBlocks}){const items=innerBlocks.filter(block=>block.name==='gramo/faq-item');if(items.length===0)return null;return/*#__PURE__*/index_js_.createElement("section",{className:faq},/*#__PURE__*/index_js_.createElement("div",{className:FaqBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:FaqBlock_module_heading},attributes.heading):null,attributes.intro?/*#__PURE__*/index_js_.createElement("p",{className:FaqBlock_module_intro},attributes.intro):null,/*#__PURE__*/index_js_.createElement("div",{className:FaqBlock_module_list},items.map((item,index)=>{var _question,_item$attributes;const question=String((_question=(_item$attributes=item.attributes)===null||_item$attributes===void 0?void 0:_item$attributes.question)!==null&&_question!==void 0?_question:'');if(!question)return null;return/*#__PURE__*/index_js_.createElement("details",{key:`faq-${index}`,className:FaqBlock_module_item},/*#__PURE__*/index_js_.createElement("summary",{className:summary},/*#__PURE__*/index_js_.createElement("span",{className:FaqBlock_module_question},question),/*#__PURE__*/index_js_.createElement("span",{className:marker,"aria-hidden":"true"},"+")),/*#__PURE__*/index_js_.createElement("div",{className:body},faqItemBody(item)));}))));}
// EXTERNAL MODULE: ./src/components/LocationCard.tsx + 1 modules
var LocationCard = __webpack_require__(2545);
;// ./src/components/blocks/LocationsBlock.module.scss
// Exports
var LocationsBlock_module_locations = "LocationsBlock-module--locations--43c32";
var LocationsBlock_module_inner = "LocationsBlock-module--inner--7e0c7";
var LocationsBlock_module_heading = "LocationsBlock-module--heading--132a1";
var LocationsBlock_module_grid = "LocationsBlock-module--grid--d2582";

;// ./src/components/blocks/LocationsBlock.tsx
/**
 * gramo/locations — the intervened spaces as LocationCard plates, in
 * menuOrder. An id list narrows the set; `showMap` adds a caps "Cómo
 * llegar ↗" link-out per card instead of any live map embed.
 */function LocationsBlock({attributes,locale}){var _attributes$locationI;const data=(0,gatsby_browser_entry.useStaticQuery)("2316957388");const ids=(_attributes$locationI=attributes.locationIds)!==null&&_attributes$locationI!==void 0?_attributes$locationI:[];const locations=ids.length>0?data.allGramoLocation.nodes.filter(node=>ids.includes(node.databaseId)):data.allGramoLocation.nodes;if(locations.length===0)return null;return/*#__PURE__*/index_js_.createElement("section",{className:LocationsBlock_module_locations},/*#__PURE__*/index_js_.createElement("div",{className:LocationsBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:LocationsBlock_module_heading},attributes.heading):null,/*#__PURE__*/index_js_.createElement("div",{className:LocationsBlock_module_grid},locations.map(location=>/*#__PURE__*/index_js_.createElement(LocationCard/* LocationCard */.u,{key:location.databaseId,location:location,locale:locale,showMapLink:attributes.showMap===true})))));}
// EXTERNAL MODULE: ./src/lib/api.ts
var api = __webpack_require__(8378);
;// ./src/hooks/useInquiry.ts
/**
 * Inquiry form submission against `POST gramo/v1/inquiry`, with the Guard
 * fields the backend expects: `_gramo_t` (epoch seconds at mount — bots that
 * submit in under three seconds are rejected) and the `_gramo_hp` honeypot.
 */function useInquiry(formType,locale){const[status,setStatus]=index_js_.useState('idle');const mountedAt=index_js_.useRef(Math.floor(Date.now()/1000));const submit=index_js_.useCallback(async fields=>{setStatus('sending');try{await (0,api/* postJson */.B)('/inquiry',{type:formType,name:fields.name,email:fields.email,phone:fields.phone,company:fields.company,message:fields.message,locale,_gramo_t:mountedAt.current,_gramo_hp:fields.honeypot});setStatus('success');}catch{setStatus('error');}},[formType,locale]);return{status,submit};}
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
;// ./src/components/blocks/InquiryFormBlock.module.scss
// Exports
var inquiry = "InquiryFormBlock-module--inquiry--a9c49";
var InquiryFormBlock_module_inner = "InquiryFormBlock-module--inner--21061";
var InquiryFormBlock_module_heading = "InquiryFormBlock-module--heading--c6c4a";
var InquiryFormBlock_module_intro = "InquiryFormBlock-module--intro--dd379";
var InquiryFormBlock_module_form = "InquiryFormBlock-module--form--d51f7";
var twoUp = "InquiryFormBlock-module--twoUp--f2340";
var field = "InquiryFormBlock-module--field--b509b";
var InquiryFormBlock_module_label = "InquiryFormBlock-module--label--18bbe";
var input = "InquiryFormBlock-module--input--eaf74";
var InquiryFormBlock_module_textarea = "InquiryFormBlock-module--textarea--72169";
var error = "InquiryFormBlock-module--error--6af23";
var InquiryFormBlock_module_honeypot = "InquiryFormBlock-module--honeypot--42c0d";
var InquiryFormBlock_module_submit = "InquiryFormBlock-module--submit--8245b";
var success = "InquiryFormBlock-module--success--39b4b";

;// ./src/components/blocks/InquiryFormBlock.tsx
/**
 * gramo/inquiry-form — the underlined-field form of the world: small-caps
 * labels, copper focus underlines, errors in copper (never red). Submits
 * through useInquiry against `POST gramo/v1/inquiry` with the honeypot and
 * render-timestamp guards; success replaces the form with the caps message.
 */const COMPANY_TYPES=['wholesale','catering','events'];function InquiryFormBlock({attributes,locale}){var _attributes$formType;const formType=(_attributes$formType=attributes.formType)!==null&&_attributes$formType!==void 0?_attributes$formType:'general';const{status,submit}=useInquiry(formType,locale);const[fields,setFields]=index_js_.useState({name:'',email:'',phone:'',company:'',message:''});const[honeypot,setHoneypot]=index_js_.useState('');const[errors,setErrors]=index_js_.useState({});const showCompany=COMPANY_TYPES.includes(formType);const setField=key=>event=>{const value=event.target.value;setFields(prev=>({...prev,[key]:value}));setErrors(prev=>({...prev,[key]:undefined}));};const handleSubmit=event=>{event.preventDefault();const required=['name','email','message'];const nextErrors={};for(const key of required){if(!fields[key].trim())nextErrors[key]=(0,strings.t)('formRequired',locale);}setErrors(nextErrors);if(Object.keys(nextErrors).length>0)return;void submit({name:fields.name.trim(),email:fields.email.trim(),phone:fields.phone.trim(),company:fields.company.trim(),message:fields.message.trim(),honeypot});};return/*#__PURE__*/index_js_.createElement("section",{className:inquiry},/*#__PURE__*/index_js_.createElement("div",{className:InquiryFormBlock_module_inner},attributes.heading?/*#__PURE__*/index_js_.createElement("h2",{className:InquiryFormBlock_module_heading},attributes.heading):null,attributes.intro?/*#__PURE__*/index_js_.createElement("p",{className:InquiryFormBlock_module_intro},attributes.intro):null,status==='success'?/*#__PURE__*/index_js_.createElement("p",{className:success,role:"status"},(0,strings.t)('formSuccess',locale)):/*#__PURE__*/index_js_.createElement("form",{className:InquiryFormBlock_module_form,onSubmit:handleSubmit,noValidate:true},/*#__PURE__*/index_js_.createElement("div",{className:field},/*#__PURE__*/index_js_.createElement("label",{className:InquiryFormBlock_module_label,htmlFor:`inq-name-${formType}`},(0,strings.t)('formName',locale)),/*#__PURE__*/index_js_.createElement("input",{id:`inq-name-${formType}`,className:input,type:"text",name:"name",autoComplete:"name",value:fields.name,onChange:setField('name'),"aria-invalid":Boolean(errors.name),required:true}),errors.name?/*#__PURE__*/index_js_.createElement("p",{className:error},errors.name):null),/*#__PURE__*/index_js_.createElement("div",{className:twoUp},/*#__PURE__*/index_js_.createElement("div",{className:field},/*#__PURE__*/index_js_.createElement("label",{className:InquiryFormBlock_module_label,htmlFor:`inq-email-${formType}`},(0,strings.t)('formEmail',locale)),/*#__PURE__*/index_js_.createElement("input",{id:`inq-email-${formType}`,className:input,type:"email",name:"email",autoComplete:"email",value:fields.email,onChange:setField('email'),"aria-invalid":Boolean(errors.email),required:true}),errors.email?/*#__PURE__*/index_js_.createElement("p",{className:error},errors.email):null),/*#__PURE__*/index_js_.createElement("div",{className:field},/*#__PURE__*/index_js_.createElement("label",{className:InquiryFormBlock_module_label,htmlFor:`inq-phone-${formType}`},(0,strings.t)('formPhone',locale)),/*#__PURE__*/index_js_.createElement("input",{id:`inq-phone-${formType}`,className:input,type:"tel",name:"phone",autoComplete:"tel",value:fields.phone,onChange:setField('phone')}))),showCompany?/*#__PURE__*/index_js_.createElement("div",{className:field},/*#__PURE__*/index_js_.createElement("label",{className:InquiryFormBlock_module_label,htmlFor:`inq-company-${formType}`},(0,strings.t)('formCompany',locale)),/*#__PURE__*/index_js_.createElement("input",{id:`inq-company-${formType}`,className:input,type:"text",name:"company",autoComplete:"organization",value:fields.company,onChange:setField('company')})):null,/*#__PURE__*/index_js_.createElement("div",{className:field},/*#__PURE__*/index_js_.createElement("label",{className:InquiryFormBlock_module_label,htmlFor:`inq-message-${formType}`},(0,strings.t)('formMessage',locale)),/*#__PURE__*/index_js_.createElement("textarea",{id:`inq-message-${formType}`,className:`${input} ${InquiryFormBlock_module_textarea}`,name:"message",rows:6,value:fields.message,onChange:setField('message'),"aria-invalid":Boolean(errors.message),required:true}),errors.message?/*#__PURE__*/index_js_.createElement("p",{className:error},errors.message):null),/*#__PURE__*/index_js_.createElement("div",{className:InquiryFormBlock_module_honeypot,"aria-hidden":"true"},/*#__PURE__*/index_js_.createElement("label",{htmlFor:`inq-hp-${formType}`},"Website"),/*#__PURE__*/index_js_.createElement("input",{id:`inq-hp-${formType}`,type:"text",name:"_gramo_hp",tabIndex:-1,autoComplete:"off",value:honeypot,onChange:event=>setHoneypot(event.target.value)})),status==='error'?/*#__PURE__*/index_js_.createElement("p",{className:error,role:"alert"},(0,strings.t)('formError',locale)):null,/*#__PURE__*/index_js_.createElement("button",{type:"submit",className:InquiryFormBlock_module_submit,disabled:status==='sending'},status==='sending'?(0,strings.t)('formSending',locale):(0,strings.t)('formSend',locale)))));}
;// ./src/components/blocks/BlockRenderer.tsx
/**
 * blocksJson → React. Maps every gramo/* block to its design-system
 * component; core blocks render through CoreHtml. Unknown blocks render
 * their html leaf when present (neutral wrapper) and warn in development —
 * drift stays loud, never silent.
 */// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BLOCK_MAP={'gramo/hero':HeroBlock,'gramo/split-image':SplitImageBlock,'gramo/gallery':GalleryBlock,'gramo/featured-coffees':FeaturedCoffeesBlock,'gramo/menu-section':MenuSectionBlock,'gramo/testimonials':TestimonialsBlock,'gramo/cta-band':CtaBandBlock,'gramo/stats':StatsBlock,'gramo/faq':FaqBlock,'gramo/locations':LocationsBlock,'gramo/inquiry-form':InquiryFormBlock};function parseBlocks(json){if(!json)return[];try{const parsed=JSON.parse(json);return Array.isArray(parsed)?parsed:[];}catch{return[];}}function BlockRenderer({blocks,locale}){return/*#__PURE__*/index_js_.createElement(index_js_.Fragment,null,blocks.map((block,index)=>{const key=`${block.name}-${index}`;const Component=BLOCK_MAP[block.name];if(Component){var _block$attributes,_block$innerBlocks;return/*#__PURE__*/index_js_.createElement(Component,{key:key,attributes:(_block$attributes=block.attributes)!==null&&_block$attributes!==void 0?_block$attributes:{},innerBlocks:(_block$innerBlocks=block.innerBlocks)!==null&&_block$innerBlocks!==void 0?_block$innerBlocks:[],locale:locale});}if(typeof block.html==='string'){return/*#__PURE__*/index_js_.createElement(CoreHtml/* CoreHtml */.x,{key:key,html:block.html});}if(false){}return null;}));}

/***/ })

};
;
//# sourceMappingURL=90.js.map