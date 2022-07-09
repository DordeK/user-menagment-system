// let userController = req('./controllers/user');
import userController from './controllers/user/index.cjs'
const routes = (app) => {
    app.use('/user', userController);
};

export default routes