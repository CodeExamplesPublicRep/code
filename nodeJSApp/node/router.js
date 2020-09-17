const config = require('./config')

const routes = {
    pages: {

    },
    lol: {
        kek: {}
    },
    downloads: {

    },
    makeCoffee: {}
}

module.exports.routes = routes;

module.exports.isRouteExist = function (route) {
    const trimmedRoute = trimChar(route, '/');
    const routeParts = this.subdivideRouteToArray(trimmedRoute)
    const isLastFileName = this.isAllowedMimePresent(routeParts[routeParts.length - 1])
    const routeLength = isLastFileName ? routeParts.length - 1 : routeParts.length;

    let currentRoute = Object.assign({}, routes);

    for (let i = 0; i < routeLength; i++) {

        const currentSubRoute = routeParts[i]

        if (currentRoute.hasOwnProperty(currentSubRoute)) {
            currentRoute = currentRoute[currentSubRoute]
            if (i + 1 == routeLength)
                return true
        } else {
            if (!currentRoute.hasOwnProperty(currentSubRoute))
                return false
        }
    }
    return false
}

function trimChar(string, charToRemove) {
    while (string.charAt(0) == charToRemove) {
        string = string.substring(1);
    }

    while (string.charAt(string.length - 1) == charToRemove) {
        string = string.substring(0, string.length - 1);
    }

    return string;
}

module.exports.trimRoute = function (original) {
    return trimChar(original, '/');
}

module.exports.subdivideRouteToArray = function (entireRoute) {
    return entireRoute.split('/');
}

module.exports.isAllowedMimePresent = function (str) {
    const allowedMimeTypes = config['dev'].mimes;

    for (let i = 0; i < allowedMimeTypes.length; i++) {
        if (str.includes(allowedMimeTypes[i]))
            return true;
    }

    return false;
}