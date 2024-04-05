import { action } from 'mobx';
import api from '@/utils/api';
import appState from '@/utils/mobx';
import { Question } from '@/models/question';

class QuestionService {
	@action
	async getQuestions(): Promise<void> {
		try {
			const response = await api.get<Question[]>('/questions');
			appState.questions = response.data;
		} catch (error) {
			throw error;
		}
	}

	// TODO:Manejar el error de pregunta ya existente
	@action
	async createQuestion(newQuestion: Question): Promise<void> {
		try {
			const response = await api.post<Question>('/questions', newQuestion);
			appState.questions.push(response.data);
		} catch (error) {
			throw error;
		}
	}

	@action
	async editQuestion(question: Question): Promise<void> {
		try {
			const response = await api.put<Question>(`/questions/${question.id}`, question);
			const index = appState.questions.findIndex(q => q.id === question.id);
			if (index !== -1) {
				appState.questions[index] = response.data;
			}
		} catch (error) {
			throw error;
		}
	}

	@action
	async deleteQuestion(questionId: number): Promise<void> {
		try {
			await api.delete(`/questions/${questionId}`);
			appState.questions = appState.questions.filter(question => question.id !== questionId);
		} catch (error) {
			throw error;
		}
	}

}

const questionService = new QuestionService();
export default questionService;
