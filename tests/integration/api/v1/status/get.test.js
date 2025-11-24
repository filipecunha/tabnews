test('Get to /api/v1/status deve retornar 200', async () => {
	const res = await fetch('http://localhost:3000/api/v1/status');

	expect(res.status).toBe(200);
});
