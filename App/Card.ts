import shortid from "shortid"
import { computed, observable } from "mobx"

export default class Card {
	id: string = shortid.generate()

	@observable
	front = ""

	@observable
	back = ""

	@observable
	lastStudied: Date = new Date(0)

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
		const hoursSinceLastStudy = (Date.now() - Number(this.lastStudied)) / (1000 * 60 * 60)
		return Math.max(0.2, Math.min(1, 1.00214 * 0.990448 ** hoursSinceLastStudy * this.baseConfidence))
	}
}
