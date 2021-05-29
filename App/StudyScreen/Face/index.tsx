import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import { Animated, TouchableOpacity } from "react-native"
import { observer } from "mobx-react"

@observer
export default class Face extends React.Component<{
	icon: string
	color: string
	scale: Animated.Value
	onPress: any
}> {
	hoverScale = new Animated.Value(1)

	render(): JSX.Element {
		return (
			<Animated.View style={{ transform: [{ scale: Animated.multiply(this.props.scale, this.hoverScale) }] }}>
				<TouchableOpacity
					activeOpacity={1}
					onPressIn={() => { this.animateHoverScale(1.2) }}
					onPressOut={() => { this.animateHoverScale(1) }}
					onPress={this.props.onPress}
					onLongPress={this.props.onPress}
				>
					<Icon
						name={this.props.icon}
						size={96}
						color={this.props.color}
					/>
				</TouchableOpacity>
			</Animated.View>
		)
	}

	animateHoverScale(toValue: number): void {
		Animated.spring(this.hoverScale, {
			toValue,
			speed: 50,
			bounciness: 10,
			useNativeDriver: true,
		}).start()
	}
}
