import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const getTaskById = async (event) => {
	const client = new DocumentClient();
	const data = await client
		.get({
			TableName: 'Tasks',
			Key: {
				TaskId: event.pathParameters.id,
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Task created successfully`,
		data: data,
	});
};

export const main = middyfy(getTaskById);
