import { action } from 'mobx';
import api from '@/utils/api';
import appState from '@/utils/mobx';
import { Answer } from '@/models/answer';

class AnswerService {
	@action
	async getAnswersByUser(userId: number): Promise<void> {
		try {
			const response = await api.get<Answer[]>(`/answers/${userId}`);
			appState.answers = response.data;
		} catch (error) {
			throw error;
		}
	}

	@action
	async createAnswer(newAnswer: Answer): Promise<void> {
		try {
			const response = await api.post<Answer>('/answers', newAnswer);
			appState.answers.push(response.data);
		} catch (error) {
			throw error;
		}
	}

	@action
	async editAnswer(answer: Answer): Promise<void> {
		try {
			const response = await api.put<Answer>(`/answers/${answer.id}`, answer);
			const index = appState.answers.findIndex(q => q.id === answer.id);
			if (index !== -1) {
				appState.answers[index] = response.data;
			}
		} catch (error) {
			throw error;
		}
	}

	@action
	async deleteAnswer(answerId: number): Promise<void> {
		try {
			await api.delete(`/answers/${answerId}`);
			appState.answers = appState.answers.filter(answer => answer.id !== answerId);
		} catch (error) {
			throw error;
		}
	}

}

const answerService = new AnswerService();
export default answerService;
