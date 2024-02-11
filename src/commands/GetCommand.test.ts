import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, TestPrimaryKey, TestTableName, randomString } from "../utils";
import { GetCommand } from "./GetCommand";

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
		new GetCommand<TestPrimaryKey>({
			TableName: TestTableName,
			Key: item,
		})
	);

	const resultTypeCheck: A.Equals<(typeof result)["Item"], TestPrimaryKey> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Item).toStrictEqual(item);
});
