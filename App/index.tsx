import "react-native-gesture-handler"

import Details from "./Details"
import HomeScreen from "./HomeScreen"
import React from "react"
import RxDB from "rxdb"
import styles from "./styles"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

RxDB.plugin(require('pouchdb-adapter-asyncstorage'))

export default class App extends React.Component {
	state = {
		db: null,
		set: null,
	}

	constructor(props) {
		super(props)

		RxDB.create({
			name: "studybuddy",
			adapter: "asyncstorage",

			// prevents errors on fast reload
			ignoreDuplicate: true,

			// won't work without this
			multiInstance: false,
		}).then((db) => {
			this.setState({ db })
		})
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
						<Stack.Screen name="Study Buddy">
							{({ navigation }) => (
								<HomeScreen onSelect={(set) => {
									this.setState({ set })
									navigation.navigate("details")
								}} />
							)}
						</Stack.Screen>
						<Stack.Screen
							name="details"
							options={{
								title: this.state.set && this.state.set.title
							}}
						>
							{({ navigation }) => (
								<Details set={this.state.set} />
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		)
	}
}
