export const createTask = {
	type: 'object',
	properties: {
		taskId: { type: 'string' },
		description: { type: 'string' },
		assignedTo: { type: 'string' },
		estimatedTime: { type: 'string' },
		projectId: { type: 'number' },
	},
	required: [
		'taskId',
		'description',
		'assignedTo',
		'estimatedTime',
		'projectId',
	],
};

export const updateTask = {
	type: 'object',
	properties: {
		status: { type: 'string' },
	},
	required: ['status'],
};
