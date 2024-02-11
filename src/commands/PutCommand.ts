// smithy-typescript generated code
import {
	ExpectedAttributeValue,
	ItemCollectionMetrics,
	ReturnValue,
	PutItemCommand as __PutItemCommand,
	PutItemCommandInput as __PutItemCommandInput,
	PutItemCommandOutput as __PutItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes, ReturnValueAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES, SELF } from "./utils";

export type PutReturnValue = Extract<ReturnValue, "ALL_OLD" | "NONE"> | undefined;

export type PutCommandInput<A extends GenericAttributes = GenericAttributes, RV extends PutReturnValue = undefined> = Omit<
	__PutItemCommandInput,
	"Item" | "ReturnValues" | "Expected" | "ExpressionAttributeValues"
> & {
	Item: A;
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

export type PutCommandOutput<A extends GenericAttributes = GenericAttributes, RV extends PutReturnValue = undefined> = Omit<__PutItemCommandOutput, "Attributes" | "ItemCollectionMetrics"> & {
	Attributes: ReturnValueAttributes<A, RV>;
	ItemCollectionMetrics?: Omit<ItemCollectionMetrics, "ItemCollectionKey"> & {
		ItemCollectionKey?: Record<string, NativeAttributeValue>;
	};
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * PutItemCommand operation from {@link @aws-sdk/client-dynamodb#PutItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class PutCommand<A extends GenericAttributes = GenericAttributes, RV extends PutReturnValue = undefined> extends DynamoDBDocumentClientCommand<
	PutCommandInput<A, RV>,
	PutCommandOutput<A, RV>,
	__PutItemCommandInput,
	__PutItemCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		Item: ALL_VALUES, // map with AttributeValue
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

	protected readonly clientCommand: __PutItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<PutCommandInput<A, RV>, PutCommandOutput<A, RV>>;

	constructor(readonly input: PutCommandInput<A, RV>) {
		super();
		this.clientCommand = new __PutItemCommand(this.input as any);

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
	): Handler<PutCommandInput<A, RV>, PutCommandOutput<A, RV>> {
		this.addMarshallingMiddleware(configuration);

		// @ts-ignore
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
