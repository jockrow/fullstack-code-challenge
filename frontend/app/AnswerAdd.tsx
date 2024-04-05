import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import answerService from '@/services/answerService';
import { Answer } from '@/models/answer';
import appState from '@/utils/mobx';
import QuestionsSelection from '@/components/QuestionsSelection';
import { handleError } from '@/utils/handleError';

// TODO: poner preungtas de ${usuario}
const AddAnswerScreen: React.FC = observer(() => {
	const [answerText, setAnswerText] = useState('');
	const [selectedQuestion, setSelectedQuestion] = useState('');
	const currentUser = appState.getCurrentUser();

	// TODO: No crear respuesta repetida
	useEffect(() => {
		answerService.getAnswersByUser(currentUser.id);
	}, []);

	const handleSelectQuestion = (questionId: string) => {
		setSelectedQuestion(questionId);
	};

	const handleCreateAnswer = async (): Promise<void> => {
		if (answerText.trim() == "") {
			alert('Please enter a answer');
			return;
		}

		if (selectedQuestion == "") {
			alert('Please select a question');
			return;
		}

		const newAnswer: Answer = {
			id: 0,
			userId: currentUser.id,
			questionId: parseInt(selectedQuestion),
			answer: answerText
		};

		try {
			await answerService.createAnswer(newAnswer);
			// Clear the input fields after successful creation, to prepare to another posible answer
			setAnswerText('');
			//TODO: Limpiar el combo después de crear o enviarlo a la lista de respuesstas
			setSelectedQuestion('');
			alert('Answer created successfully');
		} catch (error) {
			handleError(error, 'Failed to create answer. Please try again.');
		}
	};

	return (
		<View style={{ width: '60%', alignSelf: 'center' }}>
			<Text style={{ marginBottom: 10 }}>Add a New Answer:</Text>
			{/* TODO:Ponerlo mejor apariencia para que paresca campo de texto */}

			<TextInput
				style={{ borderWidth: 1, width: 500, borderColor: 'gray', padding: 10, marginBottom: 10, backgroundColor: 'white' }}
				placeholder="Enter your answer..."
				placeholderTextColor="#999"
				maxLength={255}
				value={answerText}
				onChangeText={setAnswerText}
			/>
			<QuestionsSelection onSelectQuestion={handleSelectQuestion} />
			<Button title="Create Answer" onPress={handleCreateAnswer} />
		</View >
	);
});

export default AddAnswerScreen;

