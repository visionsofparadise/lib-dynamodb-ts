import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, TestPrimaryKey, TestTableName, randomString } from "../utils";
import { UpdateCommand } from "./UpdateCommand";

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

	const result = await DocumentClient.send(
		new UpdateCommand<typeof item, typeof key, "ALL_NEW">({
			TableName: TestTableName,
			Key: key,
			ReturnValues: ReturnValue.ALL_NEW,
			UpdateExpression: "SET #string = :string",
			ExpressionAttributeNames: {
				"#string": "string",
			},
			ExpressionAttributeValues: {
				":string": updatedString,
			},
		})
	);

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], typeof item> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes?.string).toBe(updatedString);
});
