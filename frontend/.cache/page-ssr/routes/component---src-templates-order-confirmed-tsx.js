"use strict";
exports.id = 508;
exports.ids = [508];
exports.modules = {

/***/ 1471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ OrderConfirmedTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(230);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/i18n/routes.ts
var routes = __webpack_require__(9753);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
// EXTERNAL MODULE: ./src/templates/checkout.tsx + 1 modules
var checkout = __webpack_require__(2022);
;// ./src/templates/order-confirmed.module.scss
// Exports
var confirmed = "order-confirmed-module--confirmed--7672f";
var inner = "order-confirmed-module--inner--bf9ea";
var title = "order-confirmed-module--title--21f6a";
var order_confirmed_module_orderNumber = "order-confirmed-module--orderNumber--7495a";
var orderLabel = "order-confirmed-module--orderLabel--898f7";
var orderValue = "order-confirmed-module--orderValue--1adea";
var codNote = "order-confirmed-module--codNote--361fd";
var continueLink = "order-confirmed-module--continueLink--cb6f4";

;// ./src/templates/order-confirmed.tsx
/**
 * Order confirmation — the received order's number in tabular numerals
 * under a big serif thank-you, with the COD reminder. The number arrives
 * via navigation state, falling back to sessionStorage on reload.
 */









function OrderConfirmedTemplate({
  pageContext,
  location
}) {
  var _orderNumber, _location$state;
  const locale = pageContext.locale;
  const stateNumber = (_orderNumber = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.orderNumber) !== null && _orderNumber !== void 0 ? _orderNumber : null;
  const [orderNumber, setOrderNumber] = index_js_.useState(stateNumber);
  index_js_.useEffect(() => {
    if (orderNumber) return;
    try {
      const stored = window.sessionStorage.getItem(checkout.ORDER_NUMBER_STORAGE_KEY);
      if (stored) setOrderNumber(stored);
    } catch {
      // Storage unavailable — the page still confirms without the number.
    }
  }, [orderNumber]);
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("section", {
    className: confirmed
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: inner
  }, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, (0,strings.t)('orderConfirmed', locale)), orderNumber ? /*#__PURE__*/index_js_.createElement("p", {
    className: order_confirmed_module_orderNumber
  }, /*#__PURE__*/index_js_.createElement("span", {
    className: orderLabel
  }, (0,strings.t)('orderNumber', locale)), /*#__PURE__*/index_js_.createElement("span", {
    className: orderValue
  }, "#", orderNumber)) : null, /*#__PURE__*/index_js_.createElement("p", {
    className: codNote
  }, (0,strings.t)('codNote', locale)), /*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link, {
    to: routes/* STATIC_ROUTES */._v.coffee[locale],
    className: continueLink
  }, (0,strings.t)('continueShopping', locale)))));
}
function Head({
  pageContext,
  location
}) {
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (0,strings.t)('orderConfirmed', pageContext.locale),
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    noindex: true
  });
}

/***/ })

};
;
//# sourceMappingURL=component---src-templates-order-confirmed-tsx.js.map