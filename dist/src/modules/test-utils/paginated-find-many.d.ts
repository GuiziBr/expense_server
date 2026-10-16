type Row = {
    id: string;
};
type OrderClause = Record<string, "asc" | "desc">;
type FindManyArgs = {
    orderBy: OrderClause | OrderClause[];
    skip?: number;
    take?: number;
};
export declare const createPaginatedFindMany: (rows: Row[]) => ({ orderBy, skip, take }: FindManyArgs) => Promise<Row[]>;
export {};
