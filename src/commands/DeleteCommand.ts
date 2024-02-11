// smithy-typescript generated code
import {
	DeleteItemCommand as __DeleteItemCommand,
	DeleteItemCommandInput as __DeleteItemCommandInput,
	DeleteItemCommandOutput as __DeleteItemCommandOutput,
	ExpectedAttributeValue,
	ItemCollectionMetrics,
	ReturnValue,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { HttpHandlerOptions as __HttpHandlerOptions, Handler, MiddlewareStack } from "@smithy/types";
import { GenericAttributes, ReturnValueAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES, SELF } from "./utils";

export type DeleteReturnValue = Extract<ReturnValue, "ALL_OLD" | "NONE"> | undefined;

export type DeleteCommandInput<K extends GenericAttributes = GenericAttributes, RV extends DeleteReturnValue = undefined> = Omit<
	__DeleteItemCommandInput,
	"Key" | "ReturnValues" | "Expected" | "ExpressionAttributeValues"
> & {
	Key: K;
	ReturnValues?: RV;
	Expected?: Record<
		string,
		Omit<ExpectedAttributeValue, "Value" | "AttributeValueList"> & {
			Value?: NativeAttributeValue;
			AttributeValueList?: NativeAttributeValue[];
		}
	>;
	ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
};

export type DeleteCommandOutput<A extends GenericAttributes = GenericAttributes, RV extends DeleteReturnValue = undefined> = Omit<__DeleteItemCommandOutput, "Attributes" | "ItemCollectionMetrics"> & {
	Attributes: ReturnValueAttributes<A, RV>;
	ItemCollectionMetrics?: Omit<ItemCollectionMetrics, "ItemCollectionKey"> & {
		ItemCollectionKey?: Record<string, NativeAttributeValue>;
	};
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * DeleteItemCommand operation from {@link @aws-sdk/client-dynamodb#DeleteItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class DeleteCommand<
	A extends GenericAttributes = GenericAttributes,
	K extends GenericAttributes = GenericAttributes,
	RV extends DeleteReturnValue = undefined
> extends DynamoDBDocumentClientCommand<DeleteCommandInput<K, RV>, DeleteCommandOutput<A, RV>, __DeleteItemCommandInput, __DeleteItemCommandOutput, DynamoDBDocumentClientResolvedConfig> {
	protected readonly inputKeyNodes = {
		Key: ALL_VALUES, // map with AttributeValue
		Expected: {
			"*": {
				Value: SELF,
				AttributeValueList: ALL_MEMBERS, // set/list of AttributeValue
			},
		},
		ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
	};

	protected readonly outputKeyNodes = {
		Attributes: ALL_VALUES, // map with AttributeValue
		ItemCollectionMetrics: {
			ItemCollectionKey: ALL_VALUES, // map with AttributeValue
		},
	};

	protected readonly clientCommand: __DeleteItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<DeleteCommandInput<K, RV>, DeleteCommandOutput<A, RV>>;

	constructor(readonly input: DeleteCommandInput<K, RV>) {
		super();
		this.clientCommand = new __DeleteItemCommand(this.input as any);

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
	): Handler<DeleteCommandInput<K, RV>, DeleteCommandOutput<A, RV>> {
		this.addMarshallingMiddleware(configuration);
		// @ts-ignore
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
