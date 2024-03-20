import { ItemResponse } from "@aws-sdk/client-dynamodb";
import { ExecuteTransactionCommand, ExecuteTransactionCommandInput, ExecuteTransactionCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type ExecuteItemsTransactionInput = ExecuteTransactionCommandInput;

export type ExecuteItemsTransactionOutput<A extends GenericAttributes = GenericAttributes> = Omit<ExecuteTransactionCommandOutput, "Responses"> & {
	Responses?: (Omit<ItemResponse, "Item"> & {
		Item: A;
	})[];
};

export const executeItemsTransaction = async <A extends GenericAttributes = GenericAttributes>(config: Configuration, input: ExecuteItemsTransactionInput): Promise<ExecuteItemsTransactionOutput<A>> =>
	executeCommand(config, input, ExecuteTransactionCommand);
