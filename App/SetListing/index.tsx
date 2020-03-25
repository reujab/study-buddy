import React from "react"
import styles from "../styles"
import { TSet } from "../types"
import { Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import { setSet } from "../state"
import { useNavigation } from "@react-navigation/native"

class SetList extends React.Component<{
	navigation: any
	set: TSet,
	select: (TSet) => void
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

export default connect(
	null,
	(dispatch) => ({
		select: (value: TSet) => dispatch({ type: setSet, value })
	})
)((props) => (
	<SetList navigation={useNavigation()} {...props} />
))
