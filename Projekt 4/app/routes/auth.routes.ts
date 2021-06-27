import express from 'express';
import AuthController from '../controllers/auth.controller';

const controller = new AuthController();
const router = express.Router();

router.route('/signin').get(controller.views.signin).post(controller.signin);

router.route('/signup').get(controller.views.signup).post(controller.signup);

router.route('/signout').get(controller.signout);

export default router;
