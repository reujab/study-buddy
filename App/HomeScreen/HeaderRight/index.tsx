import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { useNavigation } from "@react-navigation/native"

class HeaderRight extends React.Component<{
	// eslint-disable-next-line
	navigation: any
}> {
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
					onPress={(): void => {
						this.props.navigation.navigate("edit-set")
					}}
				/>
			</HeaderButtons>
		)
	}
}

export default (props): JSX.Element => (
	<HeaderRight navigation={useNavigation()} {...props} />
)
