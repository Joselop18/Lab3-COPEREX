import { Router } from 'express';
import { login } from './auth.contoller.js';
import { loginValidator } from "../middlewares/validator.js";

const router = Router();

router.post(
    '/login',
    loginValidator,
    login
);

export default router;