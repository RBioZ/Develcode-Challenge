import aws from 'aws-sdk';
import crypto from 'crypto';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import AppError from '../errors/AppError';

export const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_DEFAULT_REGION,
});

const storageTypes = {
	local: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'temp'),
		filename(req, file, callback) {
			const filehash = crypto.randomBytes(10).toString('hex');
			const fileName = `${filehash}.${file.originalname.split('.')[1]}`;
			return callback(null, fileName);
		},
	}),
	s3: multerS3({
		s3,
		bucket: `${process.env.AWS_BUCKET}`,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);

				const fileName = `${hash.toString('hex')}.${
					file.originalname.split('.')[1]
				}`;

				cb(null, fileName);
			});
		},
	}),
};

export default {
	directory: path.resolve(__dirname, '..', '..', 'temp'),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req: any, file: any, cb: any) => {
		const allowedMimes = ['image/jpeg', 'image/png'];

		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new AppError('Invalid file type!', 400));
		}
	},
	storage: storageTypes.local,
};
