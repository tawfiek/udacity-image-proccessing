import { NextFunction, Request, Response } from 'express';
import {existsSync} from 'fs';
import {resizeImage} from '../middleware/image';

describe ('Image crop process', () => {
    const CROPPED_IMAGES_PATH = `${__dirname}/../../src/public/images/cropped/`;

    it ('Should use sharp to crop the image correctly', async () => {
        const mockReq: Request = {
            body: {
                height: 100,
                imageName: 'fjord',
                imageType: 'jpg',
                width: 100,
            },
        } as any;

        const mockRes: Response = {} as any;
        const mockNext: NextFunction = jasmine.createSpy('next');
        const expectedImageName = `100x100-fjord.jpg`;
        const expectedImagePath = `${CROPPED_IMAGES_PATH}${expectedImageName}`;

        await resizeImage(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(existsSync(expectedImagePath)).toBeTrue();
    });
});
