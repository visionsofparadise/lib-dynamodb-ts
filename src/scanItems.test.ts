import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { scanItems } from "./scanItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "./utils.dev";

it("query returns list of items", async () => {
	const hash = randomString();

	const items: Array<TestPrimaryKey> = arrayOfLength(10).map(() => {
		const string = randomString();

		return {
			pk: hash,
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

	const result = await scanItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {});

	const itemsTypeCheck: A.Equals<(typeof result)["Items"], Array<TestPrimaryKey> | undefined> = 1;

	expect(itemsTypeCheck).toBe(1);

	expect(result.Items?.length).toBeGreaterThanOrEqual(10);
});
