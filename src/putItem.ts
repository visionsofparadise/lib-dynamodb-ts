import { PutCommand, PutCommandInput, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes, ReturnValues, ReturnValuesAttributes } from "./utils";

export type PutReturnValues = ReturnValues.ALL_OLD | ReturnValues.NONE | undefined;

export type PutItemInput<A extends GenericAttributes = GenericAttributes, RV extends PutReturnValues = undefined> = Omit<PutCommandInput, "TableName" | "Item" | "ReturnValues"> & {
	TableName?: string;
	Item: A;
} & (RV extends ReturnValues ? { ReturnValues: RV } : {});

export type PutItemOutput<A extends GenericAttributes = GenericAttributes, RV extends PutReturnValues = undefined> = Omit<PutCommandOutput, "Attributes"> & {
	Attributes: ReturnValuesAttributes<A, RV>;
};

export const putItem = async <A extends GenericAttributes = GenericAttributes, RV extends PutReturnValues = undefined>(
	config: Configuration,
	input: PutItemInput<A, RV>
): Promise<PutItemOutput<A, RV>> => executeTableCommand(config, input, PutCommand);
