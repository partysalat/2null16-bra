module.exports = {
  bundle:{
    app:"2null16-bra-bundle.js",
    vendor:"2null16-bra-vendor-bundle.js",
    url:{
      $filter:"env",
      development:"/internal/assets",
      test:"/internal/assets"
    }
  },
  styleGuide: {
    version: {
      "$filter": 'env',
      "$default": '0.82',
      "production": '0.82'
    },
    host: {
      "$filter": 'env',
      "development": 'devitl02.rz.is',
      "test": 'static.immobilienscout24.at'
    }
  },
  

  logger: {
    config: {
      file: {
        level: 'info',
        filename: './target/2null16-bra.log'
      },
      console: {
        silent: false
      }
    },
    component: '2null16-bra'
  }
};