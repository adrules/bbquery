const moment = require('moment');

module.exports = (hbs) => {
    hbs.registerHelper('json', function (context) {
        return JSON.stringify(context);
    });

    hbs.registerHelper('moment', function (date) {
        return date ? moment(date).format('LLLL') : undefined;
    });
}