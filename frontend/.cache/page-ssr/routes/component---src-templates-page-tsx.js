"use strict";
exports.id = 265;
exports.ids = [265];
exports.modules = {

/***/ 8853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (/* binding */ PageTemplate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7905);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9281);
/* harmony import */ var _components_SEO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3522);
/* harmony import */ var _components_blocks_BlockRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9090);
/**
 * Generic block-composed page template: renders a WP page's blocksJson
 * through the BlockRenderer. Serves every editorial page (home, about,
 * process, subscriptions, wholesale, careers, contact, privacy).
 */





function PageTemplate({
  data,
  pageContext
}) {
  const page = data.gramoPage;
  const blocks = (0,_components_blocks_BlockRenderer__WEBPACK_IMPORTED_MODULE_3__/* .parseBlocks */ .S)(page === null || page === void 0 ? void 0 : page.blocksJson);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__/* .Layout */ .P, {
    locale: pageContext.locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_blocks_BlockRenderer__WEBPACK_IMPORTED_MODULE_3__/* .BlockRenderer */ .x, {
    blocks: blocks,
    locale: pageContext.locale
  }));
}
function Head({
  data,
  pageContext,
  location
}) {
  var _page$title;
  const page = data.gramoPage;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_SEO__WEBPACK_IMPORTED_MODULE_2__/* .SEO */ .k, {
    title: page !== null && page !== void 0 && page.isFront ? 'Gramo Café' : (_page$title = page === null || page === void 0 ? void 0 : page.title) !== null && _page$title !== void 0 ? _page$title : 'Gramo Café',
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    jsonLd: page !== null && page !== void 0 && page.isFront ? (0,_components_SEO__WEBPACK_IMPORTED_MODULE_2__/* .organizationJsonLd */ ._)() : undefined
  });
}
const query = "3827937830";

/***/ })

};
;
//# sourceMappingURL=component---src-templates-page-tsx.js.map