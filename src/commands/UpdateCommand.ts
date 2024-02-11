// smithy-typescript generated code
import {
	AttributeValueUpdate,
	ExpectedAttributeValue,
	ItemCollectionMetrics,
	ReturnValue,
	UpdateItemCommand as __UpdateItemCommand,
	UpdateItemCommandInput as __UpdateItemCommandInput,
	UpdateItemCommandOutput as __UpdateItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes, ReturnValueAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES, SELF } from "./utils";

export type UpdateReturnValue = ReturnValue | undefined;

export type UpdateCommandInput<K extends GenericAttributes = GenericAttributes, RV extends UpdateReturnValue = undefined> = Omit<
	__UpdateItemCommandInput,
	"Key" | "ReturnValues" | "AttributeUpdates" | "Expected" | "ExpressionAttributeValues"
> & {
	Key: K;
	ReturnValues?: RV;
	AttributeUpdates?: Record<
		string,
		Omit<AttributeValueUpdate, "Value"> & {
			Value?: NativeAttributeValue;
		}
	>;
	Expected?: Record<
		string,
		Omit<ExpectedAttributeValue, "Value" | "AttributeValueList"> & {
			Value?: NativeAttributeValue;
			AttributeValueList?: NativeAttributeValue[];
		}
	>;
	ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
};

export type UpdateCommandOutput<A extends GenericAttributes = GenericAttributes, RV extends UpdateReturnValue = undefined> = Omit<__UpdateItemCommandOutput, "Attributes" | "ItemCollectionMetrics"> & {
	Attributes: ReturnValueAttributes<A, RV>;
	ItemCollectionMetrics?: Omit<ItemCollectionMetrics, "ItemCollectionKey"> & {
		ItemCollectionKey?: Record<string, NativeAttributeValue>;
	};
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * UpdateItemCommand operation from {@link @aws-sdk/client-dynamodb#UpdateItemCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class UpdateCommand<
	A extends GenericAttributes = GenericAttributes,
	K extends GenericAttributes = GenericAttributes,
	RV extends UpdateReturnValue = undefined
> extends DynamoDBDocumentClientCommand<UpdateCommandInput<K, RV>, UpdateCommandOutput<A, RV>, __UpdateItemCommandInput, __UpdateItemCommandOutput, DynamoDBDocumentClientResolvedConfig> {
	protected readonly inputKeyNodes = {
		Key: ALL_VALUES, // map with AttributeValue
		AttributeUpdates: {
			"*": {
				Value: SELF,
			},
		},
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

	// @ts-ignore
	protected readonly clientCommand: __UpdateItemCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<UpdateCommandInput<K, RV>, UpdateCommandOutput<A, RV>>;

	constructor(readonly input: UpdateCommandInput<K, RV>) {
		super();
		this.clientCommand = new __UpdateItemCommand(this.input as any);

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
	): Handler<UpdateCommandInput<K, RV>, UpdateCommandOutput<A, RV>> {
		this.addMarshallingMiddleware(configuration);

		// @ts-ignore
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
