import { getItem } from "./getItem";
import { putItem } from "./putItem";
import { ReturnValues } from "./utils";
import { DocumentClient } from "./utils.dev";

it("demonstrates usage", async () => {
	interface Key {
		pk: string;
		sk: string;
	}

	interface Item extends Key {
		userId: string;
	}

	const TABLE_CONFIGURATION = {
		Client: DocumentClient,
		TableName: "test",
	};

	await putItem<Item, ReturnValues.NONE>(TABLE_CONFIGURATION, {
		Item: {
			pk: "abc",
			sk: "123",
			userId: "userId",
		},
		ReturnValues: ReturnValues.NONE,
	});

	const result = await getItem<Item, Key>(TABLE_CONFIGURATION, {
		Key: {
			pk: "abc",
			sk: "123",
		},
	});

	console.log(result.Item); // { pk: 'abc', sk: '123', userId: 'userId' }

	expect(result.Item).toBeDefined();
});
