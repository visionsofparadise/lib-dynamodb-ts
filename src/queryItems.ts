import { QueryCommand, QueryCommandInput, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type QueryItemsInput<CK extends GenericAttributes = GenericAttributes> = Omit<QueryCommandInput, "TableName" | "ExclusiveStartKey"> & {
	TableName?: string;
	ExclusiveStartKey?: CK;
};

export type QueryItemsOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<QueryCommandOutput, "Items" | "LastEvaluatedKey"> & {
	Items: Array<A> | undefined;
	LastEvaluatedKey?: CK;
};

export const queryItems = async <A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: QueryItemsInput<CK>
): Promise<QueryItemsOutput<A, CK>> => executeTableCommand(config, input, QueryCommand);
