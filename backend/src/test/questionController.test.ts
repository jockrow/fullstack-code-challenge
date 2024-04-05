import request from 'supertest';
import app from '../app';

// Import the pool from the mock file
import pool from '../db/db';

jest.mock('../db/db', () => ({
	query: jest.fn(),
}));

describe('Question Controller', () => {
	describe('GET /questions', () => {
		it('should return all questions', async () => {
			const mockQuestions = [{ id: 1, question: 'Test question 1' }];

			(pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockQuestions });

			const res = await request(app).get('/questions');
			expect(res.statusCode).toBe(200);
			expect(res.body.length).toBe(1);
		});
	});

	describe('PUT /questions/:id', () => {
		it('should edit a question', async () => {
			const mockUpdatedQuestion = { id: 1, question: 'Updated question 1' };

			(pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1, rows: [mockUpdatedQuestion] });

			const res = await request(app)
				.put('/questions/1')
				.send({ question: 'Updated question 1' });

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual(mockUpdatedQuestion);
		});

		it('should return 404 if question does not exist', async () => {
			(pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

			const res = await request(app)
				.put('/questions/999')
				.send({ question: 'Updated question 999' });

			expect(res.statusCode).toBe(404);
			expect(res.body).toEqual({ error: 'Question not found' });
		});

		it('should handle internal server error', async () => {
			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			const res = await request(app)
				.put('/questions/1')
				.send({ question: 'Updated question 1' });

			expect(res.statusCode).toBe(500);
			expect(res.body).toEqual({ error: 'Internal Server Error' });

			// Restore the original console.error
			consoleErrorMock.mockRestore();
		});
	});

	describe('DELETE /questions/:id', () => {
		it('should delete a question', async () => {
			(pool.query as jest.Mock).mockResolvedValueOnce();

			const res = await request(app)
				.delete('/questions/1');

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual({ message: 'Question deleted successfully' });
		});

		//TODO: test duplicated data
		it('should handle internal server error', async () => {
			// Mock console.error to do nothing
			const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

			(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

			const res = await request(app)
				.delete('/questions/1');

			expect(res.statusCode).toBe(500);
			expect(res.body).toEqual({ error: 'Internal Server Error' });

			// Restore the original console.error
			consoleErrorMock.mockRestore();
		});
	});
});
