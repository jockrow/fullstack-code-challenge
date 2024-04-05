import request from 'supertest';
import app from '../app';
import pool from '../db/db';

jest.mock('../db/db', () => ({
	query: jest.fn(),
}));

describe('User Controller', () => {
	describe('GET /users', () => {
		it('should return all users', async () => {
			const mockUsers = [
				{ id: 1, name: 'User 1', email: 'user1@example.com' },
				{ id: 2, name: 'User 2', email: 'user2@example.com' },
			];

			(pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockUsers });

			const res = await request(app).get('/users');

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual(mockUsers);
		});

		it('should handle internal server error', async () => {

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			const res = await request(app).get('/users');
			expect(res.statusCode).toBe(500);
			expect(res.body).toEqual({ error: 'Internal Server Error' });

			// Restore the original console.error
			consoleErrorMock.mockRestore();
		});
	});
});
