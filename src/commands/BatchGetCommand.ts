import {
	BatchGetItemCommand as __BatchGetItemCommand,
	BatchGetItemCommandInput as __BatchGetItemCommandInput,
	BatchGetItemCommandOutput as __BatchGetItemCommandOutput,
	KeysAndAttributes,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { HttpHandlerOptions as __HttpHandlerOptions, Handler, MiddlewareStack } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_VALUES } from "./utils";

export type BatchGetCommandInput<K extends GenericAttributes = GenericAttributes> = Omit<__BatchGetItemCommandInput, "RequestItems"> & {
	RequestItems: Record<
		string,
		Omit<KeysAndAttributes, "Keys"> & {
			Keys: K[];
		}
	>;
};

export type BatchGetCommandOutput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<
	__BatchGetItemCommandOutput,
	"Responses" | "UnprocessedKeys"
> & {
	Responses?: Record<string, A[]>;
	UnprocessedKeys?: Record<
		string,
		Omit<KeysAndAttributes, "Keys"> & {
			Keys: K[] | undefined;
		}
	>;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * BatchGetItemCommand operation from {@link @aws-sdk/client-dynamodb#BatchGetItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class BatchGetCommand<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	BatchGetCommandInput<K>,
	BatchGetCommandOutput<A, K>,
	__BatchGetItemCommandInput,
	__BatchGetItemCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		RequestItems: {
			"*": {
				Keys: {
					"*": ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly outputKeyNodes = {
		Responses: {
			"*": {
				"*": ALL_VALUES, // map with AttributeValue
			},
		},
		UnprocessedKeys: {
			"*": {
				Keys: {
					"*": ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly clientCommand: __BatchGetItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<BatchGetCommandInput<K>, BatchGetCommandOutput<A, K>>;

	constructor(readonly input: BatchGetCommandInput<K>) {
		super();
		this.clientCommand = new __BatchGetItemCommand(this.input as any);

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
	): Handler<BatchGetCommandInput<K>, BatchGetCommandOutput<A, K>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
