import Card from "./Card"
import Flip from "../../../Flip"
import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { size } from "./Card/constants"

@observer
export default class FlipCard extends React.Component<{
	front: string
	back: string
}, {
	flipped: boolean
}> {
	@observable
	private flipped = false

	private flipCard(): void {
		this.flipped = !this.flipped
	}

	render(): JSX.Element {
		return (
			<TouchableWithoutFeedback onPress={(): void => this.flipCard()}>
				<View
					style={{
						height: size,
						width: size,
					}}
				>
					<Flip
						flipped={this.flipped}
						front={<Card>{this.props.front}</Card>}
						back={<Card>{this.props.back}</Card>}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}
