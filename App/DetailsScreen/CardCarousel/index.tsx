import Carousel from "react-native-snap-carousel"
import FlippableCard from "../../FlippableCard"
import React from "react"
import styles from "./styles"
import { Dimensions, Platform, View } from "react-native"
import { context, RootStore } from "../../RootStore"
import { observer } from "mobx-react"
import { size as cardSize } from "../../Card/constants"
import { useNavigation } from "@react-navigation/native"

interface Props {
	navigation: any
}

const CardCarousel = observer(class CardCarousel extends React.Component<Props> {
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
})

export default (props): JSX.Element => <CardCarousel navigation={useNavigation()} {...props} />
