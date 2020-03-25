import React from "react"
import SetListing from "./SetListing"
import { ScrollView } from "react-native-gesture-handler"
import { TSet } from "../types"
import { connect } from "react-redux"

class HomeScreen extends React.Component<{
	sets: TSet[]
}> {
	render() {
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
	(state: any) => ({
		sets: state.app.sets,
	}),
)(HomeScreen)
