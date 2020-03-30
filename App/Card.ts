import shortid from "shortid"
import { observable } from "mobx"

export default class Card {
	id: string = shortid.generate()

	@observable
	front = ""

	@observable
	back = ""
}
