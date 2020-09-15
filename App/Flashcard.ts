import shortid from "shortid"
import { computed, observable } from "mobx"

export default class Flashcard {
	id: string = shortid.generate()

	@observable
	front = ""

	@observable
	back = ""

	@observable
	description = ""

	@observable
	mastered = false

	@observable
	image: null | string = null

	@observable
	lastStudied = 0

	@observable
	baseConfidence = 0.5

	// (0, 1)
	// (24, 0.8)
	// (72, 0.5)
	// y_1~ab^(x_1)
	// a = 1.00214
	// b = 0.990448
	@computed
	get confidence(): number {
		if (this.mastered) {
			return 1
		}

		const hoursSinceLastStudy = (Date.now() - this.lastStudied) / (1000 * 60 * 60)
		return Math.max(0.2, Math.min(1, 1.00214 * 0.990448 ** hoursSinceLastStudy * this.baseConfidence))
	}
}
