import React from "react"
import Thumbnail from "./Thumbnail"
import Title from "./Title"
import context from "../../context"
import styles from "../../styles"
import Set from "../../Set"
import { Text, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"

@observer class SetList extends React.Component<{
	navigation: any
	set: Set
}> {
	static contextType = context

	render(): JSX.Element {
		return (
			<TouchableOpacity
				onPress={(): void => {
					this.context.selectedSet = this.props.set
					this.props.navigation.navigate("details")
				}}
			>
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
						<Text>{this.props.set.description}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

export default (props): JSX.Element => (
	<SetList navigation={useNavigation()} {...props} />
)
