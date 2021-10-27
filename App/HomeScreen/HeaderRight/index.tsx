import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import Set from "../../Set"
import { HeaderButton, HeaderButtons, Item as HeaderItem } from "react-navigation-header-buttons"
import { context, RootStore } from "../../RootStore"
import { observer } from "mobx-react"
import { useNavigation } from "@react-navigation/native"
import { action, makeObservable } from "mobx"

interface Props {
	navigation: any
}

const HeaderRight = observer(class HeaderRight extends React.Component<Props> {
	static contextType = context

	context: RootStore

	constructor(props) {
		super(props)

		makeObservable(this, {
			addSet: action,
		})
	}

	render(): JSX.Element {
		return (
			<HeaderButtons
				HeaderButtonComponent={(props) => (
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
					onPress={() => { this.addSet() }}
				/>
			</HeaderButtons>
		)
	}

	addSet(): void {
		this.context.selectedSet = new Set()
		this.props.navigation.navigate("edit-set")
	}
})

export default (props): JSX.Element => <HeaderRight navigation={useNavigation()} {...props} />
