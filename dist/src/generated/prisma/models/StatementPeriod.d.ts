import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StatementPeriodModel = runtime.Types.Result.DefaultSelection<Prisma.$StatementPeriodPayload>;
export type AggregateStatementPeriod = {
    _count: StatementPeriodCountAggregateOutputType | null;
    _min: StatementPeriodMinAggregateOutputType | null;
    _max: StatementPeriodMaxAggregateOutputType | null;
};
export type StatementPeriodMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    paymentTypeId: string | null;
    bankId: string | null;
    initialDay: string | null;
    finalDay: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StatementPeriodMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    paymentTypeId: string | null;
    bankId: string | null;
    initialDay: string | null;
    finalDay: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StatementPeriodCountAggregateOutputType = {
    id: number;
    userId: number;
    paymentTypeId: number;
    bankId: number;
    initialDay: number;
    finalDay: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type StatementPeriodMinAggregateInputType = {
    id?: true;
    userId?: true;
    paymentTypeId?: true;
    bankId?: true;
    initialDay?: true;
    finalDay?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StatementPeriodMaxAggregateInputType = {
    id?: true;
    userId?: true;
    paymentTypeId?: true;
    bankId?: true;
    initialDay?: true;
    finalDay?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StatementPeriodCountAggregateInputType = {
    id?: true;
    userId?: true;
    paymentTypeId?: true;
    bankId?: true;
    initialDay?: true;
    finalDay?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type StatementPeriodAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatementPeriodWhereInput;
    orderBy?: Prisma.StatementPeriodOrderByWithRelationInput | Prisma.StatementPeriodOrderByWithRelationInput[];
    cursor?: Prisma.StatementPeriodWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StatementPeriodCountAggregateInputType;
    _min?: StatementPeriodMinAggregateInputType;
    _max?: StatementPeriodMaxAggregateInputType;
};
export type GetStatementPeriodAggregateType<T extends StatementPeriodAggregateArgs> = {
    [P in keyof T & keyof AggregateStatementPeriod]: P extends "_count" | "count" ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStatementPeriod[P]> : Prisma.GetScalarType<T[P], AggregateStatementPeriod[P]>;
};
export type StatementPeriodGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatementPeriodWhereInput;
    orderBy?: Prisma.StatementPeriodOrderByWithAggregationInput | Prisma.StatementPeriodOrderByWithAggregationInput[];
    by: Prisma.StatementPeriodScalarFieldEnum[] | Prisma.StatementPeriodScalarFieldEnum;
    having?: Prisma.StatementPeriodScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StatementPeriodCountAggregateInputType | true;
    _min?: StatementPeriodMinAggregateInputType;
    _max?: StatementPeriodMaxAggregateInputType;
};
export type StatementPeriodGroupByOutputType = {
    id: string;
    userId: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    _count: StatementPeriodCountAggregateOutputType | null;
    _min: StatementPeriodMinAggregateOutputType | null;
    _max: StatementPeriodMaxAggregateOutputType | null;
};
export type GetStatementPeriodGroupByPayload<T extends StatementPeriodGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StatementPeriodGroupByOutputType, T["by"]> & {
    [P in keyof T & keyof StatementPeriodGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StatementPeriodGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StatementPeriodGroupByOutputType[P]>;
}>>;
export type StatementPeriodWhereInput = {
    AND?: Prisma.StatementPeriodWhereInput | Prisma.StatementPeriodWhereInput[];
    OR?: Prisma.StatementPeriodWhereInput[];
    NOT?: Prisma.StatementPeriodWhereInput | Prisma.StatementPeriodWhereInput[];
    id?: Prisma.UuidFilter<"StatementPeriod"> | string;
    userId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    paymentTypeId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    bankId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    initialDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    finalDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"StatementPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    paymentType?: Prisma.XOR<Prisma.PaymentTypeScalarRelationFilter, Prisma.PaymentTypeWhereInput>;
    bank?: Prisma.XOR<Prisma.BankScalarRelationFilter, Prisma.BankWhereInput>;
};
export type StatementPeriodOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    initialDay?: Prisma.SortOrder;
    finalDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    paymentType?: Prisma.PaymentTypeOrderByWithRelationInput;
    bank?: Prisma.BankOrderByWithRelationInput;
};
export type StatementPeriodWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_paymentTypeId_bankId?: Prisma.StatementPeriodUserIdPaymentTypeIdBankIdCompoundUniqueInput;
    AND?: Prisma.StatementPeriodWhereInput | Prisma.StatementPeriodWhereInput[];
    OR?: Prisma.StatementPeriodWhereInput[];
    NOT?: Prisma.StatementPeriodWhereInput | Prisma.StatementPeriodWhereInput[];
    userId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    paymentTypeId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    bankId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    initialDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    finalDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"StatementPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    paymentType?: Prisma.XOR<Prisma.PaymentTypeScalarRelationFilter, Prisma.PaymentTypeWhereInput>;
    bank?: Prisma.XOR<Prisma.BankScalarRelationFilter, Prisma.BankWhereInput>;
}, "id" | "userId_paymentTypeId_bankId">;
export type StatementPeriodOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    initialDay?: Prisma.SortOrder;
    finalDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StatementPeriodCountOrderByAggregateInput;
    _max?: Prisma.StatementPeriodMaxOrderByAggregateInput;
    _min?: Prisma.StatementPeriodMinOrderByAggregateInput;
};
export type StatementPeriodScalarWhereWithAggregatesInput = {
    AND?: Prisma.StatementPeriodScalarWhereWithAggregatesInput | Prisma.StatementPeriodScalarWhereWithAggregatesInput[];
    OR?: Prisma.StatementPeriodScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StatementPeriodScalarWhereWithAggregatesInput | Prisma.StatementPeriodScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StatementPeriod"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"StatementPeriod"> | string;
    paymentTypeId?: Prisma.UuidWithAggregatesFilter<"StatementPeriod"> | string;
    bankId?: Prisma.UuidWithAggregatesFilter<"StatementPeriod"> | string;
    initialDay?: Prisma.StringWithAggregatesFilter<"StatementPeriod"> | string;
    finalDay?: Prisma.StringWithAggregatesFilter<"StatementPeriod"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StatementPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StatementPeriod"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StatementPeriod"> | Date | string | null;
};
export type StatementPeriodCreateInput = {
    id?: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStatementPeriodInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutStatementPeriodInput;
    bank: Prisma.BankCreateNestedOneWithoutStatementPeriodInput;
};
export type StatementPeriodUncheckedCreateInput = {
    id?: string;
    userId: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStatementPeriodNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutStatementPeriodNestedInput;
    bank?: Prisma.BankUpdateOneRequiredWithoutStatementPeriodNestedInput;
};
export type StatementPeriodUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodCreateManyInput = {
    id?: string;
    userId: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodListRelationFilter = {
    every?: Prisma.StatementPeriodWhereInput;
    some?: Prisma.StatementPeriodWhereInput;
    none?: Prisma.StatementPeriodWhereInput;
};
export type StatementPeriodOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StatementPeriodUserIdPaymentTypeIdBankIdCompoundUniqueInput = {
    userId: string;
    paymentTypeId: string;
    bankId: string;
};
export type StatementPeriodCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    initialDay?: Prisma.SortOrder;
    finalDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StatementPeriodMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    initialDay?: Prisma.SortOrder;
    finalDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StatementPeriodMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentTypeId?: Prisma.SortOrder;
    bankId?: Prisma.SortOrder;
    initialDay?: Prisma.SortOrder;
    finalDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StatementPeriodCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput> | Prisma.StatementPeriodCreateWithoutUserInput[] | Prisma.StatementPeriodUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutUserInput | Prisma.StatementPeriodCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StatementPeriodCreateManyUserInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput> | Prisma.StatementPeriodCreateWithoutUserInput[] | Prisma.StatementPeriodUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutUserInput | Prisma.StatementPeriodCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StatementPeriodCreateManyUserInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput> | Prisma.StatementPeriodCreateWithoutUserInput[] | Prisma.StatementPeriodUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutUserInput | Prisma.StatementPeriodCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutUserInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StatementPeriodCreateManyUserInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutUserInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutUserInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput> | Prisma.StatementPeriodCreateWithoutUserInput[] | Prisma.StatementPeriodUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutUserInput | Prisma.StatementPeriodCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutUserInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StatementPeriodCreateManyUserInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutUserInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutUserInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodCreateNestedManyWithoutBankInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput> | Prisma.StatementPeriodCreateWithoutBankInput[] | Prisma.StatementPeriodUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutBankInput | Prisma.StatementPeriodCreateOrConnectWithoutBankInput[];
    createMany?: Prisma.StatementPeriodCreateManyBankInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUncheckedCreateNestedManyWithoutBankInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput> | Prisma.StatementPeriodCreateWithoutBankInput[] | Prisma.StatementPeriodUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutBankInput | Prisma.StatementPeriodCreateOrConnectWithoutBankInput[];
    createMany?: Prisma.StatementPeriodCreateManyBankInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUpdateManyWithoutBankNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput> | Prisma.StatementPeriodCreateWithoutBankInput[] | Prisma.StatementPeriodUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutBankInput | Prisma.StatementPeriodCreateOrConnectWithoutBankInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutBankInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutBankInput[];
    createMany?: Prisma.StatementPeriodCreateManyBankInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutBankInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutBankInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutBankInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutBankInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodUncheckedUpdateManyWithoutBankNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput> | Prisma.StatementPeriodCreateWithoutBankInput[] | Prisma.StatementPeriodUncheckedCreateWithoutBankInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutBankInput | Prisma.StatementPeriodCreateOrConnectWithoutBankInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutBankInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutBankInput[];
    createMany?: Prisma.StatementPeriodCreateManyBankInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutBankInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutBankInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutBankInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutBankInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodCreateNestedManyWithoutPaymentTypeInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput> | Prisma.StatementPeriodCreateWithoutPaymentTypeInput[] | Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput | Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput[];
    createMany?: Prisma.StatementPeriodCreateManyPaymentTypeInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUncheckedCreateNestedManyWithoutPaymentTypeInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput> | Prisma.StatementPeriodCreateWithoutPaymentTypeInput[] | Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput | Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput[];
    createMany?: Prisma.StatementPeriodCreateManyPaymentTypeInputEnvelope;
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
};
export type StatementPeriodUpdateManyWithoutPaymentTypeNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput> | Prisma.StatementPeriodCreateWithoutPaymentTypeInput[] | Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput | Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutPaymentTypeInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutPaymentTypeInput[];
    createMany?: Prisma.StatementPeriodCreateManyPaymentTypeInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutPaymentTypeInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutPaymentTypeInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutPaymentTypeInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutPaymentTypeInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodUncheckedUpdateManyWithoutPaymentTypeNestedInput = {
    create?: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput> | Prisma.StatementPeriodCreateWithoutPaymentTypeInput[] | Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput[];
    connectOrCreate?: Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput | Prisma.StatementPeriodCreateOrConnectWithoutPaymentTypeInput[];
    upsert?: Prisma.StatementPeriodUpsertWithWhereUniqueWithoutPaymentTypeInput | Prisma.StatementPeriodUpsertWithWhereUniqueWithoutPaymentTypeInput[];
    createMany?: Prisma.StatementPeriodCreateManyPaymentTypeInputEnvelope;
    set?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    disconnect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    delete?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    connect?: Prisma.StatementPeriodWhereUniqueInput | Prisma.StatementPeriodWhereUniqueInput[];
    update?: Prisma.StatementPeriodUpdateWithWhereUniqueWithoutPaymentTypeInput | Prisma.StatementPeriodUpdateWithWhereUniqueWithoutPaymentTypeInput[];
    updateMany?: Prisma.StatementPeriodUpdateManyWithWhereWithoutPaymentTypeInput | Prisma.StatementPeriodUpdateManyWithWhereWithoutPaymentTypeInput[];
    deleteMany?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
};
export type StatementPeriodCreateWithoutUserInput = {
    id?: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutStatementPeriodInput;
    bank: Prisma.BankCreateNestedOneWithoutStatementPeriodInput;
};
export type StatementPeriodUncheckedCreateWithoutUserInput = {
    id?: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodCreateOrConnectWithoutUserInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput>;
};
export type StatementPeriodCreateManyUserInputEnvelope = {
    data: Prisma.StatementPeriodCreateManyUserInput | Prisma.StatementPeriodCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StatementPeriodUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    update: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutUserInput, Prisma.StatementPeriodUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutUserInput, Prisma.StatementPeriodUncheckedCreateWithoutUserInput>;
};
export type StatementPeriodUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutUserInput, Prisma.StatementPeriodUncheckedUpdateWithoutUserInput>;
};
export type StatementPeriodUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StatementPeriodScalarWhereInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateManyMutationInput, Prisma.StatementPeriodUncheckedUpdateManyWithoutUserInput>;
};
export type StatementPeriodScalarWhereInput = {
    AND?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
    OR?: Prisma.StatementPeriodScalarWhereInput[];
    NOT?: Prisma.StatementPeriodScalarWhereInput | Prisma.StatementPeriodScalarWhereInput[];
    id?: Prisma.UuidFilter<"StatementPeriod"> | string;
    userId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    paymentTypeId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    bankId?: Prisma.UuidFilter<"StatementPeriod"> | string;
    initialDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    finalDay?: Prisma.StringFilter<"StatementPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"StatementPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"StatementPeriod"> | Date | string | null;
};
export type StatementPeriodCreateWithoutBankInput = {
    id?: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStatementPeriodInput;
    paymentType: Prisma.PaymentTypeCreateNestedOneWithoutStatementPeriodInput;
};
export type StatementPeriodUncheckedCreateWithoutBankInput = {
    id?: string;
    userId: string;
    paymentTypeId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodCreateOrConnectWithoutBankInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput>;
};
export type StatementPeriodCreateManyBankInputEnvelope = {
    data: Prisma.StatementPeriodCreateManyBankInput | Prisma.StatementPeriodCreateManyBankInput[];
    skipDuplicates?: boolean;
};
export type StatementPeriodUpsertWithWhereUniqueWithoutBankInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    update: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutBankInput, Prisma.StatementPeriodUncheckedUpdateWithoutBankInput>;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutBankInput, Prisma.StatementPeriodUncheckedCreateWithoutBankInput>;
};
export type StatementPeriodUpdateWithWhereUniqueWithoutBankInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutBankInput, Prisma.StatementPeriodUncheckedUpdateWithoutBankInput>;
};
export type StatementPeriodUpdateManyWithWhereWithoutBankInput = {
    where: Prisma.StatementPeriodScalarWhereInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateManyMutationInput, Prisma.StatementPeriodUncheckedUpdateManyWithoutBankInput>;
};
export type StatementPeriodCreateWithoutPaymentTypeInput = {
    id?: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStatementPeriodInput;
    bank: Prisma.BankCreateNestedOneWithoutStatementPeriodInput;
};
export type StatementPeriodUncheckedCreateWithoutPaymentTypeInput = {
    id?: string;
    userId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodCreateOrConnectWithoutPaymentTypeInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput>;
};
export type StatementPeriodCreateManyPaymentTypeInputEnvelope = {
    data: Prisma.StatementPeriodCreateManyPaymentTypeInput | Prisma.StatementPeriodCreateManyPaymentTypeInput[];
    skipDuplicates?: boolean;
};
export type StatementPeriodUpsertWithWhereUniqueWithoutPaymentTypeInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    update: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedUpdateWithoutPaymentTypeInput>;
    create: Prisma.XOR<Prisma.StatementPeriodCreateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedCreateWithoutPaymentTypeInput>;
};
export type StatementPeriodUpdateWithWhereUniqueWithoutPaymentTypeInput = {
    where: Prisma.StatementPeriodWhereUniqueInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateWithoutPaymentTypeInput, Prisma.StatementPeriodUncheckedUpdateWithoutPaymentTypeInput>;
};
export type StatementPeriodUpdateManyWithWhereWithoutPaymentTypeInput = {
    where: Prisma.StatementPeriodScalarWhereInput;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateManyMutationInput, Prisma.StatementPeriodUncheckedUpdateManyWithoutPaymentTypeInput>;
};
export type StatementPeriodCreateManyUserInput = {
    id?: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutStatementPeriodNestedInput;
    bank?: Prisma.BankUpdateOneRequiredWithoutStatementPeriodNestedInput;
};
export type StatementPeriodUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodCreateManyBankInput = {
    id?: string;
    userId: string;
    paymentTypeId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodUpdateWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStatementPeriodNestedInput;
    paymentType?: Prisma.PaymentTypeUpdateOneRequiredWithoutStatementPeriodNestedInput;
};
export type StatementPeriodUncheckedUpdateWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodUncheckedUpdateManyWithoutBankInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodCreateManyPaymentTypeInput = {
    id?: string;
    userId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
};
export type StatementPeriodUpdateWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStatementPeriodNestedInput;
    bank?: Prisma.BankUpdateOneRequiredWithoutStatementPeriodNestedInput;
};
export type StatementPeriodUncheckedUpdateWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodUncheckedUpdateManyWithoutPaymentTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bankId?: Prisma.StringFieldUpdateOperationsInput | string;
    initialDay?: Prisma.StringFieldUpdateOperationsInput | string;
    finalDay?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StatementPeriodSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    initialDay?: boolean;
    finalDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statementPeriod"]>;
