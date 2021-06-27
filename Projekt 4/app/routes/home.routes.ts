import express from 'express';
import HomeController from '../controllers/home.controller';

const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/about', homeController.about);
router.get('/contact', homeController.contact);

export = router;
