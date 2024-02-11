import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { PutCommand as __PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, TestPrimaryKey, TestTableName, randomString } from "../utils";
import { PutCommand } from "./PutCommand";

it("puts item", async () => {
	const string = randomString();

	const item: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	const result = await DocumentClient.send(
		new PutCommand({
			TableName: TestTableName,
			Item: item,
		})
	);

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], undefined> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes).toBeUndefined();
});

it("returns old values", async () => {
	const string = randomString();

	const item: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	await DocumentClient.send(
		new __PutCommand({
			TableName: TestTableName,
			Item: item,
		})
	);

	const updatedItem = {
		...item,
		string: randomString(),
	};

	const result = await DocumentClient.send(
		new PutCommand({
			TableName: TestTableName,
			Item: updatedItem,
			ReturnValues: ReturnValue.ALL_OLD,
		})
	);

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], typeof updatedItem> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes).toStrictEqual(item);
});