export type StatementPeriodSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    initialDay?: boolean;
    finalDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statementPeriod"]>;
export type StatementPeriodSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    initialDay?: boolean;
    finalDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statementPeriod"]>;
export type StatementPeriodSelectScalar = {
    id?: boolean;
    userId?: boolean;
    paymentTypeId?: boolean;
    bankId?: boolean;
    initialDay?: boolean;
    finalDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type StatementPeriodOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "paymentTypeId" | "bankId" | "initialDay" | "finalDay" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["statementPeriod"]>;
export type StatementPeriodInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
};
export type StatementPeriodIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
};
export type StatementPeriodIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    paymentType?: boolean | Prisma.PaymentTypeDefaultArgs<ExtArgs>;
    bank?: boolean | Prisma.BankDefaultArgs<ExtArgs>;
};
export type $StatementPeriodPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StatementPeriod";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        paymentType: Prisma.$PaymentTypePayload<ExtArgs>;
        bank: Prisma.$BankPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        paymentTypeId: string;
        bankId: string;
        initialDay: string;
        finalDay: string;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }, ExtArgs["result"]["statementPeriod"]>;
    composites: {};
};
export type StatementPeriodGetPayload<S extends boolean | null | undefined | StatementPeriodDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload, S>;
export type StatementPeriodCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StatementPeriodFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: StatementPeriodCountAggregateInputType | true;
};
export interface StatementPeriodDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>["model"]["StatementPeriod"];
        meta: {
            name: "StatementPeriod";
        };
    };
    findUnique<T extends StatementPeriodFindUniqueArgs>(args: Prisma.SelectSubset<T, StatementPeriodFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StatementPeriodFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StatementPeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StatementPeriodFindFirstArgs>(args?: Prisma.SelectSubset<T, StatementPeriodFindFirstArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StatementPeriodFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StatementPeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StatementPeriodFindManyArgs>(args?: Prisma.SelectSubset<T, StatementPeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StatementPeriodCreateArgs>(args: Prisma.SelectSubset<T, StatementPeriodCreateArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StatementPeriodCreateManyArgs>(args?: Prisma.SelectSubset<T, StatementPeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StatementPeriodCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StatementPeriodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StatementPeriodDeleteArgs>(args: Prisma.SelectSubset<T, StatementPeriodDeleteArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StatementPeriodUpdateArgs>(args: Prisma.SelectSubset<T, StatementPeriodUpdateArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StatementPeriodDeleteManyArgs>(args?: Prisma.SelectSubset<T, StatementPeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StatementPeriodUpdateManyArgs>(args: Prisma.SelectSubset<T, StatementPeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StatementPeriodUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StatementPeriodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StatementPeriodUpsertArgs>(args: Prisma.SelectSubset<T, StatementPeriodUpsertArgs<ExtArgs>>): Prisma.Prisma__StatementPeriodClient<runtime.Types.Result.GetResult<Prisma.$StatementPeriodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StatementPeriodCountArgs>(args?: Prisma.Subset<T, StatementPeriodCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<"select", any> ? T["select"] extends true ? number : Prisma.GetScalarType<T["select"], StatementPeriodCountAggregateOutputType> : number>;
    aggregate<T extends StatementPeriodAggregateArgs>(args: Prisma.Subset<T, StatementPeriodAggregateArgs>): Prisma.PrismaPromise<GetStatementPeriodAggregateType<T>>;
    groupBy<T extends StatementPeriodGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<"skip", Prisma.Keys<T>>, Prisma.Extends<"take", Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StatementPeriodGroupByArgs["orderBy"];
    } : {
        orderBy?: StatementPeriodGroupByArgs["orderBy"];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StatementPeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatementPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StatementPeriodFieldRefs;
}
export interface Prisma__StatementPeriodClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    paymentType<T extends Prisma.PaymentTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaymentTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__PaymentTypeClient<runtime.Types.Result.GetResult<Prisma.$PaymentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bank<T extends Prisma.BankDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BankDefaultArgs<ExtArgs>>): Prisma.Prisma__BankClient<runtime.Types.Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StatementPeriodFieldRefs {
    readonly id: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly userId: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly paymentTypeId: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly bankId: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly initialDay: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly finalDay: Prisma.FieldRef<"StatementPeriod", "String">;
    readonly createdAt: Prisma.FieldRef<"StatementPeriod", "DateTime">;
    readonly updatedAt: Prisma.FieldRef<"StatementPeriod", "DateTime">;
    readonly deletedAt: Prisma.FieldRef<"StatementPeriod", "DateTime">;
}
export type StatementPeriodFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    where: Prisma.StatementPeriodWhereUniqueInput;
};
export type StatementPeriodFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    where: Prisma.StatementPeriodWhereUniqueInput;
};
export type StatementPeriodFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StatementPeriodFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StatementPeriodFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StatementPeriodCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatementPeriodCreateInput, Prisma.StatementPeriodUncheckedCreateInput>;
};
export type StatementPeriodCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StatementPeriodCreateManyInput | Prisma.StatementPeriodCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StatementPeriodCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    data: Prisma.StatementPeriodCreateManyInput | Prisma.StatementPeriodCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StatementPeriodIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StatementPeriodUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateInput, Prisma.StatementPeriodUncheckedUpdateInput>;
    where: Prisma.StatementPeriodWhereUniqueInput;
};
export type StatementPeriodUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StatementPeriodUpdateManyMutationInput, Prisma.StatementPeriodUncheckedUpdateManyInput>;
    where?: Prisma.StatementPeriodWhereInput;
    limit?: number;
};
export type StatementPeriodUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatementPeriodUpdateManyMutationInput, Prisma.StatementPeriodUncheckedUpdateManyInput>;
    where?: Prisma.StatementPeriodWhereInput;
    limit?: number;
    include?: Prisma.StatementPeriodIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StatementPeriodUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    where: Prisma.StatementPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatementPeriodCreateInput, Prisma.StatementPeriodUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StatementPeriodUpdateInput, Prisma.StatementPeriodUncheckedUpdateInput>;
};
export type StatementPeriodDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
    where: Prisma.StatementPeriodWhereUniqueInput;
};
export type StatementPeriodDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatementPeriodWhereInput;
    limit?: number;
};
export type StatementPeriodDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatementPeriodSelect<ExtArgs> | null;
    omit?: Prisma.StatementPeriodOmit<ExtArgs> | null;
    include?: Prisma.StatementPeriodInclude<ExtArgs> | null;
};
