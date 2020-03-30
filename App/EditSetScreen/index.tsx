import Card from "../Card"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { ScrollView, Button, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { observer } from "mobx-react"

@observer
export default class EditSetScreen extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<ScrollView>
				{this.context.selectedSet.cards.map((card) => (
					<View key={card.id}>
						<TextInput
							placeholder="Front"
							onChangeText={(text): void => { card.front = text }}
						/>
						<TextInput
							placeholder="Back"
							onChangeText={(text): void => { card.back = text }}
						/>
					</View>
				))}
				<Button title="+" onPress={this.addCard.bind(this)} />
			</ScrollView>
		)
	}

	addCard(): void {
		if (!this.context.sets.includes(this.context.selectedSet)) {
			this.context.sets.push(this.context.selectedSet)
		}

		this.context.selectedSet.cards.push(new Card())
	}
}
