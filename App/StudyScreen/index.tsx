import * as Haptics from "expo-haptics"
import Face from "./Face"
import Flashcard from "../Flashcard"
import FlippableCard from "../FlippableCard"
import React from "react"
import styles from "./styles"
import { Animated, View } from "react-native"
import { ProgressBar } from "react-native-paper"
import { action, computed, makeObservable, observable } from "mobx"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"

export default observer(class StudyScreen extends React.Component {
	static contextType = context

	context: RootStore = null

	flippableCard: FlippableCard

	// used for the infinite flip animation
	displayedCard = new Flashcard()

	faceScale = new Animated.Value(0)

	constructor(props) {
		super(props)

		makeObservable(this, {
			displayedCard: observable,

			currentCard: computed,
			displayedText: computed,

			flip: action,
		})
	}

	get currentCard(): Flashcard | null {
		return this.context.selectedSet.studyCards[0] || null
	}

	get displayedText(): string {
		return this.currentCard[this.flippableCard.flipped ? "back" : "front"]
	}

	componentDidMount(): void {
		this.displayedCard = Object.assign(new Flashcard(), this.currentCard)
		setImmediate(() => {
			this.flippableCard.speak()
		})
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

	flip(flipped: boolean): void {
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
	}

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
						onFlip={(flipped) => { this.flip(flipped) }}
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
})
