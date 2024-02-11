import { DynamoDBDocumentClient, DynamoDBDocumentPaginationConfiguration } from "@aws-sdk/lib-dynamodb";
import { Paginator } from "@smithy/types";
import { ScanCommand, ScanCommandInput, ScanCommandOutput } from "../commands/ScanCommand";
import { GenericAttributes } from "../utils";

const makePagedClientRequest = async <A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	client: DynamoDBDocumentClient,
	input: ScanCommandInput<CK>,
	...args: any
): Promise<ScanCommandOutput<A, CK>> => {
	// @ts-ignore
	return await client.send(new ScanCommand(input), ...args);
};

/**
 * @public
 *
 * @param ScanCommandInput - {@link ScanCommandInput}
 * @returns {@link ScanCommandOutput}
 *
 */
export async function* paginateScan<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	config: DynamoDBDocumentPaginationConfiguration,
	input: ScanCommandInput<CK>,
	...additionalArguments: any
): Paginator<ScanCommandOutput<A, CK>> {
	// ToDo: replace with actual type instead of typeof input.ExclusiveStartKey
	let token: typeof input.ExclusiveStartKey | undefined = config.startingToken || undefined;
	let hasNext = true;
	let page: ScanCommandOutput<A, CK>;

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
