import { StyleSheet } from "react-native"

export default StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 8,
	},
	card: {
		alignItems: "center",
		backgroundColor: "white",
		borderColor: "lightgray",
		borderRadius: 20,
		borderWidth: 1,
		height: "100%",
		justifyContent: "center",
		padding: 20,
		width: "100%",
	},
	confidenceWrapper: {
		width: "100%",
	},
	textWrapper: { flex: 1, justifyContent: "center" },
	text: { fontSize: 32 },
	image: {
		aspectRatio: 1,
		marginTop: 20,
		width: "50%",
	},
})
