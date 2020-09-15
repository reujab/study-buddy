import Card from "./Card"
import Flip from "../../../Flip"
import Flashcard from "../../../Flashcard"
import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { size } from "./Card/constants"

@observer
export default class FlippableCard extends React.Component<{
	card: Flashcard
}, {
	flipped: boolean
}> {
	@observable
	private flipped = false

	private flip(): void {
		this.flipped = !this.flipped
	}

	render(): JSX.Element {
		return (
			<TouchableWithoutFeedback onPress={(): void => this.flip()}>
				<View
					style={{
						height: size,
						width: size,
					}}
				>
					<Flip
						flipped={this.flipped}
						front={<Card text={this.props.card.front} />}
						back={<Card text={this.props.card.back} image={this.props.card.photo} />}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}