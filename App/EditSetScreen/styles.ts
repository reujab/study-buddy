import { StyleSheet } from "react-native"

export default StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 8,
	},
	searchBar: {
		alignItems: "center",
		backgroundColor: "#00000011",
		borderRadius: 5,
		flexDirection: "row",
		height: 48,
		marginBottom: 8,
	},
	searchIcon: { marginLeft: 8 },
	searchInput: {
		flex: 1,
		fontSize: 16,
		height: "100%",
		paddingLeft: 8,
	},
	clearSearchIcon: { marginRight: 8 },
	noResultsWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	noResults: {
		opacity: 0.5,
		fontSize: 48,
	},
	addButtonWrapper: {
		alignSelf: "center",
		marginVertical: 10,
	},
	addButton: {
		aspectRatio: 1,
		justifyContent: "center",
	},
})
