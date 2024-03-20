import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { PaginatorParameters, paginate } from "./paginate";
import { queryItems } from "./queryItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, arrayOfLength, randomString } from "./utils.dev";

it("paginated query returns list of items", async () => {
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

	const result = await paginate(
		{
			PageLimit: 5,
			TotalLimit: 8,
		},
		async (paginatorParameters: PaginatorParameters<TestPrimaryKey | undefined>) => {
			return queryItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
				...paginatorParameters,
				KeyConditionExpression: "pk = :pk",
				ExpressionAttributeValues: {
					":pk": hash,
				},
			});
		}
	);

	console.log(result.map((page) => page.Items).flat().length); // 8

	const itemsTypeCheck: A.Equals<(typeof result)[number]["Items"], Array<TestPrimaryKey> | undefined> = 1;

	expect(itemsTypeCheck).toBe(1);

	expect(result.map((page) => page.Items).flat().length).toBe(8);
});
