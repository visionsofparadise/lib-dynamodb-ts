# Description

Helper functions for DynamoDB Document Client that add type parameters for assigning more precise types in inputs and outputs.

- Input parameters are the same as command input parameters, but with stricter types according to type parameters.
- Simplified and flexible paginate utility for query and scan commands.

# Usage

```
interface Key {
   pk: string;
   sk: string;
}

interface Item extends Key {
   userId: string
}

const TABLE_CONFIGURATION = {
   Client: DocumentClient,
   TableName: "test",
}

await putItem<Item, ReturnValues.NONE>(TABLE_CONFIGURATION, {
   Item: {
      pk: 'abc',
      sk: '123',
      userId: 'userId'
   },
   ReturnValues: ReturnValues.NONE
});

const result = await getItem<Item, Key>(TABLE_CONFIGURATION, {
   Key: {
      pk: 'abc',
      sk: '123'
   },
});

console.log(result.Item) // { pk: 'abc', sk: '123', userId: 'userId' }
```

# Functions & Type Parameters

```
batchExecuteStatements<Attributes>
batchGetItems<Attributes, Key>
batchWriteItems<Attributes, Key>
deleteItem<Attributes, Key, ReturnValues>
executeItemsStatement<Attributes, CursorKey>
executeItemsTransaction<Attributes>
getItem<Attributes, Key>
putItem<Attributes, ReturnValues>
queryItems<Attributes, CursorKey>
scanItems<Attributes, CursorKey>
transactGetItems<Attributes, Key>
transactWriteItems<Attributes, Key>
updateItem<Attributes, Key, ReturnValues>
```

# Paginate Usage

```
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
```

# To Do

-   [ ] Tests for BatchExecuteStatementCommand, ExecuteStatementCommand, ExecuteTransactionCommand
