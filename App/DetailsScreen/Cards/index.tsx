import Carousel from "react-native-snap-carousel"
import FlipCard from "./FlipCard"
import React from "react"
import RootStore from "../../RootStore"
import context from "../../context"
import { Dimensions, Platform, View } from "react-native"
import { observer } from "mobx-react"
import { size as cardSize } from "./FlipCard/Card/constants"
import { useNavigation } from "@react-navigation/native"

@observer class Cards extends React.Component<{
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
			<View
				style={{
					height: cardSize + 16,

					// FIXME
					marginBottom: 40,
				}}
			>
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

export default (props): JSX.Element => <Cards navigation={useNavigation()} {...props} />
