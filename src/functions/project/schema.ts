export const createProject = {
	type: 'object',
	properties: {
		projectId: { type: 'number' },
		name: { type: 'string' },
	},
	required: ['projectId', 'name'],
};

export const getTasksByProjectId = {
	type: 'object',
	properties: {
		projectId: { type: 'number' },
	},
	required: ['projectId'],
};
