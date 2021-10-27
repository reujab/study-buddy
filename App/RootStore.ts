import React from "react"
import Set from "./Set"
import { ignore } from "mobx-sync"
import { makeAutoObservable } from "mobx"

export class RootStore {
	sets: Set[] = []

	// refers to the set the user is currently viewing
	selectedSet: Set | null = null

	constructor() {
		makeAutoObservable(this)
		ignore(this, "selectedSet")
	}
}


export const context = React.createContext<RootStore>(null)
