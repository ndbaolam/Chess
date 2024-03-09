const controller = require('./controllers');

module.exports = (app) => {
    app.get('/', controller.index);
}