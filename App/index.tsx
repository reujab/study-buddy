import "react-native-gesture-handler"

import React from "react"
import Root from "./Root"
import context from "./context"
import RootStore from "./RootStore"

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<context.Provider value={new RootStore()}>
				<Root />
			</context.Provider>
		)
	}
}
