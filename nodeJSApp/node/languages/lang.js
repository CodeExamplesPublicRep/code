const ua = require('./ua');
const ru = require('./ru');
const en = require('./en')


module.exports = {
    getWord = function (stringName) {
        return this[currentLang][stringName]
    },
    getEntireLang = function (lang = 'en') {
        switch (lang) {
            case 'en':
                return en;

            case 'ru':
                return ru;

            case 'ua':
                return ua;

            default:
                return en;
        }
    },
    setCurrentLang = function (lang = 'en') {
        this.currentLang = lang
    }

}

let currentLang = 'en';
