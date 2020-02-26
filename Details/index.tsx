import Cards from "./Cards"
import React from "react"
import { Button, Platform, ScrollView, View } from "react-native"
import { Description, Thumbnail, Title } from "../SetListing"
import { Set } from "../types"

interface Props {
	onStudy: () => void
	set: Set,
}

export default class Details extends React.Component<Props> {
	render() {
		return (
			<View
				style={{
					flex: 1,
				}}
			>
				<ScrollView
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							borderRadius: 10,
							display: "flex",
							flexDirection: "row",
							padding: 8,
						}}
					>
						<Thumbnail />
						<View
							style={{
								flexShrink: 1,
							}}
						>
							<Title>{this.props.set.title}</Title>
							<Description>{this.props.set.description}</Description>
						</View>
					</View>
				</ScrollView>
				<View>
					<Cards set={this.props.set} />
					<View
						style={{
							margin: 8,
							backgroundColor: "#007bff",
							borderRadius: 8,
							alignItems: "stretch",
							display: "flex",
						}}
					>
						<Button color={Platform.OS === "ios" ? "white" : "#007bff"} onPress={this.props.onStudy} title="Study" />
					</View>
				</View>
			</View>
		)
	}
}
