import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import schema from './schema';

const createTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event
) => {
	const client = new DocumentClient();
	const { body } = event;
	const { assignedTo, description, estimatedTime, taskId } = body;
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
			},
		})
		.promise();

	return formatJSONResponse({
		message: `Task created successfully`,
		data: data,
	});
};

export const main = middyfy(createTask);
