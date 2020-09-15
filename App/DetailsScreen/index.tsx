import CardCarousel from "./CardCarousel"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { Button } from "react-native-paper"
import { ScrollView, Text, View } from "react-native"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"

@observer class Details extends React.Component<{
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
					<CardCarousel />
					<Button
						mode="contained"
						style={{
							margin: 20,
							marginTop: 0,
						}}
						onPress={(): void => { this.props.navigation.navigate("study") }}
					>
						Study
					</Button>
				</View>
			</View>
		)
	}
}

export default (props): JSX.Element => <Details navigation={useNavigation()} {...props} />
