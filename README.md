# webpack-open-browser

[![npm](https://img.shields.io/npm/v/webpack-open-browser)](https://www.npmjs.com/package/webpack-open-browser) [![npm](https://img.shields.io/npm/dm/webpack-open-browser)](https://www.npmjs.com/package/webpack-open-browser) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/webpack-open-browser/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/webpack-open-browser?targetFile=package.json) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/webpack-open-browser.svg)](http://isitmaintained.com/project/tjx666/webpack-open-browser') [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

open browser when webpack loads

## :package: Installation

```bash
# npm
npm install webpack-open-browser -D
# yarn
yarn add webpack-open-browser -D
```

## :wrench: Configuration

You can read the source or test code for more details. The open browser ability is provided by package [open](https://github.com/sindresorhus/open). You can check it for some option details, for example `browser` option.

Check this issue [#25](https://github.com/tjx666/webpack-open-browser/issues/25) for incognito mode。

```javascript
const { WebpackOpenBrowser, apps } = require('webpack-open-browser');

const commonConfig = {
  plugins: [
    // open http://localhost:3000 in default browser
    new WebpackOpenBrowser({ url: 'http://localhost:3000' }),

    // specify firefox to open
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: apps.firefox }),

    // the browser argument is platform dependent
    // For Windows chrome
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: 'chrome' }),
    // For MacOS chrome, the basename of /Applications/Google Chrome.app
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: 'Google Chrome' }),
    // For developer version firefox on MacOS
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: 'Firefox Developer Edition' }),
    // You can use builtin apps object to create cross-platform browser name
    // support apps.chrome, apps.firefox, apps.edge
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: apps.chrome }),

    // delay 3 seconds
    new WebpackOpenBrowser({ url: 'http://localhost:3000', delay: 3 * 1000 }),

    // By default, this plugin only works when no compile error
    new WebpackOpenBrowser({ url: 'http://localhost:3000', ignoreErrors: true }),

    // You can set a group of option to open multiple urls in multiple browsers
    new WebpackOpenBrowser([
      { url: 'http://localhost:3000', browser: apps.chrome },
      { url: 'http://localhost:3000', browser: apps.firefox },
    ]),

    // pass arguments
    new WebpackOpenBrowser({
      url: 'https://github.com/',
      browser: apps.chrome,
      arguments: ['--incognito'],
    }),
  ],
};
```
