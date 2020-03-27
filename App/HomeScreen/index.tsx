import React from "react"
import SetListing from "./SetListing"
import { ISet } from "../types"
import { IState } from "../store"
import { ScrollView } from "react-native-gesture-handler"
import { connect } from "react-redux"

class HomeScreen extends React.Component<{
	sets: ISet[]
}> {
	render(): JSX.Element {
		return (
			(
				<ScrollView style={{ flex: 1 }}>
					{this.props.sets.map((set) => (
						<SetListing key={set.id} set={set} />
					))}
				</ScrollView>
			)
		)
	}
}

export default connect(
	(state: IState) => ({
		sets: state.app.sets,
	}),
)(HomeScreen)
