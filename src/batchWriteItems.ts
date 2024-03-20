import { DeleteRequest, PutRequest, WriteRequest } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, BatchWriteCommandInput, BatchWriteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type BatchWriteItemsInput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<BatchWriteCommandInput, "RequestItems"> & {
	RequestItems:
		| Record<
				string,
				(Omit<WriteRequest, "PutRequest" | "DeleteRequest"> & {
					PutRequest?: Omit<PutRequest, "Item"> & {
						Item: A;
					};
					DeleteRequest?: Omit<DeleteRequest, "Key"> & {
						Key: K;
					};
				})[]
		  >
		| undefined;
};

export type BatchWriteItemsOutput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<BatchWriteCommandOutput, "UnprocessedItems"> & {
	UnprocessedItems?: Record<
		string,
		(Omit<WriteRequest, "PutRequest" | "DeleteRequest"> & {
			PutRequest?: Omit<PutRequest, "Item"> & {
				Item: A;
			};
			DeleteRequest?: Omit<DeleteRequest, "Key"> & {
				Key: K;
			};
		})[]
	>;
};

export const batchWriteItems = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: BatchWriteItemsInput<A, K>
): Promise<BatchWriteItemsOutput<A, K>> => executeCommand(config, input, BatchWriteCommand);
