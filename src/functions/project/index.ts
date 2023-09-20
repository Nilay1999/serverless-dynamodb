import { handlerPath } from '@libs/handler-resolver';
import {
	createProject as createProjectSchema,
	getTasksByProjectId as getProjectByIdSchema,
} from './schema';

export const createProject = {
	handler: `${handlerPath(__dirname)}/handler.createProject`,
	events: [
		{
			http: {
				method: 'post',
				path: 'createProject',
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
				method: 'post',
				path: 'getTasksByProject',
				request: {
					schemas: {
						'application/json': getProjectByIdSchema,
					},
				},
			},
		},
	],
};
