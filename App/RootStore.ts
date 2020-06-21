import { observable } from "mobx"
import Set from "./Set"
import { ignore } from "mobx-sync"

export default class RootStore {
	@observable
	sets: Set[] = []

	@observable
	@ignore
	selectedSet: Set | null = null

	// workaround since the details screen doesn't automatically update when editing a set
	@observable
	forceDetailsUpdate = 0
}
