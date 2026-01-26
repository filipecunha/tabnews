import database from 'infra/database';

beforeAll(cleanDatabase);

async function cleanDatabase() {
	await database.query(
		'SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = current_database() AND pid <> pg_backend_pid();',
	);

	await new Promise((resolve) => setTimeout(resolve, 500));

	await database.query('drop schema public cascade; create schema public;');

	// Crie a tabela que o node-pg-migrate precisa
	await database.query(`
	      CREATE TABLE pgmigrations (
	          id SERIAL PRIMARY KEY,
	          name VARCHAR(255) NOT NULL,
	          run_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	      );
	  `);
}

test('POST to /api/v1/migrations deve retornar 200', async () => {
	const res1 = await fetch('http://localhost:3000/api/v1/migrations', {
		method: 'POST',
	});

	expect(res1.status).toBe(201);

	const response1Body = await res1.json();
	console.log(response1Body);

	expect(Array.isArray(response1Body)).toBe(true);
	expect(response1Body.length).toBeGreaterThan(0);

	const res2 = await fetch('http://localhost:3000/api/v1/migrations', {
		method: 'POST',
	});

	expect(res2.status).toBe(200);

	const response2Body = await res2.json();
	console.log(response2Body);

	expect(Array.isArray(response2Body)).toBe(true);
	expect(response2Body.length).toBe(0);
});
