import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { observer } from "mobx-react"

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#eee",
		borderRadius: 5,
		flexShrink: 0,
		marginRight: 8,
		padding: 24,
	},
	placeholder: {
		color: "#bbb",
		fontSize: 48,
	},
})

@observer
export default class Thumbnail extends React.Component {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<Text style={styles.placeholder}>?</Text>
			</View>
		)
	}
}
