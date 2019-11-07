const { environment } = require('@rails/webpacker');

require('./loaders/css')(environment);
require('./loaders/typescript')(environment);

module.exports = environment;
