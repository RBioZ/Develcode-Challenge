import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Users from '../models/Users';


const create = async (req: Request, res: Response): Promise<Response> => {

	const {
		name,
		birth_date,
		code,
	} = req.body;

	const usersRepository = getRepository(Users);

	const user = await usersRepository.create({
		name,
		code,
		birth_date
	});
	
	await usersRepository.save(user)

	return res.json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {

	const {
		name,
		birth_date,
		code,
	} = req.body;

	const {id} = req.params;

	const usersRepository = getRepository(Users);

	const user = await usersRepository.findOne({
		where: {
			id: id
		}
	})

	if(!user){
		throw new AppError('User Not Founded!', 400);
	}
	
	if(name) user.name = name;
	if(code) user.code = code;
	if(birth_date) user.birth_date = birth_date;

	await usersRepository.save(user)

	return res.json(user);
};

const remove = async (req: Request, res: Response): Promise<Response> => {

	const {id} = req.params;

	const usersRepository = getRepository(Users);

	const user = await usersRepository.findOne({
		where: {
			id: id
		}
	})

	if(!user){
		throw new AppError('User Not Founded!', 400);
	}

	await usersRepository.remove(user);

	return res.json(user);
};

const feed = async (req: Request, res: Response): Promise<Response> => {

	const {page} = req.query;

	const usersRepository = getRepository(Users);

	const user = await usersRepository.find({

		skip: 5 * Number(page)
	})

	return res.json(user);
};

export { create, update, remove, feed };

