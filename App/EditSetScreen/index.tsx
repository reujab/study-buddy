import Card from "../Card"
import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import styles from "../styles"
import { FAB, TextInput } from "react-native-paper"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Platform, Text, TouchableWithoutFeedback, View } from "react-native"
import { observer } from "mobx-react"

enum Input {
	Front,
	Back,
	Description,
}

const cardStyle = {
	borderRadius: 4,
	margin: 20,
	marginBottom: 0,
	padding: 20,
}

@observer
export default class EditSetScreen extends React.Component {
	static contextType = context

	context: RootStore

	descriptionRef = null

	inputs: {} = {}

	render(): JSX.Element {
		return (
			<KeyboardAwareScrollView
				enableOnAndroid
				contentContainerStyle={{ flexGrow: 1 }}
				extraScrollHeight={Platform.OS === "android" ? 100 : 0}
			>
				<View style={[styles.shadow, cardStyle]}>
					<TextInput
						mode="outlined"
						label="Title"
						defaultValue={this.context.selectedSet.title}
						onChangeText={(text): void => { this.context.selectedSet.title = text }}
						returnKeyType="next"
						blurOnSubmit={false}
						onSubmitEditing={(): void => this.descriptionRef.focus()}
						style={{ marginBottom: 20 }}
					/>
					<TextInput
						mode="outlined"
						multiline
						ref={(ref): void => { this.descriptionRef = ref }}
						label="Description"
						defaultValue={this.context.selectedSet.description}
						onChangeText={(text): void => { this.context.selectedSet.description = text }}
						blurOnSubmit={false}
					/>
				</View>
				{this.context.selectedSet.cards.map((card) => (
					<View key={card.id} style={[styles.shadow, cardStyle]}>
						<TextInput
							ref={(ref): void => this.addInput(ref, card.id, Input.Front)}
							mode="outlined"
							label="Front"
							defaultValue={card.front}
							onChangeText={(text): void => { card.front = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => this.focusNextInput(card, Input.Front)}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							ref={(ref): void => this.addInput(ref, card.id, Input.Back)}
							mode="outlined"
							label="Back"
							defaultValue={card.back}
							onChangeText={(text): void => { card.back = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => this.focusNextInput(card, Input.Back)}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							ref={(ref): void => this.addInput(ref, card.id, Input.Description)}
							mode="outlined"
							label="Description"
							defaultValue={card.description}
							onChangeText={(text): void => { card.description = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => this.focusNextInput(card, Input.Description)}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View
								style={{
									alignItems: "center",
									flex: 1,
									justifyContent: "center",
								}}
							>
								<TouchableWithoutFeedback onPress={(): void => { card.mastered = !card.mastered }}>
									<Icon
										name="star"
										color="#ff9800"
										size={32}
										solid={card.mastered}
									/>
								</TouchableWithoutFeedback>
								<Text>Mastered</Text>
							</View>
						</View>
					</View>
				))}
				<View style={{ alignSelf: "center", marginVertical: 20 }}>
					{/* eslint-disable-next-line react/jsx-pascal-case */}
					<FAB
						icon="plus"
						style={{ backgroundColor: "#673ab7" }}
						onPress={(): void => this.addCard()}
					/>
				</View>
			</KeyboardAwareScrollView>
		)
	}

	addCard(): void {
		if (!this.context.sets.includes(this.context.selectedSet)) {
			this.context.sets.push(this.context.selectedSet)
		}

		this.context.selectedSet.cards.push(new Card())
	}

	addInput(ref: any, id: string, input: Input): void {
		this.inputs[id] = {
			...this.inputs[id],
			[input]: ref,
		}
	}

	focusNextInput(card: Card, input: number): void {
		if (input === Input.Description) {
			const index = this.context.selectedSet.cards.indexOf(card) + 1
			if (index in this.context.selectedSet.cards) {
				const id = this.context.selectedSet.cards[index].id
				this.inputs[id][0].focus()
			} else {
				this.addCard()
				// gives time for ref to initialize
				setImmediate(() => this.focusNextInput(card, input))
			}
		} else {
			this.inputs[card.id][input + 1].focus()
		}
	}
}
