import * as Haptics from "expo-haptics"
import * as ImagePicker from "expo-image-picker"
import Flashcard from "../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import Languages from "./Languages"
import React from "react"
import RootStore from "../RootStore"
import commonStyles from "../commonStyles"
import context from "../context"
import { FAB, TextInput } from "react-native-paper"
import { Image, Platform, Text, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, Clipboard } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Picker } from "@react-native-picker/picker"
import { observer } from "mobx-react"
import { useActionSheet } from "@expo/react-native-action-sheet"

// eslint-disable-next-line no-shadow
enum Input {
	front,
	back,
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
class EditSetScreen extends React.Component<{
		actionSheet: any
	}> {
	static contextType = context

	context: RootStore

	descriptionRef = null

	inputs = {}

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
						style={{ marginBottom: 20 }}
					/>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<Text>Front language:</Text>
							<Picker
								selectedValue={this.context.selectedSet.language.front}
								onValueChange={(lang): void => { this.context.selectedSet.language.front = lang }}
							>
								<Languages />
							</Picker>
						</View>
						<View style={{ flex: 1 }}>
							<Text>Back language:</Text>
							<Picker
								selectedValue={this.context.selectedSet.language.back}
								onValueChange={(lang): void => { this.context.selectedSet.language.back = lang }}
							>
								<Languages />
							</Picker>
						</View>
					</View>
				</View>
				{this.context.selectedSet.cards.map((card) => (
					<View key={card.id} style={[commonStyles.shadow, styles.card]}>
						<TextInput
							ref={(ref): void => { this.addInput(ref, card.id, Input.front) }}
							mode="outlined"
							label="Front"
							defaultValue={card.front}
							onChangeText={(text): void => { card.front = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => { this.focusNextInput(card, Input.front) }}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							ref={(ref): void => { this.addInput(ref, card.id, Input.back) }}
							mode="outlined"
							label="Back"
							defaultValue={card.back}
							onChangeText={(text): void => { card.back = text }}
							returnKeyType="next"
							blurOnSubmit={false}
							onSubmitEditing={(): void => { this.focusNextInput(card, Input.back) }}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<TextInput
							mode="outlined"
							multiline
							label="Example"
							defaultValue={card.example}
							onChangeText={(text): void => { card.example = text }}
							blurOnSubmit={false}
							autoCapitalize="none"
							style={{ marginBottom: 20 }}
						/>
						<View style={styles.buttons}>
							<View style={styles.button}>
								<TouchableWithoutFeedback onPress={(): void => { EditSetScreen.master(card) }}>
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
								<TouchableOpacity onPress={(): void => { this.addImage(card) }}>
									{card.image ? (
										<Image
											source={{ uri: card.image }}
											style={styles.image}
										/>
									) : (
										<Icon
											name="image"
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
		if (input === Input.back) {
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

	addImage(card: Flashcard): void {
		const options = [
			"Cancel",
			"Paste",
			card.image ? "Replace" : "Add",
		]
		if (card.image) {
			options.push("Delete")
		}

		this.props.actionSheet.showActionSheetWithOptions({
			options,
			cancelButtonIndex: 0,
		}, async (index) => {
			switch (index) {
				// Paste
				case 1: {
					card.image = await Clipboard.getString()
					break
				}

				// Replace
				case 2: {
					const image = await EditSetScreen.pickImage()
					if (image) {
						card.image = image
					}
					break
				}

				// Delete
				case 3: {
					card.image = null
					break
				}
			}
		})
	}

	static async pickImage(): Promise<null | string> {
		const result: any = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 0,
			base64: true,
		})

		if (result.cancelled) {
			return null
		}

		// eslint-disable-next-line require-atomic-updates
		return `data:image/png;base64,${result.base64}`
	}

	static master(card: Flashcard): void {
		card.mastered = !card.mastered
		Haptics.impactAsync()
	}
}

export default (props): JSX.Element => <EditSetScreen actionSheet={useActionSheet()} {...props} />
