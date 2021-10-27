// initializes the root store and providers

import "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Flashcard from "./Flashcard"
import React from "react"
import Root from "./Root"
import Set from "./Set"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { AsyncTrunk } from "mobx-sync"
import { Text } from "react-native"
import { context, RootStore } from "./RootStore"
import { action, makeObservable, observable } from "mobx"
import { observer } from "mobx-react"

export default observer(class App extends React.Component {
	store = new RootStore()

	initialized = false

	constructor(props) {
		super(props)

		makeObservable(this, {
			initialized: observable,

			initialize: action,
		})

		// initializes mobx store used to persist values on restart
		const trunk = new AsyncTrunk(this.store, {
			storage: AsyncStorage,
		})

		trunk.init().then(() => this.initialize())
	}

	initialize(): void {
		// converts anonymous objects to classes
		for (let i = 0; i < this.store.sets.length; i++) {
			this.store.sets[i] = Object.assign(new Set(), this.store.sets[i])
			for (let j = 0; j < this.store.sets[i].cards.length; j++) {
				this.store.sets[i].cards[j] = Object.assign(new Flashcard(), this.store.sets[i].cards[j])
			}
		}

		this.initialized = true
	}

	render(): JSX.Element {
		return (
			<ActionSheetProvider>
				<context.Provider value={this.store}>
					{this.initialized ? <Root /> : <Text>Loading...</Text>}
				</context.Provider>
			</ActionSheetProvider>
		)
	}
})
