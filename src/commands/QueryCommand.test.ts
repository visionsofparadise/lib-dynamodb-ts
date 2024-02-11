import { BatchWriteCommand as __BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "../utils";
import { QueryCommand } from "./QueryCommand";

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
		new __BatchWriteCommand({
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
		new QueryCommand<TestPrimaryKey>({
			TableName: TestTableName,
			KeyConditionExpression: "pk = :pk",
			ExpressionAttributeValues: {
				":pk": hash,
			},
		})
	);

	const itemsTypeCheck: A.Equals<(typeof result)["Items"], Array<TestPrimaryKey>> = 1;

	expect(itemsTypeCheck).toBe(1);

	expect(result.Items?.length).toBe(10);
});
