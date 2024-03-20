import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";

export type GenericAttributes = Record<string, NativeAttributeValue>;

export enum ReturnValues {
	ALL_NEW = "ALL_NEW",
	ALL_OLD = "ALL_OLD",
	UPDATED_NEW = "UPDATED_NEW",
	UPDATED_OLD = "UPDATED_OLD",
	NONE = "NONE",
}

export type ReturnValuesAttributes<A extends GenericAttributes | Partial<GenericAttributes> | undefined, RV extends ReturnValues | undefined> = RV extends ReturnValues.ALL_NEW | ReturnValues.ALL_OLD
	? A
	: RV extends ReturnValues.UPDATED_NEW | ReturnValues.UPDATED_OLD
	? Partial<A> | undefined
	: undefined;
