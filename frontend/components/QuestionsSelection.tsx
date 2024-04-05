import React, { useState, useEffect } from 'react';
import questionService from '@/services/questionService'
import appState from '@/utils/mobx';

interface QuestionsSelectionProps {
	onSelectQuestion: (selectedQuestion: string) => void;
}

function QuestionsSelection({ onSelectQuestion }: QuestionsSelectionProps) {
	const [selectedQuestion, setSelectedQuestion] = useState('');

	useEffect(() => {
		questionService.getQuestions();
	}, []);

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedQuestion(selectedValue);
		onSelectQuestion(selectedValue); // Pass selected question ID to parent
	};

	return (
		<div>
			<label htmlFor="question">Select a question:</label>
			<select id="question" value={selectedQuestion} onChange={handleSelectChange}>
				<option value="">Select...</option>
				{appState.questions.map((question) => (
					<option key={question.id} value={question.id}>
						{question.question}
					</option>
				))}
			</select>
		</div>
	);
}

export default QuestionsSelection;
