import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DocumentClient, TestPrimaryKey, TestTableName, randomString } from "../utils";
import { TransactWriteCommand } from "./TransactWriteCommand";

it("puts item", async () => {
	const string = randomString();

	const item: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	const result = await DocumentClient.send(
		new TransactWriteCommand<typeof item, typeof item>({
			TransactItems: [
				{
					Put: {
						TableName: TestTableName,
						Item: item,
					},
				},
			],
		})
	);

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

	const result = await DocumentClient.send(
		new TransactWriteCommand<typeof item, typeof item>({
			TransactItems: [
				{
					Delete: {
						TableName: TestTableName,
						Key: item,
					},
				},
			],
		})
	);

	expect(result).toBeDefined();
});
