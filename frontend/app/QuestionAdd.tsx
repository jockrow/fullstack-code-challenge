import React, { useState } from 'react';
import { TextInput, Text, View, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import questionService from '@/services/questionService'
import { Question } from '@/models/question';
import { handleError } from '@/utils/handleError';

const AddQuestionScreen: React.FC = observer(() => {
	const [questionText, setQuestionText] = useState('');

	const handleCreateQuestion = async (): Promise<void> => {
		if (questionText.trim() == "") {
			alert('Please enter a question');
			return;
		}

		const newQuestion: Question = {
			id: 0,
			question: questionText,
		};

		try {
			await questionService.createQuestion(newQuestion);
			// Clear the input field after successful creation, to prepare to another posible question
			setQuestionText('');
			alert('Question created successfully');
		} catch (error) {
			handleError(error, 'Error editing question');
		}
	};

	return (
		<View style={{ width: '60%', alignSelf: 'center' }}>
			<Text style={{ marginBottom: 10 }}>Add a New Question:</Text>
			{/* TODO:Ponerlo mejor apariencia para que paresca campo de texto */}
			<TextInput
				style={{ borderWidth: 1, width: 500, borderColor: 'gray', padding: 10, marginBottom: 10, backgroundColor: 'white' }}
				placeholder="Enter your question..."
				placeholderTextColor="#999"
				maxLength={255}
				value={questionText}
				onChangeText={setQuestionText}
			/>
			<Button title="Create Question" onPress={handleCreateQuestion} />
		</View>
	);
});

export default AddQuestionScreen;

