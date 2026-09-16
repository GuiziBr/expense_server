import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BankModel = runtime.Types.Result.DefaultSelection<Prisma.$BankPayload>;
export type AggregateBank = {
    _count: BankCountAggregateOutputType | null;
    _min: BankMinAggregateOutputType | null;
    _max: BankMaxAggregateOutputType | null;
};
export type BankMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type BankMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type BankCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type BankMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type BankMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type BankCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type BankAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BankWhereInput;
    orderBy?: Prisma.BankOrderByWithRelationInput | Prisma.BankOrderByWithRelationInput[];
    cursor?: Prisma.BankWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BankCountAggregateInputType;
    _min?: BankMinAggregateInputType;
    _max?: BankMaxAggregateInputType;
};
export type GetBankAggregateType<T extends BankAggregateArgs> = {
    [P in keyof T & keyof AggregateBank]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBank[P]> : Prisma.GetScalarType<T[P], AggregateBank[P]>;
};
export type BankGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BankWhereInput;
    orderBy?: Prisma.BankOrderByWithAggregationInput | Prisma.BankOrderByWithAggregationInput[];
    by: Prisma.BankScalarFieldEnum[] | Prisma.BankScalarFieldEnum;
    having?: Prisma.BankScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BankCountAggregateInputType | true;
    _min?: BankMinAggregateInputType;
    _max?: BankMaxAggregateInputType;
};
export type BankGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    _count: BankCountAggregateOutputType | null;
    _min: BankMinAggregateOutputType | null;
    _max: BankMaxAggregateOutputType | null;
};
export type GetBankGroupByPayload<T extends BankGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BankGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BankGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BankGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BankGroupByOutputType[P]>;
}>>;
export type BankWhereInput = {
    AND?: Prisma.BankWhereInput | Prisma.BankWhereInput[];
    OR?: Prisma.BankWhereInput[];
    NOT?: Prisma.BankWhereInput | Prisma.BankWhereInput[];
    id?: Prisma.UuidFilter<"Bank"> | string;
    name?: Prisma.StringFilter<"Bank"> | string;
    createdAt?: Prisma.DateTimeFilter<"Bank"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Bank"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Bank"> | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodListRelationFilter;
    Expense?: Prisma.ExpenseListRelationFilter;
};
export type BankOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    StatementPeriod?: Prisma.StatementPeriodOrderByRelationAggregateInput;
    Expense?: Prisma.ExpenseOrderByRelationAggregateInput;
};
export type BankWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.BankWhereInput | Prisma.BankWhereInput[];
    OR?: Prisma.BankWhereInput[];
    NOT?: Prisma.BankWhereInput | Prisma.BankWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Bank"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Bank"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Bank"> | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodListRelationFilter;
    Expense?: Prisma.ExpenseListRelationFilter;
}, "id" | "name">;
export type BankOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.BankCountOrderByAggregateInput;
    _max?: Prisma.BankMaxOrderByAggregateInput;
    _min?: Prisma.BankMinOrderByAggregateInput;
};
export type BankScalarWhereWithAggregatesInput = {
    AND?: Prisma.BankScalarWhereWithAggregatesInput | Prisma.BankScalarWhereWithAggregatesInput[];
    OR?: Prisma.BankScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BankScalarWhereWithAggregatesInput | Prisma.BankScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Bank"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Bank"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Bank"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Bank"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Bank"> | Date | string | null;
};
export type BankCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodCreateNestedManyWithoutBankInput;
    Expense?: Prisma.ExpenseCreateNestedManyWithoutBankInput;
};
export type BankUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedCreateNestedManyWithoutBankInput;
    Expense?: Prisma.ExpenseUncheckedCreateNestedManyWithoutBankInput;
};
export type BankUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUpdateManyWithoutBankNestedInput;
    Expense?: Prisma.ExpenseUpdateManyWithoutBankNestedInput;
};
export type BankUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedUpdateManyWithoutBankNestedInput;
    Expense?: Prisma.ExpenseUncheckedUpdateManyWithoutBankNestedInput;
};
export type BankCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type BankUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BankUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BankCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type BankMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type BankMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type BankScalarRelationFilter = {
    is?: Prisma.BankWhereInput;
    isNot?: Prisma.BankWhereInput;
};
export type BankNullableScalarRelationFilter = {
    is?: Prisma.BankWhereInput | null;
    isNot?: Prisma.BankWhereInput | null;
};
export type BankCreateNestedOneWithoutStatementPeriodInput = {
    create?: Prisma.XOR<Prisma.BankCreateWithoutStatementPeriodInput, Prisma.BankUncheckedCreateWithoutStatementPeriodInput>;
    connectOrCreate?: Prisma.BankCreateOrConnectWithoutStatementPeriodInput;
    connect?: Prisma.BankWhereUniqueInput;
};
export type BankUpdateOneRequiredWithoutStatementPeriodNestedInput = {
    create?: Prisma.XOR<Prisma.BankCreateWithoutStatementPeriodInput, Prisma.BankUncheckedCreateWithoutStatementPeriodInput>;
    connectOrCreate?: Prisma.BankCreateOrConnectWithoutStatementPeriodInput;
    upsert?: Prisma.BankUpsertWithoutStatementPeriodInput;
    connect?: Prisma.BankWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BankUpdateToOneWithWhereWithoutStatementPeriodInput, Prisma.BankUpdateWithoutStatementPeriodInput>, Prisma.BankUncheckedUpdateWithoutStatementPeriodInput>;
};
export type BankCreateNestedOneWithoutExpenseInput = {
    create?: Prisma.XOR<Prisma.BankCreateWithoutExpenseInput, Prisma.BankUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.BankCreateOrConnectWithoutExpenseInput;
    connect?: Prisma.BankWhereUniqueInput;
};
export type BankUpdateOneWithoutExpenseNestedInput = {
    create?: Prisma.XOR<Prisma.BankCreateWithoutExpenseInput, Prisma.BankUncheckedCreateWithoutExpenseInput>;
    connectOrCreate?: Prisma.BankCreateOrConnectWithoutExpenseInput;
    upsert?: Prisma.BankUpsertWithoutExpenseInput;
    disconnect?: Prisma.BankWhereInput | boolean;
    delete?: Prisma.BankWhereInput | boolean;
    connect?: Prisma.BankWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BankUpdateToOneWithWhereWithoutExpenseInput, Prisma.BankUpdateWithoutExpenseInput>, Prisma.BankUncheckedUpdateWithoutExpenseInput>;
};
export type BankCreateWithoutStatementPeriodInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseCreateNestedManyWithoutBankInput;
};
export type BankUncheckedCreateWithoutStatementPeriodInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    Expense?: Prisma.ExpenseUncheckedCreateNestedManyWithoutBankInput;
};
export type BankCreateOrConnectWithoutStatementPeriodInput = {
    where: Prisma.BankWhereUniqueInput;
    create: Prisma.XOR<Prisma.BankCreateWithoutStatementPeriodInput, Prisma.BankUncheckedCreateWithoutStatementPeriodInput>;
};
export type BankUpsertWithoutStatementPeriodInput = {
    update: Prisma.XOR<Prisma.BankUpdateWithoutStatementPeriodInput, Prisma.BankUncheckedUpdateWithoutStatementPeriodInput>;
    create: Prisma.XOR<Prisma.BankCreateWithoutStatementPeriodInput, Prisma.BankUncheckedCreateWithoutStatementPeriodInput>;
    where?: Prisma.BankWhereInput;
};
export type BankUpdateToOneWithWhereWithoutStatementPeriodInput = {
    where?: Prisma.BankWhereInput;
    data: Prisma.XOR<Prisma.BankUpdateWithoutStatementPeriodInput, Prisma.BankUncheckedUpdateWithoutStatementPeriodInput>;
};
export type BankUpdateWithoutStatementPeriodInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUpdateManyWithoutBankNestedInput;
};
export type BankUncheckedUpdateWithoutStatementPeriodInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    Expense?: Prisma.ExpenseUncheckedUpdateManyWithoutBankNestedInput;
};
export type BankCreateWithoutExpenseInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodCreateNestedManyWithoutBankInput;
};
export type BankUncheckedCreateWithoutExpenseInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedCreateNestedManyWithoutBankInput;
};
export type BankCreateOrConnectWithoutExpenseInput = {
    where: Prisma.BankWhereUniqueInput;
    create: Prisma.XOR<Prisma.BankCreateWithoutExpenseInput, Prisma.BankUncheckedCreateWithoutExpenseInput>;
};
export type BankUpsertWithoutExpenseInput = {
    update: Prisma.XOR<Prisma.BankUpdateWithoutExpenseInput, Prisma.BankUncheckedUpdateWithoutExpenseInput>;
    create: Prisma.XOR<Prisma.BankCreateWithoutExpenseInput, Prisma.BankUncheckedCreateWithoutExpenseInput>;
    where?: Prisma.BankWhereInput;
};
export type BankUpdateToOneWithWhereWithoutExpenseInput = {
    where?: Prisma.BankWhereInput;
    data: Prisma.XOR<Prisma.BankUpdateWithoutExpenseInput, Prisma.BankUncheckedUpdateWithoutExpenseInput>;
};
export type BankUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUpdateManyWithoutBankNestedInput;
};
export type BankUncheckedUpdateWithoutExpenseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    StatementPeriod?: Prisma.StatementPeriodUncheckedUpdateManyWithoutBankNestedInput;
};
export type BankCountOutputType = {
    StatementPeriod: number;
    Expense: number;
};
export type BankCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    StatementPeriod?: boolean | BankCountOutputTypeCountStatementPeriodArgs;
    Expense?: boolean | BankCountOutputTypeCountExpenseArgs;
};
export type BankCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankCountOutputTypeSelect<ExtArgs> | null;
};
export type BankCountOutputTypeCountStatementPeriodArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatementPeriodWhereInput;
};
export type BankCountOutputTypeCountExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
export type BankSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    StatementPeriod?: boolean | Prisma.Bank$StatementPeriodArgs<ExtArgs>;
    Expense?: boolean | Prisma.Bank$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.BankCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bank"]>;
