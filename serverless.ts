import { AWS } from '@serverless/typescript';
import { createUserLambda, getUserLambda } from '@functions/user';

const serverlessConfiguration: AWS = {
  service: 'step-functions-dynamoDB',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: "ap-south-1",
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    deploymentBucket: 'serverless-deployment-bucket-backend',
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: ["arn:aws:dynamodb:ap-south-1:*:table/Users"],
        }],
      },
    },
  },

  // import the function via paths
  functions: { createUserLambda, getUserLambda },
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
      Users: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Users",
          AttributeDefinitions: [{
            AttributeName: "userId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "userId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
