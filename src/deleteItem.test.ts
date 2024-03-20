import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { deleteItem } from "./deleteItem";
import { ReturnValues } from "./utils";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, randomString } from "./utils.dev";

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

	const result = await deleteItem<TestPrimaryKey, TestPrimaryKey, ReturnValues.ALL_OLD>(TABLE_CONFIGURATION, {
		Key: item,
		ReturnValues: ReturnValues.ALL_OLD,
	});

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], TestPrimaryKey> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes).toStrictEqual(item);
});
