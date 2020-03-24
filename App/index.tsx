import "react-native-gesture-handler"

import DetailsScreen from "./DetailsScreen"
import EditSetScreen from "./EditSetScreen"
import HomeScreen from "./HomeScreen"
import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import styles from "./styles"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View } from "react-native"
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
								shadowOffset: { width: 0, height: 4 },

								// borderWidth is set by `styles.shadow`
								borderWidth: 0,
							}],
							headerTintColor: "white",
						}}
					>
						<Stack.Screen
							name="Study Buddy"
							options={({ navigation }) => ({
								headerRight: () => (
									<HeaderButtons HeaderButtonComponent={(props) => (
										<HeaderButton
											IconComponent={Icon}
											iconSize={24}
											color="white"
											{...props}
										/>
									)}>
										<HeaderItem
											title="Add"
											iconName="md-add"
											onPress={() => {
												navigation.navigate("edit-set")
											}}
										/>
									</HeaderButtons>
								),
							})}
						>
							{({ navigation }) => (
								<HomeScreen onSelect={(set) => {
									this.setState({ set })
									navigation.navigate("details")
								}} />
							)}
						</Stack.Screen>
						<Stack.Screen
							name="edit-set"
							options={{
								// TODO: dynamically change to "New Set" or "Edit Set"
								title: "Edit Set"
							}}
						>
							{({ navigation }) => (
								<EditSetScreen />
							)}
						</Stack.Screen>
						<Stack.Screen
							name="details"
							options={{
								title: this.state.set && this.state.set.title,
							}}
						>
							{({ navigation }) => (
								<DetailsScreen set={this.state.set} />
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}
