import { createStore, combineReducers } from "redux"

import app, { State as AppState } from "./state"

export interface IState {
	app: AppState
}

export default createStore(combineReducers({
	app,
}))
