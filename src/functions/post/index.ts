import { createPostSchema } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const createPostLambda = {
  handler: `${handlerPath(__dirname)}/handler.createPostFunction`,
  events: [
    {
      http: {
        method: 'post',
        path: '/post',
        request: {
          schemas: {
            'application/json': createPostSchema,
          },
        },
      },
    },
  ],
};

export const getPostLambda = {
  handler: `${handlerPath(__dirname)}/handler.getPostFunction`,
  events: [
    {
      http: {
        method: 'get',
        path: '/post/{id}'
      },
    },
  ],
};
