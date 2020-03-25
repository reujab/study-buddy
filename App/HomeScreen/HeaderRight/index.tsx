import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"

class HeaderRight extends React.Component<{
	navigation: any
}> {
	render() {
		return (
			<HeaderButtons HeaderButtonComponent={(props) => (
				<HeaderButton
					IconComponent={Icon}
					iconSize={24}
					color="white"
					{...props}
				/>
			)}>
				<HeaderItem
					title="Add"
					iconName="md-add"
					onPress={() => {
						this.props.navigation.navigate("edit-set")
					}}
				/>
			</HeaderButtons>
		)
	}
}

export default (props) => (
	<HeaderRight navigation={useNavigation()} {...props} />
)
