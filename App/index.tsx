// initializes the root store

import "react-native-gesture-handler"

import Flashcard from "./Flashcard"
import React from "react"
import Root from "./Root"
import RootStore from "./RootStore"
import Set from "./Set"
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
			// converts anonymous objects to classes
			for (let i = 0; i < this.store.sets.length; i++) {
				this.store.sets[i] = Object.assign(new Set(), this.store.sets[i])
				for (let j = 0; j < this.store.sets[i].cards.length; j++) {
					this.store.sets[i].cards[j] = Object.assign(new Flashcard(), this.store.sets[i].cards[j])
				}
			}

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
