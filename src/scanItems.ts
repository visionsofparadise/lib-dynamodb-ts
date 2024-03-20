import { ScanCommand, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeTableCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type ScanItemsInput<CK extends GenericAttributes = GenericAttributes> = Omit<ScanCommandInput, "TableName" | "ExclusiveStartKey"> & {
	TableName?: string;
	ExclusiveStartKey?: CK;
};

export type ScanItemsOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<ScanCommandOutput, "Items" | "LastEvaluatedKey"> & {
	Items: Array<A> | undefined;
	LastEvaluatedKey?: CK;
};

export const scanItems = async <A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: ScanItemsInput<CK>
): Promise<ScanItemsOutput<A, CK>> => executeTableCommand(config, input, ScanCommand);
