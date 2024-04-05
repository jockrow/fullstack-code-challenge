import request from 'supertest';
import app from '../app';
import pool from '../db/db';

jest.mock('../db/db', () => ({
	query: jest.fn(),
}));

describe('Answer Controller', () => {
	describe('PUT /answers/:id', () => {
		it('should edit a user answer', async () => {
			const mockUpdatedAnswer = { id: 1, answer: 'Updated answer 1' };

			(pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUpdatedAnswer] });

			const res = await request(app)
				.put('/answers/1')
				.send({ answer: 'Updated answer 1' });

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual(mockUpdatedAnswer);
		});

		it('should handle internal server error', async () => {
			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			const res = await request(app)
				.put('/answers/1')
				.send({ answer: 'Updated answer 1' });

			expect(res.statusCode).toBe(500);

			// Restore the original console.error
			consoleErrorMock.mockRestore();
			expect(res.body).toEqual({ error: 'Internal Server Error' });
		});
	});

	describe('DELETE /answers/:id', () => {
		it('should delete a user answer', async () => {
			(pool.query as jest.Mock).mockResolvedValueOnce();

			const res = await request(app)
				.delete('/answers/1');

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual({ message: 'User answer deleted successfully' });
		});

		it('should handle internal server error', async () => {
			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			const res = await request(app)
				.delete('/answers/1');

			expect(res.statusCode).toBe(500);
			expect(res.body).toEqual({ error: 'Internal Server Error' });

			// Restore the original console.error
			consoleErrorMock.mockRestore();
		});
	});

	describe('GET /answers/:userId', () => {
		// describe('GET /answers/', () => {
		it('should return user answers', async () => {
			const mockUserAnswers = [
				{ id: 1, answer: 'Answer 1', user_id: 1 },
				{ id: 2, answer: 'Answer 2', user_id: 1 },
			];

			(pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockUserAnswers });

			const res = await request(app).get('/answers/1');

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual(mockUserAnswers);
		});

		it('should handle internal server error', async () => {
			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			const res = await request(app).get('/answers/1');

			expect(res.statusCode).toBe(500);
			expect(res.body).toEqual({ error: 'Internal Server Error' });

			// Restore the original console.error
			consoleErrorMock.mockRestore();
		});
	});

});
