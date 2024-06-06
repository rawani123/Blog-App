import express from 'express';
import { getAllUsersController, loginController, registerController } from '../controller/user.controller.js';

const router = express.Router();    

router.route('/login').post(loginController);

router.route('/all-user').get(getAllUsersController)

router.route('/register').post(registerController);

export default router;