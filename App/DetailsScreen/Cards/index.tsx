import Carousel from "react-native-snap-carousel"
import FlipCard from "./FlipCard"
import React from "react"
import { Dimensions, Platform, View } from "react-native"
import { ISet } from "../../types"
import { IState } from "../../store"
import { connect } from "react-redux"
import { size as cardSize } from "./FlipCard/Card/constants"

class Cards extends React.Component<{
	set: ISet
}> {
	private carousel = null

	render(): JSX.Element {
		return (
			<View
				style={{
					height: cardSize + 16,

					// FIXME
					marginBottom: 40,
				}}
			>
				<Carousel
					ref={(c): void => { this.carousel = c }}
					data={this.props.set.cards}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={cardSize}
					renderItem={({ item }): JSX.Element => (
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
	(state: IState) => ({
		set: state.app.set,
	}),
)(Cards)