export type BankSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["bank"]>;
export type BankSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["bank"]>;
export type BankSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type BankOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["bank"]>;
export type BankInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    StatementPeriod?: boolean | Prisma.Bank$StatementPeriodArgs<ExtArgs>;
    Expense?: boolean | Prisma.Bank$ExpenseArgs<ExtArgs>;
    _count?: boolean | Prisma.BankCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BankIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type BankIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $BankPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bank";
    objects: {
        StatementPeriod: Prisma.$StatementPeriodPayload<ExtArgs>[];
        Expense: Prisma.$ExpensePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }, ExtArgs["result"]["bank"]>;
    composites: {};
};
export type BankGetPayload<S extends boolean | null | undefined | BankDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BankPayload, S>;
export type BankCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BankFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BankCountAggregateInputType | true;
};
export interface BankDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bank'];
        meta: {
            name: 'Bank';
        };
    };
    findUnique<T extends BankFindUniqueArgs>(args: Prisma.SelectSubset<T, BankFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BankFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BankFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BankFindFirstArgs>(args?: Prisma.SelectSubset<T, BankFindFirstArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BankFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BankFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BankFindManyArgs>(args?: Prisma.SelectSubset<T, BankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BankCreateArgs>(args: Prisma.SelectSubset<T, BankCreateArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BankCreateManyArgs>(args?: Prisma.SelectSubset<T, BankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BankCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BankCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BankDeleteArgs>(args: Prisma.SelectSubset<T, BankDeleteArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BankUpdateArgs>(args: Prisma.SelectSubset<T, BankUpdateArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BankDeleteManyArgs>(args?: Prisma.SelectSubset<T, BankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BankUpdateManyArgs>(args: Prisma.SelectSubset<T, BankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BankUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BankUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BankUpsertArgs>(args: Prisma.SelectSubset<T, BankUpsertArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BankCountArgs>(args?: Prisma.Subset<T, BankCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BankCountAggregateOutputType> : number>;
    aggregate<T extends BankAggregateArgs>(args: Prisma.Subset<T, BankAggregateArgs>): Prisma.PrismaPromise<GetBankAggregateType<T>>;
    groupBy<T extends BankGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BankGroupByArgs['orderBy'];
    } : {
        orderBy?: BankGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BankFieldRefs;
}
export interface Prisma__BankClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    StatementPeriod<T extends Prisma.Bank$StatementPeriodArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bank$StatementPeriodArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    Expense<T extends Prisma.Bank$ExpenseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bank$ExpenseArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BankFieldRefs {
    readonly id: Prisma.FieldRef<"Bank", 'String'>;
    readonly name: Prisma.FieldRef<"Bank", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Bank", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Bank", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Bank", 'DateTime'>;
}
export type BankFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where: Prisma.BankWhereUniqueInput;
};
export type BankFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where: Prisma.BankWhereUniqueInput;
};
export type BankFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where?: Prisma.BankWhereInput;
    orderBy?: Prisma.BankOrderByWithRelationInput | Prisma.BankOrderByWithRelationInput[];
    cursor?: Prisma.BankWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BankScalarFieldEnum | Prisma.BankScalarFieldEnum[];
};
export type BankFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where?: Prisma.BankWhereInput;
    orderBy?: Prisma.BankOrderByWithRelationInput | Prisma.BankOrderByWithRelationInput[];
    cursor?: Prisma.BankWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BankScalarFieldEnum | Prisma.BankScalarFieldEnum[];
};
export type BankFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where?: Prisma.BankWhereInput;
    orderBy?: Prisma.BankOrderByWithRelationInput | Prisma.BankOrderByWithRelationInput[];
    cursor?: Prisma.BankWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BankScalarFieldEnum | Prisma.BankScalarFieldEnum[];
};
export type BankCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BankCreateInput, Prisma.BankUncheckedCreateInput>;
};
export type BankCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BankCreateManyInput | Prisma.BankCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BankCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    data: Prisma.BankCreateManyInput | Prisma.BankCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BankUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BankUpdateInput, Prisma.BankUncheckedUpdateInput>;
    where: Prisma.BankWhereUniqueInput;
};
export type BankUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BankUpdateManyMutationInput, Prisma.BankUncheckedUpdateManyInput>;
    where?: Prisma.BankWhereInput;
    limit?: number;
};
export type BankUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BankUpdateManyMutationInput, Prisma.BankUncheckedUpdateManyInput>;
    where?: Prisma.BankWhereInput;
    limit?: number;
};
export type BankUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where: Prisma.BankWhereUniqueInput;
    create: Prisma.XOR<Prisma.BankCreateInput, Prisma.BankUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BankUpdateInput, Prisma.BankUncheckedUpdateInput>;
};
export type BankDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where: Prisma.BankWhereUniqueInput;
};
export type BankDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BankWhereInput;
    limit?: number;
};
export type Bank$StatementPeriodArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Bank$ExpenseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BankDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
};
