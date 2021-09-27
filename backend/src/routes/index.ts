import { Router } from 'express';
import users from './users.routes';

const routes = Router();

routes.use('/users', users);

routes.get('/', (request, response) =>
	response.json({
		name: 'Api',
		version: '1.0.0',
	}),
);



export default routes;
