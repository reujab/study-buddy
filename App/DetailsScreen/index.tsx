import Cards from "./Cards"
import React from "react"
import { ScrollView, View } from "react-native"
import { Set } from "../types"

export default class Details extends React.Component<{
	set: Set
}> {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					{/* TODO */}
				</ScrollView>
				<View>
					<Cards set={this.props.set} />
				</View>
			</View>
		)
	}
}
