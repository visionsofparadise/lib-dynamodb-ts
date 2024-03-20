import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { batchWriteItems } from "./batchWriteItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "./utils.dev";

it("it puts 25 items", async () => {
	const items: Array<TestPrimaryKey> = arrayOfLength(25).map(() => {
		const string = randomString();

		return {
			pk: string,
			sk: string,
		};
	});

	const result = await batchWriteItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		RequestItems: {
			[TestTableName]: items.map((Item) => ({ PutRequest: { Item } })),
		},
	});

	expect(result.UnprocessedItems?.[TestTableName]).toBeUndefined();
});

it("it deletes 25 items", async () => {
	const items: Array<TestPrimaryKey> = arrayOfLength(25).map(() => {
		const string = randomString();

		return {
			pk: string,
			sk: string,
		};
	});

	await DocumentClient.send(
		new BatchWriteCommand({
			RequestItems: {
				[TestTableName]: items.map((item) => ({
					PutRequest: {
						Item: item,
					},
				})),
			},
		})
	);

	const result = await batchWriteItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		RequestItems: {
			[TestTableName]: items.map(({ pk, sk }) => ({ DeleteRequest: { Key: { pk, sk } } })),
		},
	});

	expect(result.UnprocessedItems?.[TestTableName]).toBeUndefined();
});
