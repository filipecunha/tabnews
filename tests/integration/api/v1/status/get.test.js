test('Get to /api/v1/status deve retornar 200', async () => {
	const res = await fetch('http://localhost:3000/api/v1/status');

	expect(res.status).toBe(200);

	const responseBody = await res.json();

	// Testando o formato da resposta update_at
	expect(responseBody.updated_at).toBeDefined();

	new Date(responseBody.updated_at).toISOString(); // Verifica se é uma data válida

	expect(responseBody.dependencies.database.version).toEqual('16.0');
	expect(responseBody.dependencies.database.max_connections).toEqual(100);
	expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

test('SQL injection', async () => {});
