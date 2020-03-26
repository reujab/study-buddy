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
	front: any
	back: any
}> {
	animatedValue = new Animated.Value(0)
	frontInterpolate = null
	backInterpolate = null

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

	componentDidUpdate(prevProps) {
		if (prevProps.flipped !== this.props.flipped) {
			this.update()
		}
	}

	update() {
		Animated.spring(this.animatedValue, {
			toValue: this.props.flipped ? 1 : 0,
			friction: 6,
			tension: 10,
			useNativeDriver: true,
		}).start()
	}

	render() {
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
