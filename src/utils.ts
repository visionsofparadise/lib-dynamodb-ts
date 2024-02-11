import { DynamoDB, ReturnValue } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { createHash } from "crypto";

export type GenericAttributes = Record<string, NativeAttributeValue>;

export type AllReturnValue = Extract<ReturnValue, "ALL_NEW" | "ALL_OLD">;
export type PartialReturnValue = Extract<ReturnValue, "UPDATED_NEW" | "UPDATED_OLD">;

export type ReturnValueAttributes<A extends GenericAttributes | Partial<GenericAttributes> | undefined, RV extends ReturnValue | undefined> = RV extends AllReturnValue
	? A
	: RV extends PartialReturnValue
	? Partial<A> | undefined
	: undefined;

export const DynamoDBClient =
	process.env.INTEGRATION_TEST === "true"
		? new DynamoDB({})
		: new DynamoDB({
				endpoint: "http://127.0.0.1:8000",
				region: "local-env",
				credentials: {
					accessKeyId: "fakeMyKeyId",
					secretAccessKey: "fakeSecretAccessKey",
				},
		  });

export const DocumentClient = DynamoDBDocumentClient.from(DynamoDBClient, {
	marshallOptions: {
		removeUndefinedValues: true,
	},
});

export const TestTableName = "test";

export interface TestPrimaryKey {
	pk: string;
	sk: string;
}

export const arrayOfLength = (length: number) => Array.apply(null, Array(Math.max(Math.round(length), 0))).map(() => {});

const hash = (values: Array<any>, size: number = 21) => {
	const hash = createHash("sha256");

	for (const value of values) {
		hash.update(value);
	}

	const hashValue = hash.end().read();

	return (hashValue.toString("base64url") as string).split("-").join("").split("_").join("").slice(0, size) || "";
};

const randomNumber = () => Math.round(Math.random() * Number.MAX_SAFE_INTEGER);

export const randomString = (size?: number) => hash([randomNumber().toString()], size);
