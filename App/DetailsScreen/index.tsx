import Cards from "./Cards"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { ScrollView, Text, View } from "react-native"
import { observer } from "mobx-react"

@observer
export default class Details extends React.Component<{
	navigation: any
}> {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1, padding: 20 }}>
					<Text style={{ fontSize: 32 }}>{this.context.selectedSet.title}</Text>
					<Text style={{ fontSize: 18 }}>{this.context.selectedSet.description}</Text>
				</ScrollView>
				<View>
					<Cards />
				</View>
			</View>
		)
	}
}
