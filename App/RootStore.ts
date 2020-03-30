import { observable } from "mobx"
import EditSetStore from "./EditSetScreen/EditSetStore"
import Set from "./Set"

export default class RootStore {
	editSetStore: EditSetStore

	@observable
	sets: Set[] = []

	@observable
	selectedSet: Set | null = null

	constructor() {
		this.editSetStore = new EditSetStore()
	}
}
