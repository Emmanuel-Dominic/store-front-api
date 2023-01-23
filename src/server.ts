import express, {
    type Request,
    type Response,
    type Application,
    type NextFunction,
    type ErrorRequestHandler,
} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError from 'http-errors';
import { config } from 'dotenv-safe';
import { type Error } from './services/index';
import userRouter from './handlers/users';
import productRouter from './handlers/products';
import orderRouter from './handlers/orders';

config();

const PORT = process.env.PORT ?? 3000;

const app: Application = express();
const address = `0.0.0.0:${PORT}`;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200);
    res.json({ message: 'Welcome to the home page!' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound('Route not found!'));
});

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status ?? 500);
    res.json({ message: err.message });
};

app.use(errorHandler);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
