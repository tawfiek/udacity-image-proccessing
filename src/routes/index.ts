import { Router } from 'express';
import imageRouter from './api/image';

const routes = Router();

routes.use('/image', imageRouter);

export default routes;
