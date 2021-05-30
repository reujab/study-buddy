import React from "react"
import { Animated, StyleSheet } from "react-native"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	view: {
		backfaceVisibility: "hidden",
		height: "100%",
		position: "absolute",
		top: 0,
		width: "100%",
	},
})

@observer
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
		const frontAnimatedStyle = { transform: [{ rotateY: this.frontInterpolate }] }
		const backAnimatedStyle = { transform: [{ rotateY: this.backInterpolate }] }

		return (
			<>
				<Animated.View style={[styles.view, frontAnimatedStyle]}>
					{this.props.front}
				</Animated.View>
				<Animated.View style={[backAnimatedStyle, styles.view]}>
					{this.props.back}
				</Animated.View>
			</>
		)
	}
}
