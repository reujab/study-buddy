export interface Set {
	id: string
	title: string
	description: string
	cards: Card[]
}

export interface Card {
	front: string
	back: string
}
