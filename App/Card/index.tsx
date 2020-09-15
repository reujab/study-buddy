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
	text: { fontSize: 32 },
	image: {
		aspectRatio: 1,
		marginTop: 20,
		width: "50%",
	},
})

@observer
export default class Card extends React.Component<{
	text: string
	image?: null | string
}> {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<View style={[commonStyles.shadow, styles.card]}>
					<Text style={styles.text}>{this.props.text}</Text>
					{this.props.image ? (
						<Image
							source={{ uri: this.props.image }}
							style={styles.image}
						/>
					) : null}
				</View>
			</View>
		)
	}
}
