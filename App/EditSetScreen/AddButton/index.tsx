import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import styles from "../../styles"
import { TouchableOpacity } from "react-native"
import { observer } from "mobx-react"

@observer
export default class AddButton extends React.Component<{
	onPress: any
}> {
	render(): JSX.Element {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={[styles.shadow, {
					alignItems: "center",
					aspectRatio: 1,
					backgroundColor: "#ccc",
					borderRadius: 32,
					justifyContent: "center",
					margin: 4,
					width: 64,
				}]}
			>
				<Icon name="ios-add" size={32} />
			</TouchableOpacity>
		)
	}
}
