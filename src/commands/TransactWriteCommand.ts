// smithy-typescript generated code
import {
	ConditionCheck,
	Delete,
	ItemCollectionMetrics,
	Put,
	TransactWriteItem,
	Update,
	TransactWriteItemsCommand as __TransactWriteItemsCommand,
	TransactWriteItemsCommandInput as __TransactWriteItemsCommandInput,
	TransactWriteItemsCommandOutput as __TransactWriteItemsCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_VALUES } from "./utils";

export type TransactWriteCommandInput<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> = Omit<__TransactWriteItemsCommandInput, "TransactItems"> & {
	TransactItems:
		| (Omit<TransactWriteItem, "ConditionCheck" | "Put" | "Delete" | "Update"> & {
				ConditionCheck?: Omit<ConditionCheck, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Put?: Omit<Put, "Item" | "ExpressionAttributeValues"> & {
					Item: A;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Delete?: Omit<Delete, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
				Update?: Omit<Update, "Key" | "ExpressionAttributeValues"> & {
					Key: K;
					ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
				};
		  })[]
		| undefined;
};

export type TransactWriteCommandOutput = Omit<__TransactWriteItemsCommandOutput, "ItemCollectionMetrics"> & {
	ItemCollectionMetrics?: Record<
		string,
		(Omit<ItemCollectionMetrics, "ItemCollectionKey"> & {
			ItemCollectionKey?: Record<string, NativeAttributeValue>;
		})[]
	>;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * TransactWriteItemsCommand operation from {@link @aws-sdk/client-dynamodb#TransactWriteItemsCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class TransactWriteCommand<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	TransactWriteCommandInput<A, K>,
	TransactWriteCommandOutput,
	__TransactWriteItemsCommandInput,
	__TransactWriteItemsCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		TransactItems: {
			"*": {
				ConditionCheck: {
					Key: ALL_VALUES, // map with AttributeValue
					ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
				},
				Put: {
					Item: ALL_VALUES, // map with AttributeValue
					ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
				},
				Delete: {
					Key: ALL_VALUES, // map with AttributeValue
					ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
				},
				Update: {
					Key: ALL_VALUES, // map with AttributeValue
					ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly outputKeyNodes = {
		ItemCollectionMetrics: {
			"*": {
				"*": {
					ItemCollectionKey: ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly clientCommand: __TransactWriteItemsCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<TransactWriteCommandInput<A, K>, TransactWriteCommandOutput>;

	constructor(readonly input: TransactWriteCommandInput<A, K>) {
		super();
		this.clientCommand = new __TransactWriteItemsCommand(this.input as any);

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
	): Handler<TransactWriteCommandInput<A, K>, TransactWriteCommandOutput> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		return async () => handler(this.clientCommand);
	}
}
