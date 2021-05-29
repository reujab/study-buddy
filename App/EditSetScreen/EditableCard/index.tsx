import * as Haptics from "expo-haptics"
import * as ImagePicker from "expo-image-picker"
import Flashcard from "../../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import commonStyles from "../../commonStyles"
import { Animated, Image, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity, Clipboard } from "react-native"
import { Side, styles as cardStyles } from "../common"
import { TextInput } from "react-native-paper"
import { observer } from "mobx-react"
import { useActionSheet } from "@expo/react-native-action-sheet"

const styles = StyleSheet.create({
	buttons: {
		flexDirection: "row",
		// fixes bug on Android where height increases by a pixel when master star icon is solid
		height: 42,
	},
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
	addButton: {
		aspectRatio: 1,
		justifyContent: "center",
	},
})

@observer
class EditableCard extends React.Component<{
		actionSheet: any
		card: Flashcard
		addInput: (ref: React.Component, id: string, side: Side) => void
		focusNextInput: (card: Flashcard, side: Side) => void
	}> {
	scale = new Animated.Value(0)

	componentDidMount(): void {
		Animated.spring(this.scale, {
			toValue: 1,
			speed: 50,
			bounciness: 8,
			useNativeDriver: true,
		}).start()
	}

	render(): JSX.Element {
		const { card } = this.props

		return (
			<Animated.View
				key={card.id}
				style={[{ transform: [{ scaleY: this.scale }] }, commonStyles.shadow, cardStyles.card]}
			>
				<TextInput
					ref={(ref) => { this.props.addInput(ref, card.id, Side.front) }}
					mode="outlined"
					label="Front"
					defaultValue={card.front}
					onChangeText={(text) => { card.front = text }}
					returnKeyType="next"
					blurOnSubmit={false}
					onSubmitEditing={() => { this.props.focusNextInput(card, Side.front) }}
					autoCapitalize="none"
					style={{ marginBottom: 20 }}
				/>
				<TextInput
					ref={(ref) => { this.props.addInput(ref, card.id, Side.back) }}
					mode="outlined"
					label="Back"
					defaultValue={card.back}
					onChangeText={(text) => { card.back = text }}
					returnKeyType="next"
					blurOnSubmit={false}
					onSubmitEditing={() => { this.props.focusNextInput(card, Side.back) }}
					autoCapitalize="none"
					style={{ marginBottom: 20 }}
				/>
				<TextInput
					mode="outlined"
					multiline
					label="Example"
					defaultValue={card.example}
					onChangeText={(text) => { card.example = text }}
					blurOnSubmit={false}
					autoCapitalize="none"
					style={{ marginBottom: 20 }}
				/>
				<View style={styles.buttons}>
					<View style={styles.button}>
						<TouchableWithoutFeedback onPress={() => { EditableCard.master(card) }}>
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
						<TouchableOpacity onPress={() => { this.addImage(card) }}>
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
			</Animated.View>
		)
	}

	static master(card: Flashcard): void {
		card.mastered = !card.mastered
		Haptics.impactAsync()
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
					const image = await EditableCard.pickImage()
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
}

export default (props): JSX.Element => <EditableCard actionSheet={useActionSheet()} {...props} />
