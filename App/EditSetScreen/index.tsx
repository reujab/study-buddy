import * as Haptics from "expo-haptics"
import Button from "../Button"
import EditableCard from "./EditableCard"
import Flashcard from "../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import Languages from "./Languages"
import MDIcon from "react-native-vector-icons/MaterialIcons"
import React from "react"
import commonStyles from "../commonStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Platform, Text, TextInput as NativeTextInput, View, StyleSheet, TouchableOpacity } from "react-native"
import { Side, cardStyles } from "./common"
import { TextInput } from "react-native-paper"
import { computed, observable } from "mobx"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 8,
	},
	searchBar: {
		alignItems: "center",
		backgroundColor: "#00000011",
		borderRadius: 5,
		flexDirection: "row",
		height: 48,
		marginBottom: 8,
	},
	searchIcon: { marginLeft: 8 },
	searchInput: {
		flex: 1,
		fontSize: 16,
		height: "100%",
		paddingLeft: 8,
	},
	clearSearchIcon: { marginRight: 8 },
	noResultsWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	noResults: {
		opacity: 0.5,
		fontSize: 48,
	},
	addButtonWrapper: {
		alignSelf: "center",
		marginVertical: 10,
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

	@observable
	unsubmittedQuery = ""

	@observable
	query = ""

	render(): JSX.Element {
		return (
			<KeyboardAwareScrollView
				enableOnAndroid
				extraScrollHeight={Platform.OS === "android" ? 100 : 0}
				contentOffset={{ x: 0, y: 56 }}
				snapToOffsets={[56]}
				snapToEnd={false}
				contentContainerStyle={styles.container}
			>
				<View style={styles.searchBar}>
					<Icon
						name="search"
						color="#00000033"
						size={16}
						style={styles.searchIcon}
					/>
					<NativeTextInput
						placeholder="Search"
						returnKeyType="search"
						value={this.unsubmittedQuery}
						style={styles.searchInput}
						onChangeText={(query) => {
							this.unsubmittedQuery = query

							if (!query) {
								this.query = ""
							}
						}}
						onSubmitEditing={(e) => { this.query = e.nativeEvent.text }}
					/>
					<TouchableOpacity onPress={() => { this.unsubmittedQuery = this.query = "" }}>
						<MDIcon
							name="cancel"
							color="#00000033"
							size={16}
							style={[styles.clearSearchIcon, { display: this.unsubmittedQuery ? "flex" : "none" }]}
						/>
					</TouchableOpacity>
				</View>
				<View style={[commonStyles.shadow, cardStyles.card, { display: this.query ? "none" : "flex" }]}>
					<TextInput
						mode="outlined"
						label="Title"
						defaultValue={this.context.selectedSet.title}
						onChangeText={(text) => { this.context.selectedSet.title = text }}
						returnKeyType="next"
						blurOnSubmit={false}
						onSubmitEditing={() => { this.descriptionRef.focus() }}
						style={{ marginBottom: 20 }}
					/>
					<TextInput
						mode="outlined"
						multiline
						ref={(ref) => { this.descriptionRef = ref }}
						label="Description"
						defaultValue={this.context.selectedSet.description}
						onChangeText={(text) => { this.context.selectedSet.description = text }}
						blurOnSubmit={false}
						style={{ marginBottom: 20 }}
					/>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<Text>Front language:</Text>
							<Languages
								value={this.context.selectedSet.language.front}
								onChange={(lang) => { this.context.selectedSet.language.front = lang }}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Text>Back language:</Text>
							<Languages
								value={this.context.selectedSet.language.back}
								onChange={(lang) => { this.context.selectedSet.language.back = lang }}
							/>
						</View>
					</View>
				</View>
				{this.searchResults.map((card) => (
					<EditableCard
						key={card.id}
						card={card}
						addInput={(ref: any, side: Side) => { this.addInput(ref, card.id, side) }}
						focusNextInput={(side: Side) => { this.focusNextInput(card, side) }}
					/>
				))}
				{this.query && !this.searchResults.length ? (
					<View style={styles.noResultsWrapper}>
						<Text style={styles.noResults}>No results</Text>
					</View>
				) : null}
				<View style={[styles.addButtonWrapper, { display: this.query ? "none" : "flex" }]}>
					<Button buttonStyle={styles.addButton} onPress={() => { this.addCard() }}>
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
		Haptics.selectionAsync()

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

	@computed
	get searchResults(): Flashcard[] {
		if (this.query) {
			// eslint-disable-next-line @typescript-eslint/no-extra-parens
			return this.context.selectedSet.cards.filter((card) => (
				`${card.front} ${card.back} ${card.example}`.
					toLowerCase().
					includes(this.query.toLowerCase())
			))
		}

		return this.context.selectedSet.cards
	}
}
