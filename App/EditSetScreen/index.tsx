import AddButton from "./AddButton"
import Card from "../Card"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import styles from "../styles"
import { Input } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Platform, View } from "react-native"
import { observer } from "mobx-react"

@observer
export default class EditSetScreen extends React.Component {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<KeyboardAwareScrollView
				enableOnAndroid
				contentContainerStyle={{ flexGrow: 1 }}
				extraScrollHeight={Platform.OS === "android" ? 100 : 0}
			>
				{this.context.selectedSet.cards.map((card) => (
					<View
						key={card.id}
						style={[styles.shadow, {
							borderRadius: 4,
							margin: 20,
							marginBottom: 0,
							padding: 20,
						}]}
					>
						<View>
							<Input
								label="Front"
								defaultValue={card.front}
								onChangeText={(text): void => { card.front = text }}
								containerStyle={{ marginBottom: 20 }}
							/>
							<Input
								label="Back"
								defaultValue={card.back}
								onChangeText={(text): void => { card.back = text }}
							/>
						</View>
					</View>
				))}
				<View style={{ alignSelf: "center", marginVertical: 20 }}>
					<AddButton onPress={(): void => this.addCard()} />
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
}
