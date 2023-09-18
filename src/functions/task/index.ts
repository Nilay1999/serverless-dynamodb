import { handlerPath } from '@libs/handler-resolver';
import {
	createTask as createTaskSchema,
	updateTask as updateTaskSchema,
} from './schema';

export const createTask = {
	handler: `${handlerPath(__dirname)}/handler.createTask`,
	events: [
		{
			http: {
				method: 'post',
				path: 'createTask',
				request: {
					schemas: {
						'application/json': createTaskSchema,
					},
				},
			},
		},
	],
};

export const getTaskById = {
	handler: `${handlerPath(__dirname)}/handler.getTaskById`,
	events: [
		{
			http: {
				method: 'get',
				path: 'getTaskById/{id}',
			},
		},
	],
};

export const updateTask = {
	handler: `${handlerPath(__dirname)}/handler.updateTask`,
	events: [
		{
			http: {
				method: 'put',
				path: 'updateTask/{id}',
				request: {
					schemas: {
						'application/json': updateTaskSchema,
					},
				},
			},
		},
	],
};
