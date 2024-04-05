import { Response } from 'express';

/**
 * Handles errors and displays coder-friendly error messages based on error status code.
 * @param res The Response when api was invoked
 * @param message An optional custom error message to display along with the error details.
 */
export const handleError = (res: Response, message?: string): void => {
	console.error(message);
	res.status(500).json({ error: 'Internal Server Error' });
};
