"use strict";
exports.id = 289;
exports.ids = [289];
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

/***/ 2349:
/***/ ((module) => {



const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase = (string, toLowerCase, toUpperCase) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, m1 => toLowerCase(m1));
};

const postProcess = (input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, m => toUpperCase(m));
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options
	};

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase = options.locale === false ?
		string => string.toLowerCase() :
		string => string.toLocaleLowerCase(options.locale);
	const toUpperCase = options.locale === false ?
		string => string.toUpperCase() :
		string => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');

	if (options.preserveConsecutiveUppercase) {
		input = preserveConsecutiveUppercase(input, toLowerCase);
	} else {
		input = toLowerCase(input);
	}

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


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

/***/ 4618:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ LocationTemplate)
});

// EXTERNAL MODULE: external "/Users/codecharmer/gramo/node_modules/react/index.js"
var index_js_ = __webpack_require__(7905);
// EXTERNAL MODULE: ../node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(5970);
// EXTERNAL MODULE: ./src/components/Layout.tsx + 2 modules
var Layout = __webpack_require__(9281);
// EXTERNAL MODULE: ./src/components/SEO.tsx
var SEO = __webpack_require__(3522);
// EXTERNAL MODULE: ./src/hooks/useBlockMedia.ts
var useBlockMedia = __webpack_require__(8781);
// EXTERNAL MODULE: ./src/i18n/strings.ts
var strings = __webpack_require__(385);
;// ./src/templates/location.module.scss
// Exports
var board = "location-module--board--6938d";
var boardInner = "location-module--boardInner--f4bc5";
var eyebrow = "location-module--eyebrow--3b7ec";
var title = "location-module--title--41301";
var neighborhood = "location-module--neighborhood--b5ffd";
var detail = "location-module--detail--43a41";
var detailInner = "location-module--detailInner--5de60";
var column = "location-module--column--a4223";
var contact = "location-module--contact--3c604";
var plate = "location-module--plate--c4457";
var address = "location-module--address--d114e";
var contactLinks = "location-module--contactLinks--c237c";
var contactLink = "location-module--contactLink--8bce1";
var mapsLink = "location-module--mapsLink--95b48";
var sheetHeader = "location-module--sheetHeader--dec9a";
var hours = "location-module--hours--58e78";
var hoursRow = "location-module--hoursRow--ef5fc";
var hoursDay = "location-module--hoursDay--e0439";
var hoursRange = "location-module--hoursRange--12f43";
var hoursUnavailable = "location-module--hoursUnavailable--c10cc";
var chips = "location-module--chips--c9b64";
var chip = "location-module--chip--f147a";
var location_module_description = "location-module--description--6a29d";
var gallery = "location-module--gallery--31b1b";
var galleryInner = "location-module--galleryInner--0e197";
var galleryPlate = "location-module--galleryPlate--30b39";
var galleryCaption = "location-module--galleryCaption--43add";
var location_module_guide = "location-module--guide--867cd";
var guideInner = "location-module--guideInner--ef7ba";
var guideHeader = "location-module--guideHeader--6cb25";
var guideBody = "location-module--guideBody--718b3";

;// ./src/templates/location.tsx
/**
 * Location detail — compact board header, contact + maps link-out, opening
 * hours as a 7-row stock-sheet, amenity caps chips, description prose, the
 * gallery as archival plates, and the neighborhood guide. JSON-LD
 * CafeOrCoffeeShop with address/geo/hours when the data exists.
 */








