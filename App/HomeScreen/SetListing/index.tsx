import React from "react"
import Set from "../../Set"
import Thumbnail from "./Thumbnail"
import Title from "./Title"
import commonStyles from "../../commonStyles"
import styles from "./styles"
import { Text, TouchableOpacity, View } from "react-native"
import { context, RootStore } from "../../RootStore"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"
import { action, makeObservable } from "mobx"

interface Props {
	navigation: any
	set: Set
}

const SetList = observer(class SetList extends React.Component<Props> {
	static contextType = context

	context: RootStore

	constructor(props) {
		super(props)

		makeObservable(this, {
			selectSet: action,
		})
	}

	selectSet(set: Set): void {
		this.context.selectedSet = set
	}

	render(): JSX.Element {
		return (
			<TouchableOpacity
				onPress={() => {
					this.selectSet(this.props.set)
					this.props.navigation.navigate("details")
				}}
			>
				<View style={[commonStyles.shadow, styles.listing]}>
					<Thumbnail />
					<View style={styles.listingRight}>
						<Title>{this.props.set.title}</Title>
						<Text>{this.props.set.description}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
})

export default (props): JSX.Element => <SetList navigation={useNavigation()} {...props} />

