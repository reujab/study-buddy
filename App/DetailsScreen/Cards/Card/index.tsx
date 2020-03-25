import React from "react"
import styles from "../../../styles"
import { Dimensions, Text, View } from "react-native"

export default class Card extends React.Component {
	render() {
		return (
			<View
				style={{
					alignItems: "center",
					flex: 1,
					justifyContent: "center",
				}}
			>
				<View
					style={[styles.shadow, {
						alignItems: "center",
						backgroundColor: "white",
						borderColor: "lightgray",
						borderRadius: 20,
						borderWidth: 1,
						height: 0.75 * Dimensions.get("window").width,
						justifyContent: "center",
						padding: 20,
						width: 0.75 * Dimensions.get("window").width,
					}]}
				>
					<Text style={{ fontSize: 32 }}>{this.props.children}</Text>
				</View>
			</View>
		)
	}
}
