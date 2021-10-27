import { size } from "../Card/constants"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
	totalProgressWrapper: {
		padding: 20,
	},
	cardTouchWrapper: {
		alignItems: "center",
		aspectRatio: 1,
		justifyContent: "center",
		width: "100%",
	},
	cardWrapper: {
		width: size,
		height: size,
	},
	faceWrapper: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
})
