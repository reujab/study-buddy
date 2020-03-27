import React from "react"
import styles from "../../../../styles"
import { Text, View } from "react-native"

export default class Card extends React.Component<{
	children: string
}> {
	render(): JSX.Element {
		return (
			<View
				style={{
					alignItems: "center",
					flex: 1,
					justifyContent: "center",
					padding: 8,
				}}
			>
				<View
					style={[styles.shadow, {
						alignItems: "center",
						backgroundColor: "white",
						borderColor: "lightgray",
						borderRadius: 20,
						borderWidth: 1,
						height: "100%",
						justifyContent: "center",
						padding: 20,
						width: "100%",
					}]}
				>
					<Text style={{ fontSize: 32 }}>{this.props.children}</Text>
				</View>
			</View>
		)
	}
}
