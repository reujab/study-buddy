import { ISet } from "./types"
import { observable } from "mobx"
import EditSetStore from "./EditSetScreen/EditSetStore"

export default class RootStore {
	editSetStore: EditSetStore

	@observable
	sets: ISet[] = [{
		id: "0",
		title: "Title",
		description: "Description",
		cards: [
			{ front: "1", back: "one" },
			{ front: "2", back: "two" },
			{ front: "3", back: "three" },
		],
	}]
	// 	sets: ISet[] = [{
	// -               id: "0",
	// -               title: "Title",
	// -               description: "Description",
	// -               cards: [
	// -                       { front: "1", back: "one" },
	// -                       { front: "2", back: "two" },
	// -                       { front: "3", back: "three" },
	// -               ],
	// -       }]

	@observable
	selectedSet: ISet | null = null

	constructor() {
		this.editSetStore = new EditSetStore()
	}
}
