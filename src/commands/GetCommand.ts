// smithy-typescript generated code
import { GetItemCommand as __GetItemCommand, GetItemCommandInput as __GetItemCommandInput, GetItemCommandOutput as __GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_VALUES } from "./utils";

export type GetCommandInput<K extends GenericAttributes = GenericAttributes> = Omit<__GetItemCommandInput, "Key"> & {
	Key: K;
};

export type GetCommandOutput<A extends GenericAttributes = GenericAttributes> = Omit<__GetItemCommandOutput, "Item"> & {
	Item: A;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * GetItemCommand operation from {@link @aws-sdk/client-dynamodb#GetItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class GetCommand<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	GetCommandInput<K>,
	GetCommandOutput<A>,
	__GetItemCommandInput,
	__GetItemCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		Key: ALL_VALUES, // map with AttributeValue
	};

	protected readonly outputKeyNodes = {
		Item: ALL_VALUES, // map with AttributeValue
	};

	protected readonly clientCommand: __GetItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<GetCommandInput<K>, GetCommandOutput<A>>;

	constructor(readonly input: GetCommandInput) {
		super();
		this.clientCommand = new __GetItemCommand(this.input as any);

		// @ts-ignore
		this.middlewareStack = this.clientCommand.middlewareStack;
	}

	/**
	 * @internal
	 */
	// @ts-ignore
	resolveMiddleware(
		clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
		configuration: DynamoDBDocumentClientResolvedConfig,
		options?: __HttpHandlerOptions
	): Handler<GetCommandInput<K>, GetCommandOutput<A>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
