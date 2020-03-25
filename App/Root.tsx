import DetailsScreen from "./DetailsScreen"
import EditSetScreen from "./EditSetScreen"
import HomeScreen from "./HomeScreen"
import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import styles from "./styles"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View } from "react-native"
import { TSet } from "./types"
import { connect } from "react-redux"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

class Root extends React.Component<{
	set: TSet,
}> {
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
							component={HomeScreen}
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
						/>
						<Stack.Screen
							name="edit-set"
							component={EditSetScreen}
							options={{
								// TODO: dynamically change to "New Set" or "Edit Set"
								title: "Edit Set"
							}}
						/>
						<Stack.Screen
							name="details"
							component={DetailsScreen}
							options={{
								title: this.props.set && this.props.set.title,
							}}
						/>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}

export default connect(
	(state) => ({
		set: state.app.set,
	}),
)(Root)