import React from "react"
import { Text, View } from "react-native"

export default class Thumbnail extends React.Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: "#eee",
					borderRadius: 5,
					flexShrink: 0,
					marginRight: 8,
					padding: 24,
				}}
			>
				<Text
					style={{
						color: "#bbb",
						fontSize: 48,
					}}
				>
					?
				</Text>
			</View>
		)
	}
}
