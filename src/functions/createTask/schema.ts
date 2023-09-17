export default {
	type: 'object',
	properties: {
		taskId: { type: 'string' },
		description: { type: 'string' },
		assignedTo: { type: 'string' },
		estimatedTime: { type: 'string' },
	},
	required: ['taskId', 'description', 'assignedTo', 'estimatedTime'],
} as const;
