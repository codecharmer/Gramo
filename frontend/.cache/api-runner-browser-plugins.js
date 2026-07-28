module.exports = [{
      plugin: require('../../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Gramo Café","short_name":"Gramo","start_url":"/","background_color":"#F2EBDD","theme_color":"#191410","display":"minimal-ui","icon":"src/images/icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"c178463a215805398faa51a728598be9"},
    },{
      plugin: require('../gatsby-browser.tsx'),
      options: {"plugins":[]},
    },{
      plugin: require('../../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
