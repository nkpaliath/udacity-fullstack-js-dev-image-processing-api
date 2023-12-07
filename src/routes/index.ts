import { Router } from 'express';

import imagesRouter from './api/images';

const router = Router();

router.use('/images', imagesRouter);

export default router;
