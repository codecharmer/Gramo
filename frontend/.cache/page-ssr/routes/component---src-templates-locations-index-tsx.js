"use strict";
exports.id = 663;
exports.ids = [663];
exports.modules = {

/***/ 8365:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ LocationsIndexTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/components/blocks/BlockRenderer.tsx + 23 modules
var BlockRenderer = __webpack_require__(9090);
// EXTERNAL MODULE: ./src/components/LocationCard.tsx + 1 modules
var LocationCard = __webpack_require__(2545);
;// ./src/templates/locations-index.module.scss
// Exports
var cityGroup = "locations-index-module--cityGroup--f347d";
var inner = "locations-index-module--inner--942ec";
var cityHeader = "locations-index-module--cityHeader--c224c";
var grid = "locations-index-module--grid--3d175";

;// ./src/templates/locations-index.tsx
/**
 * Locations index — the WP page's editorial blocks, then every intervened
 * space as LocationCard plates grouped under caps city headers, Cuernavaca
 * first.
 */







/** Cuernavaca leads; CDMX follows; anything else lands after, in data order. */
function cityRank(city) {
  const normalized = (city !== null && city !== void 0 ? city : '').toLowerCase();
  if (normalized.includes('cuernavaca')) return 0;
  if (normalized.includes('cdmx') || normalized.includes('méxico') || normalized.includes('mexico')) {
    return 1;
  }
  return 2;
}
function LocationsIndexTemplate({
  data,
  pageContext
}) {
  var _data$gramoPage;
  const blocks = (0,BlockRenderer/* parseBlocks */.S)((_data$gramoPage = data.gramoPage) === null || _data$gramoPage === void 0 ? void 0 : _data$gramoPage.blocksJson);
  const groups = new Map();
  for (const node of data.allGramoLocation.nodes) {
    var _node$city, _groups$get;
    const city = (_node$city = node.city) !== null && _node$city !== void 0 ? _node$city : '—';
    const group = (_groups$get = groups.get(city)) !== null && _groups$get !== void 0 ? _groups$get : [];
    group.push(node);
    groups.set(city, group);
  }
  const orderedCities = [...groups.keys()].sort((a, b) => cityRank(a) - cityRank(b));
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: pageContext.locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement(BlockRenderer/* BlockRenderer */.x, {
    blocks: blocks,
    locale: pageContext.locale
  }), orderedCities.map(city => {
    var _groups$get2;
    return /*#__PURE__*/index_js_.createElement("section", {
      key: city,
      className: cityGroup
    }, /*#__PURE__*/index_js_.createElement("div", {
      className: inner
    }, /*#__PURE__*/index_js_.createElement("h2", {
      className: cityHeader
    }, city), /*#__PURE__*/index_js_.createElement("div", {
      className: grid
    }, ((_groups$get2 = groups.get(city)) !== null && _groups$get2 !== void 0 ? _groups$get2 : []).map(location => /*#__PURE__*/index_js_.createElement(LocationCard/* LocationCard */.u, {
      key: location.databaseId,
      location: location,
      locale: pageContext.locale
    })))));
  }));
}
function Head({
  data,
  pageContext,
  location
}) {
  var _data$gramoPage$title, _data$gramoPage2;
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (_data$gramoPage$title = (_data$gramoPage2 = data.gramoPage) === null || _data$gramoPage2 === void 0 ? void 0 : _data$gramoPage2.title) !== null && _data$gramoPage$title !== void 0 ? _data$gramoPage$title : 'Gramo Café',
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath
  });
}
const query = "1063849689";

/***/ })

};
;
//# sourceMappingURL=component---src-templates-locations-index-tsx.js.map