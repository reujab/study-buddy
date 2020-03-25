import Card from "./Card"
import Carousel from "react-native-snap-carousel"
import React from "react"
import { Dimensions, Platform, View } from "react-native"
import { ISet } from "../../types"
import { connect } from "react-redux"

class Cards extends React.Component<{
	set: ISet
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
					renderItem={({ item }) => (
						<Card>{item.front}</Card>
					)}

					// prevents the subviews from not being rendered on iOS
					// https://github.com/archriss/react-native-snap-carousel/issues/238
					removeClippedSubviews={Platform.OS !== "ios"}
				/>
			</View>
		)
	}
}

export default connect(
	(state: any) => ({
		set: state.app.set,
	}),
)(Cards)
