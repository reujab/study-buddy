import React from "react"
import Thumbnail from "./Thumbnail"
import Title from "./Title"
import styles from "../../styles"
import { ISet } from "../../types"
import { Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import { setSet } from "../../state"
import { useNavigation } from "@react-navigation/native"

class SetList extends React.Component<{
	navigation: any
	set: ISet,
	select: (ISet) => void
}> {
	render() {
		return (
			<TouchableOpacity onPress={() => {
				this.props.select(this.props.set)
				this.props.navigation.navigate("details")
			}}>
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

export default connect(
	null,
	(dispatch) => ({
		select: (value: ISet) => dispatch({ type: setSet, value })
	})
)((props) => (
	<SetList navigation={useNavigation()} {...props} />
))
