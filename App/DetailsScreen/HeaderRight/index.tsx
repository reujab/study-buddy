import Icon from "react-native-vector-icons/FontAwesome5"
import React from "react"
import { Alert } from "react-native"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { context, RootStore } from "../../RootStore"
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
				HeaderButtonComponent={(props) => (
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
					onPress={() => { this.editSet() }}
				/>
				<HeaderItem
					title="Add"
					iconName="trash"
					onPress={() => { this.promptDeleteSet() }}
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
					onPress: () => {
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

export default (props): JSX.Element => <HeaderRight navigation={useNavigation()} {...props} />
