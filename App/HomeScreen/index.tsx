import React from "react"
import SetListing from "./SetListing"
import { ScrollView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
})

@observer
export default class HomeScreen extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			(
				<ScrollView style={styles.container}>
					{this.context.sets.map((set) => (
						<SetListing key={set.id} set={set} />
					))}
				</ScrollView>
			)
		)
	}
}
