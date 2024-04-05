import { action } from 'mobx';
import api from '@/utils/api';
import appState from '@/utils/mobx';
import { User } from '@/models/user';

class UserService {
	@action
	async getUsers(): Promise<void> {
		try {
			const response = await api.get<User[]>('/users');
			appState.users = response.data;
		} catch (error) {
			throw error;
		}
	}
}

const userController = new UserService();
export default userController;
