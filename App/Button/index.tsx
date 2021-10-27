import * as Haptics from "expo-haptics"
import React from "react"
import commonStyles from "../commonStyles"
import styles from "./styles"
import { Animated, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { observer } from "mobx-react"

interface Props {
	buttonStyle?: any
	textStyle?: any
	haptics?: boolean
	onPress: () => void
}

export default observer(class Button extends React.Component<Props> {
	scale = new Animated.Value(1)

	render(): JSX.Element {
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPressIn={() => { this.scaleTo(0.9) }}
				onPressOut={() => { this.scaleTo(1) }}
				onPress={this.props.onPress}
			>
				<Animated.View
					style={[
						commonStyles.shadow,
						{ transform: [{ scale: this.scale }] },
						styles.view,
						this.props.buttonStyle,
					]}
				>
					<Text style={[styles.text, this.props.textStyle]}>{this.props.children}</Text>
				</Animated.View>
			</TouchableOpacity>
		)
	}

	scaleTo(toValue: number): void {
		if (this.props.haptics) {
			Haptics.impactAsync()
		}

		Animated.spring(this.scale, {
			toValue,
			speed: 25,
			bounciness: 10,
			useNativeDriver: true,
		}).start()
	}
})
