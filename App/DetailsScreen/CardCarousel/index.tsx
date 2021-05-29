import Carousel from "react-native-snap-carousel"
import FlippableCard from "../../FlippableCard"
import React from "react"
import RootStore from "../../RootStore"
import context from "../../context"
import { Dimensions, Platform, View, StyleSheet } from "react-native"
import { observer } from "mobx-react"
import { size as cardSize } from "../../Card/constants"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
	carouselWrapper: {
		height: cardSize + 16,
		marginBottom: 32,
	},
})

@observer class CardCarousel extends React.Component<{
	navigation: any
}> {
	static contextType = context

	context: RootStore

	// references to <FlippableCard> used for speech
	private flippableCards = {}

	// component does not automatically update after editing set
	componentDidMount(): void {
		this.props.navigation.addListener("focus", () => {
			this.forceUpdate()
		})

		if (this.context.selectedSet.cards.length) {
			setImmediate(() => {
				this.flippableCards[this.context.selectedSet.cards[0].id].speak()
			})
		}
	}

	render(): JSX.Element {
		return (
			<View style={styles.carouselWrapper}>
				<Carousel
					data={this.context.selectedSet.cards}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={cardSize}
					renderItem={({ item }) => (
						<FlippableCard
							ref={(ref) => { this.flippableCards[item.id] = ref }}
							set={this.context.selectedSet}
							card={item}
						/>
					)}
					onSnapToItem={(i) => {
						this.flippableCards[this.context.selectedSet.cards[i].id].speak()
					}}

					// prevents the subviews from not being rendered on iOS
					// https://github.com/archriss/react-native-snap-carousel/issues/238
					removeClippedSubviews={Platform.OS !== "ios"}
				/>
			</View>
		)
	}
}

export default (props): JSX.Element => <CardCarousel navigation={useNavigation()} {...props} />
