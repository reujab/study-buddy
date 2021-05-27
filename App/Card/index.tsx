import Flashcard from "../Flashcard"
import React from "react"
import commonStyles from "../commonStyles"
import { Image, Text, View, StyleSheet } from "react-native"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 8,
	},
	card: {
		alignItems: "center",
		backgroundColor: "white",
		borderColor: "lightgray",
		borderRadius: 20,
		borderWidth: 1,
		height: "100%",
		justifyContent: "center",
		padding: 20,
		width: "100%",
	},
	textWrapper: { flex: 1, justifyContent: "center" },
	text: { fontSize: 32 },
	image: {
		aspectRatio: 1,
		marginTop: 20,
		width: "50%",
	},
})

@observer
export default class Card extends React.Component<{
	card: Flashcard
	flipped?: boolean
}> {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<View style={[commonStyles.shadow, styles.card]}>
					<View style={styles.textWrapper}>
						<Text style={styles.text}>{this.props.card[this.props.flipped ? "back" : "front"]}</Text>
					</View>
					{this.props.card.image ? (
						<Image
							source={{ uri: this.props.card.image }}
							style={styles.image}
						/>
					) : null}
					{this.props.card.example && this.props.flipped ? (
						<Text>{this.props.card.example}</Text>
					) : null}
				</View>
			</View>
		)
	}
}
