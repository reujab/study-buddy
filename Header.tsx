import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { Text } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

export default class Header extends React.Component {
	render() {
		return (
			<LinearGradient
				colors={["#5856d6", "#6c6bdb"]}
				style={{
					alignItems: "center",
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					justifyContent: "center",
					paddingTop: getStatusBarHeight(),
				}}
			>
				<Text
					style={{
						color: "white",
						fontSize: 20,
						lineHeight: 56,
					}}
				>
					Study Buddy
				</Text>
			</LinearGradient>
		)
	}
}
