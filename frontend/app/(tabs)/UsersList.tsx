import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from 'react-native';
import appState from '@/utils/mobx';
import userService from '@/services/userService';
import { Link } from 'expo-router';

//TODO: Quitar todos los archivos .old
const UsersList: React.FC = observer(() => {
	const colorScheme = useColorScheme();

	useEffect(() => {
		userService.getUsers();
	}, []);

	const handleUserSelect = (userId: number) => {
		appState.setCurrentUser(userId);
	};

	return (
		<View>
			{appState.users.length === 0 ? (
				<Text>
					Users not exist, must to create directly in Postgresql database, and refresh this page
					<br /><b>Example:</b>
					<br />INSERT INTO users (name, email) VALUES
					<br />'Richard Martinez', 'r.martinezdk@gmail.com'),
					<br />'Homer Simpson', 'homer@hotmail.com'),
					<br />'Lionel Messi', 'messi@hotmail.com');
				</Text>
			) : (
				appState.users.map((user) => (
					<View key={user.id} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
						<Link key={user.id} href={`/AnswersList`} asChild>
							<Pressable>
								{({ pressed }) => (
									<div title="Watch Answers for this User">
										<FontAwesome
											onClick={() => handleUserSelect(user.id)}
											name="lightbulb-o"
											size={25}
											color={Colors[colorScheme ?? 'light'].text}
											style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
										/>
									</div>
								)}
							</Pressable>
						</Link>

						<FontAwesome
							name="user"
							size={25}
							color={Colors[colorScheme ?? 'light'].text}
							style={{ marginRight: 15, opacity: 0.5 }}
						/>
						<Text>{user.name}</Text>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<FontAwesome
							name="envelope"
							size={25}
							color={Colors[colorScheme ?? 'light'].text}
							style={{ marginRight: 15, opacity: 0.5 }}
						/>
						<Text>{user.email}</Text>
					</View>
				))
			)}
		</View >
	);
});

export default UsersList;
