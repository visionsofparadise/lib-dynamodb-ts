import { KeysAndAttributes } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, BatchGetCommandInput, BatchGetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type BatchGetItemsInput<K extends GenericAttributes = GenericAttributes> = Omit<BatchGetCommandInput, "RequestItems"> & {
	RequestItems: Record<
		string,
		Omit<KeysAndAttributes, "Keys"> & {
			Keys: K[];
		}
	>;
};

export type BatchGetItemsOutput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<BatchGetCommandOutput, "Responses" | "UnprocessedKeys"> & {
	Responses?: Record<string, A[]>;
	UnprocessedKeys?: Record<
		string,
		Omit<KeysAndAttributes, "Keys"> & {
			Keys: K[] | undefined;
		}
	>;
};

export const batchGetItems = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: BatchGetItemsInput<K>
): Promise<BatchGetItemsOutput<A, K>> => executeCommand(config, input, BatchGetCommand);
