// smithy-typescript generated code
import {
	ExecuteStatementCommand as __ExecuteStatementCommand,
	ExecuteStatementCommandInput as __ExecuteStatementCommandInput,
	ExecuteStatementCommandOutput as __ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES } from "./utils";

export type ExecuteStatementCommandInput = Omit<__ExecuteStatementCommandInput, "Parameters"> & {
	Parameters?: NativeAttributeValue[];
};

export type ExecuteStatementCommandOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<
	__ExecuteStatementCommandOutput,
	"Items" | "LastEvaluatedKey"
> & {
	Items: Array<A>;
	LastEvaluatedKey?: CK;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * ExecuteStatementCommand operation from {@link @aws-sdk/client-dynamodb#ExecuteStatementCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class ExecuteStatementCommand<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	ExecuteStatementCommandInput,
	ExecuteStatementCommandOutput<A, CK>,
	__ExecuteStatementCommandInput,
	__ExecuteStatementCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		Parameters: ALL_MEMBERS, // set/list of AttributeValue
	};

	protected readonly outputKeyNodes = {
		Items: {
			"*": ALL_VALUES, // map with AttributeValue
		},
		LastEvaluatedKey: ALL_VALUES, // map with AttributeValue
	};

	protected readonly clientCommand: __ExecuteStatementCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<ExecuteStatementCommandInput, ExecuteStatementCommandOutput<A, CK>>;

	constructor(readonly input: ExecuteStatementCommandInput) {
		super();
		this.clientCommand = new __ExecuteStatementCommand(this.input as any);

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
	): Handler<ExecuteStatementCommandInput, ExecuteStatementCommandOutput<A, CK>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
