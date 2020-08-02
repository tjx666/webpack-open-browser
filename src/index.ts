import { Compiler, Stats } from 'webpack';
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

// eslint-disable-next-line @typescript-eslint/ban-types
function once<T extends Function>(fn: T): T {
    let called = false;
    function enhancedFn(this: any, ...args: any[]): void {
        if (!called) {
            called = true;
            fn.apply(this, args);
        }
    }
    return (enhancedFn as unknown) as T;
}

function openBrowser({ url, browser, delay = 0 }: WebpackOpenBrowserOptionItem): void {
    setTimeout(() => {
        if (browser) {
            open(url, { app: browser });
        } else {
            open(url);
        }
    }, delay);
}

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
        compiler.hooks.watchRun.tap('adjust-whether-watch-mode', () => {
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
        compiler.hooks.done.tap('webpack-open-browser', once(handler));
    }
}

export default WebpackOpenBrowser;
