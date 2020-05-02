const webpack = require('webpack');
const { resolve } = require('path');

const { WebpackOpenBrowser } = require('../dist/index');

/** @type {import('webpack').Configuration} */
const baseConfig = {
    mode: 'development',
    entry: resolve(__dirname, './index.js'),
    output: {
        path: __dirname,
        filename: 'index.bundle.js',
    },
    plugins: [new WebpackOpenBrowser({ url: 'https://github.com/' })],
};

function handler(error, stats) {
    if (error) {
        console.error(error.stack || error);
        if (error.details) {
            console.error(error.details);
        }
        return;
    }
    console.log(
        stats.toString({
            preset: 'normal',
            colors: true,
        }),
    );
}

/**
 * should not work
 */
function testRun() {
    webpack(baseConfig).run(handler);
}

/**
 * should open in default browser to specific url
 */
function testUrlArgument() {
    webpack(baseConfig).watch({}, handler);
}

/**
 * should open in firefox
 */
function testBrowserArgument() {
    baseConfig.plugins[0] = new WebpackOpenBrowser({
        url: 'https://github.com/',
        // browser: 'chrome',
        browser: 'firefox',
    });
    webpack(baseConfig).watch({}, handler);
}

/**
 * should open browser after 10 seconds delay
 */
function testDelayArgument() {
    baseConfig.plugins[0] = new WebpackOpenBrowser({
        url: 'https://github.com/',
        delay: 10 * 1000,
    });
    webpack(baseConfig).watch({}, handler);
}

/**
 * should open two urls in same browser
 */
function testOpenMultipleUrl() {
    baseConfig.plugins[0] = new WebpackOpenBrowser([
        { url: 'https://github.com/' },
        { url: 'https://stackoverflow.com/' },
    ]);
    webpack(baseConfig).watch({}, handler);
}

/**
 * should still open browser even if compile error
 */
function testIgnoreErrorsArg() {
    baseConfig.plugins[0] = new WebpackOpenBrowser({
        url: 'https://github.com/',
        ignoreErrors: true,
    });
    baseConfig.entry = 'not-exists-path.js';
    webpack(baseConfig).watch({}, handler);
}

testRun();
// testUrlArgument();
// testBrowserArgument();
// testDelayArgument();
// testOpenMultipleUrl();
// testIgnoreErrorsArg();
