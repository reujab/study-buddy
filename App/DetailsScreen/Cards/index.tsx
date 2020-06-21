import Carousel from "react-native-snap-carousel"
import FlipCard from "./FlipCard"
import React from "react"
import RootStore from "../../RootStore"
import context from "../../context"
import { Dimensions, Platform, View } from "react-native"
import { observer } from "mobx-react"
import { size as cardSize } from "./FlipCard/Card/constants"

@observer
export default class Cards extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<View
				style={{
					height: cardSize + 16,

					// FIXME
					marginBottom: 40,
				}}
			>
				{void this.context.forceDetailsUpdate}
				<Carousel
					data={this.context.selectedSet.cards}
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
