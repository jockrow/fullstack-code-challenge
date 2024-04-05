import { Request, Response } from 'express';
import pool from '../db/db';
import { User } from '../models/user';
import { handleError } from '../utils/handleError';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const result = await pool.query<User>('SELECT * FROM users ORDER BY name');
		const users: User[] = result.rows;
		res.json(users);
	} catch (error) {
		handleError(res, 'Error getting users:');
	}
};
