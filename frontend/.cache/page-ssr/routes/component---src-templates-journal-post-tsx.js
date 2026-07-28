"use strict";
exports.id = 88;
exports.ids = [88];
exports.modules = {

/***/ 5696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ JournalPostTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/components/blocks/BlockRenderer.tsx + 23 modules
var BlockRenderer = __webpack_require__(9090);
// EXTERNAL MODULE: ./src/components/JournalCard.tsx + 1 modules
var JournalCard = __webpack_require__(5717);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
// EXTERNAL MODULE: ./src/lib/format.ts
var format = __webpack_require__(4399);
;// ./src/templates/journal-post.module.scss
// Exports
var header = "journal-post-module--header--11a25";
var headerInner = "journal-post-module--headerInner--a1494";
var journal_post_module_category = "journal-post-module--category--f50b6";
var title = "journal-post-module--title--a7266";
var meta = "journal-post-module--meta--e2241";
var plateWrap = "journal-post-module--plateWrap--ca81a";
var plate = "journal-post-module--plate--b3e41";
var body = "journal-post-module--body--976d9";
var related = "journal-post-module--related--933a9";
var relatedInner = "journal-post-module--relatedInner--7bc40";
var relatedHeading = "journal-post-module--relatedHeading--a4bd9";
var relatedGrid = "journal-post-module--relatedGrid--66b1c";

;// ./src/templates/journal-post.tsx
/**
 * Journal post — serif display title on paper with the category caps and a
 * dated caps line, the featured photograph as a plate, the block-composed
 * body, and three more recent same-locale posts. JSON-LD Article.
 */










function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').trim();
}
function JournalPostTemplate({
  data,
  pageContext
}) {
  var _post$localImage$chil, _post$localImage, _post$localImage$chil2, _find, _post$categories, _ref;
  const post = data.gramoJournalPost;
  const locale = pageContext.locale;
  if (!post) {
    return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
      locale: locale,
      translationPath: pageContext.translationPath
    }, /*#__PURE__*/index_js_.createElement("div", null));
  }
  const image = (_post$localImage$chil = (_post$localImage = post.localImage) === null || _post$localImage === void 0 ? void 0 : (_post$localImage$chil2 = _post$localImage.childImageSharp) === null || _post$localImage$chil2 === void 0 ? void 0 : _post$localImage$chil2.gatsbyImageData) !== null && _post$localImage$chil !== void 0 ? _post$localImage$chil : null;
  const category = (_find = ((_post$categories = post.categories) !== null && _post$categories !== void 0 ? _post$categories : []).find(Boolean)) !== null && _find !== void 0 ? _find : null;
  const blocks = (0,BlockRenderer/* parseBlocks */.S)(post.blocksJson);
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("article", null, /*#__PURE__*/index_js_.createElement("header", {
    className: header
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: headerInner
  }, category ? /*#__PURE__*/index_js_.createElement("p", {
    className: journal_post_module_category
  }, (_ref = locale === 'en' ? category.nameEn : null) !== null && _ref !== void 0 ? _ref : category.name) : null, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, post.title), /*#__PURE__*/index_js_.createElement("p", {
    className: meta
  }, /*#__PURE__*/index_js_.createElement("span", null, (0,format/* formatDate */.Yq)(post.date, locale)), post.readingTime ? /*#__PURE__*/index_js_.createElement("span", null, post.readingTime, " ", (0,strings.t)('readingTime', locale)) : null))), image ? /*#__PURE__*/index_js_.createElement("div", {
    className: plateWrap
  }, /*#__PURE__*/index_js_.createElement("figure", {
    className: plate
  }, /*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV, {
    image: image,
    alt: post.title,
    loading: "eager"
  }))) : null, /*#__PURE__*/index_js_.createElement("div", {
    className: body
  }, /*#__PURE__*/index_js_.createElement(BlockRenderer/* BlockRenderer */.x, {
    blocks: blocks,
    locale: locale
  }))), data.related.nodes.length > 0 ? /*#__PURE__*/index_js_.createElement("section", {
    className: related
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: relatedInner
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: relatedHeading
  }, (0,strings.t)('relatedPosts', locale)), /*#__PURE__*/index_js_.createElement("div", {
    className: relatedGrid
  }, data.related.nodes.map((node, index) => /*#__PURE__*/index_js_.createElement(JournalCard/* JournalCard */.S, {
    key: node.databaseId,
    post: node,
    locale: locale,
    index: index
  }))))) : null);
}
function Head({
  data,
  pageContext,
  location
}) {
  var _post$title;
  const post = data.gramoJournalPost;
  const description = post !== null && post !== void 0 && post.excerpt ? stripTags(post.excerpt) : null;
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    inLanguage: pageContext.locale === 'es' ? 'es-MX' : 'en',
    ...(post.imageUrl ? {
      image: post.imageUrl
    } : {}),
    ...(description ? {
      description
    } : {}),
    author: {
      '@type': 'Organization',
      name: 'Gramo Café'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gramo Café'
    }
  } : undefined;
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: (_post$title = post === null || post === void 0 ? void 0 : post.title) !== null && _post$title !== void 0 ? _post$title : 'Gramo Café',
    description: description,
    locale: pageContext.locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    imageUrl: post === null || post === void 0 ? void 0 : post.imageUrl,
    jsonLd: jsonLd
  });
}
const query = "4057542167";

