import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import appState from '@/utils/mobx';
import questionService from '@/services/questionService'
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Question } from '@/models/question';
import { handleError } from '@/utils/handleError';

// TODO:Eliminar todos los console.log que no sirvan
const QuestionsList: React.FC = observer(() => {
	const colorScheme = useColorScheme();

	useEffect(() => {
		questionService.getQuestions();
	}, []);


	const handleQuestionEdit = async (questionId: number) => {
		const questionText = prompt("Edit the current question:");

		if (questionText != null) {
			if (questionText.trim() != "") {
				const currentQuestion: Question = {
					id: questionId,
					question: questionText,
				};
				try {
					await questionService.editQuestion(currentQuestion);
					alert('Question edited successfully');
				} catch (error) {
					handleError(error, 'Error editing question');
				}
			}
			else {
				alert("Must type a question");
			}
		}
	};

	// TODO: Controlar cuando se elimina una pregunta que ya tiene usuarios
	const handleQuestionDelete = async (questionId: number) => {
		const confirmDelete = confirm("Are you sure that you want delete this question?");

		if (confirmDelete) {
			try {
				await questionService.deleteQuestion(questionId);
				alert('Question deleted successfully');
			} catch (error) {
				handleError(error, 'Failed to deleted question. Please try again.');
			}
		}
	};

	return (
		<View>

			<Link href="/QuestionAdd" asChild>
				<Pressable>
					{({ pressed }) => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}> {/* Adjust layout here */}
							<FontAwesome
								name="plus"
								size={25}
								color={Colors[colorScheme ?? 'light'].text}
								style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
							/>
							<Text
								style={{
									color: Colors[colorScheme ?? 'light'].text,
									opacity: pressed ? 0.5 : 1,
								}}
							>
								Add Question
							</Text>
						</View>
					)}
				</Pressable>
			</Link>
			<br />
			{appState.questions.length === 0 ? (
				<Text>Questions not exists</Text>
			) : (
				appState.questions.map((question) => (
					<View key={question.id} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
						<Pressable>
							{({ pressed }) => (
								<div title="Edit this Question">
									<FontAwesome
										onClick={() => handleQuestionEdit(question.id)}
										name="edit"
										size={25}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								</div>
							)}
						</Pressable>
						<Pressable>
							{({ pressed }) => (
								//TODO:VerfiCAR Si se puede poner esto en components
								<div title="Delete this Question">
									<FontAwesome
										onClick={() => handleQuestionDelete(question.id)}
										name="trash"
										size={25}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								</div>
							)}
						</Pressable>
						<Text>{question.question}</Text>
					</View>
				))
			)}
		</View>
	);
});

export default QuestionsList;
