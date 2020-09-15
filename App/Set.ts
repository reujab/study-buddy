import Flashcard from "./Flashcard"
import shortid from "shortid"
import { computed, observable } from "mobx"

export default class Set {
	id: string = shortid.generate()

	@observable
	title = "Untitled"

	@observable
	description = ""

	@observable
	cards: Flashcard[] = []

	@computed
	get studyCards(): Flashcard[] {
		return this.cards.slice().filter((card) => card.confidence < 0.8).sort((a, b) => (
			a.confidence === b.confidence ? 0 :
				a.confidence > b.confidence ? 1 :
					-1
		))
	}
}
