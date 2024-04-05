import { Request, Response } from 'express';
import pool from '../db/db';
import { handleError } from '../utils/handleError';

export const createUserAnswer = async (req: Request, res: Response): Promise<void> => {
	const { userId, questionId, answer } = req.body;
	try {
		const result = await pool.query('INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING *', [userId, questionId, answer]);
		res.status(201).json(result.rows[0]);
	} catch (error: any) {
		if (error.code === '23505') {
			res.status(404).json({ error: 'This answer for the question selected already exists' });
		} else {
			handleError(res, 'Error creating answer:');
		}
	}
};

export const editUserAnswer = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { answer } = req.body;
	try {
		const result = await pool.query('UPDATE answers SET answer = $1 WHERE id = $2 RETURNING *', [answer, id]);
		res.json(result.rows[0]);
	} catch (error: any) {
		if (error.code === '23505') {
			res.status(404).json({ error: 'This answer for the question selected already exists, you can created a new Answer' });
		} else {
			handleError(res, 'Error creating answer:');
		}
	}
};

export const deleteUserAnswer = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM answers WHERE id = $1', [id]);
		res.json({ message: 'User answer deleted successfully' });
	} catch (error) {
		handleError(res, 'Error deleting user answer:');
	}
};

// TODO: Filtrar las respuestas excepto las que existan, puede ser un TEST
export const getUserAnswers = async (req: Request, res: Response): Promise<void> => {
	const { userId } = req.params;
	try {
		const result = await pool.query('SELECT * FROM answers WHERE user_id = $1', [userId]);
		res.json(result.rows);
	} catch (error) {
		handleError(res, 'Error getting user answers:');
	}
};
