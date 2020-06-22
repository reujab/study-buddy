import Set from "./Set"
import { ignore } from "mobx-sync"
import { observable } from "mobx"

export default class RootStore {
	@observable
	sets: Set[] = []

	@observable
	@ignore
	selectedSet: Set | null = null
}
