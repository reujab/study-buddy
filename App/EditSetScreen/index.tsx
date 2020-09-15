import * as ImagePicker from "expo-image-picker"
import Flashcard from "../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import RootStore from "../RootStore"
import commonStyles from "../commonStyles"
import context from "../context"
import { FAB, TextInput } from "react-native-paper"
import { Image, Platform, Text, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { observer } from "mobx-react"

enum Input {
	Front,
	Back,
	Description,
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 4,
		margin: 20,
		marginBottom: 0,
		padding: 20,
	},
	buttons: { flexDirection: "row" },
	button: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	image: {
		height: 32,
		width: 32,
	},
	addButtonWrapper: {
		alignSelf: "center",
		marginVertical: 20,
	},
	addButton: { backgroundColor: "#673ab7" },
})

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
				<View style={[commonStyles.shadow, styles.card]}>
					<TextInput
						mode="outlined"
						label="Title"
						defaultValue={this.context.selectedSet.title}
						onChangeText={(text): void => { this.context.selectedSet.title = text }}
						returnKeyType="next"
						blurOnSubmit={false}
						onSubmitEditing={(): void => { this.descriptionRef.focus() }}
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
					<View key={card.id} style={[commonStyles.shadow, styles.card]}>
						<TextInput
							ref={(ref): void => { this.addInput(ref, card.id, Input.Front) }}
							mode="outlined"
							label="Front"
							defaultValue={card.front}
							onChangeText={(text): void => { card.front = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => { this.focusNextInput(card, Input.Front) }}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							ref={(ref): void => { this.addInput(ref, card.id, Input.Back) }}
							mode="outlined"
							label="Back"
							defaultValue={card.back}
							onChangeText={(text): void => { card.back = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => { this.focusNextInput(card, Input.Back) }}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							ref={(ref): void => { this.addInput(ref, card.id, Input.Description) }}
							mode="outlined"
							label="Description"
							defaultValue={card.description}
							onChangeText={(text): void => { card.description = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => { this.focusNextInput(card, Input.Description) }}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<View style={styles.buttons}>
							<View style={styles.button}>
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
							<View style={styles.button}>
								<TouchableOpacity onPress={(): void => { EditSetScreen.addImage(card) }}>
									{card.image ? (
										<Image
											source={{ uri: card.image }}
											style={styles.image}
										/>
									) : (
										<Icon
											name="plus"
											size={32}
										/>
									)}
								</TouchableOpacity>
								<Text>Image</Text>
							</View>
						</View>
					</View>
				))}
				<View style={styles.addButtonWrapper}>
					{/* eslint-disable-next-line react/jsx-pascal-case */}
					<FAB
						icon="plus"
						style={styles.addButton}
						onPress={(): void => { this.addCard() }}
					/>
				</View>
			</KeyboardAwareScrollView>
		)
	}

	addCard(): void {
		if (!this.context.sets.includes(this.context.selectedSet)) {
			this.context.sets.push(this.context.selectedSet)
		}

		this.context.selectedSet.cards.push(new Flashcard())
	}

	addInput(ref: any, id: string, input: Input): void {
		this.inputs[id] = {
			...this.inputs[id],
			[input]: ref,
		}
	}

	focusNextInput(card: Flashcard, input: number): void {
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

	static async addImage(card: Flashcard): Promise<void> {
		if (card.image) {
			card.image = null
			return
		}

		const result: any = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 0,
			base64: true,
		})

		if (result.cancelled === false) {
			// eslint-disable-next-line require-atomic-updates
			card.image = `data:image/png;base64,${result.base64}`
		}
	}
}
