function normalizeURL(urlString) {
    const url = new URL(urlString)
    return `${url.hostname}${url.pathname}`.replace(/\/+$/, '')
}

module.exports ={
    normalizeURL
}