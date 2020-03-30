import { observable } from "mobx"
import Set from "./Set"

export default class RootStore {
	@observable
	sets: Set[] = []

	@observable
	selectedSet: Set | null = null
}
