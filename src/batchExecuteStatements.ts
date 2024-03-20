import { BatchStatementError, BatchStatementResponse } from "@aws-sdk/client-dynamodb";
import { BatchExecuteStatementCommand, BatchExecuteStatementCommandInput, BatchExecuteStatementCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type BatchExecuteStatementsInput = Omit<BatchExecuteStatementCommandInput, "TableName"> & {
	TableName?: string;
};

export type BatchExecuteStatementsOutput<A extends GenericAttributes = GenericAttributes> = Omit<BatchExecuteStatementCommandOutput, "Responses"> & {
	Responses?: (Omit<BatchStatementResponse, "Error" | "Item"> & {
		Error?: Omit<BatchStatementError, "Item"> & {
			Item?: A;
		};
		Item?: A;
	})[];
};

export const batchExecuteStatements = async <A extends GenericAttributes = GenericAttributes>(config: Configuration, input: BatchExecuteStatementsInput): Promise<BatchExecuteStatementsOutput<A>> =>
	executeCommand(config, input, BatchExecuteStatementCommand);
