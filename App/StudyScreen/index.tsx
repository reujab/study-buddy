import * as Haptics from "expo-haptics"
import Face from "./Face"
import Flashcard from "../Flashcard"
import FlippableCard from "../FlippableCard"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { Animated, View, StyleSheet } from "react-native"
import { ProgressBar } from "react-native-paper"
import { computed, observable } from "mobx"
import { observer } from "mobx-react"
import { size as cardSize } from "../Card/constants"

const styles = StyleSheet.create({
	totalProgressWrapper: {
		padding: 20,
	},
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

	faceScale = new Animated.Value(0)

	render(): JSX.Element {
		return this.currentCard && (
			<View style={{ flex: 1 }}>
				<View style={styles.totalProgressWrapper}>
					<ProgressBar progress={this.context.selectedSet.studyProgress} />
				</View>
				<View style={styles.cardTouchWrapper}>
					<FlippableCard
						ref={(ref) => { this.flippableCard = ref }}
						set={this.context.selectedSet}
						card={this.displayedCard}
						onFlip={(flipped) => {
							if (flipped) {
								this.displayedCard.back = this.currentCard.back
								this.displayedCard.image = this.currentCard.image
								this.displayedCard.example = this.currentCard.example
							}

							Animated.spring(this.faceScale, {
								toValue: flipped ? 1 : 0,
								speed: flipped ? 10 : 50,
								bounciness: flipped ? 10 : 0,
								useNativeDriver: true,
							}).start()
						}}
						flippable={!this.flippableCard?.flipped}
					/>
				</View>
				<View style={styles.faceWrapper}>
					<Face
						icon="frown"
						scale={this.faceScale}
						color="#f44336"
						onPress={() => { this.rate(0.6) }}
					/>
					<Face
						icon="meh"
						scale={this.faceScale}
						color="#ffc107"
						onPress={() => { this.rate(1) }}
					/>
					<Face
						icon="smile"
						scale={this.faceScale}
						color="#4caf50"
						onPress={() => { this.rate(1.6) }}
					/>
				</View>
			</View>
		)
	}

	componentDidMount(): void {
		this.displayedCard = Object.assign(new Flashcard(), this.currentCard)
		setImmediate(() => {
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
		Haptics.impactAsync()

		const currentCard = this.currentCard
		currentCard.baseConfidence = Math.max(0.2, Math.min(1, this.currentCard.confidence * confidenceMultiplier))
		currentCard.lastStudied = Date.now()

		Object.assign(this.displayedCard, this.currentCard, {
			// keep example, image, and back for seamless animation
			back: this.displayedCard.back,
			image: this.displayedCard.image,
			example: this.displayedCard.example,
		})
		this.flippableCard.flip()
	}
}
