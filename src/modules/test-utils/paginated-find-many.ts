type Row = { id: string }
type OrderClause = Record<string, "asc" | "desc">
type FindManyArgs = {
	orderBy: OrderClause | OrderClause[]
	skip?: number
	take?: number
}

const comparable = (value: unknown) =>
	value instanceof Date ? value.getTime() : (value as number | string | boolean)

/**
 * In-memory stand-in for a Prisma `findMany` that honours `orderBy`, `skip` and `take`.
 * Rows that tie on every `orderBy` clause come back in a different order on each call,
 * the way a real database may return them, so a missing tie-breaker shows up as
 * repeated or omitted records when paging.
 */
export const createPaginatedFindMany = (rows: Row[]) => {
	let call = 0
	return async ({ orderBy, skip = 0, take }: FindManyArgs) => {
		const clauses = Array.isArray(orderBy) ? orderBy : [orderBy]
		const pool = call++ % 2 === 0 ? [...rows] : [...rows].reverse()
		const sorted = pool.sort((a, b) => {
			for (const clause of clauses) {
				const [field, direction] = Object.entries(clause)[0]
				const left = comparable((a as Record<string, unknown>)[field])
				const right = comparable((b as Record<string, unknown>)[field])
				if (left === right) continue
				const result = left < right ? -1 : 1
				return direction === "asc" ? result : -result
			}
			return 0
		})
		return sorted.slice(skip, take === undefined ? undefined : skip + take)
	}
}
