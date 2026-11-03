export interface Category {
	id: string
	description: string
	isEnvelope: boolean
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}
