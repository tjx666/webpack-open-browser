# webpack-open-browser

[![npm](https://img.shields.io/npm/v/webpack-open-browser)](https://www.npmjs.com/package/webpack-open-browser) [![npm](https://img.shields.io/npm/dm/webpack-open-browser)](https://www.npmjs.com/package/webpack-open-browser) [![Build Status](https://travis-ci.org/tjx666/webpack-open-browser.svg?branch=master)](https://travis-ci.org/tjx666/webpack-open-browser) [![dependencies Status](https://david-dm.org/tjx666/webpack-open-browser/status.svg)](https://david-dm.org/tjx666/webpack-open-browser) [![devDependencies Status](https://david-dm.org/tjx666/webpack-open-browser/dev-status.svg)](https://david-dm.org/tjx666/webpack-open-browser?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/webpack-open-browser/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/webpack-open-browser?targetFile=package.json) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/webpack-open-browser.svg)](http://isitmaintained.com/project/tjx666/webpack-open-browser') [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

open browser when webpack loads

## :package: Installation

```bash
# npm
npm install webpack-open-browser -D
# yarn
yarn add webpack-open-browser -D
```

## :wrench: Configuration

```javascript
const { WebpackOpenBrowser } = require('webpack-open-browser');

const commonConfig = {
  plugins: [
    // open http://localhost:3000 in default browser
    new WebpackOpenBrowser({ url: 'http://localhost:3000' }),
    // more options
    // specify firefox to open
    new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: 'firefox' }),
    // delay 3 seconds
    new WebpackOpenBrowser({ url: 'http://localhost:3000', delay: 3 * 1000 }),
    // By default, this plugin only works when no compile error
    new WebpackOpenBrowser({ url: 'http://localhost:3000', ignoreErrors: true }),
    // You can set a group of option to open multiple urls in multiple browsers
    new WebpackOpenBrowser([
      { url: 'http://localhost:3000', browser: 'chrome' },
      { url: 'http://localhost:3000', browser: 'firefox' },
    ]),
  ],
};
```
