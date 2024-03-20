import { ExecuteStatementCommand, ExecuteStatementCommandInput, ExecuteStatementCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Configuration, executeCommand } from "./executeCommand";
import { GenericAttributes } from "./utils";

export type ExecuteItemsStatementInput = ExecuteStatementCommandInput;

export type ExecuteItemsStatementOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<
	ExecuteStatementCommandOutput,
	"Items" | "LastEvaluatedKey"
> & {
	Items: Array<A>;
	LastEvaluatedKey?: CK;
};

export const executeItemsStatement = async <A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes>(
	config: Configuration,
	input: ExecuteItemsStatementInput
): Promise<ExecuteItemsStatementOutput<A, CK>> => executeCommand(config, input, ExecuteStatementCommand);
