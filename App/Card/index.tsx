import React from "react"
import commonStyles from "../../../../commonStyles"
import { Image, Text, View } from "react-native"
import { observer } from "mobx-react"

@observer
export default class Card extends React.Component<{
	text: string
	image?: null | string
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
					style={[commonStyles.shadow, {
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
					<Text style={{ fontSize: 32 }}>{this.props.text}</Text>
					{this.props.image ? (
						<Image
							source={{ uri: this.props.image }}
							style={{
								aspectRatio: 1,
								marginTop: 20,
								width: "50%",
							}}
						/>
					) : null}
				</View>
			</View>
		)
	}
}
