const {JSDOM} = require('jsdom');


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for(const link of links) {
        try{
            if(link.href.startsWith('/')) {
                const urlObj = new URL(`${baseURL}${link.href}`) // validate link
                urls.push(urlObj.href) 
            } // relative
            else {
                const urlObj = new URL(link.href) // validate link
                urls.push(urlObj.href)
             } // absolute
        }
        catch(e){
            console.log(`invalid link ${e.message}`)
            break
        }
      
    }
    return urls
}

function normalizeURL(urlString) {
    const url = new URL(urlString)
    return `${url.hostname}${url.pathname}`.replace(/\/+$/, '')
}


module.exports ={
    normalizeURL,
    getURLsFromHTML
}