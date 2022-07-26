import type { Compiler, Stats } from 'webpack';
import open from 'open';

export interface WebpackOpenBrowserOptionItem {
    url: string;
    browser?: string;
    delay?: number;
    ignoreErrors?: boolean;
}

export type WebpackOpenBrowserOptions =
    | WebpackOpenBrowserOptionItem
    | WebpackOpenBrowserOptionItem[];

function once<T extends (...args: any) => any>(fn: T) {
    let called = false;
    let result: ReturnType<T>;
    function enhancedFn(this: any, ...args: any[]): void {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
            return result;
        }
        return result;
    }
    return enhancedFn as T;
}

function openBrowser({ url, browser, delay = 0 }: WebpackOpenBrowserOptionItem): void {
    setTimeout(() => {
        if (browser) {
            open(url, {
                app: {
                    name: browser,
                },
            });
        } else {
            open(url);
        }
    }, delay);
}

const pluginName = 'WebpackOpenBrowser';

export class WebpackOpenBrowser {
    private isWatchModel = false;

    constructor(private readonly options: WebpackOpenBrowserOptions) {
        const checkOption = (option: WebpackOpenBrowserOptionItem): void => {
            const isObject =
                option !== null && (typeof option === 'object' || typeof option === 'function');
            if (!isObject) {
                throw new TypeError('Option item must be object!');
            }
            if (!option.url) {
                throw new TypeError('You must specific the url to open!');
            }
        };

        if (Array.isArray(options)) {
            options.forEach(checkOption);
        } else {
            checkOption(options);
        }
    }

    public apply(compiler: Compiler): void {
        compiler.hooks.watchRun.tap(`${pluginName}.recognizeWhetherRunInWatchMode`, () => {
            this.isWatchModel = true;
        });

        const handler = (stats: Stats): void => {
            if (this.isWatchModel) {
                const callback = (option: WebpackOpenBrowserOptionItem): void => {
                    if (!stats.hasErrors() || option.ignoreErrors) {
                        openBrowser(option);
                    }
                };

                if (Array.isArray(this.options)) {
                    this.options.forEach(callback);
                } else {
                    callback(this.options);
                }
            }
        };
        // open browser first time of build
        compiler.hooks.done.tap(pluginName, once(handler));
    }
}

export default WebpackOpenBrowser;
