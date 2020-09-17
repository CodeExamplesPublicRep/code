module.exports.sendResponse = function (response, code = '200', message = 'success') {
    response.statusCode = code;
    response.statusMessage = message;
    response.end();
}

module.exports.sendResponseError = function (response, code = '400', message = 'internal error') {
    response.statusCode = code;
    response.statusMessage = message;
    response.end();
}