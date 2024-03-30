import { GraphQLError } from 'graphql';

export const errorCodes = {
  unauthorized: 'Unauthorized'
};

export const throwGraphQLError = ({
  response
}: {
  response: {
    statusText: string;
    data: { error: string; error_description?: string };
  };
}): never => {
  throw new GraphQLError(response.data.error, {
    extensions: {
      description: response.data.error_description,
      code: response.statusText
    }
  });
};

export const mapToGraphQLError = (
  message: string,
  code: string
): GraphQLError =>
  new GraphQLError(message, {
    extensions: {
      code: code
    }
  });
