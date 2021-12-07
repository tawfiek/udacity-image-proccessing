import { existsSync, readFileSync } from 'fs';
import path from 'path';

export const CROPPED_IMAGES_PATH = path.normalize(
    `${__dirname}/../../public/images/cropped/`
);
export const FULL_IMAGES_PATH = path.normalize(
    `${__dirname}/../../public/images/full/`
);

// Get the output file name.
export function getOutputFileName(
    width: number,
    height: number,
    name: string,
    imageType: string
): string {
    return `${width}x${height}-${name}.${imageType}`;
}

// Check if the cropped image exists.
export function isCroppedImageExists(
    width: number,
    height: number,
    name: string,
    imageType: string
): boolean {
    const fileName = getOutputFileName(width, height, name, imageType);
    return !!existsSync(`${CROPPED_IMAGES_PATH}${fileName}.${imageType}`);
}

// Check if the full image exists.
export function isFullImageExists(name: string): boolean {
    console.debug(`${FULL_IMAGES_PATH}${name}`);
    return !!existsSync(`${FULL_IMAGES_PATH}${name}`);
}
