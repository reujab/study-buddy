import { ISet } from "./types"

export class State {
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

	set: null | ISet = null
}

export const setSet = "set-set"

export default function appReducer(state = new State(), action): State {
	switch (action.type) {
		case setSet:
			return {
				...state,
				set: action.value,
			}
		default:
			return state
	}
}
