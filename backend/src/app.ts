import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import questionRoutes from './routes/questionRoutes';
import answerRoutes from './routes/answerRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);


// Error Handling Middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
};

app.use(errorHandler);

export default app;
