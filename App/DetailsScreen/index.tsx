import Button from "../Button"
import CardCarousel from "./CardCarousel"
import React from "react"
import styles from "./styles"
import { ScrollView, Text, View } from "react-native"
import { context, RootStore } from "../RootStore"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"

interface Props {
	navigation: any
}

const Details = observer(class Details extends React.Component<Props> {
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
						buttonStyle={styles.studyButton}
						haptics
						onPress={() => { this.props.navigation.navigate("study") }}
					>
						Study
					</Button>
				</View>
			</View>
		)
	}
})

export default (props): JSX.Element => <Details navigation={useNavigation()} {...props} />
