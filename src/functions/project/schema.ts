export const createProject = {
	type: 'object',
	properties: {
		projectId: { type: 'string' },
		name: { type: 'string' },
	},
	required: ['projectId', 'name'],
};
