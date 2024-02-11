// smithy-typescript generated code
import {
	Get,
	ItemResponse,
	TransactGetItem,
	TransactGetItemsCommand as __TransactGetItemsCommand,
	TransactGetItemsCommandInput as __TransactGetItemsCommandInput,
	TransactGetItemsCommandOutput as __TransactGetItemsCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClientCommand, DynamoDBDocumentClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import { GenericAttributes } from "../utils";
import { ALL_VALUES } from "./utils";

export type TransactGetCommandInput<K extends GenericAttributes = GenericAttributes> = Omit<__TransactGetItemsCommandInput, "TransactItems"> & {
	TransactItems:
		| (Omit<TransactGetItem, "Get"> & {
				Get:
					| (Omit<Get, "Key"> & {
							Key: K;
					  })
					| undefined;
		  })[]
		| undefined;
};

export type TransactGetCommandOutput<A extends GenericAttributes = GenericAttributes> = Omit<__TransactGetItemsCommandOutput, "Responses"> & {
	Responses?: (Omit<ItemResponse, "Item"> & {
		Item: A;
	})[];
};

/**
 * Accepts native JavaScript types instead of `AttributeValue`s, and calls
 * TransactGetItemsCommand operation from {@link @aws-sdk/client-dynamodb#TransactGetItemsCommand}.
 *
 * JavaScript objects passed in as parameters are marshalled into `AttributeValue` shapes
 * required by Amazon DynamoDB. Responses from DynamoDB are unmarshalled into plain JavaScript objects.
 *
 * @public
 */
export class TransactGetCommand<A extends GenericAttributes = GenericAttributes, K extends GenericAttributes = GenericAttributes> extends DynamoDBDocumentClientCommand<
	TransactGetCommandInput<K>,
	TransactGetCommandOutput<A>,
	__TransactGetItemsCommandInput,
	__TransactGetItemsCommandOutput,
	DynamoDBDocumentClientResolvedConfig
> {
	protected readonly inputKeyNodes = {
		TransactItems: {
			"*": {
				Get: {
					Key: ALL_VALUES, // map with AttributeValue
				},
			},
		},
	};

	protected readonly outputKeyNodes = {
		Responses: {
			"*": {
				Item: ALL_VALUES, // map with AttributeValue
			},
		},
	};

	protected readonly clientCommand: __TransactGetItemsCommand;

	// @ts-ignore
	public readonly middlewareStack: MiddlewareStack<TransactGetCommandInput<K>, TransactGetCommandOutput<A>>;

	constructor(readonly input: TransactGetCommandInput<K>) {
		super();
		this.clientCommand = new __TransactGetItemsCommand(this.input as any);

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
	): Handler<TransactGetCommandInput<K>, TransactGetCommandOutput<A>> {
		this.addMarshallingMiddleware(configuration);
		const stack = clientStack.concat(this.middlewareStack as typeof clientStack);
		const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);

		// @ts-ignore
		return async () => handler(this.clientCommand);
	}
}
