import { DeleteCommand, DeleteCommandInput, DeleteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes, ReturnValues, ReturnValuesAttributes } from "./utils";

export type DeleteReturnValues = ReturnValues.ALL_OLD | ReturnValues.NONE | undefined;

export type DeleteItemInput<K extends GenericAttributes = GenericAttributes, RV extends DeleteReturnValues = undefined> = Omit<DeleteCommandInput, "TableName" | "Key" | "ReturnValues"> & {
	TableName?: string;
	Key: K;
} & (RV extends ReturnValues ? { ReturnValues: RV } : {});

export type DeleteItemOutput<A extends GenericAttributes = GenericAttributes, RV extends DeleteReturnValues = undefined> = Omit<DeleteCommandOutput, "Attributes"> & {
	Attributes: ReturnValuesAttributes<A, RV>;
};

export const deleteItem = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes, RV extends DeleteReturnValues = undefined>(
	config: Configuration,
	input: DeleteItemInput<K, RV>
): Promise<DeleteItemOutput<A, RV>> => executeTableCommand(config, input, DeleteCommand);
