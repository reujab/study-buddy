import { createStore, combineReducers } from "redux"

import app from "./state"

export default createStore(combineReducers({
	app,
}))
