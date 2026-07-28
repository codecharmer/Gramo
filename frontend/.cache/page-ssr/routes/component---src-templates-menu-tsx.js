"use strict";
exports.id = 741;
exports.ids = [741];
exports.modules = {

/***/ 5127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ MenuTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/components/blocks/BlockRenderer.tsx + 23 modules
var BlockRenderer = __webpack_require__(9090);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
;// ./src/templates/menu.module.scss
// Exports
var board = "menu-module--board--fcc91";
var boardInner = "menu-module--boardInner--685e4";
var title = "menu-module--title--1722e";

;// ./src/templates/menu.tsx
/**
 * Menu page — a small caps board strip naming the sheet, then the WP page's
 * blocks (the gramo/menu-section blocks carry the stock-sheet itself).
 */







function MenuTemplate({
  data,
  pageContext
}) {
  var _data$gramoPage, _data$gramoPage$title, _data$gramoPage2;
  const blocks = (0,BlockRenderer/* parseBlocks */.S)((_data$gramoPage = data.gramoPage) === null || _data$gramoPage === void 0 ? void 0 : _data$gramoPage.blocksJson);
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: pageContext.locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("header", {
    className: board
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: boardInner
  }, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, (_data$gramoPage$title = (_data$gramoPage2 = data.gramoPage) === null || _data$gramoPage2 === void 0 ? void 0 : _data$gramoPage2.title) !== null && _data$gramoPage$title !== void 0 ? _data$gramoPage$title : (0,strings.t)('menuTitle', pageContext.locale)))), /*#__PURE__*/index_js_.createElement(BlockRenderer/* BlockRenderer */.x, {
    blocks: blocks,
    locale: pageContext.locale
  }));
}
function Head({
  data,
  pageContext,
  location
}) {
  var _data$gramoPage$title2, _data$gramoPage3;
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (_data$gramoPage$title2 = (_data$gramoPage3 = data.gramoPage) === null || _data$gramoPage3 === void 0 ? void 0 : _data$gramoPage3.title) !== null && _data$gramoPage$title2 !== void 0 ? _data$gramoPage$title2 : (0,strings.t)('menuTitle', pageContext.locale),
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath
  });
}
const query = "2652495456";

/***/ })

};
;
//# sourceMappingURL=component---src-templates-menu-tsx.js.map