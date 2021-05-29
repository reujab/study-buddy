import { StyleSheet } from "react-native";

export enum Side {
	front,
	back,
}

export const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 4,
		margin: 20,
		marginBottom: 0,
		padding: 20,
	},
})
