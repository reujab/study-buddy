import React from "react"
import SetListing from "./SetListing"
import { context, RootStore } from "../RootStore"
import { ScrollView } from "react-native-gesture-handler"
import { observer } from "mobx-react"

@observer
export default class HomeScreen extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			(
				<ScrollView style={{ flex: 1 }}>
					{this.context.sets.map((set) => (
						<SetListing key={set.id} set={set} />
					))}
				</ScrollView>
			)
		)
	}
}
