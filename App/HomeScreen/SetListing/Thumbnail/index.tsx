import React from "react"
import styles from "./styles"
import { Text, View } from "react-native"
import { observer } from "mobx-react"

export default observer(class Thumbnail extends React.Component {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<Text style={styles.placeholder}>?</Text>
			</View>
		)
	}
})
