import "react-native-gesture-handler"

import Details from "./Details"
import React from "react"
import SetListing from "./SetListing"
import styles from "./styles"
import { NavigationContainer } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import sets from "./exampleSets"
import { StatusBar, View, Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export default class App extends React.Component {
	state = {
		set: null,
	}

	render() {
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
								<ScrollView style={{ flex: 1 }}>
									{sets.map((set) => (
										<SetListing
											key={set.id}
											onPress={() => {
												this.setState({ set })
												navigation.navigate("details")
											}}
										>
											{set}
										</SetListing>
									))}
								</ScrollView>
							)}
						</Stack.Screen>
						<Stack.Screen name="details" options={{ title: this.state.set && this.state.set.title }}>
							{({ navigation }) => (
								<Details onStudy={() => { navigation.navigate("set") }} set={this.state.set} />
							)}
						</Stack.Screen>
						<Stack.Screen name="set">
							{({ navigation }) => (
								<Text>{this.state.set.title}</Text>
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}
