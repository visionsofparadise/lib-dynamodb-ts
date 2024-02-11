import {
	BatchWriteItemCommand as __BatchWriteItemCommand,
	BatchWriteItemCommandInput as __BatchWriteItemCommandInput,
	BatchWriteItemCommandOutput as __BatchWriteItemCommandOutput,
	DeleteRequest,
	ItemCollectionMetrics,
	PutRequest,
	WriteRequest,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { HttpHandlerOptions as __HttpHandlerOptions, Handler, MiddlewareStack } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_VALUES } from "./utils";

export type BatchWriteCommandInput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<__BatchWriteItemCommandInput, "RequestItems"> & {
	RequestItems:
		| Record<
				string,
				(Omit<WriteRequest, "PutRequest" | "DeleteRequest"> & {
					PutRequest?: Omit<PutRequest, "Item"> & {
						Item: A;
					};
					DeleteRequest?: Omit<DeleteRequest, "Key"> & {
						Key: K;
					};
				})[]
		  >
		| undefined;
};

export type BatchWriteCommandOutput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<
	__BatchWriteItemCommandOutput,
	"UnprocessedItems" | "ItemCollectionMetrics"
> & {
	UnprocessedItems?: Record<
		string,
		(Omit<WriteRequest, "PutRequest" | "DeleteRequest"> & {
			PutRequest?: Omit<PutRequest, "Item"> & {
				Item: A;
			};
			DeleteRequest?: Omit<DeleteRequest, "Key"> & {
				Key: K;
			};
		})[]
	>;
	ItemCollectionMetrics?: Record<
		string,
		(Omit<ItemCollectionMetrics, "ItemCollectionKey"> & {
			ItemCollectionKey?: Record<string, NativeAttributeValue>;
		})[]
	>;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * BatchWriteItemCommand operation from {@link @aws-sdk/client-dynamodb#BatchWriteItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class BatchWriteCommand<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	BatchWriteCommandInput<A, K>,
	BatchWriteCommandOutput<A, K>,
	__BatchWriteItemCommandInput,
	__BatchWriteItemCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		RequestItems: {
			"*": {
				"*": {
					PutRequest: {
						Item: ALL_VALUES, // map with AttributeValue
					},
					DeleteRequest: {
						Key: ALL_VALUES, // map with AttributeValue
					},
				},
			},
		},
	};

	protected readonly outputKeyNodes = {
		UnprocessedItems: {
			"*": {
				"*": {
					PutRequest: {
						Item: ALL_VALUES, // map with AttributeValue
					},
					DeleteRequest: {
						Key: ALL_VALUES, // map with AttributeValue
					},
				},
			},
		},
		ItemCollectionMetrics: {
			"*": {
				"*": {
					ItemCollectionKey: ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly clientCommand: __BatchWriteItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<BatchWriteCommandInput<A, K>, BatchWriteCommandOutput<A, K>>;

	constructor(readonly input: BatchWriteCommandInput<A, K>) {
		super();
		this.clientCommand = new __BatchWriteItemCommand(this.input as any);

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
	): Handler<BatchWriteCommandInput<A, K>, BatchWriteCommandOutput<A, K>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
