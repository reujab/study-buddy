import DetailsScreen from "./DetailsScreen"
import DetailsScreenHeaderRight from "./DetailsScreen/HeaderRight"
import EditSetScreen from "./EditSetScreen"
import HomeScreen from "./HomeScreen"
import HomeScreenHeaderRight from "./HomeScreen/HeaderRight"
import React from "react"
import StudyScreen from "./StudyScreen"
import commonStyles from "./commonStyles"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View, StyleSheet } from "react-native"
import { context, RootStore } from "./RootStore"
import { createStackNavigator } from "@react-navigation/stack"
import { observer } from "mobx-react"

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stack = createStackNavigator()
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#5856d6",
		shadowOffset: { width: 0, height: 4 },
	},
})

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
							headerStyle: [commonStyles.shadow, styles.header],
							headerTintColor: "white",
						}}
					>
						<Stack.Screen
							name="home-screen"
							component={HomeScreen}
							options={{
								title: "Study Buddy",
								headerRight: () => <HomeScreenHeaderRight />,
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
								title: this.context.selectedSet?.title,
								headerRight: () => <DetailsScreenHeaderRight />,
							}}
						/>
						<Stack.Screen
							name="study"
							component={StudyScreen}
							options={{
								title: "Study",
							}}
						/>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}
