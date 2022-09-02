import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '../../container/index';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import { createConnection } from '../typeorm/index';
import { router } from './routes/index';
import raterLimiter from './middlewares/raterLimiter';

createConnection();

const app = express();
app.use(raterLimiter);
app.use(express.json());
// app.use((request: Request, response: Response, next: NextFunction)=>{
//   response.header('Acess-Control-Allow-Credentials', 'true');
//   response.header('Access-Control-Allow-Origin', '*');  
//   response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
//   response.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   app.use(cors());
//   next();
// });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(process.env.PORT, () => console.log('Running'));
