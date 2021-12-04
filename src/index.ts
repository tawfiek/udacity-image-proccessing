import cors from 'cors';
import express from 'express';
import imageRouter from '././routes/image';
import { errorHandler, logger } from './middlewares/app';

const app = express();
const port = 3000;

app.use(cors(), logger);

app.use('/image', imageRouter);

app.use(errorHandler);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
