import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import carRoute from './routes/Cars';
import motorcycleRoute from './routes/Motorcycle';

const app = express();

app.use(express.json());
app.use('/cars', carRoute);
app.use('/motorcycles', motorcycleRoute);
app.use(errorMiddleware);

export default app;
