import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, TestPrimaryKey, TestTableName, randomString } from "../utils";
import { TransactGetCommand } from "./TransactGetCommand";

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

	const result = await DocumentClient.send(
		new TransactGetCommand<typeof item, typeof item>({
			TransactItems: [
				{
					Get: {
						TableName: TestTableName,
						Key: item,
					},
				},
			],
		})
	);

	const resultTypeCheck: A.Equals<NonNullable<(typeof result)["Responses"]>[number]["Item"], typeof item> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Responses?.[0].Item).toStrictEqual(item);
});
