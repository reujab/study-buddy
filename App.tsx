import "react-native-gesture-handler"

import React from "react"
import SetList from "./SetList"
import styles from "./styles"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" />
				<Stack.Navigator
					screenOptions={{
						headerStyle: [styles.shadow, {
							backgroundColor: "#5856d6",
							borderBottomLeftRadius: 8,
							borderBottomRightRadius: 8,
							borderWidth: 0,
							shadowOffset: { width: 0, height: 4 },
						}],
						headerTintColor: "white",
					}}
				>
					<Stack.Screen name="Study Buddy">
						{({ navigation }) => (
							<View style={{ flex: 1 }}>
								<SetList
									description="Description"
									onPress={() => navigation.navigate("Details")}
									title="Title"
								/>
							</View>
						)}
					</Stack.Screen>
					<Stack.Screen name="Details">
						{({ navigation }) => <View></View>}
					</Stack.Screen>
				</Stack.Navigator>
			</View>
		</NavigationContainer>
	)
}
