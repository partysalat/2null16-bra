module.exports = {
  bundleEntries:["./src/browser/app.js"],
  vendorEntries:["./src/browser/vendor.js"],
  appName:"./2null16-bra",
  paths: {
    source: './src',
    serverSource: './src/server',
    browserSource: './src/browser',
    test: {
      base: './test',
      config:__dirname + "/../test/config",
      unitServer: './test/unit/server',
      unitBrowser: './test/unit/browser',
      integration: './test/integration',
      functionalServer: './test/functional/server',
      functionalBrowser: './test/functional/browser'
    },
    coverageServer:"./target/reports/coverage/server",
    coverageBrowser:"./target/reports/coverage/browser",
    assets: './target/assets',
    reports: './target/test-reports',
    wiremock: './target/wiremock',
    mongoDb: './target/mongoDb'
  },
  env: {
    name:null,
    development:false,
    test: false,
    port:1337
  }
};