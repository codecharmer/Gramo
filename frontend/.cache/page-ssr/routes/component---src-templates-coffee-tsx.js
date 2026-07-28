"use strict";
exports.id = 708;
exports.ids = [708];
exports.modules = {

/***/ 6553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ CoffeeTemplate)
});

// NAMESPACE OBJECT: ./src/templates/coffee.module.scss
var coffee_module_namespaceObject = {};
__webpack_require__.r(coffee_module_namespaceObject);
__webpack_require__.d(coffee_module_namespaceObject, {
  addButton: () => (addButton),
  board: () => (board),
  boardInner: () => (boardInner),
  bronze: () => (bronze),
  buyRow: () => (buyRow),
  chip: () => (chip),
  chips: () => (chips),
  copper: () => (copper),
  data: () => (coffee_module_data),
  description: () => (description),
  descriptionProse: () => (descriptionProse),
  eyebrow: () => (eyebrow),
  methodList: () => (methodList),
  methods: () => (coffee_module_methods),
  notes: () => (coffee_module_notes),
  olive: () => (olive),
  plate: () => (plate),
  platePlaceholder: () => (platePlaceholder),
  portrait: () => (portrait),
  portraitInner: () => (portraitInner),
  price: () => (price),
  related: () => (related),
  relatedGrid: () => (relatedGrid),
  relatedHeading: () => (relatedHeading),
  relatedInner: () => (relatedInner),
  sheet: () => (coffee_module_sheet),
  sheetLabel: () => (sheetLabel),
  sheetRow: () => (sheetRow),
  sheetValue: () => (sheetValue),
  subheading: () => (subheading),
  title: () => (title),
  walnut: () => (walnut)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/components/blocks/CoreHtml.tsx + 1 modules
var CoreHtml = __webpack_require__(9491);
// EXTERNAL MODULE: ./src/components/CoffeeCard.tsx + 1 modules
var CoffeeCard = __webpack_require__(8844);
// EXTERNAL MODULE: ./src/state/cart.tsx
var cart = __webpack_require__(6932);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
// EXTERNAL MODULE: ./src/lib/format.ts
var format = __webpack_require__(4399);
// EXTERNAL MODULE: ./src/lib/pigments.ts
var pigments = __webpack_require__(9098);
;// ./src/templates/coffee.module.scss
// Exports
var board = "coffee-module--board--a37dc";
var boardInner = "coffee-module--boardInner--d99ee";
var eyebrow = "coffee-module--eyebrow--e0799";
var title = "coffee-module--title--c65ab";
var portrait = "coffee-module--portrait--fdd64";
var portraitInner = "coffee-module--portraitInner--9bbe7";
var plate = "coffee-module--plate--e5882";
var platePlaceholder = "coffee-module--platePlaceholder--9c546";
var coffee_module_data = "coffee-module--data--047ae";
var buyRow = "coffee-module--buyRow--dca13";
var price = "coffee-module--price--c732e";
var addButton = "coffee-module--addButton--9a909";
var coffee_module_sheet = "coffee-module--sheet--f8a99";
var sheetRow = "coffee-module--sheetRow--4ee07";
var sheetLabel = "coffee-module--sheetLabel--762f7";
var sheetValue = "coffee-module--sheetValue--a1e16";
var subheading = "coffee-module--subheading--ef496";
var coffee_module_notes = "coffee-module--notes--0e7e5";
var chips = "coffee-module--chips--d1b9b";
var chip = "coffee-module--chip--ff98a";
var walnut = "coffee-module--walnut--9d100";
var olive = "coffee-module--olive--9ab29";
var bronze = "coffee-module--bronze--308ea";
var copper = "coffee-module--copper--301f6";
var coffee_module_methods = "coffee-module--methods--f15be";
var methodList = "coffee-module--methodList--9f772";
var description = "coffee-module--description--7831e";
var descriptionProse = "coffee-module--descriptionProse--69e7a";
var related = "coffee-module--related--ed7c7";
var relatedInner = "coffee-module--relatedInner--46276";
var relatedHeading = "coffee-module--relatedHeading--c478d";
var relatedGrid = "coffee-module--relatedGrid--c90a3";

;// ./src/templates/coffee.tsx
/**
 * Coffee detail — a compact board-strip title, the plate-mounted photograph
 * on the left, and the coffee's data portrait on the right: price + add to
 * order, the inked data sheet (dotted leaders, caps labels), tasting-note
 * chips on rotating pigment underlines, brew methods, and the description.
 * Three other coffees close the page; JSON-LD Product for search.
 */












function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function AddToCart({
  coffee,
  locale
}) {
  const {
    add
  } = (0,cart/* useCart */._)();
  const [added, setAdded] = index_js_.useState(false);
  const purchasable = coffee.purchasable === true && coffee.price != null;
  const handleAdd = () => {
    var _ref;
    if (!purchasable || coffee.price == null) return;
    add({
      productId: coffee.databaseId,
      slug: coffee.slug,
      title: (_ref = locale === 'en' ? coffee.nameEn : null) !== null && _ref !== void 0 ? _ref : coffee.title,
      price: coffee.price,
      imageUrl: coffee.imageUrl
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return /*#__PURE__*/index_js_.createElement("button", {
    type: "button",
    className: addButton,
    onClick: handleAdd,
    disabled: !purchasable
  }, !purchasable ? (0,strings.t)('outOfStock', locale) : added ? (0,strings.t)('addedToCart', locale) : (0,strings.t)('addToCart', locale));
}
function CoffeeTemplate({
  data,
  pageContext
}) {
  var _ref2, _coffee$localImage$ch, _coffee$localImage, _coffee$localImage$ch2, _coffee$tastingNotes, _coffee$brewMethods, _ref3, _ref4, _coffee$process, _coffee$process2, _coffee$imageAlt;
  const coffee = data.gramoCoffee;
  const locale = pageContext.locale;
  if (!coffee) {
    return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
      locale: locale,
      translationPath: pageContext.translationPath
    }, /*#__PURE__*/index_js_.createElement("div", null));
  }
  const name = (_ref2 = locale === 'en' ? coffee.nameEn : null) !== null && _ref2 !== void 0 ? _ref2 : coffee.title;
  const image = (_coffee$localImage$ch = (_coffee$localImage = coffee.localImage) === null || _coffee$localImage === void 0 ? void 0 : (_coffee$localImage$ch2 = _coffee$localImage.childImageSharp) === null || _coffee$localImage$ch2 === void 0 ? void 0 : _coffee$localImage$ch2.gatsbyImageData) !== null && _coffee$localImage$ch !== void 0 ? _coffee$localImage$ch : null;
  const notes = ((_coffee$tastingNotes = coffee.tastingNotes) !== null && _coffee$tastingNotes !== void 0 ? _coffee$tastingNotes : []).map(note => {
    var _note$noteEn;
    return locale === 'en' ? (_note$noteEn = note === null || note === void 0 ? void 0 : note.noteEn) !== null && _note$noteEn !== void 0 ? _note$noteEn : note === null || note === void 0 ? void 0 : note.noteEs : note === null || note === void 0 ? void 0 : note.noteEs;
  }).filter(note => Boolean(note));
  const methods = ((_coffee$brewMethods = coffee.brewMethods) !== null && _coffee$brewMethods !== void 0 ? _coffee$brewMethods : []).map(method => {
    var _method$methodEn;
    return locale === 'en' ? (_method$methodEn = method === null || method === void 0 ? void 0 : method.methodEn) !== null && _method$methodEn !== void 0 ? _method$methodEn : method === null || method === void 0 ? void 0 : method.methodEs : method === null || method === void 0 ? void 0 : method.methodEs;
  }).filter(method => Boolean(method));
  const process = (_ref3 = (_ref4 = locale === 'en' ? (_coffee$process = coffee.process) === null || _coffee$process === void 0 ? void 0 : _coffee$process.en : null) !== null && _ref4 !== void 0 ? _ref4 : (_coffee$process2 = coffee.process) === null || _coffee$process2 === void 0 ? void 0 : _coffee$process2.es) !== null && _ref3 !== void 0 ? _ref3 : null;
  const sheet = [['origin', coffee.origin], ['producer', coffee.producer], ['altitude', coffee.altitude], ['variety', coffee.variety], ['process', process], ['roast', coffee.roastLevel ? capitalize(coffee.roastLevel) : null], ['harvest', coffee.harvest], ['availability', coffee.availability]];
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("header", {
    className: board
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: boardInner
  }, coffee.origin ? /*#__PURE__*/index_js_.createElement("p", {
    className: eyebrow
  }, coffee.origin) : null, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, name))), /*#__PURE__*/index_js_.createElement("article", {
    className: portrait
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: portraitInner
  }, image ? /*#__PURE__*/index_js_.createElement("figure", {
    className: plate
  }, /*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV, {
    image: image,
    alt: (_coffee$imageAlt = coffee.imageAlt) !== null && _coffee$imageAlt !== void 0 ? _coffee$imageAlt : name,
    loading: "eager"
  })) : /*#__PURE__*/index_js_.createElement("div", {
    className: platePlaceholder,
    "aria-hidden": "true"
  }), /*#__PURE__*/index_js_.createElement("div", {
    className: coffee_module_data
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: buyRow
  }, coffee.price != null ? /*#__PURE__*/index_js_.createElement("p", {
    className: price
  }, (0,format/* formatMxn */.VV)(coffee.price)) : null, /*#__PURE__*/index_js_.createElement(AddToCart, {
    coffee: coffee,
    locale: locale
  })), /*#__PURE__*/index_js_.createElement("dl", {
    className: coffee_module_sheet
  }, sheet.map(([key, value]) => value ? /*#__PURE__*/index_js_.createElement("div", {
    key: key,
    className: sheetRow
  }, /*#__PURE__*/index_js_.createElement("dt", {
    className: sheetLabel
  }, (0,strings.t)(key, locale)), /*#__PURE__*/index_js_.createElement("dd", {
    className: sheetValue
  }, value)) : null)), notes.length > 0 ? /*#__PURE__*/index_js_.createElement("div", {
    className: coffee_module_notes
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: subheading
  }, (0,strings.t)('tastingNotes', locale)), /*#__PURE__*/index_js_.createElement("ul", {
    className: chips
  }, notes.map((note, index) => {
    var _styles$pigmentAt;
    return /*#__PURE__*/index_js_.createElement("li", {
      key: note,
      className: `${chip} ${(_styles$pigmentAt = coffee_module_namespaceObject[(0,pigments/* pigmentAt */.Y)(index)]) !== null && _styles$pigmentAt !== void 0 ? _styles$pigmentAt : ''}`
    }, note);
  }))) : null, methods.length > 0 ? /*#__PURE__*/index_js_.createElement("div", {
    className: coffee_module_methods
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: subheading
  }, (0,strings.t)('brewMethods', locale)), /*#__PURE__*/index_js_.createElement("p", {
    className: methodList
  }, methods.join(' · '))) : null))), locale === 'en' && coffee.descriptionEn ? /*#__PURE__*/index_js_.createElement("section", {
    className: description
  }, /*#__PURE__*/index_js_.createElement("p", null, coffee.descriptionEn)) : coffee.content ? /*#__PURE__*/index_js_.createElement("section", {
    className: descriptionProse
  }, /*#__PURE__*/index_js_.createElement(CoreHtml/* CoreHtml */.x, {
    html: coffee.content
  })) : null, data.related.nodes.length > 0 ? /*#__PURE__*/index_js_.createElement("section", {
    className: related
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: relatedInner
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: relatedHeading
  }, (0,strings.t)('relatedCoffees', locale)), /*#__PURE__*/index_js_.createElement("div", {
    className: relatedGrid
  }, data.related.nodes.map((node, index) => /*#__PURE__*/index_js_.createElement(CoffeeCard/* CoffeeCard */.h, {
    key: node.databaseId,
    coffee: node,
    locale: locale,
    index: index
  }))))) : null);
}
function Head({
  data,
  pageContext,
  location
}) {
  var _ref5;
  const coffee = data.gramoCoffee;
  const locale = pageContext.locale;
  const name = coffee ? (_ref5 = locale === 'en' ? coffee.nameEn : null) !== null && _ref5 !== void 0 ? _ref5 : coffee.title : 'Gramo Café';
  const jsonLd = coffee ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(coffee.imageUrl ? {
      image: coffee.imageUrl
    } : {}),
    ...(coffee.origin ? {
      countryOfOrigin: coffee.origin
    } : {}),
    brand: {
      '@type': 'Brand',
      name: 'Gramo Café'
    },
    ...(coffee.price != null ? {
      offers: {
        '@type': 'Offer',
        price: coffee.price,
        priceCurrency: 'MXN',
        availability: coffee.purchasable === true ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      }
    } : {})
  } : undefined;
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: name,
    description: locale === 'en' ? coffee === null || coffee === void 0 ? void 0 : coffee.descriptionEn : null,
    locale: locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    imageUrl: coffee === null || coffee === void 0 ? void 0 : coffee.imageUrl,
    jsonLd: jsonLd
  });
}
const query = "1076508012";

/***/ })

};
;
//# sourceMappingURL=component---src-templates-coffee-tsx.js.map