import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import { create, feed, remove, update } from '../controllers/users.controller';
import AppError from '../errors/AppError';
import Users from '../models/Users';

const usersRoutes = Router();

const upload = multer(uploadConfig);

usersRoutes.post('/create', create);
usersRoutes.patch('/update/:id', update);
usersRoutes.delete('/remove/:id', remove);
usersRoutes.get('/feed', feed);
usersRoutes.put('/avatar/:id', upload.single('avatar'), async (req, res) => {
    if(req.file) {
        res.json(req.file);
        const userRepo = getRepository(Users);
        const {id} = req.params;

        const user = await userRepo.findOne({
            where: {
                id
            }
        })

        if(!user){
            throw new AppError('User Not Founded!',400);
        }

        user.avatar = req.file.filename;

        await userRepo.save(user);
    }
    else throw 'error';
});


export default usersRoutes;
