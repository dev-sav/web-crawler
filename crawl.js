const {JSDOM} = require('jsdom');

async function crawlPage(currentUrl) {
    console.log(`actively crawling ${currentUrl}`);
    try{
        const resp = await fetch(currentUrl)
        if (resp.status > 399) {
            console.log(`Error status code: ${resp.status}`)
            return
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Error, non-html response, content type: ${contentType}`)
            return
        }
        console.log(await resp.text())
    }
    catch(e){
        console.log(`Error fetching: ${e}`)
    }
    
}

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
    getURLsFromHTML,
    crawlPage
}