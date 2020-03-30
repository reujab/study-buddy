import "react-native-gesture-handler"

import React from "react"
import Root from "./Root"
import RootStore from "./RootStore"
import context from "./context"
import { AsyncStorage } from "react-native"
import { AsyncTrunk } from "mobx-sync"
import { observable } from "mobx"
import { observer } from "mobx-react"

@observer
export default class App extends React.Component {
	store = new RootStore()

	@observable
	initialized = false

	constructor(props) {
		super(props)

		const trunk = new AsyncTrunk(this.store, {
			storage: AsyncStorage,
		})

		trunk.init().then(() => {
			this.initialized = true
		})
	}

	render(): JSX.Element {
		return (
			<context.Provider value={this.store}>
				{this.initialized && <Root />}
			</context.Provider>
		)
	}
}
