import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { updateItem } from "./updateItem";
import { ReturnValues } from "./utils";
import { DocumentClient, TABLE_CONFIGURATION, TestPrimaryKey, TestTableName, randomString } from "./utils.dev";

it("updates an existing item", async () => {
	const string = randomString();

	const key: TestPrimaryKey = {
		pk: string,
		sk: string,
	};

	const item = {
		...key,
		string,
	};

	await DocumentClient.send(
		new PutCommand({
			TableName: TestTableName,
			Item: item,
		})
	);

	const updatedString = randomString();

	const result = await updateItem<TestPrimaryKey & { string: string }, TestPrimaryKey, ReturnValues.ALL_NEW>(TABLE_CONFIGURATION, {
		Key: key,
		ReturnValues: ReturnValues.ALL_NEW,
		UpdateExpression: "SET #string = :string",
		ExpressionAttributeNames: {
			"#string": "string",
		},
		ExpressionAttributeValues: {
			":string": updatedString,
		},
	});

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], TestPrimaryKey & { string: string }> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes?.string).toBe(updatedString);
});
