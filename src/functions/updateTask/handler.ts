import schema from '@functions/createTask/schema';
import {
	ValidatedEventAPIGatewayProxyEvent,
	formatJSONResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const updateTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event
) => {
	const client = new DocumentClient();
	const { body } = event;
	const data = await client
		.update({
			TableName: 'Tasks',
			Key: { TaskId: event.pathParameters.id },
			UpdateExpression: 'set #status = :status',
			ExpressionAttributeNames: {
				'#status': 'status',
			},
			ExpressionAttributeValues: {
				':status': body.status,
			},
			ReturnValues: 'ALL_NEW',
		})
		.promise();

	return formatJSONResponse({
		message: `Task updated successfully`,
		data: data,
	});
};

export const main = middyfy(updateTask);
