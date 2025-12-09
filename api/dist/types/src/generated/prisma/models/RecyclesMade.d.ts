import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model RecyclesMade
 *
 */
export type RecyclesMadeModel = runtime.Types.Result.DefaultSelection<Prisma.$RecyclesMadePayload>;
export type AggregateRecyclesMade = {
    _count: RecyclesMadeCountAggregateOutputType | null;
    _min: RecyclesMadeMinAggregateOutputType | null;
    _max: RecyclesMadeMaxAggregateOutputType | null;
};
export type RecyclesMadeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    doneDate: Date | null;
};
export type RecyclesMadeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    doneDate: Date | null;
};
export type RecyclesMadeCountAggregateOutputType = {
    id: number;
    userId: number;
    doneDate: number;
    _all: number;
};
export type RecyclesMadeMinAggregateInputType = {
    id?: true;
    userId?: true;
    doneDate?: true;
};
export type RecyclesMadeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    doneDate?: true;
};
export type RecyclesMadeCountAggregateInputType = {
    id?: true;
    userId?: true;
    doneDate?: true;
    _all?: true;
};
export type RecyclesMadeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RecyclesMade to aggregate.
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecyclesMades to fetch.
     */
    orderBy?: Prisma.RecyclesMadeOrderByWithRelationInput | Prisma.RecyclesMadeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RecyclesMadeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecyclesMades from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecyclesMades.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RecyclesMades
    **/
    _count?: true | RecyclesMadeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RecyclesMadeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RecyclesMadeMaxAggregateInputType;
};
export type GetRecyclesMadeAggregateType<T extends RecyclesMadeAggregateArgs> = {
    [P in keyof T & keyof AggregateRecyclesMade]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecyclesMade[P]> : Prisma.GetScalarType<T[P], AggregateRecyclesMade[P]>;
};
export type RecyclesMadeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecyclesMadeWhereInput;
    orderBy?: Prisma.RecyclesMadeOrderByWithAggregationInput | Prisma.RecyclesMadeOrderByWithAggregationInput[];
    by: Prisma.RecyclesMadeScalarFieldEnum[] | Prisma.RecyclesMadeScalarFieldEnum;
    having?: Prisma.RecyclesMadeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecyclesMadeCountAggregateInputType | true;
    _min?: RecyclesMadeMinAggregateInputType;
    _max?: RecyclesMadeMaxAggregateInputType;
};
export type RecyclesMadeGroupByOutputType = {
    id: string;
    userId: string;
    doneDate: Date;
    _count: RecyclesMadeCountAggregateOutputType | null;
    _min: RecyclesMadeMinAggregateOutputType | null;
    _max: RecyclesMadeMaxAggregateOutputType | null;
};
type GetRecyclesMadeGroupByPayload<T extends RecyclesMadeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecyclesMadeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecyclesMadeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecyclesMadeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecyclesMadeGroupByOutputType[P]>;
}>>;
export type RecyclesMadeWhereInput = {
    AND?: Prisma.RecyclesMadeWhereInput | Prisma.RecyclesMadeWhereInput[];
    OR?: Prisma.RecyclesMadeWhereInput[];
    NOT?: Prisma.RecyclesMadeWhereInput | Prisma.RecyclesMadeWhereInput[];
    id?: Prisma.StringFilter<"RecyclesMade"> | string;
    userId?: Prisma.StringFilter<"RecyclesMade"> | string;
    doneDate?: Prisma.DateTimeFilter<"RecyclesMade"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RecyclesMadeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    doneDate?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RecyclesMadeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RecyclesMadeWhereInput | Prisma.RecyclesMadeWhereInput[];
    OR?: Prisma.RecyclesMadeWhereInput[];
    NOT?: Prisma.RecyclesMadeWhereInput | Prisma.RecyclesMadeWhereInput[];
    userId?: Prisma.StringFilter<"RecyclesMade"> | string;
    doneDate?: Prisma.DateTimeFilter<"RecyclesMade"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RecyclesMadeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    doneDate?: Prisma.SortOrder;
    _count?: Prisma.RecyclesMadeCountOrderByAggregateInput;
    _max?: Prisma.RecyclesMadeMaxOrderByAggregateInput;
    _min?: Prisma.RecyclesMadeMinOrderByAggregateInput;
};
export type RecyclesMadeScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecyclesMadeScalarWhereWithAggregatesInput | Prisma.RecyclesMadeScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecyclesMadeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecyclesMadeScalarWhereWithAggregatesInput | Prisma.RecyclesMadeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecyclesMade"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecyclesMade"> | string;
    doneDate?: Prisma.DateTimeWithAggregatesFilter<"RecyclesMade"> | Date | string;
};
export type RecyclesMadeCreateInput = {
    id?: string;
    doneDate: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRecyclesMadeInput;
};
export type RecyclesMadeUncheckedCreateInput = {
    id?: string;
    userId: string;
    doneDate: Date | string;
};
export type RecyclesMadeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRecyclesMadeNestedInput;
};
export type RecyclesMadeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeCreateManyInput = {
    id?: string;
    userId: string;
    doneDate: Date | string;
};
export type RecyclesMadeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeListRelationFilter = {
    every?: Prisma.RecyclesMadeWhereInput;
    some?: Prisma.RecyclesMadeWhereInput;
    none?: Prisma.RecyclesMadeWhereInput;
};
export type RecyclesMadeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecyclesMadeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    doneDate?: Prisma.SortOrder;
};
export type RecyclesMadeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    doneDate?: Prisma.SortOrder;
};
export type RecyclesMadeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    doneDate?: Prisma.SortOrder;
};
export type RecyclesMadeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput> | Prisma.RecyclesMadeCreateWithoutUserInput[] | Prisma.RecyclesMadeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecyclesMadeCreateOrConnectWithoutUserInput | Prisma.RecyclesMadeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecyclesMadeCreateManyUserInputEnvelope;
    connect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
};
export type RecyclesMadeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput> | Prisma.RecyclesMadeCreateWithoutUserInput[] | Prisma.RecyclesMadeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecyclesMadeCreateOrConnectWithoutUserInput | Prisma.RecyclesMadeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecyclesMadeCreateManyUserInputEnvelope;
    connect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
};
export type RecyclesMadeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput> | Prisma.RecyclesMadeCreateWithoutUserInput[] | Prisma.RecyclesMadeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecyclesMadeCreateOrConnectWithoutUserInput | Prisma.RecyclesMadeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecyclesMadeUpsertWithWhereUniqueWithoutUserInput | Prisma.RecyclesMadeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecyclesMadeCreateManyUserInputEnvelope;
    set?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    disconnect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    delete?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    connect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    update?: Prisma.RecyclesMadeUpdateWithWhereUniqueWithoutUserInput | Prisma.RecyclesMadeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecyclesMadeUpdateManyWithWhereWithoutUserInput | Prisma.RecyclesMadeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecyclesMadeScalarWhereInput | Prisma.RecyclesMadeScalarWhereInput[];
};
export type RecyclesMadeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput> | Prisma.RecyclesMadeCreateWithoutUserInput[] | Prisma.RecyclesMadeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecyclesMadeCreateOrConnectWithoutUserInput | Prisma.RecyclesMadeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecyclesMadeUpsertWithWhereUniqueWithoutUserInput | Prisma.RecyclesMadeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecyclesMadeCreateManyUserInputEnvelope;
    set?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    disconnect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    delete?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    connect?: Prisma.RecyclesMadeWhereUniqueInput | Prisma.RecyclesMadeWhereUniqueInput[];
    update?: Prisma.RecyclesMadeUpdateWithWhereUniqueWithoutUserInput | Prisma.RecyclesMadeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecyclesMadeUpdateManyWithWhereWithoutUserInput | Prisma.RecyclesMadeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecyclesMadeScalarWhereInput | Prisma.RecyclesMadeScalarWhereInput[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type RecyclesMadeCreateWithoutUserInput = {
    id?: string;
    doneDate: Date | string;
};
export type RecyclesMadeUncheckedCreateWithoutUserInput = {
    id?: string;
    doneDate: Date | string;
};
export type RecyclesMadeCreateOrConnectWithoutUserInput = {
    where: Prisma.RecyclesMadeWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput>;
};
export type RecyclesMadeCreateManyUserInputEnvelope = {
    data: Prisma.RecyclesMadeCreateManyUserInput | Prisma.RecyclesMadeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RecyclesMadeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecyclesMadeWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecyclesMadeUpdateWithoutUserInput, Prisma.RecyclesMadeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecyclesMadeCreateWithoutUserInput, Prisma.RecyclesMadeUncheckedCreateWithoutUserInput>;
};
export type RecyclesMadeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecyclesMadeWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecyclesMadeUpdateWithoutUserInput, Prisma.RecyclesMadeUncheckedUpdateWithoutUserInput>;
};
export type RecyclesMadeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RecyclesMadeScalarWhereInput;
    data: Prisma.XOR<Prisma.RecyclesMadeUpdateManyMutationInput, Prisma.RecyclesMadeUncheckedUpdateManyWithoutUserInput>;
};
export type RecyclesMadeScalarWhereInput = {
    AND?: Prisma.RecyclesMadeScalarWhereInput | Prisma.RecyclesMadeScalarWhereInput[];
    OR?: Prisma.RecyclesMadeScalarWhereInput[];
    NOT?: Prisma.RecyclesMadeScalarWhereInput | Prisma.RecyclesMadeScalarWhereInput[];
    id?: Prisma.StringFilter<"RecyclesMade"> | string;
    userId?: Prisma.StringFilter<"RecyclesMade"> | string;
    doneDate?: Prisma.DateTimeFilter<"RecyclesMade"> | Date | string;
};
export type RecyclesMadeCreateManyUserInput = {
    id?: string;
    doneDate: Date | string;
};
export type RecyclesMadeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doneDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecyclesMadeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    doneDate?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recyclesMade"]>;
export type RecyclesMadeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    doneDate?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recyclesMade"]>;
export type RecyclesMadeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    doneDate?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recyclesMade"]>;
export type RecyclesMadeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    doneDate?: boolean;
};
export type RecyclesMadeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "doneDate", ExtArgs["result"]["recyclesMade"]>;
export type RecyclesMadeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecyclesMadeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecyclesMadeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RecyclesMadePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecyclesMade";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        doneDate: Date;
    }, ExtArgs["result"]["recyclesMade"]>;
    composites: {};
};
export type RecyclesMadeGetPayload<S extends boolean | null | undefined | RecyclesMadeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload, S>;
export type RecyclesMadeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecyclesMadeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecyclesMadeCountAggregateInputType | true;
};
export interface RecyclesMadeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecyclesMade'];
        meta: {
            name: 'RecyclesMade';
        };
    };
    /**
     * Find zero or one RecyclesMade that matches the filter.
     * @param {RecyclesMadeFindUniqueArgs} args - Arguments to find a RecyclesMade
     * @example
     * // Get one RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecyclesMadeFindUniqueArgs>(args: Prisma.SelectSubset<T, RecyclesMadeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RecyclesMade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecyclesMadeFindUniqueOrThrowArgs} args - Arguments to find a RecyclesMade
     * @example
     * // Get one RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecyclesMadeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecyclesMadeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RecyclesMade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeFindFirstArgs} args - Arguments to find a RecyclesMade
     * @example
     * // Get one RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecyclesMadeFindFirstArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RecyclesMade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeFindFirstOrThrowArgs} args - Arguments to find a RecyclesMade
     * @example
     * // Get one RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecyclesMadeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RecyclesMades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecyclesMades
     * const recyclesMades = await prisma.recyclesMade.findMany()
     *
     * // Get first 10 RecyclesMades
     * const recyclesMades = await prisma.recyclesMade.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const recyclesMadeWithIdOnly = await prisma.recyclesMade.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RecyclesMadeFindManyArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RecyclesMade.
     * @param {RecyclesMadeCreateArgs} args - Arguments to create a RecyclesMade.
     * @example
     * // Create one RecyclesMade
     * const RecyclesMade = await prisma.recyclesMade.create({
     *   data: {
     *     // ... data to create a RecyclesMade
     *   }
     * })
     *
     */
    create<T extends RecyclesMadeCreateArgs>(args: Prisma.SelectSubset<T, RecyclesMadeCreateArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RecyclesMades.
     * @param {RecyclesMadeCreateManyArgs} args - Arguments to create many RecyclesMades.
     * @example
     * // Create many RecyclesMades
     * const recyclesMade = await prisma.recyclesMade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RecyclesMadeCreateManyArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RecyclesMades and returns the data saved in the database.
     * @param {RecyclesMadeCreateManyAndReturnArgs} args - Arguments to create many RecyclesMades.
     * @example
     * // Create many RecyclesMades
     * const recyclesMade = await prisma.recyclesMade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RecyclesMades and only return the `id`
     * const recyclesMadeWithIdOnly = await prisma.recyclesMade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RecyclesMadeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RecyclesMade.
     * @param {RecyclesMadeDeleteArgs} args - Arguments to delete one RecyclesMade.
     * @example
     * // Delete one RecyclesMade
     * const RecyclesMade = await prisma.recyclesMade.delete({
     *   where: {
     *     // ... filter to delete one RecyclesMade
     *   }
     * })
     *
     */
    delete<T extends RecyclesMadeDeleteArgs>(args: Prisma.SelectSubset<T, RecyclesMadeDeleteArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RecyclesMade.
     * @param {RecyclesMadeUpdateArgs} args - Arguments to update one RecyclesMade.
     * @example
     * // Update one RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RecyclesMadeUpdateArgs>(args: Prisma.SelectSubset<T, RecyclesMadeUpdateArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RecyclesMades.
     * @param {RecyclesMadeDeleteManyArgs} args - Arguments to filter RecyclesMades to delete.
     * @example
     * // Delete a few RecyclesMades
     * const { count } = await prisma.recyclesMade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RecyclesMadeDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecyclesMadeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RecyclesMades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecyclesMades
     * const recyclesMade = await prisma.recyclesMade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RecyclesMadeUpdateManyArgs>(args: Prisma.SelectSubset<T, RecyclesMadeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RecyclesMades and returns the data updated in the database.
     * @param {RecyclesMadeUpdateManyAndReturnArgs} args - Arguments to update many RecyclesMades.
     * @example
     * // Update many RecyclesMades
     * const recyclesMade = await prisma.recyclesMade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RecyclesMades and only return the `id`
     * const recyclesMadeWithIdOnly = await prisma.recyclesMade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RecyclesMadeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecyclesMadeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RecyclesMade.
     * @param {RecyclesMadeUpsertArgs} args - Arguments to update or create a RecyclesMade.
     * @example
     * // Update or create a RecyclesMade
     * const recyclesMade = await prisma.recyclesMade.upsert({
     *   create: {
     *     // ... data to create a RecyclesMade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecyclesMade we want to update
     *   }
     * })
     */
    upsert<T extends RecyclesMadeUpsertArgs>(args: Prisma.SelectSubset<T, RecyclesMadeUpsertArgs<ExtArgs>>): Prisma.Prisma__RecyclesMadeClient<runtime.Types.Result.GetResult<Prisma.$RecyclesMadePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RecyclesMades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeCountArgs} args - Arguments to filter RecyclesMades to count.
     * @example
     * // Count the number of RecyclesMades
     * const count = await prisma.recyclesMade.count({
     *   where: {
     *     // ... the filter for the RecyclesMades we want to count
     *   }
     * })
    **/
    count<T extends RecyclesMadeCountArgs>(args?: Prisma.Subset<T, RecyclesMadeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecyclesMadeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RecyclesMade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecyclesMadeAggregateArgs>(args: Prisma.Subset<T, RecyclesMadeAggregateArgs>): Prisma.PrismaPromise<GetRecyclesMadeAggregateType<T>>;
    /**
     * Group by RecyclesMade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecyclesMadeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends RecyclesMadeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecyclesMadeGroupByArgs['orderBy'];
    } : {
        orderBy?: RecyclesMadeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecyclesMadeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecyclesMadeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RecyclesMade model
     */
    readonly fields: RecyclesMadeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RecyclesMade.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RecyclesMadeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the RecyclesMade model
 */
export interface RecyclesMadeFieldRefs {
    readonly id: Prisma.FieldRef<"RecyclesMade", 'String'>;
    readonly userId: Prisma.FieldRef<"RecyclesMade", 'String'>;
    readonly doneDate: Prisma.FieldRef<"RecyclesMade", 'DateTime'>;
}
/**
 * RecyclesMade findUnique
 */
export type RecyclesMadeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter, which RecyclesMade to fetch.
     */
    where: Prisma.RecyclesMadeWhereUniqueInput;
};
/**
 * RecyclesMade findUniqueOrThrow
 */
export type RecyclesMadeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter, which RecyclesMade to fetch.
     */
    where: Prisma.RecyclesMadeWhereUniqueInput;
};
/**
 * RecyclesMade findFirst
 */
export type RecyclesMadeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter, which RecyclesMade to fetch.
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecyclesMades to fetch.
     */
    orderBy?: Prisma.RecyclesMadeOrderByWithRelationInput | Prisma.RecyclesMadeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecyclesMades.
     */
    cursor?: Prisma.RecyclesMadeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecyclesMades from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecyclesMades.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecyclesMades.
     */
    distinct?: Prisma.RecyclesMadeScalarFieldEnum | Prisma.RecyclesMadeScalarFieldEnum[];
};
/**
 * RecyclesMade findFirstOrThrow
 */
