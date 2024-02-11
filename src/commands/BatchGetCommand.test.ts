import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DocumentClient, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "../utils";
import { BatchGetCommand } from "./BatchGetCommand";

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

	const result = await DocumentClient.send(
		new BatchGetCommand<TestPrimaryKey, TestPrimaryKey>({
			RequestItems: {
				[TestTableName]: {
					Keys: items.map(({ pk, sk }) => ({ pk, sk })),
				},
			},
		})
	);

	expect(result.Responses?.[TestTableName].length).toBe(10);
});
