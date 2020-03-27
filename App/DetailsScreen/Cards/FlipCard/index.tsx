import Card from "./Card"
import Flip from "../../../Flip"
import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { size } from "./Card/constants"

export default class FlipCard extends React.Component<{
	front: string
	back: string
}, {
	flipped: boolean
}> {
	state = {
		flipped: false,
	}

	flipCard(): void {
		this.setState((state) => ({
			flipped: !state.flipped,
		}))
	}

	render(): JSX.Element {
		return (
			<TouchableWithoutFeedback onPress={this.flipCard.bind(this)}>
				<View
					style={{
						height: size,
						width: size,
					}}
				>
					<Flip
						flipped={this.state.flipped}
						front={<Card>{this.props.front}</Card>}
						back={<Card>{this.props.back}</Card>}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}
