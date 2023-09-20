import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const createProject = middyfy(async (event) => {
	const client = new DocumentClient();
	const { body } = event;
	const { projectId, name } = body;
	await client
		.put({
			TableName: 'Projects',
			Item: {
				projectId: projectId,
				name: name,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			},
		})
		.promise()
		.catch((e) => {
			console.log(e);
		});

	return formatJSONResponse({
		message: `Project created successfully`,
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
	console.log(event);
	const data = await client
		.query({
			TableName: 'Tasks',
			KeyConditions: {
				projectId: event.body.projectId,
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Success`,
		data: data,
	});
});
