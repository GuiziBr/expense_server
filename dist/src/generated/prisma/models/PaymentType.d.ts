import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentTypeModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentTypePayload>;
export type AggregatePaymentType = {
    _count: PaymentTypeCountAggregateOutputType | null;
    _min: PaymentTypeMinAggregateOutputType | null;
    _max: PaymentTypeMaxAggregateOutputType | null;
};
export type PaymentTypeMinAggregateOutputType = {
    id: string | null;
    description: string | null;
    hasStatement: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PaymentTypeMaxAggregateOutputType = {
    id: string | null;
    description: string | null;
    hasStatement: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PaymentTypeCountAggregateOutputType = {
    id: number;
    description: number;
    hasStatement: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type PaymentTypeMinAggregateInputType = {
    id?: true;
    description?: true;
    hasStatement?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PaymentTypeMaxAggregateInputType = {
    id?: true;
    description?: true;
    hasStatement?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PaymentTypeCountAggregateInputType = {
    id?: true;
    description?: true;
    hasStatement?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type PaymentTypeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTypeWhereInput;
    orderBy?: Prisma.PaymentTypeOrderByWithRelationInput | Prisma.PaymentTypeOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentTypeCountAggregateInputType;
    _min?: PaymentTypeMinAggregateInputType;
    _max?: PaymentTypeMaxAggregateInputType;
};
export type GetPaymentTypeAggregateType<T extends PaymentTypeAggregateArgs> = {
    [P in keyof T & keyof AggregatePaymentType]: P extends "_count" | "count" ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePaymentType[P]> : Prisma.GetScalarType<T[P], AggregatePaymentType[P]>;
};
export type PaymentTypeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTypeWhereInput;
    orderBy?: Prisma.PaymentTypeOrderByWithAggregationInput | Prisma.PaymentTypeOrderByWithAggregationInput[];
    by: Prisma.PaymentTypeScalarFieldEnum[] | Prisma.PaymentTypeScalarFieldEnum;
    having?: Prisma.PaymentTypeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentTypeCountAggregateInputType | true;
    _min?: PaymentTypeMinAggregateInputType;
    _max?: PaymentTypeMaxAggregateInputType;
};
export type PaymentTypeGroupByOutputType = {
    id: string;
    description: string;
    hasStatement: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    _count: PaymentTypeCountAggregateOutputType | null;
    _min: PaymentTypeMinAggregateOutputType | null;
    _max: PaymentTypeMaxAggregateOutputType | null;
};
export type GetPaymentTypeGroupByPayload<T extends PaymentTypeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentTypeGroupByOutputType, T["by"]> & {
    [P in keyof T & keyof PaymentTypeGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentTypeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentTypeGroupByOutputType[P]>;
}>>;
export type PaymentTypeWhereInput = {
    AND?: Prisma.PaymentTypeWhereInput | Prisma.PaymentTypeWhereInput[];
    OR?: Prisma.PaymentTypeWhereInput[];
    NOT?: Prisma.PaymentTypeWhereInput | Prisma.PaymentTypeWhereInput[];
    id?: Prisma.UuidFilter<"PaymentType"> | string;
    description?: Prisma.StringFilter<"PaymentType"> | string;
    hasStatement?: Prisma.BoolFilter<"PaymentType"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PaymentType"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"PaymentType"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"PaymentType"> | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodListRelationFilter;
    Expense?: Prisma.ExpenseListRelationFilter;
};
export type PaymentTypeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    hasStatement?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    StatementPeriod?: Prisma.StatementPeriodOrderByRelationAggregateInput;
    Expense?: Prisma.ExpenseOrderByRelationAggregateInput;
};
export type PaymentTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    description?: string;
    AND?: Prisma.PaymentTypeWhereInput | Prisma.PaymentTypeWhereInput[];
    OR?: Prisma.PaymentTypeWhereInput[];
    NOT?: Prisma.PaymentTypeWhereInput | Prisma.PaymentTypeWhereInput[];
    hasStatement?: Prisma.BoolFilter<"PaymentType"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PaymentType"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"PaymentType"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"PaymentType"> | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodListRelationFilter;
    Expense?: Prisma.ExpenseListRelationFilter;
}, "id" | "description">;
export type PaymentTypeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    hasStatement?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PaymentTypeCountOrderByAggregateInput;
    _max?: Prisma.PaymentTypeMaxOrderByAggregateInput;
    _min?: Prisma.PaymentTypeMinOrderByAggregateInput;
};
export type PaymentTypeScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentTypeScalarWhereWithAggregatesInput | Prisma.PaymentTypeScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentTypeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentTypeScalarWhereWithAggregatesInput | Prisma.PaymentTypeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PaymentType"> | string;
    description?: Prisma.StringWithAggregatesFilter<"PaymentType"> | string;
    hasStatement?: Prisma.BoolWithAggregatesFilter<"PaymentType"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PaymentType"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PaymentType"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PaymentType"> | Date | string | null;
};
export type PaymentTypeCreateInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodCreateNestedManyWithoutPaymentTypeInput;
    Expense?: Prisma.ExpenseCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeUncheckedCreateInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedCreateNestedManyWithoutPaymentTypeInput;
    Expense?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUpdateManyWithoutPaymentTypeNestedInput;
    Expense?: Prisma.ExpenseUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedUpdateManyWithoutPaymentTypeNestedInput;
    Expense?: Prisma.ExpenseUncheckedUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeCreateManyInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type PaymentTypeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PaymentTypeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PaymentTypeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    hasStatement?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PaymentTypeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    hasStatement?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PaymentTypeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    hasStatement?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PaymentTypeScalarRelationFilter = {
    is?: Prisma.PaymentTypeWhereInput;
    isNot?: Prisma.PaymentTypeWhereInput;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type PaymentTypeCreateNestedOneWithoutStatementPeriodInput = {
    create?: Prisma.XOR<Prisma.PaymentTypeCreateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedCreateWithoutStatementPeriodInput>;
    connectOrCreate?: Prisma.PaymentTypeCreateOrConnectWithoutStatementPeriodInput;
    connect?: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeUpdateOneRequiredWithoutStatementPeriodNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentTypeCreateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedCreateWithoutStatementPeriodInput>;
    connectOrCreate?: Prisma.PaymentTypeCreateOrConnectWithoutStatementPeriodInput;
    upsert?: Prisma.PaymentTypeUpsertWithoutStatementPeriodInput;
    connect?: Prisma.PaymentTypeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentTypeUpdateToOneWithWhereWithoutStatementPeriodInput, Prisma.PaymentTypeUpdateWithoutStatementPeriodInput>, Prisma.PaymentTypeUncheckedUpdateWithoutStatementPeriodInput>;
};
export type PaymentTypeCreateNestedOneWithoutExpenseInput = {
    create?: Prisma.XOR<Prisma.PaymentTypeCreateWithoutExpenseInput, Prisma.PaymentTypeUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.PaymentTypeCreateOrConnectWithoutExpenseInput;
    connect?: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentTypeCreateWithoutExpenseInput, Prisma.PaymentTypeUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.PaymentTypeCreateOrConnectWithoutExpenseInput;
    upsert?: Prisma.PaymentTypeUpsertWithoutExpenseInput;
    connect?: Prisma.PaymentTypeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentTypeUpdateToOneWithWhereWithoutExpenseInput, Prisma.PaymentTypeUpdateWithoutExpenseInput>, Prisma.PaymentTypeUncheckedUpdateWithoutExpenseInput>;
};
export type PaymentTypeCreateWithoutStatementPeriodInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeUncheckedCreateWithoutStatementPeriodInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseUncheckedCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeCreateOrConnectWithoutStatementPeriodInput = {
    where: Prisma.PaymentTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTypeCreateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedCreateWithoutStatementPeriodInput>;
};
export type PaymentTypeUpsertWithoutStatementPeriodInput = {
    update: Prisma.XOR<Prisma.PaymentTypeUpdateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedUpdateWithoutStatementPeriodInput>;
    create: Prisma.XOR<Prisma.PaymentTypeCreateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedCreateWithoutStatementPeriodInput>;
    where?: Prisma.PaymentTypeWhereInput;
};
export type PaymentTypeUpdateToOneWithWhereWithoutStatementPeriodInput = {
    where?: Prisma.PaymentTypeWhereInput;
    data: Prisma.XOR<Prisma.PaymentTypeUpdateWithoutStatementPeriodInput, Prisma.PaymentTypeUncheckedUpdateWithoutStatementPeriodInput>;
};
export type PaymentTypeUpdateWithoutStatementPeriodInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeUncheckedUpdateWithoutStatementPeriodInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUncheckedUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeCreateWithoutExpenseInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeUncheckedCreateWithoutExpenseInput = {
    id?: string;
    description: string;
    hasStatement: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedCreateNestedManyWithoutPaymentTypeInput;
};
export type PaymentTypeCreateOrConnectWithoutExpenseInput = {
    where: Prisma.PaymentTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTypeCreateWithoutExpenseInput, Prisma.PaymentTypeUncheckedCreateWithoutExpenseInput>;
};
export type PaymentTypeUpsertWithoutExpenseInput = {
    update: Prisma.XOR<Prisma.PaymentTypeUpdateWithoutExpenseInput, Prisma.PaymentTypeUncheckedUpdateWithoutExpenseInput>;
    create: Prisma.XOR<Prisma.PaymentTypeCreateWithoutExpenseInput, Prisma.PaymentTypeUncheckedCreateWithoutExpenseInput>;
    where?: Prisma.PaymentTypeWhereInput;
};
export type PaymentTypeUpdateToOneWithWhereWithoutExpenseInput = {
    where?: Prisma.PaymentTypeWhereInput;
    data: Prisma.XOR<Prisma.PaymentTypeUpdateWithoutExpenseInput, Prisma.PaymentTypeUncheckedUpdateWithoutExpenseInput>;
};
export type PaymentTypeUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeUncheckedUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    hasStatement?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedUpdateManyWithoutPaymentTypeNestedInput;
};
export type PaymentTypeCountOutputType = {
    StatementPeriod: number;
    Expense: number;
};
export type PaymentTypeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    StatementPeriod?: boolean | PaymentTypeCountOutputTypeCountStatementPeriodArgs;
    Expense?: boolean | PaymentTypeCountOutputTypeCountExpenseArgs;
};
export type PaymentTypeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeCountOutputTypeSelect<ExtArgs> | null;
};
export type PaymentTypeCountOutputTypeCountStatementPeriodArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatementPeriodWhereInput;
};
export type PaymentTypeCountOutputTypeCountExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
export type PaymentTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    hasStatement?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    StatementPeriod?: boolean | Prisma.PaymentType$StatementPeriodArgs<ExtArgs>;
    Expense?: boolean | Prisma.PaymentType$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.PaymentTypeCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentType"]>;
