declare namespace Express {
	export interface Request {
		business: {
			id: string;
		};
		file: {
			fieldname: string;
			originalname: string;
			encoding: string;
			mimetype: string;
			destination: string;
			filename: string;
			path: string;
			size: number;
			key: string;
			location: string;
		};
	}
}
