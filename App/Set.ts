import Card from "./Card"
import shortid from "shortid"
import { observable } from "mobx"

export default class Set {
	id: string = shortid.generate()

	@observable
	title = "Untitled"

	@observable
	description = ""

	@observable
	cards: Card[] = []
}
