import Carousel from "react-native-snap-carousel"
import FlipCard from "react-native-flip-card"
import React from "react"
import { Dimensions, Platform, Text, View } from "react-native"
import { Set } from "../types"

interface Props {
	set: Set
}

export default class Cards extends React.Component<Props> {
	carousel = null

	render() {
		return (
			<View
				style={{
					height: 0.75 * Dimensions.get("window").width + 16,
				}}
			>
				<Carousel
					data={this.props.set.cards}
					itemWidth={0.75 * Dimensions.get("window").width}
					ref={(c) => { this.carousel = c }}
					removeClippedSubviews={Platform.OS !== "ios"}
					renderItem={({ item }) => (
						<FlipCard>
							<Card>{item.front}</Card>
							<Card>{item.back}</Card>
						</FlipCard>
					)}
					sliderWidth={Dimensions.get("window").width}
				/>
			</View>
		)
	}
}

class Card extends React.Component {
	render() {
		return (
			<View
				style={{
					alignItems: "center",
					flex: 1,
					justifyContent: "center",
				}}
			>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "white",
						borderColor: "lightgray",
						borderRadius: 20,
						borderWidth: 1,
						height: 0.75 * Dimensions.get("window").width,
						justifyContent: "center",
						padding: 20,
						shadowColor: "lightgray",
						shadowOpacity: 1,
						shadowRadius: 3,
						width: 0.75 * Dimensions.get("window").width,
					}}
				>
					<Text style={{ fontSize: 32 }} >{this.props.children}</Text>
				</View>
			</View>
		)
	}
}
