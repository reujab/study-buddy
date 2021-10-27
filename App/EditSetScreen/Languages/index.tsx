import React from "react"
import { Picker } from "@react-native-picker/picker"

interface Props {
	value: string
	onChange: (any) => void
}

export default class LanguagePicker extends React.Component<Props> {
	render(): JSX.Element {
		// TODO: more languages
		return (
			<Picker selectedValue={this.props.value} onValueChange={this.props.onChange}>
				<Picker.Item label="English" value="en" />
				<Picker.Item label="Spanish" value="es" />
				<Picker.Item label="German" value="de" />
			</Picker>
		)
	}
}
