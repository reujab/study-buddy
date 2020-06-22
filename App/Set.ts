import Card from "./Card"
import shortid from "shortid"
import { computed, observable } from "mobx"

export default class Set {
	id: string = shortid.generate()

	@observable
	title = "Untitled"

	@observable
	description = ""

	@observable
	cards: Card[] = []

	@computed
	get studyCards(): Card[] {
		return this.cards.slice().sort((a, b) => (
			a.confidence === b.confidence ? 0 :
				a.confidence > b.confidence ? 1 :
					-1
		))
	}
}