export type RecyclesMadeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter, which RecyclesMade to fetch.
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecyclesMades to fetch.
     */
    orderBy?: Prisma.RecyclesMadeOrderByWithRelationInput | Prisma.RecyclesMadeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecyclesMades.
     */
    cursor?: Prisma.RecyclesMadeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecyclesMades from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecyclesMades.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecyclesMades.
     */
    distinct?: Prisma.RecyclesMadeScalarFieldEnum | Prisma.RecyclesMadeScalarFieldEnum[];
};
/**
 * RecyclesMade findMany
 */
export type RecyclesMadeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter, which RecyclesMades to fetch.
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecyclesMades to fetch.
     */
    orderBy?: Prisma.RecyclesMadeOrderByWithRelationInput | Prisma.RecyclesMadeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RecyclesMades.
     */
    cursor?: Prisma.RecyclesMadeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecyclesMades from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecyclesMades.
     */
    skip?: number;
    distinct?: Prisma.RecyclesMadeScalarFieldEnum | Prisma.RecyclesMadeScalarFieldEnum[];
};
/**
 * RecyclesMade create
 */
export type RecyclesMadeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * The data needed to create a RecyclesMade.
     */
    data: Prisma.XOR<Prisma.RecyclesMadeCreateInput, Prisma.RecyclesMadeUncheckedCreateInput>;
};
/**
 * RecyclesMade createMany
 */
