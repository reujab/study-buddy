import Face from "./Face"
import FlipCard from "../DetailsScreen/Cards/FlipCard"
import React from "react"
import RootStore from "../RootStore"
import context from "../context"
import { View } from "react-native"
import { observer } from "mobx-react"

@observer
export default class StudyScreen extends React.Component {
	static contextType = context

	context: RootStore = null

	render(): JSX.Element {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						alignItems: "center",
						aspectRatio: 1,
						justifyContent: "center",
						width: "100%",
					}}
				>
					<FlipCard front={this.context.selectedSet.studyCards[0].front} back={this.context.selectedSet.studyCards[0].back} />
				</View>
				<View
					style={{
						alignItems: "center",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
							width: "100%",
						}}
					>
						<Face
							icon="frown"
							color="#f44336"
							onPress={(): void => console.log(":(")}
						/>
						<Face
							icon="meh"
							color="#ffc107"
							onPress={(): void => console.log(":|")}
						/>
						<Face
							icon="smile"
							color="#4caf50"
							onPress={(): void => console.log(":)")}
						/>
					</View>
				</View>
			</View>
		)
	}
}
