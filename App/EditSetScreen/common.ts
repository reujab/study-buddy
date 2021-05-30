import { StyleSheet } from "react-native";

export enum Side {
	front,
	back,
}

export const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 4,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 20,
	},
})
