import { Get, ItemResponse, TransactGetItem } from "@aws-sdk/client-dynamodb";
import { TransactGetCommand, TransactGetCommandInput, TransactGetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type TransactGetItemsInput<K extends GenericAttributes = GenericAttributes> = Omit<TransactGetCommandInput, "TransactItems"> & {
	TransactItems:
		| (Omit<TransactGetItem, "Get"> & {
				Get:
					| (Omit<Get, "Key"> & {
							Key: K;
					  })
					| undefined;
		  })[]
		| undefined;
};

export type TransactGetItemsOutput<A extends GenericAttributes = GenericAttributes> = Omit<TransactGetCommandOutput, "Responses"> & {
	Responses?: (Omit<ItemResponse, "Item"> & {
		Item: A;
	})[];
};

export const transactGetItems = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: TransactGetItemsInput<K>
): Promise<TransactGetItemsOutput<A>> => executeCommand(config, input, TransactGetCommand);
