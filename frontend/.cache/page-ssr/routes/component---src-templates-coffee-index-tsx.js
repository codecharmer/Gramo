"use strict";
exports.id = 927;
exports.ids = [927];
exports.modules = {

/***/ 9667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ CoffeeIndexTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/components/blocks/BlockRenderer.tsx + 23 modules
var BlockRenderer = __webpack_require__(9090);
// EXTERNAL MODULE: ./src/components/CoffeeCard.tsx + 1 modules
var CoffeeCard = __webpack_require__(8844);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
;// ./src/templates/coffee-index.module.scss
// Exports
var section = "coffee-index-module--section--adfb6";
var inner = "coffee-index-module--inner--e951c";
var sectionHeading = "coffee-index-module--sectionHeading--1bec6";
var grid = "coffee-index-module--grid--6f69d";

;// ./src/templates/coffee-index.tsx
/**
 * Coffee catalog — the WP "cafe" page's editorial blocks followed by the
 * full catalog: "Cafés" (single-purchase) and "Suscripciones" (recurring)
 * as CoffeeCard plate grids.
 */








function CoffeeIndexTemplate({
  data,
  pageContext
}) {
  var _data$gramoPage;
  const blocks = (0,BlockRenderer/* parseBlocks */.S)((_data$gramoPage = data.gramoPage) === null || _data$gramoPage === void 0 ? void 0 : _data$gramoPage.blocksJson);
  const coffees = data.allGramoCoffee.nodes.filter(coffee => !coffee.subscriptionInterval);
  const subscriptions = data.allGramoCoffee.nodes.filter(coffee => Boolean(coffee.subscriptionInterval));
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: pageContext.locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement(BlockRenderer/* BlockRenderer */.x, {
    blocks: blocks,
    locale: pageContext.locale
  }), coffees.length > 0 ? /*#__PURE__*/index_js_.createElement("section", {
    className: section
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: inner
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: sectionHeading
  }, (0,strings.t)('coffeesSection', pageContext.locale)), /*#__PURE__*/index_js_.createElement("div", {
    className: grid
  }, coffees.map((coffee, index) => /*#__PURE__*/index_js_.createElement(CoffeeCard/* CoffeeCard */.h, {
    key: coffee.databaseId,
    coffee: coffee,
    locale: pageContext.locale,
    index: index
  }))))) : null, subscriptions.length > 0 ? /*#__PURE__*/index_js_.createElement("section", {
    className: section
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: inner
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: sectionHeading
  }, (0,strings.t)('subscriptionsSection', pageContext.locale)), /*#__PURE__*/index_js_.createElement("div", {
    className: grid
  }, subscriptions.map((coffee, index) => /*#__PURE__*/index_js_.createElement(CoffeeCard/* CoffeeCard */.h, {
    key: coffee.databaseId,
    coffee: coffee,
    locale: pageContext.locale,
    index: index
  }))))) : null);
}
function Head({
  data,
  pageContext,
  location
}) {
  var _data$gramoPage$title, _data$gramoPage2;
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (_data$gramoPage$title = (_data$gramoPage2 = data.gramoPage) === null || _data$gramoPage2 === void 0 ? void 0 : _data$gramoPage2.title) !== null && _data$gramoPage$title !== void 0 ? _data$gramoPage$title : (0,strings.t)('coffeesSection', pageContext.locale),
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath
  });
}
const query = "572291278";

/***/ })

};
;
//# sourceMappingURL=component---src-templates-coffee-index-tsx.js.map