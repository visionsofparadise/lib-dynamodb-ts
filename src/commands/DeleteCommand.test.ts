import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { A } from "ts-toolbelt";
import { DocumentClient, GenericAttributes, TestTableName, randomString } from "../utils";
import { DeleteCommand } from "./DeleteCommand";

it("deletes an item", async () => {
	const string = randomString();

	const item = {
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
		new DeleteCommand({
			TableName: TestTableName,
			Key: item,
			ReturnValues: ReturnValue.ALL_OLD,
		})
	);

	const resultTypeCheck: A.Equals<(typeof result)["Attributes"], GenericAttributes> = 1;

	expect(resultTypeCheck).toBe(1);

	expect(result.Attributes).toStrictEqual(item);
});
