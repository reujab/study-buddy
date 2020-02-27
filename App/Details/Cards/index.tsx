import Carousel from "react-native-snap-carousel"
import FlipCard from "react-native-flip-card"
import React from "react"
import styles from "../../styles"
import { Dimensions, Platform, Text, View } from "react-native"
import { Set } from "../../types"

export default class Cards extends React.Component<{
	set: Set
}> {
	carousel = null

	render() {
		return (
			<View
				style={{
					height: 0.75 * Dimensions.get("window").width + 16,
					// FIXME
					marginBottom: 40,
				}}
			>
				<Carousel
					ref={(c) => { this.carousel = c }}
					data={this.props.set.cards}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={0.75 * Dimensions.get("window").width}
					removeClippedSubviews={Platform.OS !== "ios"}
					renderItem={({ item }) => (
						// FIXME: doesn't render properly on Android
						<FlipCard>
							<Card>{item.front}</Card>
							<Card>{item.back}</Card>
						</FlipCard>
					)}
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
					style={[styles.shadow, {
						alignItems: "center",
						backgroundColor: "white",
						borderColor: "lightgray",
						borderRadius: 20,
						borderWidth: 1,
						height: 0.75 * Dimensions.get("window").width,
						justifyContent: "center",
						padding: 20,
						width: 0.75 * Dimensions.get("window").width,
					}]}
				>
					<Text style={{ fontSize: 32 }}>{this.props.children}</Text>
				</View>
			</View>
		)
	}
}
