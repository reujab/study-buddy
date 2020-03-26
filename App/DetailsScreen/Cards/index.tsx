import Carousel from "react-native-snap-carousel"
import FlipCard from "./FlipCard"
import React from "react"
import { ISet } from "../../types"
import { Dimensions, Platform, View } from "react-native"
import { connect } from "react-redux"
import { size as cardSize } from "./FlipCard/Card/constants"

class Cards extends React.Component<{
	set: ISet
}> {
	carousel = null

	render() {
		return (
			<View
				style={{
					height: cardSize + 16,

					// FIXME
					marginBottom: 40,
				}}
			>
				<Carousel
					ref={(c) => { this.carousel = c }}
					data={this.props.set.cards}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={cardSize}
					renderItem={({ item }) => (
						<FlipCard front={item.front} back={item.back} />
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
