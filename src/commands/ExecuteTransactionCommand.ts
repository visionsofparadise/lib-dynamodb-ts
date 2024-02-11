// smithy-typescript generated code
import {
	ExecuteTransactionCommand as __ExecuteTransactionCommand,
	ExecuteTransactionCommandInput as __ExecuteTransactionCommandInput,
	ExecuteTransactionCommandOutput as __ExecuteTransactionCommandOutput,
	ItemResponse,
	ParameterizedStatement,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { HttpHandlerOptions as __HttpHandlerOptions, Handler, MiddlewareStack } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES } from "./utils";

export type ExecuteTransactionCommandInput = Omit<__ExecuteTransactionCommandInput, "TransactStatements"> & {
	TransactStatements:
		| (Omit<ParameterizedStatement, "Parameters"> & {
				Parameters?: NativeAttributeValue[];
		  })[]
		| undefined;
};

export type ExecuteTransactionCommandOutput<A extends GenericAttributes = GenericAttributes> = Omit<__ExecuteTransactionCommandOutput, "Responses"> & {
	Responses?: (Omit<ItemResponse, "Item"> & {
		Item: A;
	})[];
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * ExecuteTransactionCommand operation from {@link @aws-sdk/client-dynamodb#ExecuteTransactionCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class ExecuteTransactionCommand<A extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	ExecuteTransactionCommandInput,
	ExecuteTransactionCommandOutput<A>,
	__ExecuteTransactionCommandInput,
	__ExecuteTransactionCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		TransactStatements: {
			"*": {
				Parameters: ALL_MEMBERS, // set/list of AttributeValue
			},
		},
	};

	protected readonly outputKeyNodes = {
		Responses: {
			"*": {
				Item: ALL_VALUES, // map with AttributeValue
			},
		},
	};

	protected readonly clientCommand: __ExecuteTransactionCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<ExecuteTransactionCommandInput, ExecuteTransactionCommandOutput<A>>;

	constructor(readonly input: ExecuteTransactionCommandInput) {
		super();
		this.clientCommand = new __ExecuteTransactionCommand(this.input as any);

		// @ts-ignore
		this.middlewareStack = this.clientCommand.middlewareStack;
	}

	/**
	 * @internal
	 */
	resolveMiddleware(
		clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
		configuration: DynamoDBDocumentClientResolvedConfig,
		options?: __HttpHandlerOptions
	): Handler<ExecuteTransactionCommandInput, ExecuteTransactionCommandOutput<A>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
