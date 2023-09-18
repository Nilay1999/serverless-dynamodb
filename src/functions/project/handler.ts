import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const createProject = middyfy(async (event) => {
	const client = new DocumentClient();
	const data = await client
		.put({
			TableName: 'Projects',
			Item: {
				projectId: event.body.id,
				name: event.body.name,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			},
			ReturnValues: 'ALL_NEW',
		})
		.promise();

	return formatJSONResponse({
		message: `Task created successfully`,
		data: data,
	});
});

export const getProjectById = middyfy(async (event) => {
	const client = new DocumentClient();
	const data = await client
		.get({
			TableName: 'Projects',
			Key: {
				projectId: event.pathParameters.id,
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Task created successfully`,
		data: data,
	});
});

export const getTasksByProject = middyfy(async (event) => {
	const client = new DocumentClient();
	const data = await client
		.query({
			TableName: 'Tasks',
			KeyConditions: {
				projectId: event.queryStringParameters.projectId,
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Success`,
		data: data,
	});
});