/***/ }),

/***/ 5717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  S: () => (/* binding */ JournalCard)
});

// NAMESPACE OBJECT: ./src/components/JournalCard.module.scss
var JournalCard_module_namespaceObject = {};
__webpack_require__.r(JournalCard_module_namespaceObject);
__webpack_require__.d(JournalCard_module_namespaceObject, {
  body: () => (body),
  bronze: () => (bronze),
  card: () => (card),
  category: () => (JournalCard_module_category),
  copper: () => (copper),
  image: () => (JournalCard_module_image),
  meta: () => (meta),
  olive: () => (olive),
  title: () => (title),
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
;// ./src/components/JournalCard.module.scss
// Exports
var card = "JournalCard-module--card--c310d";
var JournalCard_module_image = "JournalCard-module--image--784b8";
var body = "JournalCard-module--body--97264";
var JournalCard_module_category = "JournalCard-module--category--b971c";
var walnut = "JournalCard-module--walnut--84c6b";
var olive = "JournalCard-module--olive--96efc";
var bronze = "JournalCard-module--bronze--e41a8";
var copper = "JournalCard-module--copper--d5e59";
var title = "JournalCard-module--title--df574";
var meta = "JournalCard-module--meta--2d40c";

;// ./src/components/JournalCard.tsx
/**
 * Journal card — plate with the post's featured image, category as a
 * pigment caps caption, serif title, and a dated caps footer with reading
 * time. Links to the post.
 */function JournalCard({post,locale,index=0}){var _post$localImage$chil,_post$localImage,_post$localImage$chil2,_find,_post$categories,_ref,_styles$pigment;const pigment=(0,pigments/* pigmentAt */.Y)(index);const image=(_post$localImage$chil=(_post$localImage=post.localImage)===null||_post$localImage===void 0?void 0:(_post$localImage$chil2=_post$localImage.childImageSharp)===null||_post$localImage$chil2===void 0?void 0:_post$localImage$chil2.gatsbyImageData)!==null&&_post$localImage$chil!==void 0?_post$localImage$chil:null;const category=(_find=((_post$categories=post.categories)!==null&&_post$categories!==void 0?_post$categories:[]).find(Boolean))!==null&&_find!==void 0?_find:null;const categoryLabel=category?(_ref=locale==='en'?category.nameEn:null)!==null&&_ref!==void 0?_ref:category.name:null;return/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{to:(0,routes/* pathFor */.p0)('journal',locale,post.slug),className:card},image?/*#__PURE__*/index_js_.createElement("div",{className:JournalCard_module_image},/*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV,{image:image,alt:post.title})):null,/*#__PURE__*/index_js_.createElement("div",{className:body},categoryLabel?/*#__PURE__*/index_js_.createElement("p",{className:`${JournalCard_module_category} ${(_styles$pigment=JournalCard_module_namespaceObject[pigment])!==null&&_styles$pigment!==void 0?_styles$pigment:''}`},categoryLabel):null,/*#__PURE__*/index_js_.createElement("h3",{className:title},post.title),/*#__PURE__*/index_js_.createElement("p",{className:meta},/*#__PURE__*/index_js_.createElement("span",null,(0,format/* formatDate */.Yq)(post.date,locale)),post.readingTime?/*#__PURE__*/index_js_.createElement("span",null,post.readingTime," ",(0,strings.t)('readingTime',locale)):null)));}

/***/ })

};
;
//# sourceMappingURL=component---src-templates-journal-post-tsx.js.map