export type RecyclesMadeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecyclesMades.
     */
    data: Prisma.RecyclesMadeCreateManyInput | Prisma.RecyclesMadeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RecyclesMade createManyAndReturn
 */
export type RecyclesMadeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * The data used to create many RecyclesMades.
     */
    data: Prisma.RecyclesMadeCreateManyInput | Prisma.RecyclesMadeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RecyclesMade update
 */
export type RecyclesMadeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * The data needed to update a RecyclesMade.
     */
    data: Prisma.XOR<Prisma.RecyclesMadeUpdateInput, Prisma.RecyclesMadeUncheckedUpdateInput>;
    /**
     * Choose, which RecyclesMade to update.
     */
    where: Prisma.RecyclesMadeWhereUniqueInput;
};
/**
 * RecyclesMade updateMany
 */
export type RecyclesMadeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RecyclesMades.
     */
    data: Prisma.XOR<Prisma.RecyclesMadeUpdateManyMutationInput, Prisma.RecyclesMadeUncheckedUpdateManyInput>;
    /**
     * Filter which RecyclesMades to update
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * Limit how many RecyclesMades to update.
     */
    limit?: number;
};
/**
 * RecyclesMade updateManyAndReturn
 */
export type RecyclesMadeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * The data used to update RecyclesMades.
     */
    data: Prisma.XOR<Prisma.RecyclesMadeUpdateManyMutationInput, Prisma.RecyclesMadeUncheckedUpdateManyInput>;
    /**
     * Filter which RecyclesMades to update
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * Limit how many RecyclesMades to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RecyclesMade upsert
 */
