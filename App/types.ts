export interface ICard {
	front: string
	back: string
}

export interface ISet {
	id: string
	title: string
	description: string
	cards: ICard[]
}
