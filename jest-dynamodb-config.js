module.exports = {
	hostname: "127.0.0.1",
	tables: [
		{
			TableName: `test`,
			KeySchema: [
				{ AttributeName: 'pk', KeyType: 'HASH' },
				{ AttributeName: 'sk', KeyType: 'RANGE' }
			],
			AttributeDefinitions: [
				{ AttributeName: 'pk', AttributeType: 'S' },
				{ AttributeName: 'sk', AttributeType: 'S' },
				{ AttributeName: 'gsi0Pk', AttributeType: 'S' },
				{ AttributeName: 'gsi0Sk', AttributeType: 'S' },
			],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
			GlobalSecondaryIndexes: [
				{
					IndexName: 'gsi0',
					KeySchema: [
						{ AttributeName: 'gsi0Pk', KeyType: 'HASH' },
						{ AttributeName: 'gsi0Sk', KeyType: 'RANGE' }
					],
					Projection: {
						ProjectionType: 'ALL'
					},
					ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
				}
			]
		}
	]
};
