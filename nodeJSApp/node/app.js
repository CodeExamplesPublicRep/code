const http = require("http");
const config = require("./config.js");
const lang = require("./languages/en.js");
const router = require("./router.js");
const responses = require("./responses.js");
const routeResolver = require('./routeResolver.js');


http.createServer(function (request, response) {

    tryRequest(request, response)


}).listen(config.getCurrentConfig().port, config.getCurrentConfig().address, function () {
    console.log("server started")
})



function tryRequest(request, response) {
    try {
        const requestedUrl = request.url;

        console.log(request)
        if (router.isRouteExist(requestedUrl)) {
            const filename = router.cutFilename(request.url);
            const path = router.trimChar(requestedUrl.replace(filename, ''), '/')

            const promise = routeResolver.resolveUrl(path, filename).then(file => {
                response.end(file);
            })


        } else {
            responses.sendResponseError(response, '400', "directory don't exist")
        }
    } catch (error) {
        console.log(error)
    }
}