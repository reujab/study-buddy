import React from "react"
import SetListing from "./SetListing"
import styles from "./styles"
import { ScrollView } from "react-native"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"

export default observer(class HomeScreen extends React.Component {
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
})
