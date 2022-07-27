import { exec } from 'child_process';

exec(
    'open --new -a "Google Chrome" --args --incognito "https://github.com/tjx666/webpack-open-browser"',
);
exec(
    'open --new -a "Firefox Developer Edition" --args -private "https://github.com/tjx666/webpack-open-browser"',
);
