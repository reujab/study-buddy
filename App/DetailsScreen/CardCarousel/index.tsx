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

	// component does not automatically update after editing set
	componentDidMount(): void {
		this.props.navigation.addListener("focus", (): void => {
			this.forceUpdate()
		})
	}

	render(): JSX.Element {
		return (
			<View style={styles.carouselWrapper}>
				<Carousel
					data={this.context.selectedSet.cards}
					sliderWidth={Dimensions.get("window").width}
					itemWidth={cardSize}
					renderItem={({ item }): JSX.Element => (
						<FlippableCard card={item} />
					)}

					// prevents the subviews from not being rendered on iOS
					// https://github.com/archriss/react-native-snap-carousel/issues/238
					removeClippedSubviews={Platform.OS !== "ios"}
				/>
			</View>
		)
	}
}

export default (props): JSX.Element => <CardCarousel navigation={useNavigation()} {...props} />
