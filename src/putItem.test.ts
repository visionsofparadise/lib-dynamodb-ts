import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { putItem } from "./putItem";
import { ReturnValues } from "./utils";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, randomString } from "./utils.dev";

it("puts item", async () => {
	const string = randomString();

	const item: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	const result = await putItem<TestPrimaryKey>(TABLE_CONFIGURATION, {
		Item: item,
	});

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
		new PutCommand({
			TableName: TestTableName,
			Item: item,
		})
	);

	const updatedItem = {
		...item,
		string: randomString(),
	};

	const result = await putItem<TestPrimaryKey & { string: string }, ReturnValues.ALL_OLD>(TABLE_CONFIGURATION, {
		Item: updatedItem,
		ReturnValues: ReturnValues.ALL_OLD,
	});

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], TestPrimaryKey & { string: string }> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes).toStrictEqual(item);
});
