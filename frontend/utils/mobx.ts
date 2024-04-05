import { makeAutoObservable } from 'mobx';
import { User } from '@/models/user';
import { Question } from '@/models/question';
import { Answer } from '@/models/answer';

class AppState {
	users: User[] = [];
	currentUser?: User; // Optional, for storing the currently selected user
	questions: Question[] = [];
	answers: Answer[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCurrentUser(id: number) {
		const user = this.users.find(user => user.id === id);
		this.currentUser = user;
	}

	public getCurrentUser(): User {
		return this.currentUser;
	}

}

const appState = new AppState();
export default appState;
