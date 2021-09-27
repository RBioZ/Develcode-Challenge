import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';
import routes from './routes';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files',express.static(uploadConfig.directory));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	console.log(err);

	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(PORT, () => {
	console.log(`\n🚀 Server started on port ${PORT}!`);
});