export type PaymentTypeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    hasStatement?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["paymentType"]>;
export type PaymentTypeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    hasStatement?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["paymentType"]>;
export type PaymentTypeSelectScalar = {
    id?: boolean;
    description?: boolean;
    hasStatement?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type PaymentTypeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "description" | "hasStatement" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["paymentType"]>;
export type PaymentTypeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    StatementPeriod?: boolean | Prisma.PaymentType$StatementPeriodArgs<ExtArgs>;
    Expense?: boolean | Prisma.PaymentType$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.PaymentTypeCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PaymentTypeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PaymentTypeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PaymentTypePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PaymentType";
    objects: {
        StatementPeriod: Prisma.$StatementPeriodPayload<ExtArgs>[];
        Expense: Prisma.$ExpensePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        description: string;
        hasStatement: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }, ExtArgs["result"]["paymentType"]>;
    composites: {};
};
export type PaymentTypeGetPayload<S extends boolean | null | undefined | PaymentTypeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload, S>;
export type PaymentTypeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentTypeFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: PaymentTypeCountAggregateInputType | true;
};
export interface PaymentTypeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>["model"]["PaymentType"];
        meta: {
            name: "PaymentType";
        };
    };
    findUnique<T extends PaymentTypeFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentTypeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentTypeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentTypeFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentTypeFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentTypeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentTypeFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentTypeCreateArgs>(args: Prisma.SelectSubset<T, PaymentTypeCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentTypeCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentTypeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentTypeDeleteArgs>(args: Prisma.SelectSubset<T, PaymentTypeDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentTypeUpdateArgs>(args: Prisma.SelectSubset<T, PaymentTypeUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentTypeDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentTypeUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentTypeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentTypeUpsertArgs>(args: Prisma.SelectSubset<T, PaymentTypeUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentTypeCountArgs>(args?: Prisma.Subset<T, PaymentTypeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<"select", any> ? T["select"] extends true ? number : Prisma.GetScalarType<T["select"], PaymentTypeCountAggregateOutputType> : number>;
    aggregate<T extends PaymentTypeAggregateArgs>(args: Prisma.Subset<T, PaymentTypeAggregateArgs>): Prisma.PrismaPromise<GetPaymentTypeAggregateType<T>>;
    groupBy<T extends PaymentTypeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<"skip", Prisma.Keys<T>>, Prisma.Extends<"take", Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentTypeGroupByArgs["orderBy"];
    } : {
        orderBy?: PaymentTypeGroupByArgs["orderBy"];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentTypeFieldRefs;
}
export interface Prisma__PaymentTypeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    StatementPeriod<T extends Prisma.PaymentType$StatementPeriodArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentType$StatementPeriodArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    Expense<T extends Prisma.PaymentType$ExpenseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentType$ExpenseArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentTypeFieldRefs {
    readonly id: Prisma.FieldRef<"PaymentType", "String">;
    readonly description: Prisma.FieldRef<"PaymentType", "String">;
    readonly hasStatement: Prisma.FieldRef<"PaymentType", "Boolean">;
    readonly createdAt: Prisma.FieldRef<"PaymentType", "DateTime">;
    readonly updatedAt: Prisma.FieldRef<"PaymentType", "DateTime">;
    readonly deletedAt: Prisma.FieldRef<"PaymentType", "DateTime">;
}
export type PaymentTypeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where?: Prisma.PaymentTypeWhereInput;
    orderBy?: Prisma.PaymentTypeOrderByWithRelationInput | Prisma.PaymentTypeOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTypeScalarFieldEnum | Prisma.PaymentTypeScalarFieldEnum[];
};
export type PaymentTypeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where?: Prisma.PaymentTypeWhereInput;
    orderBy?: Prisma.PaymentTypeOrderByWithRelationInput | Prisma.PaymentTypeOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTypeScalarFieldEnum | Prisma.PaymentTypeScalarFieldEnum[];
};
export type PaymentTypeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where?: Prisma.PaymentTypeWhereInput;
    orderBy?: Prisma.PaymentTypeOrderByWithRelationInput | Prisma.PaymentTypeOrderByWithRelationInput[];
    cursor?: Prisma.PaymentTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentTypeScalarFieldEnum | Prisma.PaymentTypeScalarFieldEnum[];
};
export type PaymentTypeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentTypeCreateInput, Prisma.PaymentTypeUncheckedCreateInput>;
};
export type PaymentTypeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentTypeCreateManyInput | Prisma.PaymentTypeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentTypeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    data: Prisma.PaymentTypeCreateManyInput | Prisma.PaymentTypeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentTypeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentTypeUpdateInput, Prisma.PaymentTypeUncheckedUpdateInput>;
    where: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentTypeUpdateManyMutationInput, Prisma.PaymentTypeUncheckedUpdateManyInput>;
    where?: Prisma.PaymentTypeWhereInput;
    limit?: number;
};
export type PaymentTypeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentTypeUpdateManyMutationInput, Prisma.PaymentTypeUncheckedUpdateManyInput>;
    where?: Prisma.PaymentTypeWhereInput;
    limit?: number;
};
export type PaymentTypeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where: Prisma.PaymentTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentTypeCreateInput, Prisma.PaymentTypeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentTypeUpdateInput, Prisma.PaymentTypeUncheckedUpdateInput>;
};
export type PaymentTypeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
    where: Prisma.PaymentTypeWhereUniqueInput;
};
export type PaymentTypeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentTypeWhereInput;
    limit?: number;
};
export type PaymentType$StatementPeriodArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    where?: Prisma.StatementPeriodWhereInput;
    orderBy?: Prisma.StatementPeriodOrderByWithRelationInput | Prisma.StatementPeriodOrderByWithRelationInput[];
    cursor?: Prisma.StatementPeriodWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StatementPeriodScalarFieldEnum | Prisma.StatementPeriodScalarFieldEnum[];
};
export type PaymentType$ExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentTypeSelect<ExtArgs> | null;
    omit?: Prisma.PaymentTypeOmit<ExtArgs> | null;
    include?: Prisma.PaymentTypeInclude<ExtArgs> | null;
};
