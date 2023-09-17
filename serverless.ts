import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import createTask from '@functions/createTask';
import getTaskById from '@functions/getTaskById';

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
						Resource: 'arn:aws:dynamodb:ap-south-1:*:table/Tasks',
					},
				],
			},
		},
	},
	functions: { hello, createTask, getTaskById },
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
