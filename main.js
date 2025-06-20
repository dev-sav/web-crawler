const {crawlPage} = require('./crawl.js')

function main() {

    if (process.argv.length < 3) {
        console.log(`no arguments provided`)
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log(`too much arguments provided`)
        process.exit(1)
    }

    const url = process.argv[2]
    
    console.log(`starting crawl...\nbaseURL: ${url}`)

    crawlPage(url)
}

main()