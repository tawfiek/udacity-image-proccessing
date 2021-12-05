import { Router } from 'express';
import { getImage } from '../../controllers/image';
import { resizeImage } from '../../middleware/image';

const router = Router();

router.post( '/resize', resizeImage, getImage );

export default router;
