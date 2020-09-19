import Card from "../Card"
import Face from "./Face"
import Flashcard from "../Flashcard"
import Flip from "../Flip"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { Snackbar } from "react-native-paper"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { View, Text, StyleSheet } from "react-native"
import { computed, observable } from "mobx"
import { observer } from "mobx-react"
import { size as cardSize } from "../Card/constants"

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

	@observable
	flipped = false

	render(): JSX.Element {
		return this.currentCard && (
			<View style={{ flex: 1 }}>
				<View style={styles.cardTouchWrapper}>
					<TouchableWithoutFeedback onPress={(): void => { this.flipped = true }}>
						<View style={styles.cardWrapper}>
							<Flip
								flipped={this.flipped}
								front={<Card text={this.currentCard.front} />}
								back={<Card text={this.currentCard.back} image={this.currentCard.image} />}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={[styles.faceWrapper, { display: this.flipped ? "flex" : "none" }]}>
					<Face
						icon="frown"
						color="#f44336"
						onPress={(): void => { this.nextCard(0.6) }}
					/>
					<Face
						icon="meh"
						color="#ffc107"
						onPress={(): void => { this.nextCard(1) }}
					/>
					<Face
						icon="smile"
						color="#4caf50"
						onPress={(): void => { this.nextCard(1.6) }}
					/>
				</View>
				{/* TODO: remove */}
				<Text>Base Confidence: {this.currentCard.baseConfidence}</Text>
				<Text>Confidence: {this.currentCard.confidence}</Text>
				<Snackbar
					visible={this.currentCard.example && this.flipped}
					onDismiss={(): void => {}}
				>
					{this.currentCard.example}
				</Snackbar>
			</View>
		)
	}

	@computed
	get currentCard(): Flashcard | null {
		return this.context.selectedSet.studyCards[0] || null
	}

	nextCard(confidenceMultiplier: number): void {
		const currentCard = this.currentCard
		currentCard.baseConfidence = Math.max(0.2, Math.min(1, this.currentCard.confidence * confidenceMultiplier))
		currentCard.lastStudied = Date.now()
		this.flipped = false
	}
}
