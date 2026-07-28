/**
 * WPGraphQL queries run at build time by gatsby-node's sourceNodes.
 * Kept together so the backend schema surface the frontend depends on is
 * auditable in one file.
 */

export const SETTINGS_QUERY = /* GraphQL */ `
  query GramoSettings {
    gramoSettings {
      nav {
        label {
          es
          en
        }
        path
      }
      footer {
        label {
          es
          en
        }
        path
      }
      footerNote {
        es
        en
      }
      announcement {
        enabled
        text {
          es
          en
        }
        url
      }
      social {
        instagram
        facebook
        spotify
        linktree
        whatsappCommunity
      }
      business {
        name
        tagline
        phone
        phoneLink
        whatsapp
        email
        instagramHandle
      }
    }
  }
`;

export const COFFEES_QUERY = /* GraphQL */ `
  query GramoCoffees {
    coffees(first: 100, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        content
        nameEn
        descriptionEn
        origin
        producer
        altitude
        variety
        process {
          es
          en
        }
        roastLevel
        tastingNotes {
          noteEs
          noteEn
        }
        brewMethods {
          methodEs
          methodEn
        }
        harvest
        availability
        subscriptionInterval
        price
        regularPrice
        stockStatus
        purchasable
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        terms(first: 10) {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const LOCATIONS_QUERY = /* GraphQL */ `
  query GramoLocations {
    locations(first: 50, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        databaseId
        slug
        title
        menuOrder
        shortName
        address
        neighborhood
        city
        postalCode
        phone
        whatsapp
        hours {
          mon {
            open
            close
          }
          tue {
            open
            close
          }
          wed {
            open
            close
          }
          thu {
            open
            close
          }
          fri {
            open
            close
          }
          sat {
            open
            close
          }
          sun {
            open
            close
          }
        }
        amenities {
          labelEs
          labelEn
        }
        mapsUrl
        latitude
        longitude
        gallery {
          id
          url
          alt
        }
        description {
          es
          en
        }
        neighborhoodGuide {
          es
          en
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const MENU_QUERY = /* GraphQL */ `
  query GramoMenu {
    menuSections(first: 20) {
      nodes {
        databaseId
        slug
        name
        nameEn
      }
    }
    menuEntries(first: 100, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        databaseId
        slug
        title
        menuOrder
        nameEn
        description {
          es
          en
        }
        price
        priceNote {
          es
          en
        }
        variants {
          labelEs
          labelEn
          price
        }
        dietary {
          es
          en
        }
        featured
        menuSections(first: 5) {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const PEOPLE_QUERY = /* GraphQL */ `
  query GramoPeople {
    teamMembers(first: 50, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        databaseId
        slug
        title
        role {
          es
          en
        }
        bio {
          es
          en
        }
        instagram
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    testimonials(first: 50, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        quote {
          es
          en
        }
        attribution {
          es
          en
        }
      }
    }
    events(first: 50, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        titleEn
        description {
          es
          en
        }
        date
        timeStart
        timeEnd
        locationId
        reservationUrl
      }
    }
  }
`;

export const PAGES_QUERY = /* GraphQL */ `
  query GramoPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        isFrontPage
        locale
        translation {
          databaseId
          slug
          locale
        }
        blocksJson
      }
    }
  }
`;

export const POSTS_QUERY = /* GraphQL */ `
  query GramoPosts {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        date
        excerpt
        readingTime
        locale
        translation {
          databaseId
          slug
          locale
        }
        blocksJson
        categories(first: 10) {
          nodes {
            slug
            name
            nameEn
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