const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_STRING = {
  mon: 'dayMon',
  tue: 'dayTue',
  wed: 'dayWed',
  thu: 'dayThu',
  fri: 'dayFri',
  sat: 'daySat',
  sun: 'daySun'
};
const DAY_SCHEMA = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday'
};
function localized(text, locale) {
  var _ref, _ref2;
  if (!text) return '';
  return (_ref = (_ref2 = locale === 'es' ? text.es : text.en) !== null && _ref2 !== void 0 ? _ref2 : text.es) !== null && _ref !== void 0 ? _ref : '';
}
function dayRange(hours, day) {
  const range = hours === null || hours === void 0 ? void 0 : hours[day];
  return range !== null && range !== void 0 && range.open && range.close ? range : null;
}
function hasAnyHours(hours) {
  return DAY_ORDER.some(day => dayRange(hours, day) !== null);
}
function waLink(value) {
  if (value.startsWith('http')) return value;
  return `https://wa.me/${value.replace(/\D/g, '')}`;
}
function LocationTemplate({
  data,
  pageContext
}) {
  var _node$shortName, _node$localImage$chil, _node$localImage, _node$localImage$chil2, _node$amenities, _node$galleryUrls;
  const media = (0,useBlockMedia/* useBlockMedia */.n)();
  const node = data.gramoLocation;
  const locale = pageContext.locale;
  if (!node) {
    return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
      locale: locale,
      translationPath: pageContext.translationPath
    }, /*#__PURE__*/index_js_.createElement("div", null));
  }
  const name = (_node$shortName = node.shortName) !== null && _node$shortName !== void 0 ? _node$shortName : node.title;
  const image = (_node$localImage$chil = (_node$localImage = node.localImage) === null || _node$localImage === void 0 ? void 0 : (_node$localImage$chil2 = _node$localImage.childImageSharp) === null || _node$localImage$chil2 === void 0 ? void 0 : _node$localImage$chil2.gatsbyImageData) !== null && _node$localImage$chil !== void 0 ? _node$localImage$chil : null;
  const amenities = ((_node$amenities = node.amenities) !== null && _node$amenities !== void 0 ? _node$amenities : []).map(item => {
    var _item$labelEn;
    return locale === 'en' ? (_item$labelEn = item === null || item === void 0 ? void 0 : item.labelEn) !== null && _item$labelEn !== void 0 ? _item$labelEn : item === null || item === void 0 ? void 0 : item.labelEs : item === null || item === void 0 ? void 0 : item.labelEs;
  }).filter(label => Boolean(label));
  const description = localized(node.description, locale);
  const guide = localized(node.neighborhoodGuide, locale);
  const galleryImages = ((_node$galleryUrls = node.galleryUrls) !== null && _node$galleryUrls !== void 0 ? _node$galleryUrls : []).filter(url => Boolean(url)).map(url => ({
    url,
    image: media.byUrl(url),
    alt: media.altFor(url)
  })).filter(item => item.image !== null);
  return /*#__PURE__*/index_js_.createElement(Layout/* Layout */.P, {
    locale: locale,
    translationPath: pageContext.translationPath
  }, /*#__PURE__*/index_js_.createElement("header", {
    className: board
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: boardInner
  }, node.city ? /*#__PURE__*/index_js_.createElement("p", {
    className: eyebrow
  }, node.city) : null, /*#__PURE__*/index_js_.createElement("h1", {
    className: title
  }, name), node.neighborhood ? /*#__PURE__*/index_js_.createElement("p", {
    className: neighborhood
  }, node.neighborhood) : null)), /*#__PURE__*/index_js_.createElement("section", {
    className: detail
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: detailInner
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: column
  }, image ? /*#__PURE__*/index_js_.createElement("figure", {
    className: plate
  }, /*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV, {
    image: image,
    alt: name,
    loading: "eager"
  })) : null, /*#__PURE__*/index_js_.createElement("div", {
    className: contact
  }, node.address ? /*#__PURE__*/index_js_.createElement("p", {
    className: address
  }, node.address) : null, /*#__PURE__*/index_js_.createElement("div", {
    className: contactLinks
  }, node.phone ? /*#__PURE__*/index_js_.createElement("a", {
    href: `tel:${node.phone.replace(/[^\d+]/g, '')}`,
    className: contactLink
  }, node.phone) : null, node.whatsapp ? /*#__PURE__*/index_js_.createElement("a", {
    href: waLink(node.whatsapp),
    className: contactLink,
    rel: "noopener noreferrer",
    target: "_blank"
  }, "WhatsApp") : null, node.mapsUrl ? /*#__PURE__*/index_js_.createElement("a", {
    href: node.mapsUrl,
    className: mapsLink,
    rel: "noopener noreferrer",
    target: "_blank"
  }, (0,strings.t)('gettingThere', locale), " \u2197") : null))), /*#__PURE__*/index_js_.createElement("div", {
    className: column
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: sheetHeader
  }, (0,strings.t)('hours', locale)), hasAnyHours(node.hours) ? /*#__PURE__*/index_js_.createElement("dl", {
    className: hours
  }, DAY_ORDER.map(day => {
    var _range$open, _range$close;
    const range = dayRange(node.hours, day);
    return /*#__PURE__*/index_js_.createElement("div", {
      key: day,
      className: hoursRow
    }, /*#__PURE__*/index_js_.createElement("dt", {
      className: hoursDay
    }, (0,strings.t)(DAY_STRING[day], locale)), /*#__PURE__*/index_js_.createElement("dd", {
      className: hoursRange
    }, range ? `${(_range$open = range.open) !== null && _range$open !== void 0 ? _range$open : ''}–${(_range$close = range.close) !== null && _range$close !== void 0 ? _range$close : ''}` : (0,strings.t)('closed', locale)));
  })) : /*#__PURE__*/index_js_.createElement("p", {
    className: hoursUnavailable
  }, node.mapsUrl ? /*#__PURE__*/index_js_.createElement("a", {
    href: node.mapsUrl,
    rel: "noopener noreferrer",
    target: "_blank"
  }, (0,strings.t)('hoursUnavailable', locale)) : (0,strings.t)('hoursUnavailable', locale)), amenities.length > 0 ? /*#__PURE__*/index_js_.createElement(index_js_.Fragment, null, /*#__PURE__*/index_js_.createElement("h2", {
    className: sheetHeader
  }, (0,strings.t)('amenities', locale)), /*#__PURE__*/index_js_.createElement("ul", {
    className: chips
  }, amenities.map(label => /*#__PURE__*/index_js_.createElement("li", {
    key: label,
    className: chip
  }, label)))) : null, description ? /*#__PURE__*/index_js_.createElement("p", {
    className: location_module_description
  }, description) : null))), galleryImages.length > 0 ? /*#__PURE__*/index_js_.createElement("section", {
    className: gallery
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: galleryInner
  }, galleryImages.map(item => item.image ? /*#__PURE__*/index_js_.createElement("figure", {
    key: item.url,
    className: galleryPlate
  }, /*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.mV, {
    image: item.image,
    alt: item.alt
  }), item.alt ? /*#__PURE__*/index_js_.createElement("figcaption", {
    className: galleryCaption
  }, item.alt) : null) : null))) : null, guide ? /*#__PURE__*/index_js_.createElement("section", {
    className: location_module_guide
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: guideInner
  }, /*#__PURE__*/index_js_.createElement("h2", {
    className: guideHeader
  }, (0,strings.t)('neighborhoodGuide', locale)), /*#__PURE__*/index_js_.createElement("p", {
    className: guideBody
  }, guide))) : null);
}
function Head({
  data,
  pageContext,
  location
}) {
  var _node$shortName2;
  const node = data.gramoLocation;
  const locale = pageContext.locale;
  const name = node ? (_node$shortName2 = node.shortName) !== null && _node$shortName2 !== void 0 ? _node$shortName2 : node.title : 'Gramo Café';
  let jsonLd;
  if (node) {
    const openingHours = DAY_ORDER.map(day => {
      var _node$hours;
      const range = (_node$hours = node.hours) === null || _node$hours === void 0 ? void 0 : _node$hours[day];
      return range !== null && range !== void 0 && range.open && range.close ? {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_SCHEMA[day],
        opens: range.open,
        closes: range.close
      } : null;
    }).filter(Boolean);
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: `Gramo Café — ${name}`,
      servesCuisine: 'Coffee',
      ...(node.address ? {
        address: {
          '@type': 'PostalAddress',
          streetAddress: node.address,
          ...(node.city ? {
            addressLocality: node.city
          } : {}),
          ...(node.postalCode ? {
            postalCode: node.postalCode
          } : {}),
          addressCountry: 'MX'
        }
      } : {}),
      ...(node.latitude && node.longitude ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: node.latitude,
          longitude: node.longitude
        }
      } : {}),
      ...(node.phone ? {
        telephone: node.phone
      } : {}),
      ...(node.mapsUrl ? {
        hasMap: node.mapsUrl
      } : {}),
      ...(openingHours.length > 0 ? {
        openingHoursSpecification: openingHours
      } : {})
    };
  }
  return /*#__PURE__*/index_js_.createElement(SEO/* SEO */.k, {
    title: name,
    description: node ? localized(node.description, locale) || null : null,
    locale: locale,
    pathname: location.pathname,
    translationPath: pageContext.translationPath,
    imageUrl: node === null || node === void 0 ? void 0 : node.imageUrl,
    jsonLd: jsonLd
  });
}
const query = "2898650555";

