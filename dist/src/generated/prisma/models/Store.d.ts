import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StoreModel = runtime.Types.Result.DefaultSelection<Prisma.$StorePayload>;
export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null;
    _min: StoreMinAggregateOutputType | null;
    _max: StoreMaxAggregateOutputType | null;
};
export type StoreMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StoreMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StoreCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type StoreMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StoreMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StoreCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type StoreAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithRelationInput | Prisma.StoreOrderByWithRelationInput[];
    cursor?: Prisma.StoreWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StoreCountAggregateInputType;
    _min?: StoreMinAggregateInputType;
    _max?: StoreMaxAggregateInputType;
};
export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
    [P in keyof T & keyof AggregateStore]: P extends "_count" | "count" ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStore[P]> : Prisma.GetScalarType<T[P], AggregateStore[P]>;
};
export type StoreGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithAggregationInput | Prisma.StoreOrderByWithAggregationInput[];
    by: Prisma.StoreScalarFieldEnum[] | Prisma.StoreScalarFieldEnum;
    having?: Prisma.StoreScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StoreCountAggregateInputType | true;
    _min?: StoreMinAggregateInputType;
    _max?: StoreMaxAggregateInputType;
};
export type StoreGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    _count: StoreCountAggregateOutputType | null;
    _min: StoreMinAggregateOutputType | null;
    _max: StoreMaxAggregateOutputType | null;
};
export type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StoreGroupByOutputType, T["by"]> & {
    [P in keyof T & keyof StoreGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StoreGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StoreGroupByOutputType[P]>;
}>>;
export type StoreWhereInput = {
    AND?: Prisma.StoreWhereInput | Prisma.StoreWhereInput[];
    OR?: Prisma.StoreWhereInput[];
    NOT?: Prisma.StoreWhereInput | Prisma.StoreWhereInput[];
    id?: Prisma.UuidFilter<"Store"> | string;
    name?: Prisma.StringFilter<"Store"> | string;
    createdAt?: Prisma.DateTimeFilter<"Store"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Store"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Store"> | Date | string | null;
    Expense?: Prisma.ExpenseListRelationFilter;
};
export type StoreOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    Expense?: Prisma.ExpenseOrderByRelationAggregateInput;
};
export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.StoreWhereInput | Prisma.StoreWhereInput[];
    OR?: Prisma.StoreWhereInput[];
    NOT?: Prisma.StoreWhereInput | Prisma.StoreWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Store"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Store"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Store"> | Date | string | null;
    Expense?: Prisma.ExpenseListRelationFilter;
}, "id" | "name">;
export type StoreOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StoreCountOrderByAggregateInput;
    _max?: Prisma.StoreMaxOrderByAggregateInput;
    _min?: Prisma.StoreMinOrderByAggregateInput;
};
export type StoreScalarWhereWithAggregatesInput = {
    AND?: Prisma.StoreScalarWhereWithAggregatesInput | Prisma.StoreScalarWhereWithAggregatesInput[];
    OR?: Prisma.StoreScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StoreScalarWhereWithAggregatesInput | Prisma.StoreScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Store"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Store"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Store"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Store"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Store"> | Date | string | null;
};
export type StoreCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseCreateNestedManyWithoutStoreInput;
};
export type StoreUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseUncheckedCreateNestedManyWithoutStoreInput;
};
export type StoreUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUpdateManyWithoutStoreNestedInput;
};
export type StoreUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUncheckedUpdateManyWithoutStoreNestedInput;
};
export type StoreCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StoreUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StoreUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StoreCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StoreMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StoreMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StoreNullableScalarRelationFilter = {
    is?: Prisma.StoreWhereInput | null;
    isNot?: Prisma.StoreWhereInput | null;
};
export type StoreCreateNestedOneWithoutExpenseInput = {
    create?: Prisma.XOR<Prisma.StoreCreateWithoutExpenseInput, Prisma.StoreUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.StoreCreateOrConnectWithoutExpenseInput;
    connect?: Prisma.StoreWhereUniqueInput;
};
export type StoreUpdateOneWithoutExpenseNestedInput = {
    create?: Prisma.XOR<Prisma.StoreCreateWithoutExpenseInput, Prisma.StoreUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.StoreCreateOrConnectWithoutExpenseInput;
    upsert?: Prisma.StoreUpsertWithoutExpenseInput;
    disconnect?: Prisma.StoreWhereInput | boolean;
    delete?: Prisma.StoreWhereInput | boolean;
    connect?: Prisma.StoreWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StoreUpdateToOneWithWhereWithoutExpenseInput, Prisma.StoreUpdateWithoutExpenseInput>, Prisma.StoreUncheckedUpdateWithoutExpenseInput>;
};
export type StoreCreateWithoutExpenseInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StoreUncheckedCreateWithoutExpenseInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StoreCreateOrConnectWithoutExpenseInput = {
    where: Prisma.StoreWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreCreateWithoutExpenseInput, Prisma.StoreUncheckedCreateWithoutExpenseInput>;
};
export type StoreUpsertWithoutExpenseInput = {
    update: Prisma.XOR<Prisma.StoreUpdateWithoutExpenseInput, Prisma.StoreUncheckedUpdateWithoutExpenseInput>;
    create: Prisma.XOR<Prisma.StoreCreateWithoutExpenseInput, Prisma.StoreUncheckedCreateWithoutExpenseInput>;
    where?: Prisma.StoreWhereInput;
};
export type StoreUpdateToOneWithWhereWithoutExpenseInput = {
    where?: Prisma.StoreWhereInput;
    data: Prisma.XOR<Prisma.StoreUpdateWithoutExpenseInput, Prisma.StoreUncheckedUpdateWithoutExpenseInput>;
};
export type StoreUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StoreUncheckedUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StoreCountOutputType = {
    Expense: number;
};
export type StoreCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Expense?: boolean | StoreCountOutputTypeCountExpenseArgs;
};
export type StoreCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreCountOutputTypeSelect<ExtArgs> | null;
};
export type StoreCountOutputTypeCountExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
export type StoreSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    Expense?: boolean | Prisma.Store$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["store"]>;
export type StoreSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["store"]>;
export type StoreSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["store"]>;
export type StoreSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type StoreOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["store"]>;
export type StoreInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Expense?: boolean | Prisma.Store$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.StoreCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StoreIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type StoreIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $StorePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Store";
    objects: {
        Expense: Prisma.$ExpensePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }, ExtArgs["result"]["store"]>;
    composites: {};
};
export type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StorePayload, S>;
export type StoreCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StoreFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: StoreCountAggregateInputType | true;
};
export interface StoreDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>["model"]["Store"];
        meta: {
            name: "Store";
        };
    };
    findUnique<T extends StoreFindUniqueArgs>(args: Prisma.SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StoreFindFirstArgs>(args?: Prisma.SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StoreFindManyArgs>(args?: Prisma.SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StoreCreateArgs>(args: Prisma.SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StoreCreateManyArgs>(args?: Prisma.SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StoreDeleteArgs>(args: Prisma.SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StoreUpdateArgs>(args: Prisma.SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StoreDeleteManyArgs>(args?: Prisma.SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StoreUpdateManyArgs>(args: Prisma.SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StoreUpsertArgs>(args: Prisma.SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StoreCountArgs>(args?: Prisma.Subset<T, StoreCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<"select", any> ? T["select"] extends true ? number : Prisma.GetScalarType<T["select"], StoreCountAggregateOutputType> : number>;
    aggregate<T extends StoreAggregateArgs>(args: Prisma.Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>;
    groupBy<T extends StoreGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<"skip", Prisma.Keys<T>>, Prisma.Extends<"take", Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StoreGroupByArgs["orderBy"];
    } : {
        orderBy?: StoreGroupByArgs["orderBy"];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T["orderBy"]>>>, ByFields extends Prisma.MaybeTupleToUnion<T["by"]>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T["having"]>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T["by"] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            "Field ",
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : "take" extends Prisma.Keys<T> ? "orderBy" extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : "skip" extends Prisma.Keys<T> ? "orderBy" extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StoreFieldRefs;
}
export interface Prisma__StoreClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    Expense<T extends Prisma.Store$ExpenseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Store$ExpenseArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StoreFieldRefs {
    readonly id: Prisma.FieldRef<"Store", "String">;
    readonly name: Prisma.FieldRef<"Store", "String">;
    readonly createdAt: Prisma.FieldRef<"Store", "DateTime">;
    readonly updatedAt: Prisma.FieldRef<"Store", "DateTime">;
    readonly deletedAt: Prisma.FieldRef<"Store", "DateTime">;
}
export type StoreFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where: Prisma.StoreWhereUniqueInput;
};
export type StoreFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where: Prisma.StoreWhereUniqueInput;
};
export type StoreFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithRelationInput | Prisma.StoreOrderByWithRelationInput[];
    cursor?: Prisma.StoreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreScalarFieldEnum | Prisma.StoreScalarFieldEnum[];
};
export type StoreFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithRelationInput | Prisma.StoreOrderByWithRelationInput[];
    cursor?: Prisma.StoreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreScalarFieldEnum | Prisma.StoreScalarFieldEnum[];
};
export type StoreFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithRelationInput | Prisma.StoreOrderByWithRelationInput[];
    cursor?: Prisma.StoreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StoreScalarFieldEnum | Prisma.StoreScalarFieldEnum[];
};
export type StoreCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreCreateInput, Prisma.StoreUncheckedCreateInput>;
};
export type StoreCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StoreCreateManyInput | Prisma.StoreCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    data: Prisma.StoreCreateManyInput | Prisma.StoreCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StoreUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreUpdateInput, Prisma.StoreUncheckedUpdateInput>;
    where: Prisma.StoreWhereUniqueInput;
};
export type StoreUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StoreUpdateManyMutationInput, Prisma.StoreUncheckedUpdateManyInput>;
    where?: Prisma.StoreWhereInput;
    limit?: number;
};
export type StoreUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StoreUpdateManyMutationInput, Prisma.StoreUncheckedUpdateManyInput>;
    where?: Prisma.StoreWhereInput;
    limit?: number;
};
export type StoreUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where: Prisma.StoreWhereUniqueInput;
    create: Prisma.XOR<Prisma.StoreCreateInput, Prisma.StoreUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StoreUpdateInput, Prisma.StoreUncheckedUpdateInput>;
};
export type StoreDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where: Prisma.StoreWhereUniqueInput;
};
export type StoreDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StoreWhereInput;
    limit?: number;
};
export type Store$ExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
export type StoreDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
};
