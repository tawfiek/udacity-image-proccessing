import { Router } from 'express'
import { getImage, validateInputs } from '../../controllers/image'
import { resizeImage } from '../../middleware/image'

const router = Router()

router.post('/resize', validateInputs, resizeImage, getImage)

export default router
