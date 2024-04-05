import { Request, Response } from 'express';
import { Question } from '../models/question';
import pool from '../db/db';
import { handleError } from '../utils/handleError';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
	try {
		//TODO: ordenar por nombre sin importar mayusclas minusculas
		const result = await pool.query<Question>('SELECT * FROM questions ORDER BY question');
		const questions: Question[] = result.rows;
		res.json(questions);
	} catch (error) {
		handleError(res, 'Error getting questions:');
	}
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
	const { question } = req.body as Question;
	try {
		const result = await pool.query<Question>('INSERT INTO questions (question) VALUES ($1) RETURNING *', [question]);
		res.status(201).json(result.rows[0]);
	} catch (error: any) {
		if (error.code === '23505') {
			res.status(404).json({ error: 'This question already exists' });
		} else {
			handleError(res, 'Error creating question:');
		}
	}
};

export const editQuestion = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { question } = req.body as { question: string };

	try {
		const result = await pool.query<Question>('UPDATE questions SET question = $1 WHERE id = $2 RETURNING *', [question, id]);

		if (result.rowCount === 0) {
			// If no rows were updated, the question with the given ID doesn't exist
			res.status(404).json({ error: 'Question not found' });
			return;
		}

		res.json(result.rows[0]);
	} catch (error) {
		handleError(res, 'Error editing question:');
	}
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM questions WHERE id = $1', [id]);
		res.json({ message: 'Question deleted successfully' });
	} catch (error) {
		handleError(res, 'Error deleting question:');
	}
};
