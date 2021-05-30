import React from "react"
import Set from "./Set"
import { ignore } from "mobx-sync"
import { observable } from "mobx"

export class RootStore {
	@observable
	sets: Set[] = []

	// refers to the set the user is currently viewing
	@observable
	@ignore
	selectedSet: Set | null = null
}


export const context = React.createContext<RootStore>(null)
