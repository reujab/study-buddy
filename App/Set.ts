import Flashcard from "./Flashcard"
import shortid from "shortid"
import { computed, makeObservable, observable } from "mobx"

export default class Set {
	id: string = shortid.generate()

	title = "Untitled"

	description = ""

	language = {
		front: "en",
		back: "en",
	}

	cards: Flashcard[] = []

	constructor() {
		makeObservable(this, {
			title: observable,
			description: observable,
			language: observable,
			cards: observable,

			studyCards: computed,
			studyProgress: computed,
		})
	}

	get studyCards(): Flashcard[] {
		return this.cards.slice().filter((card) => card.confidence < 0.8).sort((a, b) => (
			a.confidence === b.confidence ? 0 :
				a.confidence > b.confidence ? 1 :
					-1
		))
	}

	get studyProgress(): number {
		return this.cards.
			map((card) => card.progress).
			reduce((sum, confidence) => sum + confidence) / this.cards.length
	}
}
