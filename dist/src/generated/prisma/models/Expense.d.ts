import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExpenseModel = runtime.Types.Result.DefaultSelection<Prisma.$ExpensePayload>;
export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null;
    _avg: ExpenseAvgAggregateOutputType | null;
    _sum: ExpenseSumAggregateOutputType | null;
    _min: ExpenseMinAggregateOutputType | null;
    _max: ExpenseMaxAggregateOutputType | null;
};
export type ExpenseAvgAggregateOutputType = {
    amount: number | null;
};
export type ExpenseSumAggregateOutputType = {
    amount: number | null;
};
export type ExpenseMinAggregateOutputType = {
    id: string | null;
    description: string | null;
    date: Date | null;
    amount: number | null;
    split: boolean | null;
    personal: boolean | null;
    dueDate: Date | null;
    ownerId: string | null;
    categoryId: string | null;
    paymentTypeId: string | null;
    bankId: string | null;
    storeId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ExpenseMaxAggregateOutputType = {
    id: string | null;
    description: string | null;
    date: Date | null;
    amount: number | null;
    split: boolean | null;
    personal: boolean | null;
    dueDate: Date | null;
    ownerId: string | null;
    categoryId: string | null;
    paymentTypeId: string | null;
    bankId: string | null;
    storeId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ExpenseCountAggregateOutputType = {
    id: number;
    description: number;
    date: number;
    amount: number;
    split: number;
    personal: number;
    dueDate: number;
    ownerId: number;
    categoryId: number;
    paymentTypeId: number;
    bankId: number;
    storeId: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type ExpenseAvgAggregateInputType = {
    amount?: true;
};
export type ExpenseSumAggregateInputType = {
    amount?: true;
};
export type ExpenseMinAggregateInputType = {
    id?: true;
    description?: true;
    date?: true;
    amount?: true;
    split?: true;
    personal?: true;
    dueDate?: true;
    ownerId?: true;
    categoryId?: true;
    paymentTypeId?: true;
    bankId?: true;
    storeId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ExpenseMaxAggregateInputType = {
    id?: true;
    description?: true;
    date?: true;
    amount?: true;
    split?: true;
    personal?: true;
    dueDate?: true;
    ownerId?: true;
    categoryId?: true;
    paymentTypeId?: true;
    bankId?: true;
    storeId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ExpenseCountAggregateInputType = {
    id?: true;
    description?: true;
    date?: true;
    amount?: true;
    split?: true;
    personal?: true;
    dueDate?: true;
    ownerId?: true;
    categoryId?: true;
    paymentTypeId?: true;
    bankId?: true;
    storeId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type ExpenseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExpenseCountAggregateInputType;
    _avg?: ExpenseAvgAggregateInputType;
    _sum?: ExpenseSumAggregateInputType;
    _min?: ExpenseMinAggregateInputType;
    _max?: ExpenseMaxAggregateInputType;
};
export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
    [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExpense[P]> : Prisma.GetScalarType<T[P], AggregateExpense[P]>;
};
export type ExpenseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithAggregationInput | Prisma.ExpenseOrderByWithAggregationInput[];
    by: Prisma.ExpenseScalarFieldEnum[] | Prisma.ExpenseScalarFieldEnum;
    having?: Prisma.ExpenseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExpenseCountAggregateInputType | true;
    _avg?: ExpenseAvgAggregateInputType;
    _sum?: ExpenseSumAggregateInputType;
    _min?: ExpenseMinAggregateInputType;
    _max?: ExpenseMaxAggregateInputType;
};
export type ExpenseGroupByOutputType = {
    id: string;
    description: string;
    date: Date;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    bankId: string | null;
    storeId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    _count: ExpenseCountAggregateOutputType | null;
    _avg: ExpenseAvgAggregateOutputType | null;
    _sum: ExpenseSumAggregateOutputType | null;
    _min: ExpenseMinAggregateOutputType | null;
    _max: ExpenseMaxAggregateOutputType | null;
};
export type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExpenseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExpenseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExpenseGroupByOutputType[P]>;
}>>;
export type ExpenseWhereInput = {
    AND?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    OR?: Prisma.ExpenseWhereInput[];
    NOT?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    id?: Prisma.UuidFilter<"Expense"> | string;
    description?: Prisma.StringFilter<"Expense"> | string;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    amount?: Prisma.IntFilter<"Expense"> | number;
    split?: Prisma.BoolFilter<"Expense"> | boolean;
    personal?: Prisma.BoolFilter<"Expense"> | boolean;
    dueDate?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    ownerId?: Prisma.UuidFilter<"Expense"> | string;
    categoryId?: Prisma.UuidFilter<"Expense"> | string;
    paymentTypeId?: Prisma.UuidFilter<"Expense"> | string;
    bankId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    storeId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    paymentType?: Prisma.XOR<Prisma.PaymentTypeScalarRelationFilter, Prisma.PaymentTypeWhereInput>;
    bank?: Prisma.XOR<Prisma.BankNullableScalarRelationFilter, Prisma.BankWhereInput> | null;
    store?: Prisma.XOR<Prisma.StoreNullableScalarRelationFilter, Prisma.StoreWhereInput> | null;
};
export type ExpenseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    split?: Prisma.SortOrder;
    personal?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrderInput | Prisma.SortOrder;
    storeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    paymentType?: Prisma.PaymentTypeOrderByWithRelationInput;
    bank?: Prisma.BankOrderByWithRelationInput;
    store?: Prisma.StoreOrderByWithRelationInput;
};
export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    description_date_deletedAt?: Prisma.ExpenseDescriptionDateDeletedAtCompoundUniqueInput;
    AND?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    OR?: Prisma.ExpenseWhereInput[];
    NOT?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    description?: Prisma.StringFilter<"Expense"> | string;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    amount?: Prisma.IntFilter<"Expense"> | number;
    split?: Prisma.BoolFilter<"Expense"> | boolean;
    personal?: Prisma.BoolFilter<"Expense"> | boolean;
    dueDate?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    ownerId?: Prisma.UuidFilter<"Expense"> | string;
    categoryId?: Prisma.UuidFilter<"Expense"> | string;
    paymentTypeId?: Prisma.UuidFilter<"Expense"> | string;
    bankId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    storeId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    paymentType?: Prisma.XOR<Prisma.PaymentTypeScalarRelationFilter, Prisma.PaymentTypeWhereInput>;
    bank?: Prisma.XOR<Prisma.BankNullableScalarRelationFilter, Prisma.BankWhereInput> | null;
    store?: Prisma.XOR<Prisma.StoreNullableScalarRelationFilter, Prisma.StoreWhereInput> | null;
}, "id" | "description_date_deletedAt">;
export type ExpenseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    split?: Prisma.SortOrder;
    personal?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrderInput | Prisma.SortOrder;
    storeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ExpenseCountOrderByAggregateInput;
    _avg?: Prisma.ExpenseAvgOrderByAggregateInput;
    _max?: Prisma.ExpenseMaxOrderByAggregateInput;
    _min?: Prisma.ExpenseMinOrderByAggregateInput;
    _sum?: Prisma.ExpenseSumOrderByAggregateInput;
};
export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExpenseScalarWhereWithAggregatesInput | Prisma.ExpenseScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExpenseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExpenseScalarWhereWithAggregatesInput | Prisma.ExpenseScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Expense"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    amount?: Prisma.IntWithAggregatesFilter<"Expense"> | number;
    split?: Prisma.BoolWithAggregatesFilter<"Expense"> | boolean;
    personal?: Prisma.BoolWithAggregatesFilter<"Expense"> | boolean;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    ownerId?: Prisma.UuidWithAggregatesFilter<"Expense"> | string;
    categoryId?: Prisma.UuidWithAggregatesFilter<"Expense"> | string;
    paymentTypeId?: Prisma.UuidWithAggregatesFilter<"Expense"> | string;
    bankId?: Prisma.UuidNullableWithAggregatesFilter<"Expense"> | string | null;
    storeId?: Prisma.UuidNullableWithAggregatesFilter<"Expense"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Expense"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Expense"> | Date | string | null;
};
export type ExpenseCreateInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExpenseInput;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutExpenseInput;
    bank?: Prisma.BankCreateNestedOneWithoutExpenseInput;
    store?: Prisma.StoreCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExpenseNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput;
    bank?: Prisma.BankUpdateOneWithoutExpenseNestedInput;
    store?: Prisma.StoreUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseCreateManyInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseListRelationFilter = {
    every?: Prisma.ExpenseWhereInput;
    some?: Prisma.ExpenseWhereInput;
    none?: Prisma.ExpenseWhereInput;
};
export type ExpenseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExpenseDescriptionDateDeletedAtCompoundUniqueInput = {
    description: string;
    date: Date | string;
    deletedAt: Date | string;
};
export type ExpenseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    split?: Prisma.SortOrder;
    personal?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    storeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ExpenseAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ExpenseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    split?: Prisma.SortOrder;
    personal?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    storeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ExpenseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    split?: Prisma.SortOrder;
    personal?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    storeId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ExpenseSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ExpenseCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput> | Prisma.ExpenseCreateWithoutUserInput[] | Prisma.ExpenseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutUserInput | Prisma.ExpenseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExpenseCreateManyUserInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput> | Prisma.ExpenseCreateWithoutUserInput[] | Prisma.ExpenseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutUserInput | Prisma.ExpenseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExpenseCreateManyUserInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput> | Prisma.ExpenseCreateWithoutUserInput[] | Prisma.ExpenseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutUserInput | Prisma.ExpenseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExpenseCreateManyUserInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutUserInput | Prisma.ExpenseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput> | Prisma.ExpenseCreateWithoutUserInput[] | Prisma.ExpenseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutUserInput | Prisma.ExpenseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExpenseCreateManyUserInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutUserInput | Prisma.ExpenseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutBankInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput> | Prisma.ExpenseCreateWithoutBankInput[] | Prisma.ExpenseUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutBankInput | Prisma.ExpenseCreateOrConnectWithoutBankInput[];
    createMany?: Prisma.ExpenseCreateManyBankInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutBankInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput> | Prisma.ExpenseCreateWithoutBankInput[] | Prisma.ExpenseUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutBankInput | Prisma.ExpenseCreateOrConnectWithoutBankInput[];
    createMany?: Prisma.ExpenseCreateManyBankInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutBankNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput> | Prisma.ExpenseCreateWithoutBankInput[] | Prisma.ExpenseUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutBankInput | Prisma.ExpenseCreateOrConnectWithoutBankInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutBankInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutBankInput[];
    createMany?: Prisma.ExpenseCreateManyBankInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutBankInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutBankInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutBankInput | Prisma.ExpenseUpdateManyWithWhereWithoutBankInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutBankNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput> | Prisma.ExpenseCreateWithoutBankInput[] | Prisma.ExpenseUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutBankInput | Prisma.ExpenseCreateOrConnectWithoutBankInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutBankInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutBankInput[];
    createMany?: Prisma.ExpenseCreateManyBankInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutBankInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutBankInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutBankInput | Prisma.ExpenseUpdateManyWithWhereWithoutBankInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput | Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput | Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutPaymentTypeInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput> | Prisma.ExpenseCreateWithoutPaymentTypeInput[] | Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput | Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput[];
    createMany?: Prisma.ExpenseCreateManyPaymentTypeInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutPaymentTypeInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput> | Prisma.ExpenseCreateWithoutPaymentTypeInput[] | Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput | Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput[];
    createMany?: Prisma.ExpenseCreateManyPaymentTypeInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutPaymentTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput> | Prisma.ExpenseCreateWithoutPaymentTypeInput[] | Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput | Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutPaymentTypeInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutPaymentTypeInput[];
    createMany?: Prisma.ExpenseCreateManyPaymentTypeInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutPaymentTypeInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutPaymentTypeInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutPaymentTypeInput | Prisma.ExpenseUpdateManyWithWhereWithoutPaymentTypeInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutPaymentTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput> | Prisma.ExpenseCreateWithoutPaymentTypeInput[] | Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput | Prisma.ExpenseCreateOrConnectWithoutPaymentTypeInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutPaymentTypeInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutPaymentTypeInput[];
    createMany?: Prisma.ExpenseCreateManyPaymentTypeInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutPaymentTypeInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutPaymentTypeInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutPaymentTypeInput | Prisma.ExpenseUpdateManyWithWhereWithoutPaymentTypeInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutStoreInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput> | Prisma.ExpenseCreateWithoutStoreInput[] | Prisma.ExpenseUncheckedCreateWithoutStoreInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutStoreInput | Prisma.ExpenseCreateOrConnectWithoutStoreInput[];
    createMany?: Prisma.ExpenseCreateManyStoreInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutStoreInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput> | Prisma.ExpenseCreateWithoutStoreInput[] | Prisma.ExpenseUncheckedCreateWithoutStoreInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutStoreInput | Prisma.ExpenseCreateOrConnectWithoutStoreInput[];
    createMany?: Prisma.ExpenseCreateManyStoreInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutStoreNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput> | Prisma.ExpenseCreateWithoutStoreInput[] | Prisma.ExpenseUncheckedCreateWithoutStoreInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutStoreInput | Prisma.ExpenseCreateOrConnectWithoutStoreInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutStoreInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutStoreInput[];
    createMany?: Prisma.ExpenseCreateManyStoreInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutStoreInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutStoreInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutStoreInput | Prisma.ExpenseUpdateManyWithWhereWithoutStoreInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput> | Prisma.ExpenseCreateWithoutStoreInput[] | Prisma.ExpenseUncheckedCreateWithoutStoreInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutStoreInput | Prisma.ExpenseCreateOrConnectWithoutStoreInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutStoreInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutStoreInput[];
    createMany?: Prisma.ExpenseCreateManyStoreInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutStoreInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutStoreInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutStoreInput | Prisma.ExpenseUpdateManyWithWhereWithoutStoreInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ExpenseCreateWithoutUserInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutExpenseInput;
    bank?: Prisma.BankCreateNestedOneWithoutExpenseInput;
    store?: Prisma.StoreCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutUserInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseCreateOrConnectWithoutUserInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput>;
};
export type ExpenseCreateManyUserInputEnvelope = {
    data: Prisma.ExpenseCreateManyUserInput | Prisma.ExpenseCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutUserInput, Prisma.ExpenseUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutUserInput, Prisma.ExpenseUncheckedUpdateWithoutUserInput>;
};
export type ExpenseUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutUserInput>;
};
export type ExpenseScalarWhereInput = {
    AND?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
    OR?: Prisma.ExpenseScalarWhereInput[];
    NOT?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
    id?: Prisma.UuidFilter<"Expense"> | string;
    description?: Prisma.StringFilter<"Expense"> | string;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    amount?: Prisma.IntFilter<"Expense"> | number;
    split?: Prisma.BoolFilter<"Expense"> | boolean;
    personal?: Prisma.BoolFilter<"Expense"> | boolean;
    dueDate?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    ownerId?: Prisma.UuidFilter<"Expense"> | string;
    categoryId?: Prisma.UuidFilter<"Expense"> | string;
    paymentTypeId?: Prisma.UuidFilter<"Expense"> | string;
    bankId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    storeId?: Prisma.UuidNullableFilter<"Expense"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"Expense"> | Date | string | null;
};
export type ExpenseCreateWithoutBankInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExpenseInput;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutExpenseInput;
    store?: Prisma.StoreCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutBankInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseCreateOrConnectWithoutBankInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput>;
};
export type ExpenseCreateManyBankInputEnvelope = {
    data: Prisma.ExpenseCreateManyBankInput | Prisma.ExpenseCreateManyBankInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutBankInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutBankInput, Prisma.ExpenseUncheckedUpdateWithoutBankInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutBankInput, Prisma.ExpenseUncheckedCreateWithoutBankInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutBankInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutBankInput, Prisma.ExpenseUncheckedUpdateWithoutBankInput>;
};
export type ExpenseUpdateManyWithWhereWithoutBankInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutBankInput>;
};
export type ExpenseCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExpenseInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutExpenseInput;
    bank?: Prisma.BankCreateNestedOneWithoutExpenseInput;
    store?: Prisma.StoreCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput>;
};
export type ExpenseCreateManyCategoryInputEnvelope = {
    data: Prisma.ExpenseCreateManyCategoryInput | Prisma.ExpenseCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutCategoryInput, Prisma.ExpenseUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutCategoryInput, Prisma.ExpenseUncheckedUpdateWithoutCategoryInput>;
};
export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutCategoryInput>;
};
export type ExpenseCreateWithoutPaymentTypeInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExpenseInput;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    bank?: Prisma.BankCreateNestedOneWithoutExpenseInput;
    store?: Prisma.StoreCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutPaymentTypeInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseCreateOrConnectWithoutPaymentTypeInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput>;
};
export type ExpenseCreateManyPaymentTypeInputEnvelope = {
    data: Prisma.ExpenseCreateManyPaymentTypeInput | Prisma.ExpenseCreateManyPaymentTypeInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutPaymentTypeInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedUpdateWithoutPaymentTypeInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedCreateWithoutPaymentTypeInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutPaymentTypeInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutPaymentTypeInput, Prisma.ExpenseUncheckedUpdateWithoutPaymentTypeInput>;
};
export type ExpenseUpdateManyWithWhereWithoutPaymentTypeInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutPaymentTypeInput>;
};
export type ExpenseCreateWithoutStoreInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExpenseInput;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutExpenseInput;
    bank?: Prisma.BankCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutStoreInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseCreateOrConnectWithoutStoreInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput>;
};
export type ExpenseCreateManyStoreInputEnvelope = {
    data: Prisma.ExpenseCreateManyStoreInput | Prisma.ExpenseCreateManyStoreInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutStoreInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutStoreInput, Prisma.ExpenseUncheckedUpdateWithoutStoreInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutStoreInput, Prisma.ExpenseUncheckedCreateWithoutStoreInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutStoreInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutStoreInput, Prisma.ExpenseUncheckedUpdateWithoutStoreInput>;
};
export type ExpenseUpdateManyWithWhereWithoutStoreInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutStoreInput>;
};
export type ExpenseCreateManyUserInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput;
    bank?: Prisma.BankUpdateOneWithoutExpenseNestedInput;
    store?: Prisma.StoreUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseCreateManyBankInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExpenseNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput;
    store?: Prisma.StoreUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseCreateManyCategoryInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    paymentTypeId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExpenseNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput;
    bank?: Prisma.BankUpdateOneWithoutExpenseNestedInput;
    store?: Prisma.StoreUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseCreateManyPaymentTypeInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    bankId?: string | null;
    storeId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExpenseNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    bank?: Prisma.BankUpdateOneWithoutExpenseNestedInput;
    store?: Prisma.StoreUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseCreateManyStoreInput = {
    id?: string;
    description: string;
    date: Date | string;
    amount: number;
    split: boolean;
    personal: boolean;
    dueDate: Date | string;
    ownerId: string;
    categoryId: string;
    paymentTypeId: string;
    bankId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type ExpenseUpdateWithoutStoreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExpenseNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutExpenseNestedInput;
    bank?: Prisma.BankUpdateOneWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutStoreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseUncheckedUpdateManyWithoutStoreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    split?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    personal?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExpenseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    date?: boolean;
    amount?: boolean;
    split?: boolean;
    personal?: boolean;
    dueDate?: boolean;
    ownerId?: boolean;
    categoryId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    storeId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    date?: boolean;
    amount?: boolean;
    split?: boolean;
    personal?: boolean;
    dueDate?: boolean;
    ownerId?: boolean;
    categoryId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    storeId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    date?: boolean;
    amount?: boolean;
    split?: boolean;
    personal?: boolean;
    dueDate?: boolean;
    ownerId?: boolean;
    categoryId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    storeId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectScalar = {
    id?: boolean;
    description?: boolean;
    date?: boolean;
    amount?: boolean;
    split?: boolean;
    personal?: boolean;
    dueDate?: boolean;
    ownerId?: boolean;
    categoryId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    storeId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type ExpenseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "description" | "date" | "amount" | "split" | "personal" | "dueDate" | "ownerId" | "categoryId" | "paymentTypeId" | "bankId" | "storeId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["expense"]>;
export type ExpenseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
};
export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
};
export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.Expense$bankArgs<ExtArgs>;
    store?: boolean | Prisma.Expense$storeArgs<ExtArgs>;
};
export type $ExpensePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Expense";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
        paymentType: Prisma.$PaymentTypePayload<ExtArgs>;
        bank: Prisma.$BankPayload<ExtArgs> | null;
        store: Prisma.$StorePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        description: string;
        date: Date;
        amount: number;
        split: boolean;
        personal: boolean;
        dueDate: Date;
        ownerId: string;
        categoryId: string;
        paymentTypeId: string;
        bankId: string | null;
        storeId: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }, ExtArgs["result"]["expense"]>;
    composites: {};
};
export type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExpensePayload, S>;
export type ExpenseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExpenseCountAggregateInputType | true;
};
export interface ExpenseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Expense'];
        meta: {
            name: 'Expense';
        };
    };
    findUnique<T extends ExpenseFindUniqueArgs>(args: Prisma.SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExpenseFindFirstArgs>(args?: Prisma.SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExpenseFindManyArgs>(args?: Prisma.SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExpenseCreateArgs>(args: Prisma.SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExpenseCreateManyArgs>(args?: Prisma.SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExpenseDeleteArgs>(args: Prisma.SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExpenseUpdateArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExpenseUpdateManyArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExpenseUpsertArgs>(args: Prisma.SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExpenseCountArgs>(args?: Prisma.Subset<T, ExpenseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExpenseCountAggregateOutputType> : number>;
    aggregate<T extends ExpenseAggregateArgs>(args: Prisma.Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>;
    groupBy<T extends ExpenseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExpenseGroupByArgs['orderBy'];
    } : {
        orderBy?: ExpenseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExpenseFieldRefs;
}
export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    paymentType<T extends Prisma.PaymentTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bank<T extends Prisma.Expense$bankArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Expense$bankArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    store<T extends Prisma.Expense$storeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Expense$storeArgs<ExtArgs>>): Prisma.Prisma__StoreClient<runtime.Types.Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExpenseFieldRefs {
    readonly id: Prisma.FieldRef<"Expense", 'String'>;
    readonly description: Prisma.FieldRef<"Expense", 'String'>;
    readonly date: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly amount: Prisma.FieldRef<"Expense", 'Int'>;
    readonly split: Prisma.FieldRef<"Expense", 'Boolean'>;
    readonly personal: Prisma.FieldRef<"Expense", 'Boolean'>;
    readonly dueDate: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly ownerId: Prisma.FieldRef<"Expense", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Expense", 'String'>;
    readonly paymentTypeId: Prisma.FieldRef<"Expense", 'String'>;
    readonly bankId: Prisma.FieldRef<"Expense", 'String'>;
    readonly storeId: Prisma.FieldRef<"Expense", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Expense", 'DateTime'>;
}
export type ExpenseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExpenseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExpenseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExpenseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseCreateInput, Prisma.ExpenseUncheckedCreateInput>;
};
export type ExpenseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExpenseCreateManyInput | Prisma.ExpenseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExpenseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    data: Prisma.ExpenseCreateManyInput | Prisma.ExpenseCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExpenseIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExpenseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseUpdateInput, Prisma.ExpenseUncheckedUpdateInput>;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyInput>;
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
};
export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyInput>;
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
    include?: Prisma.ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExpenseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateInput, Prisma.ExpenseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExpenseUpdateInput, Prisma.ExpenseUncheckedUpdateInput>;
};
export type ExpenseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
};
export type Expense$bankArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BankSelect<ExtArgs> | null;
    omit?: Prisma.BankOmit<ExtArgs> | null;
    include?: Prisma.BankInclude<ExtArgs> | null;
    where?: Prisma.BankWhereInput;
};
export type Expense$storeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StoreSelect<ExtArgs> | null;
    omit?: Prisma.StoreOmit<ExtArgs> | null;
    include?: Prisma.StoreInclude<ExtArgs> | null;
    where?: Prisma.StoreWhereInput;
};
export type ExpenseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
};
