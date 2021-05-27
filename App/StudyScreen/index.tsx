import Face from "./Face"
import Flashcard from "../Flashcard"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { View, StyleSheet } from "react-native"
import { computed, observable } from "mobx"
import { observer } from "mobx-react"
import { size as cardSize } from "../Card/constants"
import FlippableCard from "../FlippableCard"

const styles = StyleSheet.create({
	cardTouchWrapper: {
		alignItems: "center",
		aspectRatio: 1,
		justifyContent: "center",
		width: "100%",
	},
	cardWrapper: {
		width: cardSize,
		height: cardSize,
	},
	faceWrapper: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
})

@observer
export default class StudyScreen extends React.Component {
	static contextType = context

	context: RootStore = null

	flippableCard: FlippableCard

	// used for the infinite flip animation
	@observable
	displayedCard = new Flashcard()

	render(): JSX.Element {
		return this.currentCard && (
			<View style={{ flex: 1 }}>
				<View style={styles.cardTouchWrapper}>
					<FlippableCard
						ref={(ref): void => { this.flippableCard = ref }}
						set={this.context.selectedSet}
						card={this.displayedCard}
						onFlip={(flipped): void => {
							if (flipped) {
								this.displayedCard.back = this.currentCard.back
								this.displayedCard.example = this.currentCard.example
							}
						}}
						flippable={!this.flippableCard?.flipped}
					/>
				</View>
				<View style={[styles.faceWrapper, { display: this.flippableCard?.flipped ? "flex" : "none" }]}>
					<Face
						icon="frown"
						color="#f44336"
						onPress={(): void => { this.rate(0.6) }}
					/>
					<Face
						icon="meh"
						color="#ffc107"
						onPress={(): void => { this.rate(1) }}
					/>
					<Face
						icon="smile"
						color="#4caf50"
						onPress={(): void => { this.rate(1.6) }}
					/>
				</View>
			</View>
		)
	}

	componentDidMount(): void {
		this.displayedCard = Object.assign(new Flashcard(), this.currentCard)
		setImmediate((): void => {
			this.flippableCard.speak()
		})
	}

	@computed
	get currentCard(): Flashcard | null {
		return this.context.selectedSet.studyCards[0] || null
	}

	@computed
	get displayedText(): string {
		return this.currentCard[this.flippableCard.flipped ? "back" : "front"]
	}

	rate(confidenceMultiplier: number): void {
		const currentCard = this.currentCard
		currentCard.baseConfidence = Math.max(0.2, Math.min(1, this.currentCard.confidence * confidenceMultiplier))
		currentCard.lastStudied = Date.now()

		Object.assign(this.displayedCard, this.currentCard, {
			// keep example and back for seamless animation
			back: this.displayedCard.back,
			example: this.displayedCard.example,
		})
		this.flippableCard.flip()
	}
}
