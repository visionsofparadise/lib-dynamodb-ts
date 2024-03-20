import { ConditionCheck, Delete, Put, TransactWriteItem, Update } from "@aws-sdk/client-dynamodb";
import { TransactWriteCommand, TransactWriteCommandInput, TransactWriteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type TransactWriteItemsInput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<TransactWriteCommandInput, "TransactItems"> & {
	TransactItems:
		| (Omit<TransactWriteItem, "ConditionCheck" | "Put" | "Delete" | "Update"> & {
				ConditionCheck?: Omit<ConditionCheck, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Put?: Omit<Put, "Item" | "ExpressionAttributeValues"> & {
					Item: A;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Delete?: Omit<Delete, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Update?: Omit<Update, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
		  })[]
		| undefined;
};

export type TransactWriteItemsOutput = TransactWriteCommandOutput;

export const transactWriteItems = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: TransactWriteItemsInput<A, K>
): Promise<TransactWriteItemsOutput> => executeCommand(config, input, TransactWriteCommand);
