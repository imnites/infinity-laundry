import { GraphQLError } from 'graphql';

export const errorCodes = {
  unauthorized: 'Unauthorized',
  EMAIL_AND_PHONE_NUMBER_ALREADY_EXISTS:
    'EMAIL_AND_PHONE_NUMBER_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PHONE_NUMBER_ALREADY_EXISTS: 'PHONE_NUMBER_ALREADY_EXISTS'
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
  code?: string
): GraphQLError =>
  code
    ? new GraphQLError(message, {
        extensions: {
          code: code
        }
      })
    : new GraphQLError(message);