/***/ }),

/***/ 5970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mV: () => (/* binding */ X)
/* harmony export */ });
/* unused harmony exports MainImage, Placeholder, StaticImage, generateImageData, getImage, getImageData, getLowResolutionImageURL, getSrc, getSrcSet, withArtDirection */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7905);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2349);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2688);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);}return e;},n.apply(this,arguments);}function o(e,t){if(null==e)return{};var a,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)t.indexOf(a=n[i])>=0||(r[a]=e[a]);return r;}var s=(/* unused pure expression or super */ null && ([.25,.5,1,2])),l=(/* unused pure expression or super */ null && ([750,1080,1366,1920])),u=(/* unused pure expression or super */ null && ([320,654,768,1024,1366,1600,1920,2048,2560,3440,3840,4096])),d=800,c=800,h=(/* unused pure expression or super */ null && (4/3)),g=function(e){return console.warn(e);},p=function(e,t){return e-t;},m=function(e,t){switch(t){case"constrained":return"(min-width: "+e+"px) "+e+"px, 100vw";case"fixed":return e+"px";case"fullWidth":return"100vw";default:return;}},f=function(e){return e.map(function(e){return e.src+" "+e.width+"w";}).join(",\n");};function v(e){var t=e.lastIndexOf(".");if(-1!==t){var a=e.slice(t+1);if("jpeg"===a)return"jpg";if(3===a.length||4===a.length)return a;}}function w(e){var t=e.layout,i=void 0===t?"constrained":t,r=e.width,o=e.height,s=e.sourceMetadata,l=e.breakpoints,u=e.aspectRatio,d=e.formats,g=void 0===d?["auto","webp"]:d;return g=g.map(function(e){return e.toLowerCase();}),i=a(i),r&&o?n({},e,{formats:g,layout:i,aspectRatio:r/o}):(s.width&&s.height&&!u&&(u=s.width/s.height),"fullWidth"===i?(r=r||s.width||l[l.length-1],o=o||Math.round(r/(u||h))):(r||(r=o&&u?o*u:s.width?s.width:o?Math.round(o/h):c),u&&!o?o=Math.round(r/u):u||(u=r/o)),n({},e,{width:r,height:o,aspectRatio:u,layout:i,formats:g}));}function y(e,t){var a;return void 0===t&&(t=20),null==(a=(0,(e=w(e)).generateImageSource)(e.filename,t,Math.round(t/e.aspectRatio),e.sourceMetadata.format||"jpg",e.fit,e.options))?void 0:a.src;}function b(e){var t,a=(e=w(e)).pluginName,i=e.sourceMetadata,r=e.generateImageSource,o=e.layout,u=e.fit,d=e.options,h=e.width,p=e.height,y=e.filename,b=e.reporter,S=void 0===b?{warn:g}:b,N=e.backgroundColor,x=e.placeholderURL;if(a||S.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'),"function"!=typeof r)throw new Error("generateImageSource must be a function");i&&(i.width||i.height)?i.format||(i.format=v(y)):i={width:h,height:p,format:(null==(t=i)?void 0:t.format)||v(y)||"auto"};var I=new Set(e.formats);(0===I.size||I.has("auto")||I.has(""))&&(I.delete("auto"),I.delete(""),I.add(i.format)),I.has("jpg")&&I.has("png")&&(S.warn("["+a+"] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"),I.delete("jpg"===i.format?"png":"jpg"));var W=function(e){var t=e.filename,a=e.layout,i=void 0===a?"constrained":a,r=e.sourceMetadata,o=e.reporter,u=void 0===o?{warn:g}:o,d=e.breakpoints,h=void 0===d?l:d,p=Object.entries({width:e.width,height:e.height}).filter(function(e){var t=e[1];return"number"==typeof t&&t<1;});if(p.length)throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are "+p.map(function(e){return e.join(": ");}).join(", "));return"fixed"===i?function(e){var t=e.filename,a=e.sourceMetadata,i=e.width,r=e.height,n=e.fit,o=void 0===n?"cover":n,l=e.outputPixelDensities,u=e.reporter,d=void 0===u?{warn:g}:u,h=a.width/a.height,p=k(void 0===l?s:l);if(i&&r){var m=M(a,{width:i,height:r,fit:o});i=m.width,r=m.height,h=m.aspectRatio;}i?r||(r=Math.round(i/h)):i=r?Math.round(r*h):c;var f=i;if(a.width<i||a.height<r){var v=a.width<i?"width":"height";d.warn("\nThe requested "+v+' "'+("width"===v?i:r)+'px" for the image '+t+" was larger than the actual image "+v+" of "+a[v]+"px. If possible, replace the current image with a larger one."),"width"===v?(i=a.width,r=Math.round(i/h)):i=(r=a.height)*h;}return{sizes:p.filter(function(e){return e>=1;}).map(function(e){return Math.round(e*i);}).filter(function(e){return e<=a.width;}),aspectRatio:h,presentationWidth:f,presentationHeight:Math.round(f/h),unscaledWidth:i};}(e):"constrained"===i?E(e):"fullWidth"===i?E(n({breakpoints:h},e)):(u.warn("No valid layout was provided for the image at "+t+". Valid image layouts are fixed, fullWidth, and constrained. Found "+i),{sizes:[r.width],presentationWidth:r.width,presentationHeight:r.height,aspectRatio:r.width/r.height,unscaledWidth:r.width});}(n({},e,{sourceMetadata:i})),j={sources:[]},R=e.sizes;R||(R=m(W.presentationWidth,o)),I.forEach(function(e){var t=W.sizes.map(function(t){var i=r(y,t,Math.round(t/W.aspectRatio),e,u,d);if(null!=i&&i.width&&i.height&&i.src&&i.format)return i;S.warn("["+a+"] The resolver for image "+y+" returned an invalid value.");}).filter(Boolean);if("jpg"===e||"png"===e||"auto"===e){var i=t.find(function(e){return e.width===W.unscaledWidth;})||t[0];i&&(j.fallback={src:i.src,srcSet:f(t),sizes:R});}else{var n;null==(n=j.sources)||n.push({srcSet:f(t),sizes:R,type:"image/"+e});}});var _={images:j,layout:o,backgroundColor:N};switch(x&&(_.placeholder={fallback:x}),o){case"fixed":_.width=W.presentationWidth,_.height=W.presentationHeight;break;case"fullWidth":_.width=1,_.height=1/W.aspectRatio;break;case"constrained":_.width=e.width||W.presentationWidth||1,_.height=(_.width||1)/W.aspectRatio;}return _;}var k=function(e){return Array.from(new Set([1].concat(e))).sort(p);};function E(e){var t,a=e.sourceMetadata,i=e.width,r=e.height,n=e.fit,o=void 0===n?"cover":n,l=e.outputPixelDensities,u=e.breakpoints,c=e.layout,h=a.width/a.height,g=k(void 0===l?s:l);if(i&&r){var m=M(a,{width:i,height:r,fit:o});i=m.width,r=m.height,h=m.aspectRatio;}i=i&&Math.min(i,a.width),r=r&&Math.min(r,a.height),i||r||(r=(i=Math.min(d,a.width))/h),i||(i=r*h);var f=i;return(a.width<i||a.height<r)&&(i=a.width,r=a.height),i=Math.round(i),(null==u?void 0:u.length)>0?(t=u.filter(function(e){return e<=a.width;})).length<u.length&&!t.includes(a.width)&&t.push(a.width):t=(t=g.map(function(e){return Math.round(e*i);})).filter(function(e){return e<=a.width;}),"constrained"!==c||t.includes(i)||t.push(i),{sizes:t=t.sort(p),aspectRatio:h,presentationWidth:f,presentationHeight:Math.round(f/h),unscaledWidth:i};}function M(e,t){var a=e.width/e.height,i=t.width,r=t.height;switch(t.fit){case"fill":i=t.width?t.width:e.width,r=t.height?t.height:e.height;break;case"inside":var n=t.width?t.width:Number.MAX_SAFE_INTEGER,o=t.height?t.height:Number.MAX_SAFE_INTEGER;i=Math.min(n,Math.round(o*a)),r=Math.min(o,Math.round(n/a));break;case"outside":var s=t.width?t.width:0,l=t.height?t.height:0;i=Math.max(s,Math.round(l*a)),r=Math.max(l,Math.round(s/a));break;default:t.width&&!t.height&&(i=t.width,r=Math.round(t.width/a)),t.height&&!t.width&&(i=Math.round(t.height*a),r=t.height);}return{width:i,height:r,aspectRatio:i/r};}var S=(/* unused pure expression or super */ null && (["baseUrl","urlBuilder","sourceWidth","sourceHeight","pluginName","formats","breakpoints","options"])),N=(/* unused pure expression or super */ null && (["images","placeholder"]));function x(){return true&&true;}var I=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src);}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData);}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage);}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData;},W=function(e){var t,a,i;return null==(t=I(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.src;},j=function(e){var t,a,i;return null==(t=I(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.srcSet;};function R(e){var t,a=e.baseUrl,i=e.urlBuilder,r=e.sourceWidth,s=e.sourceHeight,l=e.pluginName,d=void 0===l?"getImageData":l,c=e.formats,h=void 0===c?["auto"]:c,g=e.breakpoints,p=e.options,m=o(e,S);return null!=(t=g)&&t.length||"fullWidth"!==m.layout&&"FULL_WIDTH"!==m.layout||(g=u),b(n({},m,{pluginName:d,generateImageSource:function(e,t,a,r){return{width:t,height:a,format:r,src:i({baseUrl:e,width:t,height:a,options:p,format:r})};},filename:a,formats:h,breakpoints:g,sourceMetadata:{width:r,height:s,format:"auto"}}));}function _(e,t){var a,i,r,s=e.images,l=e.placeholder,u=n({},o(e,N),{images:n({},s,{sources:[]}),placeholder:l&&n({},l,{sources:[]})});return t.forEach(function(t){var a,i=t.media,r=t.image;i?(r.layout!==e.layout&&"development"==="production"&&0,(a=u.images.sources).push.apply(a,r.images.sources.map(function(e){return n({},e,{media:i});}).concat([{media:i,srcSet:r.images.fallback.srcSet}])),u.placeholder&&u.placeholder.sources.push({media:i,srcSet:r.placeholder.fallback})): false&&0;}),(a=u.images.sources).push.apply(a,s.sources),null!=l&&l.sources&&(null==(i=u.placeholder)||(r=i.sources).push.apply(r,l.sources)),u;}var A,O=["src","srcSet","loading","alt","shouldLoad"],T=["fallback","sources","shouldLoad"],z=function(t){var a=t.src,i=t.srcSet,r=t.loading,s=t.alt,l=void 0===s?"":s,u=t.shouldLoad,d=o(t,O);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img",n({},d,{decoding:"async",loading:r,src:u?a:void 0,"data-src":u?void 0:a,srcSet:u?i:void 0,"data-srcset":u?void 0:i,alt:l}));},L=function(t){var a=t.fallback,i=t.sources,r=void 0===i?[]:i,s=t.shouldLoad,l=void 0===s||s,u=o(t,T),d=u.sizes||(null==a?void 0:a.sizes),c=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z,n({},u,a,{sizes:d,shouldLoad:l}));return r.length?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture",null,r.map(function(t){var a=t.media,i=t.srcSet,r=t.type;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source",{key:a+"-"+r+"-"+i,type:r,media:a,srcSet:l?i:void 0,"data-srcset":l?void 0:i,sizes:d});}),c):c;};z.propTypes={src:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,alt:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool},L.displayName="Picture",L.propTypes={alt:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,fallback:prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({src:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_2__.string}),sources:prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,type:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired}),prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,type:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired})]))};var q=["fallback"],C=function(t){var a=t.fallback,i=o(t,q);return a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L,n({},i,{fallback:{src:a},"aria-hidden":!0,alt:""})):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",n({},i));};C.displayName="Placeholder",C.propTypes={fallback:prop_types__WEBPACK_IMPORTED_MODULE_2__.string,sources:null==(A=L.propTypes)?void 0:A.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null;}};var D=function(t){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L,n({},t)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L,n({},t,{shouldLoad:!0}))));};D.displayName="MainImage",D.propTypes=L.propTypes;var P=["children"],H=function(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script",{type:"module",dangerouslySetInnerHTML:{__html:'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'}});},F=function(t){var a=t.layout,i=t.width,r=t.height;return"fullWidth"===a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{"aria-hidden":!0,style:{paddingTop:r/i*100+"%"}}):"constrained"===a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{style:{maxWidth:i,display:"block"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+r+"'%20width='"+i+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null;},B=function(a){var i=a.children,r=o(a,P);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F,n({},r)),i,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(H,null));},G=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],V=["style","className"],U=function(e){return e.replace(/\n/g,"");},X=function(t){var a=t.as,i=void 0===a?"div":a,r=t.className,s=t.class,l=t.style,u=t.image,d=t.loading,c=void 0===d?"lazy":d,h=t.imgClassName,g=t.imgStyle,p=t.backgroundColor,m=t.objectFit,f=t.objectPosition,v=o(t,G);if(!u)return console.warn("[gatsby-plugin-image] Missing image prop"),null;s&&(r=s),g=n({objectFit:m,objectPosition:f,backgroundColor:p},g);var w=u.width,y=u.height,b=u.layout,k=u.images,E=u.placeholder,M=u.backgroundColor,S=function(e,t,a){var i={},r="gatsby-image-wrapper";return x()||(i.position="relative",i.overflow="hidden"),"fixed"===a?(i.width=e,i.height=t):"constrained"===a&&(x()||(i.display="inline-block",i.verticalAlign="top"),r="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:r,"data-gatsby-image-wrapper":"",style:i};}(w,y,b),N=S.style,I=S.className,W=o(S,V),j={fallback:void 0,sources:[]};return k.fallback&&(j.fallback=n({},k.fallback,{srcSet:k.fallback.srcSet?U(k.fallback.srcSet):void 0})),k.sources&&(j.sources=k.sources.map(function(e){return n({},e,{srcSet:U(e.srcSet)});})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i,n({},W,{style:n({},N,l,{backgroundColor:p}),className:I+(r?" "+r:"")}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(B,{layout:b,width:w,height:y},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C,n({},function(e,t,a,i,r,o,s,l){var u={};o&&(u.backgroundColor=o,"fixed"===a?(u.width=i,u.height=r,u.backgroundColor=o,u.position="relative"):("constrained"===a||"fullWidth"===a)&&(u.position="absolute",u.top=0,u.left=0,u.bottom=0,u.right=0)),s&&(u.objectFit=s),l&&(u.objectPosition=l);var d=n({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:n({opacity:1,transition:"opacity 500ms linear"},u)});return x()||(d.style={height:"100%",left:0,position:"absolute",top:0,width:"100%"}),d;}(E,0,b,w,y,M,m,f))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D,n({"data-gatsby-image-ssr":"",className:h},v,function(e,t,a,i,r){return void 0===r&&(r={}),x()||(r=n({height:"100%",left:0,position:"absolute",top:0,transform:"translateZ(0)",transition:"opacity 250ms linear",width:"100%",willChange:"opacity"},r)),n({},a,{loading:i,shouldLoad:e,"data-main-image":"",style:n({},r,{opacity:0})});}("eager"===c,0,j,c,g)))));},Y=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],Z=function(t){return function(a){var i=a.src,r=a.__imageData,s=a.__error,l=o(a,Y);return s&&console.warn(s),r?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t,n({image:r},l)):(console.warn("Image not loaded",i),s||"development"!=="production"||0,null);};}(X),J=function(e,t){return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()),[e,t].concat([].slice.call(arguments,2))):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.");},K=new Set(["fixed","fullWidth","constrained"]),Q={src:(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,alt:function(e,t,a){return e.alt||""===e.alt?prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()),[e,t,a].concat([].slice.call(arguments,3))):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');},width:J,height:J,sizes:(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),layout:function(e){if(void 0!==e.layout&&!K.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');}};Z.displayName="StaticImage",Z.propTypes=Q;

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
//# sourceMappingURL=component---src-templates-location-tsx.js.map