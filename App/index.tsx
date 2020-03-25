import "react-native-gesture-handler"

import React from "react"
import Root from "./Root"
import store from "./store"
import { Provider } from "react-redux"

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		)
	}
}
