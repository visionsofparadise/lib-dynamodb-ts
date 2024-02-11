// smithy-typescript generated code
import { Condition, ScanCommand as __ScanCommand, ScanCommandInput as __ScanCommandInput, ScanCommandOutput as __ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_MEMBERS, ALL_VALUES } from "./utils";

export type ScanCommandInput<CK extends GenericAttributes = GenericAttributes> = Omit<__ScanCommandInput, "ScanFilter" | "ExclusiveStartKey" | "ExpressionAttributeValues"> & {
	ScanFilter?: Record<
		string,
		Omit<Condition, "AttributeValueList"> & {
			AttributeValueList?: NativeAttributeValue[];
		}
	>;
	ExclusiveStartKey?: CK;
	ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
};

export type ScanCommandOutput<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> = Omit<__ScanCommandOutput, "Items" | "LastEvaluatedKey"> & {
	Items: Array<A>;
	LastEvaluatedKey?: CK;
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * ScanCommand operation from {@link @aws-sdk/client-dynamodb#ScanCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class ScanCommand<A extends GenericAttributes = GenericAttributes, CK extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	ScanCommandInput<CK>,
	ScanCommandOutput<A, CK>,
	__ScanCommandInput,
	__ScanCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		ScanFilter: {
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

	protected readonly clientCommand: __ScanCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<ScanCommandInput<CK>, ScanCommandOutput<A, CK>>;

	constructor(readonly input: ScanCommandInput<CK>) {
		super();
		this.clientCommand = new __ScanCommand(this.input as any);

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
	): Handler<ScanCommandInput<CK>, ScanCommandOutput<A, CK>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
