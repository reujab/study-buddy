import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import RootStore from "../../RootStore"
import context from "../../context"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { useNavigation } from "@react-navigation/native"

class HeaderRight extends React.Component<{
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
						iconSize={24}
						color="white"
						{...props}
					/>
				)}
			>
				<HeaderItem
					title="Add"
					iconName="md-add"
					onPress={this.addSet.bind(this)}
				/>
			</HeaderButtons>
		)
	}

	addSet(): void {
		this.context.editSetStore.title = "Add Set"
		this.props.navigation.navigate("edit-set")
	}
}

export default (props): JSX.Element => (
	<HeaderRight navigation={useNavigation()} {...props} />
)
