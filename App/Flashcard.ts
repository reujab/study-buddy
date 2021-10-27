import shortid from "shortid"
import { computed, makeObservable, observable } from "mobx"

export default class Flashcard {
	id: string = shortid.generate()

	front = ""

	back = ""

	example = ""

	mastered = false

	image: null | string = null

	lastStudied = 0

	baseConfidence = 0

	constructor() {
		makeObservable(this, {
			front: observable,
			back: observable,
			example: observable,
			mastered: observable,
			image: observable,
			lastStudied: observable,
			baseConfidence: observable,

			confidence: computed,
			progress: computed,
		})
	}

	// (0, 1)
	// (24, 0.8)
	// (72, 0.5)
	// y_1~ab^(x_1)
	// a = 1.00214
	// b = 0.990448
	get confidence(): number {
		if (this.mastered) {
			return 1
		}

		const hoursSinceLastStudy = (Date.now() - this.lastStudied) / (1000 * 60 * 60)
		return Math.max(0.2, Math.min(1, 1.00214 * 0.990448 ** hoursSinceLastStudy * this.baseConfidence))
	}

	get progress(): number {
		return Math.min(1, (this.confidence - 0.2) / 0.6)
	}
}
