import { NextFunction, Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { CROPPED_IMAGES_PATH, getOutputFileName } from '../utils/image-utils';

export async function getImage(req: Request, res: Response, next: NextFunction) {
    try {
        const { width, height, imageName, imageType} = req.body;
        const outputFileName = getOutputFileName(width, height, imageName, imageType);
        const croppedImage = await getCroppedImage(outputFileName);

        res.writeHead(200, {
            'Content-Length': croppedImage.length,
            'Content-Type': 'image/png',
        });

        res.end(croppedImage);
    } catch (error) {
        next(error);
    }
}

function getCroppedImage(fileName: string): Promise<Buffer> {
    return readFile(CROPPED_IMAGES_PATH + fileName);
}
