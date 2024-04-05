import { Question } from '../models/question';
import api from '../api'; // Import your API instance

class QuestionService {
	async createQuestion(question: Question): Promise<Question> {
		try {
			// Check if the question already exists
			const existingQuestion = await this.getQuestionByContent(question.question);

			if (existingQuestion) {
				throw new Error('Question with this content already exists');
			}

			// If the question doesn't exist, create a new one
			const response = await api.post<Question>('/questions', question);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getQuestionByContent(content: string): Promise<Question | null> {
		try {
			const response = await api.get<Question[]>(`/questions?content=${content}`);
			if (response.data.length > 0) {
				return response.data[0]; // Return the first match if found
			}
			return null;
		} catch (error) {
			throw error;
		}
	}
}

export default new QuestionService();

