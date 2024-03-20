import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { createHash } from "crypto";

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

export const TABLE_CONFIGURATION = {
	Client: DocumentClient,
	TableName: TestTableName,
};

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
