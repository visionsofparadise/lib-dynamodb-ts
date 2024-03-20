import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { transactWriteItems } from "./transactWriteItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, randomString } from "./utils.dev";

it("puts item", async () => {
	const string = randomString();

	const item: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	const result = await transactWriteItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		TransactItems: [
			{
				Put: {
					TableName: TestTableName,
					Item: item,
				},
			},
		],
	});

	expect(result).toBeDefined();
});

it("deletes an item", async () => {
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

	const result = await transactWriteItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		TransactItems: [
			{
				Delete: {
					TableName: TestTableName,
					Key: item,
				},
			},
		],
	});

	expect(result).toBeDefined();
});
