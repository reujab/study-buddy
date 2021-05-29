import Button from "../Button"
import EditableCard from "./EditableCard"
import Flashcard from "../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import Languages from "./Languages"
import React from "react"
import RootStore from "../RootStore"
import commonStyles from "../commonStyles"
import context from "../context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Platform, Text, TextInput as NativeTextInput, View, StyleSheet } from "react-native"
import { Side } from "./side"
import { TextInput } from "react-native-paper"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
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
	addButton: {
		aspectRatio: 1,
		justifyContent: "center",
	},
})

@observer
export default class EditSetScreen extends React.Component {
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
							<Languages
								value={this.context.selectedSet.language.front}
								onChange={(lang): void => { this.context.selectedSet.language.front = lang }}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Text>Back language:</Text>
							<Languages
								value={this.context.selectedSet.language.back}
								onChange={(lang): void => { this.context.selectedSet.language.back = lang }}
							/>
						</View>
					</View>
				</View>
				{this.context.selectedSet.cards.map((card) => (
					<EditableCard
						key={card.id}
						card={card}
						addInput={this.addInput.bind(this)}
						focusNextInput={this.focusNextInput.bind(this)}
					/>
				))}
				<View style={styles.addButtonWrapper}>
					<Button buttonStyle={styles.addButton} onPress={(): void => { this.addCard() }}>
						<Icon
							name="plus"
							color="white"
							size={24}
						/>
					</Button>
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

	addInput(ref: any, id: string, side: Side): void {
		this.inputs[id] = {
			...this.inputs[id],
			[side]: ref,
		}
	}

	focusNextInput(card: Flashcard, side: Side): void {
		if (side === Side.back) {
			const index = this.context.selectedSet.cards.indexOf(card) + 1
			if (index in this.context.selectedSet.cards) {
				const id = this.context.selectedSet.cards[index].id
				this.inputs[id][0].focus()
			} else {
				this.addCard()
				// gives time for ref to initialize
				setImmediate(() => this.focusNextInput(card, side))
			}
		} else {
			this.inputs[card.id][side + 1].focus()
		}
	}
}
