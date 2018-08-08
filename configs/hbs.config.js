const hbs = require('hbs');
const path = require('path');

require('../helpers/misc.helper')(hbs);

hbs.registerPartials(path.join(__dirname, '../views/partials'));