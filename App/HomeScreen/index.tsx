import React from "react"
import SetListing from "../SetListing"
import { ScrollView } from "react-native-gesture-handler"
import { Set } from "../types"

export default class MainScreen extends React.Component<{
	onSelect: Function
}> {
	render() {
		return (
			(
				<ScrollView style={{ flex: 1 }}>
					{[{
						id: "id",
						title: "Title",
						description: "Description",
						cards: [
							{
								front: "1",
								back: "2",
							},
							{
								front: "3",
								back: "4",
							}
						],
					} as Set].map((set) => (
						<SetListing
							key={set.id}
							set={set}
							onPress={() => this.props.onSelect(set)}
						/>
					))}
				</ScrollView>
			)
		)
	}
}
