function setRoutes(app) {
    const { IndexController } = require('../controllers/index');
    const indexController = new IndexController();

    app.get('/reels', indexController.getIndex.bind(indexController));
}

module.exports = setRoutes;