const http = require("http");
const config = require("./config.js");
const lang = require("./languages/en.js");
const router = require("./router.js");
const responses = require("./responses.js");



http.createServer(function (request, response) {

    const requestedUrl = request.url;

    if (router.isRouteExist(requestedUrl)) {

    } else {
        responses.sendResponseError(response, '400', "directory don't exist")
    }


}).listen(config.getCurrentConfig().port, config.getCurrentConfig().address, function () {
    console.log("server started")
})

