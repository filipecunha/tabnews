import { Client } from 'pg';

const query = async (queryObject) => {
	const connectionConfig = {
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USER,
		database: process.env.POSTGRES_DB,
		password: process.env.POSTGRES_PASSWORD,
		ssl: process.env.NODE_ENV === 'production' ? true : false,
	};

	// if (process.env.NODE_ENV === 'development') {
	// 	connectionConfig.ssl = {
	// 		rejectUnauthorized: false,
	// 	};
	// }

	const client = new Client(connectionConfig);

	console.log(`==========================`);
	console.log(`==========================`);
	console.log(`==========================`);

	console.log('Credendenciais POSTGRES:', {
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USER,
		database: process.env.POSTGRES_DB,
		password: process.env.POSTGRES_PASSWORD,
	});

	try {
		await client.connect();
		const result = await client.query(queryObject);
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
	}
};

export default {
	query: query,
};
