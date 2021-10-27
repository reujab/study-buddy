import * as Speech from "expo-speech"
import Card from "../Card"
import Flashcard from "../Flashcard"
import Flip from "../Flip"
import React from "react"
import Set from "../Set"
import styles from "./styles"
import { TouchableWithoutFeedback, View } from "react-native"
import { action, makeObservable, observable } from "mobx"
import { observer } from "mobx-react"

interface Props {
	set: Set
	card: Flashcard
	flippable?: boolean
	onFlip?: (boolean) => void
}

export default observer(class FlippableCard extends React.Component<Props> {
	flipped = false

	constructor(props) {
		super(props)

		makeObservable(this, {
			flipped: observable,

			flip: action,
		})
	}

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
				onPress={() => {
					if (this.props.flippable !== false) {
						this.flip()
					}
				}}
			>
				<View style={styles.card}>
					<Flip
						flipped={this.flipped}
						front={<Card card={this.props.card} />}
						back={<Card card={this.props.card} flipped />}
					/>
				</View>
			</TouchableWithoutFeedback>
		)
	}
})
