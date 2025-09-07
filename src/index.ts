import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import awsLambda from 'aws-lambda';
import todoRoutes from '#src/resources/todo/todo.routes.ts';
import { jsonErrorHandler } from '#src/middleware/json-error.middleware.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// routes
app.use(todoRoutes);

// error handling middleware (must be last)
app.use(jsonErrorHandler);

// run server locally for testing
if (process.env.NODE_ENV === 'local') {
  app.listen(port, () => {
    console.log(`App is listenting on port ${port}`);
  });
}

// serverless handler when deployed to AWS Lambda
const handleRequest = serverless(app);

export const handler = async (
  event: awsLambda.APIGatewayProxyEvent,
  context: awsLambda.Context
): Promise<awsLambda.APIGatewayProxyResult> => {
  return (await handleRequest(
    event,
    context
  )) as awsLambda.APIGatewayProxyResult;
};

export { app };
