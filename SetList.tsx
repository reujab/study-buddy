import React from "react"
import styles from "./styles"
import { Text, TouchableOpacity, View } from "react-native"

interface Props {
	description: string,
	onPress: () => void,
	title: string,
}

export default class SetList extends React.Component<Props> {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<View
					style={[styles.shadow, {
						borderRadius: 10,
						display: "flex",
						flexDirection: "row",
						margin: 16,
						padding: 8,
					}]}
				>
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
					<View
						style={{
							flexShrink: 1,
						}}
					>
						<Text
							style={{
								fontSize: 24,
							}}
						>
							{this.props.title}
						</Text>
						<Text>{this.props.description}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
