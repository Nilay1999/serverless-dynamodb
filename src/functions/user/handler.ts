import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { createUserSchema } from './schema';
import UserModel from './user.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof createUserSchema> = async (event) => {
  const {
    username,
    userId,
    email,
    age
  } = event.body;
  const myUser = new UserModel({
    username,
    userId,
    email,
    age
  });
  await myUser.save()
  return formatJSONResponse({
    data: myUser,
  });
};

const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = event.pathParameters?.id;

  if (!userId) {
    return formatJSONResponse({
      message: 'User ID is required',
      event,
    });
  }

  const user = await UserModel.query("userId").eq(userId).exec();
  return formatJSONResponse({
    data: user,
  });
};

export const createUserFunction = middyfy(createUser);
export const getUserFunction = middyfy(getUser)