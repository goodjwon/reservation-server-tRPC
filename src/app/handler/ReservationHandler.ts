import 'reflect-metadata';
import { APIGatewayProxyHandler } from 'aws-lambda';
import appRouter from '../trpc';

export const handler: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body || '{}');
  const response = await appRouter.createCaller({}).bookRoom(input);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'app/json',
    },
  };
};
