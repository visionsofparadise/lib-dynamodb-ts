import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export interface Configuration {
	Client: DynamoDBDocumentClient;
	TableName?: string;
}

export const executeCommand = async <Command extends { new (...params: any[]): any }, Input extends object, Output>(config: Configuration, input: Input, Command: Command): Promise<Output> => {
	const result = await config.Client.send(new Command(input));

	const output = result as Output;

	return output;
};

export const executeTableCommand = async <Command extends { new (...params: any[]): any }, Input extends { TableName?: string }, Output>(
	config: Configuration,
	input: Input,
	Command: Command
): Promise<Output> =>
	executeCommand(
		config,
		{
			...input,
			TableName: input.TableName || config.TableName,
		},
		Command
	);
