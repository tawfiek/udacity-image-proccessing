import { NextFunction, Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { CROPPED_IMAGES_PATH, getOutputFileName } from '../utils/image-utils';

export  function validateInputs(req: Request, res: Response, next: NextFunction) {
    const { width, height, imageName, imageType } = req.body;

    if (typeof width !== 'number' && typeof height !== 'number') {
        return res.status(400).json({message: 'Width and height must be numbers'});
    }

    if (typeof imageName !== 'string' || !imageName || !imageType || typeof imageType !== 'string') {
        return res.status(400).json({message: 'Image name and type must be strings'});
    }

    if (imageType !== 'jpg' && imageType !== 'png') {
        return res.status(400).json({message: 'Image type must be jpg or png'});
    }

    next();
}

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
