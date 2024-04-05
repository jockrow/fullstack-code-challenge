type ErrorResponse = {
	status: number;
	message: string;
};

const errorResponses: ErrorResponse[] = [
	{ status: 401, message: 'Unauthorized. Please log in.' },
	{ status: 404, message: 'Resource not found.' },
	{ status: 500, message: 'An unexpected error occurred. Please try again later.' },
];

/**
 * Handles errors and displays user-friendly error messages based on error status code.
 * @param error The error object to be handled.
 * @param message An optional custom error message to display along with the error details.
 */
export const handleError = (error: any, message?: string): void => {
	let errorMessage = `An error occurred: ${error.message}`;
	if (message) {
		errorMessage = message;
	}

	console.error('Error:', error);

	// If the error is a known status, handle it with a custom message
	if (error.response && error.response.status) {
		const statusCode = error.response.status;
		const errorResponse = errorResponses.find((response) => response.status === statusCode);

		if (errorResponse) {
			errorMessage = errorResponse.message;
		}
	}

	if (error.response.status) {
		alert(error.response.data.error);
	}
	else {
		alert(errorMessage);
	}
};
