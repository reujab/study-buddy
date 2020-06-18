import DetailsScreen from "./DetailsScreen"
import DetailsScreenHeaderRight from "./DetailsScreen/HeaderRight"
import EditSetScreen from "./EditSetScreen"
import HomeScreen from "./HomeScreen"
import HomeScreenHeaderRight from "./HomeScreen/HeaderRight"
import React from "react"
import RootStore from "./RootStore"
import context from "./context"
import styles from "./styles"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { observer } from "mobx-react"

const Stack = createStackNavigator()

@observer
export default class Root extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
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
							name="home-screen"
							component={HomeScreen}
							options={{
								title: "Study Buddy",
								headerRight: (): JSX.Element => <HomeScreenHeaderRight />,
							}}
						/>
						<Stack.Screen
							name="edit-set"
							component={EditSetScreen}
							options={{
								title: "Edit Set",
							}}
						/>
						<Stack.Screen
							name="details"
							component={DetailsScreen}
							options={{
								title: this.context.selectedSet && this.context.selectedSet.title,
								headerRight: (): JSX.Element => <DetailsScreenHeaderRight />,
							}}
						/>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}
