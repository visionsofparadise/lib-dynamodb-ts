import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { batchGetItems } from "./batchGetItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "./utils.dev";

it("it gets 10 items", async () => {
	const items: Array<TestPrimaryKey> = arrayOfLength(10).map(() => {
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

	const result = await batchGetItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		RequestItems: {
			[TestTableName]: {
				Keys: items.map(({ pk, sk }) => ({ pk, sk })),
			},
		},
	});

	expect(result.Responses?.[TestTableName].length).toBe(10);
});
