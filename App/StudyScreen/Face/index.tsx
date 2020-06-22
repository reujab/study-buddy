import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react"

@observer
export default class Face extends React.Component<{
	icon: string
	color: string
	onPress: any
}> {
	render(): JSX.Element {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon
					name={this.props.icon}
					size={96}
					color={this.props.color}
				/>
			</TouchableOpacity>
		)
	}
}
