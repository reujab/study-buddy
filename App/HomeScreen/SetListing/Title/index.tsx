import React from "react"
import { Text } from "react-native"

export default class Title extends React.Component<{
	children: string
}> {
	render(): JSX.Element {
		return <Text style={{ fontSize: 24 }}>{this.props.children}</Text>
	}
}
