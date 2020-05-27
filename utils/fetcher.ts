import { GraphQLClient } from "graphql-request";

export const fetcher: <T>(
  query: string,
  secret?: string,
  variables?: Record<string, unknown>
) => Promise<T> = async (query, secret, variables) => {
  const endpoint = "https://graphql.fauna.com/graphql";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      ["authorization"]: `bearer ${secret || process.env.faunaClientSecret}`,
      ["X-Schema-Preview"]: "partial-update-mutation",
      ["Content-Type"]: "application/json",
    },
  });
  return await graphQLClient.request(query, variables);
};
