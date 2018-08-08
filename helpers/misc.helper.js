const moment = require('moment');

module.exports = (hbs) => {
    hbs.registerHelper('json', function (context) {
        return JSON.stringify(context);
    });

    hbs.registerHelper('datetime', function (date) {
        return date ? date.toLocaleDateString() : undefined;
    });
}