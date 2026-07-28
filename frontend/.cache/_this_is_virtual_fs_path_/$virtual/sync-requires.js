
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/pages/404.tsx")),
  "component---src-templates-cart-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/cart.tsx")),
  "component---src-templates-checkout-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/checkout.tsx")),
  "component---src-templates-coffee-index-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/coffee-index.tsx")),
  "component---src-templates-coffee-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/coffee.tsx")),
  "component---src-templates-journal-category-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/journal-category.tsx")),
  "component---src-templates-journal-post-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/journal-post.tsx")),
  "component---src-templates-location-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/location.tsx")),
  "component---src-templates-locations-index-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/locations-index.tsx")),
  "component---src-templates-menu-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/menu.tsx")),
  "component---src-templates-order-confirmed-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/order-confirmed.tsx")),
  "component---src-templates-page-tsx": preferDefault(require("/Users/codecharmer/gramo/frontend/src/templates/page.tsx"))
}

