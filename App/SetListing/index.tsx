import React from "react"
import styles from "../styles"
import { Set } from "../types"
import { Text, TouchableOpacity, View } from "react-native"

export default class SetList extends React.Component<{
	set: Set,
	onPress: any,
}> {
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

						// FIXME: last item won't have a margin
						marginBottom: 0,
					}]}
				>
					<Thumbnail />
					<View style={{ flexShrink: 1 }}>
						<Title>{this.props.set.title}</Title>
						<Description>{this.props.set.description}</Description>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

export class Thumbnail extends React.Component {
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

export class Title extends React.Component<{
	children: string
}> {
	render() {
		return <Text style={{ fontSize: 24 }}>{this.props.children}</Text>
	}
}

export const Description = Text
