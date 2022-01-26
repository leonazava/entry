import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

async function fetchGraphQL(query) {
  let response;
  try {
    response = await client.query({
      query: gql`
        ${query}
      `,
    });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
}

export default fetchGraphQL;
