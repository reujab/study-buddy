import { StyleSheet } from "react-native"

export default StyleSheet.create({
	buttons: {
		flexDirection: "row",
		// fixes bug on Android where height increases by a pixel when master star icon is solid
		height: 42,
	},
	button: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	image: {
		height: 32,
		width: 32,
	},
	addButtonWrapper: {
		alignSelf: "center",
		marginVertical: 20,
	},
	addButton: {
		aspectRatio: 1,
		justifyContent: "center",
	},
})
