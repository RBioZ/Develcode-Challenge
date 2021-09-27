const production = {
	type: `postgres`,
	url: `${process.env.DATABASE_URL}`,
	entities: [`./dist/models/*.js`],
	migrations: [`./dist/database/migrations/*.js`],
	cli: { migrationsDir: `./dist/database/migrations` },
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
};

const development = {
	type: `postgres`,
	url: `${process.env.DATABASE_URL}`,
	entities: [`./src/models/*.ts`],
	migrations: [`./src/database/migrations/*.ts`],
	cli: { migrationsDir: `./src/database/migrations` },
};

module.exports =
	process.env.NODE_ENV === 'production' ? production : development;
