import database from 'infra/database.js';
import { version } from 'react';

async function status(req, res) {
	const updatedAt = new Date().toISOString();

	var databaseVersionResult = await database.query('SHOW server_version;');
	var databaseMaxConnectionsResult = await database.query(
		'SHOW max_connections;',
	);

	var databaseOpenedConnectionsResult = await database.query({
		text: `SELECT * FROM pg_stat_activity WHERE datname = $1;`,
		values: [process.env.POSTGRES_DB],
	});

	databaseVersionResult = databaseVersionResult.rows[0].server_version;
	databaseMaxConnectionsResult =
		databaseMaxConnectionsResult.rows[0].max_connections;
	databaseOpenedConnectionsResult = databaseOpenedConnectionsResult.rows.length;

	console.log(databaseOpenedConnectionsResult);
	console.log('----');

	res.status(200).json({
		updated_at: updatedAt,
		dependencies: {
			database: {
				version: databaseVersionResult,
				max_connections: parseInt(databaseMaxConnectionsResult),
				opened_connections: databaseOpenedConnectionsResult,
			},
		},
	});
}

export default status;
