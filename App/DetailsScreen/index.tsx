import Cards from "./Cards"
import React from "react"
import { ScrollView, View } from "react-native"

export default class Details extends React.Component {
	render(): JSX.Element {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					{/* TODO */}
				</ScrollView>
				<View>
					<Cards />
				</View>
			</View>
		)
	}
}
