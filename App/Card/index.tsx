import Flashcard from "../Flashcard"
import React from "react"
import commonStyles from "../commonStyles"
import styles from "./styles"
import { Image, Text, View } from "react-native"
import { ProgressBar } from "react-native-paper"
import { observer } from "mobx-react"

interface Props {
	card: Flashcard
	flipped?: boolean
}

export default observer(class Card extends React.Component<Props> {
	render(): JSX.Element {
		return (
			<View style={styles.container}>
				<View style={[commonStyles.shadow, styles.card]}>
					{this.props.flipped ? null : (
						<View style={styles.confidenceWrapper}>
							<ProgressBar progress={this.props.card.progress} style={{ backgroundColor: "white" }} />
						</View>
					)}
					<View style={styles.textWrapper}>
						<Text style={styles.text}>{this.props.card[this.props.flipped ? "back" : "front"]}</Text>
					</View>
					{this.props.card.image && this.props.flipped ? (
						<Image
							source={{ uri: this.props.card.image }}
							style={styles.image}
						/>
					) : null}
					{this.props.card.example && this.props.flipped ? (
						<Text>{this.props.card.example}</Text>
					) : null}
				</View>
			</View>
		)
	}
})
