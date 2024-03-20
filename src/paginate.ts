import { QueryItemsOutput } from "./queryItems";
import { ScanItemsOutput } from "./scanItems";

export interface PaginateInput<CK> {
	ExclusiveStartKey?: CK;
	PageLimit?: number;
	TotalLimit?: number;
}

export interface PaginatorParameters<CK> {
	ExclusiveStartKey?: CK;
	Limit?: number;
}

export const paginate = <O extends QueryItemsOutput | ScanItemsOutput>(
	input: PaginateInput<O["LastEvaluatedKey"]>,
	handler: (paginatorParameters: PaginatorParameters<O["LastEvaluatedKey"]>) => Promise<O>
) => {
	const recursion = async (Count: number, ExclusiveStartKey?: O["LastEvaluatedKey"]): Promise<Array<O>> => {
		const result = await handler({
			ExclusiveStartKey,
			Limit:
				input.PageLimit && input.TotalLimit ? Math.min(input.PageLimit, input.TotalLimit - Count) : input.PageLimit ? input.PageLimit : input.TotalLimit ? input.TotalLimit - Count : undefined,
		});

		const nextCount = Count + (result.Count || 0);

		if (!result.LastEvaluatedKey || (input.TotalLimit && input.TotalLimit - nextCount <= 0)) return [result];

		const nextPages = await recursion(nextCount, result.LastEvaluatedKey);

		return [result, ...nextPages];
	};

	return recursion(0, input.ExclusiveStartKey);
};
