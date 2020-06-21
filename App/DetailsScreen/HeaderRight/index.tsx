import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import RootStore from "../../RootStore"
import context from "../../context"
import { Alert } from "react-native"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"

@observer class HeaderRight extends React.Component<{
	navigation: any
}> {
	static contextType = context

	context: RootStore

	render(): JSX.Element {
		return (
			<HeaderButtons
				HeaderButtonComponent={(props): JSX.Element => (
					<HeaderButton
						IconComponent={Icon}
						iconSize={18}
						color="white"
						{...props}
					/>
				)}
			>
				<HeaderItem
					title="Edit"
					iconName="edit"
					onPress={(): void => this.editSet()}
				/>
				<HeaderItem
					title="Add"
					iconName="trash"
					onPress={(): void => this.promptDeleteSet()}
				/>
			</HeaderButtons>
		)
	}

	editSet(): void {
		this.props.navigation.push("edit-set")
	}

	promptDeleteSet(): void {
		if (this.context.sets.includes(this.context.selectedSet)) {
			Alert.alert("Are you sure you want to delete this set?", null, [
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: (): void => {
						this.context.sets.splice(this.context.sets.indexOf(this.context.selectedSet), 1)
						this.props.navigation.navigate("home-screen")
					},
				},
			], { cancelable: false })
		} else {
			console.error("set not found while trying to delete")
		}
	}
}

export default (props): JSX.Element => (
	<HeaderRight navigation={useNavigation()} {...props} />
)
