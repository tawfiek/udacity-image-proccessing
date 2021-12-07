import { NextFunction, Request, Response } from 'express';
import { readFile } from 'fs/promises';
import sharp from 'sharp';
import * as imageUtils from '../utils/image-utils';

// Make sure that the cropped image required is available with the required size.
// If not, create it.
export async function resizeImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const width: number = +req.query.width;
        const height: number = +req.query.height;
        const imageName: string = req.params.imageName;
        const imageType: string = req.params.imageType;

        const outputFileName = imageUtils.getOutputFileName(
            width,
            height,
            imageName,
            imageType
        );
        const fullImageName = `${imageName}.${imageType}`;

        const isCroppedImageExist = imageUtils.isCroppedImageExists(
            width,
            height,
            imageName,
            imageType
        );

        // If the file doesn't exist, return error [404].
        if (!imageUtils.isFullImageExists(fullImageName)) {
            return res.status(404).json({
                message: 'Can not find image with name' + fullImageName,
            });
        }

        // If the file exists, go to the next middleware;
        if (isCroppedImageExist) {
            next();
        }
        const file = await readFile(
            imageUtils.FULL_IMAGES_PATH + fullImageName
        );

        const result: sharp.OutputInfo = await sharp(file)
            .resize(width, height)
            .toFile(imageUtils.CROPPED_IMAGES_PATH + outputFileName);

        console.log('[SHARP] Image Resized', result);

        next();
    } catch (error) {
        next(error);
    }
}
