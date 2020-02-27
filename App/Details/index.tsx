import Cards from "./Cards"
import React from "react"
import { Description, Thumbnail, Title } from "../SetListing"
import { ScrollView, View } from "react-native"
import { Set } from "../types"

export default class Details extends React.Component<{
	set: Set
}> {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					<View
						style={{
							borderRadius: 10,
							display: "flex",
							flexDirection: "row",
							padding: 8,
						}}
					>
						<Thumbnail />
						<View style={{ flexShrink: 1 }}>
							<Title>{this.props.set.title}</Title>
							<Description>{this.props.set.description}</Description>
						</View>
					</View>
				</ScrollView>
				<View>
					<Cards set={this.props.set} />
				</View>
			</View>
		)
	}
}
