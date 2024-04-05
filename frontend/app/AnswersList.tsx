import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import appState from '@/utils/mobx';
import answerService from '@/services/answerService';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Answer } from '@/models/answer';
import { handleError } from '@/utils/handleError';

// TODO: controlar el refresco de la lista
const AnswersList: React.FC = observer(() => {
	const colorScheme = useColorScheme();
	const [questionMap, setQuestionMap] = useState<Record<number, string>>({});
	const currentUser = appState.currentUser;

	useEffect(() => {
		let currentUser = appState.getCurrentUser();
		answerService.getAnswersByUser(currentUser.id);
		const newQuestionMap: Record<number, string> = {};
		appState.questions.forEach((question) => {
			newQuestionMap[question.id] = question.question;
		});

		setQuestionMap(newQuestionMap);
	}, []);

	const handleAnswerEdit = async (answerId: number) => {
		const answerText = prompt("Edit the current answer:");


		if (answerText != null) {
			if (answerText.trim() != "") {
				// set userId and questionId in zero because only edit the answer
				const currentAnswer: Answer = {
					id: answerId,
					user_id: 0,
					question_id: 0,
					answer: answerText
				};
				try {
					await answerService.editAnswer(currentAnswer);
					alert('Answer edited successfully');
				} catch (error) {
					handleError(error, 'Error editing answer');
				}
			}
			else {
				alert("Must type a answer");
			}
		}
	};



	const handleAnswerSelect = async (answerId: number) => {
		const confirmDelete = confirm("Are you sure that you want delete this answer?");

		if (confirmDelete) {
			try {
				await answerService.deleteAnswer(answerId);
				alert('Answer deleted successfully');
			} catch (error) {
				handleError(error, 'Failed to deleted answer. Please try again.');
			}
		}
	};

	return (
		<View>
			<Text>Answers for {currentUser?.name}</Text>
			<Link href="/AnswerAdd" asChild>
				<Pressable>
					{({ pressed }) => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
								Add Answer
							</Text>
						</View>
					)}
				</Pressable>
			</Link>
			{appState.answers.length === 0 ? (
				<Text>This user doesn't have Answers</Text>
			) : (
				appState.answers.map((answer) => {
					return (
						<View key={answer.id} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
							<Pressable>
								{({ pressed }) => (
									<div title="Edit this Answer">
										<FontAwesome
											onClick={() => handleAnswerEdit(answer.id)}
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
									<div title="Delete this Answer">
										<FontAwesome
											onClick={() => handleAnswerSelect(answer.id)}
											name="trash"
											size={25}
											color={Colors[colorScheme ?? 'light'].text}
											style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
										/>
									</div>
								)}
							</Pressable>
							<FontAwesome
								name="lightbulb-o"
								size={25}
								color={Colors[colorScheme ?? 'light'].text}
								style={{ marginRight: 15, opacity: 0.5 }}
							/>
							<Text>{answer.answer}</Text>
							&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
							<FontAwesome
								name="question"
								size={25}
								color={Colors[colorScheme ?? 'light'].text}
								style={{ marginRight: 15, opacity: 0.5 }}
							/>
							<Text>{questionMap[answer.question_id]}</Text>
						</View>
					);
				}
				))
			}
		</View>
	);
});

export default AnswersList;
