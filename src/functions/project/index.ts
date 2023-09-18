import { handlerPath } from '@libs/handler-resolver';
import { createProject as createProjectSchema } from './schema';

export const createProject = {
	handler: `${handlerPath(__dirname)}/handler.createProject`,
	events: [
		{
			http: {
				method: 'post',
				path: 'createTask',
				request: {
					schemas: {
						'application/json': createProjectSchema,
					},
				},
			},
		},
	],
};

export const getProjectById = {
	handler: `${handlerPath(__dirname)}/handler.getProjectById`,
	events: [
		{
			http: {
				method: 'get',
				path: 'getProjectById/{id}',
			},
		},
	],
};

export const getTasksByProject = {
	handler: `${handlerPath(__dirname)}/handler.getTasksByProject`,
	events: [
		{
			http: {
				method: 'get',
				path: 'getTasksByProject',
			},
		},
	],
};
