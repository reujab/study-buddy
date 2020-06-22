import CCard from "../Card"
import Card from "../DetailsScreen/Cards/FlipCard/Card"
import Face from "./Face"
import Flip from "../Flip"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { View, Text } from "react-native"
import { computed, observable } from "mobx"
import { observer } from "mobx-react"
import { size as cardSize } from "../DetailsScreen/Cards/FlipCard/Card/constants"

@observer
export default class StudyScreen extends React.Component {
	static contextType = context

	context: RootStore = null

	@observable
	flipped = false

	render(): JSX.Element {
		return this.currentCard && (
			<View style={{ flex: 1 }}>
				<View
					style={{
						alignItems: "center",
						aspectRatio: 1,
						justifyContent: "center",
						width: "100%",
					}}
				>
					<TouchableWithoutFeedback onPress={(): void => { this.flipped = true }}>
						<View
							style={{
								width: cardSize,
								height: cardSize,
							}}
						>
							<Flip
								flipped={this.flipped}
								front={<Card>{this.currentCard.front}</Card>}
								back={<Card>{this.currentCard.back}</Card>}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View
					style={{
						alignItems: "center",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
							width: "100%",
							display: this.flipped ? "flex" : "none",
						}}
					>
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
				</View>
				<Text>ID: {this.currentCard.id}</Text>
				<Text>Base Confidence: {this.currentCard.baseConfidence}</Text>
				<Text>Confidence: {this.currentCard.confidence}</Text>
			</View>
		)
	}

	@computed
	get currentCard(): CCard | null {
		return this.context.selectedSet.studyCards[0] || null
	}

	nextCard(confidenceMultiplier: number): void {
		const currentCard = this.currentCard
		currentCard.baseConfidence = Math.max(0.2, Math.min(1, this.currentCard.confidence * confidenceMultiplier))
		currentCard.lastStudied = Date.now()
		this.flipped = false
	}
}
