import { GetCommand, GetCommandInput, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type GetItemInput<K extends GenericAttributes = GenericAttributes> = Omit<GetCommandInput, "TableName" | "Key"> & {
	TableName?: string;
	Key: K;
};

export type GetItemOutput<A extends GenericAttributes = GenericAttributes> = Omit<GetCommandOutput, "Item"> & {
	Item: A;
};

export const getItem = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: GetItemInput<K>
): Promise<GetItemOutput<A>> => executeTableCommand(config, input, GetCommand);
