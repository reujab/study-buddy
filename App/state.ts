import { TSet } from "./types"

export class State {
	sets: TSet[] = [{
		id: "0",
		title: "Title",
		description: "Description",
		cards: [
			{ front: "1", back: "one" },
			{ front: "2", back: "two" },
			{ front: "3", back: "three" },
		]
	}]
	set: null | TSet = null
}

export const setSet = "set-set"

export default function appReducer(state = new State(), action) {
	switch (action.type) {
		case setSet:
			return Object.assign({}, state, {
				set: action.value
			})
		default:
			return state
	}
}
