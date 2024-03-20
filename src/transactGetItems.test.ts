import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { transactGetItems } from "./transactGetItems";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, randomString } from "./utils.dev";

it("gets an item", async () => {
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

	const result = await transactGetItems<TestPrimaryKey, TestPrimaryKey>(TABLE_CONFIGURATION, {
		TransactItems: [
			{
				Get: {
					TableName: TestTableName,
					Key: item,
				},
			},
		],
	});

	const resultTypeCheck: A.Equals<NonNullable<(typeof result)["Responses"]>[number]["Item"], TestPrimaryKey> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Responses?.[0].Item).toStrictEqual(item);
});