export type RecyclesMadeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * The filter to search for the RecyclesMade to update in case it exists.
     */
    where: Prisma.RecyclesMadeWhereUniqueInput;
    /**
     * In case the RecyclesMade found by the `where` argument doesn't exist, create a new RecyclesMade with this data.
     */
    create: Prisma.XOR<Prisma.RecyclesMadeCreateInput, Prisma.RecyclesMadeUncheckedCreateInput>;
    /**
     * In case the RecyclesMade was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RecyclesMadeUpdateInput, Prisma.RecyclesMadeUncheckedUpdateInput>;
};
/**
 * RecyclesMade delete
 */
export type RecyclesMadeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
    /**
     * Filter which RecyclesMade to delete.
     */
    where: Prisma.RecyclesMadeWhereUniqueInput;
};
/**
 * RecyclesMade deleteMany
 */
export type RecyclesMadeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RecyclesMades to delete
     */
    where?: Prisma.RecyclesMadeWhereInput;
    /**
     * Limit how many RecyclesMades to delete.
     */
    limit?: number;
};
/**
 * RecyclesMade without action
 */
export type RecyclesMadeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecyclesMade
     */
    select?: Prisma.RecyclesMadeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecyclesMade
     */
    omit?: Prisma.RecyclesMadeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecyclesMadeInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=RecyclesMade.d.ts.map