import * as Speech from "expo-speech"
import Card from "../Card"
import Flashcard from "../Flashcard"
import Flip from "../Flip"
import React from "react"
import Set from "../Set"
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { size } from "../Card/constants"

const styles = StyleSheet.create({
	card: {
		height: size,
		width: size,
	},
})

@observer
export default class FlippableCard extends React.Component<{
	set: Set
	card: Flashcard
	flippable?: boolean
	onFlip?: (boolean) => void
}> {
	@observable
	flipped = false

	flip(): void {
		this.flipped = !this.flipped

		if (this.props.onFlip) {
			this.props.onFlip(this.flipped)
		}

		this.speak()
	}

	speak(): void {
		Speech.stop()

		const side = this.flipped ? "back" : "front"
		Speech.speak(this.props.card[side], {
			language: this.props.set.language[side],
			rate: 0.8,
		})
	}

	render(): JSX.Element {
		return (
			<TouchableWithoutFeedback
				onPress={(): void => {
					if (this.props.flippable !== false) {
						this.flip()
					}
				}}
			>
				<View style={styles.card}>
					<Flip
						flipped={this.flipped}
						front={<Card text={this.props.card.front} />}
						back={<Card text={this.props.card.back} image={this.props.card.image} />}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}
