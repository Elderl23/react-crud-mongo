export function path() {
    const devMode = process.env.NODE_ENV;
    let path = '';
    if (devMode === 'development') {
        path = 'http://localhost:3009/';
    } else {
        path = 'https://devder.com/';
    }
    return path;
}