export interface TCard {
	front: string
	back: string
}

export interface TSet {
	id: string
	title: string
	description: string
	cards: TCard[]
}
