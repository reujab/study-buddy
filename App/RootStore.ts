import { ISet } from "./types"
import { observable } from "mobx"

export default class RootStore {
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
}
