import { StyleSheet } from "react-native"

// eslint-disable-next-line no-shadow
export enum Side {
	front,
	back,
}

export const cardStyles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 4,
		margin: 8,
		padding: 20,
	},
})
