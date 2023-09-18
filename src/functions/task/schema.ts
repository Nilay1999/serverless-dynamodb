export const createTask = {
	type: 'object',
	properties: {
		taskId: { type: 'string' },
		description: { type: 'string' },
		assignedTo: { type: 'string' },
		estimatedTime: { type: 'string' },
	},
	required: ['taskId', 'description', 'assignedTo', 'estimatedTime'],
};

export const updateTask = {
	type: 'object',
	properties: {
		status: { type: 'string' },
	},
	required: ['status'],
};
