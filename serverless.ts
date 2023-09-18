import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import { getTaskById, createTask, updateTask } from '@functions/task';
import {
	createProject,
	getProjectById,
	getTasksByProject,
} from '@functions/project';

const serverlessConfiguration: AWS = {
	service: 'aws-serverless-typescript-api',
	frameworkVersion: '3',
	plugins: ['serverless-esbuild'],
	provider: {
		name: 'aws',
		region: 'ap-south-1',
		runtime: 'nodejs14.x',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [
							'dynamodb:DescribeTable',
							'dynamodb:Query',
							'dynamodb:Scan',
							'dynamodb:GetItem',
							'dynamodb:PutItem',
							'dynamodb:UpdateItem',
							'dynamodb:DeleteItem',
						],
						Resource: [
							'arn:aws:dynamodb:ap-south-1:*:table/Tasks',
							'arn:aws:dynamodb:ap-south-1:*:table/Projects',
						],
					},
				],
			},
		},
	},
	functions: {
		hello,
		createTask,
		getTaskById,
		updateTask,
		createProject,
		getProjectById,
		getTasksByProject,
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
	resources: {
		Resources: {
			Projects: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'Projects',
					KeySchema: [
						{ AttributeName: 'projectId', KeyType: 'HASH' },
					],
					AttributeDefinitions: [
						{ AttributeName: 'projectId', AttributeType: 'N' },
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 5,
						WriteCapacityUnits: 5,
					},
				},
			},
			Tasks: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'Tasks',
					AttributeDefinitions: [
						{
							AttributeName: 'TaskId',
							AttributeType: 'S',
						},
					],
					KeySchema: [
						{
							AttributeName: 'TaskId',
							KeyType: 'HASH',
						},
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
