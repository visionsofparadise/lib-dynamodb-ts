import { DynamoDBDocumentClient, DynamoDBDocumentPaginationConfiguration } from "@aws-sdk/lib-dynamodb";
import { Paginator } from "@smithy/types";
import { QueryCommand, QueryCommandInput, QueryCommandOutput } from "../commands/QueryCommand";
import { GenericAttributes } from "../utils";

const makePagedClientRequest = async <A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	client: DynamoDBDocumentClient,
	input: QueryCommandInput<CK>,
	...args: any
): Promise<QueryCommandOutput<A, CK>> => {
	// @ts-ignore
	return await client.send(new QueryCommand(input), ...args);
};

/**
 * @public
 *
 * @param QueryCommandInput - {@link QueryCommandInput}
 * @returns {@link QueryCommandOutput}
 *
 */
export async function* paginateQuery<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	config: DynamoDBDocumentPaginationConfiguration,
	input: QueryCommandInput<CK>,
	...additionalArguments: any
): Paginator<QueryCommandOutput<A, CK>> {
	// ToDo: replace with actual type instead of typeof input.ExclusiveStartKey
	let token: typeof input.ExclusiveStartKey | undefined = config.startingToken || undefined;
	let hasNext = true;
	let page: QueryCommandOutput<A, CK>;

	while (hasNext) {
		input.ExclusiveStartKey = token;
		input["Limit"] = config.pageSize;
		if (config.client instanceof DynamoDBDocumentClient) {
			page = await makePagedClientRequest(config.client, input, ...additionalArguments);
		} else {
			throw new Error("Invalid client, expected DynamoDBDocument | DynamoDBDocumentClient");
		}
		yield page;
		token = page.LastEvaluatedKey;
		hasNext = !!token;
	}
	// @ts-ignore
	return undefined;
}
