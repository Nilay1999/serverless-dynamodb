import { createUserSchema } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const createUserLambda = {
  handler: `${handlerPath(__dirname)}/handler.createUserFunction`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user',
        request: {
          schemas: {
            'application/json': createUserSchema,
          },
        },
      },
    },
  ],
};

export const getUserLambda = {
  handler: `${handlerPath(__dirname)}/handler.getUserFunction`,
  events: [
    {
      http: {
        method: 'get',
        path: '/user/{id}'
      },
    },
  ],
};
