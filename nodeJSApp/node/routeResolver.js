const fs = require('fs');
const path = require('path');

module.exports = {

    resolveUrl: function (url, filename = null) {

        switch (url) {
            case 'pages/main':
                return this.getPublicFile(url, filename)


            default:
                throw new Error('unknown URI', 'unknown URI attempt to access')
                break;
        }

    },


}

module.exports.getPublicFile = getPublicFile;

async function getPublicFile(url, fileName) {
    const serverPath = __dirname + '\\pages\\public\\' + url.replace('pages/', '')
    console.log('read dir ', url, serverPath, fileName)

    return await fs.promises.readFile(serverPath + "\\" + fileName, { encoding: 'utf-8' })

}

function promiseUnwrapper(promise) {
    console.log('unwr ', promise)
    if (!promise instanceof Promise) {
        return null
    }
    promise.then(cc => { console.log('cc ', cc) })
}