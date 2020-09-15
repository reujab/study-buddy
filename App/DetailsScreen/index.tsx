import CardCarousel from "./CardCarousel"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { Button } from "react-native-paper"
import { ScrollView, Text, View, StyleSheet } from "react-native"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
	details: {
		flex: 1,
		padding: 20,
	},
	title: { fontSize: 32 },
	description: { fontSize: 18 },
	studyButton: {
		margin: 20,
		marginTop: 0,
	},
})

@observer class Details extends React.Component<{
	navigation: any
}> {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={styles.details}>
					<Text style={styles.title}>{this.context.selectedSet.title}</Text>
					<Text style={styles.description}>{this.context.selectedSet.description}</Text>
				</ScrollView>
				<View>
					<CardCarousel />

					<Button
						mode="contained"
						style={styles.studyButton}
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
