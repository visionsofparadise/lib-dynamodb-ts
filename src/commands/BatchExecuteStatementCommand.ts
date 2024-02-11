// smithy-typescript generated code
import {
	BatchExecuteStatementCommand as __BatchExecuteStatementCommand,
	BatchExecuteStatementCommandInput as __BatchExecuteStatementCommandInput,
	BatchExecuteStatementCommandOutput as __BatchExecuteStatementCommandOutput,
	BatchStatementError,
	BatchStatementRequest,
	BatchStatementResponse,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { HttpHandlerOptions as __HttpHandlerOptions, Handler, MiddlewareStack } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES } from "./utils";

export type BatchExecuteStatementCommandInput = Omit<__BatchExecuteStatementCommandInput, "Statements"> & {
	Statements:
		| (Omit<BatchStatementRequest, "Parameters"> & {
				Parameters?: NativeAttributeValue[];
		  })[]
		| undefined;
};

export type BatchExecuteStatementCommandOutput<A extends GenericAttributes = GenericAttributes> = Omit<__BatchExecuteStatementCommandOutput, "Responses"> & {
	Responses?: (Omit<BatchStatementResponse, "Error" | "Item"> & {
		Error?: Omit<BatchStatementError, "Item"> & {
			Item?: A;
		};
		Item?: A;
	})[];
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * BatchExecuteStatementCommand operation from {@link @aws-sdk/client-dynamodb#BatchExecuteStatementCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class BatchExecuteStatementCommand<A extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	BatchExecuteStatementCommandInput,
	BatchExecuteStatementCommandOutput<A>,
	__BatchExecuteStatementCommandInput,
	__BatchExecuteStatementCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		Statements: {
			"*": {
				Parameters: ALL_MEMBERS, // set/list of AttributeValue
			},
		},
	};

	protected readonly outputKeyNodes = {
		Responses: {
			"*": {
				Error: {
					Item: ALL_VALUES, // map with AttributeValue
				},
				Item: ALL_VALUES, // map with AttributeValue
			},
		},
	};

	protected readonly clientCommand: __BatchExecuteStatementCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<BatchExecuteStatementCommandInput, BatchExecuteStatementCommandOutput<A>>;

	constructor(readonly input: BatchExecuteStatementCommandInput) {
		super();
		this.clientCommand = new __BatchExecuteStatementCommand(this.input as any);

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
	): Handler<BatchExecuteStatementCommandInput, BatchExecuteStatementCommandOutput<A>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
