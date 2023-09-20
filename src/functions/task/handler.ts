import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const getTaskById = middyfy(async (event) => {
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
});

export const createTask = middyfy(async (event) => {
	const client = new DocumentClient();
	const { body } = event;
	const { assignedTo, description, estimatedTime, taskId, projectId } = body;
	const data = await client
		.put({
			TableName: 'Tasks',
			Item: {
				TaskId: taskId,
				assignedTo,
				description,
				estimatedTime,
				status: 'pending',
				createdAt: Date.now(),
				updatedAt: Date.now(),
				projectId: projectId,
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Task created successfully`,
		data: data,
	});
});

export const updateTask = middyfy(async (event) => {
	const client = new DocumentClient();
	const { body } = event;
	const data = await client
		.update({
			TableName: 'Tasks',
			Key: { TaskId: event.pathParameters.id },
			UpdateExpression: 'set #status = :status, #updatedAt = :updatedAt',
			ExpressionAttributeNames: {
				'#status': 'status',
				'#updatedAt': 'updatedAt',
			},
			ExpressionAttributeValues: {
				':status': body.status,
				':updatedAt': Date.now(),
			},
			ReturnValues: 'ALL_NEW',
		})
		.promise();

	return formatJSONResponse({
		message: `Task updated successfully`,
		data: data,
	});
});
