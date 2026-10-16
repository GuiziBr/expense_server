const comparable = (value) => value instanceof Date ? value.getTime() : value;
export const createPaginatedFindMany = (rows) => {
    let call = 0;
    return async ({ orderBy, skip = 0, take }) => {
        const clauses = Array.isArray(orderBy) ? orderBy : [orderBy];
        const pool = call++ % 2 === 0 ? [...rows] : [...rows].reverse();
        const sorted = pool.sort((a, b) => {
            for (const clause of clauses) {
                const [field, direction] = Object.entries(clause)[0];
                const left = comparable(a[field]);
                const right = comparable(b[field]);
                if (left === right)
                    continue;
                const result = left < right ? -1 : 1;
                return direction === "asc" ? result : -result;
            }
            return 0;
        });
        return sorted.slice(skip, take === undefined ? undefined : skip + take);
    };
};
//# sourceMappingURL=paginated-find-many.js.map