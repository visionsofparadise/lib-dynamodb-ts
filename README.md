# Description

Replacement commands for DynamoDB Document Client that add type parameters for assigning types in command inputs and outputs.

Commands are functionally identical and compatible for use with the native 'lib-dynamodb' client.

# Command Type Parameters

```
BatchExecuteStatementCommand<Attributes>
BatchGetCommand<Attributes, Key>
BatchWriteCommand<Attributes, Key>
DeleteCommand<Attributes, Key, ReturnValues>
ExecuteStatementCommand<Attributes, CursorKey>
ExecuteTransactionCommand<Attributes>
GetCommand<Attributes, Key>
PutCommand<Attributes, ReturnValues>
QueryCommand<Attributes, CursorKey>
ScanCommand<Attributes, CursorKey>
TransactGetCommand<Attributes, Key>
TransactWriteCommand<Attributes, Key>
UpdateCommand<Attributes, Key, ReturnValues>
```

# To Do

-   [ ] Tests for BatchExecuteStatementCommand, ExecuteStatementCommand, ExecuteTransactionCommand
-   [ ] Fix bug with how input/outputs are inferred by client. Currently fixed with @ts-ignore
