module.exports = {
  bundle:{
    app:"2null16-bra-bundle.js",
    vendor:"2null16-bra-vendor-bundle.js",
    url:"/internal/assets"
  },
  styleGuide: {
    version:  '0.82',
    host:  'static.immobilienscout24.at'
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