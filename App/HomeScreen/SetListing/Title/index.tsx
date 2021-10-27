import React from "react"
import { Text } from "react-native"
import { observer } from "mobx-react"

interface Props {
	children: string
}

export default observer(class Title extends React.Component<Props> {
	render(): JSX.Element {
		return <Text style={{ fontSize: 24 }}>{this.props.children}</Text>
	}
})
