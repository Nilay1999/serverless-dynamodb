import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { createPostSchema } from './schema';
import PostModel from './post.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const createPost: ValidatedEventAPIGatewayProxyEvent<typeof createPostSchema> = async (event) => {
  const {
    body,
    postId,
    title
  } = event.body;
  const post = new PostModel({
    body,
    postId,
    title
  });
  await post.save()
  return formatJSONResponse({
    data: post,
  });
};

const getPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters?.id;

  if (!postId) {
    return formatJSONResponse({
      message: 'User ID is required',
      event,
    });
  }

  const post = await PostModel.query("postId").eq(postId).exec();
  return formatJSONResponse({
    data: post,
  });
};

export const createPostFunction = middyfy(createPost);
export const getPostFunction = middyfy(getPost)