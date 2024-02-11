// smithy-typescript generated code
import { Condition, QueryCommand as __QueryCommand, QueryCommandInput as __QueryCommandInput, QueryCommandOutput as __QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES } from "./utils";

export type QueryCommandInput<CK extends GenericAttributes = GenericAttributes> = Omit<__QueryCommandInput, "KeyConditions" | "QueryFilter" | "ExclusiveStartKey" | "ExpressionAttributeValues"> & {
	KeyConditions?: Record<
		string,
		Omit<Condition, "AttributeValueList"> & {
			AttributeValueList?: NativeAttributeValue[];
		}
	>;
	QueryFilter?: Record<
		string,
		Omit<Condition, "AttributeValueList"> & {
			AttributeValueList?: NativeAttributeValue[];
		}
	>;
	ExclusiveStartKey?: CK;
	ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
};

export type QueryCommandOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<__QueryCommandOutput, "Items" | "LastEvaluatedKey"> & {
	Items: Array<A>;
	LastEvaluatedKey?: CK;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * QueryCommand operation from {@link @aws-sdk/client-dynamodb#QueryCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class QueryCommand<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	QueryCommandInput<CK>,
	QueryCommandOutput<A, CK>,
	__QueryCommandInput,
	__QueryCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		KeyConditions: {
			"*": {
				AttributeValueList: ALL_MEMBERS, // set/list of AttributeValue
			},
		},
		QueryFilter: {
			"*": {
				AttributeValueList: ALL_MEMBERS, // set/list of AttributeValue
			},
		},
		ExclusiveStartKey: ALL_VALUES, // map with AttributeValue
		ExpressionAttributeValues: ALL_VALUES, // map with AttributeValue
	};

	protected readonly outputKeyNodes = {
		Items: {
			"*": ALL_VALUES, // map with AttributeValue
		},
		LastEvaluatedKey: ALL_VALUES, // map with AttributeValue
	};

	protected readonly clientCommand: __QueryCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<QueryCommandInput<CK>, QueryCommandOutput<A, CK>>;

	constructor(readonly input: QueryCommandInput<CK>) {
		super();
		this.clientCommand = new __QueryCommand(this.input as any);

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
	): Handler<QueryCommandInput<CK>, QueryCommandOutput<A, CK>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
