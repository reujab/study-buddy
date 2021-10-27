import * as Haptics from "expo-haptics"
import Button from "../Button"
import EditableCard from "./EditableCard"
import Flashcard from "../Flashcard"
import Icon from "react-native-vector-icons/FontAwesome5"
import Languages from "./Languages"
import MDIcon from "react-native-vector-icons/MaterialIcons"
import React from "react"
import commonStyles from "../commonStyles"
import styles from "./styles"
import { Text, TextInput as NativeTextInput, View, TouchableOpacity, ScrollView } from "react-native"
import { Side, cardStyles } from "./common"
import { TextInput } from "react-native-paper"
import { action, computed, makeObservable, observable } from "mobx"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"

export default observer(class EditSetScreen extends React.Component {
	static contextType = context

	context: RootStore

	descriptionRef = null

	inputs = {}

	unsubmittedQuery = ""

	query = ""

	constructor(props) {
		super(props)

		makeObservable(this, {
			unsubmittedQuery: observable,
			query: observable,

			searchResults: computed,

			setUnsubmittedQuery: action,
			setQuery: action,
			setTitle: action,
			setDescription: action,
			setBackLang: action,
			setFrontLang: action,
		})
	}

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

	setUnsubmittedQuery(query: string): void {
		this.unsubmittedQuery = query
	}

	setQuery(query: string): void {
		this.query = query
	}

	setTitle(title: string): voidi {
		this.context.selectedSet.title = title
	}

	setDescription(desc: string): void {
		this.context.selectedSet.description = desc
	}

	setFrontLang(lang: string): void {
		this.context.selectedSet.language.front = lang
	}

	setBackLang(lang: string): void {
		this.context.selectedSet.language.back = lang
	}

	render(): JSX.Element {
		return (
			<ScrollView contentContainerStyle={{ paddingBottom: 400 }}>
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
							this.setUnsubmittedQuery(query)

							if (!query) {
								this.setQuery("")
							}
						}}
						onSubmitEditing={(e) => { this.setQuery(e.nativeEvent.text) }}
					/>
					<TouchableOpacity
						onPress={() => {
							this.setUnsubmittedQuery("")
							this.setQuery("")
						}}
					>
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
						onChangeText={(text) => { this.setTitle(text) }}
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
						onChangeText={(text) => { this.setDescription(text) }}
						blurOnSubmit={false}
						style={{ marginBottom: 20 }}
					/>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<Text>Front language:</Text>
							<Languages
								value={this.context.selectedSet.language.front}
								onChange={(lang) => { this.setFrontLang(lang) }}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Text>Back language:</Text>
							<Languages
								value={this.context.selectedSet.language.back}
								onChange={(lang) => { this.setBackLang(lang) }}
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
			</ScrollView>
		)
	}
})
