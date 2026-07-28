/**
 * UI strings per locale. Content copy comes from WordPress; these are the
 * interface-owned strings only (labels, states, form messages).
 */

import type { Locale } from './routes';

const STRINGS = {
  skipToContent: { es: 'Saltar al contenido', en: 'Skip to content' },
  menuOpen: { es: 'Abrir menú', en: 'Open menu' },
  menuClose: { es: 'Cerrar menú', en: 'Close menu' },
  cart: { es: 'Pedido', en: 'Order' },
  cartEmpty: { es: 'Tu pedido está vacío.', en: 'Your order is empty.' },
  addToCart: { es: 'Agregar al pedido', en: 'Add to order' },
  outOfStock: { es: 'Agotado', en: 'Sold out' },
  seasonal: { es: 'De temporada', en: 'Seasonal' },
  viewCoffee: { es: 'Ver café', en: 'View coffee' },
  price: { es: 'Precio', en: 'Price' },
  origin: { es: 'Origen', en: 'Origin' },
  producer: { es: 'Productor', en: 'Producer' },
  altitude: { es: 'Altitud', en: 'Altitude' },
  variety: { es: 'Variedad', en: 'Variety' },
  process: { es: 'Proceso', en: 'Process' },
  roast: { es: 'Tueste', en: 'Roast' },
  tastingNotes: { es: 'Notas de cata', en: 'Tasting notes' },
  brewMethods: { es: 'Métodos de preparación', en: 'Brew methods' },
  hours: { es: 'Horario', en: 'Hours' },
  hoursUnavailable: {
    es: 'Consulta horarios en Google Maps',
    en: 'Check hours on Google Maps',
  },
  amenities: { es: 'Servicios', en: 'Amenities' },
  gettingThere: { es: 'Cómo llegar', en: 'Getting there' },
  neighborhoodGuide: { es: 'La zona', en: 'The neighborhood' },
  readingTime: { es: 'min de lectura', en: 'min read' },
  relatedPosts: { es: 'Sigue leyendo', en: 'Keep reading' },
  relatedCoffees: { es: 'Otros cafés', en: 'More coffees' },
  formName: { es: 'Nombre', en: 'Name' },
  formEmail: { es: 'Correo electrónico', en: 'Email' },
  formPhone: { es: 'Teléfono', en: 'Phone' },
  formCompany: { es: 'Empresa', en: 'Company' },
  formMessage: { es: 'Mensaje', en: 'Message' },
  formSend: { es: 'Enviar', en: 'Send' },
  formSending: { es: 'Enviando…', en: 'Sending…' },
  formSuccess: {
    es: 'Gracias — te responderemos muy pronto.',
    en: 'Thank you — we will get back to you shortly.',
  },
  formError: {
    es: 'No se pudo enviar. Inténtalo de nuevo.',
    en: 'Something went wrong. Please try again.',
  },
  formRequired: { es: 'Este campo es obligatorio.', en: 'This field is required.' },
  checkoutTitle: { es: 'Confirmar pedido', en: 'Checkout' },
  fulfillmentPickup: { es: 'Recoger en tienda', en: 'Pickup in store' },
  fulfillmentDelivery: { es: 'Entrega local', en: 'Local delivery' },
  deliveryAddress: { es: 'Dirección de entrega', en: 'Delivery address' },
  orderNotes: { es: 'Notas (opcional)', en: 'Notes (optional)' },
  placeOrder: { es: 'Hacer pedido', en: 'Place order' },
  codNote: {
    es: 'Pagas al recibir — efectivo o terminal.',
    en: 'Pay on delivery — cash or card terminal.',
  },
  orderConfirmed: { es: 'Pedido recibido', en: 'Order received' },
  orderNumber: { es: 'Número de pedido', en: 'Order number' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  remove: { es: 'Quitar', en: 'Remove' },
  subtotal: { es: 'Subtotal', en: 'Subtotal' },
  deliveryFee: { es: 'Envío local', en: 'Local delivery' },
  total: { es: 'Total', en: 'Total' },
  continueShopping: { es: 'Seguir explorando', en: 'Keep browsing' },
  notFoundTitle: { es: 'Página no encontrada', en: 'Page not found' },
  notFoundBody: {
    es: 'La página que buscas no existe o cambió de lugar.',
    en: 'The page you are looking for does not exist or has moved.',
  },
  backHome: { es: 'Volver al inicio', en: 'Back home' },
  switchLocale: { es: 'English', en: 'Español' },
} as const;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, locale: Locale): string {
  return STRINGS[key][locale];
}
