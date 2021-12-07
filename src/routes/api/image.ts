import { Router } from 'express';
import { getImage, validateInputs } from '../../controllers/image';
import { resizeImage } from '../../middleware/image';

const router = Router();

router.get('/resize/:imageName?/:imageType?', validateInputs, resizeImage, getImage);

export default router;
