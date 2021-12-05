import { existsSync } from 'fs';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
describe('Test image end point', () => {
    const CROPPED_IMAGES_PATH = `${__dirname}/../../../src/public/images/cropped/`;

    it('Should resize images and return it', async (done) => {
        const body = {
                height: 400,
                imageName: 'fjord',
                imageType: 'jpg',
                width: 200,
            };
        const response = await request.post('/image/resize').send(body);
        const expectedImageName = `200x400-fjord.jpg`;
        const expectedImagePath = `${CROPPED_IMAGES_PATH}${expectedImageName}`;

        expect(response.status).toBe(200);
        expect(existsSync(expectedImagePath)).toBeTrue();
        done();
    });
});
