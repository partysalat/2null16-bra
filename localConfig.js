module.exports = {
  bundle: {
    app: "2null16-bra-bundle.js",
    vendor: "2null16-bra-vendor-bundle.js",
    url: "/internal/assets"
  },

  sql: {
    database: 'bra',
    auth: {
      user: "user",
      pass: "pass"
    },
    settings: {
      host: "localhost",
      logging: false,
      dialect: 'sqlite',

      storage: './database.sqlite',
      pool: {
        max: 10,
        min: 5
      }
    }
  }

};