import React from "react"
import { Animated } from "react-native"

const style = {
	backfaceVisibility: "hidden",
	height: "100%",
	position: "absolute",
	top: 0,
	width: "100%",
}

export default class Flip extends React.Component<{
	flipped: boolean
	front: JSX.Element
	back: JSX.Element
}> {
	private animatedValue = new Animated.Value(0)

	private frontInterpolate = null

	private backInterpolate = null

	constructor(props) {
		super(props)

		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, Math.PI],
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [Math.PI, 2 * Math.PI],
		})
	}

	componentDidUpdate(prevProps): void {
		if (prevProps.flipped !== this.props.flipped) {
			this.update()
		}
	}

	private update(): void {
		Animated.spring(this.animatedValue, {
			toValue: this.props.flipped ? 1 : 0,
			friction: 6,
			tension: 10,
			useNativeDriver: true,
		}).start()
	}

	render(): JSX.Element {
		const backAnimatedStyle = { transform: [{ rotateY: this.frontInterpolate }] }
		const frontAnimatedStyle = { transform: [{ rotateY: this.backInterpolate }] }

		return (
			<React.Fragment>
				<Animated.View style={[style, frontAnimatedStyle]}>
					{this.props.front}
				</Animated.View>
				<Animated.View style={[backAnimatedStyle, style]}>
					{this.props.back}
				</Animated.View>
			</React.Fragment>
		)
	}
}
