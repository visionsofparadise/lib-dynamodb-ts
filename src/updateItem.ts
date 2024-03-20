import { UpdateCommand, UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes, ReturnValues, ReturnValuesAttributes } from "./utils";

export type UpdateReturnValues = ReturnValues | undefined;

export type UpdateItemInput<K extends GenericAttributes = GenericAttributes, RV extends UpdateReturnValues = undefined> = Omit<UpdateCommandInput, "TableName" | "Key" | "ReturnValues"> & {
	TableName?: string;
	Key: K;
} & (RV extends ReturnValues ? { ReturnValues: RV } : {});

export type UpdateItemOutput<A extends GenericAttributes = GenericAttributes, RV extends UpdateReturnValues = undefined> = Omit<UpdateCommandOutput, "Attributes"> & {
	Attributes: ReturnValuesAttributes<A, RV>;
};

export const updateItem = async <A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes, RV extends UpdateReturnValues = undefined>(
	config: Configuration,
	input: UpdateItemInput<K, RV>
): Promise<UpdateItemOutput<A, RV>> => executeTableCommand(config, input, UpdateCommand);
